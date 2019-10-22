import React, { useEffect } from "react";
import axios from 'axios';

const InventoryList = () => {
  useEffect(() => {
    axios.post('http://0.0.0.0:8080/inventory', {
      github_id
    })
    .then((res) => {
      console.log(res.data)
    })
  }, []);


  return <div></div>;
};

export default InventoryList;
