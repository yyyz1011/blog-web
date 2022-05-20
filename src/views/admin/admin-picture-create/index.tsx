import "./index.less";

import { Button, Col, Form, Row, Toast } from "@douyinfe/semi-ui";
import React, { useState } from "react";

import Api from "@/network/api";
import compressImg from "@/utils/compressImg";

const AdminPictureCreate: React.FC = () => {
  const [formApi, setFormApi] = useState(null);

  function getFormApi(formApi: any) {
    setFormApi(formApi);
  }

  async function handleSubmit(value: object) {
    const { title, region, desc, create_time, picture_url } = value as any;
    const createTime = new Date(create_time).getTime().toString();
    const pictureUrl: string = picture_url[0].response.url;
    const params = {
      title,
      region,
      desc,
      create_time: createTime,
      picture_url: pictureUrl,
    };
    try {
      await Api.Picture.createPicture(params);
      formApi.reset();
      Toast.success("图片新增成功");
    } catch (err: any) {
      window.$catch(err.message);
    }
  }

  async function customRequestUpload({ file, onError, onSuccess }: any) {
    const compressInfo = await compressImg(file.fileInstance);
    const formData = new FormData();
    formData.append("file", compressInfo.file);
    try {
      const data: any = await Api.Common.upload(formData);
      onSuccess(data);
      Toast.success("图片上传成功");
    } catch (err: any) {
      window.$catch(err.message);
      onError();
    }
  }

  function afterUpload({ response }: any) {
    if (!response.url) return {};
    return {
      status: "success",
      url: response.url,
    };
  }

  return (
    <div>
      <Form getFormApi={getFormApi} onSubmit={handleSubmit}>
        <Form.Section text="图片上传">
          <Row>
            <Col span={12}>
              <Form.Input
                field="title"
                label="图片标题"
                trigger="blur"
                placeholder="请输入图片标题"
                rules={[{ required: true, message: "图片标题不能为空" }]}
              ></Form.Input>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Input
                field="region"
                label="图片拍摄地"
                trigger="blur"
                placeholder="请输入图片拍摄地"
                rules={[{ required: true, message: "图片拍摄地不能为空" }]}
              ></Form.Input>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Input
                field="desc"
                label="图片介绍"
                trigger="blur"
                placeholder="请输入图片介绍"
                rules={[{ required: true, message: "图片介绍不能为空" }]}
              ></Form.Input>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.DatePicker
                field="create_time"
                label="拍摄时间"
                placeholder="请选择拍摄时间"
                trigger="blur"
                rules={[{ required: true, message: "拍摄时间不能为空" }]}
              />
            </Col>
          </Row>
          <Row>
            <Form.Upload
              action=""
              field="picture_url"
              label="图片上传"
              limit={1}
              draggable
              trigger="blur"
              customRequest={customRequestUpload}
              afterUpload={afterUpload}
              rules={[{ required: true, message: "图片不能为空" }]}
            ></Form.Upload>
          </Row>
          <Row>
            <Button type="primary" htmlType="submit" className="submit-btn">
              创建
            </Button>
            <Button htmlType="reset">重置</Button>
          </Row>
        </Form.Section>
      </Form>
    </div>
  );
};

export default AdminPictureCreate;
