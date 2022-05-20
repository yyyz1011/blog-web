import "./index.less";

import { IconGithubLogo, IconMail } from "@douyinfe/semi-icons";
import { Button } from "@douyinfe/semi-ui";
import React from "react";

import { QQAccount } from "@/constant";

interface AboutUserInfoProps {
  className?: string;
}
const AboutUserInfo: React.FC<AboutUserInfoProps> = (
  props: AboutUserInfoProps
) => {
  const { className = "" } = props;

  return (
    <>
      <div className={`user ${className}`}>
        <img
          className="user-img"
          src={require("@/assets/img/about.svg")}
          alt="leaf-blog"
        />
        <div className="user-info">
          <div className="name">
            叶周
            <img
              className="name-img"
              src={require("@/assets/img/leaf.svg")}
              alt="leaf-blog"
            />
          </div>
          <div className="tip">一个来自杭州的cv攻城狮，嗷呜~</div>
          <div className="operate">
            <Button
              theme="solid"
              type="primary"
              className="operate-github"
              onClick={() => window.open("https://github.com/yyyz1011")}
            >
              <IconGithubLogo className="operate-icon" />
              前往Github
            </Button>
            <Button
              theme="light"
              type="tertiary"
              className="operate-mail"
              onClick={() => window.open("mailto:" + QQAccount)}
            >
              <IconMail className="operate-icon" />
              发送邮件
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUserInfo;
