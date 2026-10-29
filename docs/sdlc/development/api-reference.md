# API Reference

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start endpoints -->
| Method | Path | Handler | Source | Summary |
|---|---|---|---|---|
| GET | /health | health | `backend/app/main.py:43` | Liveness probe, and the only route here that is not a stub. |
<!-- sdlc:auto:end endpoints -->

<!-- sdlc:auto:start drift -->
**Designed but missing:**

- DELETE /consent
- GET /attendance/me
- GET /audit/attendance
- GET /config/threshold
- GET /dashboard/faculty
- GET /imports/{id}
- GET /notifications
- GET /reports/{id}/download
- GET /sessions/{id}/roster
- PATCH /attendance/{record_id}
- POST /auth/login
- POST /auth/password-reset/request
- POST /auth/set-password
- POST /consent
- POST /courses
- POST /imports
- POST /reports
- POST /students
- POST /timetable
- PUT /config/threshold
- PUT /sessions/{id}/roster
<!-- sdlc:auto:end drift -->

<!-- sdlc:auto:start source -->
Generated from commit `793bf2a`
<!-- sdlc:auto:end source -->
