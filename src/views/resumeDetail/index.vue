<template>
  <a-spin :spinning="resumeShowFlag" size="large">
  <a-layout>
    <a-layout-content class="resume_container resume_container_index">
      <div v-if="expendShow">
    <ResumeDetailHeader :resumeData="resumeDetailTemp.resume" :showResumeAdd="showResumeAdd" :showResumeAddReport="showResumeAddReport"/>
    <div class="resume_container_detail">
    <ResumeDetailPersonInfo :resumeData="resumeDetailTemp.resume" :showResumeAdd="showResumeAdd"/>
    <ResumeDetailWorkInfo :showResumeAdd="showResumeAdd" class="resume_work_show" v-if="workFlag && showResumeAdd" :indexNum="(resumeDetailTemp.resume.workExpeList ? resumeDetailTemp.resume.workExpeList.length + 1 : 0)" :resumeData="{resumeId: resumeDetailTemp.resume.id}"/>
    <ResumeDetailWorkInfo v-for="(item,index) in resumeDetailTemp.resume.workExpeList" :indexNum="index" :resumeData="item" :showResumeAdd="showResumeAdd"/>
    <ResumeDetailEducationInfo v-for="(item,index) in resumeDetailTemp.resume.eduExpeList"  :showResumeAdd="showResumeAdd" :indexNum="index" :resumeData="item"/>
    <ResumeDetailEducationInfo :showResumeAdd="showResumeAdd" v-if="eduFlag && showResumeAdd" :indexNum="resumeDetailTemp.resume.eduExpeList.length + 1" :resumeData="{resumeId: resumeDetailTemp.resume.id}"/>
    <ResumeDetailLanguagesInfo :Languages="resumeDetailTemp.resume.resumeLanguageList" :showResumeAdd="showResumeAdd" :resumeId="resumeDetailTemp.resume.id"/>
    <ResumeDetaiSelfInfo :resumeData="resumeDetailTemp.resume" :showResumeAdd="showResumeAdd"/>
    </div>
  </div>
    </a-layout-content>
    <a-layout-sider v-if="showResumeAdd" class="resume_sider">
      <div v-if="expendShow">
        <ResumeLeftHeader/>
        <ResumeLeftCheckDuplicate/>
        <ResumeLeftPositions/>
        <ResumeLeftContactContent/>
        <ResumeLeftRecommendRecord/>
      </div>
    </a-layout-sider>
  </a-layout>
</a-spin>
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
  const { resumeDetail,eduFlag,workFlag,resumeShowFlag } =storeToRefs(resumeDetailStore);
  const resumeDetailTemp = ref({} as ResumeDetail);
  const expendShow = ref(false);
  const route = useRoute();
  const showResumeAdd = ref(true);
  const showResumeAddReport = ref(true);
  //const loginVueUser: {loginName: "", loginId: "", loginTocken: ""} = JSON.parse(localStorage.getItem("loginVueUser"));
  // 如果简历的创建人不是当前登录人，则显示复制简历按钮
    // 注意：此处需要和后端协商好，获取简历创建人id的api
    // 假设resumeDetail.recruitId 就是简历创建人id
    // 假设 resumeDetail.recruitId 和 loginVueUser.loginId 相等时，表示是创建人，可以显示复制简历按钮
    // 假设 resumeDetail.recruitId 和 loginVueUser.loginId 不等时，表示不是创建人，不可以显示复制简历按钮
    // 以下代码是假设简历创建人id是 resumeDetail.recruitId，loginVueUser.loginId是假设的登录人id
    
  watch(resumeDetail,() => {
    //@ts-ignore
    resumeDetailTemp.value = {...resumeDetail.value}
    if (route.query?.searchRecommend == "Q") {
      showResumeAdd.value = false;
    }
    if (route.query?.searchRecommend == "T") {
      showResumeAdd.value = false;
      showResumeAddReport.value = false;
    }
    if (!resumeDetailTemp.value.resume.workExpeList) {
      resumeDetailStore.$patch({
        workFlag: true
      })
      workFlag.value = true;
    }
    if (!resumeDetailTemp.value.resume.eduExpeList || resumeDetailTemp.value.resume.eduExpeList.length == 0) {
      resumeDetailStore.$patch({
        eduFlag: true
      })
      eduFlag.value = true;
    }
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
  if (route.query?.searchRecommend == "Q") {
    resumeDetailStore.$patch({
      searchRecommend: "Q",
      addRecruitId: route.query?.addRecruitId
    })
  }
  resumeDetailStore.queryResumeDetail(route.query.resumeId,route.query.addConsultantId).then(() => {
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
