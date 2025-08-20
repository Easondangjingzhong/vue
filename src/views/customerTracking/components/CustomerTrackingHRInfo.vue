<template>
  <a-drawer
    v-model:open="hrInfoFlag"
    title="HR信息"
    :maskClosable="false"
    :keyboard="false"
    :closable="false"
    :width="drawerWidth"
    :bodyStyle="{ padding: '4px 14px' }"
    :headerStyle="{ padding: '5px 18px 5px 12px' }"
    placement="right"
  >
    <template #extra>
      <CloseOutlined @click="hrInfoFlag = false" />
    </template>
    <div>
      <a-row><h3 style="margin: 0px;">{{ hrInfoCompanyAll }}</h3></a-row>
      <div v-for="item in getHrDetailList" :key="item.id">
    <a-descriptions class="top-descriptions" bordered layout="vertical" :column="12" style="margin-top: 5px;" size="small">
      <a-descriptions-item label="姓名"><strong>{{ item.hrName }}</strong></a-descriptions-item>
      <a-descriptions-item label="性别">{{ item.gender }}</a-descriptions-item>
      <a-descriptions-item label="职位">{{ item.positionName }}</a-descriptions-item>
      <a-descriptions-item label="固话">{{ item.telPhone }}</a-descriptions-item>
      <a-descriptions-item label="手机">{{ item.mobilePhone }}</a-descriptions-item>
      <a-descriptions-item label="微信">{{ item.wechat }}</a-descriptions-item>
      <a-descriptions-item label="邮箱">{{ item.email }}</a-descriptions-item>
      <a-descriptions-item label="周期"><a-tag>查看</a-tag></a-descriptions-item>
      <a-descriptions-item label="简历">
        <a-tag v-if="item.resumePath" color="cyan"><a :href="item.resumePath">查看</a></a-tag>
        <a-tag v-else>暂无</a-tag>
      </a-descriptions-item>
      <a-descriptions-item label="礼物">
        <a-tag v-if="item.liWu" color="cyan">{{ item.liWu }}</a-tag>
        <a-tag v-else>暂无</a-tag>
      </a-descriptions-item>
      <a-descriptions-item label="当状"><a-tag :color="item.jobType === '在职' ? 'success' : 'error'">{{ item.jobType }}</a-tag></a-descriptions-item>
      <a-descriptions-item label="排序">{{ item.showNum }}</a-descriptions-item>
    </a-descriptions>
     <a-descriptions 
     class="center-descriptions"
     bordered layout="horizontal" :column="1" size="small" :labelStyle="{ width: '75px' }">
      <a-descriptions-item label="负责品牌">{{ item.brandName }}</a-descriptions-item>
      <a-descriptions-item label="负责工作">{{ item.work }}</a-descriptions-item>
     </a-descriptions>
     <a-descriptions 
     :class="{'center-descriptions': expandedItems[item.id], 'expand-descriptions': !expandedItems[item.id]}" 
     bordered layout="horizontal" size="small" :labelStyle="{ width: '75px' }">
      <a-descriptions-item label="企业顾问">{{ item.consuler }}</a-descriptions-item>
      <a-descriptions-item label="添顾">
      {{ item.createUser + "/" + dayjs(item.createTime).format("YYYY-MM-DD") }}
      </a-descriptions-item>
     <a-descriptions-item label="更时">
      <div class="toggle-item">
      <span>{{ dayjs(item.updateTime).format("YYYY-MM-DD") }}</span>
          <DownOutlined @click="toggleItem(item.id)" :style="{ transition: 'transform 0.3s ease', transform: expandedItems[item.id] ? 'rotate(360deg)' : 'rotate(270deg)' }" />
      </div>
      </a-descriptions-item>
     </a-descriptions>
    <a-descriptions class="bottom-descriptions"
      v-if="expandedItems[item.id]" bordered layout="horizontal" :column="1" size="small" :labelStyle="{ width: '75px' }">
      <a-descriptions-item label="综合信息">{{ (item.birthDay ? item.birthDay : '') + (item.starSeat ? (item.birthDay ? "/" : "")+item.starSeat : '')+(item.marriage ? (item.starSeat ? "/" : "")+item.marriage : '')  }}</a-descriptions-item>
      <a-descriptions-item label="地址">{{ (item.officeAddress ? item.officeAddress.replaceAll("&","") : '') +(item.familyAddress ? (item.officeAddress ? "/" : "")+item.familyAddress.replaceAll("&","") : '') }}</a-descriptions-item>
      <a-descriptions-item label="备注">{{ item.remark }}</a-descriptions-item>
    </a-descriptions>
      </div>
    </div>
  </a-drawer>
</template>

<script setup lang="ts">
import { CloseOutlined, DownOutlined } from '@ant-design/icons-vue';
import { useCustomerTrackingStoreWithOut } from '/@/store/modules/customerTracking';
import dayjs from 'dayjs';
import { storeToRefs } from 'pinia';
const customerTrackingStore = useCustomerTrackingStoreWithOut();
const { hrInfoFlag, getHrDetailList, hrInfoCompanyAll } = storeToRefs(customerTrackingStore);
const drawerWidth = ref(Math.max(1000, window.innerWidth * 0.8));
const expandedItems = reactive<Record<string, boolean>>({});
const toggleItem = (id: number) => {
  expandedItems[id] = !expandedItems[id];
};
</script>

<style lang="less" scoped>
 :deep(.top-descriptions .ant-descriptions-view){
  /* 移除底部边框和圆角 */
  border-bottom: none !important;
  border-radius: 8px 8px 0 0 !important;
}
:deep(.center-descriptions .ant-descriptions-view){
  /* 移除底部边框和圆角 */
  border-bottom: none !important;
  border-radius: 0 !important;
}
:deep(.expand-descriptions .ant-descriptions-view){
  border-radius: 0 0 8px 8px !important;
}
:deep(.bottom-descriptions .ant-descriptions-view) {
  /* 移除顶部圆角 */
  border-radius: 0 0 8px 8px !important;
}
.toggle-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  cursor: pointer;
}
</style>