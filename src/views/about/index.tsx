import React, { useEffect, useState } from "react";
import "./index.less";
import AboutUserInfo from "@/components/about/about-user-info";
import AboutTravel from "@/components/about/about-travel";
import { throttle } from "lodash-es";

const About: React.FC = () => {
  const [showUserInfo, setShowUserInfo] = useState<boolean>(true);
  const [showUserTravel, setShowUserTravel] = useState<boolean>(true);

  const documentScroll = throttle(() => {
    const scrollTop = document.documentElement.scrollTop;
    console.log(scrollTop);
    if (scrollTop >= 250) {
      setShowUserInfo(false);
    } else {
      setShowUserInfo(true);
    }
  }, 60);

  useEffect(() => {
    window.addEventListener("scroll", documentScroll);
    return () => {
      window.removeEventListener("scroll", documentScroll);
    };
  }, []);

  return (
    <>
      <div className="about">
        <AboutUserInfo
          className={showUserInfo ? "show-user-info" : "hidden-user-info"}
        ></AboutUserInfo>
        <AboutTravel
          className={showUserTravel ? "show-user-travel" : "hidden-user-travel"}
        ></AboutTravel>
      </div>
      <div style={{ height: 3000 }}></div>
    </>
  );
};

export default About;
