import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProjectListItem from "./ProjectListItem";
import { sortableContainer, sortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";

const SortableItem = sortableElement(
  ({ projectName, projectCropImage, projectStatus }) => (
    <StyledProjectListItem
      projectName={projectName}
      projectCropImage={projectCropImage}
      projectStatus={projectStatus}
    />
  )
);

const SortableContainer = sortableContainer(({ children }) => {
  return <ul>{children}</ul>;
});

const ProjectList = ({ array, className }) => {
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    setProjectList(array);
  }, [array]);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setProjectList(arrayMove(projectList, oldIndex, newIndex));
  };

  let combinedProjectList = projectList.map((item, index) => {
    return (
      <SortableItem
        key={item.name}
        index={index}
        projectName={item.name}
        projectCropImage={`/assets/crops/${item.crop_name}/${item.crop_name}_Stage_${item.crop_state}.png`}
        projectStatus={item.crop_state}
      ></SortableItem>
    );
  });

  return (
    <StyledSortableContainer
      style={{ border: "1px solid black" }}
      onSortEnd={onSortEnd}
    >
      {combinedProjectList}
    </StyledSortableContainer>
  );
};

const StyledProjectListItem = styled(ProjectListItem)`
  border: 1px solid black;
  width: 30%;
  margin: 30px;
  padding:
  list-style-type: none;
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

const StyledSortableContainer = styled(SortableContainer)`
  border: 1px solid black;
  list-style-type: none;
`;

export default ProjectList;
