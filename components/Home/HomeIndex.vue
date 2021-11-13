<template>
  <IndexPanel :background-url="backgroundUrl">
    <div class="content">
      <div class="text">你得熬过万丈孤独</div>
      <div class="text">藏下星辰大海</div>
      <div class="text">才会有诗和远方</div>
    </div>
    <div class="update-time">更新时间：{{ updateTime }}</div>
  </IndexPanel>
</template>

<script>
import IndexPanel from "~/components/Home/IndexPanel";
import backgroundUrl from "~/static/img/Home/home.jpg";
import * as dayjs from "dayjs";

export default {
  name: "HomeIndex",
  components: {
    IndexPanel,
  },
  data() {
    return {
      backgroundUrl,
    };
  },
  computed: {
    updateTime() {
      return dayjs().format("YYYY-MM-DD");
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 10%;
  padding: 4px 8px;
  &::before {
    position: absolute;
    left: -20px;
    top: -20px;
    height: 40px;
    width: 120px;
    content: "";
    border-left: 4px solid $text-white;
    border-top: 4px solid $text-white;
  }
  &::after {
    position: absolute;
    right: -20px;
    bottom: -20px;
    height: 40px;
    width: 120px;
    content: "";
    border-right: 4px solid $text-white;
    border-bottom: 4px solid $text-white;
  }
}
.text {
  @include text-title();
  color: $text-white;
  cursor: default;
  user-select: none;
}
.text:nth-child(2) {
  text-indent: 60px;
}
.text:nth-child(3) {
  text-indent: 120px;
}
.update-time {
  position: absolute;
  bottom: $common-spacing;
  left: 0;
  right: 0;
  text-align: center;
  color: $text-white;
  font-size: 14px;
  letter-spacing: 5px;
  font-weight: lighter;
  user-select: none;
  cursor: default;
}
</style>