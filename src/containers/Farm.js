import React from "react";
import FarmTiles from "../components/FarmTiles";
import styled from "styled-components";

const Farm = ({ habits, updateHabits, cookies }) => {
  return (
    <StyledContainer>
      <StyledDiv>
        <div style={{ display: "flex" }}>
          <StyledFarmTiles
            habit={habits[0]}
            img={"assets/other/soil-tile-tl.png"}
          />
          <StyledFarmTiles
            habit={habits[1]}
            img={"assets/other/soil-tile-tm.png"}
          />
          <StyledFarmTiles
            habit={habits[2]}
            img={"assets/other/soil-tile-tr.png"}
          />
        </div>
        <div style={{ display: "flex" }}>
          <StyledFarmTiles
            habit={habits[3]}
            img={"assets/other/soil-tile-ml.png"}
          />
          <StyledFarmTiles
            habit={habits[4]}
            img={"assets/other/soil-tile-mm.png"}
          />
          <StyledFarmTiles
            habit={habits[5]}
            img={"assets/other/soil-tile-mr.png"}
          />
        </div>
        <div style={{ display: "flex" }}>
          <StyledFarmTiles
            habit={habits[6]}
            img={"assets/other/soil-tile-bl.png"}
          />
          <StyledFarmTiles
            habit={habits[7]}
            img={"assets/other/soil-tile-bm.png"}
          />
          <StyledFarmTiles
            habit={habits[8]}
            img={"assets/other/soil-tile-br.png"}
          />
        </div>
      </StyledDiv>
      <img src="/assets/other/farm.png" alt="farm house" id="farm-house" />
      <img
        src="/assets/other/cat.gif"
        id="animal"
        onClick={() => console.log("<3")}
      />
    </StyledContainer>
  );
};

const StyledFarmTiles = styled(FarmTiles)`
  position: relative;
  .fruitImg {
    position: absolute;
    top: 30%;
    left: 30%;
    transition: 0.1s ease-out;
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
  @media only screen and (max-width: 950px) {
    order: 2;
    min-width: 300px;
  }
`;

const StyledContainer = styled.div`
  display: flex;
  height: 80vh;
  width: 70vw;
  margin-left: 3vw;
  border-radius: 10px;
  background-image: url("/assets/other/soil.png");
  background-repeat: repeat;
  background-size: 100px 100px;
  img {
    max-width: 30vw;
    max-height: 30vw;
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
    flex-direction: column;
    img {
      order: 1;
    }
    #farm-house {
      min-width: 250px;
      min-height: 220px;
    }
  }
}
`;

export default Farm;
