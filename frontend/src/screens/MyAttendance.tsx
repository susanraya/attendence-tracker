// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Button, Table, THead, TBody, TR, TH, TD, Empty } = UI;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Download } = Icons;

const THRESHOLD = 75;

const COURSES = [
  { id: "c-ma201", code: "MA201", name: "Linear Algebra", faculty: "Dr. R. Venkatesan", present: 15, held: 22 },
  { id: "c-cs410", code: "CS410", name: "Computer Networks", faculty: "Prof. Anita Deshmukh", present: 24, held: 28 },
  { id: "c-cs412", code: "CS412", name: "Operating Systems", faculty: "Dr. S. Balakrishnan", present: 20, held: 26 },
  { id: "c-cs414", code: "CS414", name: "Machine Learning Lab", faculty: "Prof. Meera Iyer", present: 11, held: 12 },
  { id: "c-cs418", code: "CS418", name: "Cloud Computing", faculty: "Dr. Faisal Rahman", present: 15, held: 20 },
  { id: "c-hs301", code: "HS301", name: "Professional Ethics", faculty: "Dr. Kavitha Menon", present: 13, held: 17 },
  { id: "c-cs420", code: "CS420", name: "Minor Project", faculty: "Prof. Anita Deshmukh", present: 0, held: 0 },
];

const ALERTS = [
  {
    id: "n-1041",
    code: "MA201",
    name: "Linear Algebra",
    percentage: 68.2,
    date: "27 Oct 2026",
    email_status: "sent",
    read: false,
    detail:
      "sent to priya.nair@quorq.ai at 6:10 pm. you have missed 7 of 22 held sessions — attending the next 6 in a row brings you back above 75%.",
  },
  {
    id: "n-1022",
    code: "CS412",
    name: "Operating Systems",
    percentage: 74.1,
    date: "19 Oct 2026",
    email_status: "pending",
    read: true,
    detail:
      "the mail service has not confirmed delivery yet, so this alert is being retried. your attendance in this course has since recovered to 76.9%.",
  },
];

const COLUMNS = [
  { key: "code", label: "Course code", wf: "i-2-0-0", align: "left" },
  { key: "name", label: "Course name", wf: "i-2-0-1", align: "left" },
  { key: "present", label: "Sessions present", wf: "i-2-0-2", align: "right" },
  { key: "held", label: "Sessions held", wf: "i-2-0-3", align: "right" },
  { key: "percentage", label: "Percentage", wf: "i-2-0-4", align: "right" },
  { key: "below", label: "Below threshold", wf: "i-2-0-5", align: "left" },
];

function hexToRgb(hex) {
  const h = String(hex || "").replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(full, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function tint(hex, alpha) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function Screen() {
  const navigate = useNavigate();
  const ink = brand.primaryColor;
  const accent = brand.accentColor;
  const canvas = brand.backgroundColor;

  const inkMuted = tint(ink, 0.72);
  const inkFaint = tint(ink, 0.55);
  const hairline = `1px solid ${tint(ink, 0.13)}`;
  const panel = "rgba(255,255,255,0.62)";

  const [sort, setSort] = React.useState({ key: "percentage", dir: "asc" });
  const [alerts, setAlerts] = React.useState(ALERTS);
  const [openAlert, setOpenAlert] = React.useState("n-1041");
  const [consent, setConsent] = React.useState({ state: "given", at: "12 Jul 2026" });
  const [announce, setAnnounce] = React.useState("");

  const withdrawRef = React.useRef(null);

  const rows = React.useMemo(() => {
    return COURSES.map((c) => ({
      ...c,
      percentage: c.held > 0 ? Math.round((c.present / c.held) * 1000) / 10 : null,
      below: c.held > 0 ? (c.present / c.held) * 100 < THRESHOLD : false,
    }));
  }, []);

  const totals = rows.reduce(
    (acc, r) => ({ present: acc.present + r.present, held: acc.held + r.held }),
    { present: 0, held: 0 }
  );
  const overall = totals.held > 0 ? (totals.present / totals.held) * 100 : 0;
  const belowCount = rows.filter((r) => r.below).length;
  const flagged = rows.filter((r) => r.below);
  const unread = alerts.filter((a) => !a.read).length;

  const sorted = React.useMemo(() => {
    const dir = sort.dir === "asc" ? 1 : -1;
    const list = [...rows];
    list.sort((a, b) => {
      if (sort.key === "percentage") {
        if (a.percentage === null && b.percentage === null) return 0;
        if (a.percentage === null) return 1;
        if (b.percentage === null) return -1;
        return (a.percentage - b.percentage) * dir;
      }
      if (sort.key === "below") {
        return ((a.below ? 0 : 1) - (b.below ? 0 : 1)) * dir;
      }
      if (sort.key === "present" || sort.key === "held") {
        return (a[sort.key] - b[sort.key]) * dir;
      }
      return String(a[sort.key]).localeCompare(String(b[sort.key])) * dir;
    });
    return list;
  }, [rows, sort]);

  React.useEffect(() => {
    if (consent.state !== "withdrawing") return;
    const t = setTimeout(() => {
      setConsent({ state: "withdrawn", at: "29 Oct 2026, 4:12 pm" });
      setAnnounce("consent withdrawn. the withdrawal was recorded on 29 Oct 2026 at 4:12 pm.");
    }, 700);
    return () => clearTimeout(t);
  }, [consent.state]);

  function toggleSort(key) {
    setSort((s) => (s.key === key ? { key, dir: s.dir === "asc" ? "desc" : "asc" } : { key, dir: key === "name" || key === "code" ? "asc" : "desc" }));
  }

  function openAlertItem(id) {
    setOpenAlert((cur) => (cur === id ? null : id));
    setAlerts((list) => list.map((a) => (a.id === id ? { ...a, read: true } : a)));
  }

  const focusCls =
    "focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors duration-200";

  const archPanel = (archRadius) => ({
    background: panel,
    border: hairline,
    borderTopLeftRadius: archRadius,
    borderTopRightRadius: archRadius,
    borderBottomLeftRadius: brand.radius,
    borderBottomRightRadius: brand.radius,
  });

  const gaugeR = 56;
  const gaugeLen = Math.PI * gaugeR;

  return (
    <div
      className="min-h-full w-full px-5 py-10 sm:px-8 lg:px-12"
      style={{ backgroundColor: canvas, color: ink, fontFamily: brand.fontBody }}
    >
      <style>{`
        @keyframes atrium-rise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes atrium-fade { from { opacity: 0; } to { opacity: 1; } }
        .atrium-rise { animation: atrium-rise 420ms cubic-bezier(.22,.61,.36,1) both; }
        .atrium-fade { animation: atrium-fade 260ms ease both; }
        @media (prefers-reduced-motion: reduce) {
          .atrium-rise, .atrium-fade { animation: none !important; }
          .atrium-arc { transition: none !important; }
        }
      `}</style>

      <div className="mx-auto w-full max-w-6xl">
        <p aria-live="polite" className="sr-only">{announce}</p>

        {/* Row 1 — page title */}
        <header data-wf="b-0-0" className="grid grid-cols-12 gap-6">
          <div className="col-span-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p
                className="text-xs uppercase tracking-[0.18em]"
                style={{ color: inkFaint }}
              >
                student view · odd semester 2026–27 · b.tech computer science
              </p>
              <h1
                className="mt-3 text-[32px] leading-tight sm:text-[40px]"
                style={{ fontFamily: brand.fontHeading, fontStyle: "italic", color: ink }}
              >
                My attendance — 22BCS014 Priya Nair
              </h1>
              <p className="mt-3 max-w-[62ch] text-[15px] leading-relaxed" style={{ color: inkMuted }}>
                only your own records are shown here — other students&rsquo; attendance is never visible to you.
              </p>
            </div>
            <div
              className="flex shrink-0 items-center gap-2 self-start rounded-full px-4 py-2 text-[13px] sm:self-end"
              style={{ backgroundColor: tint(ink, 0.07), color: inkMuted }}
            >
              <Icons.Clock className="h-4 w-4" aria-hidden="true" />
              <span style={{ fontVariantNumeric: "tabular-nums" }}>recomputed 10:42 am · 29 Oct 2026</span>
            </div>
          </div>
        </header>

        {/* Row 2 — summary cards */}
        <div className="mt-10 grid grid-cols-12 gap-6">
          <section
            data-wf="b-1-0"
            aria-labelledby="overall-heading"
            className="atrium-rise col-span-12 md:col-span-6"
            style={archPanel("160px")}
          >
            <div className="flex flex-col items-center gap-6 px-8 pb-8 pt-10 sm:flex-row sm:items-center sm:gap-8">
              <svg width="136" height="82" viewBox="0 0 136 82" role="img" aria-label={`Overall attendance ${overall.toFixed(1)} percent of the 75 percent minimum`}>
                <path d="M 12 70 A 56 56 0 0 1 124 70" fill="none" stroke={tint(ink, 0.12)} strokeWidth="11" strokeLinecap="round" />
                <path
                  className="atrium-arc"
                  d="M 12 70 A 56 56 0 0 1 124 70"
                  fill="none"
                  stroke={accent}
                  strokeWidth="11"
                  strokeLinecap="round"
                  strokeDasharray={gaugeLen}
                  strokeDashoffset={gaugeLen * (1 - overall / 100)}
                  style={{ transition: "stroke-dashoffset 900ms cubic-bezier(.22,.61,.36,1)" }}
                />
                <line x1={68 + gaugeR * Math.cos(Math.PI * (1 - THRESHOLD / 100)) * 0.78} y1={70 - gaugeR * Math.sin(Math.PI * (1 - THRESHOLD / 100)) * 0.78} x2={68 + gaugeR * Math.cos(Math.PI * (1 - THRESHOLD / 100)) * 1.2} y2={70 - gaugeR * Math.sin(Math.PI * (1 - THRESHOLD / 100)) * 1.2} stroke={ink} strokeWidth="2" strokeLinecap="round" />
              </svg>
              <div className="text-center sm:text-left">
                <h2
                  id="overall-heading"
                  className="text-[13px] uppercase tracking-[0.16em]"
                  style={{ color: inkFaint }}
                >
                  Overall attendance
                </h2>
                <p
                  className="mt-1 text-[44px] leading-none"
                  style={{ fontFamily: brand.fontHeading, fontStyle: "italic", fontVariantNumeric: "tabular-nums" }}
                >
                  {overall.toFixed(1)}%
                </p>
                <p className="mt-3 text-[14px] leading-relaxed" style={{ color: inkMuted, fontVariantNumeric: "tabular-nums" }}>
                  {totals.present} of {totals.held} held sessions attended · the notch marks the 75% minimum
                </p>
              </div>
            </div>
          </section>

          <section
            data-wf="b-1-1"
            aria-labelledby="below-heading"
            className="atrium-rise col-span-12 md:col-span-6"
            style={{ ...archPanel("160px"), background: tint(ink, 0.06), animationDelay: "70ms" }}
          >
            <div className="px-8 pb-8 pt-10">
              <h2 id="below-heading" className="text-[13px] uppercase tracking-[0.16em]" style={{ color: inkFaint }}>
                Courses below 75%
              </h2>
              <div className="mt-1 flex items-baseline gap-3">
                <p
                  className="text-[44px] leading-none"
                  style={{ fontFamily: brand.fontHeading, fontStyle: "italic", fontVariantNumeric: "tabular-nums" }}
                >
                  {belowCount}
                </p>
                <span className="text-[14px]" style={{ color: inkMuted }}>
                  of {rows.length} enrolled
                </span>
              </div>
              <ul className="mt-5 space-y-2">
                {flagged.map((f) => (
                  <li key={f.id} className="flex items-start gap-2 text-[14px] leading-relaxed" style={{ color: ink }}>
                    <Icons.AlertCircle className="mt-[3px] h-4 w-4 shrink-0" aria-hidden="true" style={{ color: accent }} />
                    <span style={{ fontVariantNumeric: "tabular-nums" }}>
                      {f.code} {f.name} — {f.percentage.toFixed(1)}%, {f.held - f.present} of {f.held} sessions missed
                    </span>
                  </li>
                ))}
                {flagged.length === 0 && (
                  <li className="flex items-start gap-2 text-[14px]" style={{ color: inkMuted }}>
                    <Icons.CheckCircle className="mt-[3px] h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>every course is at or above the 75% minimum.</span>
                  </li>
                )}
              </ul>
            </div>
          </section>
        </div>

        {/* Row 3 — attendance by course */}
        <section data-wf="b-2-0" aria-labelledby="by-course-heading" className="mt-12">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2
              id="by-course-heading"
              className="text-[24px]"
              style={{ fontFamily: brand.fontHeading, fontStyle: "italic" }}
            >
              Attendance by course
            </h2>
            <p className="text-[13px]" style={{ color: inkFaint }}>
              percentage = sessions present ÷ sessions held, to one decimal
            </p>
          </div>

          <div
            className="mt-5 overflow-hidden"
            style={{ background: panel, border: hairline, borderRadius: brand.radius }}
          >
            <div className="overflow-x-auto">
              <Table className="w-full min-w-[720px] text-[15px]" style={{ fontVariantNumeric: "tabular-nums" }}>
                <THead>
                  <TR style={{ borderBottom: hairline }}>
                    {COLUMNS.map((col) => {
                      const active = sort.key === col.key;
                      return (
                        <TH
                          key={col.key}
                          data-wf={col.wf}
                          scope="col"
                          aria-sort={active ? (sort.dir === "asc" ? "ascending" : "descending") : "none"}
                          className={col.align === "right" ? "px-5 py-4 text-right" : "px-5 py-4 text-left"}
                          style={{ background: tint(ink, 0.05), border: "none" }}
                        >
                          <button
                            type="button"
                            onClick={() => toggleSort(col.key)}
                            className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[12px] uppercase tracking-[0.14em] ${focusCls}`}
                            style={{ color: active ? ink : inkFaint, outlineColor: ink, fontWeight: active ? 600 : 500 }}
                          >
                            <span>{col.label}</span>
                            <Icons.ChevronDown
                              className="h-3.5 w-3.5"
                              aria-hidden="true"
                              style={{
                                opacity: active ? 1 : 0.35,
                                transform: active && sort.dir === "asc" ? "rotate(180deg)" : "rotate(0deg)",
                                transition: "transform 200ms ease",
                              }}
                            />
                            <span className="sr-only">
                              {active ? `sorted ${sort.dir === "asc" ? "ascending" : "descending"}, activate to reverse` : "activate to sort"}
                            </span>
                          </button>
                        </TH>
                      );
                    })}
                  </TR>
                </THead>
                <TBody>
                  {sorted.map((r, i) => (
                    <TR
                      key={r.id}
                      className="atrium-fade"
                      style={{
                        borderBottom: i === sorted.length - 1 ? "none" : hairline,
                        background: r.below ? tint(accent, 0.09) : "transparent",
                      }}
                    >
                      <TD className="px-5 py-5 font-semibold" style={{ border: "none", letterSpacing: "0.04em" }}>
                        {r.code}
                      </TD>
                      <TD className="px-5 py-5" style={{ border: "none" }}>
                        <span className="block">{r.name}</span>
                        <span className="mt-0.5 block text-[13px]" style={{ color: inkFaint }}>
                          {r.faculty}
                        </span>
                      </TD>
                      <TD className="px-5 py-5 text-right" style={{ border: "none" }}>
                        {r.held > 0 ? r.present : "—"}
                      </TD>
                      <TD className="px-5 py-5 text-right" style={{ border: "none" }}>
                        {r.held > 0 ? r.held : "—"}
                      </TD>
                      <TD className="px-5 py-5 text-right" style={{ border: "none" }}>
                        {r.percentage === null ? (
                          <span style={{ color: inkFaint }}>not computed</span>
                        ) : (
                          <span className="text-[17px]" style={{ fontWeight: r.below ? 600 : 500 }}>
                            {r.percentage.toFixed(1)}%
                          </span>
                        )}
                      </TD>
                      <TD className="px-5 py-5" style={{ border: "none" }}>
                        {r.percentage === null ? (
                          <span
                            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[13px]"
                            style={{ background: tint(ink, 0.06), color: inkMuted }}
                          >
                            <Icons.Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                            no sessions held yet
                          </span>
                        ) : r.below ? (
                          <span
                            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[13px] font-semibold"
                            style={{ background: tint(accent, 0.22), color: ink }}
                          >
                            <Icons.AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                            yes — below 75%
                          </span>
                        ) : (
                          <span
                            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[13px]"
                            style={{ background: tint(ink, 0.07), color: inkMuted }}
                          >
                            <Icons.Check className="h-3.5 w-3.5" aria-hidden="true" />
                            no — on track
                          </span>
                        )}
                      </TD>
                    </TR>
                  ))}
                </TBody>
              </Table>
            </div>
            {sorted.length === 0 && (
              <div className="px-6 py-10">
                <Empty
                  title="No enrolments yet for this term"
                  description="your courses appear here once the department uploads the term timetable. ask your class advisor if this looks wrong after registration week."
                />
              </div>
            )}
          </div>
        </section>

        {/* Row 4 — shortage alerts */}
        <section data-wf="b-3-0" aria-labelledby="alerts-heading" className="mt-12">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2
              id="alerts-heading"
              className="text-[24px]"
              style={{ fontFamily: brand.fontHeading, fontStyle: "italic" }}
            >
              Shortage alerts
            </h2>
            <p className="text-[13px]" style={{ color: inkFaint, fontVariantNumeric: "tabular-nums" }}>
              {alerts.length} alerts · {unread} unread
            </p>
          </div>

          {alerts.length === 0 ? (
            <div className="mt-5" style={{ background: panel, border: hairline, borderRadius: brand.radius }}>
              <div className="px-6 py-10">
                <Empty
                  title="No shortage alerts"
                  description="you are at or above 75% in every course. if one slips below, an alert lands here and in your inbox the same evening."
                />
              </div>
            </div>
          ) : (
            <ul className="mt-5 space-y-4">
              {alerts.map((a, idx) => {
                const open = openAlert === a.id;
                return (
                  <li
                    key={a.id}
                    className="atrium-rise overflow-hidden"
                    style={{
                      background: panel,
                      border: hairline,
                      borderRadius: brand.radius,
                      animationDelay: `${idx * 60}ms`,
                    }}
                  >
                    <button
                      type="button"
                      data-wf={idx === 0 ? "i-3-0-0" : "i-3-0-1"}
                      onClick={() => openAlertItem(a.id)}
                      aria-expanded={open}
                      aria-controls={`alert-detail-${a.id}`}
                      className={`flex w-full items-start gap-4 px-6 py-5 text-left hover:bg-black/[0.03] ${focusCls}`}
                      style={{ outlineColor: ink }}
                    >
                      <span
                        className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                        style={{ background: a.read ? tint(ink, 0.08) : tint(accent, 0.2) }}
                      >
                        <Icons.Bell className="h-5 w-5" aria-hidden="true" style={{ color: ink }} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[16px] leading-snug" style={{ fontVariantNumeric: "tabular-nums" }}>
                          <strong className="font-semibold">{a.code} {a.name}</strong> — attendance {a.percentage.toFixed(1)}%, below the 75% threshold
                        </span>
                        <span className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px]" style={{ color: inkMuted }}>
                          <span style={{ fontVariantNumeric: "tabular-nums" }}>{a.date}</span>
                          <span aria-hidden="true" style={{ color: tint(ink, 0.3) }}>·</span>
                          <span
                            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1"
                            style={{
                              background: a.email_status === "sent" ? tint(ink, 0.07) : tint(accent, 0.18),
                              color: ink,
                            }}
                          >
                            {a.email_status === "sent" ? (
                              <Icons.CheckCircle className="h-3.5 w-3.5" aria-hidden="true" />
                            ) : (
                              <Icons.Clock className="h-3.5 w-3.5" aria-hidden="true" />
                            )}
                            {a.email_status === "sent" ? "Email sent" : "Email pending"}
                          </span>
                          {!a.read && (
                            <span
                              className="inline-flex items-center rounded-full px-2.5 py-1 text-[12px] font-semibold uppercase tracking-[0.12em]"
                              style={{ background: ink, color: canvas }}
                            >
                              unread
                            </span>
                          )}
                        </span>
                      </span>
                      <Icons.ChevronDown
                        className="mt-2 h-5 w-5 shrink-0"
                        aria-hidden="true"
                        style={{
                          color: inkFaint,
                          transform: open ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform 220ms ease",
                        }}
                      />
                    </button>
                    {open && (
                      <div
                        id={`alert-detail-${a.id}`}
                        className="atrium-fade px-6 pb-6 pl-[88px]"
                      >
                        <div style={{ borderTop: hairline }} className="pt-4">
                          <p className="max-w-[68ch] text-[14px] leading-relaxed" style={{ color: inkMuted }}>
                            {a.detail}
                          </p>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        {/* Row 5–7 — privacy and consent */}
        <section
          data-wf="b-4-0"
          aria-labelledby="privacy-heading"
          className="mt-12"
          style={archPanel("220px")}
        >
          <div className="px-8 pb-8 pt-12 sm:px-10">
            <h2
              id="privacy-heading"
              className="text-[24px]"
              style={{ fontFamily: brand.fontHeading, fontStyle: "italic" }}
            >
              Privacy and consent
            </h2>

            <div className="mt-6 grid grid-cols-12 items-start gap-6">
              <div data-wf="b-5-0" className="col-span-12 md:col-span-8">
                {consent.state === "withdrawn" ? (
                  <div className="atrium-fade">
                    <p className="flex items-start gap-2 text-[16px] leading-relaxed" style={{ color: ink }}>
                      <Icons.CheckCircle className="mt-1 h-5 w-5 shrink-0" aria-hidden="true" style={{ color: accent }} />
                      <span>
                        Consent withdrawn on {consent.at}. we have stopped processing your data for shortage alerts and
                        recorded the withdrawal against your account. your data is stored in India and no third-party
                        tracking or targeted advertising runs on this site.
                      </span>
                    </p>
                    <p className="mt-3 pl-7 text-[13px]" style={{ color: inkFaint }}>
                      attendance already recorded by your faculty stays on the institution&rsquo;s register.
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="max-w-[70ch] text-[16px] leading-relaxed" style={{ color: ink }}>
                      Consent given on {consent.at}. Your data is stored in India and no third-party tracking or targeted
                      advertising runs on this site.
                    </p>
                    <p className="mt-3 max-w-[70ch] text-[13px]" style={{ color: inkFaint }}>
                      withdrawing is as simple as giving it — one tap, no form, recorded with a timestamp.
                    </p>
                  </>
                )}
              </div>

              <div className="col-span-12 flex md:col-span-4 md:justify-end">
                <Button
                  data-wf="b-5-1"
                  ref={withdrawRef}
                  type="button"
                  onClick={() =>
                    consent.state === "withdrawn"
                      ? (setConsent({ state: "given", at: "29 Oct 2026" }), setAnnounce("consent given again on 29 Oct 2026."))
                      : (setConsent({ state: "withdrawing", at: consent.at }), setAnnounce("withdrawing consent…"))
                  }
                  disabled={consent.state === "withdrawing"}
                  aria-busy={consent.state === "withdrawing"}
                  className={`w-full min-h-[48px] rounded-full px-7 py-3 text-[15px] font-semibold md:w-auto ${focusCls} disabled:opacity-60`}
                  style={{
                    backgroundColor: consent.state === "withdrawn" ? "transparent" : accent,
                    color: consent.state === "withdrawn" ? ink : "#ffffff",
                    border: consent.state === "withdrawn" ? `1px solid ${tint(ink, 0.35)}` : "none",
                    outlineColor: ink,
                  }}
                >
                  {consent.state === "withdrawing"
                    ? "Withdrawing…"
                    : consent.state === "withdrawn"
                    ? "Give consent again"
                    : "Withdraw consent"}
                </Button>
              </div>
            </div>

            <div className="mt-8" style={{ borderTop: hairline }} />

            <button
              type="button"
              data-wf="b-6-0"
              onClick={() => navigate("reports")}
              className={`mt-6 inline-flex min-h-[48px] items-center gap-2 rounded-full px-5 py-3 text-[15px] font-semibold underline underline-offset-4 hover:bg-black/[0.04] ${focusCls}`}
              style={{ color: ink, outlineColor: ink }}
            >
              <Icons.Download className="h-4 w-4" aria-hidden="true" />
              Download my attendance report
              <Icons.ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </section>

        <p className="mt-8 pb-4 text-[13px]" style={{ color: inkFaint }}>
          attendance questions go to your course faculty; data requests go to the data protection officer, dpo@quorq.ai.
        </p>
      </div>
    </div>
  );
}
