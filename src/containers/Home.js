import React, { useState, useEffect } from "react";
import CategoryList from "./CategoryList";
import ProjectList from "./ProjectList";
import Farm from "./Farm";
import Footer from "../components/Footer";
import Header from "../components/Header";
import styled from "styled-components";
import axios from "axios";

const Home = ({ cookies, setLoading, className }) => {
  useEffect(() => {
    // Eventually need to implement post request to get tasks for the day (new and old habits)
    // Stretch: query database for currency / exp / points
  }, []);

  return (
    <div className={className}>
      <Header cookies={cookies} />
      <div className="main-content">
        <StyledCategoryList />
        <StyledProjectList />
      </div>
      <Farm />
      <Footer />
    </div>
  );
};

const StyledProjectList = styled(ProjectList)`
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;


  @media (min-width: 480px) {
    flex-direction: column;
  }
`;

const StyledCategoryList = styled(CategoryList)`
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;

  @media (min-width: 480px) {
    flex-direction: column;
  }
`;

export default Home;
