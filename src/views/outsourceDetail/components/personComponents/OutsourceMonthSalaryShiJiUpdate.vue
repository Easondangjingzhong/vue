<template>
 <a-drawer
    v-model:open="outsourceMonthSalaryShiJiFlag"
    title="年度累计"
    :maskClosable="false"
    :keyboard="false"
    :closable="false"
    :width="drawerWidth"
    :bodyStyle="{ padding: '4px 14px' }"
    :headerStyle="{ padding: '5px 18px 5px 12px' }"
    placement="right"
  >
    <template #extra>
      <CloseOutlined @click="handleClose" />
    </template>
    <div>
      <a-form :label-col="labelCol" :model="outsourceMonthSalaryYearForm" @finish="handleSubmit">
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item name="yearShebaoPre" label="年度社保" :rules="[{ required: false, message: '请输入子女教育' }]">
              <a-input v-model:value="outsourceMonthSalaryYearForm.yearShebaoPre"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
           <a-form-item name="yearGeshuiPre" label="年度个税" :rules="[{ required: false, message: '请选择年度个税' }]">
              <a-input v-model:value="outsourceMonthSalaryYearForm.yearGeshuiPre"/>
            </a-form-item>
          </a-col>
         
          
        </a-row>
        <a-row :gutter="24">
           <a-col :span="12">
            <a-form-item name="yearMianzhengPre" label="年度免征" :rules="[{ required: false, message: '请输入年度免征' }]">
              <a-input v-model:value="outsourceMonthSalaryYearForm.yearMianzhengPre"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item name="yearTaxPre" label="年度工资" :rules="[{ required: false, message: '请输入年度工资' }]">
              <a-input v-model:value="outsourceMonthSalaryYearForm.yearTaxPre"/>
            </a-form-item>
          </a-col>
         
        </a-row>
        <a-row :gutter="24">
           <a-col :span="12">
            <a-form-item name="yearZhuankouPre" label="年度专扣" :rules="[{ required: false, message: '请输入年度专扣' }]">
              <a-input v-model:value="outsourceMonthSalaryYearForm.yearZhuankouPre"/>
            </a-form-item>
          </a-col>
          <a-col :span="12" style="text-align: right;">
            <a-button type="primary" :loading="iconLoading" html-type="submit">
              保存
            </a-button>
            <a-button style="margin-left: 10px" @click="handleClose">
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
const { outsourceMonthSalaryShiJiFlag,outsourceMonthSalaryForm } = storeToRefs(outsourceDetailStore);
const outsourceMonthSalaryYearForm = ref({
  personId: '',
  jinxinMonth: '',
  yearShebaoPre: '',
  yearGeshuiPre: '',
  yearMianzhengPre: '',
  yearTaxPre: '',
  yearZhuankouPre: '',
})
const drawerWidth = ref(Math.max(600, window.innerWidth * 0.5));
const labelCol = {
  span: 4,
};
watch(outsourceMonthSalaryShiJiFlag,() => {
  if(outsourceMonthSalaryShiJiFlag.value) {
    outsourceMonthSalaryYearForm.value = {
      personId: outsourceMonthSalaryForm.value?.personId?.toString() || '',
      jinxinMonth: outsourceMonthSalaryForm.value.jinxinMonth || '',
      yearShebaoPre: outsourceMonthSalaryForm.value?.yearShebaoPre || '',
      yearGeshuiPre: outsourceMonthSalaryForm.value?.yearGeshuiPre || '',
      yearMianzhengPre: outsourceMonthSalaryForm?.value.yearMianzhengPre || '',
      yearTaxPre: outsourceMonthSalaryForm.value?.yearTaxPre || '',
      yearZhuankouPre: outsourceMonthSalaryForm.value?.yearZhuankouPre || '',
    }
  }
})
const iconLoading = ref(false);
const handleClose = () => {
  outsourceMonthSalaryShiJiFlag.value = false;
  outsourceMonthSalaryYearForm.value = {
    personId: '',
    jinxinMonth: '',
    yearShebaoPre: '',
    yearGeshuiPre: '',
    yearMianzhengPre: '',
    yearTaxPre: '',
    yearZhuankouPre: '',
  }
}
const handleSubmit = () => {
  iconLoading.value = true;
  outsourceDetailStore.addUpdateOutsourceSalaryMonthYearlPre(outsourceMonthSalaryYearForm.value).then(res => {
        if (res.code == 1) {
          message.success('操作成功');
          outsourceMonthSalaryShiJiFlag.value = false;
          iconLoading.value = false;
          handleClose();
        } else {
          message.error('操作失败');
          iconLoading.value = false;
        }
      })
}
</script>

<style lang="less" scoped>
:deep(.outsourceAttendCol .ant-form-item) {
  margin-bottom: 0;
}
</style>