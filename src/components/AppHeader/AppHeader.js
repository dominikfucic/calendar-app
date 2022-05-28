import React, { useContext } from "react";
import { format, sub, add } from "date-fns";
import SwitchButton from "../SwitchButton/SwitchButton";
import { DateContext } from "../../App";

function AppHeader(props) {
  const { date, setDate } = useContext(DateContext);
  const formattedDate = format(date, "MMMM yyyy");

  const switchMonth = (event) => {
    const position = event.currentTarget.dataset.position;
    if (position === "previous") {
      setDate((prevDate) => {
        return sub(prevDate, { months: 1 });
      });
    }
    if (position === "next") {
      setDate((prevDate) => {
        return add(prevDate, { months: 1 });
      });
    }
  };
  return (
    <div className="calendar-header">
      <h1>{formattedDate}</h1>
      <div className="btn-container">
        <SwitchButton switch={switchMonth} position="previous" />
        <SwitchButton switch={switchMonth} position="next" />
      </div>
    </div>
  );
}

export default AppHeader;
