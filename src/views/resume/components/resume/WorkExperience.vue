<template>
  <div class="work_container">
    <a-card class="resume_card">
      <h3>工作经历</h3>
      <a-divider style="height: 1px; background-color: #ccc" dashed/>
      <WorkExperienceDetails v-for="(item,index) in workExperienceList" :workExperienceList="workExperienceList" :workExperienceData="item" :indexNum="+index" :key="index"/>
      <a-button type="primary" style="margin-bottom: 15px;background-color: #f0ad4e;border-color: #eea236;" @click="addNewWorkExperienceDetails">添加工作经历</a-button>  
    </a-card>
  </div>
</template>
<script lang="ts" setup>
  import { defineProps } from 'vue';
  import WorkExperienceDetails  from "./workExperience/WorkExperienceDetails.vue" ;
  import { useResumeStoreWithOut } from '/@/store/modules/resume';
  const resumeStore = useResumeStoreWithOut();
  const addNewWorkExperienceDetails = () => {
    resumeStore.addNewWorkExperienceDetails();
  };
  defineProps({
    workExperienceList: {
      type: Array,
      required: true,
    }
  })
</script>
<style scoped>
  
</style>