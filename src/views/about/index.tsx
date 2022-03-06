import React, { useEffect, useState } from "react";
import "./index.less";
import AboutUserInfo from "@/components/about/about-user-info";
import AboutTravel from "@/components/about/about-travel";
import AboutBlog from "@/components/about/about-blog";
import { throttle } from "lodash-es";

const About: React.FC = () => {
  const [showUserInfo, setShowUserInfo] = useState<boolean>(true);
  const [showUserTravel, setShowUserTravel] = useState<boolean>(true);
  const [showUserBlog, setShowUserBlog] = useState<boolean>(false);

  const documentScroll = throttle(() => {
    const scrollTop = document.documentElement.scrollTop;
    console.log(scrollTop);
    setShowUserInfo(scrollTop <= 250);
    setShowUserTravel(scrollTop <= 620);
    setShowUserBlog(scrollTop >= 250 && scrollTop <= 1054);
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
        />
        <AboutTravel
          className={showUserTravel ? "show-user-travel" : "hidden-user-travel"}
        />
        <AboutBlog
          className={showUserBlog ? "show-user-blog" : "hidden-user-blog"}
        />
      </div>
      <div style={{ height: 3000 }}></div>
    </>
  );
};

export default About;
