import React, { useState } from "react";
import AddEntryForm from "./components/AddEntryForm/AddEntryForm";
import EntryList from "./components/EntryList/EntryList";
import SourceFilter from "./components/SourceFilter/SourceFilter";
import SortEntries from "./components/SortEntries/SortEntries";
import TotalHours from "./components/TotalHours/TotalHours";
import "./App.css";

const App = () => {
  const [entries, setEntries] = useState([]);

  const addEntry = (entry) => {
    const newEntries = [...entries, entry];
    setEntries(newEntries);
  };

  const getTotalHours = () => {
    let totalHours = 0;
    for (let i = 0; i < entries.length; i++) {
      totalHours += parseFloat(entries[i].hours);
    }
    return totalHours.toFixed(1);
  };

  const deleteEntry = (index) => {
    setEntries(
      entries.filter((entry, i) => {
        return i !== index;
      })
    );
  };

  return (
    <div className="App">
      <TotalHours totalHours={getTotalHours()}></TotalHours>
      <div className="form-container">
        <AddEntryForm addEntry={addEntry} />
      </div>
      <hr className="hr"></hr>
      <EntryList entries={entries} deleteEntry={deleteEntry} />
    </div>
  );
};

export default App;
