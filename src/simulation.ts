export type Stage = 'void'|'face'|'galaxy'|'word';
export const stages:Stage[]=['void','face','galaxy','word'];
export const nextStage=(s:Stage):Stage=>stages[(stages.indexOf(s)+1)%stages.length];
export const random=(id:number,seed=0)=>{const x=Math.sin(id*127.1+seed*311.7)*43758.5453;return x-Math.floor(x)};
const gauss=(x:number,y:number,cx:number,cy:number,wx:number,wy:number)=>Math.exp(-((x-cx)**2/wx+(y-cy)**2/wy));
export function faceRelief(x:number,y:number){
 const eye=gauss(Math.abs(x),y,.60,.52,.080,.040);
 const brow=gauss(Math.abs(x),y,.63,.82,.15,.028);
 const cheek=gauss(Math.abs(x),y,.93,-.03,.11,.14);
 const bridge=gauss(x,y,0,.36,.034,.34);
 const tip=gauss(x,y,0,-.15,.075,.053);
 const nostril=gauss(Math.abs(x),y,.22,-.27,.012,.013);
 const lips=gauss(x,y,0,-.77,.27,.042);
 const mouth=gauss(x,y,0,-.77,.29,.005);
 const chin=gauss(x,y,0,-1.25,.30,.16);
 return -.47*eye+.20*brow+.19*cheek+.43*bridge+.66*tip-.24*nostril+.17*lips-.20*mouth+.22*chin;
}
function faceSurface(part:number,u:number,v:number):[number,number,number]{
 const t=u*Math.PI*2;
 if(part===0){const y=(v-.5)*4.2,ring=Math.sqrt(Math.max(.001,1-(y/2.15)**2));
 const jaw=1-.23*Math.exp(-((y+1.32)**2/.40));const x=Math.sin(t)*1.45*ring*jaw;
 let z=Math.cos(t)*1.12*ring;
 if(Math.cos(t)>0)z+=faceRelief(x,y)*Math.pow(Math.cos(t),.35);
 return [x,y+1.15,z];}
 if(part===3||part===4){const y=(v-.5)*.84,ring=Math.sqrt(Math.max(.001,1-(y/.45)**2));return [(part===3?-1:1)*1.42+Math.sin(t)*.20*ring,1.38+y,.02+Math.cos(t)*.35*ring];}
 if(part===1)return [Math.sin(t)*.63,-1.65+v*.98,Math.cos(t)*.60];
 const y=-3.35+v*1.85,normalized=(y+3.0)/1.65,ring=Math.sqrt(Math.max(.02,1-normalized*normalized));
 return [Math.sin(t)*3.1*ring,y,Math.cos(t)*1.28*ring];
}
function faceParameters(id:number):[number,number,number]{const a=random(id,1);return [a<.74?0:a<.76?3:a<.78?4:a<.86?1:2,random(id,2),random(id,3)]}
export function faceNormal(id:number):[number,number,number]{const [part,u,v]=faceParameters(id),e=.0001;
 const a=faceSurface(part,u+e,v),b=faceSurface(part,u-e,v),c=faceSurface(part,u,Math.min(.9999,v+e)),d=faceSurface(part,u,Math.max(.0001,v-e));
 const tx=a[0]-b[0],ty=a[1]-b[1],tz=a[2]-b[2],sx=c[0]-d[0],sy=c[1]-d[1],sz=c[2]-d[2];
 let x=ty*sz-tz*sy,y=tz*sx-tx*sz,z=tx*sy-ty*sx;const length=Math.hypot(x,y,z)||1;x/=length;y/=length;z/=length;return [x,y,z];
}
export function target(id:number,stage:Stage):[number,number,number]{
 const a=random(id,1),b=random(id,2),c=random(id,3);
 if(stage==='void')return [(a-.5)*18,(b-.5)*11,(c-.5)*10];
 if(stage==='galaxy'){const r=Math.sqrt(a)*7.4,angle=r*1.15+(id%3)*Math.PI*2/3+(b-.5)*.65;return [Math.cos(angle)*r,(c-.5)*(.2+.14*r),Math.sin(angle)*r]}
 return faceSurface(...faceParameters(id));
}
export let textFallback=false;
export function sampleText(word:string,count:number):Float32Array{
 const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=256;const ctx=canvas.getContext('2d');if(!ctx)throw new Error('Text canvas unavailable');
 ctx.fillStyle='#fff';ctx.font='900 140px Arial, sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';const text=word.trim().toUpperCase().slice(0,14)||'WE ARE DUST';const scale=Math.min(1,960/ctx.measureText(text).width);ctx.translate(512,128);ctx.scale(scale,1);ctx.fillText(text,0,0);const pixels=ctx.getImageData(0,0,1024,256).data;const points:number[]=[];for(let y=0;y<256;y+=2)for(let x=0;x<1024;x+=2)if(pixels[(y*1024+x)*4+3]>150)points.push(x,y);
 textFallback=points.length===0;if(textFallback){for(let y=40;y<216;y+=2)for(let x=430;x<594;x+=2)if(y<65||y>95&&y<120||y>185||x>565)points.push(x,y);}
 const out=new Float32Array(count*4);for(let i=0;i<count;i++){const k=Math.floor(random(i,8)*(points.length/2))*2;out[i*4]=(points[k]-512)/65;out[i*4+1]=(128-points[k+1])/65;out[i*4+2]=(random(i,9)-.5)*.65;out[i*4+3]=1;}return out;
}
export function fillTargets(stage:Stage,count:number):Float32Array{const out=new Float32Array(count*4);for(let i=0;i<count;i++){out.set(target(i,stage),i*4);out[i*4+3]=1}return out}
export function integrate(p:number,v:number,target:number,force:number,dt:number):[number,number]{dt=Math.min(.033,Math.max(0,dt));v=(v+(target-p)*12*dt+force*dt)*Math.exp(-5*dt);v=Math.max(-14,Math.min(14,v));return [p+v*dt,v]}
