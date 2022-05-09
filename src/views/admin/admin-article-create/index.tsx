import "./index.less";

import { Col, Form, Input, Modal, Notification, Row } from "@douyinfe/semi-ui";
import React, { useEffect, useState } from "react";

import LeafEditor from "@/components/common/leaf-editor";
import Api from "@/network/api";

const AdminArticleCreate: React.FC = () => {
  const [formApi, setFormApi] = useState(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [newType, setNewType] = useState<string>("");
  const [articleTypeList, setArticleTypeList] = useState([]);

  useEffect(() => {
    getArticleTypeList();
  }, []);

  function getFormApi(formApi: any) {
    setFormApi(formApi);
  }

  async function getArticleTypeList() {
    try {
      const data = await Api.Article.getArticleTypeList();
      setArticleTypeList(data);
      console.log(data);
    } catch (err: any) {
      window.$catch(err.message);
    }
  }

  async function handleCreateArticleType() {
    if (!newType) {
      window.$catch("新增笔记类型不能为空");
      return;
    }
    try {
      await Api.Article.createArticleType({
        label: newType,
      });
      await getArticleTypeList();
      Notification.success({
        title: "创建类型成功",
        position: "top",
      });
    } catch (err: any) {
      window.$catch(err.message);
    } finally {
      setNewType("");
      setVisible(false);
    }
  }

  async function handleSubmit(text: string) {
    // 校验表单
    try {
      await formApi.validate();
    } catch (err: any) {
      window.$catch("笔记表单校验未通过");
      return false;
    }

    if (!text) {
      window.$catch("笔记正文不能为空");
      return false;
    }

    let isSubmit = false;
    const { title, desc, atid } = formApi.getValues();
    const params = {
      title,
      desc,
      atid,
      content: text,
    };
    try {
      await Api.Article.createArticle(params);
      isSubmit = true;
      formApi.reset();
    } catch (err: any) {
      window.$catch(err.message);
    }
    return isSubmit;
  }

  function submitSuccess() {
    Notification.success({
      title: "笔记创建成功，可以到笔记列表查看",
      position: "top",
    });
  }

  return (
    <div className="admin-article-create">
      <Form getFormApi={getFormApi}>
        <Form.Section text="基本信息">
          <Row>
            <Col span={12}>
              <Form.Input
                field="title"
                label="笔记标题"
                placeholder="请输入笔记标题"
                trigger="blur"
                rules={[{ required: true, message: "笔记标题不能为空" }]}
              />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Select
                field="atid"
                placeholder="请选择笔记类型"
                label="笔记类型"
                extraText={
                  <span
                    className="article-type-operate"
                    onClick={() => setVisible(true)}
                  >
                    没有找到合适的笔记类型？点我创建
                  </span>
                }
                rules={[{ required: true, message: "笔记类型不能为空" }]}
              >
                {articleTypeList.map((item) => (
                  <Form.Select.Option key={item.atid} value={item.atid}>
                    {item.label}
                  </Form.Select.Option>
                ))}
              </Form.Select>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.TextArea
                field="desc"
                label="笔记简洁"
                placeholder="请填写笔记简介"
                rules={[{ required: true, message: "笔记简介不能为空" }]}
              ></Form.TextArea>
            </Col>
          </Row>
        </Form.Section>
        <Form.Section text="笔记正文">
          <LeafEditor
            placeholder="请输入笔记"
            validateErrorText="笔记不能为空"
            operateText="创建笔记"
            submit={handleSubmit}
            success={submitSuccess}
          />
        </Form.Section>
      </Form>
      <Modal
        title="创建新的笔记类型"
        visible={visible}
        closeOnEsc
        keepDOM
        cancelText="不创建了"
        okText="创建"
        onOk={handleCreateArticleType}
        onCancel={() => setVisible(false)}
      >
        <Input
          value={newType}
          onChange={(val) => setNewType(val)}
          placeholder="请输入新的笔记类型"
        ></Input>
      </Modal>
    </div>
  );
};

export default AdminArticleCreate;
