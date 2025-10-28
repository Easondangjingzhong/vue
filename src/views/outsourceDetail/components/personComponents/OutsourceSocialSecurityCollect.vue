<template>
 <a-drawer
    v-model:open="outsourceSocialSecurityCollectFlag"
    title="社保汇总"
    :maskClosable="false"
    :keyboard="false"
    :closable="false"
    :width="drawerWidth"
    :bodyStyle="{ padding: '4px 14px' }"
    :headerStyle="{ padding: '5px 18px 5px 12px' }"
    placement="right"
  >
    <template #extra>
      <CloseOutlined @click="outsourceSocialSecurityCollectFlag = false" />
    </template>
    <a-table
      size="small"
      :pagination="false"
      :columns="columns"
      :dataSource="getOutsourceShebaoCollect"
      rowKey="yearAndMonth"
      :expandedRowKeys="expandedRowKeys"
       :row-expandable="(record) => record.detaillist && record.detaillist.length > 0"
       @expand="onExpand"
    >
    <template #bodyCell="{ column, record }">
      <a-popconfirm v-if="column.key === 'checkFlag' && record.checkFlag === '1'" title="社保核对" :overlay-style="{ width: '130px' }" @confirm="handleChecked(1,record)">
        <a-tag style="cursor: pointer;" color="red">未核</a-tag>
      </a-popconfirm>
      <a-tag v-if="column.key === 'checkFlag' && record.checkFlag === '2'" color="green">已核</a-tag>
    </template>
    <template #expandedRowRender="{ record }">
      <a-table :columns="innerColumns" :data-source="record.detaillist" :pagination="false">
        <template #bodyCell="{ column, record }">
          <!-- <a-popconfirm v-if="column.key === 'checkFlag' && record.checkFlag === '1'" title="社保核对" :overlay-style="{ width: '130px' }" @confirm="handleChecked(2,record)">
            <a-tag style="cursor: pointer;" color="red">未核</a-tag>
          </a-popconfirm> -->
          <a-tag v-if="column.key === 'checkFlag' && record.checkFlag === '1'" color="red">未核</a-tag>
          <a-tag v-if="column.key === 'checkFlag' && record.checkFlag === '2'" color="green">已核</a-tag>
        </template>
      </a-table>
    </template>
  </a-table>
  </a-drawer>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { CloseOutlined } from '@ant-design/icons-vue';
import { OutsourceSheBaoCollectItem } from '/@/api/outsourceDetail/model';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { outsourceSocialSecurityCollectFlag,getOutsourceShebaoCollect } = storeToRefs(outsourceDetailStore);
const drawerWidth = ref(Math.max(600, window.innerWidth * 0.7));
const columns = [
  {
    title: '编号',
    dataIndex: 'index',
    key: 'index',
  },
  {
    title: '周期',
    dataIndex: 'yearAndMonth',
    key: 'yearAndMonth',
  },
   {
    title: '单位社保',
    dataIndex: 'shebaoCompany',
    key: 'shebaoCompany',
  },
   {
    title: '单位一金',
    dataIndex: 'yijinCompany',
    key: 'yijinCompany',
  },
   {
    title: '个人社保',
    dataIndex: 'shebaoPerson',
    key: 'shebaoPerson',
  },
  {
    title: '个人一金',
    dataIndex: 'yijinPerson',
    key: 'yijinPerson',
  },
  {
    title: '单位总计',
    dataIndex: 'companyTotal',
    key: 'companyTotal',
  },
    {
    title: '个人总计',
    dataIndex: 'personTotal',
    key: 'personTotal',
  },
    {
    title: '手续费',
    dataIndex: 'serviceMoney',
    key: 'serviceMoney',
  },
    {
    title: '社保总计',
    dataIndex: 'shebaoTotal',
    key: 'shebaoTotal',
  },
    {
    title: '人数',
    dataIndex: 'personNum',
    key: 'personNum',
  },
    {
    title: '核对',
    dataIndex: 'checkFlag',
    key: 'checkFlag',
  },
];
const innerColumns = [
  {
    title: '社保公司',
    dataIndex: 'companyName',
    key: 'companyName',
  },
  {
    title: '周期',
    dataIndex: 'yearAndMonth',
    key: 'yearAndMonth',
  },
   {
    title: '单位社保',
    dataIndex: 'shebaoCompany',
    key: 'shebaoCompany',
  },
   {
    title: '单位一金',
    dataIndex: 'yijinCompany',
    key: 'yijinCompany',
  },
   {
    title: '个人社保',
    dataIndex: 'shebaoPerson',
    key: 'shebaoPerson',
  },
  {
    title: '个人一金',
    dataIndex: 'yijinPerson',
    key: 'yijinPerson',
  },
  {
    title: '单位总计',
    dataIndex: 'companyTotal',
    key: 'companyTotal',
  },
    {
    title: '个人总计',
    dataIndex: 'personTotal',
    key: 'personTotal',
  },
    {
    title: '手续费',
    dataIndex: 'serviceMoney',
    key: 'serviceMoney',
  },
    {
    title: '社保总计',
    dataIndex: 'shebaoTotal',
    key: 'shebaoTotal',
  },
    {
    title: '人数',
    dataIndex: 'personNum',
    key: 'personNum',
  },
    {
    title: '核对',
    dataIndex: 'checkFlag',
    key: 'checkFlag',
  },
];
const handleChecked = async (type: number, record: any) => {
  await outsourceDetailStore.updateOutsourceShebaoChecked(record.yearAndMonth, type == 2 ? record.companyName : '');
}
// 添加展开行状态控制
const expandedRowKeys = ref<string[]>([]); // 存储展开行的key

// 处理展开/折叠事件
const onExpand = (expanded: boolean, record: OutsourceSheBaoCollectItem) => {
  if (expanded) {
    // 展开时添加key
    expandedRowKeys.value = [...expandedRowKeys.value, record.yearAndMonth];
  } else {
    // 折叠时移除key
    expandedRowKeys.value = expandedRowKeys.value.filter(key => key !== record.yearAndMonth);
  }
};
</script>

<style lang="less" scoped>

</style>