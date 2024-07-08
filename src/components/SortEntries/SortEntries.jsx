import React, { useState } from "react";

const SortEntries = ({ onSortChange }) => {
  const [activeSort, setActiveSort] = useState("date-asc");

  const handleSortChange = (e) => {
    const sort = e.target.value;
    setActiveSort(sort);
    onSortChange(sort);
  };

  return (
    <div className="sort-entries">
      <select value={activeSort} onChange={handleSortChange}>
        <option value="date-asc">Datum (najstariji)</option>
        <option value="date-desc">Datum (najnoviji)</option>
        <option value="hours-asc">Sati (najmanje)</option>
        <option value="hours-desc">Sati (najviše)</option>
      </select>
    </div>
  );
};

export default SortEntries;
