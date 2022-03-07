import React, { useEffect, useState } from "react";
import "./index.less";
import AboutUserInfo from "@/components/about/about-user-info";
import AboutArticle from "@/components/about/about-article";
import AboutTravel from "@/components/about/about-travel";
import AboutBlog from "@/components/about/about-blog";
import AboutHobby from "@/components/about/about-hobby";
import { throttle } from "lodash-es";

const About: React.FC = () => {
  const [showUserInfo, setShowUserInfo] = useState<boolean>(true);
  const [showUserTravel, setShowUserTravel] = useState<boolean>(true);
  const [showUserArticle, setShowUserArticle] = useState<boolean>(false);
  const [showUserHobby, setShowUserHobby] = useState<boolean>(false);
  const [showUserBlog, setShowUserBlog] = useState<boolean>(false);

  const documentScroll = throttle(() => {
    const scrollTop = document.documentElement.scrollTop;
    setShowUserInfo(scrollTop <= 250);
    setShowUserTravel(scrollTop <= 620);
    setShowUserArticle(scrollTop >= 200 && scrollTop <= 1048);
    setShowUserHobby(scrollTop >= 520);
    setShowUserBlog(scrollTop >= 1060);
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
        <AboutTravel className={showUserTravel ? "show-user" : "hidden-user"} />
        <AboutArticle
          className={showUserArticle ? "show-user" : "hidden-user"}
        />
        <AboutHobby className={showUserHobby ? "show-user" : "hidden-user"} />
        <AboutBlog className={showUserBlog ? "show-user" : "hidden-user"} />
      </div>
    </>
  );
};

export default About;
