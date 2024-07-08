import React, { useState, useEffect, useRef } from "react";

import { TimePicker } from "react-ios-time-picker";
import "./TimePicker.css";

const MyTimePicker = ({ hours, minutes, setHours, setMinutes, reset }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onChange = (timeValue) => {
    const [selectedHours, selectedMinutes] = timeValue.split(":").map(Number);
    setHours(selectedHours);
    setMinutes(selectedMinutes);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    const container = document.querySelector(
      ".react-ios-time-picker-container"
    );
    if (container && !container.contains(event.target)) {
      handleClose();
    }
  };

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (isOpen) {
        handleClickOutside(event);
      }
    };

    if (isOpen) {
      document.body.classList.add("no-scroll");
      document.addEventListener("mousedown", handleDocumentClick);
    } else {
      document.body.classList.remove("no-scroll");
      document.removeEventListener("mousedown", handleDocumentClick);
    }

    return () => {
      document.body.classList.remove("no-scroll");
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, [isOpen]);

  return (
    <div className="time-picker-container">
      <TimePicker
        onChange={onChange}
        value={`${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}`}
        isOpen={isOpen}
        onOpen={handleOpen}
        onClose={handleClose}
        onSave={handleClose}
        onCancel={handleClose}
        className="react-ios-time-picker-container"
      />
    </div>
  );
};

export default MyTimePicker;
