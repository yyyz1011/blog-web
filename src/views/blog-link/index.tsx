import "./index.less";

import { IconUnlink } from "@douyinfe/semi-icons";
import { Button, Card } from "@douyinfe/semi-ui";
import React from "react";

import BlogLinkCard from "@/components/blog-link/blog-link-card";
import { linkList, LinkListItem, QQAccount } from "@/constant";
import copyText from "@/utils/copyText";

const BlogLink: React.FC = () => {
  return (
    <>
      <div className="link-wrapper">
        <Card className="link-banner">
          <IconUnlink className="link-icon" />
          <img
            className="link-banner-img"
            src={require("@/assets/img/link_banner.svg")}
            alt="leaf-blog"
          />
          <div className="link-banner-content">
            <div className="title">友链</div>
            <div className="tip">
              如果想增加友链，请QQ邮箱发送至
              <Button
                theme="borderless"
                type="primary"
                className="tip-button"
                onClick={() =>
                  copyText(QQAccount, "复制成功", "复制失败，请手动复制内容")
                }
              >
                {QQAccount}
              </Button>
              ~
            </div>
            <div className="formatter">
              格式 :
              {
                " {name:'YeZhou',avatar:'https://avatars.githubusercontent.com/u/65165470?v=4',url:http://www.yeyezhou.com/,desc:'leaf blog'} "
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
