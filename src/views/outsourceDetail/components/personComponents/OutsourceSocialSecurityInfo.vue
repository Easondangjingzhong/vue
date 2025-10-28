<template>
 <a-drawer
    v-model:open="outsourceSocialSecuritInfoFlag"
    title="社保基数"
    :maskClosable="false"
    :keyboard="false"
    :closable="false"
    :width="drawerWidth"
    :bodyStyle="{ padding: '4px 14px' }"
    :headerStyle="{ padding: '5px 18px 5px 12px' }"
    placement="right"
  >
    <template #extra>
      <CloseOutlined @click="outsourceSocialSecuritInfoFlag = false" />
    </template>
    <a-table
      size="small"
      :pagination="false"
      rowKey="key"
      :columns="columns"
      :dataSource="getOutsourceSocialSecuritInfoList"
      :scroll="{ x: 1910 }"
    >
    <template #bodyCell="{ column, record }">
      <a-tag v-if="column.key === 'flag' && record.flag === '1'" color="green">有效</a-tag>
      <a-tag v-if="column.key === 'flag' && (record.flag === '2' || !record.flag)" color="red">无效</a-tag>
      <span v-if="column.key === 'addDeleteDay'">{{ record.addDeleteDay + "日" }}</span>
      <span v-if="column.key === 'companyJiao'">{{ companyJiaoOption.find(item => item.value === record.companyJiao)?.label || '-' }}</span>
      <a v-if="column.key === 'cityNum'" @click="handleCityNumClick(record.city)">{{ record.cityNum }}</a>
      <span v-if="column.key === 'startTime'">{{ record.startTime }}-{{ record.endTime ? record.endTime : '至今' }}</span>
      <template v-if="column.key === 'operation'">
          <a-dropdown>
            <span class="ant-dropdown-link" style="cursor: pointer;" @click.prevent>
              <MenuUnfoldOutlined style="font-size: 15px;"/>
            </span>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                 <a href="javascript:;" @click="handleUpdateSocialSecurity(record, '2')">修改</a>
                </a-menu-item>
                <a-menu-item>
                 <a href="javascript:;" @click="handleUpdateSocialSecurity(record, '1')">新增</a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </template>
    </template>
  </a-table>
  </a-drawer>
  <OutsourceSocialSecurityInfoUpdate />
  <OutsourceSocialSecurityInfoDetails />
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import _ from 'lodash';
import OutsourceSocialSecurityInfoUpdate from './OutsourceSocialSecurityInfoUpdate.vue';
import OutsourceSocialSecurityInfoDetails from './OutsourceSocialSecurityInfoDetails.vue';
import { CloseOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
import { companyJiaoOption } from '/@/api/outsourceDetail/constants';
import type { TableColumnsType } from 'ant-design-vue';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { outsourceSocialSecuritInfoFlag,getOutsourceSocialSecuritInfoList,outsourceSocialSecurityInfoFormFlag,outsourceSocialSecurityInfoForm,outsourceSocialSecurityInfoFormType } = storeToRefs(outsourceDetailStore);
const drawerWidth = ref(Math.max(600, window.innerWidth * 0.9));
const columns:TableColumnsType = [
  {
    title: '编号',
    dataIndex: 'index',
    key: 'index',
    fixed: 'left',
    width: 25,
  },
  {
    title: '城市',
    dataIndex: 'city',
    key: 'city',
    fixed: 'left',
    width: 30,
    ellipsis: true,
  },
   {
    title: '标识',
    dataIndex: 'shebaoSign',
    key: 'shebaoSign',
    fixed: 'left',
    width: 30,
  },
   {
    title: '状态',
    dataIndex: 'flag',
    key: 'flag',
    fixed: 'left',
    width: 30,
  },
  {
    title: '发布月',
    dataIndex: 'issueTime',
    key: 'issueTime',
    fixed: 'left',
    width: 40,
  },
   {
    title: '生效月',
    dataIndex: 'startTime',
    key: 'startTime',
    fixed: 'left',
    width: 65,
  },
  {
    title: h('a-tooltip', { title: '社保最低基数' }, h('span', {'style': 'background: linear-gradient(45deg, transparent 90%, #f90202 0);padding-right: 5px;'}, '社基')),
    dataIndex: 'shebaoBase',
    key: 'shebaoBase',
    width: 35,
  },
  {
    title: h('a-tooltip', { title: '养老企业比例' }, h('span', {'style': 'background: linear-gradient(45deg, transparent 90%, #f90202 0);padding-right: 5px;'}, '企养')),
    dataIndex: 'companyYanglaoRate',
    key: 'companyYanglaoRate',
    width: 35,
  },
    {
    title: h('a-tooltip', { title: '养老个人比例' }, h('span', {'style': 'background: linear-gradient(45deg, transparent 90%, #f90202 0);padding-right: 5px;'}, '个养')),
    dataIndex: 'personYanglaoRate',
    key: 'personYanglaoRate',
    width: 35,
  },
  {
    title: h('a-tooltip', { title: '失业最低基数' }, h('span', {'style': 'background: linear-gradient(45deg, transparent 90%, #f90202 0);padding-right: 5px;'}, '失基')),
    dataIndex: 'personShiyeBase',
    key: 'personShiyeBase',
    width: 35,
  },
    {
    title: h('a-tooltip', { title: '失业企业比例' }, h('span', {'style': 'background: linear-gradient(45deg, transparent 90%, #f90202 0);padding-right: 5px;'}, '企失')),
    dataIndex: 'companyShiyeRate',
    key: 'companyShiyeRate',
    width: 35,
  },
    {
    title: h('a-tooltip', { title: '失业个人比例' }, h('span', {'style': 'background: linear-gradient(45deg, transparent 90%, #f90202 0);padding-right: 5px;'}, '个失')),
    dataIndex: 'personShiyeRate',
    key: 'personShiyeRate',
    width: 35,
  },
   {
    title: h('a-tooltip', { title: '工伤最低基数' }, h('span', {'style': 'background: linear-gradient(45deg, transparent 90%, #f90202 0);padding-right: 5px;'}, '工基')),
    dataIndex: 'companyGongshangBase',
    key: 'companyGongshangBase',
    width: 35,
  },
    {
    title: h('a-tooltip', { title: '工伤企业比例' }, h('span', {'style': 'background: linear-gradient(45deg, transparent 90%, #f90202 0);padding-right: 5px;'}, '企工')),
    dataIndex: 'companyGongshangRate',
    key: 'companyGongshangRate',
    width: 35,
  },
  {
    title: h('a-tooltip', { title: '医疗最低基数' }, h('span', {'style': 'background: linear-gradient(45deg, transparent 90%, #f90202 0);padding-right: 5px;'}, '医基')),
    dataIndex: 'personYiliaoBase',
    key: 'personYiliaoBase',
    width: 35,
  },
  {
    title: h('a-tooltip', { title: '医疗企业比例' }, h('span', {'style': 'background: linear-gradient(45deg, transparent 90%, #f90202 0);padding-right: 5px;'}, '企医')),
    dataIndex: 'companyYiliaoRate',
    key: 'companyYiliaoRate',
    width: 35,
  },
  {
    title: h('a-tooltip', { title: '医疗个人比例' }, h('span', {'style': 'background: linear-gradient(45deg, transparent 90%, #f90202 0);padding-right: 5px;'}, '个医')),
    dataIndex: 'personYiliaoRate',
    key: 'personYiliaoRate',
    width: 35,
  },
   {
    title: h('a-tooltip', { title: '企业大病' }, h('span', {'style': 'background: linear-gradient(45deg, transparent 90%, #f90202 0);padding-right: 5px;'}, '企病')),
    dataIndex: 'companyDabingRate',
    key: 'companyDabingRate',
    width: 35,
  },
  {
    title: h('a-tooltip', { title: '个人大病' }, h('span', {'style': 'background: linear-gradient(45deg, transparent 90%, #f90202 0);padding-right: 5px;'}, '个病')),
    dataIndex: 'personDabingRate',
    key: 'personDabingRate',
    width: 35,
  },
  {
    title: h('a-tooltip', { title: '生育企业比例' }, h('span', {'style': 'background: linear-gradient(45deg, transparent 90%, #f90202 0);padding-right: 5px;'}, '企育')),
    dataIndex: 'companyShengyuRate',
    key: 'companyShengyuRate',
    width: 35,
  },
  {
    title: h('a-tooltip', { title: '一金最低基数' }, h('span', {'style': 'background: linear-gradient(45deg, transparent 90%, #f90202 0);padding-right: 5px;'}, '公基')),
    dataIndex: 'personYijinBase',
    key: 'personYijinBase',
    width: 35,
  },
  {
    title: h('a-tooltip', { title: '一金企业比例' }, h('span', {'style': 'background: linear-gradient(45deg, transparent 90%, #f90202 0);padding-right: 5px;'}, '企金')),
    dataIndex: 'companyYijinRate',
    key: 'companyYijinRate',
    width: 35,
  },
  {
    title: h('a-tooltip', { title: '一金个人比例' }, h('span', {'style': 'background: linear-gradient(45deg, transparent 90%, #f90202 0);padding-right: 5px;'}, '个金')),
    dataIndex: 'personYijinRate',
    key: 'personYijinRate',
    width: 35,
  },
  {
    title: h('a-tooltip', { title: '客户商业保险收费' }, h('span', {'style': 'background: linear-gradient(45deg, transparent 90%, #f90202 0);padding-right: 5px;'}, '客商')),
    dataIndex: 'shangBao',
    key: 'shangBao',
    width: 35,
  },
  {
    title: h('a-tooltip', { title: '实际商业保险支出' }, h('span', {'style': 'background: linear-gradient(45deg, transparent 90%, #f90202 0);padding-right: 5px;'}, '实商')),
    dataIndex: 'shiShangBao',
    key: 'shiShangBao',
    width: 35,
  },
   {
    title: h('a-tooltip', { title: '增减日期' }, h('span', {'style': 'background: linear-gradient(45deg, transparent 90%, #f90202 0);padding-right: 5px;'}, '增减')),
    dataIndex: 'addDeleteDay',
    key: 'addDeleteDay',
    width: 35,
  },
   {
    title: '增减月份',
    dataIndex: 'addDeleteMonth',
    key: 'addDeleteMonth',
    width: 70,
  },
   {
    title: '补缴',
    dataIndex: 'bujiao',
    key: 'bujiao',
    width: 40,
  },
   {
    title: '缴纳公司',
    dataIndex: 'companyJiao',
    key: 'companyJiao',
    width: 40,
    fixed: 'right',
  },
  {
    title: '手续费',
    dataIndex: 'handingFee',
    key: 'handingFee',
    width: 30,
    fixed: 'right',
  },
  {
    title: '调次',
    dataIndex: 'cityNum',
    key: 'cityNum',
    width: 25,
    fixed: 'right',
  },
  {
    title: '更新日期',
    dataIndex: 'updateTime',
    key: 'updateTime',
    width: 50,
    fixed: 'right',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    width: 30,
    fixed: 'right',
  },
];

const handleUpdateSocialSecurity = (record, type) => {
  outsourceSocialSecurityInfoForm.value = _.cloneDeep(record);
  outsourceSocialSecurityInfoFormFlag.value = true;
  outsourceSocialSecurityInfoFormType.value = type;
}
const handleCityNumClick = (city) => {
  outsourceDetailStore.queryOutsourceShebaoInfoDetails(city);
}
</script>

<style lang="less" scoped>

</style>