# ADR-001 — Phase 1 Architecture

## القرار

Phase 1 تستخدم Next.js + TypeScript للتطبيق وواجهة API، مع PostgreSQL كمخزن البيانات، وطبقة service/domain تفصل HTTP عن منطق البيانات والصلاحيات.

## حدود Phase 1

نموذج البيانات يقتصر على:
- users
- organizations
- organization_entities
- memberships
- roles
- permissions
- role_permissions
- membership_roles
- audit_logs
- file_metadata

لا يتم إدخال كيانات HR أو attendance أو payroll في هذه المرحلة.

## مبادئ الأمان

- كل request يحدد tenant context صريحًا بعد authentication.
- authorization يُنفذ على مستوى الخدمة/API وليس في الواجهة فقط.
- كل استعلام tenant-scoped يحمل organization context.
- العمليات الحساسة تسجل في audit log.
- لا أسرار في المستودع.
- cross-tenant وdirect-API denial اختبارات إلزامية.

## التكامل

لا نعلن أي مزود خارجي LIVE في هذه المرحلة دون مواصفة واختبارات موثقة. التخزين الخارجي، إن أضيف لاحقًا، يدخل عبر adapter.
