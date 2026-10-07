# Quality gates

A phase cannot be marked complete unless all applicable gates pass.

1. Source hygiene and secret scan.
2. Dependency installation with the declared Node/npm versions.
3. TypeScript strict check.
4. Lint.
5. Unit and integration tests.
6. Database migration on a clean PostgreSQL database.
7. Production build.
8. Production startup.
9. /api/health runtime check.
10. API smoke tests with authorization and tenant isolation.
11. Browser E2E.
12. Security checks: headers, authz, tenant isolation, audit trail, dependency audit.

A network failure is reported as an environment limitation; it is never reported as a successful build.
