<template>
  <div class="home-wrapper">
    <div v-show="!isLoading" class="home-content">
      <video
          ref="homeVideoRef"
          autoplay
          class="home-bg"
          loop
          muted
          src="../../assets/img/night.mp4"
      />
    </div>
    <div v-if="isLoading" class="home-loading">
      hello world
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, Ref, watch} from "vue";

const homeVideoRef: Ref<any> = ref(null);
const isLoading: Ref<boolean> = ref(true);

watch(() => homeVideoRef.value, (val) => {
  val?.addEventListener("loadeddata", () => {
    isLoading.value = false;
  });
}, {
  immediate: true,
  deep: true
});

</script>

<style scoped lang="scss">
.home-wrapper {
  background: $background-black;
  min-height: 100vh;

  .home-content {
    .home-bg {
      width: 100vw;
      min-width: 1200px;
      object-fit: fill;
    }
  }
}


.home-loading {
  color: white;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>