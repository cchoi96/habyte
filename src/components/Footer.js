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
  width: 100%;
  margin: 0 auto;
  font-size: 0.8em;
  p {
    margin-bottom: 10px;
  }
`;

export default Footer;
