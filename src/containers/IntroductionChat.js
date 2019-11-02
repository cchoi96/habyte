import React from "react";
import styled from "styled-components";

const IntroductionChat = ({ chatObj, chatNum, setChatNum }) => {
  const input = obj => {
    if (obj.input) {
      return <input type="text" id="name" placeholder="Name"></input>;
    }
  };

  const catOrDog = obj => {
    if (obj.image) {
      return (
        <StyledAnimals className="animals">
          <img className="animalImg" src="/assets/other/dog.gif" />
          <img className="animalImg" src="/assets/other/cat.gif" />
        </StyledAnimals>
      );
    }
  };

  return (
    <div className="convo">
      <div className="convo-box">
        <img
          src="/assets/other/lewis_chat.png"
          alt="lewis chat box"
          className="chat"
        />
        <p>{chatObj[chatNum].message}</p>
        {input(chatObj[chatNum])}
        {catOrDog(chatObj[chatNum])}
      </div>
      <img src="/assets/other/lewis.png" alt="lewis" />
      <button onClick={() => setChatNum(chatNum + 1)}>Next</button>
    </div>
  );
};

const StyledAnimals = styled.div`
  width: 250px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  .animalImg {
    width: 75px;
    margin: 10px;
    height: 75px;
  }
`;

export default IntroductionChat;
