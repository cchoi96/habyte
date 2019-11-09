import React from "react";
import GithubProjectList from "./GithubProjectList";
import Modal from "react-modal";
import axios from "axios";
import styled from "styled-components";

const ProjectModal = ({ setIsOpen, isOpen, repos, cookies, refreshList }) => {
  const customStyles = {
    content: {
      display: "flex",
      justifyContent: "center",
      width: "65%",
      overflowY: "scroll",
      height: "70vh",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      textAlign: "left",
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      borderRadius: "10px",
      color: "#fff",
      paddingTop: "0"
    },
    overlay: {
      zIndex: "999"
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
    axios
      .post("http://0.0.0.0:8080/project-save", {
        repos: selectedProject,
        github_id: cookies.github_id
      })
      .then(() => {
        refreshList();
      });
  };

  const data = {};

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <StyledForm>
          <h2>{cookies.github_name}'s Repos</h2>
          <form method="POST" action="/project-save">
            <GithubProjectList repos={repos} data={data} />
            <button onClick={saveProject} type="submit">
              Save
            </button>
            <button onClick={closeModal}>Close</button>
          </form>
        </StyledForm>
      </Modal>
    </div>
  );
};

export default ProjectModal;

const StyledForm = styled.div`
  h2 {
    text-align: center;
    background-color: rgba(25, 181, 254, 1);
    width: 60%;
    overflow-wrap: break-word;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    margin: 0 auto 10px auto;
    padding: 5px 10px;
  }
  form {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    button {
      margin: 0 20px 20px 20px;
      border-radius: 5px;
      background-color: rgba(25, 181, 254, 1);
      color: #fff;
      box-shadow: 0 2px 2px 0 rgba(26, 24, 29, 0.16),
        0 1px 4px 0 rgba(26, 24, 29, 0.12);
      cursor: pointer;
      outline: none;
      transition: 0.1s ease-out;

      :hover {
        transform: scale(1.02);
      }
    }
  }
  cursor: pointer;
`;
