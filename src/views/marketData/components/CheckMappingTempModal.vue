<template>
  <a-modal
    v-model:open="open"
    title="核对"
    :maskClosable="false"
    :confirm-loading="submitting"
    @ok="handleSubmit"
    @cancel="handleClose"
  >
    <a-form ref="formRef" :model="form" layout="vertical">
      <a-form-item label="核对结果" name="checkStatus" :rules="[{ required: true, message: '请选择核对结果' }]">
        <a-radio-group v-model:value="form.checkStatus">
          <a-radio value="正确">正确</a-radio>
          <a-radio value="错误">错误</a-radio>
          <a-radio value="重复">重复</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        v-if="form.checkStatus === '错误'"
        label="错误原因"
        name="falseReason"
        :rules="[{ required: true, message: '请输入错误原因' }]"
      >
        <a-textarea v-model:value="form.falseReason" :rows="4" placeholder="请输入错误原因" />
      </a-form-item>
      <a-form-item
        v-else
        label="备注"
        name="checkRemark"
        :rules="[{ required: false, message: '请输入备注' }]"
      >
        <a-textarea v-model:value="form.checkRemark" :rows="4" placeholder="请输入备注" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
  import type { FormInstance } from 'ant-design-vue';
  import { message } from 'ant-design-vue';
  import type { MappingTempItem } from '/@/api/marketData/model';
  import { useMarketDataStoreWithOut } from '/@/store/modules/marketData';

  const props = defineProps<{
    record?: MappingTempItem | null;
  }>();

  const open = defineModel<boolean>('open', { default: false });
  const emits = defineEmits<{ (e: 'success'): void }>();

  const marketDataStore = useMarketDataStoreWithOut();
  const formRef = ref<FormInstance>();
  const submitting = ref(false);
  const form = reactive({
    checkStatus: '正确',
    checkRemark: '',
    falseReason: '',
  });

  const resetForm = () => {
    form.checkStatus = '正确';
    form.checkRemark = '';
    form.falseReason = '';
    formRef.value?.clearValidate();
  };

  const handleClose = () => {
    open.value = false;
    resetForm();
  };

  watch(
    () => open.value,
    (val) => {
      if (!val) {
        resetForm();
        return;
      }
      form.checkStatus = (props.record?.checkStatus as any) || '正确';
      if (form.checkStatus !== '正确' && form.checkStatus !== '错误' && form.checkStatus !== '重复') {
        form.checkStatus = '正确';
      }
      form.checkRemark = props.record?.checkRemark || '';
      form.falseReason = props.record?.falseReason || '';
    },
  );

  watch(
    () => form.checkStatus,
    () => {
      formRef.value?.clearValidate();
    },
  );

  const handleSubmit = async () => {
    if (!props.record?.id) {
      message.error('未获取到核对数据');
      return;
    }
    await formRef.value?.validate();
    submitting.value = true;
    try {
      const res = await marketDataStore.updateCheckMappingTemp({
        id: props.record.id?.toString(),
        checkStatus: form.checkStatus,
        checkRemark: form.checkStatus === '错误' ? '' : form.checkRemark,
        falseReason: form.checkStatus === '错误' ? form.falseReason : '',
      });
      if (res?.code === 1) {
        message.success('核对成功');
        emits('success');
        handleClose();
        return;
      }
      message.error(res?.msg || '核对失败');
    } finally {
      submitting.value = false;
    }
  };
</script>

