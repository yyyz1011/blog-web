import "./index.less";

import { IconKey, IconVideo } from "@douyinfe/semi-icons";
import { Input, Modal, TabPane, Tabs } from "@douyinfe/semi-ui";
import React, { useEffect, useState } from "react";

import NoData from "@/components/no-data";
import { admin_password } from "@/config/admin.config";
import {
  AdminTabsItem,
  adminTabsList,
  STORAGE_ADMIN_LOGIN,
} from "@/constant/admin";

const AdminHome: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    const storageAdminLogin = sessionStorage.getItem(STORAGE_ADMIN_LOGIN);
    const isLogin = Boolean(Number(storageAdminLogin));
    setIsLogin(isLogin);
    if (!isLogin) {
      setVisible(true);
    }
  }, []);

  function handleAdminLogin() {
    if (password === admin_password) {
      sessionStorage.setItem(STORAGE_ADMIN_LOGIN, "1");
      location.reload();
    } else {
      window.$catch("兄弟，手下留情~");
      setVisible(false);
    }
  }

  if (!isLogin) {
    return (
      <>
        <div className="admin-home-without-login">
          <NoData text="高手是谁？走错地方啦"></NoData>
        </div>
        <Modal
          icon={<IconVideo />}
          keepDOM
          closeOnEsc
          title="后台登录"
          okText="登录"
          cancelText="算了，我就看看"
          visible={visible}
          onOk={handleAdminLogin}
          onCancel={() => setVisible(false)}
        >
          <div className="modal-tip">欢迎来到leaf blog后台，请输入密码~</div>
          <Input
            className="modal-input"
            mode="password"
            value={password}
            onChange={(val) => setPassword(val)}
            prefix={<IconKey />}
            showClear
          ></Input>
        </Modal>
      </>
    );
  }

  return (
    <div className="admin-home">
      <Tabs tabPosition="left" type="button" lazyRender>
        {adminTabsList.map((tab: AdminTabsItem) => (
          <TabPane
            key={tab.key}
            tab={
              <div className="admin-home-tab-item">
                <tab.icon />
                {tab.label}
              </div>
            }
            itemKey={tab.key}
          >
            <tab.component />
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default AdminHome;
