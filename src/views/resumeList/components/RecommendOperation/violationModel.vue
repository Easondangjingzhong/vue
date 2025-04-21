<template>
 <a-modal v-model:open="violationFlag" title="违规上报" @ok="saveNewViolation">
  <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item label="人才姓名">
      <a-input v-model:value="formState.violationContent" :disabled="true"/>
    </a-form-item>
    <a-form-item label="顾问">
      <a-input v-model:value="formState.realNameEn" :disabled="true"/>
    </a-form-item>
    <a-form-item label="团队">
      <a-input v-model:value="formState.violationTeam" :disabled="true"/>
    </a-form-item>
    <a-form-item label="违规原因">
      <a-select
       :options="optionsVilationReason"
       v-model:value="formState.vilationReason">
      </a-select>
    </a-form-item>
    <a-form-item label="上报文件">
      <a-upload :file-list="fileList" :before-upload="beforeUpload" :max-count="1">
      <a-button>
        <upload-outlined></upload-outlined>
        文件上传
      </a-button>
      </a-upload>
    </a-form-item>
    <a-form-item label="违规说明">
      <a-textarea v-model:value="formState.createRemark" />
    </a-form-item>
  </a-form>
  </a-modal>
</template>
<script setup lang="ts">
import type { UnwrapRef } from 'vue';
import { storeToRefs } from 'pinia';
import { message,Upload } from 'ant-design-vue';
import type { UploadProps } from 'ant-design-vue';
import { UploadOutlined } from '@ant-design/icons-vue';
import { useResumeListStoreWithOut } from '/@/store/modules/resumeList';
const resumeListStore = useResumeListStoreWithOut();
const {
    violationFlag
  } = storeToRefs(resumeListStore);
const fileList = ref<UploadProps['fileList']>([]);
const beforeUpload: UploadProps['beforeUpload'] = file => {
  const isUpload = /\.(jpg|png|jpeg)$/.test(file?.name.toLowerCase());
  if (!isUpload) {
    message.error(`${file.name} is not a png file`);
    return Upload.LIST_IGNORE;
  }
  fileList.value  = [];
  fileList.value = [...(fileList.value || []), file];
  return false;
};
const props = defineProps({
  violationRecord: {
      type: Object,
      required: true,
  }
})
interface FormState {
  recommendId: string;//推荐记录id
  vilationType: string;//违规类型 推荐流程
  violationContent: string; // 人才姓名
  realNameEn: string;//顾问
  recruitId: string;
  violationTeam: string;//团队
  file: string;//上报文件
  vilationReason: string;//违规原因
  createRemark: string;//违规说明
}
const formState: UnwrapRef<FormState> = reactive({
  recommendId: '',
  vilationType: '',
  violationContent: '',
  realNameEn: '',
  recruitId: '',
  violationTeam: '',
  file: '',
  vilationReason: '',
  createRemark: '',
  });
const optionsVilationReason = ref([
{
  value: '企业顾问审核违规',label: '企业顾问审核违规'
},
{
  value: '企业顾问违反公平公正',label: '企业顾问违反公平公正'
},
]);
const labelCol = { style: { width: '50px' } };
const wrapperCol = { span: 14 };
const saveNewViolation = () => {
    console.log(formState)
}  
</script>
<style lang="less" scoped>
  :deep(.ant-modal .ant-modal-footer) {
    text-align: center;
    display: none;
  }
  :deep(.ant-upload-wrapper) {
    display: flex;
  }
  :deep(.ant-upload-wrapper .ant-upload-list .ant-upload-list-item-container) {
    width: 290px;
  }
</style>