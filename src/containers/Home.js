import React, { useState, useEffect } from "react";
import ProjectList from "./ProjectList";
import Farm from "./Farm";
import Footer from "../components/Footer";
import styled from "styled-components";
import axios from "axios";

const Home = ({ github_id }) => {
  const [projectList, setProjectList] = useState([]);
  useEffect(() => {
    axios
      .post("http://0.0.0.0:8080/projects", {
        github_id
      })
      .then(res => {
        console.log("Selected user projects.........", res.data);
        console.log(JSON.stringify(res.data) !== JSON.stringify(projectList));
        if (JSON.stringify(res.data) !== JSON.stringify(projectList)) {
          setProjectList(res.data);
        }
      });
  }, []);

  return (
    <div>
      <StyledProjectList array={projectList} />
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

export default Home;
