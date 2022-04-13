import "./index.less";

import React, {useState} from "react";
import Carousel, {CarouselState, Modal, ModalGateway} from "react-images";
import {useQuery} from "react-query";

import PictureCard from "@/components/picture/picture-card";
import Api from "@/network/api";
import {GetPictureListItem} from "@/network/apiType";

const Picture: React.FC = () => {
  const [isOpenLightBox, setIsOpenLightBox] = useState<boolean>(false);
  const [lightBoxImgIndex, setLightBoxImgIndex] = useState<number>(0);

  const {
    data: imgList = [],
    isError,
    error,
  } = useQuery("picture-list", async () => {
    return await Api.Picture.getPictureList();
  });

  if (isError) {
    window.$catch(error);
  }

  return (
    <div className="picture-wrapper">
      {imgList.map((item: GetPictureListItem, index: number) => {
        return (
          <PictureCard key={"picture-item" + index} index={index} imgInfo={item} onClick={(cIndex: number) => {
            setIsOpenLightBox(true);
            setLightBoxImgIndex(cIndex);
          }}/>
        );
      })}
      <ModalGateway>
        {isOpenLightBox && (
          <Modal onClose={() => setIsOpenLightBox(false)}>
            <Carousel
              views={imgList.map((item: GetPictureListItem) => ({
                source: item.picture_url,
              }))}
              currentIndex={lightBoxImgIndex}
              styles={{
                headerFullscreen(
                  base: React.CSSProperties, // eslint-disable-line
                  state: CarouselState // eslint-disable-line
                ) {
                  return {
                    display: "none",
                  };
                },
              }}
            />
          </Modal>
        )}
      </ModalGateway>
    </div>
  );
};

export default Picture;
