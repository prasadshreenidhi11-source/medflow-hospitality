import { useState } from "react";
import {
  Users,
  UserCheck,
  UserPlus,
  Plus,
} from "lucide-react";

import "./Patients.css";

import StatCard from "../components/Dashboard/StatCard";
import PatientList from "../components/Patients/PatientList";
import AddPatient from "../components/Patients/AddPatient";

import initialPatients from "../data/patients";

function Patients() {
  const [patients, setPatients] = useState(initialPatients);
  const [showAddPatient, setShowAddPatient] = useState(false);

  const activePatients = patients.filter(
    (patient) => patient.status === "Active"
  ).length;

  const inactivePatients = patients.filter(
    (patient) => patient.status === "Inactive"
  ).length;

  const handleAddPatient = (newPatient) => {
    setPatients((currentPatients) => [
      newPatient,
      ...currentPatients,
    ]);
  };

  const handleDeletePatient = (patientId) => {
    setPatients((currentPatients) =>
      currentPatients.filter(
        (patient) => patient.id !== patientId
      )
    );
  };

  return (
    <div className="patients-page">

      {/* Page heading */}

      <div className="patients-heading">
        <div>
          <h2>Patients</h2>

          <p>
            View and manage your hospital's patient records.
          </p>
        </div>

        <button
          className="add-patient-btn"
          onClick={() => setShowAddPatient(true)}
        >
          <Plus size={16} />
          Add Patient
        </button>
      </div>

      {/* Statistics */}

      <div className="patients-stats">

        <StatCard
          title="Total Patients"
          value={patients.length}
          description="Registered patient records"
          icon={Users}
          color="blue"
          badge="All"
          badgeType="neutral"
        />

        <StatCard
          title="Active Patients"
          value={activePatients}
          description="Currently active patients"
          icon={UserCheck}
          color="green"
          badge="Active"
          badgeType="positive"
        />

        <StatCard
          title="Inactive Patients"
          value={inactivePatients}
          description="Currently inactive"
          icon={Users}
          color="purple"
          badge="Inactive"
          badgeType="neutral"
        />

        <StatCard
          title="New Patients"
          value="0"
          description="Added this month"
          icon={UserPlus}
          color="orange"
          badge="New"
          badgeType="warning"
        />

      </div>

      {/* Patient list */}

      <div className="patients-content">
        <PatientList
          patients={patients}
          onDeletePatient={handleDeletePatient}
        />
      </div>

      {/* Add Patient Modal */}

      {showAddPatient && (
        <AddPatient
          onClose={() => setShowAddPatient(false)}
          onAddPatient={handleAddPatient}
        />
      )}

    </div>
  );
}

export default Patients;