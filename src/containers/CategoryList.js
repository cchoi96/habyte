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

const StyledDiv = styled.div`
  border: 1px solid black;
  list-style-type: none;
  list-style-type: none;
  width: 30%;
`;

export default CategoryList;
