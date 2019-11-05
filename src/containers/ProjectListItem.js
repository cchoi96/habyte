import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from 'styled-components'

const ProjectListItem = ({
  cookies,
  setModalOpen,
  projectName,
  projectNumberCommit,
  className,
  setProjectSelected,
  projectid
}) => {
  const [commits, setCommits] = useState(0);

  useEffect(() => {
    console.log("COOKIES ==>", cookies);
    console.log(commits);
    axios
      .get(
        `https://api.github.com/repos/${cookies.github_name}/${projectName}/contributors`
      )
      .then(res => {
        const contributors = res.data;
        let commits = 0;
        contributors.forEach(contributor => {
          commits += contributor.contributions;
        });
        setCommits(commits);
      });
  }, []);

  return (
    <li
      className={className}
      onClick={() => {
        setProjectSelected(projectid);
      }}
    >
      <div className="projectName">{projectName}</div>
      <div className="projectCommit">Commits: {commits}</div>
    </li>
  );
};

export default ProjectListItem;