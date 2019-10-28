import React, { useState } from "react";
import styled from "styled-components";
import CategoryListItem from "./CategoryListItem";

const CategoryList = ({ setMode }) => {
  const categories = [
    {
      name: "coding",
      img: "/assets/other/coding_icon.png"
    },
    {
      name: "health",
      img: "/assets/other/health_icon.png"
    },
    {
      name: "farm",
      img: "/assets/other/farm.png"
    }
  ];

  const [categoryList, setCategoryList] = useState(categories);

  let totalCategoryList = categoryList.map((category, index) => {
    return (
      <StyledCategoryListItem
        key={category.name}
        index={index}
        categoryName={category.name}
        categoryImg={category.img}
        setMode={setMode}
      ></StyledCategoryListItem>
    );
  });

  return <StyledDiv>{totalCategoryList}</StyledDiv>;
};

const StyledCategoryListItem = styled(CategoryListItem)`
  border-bottom: 1px solid black;
  width: 100%;
  list-style-type: none;
  text-align: center;
  .projectName {
    font-size: 1.5em;
  }

  .projectStatus {
    font-size: 1.5em;
  }

  img {
    margin: 5px;
    width: 50px;
  }

  &:hover {
    cursor: pointer;
  }
`;

const StyledDiv = styled.div`
  list-style-type: none;
  border: 1px solid black;
  border-bottom: none;
  width: 20%;
`;

export default CategoryList;
