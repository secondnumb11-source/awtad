import {readdir,readFile} from "node:fs/promises";
import {join} from "node:path";

const roots=["app","docs","scripts"];
const forbidden=[
  /ghp_[A-Za-z0-9_]+/,
  /github_pat_[A-Za-z0-9_]+/,
  /sbp_[A-Za-z0-9_]+/,
  /service_role/i,
  /-----BEGIN (RSA|EC|OPENSSH|PRIVATE) KEY-----/
];
const allowedExt=new Set([".ts",".tsx",".js",".mjs",".md",".json",".yml",".yaml",".env.example"]);
async function walk(dir){
  const out=[];
  for(const entry of await readdir(dir,{withFileTypes:true})){
    const p=join(dir,entry.name);
    if(entry.isDirectory()) out.push(...await walk(p));
    else out.push(p);
  }
  return out;
}
for(const root of roots){
  for(const file of await walk(root)){
    const ext=file.slice(file.lastIndexOf("."));
    if(!allowedExt.has(ext)) continue;
    const text=await readFile(file,"utf8");
    for(const re of forbidden){
      if(re.test(text)) throw new Error("Potential secret in "+file);
    }
  }
}
console.log("source hygiene: PASS");
