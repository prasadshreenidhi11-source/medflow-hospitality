import {
  User,
  Stethoscope,
  CalendarDays,
  Clock3,
  ArrowUpRight,
} from "lucide-react";

import "./AppointmentCard.css";

function AppointmentCard({ appointment }) {
  const formatDate = (date) => {
    if (!date) return "—";

    const formattedDate = new Date(
      `${date}T00:00:00`
    );

    return formattedDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (time) => {
    if (!time) return "—";

    const [hours, minutes] = time.split(":");

    const date = new Date();

    date.setHours(hours);
    date.setMinutes(minutes);

    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div className="appointment-card">

      {/* Main information */}

      <div className="appointment-card-main">

        <div className="appointment-date-box">
          <CalendarDays size={17} />

          <span>
            {formatDate(appointment.date)}
          </span>

          <strong>
            {formatTime(appointment.time)}
          </strong>
        </div>

        <div className="appointment-info">

          <div className="appointment-name-row">

            <h3>
              {appointment.patient}
            </h3>

            <span
              className={`appointment-status ${appointment.status.toLowerCase()}`}
            >
              <span className="appointment-status-dot"></span>

              {appointment.status}
            </span>

          </div>

          <p className="appointment-id">
            #{appointment.id}
          </p>

          <div className="appointment-basic-info">

            <span>
              <User size={12} />
              {appointment.patientId}
            </span>

            <span className="appointment-divider">
              •
            </span>

            <span>
              <Stethoscope size={12} />
              {appointment.doctor}
            </span>

          </div>

          <span className="appointment-department">
            {appointment.department}
          </span>

        </div>

      </div>

      {/* Details */}

      <div className="appointment-details">

        <div className="appointment-detail">

          <Clock3 size={14} />

          <div>
            <span>Time</span>

            <strong>
              {formatTime(appointment.time)}
            </strong>
          </div>

        </div>

        <div className="appointment-detail">

          <div>
            <span>Type</span>

            <strong>
              {appointment.type}
            </strong>
          </div>

        </div>

        <div className="appointment-detail">

          <div>
            <span>Reason</span>

            <strong title={appointment.reason}>
              {appointment.reason}
            </strong>
          </div>

        </div>

      </div>

      {/* Action */}

      <button
        className="appointment-view-btn"
        type="button"
      >
        View
        <ArrowUpRight size={14} />
      </button>

    </div>
  );
}

export default AppointmentCard;