import React from "react";
import styled from "styled-components";
import ProjectListItem from "./ProjectListItem";

const ProjectList = ({ array, className }) => {
  let projectList = array.map(item => {
    return (
      <StyledProjectListItem
        projectName={item.name}
        projectCropImage={item.crop}
        projectStatus={item.status}
      />
    );
  });
  return <ul className={className}>{projectList}</ul>;
};

const StyledProjectListItem = styled(ProjectListItem)`
  width: 30%;
  justify-content: center;
  .projectName {
    font-size: 1.5em;
  }

  .projectStatus {
    font-size: 1.5em;
  }

  img {
    width: 50px;
  }
`;

export default ProjectList;
