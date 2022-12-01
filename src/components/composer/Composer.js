import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { fileTypes, fileOrigin } from './constants';
import './Composer.css';

import ComposerMediaList from './ComposerMediaList';
import ComposerToolbar from './ComposerToolbar';
import Poll from './poll/Poll';
import GIFModal from './GIFModal';

function Composer() {
  const maxFiles = 4;
  const [files, setFiles] = useState([]);
  const [hasMedia, setHasMedia] = useState(false);
  const [gifModalOpen, setGifModalOpen] = useState(false);
  const [showPoll, setShowPoll] = useState(false);

  const defaultToolbarEnabledState = {
    upload: true,
    gif: true,
    poll: true,
    emoji: true,
    schedule: true,
    location: false,
  };

  const [toolbarEnabledState, setToolbarEnabledState] = useState(
    defaultToolbarEnabledState
  );

  function togglePoll() {
    setShowPoll(!showPoll);

    if (showPoll) {
      setToolbarEnabledState(defaultToolbarEnabledState);
    } else {
      const toolbarState = Object.assign({}, toolbarEnabledState);

      toolbarState.upload = false;
      toolbarState.gif = false;
      toolbarState.poll = false;
      toolbarState.emoji = true;
      toolbarState.schedule = false;
      toolbarState.location = false;

      setToolbarEnabledState(toolbarState);
    }
  }

  function loadFile(id, type, item, imgUrl, origin, url = null) {
    return {
      id,
      imgUrl,
      item,
      type,
      origin,
      url,
      canEdit: type === fileTypes.image,
    };
  }

  function toggleGIFModal(item = null) {
    setGifModalOpen(!gifModalOpen);
    if (item) {
      const file = loadFile(
        item.id,
        fileTypes.gif,
        item,
        item?.media[0]?.gif?.preview,
        fileOrigin.web,
        item.itemurl
      );
      setFiles([file]);
    }
  }

  function handleUpload(items) {
    let itemsToAdd = [];
    let freeSlots = maxFiles - files.length;

    if (freeSlots === 0) return;

    if (items.length > freeSlots) {
      itemsToAdd = items.slice(0, freeSlots);
    } else {
      itemsToAdd = items;
    }

    itemsToAdd = itemsToAdd.map((item) => {
      try {
        return loadFile(
          uuidv4(),
          fileTypes.image,
          item,
          URL.createObjectURL(item),
          fileOrigin.local
        );
      } catch (error) {
        console.log(error);
      }
    });

    itemsToAdd = itemsToAdd.filter((c) => c);
    setFiles(files.concat(itemsToAdd));
  }

  function handleRemoveItem(id) {
    const myFiles = [...files];
    const index = myFiles.findIndex((c) => c.id == id);
    if (index < 0) return;
    myFiles.splice(index, 1);
    setFiles(myFiles);
  }

  useEffect(() => {
    setHasMedia(files && files.length > 0);
    let enabledState = Object.assign({}, toolbarEnabledState);
    enabledState.upload = files && files.length < maxFiles;

    if (files.some((c) => c.type === fileTypes.image)) {
      enabledState.gif = false;
      enabledState.poll = false;
    } else if (files.some((c) => c.type === fileTypes.gif)) {
      enabledState.upload = false;
      enabledState.gif = false;
      enabledState.poll = false;
    } else {
      enabledState = defaultToolbarEnabledState;
    }

    setToolbarEnabledState(enabledState);
  }, [files]);

  return (
    <div className="composer">
      <div className="composer__inner">
        <a href="/" className="composer__profileLink">
          <div className="composer__avatar">
            <img
              className="composer__image"
              src="https://randomuser.me/api/portraits/med/women/6.jpg"
              alt=""
            />
          </div>
        </a>
        <div className="composer__editor">
          <div className="composer__textarea">
            <div
              className="composer__input"
              contentEditable="true"
              data-placeholder="What's happening?"
              spellchecker="true"
            ></div>
          </div>
          <div className="composer__media">
            <ComposerMediaList
              files={files}
              hasMedia={hasMedia}
              removeItem={handleRemoveItem}
            />
          </div>
          {showPoll && <Poll removePoll={togglePoll} />}
          <ComposerToolbar
            enabledState={toolbarEnabledState}
            uploadMedia={handleUpload}
            toggleModal={toggleGIFModal}
            togglePoll={togglePoll}
          />
        </div>
      </div>

      {/* Modals */}
      {gifModalOpen && (
        <div className="gifmodal__container">
          <GIFModal toggleModal={toggleGIFModal} />
        </div>
      )}
    </div>
  );
}

export default Composer;
