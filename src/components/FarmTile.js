import React from "react";

const FarmTile = ({ img, fruitImg = "/" }) => {
  return (
    <div>
      <img src={img} />
      <img className="fruitImg" src={fruitImg} />
    </div>
  );
};

export default FarmTile;
