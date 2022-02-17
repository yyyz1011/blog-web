import React, { useState } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import { Card, Button, Notification } from "@douyinfe/semi-ui";
import {
  IconBold,
  IconItalic,
  IconUnderline,
  IconH1,
  IconH2,
  IconH3,
  IconH4,
  IconH5,
  IconH6,
  IconCode,
  IconQuote,
  IconList,
  IconOrderedList,
} from "@douyinfe/semi-icons";
import "draft-js/dist/Draft.css";
import { stateToHTML } from "draft-js-export-html";
import "./index.less";

interface LeafEditorProps {
  readonly?: boolean;
  isShowOperate?: boolean;
  operateText?: string;
  placeholder?: string;
  submit?: (content: string) => void | null;
  required?: boolean;
  requiredErrorTitle?: string;
  requiredErrorText?: string;
}
interface EditorPluginItem {
  key: string;
  text?: string;
  event?: (content: any) => void;
  icon?: React.ReactNode;
}

const LeafEditor: React.FC<LeafEditorProps> = (props: LeafEditorProps) => {
  const {
    readonly = false,
    isShowOperate = true,
    operateText = "",
    placeholder = "",
    submit = null,
    required = true,
    requiredErrorTitle = "",
    requiredErrorText = "",
  } = props;

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const setEditorAttrByInlineStyle = (attr: string) =>
    setEditorState(RichUtils.toggleInlineStyle(editorState, attr));
  const setEditorAttrByBlockType = (attr: string) =>
    setEditorState(RichUtils.toggleBlockType(editorState, attr));

  const EditorPlugin: Array<EditorPluginItem> = [
    {
      key: "BOLD",
      icon: <IconBold />,
      event: () => setEditorAttrByInlineStyle("BOLD"),
    },
    {
      key: "ITALIC",
      icon: <IconItalic />,
      event: () => setEditorAttrByInlineStyle("ITALIC"),
    },
    {
      key: "UNDERLINE",
      icon: <IconUnderline />,
      event: () => setEditorAttrByInlineStyle("UNDERLINE"),
    },
    {
      key: "header-one",
      icon: <IconH1 />,
      event: () => setEditorAttrByBlockType("header-one"),
    },
    {
      key: "header-two",
      icon: <IconH2 />,
      event: () => setEditorAttrByBlockType("header-two"),
    },
    {
      key: "header-three",
      icon: <IconH3 />,
      event: () => setEditorAttrByBlockType("header-three"),
    },
    {
      key: "header-four",
      icon: <IconH4 />,
      event: () => setEditorAttrByBlockType("header-four"),
    },
    {
      key: "header-five",
      icon: <IconH5 />,
      event: () => setEditorAttrByBlockType("header-five"),
    },
    {
      key: "header-six",
      icon: <IconH6 />,
      event: () => setEditorAttrByBlockType("header-six"),
    },
    {
      key: "code-block",
      icon: <IconCode />,
      event: () => setEditorAttrByBlockType("code-block"),
    },
    {
      key: "blockquote",
      icon: <IconQuote />,
      event: () => setEditorAttrByBlockType("blockquote"),
    },
    {
      key: "unordered-list-item",
      icon: <IconList />,
      event: () => setEditorAttrByBlockType("unordered-list-item"),
    },
    {
      key: "ordered-list-item",
      icon: <IconOrderedList />,
      event: () => setEditorAttrByBlockType("ordered-list-item"),
    },
  ];

  const editorToHtmlOptions = {
    defaultBlockTag: "div",
    inlineStyles: {},
    blockRenderers: {
      blockquote: (block: any) => {
        return "<div class='blockquote'>" + block.getText() + "</div>";
      },
      "code-block": (block: any) => {
        return "<div class='code-block'>" + block.getText() + "</div>";
      },
    },
  };

  const handleSubmitEditor = () => {
    const content = stateToHTML(
      editorState.getCurrentContent(),
      editorToHtmlOptions
    );
    if (content === "<div><br></div>" && required)
      Notification.error({
        title: requiredErrorTitle,
        content: requiredErrorText,
        position: 'top',
      });
    submit && submit(content);
  };

  return (
    <Card>
      {EditorPlugin.map((item, index) => {
        const IconEditor = item.icon as React.ReactNode;
        return (
          <Button
            disabled={readonly}
            className="editor-operate"
            theme="borderless"
            key={item.key + index}
            onClick={item.event}
            icon={IconEditor}
          />
        );
      })}
      <Editor
        readOnly={readonly}
        placeholder={placeholder}
        editorState={editorState}
        onChange={setEditorState}
      />
      {isShowOperate && (
        <div className="operate">
          <Button
            className="operate-comment"
            theme="solid"
            type="primary"
            onClick={handleSubmitEditor}
          >
            {operateText}
          </Button>
        </div>
      )}
    </Card>
  );
};

export default LeafEditor;
