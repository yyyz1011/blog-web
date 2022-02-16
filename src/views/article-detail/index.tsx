import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Breadcrumb, Notification } from "@douyinfe/semi-ui";
import { IconLikeHeart } from "@douyinfe/semi-icons";
import { useTranslation } from "react-i18next";
import "./index.less";
import { debounce } from "lodash-es";

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

const ArticleDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [loading, setLoading] = useState<boolean>(true);
  const [MOCK_articleList, setArticleList] = useState<Array<ArticleItem>>([]);

  const handleLoadMore = () => {
    setLoading(true);
    const start_index = MOCK_articleList.length;
    const MOCK_times = start_index + 4;
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

  const handleLike = debounce(() => {
    Notification.success({
      position: "top",
      content: t("article_detail.like_success"),
    });
  }, 1000);

  useEffect(() => {
    handleLoadMore();
  }, []);

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
      <div className="comment-info">
        <div className="comment-title">{t("article_detail.comments")}</div>
      </div>
    </div>
  );
};

export default ArticleDetail;
