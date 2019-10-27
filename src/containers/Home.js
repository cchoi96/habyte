import React, { useState, useEffect } from "react";
import ProjectList from "./ProjectList";
import Farm from "./Farm";
import Footer from "../components/Footer";
import Header from "../components/Header";
import styled from "styled-components";
import axios from "axios";
import ParseTaskQuery from "../helpers/parseTaskQuery";
import TrelloBoard from "./TrelloBoard";
const Home = ({ cookies, setLoading }) => {
  const [projectList, setProjectList] = useState([]);
  const [projectSelected, setProjectSelected] = useState(1);
  const [projectTasks, setProjectTasks] = useState([{}]);
  const [projectState, setProjectState] = useState({
    tasks: {
      "task-1": { id: "task-1", content: "Take out the garbage" },
      "task-2": { id: "task-2", content: "Watch my favorite show" },
      "task-3": { id: "task-3", content: "Charge my phone" }
    },
    columns: {
      "column-1": {
        id: "column-1",
        title: "To do",
        taskIds: ["task-1", "task-2", "task-3"]
      },
      "column-2": {
        id: "column-2",
        title: "In progress",
        taskIds: []
      },
      "column-3": {
        id: "column-3",
        title: "Done",
        taskIds: []
      }
    },
    columnOrder: ["column-1", "column-2", "column-3"]
  });

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
        console.log("Selected tasks.........", res.data);

        let taskstate = {
          tasks: {},
          columns: {},
          columnOrder: [1, 2]
        };
        console.log("taskslist......", res.data);
        for (let taskItem of res.data) {
          taskstate.tasks[taskItem.id] = {
            id: taskItem.id,
            content: taskItem.name
          };
          taskstate.columns[taskItem.task_categories_id] = {
            id: taskItem.task_categories_id,
            title: taskItem.category_name
          };
          if (!taskstate.columns[taskItem.task_categories_id].taskIds) {
            taskstate.columns[taskItem.task_categories_id].taskIds = [];
          }
          taskstate.columns[taskItem.task_categories_id].taskIds.push(
            taskItem.id
          );
        }
        console.log("taskstate", taskstate);
        setProjectState(taskstate);
      });
  }, [projectSelected]);

  return (
    <div>
      <Header cookies={cookies} />
      <StyledProjectList array={projectList} />
      <TrelloBoard
        projectState={projectState}
        setProjectState={setProjectState}
      />
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
