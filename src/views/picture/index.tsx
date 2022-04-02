import React, { useState, useEffect } from "react";
import "./index.less";
import AutoResponsive from "autoresponsive-react";
import Carousel, { Modal, ModalGateway, CarouselState } from "react-images";
import Api from "@/network/api";
import { Tag } from "@douyinfe/semi-ui";
import dayjs from "dayjs";

const Picture: React.FC = () => {
  const [clientWidth, setClientWidth] = useState<number>(1200);
  const [imgList, setImgList] = useState([]);
  const [isOpenLightBox, setIsOpenLightBox] = useState<boolean>(false);
  const [lightBoxImgIndex, setLightBoxImgIndex] = useState<number>(0);

  useEffect(() => {
    resizeWindow();
    getAllImg();
    window.addEventListener("resize", resizeWindow);
    return () => {
      window.removeEventListener("resize", resizeWindow);
    };
  }, []);

  async function getAllImg() {
    const errReloadKey = "reload";
    try {
      const imgWidth = 400;
      const data = await Api.Picture.getPictureList();
      const resData = data.map((item) => {
        const {
          title,
          region,
          desc,
          create_time: createTime,
          picture_url: url,
        } = item;
        const img = new Image();
        img.src = item.picture_url;
        /**
         * TODO 判断img的width和height参数是否拿到，假如没拿到报错并重新触发接口
         * 这段逻辑有点问题，应该是onload之后push进imgList，有空了改改
         */
        if (!Boolean(img.width) || !Boolean(img.height))
          throw new Error(errReloadKey);
        return {
          width: imgWidth,
          height: (img.height * imgWidth) / img.width,
          title,
          url,
          region,
          desc,
          createTime,
        };
      });
      setImgList(resData);
    } catch (err: any) {
      if (err.message === errReloadKey) {
        getAllImg();
        return;
      }
      window.$catch(err.message);
    }
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
                views={imgList.map((item) => ({ source: item.url }))}
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
