import React, { useRef, useState, useEffect } from 'react';
import './ProgressRing.css';

function ProgressRing({ radius, strokeWidth, color, strokeColor, percent }) {
  const normalizedRadius = useRef(radius - strokeWidth * 2);
  const circumference = useRef(radius * 2 * Math.PI);

  const [strokeDashoffset, setStrokeDashoffset] = useState(
    circumference.current - (percent / 100) * circumference.current
  );

  useEffect(() => {
    const offset =
      circumference.current - (percent / 100) * circumference.current;
    setStrokeDashoffset(offset);
  }, [percent]);

  return (
    <svg className="progress-ring" height={radius * 2} width={radius * 2}>
      <g strokeWidth={strokeWidth} fill="transparent">
        <circle
          stroke={strokeColor}
          r={normalizedRadius.current}
          cx="50%"
          cy="50%"
        />
        <circle
          className="progress-ring__circle"
          style={{ strokeDashoffset }}
          strokeDasharray={circumference.current + ' ' + circumference.current}
          stroke={color}
          r={normalizedRadius.current}
          cx="50%"
          cy="50%"
        />
      </g>
    </svg>
  );
}

ProgressRing.defaultProps = {
  radius: 20,
  strokeWidth: 2,
  strokeColor: 'rgb(239, 243, 244)',
  percent: 50,
  color: 'red',
};

export default ProgressRing;
