import React from "react";
import "./index.less";

interface NoDataProps {
  text?: string;
}

const NoData: React.FC<NoDataProps> = (props: NoDataProps) => {
  const { text = "" } = props;

  return (
    <div className="no-article-content">
      <img
        className="no-article-content--img"
        src={require("@/assets/img/no_data.svg")}
      />
      <div className="no-article-content--text">{text}</div>
    </div>
  );
};

export default NoData;
