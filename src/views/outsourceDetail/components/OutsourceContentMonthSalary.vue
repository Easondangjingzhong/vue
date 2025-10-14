<template>
  <div class="resume-content-search">
    <a-form :model="formStateMonthSalary" @finish="onSearch">
      <a-row :gutter="24">
        <a-col :span="6">
          <a-form-item name="city" label="公司">
            <a-select
              optionFilterProp="label"
              v-model:value="formStateMonthSalary.city"
              :showArrow="false"
              allowClear
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="3">
          <a-form-item name="bId" label="类型">
            <a-select
              optionFilterProp="label"
              v-model:value="formStateMonthSalary.bId"
              :showArrow="false"
              allowClear
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="3">
          <a-form-item name="positionId" label="状态">
            <a-select
              optionFilterProp="label"
              v-model:value="formStateMonthSalary.positionId"
              :showArrow="false"
              allowClear
            ></a-select>
          </a-form-item>
        </a-col>
         <a-col :span="6">
          <a-button style="margin: 0 0 0 8px" type="primary" html-type="submit">搜索</a-button>
          <a-button style="margin: 0 8px" @click="clearFromState">清空</a-button>
         </a-col>
      </a-row>
     </a-form>
  </div>
  <div class="resume-content">
    <a-row>
    <a-table
      size="small"
      :pagination="false"
      rowKey="key"
      :loading="monthSalaryIsLoading"
      :columns="columnsOutsourceDetail"
      :scroll="{ x: 3500 }"
    ></a-table>
    </a-row>
    <a-row style="justify-content: end; margin-top: 10px">
      <a-pagination
        v-model:current="pageOutsourceMonthSalaryList.pageNumber"
        :pageSize="pageOutsourceMonthSalaryList.pageSize"
        @change="handleOutsourceMonthSalaryListData"
        :total="pageOutsourceMonthSalaryList.total"
        :showSizeChanger="false"
        :showQuickJumper="true"
        :hideOnSinglePage="true"
        size="small"
        :show-total="(total) => `共 ${total} 条`"
      >
        <template #itemRender="{ type, originalElement }">
          <a v-if="type === 'prev'">上一页</a>
          <a v-else-if="type === 'next'">下一页</a>
          <component :is="originalElement" v-else></component>
        </template>
      </a-pagination>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { monthSalaryIsLoading,pageOutsourceMonthSalaryList,formStateMonthSalary } = storeToRefs(outsourceDetailStore);
const columnsOutsourceDetail = [
  { title: '编号', dataIndex: 'index', key: 'index', fixed: 'left' as const, width: 30, },
  { title: '中文姓名', dataIndex: 'chineseName', key: 'chineseName', fixed: 'left' as const, width: 50, },
  { title: '英文姓名', dataIndex: 'englishName', key: 'englishName', fixed: 'left' as const, width: 50, },
  { title: '公司', dataIndex: 'company', key: 'company', fixed: 'left' as const, width: 30, },
  { title: '城市', dataIndex: 'city', key: 'city', fixed: 'left' as const, width: 30, },
  { title: '性质', dataIndex: 'nature', key: 'nature', fixed: 'left' as const, width: 30, },
  { title: '计薪周期', dataIndex: 'payrollCycle', key: 'payrollCycle', width: 50, },
  { title: '入职日期', dataIndex: 'hireDate', key: 'hireDate', width: 50, },
  { title: '离职日期', dataIndex: 'resignDate', key: 'resignDate', width: 50, },
  { title: '标准工资', dataIndex: 'standardSalary', key: 'standardSalary', width: 50, },
  { title: '标准工时', dataIndex: 'standardWorkingHours', key: 'standardWorkingHours', width: 50, },
  { title: '预估工时', dataIndex: 'estimatedWorkingHours', key: 'estimatedWorkingHours', width: 50, },
  { title: '出勤工资', dataIndex: 'attendanceSalary', key: 'attendanceSalary', width: 50, },
  { title: '餐补', dataIndex: 'mealAllowance', key: 'mealAllowance', width: 30, },
  { title: '津贴', dataIndex: 'allowance', key: 'allowance', width: 30, },
  { title: '全勤', dataIndex: 'perfectAttendance', key: 'perfectAttendance', width: 30, },
  { title: '正常加班', dataIndex: 'regularOvertime', key: 'regularOvertime', width: 50, },
  { title: '法定加班', dataIndex: 'legalOvertime', key: 'legalOvertime', width: 50, },
  { title: '加班工资', dataIndex: 'overtimeSalary', key: 'overtimeSalary', width: 50, },
  { title: '上月预估', dataIndex: 'lastMonthEstimated', key: 'lastMonthEstimated', width: 50, },
  { title: '上月出勤', dataIndex: 'lastMonthAttendance', key: 'lastMonthAttendance', width: 50, },
  { title: '迟到', dataIndex: 'late', key: 'late', width: 30, },
  { title: '事假', dataIndex: 'personalLeave', key: 'personalLeave', width: 30, },
  { title: '病假', dataIndex: 'sickLeave', key: 'sickLeave', width: 30, },
  { title: '带薪假', dataIndex: 'paidLeave', key: 'paidLeave', width: 40, },
  { title: '个人奖金', dataIndex: 'personalBonus', key: 'personalBonus', width: 50, },
  { title: '团队奖金', dataIndex: 'teamBonus', key: 'teamBonus', width: 50, },
  { title: '特殊奖金', dataIndex: 'specialBonus', key: 'specialBonus', width: 50, },
  { title: '达成奖金', dataIndex: 'achievementBonus', key: 'achievementBonus', width: 50, },
  { title: '工资调差', dataIndex: 'salaryAdjustment', key: 'salaryAdjustment', width: 50, },
  { title: '餐补调差', dataIndex: 'mealAllowanceAdjustment', key: 'mealAllowanceAdjustment', width: 50, },
  { title: '调差合计', dataIndex: 'totalAdjustment', key: 'totalAdjustment', width: 50, },
  { title: '月度税前', dataIndex: 'monthlyPretax', key: 'monthlyPretax', width: 50, },
  { title: '年度税前', dataIndex: 'annualPretax', key: 'annualPretax', width: 50, },
  { title: '养老保险', dataIndex: 'pensionInsurance', key: 'pensionInsurance', width: 50, },
  { title: '失业保险', dataIndex: 'unemploymentInsurance', key: 'unemploymentInsurance', width: 50, },
  { title: '医疗保险', dataIndex: 'medicalInsurance', key: 'medicalInsurance', width: 50, },
  { title: '大病救助', dataIndex: 'criticalIllnessAssistance', key: 'criticalIllnessAssistance', width: 50, },
  { title: '公积金', dataIndex: 'housingFund', key: 'housingFund', width: 40, },
  { title: '月度社保', dataIndex: 'monthlySocialSecurity', key: 'monthlySocialSecurity', width: 50, },
  { title: '年度社保', dataIndex: 'annualSocialSecurity', key: 'annualSocialSecurity', width: 50, },
  { title: '子女教育', dataIndex: 'childEducation', key: 'childEducation', width: 50, },
  { title: '继续教育', dataIndex: 'continuingEducation', key: 'continuingEducation', width: 50, },
  { title: '房贷利息', dataIndex: 'mortgageInterest', key: 'mortgageInterest', width: 50, },
  { title: '房租', dataIndex: 'rent', key: 'rent', width: 30, },
  { title: '赡养父母', dataIndex: 'supportParents', key: 'supportParents', width: 50, },
  { title: '月度专扣', dataIndex: 'monthlyDeduction', key: 'monthlyDeduction', width: 50, },
  { title: '年度专扣', dataIndex: 'annualDeduction', key: 'annualDeduction', width: 50, },
  { title: '年度免征', dataIndex: 'annualExemption', key: 'annualExemption', width: 50, },
  { title: '月度个税', dataIndex: 'monthlyIncomeTax', key: 'monthlyIncomeTax', width: 50, },
  { title: '年度个税', dataIndex: 'annualIncomeTax', key: 'annualIncomeTax', width: 50, },
  { title: '手续费', dataIndex: 'serviceFee', key: 'serviceFee', width: 40, },
  { title: '税后工资', dataIndex: 'afterTaxSalary', key: 'afterTaxSalary', width: 50, },
]
const handleOutsourceMonthSalaryListData = () => {}
const clearFromState = () => {
  formStateMonthSalary.value = {
    city: '',
    bId: '',
    positionId: '',
  }
}
const onSearch = () => {}
</script>

<style lang="less" scoped>
  .tag {
    cursor: pointer;
  }
  .resume-content,
  .resume-content-search {
    background-color: #fff;
    box-shadow: 0 0 2px #ccc;
    border-radius: 5px;
    overflow: hidden;
    padding: 20px;
  }
  .resume-content-search {
    margin-bottom: 10px;
    padding-bottom: 9px;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
  }
  .resume-content-search .ant-form .ant-form-item {
    margin-bottom: 10px !important;
  }
  :deep(.ant-pagination-prev ){
    padding-right: 5px;
  }
  :deep(.ant-pagination-next ){

    padding-left: 5px;
  }
</style>