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
              Week {habit.crop_state}
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
                <div id="button-div">
                  <button onClick={sellCrop}>Sell</button>
                </div>
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
  margin-top: 5px;
  width: 75px;
  border-radius: 5px;
  border: 2px solid rgba(136, 54, 0);
  background-color: rgba(172, 79, 1, 1);
  color: #fff;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  outline: none;

  &: hover {
    background-color: rgba(172, 79, 1, 0.85);
    color: white;
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

  #button-div {
    display: flex;
    justify-content: center;
  }

  button {
    margin-top: 5px;
    width: 50px;
    border-radius: 5px;
    border: 2px solid rgba(136, 54, 0);
    background-color: rgba(172, 79, 1, 1);
    color: #fff;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    outline: none;

    &: hover {
      background-color: rgba(172, 79, 1, 0.85);
      color: white;
    }
  }
`;
const StyledHover = styled.div`
  position: absolute;
  width: max-content;
  transform: ${props => (props.top ? "translateY(60%)" : "translateY(-80%)")};
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 1);
  z-index: 1000;

  @media only screen and (max-width: 1100px) {
    transform: ${props => (props.top ? "translateY(50%)" : "translateY(-50%)")};
  }

  @media only screen and (max-width: 950px) {
    transform: ${props => (props.top ? "translateY(40%)" : "translateY(-45%)")};
  }
`;
export default FarmTiles;
