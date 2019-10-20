import React from "react";
import styled from "styled-components";

const FarmTiles = props => {
  return <StyledImage className={props.className} src={props.img} />;
};

const StyledImage = styled.img`
  width: 50px;
`;

export default FarmTiles;
