import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import "./CalendarView.css";

function CalendarView() {
  return (
    <div className="calendar-view">

      <div className="calendar-toolbar">

        <div className="calendar-month">
          <button className="calendar-nav-btn">
            <ChevronLeft size={18} />
          </button>

          <h2>October 2026</h2>

          <button className="calendar-nav-btn">
            <ChevronRight size={18} />
          </button>
        </div>

        <button className="calendar-today-btn">
          Today
        </button>

      </div>


      <div className="calendar-weekdays">
        <span>Sun</span>
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
      </div>


      <div className="calendar-grid">

        <div className="calendar-day muted">27</div>
        <div className="calendar-day muted">28</div>
        <div className="calendar-day muted">29</div>
        <div className="calendar-day muted">30</div>

        <div className="calendar-day">1</div>
        <div className="calendar-day">2</div>
        <div className="calendar-day">3</div>

        <div className="calendar-day">4</div>
        <div className="calendar-day">5</div>
        <div className="calendar-day">6</div>
        <div className="calendar-day">7</div>
        <div className="calendar-day">8</div>
        <div className="calendar-day">9</div>
        <div className="calendar-day">10</div>

        <div className="calendar-day">11</div>
        <div className="calendar-day">12</div>
        <div className="calendar-day">13</div>
        <div className="calendar-day">14</div>
        <div className="calendar-day">15</div>
        <div className="calendar-day">16</div>
        <div className="calendar-day">17</div>

        <div className="calendar-day">18</div>
        <div className="calendar-day">19</div>
        <div className="calendar-day">20</div>
        <div className="calendar-day">21</div>
        <div className="calendar-day">22</div>
        <div className="calendar-day">23</div>
        <div className="calendar-day">24</div>

        <div className="calendar-day">25</div>
        <div className="calendar-day">26</div>
        <div className="calendar-day">27</div>
        <div className="calendar-day">28</div>
        <div className="calendar-day">29</div>
        <div className="calendar-day">30</div>
        <div className="calendar-day">31</div>

        <div className="calendar-day muted">1</div>
        <div className="calendar-day muted">2</div>
        <div className="calendar-day muted">3</div>
        <div className="calendar-day muted">4</div>
        <div className="calendar-day muted">5</div>
        <div className="calendar-day muted">6</div>
        <div className="calendar-day muted">7</div>

      </div>

    </div>
  );
}

export default CalendarView;
