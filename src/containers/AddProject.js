import React, { useState, useEffect } from "react";
import ProjectModal from "./ProjectModal";
import axios from "axios";

const AddProject = ({ cookies, refreshList, projectList }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [repos, setRepos] = useState([]);

  const check_repo_existing = (repo, projectList) => {
    for (let project of projectList) {
      return project.name === repo.name ? true : "";
    }
  };

  //Add projectList as dependency, need to rerender this after projectList is changed
  useEffect(() => {
    axios
      .get(`https://api.github.com/users/cchoi96/repos`)
      .then(res => {
        let repoList = [];
        res.data.map(repo => {
          if (!check_repo_existing(repo, projectList)) {
            repoList.push(repo.name)
          }
        })
        return repoList;
      })
      .then(res => {
        setRepos(res);
      });
  }, [projectList]);

  return (
    <div>
      <img src="/assets/other/plus.png" onClick={() => setIsOpen(true)}></img>
      {isOpen && (
        <ProjectModal
          refreshList={refreshList}
          cookies={cookies}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          repos={repos}
        />
      )}
    </div>
  );
};

export default AddProject;
