import React, { useState, useEffect, useRef } from 'react';
import './Input.css';

function Input({ label, focus }) {
  const maxlength = 25;
  const [counter, setCounter] = useState(0);
  const inputRef = useRef();

  function handleInputChange(e) {
    setCounter(e.target.value.length);
  }

  useEffect(() => {
    if (inputRef.current && focus) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  return (
    <div className="input">
      <input
        ref={inputRef}
        id="input"
        name="input"
        type="text"
        spellcheck="false"
        maxlength={25}
        placeholder="placeholder"
        required
        onChange={handleInputChange}
      />
      <label for="input">{label}</label>
      <span className="input__counter">{`${counter} / ${maxlength}`}</span>
    </div>
  );
}

export default Input;
