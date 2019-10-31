import React, { useState } from "react";
import Modal from "react-modal";
import TrelloBoard from "./TrelloBoard";

const TrelloModal = ({
  modalOpen,
  setModalOpen,
  projectSelected,
  projectState,
  setProjectState
}) => {
  const customStyles = {
    content: {
      width: "80%",
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

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Trello Modal"
      >
        <button onClick={closeModal}>close</button>

        <TrelloBoard
          projectSelected={projectSelected}
          projectState={projectState}
          setProjectState={setProjectState}
        />
      </Modal>
    </div>
  );
};

export default TrelloModal;
