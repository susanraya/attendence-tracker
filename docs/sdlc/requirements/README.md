# Product Requirements

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
## Summary

### EPIC-001 · draft · source: requirements:EPIC-001

Email/password login with role-based access control for faculty, students and admins/HODs; accounts are provisioned from imported rosters; DPDP consent is captured at first login with withdrawal supported.

US-001: login with email/password, generic error on failure (non-revealing), password reset via emailed link (AC-001..AC-003). US-002: RBAC - students see only their own data, faculty only assigned classes, admins manage data/config/reports but cannot alter the audit trail (AC-004..AC-006). US-003: accounts auto-provisioned from student/faculty roster import with correct role; first-ever login forces the user to set their own password (AC-007, AC-008). US-004: DPDP consent notice shown and must be acknowledged (with timestamp) before access; consent can later be withdrawn from privacy settings with the withdrawal recorded (AC-009, AC-010). Stated assumption: parents/guardians have no accounts in the initial scope.

**Related:** US-001, US-002, US-003, US-004, AC-001, AC-002, AC-003, AC-004, AC-005, AC-006, AC-007, AC-008, AC-009, AC-010

- ⚠ Assumption that parents/guardians have no accounts is not yet confirmed by the institution.
- ⚠ DPDP data-principal rights beyond consent withdrawal (e.g. access, correction, erasure, grievance redressal) are not specified.
- ⚠ Verifiable parental consent for students under 18 (required by DPDP for minors) is not addressed; unclear if any enrolled students are minors.

### EPIC-002 · draft · source: requirements:EPIC-002

Admins load students, courses and timetables each term via Excel/CSV upload, with validation and manual correction of individual records; no live SIS/ERP integration.

US-005: upload Excel/CSV for students, courses or timetables; successful import shows a row-count summary; invalid files are rejected or partially reported with a per-row error list and no partial corruption; unresolved cross-references (e.g. timetable referencing a missing course/student) are flagged, not silently orphaned (AC-011..AC-013). US-006: admins can add/edit individual student, course or timetable records without re-uploading the whole file, with duplicate detection warning before save (AC-014, AC-015). Explicitly out of scope: biometric/RFID devices and any live SIS/ERP/LMS integration (no LTI/OneRoster implemented).

**Related:** US-005, US-006, AC-011, AC-012, AC-013, AC-014, AC-015

- ⚠ No live SIS/ERP or LMS integration (LTI/OneRoster/SCORM) is implemented - confirm this is acceptable long-term or only an initial-scope limitation.

### EPIC-003 · draft · source: requirements:EPIC-003

Faculty mark present/absent on an assigned session's roster and can later correct a saved mark, with every correction captured in an immutable audit trail.

US-007: faculty open the roster for an assigned scheduled session, see enrolled students, mark each present/absent, and save; the session is then shown as completed; marking/saving must remain usable on a low-bandwidth mobile connection without a native app (AC-016..AC-018). US-008: faculty can change a previously saved status; the change is saved and an immutable audit-log entry records who changed what, when, and the old/new values; admins/HODs can review (but not alter) this log (AC-019, AC-020). Stated assumption: there is no formal leave/condonation approval workflow in the initial scope.

**Related:** US-007, US-008, AC-016, AC-017, AC-018, AC-019, AC-020

- ⚠ No leave-application or condonation workflow exists in this scope - confirm this matches institutional policy for exam eligibility decisions.

### EPIC-004 · draft · source: requirements:EPIC-004

Attendance percentage is computed per student per course (sessions present / sessions held) and recalculated on correction; students below a configurable threshold (default 75%) are flagged.

US-009: percentage computed to a consistent precision and recalculated whenever a session's marks are corrected (AC-021, AC-022). US-010: admins configure the minimum threshold on a configuration screen; saved value applies to flagging; default of 75% is used until configured (AC-023, AC-024). US-011: students below the configured threshold for a course are visibly flagged on the relevant dashboard; those at/above threshold show no flag (AC-025, AC-026).

**Related:** US-009, US-010, US-011, AC-021, AC-022, AC-023, AC-024, AC-025, AC-026

### EPIC-005 · draft · source: requirements:EPIC-005

Faculty dashboard surfaces assigned classes, sessions still needing marking, and students flagged below the attendance threshold.

US-012: faculty see, on one dashboard, their assigned classes, outstanding (unmarked) sessions, and flagged below-threshold students; selecting an unmarked session navigates directly to its roster for marking (AC-027, AC-028).

**Related:** US-012, AC-027, AC-028

### EPIC-006 · draft · source: requirements:EPIC-006

Students view their own per-course attendance percentage and threshold status, and receive in-app plus email shortage alerts; they cannot see other students' data.

US-013: students see their percentage and below-threshold status per course; attempts to view another student's data are denied (AC-029, AC-030). US-014: when attendance drops below threshold, the student gets an in-app flag and an email alert naming the course; if the email provider credential is not configured or sending fails, the in-app alert still shows and the failure is logged for admin attention (AC-031, AC-032).

**Related:** US-013, US-014, AC-029, AC-030, AC-031, AC-032

### EPIC-007 · draft · source: requirements:EPIC-007

Faculty and admins/HODs generate attendance reports filtered by student, course, class and date range, and export them to Excel or PDF.

US-015: report generation filters by student/course/class/date-range and returns only matching records with computed percentages; faculty reports are scoped to their assigned classes, admins/HODs can report institution-wide (AC-033, AC-034). US-016: a generated report can be exported as Excel or PDF matching the on-screen data (AC-035, AC-036).

**Related:** US-015, US-016, AC-033, AC-034, AC-035, AC-036

### EPIC-008 · draft · source: requirements:EPIC-008

Cross-cutting India-compliance and accessibility requirements: data residency, audit/ICT logging retention, no tracking/targeted ads, and WCAG 2.1 AA / RPwD Act 2016 accessibility on responsive, low-bandwidth web.

US-017 - DPDP: student and attendance data must be stored on infrastructure located within India (AC-037). US-018 - CERT-In: security-relevant and attendance-change events are logged with actor/action/timestamp and remain retrievable for 180 days (AC-038, AC-039). US-019 - DPDP/children's-privacy alignment: no third-party tracking scripts or targeted advertising are present (AC-040). US-020 - RPwD Act 2016 / WCAG 2.1 AA: core flows (login, marking, viewing attendance, reports) are responsive on mobile/low-bandwidth and usable with screen readers and keyboard-only navigation (AC-041, AC-042). Stated assumption: no payment/billing functionality is in scope.

**Related:** US-017, US-018, US-019, US-020, AC-037, AC-038, AC-039, AC-040, AC-041, AC-042

- ⚠ CERT-In's 6-hour cyber-incident reporting obligation and DPDP's breach-notification-to-Board/affected-persons process are not addressed beyond log retention.
- ⚠ Significant Data Fiduciary obligations (in-India DPO, periodic audits, data protection impact assessment) have not been evaluated for this institution.
- ⚠ DPDP consent-manager mechanism is not addressed - current design only captures a direct acknowledge/withdraw action.
- ⚠ GIGW guidelines applicability is unconfirmed (relevant only if this is a government-run institution).

### NFR-PRIVACY-SECURITY · draft · source: requirements:NFR-001,NFR-002,NFR-003,NFR-004,NFR-005,NFR-006

Privacy and security non-functional requirements: data isolation by role, no tracking, India data residency, 180-day audit retention, tamper-evident audit trail, and non-revealing login errors.

NFR-001: students see only their own data, faculty only their assigned classes. NFR-002: no third-party tracking or targeted advertising. NFR-003 (DPDP): all student/attendance data persisted within India. NFR-004 (CERT-In): every security-relevant and attendance-change event logged with actor/action/timestamp, retrievable for 180 days. NFR-005: the attendance-change audit log is immutable and tamper-evident; admins/HODs can read but not alter it. NFR-006: failed login shows a generic error not revealing which credential was wrong.

**Related:** US-002, US-013, US-019, US-017, US-018, US-008, US-001

### NFR-ACCESSIBILITY-USABILITY · draft · source: requirements:NFR-007,NFR-008,NFR-009

Accessibility and device-compatibility non-functional requirements: WCAG 2.1 AA / RPwD Act 2016 conformance, responsiveness on low bandwidth, and browser-only (no native app) usage.

NFR-007 (RPwD Act 2016 / WCAG 2.1 AA): core flows conform including screen-reader and keyboard-only use. NFR-008: layout adapts to mobile and remains usable on low-bandwidth connections, including marking and saving a roster. NFR-009: the product is browser-based for phones and laptops; no native mobile app is provided (explicitly out of scope).

**Related:** US-020, US-007

### NFR-PERFORMANCE-SCALE · draft · source: requirements:NFR-010,NFR-011,NFR-012,NFR-013

Performance, scale and resilience non-functional requirements: background processing for heavy jobs, single-institution scale target, graceful email-outage handling, and no partial corruption on import.

NFR-010: spreadsheet parsing, percentage recomputation, report generation and batch emails run in the background so UI is never blocked. NFR-011: system sized for one institution of a few thousand students/faculty/HODs, including term-start and marking peaks. NFR-012: if SendGrid credential is missing/fails, in-app shortage flag still shows and the failure is logged for admin attention. NFR-013: invalid import files are rejected or partially reported with a per-row error list, leaving no partially corrupted data.

**Related:** US-005, US-016, US-014, US-020
<!-- sdlc:auto:end narrative -->

<!-- sdlc:auto:start summary -->
**Requirements version:** v1  
**Delivery scope:** lightweight  
**Approved:** 2026-10-29

**Capabilities in scope:** Class roster present/absent marking per session, Attendance percentage computation per student per course, Below-threshold shortage flag on dashboard (default 75%), Student, course and class-timetable record entry, Faculty attendance dashboard, Email/password login

**Approved technology stack:**

| Layer | Choice | Rationale |
|---|---|---|
| backend | FastAPI | The core work here is tabular and rule-based: parse each term's Excel/CSV upload, compute attendance percentage per student per course, flag anyone below the configurable 75% threshold, and write an audit trail on every edit. FastAPI (Python) sits directly on the mature pandas/openpyxl spreadsheet and PDF-export tooling you need, and is the platform's supported backend, so your import pipeline and report generation use first-class libraries rather than workarounds. |
| cloud | AWS | Your stated requirement is that student attendance data stays in India under DPDP, with audit/ICT logs kept 180 days per CERT-In. AWS operates full regions in Mumbai and Hyderabad, letting you pin the database, file storage and logs to Indian soil, and is the platform's supported cloud. For one institution of a few thousand students it is more than enough capacity while handling term-start and marking peaks. |
| database | PostgreSQL | Attendance is structured relational data -- students, courses, timetables, sessions, mark records -- and your reports slice it per student, course, class and date range, which is exactly what SQL aggregation does well at a few-thousand-student scale. PostgreSQL also gives you reliable transactions so a correction and its audit-log entry are saved together, supporting the DPDP consent records and tamper-evident edit history you committed to. |
| frontend | React | Your students, faculty and HODs will all use this from a browser on phones and laptops, often on low-bandwidth connections, and it must meet WCAG 2.1 AA / RPwD Act accessibility. React is the platform's supported web option and has the richest set of accessible, keyboard-navigable component libraries, so the roster-marking screen, dashboards and report filters can be built to that standard without reinventing form controls. |
<!-- sdlc:auto:end summary -->

<!-- sdlc:auto:start epics -->
## EPIC-001: Authentication & Role-Based Access

Email/password login with role-based access control separating faculty, students and admins/HODs. Accounts are provisioned from imported rosters. A DPDP consent notice is presented at first login/account setup. Assumption: parents/guardians have no accounts in the initial scope.

### US-001: Email/password login

**Priority:** critical

> As a registered user (faculty, student or admin/HOD), I want to log in with my email and password, so that I can securely access the features for my role.

| ID | Given | When | Then |
|---|---|---|---|
| AC-001 | I have a provisioned account | I enter my correct email and password | I am authenticated and taken to the dashboard for my role |
| AC-002 | I am on the login page | I enter an incorrect email or password | I am denied access and shown a generic error that does not reveal which field was wrong |
| AC-003 | I have forgotten my password | I request a password reset for my email | a reset link is sent to my registered email and I can set a new password |

### US-002: Role-based access control

**Priority:** critical

> As a institution administrator, I want access to features and data to be restricted by role, so that faculty, students and admins/HODs only see what their role permits.

| ID | Given | When | Then |
|---|---|---|---|
| AC-004 | I am logged in as a student | I attempt to open attendance-marking or admin screens | access is denied and only my own attendance views are available |
| AC-005 | I am logged in as faculty | I access attendance marking | I can only mark and view rosters for classes assigned to me |
| AC-006 | I am logged in as an admin/HOD | I access the system | I can manage imported data, configuration and reports but cannot alter the audit trail |

### US-003: Accounts provisioned from rosters

**Priority:** high

> As a institution administrator, I want user accounts to be created from the imported student and faculty rosters, so that I do not have to create accounts manually for a few thousand students.

| ID | Given | When | Then |
|---|---|---|---|
| AC-007 | a roster import containing student and faculty records with email addresses | the import completes successfully | accounts are provisioned for each record with the correct role assigned |
| AC-008 | a provisioned account that has never logged in | the user first authenticates (via an initial credential or reset flow) | they are prompted to set their own password before continuing |

### US-004: DPDP consent at account setup

**Priority:** high

> As a student whose personal data is processed, I want to be shown a consent notice at first login with the ability to withdraw consent, so that my data is handled in line with DPDP expectations.

| ID | Given | When | Then |
|---|---|---|---|
| AC-009 | I am logging in for the first time | the consent notice is displayed | I must acknowledge it before accessing the system, and the acknowledgement is recorded with timestamp |
| AC-010 | I have previously given consent | I open my privacy settings | I can withdraw consent as easily as it was given, and the withdrawal is recorded. Assumption: DPDP consent notice with withdrawal is required. |

## EPIC-002: Term Data Import (Students, Courses, Timetables)

Admins load students, courses and class timetables each term by uploading Excel/CSV spreadsheets. No live SIS/ERP integration. This replaces manual record entry at the scale of a few thousand students.

### US-005: Upload student, course and timetable spreadsheets

**Priority:** critical

> As a institution administrator, I want to upload Excel/CSV files of students, courses and class timetables each term, so that the system is loaded with the data needed to mark attendance.

| ID | Given | When | Then |
|---|---|---|---|
| AC-011 | I have a correctly formatted Excel or CSV file | I upload it for students, courses or timetables | the records are created and a summary of rows imported is shown |
| AC-012 | an uploaded file has missing required columns or invalid rows | I submit the file | the import is rejected or partially reported with a clear per-row error list, and no partial corruption is left behind |
| AC-013 | a file references a course or student that does not exist | I import a timetable that links them | the system flags the unresolved references rather than silently creating orphans |

### US-006: Manual record entry and correction

**Priority:** medium

> As a institution administrator, I want to add or correct individual student, course and timetable records in the app, so that I can fix small errors without re-uploading an entire spreadsheet.

| ID | Given | When | Then |
|---|---|---|---|
| AC-014 | an imported dataset | I edit or add a single student, course or timetable entry | the change is saved and reflected in rosters and computations |
| AC-015 | I attempt to create a duplicate student or course record | I save | the system warns me of the existing record and prevents accidental duplication |

## EPIC-003: Session Attendance Marking

Faculty open the roster for a scheduled class session and mark each student present or absent via the web app. Faculty can correct previously marked attendance, with every change captured in an audit trail. No leave-application or condonation workflow in the initial scope.

### US-007: Mark present/absent on a class roster

**Priority:** critical

> As a faculty member, I want to open the roster for a class session and mark each student present or absent, so that attendance is recorded for that session.

| ID | Given | When | Then |
|---|---|---|---|
| AC-016 | I am assigned to a scheduled class session | I open its roster | I see the enrolled students and can mark each as present or absent |
| AC-017 | I have marked all students for a session | I save the roster | the attendance records are persisted and the session is shown as completed |
| AC-018 | I am on a low-bandwidth mobile connection | I mark and save a roster | the page remains usable and the save succeeds without requiring a native app |

### US-008: Correct marked attendance with audit trail

**Priority:** high

> As a faculty member, I want to edit attendance I previously marked, so that I can fix mistakes without a formal leave/condonation process.

| ID | Given | When | Then |
|---|---|---|---|
| AC-019 | a session roster I have already saved | I change a student's status from present to absent or vice versa | the updated status is saved and the change is written to an immutable audit log recording who changed what, when and the old and new values |
| AC-020 | an audit log entry exists for an attendance change | an admin/HOD reviews it | the original and corrected values, the user and timestamp are all visible. Assumption: faculty can edit marked attendance; there is no condonation approval workflow in initial scope. |

## EPIC-004: Attendance Computation & Shortage Flagging

The system computes attendance percentage per student per course and flags students who fall below a configurable minimum threshold (default 75%). The threshold is configurable by admins.

### US-009: Compute attendance percentage per student per course

**Priority:** critical

> As a student or staff member, I want the system to calculate attendance percentage for each student in each course, so that accurate attendance figures are available for viewing and reporting.

| ID | Given | When | Then |
|---|---|---|---|
| AC-021 | sessions have been marked for a course | attendance is computed | each student's percentage equals sessions present divided by total held sessions for that course, shown to a consistent precision |
| AC-022 | attendance is corrected for a session | the correction is saved | the affected student's percentage for that course is recalculated |

### US-010: Configurable shortage threshold

**Priority:** high

> As a institution administrator, I want to configure the minimum attendance threshold, so that shortage flagging matches our institution's policy.

| ID | Given | When | Then |
|---|---|---|---|
| AC-023 | I am an admin on the configuration screen | I set the minimum attendance threshold | the new value is saved and applied to shortage flagging |
| AC-024 | no threshold has been configured | the system evaluates shortage | it uses the default of 75%. Assumption: threshold is configurable, default 75%. |

### US-011: Flag students below threshold

**Priority:** high

> As a faculty member or admin/HOD, I want students whose attendance falls below the threshold to be flagged, so that at-risk students are easy to identify.

| ID | Given | When | Then |
|---|---|---|---|
| AC-025 | a student's attendance in a course is below the configured threshold | I view the relevant dashboard | the student is visibly flagged as below threshold for that course |
| AC-026 | a student's attendance is at or above the threshold | I view the dashboard | no shortage flag is shown for that course |

## EPIC-005: Faculty Attendance Dashboard

A dashboard for faculty showing their assigned classes, sessions pending marking, and students flagged below the attendance threshold.

### US-012: Faculty dashboard overview

**Priority:** high

> As a faculty member, I want a dashboard of my classes and their attendance status, so that I can see at a glance what needs marking and who is at risk.

| ID | Given | When | Then |
|---|---|---|---|
| AC-027 | I am logged in as faculty with assigned classes | I open my dashboard | I see my classes, sessions still to be marked, and students flagged below the threshold |
| AC-028 | there are unmarked sessions | I select one from the dashboard | I am taken directly to its roster for marking |

## EPIC-006: Student Self-Service & Shortage Alerts

Students log in to view their own attendance percentage per course and receive shortage alerts via in-app notifications plus email through a transactional email provider. Students cannot see other students' data.

### US-013: View my attendance

**Priority:** high

> As a student, I want to view my attendance percentage for each of my courses, so that I can track my standing and avoid falling short.

| ID | Given | When | Then |
|---|---|---|---|
| AC-029 | I am logged in as a student | I open my attendance view | I see my attendance percentage per course and whether I am below the threshold |
| AC-030 | I am a student | I attempt to view another student's attendance | access is denied and only my own records are shown |

### US-014: Shortage alerts in-app and by email

**Priority:** high

> As a student, I want to be alerted when my attendance drops below the threshold, so that I can act before it affects my eligibility.

| ID | Given | When | Then |
|---|---|---|---|
| AC-031 | my attendance in a course falls below the configured threshold | the shortage is detected | I receive an in-app flag and an email alert identifying the affected course |
| AC-032 | the transactional email provider credential is not configured | a shortage alert is triggered | the in-app alert is still shown and the email failure is logged for admin attention. Assumption: email uses a transactional provider needing an SMTP/API credential. |

## EPIC-007: Attendance Reporting & Export

Admins/HODs and faculty can generate and export attendance reports filtered per student, course, class and date range, to Excel and PDF.

### US-015: Generate filtered attendance reports

**Priority:** high

> As a faculty member or admin/HOD, I want to generate attendance reports filtered by student, course, class and date range, so that I can review attendance for the scope I need.

| ID | Given | When | Then |
|---|---|---|---|
| AC-033 | attendance data exists | I generate a report with filters for student, course, class and/or date range | the report shows only records matching those filters with computed percentages |
| AC-034 | I am faculty | I generate a report | it is scoped to classes I am assigned to, while an admin/HOD can report across the institution |

### US-016: Export reports to Excel and PDF

**Priority:** medium

> As a faculty member or admin/HOD, I want to export an attendance report to Excel or PDF, so that I can share or archive it outside the system.

| ID | Given | When | Then |
|---|---|---|---|
| AC-035 | a generated report | I choose to export as Excel | a downloadable spreadsheet matching the on-screen data is produced |
| AC-036 | a generated report | I choose to export as PDF | a downloadable PDF matching the on-screen data is produced. Assumption: reports exportable to Excel/PDF across student/course/class/date-range. |

## EPIC-008: Privacy, Compliance & Accessibility

Cross-cutting compliance for an India-based institution: data stored within India, DPDP-aligned consent with withdrawal, CERT-In-aligned audit/ICT logging retained 180 days, no third-party tracking or targeted ads, and a responsive, accessible (WCAG 2.1 AA / RPwD Act 2016) web app usable on mobile and low bandwidth. Assumption: no payment/billing functionality.

### US-017: Data residency in India

**Priority:** high

> As a institution administrator responsible for compliance, I want student and attendance data to be stored within India, so that we meet DPDP data-handling expectations.

| ID | Given | When | Then |
|---|---|---|---|
| AC-037 | the system is deployed | data is persisted | it is stored in infrastructure located within India. Assumption: data stored within India. |

### US-018: Audit and ICT logging

**Priority:** high

> As a institution administrator responsible for compliance, I want security and attendance-change events to be logged and retained for 180 days, so that we align with CERT-In directions and can investigate incidents.

| ID | Given | When | Then |
|---|---|---|---|
| AC-038 | a security-relevant or attendance-change event occurs | it is recorded | an ICT/audit log entry is written with actor, action and timestamp |
| AC-039 | audit/ICT logs exist | 180 days have not yet elapsed | the logs remain retrievable. Assumption: CERT-In-aligned logs retained 180 days. |

### US-019: No third-party tracking or targeted ads

**Priority:** medium

> As a student, I want assurance that the system does not run tracking or targeted advertising, so that my data is not used for profiling.

| ID | Given | When | Then |
|---|---|---|---|
| AC-040 | I use the application | pages load | no third-party tracking scripts or targeted advertising are present. Assumption: no tracking/targeted ads. |

### US-020: Accessible, responsive, low-bandwidth web app

**Priority:** high

> As a user on a mobile device or low-bandwidth connection, I want the web app to be responsive and accessible, so that I can use it regardless of device or disability.

| ID | Given | When | Then |
|---|---|---|---|
| AC-041 | I open the app on a mobile screen or slow connection | I navigate core flows (login, marking, viewing attendance, reports) | the layout adapts and remains usable without a native app |
| AC-042 | I use assistive technology such as a screen reader or keyboard-only navigation | I use core flows | they conform to WCAG 2.1 AA / RPwD Act 2016 expectations. Assumption: accessibility is a release expectation. |
<!-- sdlc:auto:end epics -->
