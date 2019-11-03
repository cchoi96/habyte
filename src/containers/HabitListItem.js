import React, { useState } from "react";
import styled from "styled-components";
import CurrentHabitModal from "./CurrentHabitModal";

const HabitListItem = ({ habit, habit_name }) => {
  const [isStatsOpen, setIsStatsOpen] = useState(false);

  const cropImage = (habit) => {
    return habit.crop_state === 0 ? `/assets/crops/rotten_plant.png` : `/assets/crops/${habit.crop_name}/${habit.crop_name}_Stage_${habit.crop_state}.png`
  }

  return (
    <StyledHabitItem
      habit_name={habit_name}
      onClick={() => {
        setIsStatsOpen(true);
      }}
    >
      <Container>
        <StyledDiv>
          <div>
            <StyledHabitName>{habit.name}</StyledHabitName>
            {habit.counter}/{habit.frequency}
          </div>
          <img
            src={cropImage(habit)}
            alt=""
          />
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
  width: 20%;
  padding: 20px;
  margin: 20px 2.5%;
  border-radius: 10px;
  background-color: rgb(237, 236, 238);
  box-shadow: 0 2px 2px 0 rgba(26, 24, 29, 0.16),
    0 1px 4px 0 rgba(26, 24, 29, 0.12);
  height: 220px;
  &:hover {
    box-shadow: 0 2px 1px 3px rgba(26, 24, 29, 0.16),
      0 1px 1px 1px rgba(26, 24, 29, 0.12);
  }

  @media only screen and (max-width: 750px) {
    width: 40%;
    height: 200px;
    margin: 20px 5%;
  }

  @media only screen and (max-width: 500px) {
    width: 220px;
    height: 200px;
    margin: 20px auto;
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
