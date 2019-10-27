import React, { useState } from "react";
import styled from "styled-components";
import CategoryListItem from "./CategoryListItem";
import { sortableContainer, sortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";

const SortableItem = sortableElement(({ categoryName, categoryImg }) => (
  <StyledCategoryListItem
    categoryName={categoryName}
    categoryImg={categoryImg}
  />
));

const SortableContainer = sortableContainer(({ children, className }) => {
  return <ul className={className}>{children}</ul>;
});

const CategoryList = () => {
  const categories = [
    {
      category: "coding",
      img: "/assets/other/coding_icon.png"
    },
    {
      category: "health",
      img: "/assets/other/health_icon.png"
    }
  ];

  const [categoryList, setCategoryList] = useState(categories);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setCategoryList(arrayMove(categoryList, oldIndex, newIndex));
  };

  let totalCategoryList = categoryList.map((category, index) => {
    return (
      <SortableItem
        key={category.category}
        index={index}
        categoryName={category.category}
        categoryImg={category.img}
      ></SortableItem>
    );
  });

  return (
    <StyledSortableContainer
      onSortEnd={onSortEnd}
    >
      {totalCategoryList}
    </StyledSortableContainer>
  );
};

const StyledCategoryListItem = styled(CategoryListItem)`
  border: 1px solid black;
  width: 50%;
  margin: 30px;
  padding:
  list-style-type: none;
  .projectName {
    font-size: 1.5em;
  }

  .projectStatus {
    font-size: 1.5em;
  }

  img {
    width: 50px;
  }
`;

const StyledSortableContainer = styled(SortableContainer)`
  border: 1px solid black;
  list-style-type: none;
  list-style-type: none;
  width: 30%;
`;

export default CategoryList;
