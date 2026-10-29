<!-- sdlc:auto:start adr -->
# ADR-0001: Use React 19 for Frontend

Status: Proposed  
Date: 2026-10-29

## Context and Problem Statement

Which Frontend technology does the project use? Decided in architecture v1.

## Considered Options

- React 19
- Vue
- Angular

## Decision Outcome

Chosen option: React 19, because Builds the roster-marking screen, dashboards, student attendance view and report filters as accessible keyboard-navigable components meeting WCAG 2.1 AA / RPwD Act, responsive on phones and low bandwidth with no third-party trackers.

## Consequences

A SPA needs care to keep bundles small for low-bandwidth users; code-splitting and server-friendly rendering mitigate this.
<!-- sdlc:auto:end adr -->