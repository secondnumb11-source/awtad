import test from "node:test";
import assert from "node:assert/strict";

test("health contract is defined",async()=>{
  const fs=await import("node:fs/promises");
  const source=await fs.readFile("app/api/health/route.ts","utf8");
  assert.match(source,/NextResponse\.json/);
  assert.match(source,/ok:true/);
});

test("constitution forbids random building",async()=>{
  const fs=await import("node:fs/promises");
  const source=await fs.readFile("docs/engineering-constitution.md","utf8");
  assert.match(source,/حظر البناء العشوائي/);
  assert.match(source,/يحظر ترك خطأ معروف/);
});
