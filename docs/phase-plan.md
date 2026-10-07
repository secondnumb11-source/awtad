# خطة البناء

الدستور الملزم لجميع المراحل: `docs/engineering-constitution.md`.

## Phase 0 — Foundation
الحالة: PASS على commit `2f6ebbd54c6c1aeda1c27f543ad48d9786ebcf36` وفق CI run #50: dependencies, constitution, foundation, core, TypeScript, lint, production build, production startup, وhealth check نجحت.

## Phase 1 — Source & requirements baseline
الحالة: PASS كمراجعة مصدرية/متطلبات؛ لا تُعامل كمصادقة تشغيلية على المنتج. تمت مراجعة مواصفات أوتاد، موقع جسر، ومواد الدوام/التحكم/المديرين/الإشعارات، وتجميعها في feature matrix.

## Phase 2 — Identity, tenancy & Core HR
الحالة: INCOMPLETE/UNVERIFIED. الكود والبنية الأساسية موجودان، لكن التكامل النظيف مع قاعدة اختبار، RLS/security audit، API smoke tests وE2E لم تُغلق بعد.
- Supabase Auth boundary.
- multi-tenant organization/entity/branch/department/location.
- employee master record.
- positions and manager hierarchy.
- role/permission model.
- manager groups.
- audit trail.
- employee lifecycle state machine.
- employee self-service data-change requests.

## Phase 3 — Attendance & workforce time
- shifts.
- recurring schedules.
- locations/geofencing boundary.
- attendance punches.
- manual controls.
- correction requests.
- overtime/absence/excuse/compensation balances.
- device requests.
- manager approvals and reports.

## Phase 4 — Leave + Payroll
## Phase 5 — Saudi compliance
## Phase 6 — Workflow/approvals + notifications
## Phase 7 — Expenses/travel/accounting
## Phase 8 — ATS/talent
## Phase 9 — Performance/learning/engagement
## Phase 10 — Analytics/AI/integrations
## Phase 11 — Mobile + E2E + security hardening

لا تُغلق أي مرحلة إلا بحالة PASS وفق الدستور، مع تسجيل commit SHA ونتائج جميع البوابات.
