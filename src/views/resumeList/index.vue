<template>
  <div class="resume_container">
    <a-layout>
      <!-- <a-layout-header class="resume-header">Header</a-layout-header> -->
      <a-layout>
        <a-layout-sider class="resume_sider">
          <ResumeSider />
        </a-layout-sider>
        <a-layout-content class="resume_content">
          <ResumeContent />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>
<script setup lang="ts">
    import ResumeSider from './components/ResumeSider.vue';
    import ResumeContent from './components/ResumeContent.vue';
</script>
<style lang="less" scoped>
  .resume_container {
    max-width: 1920px;
    height: 95vh;
    background-color: #f5f5f5;
    overflow: hidden;
    padding: 10px;
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
      display:none
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
      display:none
    } 
  }
</style>
