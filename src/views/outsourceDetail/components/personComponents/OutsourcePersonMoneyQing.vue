<template>
    <a-table
        size="small"
        :columns="columns"
        :pagination="false"
        :dataSource="getOfferOutsourceMonthSalary"
        :scroll="{ x: scrollX }"
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
            <template v-else-if="col.key && ['monthTax', 'sheBaoMoney', 'canBaoMoney','chenbenTiaochaKe', 'manageChargeTaxMoney','salaryRateFuJiaMoney', 'economicCompensation', 'personCost', 'serviceFee', 'shangBao', 'salaryTax', 'salaryRateMoney', 'salaryTotal'].includes((col as any).dataIndex)">
              {{ summaryData[(col as any).dataIndex] }}
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
      title: '工号',
      dataIndex: 'jobNumber',
      key: 'jobNumber',
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
      ellipsis: true,
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
      title: '中文名',
      dataIndex: 'userNameCn',
      key: 'userNameCn',
      width: 50,
      ellipsis: true,
    },
    {
      title: '英文名',
      dataIndex: 'userNameEn',
      key: 'userNameEn',
      width: 50,
      ellipsis: true,
    },
    {
      title: '入职时间',
      dataIndex: 'realEntryTime',
      key: 'realEntryTime',
      width: 90,
      ellipsis: true,
    },
    {
      title: '离职时间',
      dataIndex: 'realLeaveTime',
      key: 'realLeaveTime',
      width: 90,
      ellipsis: true,
    },
    {
      title: '职位',
      dataIndex: 'positions',
      key: 'positions',
      width: 140,
      ellipsis: true,
    },
    {
      title: '计薪日期',
      dataIndex: 'jinxinMonth',
      key: 'jinxinMonth',
      width: 140,
      ellipsis: true,
    },
    {
      title: '全勤工时',
      dataIndex: 'quanqinHours',
      key: 'quanqinHours',
      width: 70,
    },
    {
      title: '预估出勤工时',
      dataIndex: 'yuguGongshi',
      key: 'yuguGongshi',
      width: 90,
    },
    {
      title: '实际出勤工时',
      dataIndex: 'bebyueShiji',
      key: 'bebyueShiji',
      width: 80,
    },
    {
      title: '总工时',
      dataIndex: 'allHours',
      key: 'allHours',
      width: 70,
    },
    {
      title: '上月预估',
      dataIndex: 'shangyueYugu',
      key: 'shangyueYugu',
      width: 70,
    },
     {
      title: '上月实际',
      dataIndex: 'shangyueShiji',
      key: 'shangyueShiji',
      width: 70,
    },
     {
      title: '基本工资',
      dataIndex: 'biaozhunSalary',
      key: 'biaozhunSalary',
      width: 70,
    },
    {
      title: '标准工时',
      dataIndex: 'currentMonthShiHours',
      key: 'currentMonthShiHours',
      width: 70,
    },
     {
      title: '事假工时',
      dataIndex: 'shijiaHours',
      key: 'shijiaHours',
      width: 70,
    },
     {
      title: '年假工时',
      dataIndex: 'nianjianHours',
      key: 'nianjianHours',
      width: 70,
    },
    {
      title: '婚假工时',
      dataIndex: 'hunjiaHours',
      key: 'hunjiaHours',
      width: 70,
    },
    {
      title: '丧假工时',
      dataIndex: 'sanjiaHours',
      key: 'sanjiaHours',
      width: 70,
    },
    {
      title: '病假工时',
      dataIndex: 'daixinBingjiaHours',
      key: 'daixinBingjiaHours',
      width: 70,
    },
    {
      title: '出勤工资',
      dataIndex: 'chuqinSalary',
      key: 'chuqinSalary',
      width: 70,
    },
    {
      title: '法定节假日加班工时',
      dataIndex: 'holidayOverHours',
      key: 'holidayOverHours',
      width: 120,
    },
     {
      title: '工作日加班工时',
      dataIndex: 'overHours',
      key: 'overHours',
      width: 100,
    },
    {
      title: '周末加班工时',
      dataIndex: 'restOverHours',
      key: 'restOverHours',
      width: 100,
    },
    {
      title: '加班工时',
      dataIndex: 'overHoursTotal',
      key: 'overHoursTotal',
      width: 100,
    },
    {
      title: '法定节假日加班费',
      dataIndex: 'fadingJiaban',
      key: 'fadingJiaban',
      width: 100,
    },
     {
      title: '周末加班费',
      dataIndex: 'xiuxiJiaban',
      key: 'xiuxiJiaban',
      width: 70,
    },
    {
      title: '工作日加班费',
      dataIndex: 'zhengchangJiaban',
      key: 'zhengchangJiaban',
      width: 100,
    },
     {
      title: '加班工资',
      dataIndex: 'jiabanSalary',
      key: 'jiabanSalary',
      width: 70,
    },
     {
      title: '津贴',
      dataIndex: 'jintie',
      key: 'jintie',
      width: 70,
    },
     {
      title: '个人奖金',
      dataIndex: 'geti',
      key: 'geti',
      width: 70,
    },
      {
      title: '团队奖金',
      dataIndex: 'tuanti',
      key: 'tuanti',
      width: 70,
    },
     {
      title: '销售奖金',
      dataIndex: 'jiangjinTotal',
      key: 'jiangjinTotal',
      width: 70,
    },
    {
      title: '激励奖金',
      dataIndex: 'jili',
      key: 'jili',
      width: 70,
    },
     {
      title: '达成奖金',
      dataIndex: 'dacheng',
      key: 'dacheng',
      width: 70,
    },
    {
      title: '特别奖金',
      dataIndex: 'teshu',
      key: 'teshu',
      width: 70,
    },
    {
      title: '保底奖金',
      dataIndex: 'baodiJiangjin',
      key: 'baodiJiangjin',
      width: 70,
    },
    {
      title: '十三薪',
      dataIndex: 'thirteenthSalary',
      key: 'thirteenthSalary',
      width: 70,
    },
     {
      title: '年终奖',
      dataIndex: 'yearEndBouns',
      key: 'yearEndBouns',
      width: 70,
    },
     {
      title: '工资调差',
      dataIndex: 'salaryTiaocha',
      key: 'salaryTiaocha',
      width: 70,
    },
     {
      title: '全勤调差',
      dataIndex: 'quanqinTiaocha',
      key: 'quanqinTiaocha',
      width: 70,
    },
    {
      title: '餐补调差',
      dataIndex: 'canbuTiaocha',
      key: 'canbuTiaocha',
      width: 70,
    },
    {
      title: '津贴调差',
      dataIndex: 'jintieTiaocha',
      key: 'jintieTiaocha',
      width: 70,
    },
    {
      title: '调差合计',
      dataIndex: 'tiaochaTotal',
      key: 'tiaochaTotal',
      width: 70,
    },
    {
      title: '招聘方',
      dataIndex: 'recruitParty',
      key: 'recruitParty',
      width: 70,
    },
    {
      title: '其他费用',
      dataIndex: 'otherPayKe',
      key: 'otherPayKe',
      width: 70,
    },
     {
      title: '计税不发薪项',
      dataIndex: 'jishuiBufa',
      key: 'jishuiBufa',
      width: 100,
    },
     {
      title: '员工福利',
      dataIndex: 'welfareKe',
      key: 'welfareKe',
      width: 70,
    },
     {
      title: '转换费',
      dataIndex: 'zhuanChargeTax',
      key: 'zhuanChargeTax',
      width: 70,
    },
    {
      title: '应发工资',
      dataIndex: 'monthTax',
      key: 'monthTax',
      width: 70,
    },
    {
      title: '公司承担社保公积金',
      dataIndex: 'sheBaoMoney',
      key: 'sheBaoMoney',
      width: 120,
    },
    {
      title: '残保金',
      dataIndex: 'canBaoMoney',
      key: 'canBaoMoney',
      width: 70,
    },
    {
      title: '经济补偿金',
      dataIndex: 'buchangMonth',
      key: 'buchangMonth',
      width: 70,
    },
    {
      title: '人员成本',
      dataIndex: 'personCost',
      key: 'personCost',
      width: 70,
    },
    {
      title: '费率',
      dataIndex: 'rate',
      key: 'rate',
      width: 70,
    },
    {
      title: '服务费',
      dataIndex: 'serviceFee',
      key: 'serviceFee',
      width: 70,
    },
    {
      title: '商业保险',
      dataIndex: 'shangBao',
      key: 'shangBao',
      width: 70,
    },
     {
      title: '调差调整',
      dataIndex: 'chenbenTiaochaKe',
      key: 'chenbenTiaochaKe',
      width: 70,
    },
     {
      title: '固定收费',
      dataIndex: 'fixedFee',
      key: 'fixedFee',
      width: 70,
    },
    {
      title: '税前汇总',
      dataIndex: 'salaryTax',
      key: 'salaryTax',
      width: 70,
    },
     {
    title: '税率',
    dataIndex: 'manageChargeRate',
    key: 'manageChargeRate',
    width: 50,
  },
    {
    title: '税金',
    dataIndex: 'manageChargeTaxMoney',
    key: 'manageChargeTaxMoney',
    width: 60,
  },
    {
      title: '增值税率',
      dataIndex: 'salaryRate',
      key: 'salaryRate',
      width: 70,
    },
    {
      title: '增值税金',
      dataIndex: 'salaryRateMoney',
      key: 'salaryRateMoney',
      width: 70,
    },
    {
      title: '附加税率',
      dataIndex: 'salaryRateFuJia',
      key: 'salaryRateFuJia',
      width: 70,
    },
    {
      title: '附加税金',
      dataIndex: 'salaryRateFuJiaMoney',
      key: 'salaryRateFuJiaMoney',
      width: 70,
    },
    {
      title: '费用合计',
      dataIndex: 'salaryTotal',
      key: 'salaryTotal',
      width: 70,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      width: 50,
      ellipsis: true,
    },
  ]);
const columns = computed(() => {
    const saved = getOutsourceSalaryColumnsQing.value;
    if (saved && saved.length > 0) {
      const defaultMap = new Map(defaultColumns.value.map((c: any) => [c.key, c]));
      const usedKeys = new Set<string>();

      const ordered = saved
        .map((s: any) => {
          const base = defaultMap.get(s.key);
          if (!base) return null;
          usedKeys.add(String(s.key));
          if (s.show === false) return null;
          const savedWidth = Number(s.width);
          return {
            ...base,
            title: s.rowOther || s.rowName || base.title,
            width: Number.isFinite(savedWidth) ? savedWidth : base.width,
            fixed: s.fixed || base.fixed,
            key: s.key,
            dataIndex: s.key,
            ellipsis: true,
          };
        })
        .filter((c: any) => c !== null);

      const rest = defaultColumns.value.filter((c: any) => !usedKeys.has(String(c.key)));
      return [...ordered, ...rest];
    }
    return defaultColumns.value;
  });
const scrollX = computed(() => {
  const cols = (columns.value || []) as any[];
  const total = cols.reduce((sum, col) => sum + (Number(col?.width) || 0), 0);
  return total || 0;
});
  watch(() => outsourceDetailStore.formStatePersonMoney.companyName, (val) => {
    if (val) {
      console.log(getOfferOutsourceMonthSalary.value);
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
    chenbenTiaochaKe: sum('chenbenTiaochaKe').toFixed(2),
    economicCompensation: sum('economicCompensation').toFixed(2),
    manageChargeTaxMoney: sum('manageChargeTaxMoney').toFixed(2),
    salaryRateFuJiaMoney: sum('salaryRateFuJiaMoney').toFixed(2),
    personCost: sum('personCost').toFixed(2),
    serviceFee: sum('serviceFee').toFixed(2),
    shangBao: sum('shangBao').toFixed(2),
    salaryTax: sum('salaryTax').toFixed(2),
    salaryRate: formatRate(sumRate('salaryRate')),
    salaryRateMoney: sum('salaryRateMoney').toFixed(2),
    salaryTotal: sum('salaryTotal').toFixed(2),
  } as Record<string, string>;
});
</script>

<style lang="less" scoped>
</style>
