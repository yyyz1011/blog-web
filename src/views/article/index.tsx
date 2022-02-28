import React, { useEffect, useState } from "react";
import ArticleCard from "@/components/article/article-card";
import ArticleSummaryCard from "@/components/article/article-summary-card";
import "./index.less";
import { List, BackTop, Input, Card, Button } from "@douyinfe/semi-ui";
import { IconSearch, IconQuote } from "@douyinfe/semi-icons";
import { useTranslation } from "react-i18next";
import NoData from "@/components/no-data";
import LeafCarousel from "@/components/common/leaf-carousel";

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
        desc: "习近平总书记强调，推动共青团事业不断开创新局面，关键在团干部。共青团的作风形象，首先体现为团干部的作风形象；共青团的建设质量，关键取决于团干部队伍的建设质量。建设一支作风过硬、形象阳光的团干部队伍，始终是全面从严治团的重点任务。习近平总书记强调，推动共青团事业不断开创新局面，关键在团干部。共青团的作风形象，首先体现为团干部的作风形象；共青团的建设质量，关键取决于团干部队伍的建设质量。建设一支作风过硬、形象阳光的团干部队伍，始终是全面从严治团的重点任务。",
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
