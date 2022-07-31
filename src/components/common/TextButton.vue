<template>
  <div class="text-button-wrapper" @click="emits('click')">
    <span class="button">{{ content }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps } from "vue";

const props = defineProps({
  text: {
    type: String,
    required: true
  }
});
const emits = defineEmits(["click"]);

const content = computed(() => props.text);
</script>

<style lang="scss" scoped>
.text-button-wrapper {
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.button {
  cursor: pointer;
  position: relative;
  padding: 10px 20px;
  background: white;
  font-size: $text-primary;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  transition: all 1s;
  width: 100%;
  text-align: center;
  color: rgb(140, 140, 140);
}
.button:after,
.button:before {
  content: " ";
  width: 20px;
  height: 10px;
  position: absolute;
  border: 0px solid #fff;
  transition: all 1s;
}
.button:after {
  top: -2px;
  left: -2px;
  border-top: 5px solid rgb(140, 140, 140);
  border-left: 5px solid rgb(140, 140, 140);
}
.button:before {
  bottom: -2px;
  right: -2px;
  border-bottom: 5px solid rgb(140, 140, 140);
  border-right: 5px solid rgb(140, 140, 140);
}
.button:hover {
  border-top-right-radius: 0px;
  border-bottom-left-radius: 0px;
}
.button:hover:before,
.button:hover:after {
  width: 100%;
  height: 100%;
}
</style>
