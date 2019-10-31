import React, { useState } from "react";
import Modal from "react-modal";

const CurrentHabitModal = ({ habit, setIsStatsOpen, isStatsOpen }) => {
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
    setIsStatsOpen(true);
  };

  const closeModal = () => {
    setIsStatsOpen(false);
    console.log(isStatsOpen);
  };

  const closeHabitModal = e => {
    e.preventDefault();
    console.log("hello");
    setIsStatsOpen(false);
    console.log(isStatsOpen);
    closeModal();
  };

  return (
    <div>
      <Modal
        isOpen={isStatsOpen}
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

export default CurrentHabitModal;
