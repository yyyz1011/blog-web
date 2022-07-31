<template>
  <a-card v-show="!isLoading" :bordered="false" class="picture-card" hoverable @click="handleClickCard">
    <template #actions>
      <span class="icon-hover" @click.stop="handleCopyUrl">
        <IconShareInternal />
      </span>
    </template>
    <template #cover>
      <div class="picture-card-cover">
        <img :src="info.picture_url" alt="leaf_blog" class="picture-card-cover--img" @load="handleImgLoaded" />
        <a-tag class="picture-card-cover--tag" size="large">
          {{ dayjs(Number(info.create_time)).format("YYYY-MM-DD") }}
          {{ info.region }}
        </a-tag>
      </div>
    </template>
    <a-card-meta :title="info.title">
      <template #description>
        {{ info.desc }}
      </template>
    </a-card-meta>
  </a-card>
  <a-skeleton v-if="isLoading" animation class="skeleton-card">
    <a-skeleton-shape class="skeleton-cover" />
    <div class="skeleton-content">
      <a-skeleton-shape class="skeleton-content--title" />
      <a-skeleton-shape class="skeleton-content--desc" />
      <a-skeleton-shape class="skeleton-content--action" />
    </div>
  </a-skeleton>
</template>

<script lang="ts" setup>
import { IconShareInternal } from "@arco-design/web-vue/es/icon";
import dayjs from "dayjs";
import { computed, getCurrentInstance, Ref, ref } from "vue";

const { proxy } = getCurrentInstance();
const props = defineProps({
  pictureInfo: {
    type: Object,
    default: () => ({})
  }
});
const emits = defineEmits(["click"]);
const isLoading: Ref<boolean> = ref(true);

const info = computed(() => props.pictureInfo);

function handleClickCard() {
  emits("click", info.value);
}

function handleImgLoaded() {
  isLoading.value = false;
}

async function handleCopyUrl() {
  try {
    await navigator.clipboard.writeText(info.value.picture_url);
    proxy.$success("复制图片URL成功");
  } catch {
    proxy.$catch("复制图片URL失败");
  }
}
</script>

<style lang="scss" scoped>
.picture-card {
  width: 400px;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  user-select: none;

  .picture-card-cover {
    position: relative;

    &--img {
      width: 400px;
      height: 250px;
      object-fit: cover;
    }

    &--tag {
      position: absolute;
      top: 8px;
      right: 8px;
      cursor: default;
      user-select: none;
      background: rgb(35, 35, 36) !important;
      border-radius: 8px;
    }

    &--time {
      position: absolute;
      top: 8px;
      left: 8px;
      cursor: default;
      user-select: none;
      background: none;
      color: currentColor;
    }
  }
}

.skeleton-card {
  width: 400px;
  border-radius: 12px;
  overflow: hidden;

  .skeleton-cover {
    width: 400px;
    height: 250px;
  }

  .skeleton-content {
    width: 400px;
    height: 107.5px;
    background: rgb(35, 35, 36);
    padding: 16px;

    &--title {
      height: 18px;
      width: 100%;
    }

    &--desc {
      height: 18px;
      width: 100%;
      margin-top: 4px;
    }

    &--action {
      height: 16px;
      width: 100%;
      margin-top: 20px;
    }
  }
}

::v-deep .arco-card-body{
  height: 106px;
}
</style>
