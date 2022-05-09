import "./index.less";

import {
  Button,
  ButtonGroup,
  Descriptions,
  List,
  Modal,
  Toast,
} from "@douyinfe/semi-ui";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useQuery } from "react-query";

import NoData from "@/components/no-data";
import Api from "@/network/api";
import { GetPictureListItem } from "@/network/apiType";

const AdminPictureList: React.FC = () => {
  const {
    data: imgList = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery("picture-list", async () => {
    return await Api.Picture.getPictureList();
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
    Toast.warning("暂不支持，敬请期待");
  }

  function handleDeletePicture(pictureInfo: GetPictureListItem) {
    Modal.error({
      className: "modal-delete",
      title: `确认要删除图片么?(不可逆)`,
      content: `图片名：${pictureInfo.title}`,
      cancelText: "错了错了，不删",
      okText: "狠心删除",
      okType: "danger",
      onOk: async () => {
        try {
          await Api.Picture.delPicture({ pid: pictureInfo.pid });
          refetch();
          Toast.success("删除笔记成功");
        } catch (err: any) {
          window.$catch(err.message);
        }
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
