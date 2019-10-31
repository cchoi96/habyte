import React, { useState } from "react";
import styled from "styled-components";
import CategoryListItem from "./CategoryListItem";

const CategoryList = ({ setMode }) => {
  const categories = [
    {
      name: "farm",
      img: "/assets/other/farm.png"
    },
    {
      name: "coding",
      img: "/assets/other/coding_icon.png"
    },
    {
      name: "health",
      img: "/assets/other/health_icon.png"
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
  width: 75%;
  margin: 15px auto;
  list-style-type: none;
  text-align: center;
  padding: 10px 0 20px 0;
  border-radius: 10px;
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
        ? "rgba(67, 40, 116, 0.85)"
        : props.categoryName === "health"
        ? "rgba(247, 78, 82, 0.85)"
        : "rgba(36, 204, 143, 0.85)"};
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
  background-color: #edecee;
  height: 80vh;
  border-radius: 10px;
`;

export default CategoryList;
