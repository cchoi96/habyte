import React, { useState } from "react";
import HabitListItem from "./HabitListItem";
import styled from "styled-components";
const HabitList = ({ habits }) => {
  const [openModal, setOpenModal] = useState(false);
  const habitList = habits.map(habit => {
    return (
      <HabitListItem
        openModal={openModal}
        setOpenModal={setOpenModal}
        habit={habit}
        image={habit.image}
      />
    );
  });
  return <div>{habitList}</div>;
};

export default HabitList;
