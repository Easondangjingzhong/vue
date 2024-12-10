<template>
  <div class="resume-container" style="max-width: 1920px;">
    <Upload v-if="!closeBtn"/>
    <ResumeInfo v-if="resumeInfoFlag" :resumeFormState="resumeFormState" />
    <a-card class="resume_card" v-if="closeBtn">
      <a-result status="success" title="恭喜您提交的简历已经成功录入系统，请您继续前往系统完善简历哦！">
         <template #extra>
          <a-button type="primary" @click="handleGoToBtn" style="background-color: orange;border-color: orange;">前往简历</a-button>
          <a-button type="primary" @click="handleCloseBtn" style="background-color: #ccc;border-color: #ccc;">关闭</a-button>
        </template>
      </a-result>
    </a-card>
  </div>
</template>
<script setup lang="ts">
  import Upload from './components/Upload.vue';
  import ResumeInfo from './components/ResumeInfo.vue';
  import { useResumeStoreWithOut } from '/@/store/modules/resume';
  import { usePlagiarusnStoreWithOut } from '/@/store/modules/plagiarusn';
  import {ResumeFormState} from '/@/api/resume/model';
  import { storeToRefs } from 'pinia';
  import '/@/styles/resume.less';
  const resumeStore = useResumeStoreWithOut();
  const { resumeFormState,resumeId,closeBtn} = storeToRefs(resumeStore);
  const plagiarusnStore = usePlagiarusnStoreWithOut();
  const { resumeInfoFlag } = storeToRefs(plagiarusnStore);
  const handleCloseBtn = () => {
    closeBtn.value = false;
    plagiarusnStore.plagiarusnInfoFlagShow(true);
    resumeStore.setInfo({} as ResumeFormState);
  }
  const handleGoToBtn = () => {
    handleCloseBtn();
    window.open(`http://work.wotui.com:8889/WTSM/system/consultant-query-resume.html?resumeId=${resumeId.value}&resumeType=C`);
  }
  //const scaleKey = ref(1);
  /** 获取css 属性值 */
  // function getComputedStyleNumber(el: HTMLElement, attr: string) {
  //   return parseFloat(getComputedStyle(el, null).getPropertyValue(attr) || '0');
  // }

  // const handlerAdaptScale = (el,scale) => {
  //   scaleKey.value = scale;
  //   console.log(".....scale" + scale);
  //   // const el = document.querySelector('.resume-container') as HTMLElement;
  //   // //const offsetRight =
  //   //   getComputedStyleNumber(el, 'right') + getComputedStyleNumber(el, 'margin-right');
  //   // //const offsetBottom =
  //   //   getComputedStyleNumber(el, 'bottom') + getComputedStyleNumber(el, 'margin-bottom');
  //   // console.log('.....offsetRight' + getComputedStyleNumber(el, 'bottom'));
  //   // console.log('.....offsetBottom');
  // };
</script>
<style lang="less" scoped>
  .resume-container {
    width: 100%;
    height: 100vh;
    background-color: #f5f5f5;
    overflow-x: hidden;
  }
</style>
