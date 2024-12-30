<template>
  <div class="resume_container">
    <a-layout>
      <a-layout-content>
          <ResumeContent />
      </a-layout-content>
    </a-layout>
  </div>
</template>
<script setup lang="ts">
</script>
<style lang="less" scoped>
  .resume_container {
    max-width: 1920px;
    height: 100vh;
    background-color: #f5f5f5;
    overflow-x: hidden;
    padding: 10px;
    box-shadow: 0 0 2px #ccc;
    border-radius: 7px;
  }
</style>
