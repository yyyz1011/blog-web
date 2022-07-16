import "./index.less";

import React from "react";

const Home: React.FC = () => {
  return (
    <>
      <img
        className="home-background"
        src={require("@/assets/img/home.jpg")}
        alt="leaf blog"
      />
    </>
  );
};

export default Home;
