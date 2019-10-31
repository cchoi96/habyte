import React, { useState, useEffect } from "react";
import HabitList from "./HabitList";
import HabitListItem from "./HabitListItem";
import HabitModal from "./HabitModal";
import axios from "axios";
import styled from "styled-components";
const Habit = ({ github_id, habit_name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    console.log(github_id, habit_name);
    axios.get(`http://0.0.0.0:8080/${github_id}/${habit_name}`).then(res => {
      setHabits(res.data);
    });
  }, []);

  return (
    <StyledHabitCategory>
      <h1>{habit_name}</h1>
      <p>This is the {habit_name} component. Welcome!</p>
      <StyledHabitList habits={habits} />
      <img src="/assets/other/plus.png" onClick={() => setIsOpen(true)}></img>
      {isOpen && (
        <HabitModal
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          github_id={github_id}
          habit_name={habit_name}
        />
      )}
    </StyledHabitCategory>
  );
};

export default Habit;

const StyledHabitCategory = styled.div`
  width: 100%;
`;

const StyledHabitList = styled(HabitList)`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  border: 2px solid red;
`;
