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
       @expand="onExpand"
       rowClassName="even-row"
    >
    <template #bodyCell="{ column, record }">
      <span v-if="column.key == 'pepoleNum'" style="cursor: pointer;" @click="handlePersonSalaryCollectDetail(record)"> {{ record.pepoleNum }}</span>
      <span v-if="column.key == 'yiji'">0</span>
      <a-tag v-if="column.key == 'bankPurchaseStatus' && record.bankPurchaseStatus == '待发'" color="red">待发</a-tag>
      <a-tag v-if="column.key == 'bankPurchaseStatus' && record.bankPurchaseStatus == '采购'" color="orange">采购</a-tag>
      <a-tag v-if="column.key == 'bankPurchaseStatus' && record.bankPurchaseStatus == '已发'" color="green">已发</a-tag>
      <a-button v-if="column.key == 'operation' && record.bankPurchaseStatus == '待发'" size="small" @click="handleAddOutsourceSalaryPurchaseCollect(record)">提交采购</a-button>
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
      <a-checkbox v-if="column.key == 'select'" :checked="isSelected(record.__innerKey)" :disabled="record.bankPurchaseStatus !== '待发'" @change="onSelectChange(record, $event.target.checked)" />
      <span v-if="column.key == 'pepoleNum'" style="cursor: pointer;" @click="handlePersonSalaryDetail(record)"> {{ record.pepoleNum }}</span>
      <span v-if="column.key == 'yiji'">0</span>
      <a-tag v-if="column.key == 'excelPath' && record.excelPath" style="cursor: pointer;">
         <a-popover placement="topLeft">
      <template #content>
        <a-button size="small" @click="handleExcelPreviewUpload(record)">下载</a-button>
        <a-button size="small" style="margin-left: 5px;" @click="handleExcelPreview(record.excelPath)">查看</a-button>
      </template>查看</a-popover> 
      </a-tag>
      <a-tag v-if="column.key == 'bankPurchaseStatus' && record.bankPurchaseStatus == '待发'" color="red">待发</a-tag>
      <a-tag v-if="column.key == 'bankPurchaseStatus' && record.bankPurchaseStatus == '采购'" color="orange">采购</a-tag>
      <a-tag v-if="column.key == 'bankPurchaseStatus' && record.bankPurchaseStatus == '已发'" color="green">已发</a-tag>
      <a-button v-if="column.key == 'operation' && record.bankPurchaseStatus == '待发'" size="small" @click="handleAddOutsourceSalaryPurchase(record)">提交采购</a-button>
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
const onSelectChange = (rec: any, checked: boolean) => {
  const rowKey = rec.__innerKey;
  if (checked) {
    if (rec.bankPurchaseStatus !== '待发') {
      message.error('仅可选择待发记录');
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
    title: '应发工资',
    dataIndex: 'monthTax',
    key: 'monthTax',
    width: 40,
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
    width: 40,
    align: 'right',
  },
    {
    title: '社保公积金',
    dataIndex: 'monthShebao',
    key: 'monthShebao',
    width: 60,
    align: 'right',
  },
    {
    title: '个税',
    dataIndex: 'monthGeshui',
    key: 'monthGeshui',
    width: 40,
    align: 'right',
  },
    {
    title: '手续费',
    dataIndex: 'shouxuMoney',
    key: 'shouxuMoney',
    width: 40,
    align: 'right',
  },
    {
    title: '实发工资',
    dataIndex: 'salaryAfterTax',
    key: 'salaryAfterTax',
    width: 40,
    align: 'right',
  },
  {
    title: '服务费',
    dataIndex: 'serviceMoney',
    key: 'serviceMoney',
    width: 40,
    align: 'right',
  },
  {
    title: '总计',
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
    width: 20,
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
    title: '社保公积金',
    dataIndex: 'monthShebao',
    key: 'monthShebao',
    width: 60,
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
