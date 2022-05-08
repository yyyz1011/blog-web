import React, { useEffect } from "react";
import Api from "@/network/api";
import { useQuery } from "react-query";
import NoData from "@/components/no-data";
import {
  Button,
  ButtonGroup,
  Descriptions,
  List,
  Modal,
  Tag,
} from "@douyinfe/semi-ui";
import dayjs from "dayjs";
import { GetPictureListItem } from "@/network/apiType";
import "./index.less";

const AdminPictureList: React.FC = () => {
  const {
    data: imgList = [],
    isLoading,
    isError,
    error,
  } = useQuery("picture-list", async () => {
    const data = await Api.Picture.getPictureList();
    console.log(data);
    return data;
  });

  useEffect(() => {
    if (isError) {
      window.$catch(error);
    }
  }, [isError]);

  function getDescriptionPictureList(pictureInfo: GetPictureListItem) {
    return [
      {
        key: "图片缩略图",
        value: (
          <img
            className="description-img"
            src={pictureInfo.picture_url}
            alt={pictureInfo.title}
          ></img>
        ),
      },
      { key: "拍摄地点", value: pictureInfo.region },
      {
        key: "拍摄时间",
        value: dayjs(Number(pictureInfo.create_time)).format("YYYY-MM-DD"),
      },
      { key: "图片简洁", value: pictureInfo.desc },
    ];
  }

  function handleEditPicture(pictureInfo: GetPictureListItem) {
    console.log("TODO 等创建图库搞完了回来弄这个");
  }

  function handleDeletePicture(pictureInfo: GetPictureListItem) {
    Modal.error({
      className: "modal-delete",
      title: `确认要删除图片么?(不可逆)`,
      content: `图片名：${pictureInfo.title}`,
      cancelText: "错了错了，不删",
      okText: "狠心删除",
      okType: "danger",
      onOk: () => {
        console.log("删除");
      },
    });
  }

  if (!imgList?.length || isLoading) {
    return (
      <div className="picture-no-data">
        <NoData text="图片正在赶来的路上~" />
      </div>
    );
  }

  return (
    <div>
      <List
        dataSource={imgList}
        renderItem={(item: GetPictureListItem, index: number) => {
          return (
            <List.Item
              main={
                <div className="picture-list-main">
                  <div className="picture-list-main--title">
                    {index + 1}.{item.title}
                  </div>
                  <Descriptions
                    data={getDescriptionPictureList(item)}
                    row
                    size="small"
                  />
                </div>
              }
              extra={
                <ButtonGroup theme="borderless">
                  <Button onClick={() => handleEditPicture(item)}>编辑</Button>
                  <Button
                    type="danger"
                    onClick={() => handleDeletePicture(item)}
                  >
                    删除
                  </Button>
                </ButtonGroup>
              }
            />
          );
        }}
      ></List>
    </div>
  );
};

export default AdminPictureList;
