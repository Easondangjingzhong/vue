<template>
  <div class="resume-content-search">
    <a-form :model="formStateSalary" @finish="onSearch">
      <a-row :gutter="24">
        <a-col :span="6">
          <a-form-item name="city" label="公司">
            <a-select
              optionFilterProp="label"
              v-model:value="formStateSalary.city"
              :showArrow="false"
              allowClear
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="3">
          <a-form-item name="bId" label="类型">
            <a-select
              optionFilterProp="label"
              v-model:value="formStateSalary.bId"
              :showArrow="false"
              allowClear
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="3">
          <a-form-item name="positionId" label="状态">
            <a-select
              optionFilterProp="label"
              v-model:value="formStateSalary.positionId"
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
      :loading="salaryIsLoading"
      :columns="columnsOutsourceDetail"
      :scroll="{ x: 1800 }"
    ></a-table>
    </a-row>
    <a-row style="justify-content: end; margin-top: 10px">
      <a-pagination
        v-model:current="pageOutsourceSalaryList.pageNumber"
        :pageSize="pageOutsourceSalaryList.pageSize"
        @change="handleOutsourceSalaryListData"
        :total="pageOutsourceSalaryList.total"
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
const { salaryIsLoading, pageOutsourceSalaryList, formStateSalary } = storeToRefs(outsourceDetailStore);
const columnsOutsourceDetail = [
  { title: '编号', dataIndex: 'index', key: 'index', fixed: 'left' as const, width: 30, },
  { title: '中文姓名', dataIndex: 'cnName', key: 'cnName', fixed: 'left' as const, width: 50, },
  { title: '英文姓名', dataIndex: 'enName', key: 'enName', fixed: 'left' as const, width: 50, },
  { title: '公司', dataIndex: 'company', key: 'company', fixed: 'left' as const, width: 30, },
  { title: '城市', dataIndex: 'city', key: 'city', fixed: 'left' as const, width: 30, },
  { title: '性质', dataIndex: 'nature', key: 'nature', fixed: 'left' as const, width: 30, },
  { title: '状态', dataIndex: 'status', key: 'status', fixed: 'left' as const, width: 30, },
  { title: '周期', dataIndex: 'period', key: 'period', fixed: 'left' as const, width: 30, },
  { title: '基础工资', dataIndex: 'basicSalary', key: 'basicSalary', width: 50 },
  { title: '餐补', dataIndex: 'mealAllowance', key: 'mealAllowance', width: 30 },
  { title: '津贴', dataIndex: 'allowance', key: 'allowance', width: 30 },
  { title: '全勤', dataIndex: 'fullAttendance', key: 'fullAttendance', width: 30 },
  { title: '工资总计', dataIndex: 'totalSalary', key: 'totalSalary', width: 50 },
  { title: '个人奖金', dataIndex: 'personalBonus', key: 'personalBonus', width: 50 },
  { title: '团队奖金', dataIndex: 'teamBonus', key: 'teamBonus', width: 50 },
  { title: '特殊奖金', dataIndex: 'specialBonus', key: 'specialBonus', width: 50 },
  { title: '激励奖金', dataIndex: 'incentiveBonus', key: 'incentiveBonus', width: 50 },
  { title: '达成奖金', dataIndex: 'achievementBonus', key: 'achievementBonus', width: 50 },
  { title: '商保', dataIndex: 'commercialInsurance', key: 'commercialInsurance', width: 30 },
  { title: '单位合计', dataIndex: 'companyTotal', key: 'companyTotal', width: 50 },
  { title: '个人合计', dataIndex: 'personalTotal', key: 'personalTotal', width: 50 },
  { title: '社保标准', dataIndex: 'socialSecurityStandard', key: 'socialSecurityStandard', width: 50  },
  { title: '养老基数', dataIndex: 'pensionBase', key: 'pensionBase', width: 50 },
  { title: '失业基数', dataIndex: 'unemploymentBase', key: 'unemploymentBase', width: 50 },
  { title: '医疗基数', dataIndex: 'medicalBase', key: 'medicalBase', width: 50 },
  { title: '大病基数', dataIndex: 'criticalIllnessBase', key: 'criticalIllnessBase', width: 50 },
  { title: '工伤基数', dataIndex: 'workInjuryBase', key: 'workInjuryBase', width: 50 },
  { title: '生育基数', dataIndex: 'maternityBase', key: 'maternityBase', width: 50 },
  { title: '一金标准', dataIndex: 'housingFundStandard', key: 'housingFundStandard', width: 50 },
  { title: '一金基数', dataIndex: 'housingFundBase', key: 'housingFundBase', width: 50 },
];
const clearFromState = () => {
  formStateSalary.value = {
    city: '',
    bId: '',
    positionId: '',
  }
}
const onSearch = () => {}
const handleOutsourceSalaryListData = () => {}
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