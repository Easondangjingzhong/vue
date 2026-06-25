<template>
  <a-modal
    v-model:open="open"
    title="分配"
    :maskClosable="false"
    :confirm-loading="submitting"
    @ok="handleSubmit"
    @cancel="handleClose"
  >
    <a-form ref="formRef" :model="form" layout="vertical">
      <a-form-item label="分配人员">
        <a-input v-model:value="form.userName" disabled />
      </a-form-item>
      <a-form-item
        label="分配给谁"
        name="assignRecruitId"
        :rules="[{ required: true, message: '请选择要分配给谁' }]"
      >
        <a-select
          v-model:value="form.assignRecruitId"
          placeholder="请选择要分配给谁"
          :options="getPersonList"
          optionFilterProp="label"
          showSearch
          allowClear
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import type { FormInstance } from 'ant-design-vue';
import { message } from 'ant-design-vue';
import { storeToRefs } from 'pinia';
import type { MappingTempItem } from '/@/api/marketData/model';
import { useMarketDataStoreWithOut } from '/@/store/modules/marketData';

const props = defineProps<{
  record?: MappingTempItem | null;
}>();

const open = defineModel<boolean>('open', { default: false });
const emits = defineEmits<{ (e: 'success'): void }>();

const marketDataStore = useMarketDataStoreWithOut();
const { getPersonList } = storeToRefs(marketDataStore);

const formRef = ref<FormInstance>();
const submitting = ref(false);
const form = reactive({
  userName: '',
  assignRecruitId: undefined as string | undefined,
});

const resetForm = () => {
  form.userName = '';
  form.assignRecruitId = undefined;
  formRef.value?.clearValidate();
};

const handleClose = () => {
  open.value = false;
  resetForm();
};

watch(
  () => open.value,
  async (val) => {
    if (!val) {
      resetForm();
      return;
    }
    form.userName = props.record?.userName || '';
    form.assignRecruitId = props.record?.assignRecruitId?.toString() || undefined;
    if (!getPersonList.value?.length) {
      await marketDataStore.queryConsultantByTeam({teamId: ''});
    }
  },
);

const handleSubmit = async () => {
  if (!props.record?.id) {
    message.error('未获取到分配数据');
    return;
  }
  await formRef.value?.validate();
  const assignOption = getPersonList.value?.find(
    (item) => item.value === form.assignRecruitId,
  );
  submitting.value = true;
  try {
    const res = await marketDataStore.updateAssignMappingTemp({
      ids: props.record.id?.toString() || '',
      assignRecruitId: form.assignRecruitId || '',
      assignRealNameEn: assignOption?.label || '',
    });
    if (res?.code === 1) {
      message.success('分配成功');
      emits('success');
      handleClose();
      return;
    }
    message.error(res?.msg || '分配失败');
  } finally {
    submitting.value = false;
  }
};
</script>
