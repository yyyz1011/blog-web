<template>
  <Header/>
  <router-view v-slot="{Component}">
    <keep-alive>
      <transition :name="animation">
        <component :is="Component"/>
      </transition>
    </keep-alive>
  </router-view>
</template>

<script setup lang="ts">
import {ref} from "vue";
import Header from "@/components/header/Header.vue";
import {onBeforeRouteUpdate} from "vue-router";

const animation = ref("slide");
onBeforeRouteUpdate((to: any, form: any) => {
  if (to?.meta?.index > form?.meta?.index) {
    animation.value = "slide-left";
  } else {
    animation.value = "slide-right";
  }
});
</script>

<style scoped lang="scss">
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  width: 100%;
  height: 100%;
  will-change: transform;
  transition: all 2s cubic-bezier(.55, 0, .1, 1);
  position: absolute;
  backface-visibility: hidden;
}

.slide-right-enter-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(3%, 0, 0);
}

.slide-left-enter-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-3%, 0, 0);
}
</style>
