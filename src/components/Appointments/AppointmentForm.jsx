import { useState } from "react";
import {
  X,
  User,
  Stethoscope,
  Building2,
  CalendarDays,
  Clock3,
  ClipboardList,
  FileText,
} from "lucide-react";

import doctors from "../../data/doctors";

import "./AppointmentForm.css";

function AppointmentForm({ onClose, onAddAppointment }) {
  const [formData, setFormData] = useState({
    patient: "",
    patientId: "",
    doctorId: "",
    department: "",
    date: "",
    time: "",
    type: "Consultation",
    reason: "",
    notes: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    if (name === "doctorId") {
      const selectedDoctor = doctors.find(
        (doctor) => doctor.id === value
      );

      setFormData((currentData) => ({
        ...currentData,
        doctorId: value,
        department: selectedDoctor?.department || "",
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.patient ||
      !formData.doctorId ||
      !formData.department ||
      !formData.date ||
      !formData.time ||
      !formData.reason
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const selectedDoctor = doctors.find(
      (doctor) => doctor.id === formData.doctorId
    );

    const newAppointment = {
      id: `APT-${Date.now().toString().slice(-4)}`,

      patientId:
        formData.patientId.trim() ||
        `PT-${Date.now().toString().slice(-4)}`,

      patient: formData.patient,

      doctorId: formData.doctorId,

      doctor:
        selectedDoctor?.name || "Unknown doctor",

      department: formData.department,

      date: formData.date,

      time: formData.time,

      type: formData.type,

      reason: formData.reason,

      notes: formData.notes,

      status: "Scheduled",
    };

    onAddAppointment(newAppointment);
  };

  return (
    <div className="appointment-form-container">
      {/* FORM HEADER */}
      <div className="appointment-form-header">
        <div>
          <h3>Create New Appointment</h3>

          <p>
            Enter the patient and appointment details below.
          </p>
        </div>

        <button
          type="button"
          className="appointment-close-btn"
          onClick={onClose}
          aria-label="Close appointment form"
        >
          <X size={20} />
        </button>
      </div>

      <form
        className="appointment-form"
        onSubmit={handleSubmit}
      >
        {/* PATIENT INFORMATION */}
        <div className="form-section">
          <div className="form-section-title">
            <User size={17} />
            <span>Patient Information</span>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>
                Patient Name <span>*</span>
              </label>

              <input
                type="text"
                name="patient"
                value={formData.patient}
                onChange={handleChange}
                placeholder="Enter patient name"
              />
            </div>

            <div className="form-group">
              <label>Patient ID</label>

              <input
                type="text"
                name="patientId"
                value={formData.patientId}
                onChange={handleChange}
                placeholder="Enter patient ID (optional)"
              />
            </div>
          </div>
        </div>

        {/* DOCTOR INFORMATION */}
        <div className="form-section">
          <div className="form-section-title">
            <Stethoscope size={17} />
            <span>Doctor Information</span>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>
                Doctor <span>*</span>
              </label>

              <select
                name="doctorId"
                value={formData.doctorId}
                onChange={handleChange}
              >
                <option value="">
                  Select doctor
                </option>

                {doctors.map((doctor) => (
                  <option
                    key={doctor.id}
                    value={doctor.id}
                  >
                    {doctor.name} —{" "}
                    {doctor.specialization}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>
                Department <span>*</span>
              </label>

              <div className="input-with-icon">
                <Building2 size={16} />

                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="Department"
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>

        {/* APPOINTMENT DETAILS */}
        <div className="form-section">
          <div className="form-section-title">
            <CalendarDays size={17} />
            <span>Appointment Details</span>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>
                Date <span>*</span>
              </label>

              <div className="input-with-icon">
                <CalendarDays size={16} />

                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>
                Time <span>*</span>
              </label>

              <div className="input-with-icon">
                <Clock3 size={16} />

                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Appointment Type</label>

              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="Consultation">
                  Consultation
                </option>

                <option value="Follow-up">
                  Follow-up
                </option>

                <option value="Emergency">
                  Emergency
                </option>

                <option value="Routine Checkup">
                  Routine Checkup
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* VISIT INFORMATION */}
        <div className="form-section">
          <div className="form-section-title">
            <ClipboardList size={17} />
            <span>Visit Information</span>
          </div>

          <div className="form-group">
            <label>
              Reason for Visit <span>*</span>
            </label>

            <input
              type="text"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="e.g. Fever, routine checkup, follow-up..."
            />
          </div>

          <div className="form-group">
            <label>Additional Notes</label>

            <div className="input-with-icon textarea-icon">
              <FileText size={16} />

              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Add any additional notes..."
                rows="3"
              />
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="appointment-form-actions">
          <button
            type="button"
            className="appointment-cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="appointment-submit-btn"
          >
            Create Appointment
          </button>
        </div>
      </form>
    </div>
  );
}

export default AppointmentForm;