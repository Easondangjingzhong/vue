<template>
 <a-drawer
    v-model:open="outsourceContractFlag"
    title="合同信息"
    :maskClosable="false"
    :keyboard="false"
    :closable="false"
    :width="drawerContractWidth"
    :bodyStyle="{ padding: '4px 14px' }"
    :headerStyle="{ padding: '5px 18px 5px 12px' }"
    placement="right"
  >
    <template #extra>
      <CloseOutlined @click="outsourceContractFlag = false" />
    </template>
    <div>
      <a-form :model="outsourceContractForm" @finish="handleSubmit">
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item name="contractType" label="合同类型"
            :rules="[{ required: true, message: '请选择合同类型' }]">
              <a-select 
              v-model:value="outsourceContractForm.contractType" 
              :options="contractTypeOption"
              ></a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item name="signType" label="签署类型" :rules="[{ required: true, message: '请选择签署类型' }]">
              <a-select v-model:value="outsourceContractForm.signType" :options="signTypeOption"></a-select>
            </a-form-item>
          </a-col>
         </a-row>
        <a-row :gutter="24">
           <a-col :span="12">
            <a-form-item name="signCompany" label="签署公司" :rules="[{ required: true, message: '请选择签署公司' }]">
              <a-select v-model:value="outsourceContractForm.signCompany" :options="signCompanyOption"></a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item name="signDate" label="签署日期" :rules="[{ required: true, message: '请选择签署日期' }]">
              <a-date-picker v-model:value="outsourceContractForm.signDate"  value-format="YYYY-MM-DD"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
         <a-col :span="12">
            <a-form-item name="startDate" label="合同开始" :rules="[{ required: false, message: '请选择合同开始' }]">
               <a-date-picker v-model:value="outsourceContractForm.startDate" @change="handleStartDateChange" value-format="YYYY-MM-DD"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item name="endDate" label="合同结束" :rules="[{ required: false, message: '请选择合同结束' }]">
               <a-date-picker v-model:value="outsourceContractForm.endDate"  @change="handleStartDateChange" value-format="YYYY-MM-DD"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item name="contractCycle" label="合同周期" :rules="[{ required: false, message: '请选择合同周期' }]">
              <a-input v-model:value="outsourceContractForm.contractCycle" :readonly="true"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-button type="primary" :loading="iconLoading" html-type="submit">
              保存
            </a-button>
            <a-button style="margin-left: 10px" @click="outsourceContractFlag = false">
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
const { outsourceContractFlag, outsourceContractForm } = storeToRefs(outsourceDetailStore);
const drawerContractWidth = ref(Math.max(600, window.innerWidth * 0.5));

const iconLoading = ref(false);

const contractTypeOption = ref([
  {
    label: '全职合同',
    value: '全职合同',
  },
  {
    label: '兼职合同',
    value: '兼职合同',
  },
]);
const signTypeOption = ref([
  {
    label: '入职签署',
    value: '入职签署',
  },
  {
    label: '合同续签',
    value: '合同续签',
  },
]);
const signCompanyOption = ref([
  {
    label: '北京博瑞',
    value: '北京博瑞',
  },
  {
    label: '北京我推',
    value: '北京我推',
  },
]);
const handleStartDateChange = () => {
  if (outsourceContractForm.value.startDate && outsourceContractForm.value.endDate) {
    const startDate = new Date(outsourceContractForm.value.startDate);
    const endDate = new Date(outsourceContractForm.value.endDate);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    outsourceContractForm.value.contractCycle = diffDays + " 天";
  } else {
    outsourceContractForm.value.contractCycle = "";
  }
}

const handleSubmit = () => {
  iconLoading.value = true;
  outsourceDetailStore.addOutsourcePersonContract().then(res => {
    if (res.code == 1) {
      message.success('新增成功');
      outsourceContractFlag.value = false;
      iconLoading.value = false;
    } else {
      message.error('新增失败');
      iconLoading.value = false;
    }
  });
}
</script>

<style lang="less" scoped>

</style>