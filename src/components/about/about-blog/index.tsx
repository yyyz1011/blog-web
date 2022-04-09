import "./index.less";

import { IconHash } from "@douyinfe/semi-icons";
import React from "react";
import { useTranslation } from "react-i18next";

interface AboutBlogProps {
  className?: string;
}
const AboutBlog: React.FC<AboutBlogProps> = (props: AboutBlogProps) => {
  const { t } = useTranslation();
  const { className = "" } = props;
  return (
    <div className={`about-blog ${className}`}>
      <img
        className="about-blog-img"
        src={require("@/assets/img/about_blog.svg")}
        alt="leaf-blog"
      />
      <div className="about-blog-content">
        <div className="title">
          <IconHash className="title-icon" />
          {t("about.blog_title")}
        </div>
        <div className="purpose">{t("about.blog_purpose")}</div>
      </div>
    </div>
  );
};

export default AboutBlog;
