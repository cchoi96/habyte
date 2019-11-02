import React, { useState } from "react";
import styled from "styled-components";
const FarmTiles = ({ className, img, habit }) => {
  const [showCropDetail, setShowCropDetail] = useState(false);
  return (
    <div
      className={`${className}`}
      onMouseOver={() => {
        if (habit) {
          setShowCropDetail(true);
        }
      }}
      onMouseLeave={() => setShowCropDetail(false)}
    >
      {showCropDetail && <StyledHover> {habit.crop_name}</StyledHover>}
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

const StyledHover = styled.div`
  position: fixed;
  background-color: white;
  padding: 10px;
  z-index: 10;
`;
export default FarmTiles;
