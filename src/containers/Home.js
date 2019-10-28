import React, { useState, useEffect } from "react";
import CategoryList from "./CategoryList";
import ProjectList from "./ProjectList";
import Farm from "./Farm";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProjectModal from "./ProjectModal";
import NewHabits from "./NewHabits";
import styled from "styled-components";
import axios from "axios";
import moment from "moment";

import TrelloBoard from "./TrelloBoard";

const Home = ({ cookies, className }) => {
  // Project List state management
  const [projectList, setProjectList] = useState([]);
  const [projectSelected, setProjectSelected] = useState(1);
  const [projectState, setProjectState] = useState({
    tasks: {},
    columns: {},
    columnOrder: []
  });
  // Habit List state management
  const [habits, setHabits] = useState([]);

  // Renders different components on home page based on mode
  const [mode, setMode] = useState("farm");

  useEffect(() => {
    // Sets project state
    axios
      .post("http://0.0.0.0:8080/projects", {
        github_id: cookies.github_id
      })
      .then(res => {
        if (JSON.stringify(res.data) !== JSON.stringify(projectList)) {
          setProjectList(res.data);
        }
      });

    // Sets habit state
    axios.get(`http://0.0.0.0:8080/${cookies.github_id}/habits`).then(res => {
      let habitsArray = res.data;
      setHabits(habitsArray);
    });
  }, []);

  // On project selected, make a call to retrieve the columns/tasks associated with the project and send that in as a prop to the trelloboard
  useEffect(() => {
    axios
      .get(`http://0.0.0.0:8080/${cookies.github_id}/${projectSelected}/tasks`)
      .then(res => {
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
        }

        setProjectState(taskstate);
      });
  }, [projectSelected]);

  const isOverAWeek = habit => {
    let last_check_date_week = habit.last_check_date_week
      .split(" ")[0]
      .split("-")
      .join("/");
    last_check_date_week = new Date(last_check_date_week).getTime();
    let now = Date.now();
    return Math.floor((now - last_check_date_week) / 1000 / 60 / 60 / 24) >= 7
      ? true
      : false;
  };

  const isCounterMoreFrequency = habit => {
    const counter = habit.counter;
    const frequency = habit.frequency;
    return counter >= frequency ? true : false;
  };

  const datePlusSeven = habit => {
    let last_check_date_week = habit.last_check_date_week
      .split(" ")[0]
      .split("-")
      .join("/");
    last_check_date_week = new Date(last_check_date_week).getTime();
    let new_check_date_week = last_check_date_week + 1000 * 60 * 60 * 24 * 7;
    new_check_date_week = new Date(new_check_date_week);
    return new_check_date_week;
  };

  const isOverADay = habit => {
    let last_check_date_day = habit.last_check_date_day
      .split(" ")[0]
      .split("-")
      .join("/");
    last_check_date_day = new Date(last_check_date_day).getTime();
    let now = Date.now();
    return Math.floor((now - last_check_date_day) / 1000 / 60 / 60 / 24) >= 1
      ? true
      : false;
  };

  useEffect(() => {
    axios.get(`http://0.0.0.0:8080/${cookies.github_id}/habits`).then(res => {
      console.log("inside habits query", res.data);
      let habitsArray = res.data;
      setHabits(habitsArray);
      for (let habit of habitsArray) {
        if (isOverAWeek(habit)) {
          if (isCounterMoreFrequency(habit)) {
            //upgrade the crop_State to the next state
            axios.put(
              `http://0.0.0.0:8080/${cookies.github_id}/habits/${habit.name}`
            );
          } else {
            if (habit.is_already_dying) {
              //if the crop is already dying, it will be dead.
              axios.put(
                `http://0.0.0.0:8080/${cookies.github_id}/habits/${habit.name}/dead`
              );
            } else {
              //downgrade the crop_state and is_already_dying = true
              axios.put(
                `http://0.0.0.0:8080/${cookies.github_id}/habits/${habit.name}/dying`
              );
            }
          }
          //reset counter and last_check_date_week
          const new_date_week = datePlusSeven(habit);
          axios.put(
            `http://0.0.0.0:8080/${cookies.github_id}/habits/${habit.name}/counter`,
            {
              new_date_week: new_date_week
            }
          );
        }
      }
      console.log("isoveraday", isOverADay(habitsArray[0]));

      //reset last_check_date_day
      if (isOverADay(habitsArray[0])) {
        const new_date_day = new Date();
        axios.put(`http://0.0.0.0:8080/${cookies.github_id}/habits`, {
          new_date_day: new_date_day
        });
      }
    });
  });
  // Function to be passed down that refreshes the habit state
  const refreshHabits = github_id => {
    axios.get(`http://0.0.0.0:8080/${github_id}/new-habits`).then(res => {
      let newHabitsArray = res.data;
      setHabits(newHabitsArray);
    });
  };

  return (
    <div className={className}>
      <Header cookies={cookies} setMode={setMode} />
      <div className="main-content">
        <StyledCategoryList setMode={setMode} />
        {mode === "farm" && <Farm habits={habits} />}
        {mode === "coding" && (
          <div>
            <StyledProjectList
              cookies={cookies}
              setProjectSelected={setProjectSelected}
            />
            <TrelloBoard
              projectSelected={projectSelected}
              projectState={projectState}
              setProjectState={setProjectState}
            />
          </div>
        )}
        {mode === "new-habits" && (
          <NewHabits
            cookies={cookies}
            habits={habits}
            setHabits={setHabits}
            refreshHabits={refreshHabits}
          />
        )}
      </div>
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
