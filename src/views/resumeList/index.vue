<template>
  <MenuTop/>
  <div class="resume_container">
    <a-layout>
      <!-- <a-layout-header class="resume-header">Header</a-layout-header> -->
      <a-layout>
        <a-layout-sider class="resume_sider">
          <ResumeSider />
        </a-layout-sider>
        <a-layout-content class="resume_content">
          <ResumeRecommend v-if="searchResumeType == '1'" />
          <ResumeInterview v-else-if="searchResumeType == '2'" />
          <ResumeRecommendOffer v-else-if="searchResumeType == '3'" />
          <ResumeContent v-else="!searchResumeType" />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>
<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import ResumeSider from './components/ResumeSider.vue';
  import ResumeContent from './components/ResumeContent.vue';
  import ResumeRecommend from './components/ResumeRecommend.vue';
  import ResumeInterview from './components/ResumeInterview.vue';
  import MenuTop from '/@/views/MenuTop/index.vue';
  //import ResumeOffer from './components/ResumeOffer.vue';
  import ResumeRecommendOffer from './components/ResumeRecommendOffer.vue';
  import { useResumeListStoreWithOut } from '/@/store/modules/resumeList';
  const resumeList = useResumeListStoreWithOut();
  const { searchResumeType } = storeToRefs(resumeList);
  // const loginVueUser: { loginName: ''; loginId: ''; loginTocken: ''; loginOutFlag: '' } = JSON.parse(
  // localStorage.getItem('loginVueUser'),
  // );
  // if (loginVueUser && loginVueUser.loginOutFlag == '1') {
  //   resumeList.handleSearchResumeType('1');
  // }
</script>
<style lang="less" scoped>
  .resume_container {
    max-width: 1920px;
    height: 95vh;
    background-color: #f5f5f5;
    overflow: hidden;
    padding: 10px;
    margin-top: 35px;
    .resume_sider {
      flex: 0 0 300px !important;
      max-width: 300px !important;
      min-width: 300px !important;
      width: 300px !important;
      background-color: #fff;
      border-right: 1px solid #eee;
      margin-right: 10px;
      box-shadow: 0 0 2px #ccc;
      border-radius: 7px;
      overflow-x: hidden;
      overflow-y: auto;
    }
    .resume_sider::-webkit-scrollbar {
      display: none;
    }
    :deep(.ant-layout .ant-layout-sider-children) {
      height: 95vh !important;
    }
    .resume_content {
      overflow-x: hidden;
      overflow-y: auto;
      height: 95vh !important;
    }
    .resume_content::-webkit-scrollbar {
      display: none;
    }
  }
</style>
