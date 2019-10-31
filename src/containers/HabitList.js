import React, { useState } from "react";
import HabitListItem from "./HabitListItem";

const HabitList = ({ specificHabits }) => {
  const habitList = specificHabits.map(habit => {
    return <HabitListItem key={habit.name} habit={habit} image={habit.image} />;
  });
  return <div>{habitList}</div>;
};

export default HabitList;
