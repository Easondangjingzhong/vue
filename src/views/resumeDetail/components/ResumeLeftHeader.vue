<template>
   <div class="resume_header">
    <a-row :gutter="24">
      <a-col :span="24" class="resume_detail_title">
        <h4 class="resume_h4">
          简历
        </h4>
      </a-col>
      <a-divider :dashed="true" style="background-color: #ccc;margin-top: 0;margin-bottom: 5px;" />
    </a-row>
    <a-row :gutter="24" class="resume_row" :key="item.resumeId" v-if="resumeReportDetails.length > 0" v-for="item in resumeReportDetails">
      <a-col :span="24">
        <span class="resume_span">{{ item.index }}</span>
        <span class="resume_span">{{ item.realNameEn }}</span>
        <span class="resume_span">
          <a-tag color="pink">中文</a-tag>
          <LinkOutlined v-if="item.orginalPath"/>
        </span>
        <span class="resume_span" v-if="!item.resumeIdEn">英文</span>
        <span class="resume_span" v-else-if="item.resumeIdEn">
          <a-tag color="red">英文</a-tag>
          <LinkOutlined v-if="item.orginalPathEn"/>
        </span>
        <span class="resume_span"><a-tag color="#ffa500" style="cursor: pointer;" @click="handleReportContent(item.reportContent)">报告</a-tag></span>
      </a-col>
    </a-row>
    <div v-if="expend">
      <a-form ref="formRef" :model="formState" @finish="onFinish">
        <a-row :gutter="24">
          <a-col :span="24">
            <a-form-item  name="reportContent" :rules="[{ required: true, message: '请输入简历报告' }]">
              <a-textarea
                :rows="7"
                v-model:value="formState.reportContent"
                placeholder="请输入简历报告"
              ></a-textarea>
            </a-form-item>
          </a-col>
          
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" style="text-align: right;">
            <a-button type="primary" size="small" :loading="iconLoading" style="margin: 0 8px;" html-type="submit">保存</a-button>
            <a-button size="small" @click="handleCancelReportContent">取消</a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>
  </div>
</template>
<script setup lang="ts">
 import {  LinkOutlined } from '@ant-design/icons-vue';
 import { storeToRefs } from 'pinia';
 import { message } from 'ant-design-vue';
import { useResumeDetailStore } from '/@/store/modules/resumeDetail';
const resumeDetailStore = useResumeDetailStore();
const { resumeReport } =storeToRefs(resumeDetailStore);
const expend = ref(false);
const resumeReportDetails = ref([{
  index: '',
  resumeId: '',
  realNameEn: '',
  reportContent: '',
  orginalPathEn: '',
  resumeIdEn: '',
  orginalPath: ''
}])
watch(resumeReport,()=> {
  resumeReportDetails.value = resumeReport.value?.map((item,index) => ({
    index: (index + 1).toString(),
    resumeId: item.resumeId,
    realNameEn: item.realNameEn,
    reportContent: item.reportContent,
    orginalPathEn: item.orginalPathEn,
    resumeIdEn: item.resumeIdEn,
    orginalPath: item.orginalPath
  }))
})
const formState = ref({
  reportContent: ''
})
const iconLoading = ref(false);
const handleReportContent = (reportContent) => {
  formState.value.reportContent = reportContent?.replaceAll(/<[^>]+>/g, '');
  expend.value = true;
}
const handleCancelReportContent = () => {
  expend.value = false;
  formState.value.reportContent = '';
  iconLoading.value = false;
}
const onFinish = () => {
  iconLoading.value = true;
  resumeDetailStore.updateResumeReportContent(formState.value.reportContent).then(res => {
    if (res.code == 1) {
        message.success('保存成功');
        handleCancelReportContent();
      } else {
        message.error('保存失败');
      }
      iconLoading.value = false;
  });
}
</script>
<style lang="less" scoped>
 .resume_header {
  margin: 10px 20px;
 }
 .resume_row {
   margin: 5px 0;
 }
 .resume_h4 {
    margin: 5px 0;
    font-size: 16px;
  }
  .resume_span {
    margin-right: 40px;
    font-size: 14px;
    font-weight: 400;
  }
</style>