<template>
 <a-drawer
    v-model:open="outsourcePersonDetailFlag"
    :maskClosable="false"
    :keyboard="false"
    :closable="false"
    :width="drawerWidth"
    :bodyStyle="{ padding: '4px 14px' }"
    :headerStyle="{ padding: '5px 18px 5px 12px' }"
    placement="right"
  >
    <template #extra>
      <CloseOutlined @click="outsourcePersonDetailFlag = false" />
    </template>
    <div>
      <ComprehensiveBasicInfo />
    </div>
  </a-drawer>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { message } from 'ant-design-vue';
import { CloseOutlined } from '@ant-design/icons-vue';
import ComprehensiveBasicInfo from './salaryComponents/ComprehensiveBasicInfo.vue';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { outsourcePersonDetailFlag, outsourcePersonDetail } = storeToRefs(outsourceDetailStore);
const drawerWidth = ref(Math.max(600, window.innerWidth * 0.8));

</script>

<style lang="less" scoped>
.brand-col {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>