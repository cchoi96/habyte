// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import InventoryListItems from "./InventoryListItems";

// const InventoryList = ({ cookies }) => {
//   const [inventoryList, setInventoryList] = useState([]);

//   useEffect(() => {
//     axios
//       .post("http://0.0.0.0:8080/inventory", {
//         github_id: cookies.github_id
//       })
//       .then(res => {
//         console.log("this is inventorylist", res.data);
//         setInventoryList(res.data);
//       });
//     // .then(() => {
//     //   const cropInventoryList = inventoryList.map((crop, index) => {
//     //     return <InventoryListItems crop={crop} key={index} />;
//     //   });
//     // });
//   }, []);

//   const cropInventoryList = inventoryList.map((crop, index) => {
//     return <InventoryListItems crop={crop} key={index} />;
//   });

//   return <div></div>;
// };

// export default InventoryList;
