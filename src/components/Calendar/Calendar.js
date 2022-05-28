import React from "react";

import "./Calendar.css";
import CalendarHead from "../CalendarHead/CalendarHead";
import CalendarBody from "../CalendarBody/CalendarBody";

function Calendar() {
  return (
    <table>
      <CalendarHead />
      <CalendarBody />
    </table>
  );
}

export default Calendar;
