import "./index.less";

import { IconGithubLogo, IconMail } from "@douyinfe/semi-icons";
import { Button } from "@douyinfe/semi-ui";
import React from "react";
import { useTranslation } from "react-i18next";

import { QQAccount } from "@/constant";

interface AboutUserInfoProps {
  className?: string;
}
const AboutUserInfo: React.FC<AboutUserInfoProps> = (
  props: AboutUserInfoProps
) => {
  const { t } = useTranslation();
  const { className = "" } = props;

  return (
    <>
      <div className={`user ${className}`}>
        <img className="user-img" src={require("@/assets/img/about.svg")} />
        <div className="user-info">
          <div className="name">
            {t("about.user_name")}
            <img className="name-img" src={require("@/assets/img/leaf.svg")} />
          </div>
          <div className="tip">{t("about.user_tip")}</div>
          <div className="operate">
            <Button
              theme="solid"
              type="primary"
              className="operate-github"
              onClick={() => window.open("https://github.com/yyyz1011")}
            >
              <IconGithubLogo className="operate-icon" />
              {t("about.go_github")}
            </Button>
            <Button
              theme="light"
              type="tertiary"
              className="operate-mail"
              onClick={() => window.open("mailto:" + QQAccount)}
            >
              <IconMail className="operate-icon" />
              {t("about.go_mail")}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUserInfo;
