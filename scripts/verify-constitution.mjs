import {existsSync,readFileSync} from "node:fs";
import {join} from "node:path";

const root=new URL("..",import.meta.url).pathname;
const required=["docs/engineering-constitution.md","docs/quality-gates.md","docs/phase-plan.md","package.json","package-lock.json",".env.example"];
for(const file of required){
  if(!existsSync(join(root,file))) throw new Error("Required engineering artifact missing: "+file);
}
const constitution=readFileSync(join(root,"docs/engineering-constitution.md"),"utf8");
const pkg=JSON.parse(readFileSync(join(root,"package.json"),"utf8"));
if(!pkg.engines?.node || !pkg.engines?.npm) throw new Error("Node/npm engines must be pinned");
if(!pkg.packageManager?.startsWith("npm@")) throw new Error("npm packageManager must be pinned");
for(const token of ["UNVERIFIED","same commit SHA","Production build","RLS","secret"]){
  if(!constitution.includes(token)) throw new Error("Engineering constitution missing: "+token);
}
console.log("engineering constitution verification: PASS");
