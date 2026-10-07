import {
  CheckCircle2,
  Clock3,
  MoreHorizontal,
  UserRound,
} from "lucide-react";

import "./AppointmentOverview.css";

const appointments = [
  {
    id: 1,
    time: "09:00 AM",
    patient: "John Smith",
    type: "General Checkup",
    doctor: "Dr. Sarah Wilson",
    status: "Confirmed",
  },
  {
    id: 2,
    time: "10:30 AM",
    patient: "Emma Johnson",
    type: "Cardiology",
    doctor: "Dr. Michael Brown",
    status: "Pending",
  },
  {
    id: 3,
    time: "11:30 AM",
    patient: "David Miller",
    type: "Dental Checkup",
    doctor: "Dr. Emily Davis",
    status: "Confirmed",
  },
  {
    id: 4,
    time: "01:00 PM",
    patient: "Sophia Wilson",
    type: "Neurology",
    doctor: "Dr. James Anderson",
    status: "Confirmed",
  },
];

function AppointmentOverview() {
  return (
    <section className="appointment-overview">
      <div className="appointment-header">
        <div>
          <h3>Today's Appointments</h3>
          <p>Your scheduled appointments for today</p>
        </div>

        <button className="appointment-view-btn">
          View all
        </button>
      </div>

      <div className="appointment-list">
        {appointments.map((appointment) => (
          <div
            className="appointment-row"
            key={appointment.id}
          >
            <div className="appointment-time">
              <span>{appointment.time}</span>
            </div>

            <div className="appointment-patient">
              <div className="patient-avatar">
                <UserRound size={17} />
              </div>

              <div className="patient-details">
                <strong>{appointment.patient}</strong>
                <span>{appointment.type}</span>
              </div>
            </div>

            <div className="appointment-doctor">
              <span className="doctor-label">Doctor</span>
              <strong>{appointment.doctor}</strong>
            </div>

            <div className="appointment-status">
              {appointment.status === "Confirmed" ? (
                <span className="status-badge confirmed">
                  <CheckCircle2 size={13} />
                  Confirmed
                </span>
              ) : (
                <span className="status-badge pending">
                  <Clock3 size={13} />
                  Pending
                </span>
              )}
            </div>

            <button
              className="appointment-menu"
              aria-label={`More options for ${appointment.patient}`}
            >
              <MoreHorizontal size={18} />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AppointmentOverview;
