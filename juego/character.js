'use strict';
// Meche: 24 × 40 píxeles, paleta corta, moño, gafas, flores y escoba.
const MECHE_PALETTE={outline:'#263638',hair:'#b8bfba',hairLight:'#e0e1cb',hairDark:'#7f9190',skin:'#d8ad77',skinLight:'#efd19a',dress:'#593d64',dressLight:'#7d527e',pink:'#e3a7a0',gold:'#d6b878',blue:'#5e8fbc',glass:'#b2d3d2',shoe:'#e4dec3',broom:'#ad8959'};
const heroineFrames=new Map();
function heroineSprite(direction='front',frame=0,gesture=false){const key=direction+frame+gesture;if(heroineFrames.has(key))return heroineFrames.get(key);const sprite=document.createElement('canvas');sprite.width=24;sprite.height=40;const c=sprite.getContext('2d'),P=MECHE_PALETTE,p=(x,y,w,h,k)=>{c.fillStyle=P[k]||k;c.fillRect(Math.round(x),Math.round(y),w,h)};
 const step=frame===1?1:frame===3?-1:0,side=direction==='left'||direction==='right',back=direction==='back';
 if(direction==='left'){c.translate(24,0);c.scale(-1,1)}
 // Moño y masa de pelo: tres tonos, sin textura minúscula.
 p(9,0,7,1,'outline');p(7,1,10,5,'outline');p(9,1,6,4,'hair');p(10,1,3,2,'hairLight');p(8,5,10,2,'hairDark');p(6,6,13,11,'outline');p(7,6,11,5,'hair');p(8,6,6,2,'hairLight');
 p(5,11,15,6,'outline');p(6,11,13,6,'skin');p(7,9,11,9,'skinLight');p(9,17,7,3,'skin');p(7,10,2,3,'hairDark');p(17,9,2,7,'hair');
 if(back){p(6,8,13,10,'hair');p(7,8,9,3,'hairLight');p(7,16,11,2,'hairDark')}
 else if(side){p(17,12,3,3,'skinLight');p(14,11,5,1,'blue');p(15,12,3,3,'glass');p(14,12,1,4,'blue');p(18,12,1,4,'blue');p(15,15,4,1,'blue');p(17,16,2,1,'dressLight')}
 else{p(6,11,6,1,'blue');p(13,11,6,1,'blue');p(6,12,1,4,'blue');p(11,12,1,4,'blue');p(13,12,1,4,'blue');p(18,12,1,4,'blue');p(7,15,5,1,'blue');p(14,15,5,1,'blue');p(7,12,4,3,'glass');p(14,12,4,3,'glass');p(8,13,1,1,'outline');p(15,13,1,1,'outline');p(12,12,1,1,'blue');p(10,17,5,1,'dressLight');p(10,17,3,1,'#a6755d');p(6,16,1,1,'gold');p(18,16,1,1,'gold')}
 // Vestido floral de silueta ancha: flores en grupos de 2–3 píxeles.
 p(8,20,10,2,'outline');p(7,22,12,4,'outline');p(6,26,14,7,'outline');p(5,31,16,3,'outline');p(8,21,9,5,'dress');p(7,25,11,5,'dress');p(6,30,14,3,'dress');p(8,23,2,2,'dressLight');
 for(const [x,y] of [[10,23],[15,25],[8,28],[13,30],[17,32]]){p(x,y,2,1,'pink');p(x+1,y-1,1,3,'pink');p(x+1,y,1,1,'gold')}
 if(!back){p(10,20,5,1,'gold');p(12,21,1,2,'gold')}
 const raised=gesture?(frame%2?4:6):0;p(5,22-raised,3,7,'outline');p(5,23-raised,2,6,'skin');p(18,23,3,6,'outline');p(19,24,2,5,'skin');
 p(8,34+step,3,3,'skin');p(15,34-step,3,3,'skin');p(7,37+step,5,2,'outline');p(14,37-step,6,2,'outline');p(7,36+step,5,2,'shoe');p(14,36-step,6,2,'shoe');
 // Escoba al lado del cuerpo; acompaña el paso y la gesticulación.
 p(21,15+(gesture?-3:0),1,20,'outline');p(22,15+(gesture?-3:0),1,21,'broom');p(20,33,4,6,'outline');p(20,33,3,5,'gold');p(21,34,1,5,'broom');p(23,34,1,5,'broom');
 heroineFrames.set(key,sprite);return sprite;
}
let heroineDirection='front',heroineLast={x:state.x,y:state.y},heroineMotion=0;
const baseIsoPerson=isoPerson;isoPerson=function(p,player){if(!player){baseIsoPerson(p,false);return}const dx=state.x-heroineLast.x,dy=state.y-heroineLast.y;if(Math.abs(dx)+Math.abs(dy)>.01){const sx=dx-dy,sy=(dx+dy)*.5;heroineDirection=Math.abs(sx)>Math.abs(sy)*1.4?(sx>0?'right':'left'):(sy>0?'front':'back');heroineMotion=clock+.12}heroineLast={x:state.x,y:state.y};const frame=reducedMotion()?0:clock<heroineMotion?Math.floor(walkFrame/9)%4:Math.floor(clock*2)%2;const gesture=!!active&&active.type==='npc';const sprite=heroineSprite(heroineDirection,frame,gesture);plane(p.x-6,p.y-3,17,13,.5,'#183b3266');const point=project(p.x,p.y);ctx.imageSmoothingEnabled=false;const scale=isoZoom*.95;ctx.drawImage(sprite,point.x-12*scale,point.y-37*scale,24*scale,40*scale)};
function drawHeroinePreview(){const portrait=$('heroine-preview');if(!portrait)return;const c=portrait.getContext('2d');c.clearRect(0,0,portrait.width,portrait.height);c.imageSmoothingEnabled=false;const frame=reducedMotion()?0:Math.floor(clock*2)%2;c.drawImage(heroineSprite('front',frame,true),16,10,144,240);}
const characterDraw=draw;draw=function(){characterDraw();drawHeroinePreview()};
window.MecheSprite={sheet(){const sheet=document.createElement('canvas');sheet.width=24*4;sheet.height=40*4;const c=sheet.getContext('2d');['front','back','left','right'].forEach((dir,row)=>{for(let f=0;f<4;f++)c.drawImage(heroineSprite(dir,f),f*24,row*40)});return sheet},portrait(){const image=document.createElement('canvas');image.width=192;image.height=320;const c=image.getContext('2d');c.imageSmoothingEnabled=false;c.drawImage(heroineSprite('front',0,true),0,0,192,320);return image}};
// Silueta recortada por los edificios que realmente se dibujan delante del jugador.
const silhouetteSprites=new WeakMap(),silhouetteLayer=document.createElement('canvas');
let playerSilhouetteBounds=null;
function tintedHeroine(sprite){if(silhouetteSprites.has(sprite))return silhouetteSprites.get(sprite);const tint=document.createElement('canvas');tint.width=24;tint.height=40;const c=tint.getContext('2d');c.drawImage(sprite,0,0);c.globalCompositeOperation='source-in';c.fillStyle='#ffe3a0';c.fillRect(0,0,24,40);silhouetteSprites.set(sprite,tint);return tint}
window.drawPlayerOcclusion=function(mask){
 if(silhouetteLayer.width!==canvas.width||silhouetteLayer.height!==canvas.height){silhouetteLayer.width=canvas.width;silhouetteLayer.height=canvas.height}
 const c=silhouetteLayer.getContext('2d');c.clearRect(0,0,canvas.width,canvas.height);c.imageSmoothingEnabled=false;
 const frame=reducedMotion()?0:clock<heroineMotion?Math.floor(walkFrame/9)%4:Math.floor(clock*2)%2,sprite=heroineSprite(heroineDirection,frame,!!active&&active.type==='npc'),tint=tintedHeroine(sprite),point=project(state.x,state.y),scale=isoZoom*.95,x=point.x-12*scale,y=point.y-37*scale,w=24*scale,h=40*scale,outline=Math.max(2,Math.round(isoZoom));
 c.globalCompositeOperation='source-over';for(const [dx,dy] of [[-outline,0],[outline,0],[0,-outline],[0,outline]])c.drawImage(tint,x+dx,y+dy,w,h);
 c.globalCompositeOperation='destination-out';c.drawImage(sprite,x,y,w,h);c.globalCompositeOperation='source-over';c.globalAlpha=.48;c.drawImage(tint,x,y,w,h);c.globalAlpha=1;
 c.globalCompositeOperation='destination-in';c.drawImage(mask,0,0);c.globalCompositeOperation='source-over';ctx.drawImage(silhouetteLayer,0,0);
 playerSilhouetteBounds={x:Math.floor(x-outline),y:Math.floor(y-outline),w:Math.ceil(w+outline*2),h:Math.ceil(h+outline*2)};
};
