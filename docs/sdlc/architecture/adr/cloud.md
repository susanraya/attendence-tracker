<!-- sdlc:auto:start adr -->
# ADR-0004: Use AWS for Cloud

Status: Proposed  
Date: 2026-10-29

## Context and Problem Statement

Which Cloud technology does the project use? Decided in architecture v1.

## Considered Options

- AWS
- Azure
- GCP

## Decision Outcome

Chosen option: AWS, because Full Mumbai (ap-south-1) region keeps database, file storage and logs on Indian soil for DPDP residency and 180-day CERT-In log retention, with ample capacity for one institution's term-start and marking peaks.

## Consequences

Region pinning must be enforced in configuration; cross-region replication is intentionally avoided to preserve residency.
<!-- sdlc:auto:end adr -->