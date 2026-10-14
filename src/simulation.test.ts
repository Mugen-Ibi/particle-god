import {test} from 'node:test';import assert from 'node:assert/strict';import {fillTargets,integrate,nextStage,random,faceNormal,faceRelief,target} from './simulation.js';
test('stable IDs generate deterministic bounded finite forms',()=>{for(const s of ['void','face','galaxy'] as const){const a=fillTargets(s,4096),b=fillTargets(s,4096);assert.deepEqual(a,b);assert.ok(a.every(Number.isFinite));assert.ok(a.every(x=>Math.abs(x)<20));assert.notDeepEqual(a,fillTargets(s==='face'?'galaxy':'face',4096))}assert.equal(random(42),random(42))});
test('aggressive force and long frame gaps remain stable, then reconstruct',()=>{let p=3,v=0;for(let i=0;i<10000;i++)[p,v]=integrate(p,v,0,(i%2?1:-1)*1e6,2);assert.ok(Number.isFinite(p)&&Math.abs(v)<=14);for(let i=0;i<1000;i++)[p,v]=integrate(p,v,0,0,1/60);assert.ok(Math.abs(p)<.0001)});
test('replay reliably completes the state cycle',()=>{let s=nextStage('void');assert.equal(s,'face');s=nextStage(s);assert.equal(s,'galaxy');s=nextStage(s);assert.equal(s,'word');assert.equal(nextStage(s),'void')});

test('empty glyph masks yield finite visible fallback geometry', async()=>{
 const previous=Object.getOwnPropertyDescriptor(globalThis,'document');
 const context={fillStyle:'',font:'',textAlign:'',textBaseline:'',measureText:()=>({width:100}),translate:()=>{},scale:()=>{},fillText:()=>{},getImageData:()=>({data:new Uint8ClampedArray(1024*256*4)})};
 Object.defineProperty(globalThis,'document',{configurable:true,value:{createElement:()=>({width:0,height:0,getContext:()=>context})}});
 try {const sim=await import('./simulation.js');const data=sim.sampleText('\u200B',100);assert.ok(sim.textFallback);assert.ok(data.every(Number.isFinite));assert.ok(new Set(data).size>10);assert.equal(data.length,400);} finally {if(previous)Object.defineProperty(globalThis,'document',previous);else Reflect.deleteProperty(globalThis,'document');}
});


test('bust shoulders cover both sides and full depth rather than one angular slice',()=>{
 let left=0,right=0,front=0,back=0;for(let id=0;id<20000;id++){if(random(id,1)<.86)continue;const [x,,z]=target(id,'face');if(x<0)left++;else right++;if(z<0)back++;else front++;}assert.ok(left>1000&&right>1000&&front>1000&&back>1000);assert.ok(Math.abs(left-right)/(left+right)<.08);assert.ok(Math.abs(front-back)/(front+back)<.08);
});
test('sculpted relief projects the nose, recesses eyes, and produces unit surface normals',()=>{
 assert.ok(faceRelief(0,-.15)-faceRelief(.6,.52)>.8);assert.ok(faceRelief(.6,.82)>faceRelief(.6,.52));for(let id=0;id<10000;id++){const n=faceNormal(id);assert.ok(n.every(Number.isFinite));assert.ok(Math.abs(Math.hypot(...n)-1)<.00001);}const face=fillTargets('face',10000);assert.ok(face.some((v,i)=>i%4===2&&v>1.7));
});
