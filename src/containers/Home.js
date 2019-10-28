import React, { useState, useEffect } from "react";
import CategoryList from "./CategoryList";
import ProjectList from "./ProjectList";
import Farm from "./Farm";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProjectModal from "./ProjectModal";
import styled from "styled-components";
import axios from "axios";
import moment from "moment";

import TrelloBoard from "./TrelloBoard";

const Home = ({ cookies, className }) => {
  const [projectList, setProjectList] = useState([]);
  const [projectSelected, setProjectSelected] = useState(1);
  const [projectState, setProjectState] = useState({
    tasks: {},
    columns: {},
    columnOrder: []
  });
  const [habits, setHabits] = useState([]);

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

  const isOverAWeek = habit => {
    let last_check_date_week = habit.last_check_date_week
      .split(" ")[0]
      .split("-")
      .join("/");
    last_check_date_week = new Date(last_check_date_week).getTime();
    let now = Date.now();
    return Math.floor((now - last_check_date_week) / 1000 / 60 / 60 / 24) >= 7 ? true : false;
  };

  const isCounterMoreFrequency = (habit) => {
    const counter = habit.counter;
    const frequency = habit.frequency;
    return counter > frequency ? true : false
  }

  const datePlusSeven = (habit) => {
    let last_check_date_week = habit.last_check_date_week
    .split(" ")[0]
    .split("-")
    .join("/");
    last_check_date_week = new Date(last_check_date_week).getTime();
    let new_check_date_week = last_check_date_week + 1000*60*60*24*7;
    new_check_date_week = new Date(new_check_date_week)
    return new_check_date_week;
    
  }


  useEffect(() => {
    axios.get(`http://0.0.0.0:8080/${cookies.github_id}/habits`).then(res => {
      console.log("inside habits query", res.data);
      let habitsArray = res.data;
      setHabits(habitsArray);
      for (let habit of habitsArray) {
        if(isOverAWeek(habit)) {
          if(isCounterMoreFrequency(habit)) {
            axios.put(`http://0.0.0.0:8080/${cookies.github_id}/habits/${habit.name}`)
            .then((res) => {
              console.log('just did axios.call?')
            })
          } else {
            if (habit.is_already_dying) {
              axios.put(`http://0.0.0.0:8080/${cookies.github_id}/habits/${habit.name}/dead`)
              .then((res) => {
                console.log('dead crop')
              })
            } else {
              axios.put(`http://0.0.0.0:8080/${cookies.github_id}/habits/${habit.name}/dying`)
              .then((res) => {
                console.log('not dying, just downgrade')
              })
            }
          }
          const new_date_week = datePlusSeven(habit);
          axios.put(`http://0.0.0.0:8080/${cookies.github_id}/habits/${habit.name}/counter/${new_date_week}`)
          .then(res => {
            console.log('reset habit counter and new_check_date_week')
          })
        };

      }
    });
  }, []);

  return (
    <div className={className}>
      <Header cookies={cookies} />
      <div className="main-content">
        <StyledCategoryList setMode={setMode} />
        {mode === "farm" && <Farm habits={habits} />}
        {mode === "coding" && (
          <div>
            <StyledProjectList cookies={cookies} />
            <TrelloBoard
              projectState={projectState}
              setProjectState={setProjectState}
            />
          </div>
        )}
      </div>
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

  min-height: 100vh;
  @media (min-width: 480px) {
    flex-direction: column;
  }
`;

export default Home;
