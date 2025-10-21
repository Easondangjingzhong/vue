<template>
  <div class="resume-content-search">
    <a-form :model="formStateSheBao" @finish="onSearch">
      <a-row :gutter="24">
         <a-col :span="3">
          <a-form-item name="userName" label="姓名">
            <a-input v-model:value="formStateSheBao.userName"/>
          </a-form-item>
        </a-col>
        <a-col :span="3">
          <a-form-item name="city" label="城市">
            <a-select
              optionFilterProp="label"
              v-model:value="formStateSheBao.city"
              :options="getProvince"
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
              v-model:value="formStateSheBao.bId"
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
              v-model:value="formStateSheBao.positionId"
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
              v-model:value="formStateSheBao.jobType"
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
          <a-button @click="handleSearchOutsourcePerson('2')" :class="{'active': formStateSheBao.currentStatus === '2'}" style="margin-right: 5px;" size="small">在职</a-button>
          <a-button @click="handleSearchOutsourcePerson('3')" :class="{'active': formStateSheBao.currentStatus === '3'}" style="margin-right: 5px;" size="small">离职</a-button>
          <a-button @click="handleSearchOutsourcePerson('1')" :class="{'active': formStateSheBao.currentStatus === ''}" style="margin-right: 5px;" size="small">全部</a-button>
          <a-button @click="handleSearchOutsourcePerson('4')" :class="{'active': formStateSheBao.companyArrange === '1'}" style="margin-right: 5px;" size="small" title="按公司排序">排序</a-button>
        </span>
    </a-row>
    <a-row>
    <a-table
      size="small"
      :pagination="false"
      rowKey="key"
      :dataSource="getOutsourceSheBaoList"
      :loading="sheBaoIsLoading"
      :columns="columnsOutsourceDetail"
      :scroll="{ x: 1900 }"
    >
    <template #bodyCell="{ column, record }">
    <a-tag v-if="column.key === 'currentStatus' && record.currentStatus === '1'" color="orange">待入</a-tag>
     <a-tag v-if="column.key === 'currentStatus' && record.currentStatus === '2'" color="green">在职</a-tag>
     <a-tag v-if="column.key === 'currentStatus' && record.currentStatus === '3'" color="red">离职</a-tag>
     <a-tag v-if="column.key === 'currentStatus' && record.currentStatus === '4'" color="red">未入</a-tag>

    <a-tag v-if="column.key === 'jobType' && record.jobType === '兼职'" color="orange">
      兼职
    </a-tag>
     <a-tag v-if="column.key === 'jobType' && record.jobType === '全职'" color="green">
      全职
    </a-tag>

      <a-tag v-if="column.key === 'shebaoStandard' && record.shebaoStandard === '1'" color="green">最低基数</a-tag>
      <a-tag v-if="column.key === 'shebaoStandard' && record.shebaoStandard === '2'" color="orange">基本工资</a-tag>
      <a-tag v-if="column.key === 'shebaoStandard' && record.shebaoStandard === '3'" color="red">特殊基数</a-tag>
      <a-tag v-if="column.key === 'yijinStandard' && record.yijinStandard === '1'" color="green">最低基数</a-tag>
      <a-tag v-if="column.key === 'yijinStandard' && record.yijinStandard === '2'" color="orange">基本工资</a-tag>
      <a-tag v-if="column.key === 'yijinStandard' && record.yijinStandard === '3'" color="red">特殊基数</a-tag>
      <!-- 添加类型断言和存在性检查以修复TypeScript索引类型错误 -->
      <span v-if="(typeof column.dataIndex === 'string' && (record[column.dataIndex] === null || record[column.dataIndex] === ''))">-</span>
    </template>
  
  </a-table>
    </a-row>
    <a-row style="justify-content: end; margin-top: 10px">
      <a-pagination
        v-model:current="pageOutsourceSheBaoList.pageNumber"
        :pageSize="pageOutsourceSheBaoList.pageSize"
        @change="handleOutsourceSheBaoListData"
        :total="pageOutsourceSheBaoList.total"
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
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
import { SearchSheBaoItem } from '/@/api/outsourceDetail/model';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { sheBaoIsLoading,pageOutsourceSheBaoList,formStateSheBao,getOutsourceSheBaoList, getProvince, getOutsourceBrand, getOutsourcePosition, } = storeToRefs(outsourceDetailStore);
const columnsOutsourceDetail:TableColumnsType = [
  { title: '编号', dataIndex: 'index', key: 'index', fixed: 'left', width: 30, ellipsis: true },
  { title: '中文', dataIndex: 'userNameCn', key: 'userNameCn', fixed: 'left', width: 40, ellipsis: true },
  { title: '英文', dataIndex: 'userNameEn', key: 'userNameEn', fixed: 'left', width: 40, ellipsis: true },
  { title: '公司', dataIndex: 'companyName', key: 'companyName', fixed: 'left', width: 50, ellipsis: true },
  { title: '城市', dataIndex: 'city', key: 'city', fixed: 'left', width: 30, ellipsis: true },
  { title: '性质', dataIndex: 'jobType', key: 'jobType', fixed: 'left', width: 30,},
  { title: '状态', dataIndex: 'currentStatus', key: 'currentStatus', fixed: 'left', width: 30, },
  { title: '周期', dataIndex: 'shebaoShijiaoTime', key: 'shebaoShijiaoTime', fixed: 'left', width: 40, ellipsis: true },
  { title: '单位合计', dataIndex: 'companyTotal', key: 'companyTotal', width: 40, ellipsis: true },
  { title: '个人合计', dataIndex: 'personTotal', key: 'personTotal', width: 40, ellipsis: true },
  { title: '商保', dataIndex: 'shangbao', key: 'shangbao', width: 30, ellipsis: true },
  { title: '社保标准', dataIndex: 'shebaoStandard', key: 'shebaoStandard', width: 40, ellipsis: true },
  { title: '养老基数', dataIndex: 'yanglaoJishu', key: 'yanglaoJishu', width: 40, ellipsis: true },
  { title: '单位', dataIndex: 'yanglaoCompany', key: 'yanglaoCompany', width: 40, ellipsis: true },
  { title: '个人', dataIndex: 'yanglaoPerson', key: 'yanglaoPerson', width: 40, ellipsis: true },
  { title: '失业基数', dataIndex: 'shiyeJishu', key: 'shiyeJishu', width: 40, ellipsis: true },
  { title: '单位', dataIndex: 'shiyeCompany', key: 'shiyeCompany', width: 30, ellipsis: true },
  { title: '个人', dataIndex: 'shiyePerson', key: 'shiyePerson', width: 30, ellipsis: true },
  { title: '医疗基数', dataIndex: 'yanglaoJishu', key: 'yanglaoJishu', width: 40, ellipsis: true },
  { title: '单位', dataIndex: 'yanglaoCompany', key: 'yanglaoCompany', width: 40, ellipsis: true },
  { title: '个人', dataIndex: 'yanglaoPerson', key: 'yanglaoPerson', width: 40, ellipsis: true },
  { title: '大病基数', dataIndex: 'dabingJishu', key: 'dabingJishu', width: 40, ellipsis: true },
  { title: '单位', dataIndex: 'dabingCompany', key: 'dabingCompany', width: 30, ellipsis: true },
  { title: '个人', dataIndex: 'dabingPerson', key: 'dabingPerson', width: 30, ellipsis: true },
  { title: '工商基数', dataIndex: 'gongshangJishu', key: 'gongshangJishu', width: 40, ellipsis: true },
  { title: '单位', dataIndex: 'gongshangCompany', key: 'gongshangCompany', width: 30, ellipsis: true },
  { title: '生育基数', dataIndex: 'shengyuJishu', key: 'shengyuJishu', width: 40, ellipsis: true },
  { title: '单位', dataIndex: 'shengyuCompany', key: 'shengyuCompany', width: 30, ellipsis: true },
  { title: '一金标准', dataIndex: 'yijinStandard', key: 'yijinStandard', width: 40, ellipsis: true },
  { title: '一金基数', dataIndex: 'yijinShijiJishu', key: 'yijinShijiJishu', width: 40, ellipsis: true },
  { title: '比例', dataIndex: 'yijinRate', key: 'yijinRate', width: 30, ellipsis: true },
  { title: '单位', dataIndex: 'yijinCompany', key: 'yijinCompany', width: 40, ellipsis: true },
  { title: '个人', dataIndex: 'yijinPerson', key: 'yijinPerson', width: 40, ellipsis: true },
]
const clearFromState = () => {
  formStateSheBao.value = {currentStatus: '2',} as SearchSheBaoItem;
}
 const handleSearchOutsourcePerson = (status) => {
    if (status != '4') {
      formStateSheBao.value.currentStatus = status;
    } else {
      formStateSheBao.value.companyArrange = '1';
    }
    onSearch();
  }
const onSearch = () => {
  pageOutsourceSheBaoList.value = {
      ...pageOutsourceSheBaoList.value,
      pageNumber: 1,
    }
  outsourceDetailStore.queryOutsourceSheBao();
}
onSearch();
const handleOutsourceSheBaoListData = () => {
  outsourceDetailStore.queryOutsourceSheBao();
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