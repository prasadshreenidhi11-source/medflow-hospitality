import { useState } from "react";
import {
  UserPlus,
  X,
  User,
  Phone,
  Mail,
  Droplets,
  Stethoscope,
  Users,
} from "lucide-react";

import "./AddPatient.css";

function AddPatient({ onClose, onAddPatient }) {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    bloodGroup: "",
    department: "",
    doctor: "",
    status: "Active",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.name ||
      !formData.age ||
      !formData.gender ||
      !formData.phone ||
      !formData.department
    ) {
      return;
    }

    const newPatient = {
      ...formData,
      id: `PT-${Date.now().toString().slice(-4)}`,
      lastVisit: "New patient",
    };

    onAddPatient(newPatient);

    onClose();
  };

  return (
    <div className="add-patient-overlay">

      <div className="add-patient-modal">

        {/* Header */}

        <div className="add-patient-header">

          <div className="add-patient-heading">

            <div className="add-patient-icon">
              <UserPlus size={18} />
            </div>

            <div>
              <h2>Add New Patient</h2>

              <p>
                Create a new patient record.
              </p>
            </div>

          </div>

          <button
            type="button"
            className="add-patient-close"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={18} />
          </button>

        </div>


        {/* Form */}

        <form
          className="add-patient-form"
          onSubmit={handleSubmit}
        >

          {/* Personal information */}

          <div className="form-section">

            <div className="form-section-heading">

              <User size={15} />

              <span>
                Personal Information
              </span>

            </div>


            <div className="form-grid">

              <div className="form-field form-field-full">

                <label>
                  Full name
                </label>

                <div className="form-input-wrapper">

                  <User size={14} />

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter patient name"
                    value={formData.name}
                    onChange={handleChange}
                  />

                </div>

              </div>


              <div className="form-field">

                <label>
                  Age
                </label>

                <input
                  type="number"
                  name="age"
                  min="0"
                  placeholder="Enter age"
                  value={formData.age}
                  onChange={handleChange}
                />

              </div>


              <div className="form-field">

                <label>
                  Gender
                </label>

                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">
                    Select gender
                  </option>

                  <option value="Male">
                    Male
                  </option>

                  <option value="Female">
                    Female
                  </option>

                  <option value="Other">
                    Other
                  </option>

                </select>

              </div>


              <div className="form-field">

                <label>
                  Phone
                </label>

                <div className="form-input-wrapper">

                  <Phone size={14} />

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={handleChange}
                  />

                </div>

              </div>


              <div className="form-field">

                <label>
                  Email
                </label>

                <div className="form-input-wrapper">

                  <Mail size={14} />

                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                  />

                </div>

              </div>

            </div>

          </div>


          {/* Medical information */}

          <div className="form-section">

            <div className="form-section-heading">

              <Stethoscope size={15} />

              <span>
                Medical Information
              </span>

            </div>


            <div className="form-grid">

              <div className="form-field">

                <label>
                  Blood group
                </label>

                <div className="form-input-wrapper">

                  <Droplets size={14} />

                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select blood group
                    </option>

                    <option value="A+">
                      A+
                    </option>

                    <option value="A-">
                      A-
                    </option>

                    <option value="B+">
                      B+
                    </option>

                    <option value="B-">
                      B-
                    </option>

                    <option value="AB+">
                      AB+
                    </option>

                    <option value="AB-">
                      AB-
                    </option>

                    <option value="O+">
                      O+
                    </option>

                    <option value="O-">
                      O-
                    </option>

                  </select>

                </div>

              </div>


              <div className="form-field">

                <label>
                  Department
                </label>

                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                >
                  <option value="">
                    Select department
                  </option>

                  <option value="General Medicine">
                    General Medicine
                  </option>

                  <option value="Cardiology">
                    Cardiology
                  </option>

                  <option value="Dermatology">
                    Dermatology
                  </option>

                  <option value="Orthopedics">
                    Orthopedics
                  </option>

                  <option value="Pediatrics">
                    Pediatrics
                  </option>

                  <option value="Neurology">
                    Neurology
                  </option>

                </select>

              </div>


              <div className="form-field">

                <label>
                  Doctor
                </label>

                <div className="form-input-wrapper">

                  <Users size={14} />

                  <select
                    name="doctor"
                    value={formData.doctor}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select doctor
                    </option>

                    <option value="Dr. Ananya Sharma">
                      Dr. Ananya Sharma
                    </option>

                    <option value="Dr. Vikram Rao">
                      Dr. Vikram Rao
                    </option>

                    <option value="Dr. Meera Nair">
                      Dr. Meera Nair
                    </option>

                    <option value="Dr. Kiran Reddy">
                      Dr. Kiran Reddy
                    </option>

                    <option value="Dr. Neha Kapoor">
                      Dr. Neha Kapoor
                    </option>

                  </select>

                </div>

              </div>


              <div className="form-field">

                <label>
                  Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Active">
                    Active
                  </option>

                  <option value="Inactive">
                    Inactive
                  </option>

                </select>

              </div>

            </div>

          </div>


          {/* Footer */}

          <div className="add-patient-footer">

            <button
              type="button"
              className="patient-cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="patient-submit-btn"
            >
              <UserPlus size={15} />
              Add Patient
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddPatient;