import { format } from "date-fns";
import { parseISO } from "date-fns/esm";
import React from "react";
import "./Modal.css";

function Modal(props) {
  if (!props.open) return null;
  const commitDate = parseISO(props.open.commit.author.date);
  return (
    <div className="modal-container">
      <div className="modal-contents">
        <p className="commit-message">
          <strong> Commit message:</strong>
          <br />
          {props.open.commit.message}
        </p>
        <p>
          <strong> Commit author:</strong>
          <br /> {props.open.commit.author.name}
        </p>
        <p>
          <strong> Commit date:</strong> <br />
          {format(commitDate, "dd.MM.yyyy")}
        </p>
        <button className="modal-button" onClick={props.onClose}>
          close
        </button>
      </div>
    </div>
  );
}

export default Modal;
