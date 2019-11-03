import React, { useState } from "react";
import StoreItems from "./StoreItems";
import axios from "axios";
import styled from "styled-components";

const Store = ({
  cookies,
  setMode,
  userCoin,
  setUserCoin,
  updateCoinInDatabase
}) => {
  const [items, setItems] = useState({});
  const buyItems = event => {
    event.preventDefault();
    let total = 0;
    const boughtItems = {};
    for (let key in items) {
      if (items[key]["quantity"] !== 0) {
        boughtItems[key] = items[key].quantity;
        total += items[key].price * items[key].quantity;
      }
    }

    if (total > userCoin[0]["coin"]) {
      alert("too expensive for you, make more money dude");
    } else {
      const updateCoin = [...userCoin];
      updateCoin[0]["coin"] -= total;
      setUserCoin(updateCoin);
      axios
        .put(`http://0.0.0.0:8080/buy`, {
          name: cookies.github_id,
          items: boughtItems
        })
        .then(() => {
          updateCoinInDatabase(cookies.github_id);
          setMode("farm");
        });
    }
  };

  return (
    <StyledStore>
      <form onSubmit={buyItems}>
        <StyledTitle>Plant It</StyledTitle>
        <StoreItems items={items} setItems={setItems} />
        <button type="submit">Buy and Save the Earth!</button>
      </form>
    </StyledStore>
  );
};

const StyledTitle = styled.div`
  background-color: rgba(36, 160, 143, 1);
  text-color: white;
  width: 40%;
  height: fit-content;
  margin: 0 auto;
  text-align: center;
  font-size: 5vh;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  color: #fff;
  margin-bottom: 20px;

  @media only screen and (max-width: 420px) {
    width: 60%;

  }
`;

const StyledStore = styled.div`
  width: 80%;
  border: 1px black solid;
  background-color: rgba(36, 200, 143, 0.6);
  border-radius: 10px;

  margin-left: 30px
    
  form {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  button {
    margin-bottom: 5vh;
    border: 1px solid black;
    border-radius: 10px;
    cursor: pointer
    padding: 3px 10px;

    &: hover {
      transform: scale(1.02);
      background-color: rgba(36, 160, 143, 1);
      font-weight: bold;
      color: #FFFFFF
  }




`;

export default Store;
