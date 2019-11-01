import React, { useEffect, useState } from "react";
import axios from "axios";

const StoreItems = ({ items, setItems }) => {
  useEffect(() => {
    axios.get(`http://0.0.0.0:8080/store`).then(res => {
      let response = {};
      for (let data of res.data) {
        response[data.name] = {
          name: data.name,
          price: data.price,
          description: data.description,
          quantity: 0
        };
      }
      setItems(response);
    });
  }, []);

  const handleChange = (event) => {
    const itemName = event.target.name
    const itemQuantity = event.target.value
    let updatedItems = {...items};
    updatedItems[itemName]["quantity"] = itemQuantity
    setItems(updatedItems)
  };

  const StoreItemList = Object.keys(items).map(item => {
    console.log("KEYS ==>", Object.keys(items))
    return (
      <label key={items[item].name}>
        <div>Item Name: {items[item].name}</div>
        <div>Price: {items[item].price}</div>
        <div>Item Description: {items[item].description}</div>
        <input
          onChange={(event) => handleChange(event)}
          id={items[item].name}
          type="number"
          name={items[item].name}
          min="0"
          max="99"
        ></input>
      </label>
    );
  });
  return <div>{StoreItemList}</div>;
};

export default StoreItems;
