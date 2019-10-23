import React from "react";

const FarmTiles = ({ className, img }) => {
  return (
    <div className={`${className}`}>
      <img className="soilTile" src={img} />
      <img
        className="fruitImg"
        src={"/assets/crops/blueberry/Blueberry_Stage_6.png"}
      />
    </div>
  );
};

export default FarmTiles;
