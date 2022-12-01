import React, { useState } from 'react';
import './GIFList.css';
import Toggle from './Toggle';

function GIFList({ items, itemClick }) {
  const [autoplay, setAutoplay] = useState(true);

  function handleToggleAutoplay() {
    setAutoplay(!autoplay);
  }

  function generateItems() {
    items = items.filter((item) => item);

    const gifs = items.map((item) => {
      try {
        const src = autoplay
          ? item?.media[0]?.gif?.url
          : item?.media[0]?.gif?.preview;

        return (
          <div
            key={item.id}
            className="giflist__item"
            onClick={() => itemClick(item)}
          >
            <img
              className="giflist__image"
              src={src}
              alt={item.content_description}
            />
          </div>
        );
      } catch (error) {
        console.log(error);
        return null;
      }
    });

    return gifs.filter((gif) => gif !== null);
  }

  return (
    <div className="giflist">
      <div className="giflist__autoplay">
        <h2 className="giflist__autoplayTitle">Auto-play GIFs</h2>
        <div className="giflist__autoplayToggle">
          <Toggle
            bgColor="rgb(107, 201, 251)"
            color="rgb(29, 155, 240)"
            checked={autoplay}
            toggleChecked={handleToggleAutoplay}
          />
        </div>
      </div>
      <div className="giflist__list">{generateItems()}</div>
    </div>
  );
}

export default GIFList;
