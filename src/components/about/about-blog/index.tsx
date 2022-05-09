import "./index.less";

import { IconHash } from "@douyinfe/semi-icons";
import React from "react";

interface AboutBlogProps {
  className?: string;
}
const AboutBlog: React.FC<AboutBlogProps> = (props: AboutBlogProps) => {
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
          关于博客
        </div>
        <div className="purpose">分享·记录·提升</div>
      </div>
    </div>
  );
};

export default AboutBlog;
