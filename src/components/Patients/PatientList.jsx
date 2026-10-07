import { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Users,
} from "lucide-react";

import PatientCard from "./PatientCard";

import "./PatientList.css";

function PatientList({ patients, onDeletePatient }) {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState(
    "All departments"
  );
  const [status, setStatus] = useState("All status");

  const departments = [
    "All departments",
    ...new Set(
      patients.map((patient) => patient.department)
    ),
  ];

  const statuses = [
    "All status",
    ...new Set(
      patients.map((patient) => patient.status)
    ),
  ];

  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        patient.name.toLowerCase().includes(searchValue) ||
        patient.id.toLowerCase().includes(searchValue) ||
        patient.department
          .toLowerCase()
          .includes(searchValue) ||
        patient.phone.toLowerCase().includes(searchValue);

      const matchesDepartment =
        department === "All departments" ||
        patient.department === department;

      const matchesStatus =
        status === "All status" ||
        patient.status === status;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesStatus
      );
    });
  }, [patients, search, department, status]);

  return (
    <section className="patient-list-section">

      {/* Section heading */}

      <div className="patient-list-heading">

        <div>
          <div className="patient-list-title">

            <h3>All patients</h3>

            <span className="patient-count">
              {filteredPatients.length} patients
            </span>

          </div>

          <p>
            View and manage registered patient records.
          </p>
        </div>

        <div className="patient-list-icon">
          <Users size={17} />
        </div>

      </div>

      {/* Search and filters */}

      <div className="patient-filters">

        <div className="patient-search">

          <Search size={16} />

          <input
            type="text"
            placeholder="Search patients..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

        </div>

        <div className="patient-filter">

          <SlidersHorizontal size={14} />

          <select
            value={department}
            onChange={(event) =>
              setDepartment(event.target.value)
            }
          >
            {departments.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

        </div>

        <div className="patient-filter">

          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value)
            }
          >
            {statuses.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

        </div>

      </div>

      {/* Patient cards */}

      <div className="patient-list">

        {filteredPatients.length > 0 ? (

          filteredPatients.map((patient) => (
            <PatientCard
              key={patient.id}
              patient={patient}
              onDeletePatient={onDeletePatient}
            />
          ))

        ) : (

          <div className="patient-empty">

            <div className="patient-empty-icon">
              <Search size={20} />
            </div>

            <h4>No patients found</h4>

            <p>
              Try changing your search or filter
              options.
            </p>

          </div>

        )}

      </div>

    </section>
  );
}

export default PatientList;