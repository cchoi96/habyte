import React, { useEffect } from "react";
import HabitListItem from "./HabitListItem";

const HabitList = ({ habits }) => {
  const habitList = habits.map(habit => {
    return <HabitListItem habit={habit.name} image={habit.image} />;
  });
  return <div>{habitList}</div>;
};

export default HabitList;
