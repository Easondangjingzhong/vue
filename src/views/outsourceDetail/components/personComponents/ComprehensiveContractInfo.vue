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
      :scroll="{ x: 1100 }"
    >
    <template #bodyCell="{ column, record }">
      <a-tag v-if="column.key === 'offerSign' && record.offerSign == '等待发起'" color="red">等待发起</a-tag>
      <a-tag v-if="column.key === 'offerSign' && record.offerSign == '已经发起'" color="orange">已经发起</a-tag>
      <a-tag v-if="column.key === 'offerSign' && record.offerSign == '签署完成'" color="green">签署完成</a-tag>

      <a-tag v-if="column.key === 'contractFlag' && record.contractFlag == '等待发起'" color="red">等待发起</a-tag>
      <a-tag v-if="column.key === 'contractFlag' && record.contractFlag == '已经发起'" color="orange">已经发起</a-tag>
      <a-tag v-if="column.key === 'contractFlag' && record.contractFlag == '签署完成'" color="green">签署完成</a-tag>

      <a-tag v-if="column.key === 'contractStatus' && record.contractStatus == '生效中'" color="green">生效中</a-tag>
      <a-tag v-if="column.key === 'contractStatus' && record.contractStatus == '已失效'" color="red">已失效</a-tag>

       <!-- 添加类型断言和存在性检查以修复TypeScript索引类型错误 -->
      <span v-if="(typeof column.dataIndex === 'string' && (record[column.dataIndex] === null || record[column.dataIndex] === ''))">-</span>
 
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
import _ from 'lodash';
import type { TableColumnsType } from 'ant-design-vue';
import { FormOutlined } from '@ant-design/icons-vue';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
import { PersonContractItem } from '/@/api/outsourceDetail/model';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { outsourceContractForm, outsourceContractFlag, getOutsourceContractList,outsourcePersonDetail } = storeToRefs(outsourceDetailStore);

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
    title: 'OFFER日期',
    dataIndex: 'offerTime',
    key: 'offerTime',
    fixed: 'left',
    width: 40,
  },
  {
    title: 'OFFER',
    dataIndex: 'offerSign',
    key: 'offerSign',
    fixed: 'left',
    width: 30,
  },
  {
    title: '合同类型',
    dataIndex: 'contractType',
    key: 'contractType',
    fixed: 'left',
    width: 30,
  },
  {
    title: '合同状态',
    dataIndex: 'contractFlag',
    key: 'contractFlag',
    fixed: 'left',
    width: 30,
  },
  {
    title: '签署类型',
    dataIndex: 'signType',
    key: 'signType',
    width: 30,
  },
  {
    title: '签署公司',
    dataIndex: 'signCompany',
    key: 'signCompany',
    width: 30,
  },
  {
    title: '签署日期',
    dataIndex: 'signDate',
    key: 'signDate',
    width: 40,
  },
  {
    title: '合同开始',
    dataIndex: 'startDate',
    key: 'startDate',
    width: 40,
  },
  {
    title: '合同结束',
    dataIndex: 'endDate',
    key: 'endDate',
    width: 40,
  },
  {
    title: '合同周期',
    dataIndex: 'contractCycle',
    key: 'contractCycle',
    width: 30,
  },
  {
    title: '离职申请',
    dataIndex: 'leaveApply',
    key: 'leaveApply',
    width: 30,
  },
  {
    title: '合同状态',
    dataIndex: 'contractStatus',
    key: 'contractStatus',
    width: 30,
  },
  {
    title: '失效原因',
    dataIndex: 'loseReason',
    key: 'loseReason',
    width: 30,
  },
  {
    title: '失效日期',
    dataIndex: 'loseDate',
    key: 'loseDate',
    width: 40,
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    fixed: 'right',
    width: 20,
  },
]

const handleAddClick = () => {
  outsourceDetailStore.handleAddPersonContract();
}
watch(() => outsourcePersonDetail.value.id, () => {
  outsourceDetailStore.queryOutsourcePersonContract();
})
outsourceDetailStore.queryOutsourcePersonContract();
const handleEditClick = (record: PersonContractItem) => {
  outsourceContractForm.value = _.cloneDeep(record);
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