import "./index.less";

import { Notification } from "@douyinfe/semi-ui";
import React, { useEffect, useState } from "react";

import LeafEditor from "@/components/common/leaf-editor";
import MessageList from "@/components/message/message-list";
import { LOCALSTORAGE_AUTHOR_INFO } from "@/constant";
import Api from "@/network/api";
import { GetMessageListItem } from "@/network/apiType";
import useLocalStorageState from "@/utils/useLocalStorageState";

const Message: React.FC<any> = () => {
  const [messageList, setMessageList] = useState<GetMessageListItem[]>([]);
  const [localstorageUserInfo, setLocalstorageUserInfo] = useLocalStorageState(
    null,
    LOCALSTORAGE_AUTHOR_INFO
  );
  const userAccount = localstorageUserInfo?.account;
  const userNickName = localstorageUserInfo?.nickname;

  useEffect(() => {
    getMessageAllList();
  }, []);

  async function handleSubmit(text: string) {
    let isSubmit = false;
    try {
      const data = await Api.Message.createMessage({
        account: userAccount,
        nick_name: userNickName,
        content: text,
      });
      if (data) {
        isSubmit = true;
      }
    } catch (err: any) {
      window.$catch(err.message);
    }
    return isSubmit;
  }

  function submitSuccess() {
    Notification.success({
      content: "留言成功",
    });
    getMessageAllList();
  }

  async function getMessageAllList() {
    try {
      const data = await Api.Message.getMessageList();
      setMessageList(data);
    } catch (err: any) {
      window.$catch(err.message);
    }
  }

  return (
    <div className="message">
      <div>
        <LeafEditor
          placeholder="请输入留言"
          operateText="留言"
          operateDisabledText="请登录之后留言"
          validateErrorText="留言不能为空"
          submit={handleSubmit}
          success={submitSuccess}
          isEdit={Boolean(userAccount)}
        />
      </div>
      <div className="message-title">历史留言</div>
      <MessageList messageList={messageList}></MessageList>
    </div>
  );
};

export default Message;
