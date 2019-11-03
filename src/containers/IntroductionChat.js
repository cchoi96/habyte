import React, { Fragment } from "react";
import styled from "styled-components";

const IntroductionChat = ({
  chatObj,
  chatNum,
  setChatNum,
  setName,
  name,
  setAnimal,
  animal,
  cookies,
  submitData
}) => {
  const input = obj => {
    if (obj.input) {
      return (
        <input
          type="text"
          id="name"
          placeholder="Name"
          onChange={() => setName(document.getElementById("name").value)}
        ></input>
      );
    }
  };

  const catOrDog = obj => {
    if (obj.image) {
      return (
        <StyledAnimals>
          <StyledImg
            className="animalImg"
            src="/assets/other/dog.gif"
            name="dog"
            animal={animal}
            onClick={() => setAnimal("dog")}
          />
          <StyledImg
            className="animalImg"
            src="/assets/other/cat.gif"
            name="cat"
            animal={animal}
            onClick={() => {
              setAnimal("cat");
            }}
          />
        </StyledAnimals>
      );
    }
  };

  const handleClick = event => {
    if (chatNum === 9 && name.length === 0) {
      event.preventDefault();
    } else {
      setChatNum(chatNum + 1);
    }
  };

  const finalChat = obj => {
    if (obj.final) {
      return <button onClick={submitData}>Start Farming!</button>;
    } else {
      return <button onClick={handleClick}>Next</button>;
    }
  };

  const renderMonkaS = obj => {
    if (chatNum === 6) {
      return <img src="/assets/other/monkas.png" alt="monkaS" id="monkaS" />;
    }
  };

  return (
    <StyledDiv>
      <div className="convo">
        <div className="convo-box">
          <img
            src="/assets/other/lewis_chat.png"
            alt="lewis chat box"
            className="chat"
          />
          <p>
            {chatObj[chatNum].message} {renderMonkaS(chatObj[chatNum])}
          </p>
          {input(chatObj[chatNum])}
          {catOrDog(chatObj[chatNum])}
        </div>
        <img src="/assets/other/lewis.png" alt="lewis" className="profile" />
      </div>
      <StyledButtons>
        {finalChat(chatObj[chatNum])}
        {chatNum < 9 && (
          <button onClick={() => setChatNum(9)}>Skip dialogue</button>
        )}
      </StyledButtons>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  font-weight: 600;
  flex-direction: column;
  justify-content: center;
  background-image: url("https://store-images.s-microsoft.com/image/apps.46577.65985311967005000.4f51b5e9-febf-4990-8951-33ba59b634c9.53fbd86d-c51b-4aa2-86e8-b4f5a8b4e7b2?mode=scale&q=90&h=1080&w=1920");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  #monkaS {
    display: inline;
    width: 30px;
  }
`;

const StyledAnimals = styled.div`
  width: 250px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  img {
    width: 50px;
    height: 50px;
    cursor: pointer;
  }
`;

const StyledImg = styled.img`
  width: 50px;
  height: 50px;
  transform: ${props => (props.animal === props.name ? "scale(1.5)" : "1")};
  transition: 0.1s ease;
`;

const StyledButtons = styled.div`
  margin: 20px auto;
  display: flex;
  justify-content: center;
  button {
    margin: 0 20px 0 20px;
    border-radius: 5px;
    border: 2px solid rgba(136, 54, 0);
    background-color: rgba(172, 79, 1, 1);
    color: #fff;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    outline: none;
  }

  button:hover {
    background-color: rgba(172, 79, 1, 0.85);
  }
`;

export default IntroductionChat;
