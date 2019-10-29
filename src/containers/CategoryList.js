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
  width: 100%;
  list-style-type: none;
  text-align: center;
  padding: 10px 0 20px 0;
  .projectName {
    font-size: 1.5em;
  }

  .projectStatus {
    font-size: 1.5em;
  }

  p {
    margin: 0;
  }

  img {
    margin: 5px;
    width: 50px;
  }

  &:hover {
    cursor: pointer;
    background-color: ${props =>
      props.categoryName === "coding"
        ? "rgba(67, 40, 116, 0.9)"
        : props.categoryName === "health"
        ? "rgba(247, 78, 82, 0.9)"
        : "rgba(36, 204, 143, 0.9)"};
  }

  color: #fff;

  background-color: ${props =>
    props.categoryName === "coding"
      ? "rgba(67, 40, 116)"
      : props.categoryName === "health"
      ? "rgba(247, 78, 82)"
      : "rgba(36, 204, 143)"};
`;

const StyledDiv = styled.div`
  list-style-type: none;
  width: 20%;
`;

export default CategoryList;