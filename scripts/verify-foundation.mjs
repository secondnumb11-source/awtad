import {readFileSync,readdirSync,statSync} from "node:fs";
import {join,relative} from "node:path";

const root=new URL("..",import.meta.url).pathname;
const required=["package.json","tsconfig.json","next-env.d.ts",".env.example","app/page.tsx","app/api/health/route.ts","middleware.ts","src/domain/employee.ts","src/domain/payroll.ts","src/domain/workflow.ts","src/security/tenant.ts"];
for(const file of required) if(!statSync(join(root,file),{throwIfNoEntry:false})) throw new Error("Missing required file: "+file);

const forbidden=/(ghp_|github_pat_|sbp_|service_role|BEGIN (RSA|OPENSSH|EC|PRIVATE) KEY)/i;
function walk(dir){
  for(const entry of readdirSync(dir,{withFileTypes:true})){
    if(["node_modules",".next",".git"].includes(entry.name)) continue;
    const path=join(dir,entry.name);
    if(entry.isDirectory()) walk(path);
    else {
      const rel=relative(root,path);
      if(rel==="scripts/verify-foundation.mjs") continue;
      if(forbidden.test(readFileSync(path,"utf8"))) throw new Error("Potential secret detected in "+rel);
    }
  }
}
walk(root);
console.log("foundation verification: PASS");
