<template>
  <div class="resume-content-search">
    <a-form :model="formStateAttend" @finish="onSearch">
      <a-row :gutter="24">
         <a-col :span="3">
          <a-form-item name="userName" label="姓名">
            <a-input v-model:value="formStateAttend.userName"/>
          </a-form-item>
        </a-col>
        <a-col :span="3">
          <a-form-item name="city" label="城市">
            <a-select
              optionFilterProp="label"
              v-model:value="formStateAttend.city"
              :options="getProvince"
              :showArrow="false"
              showSearch
              allowClear
            ></a-select>
          </a-form-item>
        </a-col>
         <a-col :span="3">
          <a-form-item name="companyName" label="公司">
            <a-select
              optionFilterProp="label"
              v-model:value="formStateAttend.companyName"
              :options="getOutsourceCompanyAll"
              :showArrow="false"
              showSearch
              allowClear
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="3">
          <a-form-item name="bId" label="品牌">
            <a-select
              optionFilterProp="label"
              v-model:value="formStateAttend.bId"
              :options="getOutsourceBrand"
              :showArrow="false"
              showSearch
              allowClear
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="3">
          <a-form-item name="positionId" label="职位">
            <a-select
              optionFilterProp="label"
              v-model:value="formStateAttend.positionId"
              :options="getOutsourcePosition"
              :showArrow="false"
              showSearch
              allowClear
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="3">
          <a-form-item name="jobType" label="性质">
            <a-select
              optionFilterProp="label"
              v-model:value="formStateAttend.jobType"
              :showArrow="false"
              showSearch
              allowClear
            >
              <a-select-option value="兼职">兼职</a-select-option>
              <a-select-option value="全职">全职</a-select-option>
          </a-select>
          </a-form-item>
        </a-col>
         <a-col :span="4">
          <a-button style="margin: 0 0 0 8px" type="primary" html-type="submit">搜索</a-button>
          <a-button style="margin: 0 8px" @click="clearFromState">清空</a-button>
         </a-col>
      </a-row>
     </a-form>
  </div>
  <div class="resume-content">
    <a-row style="justify-content: space-between;margin-bottom: 5px;">
        <span>
          <a-button @click="handleSearchOutsourcePerson('2')" :class="{'active': formStateAttend.currentStatus === '2'}" style="margin-right: 5px;" size="small">在职</a-button>
          <a-button @click="handleSearchOutsourcePerson('3')" :class="{'active': formStateAttend.currentStatus === '3'}" style="margin-right: 5px;" size="small">离职</a-button>
          <a-button @click="handleSearchOutsourcePerson('1')" :class="{'active': formStateAttend.currentStatus === ''}" style="margin-right: 5px;" size="small">全部</a-button>
          <a-button @click="handleSearchOutsourcePerson('4')" :class="{'active': formStateAttend.companyArrange === '1'}" style="margin-right: 5px;" size="small" title="按公司排序">排序</a-button>
        </span>
    </a-row>
    <a-row>
    <a-table
      size="small"
      :pagination="false"
      rowKey="key"
      :loading="attendIsLoading"
      :columns="columnsOutsourceDetail"
      :dataSource="getOutsourceAttendList"
      :scroll="{ x: 1900 }"
    >
    <template #bodyCell="{ column, record }">
      <a-tag v-if="column.key === 'flag' && record.flag === '1'" color="orange">待录</a-tag>
      <a-tag v-if="column.key === 'flag' && record.flag === '2'" color="green">已录</a-tag>
      <span v-if="column.key == 'operation'">
        <FormOutlined @click="handleEditClick(record)"/>
      </span>
    <!-- 添加类型断言和存在性检查以修复TypeScript索引类型错误 -->
    <span v-if="(typeof column.dataIndex === 'string' && (record[column.dataIndex] === null || record[column.dataIndex] === ''))">-</span>
  </template>
  </a-table>
    </a-row>
    <a-row style="justify-content: end; margin-top: 10px">
      <a-pagination
        v-model:current="pageOutsourceAttendList.pageNumber"
        :pageSize="pageOutsourceAttendList.pageSize"
        @change="handleOutsourceAttendListData"
        :total="pageOutsourceAttendList.total"
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
  <OutsourceAttendDetail />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import _ from 'lodash';
import { FormOutlined } from '@ant-design/icons-vue';
import OutsourceAttendDetail from '/@/views/outsourceDetail/components/personComponents/OutsourceAttendDetail.vue';
import { SearchAttendItem } from '/@/api/outsourceDetail/model';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { attendIsLoading,pageOutsourceAttendList,formStateAttend,getOutsourceAttendList, getProvince, getOutsourceBrand, getOutsourceCompanyAll, getOutsourcePosition, outsourceAttendForm, outsourceAttendFlag } = storeToRefs(outsourceDetailStore);
const columnsOutsourceDetail = [
  { title: '编号', dataIndex: 'index', key: 'index', fixed: 'left' as const, width: 20, },
  { title: '计薪月', dataIndex: 'yearAndMonth', key: 'yearAndMonth', fixed: 'left' as const, width: 30, },
  { title: '标识', dataIndex: 'flag', key: 'flag', fixed: 'left' as const, width: 30, },
  { title: '姓名', dataIndex: 'userNameCn', key: 'userNameCn', fixed: 'left' as const, width: 50, },
  { title: '公司', dataIndex: 'companyName', key: 'companyName', fixed: 'left' as const, width: 40, ellipsis: true },
  { title: '品牌', dataIndex: 'brand', key: 'brand', fixed: 'left' as const, width: 50, ellipsis: true },
  { title: '城市', dataIndex: 'city', key: 'city', fixed: 'left' as const, width: 30, },
  { title: '性质', dataIndex: 'jobType', key: 'jobType', fixed: 'left' as const, width: 30, },
  { title: '全勤工时', dataIndex: 'quanqinHours', key: 'quanqinHours', width: 40, },
  { title: '预估', dataIndex: 'isYugu', key: 'isYugu', width: 30, },
  { title: '上月预估', dataIndex: 'lastMonthYuHoursTotal', key: 'lastMonthYuHoursTotal', width: 40, },
  { title: '上月实际', dataIndex: 'lastMonthShiHoursTotal', key: 'lastMonthShiHoursTotal', width: 40, },
  { title: '本月预估', dataIndex: 'currentMonthYuHoursTotal', key: 'currentMonthYuHoursTotal', width: 40, },
  { title: '本月实际', dataIndex: 'currentMonthShiHoursTotal', key: 'currentMonthShiHoursTotal', width: 40, },
  { title: '累计差额', dataIndex: 'totalChaHoursTotal', key: 'totalChaHoursTotal', width: 40, },
  { title: '正常加班', dataIndex: 'overHoursTotal', key: 'overHoursTotal', width: 40, },
  { title: '国定加班', dataIndex: 'holidayOverHoursTotal', key: 'holidayOverHoursTotal', width: 40, },
  { title: '休息加班', dataIndex: 'restOverHoursTotal', key: 'restOverHoursTotal', width: 40, },
  { title: '带薪病假', dataIndex: 'daixinBingjiaHoursTotal', key: 'daixinBingjiaHoursTotal', width: 40, },
  { title: '扣薪病假', dataIndex: 'kouxinBingjiaHoursTotal', key: 'kouxinBingjiaHoursTotal', width: 40, },
  { title: '事假', dataIndex: 'shijiaHoursTotal', key: 'shijiaHoursTotal', width: 30, },
  { title: '年假', dataIndex: 'nianjianHoursTotal', key: 'nianjianHoursTotal', width: 30, },
  { title: '婚假', dataIndex: 'hunjiaHoursTotal', key: 'hunjiaHoursTotal', width: 30, },
  { title: '丧假', dataIndex: 'sanjiaHoursTotal', key: 'sanjiaHoursTotal', width: 30, },
  { title: '其它带薪', dataIndex: 'otherDaixinHoursTotal', key: 'otherDaixinHoursTotal', width: 40, },
  { title: '迟到', dataIndex: 'lateHours', key: 'lateHours', width: 30, },
  { title: '全勤', dataIndex: 'isQuanqin', key: 'isQuanqin', width: 30, },
  { title: 'UT', dataIndex: 'utHoursTotal', key: 'utHoursTotal', width: 30, },
  { title: '操作', dataIndex: 'operation', key: 'operation', fixed: 'right' as const, width: 20, },
]
const clearFromState = () => {
  formStateAttend.value = {currentStatus: '2',} as SearchAttendItem;
}
 const handleSearchOutsourcePerson = (status) => {
    if (status != '4') {
      formStateAttend.value.currentStatus = status;
    } else {
      formStateAttend.value.companyArrange = '1'; 
    }
    onSearch();
  }
const onSearch = () => {
  pageOutsourceAttendList.value = {
      ...pageOutsourceAttendList.value,
      pageNumber: 1,
    }
  outsourceDetailStore.queryOutsourceAttend();
}
onSearch();
const handleOutsourceAttendListData = () => {
  outsourceDetailStore.queryOutsourceAttend();
}
const handleEditClick = (record) => {
  outsourceAttendForm.value = _.cloneDeep(record);
  outsourceAttendFlag.value = true;
}
</script>

<style lang="less" scoped>
  .active {
    color: #389e0d;
    background: #f6ffed;
    border-color: #b7eb8f;
  }
  .tag {
    cursor: pointer;
  }
  .resume-content,
  .resume-content-search {
    background-color: #fff;
    box-shadow: 0 0 2px #ccc;
    border-radius: 5px;
    overflow: hidden;
    padding: 20px;
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
  :deep(.ant-pagination-prev ){
    padding-right: 5px;
  }
  :deep(.ant-pagination-next ){

    padding-left: 5px;
  }
</style>