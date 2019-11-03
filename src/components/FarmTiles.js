import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const FarmTiles = ({ className, img, habit, cookies }) => {
  const [showCropDetail, setShowCropDetail] = useState(false);

  const showDeets = () => {
    if (habit) {
      setShowCropDetail(true);
    }
  };
  const hideDeets = () => {
    setShowCropDetail(false);
  };

  const sellCrop = () => {
    console.log("sold your, ", habit.crop_name);
    axios.post("http://0.0.0.0:8080/user/crops", {
      user: cookies.github_id,
      habit: habit
    });
  };

  const cropImage = (habit) => {
    return habit.crop_state === 0 ? `/assets/crops/rotten_plant.png` : `/assets/crops/${habit.crop_name}/${habit.crop_name}_Stage_${habit.crop_state}.png`
  }

  return (
    <div className={className} onMouseOver={showDeets} onMouseLeave={hideDeets}>
      {showCropDetail && (
        <StyledHover>
          <StyledUl>
            <li>
              {habit.crop_name[0].toUpperCase() + habit.crop_name.slice(1)}:
              Lvl. {habit.crop_state}
            </li>
            <li>habit task: {habit.name}</li>
            {habit.notes && <li>Notes: {habit.notes}</li>}
            <li>Habit started: {habit.created_at.slice(0, 10)}</li>
            <li>
              Habit is currently
              {habit.is_already_dying ? " dying :(" : " healthy!"}
            </li>
          </StyledUl>
          {habit.crop_state === 5 && (
            <div>
              Sell ripe {habit.crop_name}
              <button onClick={sellCrop}> Sell </button>
            </div>
          )}
        </StyledHover>
      )}
      <img className="soilTile" src={img} />

      {habit && (
        <img
          className="fruitImg"
          src={cropImage(habit)}
        />
      )}
    </div>
  );
};

const StyledUl = styled.ul`
  padding: 10px;
  list-style: none;
`;
const StyledHover = styled.div`
  position: fixed;
  background-color: rgba(150, 255, 150, 0.6);
  z-index: 10;
`;
export default FarmTiles;
