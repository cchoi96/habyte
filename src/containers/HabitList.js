import React, { useState } from "react";
import HabitListItem from "./HabitListItem";

const HabitList = ({ habits }) => {
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const habitList = habits.map(habit => {
    return (
      <HabitListItem
        setIsStatsOpen={setIsStatsOpen}
        isStatsOpen={isStatsOpen}
        key={habit.name}
        habit={habit}
        image={habit.image}
      />
    );
  });
  return <div>{habitList}</div>;
};

export default HabitList;
