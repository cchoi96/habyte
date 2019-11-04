import React, { useState } from "react";
import StoreItems from "./StoreItems";
import axios from "axios";
import styled from "styled-components";

const Store = ({ cookies, setMode, userCoin, setUserCoin }) => {
  const [items, setItems] = useState({});

  const buyItem = item => {
    const boughtItems = {};
    boughtItems[item.name] = {
      quantity: 1
    };
    let total = item.price;

    if (total > userCoin) {
      console.log("too expensive for you, make more money dude");
    } else {
      let updateCoin = userCoin;
      updateCoin -= total;
      setUserCoin(updateCoin);
      axios
        .put(`http://0.0.0.0:8080/buy`, {
          name: cookies.github_id,
          items: boughtItems
        })
        .then(() => {
          setMode("farm");
        });
    }
  };

  return (
    <StyledStore>
      <StyledTitle>Plant It</StyledTitle>
      <StoreItems items={items} setItems={setItems} buyItem={buyItem} />
    </StyledStore>
  );
};

const StyledTitle = styled.div`
  background-color: rgba(36, 204, 143);
  text-color: white;
  width: 40%;
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
  display: flex;
  flex-direction: column;
  height: 80vh;
  min-height: 500px;
  width: 70vw;
  margin-left: 3vw;
  border-radius: 10px;
  background-color: rgba(36, 200, 143, 0.6);
  box-shadow: 0 2px 2px 0 rgba(26, 24, 29, 0.16),
  0 1px 4px 0 rgba(26, 24, 29, 0.12);
  overflow-y: scroll;
  
  @media only screen and (max-width: 950px) {
    width: 88vw;
    height: 70vh;
    order: 1;
    margin-bottom: 100px;
  }
}`;

export default Store;
