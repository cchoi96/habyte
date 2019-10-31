import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";

const HabitModal = ({ habit, setIsOpen, isOpen }) => {
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
      Testing
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Habit Modal"
      >
        <h2>{habit.name}</h2>
        <button onClick={closeModal}>close</button>
      </Modal>
    </div>
  );
};

export default HabitModal;
