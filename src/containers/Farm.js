import React from "react";
import Header from "../components/Header";
import FarmTiles from "../components/FarmTiles";
import styled from "styled-components";
import InventoryList from '../containers/InventoryList';

const Farm = ({ cookies }) => {
  return (
    <div>
      <Header cookies={cookies} />
      <div>
        <div style={{ display: "flex" }}>
          <StyledFarmTiles img={"assets/other/soil-tile-tl.png"} />
          <StyledFarmTiles img={"assets/other/soil-tile-tm.png"} />
          <StyledFarmTiles img={"assets/other/soil-tile-tr.png"} />
        </div>
        <div style={{ display: "flex" }}>
          <StyledFarmTiles img={"assets/other/soil-tile-ml.png"} />
          <StyledFarmTiles img={"assets/other/soil-tile-mm.png"} />
          <StyledFarmTiles img={"assets/other/soil-tile-mr.png"} />
        </div>
        <div style={{ display: "flex" }}>
          <StyledFarmTiles img={"assets/other/soil-tile-bl.png"} />
          <StyledFarmTiles img={"assets/other/soil-tile-bm.png"} />
          <StyledFarmTiles img={"assets/other/soil-tile-br.png"} />
        </div>
      </div>
    </div>
  );
};

// NOT WORKING
const StyledFarmTiles = styled(FarmTiles)`
  position: relative;
  .fruitImg {
    position: absolute;
    top: 30%;
    left: 30%;
    transition: 0.1s ease-out;
  }

  &:hover {
    .fruitImg {
      transform: scale(1.3);
    }
  }
`;

export default Farm;
