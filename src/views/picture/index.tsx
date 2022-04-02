import React, { useState, useEffect } from "react";
import "./index.less";
import AutoResponsive from "autoresponsive-react";
import Carousel, { Modal, ModalGateway, CarouselState } from "react-images";

const Picture: React.FC = () => {
  const [clientWidth, setClientWidth] = useState<number>(1200);
  const [imgList, setImgList] = useState([]);
  const [isOpenLightBox, setIsOpenLightBox] = useState<boolean>(false);
  const [lightBoxImgIndex, setLightBoxImgIndex] = useState<number>(0);

  const getAllImg = () => {
    // const mockLinkList = new Array(9).fill(getFreeImg);
    // const data = mockLinkList.map((item) => {
    //   const width = 380;
    //   const height = Math.floor(Math.random() * 3 + 5) * 100;
    //   return {
    //     uri: item({
    //       width,
    //       height,
    //     }),
    //     width,
    //     height,
    //   };
    // });
    // setImgList([...imgList, ...data]);
  };

  const resizeWindow = () => {
    const width = document.body.clientWidth;
    const rate = 0.85;
    setClientWidth(width > 1200 ? width * rate : 1200 * rate);
  };

  const autoResponsiveOption = () => {
    return {
      containerWidth: clientWidth,
      itemClassName: "productListItem",
      gridWidth: 10,
      itemMargin: 20,
      transitionDuration: 0.5,
    };
  };

  useEffect(() => {
    resizeWindow();
    getAllImg();
    window.addEventListener("resize", resizeWindow);
    return () => {
      window.removeEventListener("resize", resizeWindow);
    };
  }, []);

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
                    src={item.uri}
                    style={{
                      width: item.width,
                      height: item.height,
                    }}
                  />
                  <div className="picture-extra-info">
                    <div className="picture-item-title">Title Goes Here</div>
                    <div className="picture-item-modify-time">2022-3-3</div>
                    <div className="picture-item-content">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Quis quod et deleniti nobis quasi ad, adipisci perferendis
                      totam, ducimus incidunt dolore aut, quae quaerat
                      architecto quisquam repudiandae amet nostrum quidem?
                    </div>
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
                views={imgList.map((item) => ({ source: item.uri }))}
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
