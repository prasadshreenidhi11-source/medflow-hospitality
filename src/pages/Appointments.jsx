import { useRef, useState } from "react";
import {
  CalendarCheck,
  Clock3,
  CheckCircle2,
  AlertCircle,
  Plus,
} from "lucide-react";

import "./Appointments.css";

import StatCard from "../components/Dashboard/StatCard";
import AppointmentList from "../components/Appointments/AppointmentList";
import AppointmentForm from "../components/Appointments/AppointmentForm";

import initialAppointments from "../data/appointments";

function Appointments() {
  const [appointments, setAppointments] = useState(
    initialAppointments
  );

  const [showForm, setShowForm] = useState(false);

  const formRef = useRef(null);

  const scheduledAppointments = appointments.filter(
    (appointment) => appointment.status === "Scheduled"
  ).length;

  const completedAppointments = appointments.filter(
    (appointment) => appointment.status === "Completed"
  ).length;

  const pendingAppointments = appointments.filter(
    (appointment) => appointment.status === "Pending"
  ).length;

  const handleAddAppointment = (newAppointment) => {
    setAppointments((currentAppointments) => [
      newAppointment,
      ...currentAppointments,
    ]);

    setShowForm(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleNewAppointment = () => {
    setShowForm(true);

    setTimeout(() => {
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  return (
    <div className="appointments-page">
      {/* PAGE HEADING */}
      <div className="appointments-heading">
        <div>
          <h2>Appointments</h2>
          <p>
            Schedule and manage your hospital appointments.
          </p>
        </div>

        <button
          className="add-appointment-btn"
          onClick={handleNewAppointment}
        >
          <Plus size={16} />
          New Appointment
        </button>
      </div>

      {/* STATS */}
      <div className="appointments-stats">
        <StatCard
          title="Total Appointments"
          value={appointments.length}
          description="All appointment records"
          icon={CalendarCheck}
          color="blue"
          badge="All"
          badgeType="neutral"
        />

        <StatCard
          title="Scheduled"
          value={scheduledAppointments}
          description="Upcoming appointments"
          icon={Clock3}
          color="green"
          badge="Scheduled"
          badgeType="positive"
        />

        <StatCard
          title="Completed"
          value={completedAppointments}
          description="Completed appointments"
          icon={CheckCircle2}
          color="purple"
          badge="Completed"
          badgeType="neutral"
        />

        <StatCard
          title="Pending"
          value={pendingAppointments}
          description="Awaiting confirmation"
          icon={AlertCircle}
          color="orange"
          badge="Pending"
          badgeType="warning"
        />
      </div>

      {/* APPOINTMENT LIST */}
      <div className="appointments-content">
        <AppointmentList appointments={appointments} />
      </div>

      {/* INLINE APPOINTMENT FORM */}
      {showForm && (
        <div
          ref={formRef}
          className="appointment-form-section"
        >
          <AppointmentForm
            onClose={() => setShowForm(false)}
            onAddAppointment={handleAddAppointment}
          />
        </div>
      )}
    </div>
  );
}

export default Appointments;