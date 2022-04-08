import {
  IconAlignLeft,
  IconArticle,
  IconHome,
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

const HomeRouter: RouterType = {
  key: "home",
  path: "/home",
  component: lazy(() => import("@/views/home")),
  title: "home",
  icon: IconHome,
};

const ArticleRouter: RouterType = {
  key: "article",
  path: "/",
  component: lazy(() => import("@/views/article")),
  title: "article",
  icon: IconArticle,
};

const PictureRouter: RouterType = {
  key: "picture",
  path: "/picture",
  component: lazy(() => import("@/views/picture")),
  title: "picture",
  icon: IconImage,
};

const BlogLinkRouter: RouterType = {
  key: "blog-link",
  path: "/blog-link",
  component: lazy(() => import("@/views/blog-link")),
  title: "blog_link",
  icon: IconUnlink,
};

const MessageRouter: RouterType = {
  key: "message",
  path: "/message",
  component: lazy(() => import("@/views/message")),
  title: "message",
  icon: IconAlignLeft,
};

const AboutRouter: RouterType = {
  key: "about",
  path: "/about",
  component: lazy(() => import("@/views/about")),
  title: "about",
  icon: IconMember,
};

const NavRouters: RouterType[] = [
  HomeRouter,
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

const Routers: RouterType[] = [ArticleDetailRouter];

export { NavRouters, Routers };
export type { RouterType };
