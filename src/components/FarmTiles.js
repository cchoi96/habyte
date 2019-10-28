import React from "react";

const FarmTiles = ({ className, img, habit }) => {
  return (
    <div className={`${className}`}>
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

export default FarmTiles;
