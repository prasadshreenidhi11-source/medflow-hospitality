import { useState } from "react";
import {
  Stethoscope,
  UserCheck,
  UserPlus,
  Activity,
  Plus,
} from "lucide-react";

import "./Doctors.css";

import StatCard from "../components/Dashboard/StatCard";
import DoctorList from "../components/Doctors/DoctorList";
import AddDoctor from "../components/Doctors/AddDoctor";

import initialDoctors from "../data/doctors";

function Doctors() {
  const [doctors, setDoctors] = useState(initialDoctors);
  const [showAddDoctor, setShowAddDoctor] = useState(false);

  const availableDoctors = doctors.filter(
    (doctor) => doctor.status === "Available"
  ).length;

  const unavailableDoctors = doctors.filter(
    (doctor) => doctor.status !== "Available"
  ).length;

  const handleAddDoctor = (newDoctor) => {
    setDoctors((currentDoctors) => [
      newDoctor,
      ...currentDoctors,
    ]);

    setShowAddDoctor(false);
  };

  return (
    <div className="doctors-page">
      {/* PAGE HEADING */}
      <div className="doctors-heading">
        <div>
          <h2>Doctors</h2>

          <p>
            View and manage your hospital's medical staff.
          </p>
        </div>

        <button
          className="add-doctor-btn"
          onClick={() => setShowAddDoctor(true)}
        >
          <Plus size={16} />
          Add Doctor
        </button>
      </div>

      {/* STATS */}
      <div className="doctors-stats">
        <StatCard
          title="Total Doctors"
          value={doctors.length}
          description="Registered medical staff"
          icon={Stethoscope}
          color="blue"
          badge="All"
          badgeType="neutral"
        />

        <StatCard
          title="Available"
          value={availableDoctors}
          description="Currently available"
          icon={UserCheck}
          color="green"
          badge="Available"
          badgeType="positive"
        />

        <StatCard
          title="Unavailable"
          value={unavailableDoctors}
          description="Currently unavailable"
          icon={Activity}
          color="purple"
          badge="Unavailable"
          badgeType="neutral"
        />

        <StatCard
          title="New Doctors"
          value="0"
          description="Added this month"
          icon={UserPlus}
          color="orange"
          badge="New"
          badgeType="warning"
        />
      </div>

      {/* DOCTOR LIST */}
      <DoctorList doctors={doctors} />

      {/* ADD DOCTOR FORM */}
      {showAddDoctor && (
        <AddDoctor
          onClose={() => setShowAddDoctor(false)}
          onAddDoctor={handleAddDoctor}
        />
      )}
    </div>
  );
}

export default Doctors;