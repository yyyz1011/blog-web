import React from "react";
import { QQAccount } from "@/constant";
import "./index.less";
import { IconMail, IconGithubLogo } from "@douyinfe/semi-icons";
import { Tooltip, Button } from "@douyinfe/semi-ui";
import { useTranslation } from "react-i18next";

const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="about">
        <div className="user">
          <img className="user-img" src={require("@/assets/img/about.svg")} />
          <div className="user-info">
            <div className="name">
              {t("about.user_name")}
              <img
                className="name-img"
                src={require("@/assets/img/leaf.svg")}
              />
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
      </div>
    </>
  );
};

export default About;
