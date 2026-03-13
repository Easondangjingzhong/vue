<template>
   <a-drawer
    v-model:open="outsourcePersonMoneyTitleFlag"
    title="工资单标题"
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
        <a-row class="row" :gutter="24" v-for="(item, index) in configColumns" :key="index">
          <a-col :span="8">
            <a-input v-model:value="item.rowName" disabled/>
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
import { CloseOutlined } from '@ant-design/icons-vue';
//import { OutsourcePersonMoneyColumnsItem }  from '/@/api/outsourceDetail/model';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { outsourcePersonMoneyTitleFlag, formStatePersonMoney, getOutsourceSalaryColumns, getOutsourceCompanyExcelId } = storeToRefs(outsourceDetailStore);
const drawerWidth = ref(Math.max(600, window.innerWidth * 0.6));
const configColumns = ref<any[]>([]);

const handleClose = () => {
    outsourcePersonMoneyTitleFlag.value = false;
  };
const defaultColumns = [
    {
      rowName: '序号',
      rowOther: '',
      show: true,
      key: 'index',
      fixed: 'left',
      width: 40,
    },
    {
      rowName: '店铺',
      rowOther: '',
      show: true,
      key: 'mkName',
      fixed: 'left',
      width: 80,
    },
    {
      rowName: '姓名',
      rowOther: '',
      show: true,
      key: 'userName',
      fixed: 'left',
      width: 90,
      ellipsis: true,
    },
    {
      rowName: '职位',
      rowOther: '',
      show: true,
      key: 'positions',
      fixed: 'left',
      width: 90,
      ellipsis: true,
    },
    {
      rowName: '身份证号',
      rowOther: '',
      show: true,
      key: 'idCard',
      fixed: 'left',
      width: 70,
    },
    {
      rowName: '联系方式',
      rowOther: '',
      show: true,
      key: 'phoneNumber',
      fixed: 'left',
      width: 80,
    },
    {
      rowName: '派入公司全称',
      rowOther: '',
      show: true,
      key: 'companyNameAll',
      fixed: '',
      width: 150,
    },
    {
      rowName: '入职时间',
      rowOther: '',
      show: true,
      key: 'realEntryTime',
      fixed: '',
      width: 100,
    },
    {
      rowName: '离职时间',
      rowOther: '',
      show: true,
      fixed: '',
      key: 'realLeaveTime',
      width: 100,
    },
    {
      rowName: '计薪日期',
      rowOther: '',
      show: true,
      key: 'jinxinMonthDetail',
      fixed: '',
      width: 100,
    },
    {
      rowName: `本月预估考勤情况/H`,
      rowOther: '',
      show: true,
      key: 'yuguGongshi',
      fixed: '',
      width: 120,
    },
    {
      rowName: `本月标准工资`,
      rowOther: '',
      show: true,
      key: 'biaozhunSalary',
      fixed: '',
      width: 80,
    },
    {
      rowName: `本月餐补`,
      rowOther: '',
      show: true,
      key: 'canbu',
      fixed: '',
      width: 80,
    },
    {
      title: `本月全勤`,
      rowName: `本月全勤`,
      rowOther: '',
      show: true,
      key: 'quanqin',
      fixed: '',
      width: 80,
    },
    {
      rowName: `上月正常加班（小时）`,
      rowOther: '',
      show: true,
      key: 'zhengchangJiaban',
      fixed: '',
      width: 140,
    },
    {
      rowName: `上月法定假期加班（小时）`,
      rowOther: '',
      show: true,
      key: 'fadingJiaban',
      fixed: '',
      width: 160,
    },
    {
      rowName: `上月加班工资`,
      rowOther: '',
      show: true,
      key: 'jiabanSalary',
      fixed: '',
      width: 80,
    },
    {
      rowName: `上月预估出勤`,
      rowOther: '',
      show: true,
      key: 'shangyueYugu',
      fixed: '',
      width: 80,
    },
    {
      rowName: `上月实际出勤`,
      rowOther: '',
      show: true,
      key: 'shangyueShiji',
      fixed: '',
      width: 80,
    },
    {
      rowName: '迟到',
      rowOther: '',
      show: true,
      key: 'chidao',
      fixed: '',
      width: 80,
    },
    {
      rowName: '事假',
      rowOther: '',
      show: true,
      key: 'shijia',
      fixed: '',
      width: 80,
    },
    {
      rowName: '年假',
      rowOther: '',
      show: true,
      key: 'qingKuanTime',
      fixed: '',
      width: 80,
    },
    {
      rowName: '带薪假',
      rowOther: '',
      show: true,
      key: 'daixin',
      fixed: '',
      width: 80,
    },
    {
      rowName: '病假',
      rowOther: '',
      show: true,
      key: 'bingjia',
      fixed: '',
      width: 80,
    },
    {
      rowName: '个人销售奖金',
      rowOther: '',
      show: true,
      key: 'geti',
      fixed: '',
      width: 80,
    },
    {
      rowName: '团队销售奖金',
      rowOther: '',
      show: true,
      key: 'tuanti',
      fixed: '',
      width: 80,
    },
    {
      rowName: '特别奖金',
      rowOther: '',
      show: true,
      key: 'teshu',
      fixed: '',
      width: 80,
    },
    {
      rowName: '达成奖金激励',
      rowOther: '',
      show: true,
      key: 'jili',
      fixed: '',
      width: 80,
    },
    {
      rowName: '基础工资调差',
      rowOther: '',
      show: true,
      key: 'salaryTiaocha',
      fixed: '',
      width: 80,
    },
    {
      rowName: '餐补调差',
      rowOther: '',
      show: true,
      key: 'canbuTiaocha',
      fixed: '',
      width: 80,
    },
    {
      rowName: '全勤调差',
      rowOther: '',
      show: true,
      key: 'quanqinTiaocha',
      fixed: '',
      width: 80,
    },
    {
      rowName: '差异调整合计',
      rowOther: '',
      show: true,
      key: 'tiaochaTotal',
      fixed: '',
      width: 80,
    },
    {
      rowName: '应计合计',
      rowOther: '',
      show: true,
      key: 'monthTax',
      fixed: '',
      width: 80,
    },
    {
      rowName: '本年累计',
      rowOther: '',
      show: true,
      key: 'yearTax',
      fixed: '',
      width: 80,
    },
    {
      rowName: '养老保险',
      rowOther: '',
      show: true,
      key: 'yanglao',
      fixed: '',
      width: 80,
    },
    {
      rowName: '失业保险',
      rowOther: '',
      show: true,
      key: 'shiye',
      fixed: '',
      width: 80,
    },
    {
      rowName: '基本医疗保险',
      rowOther: '',
      show: true,
      key: 'yiliao',
      fixed: '',
      width: 80,
    },
    {
      rowName: '大病救助',
      rowOther: '',
      show: true,
      key: 'dabing',
      fixed: '',
      width: 80,
    },
    {
      rowName: '住房公积金',
      rowOther: '',
      show: true,
      key: 'yijin',
      fixed: '',
      width: 80,
    },
    {
      rowName: '本月社保合计',
      rowOther: '',
      show: true,
      key: 'monthShebao',
      fixed: '',
      width: 80,
    },
    {
      rowName: '本年社保累计',
      rowOther: '',
      show: true,
      key: 'yearShebao',
      fixed: '',
      width: 80,
    },
    {
      rowName: '子女教育',
      rowOther: '',
      show: true,
      key: 'zinvJiaoyu',
      fixed: '',
      width: 80,
    },
    {
      rowName: '继续教育',
      rowOther: '',
      show: true,
      key: 'jixuJiaoyu',
      fixed: '',
      width: 80,
    },
    {
      rowName: '房贷利息',
      rowOther: '',
      show: true,
      key: 'fangdaiLixi',
      fixed: '',
      width: 80,
    },
    {
      rowName: '房租',
      rowOther: '',
      show: true,
      key: 'fangzu',
      fixed: '',
      width: 80,
    },
    {
      rowName: '赡养父母',
      rowOther: '',
      show: true,
      key: 'shangyangFumu',
      fixed: '',
      width: 80,
    },
    {
      rowName: '本月专扣合计',
      rowOther: '',
      show: true,
      key: 'monthZhuankou',
      fixed: '',
      width: 80,
    },
    {
      rowName: '本月专扣累计',
      rowOther: '',
      show: true,
      key: 'yearZhuankou',
      fixed: '',
      width: 80,
    },
    {
      rowName: '免征额',
      rowOther: '',
      show: true,
      key: 'yearMianzheng',
      fixed: '',
      width: 80,
    },
    {
      rowName: '累计应缴税金',
      rowOther: '',
      show: true,
      key: 'yearGeshui',
      fixed: '',
      width: 80,
    },
    {
      rowName: '本月应缴个税',
      rowOther: '',
      show: true,
      key: 'monthGeshui',
      fixed: '',
      width: 80,
    },
    {
      rowName: '截止上月累计预扣预缴',
      rowOther: '',
      show: true,
      key: 'lastMonthLeiJi',
      fixed: '',
      width: 130,
    },
    {
      rowName: '截止上月金三累计已预扣个税',
      rowOther: '',
      show: true,
      key: 'lastMonthLeiJi',
      fixed: '',
      width: 180,
    },
    {
      rowName: '经济补偿金',
      rowOther: '',
      show: true,
      key: 'jingJiBuChangJin',
      fixed: '',
      width: 80,
    },
    {
      rowName: '汇款手续费',
      rowOther: '',
      show: true,
      key: 'shouxuMoney',
      fixed: '',
      width: 80,
    },
    {
      rowName: '实发金额',
      rowOther: '',
      show: true,
      key: 'salaryAfterTax',
      fixed: '',
      width: 80,
    },
    {
      rowName: '工作地',
      rowOther: '',
      show: true,
      key: 'workCity',
      fixed: '',
      width: 80,
    },
    {
      rowName: '五险一金缴纳地',
      rowOther: '',
      show: true,
      key: 'socialCity',
      fixed: '',
      width: 120,
    },
    {
      rowName: '个税缴纳地区',
      rowOther: '',
      show: true,
      key: 'taxCity',
      fixed: '',
      width: 120,
    },
  ];

watch(outsourcePersonMoneyTitleFlag, async (val) => {
  if (val && formStatePersonMoney.value.companyName) {
    await outsourceDetailStore.queryOutsourceCompanyExcel(formStatePersonMoney.value.companyName);
    // Initialize configColumns
    const savedColumns = getOutsourceSalaryColumns.value;
    if (savedColumns && savedColumns.length > 0) {
      // Map saved columns to ensure we have all fields, preserving saved titles and visibility
      // Wait, if saved columns are different (e.g. order), we should probably respect saved order?
      // For now, let's just map the default columns and override with saved config if matching dataIndex found.
      // Actually, if we want to support reordering, we should use the saved list as the base.
      // But if new columns are added in code, they might be missing.
      // Let's assume the saved list is authoritative for order and existence, 
      // but we should also check if any default columns are missing and add them (maybe at the end or hidden).
      
      // Strategy: Use saved columns. If a column in defaultColumns is not in saved, add it (hidden by default?).
      // Or simpler: Just load the saved columns.
      
      // Let's try to merge:
      // 1. Create a map of saved columns
      const savedMap = new Map(savedColumns.map(c => [c.key, c]));
      
      configColumns.value = defaultColumns.map(col => {
        const saved = savedMap.get(col.key);
        return {
          ...col,
          rowName: saved ? saved.rowName : col.rowName,
          rowOther: saved ? saved.rowOther : col.rowOther,
          show: saved ? saved.show : true, // Default to true if not saved
          key: col.key,
          width: col.width,
          fixed: col.fixed
        };
      });
    } else {
      // No saved config, use default
      configColumns.value = defaultColumns.map(col => ({
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
  // Filter or map to what we want to save
  // We save all columns configuration (title, checked status)
  const columnsToSave = configColumns.value.map(col => ({
    rowName: col.rowName,
    rowOther: col.rowOther,
    show: col.show,
    key: col.key,
    width: col.width,
    fixed: col.fixed
  }));
  
  // Assuming the API expects { companyName: string, excelTitle: string (JSON) }
  // or maybe just the array if the backend handles it.
  // Based on typical patterns, let's try sending an object.
  const payload = {
    id: getOutsourceCompanyExcelId.value || "",
    companyName: formStatePersonMoney.value.companyName,
    listText: JSON.stringify(columnsToSave)
  };
  
  const res = await outsourceDetailStore.addOutsourceCompanyExcel(payload);
  if (res && res.code === 1) {
    // Update store state immediately so Salary component updates
    outsourceDetailStore.outsourceSalaryColumns = columnsToSave;
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
</style>
