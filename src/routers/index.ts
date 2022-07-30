import {createRouter, createWebHistory} from "vue-router";
import {IconCamera, IconHome, IconLink, IconNav} from "@arco-design/web-vue/es/icon";

export interface NavRouteItem {
  path: string;
  name: string;
  title?: string;
  meta?: any;
  icon?: any;
  component: any;
}

export const navRoutes: Array<NavRouteItem> = [
  {
    path: "/",
    name: "home",
    title: "首页",
    component: () => import("@/views/home/Home.vue"),
    meta: {index: 1},
    icon: IconHome,
  },
  {
    path: "/article",
    name: "article",
    title: "笔记",
    component: () => import("@/views/article/Article.vue"),
    meta: {index: 2},
    icon: IconNav,
  },
  {
    path: "/picture",
    name: "picture",
    title: "图库",
    component: () => import("@/views/picture/Picture.vue"),
    meta: {index: 3},
    icon: IconCamera,
  },
  {
    path: "/link",
    name: "link",
    title: "友链",
    component: () => import("@/views/link/Link.vue"),
    meta: {index: 4},
    icon: IconLink,
  }
];

export const otherRoutes: Array<NavRouteItem> = [
  {
    path: "/:catchAll(.*)",
    name: "no_page",
    component: () => import("@/views/error/NoPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: [...navRoutes, ...otherRoutes],
});

export default router;
