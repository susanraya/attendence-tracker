// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Button, Table, THead, TBody, TR, TH, TD, Avatar, Empty } = UI;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Check, ChevronRight, ChevronDown, Clock, ArrowRight, AlertCircle } = Icons;

const THRESHOLD = 75;

const FACULTY = { name: "Dr. A. Rao", term: "Odd Term 2026" };

const PENDING_SESSIONS = [
  {
    id: "ses-4821",
    wf: "i-2-0-0",
    code: "CS301",
    name: "Data Structures",
    dateLabel: "29 Oct 2026",
    day: "29 oct",
    time: "10:00",
    room: "LH-3",
    enrolled: 64,
    waiting: "scheduled today",
    status: "Not marked",
  },
  {
    id: "ses-4795",
    wf: "i-2-0-1",
    code: "CS301",
    name: "Data Structures",
    dateLabel: "28 Oct 2026",
    day: "28 oct",
    time: "10:00",
    room: "LH-3",
    enrolled: 64,
    waiting: "waiting since yesterday",
    status: "Not marked",
  },
  {
    id: "ses-4760",
    wf: "i-2-0-2",
    code: "CS412",
    name: "Operating Systems",
    dateLabel: "27 Oct 2026",
    day: "27 oct",
    time: "14:00",
    room: "Lab B-2",
    enrolled: 58,
    waiting: "waiting 2 days",
    status: "Not marked",
  },
];

const MY_CLASSES = [
  {
    id: "crs-301",
    code: "CS301",
    name: "Data Structures",
    enrolled: 64,
    held: 28,
    marked: 26,
    next: "30 Oct 2026, 10:00",
    nextNote: "lecture hall 3",
  },
  {
    id: "crs-412",
    code: "CS412",
    name: "Operating Systems",
    enrolled: 58,
    held: 24,
    marked: 23,
    next: "31 Oct 2026, 14:00",
    nextNote: "lab block b",
  },
  {
    id: "crs-205",
    code: "CS205",
    name: "Discrete Mathematics",
    enrolled: 72,
    held: 31,
    marked: 31,
    next: "30 Oct 2026, 09:00",
    nextNote: "lecture hall 1",
  },
  {
    id: "crs-330",
    code: "CS330",
    name: "Database Systems",
    enrolled: 49,
    held: 22,
    marked: 22,
    next: "02 Nov 2026, 11:30",
    nextNote: "lecture hall 5",
  },
  {
    id: "crs-451",
    code: "CS451",
    name: "Compiler Design",
    enrolled: 37,
    held: 19,
    marked: 19,
    next: null,
    nextNote: "no timetable row for next week",
  },
];

const FLAGGED_STUDENTS = [
  { id: "f1", roll: "22CS1017", fullName: "Aarav Menon", course: "CS301", courseName: "Data Structures", present: 17, held: 28 },
  { id: "f2", roll: "22CS1042", fullName: "Diya Krishnan", course: "CS301", courseName: "Data Structures", present: 19, held: 28 },
  { id: "f3", roll: "22CS1058", fullName: "Rohan Pillai", course: "CS301", courseName: "Data Structures", present: 20, held: 28 },
  { id: "f4", roll: "22CS1103", fullName: "Sneha Varma", course: "CS412", courseName: "Operating Systems", present: 13, held: 24 },
  { id: "f5", roll: "22CS1066", fullName: "Imran Qureshi", course: "CS412", courseName: "Operating Systems", present: 16, held: 24 },
  { id: "f6", roll: "22CS1129", fullName: "Kavya Reddy", course: "CS412", courseName: "Operating Systems", present: 17, held: 24 },
  { id: "f7", roll: "21CS0914", fullName: "Nikhil Deshpande", course: "CS205", courseName: "Discrete Mathematics", present: 19, held: 31 },
  { id: "f8", roll: "21CS0877", fullName: "Ananya Iyer", course: "CS205", courseName: "Discrete Mathematics", present: 22, held: 31 },
  { id: "f9", roll: "21CS0933", fullName: "Farhan Shaikh", course: "CS330", courseName: "Database Systems", present: 12, held: 22 },
  { id: "f10", roll: "21CS0948", fullName: "Meera Nambiar", course: "CS330", courseName: "Database Systems", present: 16, held: 22 },
  { id: "f11", roll: "20CS0721", fullName: "Vikram Chauhan", course: "CS451", courseName: "Compiler Design", present: 10, held: 19 },
  { id: "f12", roll: "20CS0766", fullName: "Priya Sundaram", course: "CS451", courseName: "Compiler Design", present: 13, held: 19 },
];

export default function Screen() {
  const navigate = useNavigate();
  const P = brand.primaryColor;
  const A = brand.accentColor;
  const N = brand.neutralColor;
  const BG = brand.backgroundColor;

  const hexToRgb = (hex) => {
    const h = String(hex).replace("#", "");
    const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
    const n = parseInt(full, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  };
  const tint = (hex, a) => {
    const [r, g, b] = hexToRgb(hex);
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  };

  const hairline = tint(P, 0.11);
  const panelBg = tint(P, 0.045);
  const focalBg = tint(P, 0.08);
  const num = { fontVariantNumeric: "tabular-nums" };

  const [classSort, setClassSort] = React.useState({ key: "code", dir: "asc" });
  const [flagSort, setFlagSort] = React.useState({ key: "percentage", dir: "asc" });

  const classRows = React.useMemo(() => {
    const rows = MY_CLASSES.map((c) => ({ ...c, pending: c.held - c.marked, nextKey: c.next || "zzzz" }));
    const { key, dir } = classSort;
    const pick = {
      code: (r) => r.code,
      name: (r) => r.name,
      enrolled: (r) => r.enrolled,
      held: (r) => r.held,
      marked: (r) => r.marked,
      next: (r) => r.nextKey,
    }[key];
    return rows.sort((a, b) => {
      const x = pick(a);
      const y = pick(b);
      const cmp = typeof x === "number" ? x - y : String(x).localeCompare(String(y));
      return dir === "asc" ? cmp : -cmp;
    });
  }, [classSort]);

  const flagRows = React.useMemo(() => {
    const rows = FLAGGED_STUDENTS.map((s) => {
      const pct = Math.round((s.present / s.held) * 1000) / 10;
      return { ...s, percentage: pct, critical: pct < 60 };
    });
    const { key, dir } = flagSort;
    const pick = {
      roll: (r) => r.roll,
      fullName: (r) => r.fullName,
      course: (r) => r.course,
      present: (r) => r.present,
      held: (r) => r.held,
      percentage: (r) => r.percentage,
      flag: (r) => r.percentage,
    }[key];
    return rows.sort((a, b) => {
      const x = pick(a);
      const y = pick(b);
      const cmp = typeof x === "number" ? x - y : String(x).localeCompare(String(y));
      return dir === "asc" ? cmp : -cmp;
    });
  }, [flagSort]);

  const criticalCount = flagRows.filter((r) => r.critical).length;
  const totalEnrolled = MY_CLASSES.reduce((sum, c) => sum + c.enrolled, 0);

  const toggleSort = (setter) => (key) =>
    setter((s) => ({ key, dir: s.key === key && s.dir === "asc" ? "desc" : "asc" }));

  const sortHeader = (wfId, key, label, state, setter, numeric) => {
    const active = state.key === key;
    return (
      <TH
        data-wf={wfId}
        scope="col"
        aria-sort={active ? (state.dir === "asc" ? "ascending" : "descending") : "none"}
        style={{
          borderBottom: `1px solid ${hairline}`,
          padding: "0",
          textAlign: numeric ? "right" : "left",
          backgroundColor: "transparent",
        }}
      >
        <button
          type="button"
          onClick={() => toggleSort(setter)(key)}
          className={
            "flex w-full items-center gap-1.5 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] rounded-full transition-colors " +
            (numeric ? "justify-end" : "justify-start")
          }
          style={{ color: active ? P : N, letterSpacing: "0.14em" }}
        >
          <span>{label}</span>
          <ChevronDown
            aria-hidden="true"
            className="h-3.5 w-3.5 shrink-0 transition-transform"
            style={{
              opacity: active ? 0.9 : 0.3,
              transform: active && state.dir === "asc" ? "rotate(180deg)" : "none",
            }}
          />
        </button>
      </TH>
    );
  };

  const meter = (pct, fill, showTick) => (
    <span
      aria-hidden="true"
      className="relative inline-block h-[6px] w-20 shrink-0 rounded-full align-middle"
      style={{ backgroundColor: tint(P, 0.14) }}
    >
      <span
        className="absolute left-0 top-0 h-[6px] rounded-full"
        style={{ width: `${Math.max(2, Math.min(100, pct))}%`, backgroundColor: fill, transition: "width .45s ease" }}
      />
      {showTick ? (
        <span
          className="absolute top-[-4px] h-[14px] w-[2px] rounded-full"
          style={{ left: `${THRESHOLD}%`, backgroundColor: P, opacity: 0.5 }}
        />
      ) : null}
    </span>
  );

  const statCards = [
    {
      wf: "b-1-0",
      label: "My classes",
      value: MY_CLASSES.length,
      hint: `${FACULTY.term.toLowerCase()} · ${totalEnrolled} seats enrolled`,
    },
    {
      wf: "b-1-1",
      label: "Sessions pending marking",
      value: PENDING_SESSIONS.length,
      hint: "oldest has been waiting since 27 oct",
    },
    {
      wf: "b-1-2",
      label: `Students below ${THRESHOLD}%`,
      value: FLAGGED_STUDENTS.length,
      hint: `${criticalCount} of them below 60%`,
    },
  ];

  return (
    <div
      className="atrium-dash mx-auto w-full max-w-[1120px] px-5 pb-20 pt-8 sm:px-8"
      style={{ fontFamily: brand.fontBody, color: P, backgroundColor: BG }}
    >
      <style>{`
        .atrium-dash :focus-visible { outline: 2px solid ${A}; outline-offset: 3px; }
        .atrium-row { transition: background-color .18s ease; }
        .atrium-row:hover { background-color: ${tint(P, 0.055)}; }
        .atrium-sess { transition: background-color .2s ease, transform .2s ease; }
        .atrium-sess:hover { background-color: ${tint(P, 0.06)}; transform: translateY(-1px); }
        .atrium-link-underline { text-underline-offset: 6px; text-decoration-thickness: 1px; }
        @keyframes atrRise { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
        .atr-rise { animation: atrRise .5s cubic-bezier(.2,.7,.3,1) both; }
        @keyframes atrPulse { 0%,100% { opacity: .3 } 50% { opacity: 1 } }
        .atr-pulse { animation: atrPulse 2.6s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .atr-rise, .atr-pulse { animation: none !important; }
          .atrium-row, .atrium-sess { transition: none !important; }
        }
      `}</style>

      {/* Row 1 — page title */}
      <header data-wf="b-0-0" className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-[46ch]">
          <h1
            className="text-[30px] leading-tight sm:text-[38px]"
            style={{ fontFamily: brand.fontHeading, fontStyle: "italic", fontWeight: 600, color: P }}
          >
            Faculty dashboard
            <span className="block text-[18px] not-italic sm:text-[20px]" style={{ fontFamily: brand.fontBody, fontWeight: 500, color: tint(P, 0.72), marginTop: "6px" }}>
              — {FACULTY.name}, {FACULTY.term}
            </span>
          </h1>
          <p className="mt-4 text-[14px] leading-relaxed" style={{ color: N }}>
            you are seeing only the classes assigned to you. the shortage threshold is{" "}
            <span style={{ ...num, color: P, fontWeight: 600 }}>{THRESHOLD}%</span>, set by your department admin.
          </p>
        </div>

        <div
          className="flex shrink-0 items-center gap-2.5 self-start rounded-full px-4 py-2 sm:self-auto"
          style={{ backgroundColor: panelBg }}
        >
          <span className="atr-pulse h-2 w-2 rounded-full" style={{ backgroundColor: A }} aria-hidden="true" />
          <span className="text-[12.5px]" style={{ color: N, ...num }}>
            synced 4 minutes ago · 29 oct 2026
          </span>
        </div>
      </header>

      {/* Row 2 — three arch alcove cards */}
      <section aria-label="Term summary" className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {statCards.map((s, i) => (
          <div
            key={s.wf}
            data-wf={s.wf}
            className="atr-rise px-6 pb-7 pt-12 text-center"
            style={{
              backgroundColor: panelBg,
              borderRadius: "50% 50% 24px 24px / 86px 86px 24px 24px",
              borderBottom: `1px solid ${hairline}`,
              animationDelay: `${i * 70}ms`,
            }}
          >
            <p className="text-[11px] font-semibold uppercase" style={{ letterSpacing: "0.16em", color: N }}>
              {s.label}
            </p>
            <p
              className="mt-2 text-[46px] leading-none"
              style={{ fontFamily: brand.fontHeading, fontStyle: "italic", fontWeight: 600, color: P, ...num }}
            >
              {s.value}
            </p>
            <div className="mx-auto mt-4 h-[3px] w-10 rounded-full" style={{ backgroundColor: A, opacity: 0.8 }} aria-hidden="true" />
            <p className="mt-4 text-[12.5px] leading-relaxed" style={{ color: N, ...num }}>
              {s.hint}
            </p>
          </div>
        ))}
      </section>

      {/* Row 3 — sessions pending marking (focal point) */}
      <section
        data-wf="b-2-0"
        aria-labelledby="pending-heading"
        className="mt-10 px-5 pb-6 pt-7 sm:px-8 sm:pb-8"
        style={{ backgroundColor: focalBg, borderRadius: "48px 48px 24px 24px", borderBottom: `1px solid ${hairline}` }}
      >
        <div className="flex flex-wrap items-end justify-between gap-3 px-1 sm:px-2">
          <div>
            <h2
              id="pending-heading"
              className="text-[24px] leading-tight sm:text-[27px]"
              style={{ fontFamily: brand.fontHeading, fontStyle: "italic", fontWeight: 600, color: P }}
            >
              Sessions pending marking
            </h2>
            <p className="mt-1.5 text-[13.5px]" style={{ color: N }}>
              mark these to keep every percentage accurate. the oldest sits at the top of your week.
            </p>
          </div>
          <span className="text-[12.5px] font-semibold uppercase" style={{ letterSpacing: "0.14em", color: N, ...num }}>
            {PENDING_SESSIONS.length} waiting
          </span>
        </div>

        <div className="mt-5" style={{ borderTop: `1px solid ${hairline}` }} />

        {PENDING_SESSIONS.length === 0 ? (
          <div className="pt-6">
            <Empty
              title="every session is marked"
              description="nothing is waiting on you today. the next roster opens 30 oct at 09:00 for CS205 Discrete Mathematics."
            />
          </div>
        ) : (
          <ul className="mt-5 flex flex-col gap-3">
            {PENDING_SESSIONS.map((s, i) => (
              <li
                key={s.id}
                className="atrium-sess atr-rise flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:gap-6 sm:px-5"
                style={{
                  backgroundColor: tint(BG, 0.85),
                  borderRadius: "28px",
                  borderBottom: `1px solid ${hairline}`,
                  animationDelay: `${120 + i * 70}ms`,
                }}
              >
                <div
                  className="flex h-[66px] w-[66px] shrink-0 flex-col items-center justify-center"
                  style={{
                    backgroundColor: tint(A, 0.2),
                    borderRadius: "33px 33px 14px 14px",
                  }}
                >
                  <span className="text-[13px] font-semibold lowercase" style={{ color: P, ...num }}>
                    {s.day}
                  </span>
                  <span className="text-[12px]" style={{ color: tint(P, 0.75), ...num }}>
                    {s.time}
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-[16.5px] font-semibold" style={{ color: P }}>
                    <span style={num}>{s.code}</span> {s.name}
                  </p>
                  <p className="mt-1 text-[13px]" style={{ color: N, ...num }}>
                    {s.dateLabel}, {s.time} · {s.room} · {s.enrolled} enrolled · {s.waiting}
                  </p>
                </div>

                <span
                  className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full px-3 py-1.5 text-[12.5px] font-semibold sm:self-auto"
                  style={{ backgroundColor: tint(A, 0.26), color: P }}
                >
                  <AlertCircle aria-hidden="true" className="h-3.5 w-3.5" />
                  {s.status}
                </span>

                <Button
                  data-wf={s.wf}
                  type="button"
                  onClick={() => navigate("session-roster")}
                  aria-label={`Open roster for ${s.code} ${s.name}, ${s.dateLabel} at ${s.time}`}
                  className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full px-5 text-[14px] font-semibold"
                  style={{
                    backgroundColor: P,
                    color: BG,
                    borderRadius: "999px",
                    minHeight: "44px",
                    border: "none",
                  }}
                >
                  Open roster
                  <ChevronRight aria-hidden="true" className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Row 4 — my classes */}
      <section
        data-wf="b-3-0"
        aria-labelledby="classes-heading"
        className="mt-10 px-5 pb-4 pt-7 sm:px-8"
        style={{ backgroundColor: panelBg, borderRadius: "40px 40px 24px 24px", borderBottom: `1px solid ${hairline}` }}
      >
        <div className="px-1 sm:px-2">
          <h2
            id="classes-heading"
            className="text-[22px] leading-tight sm:text-[25px]"
            style={{ fontFamily: brand.fontHeading, fontStyle: "italic", fontWeight: 600, color: P }}
          >
            My classes
          </h2>
          <p className="mt-1.5 text-[13.5px]" style={{ color: N }}>
            select a course to open its most recent roster. sort any column by its heading.
          </p>
        </div>

        <div className="mt-4 overflow-x-auto pb-2">
          <Table aria-labelledby="classes-heading" className="w-full min-w-[720px]" style={num}>
            <THead>
              <TR style={{ borderBottom: "none" }}>
                {sortHeader("i-3-0-0", "code", "Course code", classSort, setClassSort, false)}
                {sortHeader("i-3-0-1", "name", "Course name", classSort, setClassSort, false)}
                {sortHeader("i-3-0-2", "enrolled", "Enrolled", classSort, setClassSort, true)}
                {sortHeader("i-3-0-3", "held", "Sessions held", classSort, setClassSort, true)}
                {sortHeader("i-3-0-4", "marked", "Sessions marked", classSort, setClassSort, false)}
                {sortHeader("i-3-0-5", "next", "Next session", classSort, setClassSort, false)}
              </TR>
            </THead>
            <TBody>
              {classRows.map((c) => (
                <TR
                  key={c.id}
                  className="atrium-row cursor-pointer"
                  onClick={() => navigate("session-roster")}
                  style={{ borderBottom: `1px solid ${hairline}` }}
                >
                  <TD style={{ padding: "14px 16px" }}>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate("session-roster");
                      }}
                      aria-label={`Open roster for ${c.code} ${c.name}`}
                      className="rounded-full text-[14.5px] font-semibold underline-offset-4 hover:underline"
                      style={{ color: P, ...num }}
                    >
                      {c.code}
                    </button>
                  </TD>
                  <TD style={{ padding: "14px 16px", color: tint(P, 0.85) }} className="text-[14.5px]">
                    {c.name}
                  </TD>
                  <TD style={{ padding: "14px 16px", textAlign: "right", ...num }} className="text-[14.5px]">
                    {c.enrolled}
                  </TD>
                  <TD style={{ padding: "14px 16px", textAlign: "right", ...num }} className="text-[14.5px]">
                    {c.held}
                  </TD>
                  <TD style={{ padding: "14px 16px" }}>
                    <span className="flex items-center gap-3">
                      {meter((c.marked / c.held) * 100, P, false)}
                      <span className="text-[14.5px]" style={num}>
                        {c.marked} / {c.held}
                      </span>
                      {c.pending > 0 ? (
                        <span
                          className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11.5px] font-semibold"
                          style={{ backgroundColor: tint(A, 0.26), color: P, ...num }}
                        >
                          <AlertCircle aria-hidden="true" className="h-3 w-3" />
                          {c.pending} pending
                        </span>
                      ) : (
                        <span
                          className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11.5px] font-semibold"
                          style={{ backgroundColor: tint(P, 0.08), color: tint(P, 0.8) }}
                        >
                          <Check aria-hidden="true" className="h-3 w-3" />
                          up to date
                        </span>
                      )}
                    </span>
                  </TD>
                  <TD style={{ padding: "14px 16px" }} className="text-[14px]">
                    {c.next ? (
                      <span style={{ color: tint(P, 0.85), ...num }}>{c.next}</span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5" style={{ color: N }}>
                        <Clock aria-hidden="true" className="h-3.5 w-3.5" />
                        not scheduled
                      </span>
                    )}
                    <span className="block text-[12px] lowercase" style={{ color: N }}>
                      {c.nextNote}
                    </span>
                  </TD>
                </TR>
              ))}
            </TBody>
          </Table>
        </div>
      </section>

      {/* Row 5 — students flagged below threshold */}
      <section
        data-wf="b-4-0"
        aria-labelledby="flagged-heading"
        className="mt-10 px-5 pb-4 pt-7 sm:px-8"
        style={{ backgroundColor: panelBg, borderRadius: "40px 40px 24px 24px", borderBottom: `1px solid ${hairline}` }}
      >
        <div className="flex flex-wrap items-end justify-between gap-3 px-1 sm:px-2">
          <div>
            <h2
              id="flagged-heading"
              className="text-[22px] leading-tight sm:text-[25px]"
              style={{ fontFamily: brand.fontHeading, fontStyle: "italic", fontWeight: 600, color: P }}
            >
              Students flagged below threshold ({THRESHOLD}%)
            </h2>
            <p className="mt-1.5 text-[13.5px]" style={{ color: N, ...num }}>
              {flagRows.length} students across your 5 courses · {criticalCount} below 60% · percentage is sessions present ÷ sessions held
            </p>
          </div>
        </div>

        {flagRows.length === 0 ? (
          <div className="py-8">
            <Empty
              title="nobody is short this term"
              description={`every enrolled student is at or above ${THRESHOLD}% in your courses. flags appear here as soon as a roster is saved.`}
            />
          </div>
        ) : (
          <div className="mt-4 overflow-x-auto pb-2">
            <Table aria-labelledby="flagged-heading" className="w-full min-w-[860px]" style={num}>
              <THead>
                <TR style={{ borderBottom: "none" }}>
                  {sortHeader("i-4-0-0", "roll", "Roll no", flagSort, setFlagSort, false)}
                  {sortHeader("i-4-0-1", "fullName", "Full name", flagSort, setFlagSort, false)}
                  {sortHeader("i-4-0-2", "course", "Course", flagSort, setFlagSort, false)}
                  {sortHeader("i-4-0-3", "present", "Sessions present", flagSort, setFlagSort, true)}
                  {sortHeader("i-4-0-4", "held", "Sessions held", flagSort, setFlagSort, true)}
                  {sortHeader("i-4-0-5", "percentage", "Percentage", flagSort, setFlagSort, false)}
                  {sortHeader("i-4-0-6", "flag", "Shortage flag", flagSort, setFlagSort, false)}
                </TR>
              </THead>
              <TBody>
                {flagRows.map((s) => (
                  <TR key={s.id} className="atrium-row" style={{ borderBottom: `1px solid ${hairline}` }}>
                    <TD style={{ padding: "13px 16px", ...num }} className="text-[14px] font-semibold">
                      {s.roll}
                    </TD>
                    <TD style={{ padding: "13px 16px" }}>
                      <span className="flex items-center gap-2.5">
                        <Avatar name={s.fullName} className="h-8 w-8" />
                        <span className="text-[14.5px]" style={{ color: P }}>
                          {s.fullName}
                        </span>
                      </span>
                    </TD>
                    <TD style={{ padding: "13px 16px" }} className="text-[14px]">
                      <span style={{ color: P, fontWeight: 600, ...num }}>{s.course}</span>
                      <span className="block text-[12px]" style={{ color: N }}>
                        {s.courseName}
                      </span>
                    </TD>
                    <TD style={{ padding: "13px 16px", textAlign: "right", ...num }} className="text-[14.5px]">
                      {s.present}
                    </TD>
                    <TD style={{ padding: "13px 16px", textAlign: "right", ...num }} className="text-[14.5px]">
                      {s.held}
                    </TD>
                    <TD style={{ padding: "13px 16px" }}>
                      <span className="flex items-center gap-3">
                        {meter(s.percentage, A, true)}
                        <span className="text-[14.5px] font-semibold" style={num}>
                          {s.percentage.toFixed(1)}%
                        </span>
                      </span>
                    </TD>
                    <TD style={{ padding: "13px 16px" }}>
                      {s.critical ? (
                        <span
                          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-semibold"
                          style={{ backgroundColor: P, color: BG }}
                        >
                          <AlertCircle aria-hidden="true" className="h-3.5 w-3.5" />
                          critical shortage
                        </span>
                      ) : (
                        <span
                          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-semibold"
                          style={{ backgroundColor: tint(A, 0.26), color: P, ...num }}
                        >
                          <AlertCircle aria-hidden="true" className="h-3.5 w-3.5" />
                          below {THRESHOLD}%
                        </span>
                      )}
                    </TD>
                  </TR>
                ))}
              </TBody>
            </Table>
          </div>
        )}
      </section>

      {/* Row 6 — report link */}
      <div className="mt-8 flex justify-center">
        <button
          data-wf="b-5-0"
          type="button"
          onClick={() => navigate("reports")}
          className="atrium-link-underline inline-flex items-center gap-2 rounded-full px-6 py-3 text-[15px] font-semibold underline decoration-dotted transition-colors"
          style={{ color: P, backgroundColor: "transparent", minHeight: "44px", textDecorationColor: A }}
        >
          Generate a full attendance report for these classes
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </button>
      </div>
      <p className="mt-2 text-center text-[12.5px]" style={{ color: N }}>
        reports are scoped to the five courses assigned to you.
      </p>
    </div>
  );
}
