<template>
  <div :class="['header',isHomePage ? 'header-home' :'']">
    <div
        class="header-nav-item"
        v-for="item in navRoutes"
        :key="item.name"
        @click="handleClickNav(item)"
    >
      {{ item.title }}
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, Ref, watch} from "vue";
import {useRouter, useRoute} from "vue-router";
import {navRoutes, NavRouteItem} from "@/routers";

const router = useRouter();
const route = useRoute();

const isHomePage: Ref<boolean> = ref(true);

watch(() => route.path, (newVal, val) => {
  isHomePage.value = newVal === "/";
}, {
  immediate: true
});

function handleClickNav(item: NavRouteItem) {
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
    transition: all 0.5s ease;
    border-bottom: 1px solid black;

    &:hover {
      border-bottom: 1px solid white;
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