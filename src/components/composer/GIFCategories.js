import React from 'react';
import './GIFCategories.css';

function GIFCategories({ categories, itemClick }) {
  if (!categories) return null;
  function generateCategories() {
    const items = categories.map((category, index) => {
      try {
        return (
          <div
            key={index}
            className="gifcategories__item"
            onClick={() => itemClick(category)}
          >
            <img
              src={category.image}
              alt={category.searchterm}
              className="gifcategories__image"
            />
            <span className="gifcategories__itemTitle">
              {category.searchterm}
            </span>
          </div>
        );
      } catch (error) {
        console.log(error);
        return null;
      }
    });

    return items.filter((item) => item !== null);
  }

  return <div className="gifcategories">{generateCategories()}</div>;
}

export default GIFCategories;
