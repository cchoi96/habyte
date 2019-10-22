import React from "react";

const InventoryListItems = ({ cropInventory }) => {
  return (
    <div>
      <div>{cropInventory.name}</div>
      <div>{cropInventory.quantity}</div>
    </div>
  );
};

export default InventoryListItems;
