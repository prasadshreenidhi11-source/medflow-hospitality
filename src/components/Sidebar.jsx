import "./Sidebar.css";

import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  CalendarDays,
  Users,
  CalendarCheck,
  Stethoscope,
} from "lucide-react";

function Sidebar({ sidebarOpen }) {
  return (
    <aside
      className={`sidebar ${
        sidebarOpen ? "mobile-open" : ""
      }`}
    >
      {/* Logo */}

      <div className="sidebar-logo">
        <div className="logo-icon">
          <Stethoscope size={24} />
        </div>

        <div>
          <h2>MediCare</h2>
          <span>Hospital Portal</span>
        </div>
      </div>

      {/* Navigation */}

      <nav className="sidebar-nav">
        <p className="nav-title">MENU</p>

        <NavLink
          to="/"
          className={({ isActive }) =>
            `nav-item ${isActive ? "active" : ""}`
          }
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/calendar"
          className={({ isActive }) =>
            `nav-item ${isActive ? "active" : ""}`
          }
        >
          <CalendarDays size={20} />
          <span>Calendar</span>
        </NavLink>

        {/* Coming soon */}

        <a href="/patients" className="nav-item">
          <Users size={20} />
          <span>Patients</span>
        </a>

        <a href="/appointments" className="nav-item">
          <CalendarCheck size={20} />
          <span>Appointments</span>
        </a>

        <a href="/doctors" className="nav-item">
          <Stethoscope size={20} />
          <span>Doctors</span>
        </a>
      </nav>

      {/* User */}

      <div className="sidebar-footer">
        <div className="user-avatar">AD</div>

        <div className="user-info">
          <strong>Admin</strong>
          <span>Administrator</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
