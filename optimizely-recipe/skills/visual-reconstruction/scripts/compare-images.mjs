import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';
import {pathToFileURL} from 'node:url';
export async function compareImages(source,target,out){
 const [sb,tb]=await Promise.all([fs.readFile(source),fs.readFile(target)]);
 const decode=async b=>sharp(b).flatten({background:'#fff'}).toColourspace('srgb').removeAlpha().raw().toBuffer({resolveWithObject:true});
 const [s,t]=await Promise.all([decode(sb),decode(tb)]);
 const width=Math.max(s.info.width,t.info.width),height=Math.max(s.info.height,t.info.height);
 if(width*height>30000000)throw new Error('Comparison exceeds 30 million pixels; compare section crops.');
 const a=Buffer.alloc(width*height*3,255),b=Buffer.alloc(a.length,255);
 for(const [d,r] of [[a,s],[b,t]])for(let y=0;y<r.info.height;y++)r.data.copy(d,y*width*3,y*r.info.width*3,(y+1)*r.info.width*3);
 const overlay=Buffer.alloc(a.length),diff=Buffer.alloc(a.length);let changed=0,total=0;
 for(let y=0;y<height;y++)for(let x=0;x<width;x++){
  const missing=x>=s.info.width||y>=s.info.height||x>=t.info.width||y>=t.info.height;let delta=0;
  for(let c=0;c<3;c++){const i=(y*width+x)*3+c;const v=missing?255:Math.abs(a[i]-b[i]);delta+=v;overlay[i]=Math.round((a[i]+b[i])/2);diff[i]=Math.min(255,v*4);}
  total+=delta;if(delta)changed++;
 }
 await fs.mkdir(out,{recursive:true});
 const outputNames=['side-by-side.png','overlay.png','difference.png','comparison.json'];
 for(const n of outputNames){try{await fs.access(path.join(out,n));throw new Error('Refuse to overwrite comparison evidence: '+n);}catch(e){if(e.code!=='ENOENT')throw e;}}
 for(const [n,data] of [['overlay.png',overlay],['difference.png',diff]])await sharp(data,{raw:{width,height,channels:3}}).png().toFile(path.join(out,n));
 const side=Buffer.alloc(width*2*height*3,255);for(let y=0;y<height;y++){a.copy(side,y*width*6,y*width*3,(y+1)*width*3);b.copy(side,y*width*6+width*3,y*width*3,(y+1)*width*3);}
 await sharp(side,{raw:{width:width*2,height,channels:3}}).png().toFile(path.join(out,'side-by-side.png'));
 const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
 const result={source:{path:source,sha256:hash(sb),width:s.info.width,height:s.info.height},target:{path:target,sha256:hash(tb),width:t.info.width,height:t.info.height},sameDimensions:s.info.width===t.info.width&&s.info.height===t.info.height,changedPixels:changed,changedRatio:changed/(width*height),meanAbsoluteChannelDifference:total/(width*height*3),alignment:'top-left, white padding; no resizing',status:'diagnostic-only',visualAcceptance:'requires contract review; no automatic pass'};
 await fs.writeFile(path.join(out,'comparison.json'),JSON.stringify(result,null,2));return result;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){
 if(process.argv.length!==5){console.error('Usage: node compare-images.mjs source.png target.png new-output-directory');process.exitCode=1;}
 else try{console.log(JSON.stringify(await compareImages(...process.argv.slice(2)),null,2));}catch(e){console.error(e.message);process.exitCode=1;}
}
