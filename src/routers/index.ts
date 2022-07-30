import {createRouter, createWebHistory} from "vue-router";

export interface NavRouteItem {
  path: string;
  name: string;
  title?: string;
  meta?: any;
  component: any;
}

export const navRoutes: Array<NavRouteItem> = [
  {
    path: "/",
    name: "home",
    title: "首页",
    component: () => import("@/views/home/Home.vue"),
    meta: {index: 1}
  },
  {
    path: "/article",
    name: "article",
    title: "笔记",
    component: () => import("@/views/article/Article.vue"),
    meta: {index: 2}
  },
  {
    path: "/picture",
    name: "picture",
    title: "图库",
    component: () => import("@/views/picture/Picture.vue"),
    meta: {index: 3}
  },
  {
    path: "/link",
    name: "link",
    title: "友链",
    component: () => import("@/views/link/Link.vue"),
    meta: {index: 4}
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
