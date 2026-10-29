# Architecture

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
## Overview

### ARCH-001 · approved · source: architecture:summary

Approved v1 architecture: a browser-based attendance system for one Indian higher-ed institution on React 19 / FastAPI 0.115 / PostgreSQL 16 / AWS Mumbai, with Redis, S3 and SendGrid supporting the full requirements scope.

Components: web (React 19 SPA - login, roster marking, dashboards, student views, report filters, admin config); api (FastAPI 0.115 - REST API, auth/RBAC, import validation, marking/correction with audit, computation, threshold config, report requests, consent records); worker (FastAPI-based background worker - spreadsheet parsing, account provisioning, percentage recompute, Excel/PDF report build, batched shortage emails); db (PostgreSQL 16, hosted in India, system of record with transactional correction+audit writes); queue (Redis 7 job queue); object_store (Amazon S3, Mumbai, for uploads and generated reports); email (SendGrid transactional sender for alerts and password resets). This maps directly onto the approved technology stack and services from the requirements phase (FastAPI/AWS/PostgreSQL/React, SendGrid, S3, Redis).

**Related:** EPIC-001, EPIC-002, EPIC-003, EPIC-004, EPIC-005, EPIC-006, EPIC-007, EPIC-008

### ARCH-002 · approved · source: architecture:critical_path:Term spreadsheet import

Admin uploads an Excel/CSV of students, courses or timetables; file is stored in S3 and validated in the background with per-row error reporting and reference checks before accounts/records are created.

Flow: file uploaded -> stored to S3 -> background job validates every row -> unresolved references (e.g. timetable pointing to a missing course/student) are flagged -> import either rejected or reported per-row with no partial corruption -> successful student/faculty rows provision accounts. Backed by endpoints POST /imports and GET /imports/{id}, and the import_jobs entity (s3_key, status, rows_imported, row_errors).

**Related:** EPIC-002, US-005, US-006

### ARCH-003 · approved · source: architecture:critical_path:Mark and correct attendance with audit

Faculty mark/save a session roster; corrections write an immutable audit entry in the same transaction as the attendance update and enqueue percentage recomputation.

Flow: faculty opens roster for an assigned session (GET /sessions/{id}/roster), marks present/absent, saves (PUT /sessions/{id}/roster) which persists records and marks the session completed. A later correction (PATCH /attendance/{record_id}) writes to attendance_audit (actor, old/new status, timestamp) in the same DB transaction as the attendance_records update, and enqueues a Redis job to recompute attendance_summary for the affected student/course. This directly implements NFR-005's tamper-evident, transactional correction+audit requirement.

**Related:** EPIC-003, EPIC-004, US-007, US-008, US-009

### ARCH-004 · approved · source: architecture:critical_path:Compute percentage and shortage alert

A background job recomputes present/held percentage per student per course, compares to the configured threshold, sets the shortage flag, and sends an email alert via SendGrid, logging failures without blocking the in-app flag.

Worker recomputes attendance_summary.percentage and below_threshold against app_config.attendance_threshold (default 75%), writes a notifications record, and attempts a SendGrid email; failures are logged (notifications.email_status) while the in-app flag is still shown, matching NFR-012's graceful email-outage handling.

**Related:** EPIC-004, EPIC-006, US-009, US-010, US-011, US-014

### ARCH-005 · approved · source: architecture:critical_path:Email/password login with RBAC

Login verifies credentials with a generic failure message, issues a role-scoped JWT, and forces first-time users through password setup and DPDP consent acknowledgement before access.

POST /auth/login verifies credentials (generic error per NFR-006), issues a role-scoped JWT. First-time users are routed through POST /auth/set-password and must acknowledge consent via POST /consent (recorded with timestamp on users.consent_given_at); DELETE /consent records withdrawal (users.consent_withdrawn_at). users.must_set_password flag drives the forced password-setup step from provisioning (US-003).

**Related:** EPIC-001, US-001, US-002, US-003, US-004

### ARCH-006 · approved · source: architecture:entities

Relational data model covering users/roles, academic structure, sessions/marks, audit, configuration and ICT logging.

Entities: users (incl. consent timestamps, must_set_password), students, courses, course_assignments, enrollments, class_sessions, attendance_records, attendance_audit (immutable change log), attendance_summary (computed percentage + below_threshold), app_config (threshold), import_jobs (status/row errors), notifications (in-app + email status), ict_audit_log (security/ICT events). Design directly supports per-student/course/class/date-range reporting, transactional correction+audit, and CERT-In-aligned logging.

**Related:** EPIC-001, EPIC-002, EPIC-003, EPIC-004, EPIC-006, EPIC-008

### ARCH-007 · approved · source: architecture:endpoints

REST API surface covers auth, consent, imports, manual record entry, roster marking/correction, student self-service, faculty dashboard, threshold config, reporting/export, notifications and audit review.

Endpoints: POST /auth/login, POST /auth/password-reset/request, POST /auth/set-password, POST /consent, DELETE /consent, POST /imports, GET /imports/{id}, POST /students, POST /courses, POST /timetable, GET /sessions/{id}/roster, PUT /sessions/{id}/roster, PATCH /attendance/{record_id}, GET /attendance/me, GET /dashboard/faculty, GET /config/threshold, PUT /config/threshold, POST /reports, GET /reports/{id}/download, GET /notifications, GET /audit/attendance. Each maps 1:1 to a requirement AC (e.g. GET /audit/attendance to AC-020/AC-038).

**Related:** EPIC-001, EPIC-002, EPIC-003, EPIC-004, EPIC-005, EPIC-006, EPIC-007, EPIC-008

### ARCH-008 · approved · source: architecture:deployment_nodes,technology_decisions

Deployment is containerized on AWS ap-south-1 (Mumbai): web, api and worker containers, RDS PostgreSQL, Redis queue container, S3 bucket, and SendGrid as an external SaaS dependency - chosen to satisfy India data-residency and scale needs.

Nodes: web-app (React static build via CDN/container), api-service (FastAPI/uvicorn, Python 3.12), worker-service (rq worker, Python 3.12), postgres (RDS PostgreSQL 16, ap-south-1), redis (redis:7-alpine container), s3-bucket (S3 ap-south-1), sendgrid (external SaaS). Technology decisions recorded with alternatives considered: React 19 over Vue/Angular for accessible component libraries; FastAPI over Django REST Framework/Flask for pandas/openpyxl + Redis queue fit; PostgreSQL 16 over MySQL/SQLite for relational aggregation + ACID transactions; AWS over Azure/GCP for the Mumbai region satisfying DPDP residency and CERT-In 180-day log retention.

**Related:** NFR-PERFORMANCE-SCALE, NFR-PRIVACY-SECURITY, EPIC-008
<!-- sdlc:auto:end narrative -->

<!-- sdlc:auto:start building-blocks -->
## Building Block View

| ID | Name | Technology | Responsibility | Depends on |
|---|---|---|---|---|
| web | React Web App | React 19 | Responsive, WCAG 2.1 AA / RPwD-compliant SPA for login, roster marking, dashboards, student attendance views, report filters and admin configuration, usable on phones and low-bandwidth connections with no third-party tracking. | api |
| api | FastAPI Backend | FastAPI 0.115 | Serves REST API, enforces email/password auth and role-based access, handles imports validation, attendance marking/correction with audit, percentage computation, threshold config, report generation requests and consent records. | db, queue, object_store |
| worker | Background Worker | FastAPI 0.115 | Runs heavy jobs off the web request: parse term spreadsheets, provision accounts, recompute attendance percentages, build Excel/PDF reports, and send batched shortage emails. | db, queue, object_store, email |
| db | PostgreSQL Database | PostgreSQL 16 | System of record for users, students, courses, timetables, sessions, attendance, enrollments, consent records, configuration and immutable audit/ICT logs, with transactional correction+audit writes, hosted in India. | — |
| queue | Redis Job Queue | Redis 7 | Holds background job tasks for import, computation, report build and email batches so the UI is never blocked. | — |
| object_store | Amazon S3 | Amazon S3 | Durable storage in AWS Mumbai for uploaded Excel/CSV rosters and generated Excel/PDF report files, keeping them off the database and server disk and inside India. | — |
| email | SendGrid Email | SendGrid | Transactional sender for shortage alerts and password-reset links with delivery tracking; failures are logged so the in-app flag still shows. | — |

```mermaid
graph TD
  c_web["React Web App"]
  c_api["FastAPI Backend"]
  c_worker["Background Worker"]
  c_db["PostgreSQL Database"]
  c_queue["Redis Job Queue"]
  c_object_store["Amazon S3"]
  c_email["SendGrid Email"]
  c_web --> c_api
  c_api --> c_db
  c_api --> c_queue
  c_api --> c_object_store
  c_worker --> c_db
  c_worker --> c_queue
  c_worker --> c_object_store
  c_worker --> c_email
```
<!-- sdlc:auto:end building-blocks -->

<!-- sdlc:auto:start runtime -->
## Runtime View

### Term spreadsheet import

Admin uploads an Excel/CSV of students, courses or timetables. File is stored in S3, a background job validates every row, flags unresolved references, and either rejects or reports per-row errors with no partial corruption; successful student/faculty rows provision accounts.

- **Components:** web, api, worker, object_store, db, queue
- **Modules:** imports.router, imports.service, imports.validators, accounts.provisioning, jobs.queue
- **Key functions:** upload_import(file, type), enqueue_import_job(file_key, type), validate_rows(df, schema), resolve_references(rows), provision_accounts(student_rows, faculty_rows), commit_or_rollback(valid_rows)

```mermaid
sequenceDiagram
  participant U as Admin
  participant W as Web
  participant A as API
  participant S as S3
  participant Q as Redis
  participant K as Worker
  participant D as DB
  U->>W: Upload students.xlsx
  W->>A: POST /imports
  A->>S: Put source file
  A->>Q: Enqueue import job
  A-->>W: 202 job accepted
  K->>Q: Dequeue job
  K->>S: Fetch file
  K->>K: Parse and validate rows
  K->>D: Commit valid rows in one transaction
  K->>D: Provision accounts
  K->>D: Write import summary and per-row errors
  W->>A: GET /imports/{id}
  A-->>W: Summary with error list
```

### Mark and correct attendance with audit

Faculty opens a roster for an assigned session, marks present/absent and saves. Corrections to a saved record write an immutable audit entry (actor, old/new, timestamp) in the same transaction and enqueue percentage recomputation.

- **Components:** web, api, db, queue
- **Modules:** attendance.router, attendance.service, audit.service, authz.roles
- **Key functions:** get_roster(session_id, faculty_id), save_roster(session_id, marks), update_mark(record_id, new_status, actor), write_audit(record_id, old, new, actor), enqueue_recompute(course_id, student_id)

```mermaid
sequenceDiagram
  participant F as Faculty
  participant W as Web
  participant A as API
  participant D as DB
  participant Q as Redis
  F->>W: Open roster
  W->>A: GET /sessions/{id}/roster
  A->>D: Load enrolled students and marks
  A-->>W: Roster
  F->>W: Change a status and save
  W->>A: PATCH /attendance/{record_id}
  A->>D: Update mark and write audit in one transaction
  A->>Q: Enqueue recompute percentage
  A-->>W: Saved
```

### Compute percentage and shortage alert

A background job recomputes present/held percentage per student per course, compares against the configured threshold (default 75%), sets the in-app flag, and sends an email alert via SendGrid; email failure is logged while the in-app flag still shows.

- **Components:** worker, db, queue, email
- **Modules:** attendance.compute, config.threshold, notifications.service, email.sendgrid
- **Key functions:** compute_percentage(student_id, course_id), get_threshold(), evaluate_shortage(pct, threshold), create_in_app_flag(student_id, course_id), send_shortage_email(student, course)

```mermaid
sequenceDiagram
  participant Q as Redis
  participant K as Worker
  participant D as DB
  participant E as SendGrid
  K->>Q: Dequeue recompute job
  K->>D: Count present over held sessions
  K->>D: Read configured threshold
  K->>D: Upsert percentage and shortage flag
  alt below threshold
    K->>D: Create in-app notification
    K->>E: Send shortage email
    alt email fails
      K->>D: Log email failure for admin
    end
  end
```

### Email/password login with RBAC

User logs in; credentials are verified, a generic error hides which field was wrong, a role-scoped JWT is issued, first-time users are prompted to set a password and acknowledge the DPDP consent notice before access.

- **Components:** web, api, db, email
- **Modules:** auth.router, auth.service, auth.jwt, consent.service, authz.roles
- **Key functions:** login(email, password), verify_password(hash, raw), issue_token(user, role), request_reset(email), set_password(token, new_password), record_consent(user_id), withdraw_consent(user_id)

```mermaid
sequenceDiagram
  participant U as User
  participant W as Web
  participant A as API
  participant D as DB
  U->>W: Enter email and password
  W->>A: POST /auth/login
  A->>D: Load user and verify hash
  alt invalid
    A-->>W: 401 generic error
  else valid first login
    A-->>W: Token plus must-set-password and consent required
    U->>W: Set password and acknowledge consent
    W->>A: POST /auth/set-password and POST /consent
    A->>D: Store hash and consent timestamp
  else valid
    A-->>W: Role-scoped token
  end
```
<!-- sdlc:auto:end runtime -->

<!-- sdlc:auto:start deployment-view -->
## Deployment View

| Name | Service | Runtime | Scaling | Environment |
|---|---|---|---|---|
| web-app | React Web App | Node static build served via CDN/container | static, CDN-cached | dev |
| api-service | FastAPI Backend | Python 3.12 / uvicorn container | 1-2 instances | dev |
| worker-service | Background Worker | Python 3.12 container (rq worker) | 1-2 instances, scale for term-start/exam peaks | dev |
| postgres | PostgreSQL 16 | RDS PostgreSQL (ap-south-1 Mumbai) | single instance, encrypted at rest | dev |
| redis | Redis 7 Queue | redis:7-alpine container | single instance | dev |
| s3-bucket | Amazon S3 | S3 (ap-south-1 Mumbai) | managed, encrypted | dev |
| sendgrid | SendGrid | External SaaS API | managed | dev |

| Source | Target | Protocol |
|---|---|---|
| web-app | api-service | HTTPS |
| api-service | postgres | TLS/5432 |
| api-service | redis | TCP/6379 |
| api-service | s3-bucket | HTTPS |
| worker-service | postgres | TLS/5432 |
| worker-service | redis | TCP/6379 |
| worker-service | s3-bucket | HTTPS |
| worker-service | sendgrid | HTTPS |

```mermaid
graph LR
  n_web_app["web-app<br/>React Web App"]
  n_api_service["api-service<br/>FastAPI Backend"]
  n_worker_service["worker-service<br/>Background Worker"]
  n_postgres["postgres<br/>PostgreSQL 16"]
  n_redis["redis<br/>Redis 7 Queue"]
  n_s3_bucket["s3-bucket<br/>Amazon S3"]
  n_sendgrid["sendgrid<br/>SendGrid"]
  n_web_app -->|"HTTPS"| n_api_service
  n_api_service -->|"TLS/5432"| n_postgres
  n_api_service -->|"TCP/6379"| n_redis
  n_api_service -->|"HTTPS"| n_s3_bucket
  n_worker_service -->|"TLS/5432"| n_postgres
  n_worker_service -->|"TCP/6379"| n_redis
  n_worker_service -->|"HTTPS"| n_s3_bucket
  n_worker_service -->|"HTTPS"| n_sendgrid
```
<!-- sdlc:auto:end deployment-view -->

<!-- sdlc:auto:start decisions -->
## Architecture Decisions

| Layer | Choice | ADR |
|---|---|---|
| Frontend | React 19 | [ADR-0001](adr/frontend.md) |
| Backend | FastAPI 0.115 | [ADR-0002](adr/backend.md) |
| Database | PostgreSQL 16 | [ADR-0003](adr/database.md) |
| Cloud | AWS | [ADR-0004](adr/cloud.md) |
<!-- sdlc:auto:end decisions -->

<!-- sdlc:auto:start links -->
## Related Documents

- [Data Model](data-model.md)
- [API Specification](api/openapi.yaml)
- [Architecture Decision Records](adr/README.md)
<!-- sdlc:auto:end links -->
