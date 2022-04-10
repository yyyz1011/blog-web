import "./index.less";
import "md-editor-rt/lib/style.css";

import { IconClock, IconUserCircle } from "@douyinfe/semi-icons";
import { Avatar, List } from "@douyinfe/semi-ui";
import dayjs from "dayjs";
import Editor from "md-editor-rt";
import React from "react";
import { useTranslation } from "react-i18next";

import NoData from "@/components/no-data";
import { GetMessageListItem } from "@/network/apiType";
import { getQQAvatar } from "@/network/index";

interface MessageListProps {
  messageList: GetMessageListItem[];
}
const MessageList: React.FC<MessageListProps> = (props: MessageListProps) => {
  const { t } = useTranslation();
  const {messageList} = props;

  return (
    <div>
      {!messageList.length ? 
        <NoData text={t("message.message_no_data")} />
       : 
        <List
          dataSource={messageList}
          renderItem={(item) => 
            <List.Item
              header={
                <Avatar src={getQQAvatar(item.account)} alt="leaf-blog">
                  {item.nick_name}
                </Avatar>
              }
              main={
                <div className="list-item">
                  <div className="list-item--title">
                    {t("message.message_item_title_name_pre")}
                    <IconUserCircle className="item-icon" />
                    {item.nick_name}
                    {t("message.message_item_title_name_append")}
                    <IconClock className="item-icon" />
                    {dayjs(Number(item.create_time)).format("YYYY-MM-DD HH:mm")}
                  </div>
                  <div className="list-item--content">
                    <Editor previewOnly modelValue={item.content}></Editor>
                  </div>
                </div>
              }
            />
          }
        />
      }
    </div>
  );
};

export default MessageList;
