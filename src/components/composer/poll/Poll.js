import React, { useState, useEffect } from 'react';
import './Poll.css';

import Input from './Input';
import Dropdown from './Dropdown';
import PlusIcon from '../../icons/PlusIcon';

function Poll({ removePoll }) {
  const maxChoices = 4;
  const [choices, setChoices] = useState([]);

  function getRangeArray(min, max) {
    const array = [];
    for (let i = min; i <= max; i++) {
      array.push(i);
    }
    return array;
  }

  function handleAddChoice() {
    let choice = generateChoice(choices.length);
    setChoices([...choices, choice]);
  }

  function generateChoice(num) {
    return <Input label={`Choice ${num + 1}`} focus={num === 0} />;
  }

  useEffect(() => {
    const _choices = [];
    for (let i = 0; i < 2; i++) {
      _choices.push(generateChoice(i));
    }

    setChoices(_choices);
  }, []);

  return (
    <div className="poll">
      <div className="poll__choices">
        <div className="poll__choicesList">{choices}</div>
        {choices.length !== maxChoices && (
          <div className="poll__choicesAdd" onClick={handleAddChoice}>
            <PlusIcon />
          </div>
        )}
      </div>
      <div className="poll__length">
        <h2 className="poll__lengthTitle">Poll length</h2>
        <div className="poll__lengthList">
          <Dropdown label="Days" options={getRangeArray(1, 7)} />
          <Dropdown label="Hours" options={getRangeArray(0, 23)} />
          <Dropdown label="Minutes" options={getRangeArray(0, 59)} />
        </div>
      </div>
      <button className="poll__remove" onClick={removePoll}>
        Remove poll
      </button>
    </div>
  );
}

export default Poll;
