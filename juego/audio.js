'use strict';
// Los nombres de autor se conservan tal como figuran en los archivos entregados.
(() => {
 const TRACKS={
  morning:{title:'Morning',author:'Retoro BGM Chana',file:'assets/Music/Retoro BGM Chana-morning-516296.mp3',use:'Exploración del barrio'},
  shop:{title:'Shop',author:'retro-bgm-chan',file:'assets/Music/retro-bgm-chan-shop-516323.mp3',use:'Conversaciones con comerciantes'},
  enemy:{title:'Stupid Enemy',author:'retro-bgm-chan',file:'assets/Music/retro-bgm-chan-stupid-enemy-516330.mp3',use:'Enredos y rumores explosivos'},
  truth:{title:'Inconvenient Truth',author:'retro-bgm-chan',file:'assets/Music/retro-bgm-chan-inconvenient-truth-523658.mp3',use:'Sospechas, revelaciones y consecuencias'},
  bad:{title:'Bad Boy',author:'retro-bgm-chan',file:'assets/Music/retro-bgm-chan-bad-boy-523655.mp3',use:'Caída por escándalo o pérdida de confianza'}
 };
 const VOICES=[
  {title:'Medium Text Blip',author:'freesound_community',file:'assets/Dialogue/freesound_community-medium-text-blip-14855.mp3'},
  {title:'Esta combina con sus',author:'freesound_community',file:'assets/Dialogue/freesound_community-esta-combina-con-sus-81519.mp3'}
 ];
 const $=id=>document.getElementById(id),clamp=(n,fallback)=>Number.isFinite(Number(n))?Math.max(0,Math.min(1,Number(n))):fallback;
 let settings={music:.12,voices:.45};try{const saved=JSON.parse(localStorage.getItem('dona-audio-v1'));if(saved)settings={music:Math.min(.15,clamp(saved.music,.12)),voices:clamp(saved.voices,.45)}}catch{}
 let enabled=true,waitingForGesture=false,scene={mode:'map',heat:0},selected='morning',current=null,deck=0,generation=0,voiceTimer=null,cutTimer=null,voiceGeneration=0,speechIndex=0,speechActive=false,externalPlayer=null;
 const music=[new Audio(),new Audio()];music.forEach(a=>{a.loop=true;a.preload='none';a.volume=0});
 const voices=VOICES.map(v=>{const a=new Audio(encodeURI(v.file));a.preload='none';return a});
 let gains=[0,0],targets=[0,0];
 function persist(){try{localStorage.setItem('dona-audio-v1',JSON.stringify(settings))}catch{}}
 function status(text){$('audio-status').textContent=text}
 function chooseTrack(s){if(s.mode==='failure')return 'bad';if(s.mode==='rumor')return 'enemy';if(s.mode==='revelation'||s.heat>=65)return 'truth';if(s.mode==='shop'||s.mode==='dialogue')return 'shop';return 'morning'}
 function label(){const t=TRACKS[selected];$('now-playing').textContent=`${enabled?'♫':'○'} ${t.title} · ${t.author}`;$('audio-toggle').textContent=enabled?'Silenciar':'Activar sonido';$('audio-toggle').setAttribute('aria-pressed',String(enabled))}
 function silenceVoices(resume=true){voiceGeneration++;clearTimeout(voiceTimer);clearTimeout(cutTimer);voices.forEach(a=>{a.pause();a.currentTime=0});speechActive=false;if(resume&&enabled&&!document.hidden)startTrack()}
 function fail(error,token){if(token!==generation||!enabled)return;music.forEach(a=>a.pause());targets=[0,0];current=null;if(error?.name==='NotAllowedError'){waitingForGesture=true;status('Música activada. Comenzará con tu primer clic o tecla.')}else status('No se pudo reproducir el audio. Puedes volver a intentarlo.');label()}
 function startTrack(){label();if(!enabled||document.hidden||speechActive||externalPlayer&&!externalPlayer.paused)return;const t=TRACKS[selected];if(current===selected){if(music[deck].paused){const token=++generation;music[deck].play().then(()=>{if(token===generation){waitingForGesture=false;status('Sonido activado · música según la escena.')}}).catch(e=>fail(e,token));}return}
  const token=++generation,next=1-deck,a=music[next];music.forEach(track=>track.pause());gains=[0,0];targets=[0,0];a.src=encodeURI(t.file);a.currentTime=0;a.volume=0;gains[next]=0;targets=[0,0];targets[next]=1;deck=next;current=selected;
  a.play().then(()=>{if(token!==generation)return;waitingForGesture=false;status('Sonido activado · música según la escena.');}).catch(e=>fail(e,token));
 }
 function setScene(next){scene={...next};selected=chooseTrack(scene);startTrack()}
 function setEnabled(value){enabled=value;if(externalPlayer)externalPlayer.muted=!enabled;waitingForGesture=false;if(enabled)startTrack();else{generation++;music.forEach(a=>a.pause());gains=[0,0];targets=[0,0];current=null;silenceVoices();status('Sonido silenciado.')}label()}
 // Breves fragmentos de los dos samples, sin reproducirlos en bucle continuo.
 function speak(text,character=0){silenceVoices(false);if(!enabled||document.hidden||settings.voices===0){startTrack();return}speechActive=true;generation++;music.forEach(a=>a.pause());const a=voices[Math.abs(character)%voices.length],count=Math.max(3,Math.min(12,Math.ceil(text.length/22))),token=voiceGeneration;speechIndex=0;
  function blip(){if(token!==voiceGeneration||!enabled||document.hidden)return;a.pause();a.currentTime=0;a.volume=settings.voices;speechIndex++;a.play().catch(()=>{if(token===voiceGeneration)status('El sonido de diálogo no está disponible.');});cutTimer=setTimeout(()=>{if(token!==voiceGeneration)return;a.pause();if(speechIndex===count){speechActive=false;startTrack()}},65);if(speechIndex<count)voiceTimer=setTimeout(blip,115)}blip();
 }
 setInterval(()=>{for(let i=0;i<2;i++){const target=enabled&&!document.hidden&&!speechActive&&(!externalPlayer||externalPlayer.paused)?targets[i]:0;gains[i]+=Math.sign(target-gains[i])*Math.min(.1,Math.abs(target-gains[i]));music[i].volume=Math.max(0,Math.min(1,gains[i]*settings.music));if(gains[i]===0&&targets[i]===0&&!music[i].paused)music[i].pause()}},50);
 $('audio-toggle').onclick=()=>setEnabled(!enabled);
 for(const [id,key] of [['music-volume','music'],['voice-volume','voices']]){$(id).value=settings[key]*100;$(id).oninput=()=>{settings[key]=clamp($(id).value/100,0);if(key==='voices'&&settings.voices===0)silenceVoices();persist()}}
 $('audio-credits').onclick=()=>{silenceVoices();$('credits').showModal();document.dispatchEvent(new Event('credits-open'))};
 $('close-credits').onclick=()=>$('credits').close();
 const list=$('credits-list');for(const item of [...Object.values(TRACKS),...VOICES]){const row=document.createElement('li'),title=document.createElement('strong'),author=document.createElement('span'),file=document.createElement('code');title.textContent=item.title;author.textContent=`${item.author}${item.use?' · '+item.use:' · Sonido de diálogo'}`;file.textContent=item.file;row.append(title,author,file);list.append(row)}
 document.addEventListener('visibilitychange',()=>{if(document.hidden){generation++;externalPlayer?.pause();music.forEach(a=>a.pause());silenceVoices()}else if(enabled)startTrack()});
 window.addEventListener('pagehide',()=>{externalPlayer?.pause();music.forEach(a=>a.pause());silenceVoices(false)});
 function unlockOnGesture(event){if(!enabled||!waitingForGesture||event.target?.closest?.('#audio-toggle'))return;startTrack()}
 document.addEventListener('pointerdown',unlockOnGesture);document.addEventListener('keydown',unlockOnGesture);
 function claimMedia(player){silenceVoices(false);if(externalPlayer&&externalPlayer!==player)externalPlayer.pause();externalPlayer=player;player.muted=!enabled;player.volume=settings.voices;generation++;music.forEach(a=>a.pause())}
 function releaseMedia(player){if(externalPlayer!==player)return;externalPlayer=null;startTrack()}
 window.GameAudio={setScene,speak,stopSpeech:silenceVoices,claimMedia,releaseMedia};status('Música activada a volumen bajo.');startTrack();
})();
