import { Search, Stethoscope } from "lucide-react";
import { useMemo, useState } from "react";

import DoctorCard from "./DoctorCard";
import "./DoctorList.css";

function DoctorList({ doctors }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDoctors = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    if (!search) {
      return doctors;
    }

    return doctors.filter((doctor) =>
      [
        doctor.name,
        doctor.specialization,
        doctor.department,
        doctor.email,
        doctor.phone,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search)
    );
  }, [doctors, searchTerm]);

  return (
    <div className="doctor-list-container">
      {/* HEADER */}
      <div className="doctor-list-header">
        <div>
          <h3>Medical Staff</h3>
          <p>
            View and manage your hospital's doctors.
          </p>
        </div>

        <div className="doctor-search">
          <Search size={17} />

          <input
            type="text"
            placeholder="Search doctors..."
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
          />
        </div>
      </div>

      {/* DOCTORS */}
      {filteredDoctors.length > 0 ? (
        <div className="doctor-list">
          {filteredDoctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
            />
          ))}
        </div>
      ) : (
        <div className="doctor-empty-state">
          <Stethoscope size={30} />

          <h4>No doctors found</h4>

          <p>
            Try searching with another name,
            department, or specialization.
          </p>
        </div>
      )}
    </div>
  );
}

export default DoctorList;