import React, { useEffect, useState } from "react";
import ArticleCard from "@/components/article/article-card";
import ArticleSummaryCard from "@/components/article/article-summary-card";
import "./index.less";
import { List, Input, Card, Button } from "@douyinfe/semi-ui";
import { IconSearch, IconQuote } from "@douyinfe/semi-icons";
import { useTranslation } from "react-i18next";
import NoData from "@/components/no-data";
import LeafCarousel from "@/components/common/leaf-carousel";
import Api from "@/network/api";
import { useQuery } from "react-query";

const Article: React.FC = () => {
  const { t } = useTranslation();
  const [searchByTitle, setSearchByTitle] = useState<string>("");
  const [searchByContent, setSearchByContent] = useState<string>("");

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

  function handleSearch() {
    // TODO
    // console.log(searchByTitle, searchByContent);
  }

  return (
    <>
      <div className="article">
        <div className="article-content">
          <div className="article-content--summary">
            <ArticleSummaryCard></ArticleSummaryCard>
          </div>
          <div className="article-content--list">
            <LeafCarousel
              duration={5000}
              contentList={[
                <Card className="article-plan-text">
                  <div className="article-plan-text--content">
                    {t("article.article_text")}
                    <IconQuote className="article-quote-top" />
                    <IconQuote className="article-quote-bottom" />
                  </div>
                  <img
                    className="article-plan-text--img"
                    src={require("@/assets/img/article_plan_text.svg")}
                  />
                </Card>,
                <Card className="article-plan-text">
                  <img
                    className="article-plan-text--img"
                    src={require("@/assets/img/article_plan_text1.svg")}
                  />
                  <div className="article-plan-text--content">
                    {t("article.article_text1")}
                    <IconQuote className="article-quote-top" />
                    <IconQuote className="article-quote-bottom" />
                  </div>
                </Card>,
              ]}
            ></LeafCarousel>
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
              emptyContent={<NoData text={t("article.no_data")} />}
              dataSource={articleList}
              renderItem={(item) => (
                <ArticleCard
                  loading={isLoading}
                  key={item.aid}
                  info={item}
                ></ArticleCard>
              )}
            ></List>
          </div>
        </div>
      </div>
    </>
  );
};

export default Article;
