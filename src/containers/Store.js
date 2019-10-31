import React, { useEffect, useState } from "react";
import StoreItems from "./StoreItems";
import axios from "axios";

const Store = ({
  cookies,
  setMode,
  userCoin,
  setUserCoin,
  updateCoinInDatabase
}) => {
  const [items, setItems] = useState({});
  console.log(userCoin);
  const buyItems = event => {
    event.preventDefault();
    let total = 0;
    const boughtItems = {};
    for (let key in items) {
      if (items[key]['quantity'] !== 0) {
        boughtItems[key] = items[key].quantity;
        total += items[key].price * items[key].quantity;
      }
    }

    if (total > userCoin[0]["coin"]) {
      console.log("too expensive for you, make more money dude");
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
          console.log("hello");
          updateCoinInDatabase(cookies.github_id);
          setMode("farm");
        });
    }
  };

  return (
    <form onSubmit={buyItems}>
      <StoreItems items={items} setItems={setItems} />
      <button type="submit">Buy and Save the Earth!</button>
    </form>
  );
};

export default Store;
