import {
  Phone,
  Mail,
  CalendarDays,
  ArrowUpRight,
  Trash2,
} from "lucide-react";

import "./PatientCard.css";

function PatientCard({ patient, onDeletePatient }) {
  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${patient.name}?`
    );

    if (confirmed) {
      onDeletePatient(patient.id);
    }
  };

  return (
    <div className="patient-card">

      {/* Patient identity */}

      <div className="patient-card-main">

        <div className="patient-avatar">
          {patient.name
            .split(" ")
            .map((name) => name[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()}
        </div>

        <div className="patient-info">

          <div className="patient-name-row">

            <h3>{patient.name}</h3>

            <span
              className={`patient-status ${
                patient.status.toLowerCase()
              }`}
            >
              <span className="status-dot"></span>
              {patient.status}
            </span>

          </div>

          <p className="patient-id">
            #{patient.id}
          </p>

          <div className="patient-basic-info">

            <span>
              {patient.age} years
            </span>

            <span className="info-divider">•</span>

            <span>
              {patient.gender}
            </span>

            <span className="info-divider">•</span>

            <span>
              {patient.bloodGroup}
            </span>

          </div>

          <span className="patient-department">
            {patient.department}
          </span>

        </div>

      </div>

      {/* Patient details */}

      <div className="patient-card-details">

        <div className="patient-detail">

          <Phone size={14} />

          <div>
            <span>Phone</span>
            <strong>{patient.phone}</strong>
          </div>

        </div>

        <div className="patient-detail">

          <Mail size={14} />

          <div>
            <span>Email</span>
            <strong>{patient.email}</strong>
          </div>

        </div>

        <div className="patient-detail">

          <CalendarDays size={14} />

          <div>
            <span>Last visit</span>
            <strong>{patient.lastVisit}</strong>
          </div>

        </div>

      </div>

      {/* Card actions */}

      <div className="patient-card-actions">

        <button
          type="button"
          className="patient-view-btn"
        >
          View Patient
          <ArrowUpRight size={15} />
        </button>

        <button
          type="button"
          className="patient-delete-btn"
          onClick={handleDelete}
          title="Delete patient"
        >
          <Trash2 size={15} />
        </button>

      </div>

    </div>
  );
}

export default PatientCard;