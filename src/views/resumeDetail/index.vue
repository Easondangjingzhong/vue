<template>
  <a-spin :spinning="resumeShowFlag" size="large">
    <a-layout>
      <a-layout-content class="resume_container resume_container_index">
        <div v-if="expendShow">
          <ResumeDetailHeader
            :resumeData="resumeDetailTemp.resume"
            :showResumeAdd="showResumeAdd"
            :showResumeRightOutFlag="showResumeRightOutFlag"
          />
          <div class="resume_container_detail">
            <ResumeDetailPersonInfo
              :resumeData="resumeDetailTemp.resume"
              :showResumeAdd="showResumeAdd"
            />
            <ResumeDetailWorkInfo
              :showResumeAdd="showResumeAdd"
              class="resume_work_show"
              v-if="workFlag && showResumeAdd"
              :indexNum="
                resumeDetailTemp.resume.workExpeList
                  ? resumeDetailTemp.resume.workExpeList.length
                  : 0
              "
              :resumeData="{ resumeId: resumeDetailTemp.resume.id }"
            />
            <ResumeDetailWorkInfo
              v-for="(item, index) in resumeDetailTemp.resume.workExpeList"
              :indexNum="index"
              :resumeData="item"
              :showResumeAdd="showResumeAdd"
            />
            <ResumeDetailEducationInfo
              v-for="(item, index) in resumeDetailTemp.resume.eduExpeList"
              :showResumeAdd="showResumeAdd"
              :indexNum="index"
              :resumeData="item"
            />
            <ResumeDetailEducationInfo
              :showResumeAdd="showResumeAdd"
              v-if="eduFlag && showResumeAdd"
              :indexNum="resumeDetailTemp.resume.eduExpeList.length"
              :resumeData="{ resumeId: resumeDetailTemp.resume.id }"
            />
            <ResumeDetailLanguagesInfo
              :resumeData="resumeDetailTemp.resume"
              :Languages="resumeDetailTemp.resume.resumeLanguageList"
              :showResumeAdd="showResumeAdd"
              :resumeId="resumeDetailTemp.resume.id"
            />
            <ResumeDetaiSelfInfo
              :resumeData="resumeDetailTemp.resume"
              :showResumeAdd="showResumeAdd"
            />
          </div>
        </div>
      </a-layout-content>
      <a-layout-sider class="resume_sider">
        <!-- <a-row :gutter="24" v-if="!showResumeAdd && showResumeAddReport" style="height: 100px;overflow-y: auto;border-bottom: 1px solid #ccc;">
      <a-col :span="24" v-if="resumeReportDetails.length > 0" v-for="item in resumeReportDetails">
        <div v-html="item.reportContent"></div>
      </a-col>
    </a-row> -->
        <div v-if="expendShow">
          <ResumeLeftHeader v-if="showResumeRightHeader" :showResumeAdd="showResumeAdd" :showResumeRightOutFlag="showResumeRightOutFlag"/>
          <ResumeLeftCheckDuplicate v-if="showResumeRightHeader && showResumeRightOutFlag" :showResumeAdd="showResumeAdd" />
          <ResumeLeftPositions v-if="showResumePositionsAndRecommendRecord && showResumeRightOutFlag" />
          <ResumeLeftContactContent v-if="showResumeRightContact" :showResumeAdd="showResumeAdd"  :showResumeRightOutFlag="showResumeRightOutFlag"/>
          <ResumeLeftRecommendRecord v-if="showResumePositionsAndRecommendRecord" />
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
  import ResumeLeftContactContent from './components/ResumeLeftContactContent.vue';
  import { storeToRefs } from 'pinia';
  import { degreeArr,degreeEnArr } from '/@/store/data/resume';
  import { ResumeDetail } from '/@/api/resumeDetail/modal';
  import { useCityStoreWithOut } from '/@/store/modules/city';
  import { useResumeListStoreWithOut } from '/@/store/modules/resumeList';
  import { useResumeDetailStore } from '/@/store/modules/resumeDetail';
  const resumeListStore = useResumeListStoreWithOut();
  const cityStore = useCityStoreWithOut();
  const resumeDetailStore = useResumeDetailStore();
  const { resumeDetail, eduFlag, workFlag, resumeShowFlag, commRecruitId } =
    storeToRefs(resumeDetailStore);
  const resumeDetailTemp = ref({} as ResumeDetail);
  const expendShow = ref(false);
  const route = useRoute();
  const showResumeAdd = ref(true); //控制简历按钮是否可以修改,或者是否可以操作
  const showResumeRightHeader = ref(true); //控制简历右边简历详情和客户查重是否展示
  const showResumeRightContact = ref(true); //控制简历右边联络记录是否展示
  const showResumePositionsAndRecommendRecord = ref(true); //控制简历右边职位意向及推荐记录是否展示
   const showResumeRightOutFlag= ref(false); //控制简历右边简历详情和客户查重是否展示
  //const loginVueUser: {loginName: "", loginId: "", loginTocken: ""} = JSON.parse(localStorage.getItem("loginVueUser"));
  // 如果简历的创建人不是当前登录人，则显示复制简历按钮
  // 注意：此处需要和后端协商好，获取简历创建人id的api
  // 假设resumeDetail.recruitId 就是简历创建人id
  // 假设 resumeDetail.recruitId 和 loginVueUser.loginId 相等时，表示是创建人，可以显示复制简历按钮
  // 假设 resumeDetail.recruitId 和 loginVueUser.loginId 不等时，表示不是创建人，不可以显示复制简历按钮
  // 以下代码是假设简历创建人id是 resumeDetail.recruitId，loginVueUser.loginId是假设的登录人id
const loginVueUser: { loginName: ''; loginId: ''; loginTocken: ''; loginOutFlag: '' } = JSON.parse(
  localStorage.getItem('loginVueUser'),
);
  watch(resumeDetail, () => {
    //@ts-ignore
    resumeDetailTemp.value = { ...resumeDetail.value };
    resumeDetailStore.$patch({
        resumeTypeEnglish: resumeDetailTemp.value.resume.isEnglish,
    });
    //如果是公共简历只能看简历详情,客户查重,以及联系记录,并且不能修改
    if (!commRecruitId.value) {
      showResumeAdd.value = false;
      showResumePositionsAndRecommendRecord.value = false;
    } else {
      showResumeAdd.value = true;
      showResumePositionsAndRecommendRecord.value = true;
      showResumeRightContact.value = true;
      showResumeRightHeader.value = true;
    }
    if (route.query?.loginType == 'S' && route.query?.loginId != commRecruitId.value) {
      showResumeAdd.value = false;
      showResumePositionsAndRecommendRecord.value = false;
    }
    if ((route.query?.loginType == 'T' || route.query?.loginType == 'V')&& route.query?.loginId != commRecruitId.value) {
      showResumeAdd.value = false;
    }
    //企顾查看推荐简历只能看不能修改
    if (route.query?.searchRecommend == 'Q') {
      showResumeAdd.value = false;
      showResumeRightContact.value = true;
      showResumePositionsAndRecommendRecord.value = false;
    }
    // if (route.query?.searchRecommend == "T") {
    //   showResumeAdd.value = false;
    // }
    if (!resumeDetailTemp.value.resume.workExpeList) {
      resumeDetailStore.$patch({
        workFlag: true,
      });
      workFlag.value = true;
      resumeDetailStore.$patch({
        workWholeFlag: true,
      });
    } else {
      const workExpeListTemp = resumeDetailTemp.value.resume.workExpeList;
      let wtemp = false;
      workExpeListTemp.forEach((item: any,index) => {
        if (
          !item.startYear ||
          !item.startMonth ||
          !item.endYear ||
          (item.endYear != '-1' && !item.endMonth) ||
          !item.category ||
          !item.companyName ||
          (item.category == '店铺' &&
            (!item.marketName ||
              (item.isRetreat == 0 && !item.workFloor) ||
              !(item.isRetreat == 0 || item.isRetreat == 1))) ||
          !(item.isNewtest == 0 || item.isNewtest == 1) ||
          !item.positionName ||
          !item.workDuty ||
          !item.cityName ||
          ((item.category == '店铺' || index < 1)&& !item.brandName)
          || (item.brandName == 'OFFICE')
        ) {
          wtemp = true;
        }
      });
      resumeDetailStore.$patch({
        workWholeFlag: wtemp,
      });
    }
    if (
      !resumeDetailTemp.value.resume.eduExpeList ||
      resumeDetailTemp.value.resume.eduExpeList.length == 0
    ) {
      resumeDetailStore.$patch({
        eduFlag: true,
      });
      eduFlag.value = true;
      resumeDetailStore.$patch({
        educationWholeFlag: true,
      });
    } else {
      const eduExpeListTemp = resumeDetailTemp.value.resume.eduExpeList;
      let wtemp = false;
      eduExpeListTemp.forEach((item: any) => {
        if (
          !item.startYear || !item.startMonth || !item.endYear || !item.endMonth || !(degreeArr.includes(item.degree) || degreeEnArr.includes(item.degree))
          || !item.degree || (!(item.degree == "初中" || item.degree == "高中") && !item.majorName) || !item.isRegular 
        ) {
          wtemp = true;
        }
        if (item.atSchool == "1" && !resumeDetailTemp.value.resume.workExpeList) {
          resumeDetailStore.$patch({
            workWholeFlag: false,
            workWholeFlagAtShcool: true,
          });
        }
      });
      resumeDetailStore.$patch({
        educationWholeFlag: wtemp,
      });
    }
    if (loginVueUser.loginOutFlag != '1') {
      showResumeRightOutFlag.value = true; 
    }
  });
  cityStore.fetchCountryInfo();
  cityStore.fetchInfo();
  resumeListStore.queryPositionsList();
  resumeListStore.queryBranList();
  resumeListStore.queryMarkList();
  resumeListStore.queryCompanyList();
  resumeDetailStore.queryWeekNumByWorkDate();
  resumeDetailStore.queryWeekByYearAndMonth();
  resumeDetailStore.queryEnterpriseConsultant();
  if (route.query?.searchRecommend == 'Q') {
    resumeDetailStore.$patch({
      searchRecommend: 'Q',
      addRecruitId: route.query?.addRecruitId,
    });
  }
  resumeDetailStore
    .queryResumeDetail(route.query.resumeId, route.query.addConsultantId)
    .then(() => {
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
