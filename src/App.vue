<template>
  <Header/>
  <router-view v-if="!isLoading" v-slot="{ Component }">
    <transition mode="out-in" name="fade">
      <component :is="Component"/>
    </transition>
  </router-view>
</template>

<script lang="ts" setup>
import {getCurrentInstance, ref, Ref} from "vue";
import Header from "@/components/header/Header.vue";
import {ApiUser} from "@/network/api";
import {Token} from "@/constants/common";

const {proxy} = getCurrentInstance();
const isLoading: Ref<boolean> = ref(true);

getUserToken();

async function getUserToken() {
  try {
    const {token = ""} = await ApiUser.User.getToken();
    sessionStorage.setItem(Token, token);
    isLoading.value = false;
  } catch (err) {
    proxy.$catch(err);
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>