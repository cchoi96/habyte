import React, { useState } from "react";
import styled from "styled-components";
import CurrentHabitModal from "./CurrentHabitModal";

const HabitListItem = ({ habit, habit_name }) => {
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  return (
    <StyledHabitItem
      habit_name={habit_name}
      onClick={() => {
        setIsStatsOpen(true);
      }}
    >
      <Container>
        <StyledDiv>
          <img
            src={`/assets/crops/${habit.crop_name}/${habit.crop_name}_Stage_${habit.crop_state}.png`}
            alt=""
          />
          <div>
            <StyledHabitName>{habit.name}</StyledHabitName>
            {habit.counter}/{habit.frequency}
          </div>
        </StyledDiv>
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
  width: 250px;
  height: 250px;
  padding: 20px;
  margin: 20px;
  border-radius: 10px;
  background-color: rgb(237, 236, 238);
  box-shadow: 0 2px 2px 0 rgba(26, 24, 29, 0.16),
    0 1px 4px 0 rgba(26, 24, 29, 0.12);

  &:hover {
    box-shadow: 0 2px 2px 0 #fff, 0 1px 4px 0 #fff;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  img {
    width: 50px;
    margin: 0 auto;
  }
`;
export default HabitListItem;
