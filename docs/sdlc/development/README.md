# Development

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
### DEV-PLAN-SPRINTS · approved · source: dev:plan v1

Approved v1 plan spans 6 sprints at capacity 20 each, sequencing epics from auth/compliance foundations through accessibility hardening.

- Sprint 1: Authentication, RBAC, DPDP consent, and compliance foundations (India data residency, audit/ICT logging). Capacity 20.
- Sprint 2: Term data import pipeline (students/courses/timetables) and configurable shortage threshold. Capacity 20.
- Sprint 3: Account provisioning from rosters, roster attendance marking, and audited corrections. Capacity 20.
- Sprint 4: Attendance percentage computation, shortage flagging, faculty dashboard and student self-service view. Capacity 20.
- Sprint 5: Shortage alerts (in-app + email) and filtered attendance reporting. Capacity 20.
- Sprint 6: Report export to Excel/PDF and accessibility/responsiveness hardening. Capacity 20.

**Related:** EPIC-001, EPIC-002, EPIC-003, EPIC-004, EPIC-005, EPIC-006, EPIC-007, EPIC-008

- ⚠ Input lists sprint goals and a flat backlog of items but does not explicitly map each item to a sprint number; exact sprint scheduling per item is not confirmed.
- ⚠ No sprint start/end dates were given.

### DEV-ITEMS-EPIC-001 · draft · source: dev:EPIC-001

Planned backlog for Authentication & Role-Based Access.

- EPIC-001 [epic], role unassigned (container).
- US-001 Email/password login - 5 pts, backend-agent.
- US-002 Role-based access control - 5 pts, backend-agent.
- US-003 Accounts provisioned from rosters - 5 pts, backend-agent.
- US-004 DPDP consent at account setup - 3 pts, frontend-agent.

**Related:** US-001, US-002, US-003, US-004

- ⚠ No completion/status field is provided for any item - cannot confirm whether this work has actually been implemented, only that it is planned and assigned.

### DEV-ITEMS-EPIC-002 · draft · source: dev:EPIC-002

Planned backlog for Term Data Import (students, courses, timetables).

- US-005 Upload student/course/timetable spreadsheets - 13 pts, backend-agent. Tasks: T1 parser/validator (backend-agent); T2 import API + job status tracking (backend-agent); T3 worker wiring via Redis queue and S3 (devops-agent); T4 atomic import with no partial corruption (backend-agent).
- US-006 Manual record entry and correction - 5 pts, backend-agent.

**Related:** US-005, US-006

- ⚠ No completion/status field is provided for any item.
- ⚠ Atomic/no-partial-corruption behavior (T4) is planned but not yet verified by any test since the testing phase is absent.

### DEV-ITEMS-EPIC-003 · draft · source: dev:EPIC-003

Planned backlog for Session Attendance Marking.

- US-007 Mark present/absent on a class roster - 8 pts, backend-agent. Tasks: T1 GET/PUT roster endpoints (backend-agent); T2 low-bandwidth mobile roster UI (frontend-agent); T3 session completion status tracking (backend-agent).
- US-008 Correct marked attendance with audit trail - 5 pts, backend-agent.

**Related:** US-007, US-008

- ⚠ No completion/status field is provided for any item.
- ⚠ Audit-trail immutability is planned but not yet verified by any test.

### DEV-ITEMS-EPIC-004 · draft · source: dev:EPIC-004

Planned backlog for Attendance Computation & Shortage Flagging.

- US-009 Compute attendance percentage per student per course - 5 pts, backend-agent.
- US-010 Configurable shortage threshold - 2 pts, backend-agent.
- US-011 Flag students below threshold - 3 pts, backend-agent.

**Related:** US-009, US-010, US-011

- ⚠ No completion/status field is provided for any item.

### DEV-ITEMS-EPIC-005 · draft · source: dev:EPIC-005

Planned backlog for Faculty Attendance Dashboard.

- US-012 Faculty dashboard overview - 5 pts, frontend-agent.

**Related:** US-012

- ⚠ No completion/status field is provided for this item.

### DEV-ITEMS-EPIC-006 · draft · source: dev:EPIC-006

Planned backlog for Student Self-Service & Shortage Alerts.

- US-013 View my attendance - 3 pts, frontend-agent.
- US-014 Shortage alerts in-app and by email - 8 pts, backend-agent. Tasks: T1 worker job to detect shortage and enqueue alerts (backend-agent); T2 SendGrid integration with failure logging (integration-agent); T3 in-app notifications endpoint and display (frontend-agent).

**Related:** US-013, US-014

- ⚠ No completion/status field is provided for any item.
- ⚠ Email delivery and failure-logging behavior are planned but not yet verified by any test.

### DEV-ITEMS-EPIC-007 · draft · source: dev:EPIC-007

Planned backlog for Attendance Reporting & Export.

- US-015 Generate filtered attendance reports - 8 pts, backend-agent. Tasks: T1 report filter API with role-based scoping (backend-agent); T2 background worker job to assemble report data (backend-agent); T3 report filter UI for faculty/admin (frontend-agent).
- US-016 Export reports to Excel and PDF - 5 pts, backend-agent.

**Related:** US-015, US-016

- ⚠ No completion/status field is provided for any item.

### DEV-ITEMS-EPIC-008 · draft · source: dev:EPIC-008

Planned backlog for Privacy, Compliance & Accessibility.

- US-017 Data residency in India - 2 pts, devops-agent.
- US-018 Audit and ICT logging - 5 pts, backend-agent.
- US-019 No third-party tracking or targeted ads - 1 pt, devops-agent.
- US-020 Accessible, responsive, low-bandwidth web app - 8 pts, frontend-agent. Tasks: T1 accessibility audit and fixes across core flows (frontend-agent); T2 responsive layouts for mobile/low-bandwidth (frontend-agent); T3 run accessibility test suite, screen reader and keyboard-only (qa-agent).

**Related:** US-017, US-018, US-019, US-020

- ⚠ No completion/status field is provided for any item.
- ⚠ The accessibility test suite (T3) is planned for a qa-agent but no results have been reported - WCAG 2.1 AA / RPwD Act 2016 conformance is not yet verified.
<!-- sdlc:auto:end narrative -->
