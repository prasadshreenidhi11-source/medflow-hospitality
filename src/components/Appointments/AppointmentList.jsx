import { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  CalendarCheck,
} from "lucide-react";

import AppointmentCard from "./AppointmentCard";

import "./AppointmentList.css";

function AppointmentList({ appointments }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All status");
  const [department, setDepartment] = useState("All departments");

  const departments = [
    "All departments",
    ...new Set(
      appointments.map((appointment) => appointment.department)
    ),
  ];

  const statuses = [
    "All status",
    ...new Set(
      appointments.map((appointment) => appointment.status)
    ),
  ];

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        appointment.patient
          ?.toLowerCase()
          .includes(searchValue) ||
        appointment.doctor
          ?.toLowerCase()
          .includes(searchValue) ||
        appointment.department
          ?.toLowerCase()
          .includes(searchValue) ||
        appointment.id
          ?.toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        status === "All status" ||
        appointment.status === status;

      const matchesDepartment =
        department === "All departments" ||
        appointment.department === department;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesDepartment
      );
    });
  }, [appointments, search, status, department]);

  return (
    <section className="appointment-list-section">

      {/* Header */}

      <div className="appointment-list-heading">
        <div>
          <div className="appointment-list-title">
            <h3>All appointments</h3>

            <span className="appointment-count">
              {filteredAppointments.length} appointments
            </span>
          </div>

          <p>
            View and manage scheduled hospital appointments.
          </p>
        </div>

        <div className="appointment-list-icon">
          <CalendarCheck size={17} />
        </div>
      </div>

      {/* Filters */}

      <div className="appointment-filters">

        <div className="appointment-search">
          <Search size={16} />

          <input
            type="text"
            placeholder="Search appointments..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />
        </div>

        <div className="appointment-filter">
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

        <div className="appointment-filter">

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

      {/* Appointment cards */}

      <div className="appointment-list">

        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
            />
          ))
        ) : (
          <div className="appointment-empty">

            <div className="appointment-empty-icon">
              <CalendarCheck size={20} />
            </div>

            <h4>No appointments found</h4>

            <p>
              Try changing your search or filter options.
            </p>

          </div>
        )}

      </div>

    </section>
  );
}

export default AppointmentList;