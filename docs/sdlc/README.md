# attendence tracker — SDLC Documentation

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start overview -->
attendence management system

**Documentation version:** v2
<!-- sdlc:auto:end overview -->

## Contents

<!-- sdlc:auto:start contents -->
| Document | State |
|---|---|
| [Requirements](requirements/README.md) | v1 approved |
| [Architecture](architecture/README.md) | 19 entries |
| [Development](development/README.md) | 0 entries |
| [Testing](testing/README.md) | 0 entries |
| [Deployment](deployment/README.md) | 0 entries |
| [Maintenance](maintenance/README.md) | 0 entries |
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
| [Changelog](CHANGELOG.md) | 2 versions |
<!-- sdlc:auto:end contents -->

## Open gaps

<!-- sdlc:auto:start open-gaps -->
### Requirements

- No architecture document yet translates this approved stack into a component/deployment design — architecture phase has not started.
- Reset-link expiry/validity period is not specified.
- Exact delivery mechanism for the 'initial credential' (temporary password vs. reset-link-only) is not specified.
- No mechanism for verifiable parental/guardian consent for any enrolled student under 18 is described; confirm whether any students are minors, since current scope assumes guardians have no accounts.
- DPDP breach-notification duties and 'Significant Data Fiduciary' obligations (in-India DPO, audits, impact assessments) are not addressed by this or any other story.
- Exact required column schema/template for student, course, and timetable files is not specified.
- Display precision (number of decimal places) for the percentage is not specified.
- Which specific AWS region(s) (Mumbai vs. Hyderabad) will be used, and whether backups/disaster-recovery copies also stay in-India, is not yet specified — for the architecture phase to confirm.
- CERT-In also requires reporting qualifying cyber incidents to CERT-In within 6 hours; no requirement in this input addresses that reporting obligation.
- No accessibility audit or test plan yet exists to verify WCAG 2.1 AA / RPwD conformance — to be confirmed in the testing phase.
- CERT-In 6-hour incident-reporting obligation to the authority itself is not covered by this NFR.

### Architecture

- No explicit mapping given between this architecture and the specific US-001..US-020 requirement descriptions, so traceability to individual requirements could not be confirmed.
- DPDP, CERT-In and RPwD Act are named as compliance drivers but no dedicated compliance/control checklist was supplied for this phase -- recommend a human confirm all applicable controls are covered.
- Delivery-tracking data is mentioned but no retention/visibility mechanism for tracking data is specified.
- SendGrid is a third-party SaaS outside the AWS India region boundary; its own data-residency/DPDP posture for email content is not addressed in this input.
<!-- sdlc:auto:end open-gaps -->
