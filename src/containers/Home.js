import React, { useState, useEffect } from "react";
import CategoryList from "./CategoryList";
import ProjectList from "./ProjectList";
import Farm from "./Farm";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProjectModal from "./ProjectModal";
import styled from "styled-components";
import axios from "axios";

import TrelloBoard from "./TrelloBoard";

const Home = ({ cookies, className }) => {
  const [projectList, setProjectList] = useState([]);
  const [projectSelected, setProjectSelected] = useState(1);
  const [projectState, setProjectState] = useState({
    tasks: {},
    columns: {},
    columnOrder: []
  });

  const [mode, setMode] = useState("farm");

  useEffect(() => {
    axios
      .post("http://0.0.0.0:8080/projects", {
        github_id: cookies.github_id
      })
      .then(res => {
        if (JSON.stringify(res.data) !== JSON.stringify(projectList)) {
          setProjectList(res.data);
        }
      });
  }, []);

  // On project selected, make a call to retrieve the columns/tasks associated with the project and send that in as a prop to the trelloboard
  useEffect(() => {
    //28830013 hardcoded in, it should be cookies.github_id
    axios
      .get(`http://0.0.0.0:8080/28830013/${projectSelected}/tasks`)
      .then(res => {
        console.log("res printing", res.data);
        let taskstate = {
          tasks: {},
          columns: {},
          columnOrder: []
        };
        for (let taskItem of res.data) {
          taskstate.tasks[taskItem.id] = {
            id: taskItem.id,
            content: taskItem.name
          };
          if (!taskstate.columns[taskItem.task_categories_id]) {
            taskstate.columns[taskItem.task_categories_id] = {
              id: taskItem.task_categories_id,
              title: taskItem.category_name
            };
          }
          if (!taskstate.columns[taskItem.task_categories_id].taskIds) {
            taskstate.columns[taskItem.task_categories_id].taskIds = [];
          }
          taskstate.columns[taskItem.task_categories_id].taskIds.push(
            taskItem.id
          );
          if (!taskstate.columnOrder.includes(taskItem.task_categories_id)) {
            taskstate.columnOrder.push(taskItem.task_categories_id);
          }
          console.log("taskstate", taskstate);
        }

        setProjectState(taskstate);
      });
  }, [projectSelected, mode]);

  return (
    <div className={className}>
      <Header cookies={cookies} />
      <div className="main-content">
        <StyledCategoryList setMode={setMode} />
      </div>
      {mode === "farm" && <Farm />}
      {mode === "coding" && (
        <div>
          <StyledProjectList cookies={cookies} />
          <TrelloBoard
            projectState={projectState}
            setProjectState={setProjectState}
          />
        </div>
      )}
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
