import React, { useState, useEffect } from "react";
import { getFreeImg } from "@/network";

const Picture: React.FC = () => {
  const [imgList, setImgList] = useState(null);

  const getAllImg = async () => {
    const mockLinkList = new Array(10).fill(getFreeImg);
    const imgList = mockLinkList.map((item) => {
      return item({
        width: 400,
        height: Math.floor(Math.random() * 5 + 5) * 100,
      });
    });
    setImgList(imgList);
  };

  useEffect(() => {
    getAllImg();
  }, []);

  return (
    <>
      <div>
        {imgList &&
          imgList.map((item: string, index: number) => (
            <img src={item} key={index}></img>
          ))}
      </div>
    </>
  );
};

export default Picture;
