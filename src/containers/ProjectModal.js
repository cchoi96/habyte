import React, { useState } from "react";
import Modal from "react-modal";

const ProjectModal = ({ setIsOpen, isOpen, repos }) => {
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

  const repoList = repos.map(repo => {
    return (
      <div>
        <input type="checkbox" id={repo} name="repo" value={repo} />
        <label for={repo}>{repo} </label>
      </div>
    );
  });
  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>Hello</h2>
        <button onClick={closeModal}>close</button>
        <form method="POST" action="/project-save">
          {repoList}
          <button type="submit">Submit</button>
        </form>
      </Modal>
    </div>
  );
};

export default ProjectModal;
