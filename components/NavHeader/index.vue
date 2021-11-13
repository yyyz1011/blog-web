<template>
  <div class="nav-header">
    <div class="content">
      <img class="logo" src="~/static/img/logo.png" @click="handleClickLogo" />
      <div class="nav">
        <div
          class="nav-item"
          :class="{ 'is-nav-active': currentName === item.name }"
          v-for="(item, index) in NavHeader"
          :key="item.key"
          @click="handleNavChange(item.name)"
        >
          <div class="index">{{ index + 1 }}</div>
          <div class="label">{{ item.label }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { NavHeader } from "@/constants/navHeader";

export default {
  name: "NavHeader",
  data() {
    return {
      NavHeader,
      currentName: NavHeader[0].name,
    };
  },
  methods: {
    handleClickLogo() {
      console.log("TODO logo click");
    },
    handleNavChange(name) {
      this.currentName = name;
      console.log("TODO path change", name);
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
  justify-content: space-between;
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
.nav {
  display: flex;
  align-items: center;
  color: $text-white;
  font-size: 20px;
  font-weight: lighter;
  margin-left: 20px;
  height: 100%;
  .nav-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px 16px 0;
    margin: 0 16px;
    cursor: pointer;
    user-select: none;
    .index {
      position: relative;
      font-size: 40px;
      &::after {
        content: "";
        bottom: -25px;
        left: 13px;
        position: absolute;
        width: 30px;
        height: 60px;
        border-left: 1px solid $background-white-color;
        transform: rotate(55deg);
        background: $background-black-color;
      }
    }
    .label {
      position: relative;
      z-index: 1;
      left: 25px;
      bottom: 13px;
    }
  }
  .is-nav-active {
    .index,
    .label {
      animation: tiktokTitle 5s linear infinite;
    }
    .label {
      font-weight: bold;
    }
  }
}
</style>
