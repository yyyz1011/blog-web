<template>
  <div :class="['header', isHomePage ? 'header-home' : '']">
    <div v-for="item in navRoutes" :key="item.name" class="header-nav-item" @click="handleClickNav(item)">
      <component :is="item.icon" class="icon" />
      {{ item.title }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import { NavRouteItem, navRoutes } from "@/routers";

const router = useRouter();
const route = useRoute();

const isHomePage: Ref<boolean> = ref(true);

watch(
  () => route.path,
  (newVal) => {
    isHomePage.value = newVal === "/";
  },
  {
    immediate: true
  }
);

function handleClickNav(item: NavRouteItem) {
  if (route.path === item.path) return;
  router.push({
    name: item.name
  });
}
</script>

<style scoped lang="scss">
.header {
  height: $nav-height;
  position: sticky;
  top: 0;
  z-index: 1000;
  color: $text-color-white;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 24px;

  .header-nav-item {
    cursor: pointer;
    user-select: none;
    margin-left: 24px;
    padding: 8px 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 100px;
    transition: all 0.5s ease;
    border-bottom: 1px solid black;

    &:hover {
      border-bottom: 1px solid white;
    }

    .icon {
      width: 20px;
      margin-right: 4px;
    }
  }
}

.header-home {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}
</style>
