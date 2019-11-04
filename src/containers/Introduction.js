import React, { useState } from "react";
import styled from "styled-components";
import IntroductionChat from "./IntroductionChat";
import axios from "axios";
import { history } from "../App";

const Introduction = ({ cookies, setUserInfo }) => {
  const [chatNum, setChatNum] = useState(0);
  const [name, setName] = useState("");
  const [animal, setAnimal] = useState("dog");
  const chatObj = {
    0: {
      message:
        "Hi there! My name is Lewis and I would like to welcome you to Habyte!",
      input: false,
      image: false
    },
    1: {
      message:
        "Habyte is a gamified habit tracking tool made by developers for developers.",
      input: false,
      image: false
    },
    2: {
      message:
        "After you finish talking with me, you will see a mostly empty farm made of 9 tiles. Each tile represents one new habit.",
      input: false,
      image: false
    },
    3: {
      message:
        "Other than the automatically generated coding habit, you get up to 8 new habits, making it a habyte... haha",
      input: false,
      image: false
    },
    4: {
      message:
        "To create a habit, simply click the habit category of choice and click the (+) button.",
      input: false,
      image: false
    },
    5: {
      message:
        "To get your crops to grow, you must check off your habit on the New Habits as complete. If you are able to meet or exceed your habit frequency, your crop grows!",
      input: false,
      image: false
    },
    6: {
      message: "If you ignore your habits… they will die...",
      input: false,
      image: false
    },
    7: {
      message:
        "At the end of 4 weeks, your crop will be fully grown, which you can admire and sell for items in our shop! ",
      input: false,
      image: false
    },
    8: {
      message:
        "You can buy real strawberries, melons, grapes, or even plant a real tree! Are you ready to get started?",
      input: false,
      image: false
    },
    9: {
      message: `Currently, I only know you as your boring Github ID: ${cookies.github_id}. What is your real name?`,
      input: true,
      image: false
    },
    10: {
      message: `One final thing… do you prefer dogs or cats?`,
      input: false,
      image: true
    },
    11: {
      message: `Cool! Thanks for listening to an old man ramble... Thank you, and good luck farming!`,
      input: false,
      image: false,
      final: true
    }
  };

  const submitData = () => {
    axios
      .post(`http://0.0.0.0:8080/${cookies.github_id}`, {
        name,
        animal
      })
      .then(() => {
        setUserInfo(cookies.github_id, name, animal, cookies.github_name);
      })
      .then(() => {
        history.push("/home");
      });
  };

  return (
    <StyledDiv>
      <audio autoPlay loop>
        <source src="assets/music.mp3" type="audio/mp3" />
      </audio>
      <IntroductionChat
        chatObj={chatObj}
        chatNum={chatNum}
        setChatNum={setChatNum}
        setName={setName}
        name={name}
        setAnimal={setAnimal}
        animal={animal}
        cookies={cookies}
        submitData={submitData}
      />
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  width: 100%;
  padding: 0;
  height: 100vh;
  margin: 0 auto;
  .profile {
    width: 220px;
    height: 200px;
    border-radius: 5px;
  }

  .chat {
    width: 350px;
    height: 200px;
    position: absolute;
    z-index: -1;
  }

  .convo {
    display: flex;
    justify-content: center;
    width: 750x;
    margin: 0 auto;
  }

  .convo-box {
    max-width: 350px;
    display: flex;
    flex-direction: column;
    z-index: 999;
    p {
      margin: 5% auto 0 auto;
      width: 80%;
      font-size: 1.1em;
    }

    input {
      width: 50%;
      margin: 10px auto 0 auto;
      border-radius: 5px;
    }
  }
`;

export default Introduction;
