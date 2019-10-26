import React, { useState, useEffect } from "react";
import CategoryList from "./CategoryList";
import Farm from "./Farm";
import Footer from "../components/Footer";
import Header from "../components/Header";
import styled from "styled-components";
import axios from "axios";

const Home = ({ cookies, setLoading }) => {
  useEffect(() => {
    // Eventually need to implement post request to get tasks for the day (new and old habits)
    // Stretch: query database for currency / exp / points
  }, []);

  return (
    <div>
      <Header cookies={cookies} />
      <StyledCategoryList />
      <Farm />
      <Footer />
    </div>
  );
};

const StyledCategoryList = styled(CategoryList)`
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;

  @media (min-width: 480px) {
    flex-direction: column;
  }
`;

export default Home;
