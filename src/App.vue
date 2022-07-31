<template>
  <Header/>
  <router-view v-if="!isLoading"/>
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