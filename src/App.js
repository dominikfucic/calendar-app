import logo from "./logo.svg";
import "./App.css";
import {
  format,
  getDaysInMonth,
  getWeeksInMonth,
  sub,
  add,
  getYear,
  getMonth,
} from "date-fns";
import React, { useEffect, useState } from "react";

function App() {
  const [date, setDate] = useState(new Date());
  const [days, setDays] = useState([]);
  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const formattedCurrentDate = format(date, "MMMM yyyy");

  useEffect(() => {
    renderDays();
    console.log(days);
  }, [date]);

  const renderDays = () => {
    const daysInMonth = getDaysInMonth(date);
    const days = [];
    let firstDayOfTheMonth = new Date(
      getYear(date),
      getMonth(date),
      1
    ).getDay();
    console.log(firstDayOfTheMonth);

    // for (let i = 1; i < firstDayOfTheMonth; i++) {
    //   days.push("");
    // }

    while (firstDayOfTheMonth < weekDays.length) {
      days.push("");
      break;
    }

    for (let i = 1; i < daysInMonth; i++) {
      days.push(i);
    }
    return setDays(days);
  };

  const switchMonth = (event) => {
    const sequence = event.currentTarget.dataset.sequence;
    if (sequence === "previous") {
      setDate((prevDate) => {
        return sub(prevDate, { months: 1 });
      });
    }
    if (sequence === "next") {
      setDate((prevDate) => {
        return add(prevDate, { months: 1 });
      });
    }
  };

  return (
    <div className="App">
      <div className="calendar__header">
        <h1>{formattedCurrentDate}</h1>
        <div className="calendar__header__buttons">
          <input
            type="button"
            value="<"
            data-sequence="previous"
            onClick={switchMonth}
          />
          <input
            type="button"
            value=">"
            data-sequence="next"
            onClick={switchMonth}
          />
        </div>
      </div>

      <div className="grid__container">
        <div className="grid__header">
          {weekDays.map((day) => (
            <div className="grid__header__item">{day}</div>
          ))}
        </div>
        {/* {days.map((day) => (
          <div className="grid__day">{day}</div>
        ))} */}
        {[...Array(42)].map((day, index) => {
          let firstDayOfTheMonth = new Date(
            getYear(date),
            getMonth(date),
            1
          ).getDay();
          if (firstDayOfTheMonth < 0) return <div className="grid__day"></div>;
          return <div className="grid__day">{index}</div>;
        })}
      </div>
    </div>
  );
}

export default App;
