# Quality gates

A phase cannot be marked complete unless all applicable gates pass on the exact commit being accepted.

The governing document is `docs/engineering-constitution.md`. It is mandatory for every current and future phase.

1. Source hygiene and secret scan.
2. Dependency installation with the declared Node/npm versions and lockfile.
3. TypeScript strict check.
4. Lint.
5. Unit and integration tests.
6. Database migration on a clean PostgreSQL database.
7. Schema/constraints/index verification.
8. RLS and authorization/tenant-isolation tests.
9. Production build.
10. Production startup.
11. /api/health runtime check.
12. API smoke tests with authentication, authorization, and tenant isolation.
13. Browser E2E for the journeys introduced by the phase.
14. Security checks: headers, authz, tenant isolation, audit trail, dependency audit, and secret scan.
15. Record the exact commit SHA and test database/environment.

A network or tooling failure is reported as UNVERIFIED; it is never reported as a successful build.

A previously green run does not validate a later commit. Any material code/config/schema change requires the affected gates to be rerun.
