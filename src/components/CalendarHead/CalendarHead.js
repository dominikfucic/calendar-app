import React from "react";
import "./CalendarHead.css";

function CalendarHead(props) {
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return (
    <thead>
      <tr>
        {weekDays.map((day, index) => (
          <td key={day}>{day}</td>
        ))}
      </tr>
    </thead>
  );
}

export default CalendarHead;
