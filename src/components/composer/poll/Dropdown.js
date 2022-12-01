import React, { useState, useEffect } from 'react';
import './Dropdown.css';

import ChevDown from '../../icons/ChevDown';

function Dropdown({ label, options }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(
      options.map((option, index) => {
        return (
          <option key={index} value={option}>
            {option}
          </option>
        );
      })
    );
  }, []);

  return (
    <div className="dropdown">
      <select className="dropdown__select" name="select" id="options">
        {items}
      </select>
      <label className="dropdown__label" for="options">
        {label}
      </label>
      <ChevDown />
      <div className="dropdown__border"></div>
    </div>
  );
}

export default Dropdown;
