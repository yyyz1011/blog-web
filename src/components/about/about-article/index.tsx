import "./index.less";

import { IconArticle, IconHash } from "@douyinfe/semi-icons";
import { Button } from "@douyinfe/semi-ui";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import Api from "@/network/api";

interface AboutArticleProps {
  className?: string;
}
const AboutArticle: React.FC<AboutArticleProps> = (
  props: AboutArticleProps
) => {
  const { className = "" } = props;
  const navigate = useNavigate();

  const { data: articleList = [] } = useQuery("article-list", async () => {
    const data = await Api.Article.getArticleList();
    return data;
  });

  return (
    <div className={`about-article ${className}`}>
      <img
        className="about-article-img"
        src={require("@/assets/img/about_article.svg")}
        alt="leaf-blog"
      />
      <div className="about-article-content">
        <div className="title">
          <IconHash className="title-icon" />
          读万卷书
        </div>
        <div className="tip">读万卷书，行万里路</div>
        <div className="content">
          截止今天，已经记录了
          <span className="content-num">{articleList.length}</span>
          份笔记
        </div>
        <Button
          className="operate-button"
          theme="solid"
          type="primary"
          onClick={() => navigate("/article")}
        >
          <IconArticle />
          <span className="button-text">跳转至笔记</span>
        </Button>
      </div>
    </div>
  );
};

export default AboutArticle;
