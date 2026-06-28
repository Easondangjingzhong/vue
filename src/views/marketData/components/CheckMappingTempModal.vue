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
        label="错误项"
        name="falseReasonList"
        :rules="[{ required: true, type: 'array', min: 1, message: '请选择错误项' }]"
      >
        <a-checkbox-group v-model:value="form.falseReasonList" class="false-reason-group">
          <a-row :gutter="[16, 12]">
            <a-col v-for="item in falseReasonOptions" :key="item.value" :span="12">
              <a-checkbox :value="item.value">{{ item.label }}</a-checkbox>
            </a-col>
          </a-row>
        </a-checkbox-group>
      </a-form-item>
      <a-form-item
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
    falseReasonList: [] as string[],
  });
  const falseReasonOptionSource = computed(() => [
    { key: 'city', title: '城市', content: props.record?.city || '' },
    { key: 'brand', title: '品牌', content: props.record?.brandName || '' },
    { key: 'market', title: '商场', content: props.record?.marketName || '' },
    { key: 'userName', title: '姓名', content: props.record?.userName || '' },
    { key: 'phoneNum', title: '电话', content: props.record?.phoneNum || '' },
    { key: 'position', title: '职位', content: props.record?.positionName || '' },
  ].filter((item) => item.content));
  const falseReasonOptions = computed(() =>
    falseReasonOptionSource.value.map((item) => ({
      label: `${item.title}: ${item.content}`,
      value: item.key,
    })),
  );

  const resetForm = () => {
    form.checkStatus = '正确';
    form.checkRemark = '';
    form.falseReason = '';
    form.falseReasonList = [];
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
      const falseReasonItems = form.falseReason
        ? form.falseReason.split('&').map((item) => item.trim()).filter(Boolean)
        : [];
      form.falseReasonList = falseReasonOptionSource.value
        .filter((item) =>
          falseReasonItems.includes(item.key) ||
          falseReasonItems.includes(item.content) ||
          falseReasonItems.includes(`${item.title}: ${item.content}`),
        )
        .map((item) => item.key);
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
      const falseReason = form.checkStatus === '错误'
        ? falseReasonOptionSource.value
            .filter((item) => form.falseReasonList.includes(item.key))
            .map((item) => `${item.title}: ${item.content}`)
            .join('&')
        : '';
      const res = await marketDataStore.updateCheckMappingTemp({
        id: props.record.id?.toString(),
        checkStatus: form.checkStatus,
        checkRemark: form.checkRemark,
        falseReason,
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

<style scoped lang="less">
  .false-reason-group {
    width: 100%;
  }
  .false-reason-group :deep(.ant-checkbox-wrapper) {
    display: flex;
    align-items: flex-start;
    width: 100%;
    margin-inline-start: 0;
    text-align: left;
  }
</style>
