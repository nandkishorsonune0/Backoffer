import React from 'react';

const Filter = ({ options, onChange }) => {
  return (
    <div className="filter-container">
      <label>{options.label}</label>
      <select onChange={onChange}>
        <option value="">All</option>
        {options.values.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
