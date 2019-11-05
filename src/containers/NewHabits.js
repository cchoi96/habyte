import React, { useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const NewHabits = ({ cookies, habits, setHabits, refreshHabits }) => {
  useEffect(() => {
    axios
      .get(`http://0.0.0.0:8080/${cookies.github_id}/new-habits`)
      .then(res => {
        let habitsArr = res.data.sort((a, b) => a.id - b.id);
        setHabits(habitsArr);
      });
  }, []);

  // Function that makes post request and updates state with new habit state
  const updateHabit = habit_id => {
    axios
      .post(`http://0.0.0.0:8080/${cookies.github_id}/new-habits`, {
        habit_id
      })
      .then(() => {
        refreshHabits(cookies.github_id);
      });
  };

  const newHabitsList = habits.map(habit => {
    return habit.is_checked_day ? (
      <CheckedStyledDiv key={habit.name}>
        <div className="check">
          <p>
            {habit.counter}/{habit.frequency}
          </p>
        </div>
        <div className="info">
          <h5>{habit.name}</h5>
        </div>
      </CheckedStyledDiv>
    ) : (
      <StyledDiv
        key={habit.name}
        onClick={() => {
          updateHabit(habit.id);
        }}
        category={habit.category_name}
      >
        <div className="check" category={habit.category_name}>
          <p>
            {habit.counter}/{habit.frequency}
          </p>
        </div>
        <div className="info">
          <h5>{habit.name}</h5>
        </div>
      </StyledDiv>
    );
  });
  return <StyledMainDiv>{newHabitsList}</StyledMainDiv>;
};

const StyledMainDiv = styled.div`
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 950px) {
    flex-direction: row;
    margin: auto 0;
  }
`;

const StyledDiv = styled.div`
  width: 85%;
  height: 60px;
  text-align: left;
  overflow-x: scroll;
  background-color: #fff;
  margin: 15px auto;
  :first-child {
    margin-top: 30px;
  }
  display: flex;
  border-radius: 10px;
  box-shadow: rgba(26, 24, 29, 0.16) 0px 2px 2px 0px,
    rgba(26, 24, 29, 0.12) 0px 1px 4px 0px;
  transition: 0.1s ease-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.02);
  }

  .check {
    background-color: ${props =>
      props.category === "coding"
        ? "rgba(67,40,116,1)"
        : props.category === "health"
        ? "rgba(247,78,82,1)"
        : props.category === "finance"
        ? "rgba(248, 148, 6, 1)"
        : props.category === "misc"
        ? "rgba(145, 61, 136, 1)"
        : "rgba(0, 128, 0, 1);"};
    height: 100%;
    min-width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    p {
      margin: 0;
    }
  }

  .info {
    display: flex;
    margin-left: 10px;
    align-items: center;
    overflow-x: scroll;
    h5 {
      margin: 5px;
      white-space: nowrap;
    }
  }

  @media only screen and (max-width: 950px) {
    width: 150px;
    margin: auto 15px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    :first-child {
      margin: auto 15px;
    }
    .check {
      width: 20px;
      font-size: 0.8em;
    }

    .info {
      width: 130px;
      margin: auto 5px;
      overflow-x: scroll;
      align-items: center;
      h5 {
        font-size: 0.8em;
      }
    }
  }
`;

const CheckedStyledDiv = styled.div`
  width: 85%;
  height: 60px;
  text-align: left;
  background-color: #fff;
  margin: 15px auto;
  :first-child {
    margin-top: 30px;
  }
  display: flex;
  border-radius: 10px;
  box-shadow: rgba(26, 24, 29, 0.16) 0px 2px 2px 0px,
    rgba(26, 24, 29, 0.12) 0px 1px 4px 0px;
  transition: 0.1s ease-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.02);
  }

  .check {
    background-color: #c3c0c7;
    color: #a5a1ac;

    height: 100%;
    min-width: 50px;

    display: flex;
    align-items: center;
    justify-content: center;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    p {
      margin: 0;
    }
  }

  .info {
    display: flex;
    margin: auto 10px;
    align-items: center;
    overflow-x: scroll;
    color: #a5a1ac;
    h5 {
      margin: 0;
      white-space: nowrap;
    }
  }

  @media only screen and (max-width: 950px) {
    width: 150px;
    margin: auto 15px;
    display: flex;
    align-items: center;
    :first-child {
      margin: auto 15px;
    }
    .check {
      width: 20px;
      font-size: 0.8em;
    }

    .info {
      width: 130px;
      margin: auto 5px;
      overflow-x: scroll;
      align-items: center;
      h5 {
        font-size: 0.8em;
      }
    }
  }
`;

export default NewHabits;
