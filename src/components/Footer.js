import React from "react";

const Footer = () => {
  let year = new Date().getFullYear();
  return (
    <div>
      <p>{year}</p>
    </div>
  );
};

export default Footer;
