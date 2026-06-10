<template>
  <div class="resume-content-search">
    <a-form :model="formStateMarketData" @finish="onSearch">
      <a-row :gutter="24">
        <a-col :span="3">
          <a-form-item name="userName" label="姓名">
            <a-input v-model:value="formStateMarketData.userName" />
          </a-form-item>
        </a-col>
        <a-col :span="3">
          <a-form-item name="city" label="城市">
            <a-select
              optionFilterProp="label"
              v-model:value="formStateMarketData.city"
              :options="getProvince"
              @change="handleCityChange"
              :showArrow="false"
              showSearch
              allowClear
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="3">
          <a-form-item name="marketId" label="商场">
            <a-select
              optionFilterProp="label"
              v-model:value="formStateMarketData.marketId"
              :options="getMarkList"
              :showArrow="false"
              @change="handleMarketChange"
              showSearch
              allowClear
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="3">
          <a-form-item name="brandId" label="品牌">
            <a-select
              optionFilterProp="label"
              v-model:value="formStateMarketData.brandId"
              :options="getBrandList"
              :showArrow="false"
              showSearch
              allowClear
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="10">
          <a-button style="margin: 0 0 0 8px" type="primary" html-type="submit">搜索</a-button>
          <a-button style="margin: 0 8px" @click="clearFromState">清空</a-button>
        </a-col>
        <a-col :span="2" style="text-align: right;">
          <a-button @click="handleAddClick">新增</a-button>
        </a-col>
      </a-row>
    </a-form>
  </div>
  <div class="resume-content">
    <a-row>
    <a-table size="small" :pagination="false" rowKey="key" :columns="columnsMappingRseult" :dataSource="getMarketDataList">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'jubStatus'">
          <a-tag v-if="record.jubStatus == '1'" color="green">在职</a-tag>
          <a-tag v-if="record.jubStatus == '2'" color="red">离职</a-tag>
        </template>
      </template>
    </a-table>
    </a-row>
    <a-row style="justify-content: end; margin-top: 5px">
      <a-pagination
        v-model:current="pageMarketDataList.pageNum"
        :pageSize="pageMarketDataList.pageSize"
        @change="handleMarketDataListData"
        :total="pageMarketDataList.total"
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
  </div>
  <AddMappingTempModal v-model:open="addModalOpen" @success="onSearch" />
</template>
<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { MenuUnfoldOutlined } from '@ant-design/icons-vue';
import { MarketDataListSearchItem } from '/@/api/marketData/model';
  import { useMarketDataStoreWithOut } from '/@/store/modules/marketData';
  import AddMappingTempModal from './AddMappingTempModal.vue';
  const marketDataStore = useMarketDataStoreWithOut();
  const { formStateMarketData, getMarketDataList, pageMarketDataList, getProvince, getBrandList, getMarkList } = storeToRefs(marketDataStore);
  const onSearch = () => {
    marketDataStore.queryMappingTempPageAjax();
  }
  const clearFromState = () => {
    formStateMarketData.value = reactive<MarketDataListSearchItem>({} as MarketDataListSearchItem);
  }
  const handleMarketDataListData = (pageNum: number) => {
    pageMarketDataList.value.pageNum = pageNum;
    marketDataStore.queryMappingTempPageAjax();
  }
  onSearch();
  const handleCityChange = (value: string) => {
    marketDataStore.queryMarkList(value);
  }
  const handleMarketChange = (value: string) => {
    marketDataStore.queryMarkList(formStateMarketData.value.city || '' ,value || '');
  }
  const addModalOpen = ref(false);
  const handleAddClick = () => {
    addModalOpen.value = true;
  }
  const columnsMappingRseult = [
    {
      title: '编号',
      dataIndex: 'index',
      key: 'index',
      width: 20,
      ellipsis: true,
    },
    {
      title: '类型',
      dataIndex: 'userName',
      key: 'userName',
      width: 20,
      ellipsis: true,
    },
    {
      title: '城市',
      dataIndex: 'userName',
      key: 'userName',
      width: 30,
      ellipsis: true,
    },
    {
      title: '商场',
      dataIndex: 'userName',
      key: 'userName',
      width: 30,
      ellipsis: true,
    },
    {
      title: '品牌',
      dataIndex: 'sex',
      key: 'sex',
      width: 30,
      ellipsis: true,
    },
    {
      title: '姓名',
      dataIndex: 'age',
      key: 'age',
      width: 40,
      ellipsis: true,
    },
    {
      title: '电话',
      dataIndex: 'place',
      key: 'place',
      width: 30,
      ellipsis: true,
    },
    {
      title: '当前职位',
      dataIndex: 'market',
      key: 'market',
      width: 60,
      ellipsis: true,
    },
    {
      title: '职状',
      dataIndex: 'allBrand',
      key: 'allBrand',
      width: 20,
      ellipsis: true,
    },
    {
      title: '性别',
      dataIndex: 'position',
      key: 'position',
      width: 20,
      ellipsis: true,
    },
    {
      title: '年龄',
      dataIndex: 'jubStatus',
      key: 'jubStatus',
      width: 20,
      ellipsis: true,
    },
    {
      title: '录入顾问',
      dataIndex: 'counselor',
      key: 'counselor',
      width: 40,
      ellipsis: true,
    },
    {
      title: '录入日期',
      dataIndex: 'yearMouthDays',
      key: 'yearMouthDays',
      width: 40,
      ellipsis: true,
    },
    {
      title: '分配',
      dataIndex: 'communicate',
      key: 'communicate',
      width: 30,
      ellipsis: true,
    },
    {
      title: '分配顾问',
      dataIndex: 'recommendNum',
      key: 'recommendNum',
      width: 40,
      ellipsis: true,
    },
    {
      title: '分配日期',
      dataIndex: 'sign',
      key: 'sign',
      width: 40,
      ellipsis: true,
    },
    {
      title: '联络',
      dataIndex: 'sign',
      key: 'sign',
      width: 30,
      ellipsis: true,
    },
    {
      title: '核对',
      dataIndex: 'sign',
      key: 'sign',
      width: 20,
      ellipsis: true,
    },
    {
      title: '当前状态',
      dataIndex: 'sign',
      key: 'sign',
      width: 40,
      ellipsis: true,
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 20,
      ellipsis: true,
    },
  ];
</script>
<style lang="less" scoped>
  .resume_action {
    background: linear-gradient(225deg, #5eb95e 15%, transparent 0);
    padding-right: 5px;
    display: inline-block;
  }
  .resume-content,
  .resume-content-search {
    background-color: #fff;
    box-shadow: 0 0 2px #ccc;
    border-radius: 5px;
    overflow: hidden;
    padding: 10px;
  }
  .resume-content-search {
    margin-bottom: 10px;
    padding-bottom: 9px;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
  }
  .resume-content-search .ant-form .ant-form-item {
    margin-bottom: 10px !important;
  }
</style>
