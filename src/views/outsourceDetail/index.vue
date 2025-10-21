<template>
 <MenuTop/>
  <div class="resume_container">
    <a-layout>
      <!-- <a-layout-header class="resume-header">Header</a-layout-header> -->
      <a-layout>
        <!-- <a-layout-sider class="resume_sider">
          <OutsourceDetailSider />
        </a-layout-sider> -->
        <a-layout-content class="resume_content">
           <a-tabs v-model:activeKey="outsourceDetailSider" type="card">
              <a-tab-pane key="1" tab="外包人员">
                <OutsourceContentPerson/>
              </a-tab-pane>
              <a-tab-pane key="2" tab="外包薪资">
                <OutsourceContentSalary/>
              </a-tab-pane>
              <a-tab-pane key="3" tab="外包社保">
                <OutsourceContentSheBao/>
              </a-tab-pane>
              <a-tab-pane key="4" tab="月度薪资">
                <OutsourceContentMonthSalary/>
              </a-tab-pane>
          </a-tabs>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
  <AddOutsourcePerson/>
  <OutsourcePersonDetail/>
</template>

<script setup lang="ts">
import MenuTop from '/@/views/MenuTop/index.vue';
//import OutsourceDetailSider from './components/OutsourceDetailSider.vue';
import OutsourceContentPerson from './components/OutsourceContentPerson.vue';
import OutsourceContentSalary from './components/OutsourceContentSalary.vue';
import OutsourceContentSheBao from './components/OutsourceContentSheBao.vue';
import OutsourceContentMonthSalary from './components/OutsourceContentMonthSalary.vue';
import AddOutsourcePerson from './components/AddOutsourcePerson.vue';
import OutsourcePersonDetail from './components/OutsourcePersonDetail.vue';
import { storeToRefs } from 'pinia';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { outsourceDetailSider } = storeToRefs(outsourceDetailStore);
outsourceDetailStore.queryProvince();
outsourceDetailStore.queryOutsourceBrand();
outsourceDetailStore.queryOutsourcePosition();
outsourceDetailStore.queryCompanyAll();
</script>

<style lang="less" scoped>
.resume_container {
    max-width: 1920px;
    height: 92vh;
    background-color: #f5f5f5;
    overflow: hidden;
    padding: 10px;
    margin-top: 35px;
    .resume_sider {
      flex: 0 0 300px !important;
      max-width: 300px !important;
      min-width: 300px !important;
      width: 300px !important;
      background-color: #fff;
      border-right: 1px solid #eee;
      margin-right: 10px;
      box-shadow: 0 0 2px #ccc;
      border-radius: 7px;
      overflow-x: hidden;
      overflow-y: auto;
    }
    .resume_sider::-webkit-scrollbar {
      display: none;
    }
    :deep(.ant-layout .ant-layout-sider-children) {
      height: 95vh !important;
    }
    .resume_content {
      overflow-x: hidden;
      overflow-y: auto;
      height: 95vh !important;
    }
    .resume_content::-webkit-scrollbar {
      display: none;
    }
    :deep(.ant-tabs >.ant-tabs-nav) {
      margin: 0;
      height: 30px;
    }
  }
</style>
