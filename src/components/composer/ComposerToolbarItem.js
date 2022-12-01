import React from 'react';
import './ComposerToolbarItem.css';

function ComposerToolbarItem({ children, enabled, onClick }) {
  let itemClass = 'composer__option';
  itemClass += !enabled ? ' composer__option-disabled' : '';

  function handleClick() {
    if (!onClick) return;
    onClick();
  }

  return (
    <div className={itemClass} onClick={handleClick}>
      {children}
    </div>
  );
}

export default ComposerToolbarItem;
