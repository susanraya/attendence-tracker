# Traceability Matrix

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start legend -->
Built from recorded links, not written by a model: requirement key → plan item (`source_stable_key`) → development ticket (`stable_key`) → the ticket's test steps → the last live deployment that started after the work finished. **AC tests** counts the story's acceptance criteria that have a test case, and those whose test cases all passed in the latest finished E2E run.
<!-- sdlc:auto:end legend -->

<!-- sdlc:auto:start matrix -->
| Requirement | Epic | Title | Plan items | Sprint | Design | Code | Commits | Ticket | Tests | AC tests | Deployed |
|---|---|---|---|---|---|---|---|---|---|---|---|
| US-001 | EPIC-001 | Email/password login | US-001 | 1 | POST /auth/login, POST /auth/password-reset/request, POST /auth/set-password, api, db, users, web | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-002 | EPIC-001 | Role-based access control | US-002 | 1 | api, course_assignments, db, users | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-003 | EPIC-001 | Accounts provisioned from rosters | US-003 | 3 | POST /auth/set-password, api, course_assignments, db, students, users, worker | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-004 | EPIC-001 | DPDP consent at account setup | US-004 | 1 | DELETE /consent, POST /consent, api, users, web | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-005 | EPIC-002 | Upload student, course and timetable spreadsheets | US-005, US-005-T1, US-005-T2, US-005-T3, US-005-T4 | 2 | GET /imports/{id}, POST /courses, POST /imports, POST /students, POST /timetable, api, class_sessions, courses, db, import_jobs, object_store, queue, students, worker | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-006 | EPIC-002 | Manual record entry and correction | US-006 | 2 | POST /courses, POST /students, POST /timetable, api, class_sessions, courses, db, students | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-007 | EPIC-003 | Mark present/absent on a class roster | US-007, US-007-T1, US-007-T2, US-007-T3 | 3 | GET /sessions/{id}/roster, PUT /sessions/{id}/roster, api, attendance_records, class_sessions, db, enrollments, web | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-008 | EPIC-003 | Correct marked attendance with audit trail | US-008 | 3 | PATCH /attendance/{record_id}, api, attendance_audit, attendance_records, db | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-009 | EPIC-004 | Compute attendance percentage per student per course | US-009 | 4 | api, attendance_records, attendance_summary, db, worker | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-010 | EPIC-004 | Configurable shortage threshold | US-010 | 2 | GET /config/threshold, PUT /config/threshold, api, app_config, db | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-011 | EPIC-004 | Flag students below threshold | US-011 | 4 | api, app_config, attendance_summary, db | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-012 | EPIC-005 | Faculty dashboard overview | US-012 | 4 | GET /dashboard/faculty, api, attendance_summary, class_sessions, course_assignments, web | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-013 | EPIC-006 | View my attendance | US-013 | 4 | GET /attendance/me, api, attendance_summary, web | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-014 | EPIC-006 | Shortage alerts in-app and by email | US-014, US-014-T1, US-014-T2, US-014-T3 | 5 | GET /notifications, api, attendance_summary, email, notifications, web, worker | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-015 | EPIC-007 | Generate filtered attendance reports | US-015, US-015-T1, US-015-T2, US-015-T3 | 5 | POST /reports, api, attendance_records, attendance_summary, class_sessions, courses, db, students, web, worker | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-016 | EPIC-007 | Export reports to Excel and PDF | US-016 | 6 | GET /reports/{id}/download, api, object_store, worker | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-017 | EPIC-008 | Data residency in India | US-017 | 1 | db, object_store | — | — | not started | not run | 0/1 tested · 0/1 passing | — |
| US-018 | EPIC-008 | Audit and ICT logging | US-018 | 1 | GET /audit/attendance, api, attendance_audit, db, ict_audit_log | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-019 | EPIC-008 | No third-party tracking or targeted ads | US-019 | 3 | web | — | — | not started | not run | 0/1 tested · 0/1 passing | — |
| US-020 | EPIC-008 | Accessible, responsive, low-bandwidth web app | US-020, US-020-T1, US-020-T2, US-020-T3 | 6 | GET /attendance/me, POST /auth/login, POST /reports, PUT /sessions/{id}/roster, web | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
<!-- sdlc:auto:end matrix -->
