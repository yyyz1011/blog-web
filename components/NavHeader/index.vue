<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
    <el-menu-item index="1">处理中心</el-menu-item>
    <el-menu-item index="2">处理中心</el-menu-item>
    <el-menu-item index="3">处理中心</el-menu-item>
    <el-menu-item index="4">处理中心</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "NavHeader",
  data() {
    return {
      activeIndex: 1,
    };
  },
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
