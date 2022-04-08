import "./index.less";
import "md-editor-rt/lib/style.css";

import { IconAscend, IconLikeHeart } from "@douyinfe/semi-icons";
import { Breadcrumb, Notification } from "@douyinfe/semi-ui";
import { debounce } from "lodash-es";
import Editor from "md-editor-rt";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import ArticleDetailHeader from "@/components/article-detail/article-detail-header";
import LeafEditorCatalog from "@/components/common/leaf-editor-catalog";
import Api from "@/network/api";
import { GetArticleListItem } from "@/network/apiType";

const ArticleDetail: React.FC = () => {
  const { aid } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [articleInfo, setArticleInfo] = useState<GetArticleListItem | null>(
    null
  );
  const [catalogList, setList] = useState([]);

  useEffect(() => {
    addArticleVv();
    getArticleList();
  }, []);

  async function addArticleVv() {
    try {
      await Api.Article.addArticleVv({ aid });
    } catch (err: any) {
      window.$catch(err.message);
    }
  }

  async function getArticleList() {
    try {
      const data = await Api.Article.getArticleList({ aid });
      setArticleInfo(data[0]);
    } catch (err: any) {
      window.$catch(err.message);
    }
  }

  const handleLike = debounce(async () => {
    try {
      await Api.Article.addArticleLike({ aid });
      await getArticleList();
      Notification.success({
        position: "top",
        content: t("article_detail.like_success"),
      });
    } catch (err: any) {
      window.$catch(err.message);
    }
  }, 1000);

  return (
    <div className="article-detail">
      <Breadcrumb className="article-breadcrumb" compact={false}>
        <Breadcrumb.Item onClick={() => navigate("/")}>
          {t("article_detail.breadcrumb_article")}
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          {t("article_detail.breadcrumb_article_detail")}-{articleInfo?.title}
        </Breadcrumb.Item>
      </Breadcrumb>
      <ArticleDetailHeader articleInfo={articleInfo} />
      <div className="article-content">
        <div className="article-content--catalog">
          <div className="article-content--catalog-title">
            <IconAscend className="icon" />
            {t("article_detail.catalogue")}
          </div>
          <LeafEditorCatalog
            className="article-content--catalog-content"
            heads={catalogList}
          />
        </div>
        <div className="article-content--content">
          <Editor
            onGetCatalog={setList}
            previewOnly
            modelValue={articleInfo?.content ?? ""}
          />
          <div className="like-info">
            <IconLikeHeart className="like-icon" onClick={handleLike} />
            <span className="like-num">{articleInfo?.article_like}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
