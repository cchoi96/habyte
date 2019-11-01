import React, { useEffect, useState } from "react";
import StoreItems from "./StoreItems";
import axios from "axios";

const Store = ({cookies}) => {
  const [items, setItems] = useState({});
  const buyItems = (event) => {
    event.preventDefault();

  }

  console.log(items)

  return (
    <form onSubmit={buyItems} >
      <StoreItems items={items} setItems={setItems}/>
      <button type="submit">Buy and Save the Earth!</button>
    </form>
  );
};

export default Store;
