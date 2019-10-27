import React from "react";

const CategoryListItem = ({ categoryName, categoryImg, className }) => {
  return (
    <li className={className}>
      <p className="categoryName">{categoryName}</p>
      <img src={categoryImg} alt={categoryName} />
    </li>
  );
};

export default CategoryListItem;
