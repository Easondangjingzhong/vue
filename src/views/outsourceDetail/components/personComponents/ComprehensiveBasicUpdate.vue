<template>
 <a-drawer
    v-model:open="outsourceBasicFlag"
    title="基本信息"
    :maskClosable="false"
    :keyboard="false"
    :closable="false"
    :width="drawerWidth"
    :bodyStyle="{ padding: '4px 14px' }"
    :headerStyle="{ padding: '5px 18px 5px 12px' }"
    placement="right"
  >
    <template #extra>
      <CloseOutlined @click="outsourceBasicFlag = false" />
    </template>
    <div>
      
      <a-form :label-col="labelCol" :model="outsourceBasicForm" @finish="handleSubmit">
         <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item name="offerTime" label="OFFER时间" :rules="[{ required: true, message: '请选择OFFER时间' }]">
              <a-date-picker v-model:value="outsourceBasicForm.offerTime" value-format="YYYY-MM-DD"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
           <a-form-item name="currentStatus" label="当前状态" :rules="[{ required: true, message: '请选择当前状态' }]">
              <a-select v-model:value="outsourceBasicForm.currentStatus">
                <a-select-option value="1">待入</a-select-option>
                <a-select-option value="2">在职</a-select-option>
                <a-select-option value="3">离职</a-select-option>
                <a-select-option value="4">未入</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24" v-if="outsourceBasicForm.currentStatus != '4'">
          <a-col :span="12">
            <a-form-item name="jobNumber" label="工号"
            :rules="[{ required: false, message: '请填写工号' }]">
              <a-input v-model:value="outsourceBasicForm.jobNumber" placeholder="请输入工号" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item name="jobType" label="性质" :rules="[{ required: true, message: '请选择性质' }]">
              <a-select v-model:value="outsourceBasicForm.jobType" :options="jobTypeOption"></a-select>
            </a-form-item>
          </a-col>
         </a-row>
        <a-row :gutter="24" v-if="outsourceBasicForm.currentStatus != '4'">
         <a-col :span="12">
            <a-form-item name="planEntryTime" label="预计入职" :rules="[{ required: true, message: '请选择预计入职' }]">
               <a-date-picker 
                v-model:value="outsourceBasicForm.planEntryTime" value-format="YYYY-MM-DD"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item name="realEntryTime" label="实际日期" :rules="[{ required: false, message: '请选择实际日期' }]">
               <a-date-picker v-model:value="outsourceBasicForm.realEntryTime" value-format="YYYY-MM-DD"/>
            </a-form-item>
          </a-col>
        </a-row>
         <a-row :gutter="24" v-if="outsourceBasicForm.currentStatus != '4'">
         <a-col :span="12">
            <a-form-item name="planLeaveTime" label="预计离职" :rules="[{ required: false, message: '请选择预计离职' }]">
               <a-date-picker v-model:value="outsourceBasicForm.planLeaveTime" value-format="YYYY-MM-DD"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item name="realLeaveTime" label="实际离职" :rules="[{ required: false, message: '请选择实际离职' }]">
               <a-date-picker v-model:value="outsourceBasicForm.realLeaveTime" value-format="YYYY-MM-DD"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" style="text-align: right;">
            <a-button type="primary" :loading="iconLoading" html-type="submit">
              保存
            </a-button>
            <a-button style="margin-left: 10px" @click="outsourceBasicFlag = false">
              取消
            </a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>
  </a-drawer>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { message } from 'ant-design-vue';
import { CloseOutlined } from '@ant-design/icons-vue';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { outsourceBasicFlag, outsourceBasicForm } = storeToRefs(outsourceDetailStore);
const drawerWidth = ref(Math.max(600, window.innerWidth * 0.5));
const labelCol = {
  span: 6,
};
const iconLoading = ref(false);

const jobTypeOption = ref([
  {
    label: '全职',
    value: '全职',
  },
  {
    label: '兼职',
    value: '兼职',
  },
]);


const handleSubmit = () => {
  iconLoading.value = true;
  outsourceDetailStore.addUpdateOutsourceBasic().then(res => {
    if (res.code == 1) {
      message.success('操作成功');
      outsourceBasicFlag.value = false;
      iconLoading.value = false;
    } else {
      message.error('操作失败');
      iconLoading.value = false;
    }
  });
}
</script>

<style lang="less" scoped>

</style>