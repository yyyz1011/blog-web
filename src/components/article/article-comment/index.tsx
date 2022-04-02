import React from "react";
import "./index.less";
import { useTranslation } from "react-i18next";

interface ArticleCommentProps {
  article_id: string;
}

const ArticleComment: React.FC<ArticleCommentProps> = (
  props: ArticleCommentProps
) => {
  const { t } = useTranslation();
  const { article_id: articleId } = props;

  return (
    <>
      <div className="comment-info">
        <div className="comment-title">{t("article_detail.comments")}</div>
      </div>
    </>
  );
};

export default ArticleComment;
