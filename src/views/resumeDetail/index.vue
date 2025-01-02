<template>
  <div class="resume_container" v-if="expendShow">
    <ResumeDetailHeader :resumeData="resumeDetailTemp.resume"/>
    <div class="resume_container_detail">
    <ResumeDetailPersonInfo :resumeData="resumeDetailTemp.resume"/>
    <ResumeDetailWorkInfo v-for="(item,index) in resumeDetailTemp.resume.workExpeList" :indexNum="index" :resumeData="item"/>
    <ResumeDetailEducationInfo v-for="(item,index) in resumeDetailTemp.resume.eduExpeList" :indexNum="index" :resumeData="item"/>
    <ResumeDetailLanguagesInfo/>
    <ResumeDetaiSelfInfo :resumeData="resumeDetailTemp.resume"/>
    </div>
  </div>
</template>
<script setup lang="ts">
import ResumeDetailHeader from './components/ResumeDetailHeader.vue';
import ResumeDetailPersonInfo from './components/ResumeDetailPersonInfo.vue';
import ResumeDetailWorkInfo from './components/ResumeDetailWorkInfo.vue';
import ResumeDetailEducationInfo from './components/ResumeDetailEducationInfo.vue';
import ResumeDetailLanguagesInfo from './components/ResumeDetailLanguagesInfo.vue';
import ResumeDetaiSelfInfo from './components/ResumeDetaiSelfInfo.vue';
import { storeToRefs } from 'pinia';
import { ResumeDetail } from '/@/api/resumeDetail/modal'
import { useCityStoreWithOut } from '/@/store/modules/city';
import { useResumeListStoreWithOut } from '/@/store/modules/resumeList';
import { useResumeDetailStore } from '/@/store/modules/resumeDetail';
  const resumeListStore = useResumeListStoreWithOut();
  const cityStore = useCityStoreWithOut();
  const resumeDetailStore = useResumeDetailStore();
  const { resumeDetail } =storeToRefs(resumeDetailStore);
  const resumeDetailTemp = ref({} as ResumeDetail)
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
  resumeDetailStore.queryResumeDetail().then(() => {
    expendShow.value = true;
  });
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
  .resume_container_detail {
    margin-top: 10px;
    padding: 0 20px 20px;
    border-radius: 5px;
    border: 1px solid #ccc;
    box-shadow: 0 0 2px #cccc;
  }
</style>
