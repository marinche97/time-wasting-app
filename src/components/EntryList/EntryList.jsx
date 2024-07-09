import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { FaTimes, FaFilter } from "react-icons/fa";
import "./EntryList.css";
import { db, entriesRef } from "../firebase";
import { onValue, ref, remove } from "firebase/database";

const EntryList = ({ deleteEntry }) => {
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("date-asc");
  const [filtersVisible, setFiltersVisible] = useState(false);

  const [entries, setEntries] = useState([]);

  useEffect(() => {
    // Fetch data from Firebase when the component mounts
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

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const applyFilter = (entries) => {
    if (filter === "all") {
      return entries;
    }
    return entries.filter((entry) => {
      if (filter === "auto" || filter === "Discord" || filter === "mobitel") {
        return entry.source === filter;
      }
      return !["auto", "Discord", "mobitel"].includes(entry.source);
    });
  };

  const applySort = (entries) => {
    return entries.slice().sort((a, b) => {
      if (sort === "date-asc") {
        return new Date(a.date) - new Date(b.date);
      } else if (sort === "date-desc") {
        return new Date(b.date) - new Date(a.date);
      } else if (sort === "hours-asc") {
        return parseFloat(a.hours) - parseFloat(b.hours);
      } else if (sort === "hours-desc") {
        return parseFloat(b.hours) - parseFloat(a.hours);
      }
      return 0;
    });
  };

  const toggleFiltersVisibility = () => {
    setFiltersVisible(!filtersVisible);
  };

  const filteredEntries = applyFilter(entries);
  const sortedEntries = applySort(filteredEntries);

  const handleDeleteEntry = (entryId) => {
    setEntries(entries.filter((entry) => entry.id !== entryId));

    const entryRef = ref(db, `entries/${entryId}`); // Use entryId here
    remove(entryRef);
  };

  return (
    <div className="entry-list">
      <h2>Popis unosa</h2>
      <div className="filters-container">
        <div className={`filters ${filtersVisible ? "visible" : "hidden"}`}>
          <select
            className="sort-date"
            name="sort-date"
            value={sort}
            onChange={handleSortChange}
          >
            <option value="date-asc">Datum: od najstarijeg</option>
            <option value="date-desc">Datum: od najnovijeg</option>
          </select>
          <select
            className="sort-time"
            name="sort-time"
            value={sort}
            onChange={handleSortChange}
          >
            <option value="hours-asc">Sati: najmanje do najviše</option>
            <option value="hours-desc">Sati: najviše do najmanje</option>
          </select>
          <select
            className="filter-source"
            value={filter}
            onChange={handleFilterChange}
          >
            <option value="all">Svi izvori</option>
            <option value="auto">auto</option>
            <option value="Discord">Discord</option>
            <option value="mobitel">mobitel</option>
            <option value="other">ostalo</option>
          </select>
        </div>
      </div>
      <div className="filter-icon" onClick={toggleFiltersVisibility}>
        {" "}
        Filtriraj unose
        <FaFilter />
      </div>
      <ul className="responsive-table">
        <li className="table-header">
          <div className="col col-1">Datum</div>
          <div className="col col-2">Vrijeme (h)</div>
          <div className="col col-3">Izvor</div>
          <div className="col col-4">Ukloni</div>
        </li>
        {sortedEntries.map((entry, index) => (
          <li className="table-row" key={index}>
            <div className="col col-1" data-label="Datum">
              {dayjs(entry.date, "DD/MM/YYYY").format("DD. MM. YYYY.")}
            </div>
            <div className="col col-2" data-label="Vrijeme (h)">
              {entry.hours}
            </div>
            <div className="col col-3" data-label="Izvor">
              {entry.source}
            </div>
            <div className="col col-4" data-label="Ukloni">
              <FaTimes
                onClick={() => handleDeleteEntry(entry.id)}
                className="icon-x"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EntryList;
