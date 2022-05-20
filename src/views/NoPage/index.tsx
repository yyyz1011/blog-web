import "./index.less";

import { Button } from "@douyinfe/semi-ui";
import React from "react";
import { useNavigate } from "react-router-dom";

const NoPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate("/", { replace: true });
  };

  return (
    <>
      <div className="no-page">
        <img
          className="no-page--img"
          src={require("../../assets/img/page_no_found.svg")}
          alt="leaf-blog"
        />
        <h1 className="no-page--tip">页面找不到啦~是否返回首页</h1>
        <Button
          className="no-page--back"
          type="tertiary"
          onClick={handleBackHome}
        >
          返回
        </Button>
      </div>
    </>
  );
};

export default NoPage;
