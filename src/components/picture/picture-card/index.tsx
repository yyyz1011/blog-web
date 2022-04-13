import "./index.less";

import {Tag} from "@douyinfe/semi-ui";
import dayjs from "dayjs";
import React, {useEffect, useRef} from "react";

import {GetPictureListItem} from "@/network/apiType";

interface PictureCardProps {
  index: number;
  imgInfo: GetPictureListItem;
  onClick: any
}

const PictureCard: React.FC<PictureCardProps> = (props: PictureCardProps) => {
  const {index, onClick, imgInfo} = props;
  const imgRef = useRef();

  useEffect(() => {
    if (!imgRef.current) return;
    const config = {
      rootMargin: "0px",
      threshold: 0,
    };
    const imgs = imgRef.current;
    const observer = new IntersectionObserver((entries, self) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = (img as any)?.dataset.src;
          if (src) {
            (img as any).src = src;
            img.removeAttribute("data-src");
          }
          // 解除观察
          self.unobserve(entry.target);
        }
      });
    }, config);

    observer.observe(imgs);
  }, [imgRef]);

  return <div
    className="picture-item"
    onClick={() => onClick(index)}
  >
    <img
      ref={imgRef}
      className="picture-item-img"
      data-src={imgInfo.picture_url}
      alt="leaf-blog"
    />
    <div className="picture-extra-info">
      <div className="picture-item-title">
        {imgInfo.title}
        <Tag className="tag" color="violet">
          {imgInfo.region}
        </Tag>
      </div>
      <div className="picture-item-modify-time">
        {dayjs(Number(imgInfo.create_time)).format("YYYY-MM-DD")}
      </div>
      <div className="picture-item-content">{imgInfo.desc}</div>
    </div>
  </div>;
};

export default PictureCard;