<template>
  <div class="home">
    <div class="content">
      <div class="text">你得熬过万丈孤独</div>
      <div class="text">藏下星辰大海</div>
      <div class="text">才会有诗和远方</div>
    </div>
    <video
      class="video"
      ref="video"
      :controls="false"
      autoplay
      muted
      loop
      :src="backgroundUrl"
      @canplaythrough="$refs.video.play()"
    ></video>
  </div>
</template>

<script>
import backgroundUrl from "~/static/video/Home/home.mp4";

export default {
  name: "HomeIndex",
  data() {
    return {
      backgroundUrl,
    };
  },
};
</script>

<style lang="scss" scoped>
.home {
  width: 80vw;
  height: 600px;
  overflow: hidden;
  margin: 0 auto;
  border-radius: 16px;
  box-shadow: 0 4px 8px $background-black-color;
}
.content {
  position: absolute;
  z-index: 1;
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
  &:nth-child(2) {
    text-indent: 60px;
  }
  &:nth-child(3) {
    text-indent: 120px;
  }
}
.video {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  object-fit: fill; /*这里是关键*/
  width: auto;
  height: auto;
  -ms-transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
  background-size: cover;
}
</style>