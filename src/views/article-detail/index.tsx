import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Breadcrumb, Notification } from "@douyinfe/semi-ui";
import { IconLikeHeart } from "@douyinfe/semi-icons";
import { useTranslation } from "react-i18next";
import "./index.less";
import { debounce } from "lodash-es";
import ArticleComment from "@/components/article/article-comment";

const ArticleDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLike = debounce(() => {
    Notification.success({
      position: "top",
      content: t("article_detail.like_success"),
    });
  }, 1000);

  return (
    <div className="article-detail">
      <Breadcrumb compact={false}>
        <Breadcrumb.Item onClick={() => navigate("/article")}>
          {t("article_detail.breadcrumb_article")}
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          {t("article_detail.breadcrumb_article_detail")}
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className="detail-wrapper">
        <div className="detail">
          <div className="detail-catalogue">
            <div className="catalogue-title">
              {t("article_detail.catalogue")}
            </div>
          </div>
          <div className="detail-content">{id}</div>
        </div>
      </div>
      <div className="like-info">
        <IconLikeHeart className="like-icon" onClick={handleLike} />
        <span className="like-num">123123</span>
      </div>
      <ArticleComment article_id={id}></ArticleComment>
    </div>
  );
};

export default ArticleDetail;
