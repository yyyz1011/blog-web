import React from "react";
import { useTranslation } from "react-i18next";
import "./index.less";

const NoArticleData: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="no-article-content">
      <img
        className="no-article-content--img"
        src={require("@/assets/img/no_data.svg")}
      />
      <div className="no-article-content--text">{t("article.no_data")}</div>
    </div>
  );
};

export default NoArticleData;
