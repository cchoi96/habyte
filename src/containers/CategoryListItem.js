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
      <p className="categoryName">{categoryName.toUpperCase()}</p>
    </li>
  );
};

export default CategoryListItem;
