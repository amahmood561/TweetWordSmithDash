import React, { useEffect, useState, useRef } from 'react';
import './ComposerMediaList.css';
import ComposerMedia from './ComposerMedia';
import { fileTypes } from './constants';

import PersonIcon from '../icons/PersonIcon';
import DocumentIcon from '../icons/DocumentIcon';

function ComposerMediaList({ files, hasMedia, removeItem }) {
  const containerRef = useRef();
  //const [items, setItems] = useState([]);
  const [content, setContent] = useState(null);
  const [gifLink, setGifLink] = useState();
  const [canTag, setCanTag] = useState(true);

  function getItem(item, style) {
    if (!item) return null;

    return (
      <ComposerMedia
        key={item.id}
        item={item}
        style={style}
        remove={removeItem}
      />
    );
  }

  function makeGrid(length) {
    let grid = {
      columns: 'auto',
      rows: '100%',
    };

    if (length === 2) {
      grid.columns = '1.1fr 1.1fr';
      grid.rows = '0.8fr';
    } else if (length === 3 || length === 4) {
      grid.columns = '1.3fr 1.3fr';
      grid.rows = '0.5fr 0.5fr';
    }

    return grid;
  }

  function makeItemStyle(length, index) {
    const itemStyle = {
      gridRow: 1,
      gridColumn: 1,
      height: '100%',
      width: '100%',
    };

    if (length === 2) {
      if (index === 0) {
        itemStyle.gridColumn = '1';
        itemStyle.gridRow = '1';
      } else {
        itemStyle.gridColumn = '2';
        itemStyle.gridRow = '1';
      }
    } else if (length === 3) {
      if (index === 0) {
        itemStyle.gridColumn = '1';
        itemStyle.gridRow = '1 / span 2';
      } else {
        itemStyle.gridRow = index === 1 ? '1' : '2';
        itemStyle.gridColumn = '2';
      }
    } else if (length === 4) {
      if (index === 0 || index === 1) {
        itemStyle.gridColumn = index === 0 ? '1' : '2';
        itemStyle.gridRow = '1';
      } else {
        itemStyle.gridColumn = index === 2 ? '1' : '2';
        itemStyle.gridRow = '2';
      }
    }

    return itemStyle;
  }

  function generateMediaContainer(items) {
    let mediaContent = '';
    let length = items.length;

    const grid = makeGrid(length);
    const style = {
      display: 'grid',
      gridTemplateColumns: grid.columns,
      gridTemplateRows: grid.rows,
      gridRowGap: 11,
      gridColumnGap: 11,
    };

    let content = items.map((item, index) => {
      return getItem(item, makeItemStyle(length, index));
    });

    mediaContent = (
      <div className="composermedialist__container" style={style}>
        {content}
      </div>
    );
    setContent(mediaContent);
  }

  useEffect(() => {
    generateMediaContainer(files);
    const gif = files.find((c) => c.type === fileTypes.gif);
    setCanTag(gif !== null && gif !== undefined);
    setGifLink(gif?.url);
  }, [files]);

  return (
    <div className="composermedialist" ref={containerRef}>
      <div className="composermedialist__content">{content}</div>
      {hasMedia && (
        <div className="composermedialist__options">
          {gifLink && (
            <div className="composermedialist__option composermedialist__giphy">
              <span>via</span>
              <img
                src="https://www.dropbox.com/sh/v4xiymx32m3k0if/AAB5AhLZBBPtdJ62ZwnGFRFYa?dl=0"
                alt=""
              />
              <a href={gifLink}>GIPHY</a>
            </div>
          )}
          {canTag && (
            <a href="/" className="composermedialist__option">
              <PersonIcon />
              <span>Tag people</span>
            </a>
          )}
          <a href="/" className="composermedialist__option">
            <DocumentIcon />
            <span>Add description</span>
          </a>
        </div>
      )}
    </div>
  );
}

export default ComposerMediaList;
