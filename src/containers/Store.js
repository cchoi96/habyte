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
        <StyledTitle><u>STORE</u></StyledTitle>
        <StoreItems items={items} setItems={setItems} />
        <button type="submit">Buy and Save the Earth!</button>
      </form>
    </StyledStore>
  );
};

const StyledTitle = styled.div`
  display: flex;
  justify-content: center;
  font-family: bold;
  font-size: 5vw;
  width: 70%;

`;

const StyledStore = styled.div`
  width: 80%;
  margin-left: 20px

  form {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
`;


export default Store;
