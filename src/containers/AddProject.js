import React from "react";
import axios from "axios";

const AddProject = () => {
  const getRepos = () => {
    axios.get(`https://api.github.com/users/cchoi96/repos`).then(res => {
      let repos = res.data.map(repo => repo.name);
      console.log(repos);
    });
  };

  return <div onClick={getRepos}> Click Me! </div>;
};

export default AddProject;
