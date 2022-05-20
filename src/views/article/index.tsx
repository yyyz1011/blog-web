import "./index.less";

import React, { useEffect } from "react";
import { useQuery } from "react-query";

import ArticleCard from "@/components/article/article-card";
import NoData from "@/components/no-data";
import Api from "@/network/api";

const Article: React.FC = () => {
  const {
    data: articleList,
    isLoading,
    isError,
    error,
  } = useQuery("article-list", async () => {
    const data = await Api.Article.getArticleList();
    return data;
  });

  useEffect(() => {
    if (isError) {
      window.$catch(error);
    }
  }, [isError]);

  if (!articleList?.length || isLoading) {
    return (
      <div className="article-no-data">
        <NoData text="笔记正在赶来的路上~" />
      </div>
    );
  }

  return (
    <>
      <div className="article-list">
        {articleList.map((item) => (
          <ArticleCard key={item.aid} info={item}></ArticleCard>
        ))}
      </div>
    </>
  );
};

export default Article;
