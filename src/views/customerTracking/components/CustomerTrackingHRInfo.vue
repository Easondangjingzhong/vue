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
      <a-row style="position: absolute;top: 29px;left: 15px;background-color: #ffffff;height: 20px;"><h3 style="margin: 0px;">{{ hrInfoCompanyAll }}</h3></a-row>
      <a-row style="margin-top: 20px;">
        <div class="customer_track_info">
          <div class="customer_track_view">
              <table class="customer_track_table">
                <tbody v-for="item in getHrDetailList">
                <tr class="customer_track_row">
                  <th style="width: 10%" class="customer_track_label">姓名</th>
                  <th style="width: 3%" class="customer_track_label">性别</th>
                  <th style="width: 15%" class="customer_track_label">职位</th>
                  <th style="width: 10%" class="customer_track_label">固话</th>
                  <th style="width: 10%" class="customer_track_label">手机</th>
                  <th style="width: 10%" class="customer_track_label">微信</th>
                  <th style="width: 15%" class="customer_track_label">邮箱</th>
                  <th style="width: 3%" class="customer_track_label">周期</th>
                  <th style="width: 3%" class="customer_track_label">简历</th>
                  <th style="width: 3%" class="customer_track_label">礼物</th>
                  <th style="width: 3%" class="customer_track_label">当状</th>
                  <th style="width: 3%" class="customer_track_label">排序</th>
                </tr>
                  <tr class="customer_track_row">
                    <td class="customer_track_content"><strong :title="item?.hrName || ''">{{item?.hrName || ''}}</strong></td>
                    <td class="customer_track_content">{{item?.gender || ''}}</td>
                    <td class="customer_track_content">{{item?.positionName || ''}}</td>
                    <td class="customer_track_content">{{item?.telPhone || ''}}</td>
                    <td class="customer_track_content">{{item?.mobilePhone || ''}}</td>
                    <td class="customer_track_content">{{item?.wechat || ''}}</td>
                    <td class="customer_track_content">{{item?.email || ''}}</td>
                    <td class="customer_track_content"><a-tag>查看</a-tag></td>
                    <td class="customer_track_content">
                      <a-tag v-if="item.resumePath" color="cyan"><a :href="item.resumePath">查看</a></a-tag>
                      <a-tag v-else>暂无</a-tag>
                    </td>
                    <td class="customer_track_content">
                      <a-tag v-if="item.liWu" color="cyan">{{ item.liWu }}</a-tag>
                      <a-tag v-else>暂无</a-tag>
                    </td>
                    <td class="customer_track_content">
                      <a-tag :color="item.jobType === '在职' ? 'success' : 'error'">{{ item.jobType }}</a-tag>
                    </td>
                    <td class="customer_track_content">{{ item.showNum }}</td>
                  </tr>
                  <tr class="customer_track_row">
                    <td class="customer_track_label" colspan="1">负责品牌</td>
                    <td class="customer_track_content" colspan="11">{{item?.brandName || ''}}</td>
                  </tr>
                   <tr class="customer_track_row">
                    <td class="customer_track_label" colspan="1">负责工作</td>
                    <td class="customer_track_content" colspan="11">{{item?.work || ''}}</td>
                  </tr>
                  <tr class="customer_track_row">
                    <td class="customer_track_label" colspan="1">企业顾问</td>
                    <td class="customer_track_content" colspan="3">{{item?.consuler || ''}}</td>
                    <td class="customer_track_label" colspan="1">添顾</td>
                    <td class="customer_track_content" colspan="2">{{ item.createUser + "/" + dayjs(item.createTime).format("YYYY-MM-DD") }}</td>
                    <td class="customer_track_label" colspan="1">更时</td>
                    <td class="customer_track_content" colspan="4">
                      <div class="toggle-item">
                        <span>{{ dayjs(item.updateTime).format("YYYY-MM-DD") }}</span>
                        <DownOutlined @click="toggleItem(item.id)" :style="{ transition: 'transform 0.3s ease', transform: expandedItems[item.id] ? 'rotate(360deg)' : 'rotate(270deg)' }" />
                      </div>
                    </td>
                  </tr>
                  <tr class="customer_track_row" v-if="expandedItems[item.id]">
                    <td class="customer_track_label" colspan="1">综合信息</td>
                    <td class="customer_track_content" colspan="11">{{ (item.birthDay ? item.birthDay : '') + (item.starSeat ? (item.birthDay ? "/" : "")+item.starSeat : '')+(item.marriage ? (item.starSeat ? "/" : "")+item.marriage : '')  }}</td>
                  </tr>
                  <tr class="customer_track_row" v-if="expandedItems[item.id]">
                    <td class="customer_track_label" colspan="1">地址</td>
                    <td class="customer_track_content" colspan="11">{{ (item.officeAddress ? item.officeAddress.replaceAll("&","") : '') +(item.familyAddress ? (item.officeAddress ? "/" : "")+item.familyAddress.replaceAll("&","") : '') }}</td>
                  </tr>
                  <tr class="customer_track_row" v-if="expandedItems[item.id]">
                    <td class="customer_track_label" colspan="1">备注</td>
                    <td class="customer_track_content" colspan="11">{{ item.remark }}</td>
                  </tr>
                </tbody>
              </table>
          </div>
        </div>
      </a-row>
      <!-- <div v-for="item in getHrDetailList" :key="item.id">
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
      </div> -->
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
const toggleItem = (id: string) => {
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
  .customer_track_info{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: rgba(0, 0, 0, 0.88);
    font-size: 0.07292rem;
    line-height: 1.5714285714285714;
    list-style: none;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'
  }
  .customer_track_view {
    border-radius: 8px;
    border: 0.666667px solid #0505050f;
  }
  .customer_track_table {
    width: 100%;
    table-layout: fixed;
    text-align: left;
    border-spacing: 0px;
    margin-bottom: 3px;
  }
  .customer_track_row {
    border-bottom: 0.666667px solid #0505050f;
  }
  .customer_track_content {
    padding: 6px 12px;
    background-color: #ffffff;
    border-inline-end: 0.666667px solid #0505050f;
    border-bottom: 0.666667px solid #0505050f;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .customer_track_label {
    padding: 6px 12px;;
    background-color: rgba(0, 0, 0, 0.02);
    border-inline-end: 0.666667px solid #0505050f;
    border-bottom: 0.666667px solid #0505050f;
  }
</style>