export type Stage = 'void'|'face'|'galaxy'|'word';
export const stages:Stage[]=['void','face','galaxy','word'];
export const nextStage=(s:Stage):Stage=>stages[(stages.indexOf(s)+1)%stages.length];
export const random=(id:number,seed=0)=>{const x=Math.sin(id*127.1+seed*311.7)*43758.5453;return x-Math.floor(x)};
export function target(id:number,stage:Stage):[number,number,number]{
 const a=random(id,1),b=random(id,2),c=random(id,3),phi=a*Math.PI*2;
 if(stage==='void')return [(a-.5)*18,(b-.5)*11,(c-.5)*10];
 if(stage==='galaxy'){const r=Math.sqrt(a)*7.4,angle=r*1.15+(id%3)*Math.PI*2/3+(b-.5)*.65;return [Math.cos(angle)*r,(c-.5)*(.2+.14*r),Math.sin(angle)*r]}
 if(a<.73){const t=(a/.73)*Math.PI*2,y=(b-.5)*4.4,ring=Math.sqrt(Math.max(0,1-(y/2.3)**2));let x=Math.sin(t)*1.65*ring,z=Math.cos(t)*1.3*ring;
 if(z>0){const eye=Math.exp(-((Math.abs(x)-.64)**2/.07+(y-.45)**2/.045));const brow=Math.exp(-((Math.abs(x)-.65)**2/.10+(y-.75)**2/.03));const nose=Math.exp(-(x*x/.055+(y-.05)**2/.38));const mouth=Math.exp(-(x*x/.34+(y+.7)**2/.018));z+=nose*.9-eye*.43+brow*.18-mouth*.3;}
 return [x,y+1,z];}
 if(a<.84)return [(b-.5)*1.6,-1.6+c*1.25,(random(id,4)-.5)*1.3];
 const u=phi,v=(b-.5)*Math.PI;return [Math.sin(u)*3.1*Math.cos(v),-2.7+Math.sin(v)*.85,Math.cos(u)*1.25*Math.cos(v)];
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
