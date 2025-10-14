<template>
<a-row :gutter="24">
  <a-col :span="24" class="comprehensive-contract-info">
      <div class="comprehensive-contract-info-title">合同信息</div>
      <a-button class="comprehensive-contract-info-btn" size="small" @click="handleAddClick">新增</a-button>
    </a-col>
</a-row>
<a-row :gutter="24">
  <a-col :span="24">
    <a-table
      size="small"
      :columns="columns"
      :data-source="getOutsourceContractList"
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
import { PersonContractItem } from '/@/api/outsourceDetail/model';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { outsourceContractForm, outsourceContractFlag, getOutsourceContractList,outsourcePersonDetail } = storeToRefs(outsourceDetailStore);

const columns = ref([
  {
    title: '编号',
    dataIndex: 'index',
    key: 'index',
    fixed: 'left',
    width: 20,
  },
  {
    title: 'OFFER日期',
    dataIndex: 'offerTime',
    key: 'offerTime',
    fixed: 'left',
    width: 50,
  },
  {
    title: 'OFFER',
    dataIndex: 'offerSign',
    key: 'offerSign',
    fixed: 'left',
    width: 50,
  },
  {
    title: '合同类型',
    dataIndex: 'contractType',
    key: 'contractType',
    fixed: 'left',
    width: 50,
  },
  {
    title: '合同状态',
    dataIndex: 'contractStatus',
    key: 'contractStatus',
    fixed: 'left',
    width: 50,
  },
  {
    title: '签署类型',
    dataIndex: 'signType',
    key: 'signType',
    width: 50,
  },
  {
    title: '签署公司',
    dataIndex: 'signCompany',
    key: 'signCompany',
    width: 50,
  },
  {
    title: '签署日期',
    dataIndex: 'signDate',
    key: 'signDate',
    width: 50,
  },
  {
    title: '合同开始',
    dataIndex: 'startDate',
    key: 'startDate',
    width: 50,
  },
  {
    title: '合同结束',
    dataIndex: 'endDate',
    key: 'endDate',
    width: 50,
  },
  {
    title: '合同周期',
    dataIndex: 'contractCycle',
    key: 'contractCycle',
    width: 50,
  },
  {
    title: '离职申请',
    dataIndex: 'leaveApply',
    key: 'leaveApply',
    width: 50,
  },
  {
    title: '合同状态',
    dataIndex: 'contractFlag',
    key: 'contractFlag',
    width: 50,
  },
  {
    title: '失效原因',
    dataIndex: 'loseReason',
    key: 'loseReason',
    width: 50,
  },
  {
    title: '失效日期',
    dataIndex: 'loseDate',
    key: 'loseDate',
    width: 50,
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    fixed: 'right',
    width: 20,
  },
])

const handleAddClick = () => {
  outsourceContractForm.value = {} as PersonContractItem;
  outsourceContractFlag.value = true;
}
watch(() => outsourcePersonDetail.value.id, () => {
  outsourceDetailStore.queryOutsourcePersonContract();
})
outsourceDetailStore.queryOutsourcePersonContract();
const handleEditClick = (record: PersonContractItem) => {
  outsourceContractForm.value = record;
  outsourceContractFlag.value = true;
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