import { IconArticle, IconEdit, IconUpload } from "@douyinfe/semi-icons";

import AdminArticleCreate from "@/views/admin/admin-article-create";
import AdminArticleList from "@/views/admin/admin-article-list";
import AdminPictureCreate from "@/views/admin/admin-picture-create";
import AdminPictureList from "@/views/admin/admin-picture-list";

export const STORAGE_ADMIN_LOGIN = "storage_admin_login";

export interface AdminTabsItem {
  key: string;
  icon: any;
  label: string;
  component: any;
}
export const adminTabsList: AdminTabsItem[] = [
  {
    key: "article-list",
    icon: IconArticle,
    label: "笔记列表",
    component: AdminArticleList,
  },
  {
    key: "article-create",
    icon: IconEdit,
    label: "创建笔记",
    component: AdminArticleCreate,
  },
  {
    key: "picture-list",
    icon: IconArticle,
    label: "图库列表",
    component: AdminPictureList,
  },
  {
    key: "picture-create",
    icon: IconUpload,
    label: "创建图片",
    component: AdminPictureCreate,
  },
];
