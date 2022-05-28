import React, { useContext, useEffect, useState } from "react";
import {
  getDaysInMonth,
  getYear,
  getMonth,
  formatISO,
  parseISO,
  format,
} from "date-fns";
import { DateContext } from "../../App";
import { ModalContext } from "../../App";
import "./CalendarBody.css";

function CalendarBody(props) {
  const [commits, setCommits] = useState([]);
  const { date, setDate } = useContext(DateContext);
  const { modalOpen, setModalOpen } = useContext(ModalContext);

  let days = 0;
  let daysInMonth = getDaysInMonth(date);

  const firstDayOfTheMonth = () => {
    const newDate = new Date(getYear(date), getMonth(date), 1);
    return newDate;
  };

  const lastDayOfTheMonth = () => {
    const newDate = new Date(
      getYear(date),
      getMonth(date),
      getDaysInMonth(date)
    );
    return newDate;
  };

  useEffect(() => {
    let firstDay = formatISO(firstDayOfTheMonth(), { representation: "date" });
    let lastDay = formatISO(lastDayOfTheMonth(), { representation: "date" });

    const params = new URLSearchParams({
      sha: "main",
      since: firstDay,
      until: lastDay,
    }).toString();

    fetch("https://api.github.com/repos/facebook/react/commits?" + params)
      .then((res) => res.json())
      .then((json) => setCommits(json));
  }, [date]);

  return (
    <tbody>
      {[...Array(6)].map((x, i) => {
        return (
          <tr key={`week-${i}`}>
            {[...Array(7)].map((x, j) => {
              if (i === 0 && j < firstDayOfTheMonth().getDay()) {
                return <td key={`first-week-cell-${j}`}></td>;
              } else {
                while (days < daysInMonth) {
                  days++;
                  const currentDate = formatISO(
                    new Date(getYear(date), getMonth(date), days),
                    { representation: "date" }
                  );

                  const commit = commits.find((elm) => {
                    const parsedDate = parseISO(elm.commit.author.date);
                    const formattedDate = formatISO(parsedDate, {
                      representation: "date",
                    });
                    return currentDate === formattedDate;
                  });

                  return (
                    <td key={`day-${days}`}>
                      <div className="calendar-day-container">
                        <div className="calendar-day">{days}</div>
                        {commit && (
                          <div
                            className="calendar-event"
                            onClick={() => setModalOpen(commit)}
                          >
                            <div className="calendar-event-name">
                              {commit.commit.message}
                            </div>
                            <div className="calendar-event-time">
                              {format(
                                parseISO(commit.commit.author.date),
                                "k:mm"
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  );
                }
              }
              return <td key={`last-week-cell-${j}`}></td>;
            })}
          </tr>
        );
      })}
    </tbody>
  );
}

export default CalendarBody;
