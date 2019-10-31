import React, { useState } from "react";
import styled from "styled-components";
import CurrentHabitModal from "./CurrentHabitModal";

const HabitListItem = ({ habit, openModal, setOpenModal }) => {
  console.log(openModal);
  return (
    <StyledHabitItem onClick={() => setOpenModal(prev => !prev)}>
      {habit.name}
      {openModal && <CurrentHabitModal habit={habit} />}
    </StyledHabitItem>
  );
};

const StyledHabitItem = styled.div`
  width: 45%;
  margin: 20px;
  padding: 20px;
  border: 1px solid black;
  &:hover {
    background-color: steelblue;
  }
`;
export default HabitListItem;
