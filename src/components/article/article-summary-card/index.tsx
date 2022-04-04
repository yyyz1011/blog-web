import React, { useEffect, useState } from "react";
import { Card, Avatar, Tag, List } from "@douyinfe/semi-ui";
import "./index.less";
import { useTranslation } from "react-i18next";
import { getQQAvatar } from "@/network";
import Api from "@/network/api";

const ArticleSummaryCard = () => {
  const [loading, setLoading] = useState(true);
  const [summaryInfo, setSummaryInfo] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    getArticleTypeList();
  }, []);

  async function getArticleTypeList() {
    setLoading(true);
    try {
      const data = await Api.Article.getArticleTypeList();
      setSummaryInfo(data);
    } catch (err: any) {
      window.$catch(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card
      loading={loading}
      className="article-summary-card"
      cover={
        <img src={require("@/assets/img/article_summary_cover.svg")}></img>
      }
      shadows="always"
    >
      <div className="card-header">
        <Avatar
          className="card-header--avatar"
          src={getQQAvatar("1540032876")}
        ></Avatar>
        <div className="card-header--title">
          {t("article.summary_info.author_name")}
        </div>
      </div>
      <div className="summary-title">
        {t("article.summary_info.summary_text")}
      </div>
      <List
        dataSource={summaryInfo}
        renderItem={(item) => (
          <Tag className="article-type-tag" color="green">
            {item.label}
          </Tag>
        )}
      ></List>
    </Card>
  );
};

export default ArticleSummaryCard;
