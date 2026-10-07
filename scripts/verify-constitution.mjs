import {readFile} from "node:fs/promises";

const constitution=await readFile("docs/engineering-constitution.md","utf8");
const required=[
  "حظر البناء العشوائي",
  "يحظر ترك خطأ معروف",
  "لا Merge ولا Release",
  "لا تعتبر الميزة مكتملة"
];
for(const phrase of required){
  if(!constitution.includes(phrase)) throw new Error("Constitution missing: "+phrase);
}
console.log("constitution: PASS");
