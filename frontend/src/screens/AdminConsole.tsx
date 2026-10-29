// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Check, X, Home, Clock, Edit, Download, Upload, ArrowLeft, ArrowRight, AlertCircle } = Icons;

/* ---------------------------------------------------------------
   Atrium — Admin console
   Sri Vedha Institute of Technology · attendance management
----------------------------------------------------------------*/

const hexToRgb = (hex) => {
  const h = String(hex).replace('#', '');
  const f = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  return [parseInt(f.slice(0, 2), 16), parseInt(f.slice(2, 4), 16), parseInt(f.slice(4, 6), 16)];
};
const tint = (hex, a) => {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};
const shade = (hex, k) => {
  const [r, g, b] = hexToRgb(hex);
  const c = (v) => Math.max(0, Math.min(255, Math.round(v * k))).toString(16).padStart(2, '0');
  return `#${c(r)}${c(g)}${c(b)}`;
};

const INK = brand.primaryColor;
const ACCENT = brand.accentColor;
const ACCENT_DEEP = shade(brand.accentColor, 0.72);
const BG = brand.backgroundColor;
const HAIR = tint(INK, 0.13);
const SURFACE = tint(INK, 0.045);
const SURFACE_2 = tint(INK, 0.075);
const MUTED = tint(INK, 0.78);
const R = brand.radius;

const CSS = `
.atr :focus-visible { outline: 2px solid var(--atr-ink); outline-offset: 2px; }
.atr-file::file-selector-button {
  font: inherit; border: 0; cursor: pointer; margin-right: 12px;
  padding: 8px 18px; border-radius: 999px;
  background: var(--atr-ink-12); color: var(--atr-ink);
}
.atr-file::file-selector-button:hover { background: var(--atr-ink-20); }
@keyframes atr-rise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
@keyframes atr-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes atr-fill { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
@keyframes atr-pulse { 0%,100% { opacity: .35; } 50% { opacity: 1; } }
.atr-rise { animation: atr-rise .38s cubic-bezier(.2,.7,.3,1) both; }
.atr-fade { animation: atr-fade .3s ease-out both; }
.atr-bar > span { display:block; height:100%; width:45%; border-radius:999px; animation: atr-fill 1.25s ease-in-out infinite; }
.atr-dot { animation: atr-pulse 1.8s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) {
  .atr-rise, .atr-fade, .atr-bar > span, .atr-dot { animation: none !important; }
  .atr * { transition: none !important; }
}
`;

const TABS = [
  { key: 'import', label: 'Term data import', wf: 'i-1-0-0' },
  { key: 'records', label: 'Records', wf: 'i-1-0-1' },
  { key: 'config', label: 'Configuration', wf: 'i-1-0-2' },
  { key: 'audit', label: 'Audit logs', wf: 'i-1-0-3' },
];

const SEED_JOBS = [
  {
    id: 'IMP-2050', import_type: 'students', file: 'students_transfer_in.csv', status: 'queued',
    rows_imported: null, rows_total: 23, errors: [],
    created_by: 'susan.raya@svit.edu.in', created_at: '29 Oct 2026, 10:04',
  },
  {
    id: 'IMP-2049', import_type: 'timetables', file: 'timetable_sem3_rev.xlsx', status: 'processing',
    rows_imported: null, rows_total: 412, errors: [],
    created_by: 'susan.raya@svit.edu.in', created_at: '29 Oct 2026, 10:02',
  },
  {
    id: 'IMP-2048', import_type: 'timetables', file: 'timetable_sem3.xlsx', status: 'failed',
    rows_imported: 0, rows_total: 412,
    errors: [
      { row: 7, column: 'course_code', value: 'CS-4071', error: 'unresolved reference — no course with code CS-4071' },
      { row: 19, column: 'course_code', value: 'EC-3108', error: 'unresolved reference — no course with code EC-3108' },
      { row: 44, column: 'scheduled_at', value: '31/11/2026 09:00', error: 'invalid date — 31 November does not exist' },
      { row: 51, column: 'faculty_email', value: 'r.menon@svit.edu', error: 'no faculty account matches this email' },
    ],
    created_by: 'susan.raya@svit.edu.in', created_at: '29 Oct 2026, 09:12',
  },
  {
    id: 'IMP-2047', import_type: 'students', file: 'students_oct2026.csv', status: 'partial',
    rows_imported: 1839, rows_total: 1842,
    errors: [
      { row: 118, column: 'email', value: 'priya.n@svit.edu.in', error: 'duplicate email — already held by roll 22CS044' },
      { row: 506, column: 'department', value: '(blank)', error: 'department is required' },
      { row: 1733, column: 'roll_no', value: '22EC_091', error: 'roll no must be alphanumeric, no underscores' },
    ],
    created_by: 'susan.raya@svit.edu.in', created_at: '28 Oct 2026, 17:40',
  },
  {
    id: 'IMP-2046', import_type: 'courses', file: 'courses_odd2026.xlsx', status: 'completed',
    rows_imported: 162, rows_total: 162, errors: [],
    created_by: 'k.iyer@svit.edu.in', created_at: '28 Oct 2026, 11:05',
  },
  {
    id: 'IMP-2045', import_type: 'students', file: 'students_lateral_entry.csv', status: 'completed',
    rows_imported: 94, rows_total: 94, errors: [],
    created_by: 'k.iyer@svit.edu.in', created_at: '24 Oct 2026, 15:28',
  },
];

const SEED_RECORDS = [
  { id: 'r1', type: 'student', key: '22CS017', name: 'Ananya Krishnan', dept: 'Computer Science', when: '' },
  { id: 'r2', type: 'student', key: '22CS044', name: 'Priya Nandakumar', dept: 'Computer Science', when: '' },
  { id: 'r3', type: 'student', key: '21ME088', name: 'Faizan Qureshi', dept: 'Mechanical', when: '' },
  { id: 'r4', type: 'student', key: '22EC104', name: 'Rohan Deshmukh', dept: 'Electronics', when: '' },
  { id: 'r5', type: 'course', key: 'CS305', name: 'Operating Systems', dept: 'Computer Science', when: '' },
  { id: 'r6', type: 'course', key: 'EC3102', name: 'Signals and Systems', dept: 'Electronics', when: '' },
  { id: 'r7', type: 'course', key: 'ME2201', name: 'Thermodynamics II', dept: 'Mechanical', when: '' },
  { id: 'r8', type: 'timetable', key: 'CS305', name: 'Operating Systems — Section B', dept: 'Computer Science', when: 'Mon 02 Nov 2026, 09:00' },
  { id: 'r9', type: 'timetable', key: 'EC3102', name: 'Signals and Systems — Section A', dept: 'Electronics', when: 'Mon 02 Nov 2026, 11:15' },
  { id: 'r10', type: 'timetable', key: 'ME2201', name: 'Thermodynamics II — Section C', dept: 'Mechanical', when: 'Tue 03 Nov 2026, 14:00' },
];

const SEED_ATT_AUDIT = [
  { id: 'AA-884', at: '28 Oct 2026, 16:22', actor: 'Dr. Anitha Raghavan', student: 'Ananya Krishnan · 22CS017', session: 'CS305 · 27 Oct, 09:00', old: 'absent', next: 'present' },
  { id: 'AA-883', at: '28 Oct 2026, 16:21', actor: 'Dr. Anitha Raghavan', student: 'Faizan Qureshi · 21ME088', session: 'ME2201 · 27 Oct, 14:00', old: 'present', next: 'absent' },
  { id: 'AA-882', at: '27 Oct 2026, 18:05', actor: 'Prof. Kavitha Iyer', student: 'Rohan Deshmukh · 22EC104', session: 'EC3102 · 26 Oct, 11:15', old: 'absent', next: 'present' },
  { id: 'AA-881', at: '26 Oct 2026, 09:47', actor: 'Prof. Sunil Barve', student: 'Priya Nandakumar · 22CS044', session: 'CS305 · 23 Oct, 09:00', old: 'present', next: 'absent' },
  { id: 'AA-880', at: '24 Oct 2026, 12:30', actor: 'Dr. Anitha Raghavan', student: 'Meera Vasanth · 22CS061', session: 'CS3011 · 24 Oct, 10:00', old: 'absent', next: 'present' },
];

const SEED_ICT = [
  { at: '29 Oct 2026, 10:02', actor: 'susan.raya@svit.edu.in', action: 'import.started', entity: 'import_jobs · IMP-2049', detail: 'timetable_sem3_rev.xlsx · 412 rows queued' },
  { at: '29 Oct 2026, 09:12', actor: 'susan.raya@svit.edu.in', action: 'import.failed', entity: 'import_jobs · IMP-2048', detail: 'rejected — 4 unresolved references, nothing committed' },
  { at: '28 Oct 2026, 17:41', actor: 'system', action: 'accounts.provisioned', entity: 'users · 1,839 records', detail: 'role student · must_set_password = true' },
  { at: '28 Oct 2026, 08:14', actor: 'r.menon@svit.edu.in', action: 'auth.login.failed', entity: 'users · r.menon@svit.edu.in', detail: '3rd attempt from 103.21.44.17 · locked 15 min' },
  { at: '27 Oct 2026, 19:02', actor: 'susan.raya@svit.edu.in', action: 'config.threshold.updated', entity: 'app_config · 1', detail: 'attendance_threshold 70 → 75' },
  { at: '26 Oct 2026, 07:58', actor: 'ananya.k@svit.edu.in', action: 'consent.recorded', entity: 'users · 22CS017', detail: 'DPDP notice v2 acknowledged at first login' },
];

const TYPE_LABEL = { students: 'Students', courses: 'Courses', timetables: 'Timetables' };
const ROWS_FOR_TYPE = { students: 1842, courses: 162, timetables: 412 };
const RECORD_LABEL = { student: 'Student', course: 'Course', timetable: 'Timetable' };

const fmtNum = (n) => (n === null || n === undefined ? '—' : n.toLocaleString('en-IN'));

/* ---------- small presentational constants ---------- */

const Panel = ({ children, arch, className = '', ...rest }) => (
  <section
    {...rest}
    className={`px-5 py-7 sm:px-9 sm:py-9 ${className}`}
    style={{
      backgroundColor: SURFACE,
      border: `1px solid ${HAIR}`,
      borderRadius: R,
      borderTopLeftRadius: arch ? '150px' : R,
      borderTopRightRadius: arch ? '150px' : R,
    }}
  >
    {children}
  </section>
);

const Heading = ({ children, id, hint }) => (
  <div className="mb-6">
    <h2
      id={id}
      className="text-[24px] sm:text-[27px] leading-tight"
      style={{ fontFamily: brand.fontHeading, fontStyle: 'italic', color: INK }}
    >
      {children}
    </h2>
    {hint ? (
      <p className="mt-2 text-[13px] leading-relaxed" style={{ color: MUTED, maxWidth: '62ch' }}>
        {hint}
      </p>
    ) : null}
  </div>
);

const PILL = 'inline-flex items-center justify-center gap-2 rounded-full text-[14px] font-semibold transition-colors duration-200';

const PrimaryBtn = ({ children, className = '', style, ...rest }) => (
  <UI.Button
    {...rest}
    className={`${PILL} px-6 py-3 min-h-[44px] hover:brightness-110 disabled:opacity-55 ${className}`}
    style={{ backgroundColor: ACCENT_DEEP, color: BG, border: '1px solid transparent', ...style }}
  >
    {children}
  </UI.Button>
);

const QuietBtn = ({ children, className = '', style, ...rest }) => (
  <UI.Button
    {...rest}
    className={`${PILL} px-5 py-2.5 min-h-[44px] ${className}`}
    style={{ backgroundColor: 'transparent', color: INK, border: `1px solid ${tint(INK, 0.28)}`, ...style }}
  >
    {children}
  </UI.Button>
);

const LinkBtn = ({ children, className = '', style, ...rest }) => (
  <UI.Button
    {...rest}
    className={`inline-flex items-center gap-2 rounded-full px-2 py-2 min-h-[44px] text-[14px] font-semibold underline underline-offset-4 ${className}`}
    style={{ background: 'transparent', color: ACCENT_DEEP, border: 'none', ...style }}
  >
    {children}
  </UI.Button>
);

const JOB_STATUS = {
  queued: { label: 'queued', icon: 'Clock' },
  processing: { label: 'processing', icon: 'Clock' },
  completed: { label: 'completed', icon: 'Check' },
  partial: { label: 'completed with errors', icon: 'AlertCircle' },
  failed: { label: 'rejected', icon: 'X' },
};

const StatusChip = ({ status }) => {
  const s = JOB_STATUS[status];
  const Icon = Icons[s.icon];
  const strong = status === 'failed' || status === 'partial';
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12.5px] font-semibold whitespace-nowrap"
      style={{
        backgroundColor: strong ? tint(ACCENT, 0.26) : tint(INK, 0.09),
        color: INK,
        border: `1px solid ${status === 'failed' ? ACCENT_DEEP : 'transparent'}`,
      }}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {s.label}
    </span>
  );
};

const MarkChip = ({ value }) => {
  const Icon = value === 'present' ? Icons.Check : Icons.X;
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12.5px] font-semibold"
      style={{
        backgroundColor: value === 'present' ? tint(INK, 0.09) : tint(ACCENT, 0.22),
        color: INK,
      }}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {value}
    </span>
  );
};

const th = { color: MUTED, fontSize: '11.5px', letterSpacing: '0.09em', textTransform: 'uppercase', fontWeight: 700, padding: '0 16px 12px 0', textAlign: 'left', whiteSpace: 'nowrap' };
const td = { padding: '14px 16px 14px 0', fontSize: '14px', color: INK, verticalAlign: 'top' };

/* ---------------------------------------------------------------
   Screen
----------------------------------------------------------------*/

export default function Screen() {
  const navigate = useNavigate();
  const [tab, setTab] = React.useState('import');
  const tabRefs = React.useRef([]);

  /* --- term data import --- */
  const [importType, setImportType] = React.useState('students');
  const [fileName, setFileName] = React.useState('');
  const [phase, setPhase] = React.useState('idle'); // idle | uploading
  const [formError, setFormError] = React.useState('');
  const [banner, setBanner] = React.useState(null);
  const [templateNote, setTemplateNote] = React.useState('');
  const [jobs, setJobs] = React.useState(SEED_JOBS);
  const [selectedJobId, setSelectedJobId] = React.useState('IMP-2047');
  const [pending, setPending] = React.useState(null);
  const [nextJobNo, setNextJobNo] = React.useState(2051);

  React.useEffect(() => {
    if (phase !== 'uploading' || !pending) return undefined;
    const t = setTimeout(() => {
      const id = `IMP-${nextJobNo}`;
      const rows = ROWS_FOR_TYPE[pending.type];
      const job = {
        id,
        import_type: pending.type,
        file: pending.file,
        status: 'completed',
        rows_imported: rows,
        rows_total: rows,
        errors: [],
        created_by: 'susan.raya@svit.edu.in',
        created_at: '29 Oct 2026, 10:14',
        fresh: true,
      };
      setJobs((prev) => [job, ...prev]);
      setSelectedJobId(id);
      setNextJobNo((n) => n + 1);
      setPhase('idle');
      setPending(null);
      setFileName('');
      setBanner({
        kind: 'ok',
        text: `${pending.file} imported as ${id} — ${fmtNum(rows)} rows added, 0 rejected. accounts for new ${TYPE_LABEL[pending.type].toLowerCase()} are provisioned with a set-password prompt.`,
      });
    }, 1100);
    return () => clearTimeout(t);
  }, [phase, pending, nextJobNo]);

  const startImport = (e) => {
    e.preventDefault();
    setBanner(null);
    setTemplateNote('');
    if (!fileName) {
      setFormError('choose a file first — we read .csv and .xlsx, and the columns have to match the template.');
      return;
    }
    setFormError('');
    setPending({ type: importType, file: fileName });
    setPhase('uploading');
  };

  const selectedJob = jobs.find((j) => j.id === selectedJobId) || jobs[0];
  const inFlight = jobs.some((j) => j.status === 'queued' || j.status === 'processing');

  /* --- records --- */
  const [records, setRecords] = React.useState(SEED_RECORDS);
  const [addMode, setAddMode] = React.useState(null); // student | course | timetable
  const [draft, setDraft] = React.useState({ key: '', name: '', dept: 'Computer Science', when: '' });
  const [recordNote, setRecordNote] = React.useState(null);
  const [editingId, setEditingId] = React.useState(null);
  const [editDraft, setEditDraft] = React.useState({ name: '', dept: '', when: '' });
  const [newIds, setNewIds] = React.useState([]);

  const openAdd = (type) => {
    setAddMode(type);
    setRecordNote(null);
    setEditingId(null);
    setDraft({ key: '', name: '', dept: 'Computer Science', when: type === 'timetable' ? 'Wed 04 Nov 2026, 09:00' : '' });
  };

  const submitRecord = (e) => {
    e.preventDefault();
    const key = draft.key.trim();
    const name = draft.name.trim();
    if (!key || !name) {
      setRecordNote({ kind: 'error', text: addMode === 'course' ? 'course code and course name are both required.' : 'roll no and full name are both required.' });
      return;
    }
    const clash = records.find((r) => r.type === addMode && r.key.toLowerCase() === key.toLowerCase() && addMode !== 'timetable');
    if (clash) {
      setRecordNote({ kind: 'error', text: `${clash.key} already exists — ${clash.name}, ${clash.dept}. nothing was saved; edit that record instead.` });
      return;
    }
    const id = `r${Date.now()}`;
    setRecords((prev) => [{ id, type: addMode, key, name, dept: draft.dept, when: addMode === 'timetable' ? draft.when : '' }, ...prev]);
    setNewIds((prev) => [...prev, id]);
    setRecordNote({ kind: 'ok', text: `${RECORD_LABEL[addMode].toLowerCase()} ${key} saved — rosters and attendance percentages pick it up from the next session.` });
    setAddMode(null);
  };

  const startEdit = (r) => {
    setAddMode(null);
    setRecordNote(null);
    setEditingId(r.id);
    setEditDraft({ name: r.name, dept: r.dept, when: r.when });
  };

  const saveEdit = (id) => {
    setRecords((prev) => prev.map((r) => (r.id === id ? { ...r, name: editDraft.name, dept: editDraft.dept, when: r.type === 'timetable' ? editDraft.when : '' } : r)));
    setEditingId(null);
    setRecordNote({ kind: 'ok', text: 'record updated — the change is written to the ICT audit log with your name and the time.' });
  };

  /* --- configuration --- */
  const [thresholdInput, setThresholdInput] = React.useState('75');
  const [threshold, setThreshold] = React.useState(75);
  const [cfgError, setCfgError] = React.useState('');
  const [cfgSaved, setCfgSaved] = React.useState(null);
  const [cfgMeta, setCfgMeta] = React.useState({ by: 'susan.raya@svit.edu.in', at: '27 Oct 2026, 19:02' });

  const saveThreshold = (e) => {
    e.preventDefault();
    const raw = thresholdInput.trim();
    const n = Number(raw);
    if (raw === '' || !Number.isFinite(n) || !Number.isInteger(n) || n < 1 || n > 100) {
      setCfgSaved(null);
      setCfgError('the threshold has to be a whole number between 1 and 100. your entry is kept above — adjust it and save again.');
      return;
    }
    setCfgError('');
    setThreshold(n);
    setCfgMeta({ by: 'susan.raya@svit.edu.in', at: '29 Oct 2026, 10:16' });
    setCfgSaved(`minimum attendance threshold saved at ${n}%. shortage flags recompute across all 162 courses tonight.`);
  };

  /* --- tabs keyboard --- */
  const onTabKey = (e, i) => {
    const last = TABS.length - 1;
    let next = null;
    if (e.key === 'ArrowRight') next = i === last ? 0 : i + 1;
    else if (e.key === 'ArrowLeft') next = i === 0 ? last : i - 1;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = last;
    if (next === null) return;
    e.preventDefault();
    setTab(TABS[next].key);
    const el = tabRefs.current[next];
    if (el) el.focus();
  };

  const rootStyle = {
    backgroundColor: BG,
    color: INK,
    fontFamily: brand.fontBody,
    '--atr-ink': INK,
    '--atr-ink-12': tint(INK, 0.12),
    '--atr-ink-20': tint(INK, 0.2),
  };

  const inputStyle = {
    backgroundColor: BG,
    color: INK,
    border: `1px solid ${tint(INK, 0.22)}`,
    borderRadius: '999px',
    padding: '12px 20px',
    minHeight: '46px',
    width: '100%',
    fontFamily: brand.fontBody,
    fontSize: '14px',
  };

  const labelStyle = { color: INK, fontSize: '12.5px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' };

  const Note = ({ kind, children }) => (
    <p
      className="atr-fade mt-4 flex items-start gap-2.5 rounded-[18px] px-4 py-3 text-[13.5px] leading-relaxed"
      style={{
        backgroundColor: kind === 'ok' ? tint(INK, 0.07) : tint(ACCENT, 0.2),
        color: INK,
        border: `1px solid ${kind === 'ok' ? HAIR : tint(ACCENT_DEEP, 0.5)}`,
        maxWidth: '72ch',
      }}
      role={kind === 'ok' ? 'status' : 'alert'}
    >
      {kind === 'ok'
        ? <Icons.CheckCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        : <Icons.AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />}
      <span>{children}</span>
    </p>
  );

  return (
    <div className="atr min-h-full w-full px-4 py-8 sm:px-8 sm:py-12" style={rootStyle}>
      <style>{CSS}</style>
      <div className="mx-auto w-full max-w-6xl">

        {/* ---------- b-0-0 page title ---------- */}
        <header data-wf="b-0-0" className="mb-8">
          <h1
            className="text-[34px] sm:text-[40px] leading-[1.1]"
            style={{ fontFamily: brand.fontHeading, fontStyle: 'italic', color: INK }}
          >
            Admin console
          </h1>
          <p className="mt-3 text-[14px]" style={{ color: MUTED }}>
            sri vedha institute of technology · odd term 2026–27 · signed in as susan raya, admin / hod
          </p>
          <div className="mt-6 h-px w-full" style={{ backgroundColor: HAIR }} />
        </header>

        {/* ---------- b-1-0 tabs ---------- */}
        <div data-wf="b-1-0" className="mb-8">
          <div
            role="tablist"
            aria-label="Admin console sections"
            className="flex flex-wrap gap-2 rounded-full p-1.5"
            style={{ backgroundColor: SURFACE_2, border: `1px solid ${HAIR}`, width: 'fit-content', maxWidth: '100%' }}
          >
            {TABS.map((t, i) => {
              const on = tab === t.key;
              return (
                <button
                  key={t.key}
                  data-wf={t.wf}
                  ref={(el) => { tabRefs.current[i] = el; }}
                  id={`tab-${t.key}`}
                  role="tab"
                  type="button"
                  aria-selected={on}
                  aria-controls={`panel-${t.key}`}
                  tabIndex={on ? 0 : -1}
                  onClick={() => setTab(t.key)}
                  onKeyDown={(e) => onTabKey(e, i)}
                  className="rounded-full px-5 py-2.5 text-[14px] min-h-[44px] transition-colors duration-200"
                  style={{
                    backgroundColor: on ? INK : 'transparent',
                    color: on ? BG : INK,
                    fontWeight: on ? 700 : 500,
                  }}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= TERM DATA IMPORT ================= */}
        {tab === 'import' && (
          <div id="panel-import" role="tabpanel" aria-labelledby="tab-import" className="atr-fade space-y-8">

            {/* b-2-0 upload form */}
            <Panel data-wf="b-2-0" arch>
              <div className="mx-auto max-w-3xl pt-6">
                <Heading
                  id="h-upload"
                  hint="one spreadsheet at a time. rows are validated before anything is written — a file with bad rows is reported row by row, never half-imported."
                >
                  Upload term data (Excel or CSV)
                </Heading>

                <form onSubmit={startImport} className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <UI.Label htmlFor="import-type" style={labelStyle}>Import type</UI.Label>
                      <UI.Select
                        id="import-type"
                        data-wf="i-2-0-0"
                        value={importType}
                        onChange={(e) => setImportType(e.target.value)}
                        style={inputStyle}
                      >
                        <option value="students">Students</option>
                        <option value="courses">Courses</option>
                        <option value="timetables">Timetables</option>
                      </UI.Select>
                      <p className="mt-2 text-[12.5px]" style={{ color: MUTED }}>
                        {importType === 'students' && 'columns: roll_no, full_name, department, email'}
                        {importType === 'courses' && 'columns: code, name, department'}
                        {importType === 'timetables' && 'columns: course_code, section, scheduled_at, faculty_email'}
                      </p>
                    </div>

                    <div>
                      <UI.Label htmlFor="import-file" style={labelStyle}>File</UI.Label>
                      <UI.Input
                        id="import-file"
                        data-wf="i-2-0-1"
                        type="file"
                        accept=".csv,.xlsx"
                        className="atr-file"
                        aria-describedby="file-help"
                        onChange={(e) => {
                          const f = e.target.files && e.target.files[0];
                          setFileName(f ? f.name : '');
                          setFormError('');
                        }}
                        style={{ ...inputStyle, padding: '8px 10px', display: 'flex', alignItems: 'center' }}
                      />
                      <p id="file-help" className="mt-2 text-[12.5px]" style={{ color: MUTED }}>
                        {fileName ? `ready: ${fileName}` : '.csv or .xlsx, up to 5 mb'}
                      </p>
                    </div>
                  </div>

                  {formError ? <Note kind="error">{formError}</Note> : null}
                  {banner ? <Note kind={banner.kind}>{banner.text}</Note> : null}

                  {phase === 'uploading' && (
                    <div className="atr-fade rounded-[18px] px-4 py-4" style={{ backgroundColor: tint(INK, 0.07), border: `1px solid ${HAIR}` }} aria-live="polite">
                      <p className="text-[13.5px] font-semibold">reading {pending ? pending.file : 'file'} — validating rows before anything is written</p>
                      <div className="atr-bar mt-3 h-1.5 overflow-hidden rounded-full" style={{ backgroundColor: tint(INK, 0.12) }}>
                        <span style={{ backgroundColor: ACCENT_DEEP }} />
                      </div>
                    </div>
                  )}

                  {/* b-3-0 / b-3-1 */}
                  <div className="grid grid-cols-12 items-center gap-4 pt-2">
                    <div className="col-span-12 sm:col-span-6">
                      <PrimaryBtn
                        data-wf="b-3-0"
                        type="submit"
                        disabled={phase === 'uploading'}
                        className="w-full sm:w-auto"
                      >
                        <Icons.Upload className="h-4 w-4" aria-hidden="true" />
                        {phase === 'uploading' ? 'Importing…' : 'Start import'}
                      </PrimaryBtn>
                    </div>
                    <div className="col-span-12 sm:col-span-6 sm:text-right">
                      <LinkBtn
                        data-wf="b-3-1"
                        type="button"
                        onClick={() => { setBanner(null); setTemplateNote('template pack queued — students.xlsx, courses.xlsx and timetables.xlsx, with the required columns in row 1.'); }}
                      >
                        <Icons.Download className="h-4 w-4" aria-hidden="true" />
                        Download template files
                      </LinkBtn>
                    </div>
                  </div>
                  {templateNote ? <Note kind="ok">{templateNote}</Note> : null}
                </form>
              </div>
            </Panel>

            {/* b-4-0 import jobs */}
            <Panel data-wf="b-4-0">
              <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                <Heading id="h-jobs" hint="select a job to read its rejected rows below.">Import jobs</Heading>
                {inFlight && (
                  <p className="mb-6 flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[12.5px]" style={{ backgroundColor: tint(INK, 0.07), color: MUTED, border: `1px solid ${HAIR}` }}>
                    <span className="atr-dot inline-block h-2 w-2 rounded-full" style={{ backgroundColor: ACCENT_DEEP }} aria-hidden="true" />
                    live · last refreshed 10:04, polling every 30s
                  </p>
                )}
              </div>

              <div className="overflow-x-auto">
                <UI.Table className="w-full" style={{ fontVariantNumeric: 'tabular-nums', borderCollapse: 'collapse', minWidth: '820px' }}>
                  <UI.THead>
                    <UI.TR style={{ borderBottom: `1px solid ${HAIR}` }}>
                      <UI.TH data-wf="i-4-0-0" style={th}>Job</UI.TH>
                      <UI.TH data-wf="i-4-0-1" style={th}>Import type</UI.TH>
                      <UI.TH data-wf="i-4-0-2" style={th}>Status</UI.TH>
                      <UI.TH data-wf="i-4-0-3" style={{ ...th, textAlign: 'right' }}>Rows imported</UI.TH>
                      <UI.TH data-wf="i-4-0-4" style={{ ...th, textAlign: 'right' }}>Row errors</UI.TH>
                      <UI.TH data-wf="i-4-0-5" style={th}>Created at</UI.TH>
                    </UI.TR>
                  </UI.THead>
                  <UI.TBody>
                    {jobs.map((j) => {
                      const on = j.id === selectedJobId;
                      return (
                        <UI.TR
                          key={j.id}
                          className={j.fresh ? 'atr-rise' : ''}
                          style={{ borderBottom: `1px solid ${HAIR}`, backgroundColor: on ? tint(INK, 0.07) : 'transparent' }}
                        >
                          <UI.TD style={{ ...td, paddingLeft: on ? '12px' : '0', borderLeft: on ? `3px solid ${ACCENT_DEEP}` : '3px solid transparent' }}>
                            <button
                              type="button"
                              onClick={() => setSelectedJobId(j.id)}
                              aria-pressed={on}
                              className="rounded-full text-left transition-colors duration-200"
                              style={{ background: 'transparent', border: 'none', padding: '2px 0', color: INK }}
                            >
                              <span className="block text-[14px] font-bold underline underline-offset-4" style={{ textDecorationColor: tint(INK, 0.3) }}>{j.id}</span>
                              <span className="block text-[12.5px]" style={{ color: MUTED }}>{j.file}</span>
                            </button>
                          </UI.TD>
                          <UI.TD style={td}>{TYPE_LABEL[j.import_type]}</UI.TD>
                          <UI.TD style={td}><StatusChip status={j.status} /></UI.TD>
                          <UI.TD style={{ ...td, textAlign: 'right', fontWeight: 600 }}>{fmtNum(j.rows_imported)}</UI.TD>
                          <UI.TD style={{ ...td, textAlign: 'right', fontWeight: j.errors.length ? 700 : 400 }}>
                            {j.errors.length ? fmtNum(j.errors.length) : '0'}
                          </UI.TD>
                          <UI.TD style={{ ...td, color: MUTED, whiteSpace: 'nowrap' }}>
                            {j.created_at}
                            <span className="block text-[12px]">by {j.created_by}</span>
                          </UI.TD>
                        </UI.TR>
                      );
                    })}
                  </UI.TBody>
                </UI.Table>
              </div>
            </Panel>

            {/* b-5-0 row errors */}
            <Panel data-wf="b-5-0">
              <Heading
                id="h-rowerrors"
                hint={selectedJob.errors.length ? 'these rows were not written. fix them in the spreadsheet and re-upload, or add the records by hand under records.' : undefined}
              >
                {selectedJob.errors.length
                  ? `Row errors — ${selectedJob.file} (${fmtNum(selectedJob.errors.length)} of ${fmtNum(selectedJob.rows_total)} rows rejected)`
                  : `Row errors — ${selectedJob.file}`}
              </Heading>

              {selectedJob.errors.length === 0 ? (
                <UI.Empty
                  title={selectedJob.status === 'queued' || selectedJob.status === 'processing' ? 'Still reading this file' : 'No rejected rows'}
                  description={
                    selectedJob.status === 'queued' || selectedJob.status === 'processing'
                      ? `${selectedJob.file} is in the queue — row errors appear here the moment validation finishes.`
                      : `every one of ${fmtNum(selectedJob.rows_total)} rows in ${selectedJob.file} passed validation. nothing to fix.`
                  }
                  action={
                    <QuietBtn type="button" onClick={() => setTab('records')}>
                      Open records
                      <Icons.ChevronRight className="h-4 w-4" aria-hidden="true" />
                    </QuietBtn>
                  }
                />
              ) : (
                <div className="overflow-x-auto">
                  <UI.Table className="w-full" style={{ fontVariantNumeric: 'tabular-nums', borderCollapse: 'collapse', minWidth: '720px' }}>
                    <UI.THead>
                      <UI.TR style={{ borderBottom: `1px solid ${HAIR}` }}>
                        <UI.TH data-wf="i-5-0-0" style={{ ...th, textAlign: 'right', width: '90px' }}>Row</UI.TH>
                        <UI.TH data-wf="i-5-0-1" style={th}>Column</UI.TH>
                        <UI.TH data-wf="i-5-0-2" style={th}>Value</UI.TH>
                        <UI.TH data-wf="i-5-0-3" style={th}>Error</UI.TH>
                      </UI.TR>
                    </UI.THead>
                    <UI.TBody>
                      {selectedJob.errors.map((er) => (
                        <UI.TR key={`${selectedJob.id}-${er.row}`} style={{ borderBottom: `1px solid ${HAIR}` }}>
                          <UI.TD style={{ ...td, textAlign: 'right', fontWeight: 700 }}>{fmtNum(er.row)}</UI.TD>
                          <UI.TD style={{ ...td, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: '13px' }}>{er.column}</UI.TD>
                          <UI.TD style={{ ...td, color: MUTED }}>{er.value}</UI.TD>
                          <UI.TD style={td}>
                            <span className="inline-flex items-start gap-2">
                              <Icons.AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" style={{ color: ACCENT_DEEP }} />
                              {er.error}
                            </span>
                          </UI.TD>
                        </UI.TR>
                      ))}
                    </UI.TBody>
                  </UI.Table>
                </div>
              )}
            </Panel>
          </div>
        )}

        {/* ================= RECORDS ================= */}
        {tab === 'records' && (
          <div id="panel-records" role="tabpanel" aria-labelledby="tab-records" className="atr-fade space-y-8">

            {/* b-6-0 / b-6-1 / b-6-2 */}
            <div className="grid grid-cols-12 gap-4">
              {[
                { wf: 'b-6-0', type: 'student', label: 'Add student' },
                { wf: 'b-6-1', type: 'course', label: 'Add course' },
                { wf: 'b-6-2', type: 'timetable', label: 'Add timetable entry' },
              ].map((b) => {
                const on = addMode === b.type;
                return (
                  <div key={b.type} className="col-span-12 sm:col-span-4">
                    <UI.Button
                      data-wf={b.wf}
                      type="button"
                      aria-expanded={on}
                      onClick={() => (on ? setAddMode(null) : openAdd(b.type))}
                      className={`${PILL} w-full px-5 py-3.5 min-h-[48px]`}
                      style={{
                        backgroundColor: on ? INK : 'transparent',
                        color: on ? BG : INK,
                        border: `1px solid ${on ? INK : tint(INK, 0.28)}`,
                      }}
                    >
                      <Icons.Plus className="h-4 w-4" aria-hidden="true" />
                      {b.label}
                    </UI.Button>
                  </div>
                );
              })}
            </div>

            {/* b-7-0 records table (+ inline add form state) */}
            <Panel data-wf="b-7-0">
              <Heading
                id="h-records"
                hint="corrections made here are saved straight away and flow into rosters and attendance percentages — no need to re-upload a whole spreadsheet."
              >
                Students, courses and timetable records
              </Heading>

              {addMode && (
                <form
                  onSubmit={submitRecord}
                  className="atr-rise mb-8 rounded-[20px] px-5 py-6"
                  style={{ backgroundColor: tint(INK, 0.07), border: `1px solid ${HAIR}` }}
                >
                  <h3 className="mb-5 text-[18px]" style={{ fontFamily: brand.fontHeading, fontStyle: 'italic' }}>
                    New {RECORD_LABEL[addMode].toLowerCase()} record
                  </h3>
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                      <UI.Label htmlFor="rec-key" style={labelStyle}>{addMode === 'student' ? 'Roll no' : 'Course code'}</UI.Label>
                      <UI.Input id="rec-key" value={draft.key} onChange={(e) => setDraft({ ...draft, key: e.target.value })} placeholder={addMode === 'student' ? '22CS118' : 'CS3401'} style={inputStyle} />
                    </div>
                    <div>
                      <UI.Label htmlFor="rec-name" style={labelStyle}>{addMode === 'student' ? 'Full name' : 'Name'}</UI.Label>
                      <UI.Input id="rec-name" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder={addMode === 'student' ? 'Nikhil Varma' : 'Compiler Design — Section A'} style={inputStyle} />
                    </div>
                    <div>
                      <UI.Label htmlFor="rec-dept" style={labelStyle}>Department</UI.Label>
                      <UI.Select id="rec-dept" value={draft.dept} onChange={(e) => setDraft({ ...draft, dept: e.target.value })} style={inputStyle}>
                        <option>Computer Science</option>
                        <option>Electronics</option>
                        <option>Mechanical</option>
                        <option>Civil</option>
                      </UI.Select>
                    </div>
                    {addMode === 'timetable' && (
                      <div>
                        <UI.Label htmlFor="rec-when" style={labelStyle}>Scheduled at</UI.Label>
                        <UI.Input id="rec-when" value={draft.when} onChange={(e) => setDraft({ ...draft, when: e.target.value })} placeholder="Wed 04 Nov 2026, 09:00" style={inputStyle} />
                      </div>
                    )}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <PrimaryBtn type="submit">Save record</PrimaryBtn>
                    <QuietBtn type="button" onClick={() => setAddMode(null)}>Cancel</QuietBtn>
                  </div>
                </form>
              )}

              {recordNote ? <div className="mb-6"><Note kind={recordNote.kind}>{recordNote.text}</Note></div> : null}

              <div className="overflow-x-auto">
                <UI.Table className="w-full" style={{ fontVariantNumeric: 'tabular-nums', borderCollapse: 'collapse', minWidth: '880px' }}>
                  <UI.THead>
                    <UI.TR style={{ borderBottom: `1px solid ${HAIR}` }}>
                      <UI.TH data-wf="i-7-0-0" style={th}>Record type</UI.TH>
                      <UI.TH data-wf="i-7-0-1" style={th}>Roll no / Course code</UI.TH>
                      <UI.TH data-wf="i-7-0-2" style={th}>Name</UI.TH>
                      <UI.TH data-wf="i-7-0-3" style={th}>Department</UI.TH>
                      <UI.TH data-wf="i-7-0-4" style={th}>Scheduled at</UI.TH>
                      <UI.TH data-wf="i-7-0-5" style={{ ...th, textAlign: 'right' }}>Edit</UI.TH>
                    </UI.TR>
                  </UI.THead>
                  <UI.TBody>
                    {records.map((r) => {
                      const editing = editingId === r.id;
                      return (
                        <UI.TR key={r.id} className={newIds.includes(r.id) ? 'atr-rise' : ''} style={{ borderBottom: `1px solid ${HAIR}`, backgroundColor: editing ? tint(INK, 0.07) : 'transparent' }}>
                          <UI.TD style={td}>
                            <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12.5px] font-semibold" style={{ backgroundColor: tint(INK, 0.09) }}>
                              {r.type === 'student' && <Icons.User className="h-3.5 w-3.5" aria-hidden="true" />}
                              {r.type === 'course' && <Icons.FileText className="h-3.5 w-3.5" aria-hidden="true" />}
                              {r.type === 'timetable' && <Icons.Calendar className="h-3.5 w-3.5" aria-hidden="true" />}
                              {RECORD_LABEL[r.type]}
                            </span>
                          </UI.TD>
                          <UI.TD style={{ ...td, fontWeight: 700 }}>{r.key}</UI.TD>
                          <UI.TD style={td}>
                            {editing ? (
                              <>
                                <UI.Label htmlFor={`e-name-${r.id}`} className="sr-only">Name for {r.key}</UI.Label>
                                <UI.Input id={`e-name-${r.id}`} value={editDraft.name} onChange={(e) => setEditDraft({ ...editDraft, name: e.target.value })} style={{ ...inputStyle, minWidth: '220px' }} />
                              </>
                            ) : r.name}
                          </UI.TD>
                          <UI.TD style={{ ...td, color: editing ? INK : MUTED }}>
                            {editing ? (
                              <>
                                <UI.Label htmlFor={`e-dept-${r.id}`} className="sr-only">Department for {r.key}</UI.Label>
                                <UI.Select id={`e-dept-${r.id}`} value={editDraft.dept} onChange={(e) => setEditDraft({ ...editDraft, dept: e.target.value })} style={{ ...inputStyle, minWidth: '190px' }}>
                                  <option>Computer Science</option>
                                  <option>Electronics</option>
                                  <option>Mechanical</option>
                                  <option>Civil</option>
                                </UI.Select>
                              </>
                            ) : r.dept}
                          </UI.TD>
                          <UI.TD style={{ ...td, color: MUTED, whiteSpace: 'nowrap' }}>
                            {r.type === 'timetable' ? (
                              editing ? (
                                <>
                                  <UI.Label htmlFor={`e-when-${r.id}`} className="sr-only">Scheduled at for {r.key}</UI.Label>
                                  <UI.Input id={`e-when-${r.id}`} value={editDraft.when} onChange={(e) => setEditDraft({ ...editDraft, when: e.target.value })} style={{ ...inputStyle, minWidth: '200px' }} />
                                </>
                              ) : r.when
                            ) : (
                              <>
                                <span aria-hidden="true">—</span>
                                <span className="sr-only">not applicable</span>
                              </>
                            )}
                          </UI.TD>
                          <UI.TD style={{ ...td, textAlign: 'right', whiteSpace: 'nowrap' }}>
                            {editing ? (
                              <span className="inline-flex gap-2">
                                <PrimaryBtn data-wf="i-7-0-5" type="button" className="px-4 py-2" onClick={() => saveEdit(r.id)}>Save</PrimaryBtn>
                                <QuietBtn type="button" className="px-4 py-2" onClick={() => setEditingId(null)}>Cancel</QuietBtn>
                              </span>
                            ) : (
                              <QuietBtn data-wf="i-7-0-5" type="button" className="px-4 py-2" onClick={() => startEdit(r)}>
                                <Icons.Edit className="h-4 w-4" aria-hidden="true" />
                                <span>Edit<span className="sr-only"> {r.key} {r.name}</span></span>
                              </QuietBtn>
                            )}
                          </UI.TD>
                        </UI.TR>
                      );
                    })}
                  </UI.TBody>
                </UI.Table>
              </div>
            </Panel>
          </div>
        )}

        {/* ================= CONFIGURATION ================= */}
        {tab === 'config' && (
          <div id="panel-config" role="tabpanel" aria-labelledby="tab-config" className="atr-fade">
            <form onSubmit={saveThreshold} className="grid grid-cols-12 items-start gap-6">
              {/* b-8-0 */}
              <div className="col-span-12 lg:col-span-8">
                <Panel data-wf="b-8-0" arch>
                  <div className="mx-auto max-w-2xl pt-6">
                    <Heading
                      id="h-config"
                      hint="students below this figure in a course are flagged short on the faculty dashboard and in their own attendance view. when nothing is configured the system falls back to 75%."
                    >
                      Attendance configuration
                    </Heading>

                    <div className="max-w-xs">
                      <UI.Label htmlFor="threshold" style={labelStyle}>Minimum attendance threshold % (default 75)</UI.Label>
                      <UI.Input
                        id="threshold"
                        data-wf="i-8-0-0"
                        type="number"
                        min="1"
                        max="100"
                        step="1"
                        inputMode="numeric"
                        value={thresholdInput}
                        onChange={(e) => { setThresholdInput(e.target.value); setCfgError(''); setCfgSaved(null); }}
                        aria-describedby="threshold-help"
                        aria-invalid={cfgError ? 'true' : 'false'}
                        style={{ ...inputStyle, fontVariantNumeric: 'tabular-nums', fontSize: '20px', fontWeight: 700, textAlign: 'center' }}
                      />
                      <p id="threshold-help" className="mt-2 text-[12.5px]" style={{ color: MUTED }}>
                        whole numbers, 1–100
                      </p>
                    </div>

                    <div className="mt-8" aria-hidden="true">
                      <div className="relative h-3 rounded-full" style={{ backgroundColor: tint(INK, 0.1) }}>
                        <div
                          className="h-3 rounded-full transition-all duration-500"
                          style={{ width: `${threshold}%`, backgroundColor: ACCENT_DEEP }}
                        />
                        <span className="absolute top-[-4px] h-5 w-px" style={{ left: '75%', backgroundColor: tint(INK, 0.5) }} />
                      </div>
                      <div className="mt-2 flex justify-between text-[12px]" style={{ color: MUTED, fontVariantNumeric: 'tabular-nums' }}>
                        <span>0%</span>
                        <span>default 75%</span>
                        <span>100%</span>
                      </div>
                    </div>
                    <p className="mt-3 text-[13.5px]" style={{ color: INK, fontVariantNumeric: 'tabular-nums' }}>
                      in force: <strong>{threshold}%</strong> · last changed {cfgMeta.at} by {cfgMeta.by}
                    </p>

                    {cfgError ? <Note kind="error">{cfgError}</Note> : null}
                    {cfgSaved ? <Note kind="ok">{cfgSaved}</Note> : null}

                    <p className="mt-6 flex items-start gap-2 text-[13px]" style={{ color: MUTED, maxWidth: '62ch' }}>
                      <Icons.AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                      only admins and hods can change this value. faculty and students see the threshold, they cannot edit it.
                    </p>
                  </div>
                </Panel>
              </div>

              {/* b-8-1 */}
              <div className="col-span-12 lg:col-span-4 lg:pt-10">
                <PrimaryBtn data-wf="b-8-1" type="submit" className="w-full px-6 py-4">
                  <Icons.Check className="h-4 w-4" aria-hidden="true" />
                  Save threshold
                </PrimaryBtn>
                <p className="mt-3 px-2 text-[12.5px]" style={{ color: MUTED }}>
                  saving writes a config.threshold.updated entry to the ict audit log.
                </p>
              </div>
            </form>
          </div>
        )}

        {/* ================= AUDIT LOGS ================= */}
        {tab === 'audit' && (
          <div id="panel-audit" role="tabpanel" aria-labelledby="tab-audit" className="atr-fade space-y-8">

            {/* b-9-0 attendance change audit */}
            <Panel data-wf="b-9-0">
              <Heading
                id="h-attaudit"
                hint="every correction a faculty member makes to a marked roster, with the value before and after. admins and hods can read these entries; no role can edit or delete them."
              >
                Attendance change audit (read-only)
              </Heading>

              <div className="overflow-x-auto">
                <UI.Table className="w-full" style={{ fontVariantNumeric: 'tabular-nums', borderCollapse: 'collapse', minWidth: '900px' }}>
                  <UI.THead>
                    <UI.TR style={{ borderBottom: `1px solid ${HAIR}` }}>
                      <UI.TH data-wf="i-9-0-0" style={th}>Changed at</UI.TH>
                      <UI.TH data-wf="i-9-0-1" style={th}>Actor</UI.TH>
                      <UI.TH data-wf="i-9-0-2" style={th}>Student</UI.TH>
                      <UI.TH data-wf="i-9-0-3" style={th}>Session</UI.TH>
                      <UI.TH data-wf="i-9-0-4" style={th}>Old status</UI.TH>
                      <UI.TH data-wf="i-9-0-5" style={th}>New status</UI.TH>
                    </UI.TR>
                  </UI.THead>
                  <UI.TBody>
                    {SEED_ATT_AUDIT.map((a) => (
                      <UI.TR key={a.id} style={{ borderBottom: `1px solid ${HAIR}` }}>
                        <UI.TD style={{ ...td, whiteSpace: 'nowrap', color: MUTED }}>{a.at}</UI.TD>
                        <UI.TD style={td}>
                          <span className="inline-flex items-center gap-2">
                            <UI.Avatar name={a.actor} className="h-7 w-7" />
                            {a.actor}
                          </span>
                        </UI.TD>
                        <UI.TD style={td}>{a.student}</UI.TD>
                        <UI.TD style={{ ...td, color: MUTED, whiteSpace: 'nowrap' }}>{a.session}</UI.TD>
                        <UI.TD style={td}><MarkChip value={a.old} /></UI.TD>
                        <UI.TD style={td}><MarkChip value={a.next} /></UI.TD>
                      </UI.TR>
                    ))}
                  </UI.TBody>
                </UI.Table>
              </div>
            </Panel>

            {/* b-10-0 ICT audit log */}
            <Panel data-wf="b-10-0">
              <Heading
                id="h-ict"
                hint="security and data events, append-only, kept for 180 days — the oldest entry held right now is from 02 may 2026."
              >
                ICT audit log — retained 180 days
              </Heading>

              <div className="overflow-x-auto">
                <UI.Table className="w-full" style={{ fontVariantNumeric: 'tabular-nums', borderCollapse: 'collapse', minWidth: '900px' }}>
                  <UI.THead>
                    <UI.TR style={{ borderBottom: `1px solid ${HAIR}` }}>
                      <UI.TH data-wf="i-10-0-0" style={th}>Created at</UI.TH>
                      <UI.TH data-wf="i-10-0-1" style={th}>Actor</UI.TH>
                      <UI.TH data-wf="i-10-0-2" style={th}>Action</UI.TH>
                      <UI.TH data-wf="i-10-0-3" style={th}>Entity</UI.TH>
                      <UI.TH data-wf="i-10-0-4" style={th}>Detail</UI.TH>
                    </UI.TR>
                  </UI.THead>
                  <UI.TBody>
                    {SEED_ICT.map((l, i) => (
                      <UI.TR key={`${l.at}-${i}`} style={{ borderBottom: `1px solid ${HAIR}` }}>
                        <UI.TD style={{ ...td, whiteSpace: 'nowrap', color: MUTED }}>{l.at}</UI.TD>
                        <UI.TD style={td}>{l.actor}</UI.TD>
                        <UI.TD style={{ ...td, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: '13px', fontWeight: 600 }}>{l.action}</UI.TD>
                        <UI.TD style={{ ...td, color: MUTED }}>{l.entity}</UI.TD>
                        <UI.TD style={td}>{l.detail}</UI.TD>
                      </UI.TR>
                    ))}
                  </UI.TBody>
                </UI.Table>
              </div>
            </Panel>
          </div>
        )}

        {/* ---------- row 12 ---------- */}
        <div className="mt-12 h-px w-full" style={{ backgroundColor: HAIR }} />
        <footer className="grid grid-cols-12 items-center gap-6 pt-6 pb-2">
          <p
            data-wf="b-11-0"
            className="col-span-12 lg:col-span-8 text-[13.5px] leading-relaxed"
            style={{ color: MUTED, maxWidth: '70ch' }}
          >
            All student and attendance data is persisted on infrastructure located within India. Audit entries cannot be edited or deleted.
          </p>
          <div className="col-span-12 lg:col-span-4 lg:text-right">
            <LinkBtn data-wf="b-11-1" type="button" onClick={() => navigate('reports')}>
              Open attendance reports
              <Icons.ArrowRight className="h-4 w-4" aria-hidden="true" />
            </LinkBtn>
          </div>
        </footer>
      </div>
    </div>
  );
}
