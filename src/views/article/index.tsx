import React, { useEffect, useState } from "react";
import ArticleCard from "@/components/article-card";
import "./index.less";
import { List, Button } from "@douyinfe/semi-ui";

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
    setLoading(true)
    const start_index = MOCK_articleList.length;
    const MOCK_times = start_index + 5;
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
    setLoading(false)
  };

  useEffect(() => {
    handleLoadMore();
  }, []);

  useEffect(() => {
    console.log(MOCK_articleList);
  }, [MOCK_articleList]);

  return (
    <>
      <div className="article">
        <div className="article-content">
          <List
            loading={loading}
            dataSource={MOCK_articleList}
            renderItem={(item) => (
              <ArticleCard key={item.id} info={item}></ArticleCard>
            )}
          ></List>
        </div>
      </div>
    </>
  );
};

export default Article;
