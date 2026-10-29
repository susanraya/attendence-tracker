# Product Requirements

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
## Summary

### REQ-META-001 · approved · source: requirements:stack+services+scope

Approved technology stack, runtime services, API keys, and explicit scope boundaries for the lightweight attendance-tracker build.

Delivery scope: lightweight. Requirements version: 1. Stack approved by product owner (design against exactly these): Backend FastAPI 0.115 (tabular/rule-based processing, pandas/openpyxl for import+export); Cloud AWS (Mumbai/Hyderabad regions for India data residency and term-start/marking peak capacity); Database PostgreSQL 16 (relational attendance data, transactional correction+audit-log writes); Frontend React 19 (accessible, keyboard-navigable components for WCAG 2.1 AA / RPwD, low-bandwidth mobile/laptop use). Runtime services: SendGrid (SaaS email, env SENDGRID_API_KEY) for shortage alerts; Amazon S3 (SaaS storage, envs AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY/AWS_REGION/S3_BUCKET) for roster uploads and exported reports, India-resident; Redis (container redis:7-alpine) as background job queue for import parsing, recomputation, report generation and batch email. API keys needed: AWS_ACCESS_KEY_ID, AWS_REGION, AWS_SECRET_ACCESS_KEY, REDIS_URL, S3_BUCKET, SENDGRID_API_KEY. Explicitly out of scope: biometric fingerprint/RFID attendance devices; native iOS/Android apps. Capabilities in scope: roster present/absent marking, per-student/per-course percentage computation, below-threshold flagging (default 75%), student/course/timetable record entry, faculty dashboard, email/password login.

- ⚠ No architecture document yet translates this approved stack into a component/deployment design — architecture phase has not started.

### US-001 · draft · source: requirements:EPIC-001:US-001

Registered faculty, students, and admins/HODs log in with email and password and land on the dashboard for their role.

AC-001: correct credentials authenticate and route to the role-specific dashboard. AC-002: incorrect email or password is denied with a generic error that does not reveal which field was wrong (satisfies NFR-006). AC-003: a forgotten-password request sends a reset link to the registered email, allowing the user to set a new password. Priority: critical.

**Related:** EPIC-001, AC-001, AC-002, AC-003, NFR-006

- ⚠ Reset-link expiry/validity period is not specified.

### US-002 · draft · source: requirements:EPIC-001:US-002

Role-based access control restricts features and data so students, faculty, and admins/HODs only see what their role permits.

AC-004: a student attempting attendance-marking or admin screens is denied and sees only their own attendance (ties to NFR-001). AC-005: faculty can mark/view rosters only for classes assigned to them. AC-006: admin/HOD can manage imported data, configuration, and reports but cannot alter the audit trail (ties to NFR-005, tamper-evident audit trail). Priority: critical.

**Related:** EPIC-001, AC-004, AC-005, AC-006, NFR-001, NFR-005

### US-003 · draft · source: requirements:EPIC-001:US-003

Accounts for students and faculty are auto-provisioned from imported rosters with the correct role, avoiding manual creation at scale.

AC-007: on successful roster import containing student/faculty records with emails, accounts are provisioned with the correct role. AC-008: a provisioned account that has never logged in is prompted, via an initial credential or reset flow, to set its own password before continuing. Priority: high. Depends on the term-import pipeline (EPIC-002).

**Related:** EPIC-001, EPIC-002, AC-007, AC-008

- ⚠ Exact delivery mechanism for the 'initial credential' (temporary password vs. reset-link-only) is not specified.

### US-004 · draft · source: requirements:EPIC-001:US-004

A DPDP consent notice is shown at first login and must be acknowledged; users can later withdraw consent from privacy settings.

DPDP Act 2023: notice-and-consent, data-principal right to withdraw consent. AC-009: consent notice must be acknowledged before system access, acknowledgement timestamped. AC-010: a user who previously consented can withdraw it from privacy settings as easily as it was given, and the withdrawal is recorded. Assumption stated in input: a DPDP consent notice with withdrawal is required. Priority: high.

**Related:** EPIC-001, AC-009, AC-010

- ⚠ No mechanism for verifiable parental/guardian consent for any enrolled student under 18 is described; confirm whether any students are minors, since current scope assumes guardians have no accounts.
- ⚠ DPDP breach-notification duties and 'Significant Data Fiduciary' obligations (in-India DPO, audits, impact assessments) are not addressed by this or any other story.

### US-005 · draft · source: requirements:EPIC-002:US-005

Admins upload Excel/CSV files of students, courses, and class timetables each term; a row-import summary is shown.

AC-011: a correctly formatted file creates records and shows a summary of rows imported. AC-012: a file with missing required columns or invalid rows is rejected or partially reported with a per-row error list, leaving no partial corruption (ties to NFR-013). AC-013: a timetable referencing a nonexistent student/course is flagged as an unresolved reference rather than silently creating orphans. Runs as a background job (ties to NFR-010). Priority: critical.

**Related:** EPIC-002, AC-011, AC-012, AC-013, NFR-010, NFR-013

- ⚠ Exact required column schema/template for student, course, and timetable files is not specified.

### US-006 · draft · source: requirements:EPIC-002:US-006

Admins can manually add or correct individual student, course, and timetable records without re-uploading a full spreadsheet.

AC-014: an edit or addition is saved and reflected in rosters and computations. AC-015: attempting to create a duplicate student or course record triggers a warning and prevents the duplicate. Priority: medium.

**Related:** EPIC-002, AC-014, AC-015

### US-007 · draft · source: requirements:EPIC-003:US-007

Faculty open the roster for an assigned class session and mark each enrolled student present or absent.

AC-016: faculty assigned to a scheduled session see enrolled students and mark each present/absent. AC-017: saving persists the records and marks the session completed. AC-018: on a low-bandwidth mobile connection, the page remains usable and the save succeeds without a native app (ties to NFR-008). Priority: critical.

**Related:** EPIC-003, AC-016, AC-017, AC-018, NFR-008

### US-008 · draft · source: requirements:EPIC-003:US-008

Faculty can edit previously saved attendance; every change is written to an immutable audit log.

AC-019: changing a student's status is saved and logged immutably with who changed what, when, and old/new values (ties to NFR-005). AC-020: admin/HOD reviewing the log sees original and corrected values, actor, and timestamp. Assumption: faculty can edit marked attendance; there is no condonation/approval workflow in the initial scope. Priority: high.

**Related:** EPIC-003, AC-019, AC-020, NFR-005

### US-009 · draft · source: requirements:EPIC-004:US-009

The system computes each student's attendance percentage per course as sessions present divided by sessions held.

AC-021: percentage = present / total held sessions for the course, shown to a consistent precision. AC-022: correcting a session recalculates the affected student's percentage for that course. Priority: critical.

**Related:** EPIC-004, AC-021, AC-022

- ⚠ Display precision (number of decimal places) for the percentage is not specified.

### US-010 · draft · source: requirements:EPIC-004:US-010

Admins configure the minimum attendance threshold used for shortage flagging; defaults to 75% if unset.

AC-023: admin sets the threshold on a configuration screen and the value is saved and applied. AC-024: if no threshold is configured, the system defaults to 75%. Assumption: threshold is configurable, default 75%. Priority: high.

**Related:** EPIC-004, AC-023, AC-024

### US-011 · draft · source: requirements:EPIC-004:US-011

Students below the configured threshold are visibly flagged on dashboards; those at or above are not.

AC-025: a student below the configured threshold for a course is visibly flagged on the relevant dashboard. AC-026: a student at or above threshold shows no shortage flag. Priority: high.

**Related:** EPIC-004, AC-025, AC-026, US-010

### US-012 · draft · source: requirements:EPIC-005:US-012

Faculty dashboard shows assigned classes, sessions pending marking, and below-threshold students.

AC-027: dashboard shows faculty's classes, sessions still to mark, and students flagged below threshold. AC-028: selecting an unmarked session from the dashboard goes directly to its roster for marking. Priority: high.

**Related:** EPIC-005, AC-027, AC-028

### US-013 · draft · source: requirements:EPIC-006:US-013

Students view their own attendance percentage per course and whether they are below threshold; cannot see others' data.

AC-029: student's attendance view shows percentage per course and threshold status. AC-030: attempting to view another student's attendance is denied; only own records shown (ties to NFR-001). Priority: high.

**Related:** EPIC-006, AC-029, AC-030, NFR-001

### US-014 · draft · source: requirements:EPIC-006:US-014

Students receive an in-app flag and email alert when their attendance in a course drops below threshold.

AC-031: shortage detection produces an in-app flag plus an email alert naming the affected course. AC-032: if the email provider credential is not configured, the in-app alert is still shown and the email failure is logged for admin attention (ties to NFR-012). Sent via background batch job (ties to NFR-010). Assumption: email uses a transactional provider requiring an SMTP/API credential (SendGrid). Priority: high.

**Related:** EPIC-006, AC-031, AC-032, NFR-010, NFR-012

### US-015 · draft · source: requirements:EPIC-007:US-015

Faculty and admins/HODs generate attendance reports filtered by student, course, class, and date range.

AC-033: filtered report shows only matching records with computed percentages. AC-034: faculty reports are scoped to their assigned classes; admin/HOD can report institution-wide. Priority: high.

**Related:** EPIC-007, AC-033, AC-034

### US-016 · draft · source: requirements:EPIC-007:US-016

A generated report can be exported as a downloadable Excel spreadsheet or PDF matching the on-screen data.

AC-035: Excel export matches on-screen data. AC-036: PDF export matches on-screen data. Generated via background job (ties to NFR-010). Assumption: reports exportable to Excel/PDF across student/course/class/date-range. Priority: medium.

**Related:** EPIC-007, AC-035, AC-036, NFR-010

### US-017 · draft · source: requirements:EPIC-008:US-017

Student and attendance data is stored on infrastructure located within India.

DPDP Act 2023: data-residency / data-handling expectation. AC-037: persisted data is stored on infrastructure located within India. Assumption: data stored within India. Approved stack specifies AWS Mumbai/Hyderabad regions to satisfy this (ties to NFR-003). Priority: high.

**Related:** EPIC-008, AC-037, NFR-003

- ⚠ Which specific AWS region(s) (Mumbai vs. Hyderabad) will be used, and whether backups/disaster-recovery copies also stay in-India, is not yet specified — for the architecture phase to confirm.

### US-018 · draft · source: requirements:EPIC-008:US-018

Security-relevant and attendance-change events are logged and retained for 180 days.

CERT-In directions: ICT/audit log retention of 180 days. AC-038: each event is logged with actor, action, timestamp. AC-039: logs remain retrievable before 180 days elapse. Assumption: CERT-In-aligned logs retained 180 days (ties to NFR-004). Priority: high.

**Related:** EPIC-008, AC-038, AC-039, NFR-004

- ⚠ CERT-In also requires reporting qualifying cyber incidents to CERT-In within 6 hours; no requirement in this input addresses that reporting obligation.

### US-019 · draft · source: requirements:EPIC-008:US-019

The application runs no third-party tracking scripts or targeted advertising.

DPDP Act 2023: no tracking/targeted advertising/profiling, particularly relevant for any minors. AC-040: no third-party tracking or targeted-ad scripts present on page load (ties to NFR-002). Assumption: no tracking/targeted ads. Priority: medium.

**Related:** EPIC-008, AC-040, NFR-002

### US-020 · draft · source: requirements:EPIC-008:US-020

Core flows (login, marking, viewing attendance, reports) are responsive and accessible on mobile/low-bandwidth connections and to assistive technology.

RPwD Act 2016 / WCAG 2.1 AA. AC-041: layout adapts and remains usable on mobile screens or slow connections for all core flows, without a native app (ties to NFR-008). AC-042: screen-reader and keyboard-only navigation conform to WCAG 2.1 AA / RPwD Act expectations (ties to NFR-007). Assumption: accessibility is a release gate. Priority: high.

**Related:** EPIC-008, AC-041, AC-042, NFR-007, NFR-008

- ⚠ No accessibility audit or test plan yet exists to verify WCAG 2.1 AA / RPwD conformance — to be confirmed in the testing phase.

### NFR-001 · draft · source: requirements:NFR-001

Students see only their own attendance data; faculty see only classes assigned to them.

Each student can view only their own attendance records; attempts to open another student's attendance or any marking/admin screen are denied. Faculty see only classes assigned to them. Category: privacy.

**Related:** US-002, US-013

### NFR-002 · draft · source: requirements:NFR-002

No third-party tracking scripts or targeted advertising are run.

DPDP Act 2023: no profiling/tracking/targeted advertising. The application runs no third-party tracking scripts and shows no targeted ads. Category: privacy.

**Related:** US-019

### NFR-003 · draft · source: requirements:NFR-003

All student and attendance data is persisted on infrastructure located within India.

DPDP Act 2023: data-residency expectation. Category: compliance. Mapped to AWS Mumbai/Hyderabad region selection in the approved stack.

**Related:** US-017

### NFR-004 · draft · source: requirements:NFR-004

Security-relevant and attendance-change events are logged and retained for 180 days.

CERT-In directions: ICT log retention target 180 days, with actor/action/timestamp captured per event. Category: compliance.

**Related:** US-018

- ⚠ CERT-In 6-hour incident-reporting obligation to the authority itself is not covered by this NFR.

### NFR-005 · draft · source: requirements:NFR-005

The attendance-change audit log is immutable and reviewable but not alterable by admins/HODs.

Records who changed what, when, and the old/new values. Admins/HODs can review but cannot alter the log. Category: security; supports tamper-evident grade/attendance change tracking (academic-integrity risk area).

**Related:** US-008, US-002

### NFR-006 · draft · source: requirements:NFR-006

A failed login shows a generic error that does not reveal whether the email or password was wrong.

Category: security. Prevents account-enumeration via login error messages.

**Related:** US-001

### NFR-007 · draft · source: requirements:NFR-007

Core flows conform to WCAG 2.1 AA and RPwD Act 2016 expectations, including screen-reader and keyboard-only use.

RPwD Act 2016 / WCAG 2.1 AA: target explicitly stated as a release expectation. Category: accessibility.

**Related:** US-020

### NFR-008 · draft · source: requirements:NFR-008

The web app adapts to mobile screens and remains usable on low-bandwidth connections for all core flows.

Includes marking and saving a roster without a native app. Category: usability.

**Related:** US-020, US-007

### NFR-009 · draft · source: requirements:NFR-009

The product is browser-based on phones and laptops; no native mobile app is provided.

Applies to the whole system. Category: compatibility.

### NFR-010 · draft · source: requirements:NFR-010

Spreadsheet parsing, percentage recomputation, report generation, and batch email run in the background.

Keeps faculty/admins from waiting on a frozen page; implemented via Redis-backed job queue. Category: performance.

**Related:** US-005, US-016, US-014

### NFR-011 · draft · source: requirements:NFR-011

The system supports one institution of around a few thousand students/faculty/HODs, including term-start and session-marking peaks.

Target: ~a few thousand students, single institution. Category: scalability. Applies to the whole system.

### NFR-012 · draft · source: requirements:NFR-012

If the transactional email provider is unavailable, the in-app shortage flag still shows and the failure is logged.

Category: availability. Ensures core shortage-flagging function is not dependent on email delivery.

**Related:** US-014

### NFR-013 · draft · source: requirements:NFR-013

An invalid import file is rejected or partially reported with a clear per-row error list, leaving no partial corruption.

Category: maintainability. Protects data integrity of the term-import pipeline.

**Related:** US-005
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
