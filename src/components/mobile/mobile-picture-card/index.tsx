import "./index.less";

import { Avatar, Card, Tag } from "@douyinfe/semi-ui";
import React from "react";

import { QQAccount } from "@/constant";
import { getQQAvatar } from "@/network";
import { GetPictureListItem } from "@/network/apiType";

interface MobilePictureCardProps {
  info: GetPictureListItem;
}
const MobilePictureCard: React.FC<MobilePictureCardProps> = (
  props: MobilePictureCardProps
) => {
  const pictureInfo = props.info;

  return (
    <Card
      title={
        <Card.Meta
          avatar={
            <Avatar size="small" src={getQQAvatar(QQAccount)} alt="leaf-blog" />
          }
          title={
            <div className="picture-item">
              <div className="picture-item--title">{pictureInfo.title}</div>
              <Tag className="picture-item--region" color="violet">
                {pictureInfo.region}
              </Tag>
            </div>
          }
          description={pictureInfo.desc}
        />
      }
      className="picture-card"
      cover={<img alt="leaf-blog" src={pictureInfo.picture_url} />}
    />
  );
};

export default MobilePictureCard;
