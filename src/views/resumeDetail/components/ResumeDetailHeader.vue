<template>
  <div class="resume_header">
    <a-row :gutter="24">
      <a-col :span="24" class="resume_info">
        <h2 class="resume_h3">{{ resumeData.userName }}</h2>
        <a-tag color="#ffd522" class="resume_tag_checked">未核</a-tag>
      </a-col>
    </a-row>
    <a-row :gutter="24" class="resume_row_center">
      <a-tag color="#4bb632" title="完整度" class="resume_tag">{{ resumeData.resumeProgress }}%</a-tag>
      <a-tag color="#00bcd4" title="来源">{{ resumeData.talentSource }}</a-tag>
      <a-tag color="#ccc" class="resume_tag_phone"
        ><PhoneFilled :style="{ fontSize: '8px' }" :rotate="90" />
        <a-popover placement="topLeft">
          <template #content>
            <span>{{ resumeData.phoneNum }}</span>
          </template>
          查看
        </a-popover>
      </a-tag>
    </a-row>
    <a-row :gutter="24" class="resume_row">
      <a-col :span="22">
        标签:
        <a-tag color="pink">行业</a-tag>
        <a-tag color="red">职类</a-tag>
        <a-tag color="green">职级</a-tag>
        <a-tag color="yellow">品类-类别</a-tag>
        <a-tag color="orange">品级</a-tag>
        <a-tag color="purple">语言</a-tag>
        <PlusSquareFilled />
      </a-col>
      <a-col :span="2" style="text-align: right;">
        <a-button type="primary" danger size="small" @click="handleRecommendCandidatePosition">
          推荐
        </a-button>
      </a-col>
    </a-row>
    <RecommendCandidatePosition/>
    <!-- <a-row :gutter="24" class="resume_row">
      <a-col :span="24">
        当前:
        <a-tag color="pink">行业</a-tag>
        <a-tag color="red">职类</a-tag>
        <a-tag color="green">职级</a-tag>
        <a-tag color="yellow">品类-类别</a-tag>
        <a-tag color="orange">品级</a-tag>
      </a-col>
    </a-row>
    <a-row :gutter="24" class="resume_row">
      <a-col :span="24">
        过往:
        <a-tag color="pink">行业</a-tag>
        <a-tag color="red">职类</a-tag>
        <a-tag color="green">职级</a-tag>
        <a-tag color="yellow">品类-类别</a-tag>
        <a-tag color="orange">品级</a-tag>
      </a-col>
    </a-row> -->
  </div>
</template>
<script setup lang="ts">
  import { PlusSquareFilled, PhoneFilled } from '@ant-design/icons-vue';
  import RecommendCandidatePosition from './RecommendCandidatePosition.vue';
  import { useResumeDetailStore } from '/@/store/modules/resumeDetail';
  const resumeDetailStore = useResumeDetailStore();
  defineProps({
    resumeData: {
      type: Object,
      required: true,
    },
  });
  const handleRecommendCandidatePosition = () => {
    resumeDetailStore.$patch({
      candidatePositionFlag: true,
    })
  };
</script>
<style lang="less" scoped>
  .resume_header {
    margin: 0 0px;
    padding: 5px 20px 15px;
    border-radius: 5px;
    border: 1px solid #ccc;
    box-shadow: 0 0 2px #cccc;
    position: sticky;
    background-color: #fff;
    z-index: 1;
    top: -10px;
  }
  .resume_h3 {
    margin: 10px 0 5px;
    font-size: 24px;
  }
  .resume_row {
    margin: 5px 0;
  }
  .resume_row_center {
    margin: 5px 0 10px;
  }
  .resume_info {
    display: flex;
    align-items: center;
  }
  .resume_tag_checked {
    margin-left: 5px;
    margin-top: 3px;
  }
  .resume_tag {
    margin-left: 15px;
  }
  .resume_tag_phone {
    color: #000;
  }
  :deep(.resume_tag_phone >.anticon+span, .resume_tag_phone >span+.anticon) {
    margin-inline-start: 0px !important;
  }
</style>
