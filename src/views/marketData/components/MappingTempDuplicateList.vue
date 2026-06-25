<template>
  <div class="duplicate-list" v-if="normalizedData.length">
    <a-table
      size="small"
      :data-source="normalizedData"
      :columns="columns"
      :pagination="false"
      :scroll="{ y: 100 }"
      row-key="rowKey"
    >
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.key === 'index'">
          {{ record.id || index + 1 }}
        </template>
        <template v-else-if="column.key === 'phoneNum'">
          {{ record.phoneNum || record.phone || '-' }}
        </template>
        <template v-else-if="column.key === 'jobStatus'">
          <a-tag v-if="record.jobStatus === '1' || record.jobStatus === '在职'" color="green">在职</a-tag>
          <a-tag v-else-if="record.jobStatus === '2' || record.jobStatus === '离职'" color="red">离职</a-tag>
          <span v-else>{{ record.jobStatus || '-' }}</span>
        </template>
        <template v-else-if="column.key === 'addTime'">
          {{ formatRecordDate(record.addTime || record.createTime) }}
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { MappingTempItem } from '/@/api/marketData/model';
import { formatToDate } from '/@/utils/dateUtil';

type DuplicateRecord = Partial<MappingTempItem> & {
  phone?: string;
  addTime?: string | number;
};

const props = defineProps<{
  data: DuplicateRecord[];
}>();

const columns = [
  { title: '编号', dataIndex: 'id', key: 'index', width: 20, ellipsis: true },
  { title: '姓名', dataIndex: 'userName', key: 'userName', width: 50, ellipsis: true },
  { title: '手机', dataIndex: 'phoneNum', key: 'phoneNum', width: 50, ellipsis: true },
  { title: '城市', dataIndex: 'city', key: 'city', width: 30, ellipsis: true },
  { title: '商场', dataIndex: 'marketName', key: 'marketName', width: 60, ellipsis: true },
  { title: '品牌', dataIndex: 'brandName', key: 'brandName', width: 80, ellipsis: true },
  { title: '职位', dataIndex: 'jobStatus', key: 'jobStatus', width: 60, ellipsis: true },
  { title: '录入日期', dataIndex: 'addTime', key: 'addTime', width: 50, ellipsis: true },
];

const normalizedData = computed(() =>
  (props.data || []).map((item, index) => ({
    ...item,
    rowKey: `${item.id || 'duplicate'}-${index}`,
  })),
);

const formatRecordDate = (value?: string | number) => {
  if (!value) return '-';
  return formatToDate(value) || '-';
};
</script>

<style scoped lang="less">
.duplicate-list {
  margin-top: 12px;
}
</style>
