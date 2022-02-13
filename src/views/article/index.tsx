import React, { useEffect, useState } from "react";
import ArticleCard from "@/components/article-card";
import ArticleSummaryCard from "@/components/article-summary-card";
import "./index.less";
import { List, BackTop } from "@douyinfe/semi-ui";

interface ArticleTag {
  type: string;
  color: string;
}
interface ArticleItem {
  id: string;
  title: string;
  desc: string;
  type: Array<ArticleTag>;
  modify_time: string;
}

const Article: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [MOCK_articleList, setArticleList] = useState<Array<ArticleItem>>([]);

  const handleLoadMore = () => {
    setLoading(true);
    const start_index = MOCK_articleList.length;
    const MOCK_times = start_index + 15;
    let new_list = MOCK_articleList;
    for (let i = start_index; i < MOCK_times; i++) {
      new_list.push({
        id: i.toString(),
        title: "这是一个标题11",
        desc: "阿巴巴爸爸",
        type: [
          { type: "vue", color: "purple" },
          { type: "react", color: "red" },
        ],
        modify_time: new Date().getTime().toString(),
      });
    }
    setArticleList(new_list);
    setLoading(false);
  };

  useEffect(() => {
    handleLoadMore();
  }, []);

  return (
    <>
      <div className="article">
        <div className="article-content">
          <div className="article-content--summary">
            <ArticleSummaryCard></ArticleSummaryCard>
          </div>
          <div className="article-content--list">
            <List
              loading={loading}
              dataSource={MOCK_articleList}
              renderItem={(item) => (
                <ArticleCard key={item.id} info={item}></ArticleCard>
              )}
            ></List>
          </div>
        </div>
        <BackTop className="article-back-top" />
      </div>
    </>
  );
};

export default Article;
