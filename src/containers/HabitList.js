import React, { useState } from "react";
import HabitListItem from "./HabitListItem";

const HabitList = ({ habits }) => {
  const habitList = habits.map(habit => {
    return <HabitListItem key={habit.name} habit={habit} image={habit.image} />;
  });
  return <div>{habitList}</div>;
};

export default HabitList;
