import React from "react";

const CategoryListItem = ({
  categoryName,
  categoryImg,
  setMode,
  className
}) => {
  return (
    <li className={className} onClick={() => setMode(categoryName)}>
      <img src={categoryImg} alt={categoryName} />
      <p className="categoryName">{`${categoryName[0].toUpperCase()}${categoryName.slice(
        1
      )}`}</p>
    </li>
  );
};

export default CategoryListItem;
