import React from "react";
import "./index.less";
import { useTranslation } from "react-i18next";
import { IconHash, IconArticle } from "@douyinfe/semi-icons";
import { Button } from "@douyinfe/semi-ui";
import { useNavigate } from "react-router-dom";

interface AboutArticleProps {
  className?: string;
}
const AboutArticle: React.FC<AboutArticleProps> = (
  props: AboutArticleProps
) => {
  const { className = "" } = props;
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className={`about-article ${className}`}>
      <img
        className="about-article-img"
        src={require("@/assets/img/about_article.svg")}
      />
      <div className="about-article-content">
        <div className="title">
          <IconHash className="title-icon" />
          {t("about.article_title")}
        </div>
        <div className="tip">{t("about.article_tip")}</div>
        <div className="content">
          {t("about.article_content_pre")}
          <span className="content-num">12</span>
          {t("about.article_content_append")}
        </div>
        <Button
          className="operate-button"
          theme="solid"
          type="primary"
          onClick={() => navigate("/article")}
        >
          <IconArticle />
          <span className="button-text">{t("about.article_to_article")}</span>
        </Button>
      </div>
    </div>
  );
};

export default AboutArticle;
