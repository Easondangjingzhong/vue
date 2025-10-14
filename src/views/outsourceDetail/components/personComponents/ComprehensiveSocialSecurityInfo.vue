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
      :scroll="{ x: 1600 }"
    >
  <template #bodyCell="{ column, record }">
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
      },
      {
        title: '生效日期',
        dataIndex: 'effectiveDate',
        key: 'effectiveDate',
        fixed: 'left',
      },
      {
        title: '城市',
        dataIndex: 'shebaoCity',
        key: 'shebaoCity',
        fixed: 'left',
      },
      {
        title: '缴纳单位',
        dataIndex: 'shebaoCompany',
        key: 'shebaoCompany',
        fixed: 'left',
      },
      {
        title: '手续费',
        dataIndex: 'fee',
        key: 'fee',
        fixed: 'left',
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
      },
      {
        title: '企业',
        dataIndex: 'yanglaoCompany',
        key: 'yanglaoCompany',
      },
       {
        title: '个人',
        dataIndex: 'yanglaoPerson',
        key: 'yanglaoPerson',
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
      },
      {
        title: '企医',
        dataIndex: 'yiliaoCompany',
        key: 'yiliaoCompany',
      },
       {
        title: '个医',
        dataIndex: 'yiliaoPerson',
        key: 'yiliaoPerson',
      },
       {
        title: '企病',
        dataIndex: 'dabingCompany',
        key: 'dabingCompany',
      },
       {
        title: '个病',
        dataIndex: 'dabingPerson',
        key: 'dabingPerson',
      },
       {
        title: '企育',
        dataIndex: 'shengyuCompany',
        key: 'shengyuCompany',
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
      },
      {
        title: '企失',
        dataIndex: 'shiyeCompany',
        key: 'shiyeCompany',
      },
       {
        title: '个失',
        dataIndex: 'shiyePerson',
        key: 'shiyePerson',
      },
       {
        title: '企工',
        dataIndex: 'gongshangCompany',
        key: 'gongshangCompany',
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
      },
      {
        title: '个人',
        dataIndex: 'personTotal',
        key: 'personTotal',
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
      },
      {
        title: '比例',
        dataIndex: 'yijinRate',
        key: 'yijinRate',
      },
       {
        title: '企业',
        dataIndex: 'yijinCompany',
        key: 'yijinCompany',
      },
       {
        title: '个人',
        dataIndex: 'yijinPerson',
        key: 'yijinPerson',
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
      },
      {
        title: '客户',
        dataIndex: 'keShangbao',
        key: 'keShangbao',
      },
       {
        title: '实际',
        dataIndex: 'shiShangbao',
        key: 'shiShangbao',
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