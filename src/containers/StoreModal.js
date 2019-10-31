import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";

const StoreModal = () => {
  const customStyles = {
    content: {
      width: "100%",
      overflow: "scroll",
      height: "80vh",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)"
    }
  };

  // Required to set link modal to react app
  Modal.setAppElement(document.getElementById("root"));

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Store Modal"
      >
        <h2>Store</h2>
        <button onClick={closeModal}>close</button>
        <form>
          <label>Store: </label>
          <label>Notes: </label>
          <button onClick={saveHabit}>Submit</button>
        </form>
      </Modal>
    </div>
  );
};

export default StoreModal;
