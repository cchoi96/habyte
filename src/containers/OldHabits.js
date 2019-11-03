import React, { useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const OldHabits = ({ cookies, oldHabits, setOldHabits, refreshOldHabits }) => {
  useEffect(() => {
    axios
      .get(`http://0.0.0.0:8080/${cookies.github_id}/old-habits`)
      .then(res => {
        setOldHabits(res.data);
      });
  }, []);

  // Function that makes post request and updates state with new habit state
  const updateHabit = habit_id => {
    axios
      .post(`http://0.0.0.0:8080/${cookies.github_id}/old-habits`, {
        habit_id
      })
      .then(() => {
        refreshOldHabits(cookies.github_id);
      });
  };

  const oldHabitsList = oldHabits.map(habit =>
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
  return <div>{oldHabitsList}</div>;
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

export default OldHabits;
