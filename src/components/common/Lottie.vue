<template>
  <div :style="lottieStyle" ref="lottieRef"></div>
</template>

<script setup lang="ts">
import lottie from "lottie-web";
import {defineProps, computed, onMounted, defineEmits, ref} from "vue";

const props = defineProps({
  options: {
    type: Object,
    required: true,
  },
  height: Number,
  width: Number,
});
const emits = defineEmits<{
  (event: "animCreated"): void;
}>();

const lottieRef = ref(null);

const lottieStyle = computed(() => ({
  width: props.width ? `${props.width}px` : "100%",
  height: props.height ? `${props.height}px` : "100%",
  overflow: "hidden",
  margin: "0 auto",
}));

onMounted(() => {
  if (!lottieRef.value) return;
  let anim = lottie.loadAnimation({
    container: lottieRef.value,
    renderer: "svg",
    loop: props.options.loop !== false,
    autoplay: props.options.autoplay !== false,
    animationData: props.options.animationData,
    rendererSettings: props.options.rendererSettings,
  });
  emits("animCreated", anim);
});
</script>