import React from "react";
import "./index.less";
import { Button } from "@douyinfe/semi-ui";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const NoPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleBackHome = () => {
    navigate("/", { replace: true });
  };

  return (
    <>
      <div className="no-page">
        <img
          className="no-page--img"
          src={require("../../assets/img/page_no_found.png")}
          alt="page_no_found"
        />
        <h1 className="no-page--tip">{t("404.no_page_text")}</h1>
        <Button
          className="no-page--back"
          type="tertiary"
          onClick={handleBackHome}
        >
          {t("404.operate_text")}
        </Button>
      </div>
    </>
  );
};

export default NoPage;
