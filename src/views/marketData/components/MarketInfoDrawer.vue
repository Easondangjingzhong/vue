<template>
  <a-drawer
    v-model:open="drawerOpen"
    title="商场信息"
    placement="right"
    width="1180"
    :closable="false"
    :destroyOnClose="true"
    :bodyStyle="{ padding: '4px 14px' }"
    :headerStyle="{ padding: '5px 18px 5px 12px' }"
  >
  <template #extra>
    <CloseOutlined @click="drawerOpen = false" />
  </template>
    <a-form :model="formStateMarketRightList" @finish="handleMarketRightSearch">
      <a-row :gutter="24">
        <a-col :span="4">
          <a-form-item name="retail" label="行业">
            <a-select v-model:value="formStateMarketRightList.retail" search allowClear @change="handleChangeIndustry" :options="industryOptions" />
          </a-form-item>
        </a-col>
        <a-col :span="4">
          <a-form-item name="category" label="品类">
            <a-select v-model:value="formStateMarketRightList.category" showSearch allowClear :options="categoryOptions" />
          </a-form-item>
        </a-col>
         <a-col :span="4">
          <a-form-item name="brandLevel" label="品级">
            <a-select v-model:value="formStateMarketRightList.brandLevel" showSearch allowClear :options="brandLevelOptions" />
          </a-form-item>
        </a-col>
        <a-col :span="4">
          <a-form-item name="city" label="城市">
            <a-select v-model:value="formStateMarketRightList.city"  optionFilterProp="label"
              @change="handleCityChange" showSearch allowClear :options="getCity" />
          </a-form-item>
        </a-col>
        <a-col :span="4">
          <a-form-item name="market" label="商场">
            <a-select v-model:value="formStateMarketRightList.market" optionFilterProp="label" @change="handleMarketChange" showSearch allowClear :options="getMarkList" />
          </a-form-item>
        </a-col>
        <a-col :span="4">
          <a-form-item name="brand" label="品牌">
            <a-select v-model:value="formStateMarketRightList.brand" optionFilterProp="label" showSearch allowClear :options="getBrandList" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
         <a-col :span="4">
           <a-form-item name="marketLevel" label="商级">
            <a-select v-model:value="formStateMarketRightList.marketLevel" showSearch allowClear :options="marketLevelOptions" />
          </a-form-item>
        </a-col>
        <a-col :span="4">
          <a-form-item name="floor" label="楼层">
            <a-select v-model:value="formStateMarketRightList.floor" showSearch allowClear :options="floorListOptions" />
          </a-form-item>
        </a-col>
        <a-col :span="4">
          <a-form-item name="marketPhone" label="商电">
            <a-input v-model:value="formStateMarketRightList.marketPhone" allowClear />
          </a-form-item>
        </a-col>
        <a-col :span="4">
          <a-form-item name="brandPhone" label="品电">
            <a-input v-model:value="formStateMarketRightList.brandPhone" allowClear />
          </a-form-item>
        </a-col>
        <a-col :span="4" style="text-align: right;">
          <a-button type="primary" html-type="submit">搜索</a-button>
          <a-button style="margin-left: 8px" @click="clearMarketRightForm">清空</a-button>
        </a-col>
        <a-col :span="4" style="text-align: right;">
          <a-button style="margin-left: 8px" @click="addMarketCity">新增商场</a-button>
          <a-button style="margin-left: 8px" @click="addBrandNew">新增品牌</a-button>
        </a-col>
      </a-row>
    </a-form>
    <a-table
      size="small"
      :pagination="false"
      rowKey="key"
      :loading="marketRightLoading"
      :columns="marketRightColumns"
      :dataSource="getMarketRightList"
    ></a-table>
    <a-row style="justify-content: end; margin-top: 8px">
      <a-pagination
        v-model:current="pageMarketRightList.pageNum"
        :pageSize="pageMarketRightList.pageSize"
        @change="handleMarketRightPageChange"
        :total="pageMarketRightList.total"
        :showSizeChanger="false"
        :showQuickJumper="true"
        :hideOnSinglePage="true"
        size="small"
        :show-total="(total) => `共 ${total} 条`"
      >
        <template #itemRender="{ type, originalElement }">
          <a v-if="type === 'prev'">上一页</a>
          <a v-else-if="type === 'next'">下一页</a>
          <component :is="originalElement" v-else></component>
        </template>
      </a-pagination>
    </a-row>

    <a-modal
      v-model:open="addMarketCityOpen"
      title="新增商场"
      :maskClosable="false"
      :confirm-loading="addMarketCitySubmitting"
      @ok="handleAddMarketCitySubmit"
      @cancel="handleAddMarketCityClose"
    >
      <a-form ref="addMarketCityFormRef" :model="addMarketCityForm" layout="vertical">
        <a-form-item label="城市" name="cityName" :rules="[{ required: true, message: '请选择城市' }]">
          <a-select
            v-model:value="addMarketCityForm.cityName"
            :options="cityNameOptions"
            optionFilterProp="label"
            showSearch
            allowClear
          />
        </a-form-item>
        <a-form-item label="商场名字" name="marketName" :rules="[{ required: true, message: '请输入商场名字' }]">
          <a-input v-model:value="addMarketCityForm.marketName" allowClear />
        </a-form-item>
        <a-form-item label="电话" name="telPhone" :rules="[{ required: true, message: '请输入电话' }]">
          <a-input v-model:value="addMarketCityForm.telPhone" allowClear />
        </a-form-item>
      </a-form>
      <a-alert
        class="add-market-city-tip"
        style="margin-top: 12px"
        type="warning"
        show-icon
        message="注：提交后需要联系管理员审核"
        description="此商场总机一定要亲自拨打确认正确后才可以提交录入系统！"
      />
    </a-modal>

    <a-modal
      v-model:open="addBrandNewOpen"
      title="新增品牌"
      :maskClosable="false"
      :confirm-loading="addBrandNewSubmitting"
      @ok="handleAddBrandNewSubmit"
      @cancel="handleAddBrandNewClose"
    >
      <a-form ref="addBrandNewFormRef" :model="addBrandNewForm" layout="vertical">
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="行业" name="retail" :rules="[{ required: true, message: '请选择行业' }]">
              <a-select
                v-model:value="addBrandNewForm.retail"
                :options="industryOptions"
                optionFilterProp="label"
                showSearch
                allowClear
                @change="handleAddBrandNewRetailChange"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="品牌级别" name="retailLevel" :rules="[{ required: true, message: '请选择品牌级别' }]">
              <a-select
                v-model:value="addBrandNewForm.retailLevel"
                :options="pinjibieArr"
                optionFilterProp="label"
                showSearch
                allowClear
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="品类" name="category" :rules="[{ required: true, message: '请选择品类' }]">
              <a-select
                v-model:value="addBrandNewForm.category"
                :options="addBrandNewCategoryOptions"
                optionFilterProp="label"
                showSearch
                allowClear
                @change="handleAddBrandNewCategoryChange"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="类别" name="leibie" :rules="[{ required: true, message: '请选择类别' }]">
              <a-select
                v-model:value="addBrandNewForm.leibie"
                :options="addBrandNewLeibieOptions"
                optionFilterProp="label"
                showSearch
                allowClear
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="中文品牌" name="cnName" :rules="[{ required: true, message: '请输入中文品牌' }]">
              <a-input v-model:value="addBrandNewForm.cnName" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="英文品牌" name="usName" :rules="[{ required: true, message: '请输入英文品牌' }]">
              <a-input v-model:value="addBrandNewForm.usName" allowClear />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="标准" name="standard" :rules="[{ required: true, message: '请选择标准' }]">
              <a-select v-model:value="addBrandNewForm.standard" :options="standardOptions" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="品牌地区" name="pinji" :rules="[{ required: true, message: '请选择品牌地区' }]">
              <a-select
                v-model:value="addBrandNewForm.pinji"
                :options="pinjiArr"
                optionFilterProp="label"
                showSearch
                allowClear
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="来源" name="source" :rules="[{ required: true, message: '请选择来源' }]">
              <a-select v-model:value="addBrandNewForm.source" :options="sourceOptions" allowClear />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
  </a-drawer>
</template>

<script setup lang="ts">
  import { computed, reactive, ref, watch } from 'vue';
  import { storeToRefs } from 'pinia';
  import type { FormInstance } from 'ant-design-vue';
  import { message } from 'ant-design-vue';
  import { CloseOutlined } from '@ant-design/icons-vue';
  import { MarketRightListSearchItem } from '/@/api/marketData/model';
  import { useMarketDataStoreWithOut } from '/@/store/modules/marketData';
  import { brandArrDetail, brandCategoryArr, pinjiArr, pinjibieArr } from '/@/store/data/resume';
  const industryOptions = computed(() => brandArrDetail.map((item) => ({
    label: item.retail,
    value: item.retail,
  })));
  const handleChangeIndustry = () => {
    formStateMarketRightList.value.category = '';
  };
  const brandLevelOptions = computed(() =>
    pinjibieArr.map((item) => ({
      label: item.label,
      value: item.value,
    })),
  );
  const handleCityChange = (city: string) => {
    formStateMarketRightList.value.market = '';
    marketDataStore.queryMarkList(getCity.value.find((item) => item.value === city)?.label || '');
  };
  const handleMarketChange = (market: string) => {
    formStateMarketRightList.value.brand = '';
    marketDataStore.queryMarkBrandFloor(market);
  };
  const marketLevelOptions = ref([
    {
      label: '高',
      value: 'S',
    },
    {
      label: '中',
      value: 'M',
    },
    {
      label: '低',
      value: 'L',
    },
  ]);
  const floorListOptions = ref([
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
  ]);
  const categoryOptions = computed(
    () =>
      brandArrDetail
        .find((item) => item.retail === formStateMarketRightList.value?.retail)
        ?.categoryArr?.map((item) => ({
          label: item,
          value: item,
        })) || [],
  );
  const props = withDefaults(
    defineProps<{
      open: boolean;
      initialFilters?: Partial<MarketRightListSearchItem>;
    }>(),
    {
      initialFilters: () => ({}),
    },
  );

  const emit = defineEmits<{
    (e: 'update:open', value: boolean): void;
  }>();

  const marketDataStore = useMarketDataStoreWithOut();
  const { formStateMarketRightList, pageMarketRightList, getMarketRightList, getBrandList, getMarkList, getCity } =
    storeToRefs(marketDataStore);
  const cityNameOptions = computed(() =>
    getCity.value.map((item: any) => ({
      label: item.label,
      value: item.label,
    })),
  );

  const drawerOpen = computed({
    get: () => props.open,
    set: (value: boolean) => emit('update:open', value),
  });

  const marketRightLoading = ref(false);
  const formatMarketLevel = (marketLevel?: string) => {
    if (marketLevel === 'S') {
      return '高';
    }
    if (marketLevel === 'M') {
      return '中';
    }
    if (marketLevel === 'L') {
      return '低';
    }
    return marketLevel || '-';
  };
  const marketRightColumns = [
    { title: '编号', dataIndex: 'index', key: 'index', width: 40, ellipsis: true },
    {
      title: '城市',
      dataIndex: 'cityName',
      key: 'cityName',
      width: 50,
      ellipsis: true,
    },
    {
      title: '商场',
      dataIndex: 'marketName',
      key: 'marketName',
      width: 100,
      ellipsis: true,
    },
    {
      title: '商级',
      dataIndex: 'marketLevel',
      key: 'marketLevel',
      width: 50,
      ellipsis: true,
      customRender: ({ record }: any) => formatMarketLevel(record?.marketLevel),
    },
    { title: '商场电话', dataIndex: 'telPhone', key: 'telPhone', width: 100, ellipsis: true },
    { title: '楼层', dataIndex: 'floor', key: 'floor', width: 50, ellipsis: true },
    {
      title: '品牌',
      dataIndex: 'brandStr',
      key: 'brandStr',
      width: 110,
      ellipsis: true,
      customRender: ({ record }: any) => `${record?.usName}${record?.cnName}` || '-',
    },
    { title: '品牌电话', dataIndex: 'phoneBrand', key: 'phoneBrand', width: 100, ellipsis: true },
    { title: '行业', dataIndex: 'retail', key: 'retail', width: 50, ellipsis: true },
    { title: '品级', dataIndex: 'brandLevel', key: 'brandLevel', width: 50, ellipsis: true },
    { title: '品类', dataIndex: 'category', key: 'category', width: 50, ellipsis: true },
    { title: '人才简历', dataIndex: 'resumeHave', key: 'resumeHave', width: 70, ellipsis: true, customRender: ({ record }: any) => ((record.resumeNum || 0)+(record.noResumeMappingNum || 0))+"/"+((record.resumeLeaveNum || 0)+(record.noresumeMappingLeaveNum || 0)) || '-' },
  ];

  const applyInitialFilters = () => {
    formStateMarketRightList.value = reactive<MarketRightListSearchItem>({
      ...props.initialFilters,
    } as MarketRightListSearchItem);
    pageMarketRightList.value.pageNum = 1;
  };

  const addMarketCityOpen = ref(false);
  const addMarketCitySubmitting = ref(false);
  const addMarketCityFormRef = ref<FormInstance>();
  const addMarketCityForm = reactive({
    cityName: '',
    marketName: '',
    telPhone: '',
  });

  const addBrandNewOpen = ref(false);
  const addBrandNewSubmitting = ref(false);
  const addBrandNewFormRef = ref<FormInstance>();
  const addBrandNewForm = reactive({
    cnName: '',
    usName: '',
    shortOne: '',
    retail: '',
    retailLevel: '',
    category: '',
    pinji: '',
    leibie: '',
    standard: '是',
    source: '公司',
  });

  const standardOptions = [
    { label: '是', value: '是' },
    { label: '否', value: '否' },
  ];
  const sourceOptions = [
    { label: '公司', value: '公司' },
    { label: '人才', value: '人才' },
  ];

  const addBrandNewCategoryOptions = computed(() => {
    return (
      brandArrDetail
        .find((item) => item.retail === addBrandNewForm.retail)
        ?.categoryArr?.map((item) => ({ label: item, value: item })) || []
    );
  });

  const addBrandNewLeibieOptions = computed(() => {
    const category = addBrandNewForm.category;
    if (!category) {
      return [];
    }
    const retailTitle = brandArrDetail.find((item) => item.retail === addBrandNewForm.retail)?.title;
    const leibieList = brandCategoryArr
      .filter((item) => item.category === category)
      .reduce((prev: string[], curr: any) => {
        if ((curr.title && retailTitle && curr.title === retailTitle) || !curr.title) {
          curr.leibie.forEach((v: string) => prev.push(v));
        }
        return prev;
      }, []);
    return leibieList.map((item) => ({ label: item, value: item }));
  });

  const addBrandNew = async () => {
    addBrandNewForm.cnName = '';
    addBrandNewForm.usName = '';
    addBrandNewForm.shortOne = '';
    addBrandNewForm.retail = formStateMarketRightList.value.retail || '';
    addBrandNewForm.retailLevel = formStateMarketRightList.value.brandLevel || '';
    addBrandNewForm.category = formStateMarketRightList.value.category || '';
    addBrandNewForm.leibie = '';
    addBrandNewForm.pinji = '国内';
    addBrandNewForm.standard = '是';
    addBrandNewForm.source = '公司';
    addBrandNewFormRef.value?.clearValidate?.();
    addBrandNewOpen.value = true;
  };

  const handleAddBrandNewRetailChange = () => {
    addBrandNewForm.category = '';
    addBrandNewForm.leibie = '';
  };
  const handleAddBrandNewCategoryChange = () => {
    addBrandNewForm.leibie = '';
  };

  const handleAddBrandNewClose = () => {
    addBrandNewOpen.value = false;
    addBrandNewFormRef.value?.clearValidate?.();
  };

  const handleAddBrandNewSubmit = async () => {
    addBrandNewForm.cnName = (addBrandNewForm.cnName || '').trim();
    addBrandNewForm.usName = (addBrandNewForm.usName || '').trim();
    addBrandNewForm.shortOne = (addBrandNewForm.shortOne || '').trim();
    addBrandNewSubmitting.value = true;
    try {
      await addBrandNewFormRef.value?.validate?.();
      const res = await marketDataStore.addBrandNew({
        cnName: addBrandNewForm.cnName,
        usName: addBrandNewForm.usName,
        shortOne: addBrandNewForm.shortOne || '',
        retail: addBrandNewForm.retail,
        retailLevel: addBrandNewForm.retailLevel,
        category: addBrandNewForm.category,
        pinji: addBrandNewForm.pinji,
        leibie: addBrandNewForm.leibie,
        standard: addBrandNewForm.standard,
        source: addBrandNewForm.source,
      });
      if (res?.code === 1) {
        message.success('新增成功');
        addBrandNewOpen.value = false;
        await marketDataStore.queryBrandList();
        return;
      }
      message.error(res?.info || '新增失败');
    } finally {
      addBrandNewSubmitting.value = false;
    }
  };

  const addMarketCity = async () => {
    const currentCityValue = formStateMarketRightList.value.city || '';
    const currentCityLabel =
      getCity.value.find((item: any) => item.value === currentCityValue)?.label || currentCityValue;
    addMarketCityForm.cityName = currentCityLabel || '';
    addMarketCityForm.marketName = '';
    addMarketCityForm.telPhone = '';
    addMarketCityFormRef.value?.clearValidate?.();
    addMarketCityOpen.value = true;
  };

  const handleAddMarketCityClose = () => {
    addMarketCityOpen.value = false;
    addMarketCityFormRef.value?.clearValidate?.();
  };

  const handleAddMarketCitySubmit = async () => {
    addMarketCityForm.marketName = (addMarketCityForm.marketName || '').trim();
    addMarketCityForm.telPhone = (addMarketCityForm.telPhone || '').trim();
    addMarketCitySubmitting.value = true;
    try {
      await addMarketCityFormRef.value?.validate?.();
      const cityName = addMarketCityForm.cityName || '';
      const res = await marketDataStore.addMarketCity({
        cityName,
        marketName: addMarketCityForm.marketName,
        telPhone: addMarketCityForm.telPhone,
      });
      if (res?.code === 1) {
        message.success('新增成功');
        addMarketCityOpen.value = false;
        if (cityName) {
          await marketDataStore.queryMarkList(cityName);
        }
        return;
      }
      message.error(res?.info || '新增失败');
    } finally {
      addMarketCitySubmitting.value = false;
    }
  };

  const queryMarketRightList = async () => {
    marketRightLoading.value = true;
    const payload = {
      pageNumber: pageMarketRightList.value.pageNum,
      endRow: pageMarketRightList.value.pageSize,
      city: '',
      cityStr: '',
      market: '',
      marketStr: '',
      marketLevel: '',
      marketPhone: '',
      brand: '',
      brandStr: '',
      brandLevel: '',
      brandPhone: '',
      floor: '',
      retail: '',
      category: '',
      resumeHave: '',
      ...formStateMarketRightList.value,
    } as MarketRightListSearchItem & { endRow: number };
    if (payload.city) {
      payload.cityStr = getCity.value.find((item) => item.value === payload.city)?.label || '';
    }
    if (payload.market) {
      payload.marketStr = getMarkList.value.find((item) => item.value === payload.market)?.label || '';
    }
    if (payload.brand) {
      payload.brandStr = getBrandList.value.find((item) => item.value === payload.brand)?.label || '';
    }
    try {
      await marketDataStore.queryMappingRightMarketPage(payload);
    } finally {
      marketRightLoading.value = false;
    }
  };

  const handleMarketRightSearch = async () => {
    pageMarketRightList.value.pageNum = 1;
    await queryMarketRightList();
  };

  const handleMarketRightPageChange = async (pageNum: number) => {
    pageMarketRightList.value.pageNum = pageNum;
    await queryMarketRightList();
  };

  const clearMarketRightForm = async () => {
    formStateMarketRightList.value = reactive<MarketRightListSearchItem>(
      {} as MarketRightListSearchItem,
    );
    pageMarketRightList.value.pageNum = 1;
    await queryMarketRightList();
  };

  watch(
    () => props.open,
    async (open) => {
      if (!open) {
        return;
      }
      await marketDataStore.queryProvince();
      applyInitialFilters();
      await queryMarketRightList();
    },
  );
</script>

<style scoped lang="less">
  .add-market-city-tip :deep(.ant-alert-icon) {
    font-size: 14px;
    margin-top: 2px;
  }
  .add-market-city-tip :deep(.ant-alert-message) {
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 0;
  }
  .add-market-city-tip :deep(.ant-alert-description) {
    font-size: 14px;
    line-height: 20px;
  }
</style>
