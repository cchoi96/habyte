import React, { useState } from "react";
import styled from "styled-components";
import CurrentHabitModal from "./CurrentHabitModal";

const HabitListItem = ({ habit }) => {
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  return (
    <StyledHabitItem
      onClick={() => {
        setIsStatsOpen(true);
      }}
    >
      {habit.name}

      {isStatsOpen && (
        <CurrentHabitModal
          setIsStatsOpen={setIsStatsOpen}
          isStatsOpen={isStatsOpen}
          habit={habit}
        />
      )}
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
