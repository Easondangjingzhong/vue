<template>
<a-row :gutter="24">
  <a-col :span="24" class="comprehensive-contract-info">
    <div class="comprehensive-contract-info-title">薪资信息</div>
    <a-button class="comprehensive-contract-info-btn" size="small" @click="handleComprehensiveSalaryInfoUpdate">新增</a-button>
  </a-col>
</a-row>
<a-row :gutter="24">
  <a-col :span="24">
    <a-table
      size="small"
      :columns="columns"
      :data-source="getOutsourceSalaryDetailList"
      :pagination="false"
      :scroll="{ x: 1900 }"
    >
  <template #bodyCell="{ column, record }">
    <a-tag v-if="column.key === 'bankCard'" :title="record.bankCard">
      查看
    </a-tag>
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
import { OutsourceSalaryItem } from '/@/api/outsourceDetail/model';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { outsourceSalaryFlag, getOutsourceSalaryDetailList, outsourceSalaryForm,outsourcePersonDetail } = storeToRefs(outsourceDetailStore);

const columns = ref([
  {
    title: '编号',
    dataIndex: 'index',
    key: 'index',
    fixed: 'left',
    width: 20,
  },
  {
    title: '生效日期',
    dataIndex: 'changeTime',
    key: 'changeTime',
    fixed: 'left',
    width: 40,
    ellipsis: true,
  },
  {
    title: '调薪原因',
    dataIndex: 'changeReason',
    key: 'changeReason',
    fixed: 'left',
    width: 40,
    ellipsis: true,
  },
  {
    title: '职位',
    dataIndex: 'currentPosition',
    key: 'currentPosition',
    fixed: 'left',
    width: 60,
    ellipsis: true,
  },
  {
    title: '底薪',
    dataIndex: 'dixin',
    key: 'dixin',
    fixed: 'left',
    width: 30,
    ellipsis: true,
  },
  {
    title: '餐补',
    dataIndex: 'canbu',
    key: 'canbu',
    width: 30,
    ellipsis: true,
  },
  {
    title: '津贴',
    dataIndex: 'jintie',
    key: 'jintie',
    width: 30,
    ellipsis: true,
  },
  {
    title: '全勤',
    dataIndex: 'quanqin',
    key: 'quanqin',
    width: 30,
    ellipsis: true,
  },
  {
    title: '总计',
    dataIndex: 'zonghe',
    key: 'zonghe',
    width: 30,
    ellipsis: true,
  },
  {
    title: '单位',
    dataIndex: 'unit',
    key: 'unit',
    width: 20,
    ellipsis: true,
  },
  {
    title: '个人奖金',
    dataIndex: 'geti',
    key: 'geti',
    width: 50,
    ellipsis: true,
  },
  {
    title: '团队奖金',
    dataIndex: 'tuanti',
    key: 'tuanti',
    width: 50,
    ellipsis: true,
  },
  {
    title: '企业社保',
    dataIndex: 'companyShebao',
    key: 'companyShebao',
    width: 50,
    ellipsis: true,
  },
  {
    title: '个人社保',
    dataIndex: 'personShebao',
    key: 'personShebao',
    width: 50,
    ellipsis: true,
  },
  {
    title: '企业一金',
    dataIndex: 'companyYijin',
    key: 'companyYijin',
    width: 50,
    ellipsis: true,
  },
  {
    title: '个人一金',
    dataIndex: 'personYijin',
    key: 'personYijin',
    width: 50,
    ellipsis: true,
  },
  {
    title: '客商',
    dataIndex: 'keShangbao',
    key: 'keShangbao',
    width: 50,
    ellipsis: true,
  },
  {
    title: '实商',
    dataIndex: 'shiShangbao',
    key: 'shiShangbao',
    width: 50,
    ellipsis: true,
  },
  {
    title: '银行名称',
    dataIndex: 'bankName',
    key: 'bankName',
    width: 50,
    ellipsis: true,
  },
  {
    title: '卡号',
    dataIndex: 'bankCard',
    key: 'bankCard',
    width: 30,
    ellipsis: true,
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    fixed: 'right',
    width: 20,
  },
])
watch(() => outsourcePersonDetail.value.id, () => {
  outsourceDetailStore.queryOutsourceSalaryByPersonId();
})
outsourceDetailStore.queryOutsourceSalaryByPersonId();
const handleComprehensiveSalaryInfoUpdate = () => {
  outsourceSalaryForm.value = {} as OutsourceSalaryItem;
  outsourceSalaryFlag.value = true;
}
const handleEditClick = (record) => {
  outsourceSalaryForm.value = record;
  outsourceSalaryFlag.value = true;
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