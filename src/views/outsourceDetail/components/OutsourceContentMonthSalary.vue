<template>
  <div class="resume-content-search">
    <a-form :model="formStateMonthSalary" @finish="onSearch">
      <a-row :gutter="24">
         <a-col :span="3">
          <a-form-item name="userName" label="姓名">
            <a-input v-model:value="formStateMonthSalary.userName"/>
          </a-form-item>
        </a-col>
        <a-col :span="3">
          <a-form-item name="city" label="城市">
            <a-select
              optionFilterProp="label"
              v-model:value="formStateMonthSalary.city"
              :options="getProvince"
              :showArrow="false"
              showSearch
              allowClear
            ></a-select>
          </a-form-item>
        </a-col>
         <a-col :span="3">
          <a-form-item name="companyName" label="公司">
            <a-select
              optionFilterProp="label"
              v-model:value="formStateMonthSalary.companyName"
              :options="getOutsourceCompanyAll"
              :showArrow="false"
              showSearch
              allowClear
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="3">
          <a-form-item name="bId" label="品牌">
            <a-select
              optionFilterProp="label"
              v-model:value="formStateMonthSalary.bId"
              :options="getOutsourceBrand"
              :showArrow="false"
              showSearch
              allowClear
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="3">
          <a-form-item name="positionId" label="职位">
            <a-select
              optionFilterProp="label"
              v-model:value="formStateMonthSalary.positionId"
              :options="getOutsourcePosition"
              :showArrow="false"
              showSearch
              allowClear
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="3">
          <a-form-item name="jobType" label="性质">
            <a-select
              optionFilterProp="label"
              v-model:value="formStateMonthSalary.jobType"
              :showArrow="false"
              showSearch
              allowClear
            >
              <a-select-option value="兼职">兼职</a-select-option>
              <a-select-option value="全职">全职</a-select-option>
          </a-select>
          </a-form-item>
        </a-col>
         <a-col :span="4">
          <a-button style="margin: 0 0 0 8px" type="primary" html-type="submit">搜索</a-button>
          <a-button style="margin: 0 8px" @click="clearFromState">清空</a-button>
         </a-col>
      </a-row>
     </a-form>
  </div>
  <div class="resume-content">
    <a-row style="justify-content: space-between;margin-bottom: 5px;">
        <span>
          <a-button @click="handleSearchOutsourcePerson('2')" :class="{'active': formStateMonthSalary.currentStatus === '2'}" style="margin-right: 5px;" size="small">在职</a-button>
          <a-button @click="handleSearchOutsourcePerson('3')" :class="{'active': formStateMonthSalary.currentStatus === '3'}" style="margin-right: 5px;" size="small">离职</a-button>
          <a-button @click="handleSearchOutsourcePerson('1')" :class="{'active': formStateMonthSalary.currentStatus === ''}" style="margin-right: 5px;" size="small">全部</a-button>
          <a-button @click="handleSearchOutsourcePerson('4')" :class="{'active': formStateMonthSalary.companyArrange === '1'}" style="margin-right: 5px;" size="small" title="按公司排序">排序</a-button>
        </span>
         <span>
           <a-button @click="handleOutsourceFormula" style="background-color: #eee" size="small">公司公式</a-button>
        </span>
    </a-row>
    <a-row>
    <a-table
      size="small"
      :pagination="false"
      rowKey="key"
      :loading="monthSalaryIsLoading"
      :columns="columnsOutsourceMonthSalary"
      :dataSource="getOutsourceMonthSalaryList"
      :scroll="{ x: 4000 }"
    >
    <template #bodyCell="{ column, record }">
       <a-tag v-if="column.key === 'flag' && record.flag === '1'" color="orange">待核</a-tag>
      <a-tag v-if="column.key === 'flag' && record.flag === '2'" color="green">已核</a-tag>
    <!-- 添加类型断言和存在性检查以修复TypeScript索引类型错误 -->
    <span v-if="(typeof column.dataIndex === 'string' && (record[column.dataIndex] === null || record[column.dataIndex] === ''))">-</span>
    </template>  
    </a-table>
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
import type { TableColumnsType } from 'ant-design-vue';
import { SearchMonthSalaryItem } from '/@/api/outsourceDetail/model';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { monthSalaryIsLoading,pageOutsourceMonthSalaryList,getOutsourceMonthSalaryList,formStateMonthSalary, getProvince, getOutsourceBrand, getOutsourceCompanyAll, getOutsourcePosition, } = storeToRefs(outsourceDetailStore);
const columnsOutsourceMonthSalary:TableColumnsType = [
  { title: '编号', dataIndex: 'index', key: 'index', fixed: 'left', width: 30, },
  { title: '计薪月', dataIndex: 'yearAndMonth', key: 'yearAndMonth', fixed: 'left', width: 50, },
  { title: '标识', dataIndex: 'isCheck', key: 'isCheck', fixed: 'left', width: 30, },
  { title: '公式', dataIndex: 'chineseName', key: 'chineseName', fixed: 'left', width: 30, },
  { title: '姓名', dataIndex: 'userNameCn', key: 'userNameCn', fixed: 'left', width: 60, ellipsis: true, },
  { title: '公司', dataIndex: 'companyName', key: 'companyName', fixed: 'left', width: 45, ellipsis: true, },
  { title: '城市', dataIndex: 'city', key: 'city', fixed: 'left', width: 30, },
  { title: '职位', dataIndex: 'positions', key: 'positions', fixed: 'left', width: 50, ellipsis: true,},
  { title: '性质', dataIndex: 'jobType', key: 'jobType', fixed: 'left', width: 30, },
  { title: '入职日期', dataIndex: 'realEntryTime', key: 'realEntryTime', width: 55, },
  { title: '离职日期', dataIndex: 'realLeaveTime', key: 'realLeaveTime', width: 55, },
  { title: '基本工资', dataIndex: 'dixin', key: 'dixin', width: 50, },
  { title: '全勤工时', dataIndex: 'quanqinHours', key: 'quanqinHours', width: 50, },
  { title: '上月预估', dataIndex: 'lastMonthYuHoursTotal', key: 'lastMonthYuHoursTotal', width: 50, },
  { title: '上月实际', dataIndex: 'lastMonthShiHoursTotal', key: 'lastMonthShiHoursTotal', width: 50, },
  { title: '本月预估', dataIndex: 'currentMonthYuHoursTotal', key: 'currentMonthYuHoursTotal', width: 50, },
  { title: '本月实际', dataIndex: 'currentMonthShiHoursTotal', key: 'currentMonthShiHoursTotal', width: 50, },
  { title: '当月差额', dataIndex: 'currentTotalChaHoursTotal', key: 'currentTotalChaHoursTotal', width: 50, },
  { title: '累计差额', dataIndex: 'totalChaHoursTotal', key: 'totalChaHoursTotal', width: 50, },
  { title: '出勤工资', dataIndex: 'chuqinSalary', key: 'chuqinSalary', width: 50, },
  { title: '餐补', dataIndex: 'canbu', key: 'canbu', width: 50, },
  { title: '津贴', dataIndex: 'jintie', key: 'jintie', width: 50, },
  { title: '全勤', dataIndex: 'quanqin', key: 'quanqin', width: 50, },
  { title: '正常加班', dataIndex: 'zhengchangJiaban', key: 'zhengchangJiaban', width: 50, },
  { title: '国定加班', dataIndex: 'fadingJiaban', key: 'fadingJiaban', width: 50, },
  { title: '休息加班', dataIndex: 'restJiaban', key: 'restJiaban', width: 50, },
  { title: '加班总计', dataIndex: 'totalJiaban', key: 'totalJiaban', width: 50, },
  { title: '迟到', dataIndex: 'chidao', key: 'chidao', width: 50, },
  { title: '病假', dataIndex: 'bingjia', key: 'bingjia', width: 50, },
  { title: '带薪假', dataIndex: 'daixinjia', key: 'daixinjia', width: 50, },
  { title: '个人奖金', dataIndex: 'personBouns', key: 'personBouns', width: 50, },
  { title: '团队奖金', dataIndex: 'teamBouns', key: 'teamBouns', width: 50, },
  { title: '激励奖金', dataIndex: 'jiliBouns', key: 'jiliBouns', width: 50, },
  { title: '特殊奖金', dataIndex: 'specialBouns', key: 'specialBouns', width: 50, },
  { title: '达成奖金', dataIndex: 'dachengBouns', key: 'dachengBouns', width: 50, },
  { title: '奖金总计', dataIndex: 'totalBouns', key: 'totalBouns', width: 50, },
  { title: '保底奖金', dataIndex: 'baodiBouns', key: 'baodiBouns', width: 50, },
  { title: '工资调差', dataIndex: 'salaryTiaocha', key: 'salaryTiaocha', width: 50, },
  { title: '全勤调差', dataIndex: 'quanqinCha', key: 'quanqinCha', width: 50, },
  { title: '餐补调差', dataIndex: 'canbuTiaocha', key: 'canbuTiaocha', width: 50, },
  { title: '津贴调差', dataIndex: 'jintieTiaocha', key: 'jintieTiaocha', width: 50, },
  { title: '调差合计', dataIndex: 'totalTiaocha', key: 'totalTiaocha', width: 50, },
  { title: '月度工资', dataIndex: 'monthSalary', key: 'monthSalary', width: 50, },
  { title: '年度工资', dataIndex: 'yearSalary', key: 'yearSalary', width: 50, },
  { title: '养老保险', dataIndex: 'yanglaoMoney', key: 'yanglaoMoney', width: 50, },
  { title: '失业保险', dataIndex: 'shiyeMoney', key: 'shiyeMoney', width: 50, },
  { title: '医疗保险', dataIndex: 'yiliaoMoney', key: 'yiliaoMoney', width: 50, },
  { title: '公积金', dataIndex: 'yijinMoney', key: 'yijinMoney', width: 50, },
  { title: '月度社保', dataIndex: 'monthShebao', key: 'monthShebao', width: 50, },
  { title: '年度社保', dataIndex: 'yearShebao', key: 'yearShebao', width: 50, },
  { title: '子女教育', dataIndex: 'zinvEdu', key: 'zinvEdu', width: 50, },
  { title: '继续教育', dataIndex: 'jixuEdu', key: 'jixuEdu', width: 50, },
  { title: '房贷利息', dataIndex: 'fandaiLixi', key: 'fandaiLixi', width: 50, },
  { title: '房租', dataIndex: 'fangzu', key: 'fangzu', width: 40, },
  { title: '赡养父母', dataIndex: 'shanyangFumu', key: 'shanyangFumu', width: 50, },
  { title: '月度专扣', dataIndex: 'monthZhuankou', key: 'monthZhuankou', width: 50, },
  { title: '年度专扣', dataIndex: 'yearZhuankou', key: 'yearZhuankou', width: 50, },
  { title: '年度免征', dataIndex: 'yearMianzheng', key: 'yearMianzheng', width: 50, },
  { title: '月度个税', dataIndex: 'monthTax', key: 'monthTax', width: 50, },
  { title: '年度个税', dataIndex: 'yearTax', key: 'yearTax', width: 50, },
  { title: '手续费', dataIndex: 'serviceMoney', key: 'serviceMoney', width: 50, },
  { title: '实发工资', dataIndex: 'shifaSalary', key: 'shifaSalary', width: 50, },
  { title: '操作', dataIndex: 'operation', key: 'operation', width: 30, fixed: 'right', },
]
const clearFromState = () => {
  formStateMonthSalary.value = {} as SearchMonthSalaryItem;
}
 const handleSearchOutsourcePerson = (status) => {
    if (status != '4') {
      formStateMonthSalary.value.currentStatus = status;
    } else {
      formStateMonthSalary.value.companyArrange = '1'; 
    }
    onSearch();
  }
const onSearch = () => {
  pageOutsourceMonthSalaryList.value = {
      ...pageOutsourceMonthSalaryList.value,
      pageNumber: 1,
    }
  outsourceDetailStore.queryOutsourceMonthSalary();
}
onSearch();
const handleOutsourceMonthSalaryListData = () => {
  outsourceDetailStore.queryOutsourceMonthSalary();
}

const handleOutsourceFormula = () => {
  
}
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