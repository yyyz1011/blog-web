<template>
  <div class="content">
    <div class="message">{{ error.message }}</div>
    <el-button class="back" @click="handleToHome">
      Back to the home page
    </el-button>
  </div>
</template>

<script>
export default {
  name: "error",
  props: ["error"],
  methods: {
    handleToHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url("~/static/img/404/404.jpg");
  width: 100vw;
  height: 100vh;
  background-size: 100% auto;
  color: $text-white;
  .message {
    @include text-title();
    animation: tiktokTitle 5s linear infinite;
    cursor: default;
    user-select: none;
  }
  .back {
    font-size: 20px;
    font-weight: lighter;
    margin-top: 30px;
  }
}
</style>
