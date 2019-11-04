import React, { useState, useEffect } from "react";
import HabitList from "./HabitList";
import HabitListItem from "./HabitListItem";
import HabitModal from "./HabitModal";
import axios from "axios";
import styled from "styled-components";

const Habit = ({ github_id, habit_name, updateHabits, habitslength }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [specificHabits, setSpecificHabits] = useState([]);

  useEffect(() => {
    axios.get(`http://0.0.0.0:8080/${github_id}/${habit_name}`).then(res => {
      setSpecificHabits(res.data);
    });
  }, []);

  // Function to be passed down that refreshes specific habit state
  const refreshSpecificHabits = (github_id, habit_name) => {
    axios.get(`http://0.0.0.0:8080/${github_id}/${habit_name}`).then(res => {
      setSpecificHabits(res.data);
    });
  };

  return (
    <StyledHabitCategory habit_name={habit_name}>
      <div className="habit-info">
        <h1>{habit_name[0].toUpperCase() + habit_name.slice(1)}</h1>
      </div>

      <StyledHabitList
        habitslength={habitslength}
        specificHabits={specificHabits}
        setIsOpen={setIsOpen}
        habit_name={habit_name}
      />

      {isOpen && (
        <HabitModal
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          github_id={github_id}
          habit_name={habit_name}
          refreshSpecificHabits={refreshSpecificHabits}
          updateHabits={updateHabits}
        />
      )}
    </StyledHabitCategory>
  );
};

export default Habit;

const StyledHabitCategory = styled.div`
  height: 80vh;
  width: 70vw;
  font-family: "Roboto", sans-serif;
  margin-left: 3vw;
  margin-bottom: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  border-radius: 10px;
  background-color: #edecee;
  box-shadow: 0 2px 2px 0 rgba(26, 24, 29, 0.16),
    0 1px 4px 0 rgba(26, 24, 29, 0.12);
  background-color: ${props =>
    props.habit_name === "coding"
      ? "rgba(67, 40, 116, 0.5)"
      : props.habit_name === "health"
      ? "rgba(247, 78, 82, 0.5)"
      : "rgba(36, 204, 143, 0.5)"};
  margin-bottom: 20px;

  .habit-info {
    background-color: ${props =>
      props.habit_name === "coding"
        ? "rgba(67, 40, 116, 1)"
        : props.habit_name === "health"
        ? "rgba(247, 78, 82, 1)"
        : "rgba(36, 204, 143, 1)"};
    width: 40%;
    margin: 0 auto;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    color: #fff;
  }
  @media only screen and (max-width: 950px) {
    width: 87vw;
    height: 70vh;
    margin-bottom: 100px;
  }
`;

const StyledHabitList = styled(HabitList)`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  border: 2px solid red;
`;
