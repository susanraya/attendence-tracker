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
| [Architecture](architecture/README.md) | 8 entries |
| [Development](development/README.md) | 1 entry |
| [Testing](testing/README.md) | 1 entry |
| [Deployment](deployment/README.md) | 1 entry |
| [Maintenance](maintenance/README.md) | 1 entry |
| [Data model](architecture/data-model.md) | generated |
| [API (OpenAPI)](architecture/api/openapi.yaml) | generated |
| [Decisions (ADRs)](architecture/adr/README.md) | 4 decisions |
| [Sprint plan](development/sprint-plan.md) | not generated yet |
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

- Assumption that parents/guardians have no accounts is not yet confirmed by the institution.
- DPDP data-principal rights beyond consent withdrawal (e.g. access, correction, erasure, grievance redressal) are not specified.
- Verifiable parental consent for students under 18 (required by DPDP for minors) is not addressed; unclear if any enrolled students are minors.
- No live SIS/ERP or LMS integration (LTI/OneRoster/SCORM) is implemented - confirm this is acceptable long-term or only an initial-scope limitation.
- No leave-application or condonation workflow exists in this scope - confirm this matches institutional policy for exam eligibility decisions.
- CERT-In's 6-hour cyber-incident reporting obligation and DPDP's breach-notification-to-Board/affected-persons process are not addressed beyond log retention.
- Significant Data Fiduciary obligations (in-India DPO, periodic audits, data protection impact assessment) have not been evaluated for this institution.
- DPDP consent-manager mechanism is not addressed - current design only captures a direct acknowledge/withdraw action.
- GIGW guidelines applicability is unconfirmed (relevant only if this is a government-run institution).

### Development

- Development has not started or no development records have been supplied - no tickets, commits, or implementation notes exist to document.

### Testing

- Testing phase has not started - no test plans or results are available yet.

### Deployment

- No deployment recorded yet - the system has not been released to any environment as far as this input shows.

### Maintenance

- No post-deployment/maintenance notes recorded yet - project has not reached operations.
<!-- sdlc:auto:end open-gaps -->
