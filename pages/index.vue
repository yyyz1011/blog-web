<template>
  <div>
    <!-- <NavHeader></NavHeader> -->
    <HomeIndex></HomeIndex>
  </div>
</template>

<script>
import NavHeader from "~/components/NavHeader";
import HomeIndex from "~/components/Home/HomeIndex";

export default {
  name: "index",
  components: {
    NavHeader,
    HomeIndex,
  },
  data() {
    return {
      options: {
        afterLoad: this.afterLoad,
        scrollOverflow: true,
        scrollBar: false,
        menu: "#menu",
        navigation: true,
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.home {
  position: relative;
  overflow-x: hidden;
  min-width: 1200px;
}
</style>