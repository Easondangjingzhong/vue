<template>
  <div class="resume_header" v-if="!expend">
    <a-row :gutter="24">
      <a-col :span="24" class="resume_detail_title">
        <h4 class="resume_h4">
          <svg t="1735638439700" style="vertical-align: middle" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11897" width="13" height="13"><path d="M971.808 267.616a64 64 0 0 0-89.184 15.68L552.256 755.136l104.832 73.44 330.4-471.84a64.064 64.064 0 0 0-15.68-89.12zM512 922.24l124.864-68.8-102.912-72.064z" p-id="11898"></path><path d="M671.136 912.928l-1.952-1.312L480 992l-18.56-225.888L810.112 268.064c8.576-12.128 29.952-13.632 53.888-10.144V96a96 96 0 0 0-96-96H128a96 96 0 0 0-96 96v832a96 96 0 0 0 96 96h640a96 96 0 0 0 96-96v-290.496l-192.864 275.424zM192 160h512a32 32 0 1 1 0 64H192a32 32 0 1 1 0-64z m0 160h416a32 32 0 1 1 0 64H192a32 32 0 1 1 0-64z m-32 192a32 32 0 0 1 32-32h320a32 32 0 1 1 0 64H192a32 32 0 0 1-32-32z" p-id="11899"></path></svg>
          自我评价</h4>
        <form-outlined v-if="showResumeAdd" @click="handleUpdateSelfInfo"></form-outlined>
      </a-col>
      <a-divider :dashed="true" style="background-color: #ccc;margin-top: 0;margin-bottom: 0;" />
    </a-row>
    <a-row :gutter="24" class="resume_row">
      <a-col :span="24" v-html="resumeData.selfEvaluation"></a-col>
    </a-row>
  </div>
  <div class="resume_header_update" v-if="expend">
    <a-row :gutter="24">
      <a-col :span="24" class="resume_detail_title">
        <h4 class="resume_h4">
          <svg t="1735638439700" style="vertical-align: middle" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11897" width="13" height="13"><path d="M971.808 267.616a64 64 0 0 0-89.184 15.68L552.256 755.136l104.832 73.44 330.4-471.84a64.064 64.064 0 0 0-15.68-89.12zM512 922.24l124.864-68.8-102.912-72.064z" p-id="11898"></path><path d="M671.136 912.928l-1.952-1.312L480 992l-18.56-225.888L810.112 268.064c8.576-12.128 29.952-13.632 53.888-10.144V96a96 96 0 0 0-96-96H128a96 96 0 0 0-96 96v832a96 96 0 0 0 96 96h640a96 96 0 0 0 96-96v-290.496l-192.864 275.424zM192 160h512a32 32 0 1 1 0 64H192a32 32 0 1 1 0-64z m0 160h416a32 32 0 1 1 0 64H192a32 32 0 1 1 0-64z m-32 192a32 32 0 0 1 32-32h320a32 32 0 1 1 0 64H192a32 32 0 0 1-32-32z" p-id="11899"></path></svg>
          自我评价</h4>
      </a-col>
      <a-divider :dashed="true" style="background-color: #ccc;margin-top: 0;" />
    </a-row>
    <a-form ref="formRef"
     :model="formState"
     @finish="onFinish">
    <a-row :gutter="24" class="resume_row">
      <a-col :span="24">
        <a-form-item
            name="selfEvaluation"
            :rules="[{ required: true, message: '请输入自我评价' }]"
          >
            <a-textarea
              :rows="7"
              v-model:value="formState.selfEvaluation"
              placeholder="请输入自我评价"
            ></a-textarea>
          </a-form-item>  
      </a-col>
    </a-row>
    <a-row :gutter="24">
        <a-col :span="24" class="resume_detail_btn">
          <a-button style="margin: 0 8px" type="primary" html-type="submit">保存</a-button>
          <a-button @click="handleUpdateSelfInfo">取消</a-button>
        </a-col>
      </a-row>
  </a-form>
  </div>
</template>
<script setup lang="ts">
  import { FormOutlined } from '@ant-design/icons-vue';
  import { message } from 'ant-design-vue';
  import { useResumeDetailStore } from '/@/store/modules/resumeDetail'; 
  const resumeDetailStore = useResumeDetailStore();
  const props = defineProps({
    resumeData: {
      type: Object,
      required: true,
    },
    showResumeAdd: {
      type: Boolean,
      required: true,
    }
  })
  const formState = ref({
    selfEvaluation: '',
    resumeId: '',
    consultantId: '',
  });
  const expend = ref(false);
  const handleUpdateSelfInfo = () => {
    expend.value = !expend.value;
    formState.value.selfEvaluation = props.resumeData?.selfEvaluation.replaceAll(/<[^>]+>/g, '');
    formState.value.resumeId = props.resumeData.id;
    formState.value.consultantId = props.resumeData.addConsultantId;
  };
  const onFinish = () => {
    let formData = new FormData();
    formData.append('resumeId', formState.value.resumeId);
    formData.append('consultantId', formState.value.consultantId);
    formData.append('selfEvaluation', formState.value.selfEvaluation);
    resumeDetailStore.updateResumeSelfEvaluation(formData).then(() => {
      resumeDetailStore.queryResumeDetail().then(() => {
        expend.value = !expend.value;
        message.success('保存成功');
      });
    }).catch(() => {
      message.error("保存失败");
    });
  };
</script>
<style lang="less" scoped>
 .resume_header {
  margin: 10px 20px;
  }
  .resume_header_update {
    margin-top: 10px;
    padding: 0 20px 20px;
    border-radius: 5px;
    border: 1px solid #ccc;
    box-shadow: 0 0 2px #cccc;
  }
  .resume_h4 {
    margin: 15px 0 5px 0;
    font-size: 18px;
  }
  .resume_detail_title {
    font-size: 14px;
    text-align: left;
    font-weight: 700;
    display: flex;
    justify-content: space-between;
  }
  .resume_row {
    padding-left: 25px;
  }
  .resume_detail_btn {
    display: flex;
    justify-content: center;
  }
</style>