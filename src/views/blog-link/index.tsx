import React from "react";
import { linkList, LinkListItem, QQAccount } from "@/constant";
import { Card, Button, Avatar } from "@douyinfe/semi-ui";
import { IconUnlink, IconArrowRight } from "@douyinfe/semi-icons";
import { useTranslation } from "react-i18next";
import copyText from "@/utils/copyText";
import "./index.less";

const BlogLink: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="link-wrapper">
        <Card className="link-banner">
          <IconUnlink className="link-icon" />
          <img
            className="link-banner-img"
            src={require("@/assets/img/link_banner.svg")}
          />
          <div className="link-banner-content">
            <div className="title">{t("link.banner_title")}</div>
            <div className="tip">
              {t("link.banner_content")}
              <Button
                theme="borderless"
                type="primary"
                className="tip-button"
                onClick={() =>
                  copyText(
                    QQAccount,
                    t("notice_status.copy_success"),
                    t("notice_status.copy_error")
                  )
                }
              >
                {QQAccount}
              </Button>
              ~
            </div>
            <div className="formatter">
              {t("link.formatter")}
              {" {name:xxx,avatar:xxx,uri:xxx,desc:xxx} "}
            </div>
          </div>
        </Card>
        <div className="link-content">
          {linkList.map((item: LinkListItem, index) => (
            <div
              className="link-card"
              key={"link-card" + index}
              onClick={() => window.open(item.uri)}
            >
              <Avatar
                alt={item.name}
                shape="circle"
                size="large"
                src={item.avatar}
              ></Avatar>
              <div className="link-card-content">
                <IconArrowRight className="link-card-content-icon" />
                <div className="link-card-content-title">{item.name}</div>
                <div className="link-card-content-desc">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BlogLink;
