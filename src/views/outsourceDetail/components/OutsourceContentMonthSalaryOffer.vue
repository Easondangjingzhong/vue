<template>
  <div class="resume-content-search">
    <a-form :model="formStateMonthSalaryOffer" @finish="onSearch">
      <a-row :gutter="24">
         <a-col :span="3">
          <a-form-item name="userName" label="姓名">
            <a-input v-model:value="formStateMonthSalaryOffer.userName"/>
          </a-form-item>
        </a-col>
        <a-col :span="3">
          <a-form-item name="city" label="城市">
            <a-select
              optionFilterProp="label"
              v-model:value="formStateMonthSalaryOffer.city"
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
              v-model:value="formStateMonthSalaryOffer.companyName"
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
              v-model:value="formStateMonthSalaryOffer.bId"
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
              v-model:value="formStateMonthSalaryOffer.positionId"
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
              v-model:value="formStateMonthSalaryOffer.jobType"
              :showArrow="false"
              showSearch
              allowClear
            >
              <a-select-option value="兼职">兼职</a-select-option>
              <a-select-option value="全职">全职</a-select-option>
          </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="3">
          <a-form-item name="yearAndMonth" label="计薪">
            <a-date-picker
                  v-model:value="formStateMonthSalaryOffer.yearAndMonth"
                  value-format="YYYY-MM"
                  picker="month"
                />
          </a-form-item>
        </a-col>
         <a-col :span="3">
          <a-button style="margin: 0 0 0 8px" type="primary" html-type="submit">搜索</a-button>
          <a-button style="margin: 0 8px" @click="clearFromState">清空</a-button>
         </a-col>
      </a-row>
     </a-form>
  </div>
  <div class="resume-content">
    <a-row>
    <a-table
      size="small"
      :pagination="false"
      rowKey="key"
      :loading="monthSalaryIsLoading"
      :columns="columnsOutsourceMonthSalary"
      :dataSource="getOutsourceMonthSalaryOfferList"
      :scroll="{ x: 2100 }"
    >
    <template #bodyCell="{ column, record }">
       <a-tag v-if="column.key === 'sign' && record.sign === '1'" color="orange">待核</a-tag>
      <a-tag v-if="column.key === 'sign' && record.sign === '2'" color="green">已核</a-tag>
    <!-- 添加类型断言和存在性检查以修复TypeScript索引类型错误 -->
    <span v-if="(typeof column.dataIndex === 'string' && column.key !== 'operation'  && (record[column.dataIndex] === null || record[column.dataIndex] === '' || record[column.dataIndex] === undefined))">-</span>
    <template v-if="column.key === 'salaryAfterTax'">
      <span style="font-weight: 600;">{{ record.salaryAfterTax }}</span>
    </template>
    <template v-if="column.key === 'operation' && record['personId']">
          <a-dropdown>
            <span class="ant-dropdown-link" style="cursor: pointer;" @click.prevent>
              <MenuUnfoldOutlined style="font-size: 15px;"/>
            </span>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a href="javascript:;">业绩核对</a>
                </a-menu-item>
                 <a-menu-item>
                  <a href="javascript:;" @click="handleOutsourceMonthSalaryOfferAllocation(record)">业绩分配</a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
     </template>
  </template>  
    </a-table>
    </a-row>
    <a-row style="justify-content: end; margin-top: 10px">
      <a-pagination
        v-model:current="pageOutsourceMonthSalaryOfferList.pageNumber"
        :pageSize="pageOutsourceMonthSalaryOfferList.pageSize"
        @change="handleOutsourceMonthSalaryOfferListData"
        :total="pageOutsourceMonthSalaryOfferList.total"
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
  <OutsourceContentMonthSalaryOfferDetail/>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import _ from 'lodash';
import { MenuUnfoldOutlined } from '@ant-design/icons-vue';
import type { TableColumnsType } from 'ant-design-vue';
import { SearchMonthSalaryItem } from '/@/api/outsourceDetail/model';
import OutsourceContentMonthSalaryOfferDetail from './OutsourceContentMonthSalaryOfferDetail.vue';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { monthSalaryIsLoading,pageOutsourceMonthSalaryOfferList,getOutsourceMonthSalaryOfferList,formStateMonthSalaryOffer, getProvince, getOutsourceBrand, getOutsourceCompanyAll, getOutsourcePosition } = storeToRefs(outsourceDetailStore);
const columnsOutsourceMonthSalary:TableColumnsType = [
  {
    title: '客户信息',
    className: 'customer-info-header',
    children: [
      { title: '编号', dataIndex: 'index', key: 'index', fixed: 'left', width: 30, },
      { title: '计薪月', dataIndex: 'jinxinMonth', key: 'jinxinMonth', fixed: 'left', width: 40, },
      { title: '标识', dataIndex: 'sign', key: 'sign', fixed: 'left', width: 30, },
      { title: '姓名', dataIndex: 'userNameCn', key: 'userNameCn', fixed: 'left', width: 55, ellipsis: true, },
      { title: '职位', dataIndex: 'positions', key: 'positions', fixed: 'left', width: 50, ellipsis: true,},
      { title: '品牌', dataIndex: 'brand', key: 'brand', fixed: 'left', width: 50, ellipsis: true,},
      { title: '公司', dataIndex: 'companyName', key: 'companyName', fixed: 'left', width: 45, ellipsis: true, },
      { title: '城市', dataIndex: 'city', key: 'city', fixed: 'left', width: 30, },
      { title: '性质', dataIndex: 'jobType', key: 'jobType', fixed: 'left', width: 30, },
      { title: '招聘', dataIndex: 'haveZhao', key: 'haveZhao', fixed: 'left', width: 30, },
    ]
  },
  {
    title: '客户外包账单',
    className: 'salary-info-header',
    children: [
      { title: '人才支出', dataIndex: 'monthTax', key: 'monthTax', width: 50, },
      { title: '企业支出', dataIndex: 'costTotalke', key: 'costTotalke', width: 50, },
      { title: '管理费', dataIndex: 'manageChargeTax', key: 'manageChargeTax', width: 50, },
      { title: '税金', dataIndex: 'manageChargeTaxMoney', key: 'manageChargeTaxMoney', width: 50, },
      { title: '总营收费', dataIndex: 'moneyCahrgeTax', key: 'moneyCahrgeTax', width: 50, },
    ]
  },
  {
    title: '客户转换费账单',
    className: 'customer-info-header',
    children: [
      { title: '税前转换', dataIndex: 'zhuanChargeTax', key: 'zhuanChargeTax', width: 50, },
      { title: '税金', dataIndex: 'zhuanChargeTaxMoney', key: 'zhuanChargeTaxMoney', width: 50, },
      { title: '税后转换', dataIndex: 'zhuanChargeAfter', key: 'zhuanChargeAfter', width: 50, },
    ]
  },
  {
    title: '公司支出成本',
    className: 'salary-info-header',
    children: [
      { title: '人才支出', dataIndex: 'monthTax', key: 'monthTax', width: 50, },
      { title: '公司支出', dataIndex: 'costTotal', key: 'costTotal', width: 50, },
    ]
  },
  {
    title: '公司管理费',
    className: 'customer-info-header',
    children: [
      { title: '税前管理', dataIndex: 'manageChargeTax', key: 'manageChargeTax', width: 50, },
      { title: '税金', dataIndex: 'manageChargeRate', key: 'manageChargeRate', width: 50, },
      { title: '税后管理', dataIndex: 'manageChargeAfter', key: 'manageChargeAfter', width: 50, },
    ]
  },
  {
    title: '公司业绩分配',
    className: 'salary-info-header',
    children: [
      { title: '推顾', dataIndex: 'rMoney', key: 'rMoney', width: 50, },
      { title: '企顾', dataIndex: 'cMoney', key: 'cMoney', width: 50, },
      { title: '服顾', dataIndex: 'fMoney', key: 'fMoney', width: 50, },
      { title: '开顾1', dataIndex: 'dMoney', key: 'dMoney', width: 50, },
      { title: '开顾2', dataIndex: 'd2Money', key: 'd2Money', width: 50, },
      { title: '税后总计', dataIndex: 'totalCharge', key: 'totalCharge', width: 50, },
      { title: '含税总计', dataIndex: 'totalChargeAfter', key: 'totalChargeAfter', width: 50, },
      
    ]
  },
  {
    title: '',
    children: [
      { title: '操作', dataIndex: 'operation', key: 'operation', fixed: 'right', width: 25, },
    ]
  },
]
const clearFromState = () => {
  formStateMonthSalaryOffer.value = {} as SearchMonthSalaryItem;
}
const onSearch = () => {
  pageOutsourceMonthSalaryOfferList.value = {
      ...pageOutsourceMonthSalaryOfferList.value,
      pageNumber: 1,
    }
  outsourceDetailStore.queryOutsourceMonthSalaryOffer();
}
onSearch();
const handleOutsourceMonthSalaryOfferListData = () => {
  outsourceDetailStore.queryOutsourceMonthSalaryOffer();
}
const handleOutsourceMonthSalaryOfferAllocation = (record) => {
  outsourceDetailStore.handleOutsourceMonthSalaryOfferAllocation(_.cloneDeep(record));
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
  :deep(.customer-info-header) {
    background-color: #e6f7ff !important;
  }
  :deep(.salary-info-header) {
    background-color: #fff7e6 !important;
  }
</style>
