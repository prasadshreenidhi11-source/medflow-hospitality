import { Bell, Search, Menu, X } from "lucide-react";
import "./Header.css";

function Header({ sidebarOpen, setSidebarOpen }) {
  return (
    <header className="header">
      <div className="header-left">

        <button
          className="mobile-menu-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle navigation"
        >
          {sidebarOpen ? (
            <X size={21} />
          ) : (
            <Menu size={21} />
          )}
        </button>

        <div>
          <h1>Dashboard</h1>
          <p>Welcome back, Admin</p>
        </div>

      </div>

      <div className="header-right">

        <div className="search-box">
          <Search size={19} />

          <input
            type="text"
            placeholder="Search..."
          />
        </div>

        <button
          className="notification-btn"
          aria-label="Notifications"
        >
          <Bell size={21} />

          <span className="notification-dot"></span>
        </button>

        <div className="header-profile">
          <div className="profile-avatar">
            AD
          </div>

          <div className="profile-info">
            <strong>Admin</strong>
            <span>Administrator</span>
          </div>
        </div>

      </div>
    </header>
  );
}

export default Header;
