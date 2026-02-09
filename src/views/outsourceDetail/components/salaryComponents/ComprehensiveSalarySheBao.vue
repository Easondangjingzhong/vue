<template>
<a-row :gutter="24">
  <a-col :span="24" class="comprehensive-contract-info">
      <div class="comprehensive-contract-info-title">月度社保</div>
    </a-col>
</a-row>
<a-row :gutter="24">
  <a-col :span="24">
    <a-table
      size="small"
      :columns="columns"
      :data-source="getOutsourcePersonPerformanceDetailSheBaoInfo"
      :pagination="false"
      :scroll="{ x: 1600 }"
    >
  </a-table>
  </a-col>
</a-row>

</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import _ from 'lodash';
import type { TableColumnsType } from 'ant-design-vue';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { getOutsourcePersonPerformanceDetailSheBaoInfo } = storeToRefs(outsourceDetailStore);

const columns:TableColumnsType = [
  {
    title: '缴纳单位',
    dataIndex: 'shebaoCompany',
    key: 'shebaoCompany',
    width: 40,
  },
  {
    title: '单位合计',
    dataIndex: 'companyTotal',
    key: 'companyTotal',
    width: 40,
  },
   {
    title: '个人合计',
    dataIndex: 'personTotal',
    key: 'personTotal',
    width: 40,
  },
   {
    title: '补差',
    dataIndex: 'buchaMoney',
    key: 'buchaMoney',
    width: 40,
  },
   {
    title: '手续',
    dataIndex: 'serviceMoney',
    key: 'serviceMoney',
    width: 40,
  },
   {
    title: '社保总计',
    dataIndex: 'shangbaoTotal',
    key: 'shangbaoTotal',
    width: 40,
  },
   {
    title: '客商',
    dataIndex: 'keShangbao',
    key: 'keShangbao',
    width: 40,
  },
   {
    title: '实商',
    dataIndex: 'shangbao',
    key: 'shangbao',
    width: 40,
  },
   {
    title: '社保标准',
    dataIndex: 'shebaoStandard',
    key: 'shebaoStandard',
    width: 40,
  },
   {
    title: '养老基数',
    dataIndex: 'yanglaoJishu',
    key: 'yanglaoJishu',
    width: 40,
  },
   {
    title: '单位',
    dataIndex: 'yanglaoCompany',
    key: 'yanglaoCompany',
    width: 40,
  },
   {
    title: '个人',
    dataIndex: 'yanglaoPerson',
    key: 'yanglaoPerson',
    width: 40,
  },
   {
    title: '失业基数',
    dataIndex: 'shiyeJishu',
    key: 'shiyeJishu',
    width: 40,
  },
   {
    title: '单位',
    dataIndex: 'shiyeCompany',
    key: 'shiyeCompany',
    width: 40,
  },
   {
    title: '个人',
    dataIndex: 'shiyePerson',
    key: 'shiyePerson',
    width: 40,
  },
   {
    title: '医疗基数',
    dataIndex: 'yiliaoJishu',
    key: 'yiliaoJishu',
    width: 40,
  },
   {
    title: '单位',
    dataIndex: 'yiliaoCompany',
    key: 'yiliaoCompany',
    width: 40,
  },
   {
    title: '个人',
    dataIndex: 'yiliaoPerson',
    key: 'yiliaoPerson',
    width: 40,
  },
   {
    title: '大病基数',
    dataIndex: 'dabingJishu',
    key: 'dabingJishu',
    width: 40,
  },
   {
    title: '单位',
    dataIndex: 'dabingCompany',
    key: 'dabingCompany',
    width: 40,
  },
   {
    title: '个人',
    dataIndex: 'dabingPerson',
    key: 'dabingPerson',
    width: 40,
  },
]

</script>

<style lang="less" scoped>
.comprehensive-contract-info {
  display: flex;
  justify-content: space-between;
}
  .comprehensive-contract-info-title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    flex: auto;
    color: rgba(0, 0, 0, 0.88);
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    margin-bottom: 10px;
    margin-top: 10px;
  }
  .comprehensive-contract-info-btn {
    line-height: 1.5;
    margin-bottom: 10px;
    margin-top: 10px;
  }
</style>