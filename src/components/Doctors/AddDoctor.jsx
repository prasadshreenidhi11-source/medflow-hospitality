import { useState } from "react";
import { X, UserRoundPlus } from "lucide-react";

import "./AddDoctor.css";

function AddDoctor({ onClose, onAddDoctor }) {
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    department: "",
    phone: "",
    email: "",
    experience: "",
    status: "Available",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newDoctor = {
      id: `DR-${Date.now().toString().slice(-4)}`,
      name: formData.name,
      specialization: formData.specialization,
      department: formData.department,
      phone: formData.phone,
      email: formData.email,
      experience: formData.experience,
      status: formData.status,
    };

    onAddDoctor(newDoctor);
  };

  return (
    <div className="add-doctor-overlay" onClick={onClose}>
      <div
        className="add-doctor-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="add-doctor-header">
          <div className="add-doctor-title">
            <div className="add-doctor-icon">
              <UserRoundPlus size={18} />
            </div>

            <div>
              <h3>Add Doctor</h3>
              <p>Register a new medical staff member.</p>
            </div>
          </div>

          <button
            type="button"
            className="add-doctor-close"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <form
          className="add-doctor-form"
          onSubmit={handleSubmit}
        >
          <div className="add-doctor-grid">
            <div className="add-doctor-field full">
              <label>Doctor Name</label>

              <input
                type="text"
                name="name"
                placeholder="Dr. John Smith"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="add-doctor-field">
              <label>Specialization</label>

              <input
                type="text"
                name="specialization"
                placeholder="Cardiologist"
                value={formData.specialization}
                onChange={handleChange}
                required
              />
            </div>

            <div className="add-doctor-field">
              <label>Department</label>

              <input
                type="text"
                name="department"
                placeholder="Cardiology"
                value={formData.department}
                onChange={handleChange}
                required
              />
            </div>

            <div className="add-doctor-field">
              <label>Phone</label>

              <input
                type="tel"
                name="phone"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="add-doctor-field">
              <label>Email</label>

              <input
                type="email"
                name="email"
                placeholder="doctor@hospital.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="add-doctor-field">
              <label>Experience</label>

              <input
                type="text"
                name="experience"
                placeholder="10 years"
                value={formData.experience}
                onChange={handleChange}
                required
              />
            </div>

            <div className="add-doctor-field">
              <label>Status</label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Available">
                  Available
                </option>

                <option value="Unavailable">
                  Unavailable
                </option>
              </select>
            </div>
          </div>

          <div className="add-doctor-actions">
            <button
              type="button"
              className="add-doctor-cancel"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="add-doctor-submit"
            >
              <UserRoundPlus size={16} />
              Add Doctor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddDoctor;