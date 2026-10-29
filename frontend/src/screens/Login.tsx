// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Check, X, AlertCircle, CheckCircle } = Icons;

const PRODUCT = "attendance tracker";

// Accounts provisioned from the term roster import (US-003).
const ACCOUNTS = [
  {
    email: "r.menon@nitk.ac.in",
    password: "monsoon2026",
    role: "faculty",
    full_name: "Radhika Menon",
    must_set_password: false,
    consent_given_at: "2026-07-14T04:12:00Z",
    home: "faculty-dashboard",
  },
  {
    email: "ananya.rao@nitk.ac.in",
    password: "temp-2026",
    role: "student",
    full_name: "Ananya Rao",
    roll_no: "21CS043",
    must_set_password: true,
    consent_given_at: null,
    home: "my-attendance",
  },
];

const CONSENT_BODY =
  "We process your name, roll number and attendance records to maintain institutional attendance. Data is stored in India and you may withdraw consent at any time from your privacy settings.";

const FULL_NOTICE = [
  "who holds the data — the department of computer science & engineering is the data fiduciary; the registrar's office is the grievance contact.",
  "what is collected — name, roll number, institutional email, course enrolments and the present/absent mark recorded for each scheduled session.",
  "why — to compute attendance percentage per course and to flag shortage below the configured minimum (currently 75%).",
  "how long — attendance records are kept for the academic programme; security and attendance-change logs are retained for 180 days.",
  "no profiling — no third-party tracking scripts, no targeted advertising, and your records are never shown to another student.",
  "withdrawal — withdraw consent from privacy settings at any time; the withdrawal is recorded with its timestamp, just as this acknowledgement is.",
];

const tint = (pct) => `color-mix(in srgb, ${brand.primaryColor} ${pct}%, ${brand.backgroundColor})`;

export default function Screen() {
  const navigate = useNavigate();
  const [stage, setStage] = React.useState("credentials"); // credentials | setPassword | consent
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [signingIn, setSigningIn] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [acknowledging, setAcknowledging] = React.useState(false);
  const [authError, setAuthError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState("");
  const [resetNote, setResetNote] = React.useState(null);
  const [account, setAccount] = React.useState(null);
  const [showFullNotice, setShowFullNotice] = React.useState(false);

  const timers = React.useRef([]);
  const dialogRef = React.useRef(null);
  const dialogHeadingRef = React.useRef(null);

  const later = (fn, ms) => {
    const id = window.setTimeout(fn, ms);
    timers.current.push(id);
  };

  React.useEffect(() => () => timers.current.forEach((id) => window.clearTimeout(id)), []);

  React.useEffect(() => {
    if (stage === "consent" && dialogHeadingRef.current) dialogHeadingRef.current.focus();
  }, [stage]);

  const pill = { borderRadius: 999, border: 0, backgroundColor: tint(8), color: brand.primaryColor };
  const accentPill = { borderRadius: 999, backgroundColor: brand.accentColor, color: brand.backgroundColor };

  const onSignIn = (e) => {
    e.preventDefault();
    if (signingIn) return;
    setResetNote(null);
    setAuthError(false);
    setSigningIn(true);
    later(() => {
      const match = ACCOUNTS.find(
        (a) => a.email.toLowerCase() === email.trim().toLowerCase() && a.password === password
      );
      setSigningIn(false);
      if (!match) {
        setAuthError(true); // generic — never says which field was wrong (AC-002)
        return;
      }
      setAccount(match);
      if (match.must_set_password) {
        setStage("setPassword");
      } else if (!match.consent_given_at) {
        setStage("consent");
      } else {
        navigate(match.home); // role's home screen (AC-001)
      }
    }, 650);
  };

  const onSavePassword = (e) => {
    e.preventDefault();
    if (saving) return;
    if (newPassword.length < 8) {
      setPasswordError("your new password needs at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("the two passwords do not match yet — try the second one again.");
      return;
    }
    setPasswordError("");
    setSaving(true);
    later(() => {
      setSaving(false);
      setStage("consent");
    }, 650);
  };

  const onAcknowledge = () => {
    if (acknowledging) return;
    setAcknowledging(true);
    later(() => navigate(account ? account.home : "my-attendance"), 650);
  };

  const onDialogKeyDown = (e) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      setStage(account && account.must_set_password ? "setPassword" : "credentials");
      return;
    }
    if (e.key !== "Tab" || !dialogRef.current) return;
    const nodes = Array.from(
      dialogRef.current.querySelectorAll('button, a[href], input, [tabindex]:not([tabindex="-1"])')
    ).filter((n) => !n.disabled);
    if (!nodes.length) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const labelCls = "block pl-4 text-xs lowercase";
  const labelStyle = { color: brand.neutralColor };
  const fieldCls = "atr-field atr-focus h-12 w-full px-5 text-sm outline-none";

  return (
    <div
      className="flex min-h-screen flex-col"
      style={{
        color: brand.primaryColor,
        fontFamily: brand.fontBody,
        backgroundColor: brand.backgroundColor,
        "--atr-accent": brand.accentColor,
        "--atr-field": tint(8),
        "--atr-field-hover": tint(12),
      }}
    >
      <style>{`
        .atr-focus:focus-visible { outline: 2px solid var(--atr-accent); outline-offset: 3px; }
        .atr-field { transition: background-color 160ms ease; }
        .atr-field:hover { background-color: var(--atr-field-hover); }
        .atr-rise { animation: atrRise 320ms cubic-bezier(.2,.7,.3,1) both; }
        .atr-fade { animation: atrFade 200ms ease both; }
        .atr-pop { animation: atrPop 260ms cubic-bezier(.2,.7,.3,1) both; }
        .atr-pulse { animation: atrPulse 1200ms ease-in-out infinite; }
        @keyframes atrRise { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
        @keyframes atrFade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes atrPop { from { opacity: 0; transform: translateY(14px) scale(.985); } to { opacity: 1; transform: none; } }
        @keyframes atrPulse { 0%,100% { opacity: .45; } 50% { opacity: 1; } }
        @media (prefers-reduced-motion: reduce) {
          .atr-rise, .atr-fade, .atr-pop, .atr-pulse { animation: none !important; }
          .atr-field { transition: none; }
        }
      `}</style>

      <header className="px-10 py-5" style={{ backgroundColor: tint(10) }}>
        <p className="text-lg italic" style={{ fontFamily: brand.fontHeading }}>{PRODUCT}</p>
      </header>

      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <main
          className="w-full max-w-md px-9 pb-9 pt-16 text-center"
          style={{ backgroundColor: tint(6), borderRadius: "170px 170px 24px 24px" }}
        >
          {/* b-0-0 page title */}
          <div data-wf="b-0-0">
            <h1 className="text-3xl italic leading-tight" style={{ fontFamily: brand.fontHeading }}>
              Sign in to Attendance Tracker
            </h1>
            <p className="mt-3 text-sm lowercase" style={{ color: brand.neutralColor }}>
              {stage === "setPassword"
                ? "one last step before your rosters open"
                : "roster marking, percentages and shortage flags — light enough for a slow connection"}
            </p>
          </div>

          {stage === "credentials" && (
            <form key="credentials" className="atr-rise mt-8 text-left" onSubmit={onSignIn} noValidate={false}>
              {/* b-1-0 credentials */}
              <div data-wf="b-1-0" className="space-y-4">
                <div className="space-y-1">
                  <label htmlFor="at-email" className={labelCls} style={labelStyle}>Email</label>
                  <input
                    data-wf="i-1-0-0"
                    id="at-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="name@nitk.ac.in"
                    aria-describedby={authError ? "at-auth-error" : "at-demo-hint"}
                    aria-invalid={authError || undefined}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={fieldCls}
                    style={pill}
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="at-password" className={labelCls} style={labelStyle}>Password</label>
                  <input
                    data-wf="i-1-0-1"
                    id="at-password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    aria-describedby={authError ? "at-auth-error" : undefined}
                    aria-invalid={authError || undefined}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={fieldCls}
                    style={pill}
                  />
                </div>
              </div>

              {/* row 3: sign in + reset link */}
              <div className="mt-6 grid grid-cols-1 items-center gap-3 sm:grid-cols-2">
                <div data-wf="b-2-0">
                  <button
                    type="submit"
                    disabled={signingIn}
                    className="atr-focus h-12 w-full text-sm font-semibold transition-opacity hover:opacity-90 disabled:cursor-wait"
                    style={{ ...accentPill, opacity: signingIn ? 0.6 : 1 }}
                  >
                    {signingIn ? (
                      <span className="atr-pulse lowercase">checking your details…</span>
                    ) : (
                      "Sign in"
                    )}
                  </button>
                </div>
                <div data-wf="b-2-1" className="text-center sm:text-left">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthError(false);
                      setResetNote(
                        email.trim()
                          ? `a reset link is on its way to ${email.trim().toLowerCase()} — it stays valid for 30 minutes.`
                          : "add your institutional email above and we will send the reset link there."
                      );
                    }}
                    className="atr-focus rounded-full px-2 py-2 text-xs italic underline underline-offset-4"
                    style={{ color: brand.primaryColor, fontFamily: brand.fontHeading }}
                  >
                    Forgot your password? Email me a reset link
                  </button>
                </div>
              </div>

              {resetNote && (
                <p
                  role="status"
                  className="atr-fade mt-4 rounded-3xl px-5 py-3 text-xs lowercase"
                  style={{ backgroundColor: tint(8), color: brand.primaryColor }}
                >
                  <CheckCircle className="mr-2 inline h-4 w-4 align-[-3px]" aria-hidden="true" />
                  {resetNote}
                </p>
              )}

              {/* b-3-0 generic failure message */}
              {authError && (
                <div
                  data-wf="b-3-0"
                  id="at-auth-error"
                  role="alert"
                  className="atr-fade mt-4 flex items-start gap-3 rounded-3xl px-5 py-4 text-left"
                  style={{ backgroundColor: tint(12) }}
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold">Incorrect email or password. Please try again.</p>
                    <p className="mt-1 text-xs lowercase" style={{ color: brand.neutralColor }}>
                      your email is still in the field above. first term here? use the credential from your
                      enrolment letter, or ask for a reset link.
                    </p>
                  </div>
                </div>
              )}

              <p id="at-demo-hint" className="mt-6 text-center text-xs lowercase" style={{ color: brand.neutralColor }}>
                sample accounts — faculty <span style={{ fontVariantNumeric: "tabular-nums" }}>r.menon@nitk.ac.in / monsoon2026</span>,
                first sign-in student <span style={{ fontVariantNumeric: "tabular-nums" }}>ananya.rao@nitk.ac.in / temp-2026</span>
              </p>
            </form>
          )}

          {stage === "setPassword" && (
            <form key="setPassword" className="atr-rise mt-8 text-left" onSubmit={onSavePassword}>
              {/* b-4-0 set your password */}
              <section data-wf="b-4-0" aria-labelledby="at-setpw-heading">
                <h2 id="at-setpw-heading" className="text-xl italic" style={{ fontFamily: brand.fontHeading }}>
                  Set your password (first sign in)
                </h2>
                <p className="mt-2 text-xs lowercase" style={{ color: brand.neutralColor }}>
                  {account ? `signed in as ${account.full_name.toLowerCase()} · ${account.email}` : ""} — choose
                  something only you know. at least 8 characters.
                </p>

                <div className="mt-5 space-y-4">
                  <div className="space-y-1">
                    <label htmlFor="at-newpw" className={labelCls} style={labelStyle}>New password</label>
                    <input
                      data-wf="i-4-0-0"
                      id="at-newpw"
                      name="new_password"
                      type="password"
                      autoComplete="new-password"
                      required
                      aria-describedby={passwordError ? "at-pw-error" : undefined}
                      aria-invalid={passwordError ? true : undefined}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className={fieldCls}
                      style={pill}
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="at-confirmpw" className={labelCls} style={labelStyle}>Confirm new password</label>
                    <input
                      data-wf="i-4-0-1"
                      id="at-confirmpw"
                      name="confirm_password"
                      type="password"
                      autoComplete="new-password"
                      required
                      aria-describedby={passwordError ? "at-pw-error" : undefined}
                      aria-invalid={passwordError ? true : undefined}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={fieldCls}
                      style={pill}
                    />
                  </div>
                </div>

                {passwordError && (
                  <p
                    id="at-pw-error"
                    role="alert"
                    className="atr-fade mt-4 flex items-start gap-2 rounded-3xl px-5 py-3 text-xs lowercase"
                    style={{ backgroundColor: tint(12), color: brand.primaryColor }}
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    {passwordError}
                  </p>
                )}
              </section>

              {/* b-5-0 save password */}
              <div data-wf="b-5-0" className="mt-6">
                <button
                  type="submit"
                  disabled={saving}
                  className="atr-focus h-12 w-full text-sm font-semibold transition-opacity hover:opacity-90 disabled:cursor-wait"
                  style={{ ...accentPill, opacity: saving ? 0.6 : 1 }}
                >
                  {saving ? <span className="atr-pulse lowercase">saving your password…</span> : "Save password and continue"}
                </button>
              </div>
            </form>
          )}

          {stage === "consent" && (
            <p className="atr-fade mt-10 text-sm lowercase" style={{ color: brand.neutralColor }}>
              one consent notice to read before we open your attendance.
            </p>
          )}
        </main>
      </div>

      {/* b-6-0 DPDP consent notice */}
      {stage === "consent" && (
        <div
          className="atr-fade fixed inset-0 z-50 flex items-end justify-center px-4 py-6 sm:items-center"
          style={{ backgroundColor: `color-mix(in srgb, ${brand.primaryColor} 55%, transparent)` }}
        >
          <div
            data-wf="b-6-0"
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="at-consent-heading"
            onKeyDown={onDialogKeyDown}
            className="atr-pop max-h-full w-full max-w-lg overflow-y-auto px-8 pb-8 pt-12 text-left"
            style={{
              backgroundColor: brand.backgroundColor,
              borderRadius: "180px 180px 24px 24px",
              boxShadow: `0 24px 60px color-mix(in srgb, ${brand.primaryColor} 35%, transparent)`,
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <h2
                id="at-consent-heading"
                ref={dialogHeadingRef}
                tabIndex={-1}
                className="atr-focus text-2xl italic"
                style={{ fontFamily: brand.fontHeading }}
              >
                DPDP consent notice
              </h2>
              <button
                type="button"
                aria-label="Close the consent notice and return to sign in"
                onClick={() => setStage(account && account.must_set_password ? "setPassword" : "credentials")}
                className="atr-focus flex h-11 w-11 shrink-0 items-center justify-center transition-opacity hover:opacity-70"
                style={{ borderRadius: 999, backgroundColor: tint(8), color: brand.primaryColor }}
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {/* b-7-0 consent body */}
            <p data-wf="b-7-0" className="mt-5 text-sm leading-relaxed" style={{ color: brand.primaryColor }}>
              {CONSENT_BODY}
            </p>

            {showFullNotice && (
              <ul
                id="at-full-notice"
                className="atr-fade mt-5 space-y-3 rounded-3xl px-6 py-5 text-xs leading-relaxed lowercase"
                style={{ backgroundColor: tint(6), color: brand.primaryColor }}
              >
                {FULL_NOTICE.map((line) => (
                  <li key={line} className="flex gap-3">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            )}

            <p
              className="mt-5 text-xs lowercase"
              style={{ color: brand.neutralColor, fontVariantNumeric: "tabular-nums" }}
            >
              your acknowledgement is recorded with a timestamp — 29 oct 2026, 09:14 ist.
            </p>

            <div className="mt-6 grid grid-cols-1 items-center gap-3 sm:grid-cols-2">
              <div data-wf="b-8-0">
                <button
                  type="button"
                  onClick={onAcknowledge}
                  disabled={acknowledging}
                  className="atr-focus h-12 w-full text-sm font-semibold transition-opacity hover:opacity-90 disabled:cursor-wait"
                  style={{ ...accentPill, opacity: acknowledging ? 0.6 : 1 }}
                >
                  {acknowledging ? (
                    <span className="atr-pulse lowercase">recording your acknowledgement…</span>
                  ) : (
                    "I acknowledge and continue"
                  )}
                </button>
              </div>
              <div data-wf="b-8-1" className="text-center sm:text-left">
                <button
                  type="button"
                  aria-expanded={showFullNotice}
                  aria-controls="at-full-notice"
                  onClick={() => setShowFullNotice((v) => !v)}
                  className="atr-focus rounded-full px-2 py-2 text-xs italic underline underline-offset-4"
                  style={{ color: brand.primaryColor, fontFamily: brand.fontHeading }}
                >
                  Read the full privacy notice
                </button>
              </div>
            </div>

            <p className="mt-5 text-xs lowercase" style={{ color: brand.neutralColor }}>
              you cannot reach your attendance until this is acknowledged. press escape to step back to sign in.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
