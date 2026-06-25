<template>
  <a-modal
    v-model:open="open"
    title="新增商场品牌信息"
    :maskClosable="false"
    @ok="handleSubmit"
    @cancel="handleClose"
    width="520px"
  >
    <a-form ref="formRef" :model="form" :label-col="{ span: 2 }" :wrapper-col="{ span: 20 }">
      <a-form-item label="城市" name="cId" :rules="[{ required: true, message: '请选择城市' }]">
        <div class="row_inline">
          <a-select
            v-model:value="form.cId"
            placeholder="请选择城市"
            :options="getCity"
            optionFilterProp="label"
            showSearch
            allowClear
            @change="handleCityChange"
            class="main_control"
          />
          <span class="suffix_placeholder">占位</span>
        </div>
      </a-form-item>
      <a-form-item label="商场" name="mId" :rules="[{ required: true, message: '请选择商场' }]">
        <div class="row_inline">
          <a-select
            v-model:value="form.mId"
            placeholder="请选择商场"
            :options="getMarkList"
            optionFilterProp="label"
            showSearch
            allowClear
            class="main_control"
          />
          <span class="suffix_placeholder">占位</span>
        </div>
      </a-form-item>
      <a-form-item label="品牌" name="bId" :rules="[{ required: true, message: '请选择品牌' }]">
        <div class="row_inline">
          <a-select
            v-model:value="form.bId"
            placeholder="请选择品牌"
            :options="getBrandList"
            optionFilterProp="label"
            showSearch
            allowClear
            class="main_control"
          />
          <a-checkbox v-model:checked="form.isChe" class="suffix_control">撤店</a-checkbox>
        </div>
      </a-form-item>
      <a-form-item label="楼层" name="floor" :rules="[{ required: true, message: '请选择楼层' }]">
        <div class="row_inline">
          <a-select
            v-model:value="form.floor"
            placeholder="请选择楼层"
            :options="floorOptions"
            allowClear
            class="main_control"
          />
          <span class="suffix_placeholder">占位</span>
        </div>
      </a-form-item>
      <a-form-item label="电话" name="phoneBrand">
        <div class="row_inline">
          <a-input
            v-model:value="form.phoneBrand"
            placeholder="请输入电话"
            :disabled="form.noPhone"
            class="main_control"
          />
          <a-checkbox v-model:checked="form.noPhone" class="suffix_control">无电话</a-checkbox>
        </div>
      </a-form-item>
      <a-alert
        type="warning"
        show-icon
        message="提示：您此次新增的品牌将成为公司商场信息系统模板，公司所有同事将共同使用此条品牌数据，请认真核对后增加！请慎重增加！"
      />
    </a-form>
    <template #footer>
      <a-button type="primary" @click="handleSubmit">保存</a-button>
    </template>
  </a-modal>
</template>

<script setup lang="ts">
  import type { FormInstance } from 'ant-design-vue';
  import { message } from 'ant-design-vue';
  import { storeToRefs } from 'pinia';
  import { useMarketDataStoreWithOut } from '/@/store/modules/marketData';

  const open = defineModel<boolean>('open', { default: false });

  const marketDataStore = useMarketDataStoreWithOut();
  const { getCity, getMarkList, getBrandList } = storeToRefs(marketDataStore);

  const formRef = ref<FormInstance>();
  const form = reactive({
    cId: '',
    cityName: '',
    mId: '',
    bId: '',
    floor: '',
    isChe: false,
    phoneBrand: '',
    noPhone: false,
  });

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

  const resetForm = () => {
    form.cId = '';
    form.cityName = '';
    form.mId = '';
    form.bId = '';
    form.floor = '';
    form.isChe = false;
    form.phoneBrand = '';
    form.noPhone = false;
    formRef.value?.clearValidate();
  };

  const handleClose = () => {
    open.value = false;
    resetForm();
  };

  const handleCityChange = (value: string) => {
    form.cId = value || '';
    const city = getCity.value?.find((item) => item.value === value);
    form.cityName = city?.label || '';
    form.mId = '';
    marketDataStore.queryMarkList(city?.label || '');
  };

  watch(
    () => form.noPhone,
    (val) => {
      if (val) {
        form.phoneBrand = '';
      }
    },
  );

  watch(
    () => open.value,
    async (val) => {
      if (!val) {
        resetForm();
        return;
      }
      if (!getCity.value?.length) {
        await marketDataStore.queryProvince();
      }
      if (!getBrandList.value?.length) {
        await marketDataStore.queryBrandList();
      }
    },
  );

  const handleSubmit = async () => {
    await formRef.value?.validate();
    if (!String(form.phoneBrand || '').trim() && !form.noPhone) {
      message.error('未填写电话时必须勾选无电话');
      return;
    }
    const payload = {
      ...form,
      isChe: form.isChe ? 1 : 0,
    };
    await marketDataStore.addMarketBrandCheck(payload).then((res) => {
      if (res.code === 1) {
        marketDataStore.addMarketBrand(payload).then((res) => {
          if (res.code === 1) {
            message.success('新增成功');
            handleClose();
          } else if (res.code === 4) {
            message.success('当前品牌正在审核中');
            handleClose();
          } else if (res.code === 5) {
            handleClose();
            message.error('当前品牌已存在');
          } else if (res.code === 6) {
            handleClose();
            message.success('添加成功,需等待审核');
          } else {
            message.error('新增失败');
          }
        });
      }
    });
  };
</script>

<style scoped lang="less">
  .row_inline {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .main_control {
    flex: 1 1 auto;
    min-width: 0;
  }
  .suffix_control,
  .suffix_placeholder {
    flex: 0 0 72px;
    white-space: nowrap;
  }
  .suffix_placeholder {
    visibility: hidden;
  }
</style>
