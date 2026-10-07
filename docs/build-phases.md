# خطة بناء أوتاد من الصفر

## Phase 0 — Specification & Engineering Foundation
النطاق: تثبيت المتطلبات، مصفوفة القبول، الدستور، architecture decision records، بنية المشروع الدنيا، CI الأساسي.
بوابة الخروج: كل وثائق النطاق والدستور موجودة، مشروع قابل للتثبيت والتشغيل، typecheck/lint/test/build وsecret scan ناجحة على نفس commit.

## Phase 1 — Core Platform & Tenant Security
النطاق: التطبيق الأساسي، PostgreSQL، multi-tenant organizations/entities، users/memberships، RBAC/ABAC، audit log، أساس الملفات، health/runtime.
بوابة الخروج: migration من صفر، CRUD فعلي، auth/authz فعلي، cross-tenant denial، اختبارات API وE2E، security gate PASS.

## Phase 2 — Core HR & Employee Lifecycle
النطاق: employee profile، organization structure، contracts/documents، lifecycle، onboarding/pre-onboarding، manager hierarchy، employee self-service الأساسي.
بوابة الخروج: رحلة موظف كاملة من الإنشاء حتى active/onboarding مع صلاحيات وأثر تدقيقي واختبارات فشل.

## Phase 3 — Attendance, Scheduling & Leave
النطاق: الورديات، الجداول، المواقع، الحضور والانصراف، التصحيح، الإجازات، العطلات، العمل الإضافي، المعالجة اليدوية، التفويض، إشعارات الحضور.
بوابة الخروج: رحلة حضور حقيقية كاملة + اختبارات duplicate/concurrency/geofence/authorization/cross-tenant.

## Phase 4 — Payroll & Saudi Compliance
النطاق: payroll engine، payroll groups، allowances/deductions/overtime، EOSB، payslips، compliance rules، adapters الحكومية، WPS/GOSI/SANED/Muqeem/Mudad/Qiwa فقط حسب المواصفات الرسمية المتاحة.
بوابة الخروج: payroll fixtures وحسابات قابلة لإعادة الإنتاج، reconciliation، اختبارات حواف، adapters منفصلة، لا تكامل LIVE بلا دليل.

## Phase 5 — Talent: ATS & Onboarding
النطاق: jobs، approvals، careers page، applications، candidate DB، pipeline، interviews، CV parsing/matching، AI guardrails، pre-onboarding.
بوابة الخروج: مرشح → اختيار → pre-onboarding → employee، مع حماية بيانات المرشحين واختبارات AI permissions.

## Phase 6 — Performance, Learning & Engagement
النطاق: performance cycles، templates، reminders، reviews، 360 حسب النطاق المعتمد، learning، surveys/eNPS، announcements، messaging، assistant.
بوابة الخروج: دورات كاملة واختبارات الصلاحيات والخصوصية والتنبيهات.

## Phase 7 — Expenses, Travel, Assets & Benefits
النطاق: expenses/OCR، policies، approvals، reimbursements، accounting linkage، travel، cash custody/assets، benefits/insurance.
بوابة الخروج: من الطلب إلى الاعتماد والتسوية، منع تجاوز السياسة، reconciliation، E2E.

## Phase 8 — Analytics, Integrations & AI Agents
النطاق: dashboards، reports، ERP/accounting adapters، banking adapters، travel/training/insurance adapters، AI assistant/agents/RAG، permission-aware tools.
بوابة الخروج: كل agent/tool يمر authorization + business rules + audit، واختبارات prompt-injection/data leakage.

## Phase 9 — Mobile, Scale & Production Hardening
النطاق: mobile experience، performance، observability، backups/DR، rate limits، SSO/MFA/SCIM عند اعتمادها، accessibility، localization، production hardening.
بوابة الخروج: load/security/E2E/DR/observability gates.

## قاعدة الانتقال
إذا فشلت أي بوابة: تتوقف المرحلة، تُصلح جميع الأخطاء، تعاد الاختبارات، ولا يبدأ العمل على المرحلة التالية.
