'use strict';
const $=id=>document.getElementById(id);
const ZONES=['Las Gardenias','El distrito','La capital','La alianza continental','El mundo'];
const NAMES=['Puri','Paco','Lola','Anselmo','Carmen','Beto','Inés','Tomás','Vera','Nico','Rosa','Elena','Saúl','Julia'];
const COLORS=['#a45e98','#d5bd85','#da7d58','#7293ae','#d49d46','#739673','#b085b0','#9aa575','#c46d73','#779eaa','#cdad6a','#a297bc','#69977c','#c58964'];
const HINTS=['¡Meche! Ven un momento…','Lo de los cien panes no es normal.','Aquí una se entera de todo.','¡Que yo no hablo demasiado!','Las cuentas no me cuadran.','Necesito una exclusiva.','¿Y esa carta sin remitente?','El jardinero sabe más de lo que dice.','Tengo dos versiones. ¿Cuál te cuento?','Ayer hubo reunión a puerta cerrada.','Qué casualidad que ganara su primo.','Dicen que tú conoces a todo el mundo.','Esto no sale de aquí, ¿verdad?','Alguien está borrando mensajes.'];
const EXTRA=[
 ['Inés agita un sobre. «Llegó a mi buzón y no tiene firma: quieren desalojar la biblioteca para abrir una oficina de campaña».',['Decir que el candidato odia los libros.','Preguntar en la biblioteca si el aviso es auténtico.','Guardar la carta y pedir acceso a la campaña.']],
 ['Tomás deja la regadera. «Ayer planté flores frente al comité. Hoy hay un cartel diciendo que las donó el presidente».',['Anunciar que el presidente roba hasta las flores.','Invitar a los vecinos a reconocer el trabajo de Tomás.','Ofrecerle publicidad si te presenta al comité.']],
 ['Vera tiene dos notas de prensa. «Las dos prometen inaugurar la misma escuela. Una es de hace diez años».',['Asegurar que la escuela es una fachada.','Pedir una visita pública a las instalaciones.','Negociar acceso al archivo a cambio de silencio.']],
 ['Nico enseña una foto borrosa. «¿Ese no es el tesorero entrando al casino? O es mi tío. Se parecen mucho».',['Publicar que el tesorero apuesta los fondos.','Comprobar quién aparece en la foto.','Pedir una entrevista al tesorero antes de publicarla.']],
 ['Rosa cruza los brazos. «El concurso de balcones lo ganó el primo del jurado. ¡Si su balcón es una antena y dos calcetines!».',['Decir que el concurso entero está comprado.','Organizar una votación vecinal con fotos públicas.','Prometer una revancha si Rosa te consigue apoyos.']],
 ['Elena baja el volumen de la radio. «Me pidieron borrar un mensaje sobre la próxima votación. No he tocado nada todavía».',['Filtrar que están amañando la votación.','Conservar el mensaje y solicitar una explicación.','Intercambiar el mensaje por un asiento en la reunión.']],
 ['Saúl te muestra su teléfono. «En el grupo hay alguien que reenvía todo. Ayer inventé una historia y hoy salió en la radio».',['Señalar a tu rival como responsable.','Comparar los mensajes y buscar el origen.','Ofrecer investigar si te hacen administradora.']],
 ['Julia mira a ambos lados. «Me invitaron a una reunión secreta. El problema es que invitaron también a otras doscientas personas».',['Anunciar una conspiración de doscientos miembros.','Ir a escuchar antes de sacar conclusiones.','Conseguir invitaciones para tus aliados.']]
];
const fresh=()=>({version:3,lives:3,coins:50,upgrades:[],zone:0,x:40,y:56,influence:18,trust:65,heat:8,resolved:{},history:[],decisions:0,finished:false,rumor:0,favors:0});
let state=fresh();
try{const s=JSON.parse(localStorage.getItem('dona-open-v3'));if(s&&s.version===3&&Number.isInteger(s.zone)&&s.zone>=0&&s.zone<5&&['x','y','influence','trust','heat','decisions','rumor','favors'].every(k=>Number.isFinite(s[k]))&&Array.isArray(s.history)&&s.resolved&&typeof s.resolved==='object')state=s}catch{}
let buildings=[],npcs=[],worldW=0,worldH=0,route=[],keys=new Set(),camera={x:0,y:0},active=null,near=null,clock=0,lastTime=0,toastUntil=0,autoTalk=null,walkFrame=0,lastSave=0,particles=[],mapTarget=null;
const canvas=$('map'),ctx=canvas.getContext('2d'),CELL=16,SPEED=112;
const movementSpeed=()=>SPEED*(state.upgrades?.includes('shoes')?1.35:1);
const stopped=()=>state.finished||(state.lives??3)<=0;
const required=()=>3+state.zone;
let resolvedCount=()=>Object.keys(state.resolved).filter(k=>k.startsWith(state.zone+':')).length;
const gate=()=>({x:worldW-40,y:worldH-40});
function audioScene(mode){window.GameAudio?.setScene({mode:mode||(active?.type==='npc'&&[1,4].includes(active.id)?'shop':active?.type==='npc'?'dialogue':'map'),heat:state.heat});}
function save(){try{state.updatedAt=new Date().toISOString();localStorage.setItem('dona-open-v3',JSON.stringify(state));$('save-status').textContent='✓ Autoguardado'}catch{$('save-status').textContent='Guardado no disponible en este navegador'}}
function notify(text){$('toast').textContent=text;$('toast').classList.add('visible');toastUntil=clock+5}
function solid(x,y){return x<12||y<12||x>worldW-12||y>worldH-12||buildings.some(b=>x>b.x-7&&x<b.x+b.w+7&&y>b.y-7&&y<b.y+b.h+7)}
function buildWorld(){
 const n=3+state.zone;worldW=n*160+80;worldH=n*160+80;buildings=[];npcs=[];route=[];autoTalk=null;active=null;near=null;particles=[];mapTarget=null;
 for(let row=0;row<n;row++)for(let col=0;col<n;col++){const id=row*n+col;buildings.push({x:80+col*160,y:80+row*160,w:80+(id%3)*8,h:64+(id%2)*16,type:id%5,id});}
 const count=6+state.zone*2;
 for(let i=0;i<count;i++){const b=buildings[(i*(n+1)+Math.floor(i/n))%buildings.length];let x=b.x+24,y=b.y+b.h+24;
 // Spread neighbors along different blocks rather than stacking them.
 if(npcs.some(p=>Math.hypot(p.homeX-x,p.homeY-y)<30)){const other=buildings.find(a=>!npcs.some(p=>Math.hypot(p.homeX-(a.x+24),p.homeY-(a.y+a.h+24))<30));if(other){x=other.x+24;y=other.y+other.h+24}}
 npcs.push({id:i,name:NAMES[i],color:COLORS[i],x,y,homeX:x,homeY:y,bubbleUntil:0,bubble:'',greeted:false});}
 if(solid(state.x,state.y)){state.x=40;state.y=56}
 canvas.setAttribute('aria-label',`${ZONES[state.zone]}, mapa abierto con ${npcs.length} vecinos. Flechas o WASD para caminar, E para hablar. También hay botones de vecinos para caminar hasta ellos.`);
}
function ui(){
 $('chapter').textContent=`ZONA ${state.zone+1} DE 5 · BARRIO ABIERTO`;$('zone-title').textContent=ZONES[state.zone];
 $('stats').innerHTML=[['Influencia','influence'],['Confianza','trust'],['Sospecha','heat']].map(([name,k])=>`<div class="stat"><div class="stat-label">${name}<b>${state[k]}</b></div><div class="bar"><i style="width:${state[k]}%"></i></div></div>`).join('');
 const count=resolvedCount(),open=count>=required();$('objective').textContent=open?'◆ Salida abierta · esquina sureste':`✦ Habla con ${required()} vecinos · ${count}/${required()}`;
 $('mission').textContent=open?'Ya tienes contactos suficientes. Busca la salida dorada al sureste o sigue recorriendo el barrio.':`Necesitas ${required()-count} contactos más para que te abran la salida. Busca las burbujas y decide qué contar.`;
 $('people').replaceChildren();for(const p of npcs){const b=document.createElement('button');b.className='person';b.innerHTML=`<i style="background:${p.color}"></i><span>${p.name}</span><span>${state.resolved[state.zone+':'+p.id]!==undefined?'✓':'↗'}</span>`;b.setAttribute('aria-label',`Caminar hasta ${p.name}`);b.onclick=()=>{if($('journal').open)$('journal').close();walkToNPC(p)};$('people').append(b)}
 $('log').replaceChildren();(state.history.length?state.history.slice(-4).reverse():['Puri te está esperando al otro lado de las primeras casas.']).forEach(t=>{const p=document.createElement('div');p.className='log-item';p.textContent=t;$('log').append(p)});
}
function findPath(tx,ty){
 const cols=Math.ceil(worldW/CELL),rows=Math.ceil(worldH/CELL),start={x:Math.floor(state.x/CELL),y:Math.floor(state.y/CELL)},goal={x:Math.floor(tx/CELL),y:Math.floor(ty/CELL)};
 if(goal.x<0||goal.y<0||goal.x>=cols||goal.y>=rows||solid(goal.x*CELL+8,goal.y*CELL+8))return [];
 const key=(x,y)=>y*cols+x,queue=[start],parents=new Map([[key(start.x,start.y),null]]);let found=false;
 for(let i=0;i<queue.length;i++){const at=queue[i];if(at.x===goal.x&&at.y===goal.y){found=true;break}for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){const x=at.x+dx,y=at.y+dy,k=key(x,y);if(x<0||y<0||x>=cols||y>=rows||parents.has(k)||solid(x*CELL+8,y*CELL+8))continue;parents.set(k,at);queue.push({x,y})}}
 if(!found)return [];let cursor=goal,path=[];while(cursor){path.push({x:cursor.x*CELL+8,y:cursor.y*CELL+8});cursor=parents.get(key(cursor.x,cursor.y))}return path.reverse().filter(p=>!solid(p.x,p.y));
}
function walkToNPC(p){if(active||stopped())return;route=findPath(p.homeX,p.homeY+16);if(!route.length){notify('No hay camino hasta ese lugar. Prueba desde otra calle.');return}autoTalk=p.id;mapTarget={x:p.homeX,y:p.homeY+16};canvas.focus();}
function eventFor(p){if(p.id<6)return localTalk[p.id];return EXTRA[p.id-6]}
function openTalk(p){if(active||stopped())return;if(Math.hypot(state.x-p.x,state.y-p.y)>55){walkToNPC(p);return}route=[];autoTalk=null;keys.clear();active={type:'npc',id:p.id};$('dialog').hidden=false;$('interact').hidden=true;$('speaker').textContent=p.name+' · '+(state.resolved[state.zone+':'+p.id]===undefined?'ENTRE VECINOS':'YA NOS CONOCEMOS');$('choices').replaceChildren();
 const done=state.resolved[state.zone+':'+p.id];
 if(done!==undefined){$('dialog-text').textContent=['«Tu versión ya llegó a la radio. Espero que sepas lo que haces».','«Gracias por escuchar. Si necesitas apoyo, sabes dónde estoy».','«No olvides que los favores se devuelven, Meche».'][done];addOption('Seguir caminando',closeTalk);}
 else{const event=eventFor(p);$('dialog-text').textContent=event[0].replace(/^[^«]*«/,'«');event[1].forEach((text,i)=>addOption(text,()=>decide(p,i)))}
 audioScene();window.GameAudio?.speak($('dialog-text').textContent,p.id);
 $('close-dialog').focus();
}
function addOption(text,fn){const b=document.createElement('button');b.className='choice';const s=document.createElement('strong');s.textContent=text;b.append(s);b.onclick=fn;$('choices').append(b)}
function closeTalk(){active=null;$('dialog').hidden=true;keys.clear();window.GameAudio?.stopSpeech();audioScene();canvas.focus();}
function decide(p,i){if(!active||active.type!=='npc'||active.id!==p.id||state.resolved[state.zone+':'+p.id]!==undefined)return;
 const changes=[[11,-12,23],[5,9,-16],[8,-4,11]][i];state.influence=Math.max(0,Math.min(100,state.influence+changes[0]));state.trust=Math.max(0,Math.min(100,state.trust+changes[1]));state.heat=Math.max(0,Math.min(100,state.heat+changes[2]));state.resolved[state.zone+':'+p.id]=i;state.decisions++;if(i===0)state.rumor++;if(i===2)state.favors++;
 const replies=['«¡Pero yo no dije eso! Bueno… ahora ya lo oyó todo el barrio».','«Por fin alguien que escucha antes de hablar. Cuenta conmigo».','«Trato hecho. Te presentaré a alguien, pero me debes una».'];
 p.bubble=replies[i];p.bubbleUntil=clock+8;
 state.history.push(`${p.name}: ${['difundiste una versión explosiva','ganaste su confianza','negociaste un favor'][i]}.`);
 if(i===0){for(const other of npcs){if(other.id!==p.id&&Math.hypot(other.x-p.x,other.y-p.y)<300){other.bubble='¿Cómo que hay un escándalo?';other.bubbleUntil=clock+6}}for(let k=0;k<12;k++)particles.push({x:p.x,y:p.y-20,vx:(Math.random()-.5)*70,vy:-20-Math.random()*30,life:2,color:'#efc272'})}
 $('speaker').textContent=p.name+' · CONSECUENCIAS';$('dialog-text').textContent=replies[i]+` Influencia ${changes[0]>0?'+':''}${changes[0]} · confianza ${changes[1]>0?'+':''}${changes[1]} · sospecha ${changes[2]>0?'+':''}${changes[2]}.`;$('choices').replaceChildren();audioScene(i===0?'rumor':i===2?'revelation':undefined);window.GameAudio?.speak($('dialog-text').textContent,p.id);addOption('Volver al barrio',()=>{closeTalk();if(stopped())showEnding();else if(resolvedCount()===required())notify('¡Te abrieron la salida! Busca el arco dorado al sureste.');});save();ui();
}
function openGate(){if(active||stopped())return;if(resolvedCount()<required()){notify(`Aún necesitas ${required()-resolvedCount()} contactos. El barrio tiene que conocerte primero.`);return}active={type:'gate'};route=[];keys.clear();$('dialog').hidden=false;$('speaker').textContent='EL OTRO LADO DEL BARRIO';$('dialog-text').textContent=state.zone===4?'La asamblea está al otro lado. Cada conversación te trajo hasta aquí. ¿Lista para reclamar tu lugar?':`Al otro lado está ${ZONES[state.zone+1]}. El próximo mapa es más grande y tiene más vecinos. ¿Te vas o te queda un chisme pendiente?`;$('choices').replaceChildren();addOption(state.zone===4?'Entrar en la asamblea':'Viajar a '+ZONES[state.zone+1],advance);addOption('Me quedo un rato más',closeTalk);audioScene('revelation');window.GameAudio?.speak($('dialog-text').textContent,0);$('close-dialog').focus()}
function advance(){if(!active||active.type!=='gate'||resolvedCount()<required())return;closeTalk();if(state.zone===4){state.finished=true;save();showEnding();return}state.zone++;state.x=40;state.y=56;buildWorld();ui();save();audioScene();notify('Nuevo barrio. Más calles, más historias y una salida al sureste.');}
function showEnding(){route=[];keys.clear();active={type:'ending'};$('dialog').hidden=false;$('speaker').textContent='EPÍLOGO · '+ZONES[state.zone];let title,body;
 if(state.heat>=100){title='El barrio te pilló.';body='Tus versiones se contradicen. Los vecinos comparten las pruebas y tu red se derrumba. El mundo tendrá que esperar.'}
 else if(state.trust<=0){title='Ya nadie te cree.';body='Tu nombre circula por todas partes, pero nadie quiere ponerse de tu lado.'}
 else if(state.trust>=65&&state.heat<60){title='La presidenta de la sobremesa mundial.';body='Llegaste al poder con una red de vecinos, aliados y gente dispuesta a escucharte. Puri exige una cafetera en cada embajada.'}
 else{title='Su Excelencia, la Chismísima.';body='Tus rumores y favores te llevan a la silla mundial. Ahora tendrás que gobernar a gente que también sabe guardar secretos.'}
 $('dialog-text').textContent=title+' '+body+` Tomaste ${state.decisions} decisiones.`;$('choices').replaceChildren();addOption('Volver a empezar en Las Gardenias',restart);$('close-dialog').hidden=true;audioScene(state.heat>=100||state.trust<=0?'failure':'map');window.GameAudio?.speak($('dialog-text').textContent,0);}
function restart(){state=fresh();active=null;keys.clear();$('dialog').hidden=true;$('close-dialog').hidden=false;buildWorld();ui();save();window.GameAudio?.stopSpeech();audioScene();notify('Bienvenida al barrio. Puri tiene algo que contarte.');canvas.focus();}
function move(dx,dy){const before={x:state.x,y:state.y};if(!solid(state.x+dx,state.y))state.x+=dx;if(!solid(state.x,state.y+dy))state.y+=dy;return Math.hypot(before.x-state.x,before.y-state.y)}
function interact(){if(active||stopped())return;if(near?.type==='gate')openGate();else if(near?.type==='npc')openTalk(npcs.find(p=>p.id===near.id));else notify('Acércate a un vecino o toca su nombre en el cuaderno.');}
function update(dt){
 if(toastUntil<clock)$('toast').classList.remove('visible');
 if(!active&&!stopped()&&!window.gamePaused?.()){
 let dx=(keys.has('arrowright')||keys.has('d')?1:0)-(keys.has('arrowleft')||keys.has('a')?1:0),dy=(keys.has('arrowdown')||keys.has('s')?1:0)-(keys.has('arrowup')||keys.has('w')?1:0);
 if(dx||dy){route=[];autoTalk=null;mapTarget=null;const wx=dx/.8660254+dy/.5,wy=dy/.5-dx/.8660254,norm=Math.hypot(wx,wy);walkFrame+=move(wx/norm*movementSpeed()*dt,wy/norm*movementSpeed()*dt)}
 else if(route.length){const next=route[0],vx=next.x-state.x,vy=next.y-state.y,dist=Math.hypot(vx,vy);if(dist<3){if(!solid(next.x,next.y)){state.x=next.x;state.y=next.y}route.shift();}else{const step=Math.min(dist,movementSpeed()*dt),moved=move(vx/dist*step,vy/dist*step);walkFrame+=moved;if(moved<.01){route=[];autoTalk=null}}}
 if(!route.length&&autoTalk!==null){const p=npcs.find(p=>p.id===autoTalk);autoTalk=null;if(p)openTalk(p)}
 }
 for(const p of npcs){p.x=p.homeX+Math.sin(clock*.7+p.id*2)*6;p.y=p.homeY+Math.cos(clock*.5+p.id)*3;
 if(!p.greeted&&Math.hypot(state.x-p.x,state.y-p.y)<130){p.greeted=true;p.bubble=HINTS[p.id];p.bubbleUntil=clock+6}
 if(p.bubbleUntil<clock&&Math.floor(clock*2)%17===p.id&&Math.hypot(state.x-p.x,state.y-p.y)<330){const result=state.resolved[state.zone+':'+p.id];p.bubble=result===undefined?HINTS[p.id]:result===1?'Con Meche se puede hablar.':state.rumor>0?'Por aquí corre un chisme…':'Los favores no se olvidan.';p.bubbleUntil=clock+4}
 }
 near=null;let min=55;for(const p of npcs){const d=Math.hypot(state.x-p.x,state.y-p.y);if(d<min){near={type:'npc',id:p.id};min=d}}if(Math.hypot(state.x-gate().x,state.y-gate().y)<50)near={type:'gate'};
 $('interact').hidden=!near||!!active||stopped();if(near)$('interact').textContent=near.type==='gate'?'E · Salir del barrio':'E · Hablar con '+npcs.find(p=>p.id===near.id).name;
 const camW=Math.min(720,worldW),camH=camW*canvas.height/canvas.width;camera.x=Math.max(0,Math.min(worldW-camW,state.x-camW/2));camera.y=Math.max(0,Math.min(Math.max(0,worldH-camH),state.y-camH/2));camera.w=camW;camera.h=camH;
 $('position').textContent=Math.hypot(state.x-gate().x,state.y-gate().y)<90?'◆ SALIDA CERCA':'SALIDA ↘';
 particles=particles.filter(p=>p.life>0);for(const p of particles){p.x+=p.vx*dt;p.y+=p.vy*dt;p.life-=dt}
 if(clock-lastSave>3&&!active){save();lastSave=clock}
}
function drawPerson(p,isPlayer=false){const x=Math.round(p.x),y=Math.round(p.y),step=isPlayer?Math.sin(walkFrame*.25)*2:Math.sin(clock*2+p.id)*.5;r(x-6,y+2,13,4,'#23372c66');r(x-4,y-15,8,8,'#d4af8a');r(x-5,y-18,10,5,isPlayer?'#dedac4':'#5b4935');r(x-6,y-7,12,10,isPlayer?'#9c4b80':p.color);r(x-5,y+3,3,4+step,'#303b33');r(x+2,y+3,3,4-step,'#303b33');r(x-1,y-12,1,1,'#392f2b');r(x+3,y-12,1,1,'#392f2b');if(isPlayer){r(x-6,y-14,13,1,'#7e7460');r(x+6,y-4,4,7,'#b49a5c')} }
function r(x,y,w,h,color){ctx.fillStyle=color;ctx.fillRect(x,y,w,h)}
function bubble(text,x,y,highlight=false){ctx.font='12px monospace';const words=text.split(' '),lines=[];let line='';for(const word of words){if(ctx.measureText(line+word).width>185&&line){lines.push(line.trim());line=''}line+=word+' '}if(line)lines.push(line.trim());const w=Math.max(...lines.map(l=>ctx.measureText(l).width))+20,h=lines.length*17+15;const bx=Math.max(camera.x+5,Math.min(camera.x+camera.w-w-5,x-w/2)),by=Math.max(camera.y+35,y-h-30);r(bx+2,by+2,w,h,'#14221b99');r(bx,by,w,h,highlight?'#eee1ac':'#e1e6c5');ctx.strokeStyle='#34482e';ctx.lineWidth=2;ctx.strokeRect(bx,by,w,h);r(x-3,by+h,7,4,highlight?'#eee1ac':'#e1e6c5');r(x-1,by+h+4,3,3,highlight?'#eee1ac':'#e1e6c5');ctx.fillStyle='#2b3b2d';lines.forEach((l,i)=>ctx.fillText(l,bx+10,by+17+i*17))}
function tree(x,y){r(x-2,y,5,15,'#665037');r(x-13,y-20,25,24,'#244a37');r(x-9,y-25,18,29,'#2d6240');r(x-7,y-21,11,16,'#47814a');r(x-4,y-20,5,5,'#6a9a51')}
function draw(){
 ctx.imageSmoothingEnabled=false;ctx.setTransform(1,0,0,1,0,0);r(0,0,960,600,'#294533');const scale=canvas.width/camera.w;ctx.setTransform(scale,0,0,scale,-camera.x*scale,-camera.y*scale);
 r(0,0,worldW,worldH,'#64804b');for(let y=Math.floor(camera.y/16)*16;y<camera.y+camera.h;y+=16)for(let x=Math.floor(camera.x/16)*16;x<camera.x+camera.w;x+=16){r(x+3,y+5,2,2,'#8ba35e');r(x+10,y+12,1,2,'#4f713f')}
 for(let k=40;k<worldW;k+=160){r(k-17,0,34,worldH,'#a4a589');r(k-12,0,24,worldH,'#5e6860');for(let y=0;y<worldH;y+=20)r(k-1,y,2,7,'#c5c19a')}
 for(let k=40;k<worldH;k+=160){r(0,k-17,worldW,34,'#a4a589');r(0,k-12,worldW,24,'#5e6860');for(let x=0;x<worldW;x+=20)r(x,k-1,7,2,'#c5c19a')}
 // Footpaths connect every front door to the street.
 for(const b of buildings){r(b.x+18,b.y+b.h,12,200-(b.y%160)-b.h,'#9ca47d');r(b.x+5,b.y+7,b.w,b.h,'#283e2c55');r(b.x,b.y,b.w,b.h,'#3b4433');r(b.x+3,b.y+3,b.w-6,b.h-5,['#c5b78e','#acb4a1','#c1a47c','#bcc1ac','#bb9980'][b.type]);
 if(b.type===1){r(b.x-4,b.y-7,b.w+8,12,'#3f4b40');r(b.x,b.y-5,b.w,7,'#869084')}else{for(let k=0;k<18;k++)r(b.x-7+k*2,b.y-k,b.w+14-k*4,2,k%3===0?'#c98453':'#9f5d3c')}
 for(let row=0;row<2;row++)for(let col=0;col<3;col++){r(b.x+10+col*23,b.y+12+row*21,12,13,'#475e54');r(b.x+12+col*23,b.y+14+row*21,4,5,'#b2c5a1');r(b.x+10+col*23,b.y+24+row*21,12,2,'#d8c59b')}
 r(b.x+20,b.y+b.h-22,15,22,'#594936');r(b.x+22,b.y+b.h-20,11,18,'#756046');r(b.x+30,b.y+b.h-11,2,2,'#d4bf79');if(b.id%3===0){r(b.x-3,b.y+9,b.w+6,10,'#46694c');ctx.fillStyle='#e2d2a2';ctx.font='8px monospace';ctx.fillText(['PANADERÍA','RADIO PATIO','PELUQUERÍA'][Math.floor(b.id/3)%3],b.x+3,b.y+17)}tree(b.x+b.w+25,b.y+20);tree(b.x+b.w+24,b.y+63);
 }
 const g=gate(),open=resolvedCount()>=required();r(g.x-24,g.y-25,6,43,open?'#ddc16d':'#7d8061');r(g.x+18,g.y-25,6,43,open?'#ddc16d':'#7d8061');r(g.x-24,g.y-28,48,8,open?'#f1d989':'#8d9271');if(!open){for(let x=-15;x<18;x+=8)r(g.x+x,g.y-18,3,33,'#565e4b')}ctx.font='9px monospace';ctx.fillStyle='#eee6bc';ctx.fillText('SALIDA',g.x-17,g.y-33);
 if(route.length){ctx.fillStyle='#e4d79a88';for(let i=0;i<route.length;i+=2){const p=route[i];ctx.fillRect(p.x-2,p.y-2,4,4)}}if(mapTarget&&route.length){ctx.strokeStyle='#e7d48a';ctx.strokeRect(mapTarget.x-7,mapTarget.y-7,14,14)}
 const actors=[...npcs,{x:state.x,y:state.y,player:true}].sort((a,b)=>a.y-b.y);for(const p of actors)drawPerson(p,!!p.player);
 for(const p of particles)r(p.x,p.y,3,3,p.color);
 for(const p of npcs){if(p.x<camera.x-30||p.x>camera.x+camera.w+30||p.y<camera.y-40||p.y>camera.y+camera.h+40)continue;ctx.font='9px monospace';ctx.fillStyle='#14221b';const nameW=ctx.measureText(p.name).width;r(p.x-nameW/2-3,p.y+10,nameW+6,12,'#d3d9b1');ctx.fillText(p.name,p.x-nameW/2,p.y+19);if(state.resolved[state.zone+':'+p.id]!==undefined){ctx.fillStyle='#e9d67f';ctx.fillText('✓',p.x+10,p.y-14)}if(!active&&p.bubbleUntil>clock)bubble(p.bubble,p.x,p.y,near?.id===p.id&&near.type==='npc');else if(!active&&Math.hypot(state.x-p.x,state.y-p.y)<150&&state.resolved[state.zone+':'+p.id]===undefined){r(p.x-2,p.y-35,4,10,'#f4d68b');r(p.x-2,p.y-23,4,3,'#f4d68b')}}
 ctx.setTransform(1,0,0,1,0,0);
 // A small compass/map keeps the exit visible even when the camera follows Meche.
 const mx=842,my=47,mw=100,mh=100;r(mx-5,my-5,mw+10,mh+10,'#14251de0');r(mx,my,mw,mh,'#577344');for(const b of buildings)r(mx+b.x/worldW*mw,my+b.y/worldH*mh,b.w/worldW*mw,b.h/worldH*mh,'#a2a57c');r(mx+state.x/worldW*mw-2,my+state.y/worldH*mh-2,4,4,'#ffdc89');r(mx+g.x/worldW*mw-2,my+g.y/worldH*mh-2,4,4,open?'#ffe49c':'#987b59');ctx.strokeStyle='#d4d4ac';ctx.lineWidth=1;ctx.strokeRect(mx+camera.x/worldW*mw,my+camera.y/worldH*mh,camera.w/worldW*mw,Math.min(mh,camera.h/worldH*mh));
}
function frame(time){const dt=Math.min(.04,(time-lastTime)/1000||.016);lastTime=time;clock+=dt;update(dt);draw();requestAnimationFrame(frame)}
canvas.addEventListener('pointerdown',e=>{canvas.focus();if(active||stopped())return;const b=canvas.getBoundingClientRect(),x=camera.x+(e.clientX-b.left)/b.width*camera.w,y=camera.y+(e.clientY-b.top)/b.height*camera.h;const p=npcs.find(p=>Math.hypot(x-p.x,y-p.y)<24);if(p){walkToNPC(p);return}if(Math.hypot(x-gate().x,y-gate().y)<32&&Math.hypot(state.x-gate().x,state.y-gate().y)<50){openGate();return}route=findPath(x,y);autoTalk=null;mapTarget={x,y};if(!route.length)notify('Esa es una casa o un jardín cerrado. Haz clic en una calle o en un vecino.');});
document.addEventListener('credits-open',()=>{keys.clear();route=[];autoTalk=null;});
window.addEventListener('keydown',e=>{if(window.gamePaused?.())return;if(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA')return;const k=e.key.toLowerCase();if(k==='escape'){if(active){if(active.type!=='ending')closeTalk()}else window.openGameMenu?.();return}if(active)return;if(['arrowup','arrowdown','arrowleft','arrowright','w','a','s','d','e',' '].includes(k)){e.preventDefault();if(k==='e'||k===' '){if(!e.repeat)interact()}else keys.add(k)}});
window.addEventListener('keyup',e=>keys.delete(e.key.toLowerCase()));window.addEventListener('blur',()=>{keys.clear();save()});document.addEventListener('visibilitychange',()=>{keys.clear();if(document.hidden)save()});
for(const b of document.querySelectorAll('[data-move]')){const key={up:'w',down:'s',left:'a',right:'d'}[b.dataset.move];b.addEventListener('pointerdown',e=>{e.preventDefault();b.setPointerCapture(e.pointerId);if(!active)keys.add(key)});for(const event of ['pointerup','pointercancel','lostpointercapture'])b.addEventListener(event,()=>keys.delete(key));}
$('interact').onclick=interact;$('touch-talk').onclick=interact;$('close-dialog').onclick=()=>{if(active?.type!=='ending')closeTalk()};$('restart').onclick=()=>{if(!state.decisions||confirm('¿Volver al principio? Se reemplazará esta partida.'))restart()};
buildWorld();ui();update(0);audioScene();if(stopped())showEnding();else notify('Camina con WASD o haz clic. Acércate a las burbujas para hablar.');requestAnimationFrame(frame);


