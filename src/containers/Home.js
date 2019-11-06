import React, { useState, useEffect } from "react";
import CategoryList from "./CategoryList";
import { Farm } from "./Farm";
import Header from "../components/Header";
import styled from "styled-components";
import axios from "axios";
import Habit from "./Habit";
import Store from "./Store";
import Coding from "./Coding";

// Make function that updates habit state with get request down to individual components and update state on every onclick

const Home = ({ cookies, className }) => {
  // Project List state management
  const [projectList, setProjectList] = useState([]);
  const [projectSelected, setProjectSelected] = useState(1);
  const [userCoin, setUserCoin] = useState();
  const [projectState, setProjectState] = useState({
    tasks: {},
    columns: {},
    columnOrder: []
  });

  // Total Habit List state management
  const [habits, setHabits] = useState([]);
  const [oldHabits, setOldHabits] = useState([]);
  // Renders different components on home page based on mode
  const [mode, setMode] = useState("farm");

  // Function to refresh total habit list state
  const updateHabits = github_id => {
    axios.get(`http://0.0.0.0:8080/${github_id}/new-habits`).then(res => {
      let habitsArray = res.data;
      habitsArray.sort((a, b) => a.id - b.id);
      setHabits(habitsArray);
    });
  };

  useEffect(() => {
    // Sets project state
    console.log("COOKIES ==>", cookies);
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

  useEffect(() => {
    axios.get(`http://0.0.0.0:8080/${cookies.github_id}/coin`).then(res => {
      let userCoin = res.data ? res.data[0].coin : 0;
      setUserCoin(userCoin);
    });
  }, []);

  const updateCoinInDatabase = github_id => {
    let coin = userCoin;
    axios
      .post(`http://0.0.0.0:8080/coin/${github_id}`, {
        coin: coin
      })
      .then(() => "console after axios", userCoin)
      .catch(err => console.log(err));
  };

  useEffect(() => {
    updateCoinInDatabase(cookies.github_id);
  }, [userCoin]);
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
      let queryArray = [];
      for (let habit of habitsArray) {
        if (habit.is_new_habit) {
          if (isOverDays(habit.last_check_date_week, 7)) {
            if (isCounterMoreFrequency(habit)) {
              if (habit.crop_state < 5) {
                //upgrade the crop_State to the next state
                queryArray.push(
                  axios.put(
                    `http://0.0.0.0:8080/${cookies.github_id}/habits/${habit.name}`
                  )
                );
              }
            } else {
              if (habit.name !== "coding") {
                if (habit.is_already_dying) {
                  queryArray.push(
                    axios.put(
                      `http://0.0.0.0:8080/${cookies.github_id}/habits/${habit.name}/dead`
                    )
                  );
                } else {
                  if (habit.crop_state > 0) {
                    //downgrade the crop_state and is_already_dying = true
                    queryArray.push(
                      axios.post(
                        `http://0.0.0.0:8080/${cookies.github_id}/habits/${habit.name}/dying`
                      )
                    );
                  }
                }
              } else {
                if (habit.crop_state > 1) {
                  queryArray.push(
                    axios.post(
                      `http://0.0.0.0:8080/${cookies.github_id}/habits/${habit.name}/dying`
                    )
                  );
                }
              }
            }
            //reset counter and last_check_date_week
            const new_date_week = datePlusDays(habit.last_check_date_week, 7);

            queryArray.push(
              axios.post(
                `http://0.0.0.0:8080/${cookies.github_id}/habits/${habit.name}/record`,
                {
                  counter: habit.counter,
                  id: habit.id
                }
              )
            );
            queryArray.push(
              axios.put(
                `http://0.0.0.0:8080/${cookies.github_id}/habits/${habit.name}/counter`,
                {
                  new_date_week: new_date_week
                }
              )
            );
          }

          if (isOverDays(habit.last_check_date_day, 1)) {
            const new_date_day = new Date();
            queryArray.push(
              axios.put(
                `http://0.0.0.0:8080/${cookies.github_id}/update/habit`,
                {
                  new_date_day: new_date_day,
                  habit: habit.name
                }
              )
            );
          }
        } else {
          if (isOverDays(habit.last_check_date_day, 14)) {
            if (habit.counter > 0) {
              setUserCoin(prev => prev + 5);
            }
            const new_date_week = new Date();
            queryArray.push(
              axios.put(
                `http://0.0.0.0:8080/${cookies.github_id}/habits/${habit.name}/counter`,
                {
                  new_date_week: new_date_week
                }
              )
            );
            const new_date_day = new Date();
            queryArray.push(
              axios.put(
                `http://0.0.0.0:8080/${cookies.github_id}/update/habit`,
                {
                  new_date_day: new_date_day,
                  habit: habit.name
                }
              )
            );
          }
        }
      }
      //Try to update the states after each if statement, so we don't need to
      Promise.all(queryArray).then(() => {
        axios
          .get(`http://0.0.0.0:8080/${cookies.github_id}/new-habits`)
          .then(res => {
            let habits = res.data;
            habits.sort((a, b) => a.id - b.id);
            setHabits(habits);
            setMode("farm");
          });
      });
    });
  }, []);

  // Function to be passed down that refreshes the habit state
  const refreshHabits = github_id => {
    axios.get(`http://0.0.0.0:8080/${github_id}/new-habits`).then(res => {
      let newHabitsArray = res.data;
      newHabitsArray.sort((a, b) => a.id - b.id);
      setHabits(newHabitsArray);
    });
  };

  // Function to be passed down that refreshes the old habit state
  const refreshOldHabits = github_id => {
    axios.get(`http://0.0.0.0:8080/${github_id}/old-habits`).then(res => {
      let oldHabitsArray = res.data;
      oldHabitsArray.sort((a, b) => a.id - b.id);
      setOldHabits(oldHabitsArray);
    });
  };

  // Function to be passed down that refreshes the farm state
  // const refreshFarm = github_id

  return (
    <div className={className}>
      <Header cookies={cookies} setMode={setMode} userCoin={userCoin} />
      <StyledMainContent className="main-content">
        <StyledCategoryList
          cookies={cookies}
          habits={habits}
          setHabits={setHabits}
          refreshHabits={refreshHabits}
          oldHabits={oldHabits}
          setOldHabits={setOldHabits}
          refreshOldHabits={refreshOldHabits}
        />
        {mode === "farm" && (
          <Farm
            habits={habits}
            setHabits={setHabits}
            cookies={cookies}
            updateHabits={updateHabits}
            setUserCoin={setUserCoin}
            updateCoinInDatabase={updateCoinInDatabase}
            userCoin={userCoin}
          />
        )}
        {mode === "coding" && (
          <Coding
            cookies={cookies}
            setProjectSelected={setProjectSelected}
            projectSelected={projectSelected}
            projectState={projectState}
            setProjectState={setProjectState}
          />
        )}
        {mode === "store" && (
          <Store
            cookies={cookies}
            setMode={setMode}
            userCoin={userCoin}
            setUserCoin={setUserCoin}
            updateCoinInDatabase={updateCoinInDatabase}
          />
        )}
        {mode === "health" && (
          <Habit
            habitslength={habits.length}
            github_id={cookies.github_id}
            habit_name="health"
            updateHabits={updateHabits}
          />
        )}
        {mode === "finance" && (
          <Habit
            habitslength={habits.length}
            github_id={cookies.github_id}
            habit_name="finance"
            updateHabits={updateHabits}
          />
        )}
        {mode === "misc" && (
          <Habit
            habitslength={habits.length}
            github_id={cookies.github_id}
            habit_name="misc"
            updateHabits={updateHabits}
          />
        )}
      </StyledMainContent>
    </div>
  );
};

const StyledMainContent = styled.div`
  display: flex;
  overflow-y: scroll;
  @media only screen and (max-width: 950px) {
    flex-direction: column;
  }
`;

const StyledCategoryList = styled(CategoryList)`
  list-style-type: none;
  overflow-y: scroll;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;

export default Home;
