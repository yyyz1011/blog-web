<template>
  <div class="base-layout">
    <NavHeader></NavHeader>
    <Nuxt></Nuxt>
  </div>
</template>

<script>
import NavHeader from "~/components/NavHeader";

export default {
  components: {
    NavHeader,
  },
};
</script>