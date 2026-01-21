<template>
    <a-table
        size="small"
        :columns="columns"
        :pagination="false"
        :data-source="getOfferOutsourceSheBao"
      >
    </a-table>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import type { TableColumnsType } from 'ant-design-vue';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { getOfferOutsourceSheBao } = storeToRefs(outsourceDetailStore);
const columns:TableColumnsType= [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
    },
    {
      title: '城市',
      dataIndex: 'city',
      key: 'city',
    },
     {
      title: '项目',
      dataIndex: 'companyName',
      key: 'companyName',
    },
     {
      title: '姓名',
      dataIndex: 'userNameCn',
      key: 'userNameCn',
    },
     {
      title: '职位',
      dataIndex: 'positions',
      key: 'positions',
    },
     {
      title: '身份证号',
      dataIndex: 'idCard',
      key: 'idCard',
    },
     {
      title: '缴费月份',
      dataIndex: 'yearAndMonth',
      key: 'yearAndMonth',
    },
     {
      title: '住房公积金',
      children: [
        {
          title: '公积金基数',
          dataIndex: 'yijinCompanyJishu',
          key: 'yijinCompanyJishu',
        },
        {
          title: '单位',
          dataIndex: 'yijinCompany',
          key: 'yijinCompany',
        },
        {
          title: '个人',
          dataIndex: 'yijinPerson',
          key: 'yijinPerson',
        },
      ],
    },
     {
      title: '单位合计',
      dataIndex: 'companyTotal',
      key: 'companyTotal',
    },
     {
      title: '个人合计',
      dataIndex: 'personTotal',
      key: 'personTotal',
    },
  ];
</script>

<style lang="less" scoped>
</style>
