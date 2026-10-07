import "./Dashboard.css";

import {
  Users,
  CalendarCheck,
  Stethoscope,
  Clock,
  ArrowUpRight,
} from "lucide-react";

import StatCard from "../components/Dashboard/StatCard";
import AppointmentOverview from "../components/Dashboard/AppointmentOverview";
import PatientOverview from "../components/Dashboard/PatientOverview";

function Dashboard() {
  return (
    <div className="dashboard">

      {/* Page heading */}

      <div className="dashboard-heading">
        <div>
          <h2>Good morning, Admin 👋</h2>

          <p>
            Here’s what’s happening at your hospital today.
          </p>
        </div>

        <button className="dashboard-date">
          Today
          <ArrowUpRight size={16} />
        </button>
      </div>


      {/* Statistics */}

      <div className="stats-grid">

        <StatCard
          title="Total Patients"
          value="1,248"
          description="Compared to last month"
          icon={Users}
          color="blue"
          badge="+12.5%"
          badgeType="positive"
        />

        <StatCard
          title="Today's Appointments"
          value="42"
          description="8 appointments remaining"
          icon={CalendarCheck}
          color="green"
          badge="+8.2%"
          badgeType="positive"
        />

        <StatCard
          title="Total Doctors"
          value="36"
          description="4 doctors on leave"
          icon={Stethoscope}
          color="purple"
          badge="Active"
          badgeType="neutral"
        />

        <StatCard
          title="Pending Appointments"
          value="14"
          description="Require confirmation"
          icon={Clock}
          color="orange"
          badge="Pending"
          badgeType="warning"
        />

      </div>


      {/* Main dashboard content */}

      <div className="dashboard-grid">

        <AppointmentOverview />

        <PatientOverview />

      </div>

    </div>
  );
}

export default Dashboard;
