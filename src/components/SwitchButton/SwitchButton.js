import React from "react";

function SwitchButton(props) {
  return (
    <input
      type="button"
      value={props.position === "next" ? ">" : "<"}
      data-position={props.position}
      onClick={props.switch}
    />
  );
}

export default SwitchButton;
