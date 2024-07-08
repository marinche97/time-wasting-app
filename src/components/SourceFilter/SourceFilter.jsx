import React, { useState } from "react";

const SourceFilter = ({ onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState("all");

  const handleFilterChange = (e) => {
    const filter = e.target.value;
    setActiveFilter(filter);
    onFilterChange(filter);
  };

  return (
    <div className="source-filter">
      <select value={activeFilter} onChange={handleFilterChange}>
        <option value="all">Svi izvori</option>
        <option value="auto">auto</option>
        <option value="Discord">Discord</option>
        <option value="mobitel">mobitel</option>
        <option value="ostalo">ostalo</option>
      </select>
    </div>
  );
};
export default SourceFilter;
