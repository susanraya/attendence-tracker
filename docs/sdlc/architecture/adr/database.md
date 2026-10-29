<!-- sdlc:auto:start adr -->
# ADR-0003: Use PostgreSQL 16 for Database

Status: Accepted  
Date: 2026-10-29

## Context and Problem Statement

Which Database technology does the project use? Decided in architecture v1.

## Considered Options

- PostgreSQL 16
- MySQL
- SQLite

## Decision Outcome

Chosen option: PostgreSQL 16, because Relational model of students, courses, sessions and marks with SQL aggregation for per-student/course/class/date-range reports, and ACID transactions so a correction and its audit entry commit together for a tamper-evident trail.

## Consequences

At a few-thousand-student scale a single RDS instance is ample; read replicas can be added later if exam-peak reporting load grows.
<!-- sdlc:auto:end adr -->