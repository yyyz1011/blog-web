import React, { useEffect, useState } from "react";
import ArticleCard from "@/components/article-card";
import ArticleSummaryCard from "@/components/article-summary-card";
import "./index.less";
import { List, BackTop, Input, Card, Button } from "@douyinfe/semi-ui";
import { IconSearch, IconQuote } from "@douyinfe/semi-icons";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(true);
  const [searchByTitle, setSearchByTitle] = useState<string>("");
  const [searchByContent, setSearchByContent] = useState<string>("");
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
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleSearch = () => {
    console.log(searchByTitle, searchByContent);
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
            <Card shadows="always" className="article-plan-text">
              <div className="article-plan-text--content">
                {t("article.article_text")}
                <IconQuote className="article-quote-top" />
                <IconQuote className="article-quote-bottom" />
              </div>
              <img
                className="article-plan-text--img"
                src={require("@/assets/img/article_plan_text.svg")}
              />
            </Card>
            <div className="filter">
              <div className="filter-content">
                <Input
                  className="filter-input"
                  placeholder={
                    t(
                      "article.filter.search_input_placeholder_title"
                    ) as React.ReactText
                  }
                  showClear
                  value={searchByTitle}
                  onChange={(val) => setSearchByTitle(val)}
                  addonAfter={<IconSearch onClick={handleSearch} />}
                  onEnterPress={handleSearch}
                ></Input>
                <Input
                  className="filter-input"
                  placeholder={
                    t(
                      "article.filter.search_input_placeholder_content"
                    ) as React.ReactText
                  }
                  showClear
                  value={searchByContent}
                  onChange={(val) => setSearchByContent(val)}
                  addonAfter={<IconSearch onClick={handleSearch} />}
                  onEnterPress={handleSearch}
                ></Input>
              </div>
              <div className="filter-operate">
                <Button
                  className="operate-button"
                  theme="solid"
                  type="primary"
                  onClick={handleSearch}
                >
                  {t("article.filter.filter_operate")}
                </Button>
              </div>
            </div>
            <List
              emptyContent={
                <div className="no-article-content">
                  <img
                    className="no-article-content--img"
                    src={require("@/assets/img/no_data.svg")}
                  />
                  <div className="no-article-content--text">
                    {t("article.no_data")}
                  </div>
                </div>
              }
              dataSource={MOCK_articleList}
              renderItem={(item) => (
                <ArticleCard
                  loading={loading}
                  key={item.id}
                  info={item}
                ></ArticleCard>
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
