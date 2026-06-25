<template>
  <div class="link-panel">
    <div class="link-tip">{{ linkTipText }}</div>
    <a-table size="small" :data-source="tableData" :columns="columns" :pagination="false" row-key="rowKey">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'floor'">
          <a-select
            :value="floor"
            placeholder="请选择楼层"
            :options="floorOptions"
            allowClear
            style="width: 60px"
            :disabled="linked || loading"
            @change="handleFloorChange"
          />
        </template>
        <template v-else-if="column.key === 'status'">
          <span class="status-text">{{ statusText }}</span>
        </template>
        <template v-else-if="column.key === 'action'">
          <a-button
            v-if="!linked"
            type="primary"
            :loading="loading"
            :disabled="!canLink"
            @click="emits('link')"
          >
            关联品牌
          </a-button>
          <a-button v-else danger :loading="loading" @click="emits('revoke')">撤销</a-button>
        </template>
      </template>
    </a-table>
    <div class="link-tip">请注意，以上信息必须准确无误，方可点击《关联品牌》按钮。</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { SelectProps } from 'ant-design-vue';

const props = defineProps<{
  city: string;
  marketName: string;
  brandName: string;
  floor: string;
  floorOptions: SelectProps['options'];
  linked?: boolean;
  loading?: boolean;
}>();

const emits = defineEmits<{
  (e: 'update:floor', value: string): void;
  (e: 'link'): void;
  (e: 'revoke'): void;
}>();

const linked = computed(() => !!props.linked);
const statusText = computed(() => (linked.value ? '已关联' : '未关联'));
const loading = computed(() => !!props.loading);
const canLink = computed(() => !!props.city && !!props.marketName && !!props.brandName && !!props.floor && !loading.value);

const linkTipText = computed(
  () =>
    `${props.marketName}中暂无${props.brandName}品牌，请仔细核对此商场是否真实存在此品牌店铺，\n若确认存在，请点击以下"关联品牌"按钮，将此商场与此品牌关联。`,
);

const handleFloorChange: SelectProps['onChange'] = (value) => {
  if (Array.isArray(value)) {
    emits('update:floor', value.length ? String(value[0] ?? '') : '');
    return;
  }
  if (value && typeof value === 'object' && 'value' in value) {
    emits('update:floor', String((value as any).value ?? ''));
    return;
  }
  emits('update:floor', value == null ? '' : String(value));
};

const columns = [
  { title: '城市', dataIndex: 'city', key: 'city', width: 60, ellipsis: true },
  { title: '商场', dataIndex: 'marketName', key: 'marketName', width: 120, ellipsis: true },
  { title: '品牌', dataIndex: 'brandName', key: 'brandName', width: 120, ellipsis: true },
  { title: '楼层', dataIndex: 'floor', key: 'floor', width: 60 },
  { title: '状态', dataIndex: 'status', key: 'status', width: 60 },
  { title: '操作', dataIndex: 'action', key: 'action', width: 60 },
];

const tableData = computed(() => [
  {
    rowKey: 'link-row',
    city: props.city || '-',
    marketName: props.marketName || '-',
    brandName: props.brandName || '-',
    floor: props.floor,
    status: statusText.value,
  },
]);
</script>

<style scoped lang="less">
.link-panel {
  margin-top: 10px;
}

.link-tip {
  margin-top: 10px;
  color: #666;
}

.status-text {
  color: #666;
}
</style>
