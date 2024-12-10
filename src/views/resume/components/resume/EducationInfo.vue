<template>
  <div class="education_container">
    <a-card class="resume_card">
      <h3>教育经历</h3>
      <a-divider style="height: 1px; background-color: #ccc" dashed />
      <EducationDetails
        v-for="(item, index) in educationInfoData"
        :educationInfoData="item"
        :indexNum="+index"
        :key="index"
      />
      <a-button style="margin-bottom: 15px;background-color: #f0ad4e;border-color: #eea236;" type="primary" @click="addNewEducationInfoData">添加教育经历</a-button>
    </a-card>
  </div>
</template>
<script lang="ts" setup>
  import { defineProps } from 'vue';
  import EducationDetails from './educationInfo/EducationDetails.vue';
  import { useResumeStoreWithOut } from '/@/store/modules/resume';
  const resumeStore = useResumeStoreWithOut();
  const addNewEducationInfoData = () => {
    resumeStore.addNewEducationInfoData();
  };
  defineProps({
    educationInfoData: {
      type: Object,
      required: true,
    },
  });
</script>
<style scoped>
  .ant-card-body {
      padding: 24px 55px !important;
  }
</style>
