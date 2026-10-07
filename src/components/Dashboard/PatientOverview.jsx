import {
  MoreHorizontal,
  UserRound,
} from "lucide-react";

import "./PatientOverview.css";

const patients = [
  {
    id: 1,
    name: "Olivia Martin",
    patientId: "PT-1024",
    age: 28,
    gender: "Female",
    department: "Cardiology",
    avatar: "OM",
  },
  {
    id: 2,
    name: "James Wilson",
    patientId: "PT-1023",
    age: 45,
    gender: "Male",
    department: "Neurology",
    avatar: "JW",
  },
  {
    id: 3,
    name: "Sophia Anderson",
    patientId: "PT-1022",
    age: 34,
    gender: "Female",
    department: "General",
    avatar: "SA",
  },
  {
    id: 4,
    name: "Daniel Thomas",
    patientId: "PT-1021",
    age: 51,
    gender: "Male",
    department: "Orthopedics",
    avatar: "DT",
  },
];

function PatientOverview() {
  return (
    <section className="patient-overview">
      <div className="patient-overview-header">
        <div>
          <h3>Recent Patients</h3>
          <p>Recently registered patients</p>
        </div>

        <button className="patient-view-btn">
          View all
        </button>
      </div>

      <div className="patient-list">
        {patients.map((patient) => (
          <div
            className="patient-row"
            key={patient.id}
          >
            <div className="patient-main">
              <div className="patient-avatar">
                {patient.avatar}
              </div>

              <div className="patient-name">
                <strong>{patient.name}</strong>

                <span>{patient.patientId}</span>
              </div>
            </div>

            <div className="patient-info">
              <span>Age / Gender</span>

              <strong>
                {patient.age} / {patient.gender}
              </strong>
            </div>

            <div className="patient-department">
              <span>Department</span>

              <strong>{patient.department}</strong>
            </div>

            <button
              className="patient-menu"
              aria-label={`More options for ${patient.name}`}
            >
              <MoreHorizontal size={18} />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PatientOverview;
