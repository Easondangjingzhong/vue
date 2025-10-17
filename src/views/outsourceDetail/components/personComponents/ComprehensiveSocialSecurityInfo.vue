<template>
<a-row :gutter="24">
  <a-col :span="24" class="comprehensive-contract-info">
    <div class="comprehensive-contract-info-title">社保信息</div>
    <a-button class="comprehensive-contract-info-btn" size="small" @click="addSocialSecurityInfo">新增</a-button>
  </a-col>
</a-row>
<a-row :gutter="24">
  <a-col :span="24">
    <a-table
      size="small"
      :columns="columns"
      :data-source="getOutsourceSocialSecurityDetailList"
      :pagination="false"
      :scroll="{ x: 1800 }"
    >
  <template #bodyCell="{ column, record }">
      <span v-if="column.key == 'yijinRate'">{{ parseFloat((record.yijinRate * 100).toFixed(2)) }}%</span>
      <a-tag v-if="column.key == 'shangbaoProject' && record.shangbaoStatus == '2'" color="red">不缴</a-tag>
      <span v-if="column.key == 'keShangbao' && record.shangbaoStatus == '2'">-</span>
      <span v-if="column.key == 'shiShangbao' && record.shangbaoStatus == '2'">-</span>
      <span v-if="column.key == 'operation'">
        <FormOutlined @click="handleEditClick(record)"/>
      </span>
  </template>
  </a-table>
  </a-col>
</a-row>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { FormOutlined } from '@ant-design/icons-vue';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { getOutsourceSocialSecurityDetailList, outsourceSocialSecurityForm,outsourceSocialSecurityFlag,outsourcePersonDetail } = storeToRefs(outsourceDetailStore);

const columns = ref([
  {
    title: '基本信息',
    children: [
      {
        title: '编号',
        dataIndex: 'index',
        key: 'index',
        fixed: 'left',
        width: 40,
      },
      {
        title: '生效日期',
        dataIndex: 'shebaoShijiaoTime',
        key: 'shebaoShijiaoTime',
        fixed: 'left',
        width: 80,
      },
      {
        title: '城市',
        dataIndex: 'shebaoCity',
        key: 'shebaoCity',
        fixed: 'left',
        width: 60,
      },
      {
        title: '缴纳单位',
        dataIndex: 'shebaoCompany',
        key: 'shebaoCompany',
        fixed: 'left',
        width: 60,
      },
      {
        title: '手续费',
        dataIndex: 'serviceMoney',
        key: 'serviceMoney',
        fixed: 'left',
        width: 60,
      },
    ]
  },
  {
    title: '养老保险',
    children: [
      {
        title: '基数',
        dataIndex: 'yanglaoJishu',
        key: 'yanglaoJishu',
        width: 60,
      },
      {
        title: '企业',
        dataIndex: 'yanglaoCompany',
        key: 'yanglaoCompany',
        width: 60,
      },
       {
        title: '个人',
        dataIndex: 'yanglaoPerson',
        key: 'yanglaoPerson',
        width: 60,
      },
    ]
  },
  {
    title: '医疗生育',
    children: [
      {
        title: '基数',
        dataIndex: 'yiliaoJishu',
        key: 'yiliaoJishu',
        width: 60,
      },
      {
        title: '企医',
        dataIndex: 'yiliaoCompany',
        key: 'yiliaoCompany',
        width: 60,
      },
       {
        title: '个医',
        dataIndex: 'yiliaoPerson',
        key: 'yiliaoPerson',
        width: 60,
      },
       {
        title: '企病',
        dataIndex: 'dabingCompany',
        key: 'dabingCompany',
        width: 60,
      },
       {
        title: '个病',
        dataIndex: 'dabingPerson',
        key: 'dabingPerson',
        width: 60,
      },
       {
        title: '企育',
        dataIndex: 'shengyuCompany',
        key: 'shengyuCompany',
        width: 60,
      },
    ]
  },
  {
    title: '失业工伤',
    children: [
      {
        title: '基数',
        dataIndex: 'shiyeJishu',
        key: 'shiyeJishu',
        width: 60,
      },
      {
        title: '企失',
        dataIndex: 'shiyeCompany',
        key: 'shiyeCompany',
        width: 60,
      },
       {
        title: '个失',
        dataIndex: 'shiyePerson',
        key: 'shiyePerson',
        width: 60,
      },
       {
        title: '企工',
        dataIndex: 'gongshangCompany',
        key: 'gongshangCompany',
        width: 60,
      },
    ]
  },
  {
    title: '社保总计',
    children: [
      {
        title: '企业',
        dataIndex: 'companyTotal',
        key: 'companyTotal',
        width: 60,
      },
      {
        title: '个人',
        dataIndex: 'personTotal',
        key: 'personTotal',
        width: 60,
      },
    ]
  },
  {
    title: '公积金总计',
    children: [
      {
        title: '基数',
        dataIndex: 'yijinJishu',
        key: 'yijinJishu',
        width: 60,
      },
      {
        title: '比例',
        dataIndex: 'yijinRate',
        key: 'yijinRate',
        width: 60,
      },
       {
        title: '企业',
        dataIndex: 'yijinCompany',
        key: 'yijinCompany',
        width: 60,
      },
       {
        title: '个人',
        dataIndex: 'yijinPerson',
        key: 'yijinPerson',
        width: 60,
      },
    ]
  },
  {
    title: '商业保险',
    children: [
      {
        title: '项目',
        dataIndex: 'shangbaoProject',
        key: 'shangbaoProject',
        width: 60,
      },
      {
        title: '客户',
        dataIndex: 'keShangbao',
        key: 'keShangbao',
        width: 60,
      },
       {
        title: '实际',
        dataIndex: 'shiShangbao',
        key: 'shiShangbao',
        width: 60,
      },
    ]
  },
  {
    title: '',
    children: [
      {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        fixed: 'right',
        width: 37,
      },
    ]
  },
])
watch(() => outsourcePersonDetail.value.id, () => {
  outsourceDetailStore.queryOutsourceSheBaoByPersonId();
})
outsourceDetailStore.queryOutsourceSheBaoByPersonId();
const addSocialSecurityInfo = () => {
  outsourceDetailStore.addSocialSecurityInfo();
}
const handleEditClick = (record) => {
  outsourceSocialSecurityFlag.value = true;
  outsourceSocialSecurityForm.value = record;
}
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