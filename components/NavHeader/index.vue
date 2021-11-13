<template>
  <div class="nav-header">
    <div class="content">
      <img class="logo" src="~/static/img/logo.png" @click="handleClickLogo" />
    </div>
  </div>
</template>

<script>
export default {
  name: "NavHeader",
  methods: {
    handleClickLogo() {
      console.log("TODO logo click");
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-header {
  position: sticky;
  top: 0;
  z-index: 10;
  height: $nav-header;
  background: $background-black-color;
  border-bottom: 5px solid #36b1c7;
  border-image: -webkit-linear-gradient(to right, #d17d95, #75d0e0) 30 30;
  border-image: linear-gradient(to right, #d17d95, #75d0e0) 30 30;
}
.content {
  display: flex;
  margin: 0 auto;
  align-items: center;
  height: 100%;
  width: 80%;
  min-width: 1200px;
}
.logo {
  height: 50%;
  cursor: pointer;
  user-select: none;
}
</style>
