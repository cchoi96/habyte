import React, { useState, useEffect } from "react";
import ProjectModal from "./ProjectModal";
import axios from "axios";

const AddProject = ({cookies, refreshList}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.github.com/users/cchoi96/repos`)
      .then(res => {
        return res.data.map(repo => repo.name);
      })
      .then(res => {
        setRepos(res);
      });
  }, []);

  return (
    <div>
      <img src="/assets/other/plus.png" onClick={() => setIsOpen(true)}></img>
      {isOpen && (
        <ProjectModal refreshList={refreshList} cookies={cookies} setIsOpen={setIsOpen} isOpen={isOpen} repos={repos} />
      )}
    </div>
  );
};

export default AddProject;
