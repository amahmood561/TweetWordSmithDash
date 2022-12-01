import React from 'react';
import './ComposerToolbar.css';
import ComposerToolbarItem from './ComposerToolbarItem';
import ProgressRing from './ProgressRing';

import ImageIcon from '../icons/ImageIcon';
import GIFIcon from '../icons/GIFIcon';
import PollIcon from '../icons/PollIcon';
import SmileyIcon from '../icons/SmileyIcon';
import CalenderIcon from '../icons/CalenderIcon';
import MapPinIcon from '../icons/MapPinIcon';
import PlusIcon from '../icons/PlusIcon';

function ComposerToolbar({
  enabledState,
  uploadMedia,
  toggleModal,
  togglePoll,
}) {
  function handleUpload(e) {
    const files = e.target?.files;

    if (!files || files.length === 0) return;
    uploadMedia([...files]);
  }

  return (
    <div className="composer__toolbar">
      <div className="composer_options">
        <ComposerToolbarItem enabled={enabledState.upload}>
          <label className="composer__label" htmlFor="file-input">
            <ImageIcon />
          </label>
          <input
            id="file-input"
            style={{ display: 'none' }}
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/quicktime,video/webm"
            onChange={handleUpload}
          />
        </ComposerToolbarItem>
        <ComposerToolbarItem
          enabled={enabledState.gif}
          onClick={() => toggleModal()}
        >
          <GIFIcon />
        </ComposerToolbarItem>
        <ComposerToolbarItem enabled={enabledState.poll} onClick={togglePoll}>
          <PollIcon />
        </ComposerToolbarItem>
        <ComposerToolbarItem enabled={enabledState.emoji}>
          <SmileyIcon />
        </ComposerToolbarItem>
        <ComposerToolbarItem enabled={enabledState.schedule}>
          <CalenderIcon />
        </ComposerToolbarItem>
        <ComposerToolbarItem enabled={enabledState.location}>
          <MapPinIcon />
        </ComposerToolbarItem>
      </div>
      <div className="composer_toolbarRight">
        <div className="composer_progressRing">
          <ProgressRing
            radius={15}
            strokeWidth={2}
            strokeColor="#EFF3F4"
            percent={20}
            color="#1D9BF0"
          />
        </div>
        <div className="composer__lineVert"></div>
        <a href="/" className="composer__addTweet">
          <PlusIcon />
        </a>
        <a href="/" className="composer__tweet">
          Tweet
        </a>
      </div>
    </div>
  );
}

export default ComposerToolbar;
