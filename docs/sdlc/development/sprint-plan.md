# Sprint Plan

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start sprints -->
## Sprint 1: Sprint 1

Authentication, RBAC, DPDP consent, and compliance foundations (India data residency, audit/ICT logging).

Capacity: 20 points · Committed: 20

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-001 | Story | Email/password login | 5 | backend-agent | — |
| US-002 | Story | Role-based access control | 5 | backend-agent | US-001 |
| US-004 | Story | DPDP consent at account setup | 3 | frontend-agent | US-001 |
| US-017 | Story | Data residency in India | 2 | devops-agent | — |
| US-018 | Story | Audit and ICT logging | 5 | backend-agent | — |

## Sprint 2: Sprint 2

Term data import pipeline (students/courses/timetables) and configurable shortage threshold.

Capacity: 20 points · Committed: 20

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-005 | Story | Upload student, course and timetable spreadsheets | 13 | backend-agent | US-002 |
| ↳ US-005-T1 | Task | Implement spreadsheet parser and validator for students/courses/timetables | — | backend-agent | — |
| ↳ US-005-T2 | Task | Build import API endpoints and job status tracking | — | backend-agent | — |
| ↳ US-005-T3 | Task | Wire background worker to process import jobs via Redis queue and S3 | — | devops-agent | — |
| ↳ US-005-T4 | Task | Ensure atomic import with no partial corruption on failure | — | backend-agent | — |
| US-006 | Story | Manual record entry and correction | 5 | backend-agent | US-005 |
| US-010 | Story | Configurable shortage threshold | 2 | backend-agent | US-002 |

## Sprint 3: Sprint 3

Account provisioning from rosters, roster attendance marking, and audited corrections.

Capacity: 20 points · Committed: 19

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-003 | Story | Accounts provisioned from rosters | 5 | backend-agent | US-005 |
| US-007 | Story | Mark present/absent on a class roster | 8 | backend-agent | US-005, US-002 |
| ↳ US-007-T1 | Task | Implement GET/PUT roster endpoints for session attendance | — | backend-agent | — |
| ↳ US-007-T2 | Task | Build roster marking UI optimized for low-bandwidth mobile | — | frontend-agent | — |
| ↳ US-007-T3 | Task | Add session completion status tracking | — | backend-agent | — |
| US-008 | Story | Correct marked attendance with audit trail | 5 | backend-agent | US-007, US-018 |
| US-019 | Story | No third-party tracking or targeted ads | 1 | devops-agent | — |

## Sprint 4: Sprint 4

Attendance percentage computation, shortage flagging, faculty dashboard and student self-service view.

Capacity: 20 points · Committed: 16

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-009 | Story | Compute attendance percentage per student per course | 5 | backend-agent | US-007 |
| US-011 | Story | Flag students below threshold | 3 | backend-agent | US-009, US-010 |
| US-012 | Story | Faculty dashboard overview | 5 | frontend-agent | US-007, US-009, US-011 |
| US-013 | Story | View my attendance | 3 | frontend-agent | US-009, US-002 |

## Sprint 5: Sprint 5

Shortage alerts (in-app + email) and filtered attendance reporting.

Capacity: 20 points · Committed: 16

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-014 | Story | Shortage alerts in-app and by email | 8 | backend-agent | US-011 |
| ↳ US-014-T1 | Task | Implement worker job to detect shortage and enqueue alerts | — | backend-agent | — |
| ↳ US-014-T2 | Task | Integrate SendGrid email sending with failure logging | — | integration-agent | — |
| ↳ US-014-T3 | Task | Build in-app notifications endpoint and display | — | frontend-agent | — |
| US-015 | Story | Generate filtered attendance reports | 8 | backend-agent | US-009, US-002 |
| ↳ US-015-T1 | Task | Implement report filter API with role-based scoping | — | backend-agent | — |
| ↳ US-015-T2 | Task | Build background worker job to assemble report data | — | backend-agent | — |
| ↳ US-015-T3 | Task | Build report filter UI for faculty/admin | — | frontend-agent | — |

## Sprint 6: Sprint 6

Report export to Excel/PDF and accessibility/responsiveness hardening.

Capacity: 20 points · Committed: 13

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-016 | Story | Export reports to Excel and PDF | 5 | backend-agent | US-015 |
| US-020 | Story | Accessible, responsive, low-bandwidth web app | 8 | frontend-agent | US-001, US-007, US-013, US-015 |
| ↳ US-020-T1 | Task | Audit and fix accessibility issues across core flows | — | frontend-agent | — |
| ↳ US-020-T2 | Task | Implement responsive layouts for mobile/low-bandwidth use | — | frontend-agent | — |
| ↳ US-020-T3 | Task | Run accessibility test suite (screen reader, keyboard-only) | — | qa-agent | — |

## Unscheduled

_Nothing unscheduled._
<!-- sdlc:auto:end sprints -->
