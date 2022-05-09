import "./index.less";

import { IconHash, IconUnlink } from "@douyinfe/semi-icons";
import { Button } from "@douyinfe/semi-ui";
import React from "react";
import { useNavigate } from "react-router-dom";

interface AboutHobbyProps {
  className?: string;
}
const AboutHobby: React.FC<AboutHobbyProps> = (props: AboutHobbyProps) => {
  const { className = "" } = props;
  const navigate = useNavigate();

  return (
    <div className={`about-hobby ${className}`}>
      <div className="about-hobby-content">
        <div className="title">
          <IconHash className="title-icon" />
          我热爱的
        </div>
        <div className="tip">保持热爱，奔赴下一场山海</div>
        <div className="content">摄影·旅行·视频剪辑</div>
        <Button
          className="operate-button"
          theme="solid"
          type="primary"
          onClick={() => navigate("/blog-link")}
        >
          <IconUnlink />
          <span className="button-text">跳转至友链</span>
        </Button>
      </div>
      <img
        className="about-hobby-img"
        src={require("@/assets/img/about_hobby.svg")}
        alt="leaf-blog"
      />
    </div>
  );
};

export default AboutHobby;
