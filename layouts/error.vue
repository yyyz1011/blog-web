<template>
  <h1>{{ error.message }}</h1>
</template>

<script>
export default {
  name: "error",
  props: ["error"],
};
</script>
