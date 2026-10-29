# Product Requirements

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
## Summary

### REQ-EPIC-001 · approved · source: requirements:EPIC-001

Email/password login, role-based access control, roster-driven account provisioning, and a DPDP consent notice at first login.

- US-001 (critical): login with email/password; correct credentials route to the role's dashboard (AC-001); incorrect credentials show a generic error not revealing which field was wrong (AC-002); forgotten-password reset link sent to registered email (AC-003).
- US-002 (critical): RBAC - students denied marking/admin screens and limited to own attendance (AC-004); faculty limited to assigned classes (AC-005); admin/HOD can manage data/config/reports but cannot alter the audit trail (AC-006).
- US-003 (high): accounts auto-provisioned from successful student/faculty roster imports with correct role (AC-007); never-logged-in accounts are forced to set their own password first (AC-008).
- US-004 (high): DPDP consent notice must be acknowledged before access, with timestamped record (AC-009); consent can later be withdrawn as easily as given, also timestamped (AC-010).
- Assumption stated in input: parents/guardians have no accounts in the initial scope.
- DPDP Act 2023: notice-and-consent capture and withdrawal is addressed by US-004.

**Related:** US-001, US-002, US-003, US-004, AC-001, AC-002, AC-003, AC-004, AC-005, AC-006, AC-007, AC-008, AC-009, AC-010, NFR-001, NFR-005, NFR-006

- ⚠ DPDP Act 2023: verifiable parental consent for data principals under 18 is not addressed; whether any enrolled students are minors is unconfirmed.
- ⚠ DPDP Act 2023 data-principal rights beyond consent withdrawal (access, correction, erasure, grievance redressal, consent-manager support) are not addressed by any requirement.

### REQ-EPIC-002 · approved · source: requirements:EPIC-002

Term-based Excel/CSV import of students, courses and timetables, plus manual record entry/correction, with no live SIS/ERP integration.

- US-005 (critical): upload Excel/CSV per term for students/courses/timetables with an import summary of rows imported (AC-011); missing columns/invalid rows rejected or reported per-row with no partial corruption (AC-012); timetable references to unknown students/courses are flagged, not silently orphaned (AC-013).
- US-006 (medium): admins can add/correct single student, course or timetable records without re-uploading (AC-014); duplicate student/course creation is warned and prevented (AC-015).
- Explicit scope note: no live SIS/ERP integration; spreadsheet upload replaces manual record entry at scale.

**Related:** US-005, US-006, AC-011, AC-012, AC-013, AC-014, AC-015, NFR-013

- ⚠ No SIS/LMS interoperability (OneRoster, LTI) is in scope; manual Excel/CSV import is the chosen approach - confirm this meets institutional integration needs.

### REQ-EPIC-003 · approved · source: requirements:EPIC-003

Faculty mark present/absent on assigned session rosters and can correct saved marks, with every correction written to an immutable audit log.

- US-007 (critical): faculty open an assigned session's roster, mark each enrolled student present/absent (AC-016); saved roster persists and the session shows completed (AC-017); marking/saving works on low-bandwidth mobile without a native app (AC-018).
- US-008 (high): a previously saved status can be changed, and the change is saved (AC-019) and written to an immutable audit log recording actor, old/new values and timestamp; admins/HODs can view original/corrected values, user and timestamp (AC-020).
- Assumption stated in input: no leave-application/condonation approval workflow in initial scope.
- IT Act/CERT-In alignment: tamper-evident audit trail for attendance corrections (US-008).

**Related:** US-007, US-008, AC-016, AC-017, AC-018, AC-019, AC-020, NFR-005, NFR-008

- ⚠ No condonation/leave-approval workflow is in scope, which limits formal academic-integrity dispute handling - confirm this is acceptable to the institution.

### REQ-EPIC-004 · approved · source: requirements:EPIC-004

Per-student per-course attendance percentage computation, a configurable minimum threshold (default 75%), and visible shortage flags.

- US-009 (critical): percentage = sessions present / sessions held, shown at consistent precision (AC-021); recalculated whenever a session is corrected (AC-022).
- US-010 (high): admin sets threshold on a configuration screen and it applies to flagging (AC-023); default of 75% used if unconfigured (AC-024).
- US-011 (high): students below threshold are visibly flagged on the relevant dashboard per course (AC-025); no flag shown at or above threshold (AC-026).

**Related:** US-009, US-010, US-011, AC-021, AC-022, AC-023, AC-024, AC-025, AC-026

- ⚠ The required decimal precision for displayed percentages is not numerically specified.

### REQ-EPIC-005 · approved · source: requirements:EPIC-005

Faculty dashboard surfacing assigned classes, unmarked sessions, and students flagged below threshold.

- US-012 (high): faculty dashboard shows assigned classes, sessions still to be marked, and flagged students (AC-027); selecting an unmarked session jumps directly to its roster for marking (AC-028).

**Related:** US-012, AC-027, AC-028

### REQ-EPIC-006 · approved · source: requirements:EPIC-006

Students view only their own per-course attendance and receive in-app plus email alerts when they drop below threshold.

- US-013 (high): student attendance view shows percentage per course and below-threshold status (AC-029); attempts to view another student's data are denied (AC-030).
- US-014 (high): a below-threshold event produces an in-app flag and an email alert naming the course (AC-031); if the email credential is missing or sending fails, the in-app flag still shows and the failure is logged for admin attention (AC-032).
- Assumption stated in input: email alerting uses a transactional provider requiring an SMTP/API credential.

**Related:** US-013, US-014, AC-029, AC-030, AC-031, AC-032, NFR-001, NFR-012

### REQ-EPIC-007 · approved · source: requirements:EPIC-007

Filtered attendance reporting by student/course/class/date-range, with Excel and PDF export.

- US-015 (high): generate reports filtered by student, course, class and/or date range with computed percentages matching the filters (AC-033); faculty reports scoped to their own assigned classes, admin/HOD can report institution-wide (AC-034).
- US-016 (medium): export the generated report as a downloadable Excel spreadsheet (AC-035) or PDF (AC-036), each matching the on-screen data.
- Assumption stated in input: reports exportable to Excel/PDF across student/course/class/date-range.

**Related:** US-015, US-016, AC-033, AC-034, AC-035, AC-036, NFR-010

### REQ-EPIC-008 · approved · source: requirements:EPIC-008

Cross-cutting India compliance: data residency, audit/ICT logging, no tracking/ads, and WCAG 2.1 AA / RPwD Act 2016 accessibility.

- US-017 (high): all persisted data is stored on infrastructure located within India (AC-037).
- US-018 (high): security-relevant and attendance-change events are logged with actor/action/timestamp (AC-038) and remain retrievable for 180 days (AC-039).
- US-019 (medium): no third-party tracking scripts or targeted advertising are present on any page (AC-040).
- US-020 (high): core flows (login, marking, viewing attendance, reports) adapt to mobile/low-bandwidth (AC-041) and conform to WCAG 2.1 AA / RPwD Act 2016 for screen-reader and keyboard-only use (AC-042).
- Assumption stated in input: no payment/billing functionality.
- DPDP Act 2023: data residency in India (US-017).
- CERT-In directions: 180-day ICT/audit log retention (US-018); the 6-hour cyber-incident reporting workflow and DPDP Data Protection Board breach-notification process are not addressed by any requirement.
- RPwD Act 2016 / WCAG 2.1 AA: accessible core flows (US-020).
- DPDP Act 2023: no tracking/targeted advertising, relevant to profiling of student data including any minors (US-019).

**Related:** US-017, US-018, US-019, US-020, AC-037, AC-038, AC-039, AC-040, AC-041, AC-042, NFR-002, NFR-003, NFR-004, NFR-007

- ⚠ CERT-In 6-hour breach reporting workflow and DPDP Data Protection Board breach-notification process are not covered by any requirement.
- ⚠ Whether the institution is a 'Significant Data Fiduciary' under DPDP (requiring an India-based DPO, periodic audits, and a DPIA) has not been assessed.
- ⚠ GIGW guideline applicability (relevant if the institution is government-run) has not been assessed.
- ⚠ IT (Intermediary) Rules 2021 obligations (grievance officer, content takedown process) are not addressed.

### REQ-NFR-SYSTEM · approved · source: requirements:NFR-009,NFR-011

System-wide non-functional requirements not tied to a single epic: browser-only delivery and single-institution scale.

- NFR-009: browser-based web app usable by students, faculty and HODs on phones and laptops; no native mobile app is provided.
- NFR-011: supports one institution of a few thousand students/faculty/HODs, including term-start import and session-marking peaks (target: a few thousand users, single institution).

**Related:** NFR-009, NFR-011

- ⚠ Scaling targets (a few thousand users, term-start/exam peaks) have not been load-tested since the testing phase has not started.
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
