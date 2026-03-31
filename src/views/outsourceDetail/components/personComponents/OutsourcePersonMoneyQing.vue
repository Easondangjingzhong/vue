<template>
    <a-table
        size="small"
        :columns="columns"
        :pagination="false"
        :dataSource="getOfferOutsourceMonthSalary"
        :scroll="{ x: 1600 }"
      >
      <template #summary>
      <a-table-summary fixed>
        <a-table-summary-row>
          <a-table-summary-cell
            v-for="(col, index) in columns"
            :key="col.key"
            :index="index"
          >
            <template v-if="index === 0">合计</template>
            <template v-else-if="['monthTax', 'sheBaoMoney', 'canBaoMoney', 'economicCompensation', 'personCost', 'serviceFee', 'shangbao', 'salaryTax', 'salaryRateMoney', 'salaryTotal'].includes(col.key)">
              {{ summaryData[col.key] }}
            </template>
            <template v-else-if="['rate', 'salaryRate'].includes(col.key)">
              {{ summaryData[col.key] }}
            </template>
          </a-table-summary-cell>
        </a-table-summary-row>
      </a-table-summary>
    </template>
    </a-table>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import type { TableColumnsType } from 'ant-design-vue';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { getOfferOutsourceMonthSalary,getOutsourceSalaryColumnsQing } = storeToRefs(outsourceDetailStore);
const defaultColumns = computed<TableColumnsType>(() => [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      fixed: 'left',
      width: 40,
    },
    {
      title: '服务类型',
      dataIndex: 'serviceType',
      key: 'serviceType',
      fixed: 'left',
      width: 70,
    },
    {
      title: '城市',
      dataIndex: 'city',
      key: 'city',
      fixed: 'left',
      width: 50,
    },
    {
      title: '店铺',
      dataIndex: 'mkName',
      key: 'mkName',
      fixed: 'left',
      width: 50,
    },
    {
      title: '姓名',
      dataIndex: 'userName',
      key: 'userName',
      fixed: 'left',
      width: 90,
      ellipsis: true,
    },
    {
      title: '职位',
      dataIndex: 'positions',
      key: 'positions',
      fixed: 'left',
      width: 90,
      ellipsis: true,
    },
    {
      title: '计薪日期',
      dataIndex: 'jinxinMonth',
      key: 'jinxinMonth',
      width: 100,
    },
    {
      title: '应发工资',
      dataIndex: 'monthTax',
      key: 'monthTax',
    },
    {
      title: '公司承担社保公积金',
      dataIndex: 'sheBaoMoney',
      key: 'sheBaoMoney',
      width: 150,
    },
    {
      title: '残保金',
      dataIndex: 'canBaoMoney',
      key: 'canBaoMoney',
    },
    {
      title: '经济补偿金',
      dataIndex: 'economicCompensation',
      key: 'economicCompensation',
    },
    {
      title: '人员成本',
      dataIndex: 'personCost',
      key: 'personCost',
    },
    {
      title: '费率',
      dataIndex: 'rate',
      key: 'rate',
    },
    {
      title: '服务费',
      dataIndex: 'serviceFee',
      key: 'serviceFee',
    },
    {
      title: '商业保险',
      dataIndex: 'shangbao',
      key: 'shangbao',
    },
    {
      title: '税前汇总',
      dataIndex: 'salaryTax',
      key: 'salaryTax',
    },
    {
      title: '增值税率',
      dataIndex: 'salaryRate',
      key: 'salaryRate',
    },
    {
      title: '增值税金',
      dataIndex: 'salaryRateMoney',
      key: 'salaryRateMoney',
    },
    {
      title: '费用合计',
      dataIndex: 'salaryTotal',
      key: 'salaryTotal',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    },
  ]);
const columns = computed(() => {
    const saved = getOutsourceSalaryColumnsQing.value;
    if (saved && saved.length > 0) {
      const savedMap = new Map(saved.map((c: any) => [c.key, c]));
      return defaultColumns.value.map((col: any) => {
        const s = savedMap.get(col.key);
        if (s) {
          // If saved, use saved title and visibility
          if (s.show === false) return null;
          return { ...col,
             title: s.rowOther || s.rowName,
             width: s.width || col.width,
             fixed: s.fixed || col.fixed,
             key: s.key,
             dataIndex: s.key,    
             ellipsis: true,
          };
        }
        // If not in saved list, keep it default
        return col;
      }).filter((c: any) => c !== null);
    }
    return defaultColumns.value;
  });
  watch(() => outsourceDetailStore.formStatePersonMoney.companyName, (val) => {
    if (val) {
      outsourceDetailStore.queryOutsourceCompanyExcel(val);
    }
  }, { immediate: true });
const summaryData = computed(() => {
  const list = getOfferOutsourceMonthSalary.value || [];
  const sum = (key: string) =>
    list.reduce((acc, cur: any) => acc + Number.parseFloat(cur?.[key] || '0'), 0);
  
  const sumRate = (key: string) =>
    list.reduce((acc, cur: any) => {
      const raw = String(cur?.[key] ?? '');
      const n = Number.parseFloat(raw.replace('%', ''));
      return acc + (Number.isFinite(n) ? n : 0);
    }, 0);
  const formatRate = (n: number) => (n % 1 === 0 ? `${n.toFixed(0)}%` : `${n.toFixed(2)}%`);

  return {
    monthTax: sum('monthTax').toFixed(2),
    sheBaoMoney: sum('sheBaoMoney').toFixed(2),
    canBaoMoney: sum('canBaoMoney').toFixed(2),
    economicCompensation: sum('economicCompensation').toFixed(2),
    personCost: sum('personCost').toFixed(2),
    rate: formatRate(sumRate('rate')),
    serviceFee: sum('serviceFee').toFixed(2),
    shangbao: sum('shangbao').toFixed(2),
    salaryTax: sum('salaryTax').toFixed(2),
    salaryRate: formatRate(sumRate('salaryRate')),
    salaryRateMoney: sum('salaryRateMoney').toFixed(2),
    salaryTotal: sum('salaryTotal').toFixed(2),
  } as Record<string, string>;
});
</script>

<style lang="less" scoped>
</style>
