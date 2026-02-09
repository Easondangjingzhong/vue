<template>
 <a-drawer
    v-model:open="outsourcePersonPerformanceDetailFlag"
    title="业绩分配"
    :maskClosable="false"
    :keyboard="false"
    :closable="false"
    :width="drawerWidth"
    :bodyStyle="{ padding: '4px 14px' }"
    :headerStyle="{ padding: '5px 18px 5px 12px' }"
    placement="right"
  >
    <template #extra>
      <CloseOutlined @click="outsourcePersonPerformanceDetailFlag = false" />
    </template>
    <div>
      <ComprehensiveBasicInfo />
      <ComprehensiveSalaryStarand />
      <ComprehensiveSalaryAttend />
      <ComprehensiveSalarySheBao />
      <ComprehensiveSalaryMonth />
      <ComprehensiveCost />
      <ComprehensiveCostAllocation />
    </div>
  </a-drawer>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { CloseOutlined } from '@ant-design/icons-vue';
import ComprehensiveBasicInfo from './salaryComponents/ComprehensiveBasicInfo.vue';
import ComprehensiveSalaryStarand from './salaryComponents/ComprehensiveSalaryStarand.vue';
import ComprehensiveSalarySheBao from './salaryComponents/ComprehensiveSalarySheBao.vue';
import ComprehensiveSalaryAttend from './salaryComponents/ComprehensiveSalaryAttend.vue';
import ComprehensiveSalaryMonth from './salaryComponents/ComprehensiveSalaryMonth.vue';
import ComprehensiveCost from './salaryComponents/ComprehensiveCost.vue';
import ComprehensiveCostAllocation from './salaryComponents/ComprehensiveCostAllocation.vue';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { outsourcePersonPerformanceDetailFlag } = storeToRefs(outsourceDetailStore);
const drawerWidth = ref(Math.max(600, window.innerWidth * 0.8));

</script>

<style lang="less" scoped>
.brand-col {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>