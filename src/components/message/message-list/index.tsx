import "./index.less";
import "md-editor-rt/lib/style.css";

import { IconClock, IconUserCircle } from "@douyinfe/semi-icons";
import { Avatar, List } from "@douyinfe/semi-ui";
import dayjs from "dayjs";
import Editor from "md-editor-rt";
import React from "react";

import NoData from "@/components/no-data";
import { GetMessageListItem } from "@/network/apiType";
import { getQQAvatar } from "@/network/index";

interface MessageListProps {
  messageList: GetMessageListItem[];
}
const MessageList: React.FC<MessageListProps> = (props: MessageListProps) => {
  const { messageList } = props;

  return (
    <div>
      {!messageList.length ? (
        <NoData text="暂无留言" />
      ) : (
        <List
          dataSource={messageList}
          renderItem={(item) => (
            <List.Item
              header={
                <Avatar src={getQQAvatar(item.account)} alt="leaf-blog">
                  {item.nick_name}
                </Avatar>
              }
              main={
                <div className="list-item">
                  <div className="list-item--title">
                    <IconUserCircle className="item-icon" />
                    {item.nick_name}
                    评论于
                    <IconClock className="item-icon" />
                    {dayjs(Number(item.create_time)).format("YYYY-MM-DD HH:mm")}
                  </div>
                  <div className="list-item--content">
                    <Editor
                      theme="dark"
                      previewOnly
                      modelValue={item.content}
                    ></Editor>
                  </div>
                </div>
              }
            />
          )}
        />
      )}
    </div>
  );
};

export default MessageList;
