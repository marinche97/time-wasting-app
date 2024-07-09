import React, { useState, useEffect } from "react";
import AddEntryForm from "./components/AddEntryForm/AddEntryForm";
import EntryList from "./components/EntryList/EntryList";
import TotalHours from "./components/TotalHours/TotalHours";
import "./App.css";
import { db, entriesRef } from "./components/firebase";
import { push, set, onValue, ref, remove } from "firebase/database";

const App = () => {
  const [entries, setEntries] = useState([]);
  const [totalHours, setTotalHours] = useState(0); // State for total hours

  const addEntry = (entry) => {
    const newEntries = [...entries, entry];
    setEntries(newEntries);
    // setTotalHours((prevTotal) => prevTotal + parseFloat(entry.hours)); // No need to update totalHours here
  };

  const deleteEntry = (index) => {
    const deletedEntry = entries[index];
    setEntries(
      entries.filter((entry, i) => {
        return i !== index;
      })
    );
    // setTotalHours((prevTotal) => prevTotal - parseFloat(deletedEntry.hours)); // No need to update totalHours here
  };

  useEffect(() => {
    const unsubscribe = onValue(entriesRef, (snapshot) => {
      const entriesData = snapshot.val();
      if (entriesData) {
        const entries = Object.entries(entriesData).map(([key, value]) => ({
          id: key,
          ...value,
        }));
        setEntries(entries);
      } else {
        setEntries([]);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setTotalHours(calculateTotalHours());
  }, [entries]);

  const calculateTotalHours = () => {
    return entries
      .reduce((total, entry) => total + parseFloat(entry.hours), 0)
      .toFixed(1);
  };

  return (
    <div className="App">
      <TotalHours totalHours={totalHours} />
      <div className="form-container">
        <AddEntryForm addEntry={addEntry} />
      </div>
      <hr className="hr"></hr>
      <EntryList entries={entries} deleteEntry={deleteEntry} />
    </div>
  );
};

export default App;
