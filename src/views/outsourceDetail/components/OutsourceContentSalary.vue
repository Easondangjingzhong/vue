<template>
  <div class="resume-content-search">
    <a-form :model="formStateSalary" @finish="onSearch">
      <a-row :gutter="24">
        <a-col :span="4">
          <a-form-item name="userName" label="姓名">
            <a-input v-model:value="formStateSalary.userName"/>
          </a-form-item>
        </a-col>
        <a-col :span="4">
          <a-form-item name="city" label="城市">
            <a-select
              optionFilterProp="label"
              v-model:value="formStateSalary.city"
              :showArrow="false"
              allowClear
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="4">
          <a-form-item name="bId" label="品牌">
            <a-select
              optionFilterProp="label"
              v-model:value="formStateSalary.bId"
              :showArrow="false"
              allowClear
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="4">
          <a-form-item name="positionId" label="职位">
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
    <a-row style="justify-content: space-between;margin-bottom: 5px;">
        <span>
          <a-button @click="handleSearchOutsourcePerson('2')" :class="{'active': formStateSalary.currentStatus === '2'}" style="margin-right: 5px;" size="small">在职</a-button>
          <a-button @click="handleSearchOutsourcePerson('3')" :class="{'active': formStateSalary.currentStatus === '3'}" style="margin-right: 5px;" size="small">离职</a-button>
          <a-button @click="handleSearchOutsourcePerson('1')" :class="{'active': formStateSalary.currentStatus === ''}" style="margin-right: 5px;" size="small">全部</a-button>
        </span>
    </a-row>
    <a-row>
    <a-table
      size="small"
      :pagination="false"
      rowKey="key"
      :loading="salaryIsLoading"
      :columns="columnsOutsourceDetail"
      :dataSource="getOutsourceSalaryList"
      :scroll="{ x: 1800 }"
    >
   <template #bodyCell="{ column, record }">
    <a-tag v-if="column.key === 'currentStatus' && record.currentStatus === '1'" color="orange">待入</a-tag>
     <a-tag v-if="column.key === 'currentStatus' && record.currentStatus === '2'" color="green">在职</a-tag>
     <a-tag v-if="column.key === 'currentStatus' && record.currentStatus === '3'" color="red">离职</a-tag>
     <a-tag v-if="column.key === 'currentStatus' && record.currentStatus === '4'" color="red">未入</a-tag>
      <span v-if="column.key === 'shebaoStandard' && record.shebaoStandard === '1'">最低基数</span>
      <span v-if="column.key === 'shebaoStandard' && record.shebaoStandard === '2'">基本工资</span>
      <span v-if="column.key === 'shebaoStandard' && record.shebaoStandard === '3'">特殊基数</span>
      <span v-if="column.key === 'yijinStandard' && record.yijinStandard === 1">最低基数</span>
      <span v-if="column.key === 'yijinStandard' && record.yijinStandard === 2">基本工资</span>
      <span v-if="column.key === 'yijinStandard' && record.yijinStandard === 3">特殊基数</span>
       <!-- 添加类型断言和存在性检查以修复TypeScript索引类型错误 -->
      <span v-if="record[column.dataIndex] === null || record[column.dataIndex] === ''">-</span>
    </template>
  </a-table>
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
import { SearchSalaryItem } from '/@/api/outsourceDetail/model';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { salaryIsLoading, pageOutsourceSalaryList, formStateSalary, getOutsourceSalaryList } = storeToRefs(outsourceDetailStore);
const columnsOutsourceDetail = [
  { title: '编号', dataIndex: 'index', key: 'index', fixed: 'left' as const, width: 30, ellipsis: true },
  { title: '中文姓名', dataIndex: 'userNameCn', key: 'userNameCn', fixed: 'left' as const, width: 50, ellipsis: true },
  { title: '英文姓名', dataIndex: 'userNameEn', key: 'userNameEn', fixed: 'left' as const, width: 50, ellipsis: true },
  { title: '公司', dataIndex: 'companyName', key: 'companyName', fixed: 'left' as const, width: 50, ellipsis: true },
  { title: '城市', dataIndex: 'city', key: 'city', fixed: 'left' as const, width: 40, ellipsis: true },
  { title: '性质', dataIndex: 'jobType', key: 'jobType', fixed: 'left' as const, width: 30, ellipsis: true },
  { title: '状态', dataIndex: 'currentStatus', key: 'currentStatus', fixed: 'left' as const, width: 30, ellipsis: true },
  { title: '周期', dataIndex: 'changeTime', key: 'changeTime', fixed: 'left' as const, width: 60, ellipsis: true },
  { title: '基础工资', dataIndex: 'dixin', key: 'dixin', width: 50, ellipsis: true },
  { title: '餐补', dataIndex: 'canbu', key: 'canbu', width: 30, ellipsis: true },
  { title: '津贴', dataIndex: 'jintie', key: 'jintie', width: 30, ellipsis: true },
  { title: '全勤', dataIndex: 'quanqin', key: 'quanqin', width: 30, ellipsis: true },
  { title: '工资总计', dataIndex: 'zonghe', key: 'zonghe', width: 50, ellipsis: true },
  { title: '个人奖金', dataIndex: 'geti', key: 'geti', width: 50, ellipsis: true },
  { title: '团队奖金', dataIndex: 'tuanti', key: 'tuanti', width: 50, ellipsis: true },
  { title: '特殊奖金', dataIndex: 'teshu', key: 'teshu', width: 50, ellipsis: true },
  { title: '激励奖金', dataIndex: 'jili', key: 'jili', width: 50, ellipsis: true },
  { title: '达成奖金', dataIndex: 'dacheng', key: 'dacheng', width: 50, ellipsis: true },
  { title: '商保', dataIndex: 'shangbao', key: 'shangbao', width: 30, ellipsis: true },
  { title: '单位合计', dataIndex: 'companyTotal', key: 'companyTotal', width: 50, ellipsis: true },
  { title: '个人合计', dataIndex: 'personTotal', key: 'personTotal', width: 50, ellipsis: true },
  { title: '社保标准', dataIndex: 'shebaoStandard', key: 'shebaoStandard', width: 50, ellipsis: true },
  { title: '养老基数', dataIndex: 'yanglaoJishu', key: 'yanglaoJishu', width: 50, ellipsis: true },
  { title: '失业基数', dataIndex: 'shiyeJishu', key: 'shiyeJishu', width: 50, ellipsis: true },
  { title: '医疗基数', dataIndex: 'yiliaoJishu', key: 'yiliaoJishu', width: 50, ellipsis: true },
  { title: '大病基数', dataIndex: 'dabingJishu', key: 'dabingJishu', width: 50, ellipsis: true },
  { title: '工伤基数', dataIndex: 'gongshangJishu', key: 'gongshangJishu', width: 50, ellipsis: true },
  { title: '生育基数', dataIndex: 'shengyuJishu', key: 'shengyuJishu', width: 50, ellipsis: true },
  { title: '一金标准', dataIndex: 'yijinStandard', key: 'yijinStandard', width: 50, ellipsis: true },
  { title: '一金基数', dataIndex: 'yijinJishu', key: 'yijinJishu', width: 50, ellipsis: true },
];
const clearFromState = () => {
  formStateSalary.value = {
    currentStatus: '2',
  } as SearchSalaryItem
}
 const handleSearchOutsourcePerson = (status) => {
    formStateSalary.value.currentStatus = status;
    onSearch();
  }
const onSearch = () => {
  pageOutsourceSalaryList.value = {
      ...pageOutsourceSalaryList.value,
      pageNumber: 1,
    }
  outsourceDetailStore.queryOutsourceSalary();
}
onSearch();
const handleOutsourceSalaryListData = () => {
  outsourceDetailStore.queryOutsourceSalary();
}
</script>

<style lang="less" scoped>
.active {
    color: #389e0d;
    background: #f6ffed;
    border-color: #b7eb8f;
  }
  .tag {
    cursor: pointer;
  }
  .resume-content,
  .resume-content-search {
    background-color: #fff;
    box-shadow: 0 0 2px #ccc;
    border-radius: 5px;
    overflow: hidden;
    padding: 10px;
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