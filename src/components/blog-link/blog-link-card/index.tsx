import "./index.less";

import { IconArrowRight } from "@douyinfe/semi-icons";
import { Avatar } from "@douyinfe/semi-ui";
import React from "react";

import { LinkListItem } from "@/constant";

interface BlogLinkCardProps {
  info: LinkListItem;
}

const BlogLinkCard: React.FC<BlogLinkCardProps> = (
  props: BlogLinkCardProps
) => {
  const { info } = props;
  return (
    <div className="link-card" onClick={() => window.open(info.uri)}>
      <Avatar alt={info.name} shape="circle" size="large" src={info.avatar} />
      <div className="link-card-content">
        <IconArrowRight className="link-card-content-icon" />
        <div className="link-card-content-title">{info.name}</div>
        <div className="link-card-content-desc">{info.desc}</div>
      </div>
    </div>
  );
};

export default BlogLinkCard;
