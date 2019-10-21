import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import ProjeectSelectionItems from "../containers/ProjectSelectionItems";

const ProjectSelections = ({ github_id }) => {
  const [projectList, setProjectList] = useState([]);
  useEffect(() => {
    axios
      .post("http://0.0.0.0:8080/project-selection", {
        github_id
      })
      .then(res => {
        setProjectList(res.data);
      });
  }, []);

  const SaveProject = projectID => {
    console.log("inside projectselection component, project ID =>", projectID);
    axios.post("http://0.0.0.0:8080/project-save", {
      id: projectID
    });
  };

  return (
    <div>
      <ProjeectSelectionItems projectList={projectList} onSave={SaveProject} />
      <Footer />
    </div>
  );
};

export default ProjectSelections;
