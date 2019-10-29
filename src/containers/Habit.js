import React, { useState, useEffect } from "react";
import HabitListItem from "./HabitListItem";
import HabitModal from "./HabitModal";
import axios from "axios";

const Habit = ({ github_id, habit_name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    console.log(github_id, habit_name);
    axios.get(`http://0.0.0.0:8080/${github_id}/${habit_name}`).then(res => {
      setHabits(res.data);
    });
  }, []);

  const habitList = habits.map(habit => <HabitListItem habit={habit} />);
  return (
    <div>
      <h1>{habit_name}</h1>
      <p>This is the {habit_name} component. Welcome!</p>
      <div>{habitList}</div>
      <img src="/assets/other/plus.png" onClick={() => setIsOpen(true)}></img>
      {isOpen && (
        <HabitModal
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          github_id={github_id}
          habit_name={habit_name}
        />
      )}
    </div>
  );
};

export default Habit;
