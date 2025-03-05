<template>
  <a-layout-header class="resume_header">
    <a-menu v-model:selectedKeys="current" mode="horizontal" :items="items" />
  </a-layout-header>
  <div class="resume_container">
    <a-layout>
      <!-- <a-layout-header class="resume-header">Header</a-layout-header> -->
      <a-layout>
        <a-layout-sider class="resume_sider">
          <ResumeSider />
        </a-layout-sider>
        <a-layout-content class="resume_content">
          <ResumeRecommend v-if="searchResumeType == '1'" />
          <ResumeInterview v-else-if="searchResumeType == '2'" />
          <ResumeRecommendOffer v-else-if="searchResumeType == '3'" />
          <ResumeContent v-else="!searchResumeType" />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>
<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { h } from 'vue';
  import ResumeSider from './components/ResumeSider.vue';
  import ResumeContent from './components/ResumeContent.vue';
  import ResumeRecommend from './components/ResumeRecommend.vue';
  import ResumeInterview from './components/ResumeInterview.vue';
  //import ResumeOffer from './components/ResumeOffer.vue';
  import ResumeRecommendOffer from './components/ResumeRecommendOffer.vue';
  import { MenuProps } from 'ant-design-vue';
  import { useResumeListStoreWithOut } from '/@/store/modules/resumeList';
  const resumeList = useResumeListStoreWithOut();
  const { searchResumeType } = storeToRefs(resumeList);
  const current = ref<string[]>(['talent']);
  const items = ref<MenuProps['items']>([]);
interface FormMenu {
  key: string;
  label: string | JSX.Element;
  title: string;
  showFlag: boolean;
  index: number;
  children?: FormMenu[];
}
const menuArrTemp = ref([
  {} as FormMenu
]);
resumeList.querySystemFunction().then((res) => {
  if (res.code == 1) {
    menuArrTemp.value = [];
    const list = res.info.list;
    const currentPositionId = res.info.currentPositionId;
    const rId = res.info.rId;
    const roleId = res.info.roleId;
    const type = res.info.type;
    list.forEach(item => {
      if (item.functionName == "TOP榜单") {
        menuArrTemp.value.push({
          key: 'TOPList',
          label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
          title: item.functionName,
          showFlag: false,
          index: 0,
        })
      }
      if (item.functionName == "首页") {
        menuArrTemp.value.push({
          key: 'frontPage',
          label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
          title: item.functionName,
          showFlag: false,
          index: 1,
        })
      }
      if (item.functionName == "人才") {
        menuArrTemp.value.push({
          key: 'talent',
          label: item.functionName,
          title: item.functionName,
          showFlag: false,
          index: 2,
        })
      }
      // if (item.functionName == "商场") {
      //   menuArrTemp.value.push({
      //     key: 'market',
      //     label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
      //     title: item.functionName,
      //     showFlag: false,
      //     index: 3,
      //   })
      // }
      if (item.functionName == "企业" && (roleId != 11 && roleId != 8)) {
        let temp = menuArrTemp.value.filter(subItem => subItem.key === 'online');
        if (temp.length > 0) {
          menuArrTemp.value.forEach(subItem => {
            if (subItem.key === 'online') {
              subItem.children?.push({
                key: 'company',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 0,
              })
            }
          })
        } else {
          menuArrTemp.value.push({
            key: 'online',
            label: '线上',
            title: '线上',
            showFlag: false,
            index: 4,
            children: [
              {
                key: 'company',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 0,
              }
            ]
          })
        }
      }
      if (item.functionName == "签约" && (roleId != 11 && roleId != 8)) {
        let temp = menuArrTemp.value.filter(subItem => subItem.key === 'online');
        if (temp.length > 0) {
          menuArrTemp.value.forEach(subItem => {
            if (subItem.key === 'online') {
              subItem.children?.push({
                key: 'signContract',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 1,
              })
            }
          })
        } else {
          menuArrTemp.value.push({
            key: 'online',
            label: '线上',
            title: '线上',
            showFlag: false,
            index: 4,
            children: [
              {
                key: 'signContract',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 1,
              }
            ]
          })
        }
      }
      if (item.functionName == "LOGO" && (roleId != 11 && roleId != 8)) {
        let temp = menuArrTemp.value.filter(subItem => subItem.key === 'online');
        if (temp.length > 0) {
          menuArrTemp.value.forEach(subItem => {
            if (subItem.key === 'online') {
              subItem.children?.push({
                key: 'LOGO',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 2,
              })
            }
          })
        } else {
          menuArrTemp.value.push({
            key: 'online',
            label: '线上',
            title: '线上',
            showFlag: false,
            index: 4,
            children: [
              {
                key: 'LOGO',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 2,
              }
            ]
          })
        }
      }
      if (item.functionName == "BD" && (roleId != 11 && roleId != 8)) {
        let temp = menuArrTemp.value.filter(subItem => subItem.key === 'online');
        if (temp.length > 0) {
          menuArrTemp.value.forEach(subItem => {
            if (subItem.key === 'online') {
              subItem.children?.push({
                key: 'BD',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 2,
              })
            }
          })
        } else {
          menuArrTemp.value.push({
            key: 'online',
            label: '线上',
            title: '线上',
            showFlag: false,
            index: 4,
            children: [
              {
                key: 'BD',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 2,
              }
            ]
          })
        }
      }
      if (item.functionName == "商场" && (roleId != 11 && roleId != 8)) {
        let temp = menuArrTemp.value.filter(subItem => subItem.key === 'online');
        if (temp.length > 0) {
          menuArrTemp.value.forEach(subItem => {
            if (subItem.key === 'online') {
              subItem.children?.push({
                key: 'BD',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 2,
              })
            }
          })
        } else {
          menuArrTemp.value.push({
            key: 'online',
            label: '线上',
            title: '线上',
            showFlag: false,
            index: 4,
            children: [
              {
                key: 'BD',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 2,
              }
            ]
          })
        }
      }
      if (item.functionName == "Mapping" && (roleId != 11 && roleId != 8)) {
        let temp = menuArrTemp.value.filter(subItem => subItem.key === 'mapping');
        if (temp.length > 0) {
          menuArrTemp.value.forEach(subItem => {
            if (subItem.key === 'mapping') {
              subItem.children?.push({
                key: 'map',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, '人员信息'),
                title: '人员信息',
                showFlag: false,
                index: 0,
              })
            }
          })
        } else {
          menuArrTemp.value.push({
            key: 'mapping',
            label: 'Mapping',
            title: 'Mapping',
            showFlag: false,
            index: 5,
            children: [
              {
                key: 'map',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, '人员信息'),
                title: '人员信息',
                showFlag: false,
                index: 0,
              }
            ]
          })
        }
      }
      if (item.id == "125" && (roleId != 11 && roleId != 8)) {
        let temp = menuArrTemp.value.filter(subItem => subItem.key === 'mapping');
        if (temp.length > 0) {
          menuArrTemp.value.forEach(subItem => {
            if (subItem.key === 'mapping') {
              subItem.children?.push({
                key: 'mapPositions',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 1,
              })
            }
          })
        } else {
          menuArrTemp.value.push({
            key: 'mapping',
            label: 'Mapping',
            title: 'Mapping',
            showFlag: false,
            index: 5,
            children: [
              {
                key: 'mapPositions',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 1,
              }
            ]
          })
        }
      }
      if (item.functionName == "推荐人选" && (roleId != 11 && roleId != 8)) {
        let temp = menuArrTemp.value.filter(subItem => subItem.key === 'mapping');
        if (temp.length > 0) {
          menuArrTemp.value.forEach(subItem => {
            if (subItem.key === 'mapping') {
              subItem.children?.push({
                key: 'mapRecommend',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 2,
              })
            }
          })
        } else {
          menuArrTemp.value.push({
            key: 'mapping',
            label: 'Mapping',
            title: 'Mapping',
            showFlag: false,
            index: 5,
            children: [
              {
                key: 'mapRecommend',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 2,
              }
            ]
          })
        }
      }
      if (item.functionName == "标准信息" && (roleId != 11 && roleId != 8)) {
        let temp = menuArrTemp.value.filter(subItem => subItem.key === 'mapping');
        if (temp.length > 0) {
          menuArrTemp.value.forEach(subItem => {
            if (subItem.key === 'mapping') {
              subItem.children?.push({
                key: 'mapInfo',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 3,
              })
            }
          })
        } else {
          menuArrTemp.value.push({
            key: 'mapping',
            label: 'Mapping',
            title: 'Mapping',
            showFlag: false,
            index: 5,
            children: [
              {
                key: 'mapInfo',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 3,
              }
            ]
          })
        }
      }
      if (item.functionName == "客户" && (roleId != 11 && roleId != 8 && roleId != 2)) {
        let temp = menuArrTemp.value.filter(subItem => subItem.key === 'client');
        if (temp.length > 0) {
          menuArrTemp.value.forEach(subItem => {
            if (subItem.key === 'client') {
              subItem.children?.push({
                key: 'clientCompany',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, '公司信息'),
                title: '公司信息',
                showFlag: false,
                index: 0,
              })
            }
          })
        } else {
          menuArrTemp.value.push({
            key: 'client',
            label: '客户',
            title: '客户',
            showFlag: false,
            index: 6,
            children: [
              {
                key: 'clientCompany',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, '公司信息'),
                title: '公司信息',
                showFlag: false,
                index: 0,
              }
            ]
          })
        }
      }
      if (item.id == "130" && (roleId != 11 && roleId != 8 && roleId != 2)) {
        let temp = menuArrTemp.value.filter(subItem => subItem.key === 'client');
        if (temp.length > 0) {
          menuArrTemp.value.forEach(subItem => {
            if (subItem.key === 'client') {
              subItem.children?.push({
                key: 'clientPositions',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 1,
              })
            }
          })
        } else {
          menuArrTemp.value.push({
            key: 'client',
            label: '客户',
            title: '客户',
            showFlag: false,
            index: 6,
            children: [
              {
                key: 'clientPositions',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 1,
              }
            ]
          })
        }
      }
      if (item.functionName == "已收简历" && (roleId != 11 && roleId != 8 && roleId != 2)) {
        let temp = menuArrTemp.value.filter(subItem => subItem.key === 'client');
        if (temp.length > 0) {
          menuArrTemp.value.forEach(subItem => {
            if (subItem.key === 'client') {
              subItem.children?.push({
                key: 'clientInfo',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 2,
              })
            }
          })
        } else {
          menuArrTemp.value.push({
            key: 'client',
            label: '客户',
            title: '客户',
            showFlag: false,
            index: 6,
            children: [
              {
                key: 'clientInfo',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 2,
              }
            ]
          })
        }
      }
      if (item.functionName == "审核管理" && (roleId != 11 && roleId != 8 && roleId != 2)) {
        let temp = menuArrTemp.value.filter(subItem => subItem.key === 'client');
        if (temp.length > 0) {
          menuArrTemp.value.forEach(subItem => {
            if (subItem.key === 'client') {
              subItem.children?.push({
                key: 'clientManage',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 4,
              })
            }
          })
        } else {
          menuArrTemp.value.push({
            key: 'client',
            label: '客户',
            title: '客户',
            showFlag: false,
            index: 6,
            children: [
              {
                key: 'clientManage',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 4,
              }
            ]
          })
        }
      }
      if (item.functionName == "合同") {
        menuArrTemp.value.push({
          key: 'concart',
          label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
          title: item.functionName,
          showFlag: false,
          index: 7,
        })
      }
      if (item.functionName == "制度") {
        menuArrTemp.value.push({
          key: 'institution',
          label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
          title: item.functionName,
          showFlag: false,
          index: 8,
        })
      }
      if (item.functionName == "系统功能" && type == "A") {
        let temp = menuArrTemp.value.filter(subItem => subItem.key === 'system');
        if (temp.length > 0) {
          menuArrTemp.value.forEach(subItem => {
            if (subItem.key === 'system') {
              subItem.children?.push({
                key: 'systemFun',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 0,
              })
            }
          })
        } else {
          menuArrTemp.value.push({
            key: 'system',
            label: '系统',
            title: '系统',
            showFlag: false,
            index: 9,
            children: [
              {
                key: 'systemFun',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 0,
              }
            ]
          })
        }
      }
      if (item.functionName == "权限系统" && type == "A") {
        let temp = menuArrTemp.value.filter(subItem => subItem.key === 'system');
        if (temp.length > 0) {
          menuArrTemp.value.forEach(subItem => {
            if (subItem.key === 'system') {
              subItem.children?.push({
                key: 'systemQuan',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 1,
              })
            }
          })
        } else {
          menuArrTemp.value.push({
            key: 'system',
            label: '系统',
            title: '系统',
            showFlag: false,
            index: 9,
            children: [
              {
                key: 'systemQuan',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 1,
              }
            ]
          })
        }
      }
      if (item.functionName == "数据管理" && type == "A") {
        let temp = menuArrTemp.value.filter(subItem => subItem.key === 'system');
        if (temp.length > 0) {
          menuArrTemp.value.forEach(subItem => {
            if (subItem.key === 'system') {
              subItem.children?.push({
                key: 'systemData',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 2,
              })
            }
          })
        } else {
          menuArrTemp.value.push({
            key: 'system',
            label: '系统',
            title: '系统',
            showFlag: false,
            index: 9,
            children: [
              {
                key: 'systemData',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 2,
              }
            ]
          })
        }
      }
      if (item.functionName == "人才招聘" && (roleId == 4 || roleId == 8 || roleId == 3 || roleId == 13 || roleId == 14 || roleId == 15 || type == 'T' || roleId == 'V')) {
        let temp = menuArrTemp.value.filter(subItem => subItem.key === 'staff');
        if (temp.length > 0) {
          menuArrTemp.value.forEach(subItem => {
            if (subItem.key === 'staff') {
              subItem.children?.push({
                key: 'staffZhao',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 0,
              })
            }
          })
        } else {
          menuArrTemp.value.push({
            key: 'staff',
            label: '员工',
            title: '员工',
            showFlag: false,
            index: 10,
            children: [
              {
                key: 'staffZhao',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 0,
              }
            ]
          })
        }
      }
      if (item.functionName == "人事管理") {
        let temp = menuArrTemp.value.filter(subItem => subItem.key === 'staff');
        if (temp.length > 0) {
          menuArrTemp.value.forEach(subItem => {
            if (subItem.key === 'staff') {
              subItem.children?.push({
                key: 'staffRen',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 1,
              })
            }
          })
        } else {
          menuArrTemp.value.push({
            key: 'staff',
            label: '员工',
            title: '员工',
            showFlag: false,
            index: 10,
            children: [
              {
                key: 'staffRen',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 1,
              }
            ]
          })
        }
      }
      if (item.functionName == "考勤系统") {
        let temp = menuArrTemp.value.filter(subItem => subItem.key === 'staff');
        if (temp.length > 0) {
          menuArrTemp.value.forEach(subItem => {
            if (subItem.key === 'staff') {
              subItem.children?.push({
                key: 'staffKao',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 2,
              })
            }
          })
        } else {
          menuArrTemp.value.push({
            key: 'staff',
            label: '员工',
            title: '员工',
            showFlag: false,
            index: 10,
            children: [
              {
                key: 'staffKao',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 2,
              }
            ]
          })
        }
      }
      if (item.functionName == "银行对账") {
        let temp = menuArrTemp.value.filter(subItem => subItem.key === 'finance');
        if (temp.length > 0) {
          menuArrTemp.value.forEach(subItem => {
            if (subItem.key === 'finance') {
              subItem.children?.push({
                key: 'financeYin',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 0,
              })
            }
          })
        } else {
          menuArrTemp.value.push({
            key: 'finance',
            label: '财务',
            title: '财务',
            showFlag: false,
            index: 11,
            children: [
              {
                key: 'financeYin',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 0,
              }
            ]
          })
        }
      }
      if (item.functionName == "采购系统") {
        let temp = menuArrTemp.value.filter(subItem => subItem.key === 'finance');
        if (temp.length > 0) {
          menuArrTemp.value.forEach(subItem => {
            if (subItem.key === 'finance') {
              subItem.children?.push({
                key: 'financeCai',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 1,
              })
            }
          })
        } else {
          menuArrTemp.value.push({
            key: 'finance',
            label: '财务',
            title: '财务',
            showFlag: false,
            index: 11,
            children: [
              {
                key: 'financeCai',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 1,
              }
            ]
          })
        }
      }
      if (item.functionName == "成本统计" && (rId == 431 || rId == 434 || rId == 445)) {
        let temp = menuArrTemp.value.filter(subItem => subItem.key === 'finance');
        if (temp.length > 0) {
          menuArrTemp.value.forEach(subItem => {
            if (subItem.key === 'finance') {
              subItem.children?.push({
                key: 'financeCheng',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 2,
              })
            }
          })
        } else {
          menuArrTemp.value.push({
            key: 'finance',
            label: '财务',
            title: '财务',
            showFlag: false,
            index: 11,
            children: [
              {
                key: 'financeCheng',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 2,
              }
            ]
          })
        }
      }
      if (item.functionName == "发票回款" && (type == "A" || currentPositionId == "10")) {
        let temp = menuArrTemp.value.filter(subItem => subItem.key === 'finance');
        if (temp.length > 0) {
          menuArrTemp.value.forEach(subItem => {
            if (subItem.key === 'finance') {
              subItem.children?.push({
                key: 'financeFa',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 3,
              })
            }
          })
        } else {
          menuArrTemp.value.push({
            key: 'finance',
            label: '财务',
            title: '财务',
            showFlag: false,
            index: 11,
            children: [
              {
                key: 'financeFa',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 3,
              }
            ]
          })
        }
      }
      if (item.functionName == "回款统计" && type == "A") {
        let temp = menuArrTemp.value.filter(subItem => subItem.key === 'finance');
        if (temp.length > 0) {
          menuArrTemp.value.forEach(subItem => {
            if (subItem.key === 'finance') {
              subItem.children?.push({
                key: 'financeHui',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 4,
              })
            }
          })
        } else {
          menuArrTemp.value.push({
            key: 'finance',
            label: '财务',
            title: '财务',
            showFlag: false,
            index: 11,
            children: [
              {
                key: 'financeHui',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 4,
              }
            ]
          })
        }
      }
      if (item.functionName == "开票系统" && type == "A") {
        let temp = menuArrTemp.value.filter(subItem => subItem.key === 'finance');
        if (temp.length > 0) {
          menuArrTemp.value.forEach(subItem => {
            if (subItem.key === 'finance') {
              subItem.children?.push({
                key: 'financeKai',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 5,
              })
            }
          })
        } else {
          menuArrTemp.value.push({
            key: 'finance',
            label: '财务',
            title: '财务',
            showFlag: false,
            index: 11,
            children: [
              {
                key: 'financeKai',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 5,
              }
            ]
          })
        }
      }
      if (item.functionName == "工资系统") {
        let temp = menuArrTemp.value.filter(subItem => subItem.key === 'finance');
        if (temp.length > 0) {
          menuArrTemp.value.forEach(subItem => {
            if (subItem.key === 'finance') {
              subItem.children?.push({
                key: 'financeGong',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 6,
              })
            }
          })
        } else {
          menuArrTemp.value.push({
            key: 'finance',
            label: '财务',
            title: '财务',
            showFlag: false,
            index: 11,
            children: [
              {
                key: 'financeGong',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 6,
              }
            ]
          })
        }
      }
      if (item.functionName == "任务统计" && (roleId != 11 && roleId != 8)) {
        let temp = menuArrTemp.value.filter(subItem => subItem.key === 'report');
        if (temp.length > 0) {
          menuArrTemp.value.forEach(subItem => {
            if (subItem.key === 'report') {
              subItem.children?.push({
                key: 'reportRen',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 0,
              })
            }
          })
        } else {
          menuArrTemp.value.push({
            key: 'report',
            label: '报表',
            title: '报表',
            showFlag: false,
            index: 12,
            children: [
              {
                key: 'reportRen',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 0,
              }
            ]
          })
        }
      }
      if (item.functionName == "KPI统计" && (roleId != 11 && roleId != 8)) {
        let temp = menuArrTemp.value.filter(subItem => subItem.key === 'report');
        if (temp.length > 0) {
          menuArrTemp.value.forEach(subItem => {
            if (subItem.key === 'report') {
              subItem.children?.push({
                key: 'reportKpi',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 1,
              })
            }
          })
        } else {
          menuArrTemp.value.push({
            key: 'report',
            label: '报表',
            title: '报表',
            showFlag: false,
            index: 12,
            children: [
              {
                key: 'reportKpi',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 1,
              }
            ]
          })
        }
      }
      if (item.functionName == "综合统计" && (roleId != 11 && roleId != 8)) {
        let temp = menuArrTemp.value.filter(subItem => subItem.key === 'report');
        if (temp.length > 0) {
          menuArrTemp.value.forEach(subItem => {
            if (subItem.key === 'report') {
              subItem.children?.push({
                key: 'reportZong',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 2,
              })
            }
          })
        } else {
          menuArrTemp.value.push({
            key: 'report',
            label: '报表',
            title: '报表',
            showFlag: false,
            index: 12,
            children: [
              {
                key: 'reportZong',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 2,
              }
            ]
          })
        }
      }
      if (item.functionName == "业绩指标" && (roleId != 11 && roleId != 8)) {
        let temp = menuArrTemp.value.filter(subItem => subItem.key === 'report');
        if (temp.length > 0) {
          menuArrTemp.value.forEach(subItem => {
            if (subItem.key === 'report') {
              subItem.children?.push({
                key: 'reportZhi',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 3,
              })
            }
          })
        } else {
          menuArrTemp.value.push({
            key: 'report',
            label: '报表',
            title: '报表',
            showFlag: false,
            index: 12,
            children: [
              {
                key: 'reportZhi',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 3,
              }
            ]
          })
        }
      }
      if (item.functionName == "业绩统计" && (roleId != 11 && roleId != 8)) {
        let temp = menuArrTemp.value.filter(subItem => subItem.key === 'report');
        if (temp.length > 0) {
          menuArrTemp.value.forEach(subItem => {
            if (subItem.key === 'report') {
              subItem.children?.push({
                key: 'reportTong',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 4,
              })
            }
          })
        } else {
          menuArrTemp.value.push({
            key: 'report',
            label: '报表',
            title: '报表',
            showFlag: false,
            index: 12,
            children: [
              {
                key: 'reportTong',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 4,
              }
            ]
          })
        }
      }
      if (item.functionName == "外包系统" && (roleId != 11 && roleId != 8)) {
        let temp = menuArrTemp.value.filter(subItem => subItem.key === 'report');
        if (temp.length > 0) {
          menuArrTemp.value.forEach(subItem => {
            if (subItem.key === 'report') {
              subItem.children?.push({
                key: 'reportWai',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 5,
              })
            }
          })
        } else {
          menuArrTemp.value.push({
            key: 'report',
            label: '报表',
            title: '报表',
            showFlag: false,
            index: 12,
            children: [
              {
                key: 'reportWai',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 5,
              }
            ]
          })
        }
      }
      if (item.functionName == "数据分析" && (roleId != 11 && roleId != 8)) {
        let temp = menuArrTemp.value.filter(subItem => subItem.key === 'report');
        if (temp.length > 0) {
          menuArrTemp.value.forEach(subItem => {
            if (subItem.key === 'report') {
              subItem.children?.push({
                key: 'reportShu',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 6,
              })
            }
          })
        } else {
          menuArrTemp.value.push({
            key: 'report',
            label: '报表',
            title: '报表',
            showFlag: false,
            index: 12,
            children: [
              {
                key: 'reportShu',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 6,
              }
            ]
          })
        }
      }
      if (item.functionName == "OFFER背调") {
        menuArrTemp.value.push({
            key: 'backTone',
            label: '背调',
            title: '背调',
            showFlag: false,
            index: 13,
            children: [
              {
                key: 'backToneOffer',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 0,
              }
            ]
          })
      }
      if (item.functionName == "竞赛数据") {
        menuArrTemp.value.push({
            key: 'competition',
            label: '竞赛',
            title: '竞赛',
            showFlag: false,
            index: 14,
            children: [
              {
                key: 'competitionJing',
                label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
                title: item.functionName,
                showFlag: false,
                index: 0,
              }
            ]
          })
      }
      if (item.functionName == "荣誉榜" && (type == "A" || currentPositionId == 10)) {
        menuArrTemp.value.push({
            key: 'honorRoll',
            label: h('a', { href: `http://work.wotui.com:8889/WTSM/${item.functionUrl}`, target: '_blank' }, item.functionName),
            title: item.functionName,
            showFlag: false,
            index: 15,
          })
      }
    })
    menuArrTemp.value.push({
            key: 'AI',
            label: h('a', { href: `https://chat.deepseek.com`, target: '_blank' }, 'AI'),
            title: 'AI',
            showFlag: false,
            index: 16,
          })
    menuArrTemp.value.forEach(item => {
      if (item.key === 'finance' || item.key === 'report') {
        item.children?.sort((a,b)=>{ return a.index-b.index});
      }
    })
    menuArrTemp.value.sort((a,b)=>{ return a.index-b.index});
    items.value = menuArrTemp.value;
  }
})
</script>
<style lang="less" scoped>
  .resume_header {
    margin-left: -0.04167rem;
    margin-right: -0.04167rem;
    line-height: 2.7;
    margin-bottom: 10px;
    position: fixed;
    top: 0;
    width: 100%;
    font-size: 14px;
    font-weight: 600;
    z-index: 1;
  }
  .resume_container {
    max-width: 1920px;
    height: 95vh;
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
  }
</style>
