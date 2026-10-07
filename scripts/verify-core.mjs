import {readFileSync} from "node:fs"; import {join} from "node:path";
const root=new URL("..",import.meta.url).pathname;
const files=["docs/feature-matrix.md","docs/phase-plan.md","lib/supabase/server.ts","lib/auth/context.ts","src/domain/core-hr.ts","src/security/access.ts","supabase/migrations/0002_core_hr.sql"];
for(const file of files){if(!readFileSync(join(root,file),"utf8")) throw new Error("Empty/missing: "+file);}
const domain=readFileSync(join(root,"src/domain/core-hr.ts"),"utf8");
for(const token of ["candidate","pre_onboarding","onboarding","probation","active","suspended","terminated","alumni"]) if(!domain.includes(token)) throw new Error("Lifecycle state missing: "+token);
console.log("core verification: PASS");
