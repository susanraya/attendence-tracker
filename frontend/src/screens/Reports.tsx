// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Button, Input, Label, Select, Badge, Table, THead, TBody, TR, TH, TD, Empty } = UI;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Check, Users, FileText, Calendar, Clock, Filter, Download, ArrowLeft, AlertCircle } = Icons;

// ---------------------------------------------------------------------------
// Attendance reports — Atrium (cream canvas, arched scope panel, pill fields)
// ---------------------------------------------------------------------------

const hexToRgb = (hex) => {
  const h = String(hex).replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  return [
    parseInt(full.slice(0, 2), 16),
    parseInt(full.slice(2, 4), 16),
    parseInt(full.slice(4, 6), 16),
  ];
};
const alpha = (hex, a) => {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

const THRESHOLD = 75;
const TERM_START = '2026-08-01';
const TERM_END = '2026-10-29';

const FACULTY = {
  email: 'susan.raya@quorq.ai',
  role: 'faculty',
  name: 'S. Raya',
};

const COURSES = {
  CS301: {
    code: 'CS301',
    name: 'Data Structures',
    department: 'Computer Science',
    assigned: true,
    held: 38,
    blocks: [
      { start: '2026-08-01', end: '2026-08-31', held: 13 },
      { start: '2026-09-01', end: '2026-09-30', held: 14 },
      { start: '2026-10-01', end: '2026-10-29', held: 11 },
    ],
  },
  CS318: {
    code: 'CS318',
    name: 'Operating Systems',
    department: 'Computer Science',
    assigned: true,
    held: 26,
    blocks: [
      { start: '2026-08-01', end: '2026-08-31', held: 9 },
      { start: '2026-09-01', end: '2026-09-30', held: 9 },
      { start: '2026-10-01', end: '2026-10-29', held: 8 },
    ],
  },
  CS204: {
    code: 'CS204',
    name: 'Database Systems',
    department: 'Computer Science',
    assigned: true,
    held: 31,
    blocks: [
      { start: '2026-08-01', end: '2026-08-31', held: 11 },
      { start: '2026-09-01', end: '2026-09-30', held: 11 },
      { start: '2026-10-01', end: '2026-10-29', held: 9 },
    ],
  },
  ME204: {
    code: 'ME204',
    name: 'Thermodynamics',
    department: 'Mechanical Engineering',
    assigned: false,
    heldBy: 'Prof. R. Subramanian',
    held: 29,
    blocks: [],
  },
};

const CLASSES = ['CSE-3A', 'CSE-3B', 'CSE-2B'];

// attendance_summary rows, pre-computation: sessions_present over the full term
const RECORDS = [
  // CS301 · CSE-3A
  { roll: '21CS1042', name: 'Aarav Menon', course: 'CS301', klass: 'CSE-3A', present: 35 },
  { roll: '21CS1043', name: 'Diya Raghunathan', course: 'CS301', klass: 'CSE-3A', present: 37 },
  { roll: '21CS1047', name: 'Ishaan Pillai', course: 'CS301', klass: 'CSE-3A', present: 26 },
  { roll: '21CS1051', name: 'Nandita Iyer', course: 'CS301', klass: 'CSE-3A', present: 38 },
  { roll: '21CS1055', name: 'Rohan Deshpande', course: 'CS301', klass: 'CSE-3A', present: 31 },
  { roll: '21CS1058', name: 'Sanjana Bose', course: 'CS301', klass: 'CSE-3A', present: 24 },
  { roll: '21CS1061', name: 'Vikram Chowdhury', course: 'CS301', klass: 'CSE-3A', present: 33 },
  { roll: '21CS1066', name: 'Zoya Qureshi', course: 'CS301', klass: 'CSE-3A', present: 36 },
  { roll: '21CS1095', name: 'Kabir Anand', course: 'CS301', klass: 'CSE-3A', present: 37 },
  { roll: '21CS1098', name: 'Lakshmi Sundar', course: 'CS301', klass: 'CSE-3A', present: 30 },
  // CS301 · CSE-3B
  { roll: '21CS1072', name: 'Advait Kulkarni', course: 'CS301', klass: 'CSE-3B', present: 29 },
  { roll: '21CS1075', name: 'Farhan Shaikh', course: 'CS301', klass: 'CSE-3B', present: 27 },
  { roll: '21CS1079', name: 'Keerthi Nair', course: 'CS301', klass: 'CSE-3B', present: 34 },
  { roll: '21CS1083', name: 'Meghna Pathak', course: 'CS301', klass: 'CSE-3B', present: 38 },
  { roll: '21CS1088', name: 'Tanvi Joshi', course: 'CS301', klass: 'CSE-3B', present: 28 },
  { roll: '21CS1090', name: 'Yash Bhandari', course: 'CS301', klass: 'CSE-3B', present: 32 },
  { roll: '21CS1101', name: 'Neel Varma', course: 'CS301', klass: 'CSE-3B', present: 22 },
  { roll: '21CS1104', name: 'Priya Balan', course: 'CS301', klass: 'CSE-3B', present: 35 },
  { roll: '21CS1107', name: 'Siddharth Rao', course: 'CS301', klass: 'CSE-3B', present: 33 },
  { roll: '21CS1110', name: 'Ananya Ghosh', course: 'CS301', klass: 'CSE-3B', present: 36 },
  // CS318 · CSE-3A
  { roll: '21CS1042', name: 'Aarav Menon', course: 'CS318', klass: 'CSE-3A', present: 24 },
  { roll: '21CS1047', name: 'Ishaan Pillai', course: 'CS318', klass: 'CSE-3A', present: 18 },
  { roll: '21CS1051', name: 'Nandita Iyer', course: 'CS318', klass: 'CSE-3A', present: 25 },
  { roll: '21CS1058', name: 'Sanjana Bose', course: 'CS318', klass: 'CSE-3A', present: 19 },
  { roll: '21CS1061', name: 'Vikram Chowdhury', course: 'CS318', klass: 'CSE-3A', present: 22 },
  { roll: '21CS1066', name: 'Zoya Qureshi', course: 'CS318', klass: 'CSE-3A', present: 26 },
  { roll: '21CS1072', name: 'Advait Kulkarni', course: 'CS318', klass: 'CSE-3A', present: 20 },
  { roll: '21CS1079', name: 'Keerthi Nair', course: 'CS318', klass: 'CSE-3A', present: 23 },
  // CS204 · CSE-2B
  { roll: '22CS2011', name: 'Harini Rajan', course: 'CS204', klass: 'CSE-2B', present: 29 },
  { roll: '22CS2014', name: 'Imran Sayyed', course: 'CS204', klass: 'CSE-2B', present: 21 },
  { roll: '22CS2019', name: 'Jatin Malhotra', course: 'CS204', klass: 'CSE-2B', present: 27 },
  { roll: '22CS2023', name: 'Riya Chandran', course: 'CS204', klass: 'CSE-2B', present: 31 },
  { roll: '22CS2027', name: 'Sameer Qadri', course: 'CS204', klass: 'CSE-2B', present: 23 },
  { roll: '22CS2031', name: 'Trisha Nambiar', course: 'CS204', klass: 'CSE-2B', present: 28 },
  { roll: '22CS2035', name: 'Uday Kiran', course: 'CS204', klass: 'CSE-2B', present: 30 },
];

const STUDENT_OPTIONS = (() => {
  const seen = new Map();
  RECORDS.forEach((r) => {
    if (!seen.has(r.roll)) seen.set(r.roll, { roll: r.roll, name: r.name });
  });
  return Array.from(seen.values()).sort((a, b) => a.roll.localeCompare(b.roll));
})();

const DAY = 86400000;
const parseDay = (iso) => new Date(`${iso}T00:00:00`).getTime();

const fmtDate = (iso) => {
  const t = parseDay(iso);
  if (Number.isNaN(t)) return '—';
  return new Date(t).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const heldInRange = (course, from, to) => {
  if (!course || !course.blocks.length) return 0;
  const f = parseDay(from);
  const t = parseDay(to);
  if (Number.isNaN(f) || Number.isNaN(t)) return 0;
  return course.blocks.reduce((sum, block) => {
    const bs = parseDay(block.start);
    const be = parseDay(block.end);
    const s = Math.max(bs, f);
    const e = Math.min(be, t);
    if (e < s) return sum;
    const days = Math.round((e - s) / DAY) + 1;
    const span = Math.round((be - bs) / DAY) + 1;
    return sum + Math.round((block.held * days) / span);
  }, 0);
};

const DEFAULT_FILTERS = {
  student: 'all',
  course: 'CS301',
  klass: 'all',
  from: TERM_START,
  to: TERM_END,
};

function buildReport(filters) {
  const { student, course, klass, from, to } = filters;

  if (course !== 'all' && !COURSES[course].assigned) {
    return { kind: 'denied', course: COURSES[course] };
  }

  const matched = RECORDS.filter(
    (r) =>
      (course === 'all' || r.course === course) &&
      (klass === 'all' || r.klass === klass) &&
      (student === 'all' || r.roll === student)
  );

  if (!matched.length) return { kind: 'empty-filters' };

  const rows = matched.map((r) => {
    const c = COURSES[r.course];
    const held = heldInRange(c, from, to);
    const present = held === 0 ? 0 : Math.min(held, Math.round((r.present * held) / c.held));
    const pct = held === 0 ? 0 : (present / held) * 100;
    return {
      key: `${r.roll}-${r.course}`,
      roll: r.roll,
      name: r.name,
      courseCode: c.code,
      courseName: c.name,
      klass: r.klass,
      present,
      held,
      pct,
      below: held > 0 && pct < THRESHOLD,
    };
  });

  if (rows.every((r) => r.held === 0)) return { kind: 'empty-sessions' };

  rows.sort((a, b) => a.roll.localeCompare(b.roll) || a.courseCode.localeCompare(b.courseCode));

  const courseCodes = Array.from(new Set(rows.map((r) => r.courseCode)));
  const sessions = courseCodes.reduce(
    (sum, code) => sum + heldInRange(COURSES[code], from, to),
    0
  );
  const students = new Set(rows.map((r) => r.roll)).size;

  return { kind: 'ok', rows, sessions, students, courseCodes };
}

export default function Screen() {
  const navigate = useNavigate();
  const P = brand.primaryColor;
  const A = brand.accentColor;
  const BG = brand.backgroundColor;

  const INK = P;
  const MUTED = alpha(P, 0.78);
  const FAINT = alpha(P, 0.6);
  const LINE = alpha(P, 0.13);
  const PANEL = alpha(P, 0.05);
  const PANEL_DEEP = alpha(P, 0.08);

  const [filters, setFilters] = React.useState(DEFAULT_FILTERS);
  const [applied, setApplied] = React.useState(DEFAULT_FILTERS);
  const [report, setReport] = React.useState(() => buildReport(DEFAULT_FILTERS));
  const [loading, setLoading] = React.useState(false);
  const [pending, setPending] = React.useState(null);
  const [dateError, setDateError] = React.useState('');
  const [stamp, setStamp] = React.useState('29 Oct 2026 · 09:12');
  const [exporting, setExporting] = React.useState(null);
  const [exported, setExported] = React.useState(null);

  // ---- run the report (simulated POST /reports) --------------------------
  React.useEffect(() => {
    if (!pending) return undefined;
    const id = setTimeout(() => {
      setReport(buildReport(pending));
      setApplied(pending);
      setStamp(
        `29 Oct 2026 · ${new Date().toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
        })}`
      );
      setLoading(false);
      setPending(null);
      setExported(null);
    }, 700);
    return () => clearTimeout(id);
  }, [pending]);

  // ---- export (simulated GET /reports/{id}/download) ---------------------
  React.useEffect(() => {
    if (!exporting) return undefined;
    const id = setTimeout(() => {
      const scope =
        applied.course === 'all' ? 'all-courses' : applied.course.toLowerCase();
      setExported({
        format: exporting,
        file: `attendance-${scope}-${applied.from}_${applied.to}.${
          exporting === 'excel' ? 'xlsx' : 'pdf'
        }`,
      });
      setExporting(null);
    }, 900);
    return () => clearTimeout(id);
  }, [exporting, applied]);

  const setField = (key) => (event) => {
    const value = event.target.value;
    setFilters((prev) => ({ ...prev, [key]: value }));
    if (key === 'from' || key === 'to') setDateError('');
  };

  const dirty = JSON.stringify(filters) !== JSON.stringify(applied);

  const generate = (event) => {
    event.preventDefault();
    if (loading) return;
    if (parseDay(filters.from) > parseDay(filters.to)) {
      setDateError(
        'the from date falls after the to date — the range needs to run forwards. your filters are still here.'
      );
      return;
    }
    setDateError('');
    setLoading(true);
    setPending(filters);
  };

  const ok = report.kind === 'ok';
  const rows = ok ? report.rows : [];
  const canExport = ok && rows.length > 0 && !loading;
  const belowCount = rows.filter((r) => r.below).length;

  const scopeLabel = (() => {
    if (report.kind === 'denied') return 'no report run';
    if (!ok) return applied.course === 'all' ? 'your assigned courses' : `${applied.course} ${COURSES[applied.course].name}`;
    if (report.courseCodes.length === 1) {
      const c = COURSES[report.courseCodes[0]];
      return `${c.code} ${c.name}`;
    }
    return `${report.courseCodes.length} assigned courses`;
  })();

  const summaryLine = ok
    ? `${scopeLabel} · ${fmtDate(applied.from)} – ${fmtDate(applied.to)} · ${report.sessions} sessions held · ${report.students} students`
    : null;

  // ---- shared control styles --------------------------------------------
  const fieldStyle = {
    backgroundColor: BG,
    color: INK,
    border: 'none',
    boxShadow: `inset 0 0 0 1px ${LINE}`,
    borderRadius: '999px',
  };
  const fieldClass =
    'atrium-focus w-full h-12 px-5 text-sm leading-none appearance-none';

  const labelClass = 'block mb-2 text-xs tracking-[0.14em] uppercase';
  const labelStyle = { color: FAINT, fontWeight: 600 };

  const css = `
    @keyframes atrium-rise { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
    @keyframes atrium-breathe { 0%, 100% { opacity: .3; } 50% { opacity: .65; } }
    .atrium-row { animation: atrium-rise .3s ease both; }
    .atrium-skel { animation: atrium-breathe 1.4s ease-in-out infinite; }
    .atrium-focus:focus-visible { outline: 2px solid ${A}; outline-offset: 3px; }
    .atrium-link:focus-visible { outline: 2px solid ${A}; outline-offset: 4px; border-radius: 999px; }
    .atrium-press { transition: transform .18s ease, box-shadow .18s ease, background-color .18s ease, opacity .18s ease; }
    .atrium-press:hover:not(:disabled) { transform: translateY(-1px); }
    .atrium-press:active:not(:disabled) { transform: translateY(1px); }
    .atrium-tr { transition: background-color .18s ease; }
    @media (prefers-reduced-motion: reduce) {
      .atrium-row, .atrium-skel { animation: none !important; }
      .atrium-press, .atrium-tr { transition: none !important; }
      .atrium-press:hover:not(:disabled) { transform: none; }
    }
  `;

  const StateBlock = ({ icon, title, body, foot }) => (
    <div className="px-6 py-12 text-center">
      <span
        aria-hidden="true"
        className="inline-flex h-14 w-14 items-center justify-center"
        style={{
          backgroundColor: alpha(A, 0.16),
          borderRadius: '50% 50% 999px 999px / 70% 70% 999px 999px',
          color: INK,
        }}
      >
        {icon}
      </span>
      <p
        className="mt-5 text-xl italic"
        style={{ fontFamily: brand.fontHeading, color: INK }}
      >
        {title}
      </p>
      <p
        className="mx-auto mt-2 max-w-[52ch] text-sm leading-relaxed"
        style={{ color: MUTED }}
      >
        {body}
      </p>
      {foot ? (
        <p className="mx-auto mt-3 max-w-[52ch] text-xs" style={{ color: FAINT }}>
          {foot}
        </p>
      ) : null}
    </div>
  );

  return (
    <div
      className="atrium mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8"
      style={{ fontFamily: brand.fontBody, color: INK, backgroundColor: BG }}
    >
      <style>{css}</style>

      {/* ------------------------------------------------ b-0-0 page title */}
      <header data-wf="b-0-0" className="max-w-[64ch]">
        <p
          className="text-[11px] uppercase tracking-[0.2em]"
          style={{ color: FAINT, fontWeight: 600 }}
        >
          odd term 2026 · attendance
        </p>
        <h1
          className="mt-3 text-[34px] italic leading-[1.15] sm:text-[40px]"
          style={{ fontFamily: brand.fontHeading, color: INK }}
        >
          Attendance reports
        </h1>
        <p className="mt-4 text-base leading-relaxed" style={{ color: MUTED }}>
          pull present-over-held figures for a student, a course, a class or a stretch of
          dates — read them here, then take them away as a spreadsheet or a pdf.
        </p>
      </header>

      {/* ------------------------------------------------- b-1-0 filter bar */}
      <form onSubmit={generate} className="mt-10">
        <section
          data-wf="b-1-0"
          aria-labelledby="filters-heading"
          className="px-5 py-6 sm:px-8 sm:py-7"
          style={{ backgroundColor: PANEL, borderRadius: brand.radius }}
        >
          <div className="flex items-center gap-3">
            <Filter aria-hidden="true" className="h-4 w-4" style={{ color: A }} />
            <h2
              id="filters-heading"
              className="text-lg italic"
              style={{ fontFamily: brand.fontHeading, color: INK }}
            >
              narrow the report
            </h2>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2 lg:grid-cols-5">
            <div>
              <Label htmlFor="f-student" className={labelClass} style={labelStyle}>
                Student
              </Label>
              <Select
                id="f-student"
                data-wf="i-1-0-0"
                value={filters.student}
                onChange={setField('student')}
                className={fieldClass}
                style={fieldStyle}
              >
                <option value="all">All students</option>
                {STUDENT_OPTIONS.map((s) => (
                  <option key={s.roll} value={s.roll}>
                    {s.roll} — {s.name}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <Label htmlFor="f-course" className={labelClass} style={labelStyle}>
                Course
              </Label>
              <Select
                id="f-course"
                data-wf="i-1-0-1"
                value={filters.course}
                onChange={setField('course')}
                className={fieldClass}
                style={fieldStyle}
              >
                <option value="all">All my courses</option>
                {Object.values(COURSES).map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} {c.name}
                    {c.assigned ? '' : ' (not yours)'}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <Label htmlFor="f-class" className={labelClass} style={labelStyle}>
                Class
              </Label>
              <Select
                id="f-class"
                data-wf="i-1-0-2"
                value={filters.klass}
                onChange={setField('klass')}
                className={fieldClass}
                style={fieldStyle}
              >
                <option value="all">All classes</option>
                {CLASSES.map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <Label htmlFor="f-from" className={labelClass} style={labelStyle}>
                Date from
              </Label>
              <Input
                id="f-from"
                data-wf="i-1-0-3"
                type="date"
                value={filters.from}
                onChange={setField('from')}
                aria-invalid={dateError ? 'true' : undefined}
                aria-describedby={dateError ? 'date-error' : 'date-hint'}
                className={fieldClass}
                style={fieldStyle}
              />
            </div>

            <div>
              <Label htmlFor="f-to" className={labelClass} style={labelStyle}>
                Date to
              </Label>
              <Input
                id="f-to"
                data-wf="i-1-0-4"
                type="date"
                value={filters.to}
                onChange={setField('to')}
                aria-invalid={dateError ? 'true' : undefined}
                aria-describedby={dateError ? 'date-error' : 'date-hint'}
                className={fieldClass}
                style={fieldStyle}
              />
            </div>
          </div>

          {dateError ? (
            <p
              id="date-error"
              role="alert"
              className="mt-5 flex items-start gap-2 px-4 py-3 text-sm leading-relaxed"
              style={{
                backgroundColor: alpha(A, 0.18),
                color: INK,
                borderRadius: brand.radius,
              }}
            >
              <AlertCircle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{dateError}</span>
            </p>
          ) : (
            <p id="date-hint" className="mt-5 text-xs" style={{ color: FAINT }}>
              teaching days run 01 Aug 2026 – 29 Oct 2026. leave the dates as they are for
              the whole term.
            </p>
          )}
        </section>

        {/* ------------------------- b-2-0 generate · b-2-1 scope note */}
        <div className="mt-8 grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
          <div>
            <Button
              data-wf="b-2-0"
              type="submit"
              disabled={loading}
              className="atrium-focus atrium-press inline-flex w-full items-center justify-center gap-3 px-8 text-base sm:w-auto"
              style={{
                backgroundColor: loading ? alpha(P, 0.55) : INK,
                color: BG,
                borderRadius: '999px',
                minHeight: '56px',
                fontWeight: 600,
                border: 'none',
                cursor: loading ? 'progress' : 'pointer',
              }}
            >
              <FileText aria-hidden="true" className="h-4 w-4" />
              {loading ? 'building report…' : 'Generate report'}
            </Button>
            {dirty && !loading ? (
              <p className="mt-3 text-xs" style={{ color: FAINT }}>
                filters changed — generate to refresh the figures below.
              </p>
            ) : null}
          </div>

          <div data-wf="b-2-1" className="lg:pl-8">
            <p className="max-w-[58ch] text-sm leading-relaxed" style={{ color: MUTED }}>
              Faculty reports cover only your assigned classes; admins and HODs can report
              across the institution.
            </p>
            <p className="mt-2 text-xs" style={{ color: FAINT }}>
              signed in as {FACULTY.email} · {FACULTY.role} · 3 assigned courses
            </p>
          </div>
        </div>
      </form>

      {/* -------------------------------------------- b-3-0 report scope line */}
      <section
        data-wf="b-3-0"
        aria-live="polite"
        className="mt-10 px-6 pb-8 pt-12 text-center sm:px-10"
        style={{
          backgroundColor: PANEL_DEEP,
          borderRadius: `50% 50% ${brand.radius} ${brand.radius} / 88px 88px ${brand.radius} ${brand.radius}`,
        }}
      >
        {report.kind === 'denied' ? (
          <p
            className="mx-auto max-w-[56ch] text-lg italic leading-snug"
            style={{ fontFamily: brand.fontHeading, color: INK }}
          >
            no report run — {report.course.code} {report.course.name} sits outside your
            assigned classes
          </p>
        ) : ok ? (
          <p
            className="mx-auto max-w-[62ch] text-xl italic leading-snug sm:text-2xl"
            style={{
              fontFamily: brand.fontHeading,
              color: INK,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {summaryLine}
          </p>
        ) : (
          <p
            className="mx-auto max-w-[56ch] text-lg italic leading-snug"
            style={{ fontFamily: brand.fontHeading, color: INK }}
          >
            {scopeLabel} · {fmtDate(applied.from)} – {fmtDate(applied.to)} · nothing to
            total yet
          </p>
        )}

        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
          <span
            className="text-xs"
            style={{ color: FAINT, fontVariantNumeric: 'tabular-nums' }}
          >
            computed {stamp} · threshold {THRESHOLD}%
          </span>
          {ok && belowCount > 0 ? (
            <Badge
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs"
              style={{
                backgroundColor: alpha(A, 0.2),
                color: INK,
                borderRadius: '999px',
                border: 'none',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              <AlertCircle aria-hidden="true" className="h-3.5 w-3.5" />
              {belowCount} below threshold
            </Badge>
          ) : null}
          {dirty && !loading ? (
            <Badge
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs"
              style={{
                backgroundColor: alpha(P, 0.1),
                color: INK,
                borderRadius: '999px',
                border: 'none',
              }}
            >
              <Clock aria-hidden="true" className="h-3.5 w-3.5" />
              showing the earlier run
            </Badge>
          ) : null}
        </div>
      </section>

      {/* --------------------------------------------- b-4-0 report results */}
      <section
        data-wf="b-4-0"
        aria-labelledby="results-heading"
        className="mt-8"
        style={{ backgroundColor: PANEL, borderRadius: brand.radius }}
      >
        <div className="flex flex-wrap items-baseline justify-between gap-2 px-5 pb-4 pt-6 sm:px-8">
          <h2
            id="results-heading"
            className="text-lg italic"
            style={{ fontFamily: brand.fontHeading, color: INK }}
          >
            Report results
          </h2>
          <p
            className="text-xs"
            style={{ color: FAINT, fontVariantNumeric: 'tabular-nums' }}
          >
            {ok ? `${rows.length} rows · student × course` : 'student × course'}
          </p>
        </div>

        <div style={{ height: '1px', backgroundColor: LINE }} />

        <div className="overflow-x-auto px-1 pb-2 sm:px-3">
          <Table
            className="w-full min-w-[840px] border-collapse text-sm"
            style={{ fontVariantNumeric: 'tabular-nums' }}
          >
            <THead>
              <TR>
                {[
                  ['i-4-0-0', 'Roll no', 'left'],
                  ['i-4-0-1', 'Full name', 'left'],
                  ['i-4-0-2', 'Course', 'left'],
                  ['i-4-0-3', 'Sessions present', 'right'],
                  ['i-4-0-4', 'Sessions held', 'right'],
                  ['i-4-0-5', 'Percentage', 'right'],
                  ['i-4-0-6', 'Below threshold', 'left'],
                ].map(([id, label, align]) => (
                  <TH
                    key={id}
                    data-wf={id}
                    scope="col"
                    className={`px-4 py-4 text-[11px] uppercase tracking-[0.12em] ${
                      align === 'right' ? 'text-right' : 'text-left'
                    }`}
                    style={{
                      color: FAINT,
                      fontWeight: 600,
                      borderBottom: `1px solid ${LINE}`,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {label}
                  </TH>
                ))}
              </TR>
            </THead>

            <TBody>
              {loading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <TR key={`skeleton-${i}`}>
                      {Array.from({ length: 7 }).map((__, j) => (
                        <TD
                          key={j}
                          className="px-4 py-4"
                          style={{ borderBottom: `1px solid ${LINE}` }}
                        >
                          <span
                            className="atrium-skel block h-3"
                            style={{
                              backgroundColor: alpha(P, 0.35),
                              borderRadius: '999px',
                              width: j === 1 ? '70%' : j === 6 ? '55%' : '45%',
                              animationDelay: `${i * 90}ms`,
                            }}
                          />
                          <span className="sr-only">loading row</span>
                        </TD>
                      ))}
                    </TR>
                  ))
                : null}

              {!loading && report.kind === 'denied' ? (
                <TR>
                  <TD colSpan={7} className="p-0">
                    <StateBlock
                      icon={<Users className="h-6 w-6" />}
                      title={`${report.course.code} isn't one of your classes`}
                      body={`${report.course.code} ${report.course.name} is held by ${report.course.heldBy} for ${report.course.department}. faculty reports stay inside your own assigned classes; an admin or HOD can report across the institution.`}
                      foot="need it? ask your HOD to add you to the course in the admin console — the request is logged against your account."
                    />
                  </TD>
                </TR>
              ) : null}

              {!loading && report.kind === 'empty-filters' ? (
                <TR>
                  <TD colSpan={7} className="p-0">
                    <div className="px-6 py-10">
                      <Empty
                        title="no enrolment matches those filters"
                        description={`${
                          applied.student === 'all'
                            ? 'that class'
                            : `${applied.student} ${
                                (STUDENT_OPTIONS.find((s) => s.roll === applied.student) || {})
                                  .name || ''
                              }`
                        } isn't enrolled in ${
                          applied.course === 'all' ? 'any of your courses' : applied.course
                        }${
                          applied.klass === 'all' ? '' : ` for ${applied.klass}`
                        }. widen the student or class filter and generate again.`}
                      />
                    </div>
                  </TD>
                </TR>
              ) : null}

              {!loading && report.kind === 'empty-sessions' ? (
                <TR>
                  <TD colSpan={7} className="p-0">
                    <StateBlock
                      icon={<Calendar className="h-6 w-6" />}
                      title="no sessions were held in that window"
                      body={`${scopeLabel} has nothing on the timetable between ${fmtDate(
                        applied.from
                      )} and ${fmtDate(applied.to)}, so there is no percentage to compute.`}
                      foot="the term runs 01 Aug 2026 – 29 Oct 2026."
                    />
                  </TD>
                </TR>
              ) : null}

              {!loading && ok
                ? rows.map((r, i) => (
                    <TR
                      key={r.key}
                      className="atrium-row atrium-tr"
                      style={{ animationDelay: `${Math.min(i, 12) * 22}ms` }}
                    >
                      <TD
                        className="px-4 py-4 whitespace-nowrap"
                        style={{ borderBottom: `1px solid ${LINE}`, color: MUTED }}
                      >
                        {r.roll}
                      </TD>
                      <TD
                        className="px-4 py-4 whitespace-nowrap"
                        style={{
                          borderBottom: `1px solid ${LINE}`,
                          color: INK,
                          fontWeight: 600,
                        }}
                      >
                        {r.name}
                      </TD>
                      <TD
                        className="px-4 py-4 whitespace-nowrap"
                        style={{ borderBottom: `1px solid ${LINE}`, color: MUTED }}
                      >
                        {r.courseCode} {r.courseName}
                        <span className="block text-xs" style={{ color: FAINT }}>
                          {r.klass}
                        </span>
                      </TD>
                      <TD
                        className="px-4 py-4 text-right"
                        style={{ borderBottom: `1px solid ${LINE}`, color: INK }}
                      >
                        {r.present}
                      </TD>
                      <TD
                        className="px-4 py-4 text-right"
                        style={{ borderBottom: `1px solid ${LINE}`, color: MUTED }}
                      >
                        {r.held}
                      </TD>
                      <TD
                        className="px-4 py-4"
                        style={{ borderBottom: `1px solid ${LINE}`, color: INK }}
                      >
                        <div className="flex items-center justify-end gap-3">
                          <span
                            aria-hidden="true"
                            className="relative hidden h-1.5 w-24 sm:block"
                            style={{
                              backgroundColor: alpha(P, 0.12),
                              borderRadius: '999px',
                            }}
                          >
                            <span
                              className="absolute inset-y-0 left-0"
                              style={{
                                width: `${Math.max(2, Math.min(100, r.pct))}%`,
                                backgroundColor: r.below ? A : alpha(P, 0.55),
                                borderRadius: '999px',
                                transition: 'width .4s ease',
                              }}
                            />
                            <span
                              className="absolute -top-1 h-3.5 w-px"
                              style={{ left: `${THRESHOLD}%`, backgroundColor: alpha(P, 0.5) }}
                            />
                          </span>
                          <span style={{ fontWeight: 600, minWidth: '52px' }}>
                            {r.pct.toFixed(1)}%
                          </span>
                        </div>
                      </TD>
                      <TD className="px-4 py-4" style={{ borderBottom: `1px solid ${LINE}` }}>
                        {r.below ? (
                          <Badge
                            className="inline-flex items-center gap-1.5 px-3 py-1 text-xs"
                            style={{
                              backgroundColor: alpha(A, 0.22),
                              color: INK,
                              borderRadius: '999px',
                              border: 'none',
                              fontWeight: 600,
                            }}
                          >
                            <AlertCircle aria-hidden="true" className="h-3.5 w-3.5" />
                            Yes — below {THRESHOLD}%
                          </Badge>
                        ) : (
                          <Badge
                            className="inline-flex items-center gap-1.5 px-3 py-1 text-xs"
                            style={{
                              backgroundColor: alpha(P, 0.08),
                              color: MUTED,
                              borderRadius: '999px',
                              border: 'none',
                            }}
                          >
                            <Check aria-hidden="true" className="h-3.5 w-3.5" />
                            No — meets {THRESHOLD}%
                          </Badge>
                        )}
                      </TD>
                    </TR>
                  ))
                : null}
            </TBody>
          </Table>
        </div>

        {ok ? (
          <p className="px-5 pb-6 pt-2 text-xs sm:px-8" style={{ color: FAINT }}>
            percentage = sessions present ÷ sessions held, to one decimal. corrections made
            on a roster re-compute these figures.
          </p>
        ) : null}
      </section>

      {/* ---------------------------------- b-5-0 / b-5-1 export buttons */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <Button
            data-wf="b-5-0"
            type="button"
            onClick={() => setExporting('excel')}
            disabled={!canExport || exporting !== null}
            aria-describedby="export-excel-status"
            className="atrium-focus atrium-press inline-flex w-full items-center justify-center gap-3 px-6 text-sm"
            style={{
              backgroundColor: 'transparent',
              color: INK,
              boxShadow: `inset 0 0 0 1px ${canExport ? alpha(P, 0.28) : LINE}`,
              borderRadius: '999px',
              minHeight: '52px',
              border: 'none',
              fontWeight: 600,
              opacity: canExport ? 1 : 0.45,
              cursor: canExport ? 'pointer' : 'not-allowed',
            }}
          >
            <Download aria-hidden="true" className="h-4 w-4" />
            {exporting === 'excel' ? 'preparing spreadsheet…' : 'Export to Excel'}
          </Button>
          <p
            id="export-excel-status"
            role="status"
            className="mt-2 px-2 text-xs leading-relaxed"
            style={{ color: exported && exported.format === 'excel' ? INK : FAINT }}
          >
            {exported && exported.format === 'excel'
              ? `${exported.file} is ready — download started.`
              : canExport
              ? '.xlsx, one row per student per course, matching the table above.'
              : 'generate a report with results before exporting.'}
          </p>
        </div>

        <div>
          <Button
            data-wf="b-5-1"
            type="button"
            onClick={() => setExporting('pdf')}
            disabled={!canExport || exporting !== null}
            aria-describedby="export-pdf-status"
            className="atrium-focus atrium-press inline-flex w-full items-center justify-center gap-3 px-6 text-sm"
            style={{
              backgroundColor: 'transparent',
              color: INK,
              boxShadow: `inset 0 0 0 1px ${canExport ? alpha(P, 0.28) : LINE}`,
              borderRadius: '999px',
              minHeight: '52px',
              border: 'none',
              fontWeight: 600,
              opacity: canExport ? 1 : 0.45,
              cursor: canExport ? 'pointer' : 'not-allowed',
            }}
          >
            <Download aria-hidden="true" className="h-4 w-4" />
            {exporting === 'pdf' ? 'typesetting pdf…' : 'Export to PDF'}
          </Button>
          <p
            id="export-pdf-status"
            role="status"
            className="mt-2 px-2 text-xs leading-relaxed"
            style={{ color: exported && exported.format === 'pdf' ? INK : FAINT }}
          >
            {exported && exported.format === 'pdf'
              ? `${exported.file} is ready — download started.`
              : canExport
              ? 'pdf carries the same filters, totals and shortage flags in the header.'
              : 'generate a report with results before exporting.'}
          </p>
        </div>
      </div>

      <div className="mt-10" style={{ height: '1px', backgroundColor: LINE }} />

      {/* ------------------------------------------------------- b-6-0 link */}
      <div className="mt-6 pb-4">
        <button
          data-wf="b-6-0"
          type="button"
          onClick={() => navigate('faculty-dashboard')}
          className="atrium-link inline-flex items-center gap-2 py-2 text-sm"
          style={{
            background: 'none',
            border: 'none',
            color: INK,
            cursor: 'pointer',
            fontWeight: 600,
            textDecoration: 'underline',
            textUnderlineOffset: '4px',
            textDecorationColor: alpha(A, 0.8),
          }}
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          Back to faculty dashboard
        </button>
      </div>
    </div>
  );
}
