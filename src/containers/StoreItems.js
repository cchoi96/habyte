import React, { useEffect, useState } from "react";
import axios from "axios";

const StoreItems = () => {
  const [storeItems, SetstoreItems] = useState([]);

  useEffect(() => {
    axios.get(`http://0.0.0.0:8080/store`).then(res => {
      SetstoreItems(res.data);
      console.log(res.data);
    });
  }, []);

  const StoreItemList = storeItems.forEach(item => {
    return (
      <div>
        <div>{item.name}</div>
        <div>{item.price}</div>
        <div>{item.description}</div>
      </div>
    );
  });

  return <div>{StoreItemList}</div>;
};

export default StoreItems;
