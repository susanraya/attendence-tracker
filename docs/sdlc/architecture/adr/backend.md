<!-- sdlc:auto:start adr -->
# ADR-0002: Use FastAPI 0.115 for Backend

Status: Accepted  
Date: 2026-10-29

## Context and Problem Statement

Which Backend technology does the project use? Decided in architecture v1.

## Considered Options

- FastAPI 0.115
- Django REST Framework
- Flask

## Decision Outcome

Chosen option: FastAPI 0.115, because Sits directly on pandas/openpyxl for Excel/CSV import and PDF/Excel export, drives the Redis job queue for background work, and enforces role-based access and transactional correction+audit writes.

## Consequences

Needs a separate worker process for background jobs rather than a built-in task runner; handled by the rq worker node.
<!-- sdlc:auto:end adr -->