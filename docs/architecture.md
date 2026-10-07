# Awtad architecture baseline

## Product boundary
Awtad is a Saudi-first HCM platform combining employee lifecycle, attendance, leave, payroll, compliance, talent, performance, learning, engagement, expenses, travel and finance-linked workflows.

## Architectural rules
- Multi-tenant from the first table and first API.
- Domain rules are independent from UI.
- Transactions are explicit at service boundaries.
- Every mutation has authorization, validation and audit requirements.
- External government and banking systems are adapters; no fabricated endpoints.
- AI is permission-aware and cannot bypass domain rules.
- Arabic/RTL is a first-class product requirement.
- Secrets exist only in environment/managed secret stores.

## Build order
Foundation → identity/tenancy → Core HR → attendance/leave → payroll → Saudi compliance → workflow/approvals → expenses/travel → talent → performance/learning/engagement → AI/integrations → mobile → E2E/security hardening.
