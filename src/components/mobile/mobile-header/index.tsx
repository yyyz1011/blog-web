import "./index.less";

import React from "react";

const MobileHeader: React.FC = () => {
  return (
    <div className="mobile-header">
      <img
        className="mobile-header--logo"
        src={require("@/assets/img/leaf.svg")}
        alt="leaf-blog"
      />
      <div className="mobile-header--title">leaf blog</div>
    </div>
  );
};

export default MobileHeader;
