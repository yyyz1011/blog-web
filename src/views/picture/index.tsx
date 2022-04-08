import React, { useState, useEffect } from "react";
import "./index.less";
import AutoResponsive from "autoresponsive-react";
import Carousel, { Modal, ModalGateway, CarouselState } from "react-images";
import Api from "@/network/api";
import { Tag } from "@douyinfe/semi-ui";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";

const Picture: React.FC = () => {
  const { t } = useTranslation();
  const [clientWidth, setClientWidth] = useState<number>(1200);
  const [isOpenLightBox, setIsOpenLightBox] = useState<boolean>(false);
  const [lightBoxImgIndex, setLightBoxImgIndex] = useState<number>(0);

  const {
    data: imgList = [],
    isError,
    error,
  } = useQuery("picture-list", async () => {
    const imgWidth = 400;
    const data = await Api.Picture.getPictureList();
    let resData: any = [];
    for (let i = 0; i < data.length; i++) {
      const {
        title,
        region,
        desc,
        create_time: createTime,
        picture_url: url,
      } = data[i];
      const img: any = await getImgAttr(url);
      resData.push({
        width: imgWidth,
        height: (img.height * imgWidth) / img.width,
        title,
        url,
        region,
        desc,
        createTime,
      });
    }
    return resData;
  });

  if (isError) {
    window.$catch(error);
  }

  useEffect(() => {
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => {
      window.removeEventListener("resize", resizeWindow);
    };
  }, []);

  function getImgAttr(src: string) {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(t("status_tip.img_load_error")));
      img.src = src;
    });
  }

  function resizeWindow() {
    const width = document.body.clientWidth;
    // 页面layout宽度为 85%
    const rate = 0.85;
    setClientWidth(width > 1200 ? width * rate : 1200 * rate);
  }

  function autoResponsiveOption() {
    return {
      containerWidth: clientWidth,
      itemClassName: "productListItem",
      gridWidth: 10,
      itemMargin: 20,
      transitionDuration: 0.5,
    };
  }

  return (
    <>
      <div className="picture-wrapper">
        <AutoResponsive {...autoResponsiveOption()}>
          {imgList.map((item: any, index: number) => {
            return (
              <ul
                key={"picture-item" + index}
                style={{
                  width: item.width,
                  height: item.height,
                }}
              >
                <div
                  className="picture-item"
                  onClick={() => {
                    setIsOpenLightBox(true);
                    setLightBoxImgIndex(index);
                  }}
                >
                  <img
                    className="picture-item-img"
                    src={item.url}
                    style={{
                      width: item.width,
                      height: item.height,
                    }}
                  />
                  <div className="picture-extra-info">
                    <div className="picture-item-title">
                      {item.title}
                      <Tag className="tag" color="violet">
                        {item.region}
                      </Tag>
                    </div>
                    <div className="picture-item-modify-time">
                      {dayjs(Number(item.createTime)).format("YYYY-MM-DD")}
                    </div>
                    <div className="picture-item-content">{item.desc}</div>
                  </div>
                </div>
              </ul>
            );
          })}
        </AutoResponsive>
        <ModalGateway>
          {isOpenLightBox ? (
            <Modal onClose={() => setIsOpenLightBox(false)}>
              <Carousel
                views={imgList.map((item: any) => ({ source: item.url }))}
                currentIndex={lightBoxImgIndex}
                styles={{
                  headerFullscreen(
                    base: React.CSSProperties,
                    state: CarouselState
                  ) {
                    return {
                      display: "none",
                    };
                  },
                }}
              />
            </Modal>
          ) : null}
        </ModalGateway>
      </div>
    </>
  );
};

export default Picture;
