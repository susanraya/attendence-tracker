// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Input, Label, Badge, Table, THead, TBody, TR, TH, TD, Separator, Empty } = UI;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Search } = Icons;

const withAlpha = (hex, a) => {
  const h = String(hex || '#000000').replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const n = parseInt(full, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
};

const SESSION = {
  id: 'ses_4417',
  course_code: 'CS301',
  course_name: 'Data Structures',
  scheduled_at: '29 Oct 2026, 10:00',
  room: 'Block C · Lab 2',
  faculty: 'Dr. A. Rao',
  enrolled: 42,
  sessions_held: 28,
};

const HELD = SESSION.sessions_held;

// roll_no, full_name, sessions_present (in CS301 so far)
const ROSTER_SEED = [
  ['22BCS001', 'Aadhya Menon', 26],
  ['22BCS002', 'Aarav Deshpande', 24],
  ['22BCS003', 'Ananya Krishnan', 28],
  ['22BCS004', 'Arjun Pillai', 19],
  ['22BCS005', 'Bhavya Reddy', 27],
  ['22BCS006', 'Chaitanya Rao', 22],
  ['22BCS007', 'Darshan Hegde', 17],
  ['22BCS008', 'Devika Iyer', 25],
  ['22BCS009', 'Farhan Qureshi', 23],
  ['22BCS010', 'Gauri Kulkarni', 28],
  ['22BCS011', 'Harsh Vardhan Singh', 20],
  ['22BCS012', 'Ishita Banerjee', 26],
  ['22BCS013', 'Jatin Ahuja', 21],
  ['22BCS014', 'Priya Nair', 18],
  ['22BCS015', 'Kavya Subramanian', 27],
  ['22BCS016', 'Kiran Joshi', 24],
  ['22BCS017', 'Lakshmi Prasad', 28],
  ['22BCS018', 'Manan Gupta', 16],
  ['22BCS019', 'Meera Chatterjee', 25],
  ['22BCS020', 'Mohit Bhatt', 22],
  ['22BCS021', 'Namrata Shinde', 26],
  ['22BCS022', 'Neel Kamath', 23],
  ['22BCS023', 'Nikhil Varma', 27],
  ['22BCS024', 'Pooja Mahajan', 28],
  ['22BCS025', 'Pranav Sethi', 20],
  ['22BCS026', 'Rahul Dixit', 24],
  ['22BCS027', 'Rhea Fernandes', 26],
  ['22BCS028', 'Riya Malhotra', 25],
  ['22BCS029', 'Rohan Patil', 15],
  ['22BCS030', 'Sahana Bhat', 27],
  ['22BCS031', 'Sameer Khatri', 21],
  ['22BCS032', 'Sanjana Rawat', 28],
  ['22BCS033', 'Shreya Gokhale', 26],
  ['22BCS034', 'Siddharth Jain', 23],
  ['22BCS035', 'Sneha Vasudevan', 27],
  ['22BCS036', 'Tanvi Bhardwaj', 24],
  ['22BCS037', 'Imran Shaikh', 19],
  ['22BCS038', 'Tejas Naik', 25],
  ['22BCS039', 'Varun Chopra', 22],
  ['22BCS040', 'Vidya Ramachandran', 28],
  ['22BCS041', 'Yash Agarwal', 26],
  ['22BCS042', 'Zoya Merchant', 24],
];

const ROSTER = ROSTER_SEED.map(([roll_no, full_name, sessions_present]) => ({
  roll_no,
  full_name,
  sessions_present,
}));

// two marks already corrected before the session, per the audit log
const INITIAL_MARKS = { '22BCS014': 'absent', '22BCS037': 'present' };
const INITIAL_UPDATED = { '22BCS014': '28 Oct 2026, 14:22', '22BCS037': '28 Oct 2026, 14:20' };

const SEED_HISTORY = [
  {
    id: 'aud_2281',
    wf: 'i-5-0-0',
    roll_no: '22BCS014',
    full_name: 'Priya Nair',
    old_status: 'present',
    new_status: 'absent',
    actor: 'Dr. A. Rao',
    changed_at: '28 Oct 2026 14:22',
  },
  {
    id: 'aud_2280',
    wf: 'i-5-0-1',
    roll_no: '22BCS037',
    full_name: 'Imran Shaikh',
    old_status: 'absent',
    new_status: 'present',
    actor: 'Dr. A. Rao',
    changed_at: '28 Oct 2026 14:20',
  },
];

const stamp = () => {
  const d = new Date();
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `29 Oct 2026, ${hh}:${mm}`;
};

export default function Screen() {
  const navigate = useNavigate();
  const ink = brand.primaryColor;
  const accent = brand.accentColor;
  const surface = 'rgba(255, 255, 255, 0.74)';
  const tint6 = withAlpha(ink, 0.06);
  const tint10 = withAlpha(ink, 0.1);
  const hairline = `inset 0 0 0 1px ${withAlpha(ink, 0.1)}`;

  const [query, setQuery] = React.useState('');
  const [marks, setMarks] = React.useState(() => {
    const m = {};
    ROSTER.forEach((s) => {
      m[s.roll_no] = INITIAL_MARKS[s.roll_no] || null;
    });
    return m;
  });
  const [savedMarks, setSavedMarks] = React.useState(() => {
    const m = {};
    ROSTER.forEach((s) => {
      m[s.roll_no] = INITIAL_MARKS[s.roll_no] || null;
    });
    return m;
  });
  const [updatedAt, setUpdatedAt] = React.useState(() => ({ ...INITIAL_UPDATED }));
  const [history, setHistory] = React.useState(SEED_HISTORY);
  const [saveState, setSaveState] = React.useState('idle'); // idle | saving | error | saved
  const [sessionStatus, setSessionStatus] = React.useState('scheduled');
  const [confirmCancel, setConfirmCancel] = React.useState(false);
  const [lastSaveSummary, setLastSaveSummary] = React.useState(null);

  const attemptsRef = React.useRef(0);
  const timers = React.useRef([]);
  React.useEffect(() => () => timers.current.forEach((t) => clearTimeout(t)), []);
  const after = (ms, fn) => {
    timers.current.push(setTimeout(fn, ms));
  };

  const counts = React.useMemo(() => {
    let present = 0;
    let absent = 0;
    let unmarked = 0;
    ROSTER.forEach((s) => {
      const v = marks[s.roll_no];
      if (v === 'present') present += 1;
      else if (v === 'absent') absent += 1;
      else unmarked += 1;
    });
    return { present, absent, unmarked, marked: present + absent };
  }, [marks]);

  const changedRolls = React.useMemo(
    () => ROSTER.filter((s) => marks[s.roll_no] !== savedMarks[s.roll_no]).map((s) => s.roll_no),
    [marks, savedMarks]
  );

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ROSTER;
    return ROSTER.filter(
      (s) => s.roll_no.toLowerCase().includes(q) || s.full_name.toLowerCase().includes(q)
    );
  }, [query]);

  const isSaved = sessionStatus === 'completed';
  const heldNow = HELD + (isSaved ? 1 : 0);

  const percentFor = (s) => {
    const pres = s.sessions_present + (isSaved && savedMarks[s.roll_no] === 'present' ? 1 : 0);
    return { pres, held: heldNow, pct: ((pres / heldNow) * 100).toFixed(1) };
  };

  const setMark = (roll, status) => {
    setConfirmCancel(false);
    if (saveState === 'saved') return;
    if (saveState === 'error') setSaveState('idle');
    setMarks((m) => ({ ...m, [roll]: status }));
    setUpdatedAt((u) => ({ ...u, [roll]: stamp() }));
  };

  const markAllPresentInView = () => {
    if (saveState === 'saved') return;
    setConfirmCancel(false);
    if (saveState === 'error') setSaveState('idle');
    const now = stamp();
    setMarks((m) => {
      const next = { ...m };
      filtered.forEach((s) => {
        next[s.roll_no] = 'present';
      });
      return next;
    });
    setUpdatedAt((u) => {
      const next = { ...u };
      filtered.forEach((s) => {
        next[s.roll_no] = now;
      });
      return next;
    });
  };

  const handleSave = () => {
    if (counts.unmarked > 0 || saveState === 'saving' || saveState === 'saved') return;
    setConfirmCancel(false);
    setSaveState('saving');
    after(900, () => {
      if (attemptsRef.current === 0) {
        attemptsRef.current = 1;
        setSaveState('error');
        return;
      }
      const corrections = ROSTER.filter(
        (s) => savedMarks[s.roll_no] && marks[s.roll_no] !== savedMarks[s.roll_no]
      ).map((s, i) => ({
        id: `aud_23${i}${Date.now() % 100}`,
        roll_no: s.roll_no,
        full_name: s.full_name,
        old_status: savedMarks[s.roll_no],
        new_status: marks[s.roll_no],
        actor: SESSION.faculty,
        changed_at: stamp().replace(',', ''),
        fresh: true,
      }));
      setHistory((h) => [...corrections, ...h]);
      setSavedMarks({ ...marks });
      setSessionStatus('completed');
      setLastSaveSummary({ marked: counts.marked, corrections: corrections.length });
      setSaveState('saved');
      after(2200, () => navigate('faculty-dashboard'));
    });
  };

  const discardChanges = () => {
    setMarks({ ...savedMarks });
    setUpdatedAt({ ...INITIAL_UPDATED });
    setConfirmCancel(false);
    if (saveState === 'error') setSaveState('idle');
  };

  const statusWord =
    counts.marked === 0
      ? 'not yet marked'
      : isSaved
      ? `all ${SESSION.enrolled} marked`
      : `${counts.marked} of ${SESSION.enrolled} marked`;

  const pillBase =
    'atrium-choice inline-flex items-center justify-center gap-1.5 rounded-full px-3.5 py-2 text-[13px] font-semibold transition-colors duration-150 cursor-pointer select-none min-w-[104px]';

  const choice = (s, value) => {
    const on = marks[s.roll_no] === value;
    const Icon = value === 'present' ? Icons.Check : Icons.X;
    return (
      <label
        className={pillBase}
        style={
          on
            ? { backgroundColor: ink, color: brand.backgroundColor }
            : {
                backgroundColor: withAlpha(ink, 0.04),
                color: withAlpha(ink, 0.72),
                boxShadow: `inset 0 0 0 1px ${withAlpha(ink, 0.12)}`,
              }
        }
      >
        <input
          type="radio"
          className="sr-only atrium-radio"
          name={`status-${s.roll_no}`}
          value={value}
          checked={on}
          disabled={saveState === 'saved'}
          onChange={() => setMark(s.roll_no, value)}
          aria-label={`mark ${s.full_name} ${value} for ${SESSION.course_code} on ${SESSION.scheduled_at}`}
        />
        <Icon className="h-4 w-4" aria-hidden="true" />
        <span>{value}</span>
      </label>
    );
  };

  return (
    <div
      className="min-h-full w-full"
      style={{
        backgroundColor: brand.backgroundColor,
        color: ink,
        fontFamily: brand.fontBody,
        ['--atrium-accent']: accent,
      }}
    >
      <style>{`
        .atrium-focus:focus-visible,
        .atrium-choice:has(.atrium-radio:focus-visible),
        .atrium-field:focus-visible {
          outline: 2px solid var(--atrium-accent);
          outline-offset: 3px;
        }
        .atrium-row { animation: atriumRow 320ms cubic-bezier(.2,.7,.3,1) both; }
        @keyframes atriumRow { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        .atrium-panel { animation: atriumPanel 420ms cubic-bezier(.2,.7,.3,1) both; }
        @keyframes atriumPanel { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: none; } }
        .atrium-pulse { animation: atriumPulse 1.3s ease-in-out infinite; }
        @keyframes atriumPulse { 0%,100% { opacity: .45; } 50% { opacity: 1; } }
        @media (prefers-reduced-motion: reduce) {
          .atrium-row, .atrium-panel, .atrium-pulse { animation: none !important; }
        }
      `}</style>

      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        {/* Row 1 — back + arched session panel */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 sm:col-span-3 lg:col-span-2">
            <button
              type="button"
              data-wf="b-0-0"
              onClick={() => navigate('faculty-dashboard')}
              className="atrium-focus inline-flex min-h-[44px] items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors duration-150 hover:opacity-80"
              style={{ backgroundColor: tint6, color: ink }}
            >
              <Icons.ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>back to dashboard</span>
            </button>
          </div>
        </div>

        <div
          data-wf="b-0-1"
          className="atrium-panel mt-4 px-6 pt-12 pb-10 text-center sm:px-14 lg:px-24"
          style={{
            backgroundColor: tint6,
            borderRadius: '50% 50% 24px 24px / 88px 88px 24px 24px',
          }}
        >
          <div className="flex items-center justify-center gap-2" aria-hidden="true">
            <span className="h-px w-10" style={{ backgroundColor: withAlpha(accent, 0.8) }} />
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent }} />
            <span className="h-px w-10" style={{ backgroundColor: withAlpha(accent, 0.8) }} />
          </div>
          <p
            className="mt-5 text-[12px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: withAlpha(ink, 0.6) }}
          >
            session roster · {SESSION.room}
          </p>
          <h1
            className="mt-3 text-[30px] italic leading-tight sm:text-[38px]"
            style={{ fontFamily: brand.fontHeading, color: ink, fontVariantNumeric: 'tabular-nums' }}
          >
            {SESSION.course_code} {SESSION.course_name} — {SESSION.scheduled_at}
          </h1>

          {/* Row 2 — session summary line */}
          <p
            data-wf="b-1-0"
            className="mx-auto mt-5 max-w-[62ch] text-[15px] leading-relaxed"
            style={{ color: withAlpha(ink, 0.82), fontVariantNumeric: 'tabular-nums' }}
          >
            <span className="font-semibold">{SESSION.enrolled} students enrolled</span>
            {' · session status: '}
            <Badge
              className="mx-1 inline-flex items-center gap-1 rounded-full px-3 py-0.5 text-[12px] font-semibold align-middle"
              style={{
                backgroundColor: isSaved ? withAlpha(accent, 0.24) : withAlpha(ink, 0.1),
                color: ink,
              }}
            >
              {isSaved ? (
                <Icons.CheckCircle className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <Icons.Clock className="h-3.5 w-3.5" aria-hidden="true" />
              )}
              {isSaved ? 'completed' : 'scheduled'}
            </Badge>
            {` · ${statusWord}. every change you save is written to the attendance audit log.`}
          </p>
        </div>

        {/* Row 3 — search + mark all present */}
        <div className="mt-8 grid grid-cols-12 items-end gap-4">
          <div className="col-span-12 sm:col-span-8" data-wf="b-2-0">
            <Label
              htmlFor="roster-search"
              className="mb-2 block text-[13px] font-semibold"
              style={{ color: withAlpha(ink, 0.72) }}
            >
              find a student
            </Label>
            <div className="relative">
              <Icons.Search
                className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2"
                style={{ color: withAlpha(ink, 0.55) }}
                aria-hidden="true"
              />
              <Input
                id="roster-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search roll no or student name"
                className="atrium-field w-full rounded-full border-0 py-3.5 pl-12 pr-5 text-[15px] placeholder:opacity-60"
                style={{
                  backgroundColor: surface,
                  color: ink,
                  boxShadow: hairline,
                  minHeight: 48,
                }}
              />
            </div>
          </div>
          <div className="col-span-12 sm:col-span-4">
            <Button
              type="button"
              data-wf="b-2-1"
              onClick={markAllPresentInView}
              disabled={saveState === 'saved' || filtered.length === 0}
              className="atrium-focus w-full rounded-full border-0 px-5 text-[15px] font-semibold transition-colors duration-150"
              style={{
                minHeight: 48,
                backgroundColor: withAlpha(ink, 0.1),
                color: ink,
                opacity: saveState === 'saved' || filtered.length === 0 ? 0.5 : 1,
                cursor: saveState === 'saved' || filtered.length === 0 ? 'not-allowed' : 'pointer',
              }}
            >
              <span className="inline-flex items-center justify-center gap-2">
                <Icons.CheckCircle className="h-4 w-4" aria-hidden="true" />
                Mark all present
              </span>
            </Button>
            <p className="mt-2 px-2 text-[12.5px]" style={{ color: withAlpha(ink, 0.6) }}>
              {query.trim()
                ? `applies to the ${filtered.length} ${filtered.length === 1 ? 'student' : 'students'} in view`
                : 'applies to all 42 students in view'}
            </p>
          </div>
        </div>

        {/* Row 4 — roster table */}
        <Card
          data-wf="b-3-0"
          className="mt-6 overflow-hidden border-0"
          style={{
            backgroundColor: surface,
            borderRadius: brand.radius,
            boxShadow: `${hairline}, 0 18px 40px -32px ${withAlpha(ink, 0.55)}`,
          }}
        >
          <CardHeader className="flex flex-col gap-4 px-6 pt-7 pb-4 sm:flex-row sm:items-end sm:justify-between sm:px-8">
            <div>
              <CardTitle
                className="text-[21px] italic"
                style={{ fontFamily: brand.fontHeading, color: ink }}
              >
                Enrolled students
              </CardTitle>
              <CardDescription className="mt-1 text-[13.5px]" style={{ color: withAlpha(ink, 0.65) }}>
                {query.trim()
                  ? `showing ${filtered.length} of ${SESSION.enrolled} enrolled`
                  : 'marks save to this session only — percentages per course recalculate on save'}
              </CardDescription>
            </div>
            <div className="sm:text-right">
              <p
                className="text-[13px] font-semibold"
                style={{ color: withAlpha(ink, 0.7), fontVariantNumeric: 'tabular-nums' }}
              >
                {counts.marked} / {SESSION.enrolled} marked
              </p>
              <div
                className="mt-2 h-1.5 w-full overflow-hidden rounded-full sm:w-48"
                style={{ backgroundColor: withAlpha(ink, 0.12) }}
                role="img"
                aria-label={`${counts.marked} of ${SESSION.enrolled} students marked`}
              >
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${(counts.marked / SESSION.enrolled) * 100}%`,
                    backgroundColor: accent,
                  }}
                />
              </div>
            </div>
          </CardHeader>

          <CardContent className="px-0 pb-0">
            {filtered.length === 0 ? (
              <div className="px-6 pb-10 pt-2 sm:px-8">
                <Empty
                  title="no one on this roster matches that search"
                  description={`“${query.trim()}” isn’t a roll number or name in CS301 Data Structures. check the roll prefix (22BCS) or clear the search to see all 42 enrolled students.`}
                  action={
                    <Button
                      type="button"
                      onClick={() => setQuery('')}
                      className="atrium-focus rounded-full border-0 px-5 py-2.5 text-sm font-semibold"
                      style={{ backgroundColor: ink, color: brand.backgroundColor, minHeight: 44 }}
                    >
                      clear search
                    </Button>
                  }
                />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table className="w-full text-left" style={{ fontVariantNumeric: 'tabular-nums' }}>
                  <THead>
                    <TR style={{ backgroundColor: withAlpha(ink, 0.05) }}>
                      <TH
                        data-wf="i-3-0-0"
                        scope="col"
                        className="px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.12em] sm:px-8"
                        style={{ color: withAlpha(ink, 0.62) }}
                      >
                        Roll no
                      </TH>
                      <TH
                        data-wf="i-3-0-1"
                        scope="col"
                        className="px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.12em]"
                        style={{ color: withAlpha(ink, 0.62) }}
                      >
                        Full name
                      </TH>
                      <TH
                        data-wf="i-3-0-2"
                        scope="col"
                        className="px-2 py-3 text-[12px] font-semibold uppercase tracking-[0.12em]"
                        style={{ color: withAlpha(ink, 0.62) }}
                      >
                        Present
                      </TH>
                      <TH
                        data-wf="i-3-0-3"
                        scope="col"
                        className="px-2 py-3 text-[12px] font-semibold uppercase tracking-[0.12em]"
                        style={{ color: withAlpha(ink, 0.62) }}
                      >
                        Absent
                      </TH>
                      <TH
                        data-wf="i-3-0-4"
                        scope="col"
                        className="hidden px-6 py-3 text-right text-[12px] font-semibold uppercase tracking-[0.12em] md:table-cell"
                        style={{ color: withAlpha(ink, 0.62) }}
                      >
                        Last updated
                      </TH>
                    </TR>
                  </THead>
                  <TBody key={query}>
                    {filtered.map((s, i) => {
                      const p = percentFor(s);
                      const edited = marks[s.roll_no] !== savedMarks[s.roll_no];
                      return (
                        <TR
                          key={s.roll_no}
                          className="atrium-row align-middle"
                          style={{
                            animationDelay: `${Math.min(i, 14) * 18}ms`,
                            boxShadow: `inset 0 -1px 0 0 ${withAlpha(ink, 0.1)}`,
                            backgroundColor: edited ? withAlpha(accent, 0.09) : 'transparent',
                          }}
                        >
                          <TD className="whitespace-nowrap px-6 py-4 text-[14px] font-semibold sm:px-8">
                            {s.roll_no}
                          </TD>
                          <TD className="px-4 py-4">
                            <span className="block text-[15px] font-semibold">{s.full_name}</span>
                            <span className="mt-0.5 block text-[12.5px]" style={{ color: withAlpha(ink, 0.62) }}>
                              {p.pct}% in {SESSION.course_code} · {p.pres}/{p.held} sessions
                              {edited ? ' · edited, not saved' : ''}
                            </span>
                          </TD>
                          <TD className="px-2 py-4">{choice(s, 'present')}</TD>
                          <TD className="px-2 py-4">{choice(s, 'absent')}</TD>
                          <TD
                            className="hidden whitespace-nowrap px-6 py-4 text-right text-[13px] md:table-cell"
                            style={{ color: withAlpha(ink, 0.62) }}
                          >
                            {updatedAt[s.roll_no] || '—'}
                          </TD>
                        </TR>
                      );
                    })}
                  </TBody>
                </Table>
              </div>
            )}
          </CardContent>

          <CardFooter
            className="flex flex-col gap-2 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8"
            style={{ backgroundColor: withAlpha(ink, 0.04) }}
          >
            <p className="text-[13.5px] font-semibold" style={{ fontVariantNumeric: 'tabular-nums' }}>
              present {counts.present} · absent {counts.absent} · unmarked {counts.unmarked}
            </p>
            <p
              className="inline-flex items-center gap-2 text-[12.5px]"
              style={{ color: withAlpha(ink, 0.62) }}
            >
              <Icons.Clock className="h-3.5 w-3.5" aria-hidden="true" />
              marks stay on this device until you save — safe on a slow connection
            </p>
          </CardFooter>
        </Card>

        {/* Row 5 — save / cancel */}
        <div className="mt-8">
          {saveState === 'error' ? (
            <div
              role="alert"
              className="atrium-panel mb-5 flex items-start gap-3 px-6 py-5"
              style={{
                backgroundColor: withAlpha(ink, 0.08),
                borderRadius: brand.radius,
                boxShadow: `inset 0 0 0 1px ${withAlpha(ink, 0.18)}`,
              }}
            >
              <Icons.AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
              <div>
                <p className="text-[15px] font-semibold">the save didn’t reach the server</p>
                <p className="mt-1 max-w-[62ch] text-[13.5px] leading-relaxed" style={{ color: withAlpha(ink, 0.76) }}>
                  the connection dropped partway through (campus wifi, most likely). nothing was written
                  and nothing was lost — all {counts.marked} marks are still on this page. press save
                  roster again when you are ready.
                </p>
              </div>
            </div>
          ) : null}

          {saveState === 'saved' && lastSaveSummary ? (
            <div
              role="status"
              className="atrium-panel mb-5 flex items-start gap-3 px-6 py-5"
              style={{
                backgroundColor: withAlpha(accent, 0.2),
                borderRadius: brand.radius,
                boxShadow: `inset 0 0 0 1px ${withAlpha(accent, 0.5)}`,
              }}
            >
              <Icons.CheckCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
              <div style={{ fontVariantNumeric: 'tabular-nums' }}>
                <p className="text-[15px] font-semibold">
                  roster saved — session marked completed
                </p>
                <p className="mt-1 max-w-[62ch] text-[13.5px] leading-relaxed" style={{ color: withAlpha(ink, 0.8) }}>
                  {lastSaveSummary.marked} attendance records written,{' '}
                  {lastSaveSummary.corrections === 0
                    ? 'no corrections to log'
                    : `${lastSaveSummary.corrections} correction${lastSaveSummary.corrections === 1 ? '' : 's'} added to the audit log below`}
                  . course percentages now count {heldNow} sessions held. taking you back to your
                  dashboard…
                </p>
              </div>
            </div>
          ) : null}

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 sm:col-span-6">
              <Button
                type="button"
                data-wf="b-4-0"
                onClick={handleSave}
                disabled={counts.unmarked > 0 || saveState === 'saving' || saveState === 'saved'}
                aria-describedby="save-help"
                className="atrium-focus w-full rounded-full border-0 px-6 text-[17px] font-semibold transition-transform duration-150 active:translate-y-px"
                style={{
                  minHeight: 60,
                  backgroundColor: ink,
                  color: brand.backgroundColor,
                  opacity: counts.unmarked > 0 || saveState === 'saved' ? 0.45 : 1,
                  cursor:
                    counts.unmarked > 0 || saveState === 'saving' || saveState === 'saved'
                      ? 'not-allowed'
                      : 'pointer',
                  boxShadow: `0 14px 30px -20px ${withAlpha(ink, 0.9)}`,
                }}
              >
                <span className="inline-flex items-center justify-center gap-2.5">
                  {saveState === 'saving' ? (
                    <span className="atrium-pulse inline-flex items-center gap-2">
                      <Icons.Clock className="h-4.5 w-4.5" aria-hidden="true" />
                      saving roster…
                    </span>
                  ) : saveState === 'saved' ? (
                    <>
                      <Icons.CheckCircle className="h-5 w-5" aria-hidden="true" />
                      roster saved
                    </>
                  ) : (
                    <>
                      <Icons.Check className="h-5 w-5" aria-hidden="true" />
                      {saveState === 'error' ? 'Save roster again' : 'Save roster'}
                    </>
                  )}
                </span>
              </Button>
              <p id="save-help" className="mt-2.5 px-2 text-[13px]" style={{ color: withAlpha(ink, 0.65) }}>
                {counts.unmarked > 0
                  ? `mark the remaining ${counts.unmarked} ${counts.unmarked === 1 ? 'student' : 'students'} to save — a session is only complete when all 42 are marked.`
                  : saveState === 'saved'
                  ? 'saved at ' + stamp().split(', ')[1] + ' · actor, action and timestamp logged for 180 days.'
                  : `${changedRolls.length} ${changedRolls.length === 1 ? 'change' : 'changes'} ready · corrections to earlier marks go to the audit log.`}
              </p>
            </div>

            <div className="col-span-12 sm:col-span-6">
              <Button
                type="button"
                data-wf="b-4-1"
                onClick={() => (confirmCancel ? discardChanges() : setConfirmCancel(true))}
                disabled={changedRolls.length === 0 || saveState === 'saving' || saveState === 'saved'}
                className="atrium-focus w-full rounded-full border-0 px-6 text-[16px] font-semibold transition-colors duration-150"
                style={{
                  minHeight: 60,
                  backgroundColor: confirmCancel ? withAlpha(ink, 0.14) : 'transparent',
                  color: ink,
                  boxShadow: `inset 0 0 0 1px ${withAlpha(ink, 0.22)}`,
                  opacity: changedRolls.length === 0 || saveState === 'saved' ? 0.45 : 1,
                  cursor:
                    changedRolls.length === 0 || saveState === 'saving' || saveState === 'saved'
                      ? 'not-allowed'
                      : 'pointer',
                }}
              >
                <span className="inline-flex items-center justify-center gap-2.5">
                  <Icons.ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  {confirmCancel
                    ? `yes, discard ${changedRolls.length} ${changedRolls.length === 1 ? 'change' : 'changes'}`
                    : 'Cancel changes'}
                </span>
              </Button>
              <p className="mt-2.5 px-2 text-[13px]" style={{ color: withAlpha(ink, 0.65) }}>
                {changedRolls.length === 0
                  ? 'nothing to cancel — this roster matches what is stored.'
                  : confirmCancel
                  ? 'press again to return every mark to its last saved value — or mark a student to carry on editing.'
                  : 'returns all marks to their last saved values.'}
              </p>
            </div>
          </div>
        </div>

        {/* Row 6 — change history */}
        <Card
          data-wf="b-5-0"
          className="mt-10 border-0"
          style={{
            backgroundColor: tint6,
            borderRadius: brand.radius,
            boxShadow: `inset 0 0 0 1px ${withAlpha(ink, 0.08)}`,
          }}
        >
          <CardHeader className="flex flex-col gap-3 px-6 pt-7 pb-3 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div>
              <CardTitle
                className="text-[21px] italic"
                style={{ fontFamily: brand.fontHeading, color: ink }}
              >
                Change history for this session
              </CardTitle>
              <CardDescription className="mt-1 text-[13.5px]" style={{ color: withAlpha(ink, 0.65) }}>
                who changed what, when, and from which value — written as it happens, never edited
              </CardDescription>
            </div>
            <Badge
              className="inline-flex w-fit items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12px] font-semibold"
              style={{ backgroundColor: withAlpha(ink, 0.1), color: ink }}
            >
              <Icons.FileText className="h-3.5 w-3.5" aria-hidden="true" />
              immutable · retained 180 days
            </Badge>
          </CardHeader>
          <CardContent className="px-6 pb-7 sm:px-8">
            <div style={{ backgroundColor: withAlpha(ink, 0.1) }}>
              <Separator className="h-px border-0 bg-transparent" />
            </div>
            <ol className="mt-1">
              {history.map((h, i) => (
                <li
                  key={h.id}
                  data-wf={h.wf}
                  className={`flex flex-wrap items-baseline gap-x-3 gap-y-1.5 py-4 ${h.fresh ? 'atrium-row' : ''}`}
                  style={{
                    boxShadow: i === history.length - 1 ? 'none' : `inset 0 -1px 0 0 ${withAlpha(ink, 0.1)}`,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  <span className="text-[14px] font-semibold">{h.roll_no}</span>
                  <span className="text-[15px]">{h.full_name}</span>
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12.5px] font-semibold"
                    style={{ backgroundColor: withAlpha(ink, 0.1), color: ink }}
                  >
                    {h.old_status}
                    <Icons.ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    {h.new_status}
                  </span>
                  <span className="text-[13px]" style={{ color: withAlpha(ink, 0.65) }}>
                    {h.actor} · {h.changed_at}
                  </span>
                </li>
              ))}
            </ol>
            {history.length === 0 ? (
              <Empty
                title="no corrections yet"
                description="when you change a mark that was already saved, the old and new value appear here with your name and the time."
              />
            ) : null}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
