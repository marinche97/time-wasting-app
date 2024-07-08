import React, { useState, useEffect } from "react";
import SourceInput from "../SourceInput/SourceInput";
import "./AddEntryForm.css";
import MyTimePicker from "../TimePicker/TimePicker";

const AddEntryForm = ({ addEntry }) => {
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}-`;
  };

  const [date, setDate] = useState("");
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [source, setSource] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalHours = hours + minutes / 60;

    addEntry({
      date: date,
      hours: totalHours.toFixed(1),
      source: source || "Nepoznato",
    });

    setDate(getCurrentDate());
    setHours(hours);
    setMinutes(minutes);
    setSource("");
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="date-label">
        Datum:
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="date-input"
          required
        />
      </div>
      <div className="time-label">
        Vrijeme:
        <div className="time-input-container">
          <MyTimePicker
            hours={hours}
            minutes={minutes}
            setHours={setHours}
            setMinutes={setMinutes}
          />
        </div>
      </div>
      <div className="source-label">
        Izvor:
        <div className="source-input-container">
          <SourceInput source={source} setSource={setSource} />
        </div>
      </div>
      <button type="submit" className="submit-button">
        Dodaj
      </button>
    </form>
  );
};

export default AddEntryForm;
