import React from "react";
import "./index.less";
import { useTranslation } from "react-i18next";
import { IconHash, IconUnlink } from "@douyinfe/semi-icons";
import { Button } from "@douyinfe/semi-ui";
import { useNavigate } from "react-router-dom";

interface AboutHobbyProps {
  className?: string;
}
const AboutHobby: React.FC<AboutHobbyProps> = (props: AboutHobbyProps) => {
  const { className = "" } = props;
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className={`about-hobby ${className}`}>
      <div className="about-hobby-content">
        <div className="title">
          <IconHash className="title-icon" />
          {t("about.hobby_title")}
        </div>
        <div className="tip">{t("about.hobby_tip")}</div>
        <div className="content">{t("about.hobby_type")}</div>
        <Button
          className="operate-button"
          theme="solid"
          type="primary"
          onClick={() => navigate("/link")}
        >
          <IconUnlink />
          <span className="button-text">{t("about.hobby_to_link")}</span>
        </Button>
      </div>
      <img
        className="about-hobby-img"
        src={require("@/assets/img/about_hobby.svg")}
      />
    </div>
  );
};

export default AboutHobby;
