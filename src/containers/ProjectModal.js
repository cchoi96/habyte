import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";

const ProjectModal = ({ setIsOpen, isOpen, repos, cookies }) => {
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

  const saveProject = event => {
    event.preventDefault();
    setIsOpen(false);
    const selectedProject = [];
    for (let project in data) {
      if (data[project] === true) {
        selectedProject.push(project);
      }
    }
    console.log(selectedProject);

    axios.post("http://0.0.0.0:8080/project-save", {
      repos: selectedProject,
      github_id: cookies.github_id
    });

  };

  const data = {};
  const repoList = repos.map(repo => {
    data[repo] = false;
    return (
      <div key={repo}>
        <input
          type="checkbox"
          onChange={() => (data[repo] = !data[repo])}
          id={repo}
          name="repo"
          value={repo}
        />
        <label>{repo} </label>
      </div>
    );
  });

  console.log(repoList);

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
          <button onClick={saveProject} type="submit">
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default ProjectModal;
