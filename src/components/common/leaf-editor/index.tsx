import React, { useState } from "react";
import "./index.less";
import Editor from "md-editor-rt";
import "md-editor-rt/lib/style.css";
import Api from "@/network/api";
import { Button, Notification } from "@douyinfe/semi-ui";
import sanitizeHtml from "sanitize-html";

interface LeafEditorProps {
  placeholder?: string;
  operateText?: string;
  operateDisabledText?: string;
  validateErrorText?: string;
  submit?: (text?: string) => Promise<boolean>;
  success?: (text?: string) => void;
  isEdit?: boolean;
}
const LeafEditor: React.FC<LeafEditorProps> = (props: LeafEditorProps) => {
  const {
    placeholder = "",
    operateText = "",
    operateDisabledText = "",
    validateErrorText = "error",
    submit = () => {},
    success = () => {},
    isEdit = true,
  } = props;
  const [text, setText] = useState("");
  const [previewTheme] = useState("vuepress");

  async function onUploadImg(
    files: FileList,
    callback: (urls: string[]) => void
  ) {
    const file = files[0];
    const form = new FormData();
    form.append("file", file);
    try {
      const data: any = await Api.Common.upload(form);
      callback([data.url]);
    } catch (err: any) {
      window.$catch(err.message);
    }
  }

  async function handleSubmit() {
    if (!text) {
      window.$catch(validateErrorText);
      return;
    }
    const isSubmit = await submit(text);
    if (!isSubmit) return;
    setText("");
    success();
  }

  return (
    <>
      <Editor
        sanitize={(html) => sanitizeHtml(html)}
        placeholder={placeholder}
        modelValue={text}
        onChange={setText}
        previewTheme={previewTheme as any}
        onUploadImg={onUploadImg}
      />
      <Button
        theme="solid"
        type="primary"
        block
        className="publish-button"
        onClick={handleSubmit}
        disabled={!isEdit}
      >
        {isEdit ? operateText : operateDisabledText}
      </Button>
    </>
  );
};

export default LeafEditor;
