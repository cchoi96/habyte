import React from "react";
import FarmTiles from "../components/FarmTiles";
import styled from "styled-components";

const Farm = ({ habits, updateHabits, cookies }) => {
  return (
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
  width: 60vw;
  height: 60vw;
  margin-left: 5vw;
`;

export default Farm;
