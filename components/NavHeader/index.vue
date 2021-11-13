<template>
  <div class="nav-header">TODO 首屏优化 动效</div>
</template>

<script>
export default {
  name: "NavHeader",
};
</script>

<style lang="scss" scoped>
.nav-header {
  position: sticky;
  top: 0;
  z-index: 10;
  height: $nav-header;
  background: $background-white-color;
}
</style>
