import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import ProjectSelectionItems from "../containers/ProjectSelectionItems";

const ProjectSelections = ({ cookies }) => {
  const [projectList, setProjectList] = useState([]);
  useEffect(() => {
    axios
      .post("http://0.0.0.0:8080/project-selection", {
        github_id: cookies.github_id
      })
      .then(res => {
        setProjectList(res.data);
      });
  }, []);

  const SaveProject = projectID => {
    axios.post("http://0.0.0.0:8080/project-save", {
      id: projectID
    });
  };

  return (
    <div>
      <ProjectSelectionItems projectList={projectList} onSave={SaveProject} />
      <a href="/home">Move to the home page</a>
      <Footer />
    </div>
  );
};

export default ProjectSelections;
