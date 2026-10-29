import { NavLink, Navigate, Outlet, Route, Routes } from "react-router-dom";

import { Icons } from "@/lib/icons";
import Login from "@/screens/Login";
import FacultyDashboard from "@/screens/FacultyDashboard";
import SessionRoster from "@/screens/SessionRoster";
import MyAttendance from "@/screens/MyAttendance";
import AdminConsole from "@/screens/AdminConsole";
import Reports from "@/screens/Reports";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    "flex items-center gap-2 rounded-[var(--brand-radius)] px-3 py-2 text-sm font-medium transition-colors",
    isActive ? "bg-[var(--brand-hover)] text-[var(--brand-fg)]" : "text-[var(--brand-fg-muted)]",
  ].join(" ");

// The app's menu, drawn around every screen except the ones routed outside it below.
function AppShellLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header
        className="border-b"
        style={{
          backgroundColor: "var(--brand-surface)",
          borderColor: "var(--brand-border)",
        }}
      >
        <div className="flex items-center gap-6 px-6 py-2">
          <p
            className="shrink-0 text-sm font-semibold"
            style={{ fontFamily: "var(--brand-font-heading)" }}
          >
            {"Attendance Tracker"}
          </p>
          <nav aria-label="App menu" className="flex flex-wrap items-center gap-1">
            <NavLink to="/faculty-dashboard" className={navLinkClass}>
              <Icons.Home size={16} />
              {"Dashboard"}
            </NavLink>
            <NavLink to="/my-attendance" className={navLinkClass}>
              <Icons.User size={16} />
              {"My attendance"}
            </NavLink>
            <NavLink to="/reports" className={navLinkClass}>
              <Icons.Filter size={16} />
              {"Reports"}
            </NavLink>
            <NavLink to="/admin-console" className={navLinkClass}>
              <Icons.Settings size={16} />
              {"Admin console"}
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<AppShellLayout />}>
        <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
        <Route path="/session-roster" element={<SessionRoster />} />
        <Route path="/my-attendance" element={<MyAttendance />} />
        <Route path="/admin-console" element={<AdminConsole />} />
        <Route path="/reports" element={<Reports />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
