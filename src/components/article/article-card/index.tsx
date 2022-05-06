import "./index.less";

import { IconArticle, IconLikeThumb } from "@douyinfe/semi-icons";
import { Card, Tag } from "@douyinfe/semi-ui";
import dayjs from "dayjs";
import React from "react";
import { useNavigate } from "react-router-dom";

import { GetArticleListItem } from "@/network/apiType";
interface IProps {
  info: GetArticleListItem;
}

const ArticleCard: React.FC<IProps> = (props: IProps) => {
  const navigate = useNavigate();
  const {
    aid,
    title,
    atLabel,
    modify_time: modifyTime,
    article_like: articleLike,
  } = props.info;
  const updateTime = dayjs(Number(modifyTime)).format("YYYY-MM-DD");

  const handleGoArticle = () => navigate(`/article-detail/${aid}`);

  return (
    <>
      <div className="article-card" onClick={handleGoArticle}>
        <Card bordered headerLine={false} shadows="hover">
          <div className="article-title">
            <div className="article-title--title">{title}</div>
            <div className="article-title--modify-time">
              更新时间 : {updateTime}
            </div>
            <div className="article-title--type">
              笔记标签：
              <Tag color="white" size="large">
                {atLabel}
              </Tag>
            </div>
            <IconArticle className="article-title--icon" />
            <div className="article-title--icon-like">
              <IconLikeThumb className="like-icon" />
              <div className="like-num">{articleLike}</div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default ArticleCard;
