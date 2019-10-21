import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProjectListItem from "./ProjectListItem";
import { sortableContainer, sortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";

const SortableItem = sortableElement(({ value }) => (
  <div style={{ width: "30%", margin: "100px" }}>{value}</div>
));

const SortableContainer = sortableContainer(({ children }) => {
  return <div style={{ width: "30%" }}>{children}</div>;
});

const ProjectList = ({ array, className }) => {
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    setProjectList(array);
  }, [array]);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setProjectList(arrayMove(array, oldIndex, newIndex));
  };

  let projectListItems = projectList.map((item, index) => {
    return (
      <SortableItem
        key={`item-${item.name}`}
        index={index}
        value={
          <StyledProjectListItem
            projectName={item.name}
            projectCropImage={item.name}
            projectStatus={item.status}
          />
        }
      ></SortableItem>
    );
  });
  return (
    <StyledSortableContainer onSortEnd={onSortEnd}>
      {projectListItems}
    </StyledSortableContainer>
  );
};

const StyledProjectListItem = styled(ProjectListItem)`
  width: 30%;
  justify-content: center;
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
  display: flex;
`;

export default ProjectList;
