import React from "react";
import FarmTiles from "../components/FarmTiles";
import styled from "styled-components";

const Farm = () => {
  return (
    <div>
      <div>
        <StyledFarmTiles img="https://pm1.narvii.com/6476/689c055131cc410ad010c620810838e07f84eadb_hq.jpg" />
        <StyledFarmTiles img="https://pm1.narvii.com/6476/689c055131cc410ad010c620810838e07f84eadb_hq.jpg" />
        <StyledFarmTiles img="https://pm1.narvii.com/6476/689c055131cc410ad010c620810838e07f84eadb_hq.jpg" />
      </div>
      <div>
        <StyledFarmTiles img="https://pm1.narvii.com/6476/689c055131cc410ad010c620810838e07f84eadb_hq.jpg" />
        <StyledFarmTiles img="https://pm1.narvii.com/6476/689c055131cc410ad010c620810838e07f84eadb_hq.jpg" />
        <StyledFarmTiles img="https://pm1.narvii.com/6476/689c055131cc410ad010c620810838e07f84eadb_hq.jpg" />
      </div>
      <div>
        <StyledFarmTiles img="https://pm1.narvii.com/6476/689c055131cc410ad010c620810838e07f84eadb_hq.jpg" />
        <StyledFarmTiles img="https://pm1.narvii.com/6476/689c055131cc410ad010c620810838e07f84eadb_hq.jpg" />
        <StyledFarmTiles img="https://pm1.narvii.com/6476/689c055131cc410ad010c620810838e07f84eadb_hq.jpg" />
      </div>
    </div>
  );
};

// NOT WORKING
const StyledFarmTiles = styled(FarmTiles)`
  width: 25%;
  border: 1px solid black;
`;

export default Farm;
