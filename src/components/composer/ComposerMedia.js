import React, { useState } from 'react';
import './ComposerMedia.css';
import { fileTypes } from './constants';

import CloseIcon from '../icons/CloseIcon';
import PlayIcon from '../icons/PlayIcon';
import PaintBrushIcon from '../icons/PaintBrushIcon';

function ComposerMedia({ item, style, remove }) {
  const { id, imgUrl, type, canEdit } = item;
  const [isPlaying, setIsPlaying] = useState(false);
  const [src, setSrc] = useState(imgUrl);

  function handleContainerClick() {
    if (isPlaying) {
      setIsPlaying(false);
      setSrc(imgUrl);
    } else {
      if (type === fileTypes.gif) {
        setIsPlaying(true);
        setSrc(item.item?.media[0]?.gif?.url);
      }
    }
  }

  return (
    <div className="composerMedia" style={style} onClick={handleContainerClick}>
      <div className="composerMedia__container">
        <button
          className="composerMedia__remove composerMedia__button"
          onClick={() => remove(id)}
        >
          <CloseIcon />
        </button>
        {canEdit && (
          <button className="composerMedia__edit composerMedia__button">
            <PaintBrushIcon />
          </button>
        )}
        <img src={src} alt="" className="composerMedia__image" />

        {/* GIF Icon */}
        {type === fileTypes.gif && <div className="gificon">GIF</div>}

        {/* Play Icon */}
        {type === fileTypes.gif && (
          <div
            className="composerMedia_play"
            style={{ display: `${isPlaying ? 'none' : 'flex'}` }}
          >
            <PlayIcon />
          </div>
        )}
      </div>
    </div>
  );
}

export default ComposerMedia;
