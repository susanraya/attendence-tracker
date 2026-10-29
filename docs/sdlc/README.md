# attendence tracker — SDLC Documentation

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start overview -->
attendence management system

**Documentation version:** v1
<!-- sdlc:auto:end overview -->

## Contents

<!-- sdlc:auto:start contents -->
| Document | State |
|---|---|
| [Requirements](requirements/README.md) | v1 approved |
| [Architecture](architecture/README.md) | 5 entries |
| [Development](development/README.md) | 9 entries |
| [Testing](testing/README.md) | 1 entry |
| [Deployment](deployment/README.md) | 1 entry |
| [Maintenance](maintenance/README.md) | 1 entry |
| [Data model](architecture/data-model.md) | generated |
| [API (OpenAPI)](architecture/api/openapi.yaml) | generated |
| [Decisions (ADRs)](architecture/adr/README.md) | 4 decisions |
| [Sprint plan](development/sprint-plan.md) | 6 sprints |
| [Developer guide](development/developer-guide.md) | not generated yet |
| [API reference](development/api-reference.md) | 0 routes |
| [Test report](testing/test-report.md) | not run yet |
| [Tests](testing/test-cases.md) | 0 tests |
| [Deployment guide](deployment/deployment-guide.md) | not deployed yet |
| [Runbook](deployment/runbook.md) | not deployed yet |
| [Release notes](deployment/release-notes.md) | 0 releases |
| [Traceability matrix](traceability-matrix.md) | 20 requirements |
| [Changelog](CHANGELOG.md) | 1 version |
<!-- sdlc:auto:end contents -->

## Open gaps

<!-- sdlc:auto:start open-gaps -->
### Requirements

- DPDP Act 2023: verifiable parental consent for data principals under 18 is not addressed; whether any enrolled students are minors is unconfirmed.
- DPDP Act 2023 data-principal rights beyond consent withdrawal (access, correction, erasure, grievance redressal, consent-manager support) are not addressed by any requirement.
- No SIS/LMS interoperability (OneRoster, LTI) is in scope; manual Excel/CSV import is the chosen approach - confirm this meets institutional integration needs.
- No condonation/leave-approval workflow is in scope, which limits formal academic-integrity dispute handling - confirm this is acceptable to the institution.
- The required decimal precision for displayed percentages is not numerically specified.
- CERT-In 6-hour breach reporting workflow and DPDP Data Protection Board breach-notification process are not covered by any requirement.
- Whether the institution is a 'Significant Data Fiduciary' under DPDP (requiring an India-based DPO, periodic audits, and a DPIA) has not been assessed.
- GIGW guideline applicability (relevant if the institution is government-run) has not been assessed.
- IT (Intermediary) Rules 2021 obligations (grievance officer, content takedown process) are not addressed.
- Scaling targets (a few thousand users, term-start/exam peaks) have not been load-tested since the testing phase has not started.

### Architecture

- Data-residency claim depends on AWS ap-south-1 for compute/storage, but RDS backup snapshots, CloudWatch/observability logs and any CDN edge caching are not explicitly confirmed to remain within India.
- JWT expiry/refresh strategy is not specified in the architecture input.

### Development

- Input lists sprint goals and a flat backlog of items but does not explicitly map each item to a sprint number; exact sprint scheduling per item is not confirmed.
- No sprint start/end dates were given.
- No completion/status field is provided for any item - cannot confirm whether this work has actually been implemented, only that it is planned and assigned.
- No completion/status field is provided for any item.
- Atomic/no-partial-corruption behavior (T4) is planned but not yet verified by any test since the testing phase is absent.
- Audit-trail immutability is planned but not yet verified by any test.
- No completion/status field is provided for this item.
- Email delivery and failure-logging behavior are planned but not yet verified by any test.
- The accessibility test suite (T3) is planned for a qa-agent but no results have been reported - WCAG 2.1 AA / RPwD Act 2016 conformance is not yet verified.

### Testing

- No test plans, cases, or execution results exist yet.
- Accessibility test suite (US-020-T3, planned for qa-agent) has not been executed or reported.
- No verification exists for compliance-critical behaviors: RBAC isolation, audit-trail immutability, 180-day log retention, import atomicity/no-partial-corruption, and default 75% threshold behavior.

### Deployment

- No deployment environment, release date, or rollout status is recorded.
- The India data-residency claim and 180-day CERT-In log retention cannot be operationally confirmed until a deployment is recorded.

### Maintenance

- No incident, patch, or support history exists yet since the project has not been deployed.
<!-- sdlc:auto:end open-gaps -->
