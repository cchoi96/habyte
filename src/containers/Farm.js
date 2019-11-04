import React from "react";
import FarmTiles from "../components/FarmTiles";
import styled from "styled-components";

const Farm = ({
  habits,
  updateHabits,
  cookies,
  userCoin,
  setUserCoin,
  updateCoinInDatabase,
  setHabits
}) => {
  return (
    <StyledContainer>
      <StyledDiv>
        <div style={{ display: "flex" }}>
          <StyledFarmTiles
            habit={habits[0]}
            img={"assets/other/soil-tile-tl.png"}
            setUserCoin={setUserCoin}
            updateCoinInDatabase={updateCoinInDatabase}
            userCoin={userCoin}
            cookies={cookies}
            updateHabits={updateHabits}
            habits={habits}
          />
          <StyledFarmTiles
            habit={habits[1]}
            img={"assets/other/soil-tile-tm.png"}
            setUserCoin={setUserCoin}
            updateCoinInDatabase={updateCoinInDatabase}
            userCoin={userCoin}
            cookies={cookies}
            updateHabits={updateHabits}
            habits={habits}
          />
          <StyledFarmTiles
            habit={habits[2]}
            img={"assets/other/soil-tile-tr.png"}
            setUserCoin={setUserCoin}
            updateCoinInDatabase={updateCoinInDatabase}
            userCoin={userCoin}
            cookies={cookies}
            updateHabits={updateHabits}
            habits={habits}
          />
        </div>
        <div style={{ display: "flex" }}>
          <StyledFarmTiles
            habit={habits[3]}
            img={"assets/other/soil-tile-ml.png"}
            setUserCoin={setUserCoin}
            updateCoinInDatabase={updateCoinInDatabase}
            userCoin={userCoin}
            cookies={cookies}
            updateHabits={updateHabits}
            habits={habits}
          />
          <StyledFarmTiles
            habit={habits[4]}
            img={"assets/other/soil-tile-mm.png"}
            setUserCoin={setUserCoin}
            updateCoinInDatabase={updateCoinInDatabase}
            userCoin={userCoin}
            cookies={cookies}
            updateHabits={updateHabits}
            habits={habits}
          />
          <StyledFarmTiles
            habit={habits[5]}
            img={"assets/other/soil-tile-mr.png"}
            setUserCoin={setUserCoin}
            updateCoinInDatabase={updateCoinInDatabase}
            userCoin={userCoin}
            cookies={cookies}
            updateHabits={updateHabits}
            habits={habits}
          />
        </div>
        <div style={{ display: "flex" }}>
          <StyledFarmTiles
            habit={habits[6]}
            img={"assets/other/soil-tile-bl.png"}
            setUserCoin={setUserCoin}
            updateCoinInDatabase={updateCoinInDatabase}
            userCoin={userCoin}
            cookies={cookies}
            updateHabits={updateHabits}
            habits={habits}
          />
          <StyledFarmTiles
            habit={habits[7]}
            img={"assets/other/soil-tile-bm.png"}
            setUserCoin={setUserCoin}
            updateCoinInDatabase={updateCoinInDatabase}
            userCoin={userCoin}
            cookies={cookies}
            updateHabits={updateHabits}
            habits={habits}
          />
          <StyledFarmTiles
            habit={habits[8]}
            img={"assets/other/soil-tile-br.png"}
            setUserCoin={setUserCoin}
            updateCoinInDatabase={updateCoinInDatabase}
            userCoin={userCoin}
            cookies={cookies}
            updateHabits={updateHabits}
            habits={habits}
          />
        </div>
      </StyledDiv>
      <img src="/assets/other/farm.png" alt="farm house" id="farm-house" />
      <img
        src={`/assets/other/${cookies.animal}.gif`}
        id="animal"
        onClick={() => console.log("<3")}
      />
    </StyledContainer>
  );
};

export { Farm };

const StyledFarmTiles = styled(FarmTiles)`
  position: relative;
  .fruitImg {
    position: absolute;
    top: 10%;
    left: 30%;
    transition: 0.1s ease-out;
    z-index: 5;
  }

  .soilTile {
    width: 100%;
  }

  &:hover {
    .fruitImg {
      transform: scale(1.3);
    }
  }
`;

const StyledDiv = styled.div`
  width: 30vw;
  height: 30vw;
  margin-left: 5vw;
  align-self: center;
  @media only screen and (max-width: 750px) {
    order: 2;
    min-width: 240px;
    width: 20vw;
    height: 20vw;
  }
`;

const StyledContainer = styled.div`
  display: flex;
  height: 80vh;
  min-height: 500px;
  width: 70vw;
  margin-left: 3vw;
  border-radius: 10px;
  background-image: url("/assets/other/soil.png");
  background-repeat: repeat;
  background-size: 90px 90px;
  box-shadow: 0 2px 2px 0 rgba(26, 24, 29, 0.16),
  0 1px 4px 0 rgba(26, 24, 29, 0.12);
  img {
    max-width: 33vw;
    max-height: 33vw;
    align-self: center;
  }
  #animal {
    width: 70px;
    height: 70px;
    position: absolute;
    top: 70%;
    left: 71%;
  }

  @media only screen and (max-width: 950px) {
    width: 88vw;
    height: 70vh;
    justify-content: center;
    order: 1;
  }
  @media only screen and (max-width: 750px) {
    flex-direction: column;
    width: 88vw;
    height: 70vh;
    justify-content: flex-start;
    img {
      order: 1;
    }
    #farm-house {
      margin-top: 10px;
      min-width: 240px;
      min-height: 210px;
    }
  }
}
`;
