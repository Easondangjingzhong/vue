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
          <a-form-item name="companyName" label="公司">
            <a-select
              optionFilterProp="label"
              v-model:value="formStateSheBao.companyName"
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
         <a-col :span="3">
          <a-form-item name="shebaoCompany" label="缴纳公司">
            <a-select
              optionFilterProp="label"
              v-model:value="formStateSheBao.shebaoCompany"
              :options="shebaoCompanyOption"
              :showArrow="false"
              showSearch
              allowClear
            ></a-select>
          </a-form-item>
        </a-col>
         <a-col :span="3">
          <a-button style="margin: 0 0 0 8px" type="primary" html-type="submit">搜索</a-button>
          <a-button style="margin: 0 8px" @click="clearFromState">清空</a-button>
         </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="3">
          <a-form-item name="yearAndMonth" label="周期">
            <a-date-picker
                  v-model:value="formStateSheBao.yearAndMonth"
                  value-format="YYYY-MM"
                  picker="month"
                />
          </a-form-item>
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
        <span>
          <a-button style="margin-right: 5px;" @click="handleSheBaoInfo" size="small">社保基数</a-button>
          <a-button @click="handleSheBaoCollect" size="small">社保汇总</a-button>
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
      :scroll="{ x: 2200 }"
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

     <a-tag v-if="column.key === 'shebaoCompany' && record.shebaoCompany === '江苏今元'" color="orange">江苏今元</a-tag>
     <a-tag v-if="column.key === 'shebaoCompany' && record.shebaoCompany === '北京博瑞'" color="blue">北京博瑞</a-tag>
     <a-tag v-if="column.key === 'shebaoCompany' && record.shebaoCompany === '51社保'" color="pink">51社保</a-tag>
     <a-tag v-if="column.key === 'shebaoCompany' && record.shebaoCompany === '北京我推'" color="cyan">北京我推</a-tag>
     <a-tag v-if="column.key === 'shebaoCompany' && record.shebaoCompany === '苏州锐特'" color="purple">苏州锐特</a-tag>

      <a-tag v-if="column.key === 'shebaoStandard' && record.shebaoStandard === '1'" color="green">最低基数</a-tag>
      <a-tag v-if="column.key === 'shebaoStandard' && record.shebaoStandard === '2'" color="orange">基本工资</a-tag>
      <a-tag v-if="column.key === 'shebaoStandard' && record.shebaoStandard === '3'" color="red">特殊基数</a-tag>
      <a-tag v-if="column.key === 'yijinStandard' && record.yijinStandard === '1'" color="green">最低基数</a-tag>
      <a-tag v-if="column.key === 'yijinStandard' && record.yijinStandard === '2'" color="orange">基本工资</a-tag>
      <a-tag v-if="column.key === 'yijinStandard' && record.yijinStandard === '3'" color="red">特殊基数</a-tag>
      <!-- 添加类型断言和存在性检查以修复TypeScript索引类型错误 -->
      <span v-if="(typeof column.dataIndex === 'string' && (record[column.dataIndex] === null || record[column.dataIndex] === ''))">-</span>
     <template v-if="column.key === 'operation'">
          <a-dropdown>
            <span class="ant-dropdown-link" style="cursor: pointer;" @click.prevent>
              <MenuUnfoldOutlined style="font-size: 15px;"/>
            </span>
            <template #overlay>
              <a-menu>
                 <a-menu-item>
                  <a href="javascript:;" @click="handleUpdateOutsourceSheBaoMonth(record)">社保同步</a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
     </template>
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
  <OutsourceSocialSecurityCollect/>
  <OutsourceSocialSecurityInfo/>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import type { TableColumnsType } from 'ant-design-vue';
import { MenuUnfoldOutlined } from '@ant-design/icons-vue';
import { currentDate } from '/@/utils/dateUtil';
import { message } from 'ant-design-vue';
import OutsourceSocialSecurityCollect from '/@/views/outsourceDetail/components/personComponents/OutsourceSocialSecurityCollect.vue';
import OutsourceSocialSecurityInfo from '/@/views/outsourceDetail/components/personComponents/OutsourceSocialSecurityInfo.vue';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
import { SearchSheBaoItem } from '/@/api/outsourceDetail/model';
import { shebaoCompanyOption } from '/@/api/outsourceDetail/constants';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { outsourceSocialSecuritInfoFlag, outsourceSocialSecurityCollectFlag,sheBaoIsLoading,pageOutsourceSheBaoList,formStateSheBao,getOutsourceSheBaoList, getProvince, getOutsourceBrand, getOutsourceCompanyAll, getOutsourcePosition, } = storeToRefs(outsourceDetailStore);
const columnsOutsourceDetail:TableColumnsType = [
  { title: '编号', dataIndex: 'index', key: 'index', fixed: 'left', width: 30, ellipsis: true },
  { title: '周期', dataIndex: 'yearAndMonth', key: 'yearAndMonth', fixed: 'left', width: 40, ellipsis: true },
  { title: '中文', dataIndex: 'userNameCn', key: 'userNameCn', fixed: 'left', width: 40, ellipsis: true },
  { title: '英文', dataIndex: 'userNameEn', key: 'userNameEn', fixed: 'left', width: 40, ellipsis: true },
  { title: '公司', dataIndex: 'companyName', key: 'companyName', fixed: 'left', width: 50, ellipsis: true },
  { title: '城市', dataIndex: 'city', key: 'city', fixed: 'left', width: 30, ellipsis: true },
  { title: '性质', dataIndex: 'jobType', key: 'jobType', fixed: 'left', width: 30,},
  { title: '状态', dataIndex: 'currentStatus', key: 'currentStatus', fixed: 'left', width: 30, },
  { title: '缴纳单位', dataIndex: 'shebaoCompany', key: 'shebaoCompany', fixed: 'left', width: 40, ellipsis: true },
  { title: '单位合计', dataIndex: 'companyTotal', key: 'companyTotal', width: 40, ellipsis: true },
  { title: '个人合计', dataIndex: 'personTotal', key: 'personTotal', width: 40, ellipsis: true },
  { title: '补差', dataIndex: 'buchaMoney', key: 'buchaMoney', width: 30, ellipsis: true },
  { title: '手续', dataIndex: 'serviceMoney', key: 'serviceMoney', width: 30, ellipsis: true },
  { title: '社保总计', dataIndex: 'shangbaoTotal', key: 'shangbaoTotal', width: 40, ellipsis: true },
  { title: '客商', dataIndex: 'keShangbao', key: 'keShangbao', width: 30, ellipsis: true },
  { title: '实商', dataIndex: 'shangbao', key: 'shangbao', width: 30, ellipsis: true },
  { title: '社保标准', dataIndex: 'shebaoStandard', key: 'shebaoStandard', width: 40, },
  { title: '养老基数', dataIndex: 'yanglaoJishu', key: 'yanglaoJishu', width: 40, ellipsis: true },
  { title: '单位', dataIndex: 'yanglaoCompany', key: 'yanglaoCompany', width: 40, ellipsis: true },
  { title: '个人', dataIndex: 'yanglaoPerson', key: 'yanglaoPerson', width: 40, ellipsis: true },
  { title: '失业基数', dataIndex: 'shiyeJishu', key: 'shiyeJishu', width: 40, ellipsis: true },
  { title: '单位', dataIndex: 'shiyeCompany', key: 'shiyeCompany', width: 30, ellipsis: true },
  { title: '个人', dataIndex: 'shiyePerson', key: 'shiyePerson', width: 30, ellipsis: true },
  { title: '医疗基数', dataIndex: 'yiliaoJishu', key: 'yiliaoJishu', width: 40, ellipsis: true },
  { title: '单位', dataIndex: 'yiliaoCompany', key: 'yiliaoCompany', width: 40, ellipsis: true },
  { title: '个人', dataIndex: 'yiliaoPerson', key: 'yiliaoPerson', width: 40, ellipsis: true },
  { title: '大病基数', dataIndex: 'dabingJishu', key: 'dabingJishu', width: 40, ellipsis: true },
  { title: '单位', dataIndex: 'dabingCompany', key: 'dabingCompany', width: 30, ellipsis: true },
  { title: '个人', dataIndex: 'dabingPerson', key: 'dabingPerson', width: 30, ellipsis: true },
  { title: '工伤基数', dataIndex: 'gongshangJishu', key: 'gongshangJishu', width: 40, ellipsis: true },
  { title: '单位', dataIndex: 'gongshangCompany', key: 'gongshangCompany', width: 30, ellipsis: true },
  { title: '生育基数', dataIndex: 'shengyuJishu', key: 'shengyuJishu', width: 40, ellipsis: true },
  { title: '单位', dataIndex: 'shengyuCompany', key: 'shengyuCompany', width: 30, ellipsis: true },
  { title: '一金标准', dataIndex: 'yijinStandard', key: 'yijinStandard', width: 40, },
  { title: '一金基数', dataIndex: 'yijinShijiJishu', key: 'yijinShijiJishu', width: 40, ellipsis: true },
  { title: '比例', dataIndex: 'yijinRate', key: 'yijinRate', width: 30, ellipsis: true },
  { title: '单位', dataIndex: 'yijinCompany', key: 'yijinCompany', width: 40, ellipsis: true },
  { title: '个人', dataIndex: 'yijinPerson', key: 'yijinPerson', width: 40, ellipsis: true },
  { title: '操作', dataIndex: 'operation', key: 'operation', fixed: 'right', width: 25, ellipsis: true },
]
const clearFromState = () => {
  formStateSheBao.value = {currentStatus: '',yearAndMonth: currentDate('YYYY-MM')} as SearchSheBaoItem;
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
const handleSheBaoCollect = () => {
  outsourceSocialSecurityCollectFlag.value = true;
  outsourceDetailStore.queryOutsourceShebaoCollect();
}
const handleSheBaoInfo = () => {
  outsourceSocialSecuritInfoFlag.value = true;
  outsourceDetailStore.queryOutsourceShebaoInfo();
}
const handleUpdateOutsourceSheBaoMonth = async (record) => {
  await outsourceDetailStore.updateOutsourceSheBaoMonth(record.personId, record.yearAndMonth).then(res => {
    if (res.code == 1) {
      onSearch();
      message.success("操作成功");
    } else {
      message.error("操作失败");
    }
  });
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