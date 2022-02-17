import React from "react";
import "./index.less";
import { useTranslation } from "react-i18next";
import LeafEditor from "@/components/common/leaf-editor";

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
        <LeafEditor
          placeholder={t("article_detail.editor_placeholder")}
          operateText={t("article_detail.editor_operate_text")}
          required={true}
          requiredErrorTitle={t("article_detail.required_error_title")}
          requiredErrorText={t("article_detail.required_error_text")}
        ></LeafEditor>
      </div>
    </>
  );
};

export default ArticleComment;
