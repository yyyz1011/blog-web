import {
  IconAlignLeft,
  IconArticle,
  IconImage,
  IconMember,
  IconUnlink,
} from "@douyinfe/semi-icons";
import React, { lazy } from "react";

type RouterType = {
  key: string;
  path: string;
  component: React.LazyExoticComponent<any>;
  title: string;
  icon?: any;
};

const ArticleRouter: RouterType = {
  key: "article",
  path: "/",
  component: lazy(() => import("@/views/article")),
  title: "笔记",
  icon: IconArticle,
};

const PictureRouter: RouterType = {
  key: "picture",
  path: "/picture",
  component: lazy(() => import("@/views/picture")),
  title: "图库",
  icon: IconImage,
};

const BlogLinkRouter: RouterType = {
  key: "blog-link",
  path: "/blog-link",
  component: lazy(() => import("@/views/blog-link")),
  title: "友链",
  icon: IconUnlink,
};

const MessageRouter: RouterType = {
  key: "message",
  path: "/message",
  component: lazy(() => import("@/views/message")),
  title: "留言",
  icon: IconAlignLeft,
};

const AboutRouter: RouterType = {
  key: "about",
  path: "/about",
  component: lazy(() => import("@/views/about")),
  title: "我的",
  icon: IconMember,
};

const NavRouters: RouterType[] = [
  ArticleRouter,
  PictureRouter,
  MessageRouter,
  BlogLinkRouter,
  AboutRouter,
];

const ArticleDetailRouter: RouterType = {
  key: "article-detail",
  path: "/article-detail/:aid",
  component: lazy(() => import("@/views/article-detail")),
  title: "article-detail",
};

const AdminHomeRouter: RouterType = {
  key: "admin-home",
  path: "/admin",
  component: lazy(() => import("@/views/admin/admin-home")),
  title: "admin-home",
};

const Routers: RouterType[] = [ArticleDetailRouter, AdminHomeRouter];

export { NavRouters, Routers };
export type { RouterType };
