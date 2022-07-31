<script setup lang="ts">
import { useRouter } from "vue-router";

import LOTTIE_404 from "@/assets/lotties/404.json";
import Lottie from "@/components/common/Lottie.vue";
import TextButton from "@/components/common/TextButton.vue";

const router = useRouter();

function handleBack() {
  router.replace({ name: "home" });
}
</script>

<template>
  <div class="no-page-wrapper">
    <Lottie :options="{ animationData: LOTTIE_404 }" />
    <TextButton class="no-page-wrapper--operate" text="点击返回首页" @click="handleBack"></TextButton>
  </div>
</template>

<style scoped lang="scss">
.no-page-wrapper {
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &--operate {
    width: 250px;
  }
}
</style>
