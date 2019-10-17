import React from "react";
import styled from "styled-components";

const FarmTiles = ({ img }) => {
  return <StyledImage src={img} />;
};

const StyledImage = styled.img`
  width: 50px;
`;

export default FarmTiles;
