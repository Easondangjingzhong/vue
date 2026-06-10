<template>
  <a-modal
    v-model:open="open"
    title="新增"
    :maskClosable="false"
    :confirm-loading="submitting"
    @ok="handleSubmit"
    @cancel="handleClose"
    width="800px"
  >
    <a-form ref="formRef" :model="form">
      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-item label="类别" name="type" :rules="[{ required: true, message: '请选择类别' }]">
            <a-select v-model:value="form.type" placeholder="请选择类别" :options="typeOptions" allowClear />
          </a-form-item>
          <a-form-item label="城市" name="city" :rules="[{ required: true, message: '请选择城市' }]">
            <a-select
              v-model:value="form.city"
              placeholder="请选择城市"
              :options="getProvince"
              optionFilterProp="label"
              showSearch
              allowClear
              @change="handleCityChange"
            />
          </a-form-item>
          <a-form-item label="商场" name="marketId" :rules="[{ required: true, message: '请选择商场' }]">
            <a-select
              v-model:value="form.marketId"
              placeholder="请选择商场"
              :options="getMarkList"
              optionFilterProp="label"
              showSearch
              allowClear
              @change="handleMarketChange"
            />
          </a-form-item>
          <a-form-item label="总机" name="cid">
            <a-input v-model:value="form.cid" placeholder="选择商场自动填写" />
          </a-form-item>
          <a-form-item label="品牌" name="brandId" :rules="[{ required: true, message: '请选择品牌' }]">
            <a-select
              v-model:value="form.brandId"
              placeholder="请选择品牌"
              :options="getBrandList"
              optionFilterProp="label"
              showSearch
              allowClear
            />
          </a-form-item>
          <a-form-item label="年龄" name="age">
            <a-input v-model:value="form.age" placeholder="请输入年龄" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item name="phoneNum" label="手机" :rules="phoneRules">
            <a-input v-model:value="form.phoneNum" placeholder="请输入手机号码" />
          </a-form-item>
          <a-form-item label="职位" name="positionName" :rules="[{ required: true, message: '请输入职位' }]">
            <a-input v-model:value="form.positionName" placeholder="请输入职位" />
          </a-form-item>
          <a-form-item label="性别" name="sex">
            <a-radio-group v-model:value="form.sex">
              <a-radio value="男">男</a-radio>
              <a-radio value="女">女</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="职位状态" name="jobStatus" :rules="[{ required: true, message: '请选择职位状态' }]">
            <a-select v-model:value="form.jobStatus" placeholder="请选择职位状态" :options="jobStatusOptions" allowClear />
          </a-form-item>
          <a-form-item label="中文姓名" name="userNameCn">
            <a-input v-model:value="userNameCn" placeholder="中文" />
          </a-form-item>
          <a-form-item label="英文姓名" name="userNameEn">
            <a-input v-model:value="userNameEn" placeholder="英文" />
          </a-form-item>
          <div class="name-tip">注:(中文和英文至少填一个)</div>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import type { FormInstance } from 'ant-design-vue';
import { message } from 'ant-design-vue';
import type { RuleObject } from 'ant-design-vue/es/form/interface';
import { MappingTempItem } from '/@/api/marketData/model';
import { useMarketDataStoreWithOut } from '/@/store/modules/marketData';

const open = defineModel<boolean>('open', { default: false });
const emits = defineEmits<{ (e: 'success'): void }>();

const marketDataStore = useMarketDataStoreWithOut();
const { getProvince, getMarkList, getBrandList } = storeToRefs(marketDataStore);

const formRef = ref<FormInstance>();
const submitting = ref(false);

const typeOptions = [
  { label: '店铺', value: '店铺' },
  { label: 'OFFICE', value: 'OFFICE' },
  { label: '非零售', value: '非零售' },
  { label: '酒店', value: '酒店' },
];

const jobStatusOptions = [
  { label: '在职', value: '在职' },
  { label: '离职', value: '离职' },
];

const form = reactive<MappingTempItem>({
  type: '',
  city: '',
  marketId: '',
  brandId: '',
  phoneNum: '',
  sex: '',
  jobStatus: '',
  positionName: '',
  age: '',
  cid: '',
});

const userNameCn = ref('');
const userNameEn = ref('');

const normalizePhoneNumber = (value: unknown) => String(value ?? '').replace(/[\s\-()]/g, '');

const isValidPhoneNumber = (value: unknown) => {
  const phone = normalizePhoneNumber(value);
  if (!phone) return false;
  if (/^1[3-9]\d{9}$/.test(phone)) return true;
  if (/^(?:\+?852|00852)?[569]\d{7}$/.test(phone)) return true;
  if (/^(?:\+?853|00853)?6\d{7}$/.test(phone)) return true;
  if (/^(?:\+?886|00886)?0?9\d{8}$/.test(phone)) return true;
  return false;
};

const validatePhoneNumber = async (_rule: RuleObject, value: string) => {
  if (!isValidPhoneNumber(value)) {
    return Promise.reject('手机号格式不正确');
  }
  return Promise.resolve();
};

const phoneRules: RuleObject[] = [
  { required: true, message: '请输入手机号码' },
  { validator: validatePhoneNumber, trigger: 'blur' },
];

const resetForm = () => {
  form.type = '';
  form.city = '';
  form.marketId = '';
  form.marketName = '';
  form.brandId = '';
  form.brandName = '';
  form.phoneNum = '';
  form.sex = '';
  form.jobStatus = '';
  form.positionName = '';
  form.positionId = '';
  form.age = '';
  form.cid = '';
  userNameCn.value = '';
  userNameEn.value = '';
};

const handleClose = () => {
  open.value = false;
  resetForm();
};

const handleCityChange = (value: string) => {
  form.marketId = '';
  form.marketName = '';
  form.brandId = '';
  form.brandName = '';
  marketDataStore.queryMarkList(value || '');
};

const handleMarketChange = (value: string) => {
  form.marketName = value || '';
  form.brandId = '';
  form.brandName = '';
  marketDataStore.queryMarkBrandFloor(value || '', '');
};

const handleSubmit = async () => {
  const finalUserName = (userNameCn.value || '').trim() || (userNameEn.value || '').trim();
  const normalizedPhone = normalizePhoneNumber(form.phoneNum);
  form.phoneNum = normalizedPhone;
  if (!form.type) return message.error('请选择类别');
  if (!form.city) return message.error('请选择城市');
  if (!form.marketId) return message.error('请选择商场');
  if (!form.brandId) return message.error('请选择品牌');
  if (!form.phoneNum) return message.error('请输入手机号码');
  if (!isValidPhoneNumber(form.phoneNum)) return message.error('手机号格式不正确');
  if (!form.jobStatus) return message.error('请选择职位状态');
  if (!finalUserName) return message.error('中文和英文至少填一个');

  submitting.value = true;
  try {
    await formRef.value?.validate?.();
    const payload: MappingTempItem = {
      ...form,
      userName: finalUserName,
      marketName: getMarkList.value.find((item) => item.value === form.marketId)?.label || '',
      brandName: form.brandName || String(form.brandId || ''),
    };
    const res = await marketDataStore.addMappingTemp(payload);
    if (res && (res.code === 1 || res.code === 2)) {
      message.success(res?.info || '新增成功');
      emits('success');
      handleClose();
      return;
    }
    message.error(res?.info || '新增失败');
  } finally {
    submitting.value = false;
  }
};
</script>

<style lang="less" scoped>
.name-tip {
  margin-top: -10px;
  color: #999;
}
</style>
