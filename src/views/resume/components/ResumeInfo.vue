<template>
  <div>
    <!-- <div class="resume_title">个人信息</div> -->
    <a-form
      ref="formRef"
      :model="resumeFormState"
      name="resumeFormState"
      autocomplete="off"
    >
    <PersonInfo name="PersonInfo" :personInfoData="resumeFormState.personInfoData"/>
    <WorkExperience :workExperienceList="resumeFormState.workExperienceList"/>
    <EducationInfo  :educationInfoData="resumeFormState.educationInfoData"/>
    <LanguagesInfo :resumeLanguageList="resumeFormState.resumeLanguageList"/>
    <SelfEvaluation :selfEvaluationData="resumeFormState.selfEvaluationData"/>
    <a-card class="resume_card" style="position: sticky;bottom: 0;padding: 10px; ">
    <a-form-item class="resume_item">
      <a-button type="primary" class="resume_btn" :loading="iconLoading" size="large"  @click="onSubmit">提交</a-button>
    </a-form-item>
  </a-card>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
  import { toRaw } from 'vue';
  //import type {UnwrapRef} from 'vue'
  import { usePlagiarusnStoreWithOut } from '/@/store/modules/plagiarusn';
  import PersonInfo from './resume/PersonInfo.vue';
  import WorkExperience from './resume/WorkExperience.vue';
   import EducationInfo from './resume/EducationInfo.vue';
  import LanguagesInfo from './resume/LanguagesInfo.vue';
 import SelfEvaluation from './resume/SelfEvaluation.vue';
 import { message } from 'ant-design-vue';
  import { useResumeStoreWithOut } from '/@/store/modules/resume';
  import { storeToRefs } from 'pinia';
  const resumeStore= useResumeStoreWithOut();
  let iconLoading = ref(false);

  const {resumeFormState} = storeToRefs(resumeStore);
  const plagiarusnStore = usePlagiarusnStoreWithOut();
  const formRef = ref();
  const onSubmit = async () => {
    if (!resumeFormState.value.personInfoData.userName) {
      message.warning("请输入姓名");
      return;
    }
    if (!resumeFormState.value.personInfoData.gender) {
      message.warning("请输入性别");
      return;
    }
    if (!resumeFormState.value.personInfoData.phone) {
      message.warning("请输入手机");
      return;
    }
    if (!resumeFormState.value.personInfoData.currentCity) {
      message.warning("请输入城市");
      return;
    }
    const work = resumeFormState.value.workExperienceList;
    let workFlag = false;
    if (work.length > 0) {
      work.forEach(item => {
        if (!item.companyName ||!item.startYear ||!item.endYear) {
          workFlag =  true;
        }
      })
    }
    if (workFlag) {
      message.warning("请完善工作经历");
      return;
    }
    const edu = resumeFormState.value.educationInfoData;
    let eduFlag = false;
    if (edu.length > 0) {
      edu.forEach(item => {
        if (!item.schoolName ||!item.degree) {
          eduFlag =  true;
        }
      })
    }
    if (eduFlag) {
      message.warning("请完善教育经历");
      return;
    }

    iconLoading.value = true;
    console.log('valuestoRaw', toRaw(resumeFormState));
    await formRef.value.validate().then(() => {
      resumeStore.fetchResumeInfo().then(() => {
        plagiarusnStore.resumeInfoShow(false);
        plagiarusnStore.plagiarusnRseultShow(0);
        plagiarusnStore.plagiarusnInfoFlagShow(false);
        iconLoading.value = false;
      });
     
    }).catch(error => {
      console.log('error', error);
    });
  }
 
  // const resetForm = () => {
  //   formRef.value?.resetFields();
  // }
</script>
<style scoped>
  .resume_btn {
    width: 120px;
    background-color: #f0ad4e;
    border-color: #eea236;
  }
  .resume_btn:hover {
    background-color: #f0b35d;
    border-color: #eea236;
  }
  .resume_item {
    margin-bottom: 0;
  }
</style>