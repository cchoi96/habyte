import React, { useState, useEffect } from "react";
import ProjectList from "./ProjectList";
import Farm from "./Farm";
import Footer from "../components/Footer";
import Header from "../components/Header";
import styled from "styled-components";
import axios from "axios";
import ParseTaskQuery from "../helpers/parseTaskQuery";

const Home = ({ cookies, setLoading }) => {
  const [projectList, setProjectList] = useState([]);
  const [projectSelected, setProjectSelected] = useState(1);
  const [projectTasks, setProjectTasks] = useState([{}]);
  console.log(cookies);

  useEffect(() => {
    axios
      .post("http://0.0.0.0:8080/projects", {
        github_id: cookies.github_id
      })
      .then(res => {
        if (JSON.stringify(res.data) !== JSON.stringify(projectList)) {
          setProjectList(res.data);
        }
        setLoading(false);
      });
  }, []);

  // On project selected, make a call to retrieve the columns/tasks associated with the project and send that in as a prop to the trelloboard
  useEffect(() => {
    //28830013 hardcoded in, it should be cookies.github_id
    axios
      .get(`http://0.0.0.0:8080/28830013/${projectSelected}/tasks`)
      .then(res => {
        console.log(cookies.github_id);
        console.log("Selected tasks.........", res.data);
        setProjectTasks(res.data);
      });
  }, [projectSelected]);

  return (
    <div>
      <Header cookies={cookies} />
      <StyledProjectList array={projectList} />
      <ParseTaskQuery taskslist={projectTasks} />
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
