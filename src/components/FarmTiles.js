import React, { useState } from "react";
import styled from "styled-components";
const FarmTiles = ({ className, img, habit }) => {
  const [showCropDetail, setShowCropDetail] = useState(false);

  const showDeets = () => {
    if (habit) {
      setShowCropDetail(true);
    }
  };
  const hideDeets = () => {
    setShowCropDetail(false);
  };

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
          </StyledUl>
        </StyledHover>
      )}
      <img className="soilTile" src={img} />

      {habit && (
        <img
          className="fruitImg"
          src={`/assets/crops/${habit.crop_name}/${habit.crop_name}_Stage_${habit.crop_state}.png`}
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
