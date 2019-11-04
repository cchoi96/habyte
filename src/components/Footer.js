import React from "react";
import styled from "styled-components";

const Footer = () => {
  let year = new Date().getFullYear();
  return (
    <StyledDiv>
      Special thanks to ConcernedApe for all, and I mean literally all, the
      assets. ❤️ &copy;{year}
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 0px 5px;
  color: black;
  font-weight: 560;
  background-color: rgba(256, 256, 256, 0.6);
  width: fit-content;
  border-radius: 10px;
`;

export default Footer;
