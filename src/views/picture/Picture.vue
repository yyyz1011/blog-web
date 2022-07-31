<template>
  <div class="picture-wrapper">
    <PictureCard v-for="item in pictureList" :key="item.pid" :picture-info="item" @click="handleClickCard" />
    <a-modal v-model:visible="modalVisible" class="picture-modal" hide-cancel ok-text="关闭" width="80%" @ok="handleOk">
      <template #title>
        {{ currentModalInfo.title }}
      </template>
      <img :src="currentModalInfo.picture_url" alt="leaf_blog" class="picture-modal--cover" />
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, Ref, ref } from "vue";
import { ApiPicture } from "@/network/api";
import { GetPictureListItem } from "@/network/api/picture";
import PictureCard from "@/components/picture/PictureCard.vue";

const { proxy } = getCurrentInstance();
const pictureList: Ref<Array<GetPictureListItem>> = ref([]);
const currentModalInfo = ref({});
const modalVisible: Ref<boolean> = ref(false);

getPictureList();

async function getPictureList() {
  try {
    pictureList.value = await ApiPicture.Picture.getPictureList();
    proxy.$success("获取图库成功");
  } catch (err) {
    proxy.$catch(err);
  }
}

function handleClickCard(info: GetPictureListItem) {
  currentModalInfo.value = info;
  modalVisible.value = true;
}

function handleOk() {
  currentModalInfo.value = {};
  modalVisible.value = false;
}
</script>

<style lang="scss" scoped>
.picture-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

::v-deep .picture-card {
  margin: 8px;
}

::v-deep .skeleton-card {
  margin: 8px;
}
</style>
