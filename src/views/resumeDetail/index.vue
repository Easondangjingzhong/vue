<template>
  <a-layout>
    <a-layout-content class="resume_container resume_container_index">
      <div v-if="expendShow">
    <ResumeDetailHeader :resumeData="resumeDetailTemp.resume"/>
    <div class="resume_container_detail">
    <ResumeDetailPersonInfo :resumeData="resumeDetailTemp.resume"/>
    <ResumeDetailWorkInfo v-for="(item,index) in resumeDetailTemp.resume.workExpeList" :indexNum="index" :resumeData="item"/>
    <ResumeDetailWorkInfo class="resume_work_show" v-if="workFlag" :indexNum="resumeDetailTemp.resume.workExpeList.length + 1" :resumeData="{resumeId: resumeDetailTemp.resume.id}"/>
    <!-- <a-row :gutter="24" v-if="!workFlag" style="margin-top: 10px;">
      <a-col :span="24" style="display: flex;justify-content: center;">
        <a-button type="primary" @click="handleAddWorkInfo">添加工作经历</a-button>
      </a-col>
    </a-row> -->
    <ResumeDetailEducationInfo v-for="(item,index) in resumeDetailTemp.resume.eduExpeList" :indexNum="index" :resumeData="item"/>
    <ResumeDetailEducationInfo v-if="eduFlag" :indexNum="resumeDetailTemp.resume.eduExpeList.length + 1" :resumeData="{resumeId: resumeDetailTemp.resume.id}"/>
    <!-- <a-row :gutter="24" v-if="!eduFlag" style="margin-top: 10px;">
      <a-col :span="24" style="display: flex;justify-content: center;">
        <a-button type="primary" @click="handleAddEducationInfo">添加教育经历</a-button>
      </a-col>
    </a-row> -->
    <ResumeDetailLanguagesInfo :Languages="resumeDetailTemp.resume.resumeLanguageList" :resumeId="resumeDetailTemp.resume.id"/>
    <ResumeDetaiSelfInfo :resumeData="resumeDetailTemp.resume"/>
    </div>
  </div>
    </a-layout-content>
    <a-layout-sider class="resume_sider">
      <div v-if="expendShow">
        <ResumeLeftHeader/>
        <ResumeLeftCheckDuplicate/>
        <ResumeLeftPositions/>
        <ResumeLeftContactContent/>
        <ResumeLeftRecommendRecord/>
      </div>
    </a-layout-sider>
  </a-layout>
</template>
<script setup lang="ts">
import ResumeDetailHeader from './components/ResumeDetailHeader.vue';
import ResumeDetailPersonInfo from './components/ResumeDetailPersonInfo.vue';
import ResumeDetailWorkInfo from './components/ResumeDetailWorkInfo.vue';
import ResumeDetailEducationInfo from './components/ResumeDetailEducationInfo.vue';
import ResumeDetailLanguagesInfo from './components/ResumeDetailLanguagesInfo.vue';
import ResumeDetaiSelfInfo from './components/ResumeDetaiSelfInfo.vue';
import ResumeLeftHeader from './components/ResumeLeftHeader.vue';
import ResumeLeftCheckDuplicate from './components/ResumeLeftCheckDuplicate.vue';
import ResumeLeftRecommendRecord from './components/ResumeLeftRecommendRecord.vue';
import ResumeLeftPositions from './components/ResumeLeftPositions.vue';
import ResumeLeftContactContent from './components/ResumeLeftContactContent.vue'
import { storeToRefs } from 'pinia';
import { ResumeDetail } from '/@/api/resumeDetail/modal'
import { useCityStoreWithOut } from '/@/store/modules/city';
import { useResumeListStoreWithOut } from '/@/store/modules/resumeList';
import { useResumeDetailStore } from '/@/store/modules/resumeDetail';
  const resumeListStore = useResumeListStoreWithOut();
  const cityStore = useCityStoreWithOut();
  const resumeDetailStore = useResumeDetailStore();
  const { resumeDetail,eduFlag,workFlag } =storeToRefs(resumeDetailStore);
  const resumeDetailTemp = ref({} as ResumeDetail);
  const expendShow = ref(false);
  watch(resumeDetail,() => {
    //@ts-ignore
    resumeDetailTemp.value = {...resumeDetail.value}
  })
  cityStore.fetchCountryInfo();
  cityStore.fetchInfo();
  resumeListStore.queryPositionsList();
  resumeListStore.queryBranList();
  resumeListStore.queryMarkList();
  resumeListStore.queryCompanyList();
  resumeDetailStore.queryWeekNumByWorkDate();
  resumeDetailStore.queryWeekByYearAndMonth();
  resumeDetailStore.queryEnterpriseConsultant();
  resumeDetailStore.queryResumeDetail().then(() => {
    expendShow.value = true;
  });
</script>
<style lang="less" scoped>
  .resume_container {
    max-width: 1050px;
    height: 97vh;
    background-color: #fff;
    overflow-x: hidden;
    //padding: 10px;
    box-shadow: 0 0 2px #ccc;
    border-radius: 7px;
  }
  .resume_container_detail {
    margin-top: 10px;
    padding: 0 0 20px;
    border-radius: 5px;
    border: 1px solid #ccc;
    box-shadow: 0 0 2px #cccc;
  }
  .resume_sider {
    height: 97vh;
    background-color: #fff;
    overflow-x: hidden;
    box-shadow: 0 0 2px #ccc;
    border-radius: 7px;
    flex: 0 0 560px !important;
    max-width: 560px !important;
    min-width: 560px !important;
    width: 560px !important;
    margin-left: 10px;
  }
</style>
