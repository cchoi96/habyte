import React, { useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import crops from "../helpers/cropprices";

const FarmTiles = ({
  className,
  img,
  habit,
  setUserCoin,
  updateCoinInDatabase,
  userCoin,
  cookies,
  habits,
  updateHabits
}) => {
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
    let sellprice = crops[habit.crop_name];
    axios
      .delete("http://0.0.0.0:8080/user/crops", {
        data: { habit: habit }
      })
      .then(() => updateHabits(cookies.github_id))
      .then(() => {
        setUserCoin(userCoin + sellprice);
      });
  };

  const cropImage = habit => {
    return habit.crop_state === 0
      ? `/assets/crops/rotten_plant.png`
      : `/assets/crops/${habit.crop_name}/${habit.crop_name}_Stage_${habit.crop_state}.png`;
  };

  return (
    <div className={className} onMouseOver={showDeets} onMouseLeave={hideDeets}>
      {showCropDetail && habit && (
        <StyledHover>
          <StyledUl>
            <li>
              {habit.crop_name[0].toUpperCase() + habit.crop_name.slice(1)}:
              Lvl. {habit.crop_state}
            </li>
            <li>habit task: {habit.name}</li>
            {habit.notes && <li>Notes: {habit.notes}</li>}
            <li>Habit started: {habit.created_at.slice(0, 10)}</li>
            <li>habit id: {habit.id}</li>
            <li>
              Habit is currently
              {habit.is_already_dying ? " dying :(" : " healthy!"}
            </li>
          </StyledUl>
          {habit.crop_state === 2 && (
            <div>
              Sell ripe {habit.crop_name}
              <button onClick={sellCrop}> Sell </button>
            </div>
          )}
        </StyledHover>
      )}
      <img className="soilTile" src={img} />

      {habit && <img className="fruitImg" src={cropImage(habit)} />}
    </div>
  );
};

const StyledUl = styled.ul`
  padding: 10px;
  list-style: none;
`;
const StyledHover = styled.div`
  position: absolute;
  width: max-content;
  transform: translateY(-80%);
  background-color: rgba(150, 255, 150, 0.6);
  z-index: 10;
`;
export default FarmTiles;
