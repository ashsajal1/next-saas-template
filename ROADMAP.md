# SaaS Template Roadmap

This roadmap is tailored to the current `next-saas-template` codebase.

## Phase 1: MVP (ship usable product quickly)

### Goal
Turn the template into a real product with persistent data and core flows.

### Deliverables
1. Domain model + persistence
- Define core entities in Prisma (example: `Workspace`, `Project`, `Task`, `Membership`, `Notification`, `ContactLead`, `DemoLead`).
- Add migrations and seed data for local/dev.
- Replace static arrays in private/admin pages with DB-backed queries.

2. Workspace multi-tenancy foundations
- Associate each user with one or more workspaces.
- Scope all reads/writes by active workspace.
- Add workspace switcher and default workspace creation on first sign-in.

3. Core CRUD flows
- Implement create/read/update/delete for the primary entity set (projects/tasks or your target domain).
- Add server actions for each CRUD path with validation.
- Add optimistic UI states and error handling.

4. Team management (basic)
- Invite member by email.
- Accept invite flow.
- Role assignment (`owner/admin/member`) persisted in DB.

5. Contact + demo funnel persistence
- Store submissions from existing server actions into DB.
- Basic admin list view for leads.

### Exit criteria
- A signed-in user can complete a full end-to-end workflow with data persisted in DB.
- All key private pages show real data, not placeholders.

## Phase 2: Production-ready (stability, security, billing correctness)

### Goal
Harden critical paths and eliminate operational risk before real customer traffic.

### Deliverables
1. Authorization hardening
- Centralize authz helpers (`requireUser`, `requireWorkspace`, `requireRole`).
- Apply authz checks on every server action + API route.
- Add tests for permission boundaries.

2. Billing/entitlements completeness
- Map plans to feature entitlements in DB.
- Gate premium features by entitlement checks (server-side enforced).
- Handle Stripe edge cases: webhook retries, canceled subscriptions, failed payments, grace periods.

3. Security baseline
- Add API/form rate limiting (especially auth-adjacent + public forms).
- Add anti-abuse protection for contact/demo endpoints.
- Verify secure headers/cookies and CSRF strategy for mutating endpoints.

4. Observability
- Integrate error tracking (Sentry or equivalent).
- Add structured logs and request IDs.
- Add basic uptime/health endpoint.

5. QA + CI gates
- Add CI pipeline for `lint`, `test`, build, and migrations check.
- Expand e2e tests for sign-up/sign-in, role-protected routes, billing flow, and lead submission.

### Exit criteria
- Critical user journeys pass e2e reliably.
- Billing and permission checks are enforced and tested.
- On-call can detect and triage failures quickly.

## Phase 3: Scale-ready (performance + enterprise readiness)

### Goal
Prepare for higher traffic, larger teams, and enterprise adoption.

### Deliverables
1. Background jobs
- Add queue worker for async tasks (emails, heavy reports, webhooks processing).
- Retry/dead-letter policy and job monitoring.

2. Advanced org controls
- SCIM/SAML SSO (if enterprise target).
- Fine-grained custom roles/permissions.
- Full audit log with export capability.

3. Notifications platform
- In-app notifications from real events.
- Email notification preferences + digest jobs.
- Real-time delivery path (WebSocket/SSE or polling strategy).

4. Performance engineering
- Query optimization and indexes.
- Caching strategy for expensive read paths.
- Pagination and filtering for all large tables.

5. Compliance and governance
- Data retention policies and purge tooling.
- Privacy exports/deletions (DSAR workflows).
- Security docs/runbooks for customer reviews.

### Exit criteria
- System handles growth without major UX or ops degradation.
- Enterprise buyers can evaluate security/compliance posture.

## Cross-phase implementation order (recommended)

1. Data model and workspace scoping
2. CRUD + team invites + authz helpers
3. Billing entitlements and route/action guards
4. CI/e2e + observability
5. Jobs/notifications + enterprise controls

## Suggested issue breakdown (first 2 weeks)

1. Define Prisma schema for workspace + membership + core entity
2. Implement `requireWorkspace()` and refactor server actions to use it
3. Replace static data in `/profile`, `/setting`, `/notification`, `/admin`
4. Persist contact/demo leads and add admin leads table
5. Add integration tests for authz and server actions
6. Add GitHub Actions CI (lint/test/build)

## Success metrics

- Activation: % of new users completing first meaningful workflow
- Reliability: error rate on server actions/API routes
- Security: number of unauthorized access regressions (target: zero)
- Billing: successful checkout-to-entitlement propagation rate
- Support: median time to detect/resolve production incidents
