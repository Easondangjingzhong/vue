<template>
  <div>
    <!-- <div class="resume_title">个人信息</div> -->
    <a-form
      ref="formRef"
      :model="resumeFormState"
      name="resumeFormState"
      autocomplete="off"
      :label-col="labelCol"
      :wrapper-col="{span: 14}"
      :scrollToFirstError="true"
      @finish="onSubmit"
    >
    <PersonInfo name="PersonInfo" :personInfoData="resumeFormState.personInfoData"/>
    <WorkExperience :workExperienceList="resumeFormState.workExperienceList"/>
    <EducationInfo  :educationInfoList="resumeFormState.educationInfoList"/>
    <LanguagesInfo :resumeLanguageList="resumeFormState.resumeLanguageList"/>
    <SelfEvaluation :selfEvaluationData="resumeFormState.selfEvaluationData"/>
    <a-card class="resume_card" style="position: sticky;bottom: 0;padding: 10px; ">
    <a-form-item class="resume_item">
      <a-button type="primary" class="resume_btn" :loading="iconLoading" size="large" html-type="submit">提交</a-button>
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
  const labelCol = ref({span: 5});
  const {resumeFormState,updatePhotoFlag,resumeTypeEnglish} = storeToRefs(resumeStore);
  if (resumeTypeEnglish.value == "1") {
      labelCol.value = {span: 8};
    } else {
      labelCol.value = {span: 5};
    }
  watch(() => resumeTypeEnglish.value,() => {
    if (resumeTypeEnglish.value == "1") {
      labelCol.value = {span: 8};
    } else {
      labelCol.value = {span: 5};
    }
  })
  const plagiarusnStore = usePlagiarusnStoreWithOut();
  const formRef = ref();
  const scorllView = () => {
       const ele = window.document.querySelector('.ant-form-item-has-error');
        if (ele) {
          ele.scrollIntoView({ behavior: 'smooth' });
        }
  }
  const onSubmit = async (values) => {
    console.log('valuestoRaw', toRaw(resumeFormState));
    console.log('valuestoRaw form', values);
    scorllView();
    if (updatePhotoFlag.value === 1) {
      message.warning("请截取合适的人才相片");
      return;
    }
    // if (!resumeFormState.value.personInfoData.userName) {
    //   message.warning("请输入姓名");
    //   return;
    // }
    if (!resumeFormState.value.personInfoData.gender) {
      message.warning("请输入性别");
      return;
    }
    
    if (!resumeFormState.value.personInfoData.phone) {
      message.warning("请输入手机");
      return;
    }
    let reg = /^(1[3-9])\d{9}$|^([0][0][8][5][2|3])\d{8}$/;
    if (!reg.test(resumeFormState.value.personInfoData.phone)) {
      message.warning("请输入正确的手机号");
      return;
    }
    let regx = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
    if (resumeFormState.value.personInfoData.email && !regx.test(resumeFormState.value.personInfoData.email)) {
      message.warning("请输入正确的邮箱");
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
    const edu = resumeFormState.value.educationInfoList;
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
    
    await formRef.value.validate().then(() => {
      resumeStore.fetchResumeInfo().then(() => {
        plagiarusnStore.resumeInfoShow(false);
        plagiarusnStore.plagiarusnRseultShow(0);
        plagiarusnStore.plagiarusnInfoFlagShow(false);
        iconLoading.value = false;
      });
     
    }).catch(error => {
      scorllView();
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