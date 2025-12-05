<template>
 <a-drawer
    v-model:open="outsourceFormulaFlag"
    title="公司公式"
    :maskClosable="false"
    :keyboard="false"
    :closable="false"
    :width="drawerWidth"
    :bodyStyle="{ padding: '4px 14px' }"
    :headerStyle="{ padding: '5px 18px 5px 12px' }"
    placement="right"
  >
    <template #extra>
      <CloseOutlined @click="outsourceFormulaFlag = false" />
    </template>
    <a-row style="justify-content: flex-end;margin-bottom: 5px;">
      <span>
        <a-button @click="handleAddOutsourceFormula" style="background-color: #eee" size="small">新增</a-button>
      </span>
    </a-row>
    <a-table
      size="small"
      :pagination="pageOutsourceFormulaList"
      rowKey="key"
      :columns="columns"
      :dataSource="getOutsourceFormulaList"
      :scroll="{ x: 2000 }"
    >
    <template #bodyCell="{ column, record }">
      <span v-if="column.key === 'cycle'">{{ cycleFormulaOption.find(item => item.value === record.cycle)?.label || record.cycle }}</span>
      <span v-if="column.key === 'city'">{{ record.city || '不限' }}</span>
      <span v-if="column.key === 'market'">{{ record.market || '不限' }}</span>
      <a-popover v-if="column.key === 'dangmonthCha' && record.dangmonthCha">
        <template #content>
          <span>{{ record.dangmonthCha }}</span>
        </template>
        <a-tag>查看</a-tag>
      </a-popover>
      <a-popover v-if="column.key === 'chuqinSalary' && record.chuqinSalary">
        <template #content>
          <span>{{ record.chuqinSalary }}</span>
        </template>
        <a-tag>查看</a-tag>
      </a-popover>
      <a-popover v-if="column.key === 'canbu' && record.canbu">
        <template #content>
          <span>{{ record.canbu }}</span>
        </template>
        <a-tag>查看</a-tag>
      </a-popover>
      <a-popover v-if="column.key === 'jintie' && record.jintie">
        <template #content>
          <span>{{ record.jintie }}</span>
        </template>
        <a-tag>查看</a-tag>
      </a-popover>
      <a-popover v-if="column.key === 'quanqin' && record.quanqin">
        <template #content>
          <span>{{ record.quanqin }}</span>
        </template>
        <a-tag>查看</a-tag>
      </a-popover>
      <a-popover v-if="column.key === 'zhengchangJiaban' && record.zhengchangJiaban">
        <template #content>
          <span>{{ record.zhengchangJiaban }}</span>
        </template>
        <a-tag>查看</a-tag>
      </a-popover>
       <a-popover v-if="column.key === 'restJiaban' && record.restJiaban">
        <template #content>
          <span>{{ record.restJiaban }}</span>
        </template>
        <a-tag>查看</a-tag>
      </a-popover>
      <a-popover v-if="column.key === 'fadingJiaban' && record.fadingJiaban">
        <template #content>
          <span>{{ record.fadingJiaban }}</span>
        </template>
        <a-tag>查看</a-tag>
      </a-popover>
      <a-popover v-if="column.key === 'salaryTiaocha' && record.salaryTiaocha">
        <template #content>
          <span>{{ record.salaryTiaocha }}</span>
        </template>
        <a-tag>查看</a-tag>
      </a-popover>
       <a-popover v-if="column.key === 'canbuTiaocha' && record.canbuTiaocha">
        <template #content>
          <span>{{ record.canbuTiaocha }}</span>
        </template>
        <a-tag>查看</a-tag>
      </a-popover>
       <a-popover v-if="column.key === 'jintieTiaocha' && record.jintieTiaocha">
        <template #content>
          <span>{{ record.jintieTiaocha }}</span>
        </template>
        <a-tag>查看</a-tag>
      </a-popover>
      <a-popover v-if="column.key === 'quanqinTiaocha' && record.quanqinTiaocha">
        <template #content>
          <span>{{ record.quanqinTiaocha }}</span>
        </template>
        <a-tag>查看</a-tag>
      </a-popover>
      <span v-if="column.key == 'operation'">
        <FormOutlined @click="handleEditClick(record)"/>
      </span>
    </template>
    </a-table>
  </a-drawer>
  <OutsourceCompanyFormulaUpdate />
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import _ from 'lodash';
import { CloseOutlined,FormOutlined } from '@ant-design/icons-vue';
import { cycleFormulaOption } from '/@/api/outsourceDetail/constants';
import type { TableColumnsType } from 'ant-design-vue';
import OutsourceCompanyFormulaUpdate from './OutsourceCompanyFormulaUpdate.vue';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { outsourceFormulaFlag, getOutsourceFormulaList, addOutsourceFormulaFlag, pageOutsourceFormulaList, outsourceFormulaForm } = storeToRefs(outsourceDetailStore);
const drawerWidth = ref(Math.max(600, window.innerWidth * 0.85));
const columns:TableColumnsType = [
  {
    title: '编号',
    dataIndex: 'index',
    key: 'index',
    fixed: 'left',
    width: 20,
  },
  {
    title: '公司',
    dataIndex: 'companyName',
    key: 'companyName',
    fixed: 'left',
    width: 30,
    ellipsis: true,
  },
   {
    title: '品牌',
    dataIndex: 'brand',
    key: 'brand',
    fixed: 'left',
    ellipsis: true,
    width: 40,
  },
   {
    title: '城市',
    dataIndex: 'city',
    key: 'city',
    fixed: 'left',
    width: 30,
  },
  {
    title: '店铺',
    dataIndex: 'market',
    key: 'market',
    fixed: 'left',
    width: 30,
  },
   {
    title: '性质',
    dataIndex: 'jobType',
    key: 'jobType',
    fixed: 'left',
    width: 20,
  },
  {
    title: '生效日',
    dataIndex: 'startTime',
    key: 'startTime',
    width: 30,
  },
   {
    title: '周期',
    dataIndex: 'cycle',
    key: 'cycle',
    width: 30,
  },
   {
    title: '总工时',
    dataIndex: 'totalWorkHours',
    key: 'totalWorkHours',
    width: 30,
  },
  {
    title: '工时性质',
    dataIndex: 'hoursType',
    key: 'hoursType',
    width: 30,
  },
  {
    title: '账单月',
    dataIndex: 'zhanDanMonth',
    key: 'zhanDanMonth',
    width: 30,
  },
  {
    title: '考勤表',
    dataIndex: 'kaoQinBiao',
    key: 'kaoQinBiao',
    width: 30,
  },
  {
    title: '账单日',
    dataIndex: 'zhanDanRi',
    key: 'zhanDanRi',
    width: 30,
  },
  {
    title: '薪资日',
    dataIndex: 'xinZiRi',
    key: 'xinZiRi',
    width: 30,
  },
  {
    title: '年假',
    dataIndex: 'nianJia',
    key: 'nianJia',
    width: 30,
  },
  {
    title: '当月差额',
    dataIndex: 'dangmonthCha',
    key: 'dangmonthCha',
    width: 30,
  },
  {
    title: '出勤工资',
    dataIndex: 'chuqinSalary',
    key: 'chuqinSalary',
    width: 30,
  },
  {
    title: '餐补',
    dataIndex: 'canbu',
    key: 'canbu',
    width: 30,
  },
  {
    title: '津贴',
    dataIndex: 'jintie',
    key: 'jintie',
    width: 30,
  },
  {
    title: '全勤',
    dataIndex: 'quanqin',
    key: 'quanqin',
    width: 30,
  },
  {
    title: '正常加班',
    dataIndex: 'zhengchangJiaban',
    key: 'zhengchangJiaban',
    width: 30,
  },
  {
    title: '休息加班',
    dataIndex: 'restJiaban',
    key: 'restJiaban',
    width: 30,
  },
  {
    title: '国定加班',
    dataIndex: 'fadingJiaban',
    key: 'fadingJiaban',
    width: 30,
  },
  {
    title: '工资调差',
    dataIndex: 'salaryTiaocha',
    key: 'salaryTiaocha',
    width: 30,
  },
  {
    title: '餐补调差',
    dataIndex: 'canbuTiaocha',
    key: 'canbuTiaocha',
    width: 30,
  },
  {
    title: '津贴调差',
    dataIndex: 'jintieTiaocha',
    key: 'jintieTiaocha',
    width: 30,
  },
  {
    title: '全勤调差',
    dataIndex: 'quanqinTiaocha',
    key: 'quanqinTiaocha',
    width: 30,
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    width: 20,
    fixed: 'right',
  },
];

const handleAddOutsourceFormula = () => {
  addOutsourceFormulaFlag.value = true;       
}
const handleEditClick = (record) => {
  outsourceFormulaForm.value = _.cloneDeep(record);
  outsourceDetailStore.queryCompanyBrand(outsourceFormulaForm.value.companyName);
  outsourceDetailStore.queryMarkListSearch( outsourceFormulaForm.value.city,"");
  addOutsourceFormulaFlag.value = true;
}
</script>

<style lang="less" scoped>

</style>