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
      :scroll="{ x: 2500 }"
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
     <a-tag v-if="column.key === 'shebaoCompany' && record.shebaoCompany === '天津博瑞'" color="green">天津博瑞</a-tag>
     <a-tag v-if="column.key === 'shebaoCompany' && record.shebaoCompany === '南京博瑞'" color="yellow">南京博瑞</a-tag>

      <a-tag v-if="column.key === 'shebaoStandard' && record.shebaoStandard === '1'" color="green">最低基数</a-tag>
      <a-tag v-if="column.key === 'shebaoStandard' && record.shebaoStandard === '2'" color="orange">基本工资</a-tag>
      <a-tag v-if="column.key === 'shebaoStandard' && record.shebaoStandard === '3'" color="red">特殊基数</a-tag>
      <a-tag v-if="column.key === 'yijinStandard' && record.yijinStandard === '1'" color="green">最低基数</a-tag>
      <a-tag v-if="column.key === 'yijinStandard' && record.yijinStandard === '2'" color="orange">基本工资</a-tag>
      <a-tag v-if="column.key === 'yijinStandard' && record.yijinStandard === '3'" color="red">特殊基数</a-tag>

      <a-tag v-if="column.key === 'jiaoSign' && record.jiaoSign === '正常'" color="green">正常</a-tag>
      <a-tag v-if="column.key === 'jiaoSign' && record.jiaoSign === '预收'" color="green">预收</a-tag>
      <a-tag v-if="column.key === 'jiaoSign' && record.jiaoSign === '补缴'" color="orange">补缴</a-tag>
      <a-tag v-if="column.key === 'jiaoSign' && record.jiaoSign === '补差'" color="orange">补差</a-tag>
      <a-tag v-if="column.key === 'jiaoSign' && record.jiaoSign === '退费'" color="red">退费</a-tag>

      <a-tag v-if="column.key === 'jiaoType' && record.jiaoType === '缴费'" color="green">缴费</a-tag>
      <a-tag v-if="column.key === 'jiaoType' && record.jiaoType === '退费'" color="red">退费</a-tag>
      <!-- 添加类型断言和存在性检查以修复TypeScript索引类型错误 -->
      <span v-if="(typeof column.dataIndex === 'string' && (record[column.dataIndex] === null || record[column.dataIndex] === ''))">-</span>
     <template v-if="column.key === 'operation'">
          <a-dropdown>
            <span class="ant-dropdown-link" style="cursor: pointer;" @click.prevent>
              <MenuUnfoldOutlined style="font-size: 15px;"/>
            </span>
            <template #overlay>
              <a-menu>
                 <a-menu-item v-if="record.checkFlag == '1'">
                  <a href="javascript:;" @click="handleUpdateOutsourceSheBaoMonth(record)">社保同步</a>
                </a-menu-item>
                 <a-menu-item>
                  <a href="javascript:;" @click="handleUpdateOutsourceSheBaoJiao(record)">社保操作</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;" @click="handleUpdateOutsourceSheBaoBuchaMoney(record)">社保补差</a>
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
  <OutsourceSocialSecurityInfo/>
  <OutsourceSocialSecurityJiao/>
</template>

<script setup lang="ts">
import { h, reactive } from 'vue';
import { storeToRefs } from 'pinia';
import type { TableColumnsType } from 'ant-design-vue';
import { MenuUnfoldOutlined } from '@ant-design/icons-vue';
import dayjs from 'dayjs';
import { currentDate } from '/@/utils/dateUtil';
import { formatToDate } from '/@/utils/dateUtil';
import { message, Modal } from 'ant-design-vue';
import OutsourceSocialSecurityInfo from '/@/views/outsourceDetail/components/personComponents/OutsourceSocialSecurityInfo.vue';
import OutsourceSocialSecurityJiao from '/@/views/outsourceDetail/components/personComponents/OutsourceSocialSecurityJiao.vue';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
import { SearchSheBaoItem, OutsourceSheBaoItem } from '/@/api/outsourceDetail/model';
import { shebaoCompanyOption } from '/@/api/outsourceDetail/constants';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { outsourceSocialSecuritInfoFlag,sheBaoIsLoading,pageOutsourceSheBaoList,formStateSheBao,getOutsourceSheBaoList, getProvince, getOutsourcePosition, outsourceSocialSecurityJiaoFlag, outsourceSocialSecurityJiaoForm } = storeToRefs(outsourceDetailStore);
const columnsOutsourceDetail:TableColumnsType = [
  { title: '编号', dataIndex: 'index', key: 'index', fixed: 'left', width: 30, ellipsis: true },
  { title: '周期', dataIndex: 'yearAndMonth', key: 'yearAndMonth', fixed: 'left', width: 40, ellipsis: true },
  { title: '中文', dataIndex: 'userNameCn', key: 'userNameCn', fixed: 'left', width: 40, ellipsis: true },
  { title: '英文', dataIndex: 'userNameEn', key: 'userNameEn', fixed: 'left', width: 40, ellipsis: true },
  { title: '公司', dataIndex: 'companyName', key: 'companyName', fixed: 'left', width: 50, ellipsis: true },
  { title: '城市', dataIndex: 'city', key: 'city', fixed: 'left', width: 30, ellipsis: true },
  { title: '性质', dataIndex: 'jobType', key: 'jobType', fixed: 'left', width: 30,},
  { title: '类型', dataIndex: 'jiaoSign', key: 'jiaoSign', fixed: 'left', width: 30,},
  { title: '状态', dataIndex: 'currentStatus', key: 'currentStatus', fixed: 'left', width: 30, },
  { title: '缴纳单位', dataIndex: 'shebaoCompany', key: 'shebaoCompany', fixed: 'left', width: 43, ellipsis: true },
  { title: '单位合计', dataIndex: 'companyTotal', key: 'companyTotal', width: 40, ellipsis: true },
  { title: '个人合计', dataIndex: 'personTotal', key: 'personTotal', width: 40, ellipsis: true },
  { title: '残保金', dataIndex: 'canbaoMoney', key: 'canbaoMoney', width: 40, ellipsis: true },
  { title: '补差', dataIndex: 'buchaMoney', key: 'buchaMoney', width: 30, ellipsis: true },
  { title: '手续', dataIndex: 'serviceMoney', key: 'serviceMoney', width: 30, ellipsis: true },
  { title: '社金总计', dataIndex: 'shangbaoTotal', key: 'shangbaoTotal', width: 40, ellipsis: true },
  { title: '客商', dataIndex: 'keShangbao', key: 'keShangbao', width: 30, ellipsis: true },
  { title: '实商', dataIndex: 'shiShangbao', key: 'shiShangbao', width: 30, ellipsis: true },
  { title: '社保标准', dataIndex: 'shebaoStandard', key: 'shebaoStandard', width: 40, },
  { title: '单位', dataIndex: 'companyTotalSelf', key: 'companyTotalSelf', width: 40, ellipsis: true },
  { title: '个人', dataIndex: 'personTotalSelf', key: 'personTotalSelf', width: 40, ellipsis: true },
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
  { title: '标识', dataIndex: 'jiaoType', key: 'jiaoType', fixed: 'right', width: 30, ellipsis: true },
  { title: '账单月', dataIndex: 'yearAndMonthJiao', key: 'yearAndMonthJiao', fixed: 'right', width: 40, ellipsis: true },
  { title: '操作', dataIndex: 'operation', key: 'operation', fixed: 'right', width: 25, ellipsis: true },
]
const clearFromState = () => {
  formStateSheBao.value = {currentStatus: '',yearAndMonth: currentDate('YYYY-MM')} as SearchSheBaoItem;
}
const getOutsourceBrand = ref([
  {value: '', label: ''}
]);
const getOutsourceCompanyAll = ref([
  {value: '', label: ''}
]);
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
  outsourceDetailStore.queryOutsourceSheBaoMonthCompanyBrand(formStateSheBao.value.yearAndMonth).then(res => {
    if (res.code == 1) {
      getOutsourceBrand.value = res.info.branfList.map(item => ({value: item.bId, label: item.brandName}));
      getOutsourceCompanyAll.value = res.info.companyList.map(item => ({value: item.companyName, label: item.companyName}));
    }
  });
}
onSearch();
const handleOutsourceSheBaoListData = () => {
  outsourceDetailStore.queryOutsourceSheBao();
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
const handleUpdateOutsourceSheBaoJiao = (record) => {
  outsourceSocialSecurityJiaoForm.value = JSON.parse(JSON.stringify(record)) as OutsourceSheBaoItem;
  //@ts-ignore
  outsourceSocialSecurityJiaoForm.value.id = "";
  outsourceSocialSecurityJiaoForm.value.jiaoSign = '补缴';
  outsourceSocialSecurityJiaoForm.value.jiaoType = '缴费';
  outsourceSocialSecurityJiaoForm.value.yearAndMonth = '';
  outsourceSocialSecurityJiaoForm.value.yearAndMonthJiao = record.yearAndMonth;
  outsourceSocialSecurityJiaoForm.value.shebaoShijiaoTime = formatToDate(record.shebaoShijiaoTime);
  // // 格式化日期字段为 yyyy-MM-dd
  // const dateFields = [
  //   'shangbaoShijiaoTime', 'shangbaoShitingTime', 'shangbaoYujiaoTime', 'shangbaoYutingTime',
  //   'shebaoYujiaoTime', 'shebaoYutingTime', 'yijinShijiaoTime', 'yijinShitingTime',
  //   'yijinYujiaoTime', 'yijinYutingTime'
  // ];
  // dateFields.forEach(field => {
  //   if (field=='shebaoShijiaoTime' && outsourceSocialSecurityJiaoForm.value[field]) {
  //     outsourceSocialSecurityJiaoForm.value[field] = `${formatToDate(outsourceSocialSecurityJiaoForm.value[field])}-01`;
  //   } else if (outsourceSocialSecurityJiaoForm.value[field]) {
  //     outsourceSocialSecurityJiaoForm.value[field] = formatToDate(outsourceSocialSecurityJiaoForm.value[field]);
  //   }
  // });
  outsourceSocialSecurityJiaoFlag.value = true;
}
const toMoneyNumber = (value: string | number | undefined) => {
  const num = Number(value || 0);
  return Number.isFinite(num) ? num : 0;
}
const formatMoney = (value: string | number | undefined) => toMoneyNumber(value).toFixed(2);
const calcMonthSheBaoTotal = (record?: Partial<OutsourceSheBaoItem>) => {
  if (!record) {
    return 0;
  }
  const serviceMoney = record.serviceMoney !== '公式' ? toMoneyNumber(record.serviceMoney) : 0;
  return Number(
    (toMoneyNumber(record.companyTotal) + toMoneyNumber(record.personTotal) + serviceMoney).toFixed(2),
  );
}
const toMonthDate = (value?: string) => {
  if (!value) {
    return null;
  }
  const normalizedValue = value.toString().trim().replace(/\.\d+$/, '').slice(0, 10);
  const dateValue = dayjs(normalizedValue);
  return dateValue.isValid() ? dateValue.startOf('month') : null;
}
const calcBuchaMonthCount = (startTime?: string, issueTime?: string) => {
  const startMonth = toMonthDate(startTime);
  const issueMonth = toMonthDate(issueTime);
  if (!startMonth || !issueMonth) {
    return 0;
  }
  const diffMonth = issueMonth.diff(startMonth, 'month');
  return diffMonth > 0 ? diffMonth : 0;
}
const calcServiceFeeDiff = (companyDiff: number, personDiff: number) =>
  Number(((companyDiff + personDiff) * 0.0677).toFixed(2));
const calcFinalBuchaMoney = (monthCount: number, monthBuchaMoney: number, serviceFeeMoney: number) =>
  Number((monthCount * (monthBuchaMoney + serviceFeeMoney)).toFixed(2));
const renderBuchaInfoRow = (label: string, value: string) =>
  h(
    'div',
    {
      style: `
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 0;
        border-bottom: 1px solid #f0f0f0;
        font-size: 13px;
      `,
    },
    [
      h(
        'span',
        {
          style: `
            color: #8c8c8c;
            margin-right: 12px;
          `,
        },
        label,
      ),
      h(
        'span',
        {
          style: `
            color: #262626;
            font-weight: 500;
          `,
        },
        value,
      ),
    ],
  );
const renderBuchaInfoInputRow = (
  label: string,
  value: string | number,
  onInput: (e: Event) => void,
) =>
  h(
    'div',
    {
      style: `
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 0;
        border-bottom: 1px solid #f0f0f0;
        font-size: 13px;
        gap: 12px;
      `,
    },
    [
      h(
        'span',
        {
          style: `
            color: #8c8c8c;
            flex: 0 0 auto;
          `,
        },
        label,
      ),
      h('input', {
        value,
        type: 'number',
        min: 0,
        step: '0.01',
        style: `
          width: 100px;
          height: 30px;
          border: 1px solid #d9d9d9;
          border-radius: 6px;
          padding: 0 10px;
          font-size: 14px;
          font-weight: 500;
          color: #262626;
          outline: none;
          box-sizing: border-box;
          text-align: right;
          background: #fff;
        `,
        onInput,
      }),
    ],
  );
const handleUpdateOutsourceSheBaoBuchaMoney = async (record: OutsourceSheBaoItem) => {
  if (!record?.id || !record?.personId || !record?.yearAndMonth) {
    message.error('当前社保记录信息不完整');
    return;
  }
  if (!record.city) {
    message.error('当前人员缺少城市信息');
    return;
  }
  const sheBaoInfoRes = await outsourceDetailStore.queryOutsourceShebaoInfo(record.city);
  const sheBaoInfo = sheBaoInfoRes?.code == 1 && sheBaoInfoRes?.info?.list?.length > 0 ? sheBaoInfoRes.info.list[0] : null;
  if (!sheBaoInfo) {
    message.error('未查询到当前城市的社保基数信息');
    return;
  }
  const buchaMonthCount = calcBuchaMonthCount(sheBaoInfo.startTime, sheBaoInfo.issueTime);
  const prevMonth = dayjs(`${record.yearAndMonth}-01`).subtract(1, 'month').format('YYYY-MM');
  const prevMonthRes = await outsourceDetailStore.queryOutsourceSheBaoByPersonMonth(
    record.personId.toString(),
    prevMonth,
  );
  const prevMonthRecord =
    prevMonthRes?.code == 1 && Array.isArray(prevMonthRes.info) && prevMonthRes.info.length > 0
      ? prevMonthRes.info[0]
      : ({} as OutsourceSheBaoItem);
  const companyDiffMoney = Number(
    (toMoneyNumber(record.companyTotal) - toMoneyNumber(prevMonthRecord.companyTotal)).toFixed(2),
  );
  const personDiffMoney = Number(
    (toMoneyNumber(record.personTotal) - toMoneyNumber(prevMonthRecord.personTotal)).toFixed(2),
  );
  const defaultMonthBuchaMoney = Number((companyDiffMoney + personDiffMoney).toFixed(2));
  const defaultServiceDiffMoney = calcServiceFeeDiff(companyDiffMoney, personDiffMoney);
  const modalState = reactive({
    monthCount: buchaMonthCount,
    companyDiffMoney,
    personDiffMoney,
    monthBuchaMoney: defaultMonthBuchaMoney,
    serviceFeeMoney: defaultServiceDiffMoney,
    finalBuchaMoney: calcFinalBuchaMoney(
      buchaMonthCount,
      defaultMonthBuchaMoney,
      defaultServiceDiffMoney,
    ),
  });
  const syncFromCompanyPerson = () => {
    modalState.monthBuchaMoney = Number(
      (toMoneyNumber(modalState.companyDiffMoney) + toMoneyNumber(modalState.personDiffMoney)).toFixed(2),
    );
    modalState.serviceFeeMoney = Number((toMoneyNumber(modalState.monthBuchaMoney) * 0.0677).toFixed(2));
    modalState.finalBuchaMoney = calcFinalBuchaMoney(
      toMoneyNumber(modalState.monthCount),
      toMoneyNumber(modalState.monthBuchaMoney),
      toMoneyNumber(modalState.serviceFeeMoney),
    );
  };
  const syncBuchaAmounts = () => {
    modalState.serviceFeeMoney = Number((toMoneyNumber(modalState.monthBuchaMoney) * 0.0677).toFixed(2));
    modalState.finalBuchaMoney = calcFinalBuchaMoney(
      toMoneyNumber(modalState.monthCount),
      toMoneyNumber(modalState.monthBuchaMoney),
      toMoneyNumber(modalState.serviceFeeMoney),
    );
  };
  Modal.confirm({
    title: '社保补差确认',
    width: 500,
    content: h({
      setup() {
        return () =>
          h('div', { style: 'padding-top: 8px;' }, [
            h(
              'div',
              {
                style: `
                  background: #fafafa;
                  border: 1px solid #f0f0f0;
                  border-radius: 8px;
                  padding: 12px 14px;
                  margin-bottom: 12px;
                `,
              },
              [
                h(
                  'div',
                  {
                    style: `
                      font-size: 12px;
                      color: #8c8c8c;
                      margin-bottom: 8px;
                    `,
                  },
                  '基本信息',
                ),
                h(
                  'div',
                  {
                    style: `
                      display: grid;
                      grid-template-columns: 1fr 1fr;
                      gap: 0 16px;
                    `,
                  },
                  [
                    renderBuchaInfoRow(
                      '姓名',
                      `${record.userNameCn || '-'}${record.userNameEn ? `/${record.userNameEn}` : ''}`,
                    ),
                    renderBuchaInfoRow('当前周期', record.yearAndMonth || '-'),
                    renderBuchaInfoInputRow(
                      '单位补差金额',
                      modalState.companyDiffMoney,
                      (e: Event) => {
                        const input = e.target as HTMLInputElement;
                        modalState.companyDiffMoney = toMoneyNumber(input.value);
                        syncFromCompanyPerson();
                      },
                    ),
                    renderBuchaInfoInputRow(
                      '个人补差金额',
                      modalState.personDiffMoney,
                      (e: Event) => {
                        const input = e.target as HTMLInputElement;
                        modalState.personDiffMoney = toMoneyNumber(input.value);
                        syncFromCompanyPerson();
                      },
                    ),
                  ],
                ),
                h(
                  'div',
                  {
                    style: `
                      margin-top: 8px;
                      font-size: 12px;
                      color: #bfbfbf;
                    `,
                  },
                  `服务费补差金额：${formatMoney(modalState.serviceFeeMoney)}（补差金额 x 6.77%）`,
                ),
              ],
            ),
            h(
              'div',
              {
                style: `
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  gap: 12px;
                  margin-bottom: 12px;
                `,
              },
              [
                h(
                  'div',
                  {
                    style: `
                      background: #fafafa;
                      border: 1px solid #f0f0f0;
                      border-radius: 8px;
                      padding: 12px 14px;
                    `,
                  },
                  [
                    h(
                      'div',
                      {
                        style: `
                          font-size: 12px;
                          color: #8c8c8c;
                          margin-bottom: 8px;
                        `,
                      },
                      '补差月数',
                    ),
                    h('input', {
                      value: modalState.monthCount,
                      type: 'number',
                      min: 0,
                      style: `
                        width: 100%;
                        height: 38px;
                        border: 1px solid #d9d9d9;
                        border-radius: 6px;
                        padding: 0 12px;
                        font-size: 20px;
                        font-weight: 700;
                        color: #262626;
                        outline: none;
                        box-sizing: border-box;
                      `,
                      onInput: (e: Event) => {
                        const input = e.target as HTMLInputElement;
                        modalState.monthCount = toMoneyNumber(input.value);
                        syncBuchaAmounts();
                      },
                    }),
                  ],
                ),
                h(
                  'div',
                  {
                    style: `
                      background: #fafafa;
                      border: 1px solid #f0f0f0;
                      border-radius: 8px;
                      padding: 12px 14px;
                    `,
                  },
                  [
                    h(
                      'div',
                      {
                        style: `
                          font-size: 12px;
                          color: #8c8c8c;
                          margin-bottom: 8px;
                        `,
                      },
                      '补差金额',
                    ),
                    h('input', {
                      value: modalState.monthBuchaMoney,
                      type: 'number',
                      min: 0,
                      step: '0.01',
                      disabled: true,
                      style: `
                        width: 100%;
                        height: 38px;
                        border: 1px solid #d9d9d9;
                        border-radius: 6px;
                        padding: 0 12px;
                        font-size: 20px;
                        font-weight: 700;
                        color: #262626;
                        outline: none;
                        box-sizing: border-box;
                      `,
                      onInput: (e: Event) => {
                        const input = e.target as HTMLInputElement;
                        modalState.monthBuchaMoney = toMoneyNumber(input.value);
                        syncBuchaAmounts();
                      },
                    }),
                  ],
                ),
              ],
            ),
            h(
              'div',
              {
                style: `
                  padding: 14px 16px;
                  background: #fff2f0;
                  border: 1px solid #ffccc7;
                  border-radius: 8px;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                `,
              },
              [
                h(
                  'div',
                  [
                    h(
                      'div',
                      {
                        style: `
                          font-size: 12px;
                          color: #8c8c8c;
                          margin-bottom: 4px;
                        `,
                      },
                      '补差总额',
                    ),
                    h(
                      'div',
                      {
                        style: `
                          font-size: 12px;
                          color: #bfbfbf;
                        `,
                      },
                      `（${formatMoney(modalState.monthBuchaMoney)} + ${formatMoney(modalState.serviceFeeMoney)}）x ${modalState.monthCount} 月`,
                    ),
                  ],
                ),
                h(
                  'span',
                  {
                    style: `
                      font-size: 24px;
                      font-weight: 700;
                      color: #cf1322;
                      line-height: 1.2;
                    `,
                  },
                  formatMoney(modalState.finalBuchaMoney),
                ),
              ],
            ),
          ]);
      },
    }),
    async onOk() {
      const submitMonthCount = toMoneyNumber(modalState.monthCount);
      const res = await outsourceDetailStore.updateOutsourceSheBaoBuchaMoney(
        record.id?.toString(),
        modalState.finalBuchaMoney,
        Number((toMoneyNumber(modalState.companyDiffMoney) * submitMonthCount).toFixed(2)),
        Number((toMoneyNumber(modalState.personDiffMoney) * submitMonthCount).toFixed(2)),
        Number((toMoneyNumber(modalState.serviceFeeMoney) * submitMonthCount).toFixed(2)),
      );
      if (res?.code == 1) {
        onSearch();
        message.success('社保补差更新成功');
        return;
      }
      message.error(res?.message || '社保补差更新失败');
      throw new Error('update outsource shebao bucha money failed');
    },
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
