import "./Calendar.css";

import CalendarView from "../components/Calendar/CalendarView";

function Calendar() {
  return (
    <div className="calendar-page">
      <div className="calendar-page-heading">
        <div>
          <h2>Calendar</h2>
          <p>
            Manage and view your hospital appointments.
          </p>
        </div>
      </div>

      <CalendarView />
    </div>
  );
}

export default Calendar;
