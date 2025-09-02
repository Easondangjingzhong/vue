<template>
  <a-drawer
    v-model:open="customerTrackInfoFlag"
    title="客户信息"
    :maskClosable="false"
    :keyboard="false"
    :closable="false"
    :width="drawerWidth"
    :bodyStyle="{ padding: '4px 14px' }"
    :headerStyle="{ padding: '5px 18px 5px 12px' }"
    placement="right"
  >
    <template #extra>
      <CloseOutlined @click="customerTrackInfoFlag = false" />
    </template>
    <div>
      <a-row><h3 style="margin: 0px;">{{customerTrackInfo.companyNameAll}}</h3></a-row>
      <a-row style="margin-top: 10px;">
        <a-col :span="2" v-if="!customerTrackInfo.type">
          <a-select 
            v-model:value="customerTrackInfo.type"
            :options="typeOptions"
            size="small"
            @change="handleCustomerTrackTypeChange"
            placeholder="请选择"></a-select>
        </a-col>
        <a-col :span="2" v-if="!customerTrackInfo.flag">
            <a-select 
            v-model:value="customerTrackInfo.flag"
            :options="flagOptions"
            size="small"
            @change="handleCustomerTrackFlagChange"
            placeholder="请选择"></a-select>
         </a-col>
        <a-col :span="12">
          <a-tag v-if="customerTrackInfo.type" color="green">{{customerTrackInfo.type}}</a-tag>

          <a-tag v-if="customerTrackInfo.flag == '已合作'" color="green">{{customerTrackInfo.flag}}</a-tag>
          <a-tag v-if="customerTrackInfo.flag == '深入中'" color="orange">{{customerTrackInfo.flag}}</a-tag>
          <a-tag v-if="customerTrackInfo.flag == '接洽中'" color="orange">{{customerTrackInfo.flag}}</a-tag>
          <a-tag v-if="customerTrackInfo.flag == '未开展'" color="red">{{customerTrackInfo.flag}}</a-tag>

          <a-tag v-if="customerTrackInfo.cooperationLie == '猎头合作'" color="green">{{customerTrackInfo.cooperationLie}}</a-tag>
          <a-tag v-if="customerTrackInfo.cooperationLie == '猎头未合'" color="orange">{{customerTrackInfo.cooperationLie}}</a-tag>
          <a-tag v-if="customerTrackInfo.cooperationLie == '猎头过期'" color="red">{{customerTrackInfo.cooperationLie}}</a-tag>
          <a-tag v-if="customerTrackInfo.cooperationWai == '外包合作'" color="green">{{customerTrackInfo.cooperationWai}}</a-tag>
          <a-tag v-if="customerTrackInfo.cooperationWai == '外包未合'" color="orange">{{customerTrackInfo.cooperationWai}}</a-tag>
          <a-tag v-if="customerTrackInfo.cooperationWai == '外包过期'" color="red">{{customerTrackInfo.cooperationWai}}</a-tag>
          
          <a-tag v-if="customerTrackInfo.meeting" color="pink"><span v-if="customerTrackInfo.meeting">约见</span>{{ customerTrackInfo.meeting }}<span v-if="customerTrackInfo.meeting">次</span></a-tag>

        </a-col>
      </a-row>
      <a-row style="margin-top: 10px;">{{customerTrackInfo.brandName}}</a-row>
      <a-row style="margin-top: 10px;">
        <div class="customer_track_info">
          <div class="customer_track_view">
              <table class="customer_track_table">
                <tbody>
                <tr class="customer_track_row">
                  <th style="width: 10%" class="customer_track_label">姓名</th>
                  <th style="width: 3%" class="customer_track_label">性别</th>
                  <th style="width: 15%" class="customer_track_label">职位</th>
                  <th style="width: 10%" class="customer_track_label">固话</th>
                  <th style="width: 10%" class="customer_track_label">手机</th>
                  <th style="width: 15%" class="customer_track_label">微信</th>
                  <th style="width: 20%" class="customer_track_label">邮箱</th>
                  <th style="width: 5%" class="customer_track_label">当状</th>
                  <th style="width: 2%;text-align: right;" class="customer_track_label">
                    <PlusOutlined @click="addCustomerTrackHRInfo"/>
                  </th>
                </tr>
                </tbody>
                <tbody v-for="item in getCustomerTrackHr">
                  <tr class="customer_track_row">
                    <td class="customer_track_content"><strong>{{item?.hrName || ''}}</strong></td>
                    <td class="customer_track_content">{{item?.gender || ''}}</td>
                    <td class="customer_track_content">{{item?.positionName || ''}}</td>
                    <td class="customer_track_content">{{item?.telPhone || ''}}</td>
                    <td class="customer_track_content">{{item?.mobilePhone || ''}}</td>
                    <td class="customer_track_content">{{item?.wechat || ''}}</td>
                    <td class="customer_track_content">{{item?.email || ''}}</td>
                    <td class="customer_track_content">{{item?.jobType || ''}}
                      <a-tag v-if="item?.jobType == '在职'" color="green">{{item?.jobType}}</a-tag>
                      <a-tag v-if="item?.jobType == '离职'" color="red">{{item?.jobType}}</a-tag>
                    </td>
                    <td class="customer_track_content" style="text-align: right;">
                      <FormOutlined @click="updateCustomerTrackHRInfo(item)"/>
                    </td>
                  </tr>
                  <tr class="customer_track_row">
                    <td class="customer_track_label" colspan="1">负责品牌</td>
                    <td class="customer_track_content" colspan="8">{{item?.brandName || ''}}</td>
                  </tr>
                  <tr class="customer_track_row">
                    <td class="customer_track_label" colspan="1">地址</td>
                    <td class="customer_track_content" colspan="8">{{item?.address || ''}}</td>
                  </tr>
                </tbody>
              </table>
          </div>
        </div>
      </a-row>
      <AddCustomerTrackingHRContract />
    </div>
  </a-drawer>
</template>

<script setup lang="ts">
import { CloseOutlined,PlusOutlined,FormOutlined } from '@ant-design/icons-vue';
import AddCustomerTrackingHRContract from './AddCustomerTrackingHRContract.vue';
import { useCustomerTrackingStoreWithOut } from '/@/store/modules/customerTracking';
import { storeToRefs } from 'pinia';
import { flagOptionsArr,typeOptionsArr } from '/@/api/customerTracking/constants';
const customerTrackingStore = useCustomerTrackingStoreWithOut();
const { customerTrackInfo, customerTrackInfoFlag, getCustomerTrackHr } = storeToRefs(customerTrackingStore);
const drawerWidth = ref(Math.max(1000, window.innerWidth * 0.4));
const typeOptions = ref(typeOptionsArr);
const flagOptions = ref(flagOptionsArr);
const handleCustomerTrackTypeChange = () => {
  customerTrackingStore.updateCustomerTrackType(customerTrackInfo.value.type);
}
const handleCustomerTrackFlagChange = () => {
  customerTrackingStore.updateCustomerTrackFlag(customerTrackInfo.value.flag);
}
const addCustomerTrackHRInfo = () => {
  customerTrackingStore.addOpenCustomerTrackHRInfo();
}
const updateCustomerTrackHRInfo = (item: any) => {
  customerTrackingStore.updateOpenCustomerTrackHRInfo(item);
}
</script>

<style lang="less" scoped>
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