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
      <Container>
        <div>
          <img
            src={`/assets/crops/${habit.crop_name}/${habit.crop_name}_Stage_${habit.crop_state}.png`}
            alt=""
          />
          <div>
            {habit.counter}/{habit.frequency}
          </div>
        </div>
        <StyledHabitName>{habit.name}</StyledHabitName>
        {isStatsOpen && (
          <CurrentHabitModal
            setIsStatsOpen={setIsStatsOpen}
            isStatsOpen={isStatsOpen}
            habit={habit}
          />
        )}
      </Container>
    </StyledHabitItem>
  );
};

const Container = styled.div`
  display: flexbox;
  align-items: center;
`;
const StyledHabitName = styled.div`
  font-size: 2em;
`;

const StyledHabitItem = styled.div`
  width: 35%;
  margin: 20px;
  padding: 20px;
  border: 1px solid black;
  &:hover {
    background-color: steelblue;
  }
`;
export default HabitListItem;
