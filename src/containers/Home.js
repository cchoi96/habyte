import React from "react";
import ProjectList from "./ProjectList";
import Footer from "../components/Footer";

const Home = () => {
  const fakeData = [
    {
      name: "final_project",
      crop: "strawberry!"
    },
    {
      name: "midterm_project",
      crop: "grape!"
    },
    {
      name: "react_project",
      crop: "blueberry!"
    },
    {
      name: "sleeping",
      crop: "apple"
    }
  ];

  return (
    <div>
      {/* <Navigation /> */}
      <ProjectList array={fakeData} />
      {/* <ProjectBoard />
      <Farm /> */}
      <Footer />
    </div>
  );
};

export default Home;
