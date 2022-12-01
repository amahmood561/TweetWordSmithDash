import React from 'react';
import './Toggle.css';

function Toggle({ bgColor, color, checked, toggleChecked }) {
  const translateX = checked ? '100%' : '0%';
  color = checked ? color : 'rgb(250, 250, 250)';
  bgColor = checked ? bgColor : 'rgb(147, 147, 147)';

  return (
    <div className="toggle" onClick={() => toggleChecked()}>
      <div
        className="toggle__curtain"
        style={{ backgroundColor: `${bgColor}` }}
      ></div>
      <div
        className="toggle__circle"
        style={{
          backgroundColor: ` ${color}`,
          transform: `translateX(${translateX})`,
        }}
      ></div>
    </div>
  );
}

export default Toggle;
