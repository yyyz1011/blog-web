import React, { useEffect, useState } from "react";
import { Card, Avatar, Progress, List } from "@douyinfe/semi-ui";
import "./index.less";
import { useTranslation } from "react-i18next";
import { getQQAvatar } from "@/network";

const ArticleSummaryCard = () => {
  const [summaryInfo, setSummaryInfo] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const newSummaryInfo = [
      { id: "1", num: 1, label: "vue" },
      { id: "11", num: 12, label: "react" },
      { id: "11", num: 2, label: "default" },
    ];
    const allNum = newSummaryInfo.reduce((cur, pre) => {
      return cur + pre.num;
    }, 0);
    const summaryInfo = newSummaryInfo.map((item) => ({
      ...item,
      percent: Number(((item.num / allNum) * 100).toFixed()),
    }));
    setSummaryInfo(summaryInfo);
  }, []);

  return (
    <Card
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
          <div className="progress-item">
            <div className="progress-item--label">{item.label}</div>
            <Progress
              className="progress-item--progress"
              percent={item.percent}
              showInfo={true}
              aria-label={item.label}
            />
          </div>
        )}
      ></List>
    </Card>
  );
};

export default ArticleSummaryCard;
