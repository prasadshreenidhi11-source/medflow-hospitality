import {
  Mail,
  Phone,
  BriefcaseBusiness,
  Building2,
  ArrowUpRight,
} from "lucide-react";

import "./DoctorCard.css";

function DoctorCard({ doctor }) {
  return (
    <div className="doctor-card">
      {/* Doctor Identity */}
      <div className="doctor-main">
        <div className="doctor-avatar">
          {doctor.name
            ?.replace("Dr. ", "")
            .split(" ")
            .map((name) => name[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()}
        </div>

        <div className="doctor-info">
          <div className="doctor-name-row">
            <h4>{doctor.name}</h4>

            <span
              className={`doctor-status ${
                doctor.status?.toLowerCase() ===
                "available"
                  ? "available"
                  : "unavailable"
              }`}
            >
              <span className="status-dot"></span>

              {doctor.status}
            </span>
          </div>

          <p className="doctor-specialization">
            {doctor.specialization}
          </p>

          <p className="doctor-id">
            Doctor ID: {doctor.id}
          </p>
        </div>
      </div>

      {/* Doctor Details */}
      <div className="doctor-details">
        <div className="doctor-detail">
          <Building2 size={15} />

          <div>
            <span>Department</span>
            <strong>{doctor.department}</strong>
          </div>
        </div>

        <div className="doctor-detail">
          <BriefcaseBusiness size={15} />

          <div>
            <span>Experience</span>
            <strong>{doctor.experience}</strong>
          </div>
        </div>

        <div className="doctor-detail">
          <Phone size={15} />

          <div>
            <span>Phone</span>
            <strong>{doctor.phone}</strong>
          </div>
        </div>

        <div className="doctor-detail">
          <Mail size={15} />

          <div>
            <span>Email</span>
            <strong>{doctor.email}</strong>
          </div>
        </div>
      </div>

      {/* Action */}
      <button
        type="button"
        className="doctor-view-btn"
      >
        View
        <ArrowUpRight size={15} />
      </button>
    </div>
  );
}

export default DoctorCard;