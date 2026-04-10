<template>
  <a-modal
    v-model:open="outsourceSocialSecurityJiaoFlag"
    title="社保补缴/预收/退费"
    @ok="handleSubmit"
    @cancel="handleClose"
    :confirmLoading="iconLoading"
  >
    <a-form :model="outsourceSocialSecurityJiaoForm" :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
      <a-form-item label="姓名">
        <a-input v-model:value="outsourceSocialSecurityJiaoForm.userNameCn" disabled />
      </a-form-item>
      <a-form-item label="类型" name="jiaoSign" :rules="[{ required: true, message: '请选择类型' }]">
        <a-select v-model:value="outsourceSocialSecurityJiaoForm.jiaoSign" placeholder="请选择类型">
          <a-select-option value="补缴">补缴</a-select-option>
          <a-select-option value="预收">预收</a-select-option>
          <a-select-option value="退费">退费</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="标识" name="jiaoType" :rules="[{ required: true, message: '请选择标识' }]">
        <a-select v-model:value="outsourceSocialSecurityJiaoForm.jiaoType" placeholder="请选择标识">
          <a-select-option value="缴费">缴费</a-select-option>
          <a-select-option value="退费">退费</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="周期" name="yearAndMonth" :rules="[{ required: true, message: '请选择周期' }]">
        <a-date-picker
          v-model:value="outsourceSocialSecurityJiaoForm.yearAndMonth"
          value-format="YYYY-MM"
          picker="month"
          placeholder="请选择周期"
          style="width: 100%"
        />
      </a-form-item>
      <a-form-item label="账单月" name="yearAndMonthJiao" :rules="[{ required: true, message: '请选择账单月' }]">
        <a-date-picker
          v-model:value="outsourceSocialSecurityJiaoForm.yearAndMonthJiao"
          value-format="YYYY-MM"
          picker="month"
          placeholder="请选择账单月"
          style="width: 100%"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { message } from 'ant-design-vue';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
import { OutsourceSheBaoItem } from '/@/api/outsourceDetail/model';

const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { outsourceSocialSecurityJiaoFlag, outsourceSocialSecurityJiaoForm } = storeToRefs(outsourceDetailStore);

const iconLoading = ref(false);

const handleClose = () => {
  outsourceSocialSecurityJiaoFlag.value = false;
  outsourceSocialSecurityJiaoForm.value = {} as OutsourceSheBaoItem;
};

const handleSubmit = async () => {
  if (!outsourceSocialSecurityJiaoForm.value.jiaoSign || !outsourceSocialSecurityJiaoForm.value.jiaoType || !outsourceSocialSecurityJiaoForm.value.yearAndMonth || !outsourceSocialSecurityJiaoForm.value.yearAndMonthJiao) {
    message.error('请填写完整信息');
    return;
  }

  iconLoading.value = true;
  try {
    const res = await outsourceDetailStore.addOutsourceUpdateSheBaoMonthBySign(outsourceSocialSecurityJiaoForm.value);
    if (res.code === 1) {
      message.success('操作成功');
      outsourceSocialSecurityJiaoFlag.value = false;
      outsourceDetailStore.queryOutsourceSheBao();
    } else {
      message.error(res.msg || '操作失败');
    }
  } catch (error) {
    message.error('系统异常');
  } finally {
    iconLoading.value = false;
  }
};
</script>
