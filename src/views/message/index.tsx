import React from "react";
import "./index.less";
import MessageList from "@/components/message/message-list";
import { useTranslation } from "react-i18next";
import LeafEditor from "@/components/common/leaf-editor";

const Message: React.FC = () => {
  const { t } = useTranslation();

  function handleCreateMessage(text: string) {
    console.log("TODO 上传留言", text);
  }

  return (
    <div className="message">
      <div>
        <LeafEditor
          placeholder={t("message.editor_placeholder")}
          operateText={t("message.editor_operate_text")}
          validateErrorText={t("message.editor_error_text")}
          success={handleCreateMessage}
        />
      </div>
      <div className="message-title">{t("message.history_message")}</div>
      <MessageList></MessageList>
    </div>
  );
};

export default Message;
