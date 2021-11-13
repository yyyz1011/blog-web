<template>
  <div>
    <HomeIndex></HomeIndex>
    <div class="test"></div>
  </div>
</template>

<script>
import HomeIndex from "~/components/Home/HomeIndex";

export default {
  name: "index",
  layout: "BaseLayout",
  components: {
    HomeIndex,
  },
};
</script>

<style lang="scss" scoped>
.home {
  position: relative;
  overflow-x: hidden;
  min-width: 1200px;
}
.test {
  height: 2000px;
}
</style>