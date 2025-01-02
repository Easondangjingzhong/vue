<template>
  <div class="resume_container">
    <ResumeDetailHeader/>
    <ResumeDetailPersonInfo/>
    <ResumeDetailWorkInfo/>
    <ResumeDetailEducationInfo/>
    <ResumeDetailLanguagesInfo/>
    <ResumeDetaiSelfInfo/>
  </div>
</template>
<script setup lang="ts">
import ResumeDetailHeader from './components/ResumeDetailHeader.vue';
import ResumeDetailPersonInfo from './components/ResumeDetailPersonInfo.vue';
import ResumeDetailWorkInfo from './components/ResumeDetailWorkInfo.vue';
import ResumeDetailEducationInfo from './components/ResumeDetailEducationInfo.vue';
import ResumeDetailLanguagesInfo from './components/ResumeDetailLanguagesInfo.vue';
import ResumeDetaiSelfInfo from './components/ResumeDetaiSelfInfo.vue';
import { useCityStoreWithOut } from '/@/store/modules/city';
import { useResumeListStoreWithOut } from '/@/store/modules/resumeList';
  const resumeListStore = useResumeListStoreWithOut();
  const cityStore = useCityStoreWithOut();
  cityStore.fetchCountryInfo();
  cityStore.fetchInfo();
  resumeListStore.queryPositionsList();
  resumeListStore.queryBranList();
  resumeListStore.queryMarkList();
  resumeListStore.queryCompanyList();
</script>
<style lang="less" scoped>
  .resume_container {
    max-width: 920px;
    height: 95vh;
    background-color: #fff;
    overflow-x: hidden;
    padding: 10px;
    box-shadow: 0 0 2px #ccc;
    border-radius: 7px;
  }
</style>
