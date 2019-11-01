import React, { useState, useEffect } from "react";
import CategoryList from "./CategoryList";
import ProjectList from "./ProjectList";
import Farm from "./Farm";
import Header from "../components/Header";
import ProjectModal from "./ProjectModal";
import NewHabits from "./NewHabits";
import styled from "styled-components";
import axios from "axios";
import Habit from "./Habit";

// Make function that updates habit state with get request down to individual components and update state on every onclick

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
  // Total Habit List state management
  const [habits, setHabits] = useState([]);
  console.log("habits ==>", habits);

  // Renders different components on home page based on mode
  const [mode, setMode] = useState("farm");

  // Function to refresh total habit list state
  const updateHabits = github_id => {
    console.log("HEYYYYYYYYYYY");
    axios.get(`http://0.0.0.0:8080/${github_id}/habits`).then(res => {
      console.log("RES.DATA!", res.data);
      let habitsArray = res.data;
      setHabits(habitsArray);
      console.log("Updated res.data!", habitsArray);
    });
  };

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
    updateHabits(cookies.github_id);
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

  const isOverDays = (lastDate, days) => {
    let lastCheckDate = lastDate
      .split(" ")[0]
      .split("-")
      .join("/");
    lastCheckDate = new Date(lastCheckDate).getTime();
    let now = Date.now();
    return Math.floor((now - lastCheckDate) / 1000 / 60 / 60 / 24) >= days
      ? true
      : false;
  };

  const isCounterMoreFrequency = habit => {
    return habit.counter >= habit.frequency ? true : false;
  };

  const datePlusDays = (lastDate, days) => {
    lastDate = lastDate
      .split(" ")[0]
      .split("-")
      .join("/");
    lastDate = new Date(lastDate).getTime();
    let newDate = lastDate + 1000 * 60 * 60 * 24 * days;
    newDate = new Date(newDate);
    return newDate;
  };

  useEffect(() => {
    axios.get(`http://0.0.0.0:8080/${cookies.github_id}/habits`).then(res => {
      let habitsArray = res.data;
      setHabits(habitsArray);
      for (let habit of habitsArray) {
        if (isOverDays(habit.last_check_date_week, 7)) {
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
          const new_date_week = datePlusDays(habit.last_check_date_week, 7);
          axios.put(
            `http://0.0.0.0:8080/${cookies.github_id}/habits/${habit.name}/counter`,
            {
              new_date_week: new_date_week
            }
          );
        }
      }
      //reset last_check_date_day
      if (isOverDays(habitsArray[0].last_check_date_day, 1)) {
        const new_date_day = new Date();
        axios.put(`http://0.0.0.0:8080/${cookies.github_id}/habits`, {
          new_date_day: new_date_day
        });
      }
    });
  }, []);

  // Function to be passed down that refreshes the habit state
  const refreshHabits = github_id => {
    axios.get(`http://0.0.0.0:8080/${github_id}/new-habits`).then(res => {
      let newHabitsArray = res.data;
      setHabits(newHabitsArray);
    });
  };

  // Function to be passed down that refreshes the farm state
  // const refreshFarm = github_id

  return (
    <div className={className}>
      <Header cookies={cookies} setMode={setMode} />
      <div className="main-content">
        <StyledCategoryList setMode={setMode} />
        {mode === "farm" && (
          <Farm
            habits={habits}
            setHabits={setHabits}
            cookies={cookies}
            updateHabits={updateHabits}
          />
        )}
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
        {mode === "health" && (
          <Habit
            github_id={cookies.github_id}
            habit_name="health"
            updateHabits={updateHabits}
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

  @media (min-width: 480px) {
    flex-direction: column;
  }
`;

export default Home;
