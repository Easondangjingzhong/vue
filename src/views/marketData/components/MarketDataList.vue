<template>
  <div class="resume-content-search">
    <a-form :model="formStateMarketData" @finish="onSearch">
      <a-row :gutter="24">
        <a-col :span="spanSearch">
          <a-form-item name="city" label="城市">
            <a-select
              optionFilterProp="label"
              v-model:value="formStateMarketData.city"
              :options="getSearchCityList"
              @change="handleCityChange"
              :showArrow="false"
              showSearch
              allowClear
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="spanSearch">
          <a-form-item name="marketId" label="商场">
            <a-select
              optionFilterProp="label"
              v-model:value="formStateMarketData.marketId"
              :options="getSearchMarketList"
              :showArrow="false"
              showSearch
              allowClear
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="spanSearch">
          <a-form-item name="brandId" label="品牌">
            <a-select
              optionFilterProp="label"
              v-model:value="formStateMarketData.brandId"
              :options="getSearchBrandList"
              :showArrow="false"
              showSearch
              allowClear
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="spanSearch">
          <a-form-item name="brandId" label="团队">
            <a-select
              optionFilterProp="label"
              v-model:value="formStateMarketData.teamId"
              :options="getStructureList"
              @change="handleTeamChange"
              :showArrow="false"
              showSearch
              allowClear
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="spanSearch">
          <a-form-item name="brandId" label="录顾">
            <a-select
              optionFilterProp="label"
              v-model:value="formStateMarketData.entryRecruitId"
              :options="getSearchEntryList"
              :showArrow="false"
              showSearch
              allowClear
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="spanSearch">
          <a-form-item name="brandId" label="分顾">
            <a-select
              optionFilterProp="label"
              v-model:value="formStateMarketData.assignRecruitId"
              :options="getSearchAssignList"
              :showArrow="false"
              showSearch
              allowClear
            ></a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="spanSearch">
          <a-form-item name="userName" label="姓名">
            <a-input v-model:value="formStateMarketData.userName" />
          </a-form-item>
        </a-col>
        <a-col :span="spanSearch">
          <a-form-item name="phoneNum" label="电话">
            <a-input v-model:value="formStateMarketData.phoneNum" />
          </a-form-item>
        </a-col>
        <a-col :span="spanSearch">
          <a-form-item name="positionId" label="职级">
            <a-select
              optionFilterProp="label"
              v-model:value="formStateMarketData.positionId"
              :showArrow="false"
              :options="getSearchPositionList"
              showSearch
              allowClear
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="spanSearch">
          <a-form-item name="tellFlag" label="联络">
            <a-select
              optionFilterProp="label"
              v-model:value="formStateMarketData.tellFlag"
              :showArrow="false"
              showSearch
              allowClear
            >
            <a-select-option value="已联络">已联络</a-select-option>
            <a-select-option value="未联络">未联络</a-select-option>
          </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="spanSearch">
          <a-form-item name="checkStatus" label="核对">
            <a-select
              optionFilterProp="label"
              v-model:value="formStateMarketData.checkStatus"
              :showArrow="false"
              showSearch
              allowClear
            >
              <a-select-option value="待核">待核</a-select-option>
              <a-select-option value="正确">正确</a-select-option>
              <a-select-option value="错误">错误</a-select-option>
              <a-select-option value="重复">重复</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="16">
          <a-form-item name="brandId" label="日期">
            <div class="date_inline">
              <a-select
                class="date_select"
                optionFilterProp="label"
                v-model:value="formStateMarketData.brandId"
                :showArrow="false"
                showSearch
                allowClear
                style="width: 100px"
              >
            <a-select-option value="1">录入日期</a-select-option>
            <a-select-option value="2">分配日期</a-select-option>
            </a-select>
              <a-radio-group
                v-model:value="quickDateKey"
                button-style="solid"
                class="date_quick"
                @change="handleQuickDateChange"
              >
                <a-radio-button value="yesterday">昨天</a-radio-button>
                <a-radio-button value="today">今天</a-radio-button>
                <a-radio-button value="tomorrow">明天</a-radio-button>
                <a-radio-button value="thisWeek">本周</a-radio-button>
                <a-radio-button value="lastWeek">上周</a-radio-button>
                <a-radio-button value="thisMonth">本月</a-radio-button>
                <a-radio-button value="lastMonth">上月</a-radio-button>
                <a-radio-button value="thisYear">本年</a-radio-button>
                <a-radio-button value="lastYear">去年</a-radio-button>
                <a-radio-button value="custom">自定义</a-radio-button>
              </a-radio-group>
              <a-range-picker
                class="date_picker"
                v-model:value="formStateMarketData.checkTime"
                style="width: 170px"
                @change="handleManualDateChange"
              />
            </div>
          </a-form-item>
        </a-col>
         <a-col :span="spanSearch">
          <a-button type="primary" html-type="submit">搜索</a-button>
          <a-button style="margin: 0 8px" @click="clearFromState">清空</a-button>
        </a-col>
        <a-col :span="spanSearch" style="text-align: right;">
          <a-button @click="handleMarketInfo" style="margin: 0 8px 0 0;">商场信息</a-button>
          <a-button @click="handleAddClick">新增人才</a-button>
        </a-col>
      </a-row>
    </a-form>
  </div>
  <div class="resume-content">
    <a-row>
    <a-table size="small" :pagination="false" rowKey="key" :columns="columnsMappingRseult" :dataSource="getMarketDataList">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'checkStatus'">
          <a-tag v-if="!record.checkStatus && record.isRepeat !== '1'" color="orange">待核</a-tag>
          <a-tag v-if="record.checkStatus == '正确' && record.isRepeat !== '1'" :title="record.checkRemark" style="cursor: pointer;" color="green">正确</a-tag>
          <a-tag v-if="record.checkStatus == '错误' && record.isRepeat !== '1'" :title="record.falseReason" style="cursor: pointer;" color="red">错误</a-tag>
          <a-tag v-if="record.checkStatus == '重复' || record.isRepeat == '1'" :title="record.checkRemark" style="cursor: pointer;" color="red">重复</a-tag>
          <a-tag v-if="record.checkStatus == '存疑' && record.isRepeat !== '1'" color="orange">存疑</a-tag>
        </template>
        <template v-if="column.key === 'jobStatus'">
          <a-tag v-if="record.jobStatus == '2'" color="red">离职</a-tag>
          <a-tag v-if="record.jobStatus == '1'" color="green">在职</a-tag>
        </template>
        <template v-if="column.key === 'assignStatus'">
          <span v-if="record.isRepeat == '1'">-</span>
          <a-tag v-if="record.assignStatus == '待分配' && record.isRepeat !== '1'" color="orange">待分配</a-tag>
          <a-tag v-if="record.assignStatus == '已分配' && record.isRepeat !== '1'" color="green">已分配</a-tag>
        </template>
        <template v-if="column.key === 'assignRealNameEn' || column.key === 'assignTime'">
          <span v-if="record.isRepeat == '1'">-</span>
          </template>
         <template v-if="column.key === 'tellFlag'">
          <span v-if="record.isRepeat == '1'">-</span>
          <a-tag v-if="record.tellFlag == '未联络' && record.isRepeat !== '1'" color="orange">未联络</a-tag>
          <a-tag v-if="record.tellFlag == '已联络' && record.isRepeat !== '1'" color="green">已联络</a-tag>
        </template>
         <template v-if="column.key === 'currentFlag'">
          <span v-if="record.isRepeat == '1'">-</span>
          <a-tag v-if="record.currentFlag == '待分配' && record.isRepeat !== '1'" color="orange">待分配</a-tag>
          <a-tag v-if="record.currentFlag == '未使用' && record.isRepeat !== '1'" color="orange">未使用</a-tag>
        </template>
       <template v-if="column.key === 'action'">
          <a-dropdown v-if="record.isRepeat !== '1'">
            <span class="ant-dropdown-link" style="cursor: pointer;" @click.prevent>
              <MenuUnfoldOutlined style="font-size: 15px;"/>
            </span>
            <template #overlay>
              <a-menu>
                <a-menu-item v-if="record.assignStatus == '待分配'" >
                 <a href="javascript:;" @click="handleAllocation(record)">分配</a>
                </a-menu-item>
                <a-menu-item v-if="record.assignStatus == '已分配'" >
                 <a href="javascript:;" @click="handleChecked(record)">核对</a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
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
  <!-- <AddMarketBrandModal v-model:open="addBrandModalOpen" /> -->
  <AddMappingTempModal v-model:open="addModalOpen" @success="onSearch" />
  <AssignMappingTempModal v-model:open="assignModalOpen" :record="currentAssignRecord" @success="onSearch" />
  <CheckMappingTempModal v-model:open="checkModalOpen" :record="currentCheckRecord" @success="onSearch" />
  <MarketInfoDrawer
    v-model:open="marketInfoDrawerOpen"
    :initial-filters="marketInfoInitialFilters"
  />
</template>
<script setup lang="ts">
  import dayjs from 'dayjs';
  import { storeToRefs } from 'pinia';
  import { MenuUnfoldOutlined } from '@ant-design/icons-vue';
  import { MarketDataListSearchItem, MappingTempItem, MarketRightListSearchItem } from '/@/api/marketData/model';
  import { useMarketDataStoreWithOut } from '/@/store/modules/marketData';
  //import AddMarketBrandModal from './AddMarketBrandModal.vue';
  import AddMappingTempModal from './AddMappingTempModal.vue';
  import AssignMappingTempModal from './AssignMappingTempModal.vue';
  import CheckMappingTempModal from './CheckMappingTempModal.vue';
  import MarketInfoDrawer from './MarketInfoDrawer.vue';
  const marketDataStore = useMarketDataStoreWithOut();
  const { formStateMarketData, getMarketDataList, pageMarketDataList, getSearchCityList, getSearchBrandList, getSearchMarketList, getSearchPositionList, getStructureList, getSearchAssignList, getSearchEntryList } = storeToRefs(marketDataStore);
  const spanSearch = ref(4);
  const onSearch = () => {
    marketDataStore.queryMappingTempPageAjax();
  }
  const handleTeamChange = () => {
    marketDataStore.queryConsultantByTeam({ teamId: formStateMarketData.value.teamId });
  }
  const quickDateKey = ref<
    | 'yesterday'
    | 'today'
    | 'tomorrow'
    | 'thisWeek'
    | 'lastWeek'
    | 'thisMonth'
    | 'lastMonth'
    | 'thisYear'
    | 'lastYear'
    | 'custom'
    | undefined
  >(undefined);
  const hasDateRange = () => {
    // @ts-ignore
    const range = formStateMarketData.value.checkTime;
    return Array.isArray(range) && range.length === 2 && range[0] && range[1];
  };
  const handleQuickDateChange = () => {
    if (!quickDateKey.value) {
      return;
    }
    if (quickDateKey.value === 'custom') {
      // 自定义：不自动赋值，等同于“不过滤日期”，也允许用户手动选择范围
      if (!hasDateRange()) {
        quickDateKey.value = undefined;
      }
      return;
    }
    const now = dayjs();
    let start = now.startOf('day');
    let end = now.endOf('day');
    if (quickDateKey.value === 'yesterday') {
      start = now.subtract(1, 'day').startOf('day');
      end = now.subtract(1, 'day').endOf('day');
    } else if (quickDateKey.value === 'today') {
      start = now.startOf('day');
      end = now.endOf('day');
    } else if (quickDateKey.value === 'tomorrow') {
      start = now.add(1, 'day').startOf('day');
      end = now.add(1, 'day').endOf('day');
    } else if (quickDateKey.value === 'thisWeek') {
      start = now.startOf('week');
      end = now.endOf('week');
    } else if (quickDateKey.value === 'lastWeek') {
      start = now.subtract(1, 'week').startOf('week');
      end = now.subtract(1, 'week').endOf('week');
    } else if (quickDateKey.value === 'thisMonth') {
      start = now.startOf('month');
      end = now.endOf('month');
    } else if (quickDateKey.value === 'lastMonth') {
      start = now.subtract(1, 'month').startOf('month');
      end = now.subtract(1, 'month').endOf('month');
    } else if (quickDateKey.value === 'thisYear') {
      start = now.startOf('year');
      end = now.endOf('year');
    } else if (quickDateKey.value === 'lastYear') {
      start = now.subtract(1, 'year').startOf('year');
      end = now.subtract(1, 'year').endOf('year');
    }
    // @ts-ignore
    formStateMarketData.value.checkTime = [start, end];
  };
  const handleManualDateChange = () => {
    quickDateKey.value = hasDateRange() ? 'custom' : undefined;
  };
  const clearFromState = () => {
    formStateMarketData.value = reactive<MarketDataListSearchItem>({} as MarketDataListSearchItem);
    quickDateKey.value = undefined;
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
  const addBrandModalOpen = ref(false);
  const handleAddBrandClick = () => {
    addBrandModalOpen.value = true;
  };
  const assignModalOpen = ref(false);
  const currentAssignRecord = ref<MappingTempItem | null>(null);
  const handleAllocation = (record: MappingTempItem) => {
    currentAssignRecord.value = record;
    assignModalOpen.value = true;
  }
  const checkModalOpen = ref(false);
  const currentCheckRecord = ref<MappingTempItem | null>(null);
  const handleChecked = (record: MappingTempItem) => {
    currentCheckRecord.value = record;
    checkModalOpen.value = true;
  }
  const marketInfoDrawerOpen = ref(false);
  const marketInfoInitialFilters = ref<Partial<MarketRightListSearchItem>>({});
  const handleMarketInfo = async () => {
    const city = formStateMarketData.value.city || '';
    const marketId = formStateMarketData.value.marketId?.toString() || '';
    const brandId = formStateMarketData.value.brandId?.toString() || '';
    const marketOption = getSearchMarketList.value?.find((item: any) => item.value?.toString() === marketId);
    const brandOption = getSearchBrandList.value?.find((item: any) => item.value?.toString() === brandId);
    marketInfoInitialFilters.value = {
      city,
      cityStr: city,
      market: marketId,
      marketStr: marketOption?.label || '',
      brand: brandId,
      brandStr: brandOption?.label || '',
    };
    marketInfoDrawerOpen.value = true;
  };
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
      dataIndex: 'type',
      key: 'type',
      width: 20,
      ellipsis: true,
    },
    {
      title: '城市',
      dataIndex: 'city',
      key: 'city',
      width: 20,
      ellipsis: true,
    },
    {
      title: '商场',
      dataIndex: 'marketName',
      key: 'marketName',
      width: 40,
      ellipsis: true,
    },
    {
      title: '品牌',
      dataIndex: 'brandName',
      key: 'brandName',
      width: 40,
      ellipsis: true,
    },
    {
      title: '姓名',
      dataIndex: 'userName',
      key: 'userName',
      width: 30,
      ellipsis: true,
    },
    {
      title: '电话',
      dataIndex: 'phoneNum',
      key: 'phoneNum',
      width: 40,
      ellipsis: true,
    },
    {
      title: '当前职位',
      dataIndex: 'positionName',
      key: 'positionName',
      width: 60,
      ellipsis: true,
    },
    {
      title: '职状',
      dataIndex: 'jobStatus',
      key: 'jobStatus',
      width: 20,
      ellipsis: true,
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      width: 20,
      ellipsis: true,
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      width: 20,
      ellipsis: true,
    },
    {
      title: '录入顾问',
      dataIndex: 'entryRealNameEn',
      key: 'entryRealNameEn',
      width: 40,
      ellipsis: true,
    },
    {
      title: '录入日期',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 40,
      ellipsis: true,
    },
    {
      title: '分配',
      dataIndex: 'assignStatus',
      key: 'assignStatus',
      width: 30,
      ellipsis: true,
    },
    {
      title: '分配顾问',
      dataIndex: 'assignRealNameEn',
      key: 'assignRealNameEn',
      width: 40,
      ellipsis: true,
    },
    {
      title: '分配日期',
      dataIndex: 'assignTime',
      key: 'assignTime',
      width: 40,
      ellipsis: true,
    },
    {
      title: '联络',
      dataIndex: 'tellFlag',
      key: 'tellFlag',
      width: 30,
      ellipsis: true,
    },
    {
      title: '核对',
      dataIndex: 'checkStatus',
      key: 'checkStatus',
      width: 20,
      ellipsis: true,
    },
    {
      title: '当前状态',
      dataIndex: 'currentFlag',
      key: 'currentFlag',
      width: 30,
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
  .date_inline {
    display: flex;
    align-items: center;
    gap: 0;
  }
  .date_quick {
    white-space: nowrap;
  }
  .date_quick,
  .date_picker {
    margin-left: -1px;
  }
  .date_inline :deep(.ant-select-selector),
  .date_inline :deep(.ant-radio-button-wrapper),
  .date_picker {
    height: 32px;
  }
  .date_inline :deep(.ant-radio-button-wrapper) {
    line-height: 30px;
  }
  .date_select :deep(.ant-select-selector) {
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
  }
  .date_quick :deep(.ant-radio-button-wrapper:first-child) {
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
  }
  .date_quick :deep(.ant-radio-button-wrapper:last-child) {
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
  }
  .date_picker {
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
    border-left: 1px solid #d9d9d9;
  }
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
