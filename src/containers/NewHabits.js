import React, { useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const NewHabits = ({ cookies, habits, setHabits, refreshHabits }) => {
  useEffect(() => {
    axios
      .get(`http://0.0.0.0:8080/${cookies.github_id}/new-habits`)
      .then(res => {
        setHabits(res.data);
        console.log(habits);
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

  const newHabitsList = habits.map(habit =>
    habit.is_checked_day ? (
      <CheckedStyledDiv>
        {habit.name} {habit.counter}/{habit.frequency}
      </CheckedStyledDiv>
    ) : (
      <StyledDiv
        onClick={() => {
          updateHabit(habit.id);
        }}
      >
        {habit.name} {habit.counter}/{habit.frequency}
      </StyledDiv>
    )
  );
  return <div>{newHabitsList}</div>;
};

const StyledDiv = styled.div`
  width: 100%;
  border: 1px solid black;
  &:hover {
    cursor: pointer;
  }
`;

const CheckedStyledDiv = styled.div`
  width: 100%;
  text-decoration: line-through;
  border: 1px solid black;
  &:hover {
    cursor: pointer;
  }
`;

export default NewHabits;
