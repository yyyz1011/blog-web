<template>
  <div class="content-wrapper" :style="panelStyle">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "IndexPanel",
  props: {
    backgroundUrl: {
      required: true,
      type: String,
    },
  },
  computed: {
    panelStyle() {
      return {
        backgroundImage: `url(${this.backgroundUrl})`,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.content-wrapper {
  position: relative;
  min-width: 1200px;
  width: 100vw;
  height: 700px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
</style>