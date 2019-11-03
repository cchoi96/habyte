import React from "react";
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
      <img src="/assets/other/lewis.png" alt="lewis" className="profile" />

      {finalChat(chatObj[chatNum])}
      {chatNum < 9 && (
        <button onClick={() => setChatNum(9)}>Skip dialogue</button>
      )}
    </div>
  );
};

const StyledAnimals = styled.div`
  width: 250px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  img {
    width: 50px;
    height: 50px;
  }
`;

const StyledImg = styled.img`
  width: 50px;
  height: 50px;
  border: ${props => (props.animal === props.name ? "1px solid black" : "")};
`;

export default IntroductionChat;
