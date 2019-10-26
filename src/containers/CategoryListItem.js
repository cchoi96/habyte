import React from "react";

const CategoryListItem = ({
  categoryName,
  categoryImg,
  setMode,
  className
}) => {
  return (
    <li className={className} onClick={() => setMode(categoryName)}>
      <p className="categoryName">{categoryName}</p>
      <img src={categoryImg} alt={categoryName} />
    </li>
  );
};

export default CategoryListItem;
