<template>
    <a-table
      size="small"
      :pagination="false"
      :tableLayout="'fixed'"
      :columns="columns"
      :loading="loading"
      :dataSource="getOutsourcePersonSalaryCommit"
      rowKey="companyName"
      :expandedRowKeys="expandedRowKeys"
      :row-expandable="(record) => record.detailList && record.detailList.length > 0"
      :expand-column-width="20"
      @expand="onExpand"
      rowClassName="even-row"
    >
    <template #bodyCell="{ column, record }">
      <span v-if="column.key == 'pepoleNum'" style="cursor: pointer;color: #1890FF;" @click="handlePersonSalaryCollectDetail(record)"> {{ record.pepoleNum }}</span>
      <span v-if="column.key == 'yiji'">0</span>
      <a-tag v-if="column.key == 'bankPurchaseStatus' && record.bankPurchaseStatus == '待发'" color="red">待发</a-tag>
      <a-tag v-if="column.key == 'bankPurchaseStatus' && record.bankPurchaseStatus == '采购'" color="orange">采购</a-tag>
      <a-tag v-if="column.key == 'bankPurchaseStatus' && record.bankPurchaseStatus == '已发'" color="green">已发</a-tag>
    <a-tag v-if="column.key === 'checkStatus' && record.checkStatus === '未核'" color="red">未核</a-tag>
    <a-tag v-if="column.key === 'checkStatus' && record.checkStatus === '已核'" color="green">已核</a-tag>
    <template v-if="column.key === 'operation' && record.bankPurchaseStatus == '待发' && record.checkStatus === '已核'">
          <a-dropdown>
            <span class="ant-dropdown-link" style="cursor: pointer;" @click.prevent>
              <MenuUnfoldOutlined style="font-size: 15px;"/>
            </span>
            <template #overlay>
              <a-menu>
                 <a-menu-item>
                  <a href="javascript:;" @click="handleAddOutsourceSalaryPurchaseCollect(record)">提交采购</a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
     </template>
    </template>
    <template #expandedRowRender="{ record }">
      <div style="background-color: #fafafa; padding: 8px 8px 6px 0;">
      <a-table
        size="small"
        :showHeader="false"
        :tableLayout="'fixed'"
        :columns="innerColumns"
        :data-source="withInnerKeys(record.detailList, record)"
        :pagination="false"
        rowKey="__innerKey"
      >
     <template #bodyCell="{ column, record }">
      <a-checkbox
        v-if="column.key == 'select'"
        :checked="isSelected(record.__innerKey)"
        :disabled="isCheckboxDisabled(record)"
        @change="onSelectChange(record, $event.target.checked)"
      />
      <span v-if="column.key == 'pepoleNum'" style="cursor: pointer;color: #1890FF;" @click="handlePersonSalaryDetail(record)"> {{ record.pepoleNum }}</span>
      <span v-if="column.key == 'yiji'">0</span>
      <a-tag v-if="column.key == 'excelPath' && record.excelPath" style="cursor: pointer;">
         <a-popover placement="topLeft">
      <template #content>
        <a-button size="small" @click="handleExcelPreviewUpload(record)">下载</a-button>
        <a-button size="small" style="margin-left: 5px;" @click="handleExcelPreview(record.excelPath)">查看</a-button>
      </template>查看</a-popover> 
      </a-tag>
      <a-tag style="margin-left: 1px;" v-if="column.key == 'bankPurchaseStatus' && record.bankPurchaseStatus == '待发'" color="red">待发</a-tag>
      <a-tag style="margin-left: 1px;" v-if="column.key == 'bankPurchaseStatus' && record.bankPurchaseStatus == '采购'" color="orange">采购</a-tag>
      <a-tag style="margin-left: 1px;" v-if="column.key == 'bankPurchaseStatus' && record.bankPurchaseStatus == '已发'" color="green">已发</a-tag>
    <a-tag style="margin-left: 1px;" v-if="column.key === 'checkStatus' && record.checkStatus === '未核'" color="red">未核</a-tag>
    <a-tag style="margin-left: 1px;" v-if="column.key === 'checkStatus' && record.checkStatus === '已核'" color="green">已核</a-tag>
      <template v-if="column.key === 'operation' && record.bankPurchaseStatus == '待发' && record.checkStatus === '已核'">
          <a-dropdown>
            <span class="ant-dropdown-link" style="cursor: pointer;" @click.prevent>
              <MenuUnfoldOutlined style="font-size: 15px;"/>
            </span>
            <template #overlay>
              <a-menu>
                 <a-menu-item>
                  <a href="javascript:;" @click="handleAddOutsourceSalaryPurchase(record)">提交采购</a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
     </template>
    </template>
    </a-table>
      </div>
    </template>
  </a-table>
  <a-row v-if="selectedInnerDetailKeys.length > 0" style="margin-top: 10px;margin-bottom: 10px;justify-content: center;">
    <a-button type="primary" size="small" @click="handleAddOutsourceSalaryPurchaseCollectZuhe()">组合提交采购</a-button>
  </a-row>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { message, Modal } from 'ant-design-vue';
import { MenuUnfoldOutlined } from '@ant-design/icons-vue';
import type { TableColumnsType } from 'ant-design-vue';
import { OutsourcePersonSalaryCommitItem, OutsourcePersonSalaryCommitDetailItem } from '/@/api/outsourceDetail/model';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { getOutsourcePersonSalaryCommit, formStateMonthSalary, orginalPathBlobPath,orginalPathBlobType,orginalPathBlobPathFlag} = storeToRefs(outsourceDetailStore);
const loading = ref(false);
const handleExcelPreview = (excelPath: string) => {
  if (!excelPath) {
    message.error('文件不存在');
    return;
  }
  orginalPathBlobPathFlag.value = true;
  orginalPathBlobType.value = 0;
  orginalPathBlobPath.value = excelPath;
}
const handleExcelPreviewUpload = async (record: OutsourcePersonSalaryCommitDetailItem) => {
  if (!record.excelPath) {
    message.error('文件不存在');
    return;
  }
  const src = /^https?:\/\//i.test(record.excelPath)
    ? record.excelPath
    : new URL(record.excelPath, window.location.origin).toString();
  const filename = `外包工资-${record.jinXinMonth}-${record.companyName}-${record.faxinCompany}.xlsx`;
  try {
    const res = await fetch(src);
    if (!res.ok) {
      throw new Error(`download failed: ${res.status}`);
    }
    const blob = await res.blob();
    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = objectUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(objectUrl);
  } catch (e) {
    window.open(src, '_blank');
    message.warning('已在新窗口打开文件，请手动保存下载');
  }
}
const getInnerRowKey = (detail: any, parent: any, idx: number) =>
  `${parent?.jinXinMonth || detail?.jinXinMonth || ''}||${parent?.companyName || detail?.companyName || ''}||${detail?.faxinCompany || ''}||${detail?.bankGroup || ''}||${idx}`;
const withInnerKeys = (details: any[] = [], parent: any) =>
  details.map((d, idx) => ({
    ...d,
    __innerKey: getInnerRowKey(d, parent, idx),
  }));
const selectedInnerDetailKeys = ref<string[]>([]);
const selectedInnerDetails = ref<any[]>([]);
const isSelected = (rowKey: string) => selectedInnerDetailKeys.value.includes(rowKey);
const isCheckboxDisabled = (record: any) => {
  if (record.bankPurchaseStatus !== '待发' || record.checkStatus !== '已核') return true;
  if (selectedInnerDetails.value.length > 0) {
    const first = selectedInnerDetails.value[0];
    if (isSelected(record.__innerKey)) return false;
    return record.faxinCompany !== first.faxinCompany || record.bankGroup !== first.bankGroup;
  }
  return false;
};
const onSelectChange = (rec: any, checked: boolean) => {
  const rowKey = rec.__innerKey;
  if (checked) {
    if (rec.bankPurchaseStatus !== '待发' || rec.checkStatus !== '已核') {
      message.error('仅可选择待发且已核对记录');
      return;
    }
    const first = selectedInnerDetails.value[0];
    if (first) {
      if (!(rec.faxinCompany === first.faxinCompany && rec.bankGroup === first.bankGroup)) {
        message.error('勾选记录的发薪公司与发薪银行需相同');
        return;
      }
    }
    if (!selectedInnerDetailKeys.value.includes(rowKey)) {
      selectedInnerDetailKeys.value = [...selectedInnerDetailKeys.value, rowKey];
      selectedInnerDetails.value = [...selectedInnerDetails.value, rec];
    }
  } else {
    selectedInnerDetailKeys.value = selectedInnerDetailKeys.value.filter((k) => k !== rowKey);
    selectedInnerDetails.value = selectedInnerDetails.value.filter((r) => r.__innerKey !== rowKey);
  }
};
const columns: TableColumnsType = [
  {
    title: '编号',
    dataIndex: 'index',
    key: 'index',
    width: 30,
  },
  {
    title: '计薪月',
    dataIndex: 'jinXinMonth',
    key: 'jinXinMonth',
    width: 40,
  },
   {
    title: '公司',
    dataIndex: 'companyName',
    key: 'companyName',
    width: 50,
  },
   {
    title: '人数',
    dataIndex: 'pepoleNum',
    key: 'pepoleNum',
    width: 30,
    align: 'right',
  },
   {
    title: h('a-tooltip', { title: '个人应发收入总和（不扣除社保、公积金和个税）' }, h('span', {'style': 'background: linear-gradient(45deg, transparent 93%, #f90202 0);padding-right: 5px;'}, '应发工资')),
    dataIndex: 'monthTax',
    key: 'monthTax',
    width: 40,
    align: 'right',
  },
  {
    title: h('a-tooltip', { title: '计税不发薪：解释为此金额计入缴税，但不发放' }, h('span', {'style': 'background: linear-gradient(45deg, transparent 93%, #f90202 0);padding-right: 5px;'}, '计税不发')),
    dataIndex: 'yiji',
    key: 'yiji',
    width: 40,
    align: 'right',
  },
  {
    title: h('a-tooltip', { title: '应发工资+计税不发=实际税前' }, h('span', {'style': 'background: linear-gradient(45deg, transparent 93%, #f90202 0);padding-right: 5px;'}, '实际税前')),
    dataIndex: 'monthTax',
    key: 'monthTax',
    width: 40,
    align: 'right',
  },
    {
    title: h('a-tooltip', { title: '个人社保一金缴费总计' }, h('span', {'style': 'background: linear-gradient(45deg, transparent 93%, #f90202 0);padding-right: 5px;'}, '社保一金')),
    dataIndex: 'monthShebao',
    key: 'monthShebao',
    width: 40,
    align: 'right',
  },
    {
    title: h('a-tooltip', { title: '实际税前金额对应的个税' }, h('span', {'style': 'background: linear-gradient(45deg, transparent 90%, #f90202 0);padding-right: 5px;'}, '个税')),
    dataIndex: 'monthGeshui',
    key: 'monthGeshui',
    width: 40,
    align: 'right',
  },
    {
    title: h('a-tooltip', { title: '银行发薪手续费，银行代发工资不收取，非银行代发收取' }, h('span', {'style': 'background: linear-gradient(45deg, transparent 91%, #f90202 0);padding-right: 5px;'}, '手续费')),
    dataIndex: 'shouxuMoney',
    key: 'shouxuMoney',
    width: 40,
    align: 'right',
  },
    {
    title: h('a-tooltip', { title: '应发工资-社保一金-个税-手续费' }, h('span', {'style': 'background: linear-gradient(45deg, transparent 93%, #f90202 0);padding-right: 5px;'}, '实发工资')),
    dataIndex: 'salaryAfterTax',
    key: 'salaryAfterTax',
    width: 40,
    align: 'right',
  },
  {
    title: h('a-tooltip', { title: '金元：60元/月/人；51社保：' }, h('span', {'style': 'background: linear-gradient(45deg, transparent 91%, #f90202 0);padding-right: 5px;'}, '服务费')),
    dataIndex: 'serviceMoney',
    key: 'serviceMoney',
    width: 40,
    align: 'right',
  },
  {
   title: h('a-tooltip', { title: h('div', [h('div', '51社保:实发工资+服务费+个税'), h('div', '非51社保:实发工资+服务费')]) }, h('span', {'style': 'background: linear-gradient(45deg, transparent 90%, #f90202 0);padding-right: 5px;'}, '总计')),
    dataIndex: 'totalMoney',
    key: 'totalMoney',
    width: 40,
    align: 'right',
  },
  {
    title: '核对',
    dataIndex: 'checkStatus',
    key: 'checkStatus',
    width: 30,
  },
  {
    title: '报表',
    dataIndex: 'report',
    key: 'report',
    width: 30,
  },
  {
    title: '发薪',
    dataIndex: 'bankPurchaseStatus',
    key: 'bankPurchaseStatus',
    width: 30,
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    width: 30,
  },
];
const innerColumns: TableColumnsType = [
  {
    title: '编号',
    dataIndex: 'index',
    key: 'index',
    width: 2,
  },
  {
    title: '',
    dataIndex: 'select',
    key: 'select',
    width: 30,
  },
  {
    title: '发薪公司',
    dataIndex: 'faxinCompany',
    key: 'faxinCompany',
    width: 40,
  },
   {
    title: '发薪银行',
    dataIndex: 'bankGroup',
    key: 'bankGroup',
    width: 50,
  },
   {
    title: '人数',
    dataIndex: 'pepoleNum',
    key: 'pepoleNum',
    width: 30,
    align: 'right',
  },
   {
    title: '应发工资',
    dataIndex: 'monthTax',
    key: 'monthTax',
    width: 30,
    align: 'right',
  },
  {
    title: '计税不发',
    dataIndex: 'yiji',
    key: 'yiji',
    width: 40,
    align: 'right',
  },
  {
    title: '实际税前',
    dataIndex: 'monthTax',
    key: 'monthTax',
    width: 30,
    align: 'right',
  },
    {
    title: '社保一金',
    dataIndex: 'monthShebao',
    key: 'monthShebao',
    width: 40,
    align: 'right',
  },
    {
    title: '个税',
    dataIndex: 'monthGeshui',
    key: 'monthGeshui',
    width: 30,
    align: 'right',
  },
    {
    title: '手续费',
    dataIndex: 'shouxuMoney',
    key: 'shouxuMoney',
    width: 30,
    align: 'right',
  },
    {
    title: '实发工资',
    dataIndex: 'salaryAfterTax',
    key: 'salaryAfterTax',
    width: 30,
    align: 'right',
  },
  {
    title: '服务费',
    dataIndex: 'serviceMoney',
    key: 'serviceMoney',
    width: 30,
    align: 'right',
  },
  {
    title: '总计',
    dataIndex: 'totalMoney',
    key: 'totalMoney',
    width: 30,
    align: 'right',
  },
  {
    title: '核对',
    dataIndex: 'checkStatus',
    key: 'checkStatus',
    width: 30,
  },
  {
    title: '报表',
    dataIndex: 'excelPath',
    key: 'excelPath',
    width: 30,
  },
  {
    title: '发薪',
    dataIndex: 'bankPurchaseStatus',
    key: 'bankPurchaseStatus',
    width: 30,
  },
  {
    title: '',
    dataIndex: 'operation',
    key: 'operation',
    width: 30,
  },
];
// const expandColWidth = 20;
// innerColumns.unshift({
//   title: '',
//   dataIndex: '__expand_placeholder',
//   key: '__expand_placeholder',
//   width: expandColWidth,
// });
const syncLen2 = Math.min(columns.length, innerColumns.length - 1);
for (let i = 0; i < syncLen2; i++) {
  const w = (columns[i] as any)?.width;
  if (w != null) {
    (innerColumns[i + 1] as any).width = w;
  }
}
// 添加展开行状态控制
const expandedRowKeys = ref<string[]>([]); // 存储展开行的key

// 处理展开/折叠事件
const onExpand = (expanded: boolean, record: OutsourcePersonSalaryCommitItem) => {
  if (expanded) {
    // 展开时添加key
    expandedRowKeys.value = [...expandedRowKeys.value, record.companyName];
  } else {
    // 折叠时移除key
    expandedRowKeys.value = expandedRowKeys.value.filter(key => key !== record.companyName);
  }
}
const handlePersonSalaryDetail = (record) => {
  outsourceDetailStore.queryOutsourceSalaryCommitDetail(record?.jinXinMonth || "", record?.companyName || "", record?.faxinCompany || "", record?.bankGroup || "");
}
const handlePersonSalaryCollectDetail = (record) => {
  outsourceDetailStore.queryOutsourceSalaryCommitCollectDetail(record?.jinXinMonth || "", record?.companyName || "");
}
const handleAddOutsourceSalaryPurchaseCollect = (record) => {
  Modal.confirm({
    title: '提示',
    content: '确认提交采购吗？',
    async onOk() {
      loading.value = true;
     outsourceDetailStore.addOutsourceSalaryPurchase(record.detailList).then((res) => {
      if (res.code === 1) {
        outsourceDetailStore.queryOutsourceSalaryCommit(formStateMonthSalary.value.yearAndMonth);
        selectedInnerDetailKeys.value = [];
        expandedRowKeys.value = [];
        message.success('操作成功');
      } else {
        message.error(res.msg || '操作失败');
      }
      loading.value = false;
  });
    }
  });
}
const handleAddOutsourceSalaryPurchase = (record) => {
  Modal.confirm({
    title: '提示',
    content: '确认提交采购吗？',
    async onOk() {
      loading.value = true;
     outsourceDetailStore.addOutsourceSalaryPurchase([record]).then((res) => {
      if (res.code === 1) {
        outsourceDetailStore.queryOutsourceSalaryCommit(formStateMonthSalary.value.yearAndMonth);
        selectedInnerDetailKeys.value = [];
        expandedRowKeys.value = [];
        message.success('操作成功');
      } else {
        message.error(res.msg || '操作失败');
      }
      loading.value = false;
  });
    }
  });
}

const handleAddOutsourceSalaryPurchaseCollectZuhe = () => {
  Modal.confirm({
    title: '提示',
    content: '确认提交采购吗？',
    async onOk() {
      loading.value = true;
      const payload = selectedInnerDetails.value
          .filter((item) => item.bankPurchaseStatus === '待发')
          .map(({ __innerKey, ...item }) => ({
            ...item,
            heBing: "1",
          }));
     outsourceDetailStore.addOutsourceSalaryPurchase(payload).then((res) => {
      if (res.code === 1) {
        outsourceDetailStore.queryOutsourceSalaryCommit(formStateMonthSalary.value.yearAndMonth);
        selectedInnerDetailKeys.value = [];
        expandedRowKeys.value = [];
        message.success('操作成功');
      } else {
        message.error(res.msg || '操作失败');
      }
      loading.value = false;
  });
    }
  });
}
</script>

<style lang="less" scoped>
:deep(.even-row) {
    background-color: #f0f8ff;
  }
  :deep(.even-row .ant-table-cell-row-hover) {
    background-color: #f0f8ff;
  }
  :deep(.ant-table-expanded-row > td) {
    padding: 0 !important;
  }
  :deep(.ant-table-row-expand-icon-cell) {
    width: 30px !important;
    min-width: 30px !important;
    max-width: 30px !important;
    padding: 0 !important;
  }
</style>
