'use strict';
let hasStarted=false,tutorialPage=0,tutorialAfter=null,saveMode='load';
const clone=data=>JSON.parse(JSON.stringify(data));
function validGame(s){if(!s||!validCases(s)||!validShop(s)||!validCampaign(s)||!validInventory(s)||s.version!==3||!Number.isInteger(s.zone)||s.zone<0||s.zone>4)return false;const max=(s.zone+3)*160+80;if(!['x','y','influence','trust','heat','decisions','rumor','favors'].every(k=>Number.isFinite(s[k])))return false;if(s.x<0||s.y<0||s.x>max||s.y>max||!['influence','trust','heat'].every(k=>s[k]>=0&&s[k]<=100))return false;if(!Array.isArray(s.history)||!s.history.every(t=>typeof t==='string')||!s.resolved||Array.isArray(s.resolved)||typeof s.resolved!=='object')return false;return Object.entries(s.resolved).every(([k,v])=>/^[0-4]:\d{1,2}$/.test(k)&&[0,1,2].includes(v)&&Number(k.split(':')[1])<6+Number(k[0])*2)}
function readSave(key){try{const data=JSON.parse(localStorage.getItem(key));const s=data?.state||data;return validGame(s)?{state:s,savedAt:data.savedAt||s.updatedAt||null}:null}catch{return null}}
window.gamePaused=()=>!!document.querySelector('dialog[open]');
function openPanel(id){keys.clear();route=[];autoTalk=null;window.GameAudio?.stopSpeech();if(!$(id).open)$(id).showModal()}
function closePanels(){for(const d of document.querySelectorAll('dialog[open]'))d.close()}
function resumeGame(){closePanels();hasStarted=true;keys.clear();canvas.focus();if(stopped())showEnding()}
window.openGameMenu=()=>{openPanel('main-menu');$('menu-title').innerHTML='Un momento,<br><em>vecina.</em>';$('menu-subtitle').textContent='El barrio puede esperar. Tu próxima historia, también.';$('continue-button').textContent='Volver al barrio ↗'};
$('menu-button').onclick=window.openGameMenu;
$('continue-button').onclick=()=>{resumeGame();revealZone()};
$('new-button').onclick=()=>{if(state.decisions&&!confirm('¿Empezar una historia nueva? Se reemplaza el autoguardado; tus espacios manuales se conservan.'))return;closePanels();restart();hasStarted=true;showTutorial(()=>{revealZone();canvas.focus()})};
$('load-button').onclick=()=>openSaves('load');$('save-button').onclick=()=>openSaves('save');$('journal-button').onclick=()=>openPanel('journal');$('settings-button').onclick=()=>openPanel('settings');
$('main-menu').addEventListener('cancel',e=>{e.preventDefault();if(hasStarted)resumeGame()});
for(const button of document.querySelectorAll('[data-close]'))button.onclick=()=>$(button.dataset.close).close();
const tutorialCards=[
 ['Un barrio a tus pies.','Muévete con WASD o las flechas. Haz clic en una calle y Meche caminará hasta allí, rodeando las casas.','↗','W A S D  /  ↑ ↓ ← →'],
 ['Acércate al secreto.','Busca las burbujas sobre los vecinos. Haz clic en uno para acercarte y hablar, o pulsa E cuando estés a su lado.','☏','ACÉRCATE → E → CONVERSA'],
 ['Toda la ciudad a tu favor.','Investiga y usa las pruebas o los chismes para convencer a cada persona. Escucha antes de argumentar: un rechazo cuesta una de tus 3 vidas. Todos deben apoyarte para pasar a territorios más difíciles.','♥','MANZANA → PUEBLO → CIUDAD → PAÍS → MUNDO']
];
function tutorialView(){const c=tutorialCards[tutorialPage];$('tutorial-step').textContent=`0${tutorialPage+1} / 03`;$('tutorial-title').textContent=c[0];$('tutorial-text').textContent=c[1];$('tutorial-icon').textContent=c[2];$('tutorial-demo').textContent=c[3];$('tutorial-next').textContent=tutorialPage===2?'¡Al barrio! ↗':'Siguiente →'}
function showTutorial(after=null){tutorialPage=0;tutorialAfter=after;openPanel('tutorial');tutorialView()}
function finishTutorial(){$('tutorial').close();try{localStorage.setItem('dona-tutorial-seen','1')}catch{}const after=tutorialAfter;tutorialAfter=null;after?.()}
$('tutorial-next').onclick=()=>{if(tutorialPage<2){tutorialPage++;tutorialView()}else finishTutorial()};$('tutorial-skip').onclick=finishTutorial;
$('help-button').onclick=()=>showTutorial();$('menu-help').onclick=()=>showTutorial();
$('tutorial').addEventListener('close',()=>{if(tutorialAfter){const fn=tutorialAfter;tutorialAfter=null;fn()}});
function formatSave(record){if(!record)return 'Espacio vacío';const s=record.state;let date='Guardado anterior';if(record.savedAt){const parsed=new Date(record.savedAt);if(!Number.isNaN(parsed.valueOf()))date=parsed.toLocaleString('es-EC',{timeZone:'America/Guayaquil',day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'})}return `${ZONES[s.zone]} · ${s.decisions} decisiones · ${date}`}
function loadRecord(record){if(!record||!validGame(record.state))return;closePanels();window.GameAudio?.stopSpeech();state=clone(record.state);keys.clear();$('dialog').hidden=true;$('close-dialog').hidden=false;buildWorld();ui();audioScene();save();hasStarted=true;revealZone();canvas.focus();if(stopped())showEnding();else notify('Partida cargada. Tu historia sigue aquí.')}
function slotRow(title,record,saveFn,loadFn){const row=document.createElement('div');row.className='save-slot';const label=document.createElement('div'),strong=document.createElement('strong'),small=document.createElement('small');strong.textContent=title;small.textContent=formatSave(record);label.append(strong,small);row.append(label);const actions=document.createElement('div');if(saveFn){const b=document.createElement('button');b.textContent='Guardar';b.onclick=saveFn;actions.append(b)}const load=document.createElement('button');load.textContent='Cargar';load.disabled=!record;load.onclick=loadFn;actions.append(load);row.append(actions);$('save-slots').append(row)}
function renderSaves(){$('save-slots').replaceChildren();const auto=readSave('dona-open-v3');slotRow('Autoguardado',auto,null,()=>loadRecord(auto));for(let i=1;i<=3;i++){const key='dona-slot-'+i,record=readSave(key);slotRow('Historia '+i,record,saveMode==='save'?()=>{if(record&&!confirm(`¿Reemplazar Historia ${i}?`))return;try{const snapshot=clone(state);snapshot.updatedAt=new Date().toISOString();localStorage.setItem(key,JSON.stringify({savedAt:snapshot.updatedAt,state:snapshot}));$('save-feedback').textContent=`✓ Historia ${i} guardada.`;renderSaves()}catch{$('save-feedback').textContent='El navegador no permite guardar. No se modificó el espacio.'}}:null,()=>loadRecord(record))}}
function openSaves(mode){saveMode=mode;$('saves-title').textContent=mode==='save'?'Guarda tu versión.':'Retoma tu historia.';$('save-feedback').textContent='';openPanel('save-menu');renderSaves()}
try{$('reduce-motion').checked=localStorage.getItem('dona-reduced-motion')==='1'||window.matchMedia('(prefers-reduced-motion: reduce)').matches}catch{}
function applyMotion(){document.documentElement.classList.toggle('reduced-motion',$('reduce-motion').checked)}
applyMotion();$('reduce-motion').onchange=()=>{applyMotion();try{localStorage.setItem('dona-reduced-motion',$('reduce-motion').checked?'1':'0')}catch{}};
// Keep a valid legacy autosave; discard malformed data without blocking the game.
if(!validGame(state)){state=fresh();buildWorld();ui()}
$('continue-button').textContent=state.decisions?'Continuar partida ↗':'Entrar al barrio ↗';
$('continue-button').onclick=()=>{resumeGame();let seen=false;try{seen=localStorage.getItem('dona-tutorial-seen')==='1'}catch{}if(!seen)showTutorial(revealZone);else revealZone()};
openPanel('main-menu');
