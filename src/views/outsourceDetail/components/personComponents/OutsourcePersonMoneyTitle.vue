<template>
   <a-drawer
    v-model:open="outsourcePersonMoneyTitleFlag"
    :title="formStatePersonMoney.companyName + '标题设置'"
    :maskClosable="false"
    :keyboard="false"
    :closable="false"
    :width="drawerWidth"
    :bodyStyle="{ padding: '4px 14px' }"
    :headerStyle="{ padding: '5px 18px 5px 12px' }"
    placement="right"
  >
   <template #extra>
        <CloseOutlined @click="handleClose" />
      </template>
      <a-layout>
        <a-layout-content class="resume_content">
           <a-tabs v-model:activeKey="moneyType" type="card">
              <a-tab-pane key="1" tab="请款单">
                  <div class="resume_container">
        <a-row class="header-row" :gutter="24">
          <a-col :span="8">
            标题名称
          </a-col>
          <a-col :span="7">
            标题别名
          </a-col>
          <a-col :span="3">
            显示
          </a-col>
          <a-col :span="3">
            宽度
          </a-col>
          <a-col :span="3">
            固定
          </a-col>
        </a-row>
        <div ref="qingListRef" class="qing-list">
          <div class="qing-item" v-for="(item, index) in configColumnsQing" :key="item.key ?? index">
            <a-row class="row qing-draggable-row" :gutter="24">
              <a-col :span="8">
                <div class="row-name-cell">
                  <span class="drag-handle">
                    <HolderOutlined />
                  </span>
                  <a-input v-model:value="item.rowName" disabled/>
                </div>
              </a-col>
              <a-col :span="7">
                <a-input v-model:value="item.rowOther"/>
              </a-col>
              <a-col :span="3" style="display: flex;flex-direction: column;justify-content: center;">
                <a-checkbox v-model:checked="item.show">显示</a-checkbox>
              </a-col>
              <a-col :span="3">
                <a-input v-model:value="item.width" type="number"/>
              </a-col>
              <a-col :span="3">
                <a-select v-model:value="item.fixed" allowClear style="width:100%;">
                  <a-select-option value="left">左</a-select-option>
                  <a-select-option value="right">右</a-select-option>
                </a-select>
              </a-col>
            </a-row>
          </div>
        </div>
      </div>
              </a-tab-pane>
              <a-tab-pane key="2" tab="工资单">
                <div class="resume_container"">
        <a-row class="header-row" :gutter="24">
          <a-col :span="8">
            标题名称
          </a-col>
          <a-col :span="7">
            标题别名
          </a-col>
          <a-col :span="3">
            显示
          </a-col>
          <a-col :span="3">
            宽度
          </a-col>
          <a-col :span="3">
            固定
          </a-col>
        </a-row>
        <div ref="salaryListRef" class="qing-list">
          <div class="qing-item" v-for="(item, index) in configColumnsSalary" :key="item.key ?? index">
            <a-row class="row qing-draggable-row" :gutter="24">
              <a-col :span="8">
                <div class="row-name-cell">
                  <span class="drag-handle">
                    <HolderOutlined />
                  </span>
                  <a-input v-model:value="item.rowName" disabled/>
                </div>
              </a-col>
              <a-col :span="7">
                <a-input v-model:value="item.rowOther"/>
              </a-col>
              <a-col :span="3" style="display: flex;flex-direction: column;justify-content: center;">
                <a-checkbox v-model:checked="item.show">显示</a-checkbox>
              </a-col>
              <a-col :span="3">
                <a-input v-model:value="item.width" type="number"/>
              </a-col>
              <a-col :span="3">
                <a-select v-model:value="item.fixed" allowClear style="width:100%;">
                  <a-select-option value="left">左</a-select-option>
                  <a-select-option value="right">右</a-select-option>
                </a-select>
              </a-col>
            </a-row>
          </div>
        </div>
      </div>
              </a-tab-pane>
              <a-tab-pane key="3" tab="社保">
                <div class="resume_container">
        <a-row class="header-row" :gutter="24">
          <a-col :span="8">
            标题名称
          </a-col>
          <a-col :span="7">
            标题别名
          </a-col>
          <a-col :span="3">
            显示
          </a-col>
          <a-col :span="3">
            宽度
          </a-col>
          <a-col :span="3">
            固定
          </a-col>
        </a-row>
        <div ref="sheBaoListRef" class="qing-list">
          <div class="qing-item" v-for="(item, index) in configColumnsSheBao" :key="item.key ?? index">
            <a-row class="row qing-draggable-row" :gutter="24">
              <a-col :span="8">
                <div class="row-name-cell">
                  <span class="drag-handle">
                    <HolderOutlined />
                  </span>
                  <a-input v-model:value="item.rowName" disabled/>
                </div>
              </a-col>
              <a-col :span="7">
                <a-input v-model:value="item.rowOther"/>
              </a-col>
              <a-col :span="3" style="display: flex;flex-direction: column;justify-content: center;">
                <a-checkbox v-model:checked="item.show">显示</a-checkbox>
              </a-col>
              <a-col :span="3">
                <a-input v-model:value="item.width" type="number"/>
              </a-col>
              <a-col :span="3">
                <a-select v-model:value="item.fixed" allowClear style="width:100%;">
                  <a-select-option value="left">左</a-select-option>
                  <a-select-option value="right">右</a-select-option>
                </a-select>
              </a-col>
            </a-row>
          </div>
        </div>
      </div>
              </a-tab-pane>
          </a-tabs>
        </a-layout-content>
      </a-layout>
    <div class="resume-content-search" >
        <a-form layout="inline">
          <a-form-item>
            <a-button type="primary" @click="handleSave">保存配置</a-button>
          </a-form-item>
        </a-form>
      </div>
   </a-drawer>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { storeToRefs } from 'pinia';
import { CloseOutlined, HolderOutlined } from '@ant-design/icons-vue';
import Sortable from 'sortablejs';
//import { OutsourcePersonMoneyColumnsItem }  from '/@/api/outsourceDetail/model';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { outsourcePersonMoneyTitleFlag, formStatePersonMoney, getOutsourceSalaryColumnsQing, getOutsourceSalaryColumnsSalary, getOutsourceSalaryColumnsSheBao, getOutsourceCompanyExcelId } = storeToRefs(outsourceDetailStore);
const drawerWidth = ref(Math.max(600, window.innerWidth * 0.6));
const moneyType  = ref('1');
const configColumnsQing = ref<any[]>([]);
const configColumnsSalary = ref<any[]>([]);
const configColumnsSheBao = ref<any[]>([]);
const qingListRef = ref<HTMLElement | null>(null);
const salaryListRef = ref<HTMLElement | null>(null);
const sheBaoListRef = ref<HTMLElement | null>(null);
let qingSortable: Sortable | null = null;
let salarySortable: Sortable | null = null;
let sheBaoSortable: Sortable | null = null;
const handleClose = () => {
    outsourcePersonMoneyTitleFlag.value = false;
  };
const initQingSortable = () => {
  if (!qingListRef.value) {
    return;
  }

  qingSortable?.destroy();
  qingSortable = Sortable.create(qingListRef.value, {
    animation: 150,
    ghostClass: 'qing-ghost',
    chosenClass: 'qing-chosen',
    dragClass: 'qing-drag',
    filter:
      'input, textarea, select, button, a, .ant-input, .ant-select, .ant-picker, .ant-checkbox-wrapper, .ant-switch',
    preventOnFilter: false,
    onEnd: (evt) => {
      const oldIndex = evt.oldIndex;
      const newIndex = evt.newIndex;
      if (oldIndex === undefined || newIndex === undefined || oldIndex === newIndex) {
        return;
      }
      const list = configColumnsQing.value;
      const [moved] = list.splice(oldIndex, 1);
      list.splice(newIndex, 0, moved);
    },
  });
};
const initSalarySortable = () => {
  if (!salaryListRef.value) {
    return;
  }

  salarySortable?.destroy();
  salarySortable = Sortable.create(salaryListRef.value, {
    animation: 150,
    ghostClass: 'qing-ghost',
    chosenClass: 'qing-chosen',
    dragClass: 'qing-drag',
    filter:
      'input, textarea, select, button, a, .ant-input, .ant-select, .ant-picker, .ant-checkbox-wrapper, .ant-switch',
    preventOnFilter: false,
    onEnd: (evt) => {
      const oldIndex = evt.oldIndex;
      const newIndex = evt.newIndex;
      if (oldIndex === undefined || newIndex === undefined || oldIndex === newIndex) {
        return;
      }
      const list = configColumnsSalary.value;
      const [moved] = list.splice(oldIndex, 1);
      list.splice(newIndex, 0, moved);
    },
  });
};
const initSheBaoSortable = () => {
  if (!sheBaoListRef.value) {
    return;
  }

  sheBaoSortable?.destroy();
  sheBaoSortable = Sortable.create(sheBaoListRef.value, {
    animation: 150,
    ghostClass: 'qing-ghost',
    chosenClass: 'qing-chosen',
    dragClass: 'qing-drag',
    filter:
      'input, textarea, select, button, a, .ant-input, .ant-select, .ant-picker, .ant-checkbox-wrapper, .ant-switch',
    preventOnFilter: false,
    onEnd: (evt) => {
      const oldIndex = evt.oldIndex;
      const newIndex = evt.newIndex;
      if (oldIndex === undefined || newIndex === undefined || oldIndex === newIndex) {
        return;
      }
      const list = configColumnsSheBao.value;
      const [moved] = list.splice(oldIndex, 1);
      list.splice(newIndex, 0, moved);
    },
  });
};
watch([outsourcePersonMoneyTitleFlag, moneyType], async ([open, tab]) => {
  if (open && tab === '1') {
    await nextTick();
    initQingSortable();
  }
  if (open && tab === '2') {
    await nextTick();
    initSalarySortable();
  }
  if (open && tab === '3') {
    await nextTick();
    initSheBaoSortable();
  }
});
onBeforeUnmount(() => {
  qingSortable?.destroy();
  qingSortable = null;
  salarySortable?.destroy();
  salarySortable = null;
  sheBaoSortable?.destroy();
  sheBaoSortable = null;
});
const defaultColumnsSalary = [
    {
      rowName: '序号',
      rowOther: '序号',
      show: true,
      key: 'index',
      fixed: 'left',
      width: 40,
    },
    {
      rowName: '店铺',
      rowOther: '店铺',
      show: true,
      key: 'mkName',
      fixed: 'left',
      width: 80,
    },
    {
      rowName: '姓名',
      rowOther: '姓名',
      show: true,
      key: 'userName',
      fixed: 'left',
      width: 90,
      ellipsis: true,
    },
    {
      rowName: '职位',
      rowOther: '职位',
      show: true,
      key: 'positions',
      fixed: 'left',
      width: 90,
      ellipsis: true,
    },
    {
      rowName: '身份证号',
      rowOther: '身份证号',
      show: true,
      key: 'idCard',
      fixed: 'left',
      width: 70,
    },
    {
      rowName: '联系方式',
      rowOther: '联系方式',
      show: true,
      key: 'phoneNumber',
      fixed: 'left',
      width: 80,
    },
    {
      rowName: '派入公司全称',
      rowOther: '派入公司全称',
      show: true,
      key: 'companyNameAll',
      fixed: '',
      width: 150,
    },
    {
      rowName: '入职时间',
      rowOther: '入职时间',
      show: true,
      key: 'realEntryTime',
      fixed: '',
      width: 100,
    },
    {
      rowName: '离职时间',
      rowOther: '离职时间',
      show: true,
      fixed: '',
      key: 'realLeaveTime',
      width: 100,
    },
    {
      rowName: '计薪日期',
      rowOther: '计薪日期',
      show: true,
      key: 'jinxinMonthDetail',
      fixed: '',
      width: 100,
    },
    {
      rowName: `本月预估考勤情况/H`,
      rowOther: `本月预估考勤情况/H`,
      show: true,
      key: 'yuguGongshi',
      fixed: '',
      width: 120,
    },
    {
      rowName: `本月标准工资`,
      rowOther: `本月标准工资`,
      show: true,
      key: 'biaozhunSalary',
      fixed: '',
      width: 80,
    },
    {
      rowName: `本月餐补`,
      rowOther: `本月餐补`,
      show: true,
      key: 'canbu',
      fixed: '',
      width: 80,
    },
    {
      title: `本月全勤`,
      rowName: `本月全勤`,
      rowOther: `本月全勤`,
      show: true,
      key: 'quanqin',
      fixed: '',
      width: 80,
    },
    {
      rowName: `上月正常加班（小时）`,
      rowOther: `上月正常加班（小时）`,
      show: true,
      key: 'zhengchangJiaban',
      fixed: '',
      width: 140,
    },
    {
      rowName: `上月法定假期加班（小时）`,
      rowOther: `上月法定假期加班（小时）`,
      show: true,
      key: 'fadingJiaban',
      fixed: '',
      width: 160,
    },
    {
      rowName: `上月加班工资`,
      rowOther: `上月加班工资`,
      show: true,
      key: 'jiabanSalary',
      fixed: '',
      width: 80,
    },
    {
      rowName: `上月预估出勤`,
      rowOther: `上月预估出勤`,
      show: true,
      key: 'shangyueYugu',
      fixed: '',
      width: 80,
    },
    {
      rowName: `上月实际出勤`,
      rowOther: `上月实际出勤`,
      show: true,
      key: 'shangyueShiji',
      fixed: '',
      width: 80,
    },
    {
      rowName: '迟到',
      rowOther: '迟到',
      show: true,
      key: 'chidao',
      fixed: '',
      width: 80,
    },
    {
      rowName: '事假',
      rowOther: '事假',
      show: true,
      key: 'shijia',
      fixed: '',
      width: 80,
    },
    {
      rowName: '年假',
      rowOther: '年假',
      show: true,
      key: 'qingKuanTime',
      fixed: '',
      width: 80,
    },
    {
      rowName: '带薪假',
      rowOther: '带薪假',
      show: true,
      key: 'daixin',
      fixed: '',
      width: 80,
    },
    {
      rowName: '病假',
      rowOther: '病假',
      show: true,
      key: 'bingjia',
      fixed: '',
      width: 80,
    },
    {
      rowName: '个人销售奖金',
      rowOther: '个人销售奖金',
      show: true,
      key: 'geti',
      fixed: '',
      width: 80,
    },
    {
      rowName: '团队销售奖金',
      rowOther: '团队销售奖金',
      show: true,
      key: 'tuanti',
      fixed: '',
      width: 80,
    },
    {
      rowName: '特别奖金',
      rowOther: '特别奖金',
      show: true,
      key: 'teshu',
      fixed: '',
      width: 80,
    },
    {
      rowName: '达成奖金激励',
      rowOther: '达成奖金激励',
      show: true,
      key: 'jili',
      fixed: '',
      width: 80,
    },
    {
      rowName: '基础工资调差',
      rowOther: '基础工资调差',
      show: true,
      key: 'salaryTiaocha',
      fixed: '',
      width: 80,
    },
    {
      rowName: '餐补调差',
      rowOther: '餐补调差',
      show: true,
      key: 'canbuTiaocha',
      fixed: '',
      width: 80,
    },
    {
      rowName: '全勤调差',
      rowOther: '全勤调差',
      show: true,
      key: 'quanqinTiaocha',
      fixed: '',
      width: 80,
    },
    {
      rowName: '差异调整合计',
      rowOther: '差异调整合计',
      show: true,
      key: 'tiaochaTotal',
      fixed: '',
      width: 80,
    },
    {
      rowName: '应计合计',
      rowOther: '应计合计',
      show: true,
      key: 'monthTax',
      fixed: '',
      width: 80,
    },
    {
      rowName: '本年累计',
      rowOther: '本年累计',
      show: true,
      key: 'yearTax',
      fixed: '',
      width: 80,
    },
    {
      rowName: '养老保险',
      rowOther: '养老保险',
      show: true,
      key: 'yanglao',
      fixed: '',
      width: 80,
    },
    {
      rowName: '失业保险',
      rowOther: '失业保险',
      show: true,
      key: 'shiye',
      fixed: '',
      width: 80,
    },
    {
      rowName: '基本医疗保险',
      rowOther: '基本医疗保险',
      show: true,
      key: 'yiliao',
      fixed: '',
      width: 80,
    },
    {
      rowName: '大病救助',
      rowOther: '大病救助',
      show: true,
      key: 'dabing',
      fixed: '',
      width: 80,
    },
    {
      rowName: '住房公积金',
      rowOther: '住房公积金',
      show: true,
      key: 'yijin',
      fixed: '',
      width: 80,
    },
    {
      rowName: '本月社保合计',
      rowOther: '本月社保合计',
      show: true,
      key: 'monthShebao',
      fixed: '',
      width: 80,
    },
    {
      rowName: '本年社保累计',
      rowOther: '本年社保累计',
      show: true,
      key: 'yearShebao',
      fixed: '',
      width: 80,
    },
    {
      rowName: '子女教育',
      rowOther: '子女教育',
      show: true,
      key: 'zinvJiaoyu',
      fixed: '',
      width: 80,
    },
    {
      rowName: '继续教育',
      rowOther: '继续教育',
      show: true,
      key: 'jixuJiaoyu',
      fixed: '',
      width: 80,
    },
    {
      rowName: '房贷利息',
      rowOther: '房贷利息',
      show: true,
      key: 'fangdaiLixi',
      fixed: '',
      width: 80,
    },
    {
      rowName: '房租',
      rowOther: '房租',
      show: true,
      key: 'fangzu',
      fixed: '',
      width: 80,
    },
    {
      rowName: '赡养父母',
      rowOther: '赡养父母',
      show: true,
      key: 'shangyangFumu',
      fixed: '',
      width: 80,
    },
    {
      rowName: '本月专扣合计',
      rowOther: '本月专扣合计',
      show: true,
      key: 'monthZhuankou',
      fixed: '',
      width: 80,
    },
    {
      rowName: '本月专扣累计',
      rowOther: '本月专扣累计',
      show: true,
      key: 'yearZhuankou',
      fixed: '',
      width: 80,
    },
    {
      rowName: '免征额',
      rowOther: '免征额',
      show: true,
      key: 'yearMianzheng',
      fixed: '',
      width: 80,
    },
    {
      rowName: '累计应缴税金',
      rowOther: '累计应缴税金',
      show: true,
      key: 'yearGeshui',
      fixed: '',
      width: 80,
    },
    {
      rowName: '本月应缴个税',
      rowOther: '本月应缴个税',
      show: true,
      key: 'monthGeshui',
      fixed: '',
      width: 80,
    },
    {
      rowName: '截止上月累计预扣预缴',
      rowOther: '截止上月累计预扣预缴',
      show: true,
      key: 'lastMonthLeiJi',
      fixed: '',
      width: 130,
    },
    {
      rowName: '截止上月金三累计已预扣个税',
      rowOther: '截止上月金三累计已预扣个税',
      show: true,
      key: 'lastMonthLeiJi',
      fixed: '',
      width: 180,
    },
    {
      rowName: '经济补偿金',
      rowOther: '经济补偿金',
      show: true,
      key: 'jingJiBuChangJin',
      fixed: '',
      width: 80,
    },
    {
      rowName: '汇款手续费',
      rowOther: '汇款手续费',
      show: true,
      key: 'shouxuMoney',
      fixed: '',
      width: 80,
    },
    {
      rowName: '实发金额',
      rowOther: '实发金额',
      show: true,
      key: 'salaryAfterTax',
      fixed: '',
      width: 80,
    },
    {
      rowName: '工作地',
      rowOther: '工作地',
      show: true,
      key: 'workCity',
      fixed: '',
      width: 80,
    },
    {
      rowName: '五险一金缴纳地',
      rowOther: '五险一金缴纳地',
      show: true,
      key: 'socialCity',
      fixed: '',
      width: 120,
    },
    {
      rowName: '个税缴纳地区',
      rowOther: '个税缴纳地区',
      show: true,
      key: 'taxCity',
      fixed: '',
      width: 120,
    },
  ];
const defaultColumnsQing = [
    {
      rowName: '序号',
      rowOther: '序号',
      show: true,
      key: 'index',
      fixed: 'left',
      width: 40,
    },
    {
      rowName: '工号',
      rowOther: '工号',
      show: true,
      key: 'jobNumber',
      fixed: 'left',
      width: 40,
    },
    {
      rowName: '服务类型',
      rowOther: '服务类型',
      show: true,
      key: 'serviceType',
      fixed: 'left',
      width: 70,
    },
    {
      rowName: '城市',
      rowOther: '城市',
      show: true,
      key: 'city',
      fixed: 'left',
      width: 50,
    },
    {
      rowName: '店铺',
      rowOther: '店铺',
      show: true,
      key: 'mkName',
      fixed: 'left',
      width: 50,
    },
    {
      rowName: '姓名',
      rowOther: '姓名',
      key: 'userName',
      show: true,
      fixed: 'left',
      width: 90,
    },
    {
      rowName: '中文名',
      rowOther: '中文名',
      show: true,
      key: 'userNameCn',
      fixed: '',
      width: 50,
    },
    {
      rowName: '英文名',
      rowOther: '英文名',
      show: true,
      key: 'userNameEn',
      fixed: '',
      width: 50,
    },
    {
      rowName: '入职时间',
      rowOther: '入职时间',
      show: true,
      key: 'realEntryTime',
      fixed: '',
      width: 90,
    },
    {
      rowName: '离职时间',
      rowOther: '离职时间',
      show: true,
      key: 'realLeaveTime',
      fixed: '',
      width: 90,
    },
    {
      rowName: '职位',
      rowOther: '职位',
      key: 'positions',
      show: true,
      fixed: '',
      width: 140,
    },
    {
      rowName: '计薪日期',
      rowOther: '计薪日期',
      show: true,
      key: 'jinxinMonth',
      fixed: '',
      width: 140,
    },
    {
      rowName: '全勤工时',
      rowOther: '全勤工时',
      show: true,
      key: 'quanqinHours',
      fixed: '',
      width: 70,
    },
    {
      rowName: '预估出勤工时',
      rowOther: '预估出勤工时',
      show: true,
      key: 'yuguGongshi',
      fixed: '',
      width: 90,
    },
    {
      rowName: '实际出勤工时',
      rowOther: '实际出勤工时',
      show: true,
      key: 'bebyueShiji',
      fixed: '',
      width: 80,
    },
    {
      rowName: '总工时',
      rowOther: '总工时',
      show: true,
      key: 'allHours',
      fixed: '',
      width: 70,
    },
    {
      rowName: '上月预估',
      rowOther: '上月预估',
      show: true,
      key: 'shangyueYugu',
      fixed: '',
      width: 70,
    },
     {
      rowName: '上月实际',
      rowOther: '上月实际',
      show: true,
      key: 'shangyueShiji',
      fixed: '',
      width: 70,
    },
     {
      rowName: '基本工资',
      rowOther: '基本工资',
      show: true,
      key: 'biaozhunSalary',
      fixed: '',
      width: 70,
    },
     {
      rowName: '事假工时',
      rowOther: '事假工时',
      show: true,
      key: 'shijiaHours',
      fixed: '',
      width: 70,
    },
     {
      rowName: '年假工时',
      rowOther: '年假工时',
      show: true,
      key: 'nianjianHours',
      fixed: '',
      width: 70,
    },
    {
      rowName: '婚假工时',
      rowOther: '婚假工时',
      show: true,
      key: 'hunjiaHours',
      fixed: '',
      width: 70,
    },
    {
      rowName: '丧假工时',
      rowOther: '丧假工时',
      show: true,
      key: 'sanjiaHours',
      fixed: '',
      width: 70,
    },
    {
      rowName: '病假工时',
      rowOther: '病假工时',
      show: true,
      key: 'daixinBingjiaHours',
      fixed: '',
      width: 70,
    },
    {
      rowName: '出勤工资',
      rowOther: '出勤工资',
      show: true,
      key: 'chuqinSalary',
      fixed: '',
      width: 70,
    },
    {
      rowName: '法定节假日加班工时',
      rowOther: '法定节假日加班工时',
      show: true,
      key: 'holidayOverHours',
      fixed: '',
      width: 120,
    },
     {
      rowName: '工作日加班工时',
      rowOther: '工作日加班工时',
      show: true,
      key: 'overHours',
      fixed: '',
      width: 100,
    },
    {
      rowName: '周末加班工时',
      rowOther: '周末加班工时',
      show: true,
      key: 'restOverHours',
      fixed: '',
      width: 100,
    },
    {
      rowName: '法定节假日加班费',
      rowOther: '法定节假日加班费',
      show: true,
      key: 'fadingJiaban',
      fixed: '',
      width: 100,
    },
     {
      rowName: '周末加班费',
      rowOther: '周末加班费',
      show: true,
      key: 'xiuxiJiaban',
      fixed: '',
      width: 70,
    },
    {
      rowName: '工作日加班费',
      rowOther: '工作日加班费',
      show: true,
      key: 'zhengchangJiaban',
      fixed: '',
      width: 100,
    },
     {
      rowName: '加班工资',
      rowOther: '加班工资',
      show: true,
      key: 'jiabanSalary',
      fixed: '',
      width: 70,
    },
     {
      rowName: '个人奖金',
      rowOther: '个人奖金',
      show: true,
      key: 'geti',
      fixed: '',
      width: 70,
    },
      {
      rowName: '团队奖金',
      rowOther: '团队奖金',
      show: true,
      key: 'tuanti',
      fixed: '',
      width: 70,
    },
     {
      rowName: '销售奖金',
      rowOther: '销售奖金',
      show: true,
      key: 'jiangjinTotal',
      fixed: '',
      width: 70,
    },
    {
      rowName: '激励奖金',
      rowOther: '激励奖金',
      show: true,
      key: 'jili',
      fixed: '',
      width: 70,
    },
     {
      rowName: '达成奖金',
      rowOther: '达成奖金',
      show: true,
      key: 'dacheng',
      fixed: '',
      width: 70,
    },
    {
      rowName: '特别奖金',
      rowOther: '特别奖金',
      show: true,
      key: 'teshu',
      fixed: '',
      width: 70,
    },
    {
      rowName: '保底奖金',
      rowOther: '保底奖金',
      show: true,
      key: 'baodiJiangjin',
      fixed: '',
      width: 70,
    },
    {
      rowName: '十三薪',
      rowOther: '十三薪',
      show: true,
      key: 'thirteenthSalary',
      fixed: '',
      width: 70,
    },
     {
      rowName: '年终奖',
      rowOther: '年终奖',
      show: true,
      key: 'yearEndBouns',
      fixed: '',
      width: 70,
    },
     {
      rowName: '工资调差',
      rowOther: '工资调差',
      show: true,
      key: 'salaryTiaocha',
      fixed: '',
      width: 70,
    },
     {
      rowName: '全勤调差',
      rowOther: '全勤调差',
      show: true,
      key: 'quanqinTiaocha',
      fixed: '',
      width: 70,
    },
    {
      rowName: '餐补调差',
      rowOther: '餐补调差',
      show: true,
      key: 'canbuTiaocha',
      fixed: '',
      width: 70,
    },
    {
      rowName: '津贴调差',
      rowOther: '津贴调差',
      show: true,
      key: 'jintieTiaocha',
      fixed: '',
      width: 70,
    },
    {
      rowName: '调差合计',
      rowOther: '调差合计',
      show: true,
      key: 'tiaochaTotal',
      fixed: '',
      width: 70,
    },
    {
      rowName: '招聘方',
      rowOther: '招聘方',
      show: true,
      key: 'recruitParty',
      fixed: '',
      width: 70,
    },
    {
      rowName: '其他费用',
      rowOther: '其他费用',
      show: true,
      key: 'otherPayKe',
      fixed: '',
      width: 70,
    },
     {
      rowName: '计税不发薪项',
      rowOther: '计税不发薪项',
      show: true,
      key: 'serviceType',
      fixed: '',
      width: 100,
    },
     {
      rowName: '员工福利',
      rowOther: '员工福利',
      show: true,
      key: 'welfareKe',
      fixed: '',
      width: 70,
    },
     {
      rowName: '转换费',
      rowOther: '转换费',
      show: true,
      key: 'zhuanChargeTax',
      fixed: '',
      width: 70,
    },
    {
      rowName: '应发工资',
      rowOther: '应发工资',
      show: true,
      key: 'monthTax',
      fixed: '',
      width: 70,
    },
    {
      rowName: '公司承担社保公积金',
      rowOther: '公司承担社保公积金',
      show: true,
      key: 'sheBaoMoney',
      fixed: '',
      width: 120,
    },
    {
      rowName: '残保金',
      rowOther: '残保金',
      show: true,
      key: 'canBaoMoney',
      fixed: '',
      width: 70,
    },
    {
      rowName: '经济补偿金',
      rowOther: '经济补偿金',
      show: true,
      key: 'buchangMonth',
      fixed: '',
      width: 70,
    },
    {
      rowName: '人员成本',
      rowOther: '人员成本',
      show: true,
      key: 'personCost',
      fixed: '',
      width: 70,
    },
    {
      rowName: '费率',
      rowOther: '费率',
      show: true,
      key: 'rate',
      fixed: '',
      width: 70,
    },
    {
      rowName: '服务费',
      rowOther: '服务费',
      show: true,
      key: 'serviceFee',
      fixed: '',
      width: 70,
    },
    {
      rowName: '商业保险',
      rowOther: '商业保险',
      show: true,
      key: 'shangBao',
      fixed: '',
      width: 70,
    },
     {
      rowName: '调差调整',
      rowOther: '调差调整',
      show: true,
      key: 'chenbenTiaochaKe',
      fixed: '',
      width: 70,
    },
    {
      rowName: '税前汇总',
      rowOther: '税前汇总',
      show: true,
      key: 'salaryTax',
      fixed: '',
      width: 70,
    },
     {
      rowName: '税率',
      rowOther: '税率',
      show: true,
      key: 'manageChargeRate',
      fixed: '',
      width: 50,
    },
    {
      rowName: '税金',
      rowOther: '税金',
      show: true,
      key: 'manageChargeTaxMoney',
      fixed: '',
      width: 60,
    },
    {
      rowName: '增值税率',
      rowOther: '增值税率',
      show: true,
      key: 'salaryRate',
      fixed: '',
      width: 70,
    },
    {
      rowName: '增值税金',
      rowOther: '增值税金',
      show: true,
      key: 'salaryRateMoney',
      fixed: '',
      width: 70,
    },
    {
      rowName: '附加税率',
      rowOther: '附加税率',
      show: true,
      key: 'salaryRateFuJia',
      fixed: '',
      width: 70,
    },
    {
      rowName: '附加税金',
      rowOther: '附加税金',
      show: true,
      key: 'salaryRateFuJiaMoney',
      fixed: '',
      width: 70,
    },
    {
      rowName: '费用合计',
      rowOther: '费用合计',
      show: true,
      key: 'salaryTotal',
      fixed: '',
      width: 70,
    },
    {
      rowName: '备注',
      rowOther: '备注',
      show: true,
      key: 'remark',
      fixed: '',
      width: 50,
    },
  ];
const defaultColumnsSheBao = [
    {
      rowName: '序号',
      rowOther: '序号',
      key: 'index',
      show: true,
      fixed: '',
      width: 50,
    },
    {
      rowName: '城市',
      rowOther: '城市',
      key: 'city',
      show: true,
      fixed: '',
      width: 50,
    },
     {
      rowName: '项目',
      rowOther: '项目',
      key: 'companyName',
      fixed: '',
      show: true,
      width: 50,
    },
     {
      rowName: '姓名',
      rowOther: '姓名',
      key: 'userNameCn',
      fixed: '',
      show: true,
      width: 50,
    },
     {
      rowName: '职位',
      rowOther: '职位',
      key: 'positions',
      fixed: '',
      show: true,
      width: 50,
    },
     {
      rowName: '身份证号',
      rowOther: '身份证号',
      key: 'idCard',
      fixed: '',
      show: true,
      width: 50,
    },
     {
      rowName: '缴费月份',
      rowOther: '缴费月份',
      key: 'yearAndMonth',
      fixed: '',
      show: true,
      width: 50,
    },
     {
          rowName: '公积金基数',
          rowOther: '公积金基数',
          key: 'yijinCompanyJishu',
      fixed: '',
      show: true,
      width: 50,
        },
        {
          rowName: '单位',
          rowOther: '单位',
          key: 'yijinCompany',
      fixed: '',
      show: true,
      width: 50,
        },
        {
          rowName: '个人',
          rowOther: '个人',
          key: 'yijinPerson',
      fixed: '',
      show: true,
      width: 50,
        },
     {
      rowName: '单位合计',
      rowOther: '单位合计',
      key: 'companyTotal',
      fixed: '',
      show: true,
      width: 50,
    },
     {
      rowName: '个人合计',
      rowOther: '个人合计',
      key: 'personTotal',
      fixed: '',
      show: true,
      width: 50,
    },
  ];
watch(outsourcePersonMoneyTitleFlag, async (val) => {
  if (val && formStatePersonMoney.value.companyName) {
    await outsourceDetailStore.queryOutsourceCompanyExcel(formStatePersonMoney.value.companyName);
    const savedColumns = getOutsourceSalaryColumnsSalary.value;
    const savedColumnsQing = getOutsourceSalaryColumnsQing.value;
    const savedColumnsSheBao = getOutsourceSalaryColumnsSheBao.value;
    if (savedColumns && savedColumns.length > 0) {
      const savedMap = new Map(savedColumns.map(c => [c.key, c]));
      configColumnsSalary.value = defaultColumnsSalary.map(col => {
        const saved = savedMap.get(col.key);
        return {
          ...col,
          rowName: col.rowName,
          rowOther: saved?.rowOther ? saved.rowOther : col.rowOther,
          show: saved ? saved.show : true, // Default to true if not saved
          key: col.key,
          width: saved?.width ? saved.width :col.width,
          fixed: saved?.fixed ? saved.fixed : col.fixed
        };
      });
    } else {
      configColumnsSalary.value = defaultColumnsSalary.map(col => ({
        ...col,
        rowName: col.rowName,
        rowOther: col.rowOther,
        show: true, // Default to true if not saved
        key: col.key,
        width: col.width,
        fixed: col.fixed
      }));
    }
    if (savedColumnsQing && savedColumnsQing.length > 0) {
      const savedMapQing = new Map(savedColumnsQing.map(c => [c.key, c]));
      configColumnsQing.value = defaultColumnsQing.map(col => {
        const saved = savedMapQing.get(col.key);
        return {
          ...col,
          rowName: col.rowName,
          rowOther: saved?.rowOther ? saved.rowOther : col.rowOther,
          show: saved ? saved.show : true, // Default to true if not saved
          key: col.key,
          width: saved?.width ? saved.width :col.width,
          fixed: saved?.fixed ? saved.fixed : col.fixed
        };
      });
    } else {
      configColumnsQing.value = defaultColumnsQing.map(col => ({
        ...col,
        rowName: col.rowName,
        rowOther: col.rowOther,
        show: true, // Default to true if not saved
        key: col.key,
        width: col.width,
        fixed: col.fixed
      }));
    }
    if (savedColumnsSheBao && savedColumnsSheBao.length > 0) {
      const savedMapSheBao = new Map(savedColumnsSheBao.map(c => [c.key, c]));
      configColumnsSheBao.value = defaultColumnsSheBao.map(col => {
        const saved = savedMapSheBao.get(col.key);
        return {
          ...col,
          rowName: col.rowName,
          rowOther: saved?.rowOther ? saved.rowOther : col.rowOther,
          show: saved ? saved.show : true, // Default to true if not saved
          key: col.key,
          width: saved?.width ? saved.width :col.width,
          fixed: saved?.fixed ? saved.fixed : col.fixed
        };
      });
    } else {
      configColumnsSheBao.value = defaultColumnsSheBao.map(col => ({
        ...col,
        rowName: col.rowName,
        rowOther: col.rowOther,
        show: true, // Default to true if not saved
        key: col.key,
        width: col.width,
        fixed: col.fixed
      }));
  }
  }
});

const handleSave = async () => {
  if (!formStatePersonMoney.value.companyName) {
    return;
  }
  const columnsToSave = configColumnsSalary.value.map(col => ({
    rowName: col.rowName,
    rowOther: col.rowOther,
    show: col.show,
    key: col.key,
    width: col.width,
    fixed: col.fixed
  }));
  
  const columnsToSaveQing = configColumnsQing.value.map(col => ({
    rowName: col.rowName,
    rowOther: col.rowOther,
    show: col.show,
    key: col.key,
    width: col.width,
    fixed: col.fixed
  }));
  
  const columnsToSaveSheBao = configColumnsSheBao.value.map(col => ({
    rowName: col.rowName,
    rowOther: col.rowOther,
    show: col.show,
    key: col.key,
    width: col.width,
    fixed: col.fixed
  }));
  
  const payload = {
    id: getOutsourceCompanyExcelId.value || "",
    companyName: formStatePersonMoney.value.companyName,
    listText: JSON.stringify(columnsToSave),
    qingkuanText: JSON.stringify(columnsToSaveQing),
    shebaoText: JSON.stringify(columnsToSaveSheBao),
  };
  const res = await outsourceDetailStore.addOutsourceCompanyExcel(payload);
  if (res && res.code === 1) {
    outsourceDetailStore.outsourceSalaryColumnsQing = columnsToSaveQing;
    outsourceDetailStore.outsourceSalaryColumnsSheBao = columnsToSave;
    outsourceDetailStore.outsourceSalaryColumnsSalary = columnsToSaveSheBao;
    outsourcePersonMoneyTitleFlag.value = false;
  }
};
</script>

<style lang="less" scoped>
  :deep(.ant-descriptions .ant-descriptions-header) {
    margin-bottom: 10px;
  } 
  :deep(.ant-descriptions .ant-descriptions-item-label) {
    width: 75px;
    min-width: 75px;
    max-width: 75px;
    font-weight: bold;
  }
  
  :deep(.ant-descriptions .ant-descriptions-item-content) {
    width: 150px;
    min-width: 150px;
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .resume-content-search {
    display: flex;
    flex-direction: row;
    justify-content: end;
    background-color: #fff;
    box-shadow: 0 0 2px #ccc;
    border-radius: 5px;
    overflow: hidden;
    padding: 10px;
    margin-bottom: 10px;
    padding-bottom: 9px;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
  }
  .resume_container {
    background-color: #fff;
    box-shadow: 0 0 2px #ccc;
    border-radius: 5px;
    overflow: hidden;
    padding: 10px;
    height: 83vh;
    overflow-y: auto;
  }
  .resume_container .row{
    margin-bottom: 5px !important;
  }
  .resume_container .header-row {
    position: sticky;
    top: -10px;
    z-index: 2;
    font-weight: 600;
    background-color: #fff;
    padding-top: 10px;
    padding-bottom: 6px;
    margin-bottom: 8px !important;
    border-bottom: 1px solid #f0f0f0;
  }
  :deep(.ant-tabs-top >.ant-tabs-nav) {
    margin-bottom: 0;
  }
  .row-name-cell {
    display: flex;
    align-items: center;
    width: 100%;
  }
  .drag-handle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    margin-right: 6px;
    color: #8c8c8c;
  }
  .qing-draggable-row {
    cursor: move;
  }
  :deep(.qing-draggable-row input),
  :deep(.qing-draggable-row textarea),
  :deep(.qing-draggable-row .ant-select),
  :deep(.qing-draggable-row .ant-picker),
  :deep(.qing-draggable-row .ant-checkbox-wrapper) {
    cursor: default;
  }
  .qing-ghost {
    opacity: 0.4;
  }
  .qing-chosen {
    background: #f5f5f5;
  }
</style>
