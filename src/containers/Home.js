import React, { useEffect } from "react";
import ProjectList from "./ProjectList";
import Farm from "./Farm";
import Footer from "../components/Footer";
import styled from "styled-components";
import axios from "axios";

const Home = () => {
  const fakeData = [
    {
      name: "final_project",
      crop:
        "https://stardewvalleywiki.com/mediawiki/images/6/6d/Strawberry.png",
      status: "completed"
    },
    {
      name: "midterm_project",
      crop: "https://stardewvalleywiki.com/mediawiki/images/c/c2/Grape.png",
      status: "in progress"
    },
    {
      name: "react_project",
      crop: "https://stardewvalleywiki.com/mediawiki/images/1/19/Melon.png",
      status: "dead"
    },
    {
      name: "sleeping",
      crop: "https://stardewvalleywiki.com/mediawiki/images/8/81/Sunflower.png",
      status: "completed"
    }
  ];

  useEffect(() => {
    axios.get("http://0.0.0.0:8080/username/projects").then(res => {
      console.log("projects.........", res);
    });
  }, []);

  return (
    <div>
      {/* <Navigation /> */}
      <StyledProjectList array={fakeData} />
      {/* <ProjectBoard /> */}
      <Footer />
    </div>
  );
};

const StyledProjectList = styled(ProjectList)`
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
`;

export default Home;
