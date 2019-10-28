import React from "react";
import styled from "styled-components";

const Footer = () => {
  let year = new Date().getFullYear();
  return (
    <StyledDiv>
      <p>Made with ❤️ by Chris, Gary, and Michael &copy;{year}</p>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
`;

export default Footer;
