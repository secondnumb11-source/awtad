# Phase 1 — Acceptance Contract

الحالة: **IN PROGRESS**

## النطاق

- PostgreSQL ومigrations قابلة لإعادة البناء من الصفر.
- organizations / entities وعزل المستأجرين.
- users / memberships.
- Authentication.
- Authorization: RBAC مع أساس ABAC حيث يلزم.
- API CRUD فعلي ضمن النطاق.
- audit log للعمليات الحساسة.
- file metadata foundation.
- health/runtime.
- database/API/integration/E2E/security tests.

## معايير القبول

1. migration نظيفة قابلة للتطبيق من قاعدة فارغة.
2. قيود وفهارس وعلاقات صحيحة.
3. عزل tenant مثبت باختبار رفض cross-tenant.
4. authentication حقيقي، وليس mock.
5. authorization يرفض الوصول غير المصرح به عبر API مباشرة.
6. CRUD حقيقي للموارد المعتمدة.
7. audit trail قابل للتحقق.
8. اختبارات نجاح وفشل.
9. typecheck/lint/unit/integration/API/E2E/security.
10. vulnerability/error checks ومعالجة النتائج المؤثرة.
11. production build/startup.
12. كل نتيجة موثقة على نفس commit الذي اجتاز البوابة.

## ممنوع

- HR business logic.
- attendance/payroll/AI/government integrations.
- جداول أعمال خارج النطاق.
- mock/stub بديل عن الوظيفة الحقيقية.

## قرار البوابة

أي فشل = **INCOMPLETE/FAILED** ولا يسمح ببدء Phase 2.
