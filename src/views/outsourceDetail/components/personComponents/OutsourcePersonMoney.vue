<template>
   <a-drawer
    v-model:open="outsourcePersonMoneyFlag"
    title="请款单"
    :maskClosable="false"
    :keyboard="false"
    :closable="false"
    :width="drawerWidth"
    :bodyStyle="{ padding: '4px 14px' }"
    :headerStyle="{ padding: '5px 18px 5px 12px' }"
    placement="right"
  >
   <template #extra>
        <CloseOutlined @click="handleClose" />
      </template>
      <div class="resume-content-search">
    <a-form :model="formStatePersonMoney" @finish="onSearch">
      <a-row :gutter="24">
        <a-col :span="3">
          <a-form-item name="companyName" label="公司">
            <a-select
              optionFilterProp="label"
              v-model:value="formStatePersonMoney.companyName"
              :options="getOutsourceCompanyAll"
              :showArrow="false"
              showSearch
              allowClear
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="3">
          <a-form-item name="yearAndMonth" label="请款月">
            <a-date-picker
                  v-model:value="formStatePersonMoney.yearAndMonth"
                  value-format="YYYY-MM"
                  picker="month"
                />
          </a-form-item>
        </a-col>
         <a-col :span="4">
          <a-button style="margin: 0 0 0 8px" type="primary" html-type="submit">搜索</a-button>
          <a-button style="margin: 0 8px" @click="clearFromState">清空</a-button>
         </a-col>
      </a-row>
     </a-form>
  </div>
  <div class="resume_container">
    <a-layout>
        <a-layout-content class="resume_content">
           <a-tabs v-model:activeKey="outsourceDetailMoneySider" type="card">
              <a-tab-pane key="1" tab="请款单">
                 <OutsourcePersonMoneyQing/>
              </a-tab-pane>
              <a-tab-pane key="2" tab="工资单">
                <OutsourcePersonMoneySalary/>
              </a-tab-pane>
              <a-tab-pane key="3" tab="社保">
                <OutsourcePersonMoneySheBao/>
              </a-tab-pane>
          </a-tabs>
        </a-layout-content>
      </a-layout>
  </div>
   </a-drawer>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { storeToRefs } from 'pinia';
import { CloseOutlined } from '@ant-design/icons-vue';
import OutsourcePersonMoneyQing from './OutsourcePersonMoneyQing.vue';
import OutsourcePersonMoneySheBao from './OutsourcePersonMoneySheBao.vue';
import OutsourcePersonMoneySalary from './OutsourcePersonMoneySalary.vue';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
import { OutsourcePersonMoneyItem } from '/@/api/outsourceDetail/model';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { outsourcePersonMoneyFlag, formStatePersonMoney, getOutsourceCompanyAll, } = storeToRefs(outsourceDetailStore);
const drawerWidth = ref(Math.max(600, window.innerWidth * 0.9));
const outsourceDetailMoneySider = ref('1');
const onSearch = () => {
  outsourceDetailStore.outsourcePersonMoney(formStatePersonMoney.value);
}
const clearFromState = () => {
  formStatePersonMoney.value = {} as OutsourcePersonMoneyItem;
}
const handleClose = () => {
    outsourcePersonMoneyFlag.value = false;
  };
</script>

<style lang="less" scoped>
  :deep(.ant-descriptions .ant-descriptions-header) {
    margin-bottom: 10px;
  } 
  :deep(.ant-descriptions .ant-descriptions-item-label) {
    width: 75px;
    min-width: 75px;
    max-width: 75px;
    font-weight: bold;
  }
  
  :deep(.ant-descriptions .ant-descriptions-item-content) {
    width: 150px;
    min-width: 150px;
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
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
