import React, { useEffect, useState } from 'react';
import './GIFModal.css';
import { getCategories, search, get } from './tenor';
import GIFCategories from './GIFCategories';
import GIFList from './GIFList';

import CloseIcon from '../icons/CloseIcon';
import BackArrow from '../icons/BackArrow';
import SearchIcon from '../icons/SearchIcon';

function GIFModal({ toggleModal }) {
  const defaultPlaceholder = 'Search for GIFs';
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState([]);
  const [showCategories, setShowCategories] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = React.createRef();

  async function handleInputChange(term, path = '') {
    setSearchTerm(term);
    if (term !== '') {
      setCurrentCategory([]);
      setShowCategories(false);
      // search
      let response;

      if (path) {
        response = await get(path);
      } else {
        //@ts-ignore
        response = await search(term?.target?.value);
      }
      setCurrentCategory(response?.results);
    } else {
      setCurrentCategory([]);
      setShowCategories(true);
    }
  }

  async function handleGIFClick(gif) {
    toggleModal(gif);
  }

  function handleModalButtonClick() {
    if (showCategories) {
      toggleModal();
    } else {
      setShowCategories(!showCategories);
      //setsearchPlaceholder(defaultPlaceholder);
      if (inputRef.current !== null) {
        inputRef.current.focus();
      }
    }
  }

  useEffect(() => {
    async function getData() {
      const response = await getCategories();
      setCategories(response);
    }
    getData();
  }, []);

  useEffect(() => {
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  let content;
  if (showCategories) {
    content = (
      <GIFCategories
        categories={categories}
        itemClick={(item) => handleInputChange(item?.searchterm, item?.path)}
      />
    );
  } else {
    content = <GIFList items={currentCategory} itemClick={handleGIFClick} />;
  }

  return (
    <div className="gifmodal">
      <div className="gifmodal__dismiss" onClick={() => toggleModal()}></div>
      <div className="gifmodal__card">
        <div className="gifmodal__cardInner">
          <div className="gifmodal__header">
            <button
              className="gifmodal__button"
              onClick={() => handleModalButtonClick()}
            >
              {showCategories ? <CloseIcon /> : <BackArrow />}
            </button>
            <div className="gifmodal__search">
              <input
                ref={inputRef}
                type="text"
                className="gifmodal__input"
                spellchecker="true"
                placeholder={searchTerm ? searchTerm : defaultPlaceholder}
                value={searchTerm}
                onChange={(e) => handleInputChange(e.target.value)}
              />
              <div className="gifmodal_searchIcon">
                <SearchIcon />
              </div>
              <label className="gifmodal__label">
                <div className="gifmodal__labelInner">
                  <SearchIcon />
                  <span>{searchTerm ? searchTerm : defaultPlaceholder}</span>
                </div>
              </label>
            </div>
          </div>
          <div className="giflist">{content}</div>
        </div>
      </div>
    </div>
  );
}

export default GIFModal;
