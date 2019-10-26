import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProjectListItem from "./ProjectListItem";
import { sortableContainer, sortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import axios from "axios";

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
//
const ProjectList = ({ array, className }) => {
  const [projectList, setProjectList] = useState([]);

  console.log("project-list", projectList);

  useEffect(() => {
    setProjectList(array);
  }, [array]);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setProjectList(arrayMove(projectList, oldIndex, newIndex));
  };

  const projectImages = async () => {
    let images = await Promise.all(
      projectList.map(item => {
        console.log("Item ==>", item);
        axios
          .post("http://0.0.0.0:8080/project-crops", {
            name: item.crop_name,
            state: item.crop_state
          })
          .then(res => {
            return res.data[0].image_url;
          });
      })
    );
    return images;
  };

  projectImages().then(data => {
    console.log("Data ==>", data);
  });

  return (
    <StyledSortableContainer
      style={{ border: "1px solid black" }}
      onSortEnd={onSortEnd}
    >
      {/* {combinedProjectListItems} */}
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
