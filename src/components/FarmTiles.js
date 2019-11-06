import React, { useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import crops from "../helpers/cropprices";

const FarmTiles = ({
  className,
  img,
  habit,
  setUserCoin,
  userCoin,
  cookies,
  habits,
  updateHabits,
  top
}) => {
  const [showCropDetail, setShowCropDetail] = useState(false);
  console.log(habits);
  const revive = () => {};
  const remove = () => {
    axios
      .delete("http://0.0.0.0:8080/user/crops", {
        data: { habit: habit }
      })
      .then(() => updateHabits(cookies.github_id));
  };

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
        <StyledHover top={top}>
          <StyledUl>
            <li>Habit: {habit.name}</li>
            <li>
              {habit.crop_name[0].toUpperCase() + habit.crop_name.slice(1)}:
              Lvl. {habit.crop_state}
            </li>

            {habit.notes && <li>Notes: {habit.notes}</li>}
            <li>Started: {habit.created_at.slice(0, 10)}</li>

            <li>
              Habit is currently
              {habit.crop_state === 0
                ? " dead."
                : habit.is_already_dying
                ? " dying."
                : " healthy!"}
            </li>

            {habit.crop_state === 0 && (
              <StyledButtonContainer>
                {/* <input onClick={revive} type="button" value="Revive" /> */}
                <StyledButton onClick={remove} type="button" value="Remove" />
              </StyledButtonContainer>
            )}
            {habit.crop_state === 5 && (
              <div>
                Sell ripe {habit.crop_name}
                <button onClick={sellCrop}> Sell </button>
              </div>
            )}
          </StyledUl>
        </StyledHover>
      )}
      <img className="soilTile" src={img} />

      {habit && <img className="fruitImg" src={cropImage(habit)} />}
    </div>
  );
};

const StyledButton = styled.input`
  border-radius: 10px;
  box-shadow: rgba(26, 24, 29, 0.16) 0px 2px 2px 0px,
    rgba(26, 24, 29, 0.12) 0px 1px 4px 0px;
  transition: 0.1s ease-in;
  background-color: rgba(36, 204, 143);
  border: none;
  &:hover {
    box-shadow: rgba(26, 24, 29, 0.32) 0px 2.5px 2px 1px,
      rgba(26, 24, 29, 0.25) 0px 1.5px 4px 1px;
  }
`;

const StyledButtonContainer = styled.div`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 0px;
  padding: 0px;
  display: flex;
  justify-content: space-around;
`;
const StyledUl = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 10px;
  list-style: none;
`;
const StyledHover = styled.div`
  position: absolute;
  width: max-content;
  transform: ${props => (props.top ? "translateY(55%)" : "translateY(-70%)")};
  border-radius: 10px;
  background-color: rgba(150, 255, 150, 0.6);
  z-index: 1000;
`;
export default FarmTiles;
