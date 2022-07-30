<template>
  <div class="home-wrapper">
    <video
        v-show="!isLoading"
        ref="homeVideoRef"
        class="home-bg"
        src="../../assets/img/night.mp4"
        muted
        loop
        autoplay
    />
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
  console.log(val);
  val?.addEventListener("loadeddata", () => {
    console.log(123);
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
}

.home-bg {
  width: 100vw;
  object-fit: fill;
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