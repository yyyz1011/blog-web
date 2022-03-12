import React from "react";
import { linkList, LinkListItem, QQAccount } from "@/constant";
import { Card, Button } from "@douyinfe/semi-ui";
import { IconUnlink } from "@douyinfe/semi-icons";
import { useTranslation } from "react-i18next";
import copyText from "@/utils/copyText";
import "./index.less";
import BlogLinkCard from "@/components/blog-link/blog-link-card";

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
              {
                " {name:'YeZhou',avatar:'https://avatars.githubusercontent.com/u/65165470?v=4',uri:xxx,desc:'leaf blog'} "
              }
            </div>
          </div>
        </Card>
        <div className="link-content">
          {linkList.map((item: LinkListItem, index) => (
            <BlogLinkCard key={"link-card" + index} info={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default BlogLink;
