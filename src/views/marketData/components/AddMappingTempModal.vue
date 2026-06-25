<template>
  <a-modal
    v-model:open="open"
    title="新增人才"
    :maskClosable="false"
    :confirm-loading="submitting"
    @cancel="handleClose"
    :footer="null"
    width="800px"
  >
    <a-form ref="formRef" :model="form" :label-col="labelCol">
      <a-row :gutter="24">
        <!-- <a-col :span="12">
          <a-form-item name="phoneNum" label="手机" :rules="phoneRules">
            <a-input-search v-model:value="form.phoneNum" placeholder="请输入手机号码" @search="handlePhoneCheck">
              <template #enterButton>
                <a-button type="primary">查询</a-button>
              </template>
            </a-input-search>
          </a-form-item>
        </a-col> -->
        <a-col :span="12">
          <a-form-item label="类别" name="type" :rules="[{ required: true, message: '请选择类别' }]">
            <a-space v-if="form.type === '简'">
              <a-select
                v-model:value="form.type"
                placeholder="请选择类别"
                :options="typeOptions"
                allowClear
                style="width: 223px"
              />
              <a-form-item-rest>
                <a-space>
                  <a-upload
                    v-model:file-list="simpleFileList"
                    :max-count="1"
                    :before-upload="() => false"
                    :show-upload-list="false"
                    :disabled="resumeUploadStatus === 'uploading'"
                    @change="handleSimpleFileChange"
                  >
                    <a-button :loading="resumeUploadStatus === 'uploading'">
                      {{ resumeUploadStatus === 'uploading' ? '上传中' : '简历上传' }}
                    </a-button>
                  </a-upload>
                  <!-- <span v-if="resumeUploadStatus === 'done'">上传完成</span> -->
                </a-space>
              </a-form-item-rest>
            </a-space>
            <a-select
              v-else
              v-model:value="form.type"
              placeholder="请选择类别"
              :options="typeOptions"
              allowClear
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-item label="姓名" name="userName" :rules="[{ required: true, message: '请输入姓名' }]">
            <a-input v-model:value="form.userName" placeholder="姓名" />
          </a-form-item>
        </a-col>
         <a-col :span="12">
          <a-form-item name="phoneNum" label="手机" :rules="phoneRules">
            <a-input v-model:value="form.phoneNum" placeholder="请输入手机号码" :rules="phoneRules"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="12">
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
        </a-col>
         <a-col :span="12">
            <a-form-item label="性别" name="sex">
            <a-radio-group v-model:value="form.sex">
              <a-radio value="男">男</a-radio>
              <a-radio value="女">女</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="12">
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
        </a-col>
         <a-col :span="12">
          <a-form-item label="年龄" name="age">
            <a-input v-model:value="form.age" placeholder="请输入年龄" />
          </a-form-item>
        </a-col>
      </a-row>
       <a-row :gutter="24">
        <a-col :span="12">
          <a-form-item label="品牌" name="brandId" :rules="[{ required: true, message: '请选择品牌' }]">
            <a-select
              v-model:value="form.brandId"
              placeholder="请选择品牌"
              :options="getBrandList"
              optionFilterProp="label"
              @change="handleBrandChange"
              showSearch
              allowClear
            />
          </a-form-item>
        </a-col>
         <a-col :span="12">
            <a-form-item label="职位状态" name="jobStatus" :rules="[{ required: true, message: '请选择职位状态' }]">
            <a-select v-model:value="form.jobStatus" placeholder="请选择职位状态" :options="jobStatusOptions" allowClear />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-item label="楼层" name="floor" :rules="[{ required: true, message: '请选择楼层' }]">
            <a-select v-model:value="form.floor" placeholder="请选择楼层" disabled :options="floorOptions" allowClear />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="职位" name="positionId" :rules="[{ required: true, message: '请选择职位' }]">
            <a-select v-model:value="form.positionId" placeholder="请选择职位"
              showSearch :options="getPositionsList" allowClear />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <MarketBrandLinkPanel
      v-if="brandLinkPanelVisible"
      :city="form.city || ''"
      :market-name="form.marketName || ''"
      :brand-name="form.brandName || ''"
      v-model:floor="brandLinkFloor"
      :floor-options="floorOptions"
      :linked="brandLinkLinked"
      :loading="brandLinking"
      @link="handleLinkBrand"
      @revoke="handleRevokeLinkBrand"
    />
    <div v-if="phoneCheckMessage" :class="['check-result-message', `check-result-message--${phoneCheckStatus}`]">
      <span class="check-result-icon">!</span>
      <span class="check-result-text">提示：{{ phoneCheckMessage }}</span>
    </div>
    <div v-if="phoneCheckCanSubmit" class="modal-footer-actions">
      <a-space>
        <a-button @click="handleClose">取消</a-button>
        <a-button type="primary" :loading="submitting" @click="handleSubmit">提交</a-button>
      </a-space>
    </div>
    <div v-else class="modal-footer-actions">
      <a-button type="primary" :loading="phoneChecking" @click="handlePhoneCheck">查重</a-button>
    </div>
    <MappingTempDuplicateList :data="duplicateRecords" />
  </a-modal>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import type { FormInstance } from 'ant-design-vue';
import { message } from 'ant-design-vue';
import type { RuleObject } from 'ant-design-vue/es/form/interface';
import { MappingTempItem } from '/@/api/marketData/model';
import { useMarketDataStoreWithOut } from '/@/store/modules/marketData';
import MappingTempDuplicateList from './MappingTempDuplicateList.vue';
import MarketBrandLinkPanel from './MarketBrandLinkPanel.vue';
import { nextTick } from 'vue';

const open = defineModel<boolean>('open', { default: false });
const emits = defineEmits<{ (e: 'success'): void }>();

type PhoneCheckRecord = Partial<MappingTempItem> & {
  phone?: string;
  mId?: string | number;
  bId?: string | number;
  addTime?: string | number;
};

const marketDataStore = useMarketDataStoreWithOut();
const { getProvince, getCity, getMarkList, getBrandList, getPositionsList } = storeToRefs(marketDataStore);

const jobStatusValueMap: Record<string, string> = {
  在职: '1',
  离职: '2',
};

const fillFormByPhoneRecord = async (record: PhoneCheckRecord) => {
  const city = record.city || '';
  const marketId = record.marketId || record.mId || '';
  const brandId = record.brandId || record.bId || '';
  const marketName = record.marketName || '';
  const brandName = record.brandName || '';

  form.isRepeat = '1';
  form.userName = record.userName || '';
  form.phoneNum = record.phoneNum || record.phone || form.phoneNum || '';
  form.city = city;
  form.sex = record.sex || '';
  form.age = record.age || '';
  form.jobStatus = jobStatusValueMap[record.jobStatus || ''] || record.jobStatus || '';

  if (city) {
    await marketDataStore.queryMarketMapping({ city, marketName, curPage: 1 });
  }

  const matchedMarket =
    getMarkList.value.find((item) => String(item.value) === String(marketId)) ||
    getMarkList.value.find((item) => item.label === marketName);
  form.marketId = matchedMarket?.value || marketId;
  form.marketName = matchedMarket?.label || marketName;

  if (form.marketId) {
    await marketDataStore.queryMarkBrandFloor(String(form.marketId), '');
  }

  const matchedBrand =
    getBrandList.value.find((item) => String(item.value) === String(brandId)) ||
    getBrandList.value.find((item) => item.label === brandName);
  form.brandId = matchedBrand?.value || brandId;
  form.brandName = matchedBrand?.label || brandName;

  if (form.marketId && form.brandId) {
    const brandRes = await marketDataStore.checkCandidateMarketBrand({
      marketId: form.marketId,
      brandId: form.brandId,
    });
    form.floor = brandRes?.info?.[0]?.floor || record.floor || '';
    return;
  }

  form.floor = record.floor || '';
};

const handlePhoneCheck = async () => {
  const normalizedPhone = normalizePhoneNumber(form.phoneNum);
  form.phoneNum = normalizedPhone;
  if (!form.phoneNum) return message.error('请输入手机号码');
  if (!isValidPhoneNumber(form.phoneNum)) return message.error('手机号格式不正确');
  phoneChecking.value = true;
  try {
    const res = await marketDataStore.checkMappingTempPhone({
      phoneNum: form.phoneNum,
      userName: form.userName,
      bId: form.brandId,
      mId: form.marketId,
      city: form.city,
    });
    if (res.code === 1) {
      await withPhoneCheckSync(async () => {
        phoneCheckPassed.value = true;
        phoneCheckStatus.value = 'success';
        phoneCheckMessage.value = '恭喜您，此候选人与系统数据不重复，请点击提交按钮继续新增';
        duplicateRecords.value = [];
      });
      return;
    } else if (res.code === 2) {
      await withPhoneCheckSync(async () => {
        form.isRepeat = '1';
        phoneCheckPassed.value = true;
        phoneCheckStatus.value = 'error';
        //phoneCheckMessage.value = '您新增的候选人已经存在系统中，无法新增哦';
        phoneCheckMessage.value = '您新增的候选人已经存在系统中';
        duplicateRecords.value = normalizeDuplicateRecords(res.info);
      });
      return;
    } else if (res.code === 3) {
      await withPhoneCheckSync(async () => {
        form.checkStatus = '存疑';
        phoneCheckPassed.value = true;
        phoneCheckStatus.value = 'warning';
        phoneCheckMessage.value = '您新增的候选人与系统中以下数据有重复的可能，顾问核对时会再一次确认是否重复。';
        duplicateRecords.value = normalizeDuplicateRecords(res.info);
      });
      return;
    } else if (res.code === 4) {
      await withPhoneCheckSync(async () => {
        phoneCheckPassed.value = false;
        phoneCheckStatus.value = 'warning';
        phoneCheckMessage.value = '您新增的候选人已经录入过,不能重复录入。';
      });
      return;
    } else {
      message.error(res.msg || '查重失败');
    }
    resetPhoneCheckState();
  } finally {
    phoneChecking.value = false;
  }
};

const formRef = ref<FormInstance>();
const submitting = ref(false);
const labelCol = { style: { width: '70px' } };
const simpleFileList = ref<any[]>([]);
const simpleFile = ref<File | null>(null);
const resumeUploadStatus = ref<'idle' | 'uploading' | 'done'>('idle');
const phoneChecking = ref(false);
const phoneCheckPassed = ref(false);
const phoneCheckMessage = ref('');
const phoneCheckStatus = ref<'success' | 'error' | 'warning'>('success');
const phoneCheckCanSubmit = computed(() => phoneCheckPassed.value);
const duplicateRecords = ref<PhoneCheckRecord[]>([]);
const syncingPhoneCheckResult = ref(false);
const brandLinkPanelVisible = ref(false);
const brandLinkLinked = ref(false);
const brandLinking = ref(false);
const brandLinkFloor = ref('');

const withPhoneCheckSync = async (callback: () => void | Promise<void>) => {
  syncingPhoneCheckResult.value = true;
  try {
    await callback();
    await nextTick();
  } finally {
    syncingPhoneCheckResult.value = false;
  }
};

const normalizeDuplicateRecords = (info: unknown): PhoneCheckRecord[] => {
  if (Array.isArray(info)) return info as PhoneCheckRecord[];
  if (info && typeof info === 'object' && Array.isArray((info as { list?: unknown[] }).list)) {
    return (info as { list: PhoneCheckRecord[] }).list;
  }
  return [];
};

const typeOptions = [
  { label: '简', value: '简' },
  { label: 'M', value: 'M' },
];
const floorOptions = [
    { label: '1层', value: '1层' },
    { label: '2层', value: '2层' },
    { label: '3层', value: '3层' },
    { label: '4层', value: '4层' },
    { label: '5层', value: '5层' },
    { label: '6层', value: '6层' },
    { label: '7层', value: '7层' },
    { label: '8层', value: '8层' },
    { label: '9层', value: '9层' },
    { label: 'B1', value: 'B1' },
    { label: 'B2', value: 'B2' },
    { label: 'OFFICE', value: 'OFFICE' },
  ];
const jobStatusOptions = [
  { label: '在职', value: '1' },
  { label: '离职', value: '2' },
];

const form = reactive<MappingTempItem>({
  type: '',
  userName: '',
  resumePath: '',
  city: '',
  floor: '',
  positionId: '',
  marketId: '',
  brandId: '',
  phoneNum: '',
  sex: '',
  jobStatus: '',
  positionName: '',
  age: '',
  cid: '',
  isRepeat: '',
  checkStatus: '',
});

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
  form.userName = '';
  form.resumePath = '';
  form.city = '';
  form.marketId = '';
  form.marketName = '';
  form.brandId = '';
  form.brandName = '';
  form.phoneNum = '';
  form.sex = '';
  form.floor = '';
  form.positionId = '';
  form.jobStatus = '';
  form.positionName = '';
  form.positionId = '';
  form.age = '';
  form.cid = '';
  form.isRepeat = '';
  form.checkStatus = '';
  simpleFileList.value = [];
  simpleFile.value = null;
  resumeUploadStatus.value = 'idle';
  phoneCheckPassed.value = false;
  phoneCheckMessage.value = '';
  resetBrandLinkPanel();
};

const handleSimpleFileChange = async (info: any) => {
  simpleFileList.value = (info?.fileList || []).slice(-1);
  const candidateFile = info?.file?.originFileObj || simpleFileList.value[0]?.originFileObj || null;
  simpleFile.value = candidateFile instanceof File ? candidateFile : null;
  if (form.type === '简') {
    if (!simpleFile.value) {
      message.error('请先选择有效文件');
      return;
    }
    const file = simpleFile.value;
    resumeUploadStatus.value = 'uploading';
    try {
      const sdkRes = await marketDataStore.queryResumeSDK({ fname: file.name, file });
      if (sdkRes.code !== 1) {
        message.error('简历解析失败');
        resumeUploadStatus.value = 'idle';
        return;
      }
      message.success('简历解析成功');
      const { result } = JSON.parse(sdkRes.info);
      form.userName = result?.name || '';
      form.phoneNum = result?.phone || '';
      form.sex = result?.gender || '';
      form.age = result?.age ? result?.age : result?.age_inf || '';
      form.jobStatus = result?.work_status || '';
      form.city = result?.city?.replace(/\s/g, '') || '';
      if (form.city) {
        handleCityChange(form.city);
      }
      const pathRes = await marketDataStore.queryResumeFileBackPath({ file });
      if (pathRes.code === 1) {
        form.resumePath = pathRes.info || '';
      }
      resumeUploadStatus.value = 'done';
    } catch {
      resumeUploadStatus.value = 'idle';
      message.error('简历解析失败');
    }
  }
};

const resetPhoneCheckState = () => {
  phoneCheckPassed.value = false;
  phoneCheckMessage.value = '';
  phoneCheckStatus.value = 'success';
  duplicateRecords.value = [];
  form.isRepeat = '';
  form.checkStatus = '';
};

const resetBrandLinkPanel = () => {
  brandLinkPanelVisible.value = false;
  brandLinkLinked.value = false;
  brandLinking.value = false;
  brandLinkFloor.value = '';
};

watch(
  () => form.type,
  (value) => {
    if (value !== '简') {
      simpleFileList.value = [];
      simpleFile.value = null;
      resumeUploadStatus.value = 'idle';
    }
    resetPhoneCheckState();
  },
);

watch(
  () => open.value,
  (value) => {
    if (!value) {
      resumeUploadStatus.value = 'idle';
    }
  },
);

watch(
  form,
  () => {
    if (syncingPhoneCheckResult.value) return;
    resetPhoneCheckState();
  },
  { deep: true },
);

const handleClose = () => {
  open.value = false;
  resetForm();
};

const handleCityChange = (value: string) => {
  form.marketId = '';
  form.marketName = '';
  form.brandId = '';
  form.brandName = '';
  form.floor = '';
  resetBrandLinkPanel();
  marketDataStore.queryMarketMapping({ city: value || '', curPage: 1 });
};

const handleMarketChange = (value: string) => {
  const selectedMarket = getMarkList.value.find((item) => String(item.value) === String(value));
  form.marketName = selectedMarket?.label || '';
  form.brandId = '';
  form.brandName = '';
  form.floor = '';
  resetBrandLinkPanel();
  marketDataStore.queryMarkBrandFloor(value || '', '');
};

const handleBrandChange = (value: string) => {
  const selectedBrand = getBrandList.value.find((item) => String(item.value) === String(value));
  form.brandName = selectedBrand?.label || '';
  form.floor = '';
  resetBrandLinkPanel();
  marketDataStore.checkCandidateMarketBrand({ marketId: form.marketId, brandId: form.brandId }).then((res) => {
    if (res.code === 1) {
      const result = res?.info?.[0];
      form.floor = result?.floor || '';
    } else {
      form.floor = '';
      brandLinkPanelVisible.value = true;
      brandLinkLinked.value = false;
    }
  });
};

const handleLinkBrand = async () => {
  if (!form.city) return message.error('请选择城市');
  if (!form.marketId) return message.error('请选择商场');
  if (!form.brandId) return message.error('请选择品牌');
  if (!brandLinkFloor.value) return message.error('请选择楼层');

  const cityItem = getCity.value?.find((item) => item.label === form.city);
  const payload = {
    cId: cityItem?.value || '',
    cityName: form.city,
    mId: form.marketId,
    bId: form.brandId,
    floor: brandLinkFloor.value,
    isChe: 0,
    phoneBrand: '',
  };

  brandLinking.value = true;
  try {
    const checkRes = await marketDataStore.addMarketBrandCheck(payload);
    if (checkRes?.code !== 1) {
      message.error(checkRes?.info || '关联失败');
      return;
    }
    const linkRes = await marketDataStore.addMarketBrand(payload);
    if (linkRes?.code === 1) {
      message.success('关联成功');
      form.floor = brandLinkFloor.value;
      brandLinkPanelVisible.value = true;
      brandLinkLinked.value = true;
      return;
    }
    if (linkRes?.code === 4) {
      message.success('当前品牌正在审核中');
      form.floor = brandLinkFloor.value;
      brandLinkPanelVisible.value = true;
      brandLinkLinked.value = true;
      return;
    }
    if (linkRes?.code === 5) {
      message.error('当前品牌已存在');
      form.floor = brandLinkFloor.value;
      brandLinkPanelVisible.value = true;
      brandLinkLinked.value = true;
      return;
    }
    if (linkRes?.code === 6) {
      message.success('添加成功,需等待审核');
      form.floor = brandLinkFloor.value;
      brandLinkPanelVisible.value = true;
      brandLinkLinked.value = true;
      return;
    }
    message.error(linkRes?.info || '关联失败');
  } finally {
    brandLinking.value = false;
  }
};

const handleRevokeLinkBrand = async () => {
  const payload = {
    mId: form.marketId,
    bId: form.brandId,
    floor: brandLinkFloor.value,
  };
  brandLinkLinked.value = false;
  form.floor = '';
  brandLinkFloor.value = '';
  const res = await marketDataStore.cancelMarketBrand(payload);
  if (res?.code === 1) {
    message.success('已撤销');
  }
};

const handleSubmit = async () => {
  form.userName = (form.userName || '').trim();
  const normalizedPhone = normalizePhoneNumber(form.phoneNum);
  form.phoneNum = normalizedPhone;
  if (!form.type) return message.error('请选择类别');
  if (!form.city) return message.error('请选择城市');
  if (!form.marketId) return message.error('请选择商场');
  if (!form.brandId) return message.error('请选择品牌');
  if (!form.phoneNum) return message.error('请输入手机号码');
  if (!isValidPhoneNumber(form.phoneNum)) return message.error('手机号格式不正确');
  if (!form.jobStatus) return message.error('请选择职位状态');
  if (!form.userName) return message.error('请输入姓名');

  submitting.value = true;
  try {
    await formRef.value?.validate?.();
    const payload: MappingTempItem = {
      ...form,
      marketName: getMarkList.value.find((item) => item.value === form.marketId)?.label || '',
      brandName: getBrandList.value.find((item) => item.value === form.brandId)?.label || '',
      positionName: getPositionsList.value.find((item) => item.value === form.positionId)?.label || '',
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
.modal-footer-actions {
  display: flex;
  justify-content: center;
  margin-top: 8px;
}

.check-result-message {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 16px;
  border: 1px solid #f3d37a;
  background: #fff7e6;
}

.check-result-icon {
  display: inline-flex;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  margin-top: 4px;
  border-radius: 50%;
  font-size: 12px;
  font-weight: 700;
  flex: 0 0 18px;
}

.check-result-text {
  flex: 1;
  text-align: left;
}

.check-result-message--success {
  border: 1px solid #b7eb8f;
  background: #f6ffed;
  color: #389e0d;
}

.check-result-message--success .check-result-icon {
  background: #52c41a;
  color: #fff;
}

.check-result-message--error {
  border: 1px solid #ffccc7;
  background: #fff2f0;
  color: #cf1322;
}

.check-result-message--error .check-result-icon {
  background: #ff4d4f;
  color: #fff;
}

.check-result-message--warning {
  border: 1px solid #ffd591;
  background: #fff7e6;
  color: #d46b08;
}

.check-result-message--warning .check-result-icon {
  background: #fa8c16;
  color: #fff;
}
</style>
