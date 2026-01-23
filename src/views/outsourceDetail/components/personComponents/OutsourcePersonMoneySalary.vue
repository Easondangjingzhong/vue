<template>
    <a-table
        size="small"
        :columns="columns"
        :pagination="false"
        :dataSource="getOfferOutsourceMonthSalary"
        :scroll="{ x: 5200 }"
      >
      <template #summary>
      <a-table-summary fixed>
        <a-table-summary-row>
          <a-table-summary-cell :index="0"></a-table-summary-cell>
          <a-table-summary-cell :index="1"></a-table-summary-cell>
          <a-table-summary-cell :index="2"></a-table-summary-cell>
          <a-table-summary-cell :index="3"></a-table-summary-cell>
          <a-table-summary-cell :index="4">合计</a-table-summary-cell>
          <a-table-summary-cell :index="5"></a-table-summary-cell>
          <a-table-summary-cell :index="6"></a-table-summary-cell>
          <a-table-summary-cell :index="7"></a-table-summary-cell>
          <a-table-summary-cell :index="8"></a-table-summary-cell>
          <a-table-summary-cell :index="9"></a-table-summary-cell>
          <a-table-summary-cell :index="10">{{ summaryData.yuguGongshi }}</a-table-summary-cell>
          <a-table-summary-cell :index="11">{{ summaryData.biaozhunSalary }}</a-table-summary-cell>
          <a-table-summary-cell :index="12">{{ summaryData.canbu }}</a-table-summary-cell>
          <a-table-summary-cell :index="13">{{ summaryData.quanqin }}</a-table-summary-cell>
          <a-table-summary-cell :index="14">{{ summaryData.zhengchangJiaban }}</a-table-summary-cell>
          <a-table-summary-cell :index="15">{{ summaryData.fadingJiaban }}</a-table-summary-cell>
          <a-table-summary-cell :index="16">{{ summaryData.jiabanSalary }}</a-table-summary-cell>
          <a-table-summary-cell :index="17">{{ summaryData.shangyueYugu }}</a-table-summary-cell>
          <a-table-summary-cell :index="18">{{ summaryData.shangyueShiji }}</a-table-summary-cell>
          <a-table-summary-cell :index="19">{{ summaryData.chidao }}</a-table-summary-cell>
          <a-table-summary-cell :index="20">{{ summaryData.shijia }}</a-table-summary-cell>
          <a-table-summary-cell :index="21"></a-table-summary-cell>
          <a-table-summary-cell :index="22">{{ summaryData.daixin }}</a-table-summary-cell>
          <a-table-summary-cell :index="23">{{ summaryData.bingjia }}</a-table-summary-cell>
          <a-table-summary-cell :index="24">{{ summaryData.geti }}</a-table-summary-cell>
          <a-table-summary-cell :index="25">{{ summaryData.tuanti }}</a-table-summary-cell>
          <a-table-summary-cell :index="26">{{ summaryData.teshu }}</a-table-summary-cell>
          <a-table-summary-cell :index="27">{{ summaryData.jili }}</a-table-summary-cell>
          <a-table-summary-cell :index="28">{{ summaryData.salaryTiaocha }}</a-table-summary-cell>
          <a-table-summary-cell :index="29">{{ summaryData.canbuTiaocha }}</a-table-summary-cell>
          <a-table-summary-cell :index="30">{{ summaryData.quanqinTiaocha }}</a-table-summary-cell>
          <a-table-summary-cell :index="31">{{ summaryData.tiaochaTotal }}</a-table-summary-cell>
          <a-table-summary-cell :index="32">{{ summaryData.monthTax }}</a-table-summary-cell>
          <a-table-summary-cell :index="33">{{ summaryData.yearTax }}</a-table-summary-cell>
          <a-table-summary-cell :index="34">{{ summaryData.yanglao }}</a-table-summary-cell>
          <a-table-summary-cell :index="35">{{ summaryData.shiye }}</a-table-summary-cell>
          <a-table-summary-cell :index="36">{{ summaryData.yiliao }}</a-table-summary-cell>
          <a-table-summary-cell :index="37">{{ summaryData.dabing }}</a-table-summary-cell>
          <a-table-summary-cell :index="38">{{ summaryData.yijin }}</a-table-summary-cell>
          <a-table-summary-cell :index="39">{{ summaryData.monthShebao }}</a-table-summary-cell>
          <a-table-summary-cell :index="40">{{ summaryData.yearShebao }}</a-table-summary-cell>
          <a-table-summary-cell :index="41">{{ summaryData.zinvJiaoyu }}</a-table-summary-cell>
          <a-table-summary-cell :index="42">{{ summaryData.jixuJiaoyu }}</a-table-summary-cell>
          <a-table-summary-cell :index="43">{{ summaryData.fangdaiLixi }}</a-table-summary-cell>
          <a-table-summary-cell :index="44">{{ summaryData.fangzu }}</a-table-summary-cell>
          <a-table-summary-cell :index="45">{{ summaryData.shangyangFumu }}</a-table-summary-cell>
          <a-table-summary-cell :index="46">{{ summaryData.monthZhuankou }}</a-table-summary-cell>
          <a-table-summary-cell :index="47">{{ summaryData.yearZhuankou }}</a-table-summary-cell>
          <a-table-summary-cell :index="48">{{ summaryData.yearMianzheng }}</a-table-summary-cell>
          <a-table-summary-cell :index="49">{{ summaryData.yearGeshui }}</a-table-summary-cell>
          <a-table-summary-cell :index="50">{{ summaryData.monthGeshui }}</a-table-summary-cell>
          <a-table-summary-cell :index="51">{{ summaryData.lastMonthLeiJi }}</a-table-summary-cell>
          <a-table-summary-cell :index="52">{{ summaryData.lastMonthLeiJi }}</a-table-summary-cell>
          <a-table-summary-cell :index="53">{{ summaryData.jingJiBuChangJin }}</a-table-summary-cell>
          <a-table-summary-cell :index="54">{{ summaryData.shouxuMoney }}</a-table-summary-cell>
          <a-table-summary-cell :index="55">{{ summaryData.salaryAfterTax }}</a-table-summary-cell>
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
const { getOfferOutsourceMonthSalary, getFormStatePersonMoney } = storeToRefs(outsourceDetailStore);
const columns:TableColumnsType = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      fixed: 'left',
      width: 40,
    },
    {
      title: '店铺',
      dataIndex: 'mkName',
      key: 'mkName',
      fixed: 'left',
      width: 80,
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
      title: '身份证号',
      dataIndex: 'idCard',
      key: 'idCard',
      fixed: 'left',
      width: 70,
    },
    {
      title: '联系方式',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      fixed: 'left',
      width: 80,
    },
    {
      title: '派入公司全称',
      dataIndex: 'companyNameAll',
      key: 'companyNameAll',
      width: 150,
      ellipsis: true,
    },
    {
      title: '入职时间',
      dataIndex: 'realEntryTime',
      key: 'realEntryTime',
      width: 100,
    },
    {
      title: '离职时间',
      dataIndex: 'realLeaveTime',
      key: 'realLeaveTime',
      width: 100,
    },
    {
      title: '计薪日期',
      dataIndex: 'jinxinMonthDetail',
      key: 'jinxinMonthDetail',
    },
    {
      title: `${getFormStatePersonMoney.value?.currentMonth}月预估考勤情况/H`,
      dataIndex: 'yuguGongshi',
      key: 'yuguGongshi',
      width: 120,
    },
    {
      title: `${getFormStatePersonMoney.value?.currentMonth}月标准工资`,
      dataIndex: 'biaozhunSalary',
      key: 'biaozhunSalary',
      width: 80,
    },
    {
      title: `${getFormStatePersonMoney.value?.currentMonth}月餐补`,
      dataIndex: 'canbu',
      key: 'canbu',
    },
    {
      title: `${getFormStatePersonMoney.value?.currentMonth}月全勤`,
      dataIndex: 'quanqin',
      key: 'quanqin',
    },
    {
      title: `${getFormStatePersonMoney.value?.lastMonth}月正常加班（小时）`,
      dataIndex: 'zhengchangJiaban',
      key: 'zhengchangJiaban',
      width: 140,
    },
    {
      title: `${getFormStatePersonMoney.value?.lastMonth}月法定假期加班（小时）`,
      dataIndex: 'fadingJiaban',
      key: 'fadingJiaban',
      width: 160,
    },
    {
      title: `${getFormStatePersonMoney.value?.lastMonth}月加班工资`,
      dataIndex: 'jiabanSalary',
      key: 'jiabanSalary',
      width: 80,
    },
    {
      title: `${getFormStatePersonMoney.value?.lastMonth}月预估出勤`,
      dataIndex: 'shangyueYugu',
      key: 'shangyueYugu',
      width: 80,
    },
    {
      title: `${getFormStatePersonMoney.value?.lastMonth}月实际出勤`,
      dataIndex: 'shangyueShiji',
      key: 'shangyueShiji',
      width: 80,
    },
    {
      title: '迟到',
      dataIndex: 'chidao',
      key: 'chidao',
    },
    {
      title: '事假',
      dataIndex: 'shijia',
      key: 'shijia',
    },
    {
      title: '年假',
      dataIndex: 'qingKuanTime',
      key: 'qingKuanTime',
    },
    {
      title: '带薪假',
      dataIndex: 'daixin',
      key: 'daixin',
    },
    {
      title: '病假',
      dataIndex: 'bingjia',
      key: 'bingjia',
    },
    {
      title: '个人销售奖金',
      dataIndex: 'geti',
      key: 'geti',
      width: 80,
    },
    {
      title: '团队销售奖金',
      dataIndex: 'tuanti',
      key: 'tuanti',
      width: 80,
    },
    {
      title: '特别奖金',
      dataIndex: 'teshu',
      key: 'teshu',
    },
    {
      title: '达成奖金激励',
      dataIndex: 'jili',
      key: 'jili',
      width: 80,
    },
    {
      title: '基础工资调差',
      dataIndex: 'salaryTiaocha',
      key: 'salaryTiaocha',
      width: 80,
    },
    {
      title: '餐补调差',
      dataIndex: 'canbuTiaocha',
      key: 'canbuTiaocha',
    },
    {
      title: '全勤调差',
      dataIndex: 'quanqinTiaocha',
      key: 'quanqinTiaocha',
    },
    {
      title: '差异调整合计',
      dataIndex: 'tiaochaTotal',
      key: 'tiaochaTotal',
      width: 80,
    },
    {
      title: '应计合计',
      dataIndex: 'monthTax',
      key: 'monthTax',
    },
    {
      title: '本年累计',
      dataIndex: 'yearTax',
      key: 'yearTax',
    },
    {
      title: '养老保险',
      dataIndex: 'yanglao',
      key: 'yanglao',
    },
    {
      title: '失业保险',
      dataIndex: 'shiye',
      key: 'shiye',
    },
    {
      title: '基本医疗保险',
      dataIndex: 'yiliao',
      key: 'yiliao',
      width: 80,
    },
    {
      title: '大病救助',
      dataIndex: 'dabing',
      key: 'dabing',
    },
    {
      title: '住房公积金',
      dataIndex: 'yijin',
      key: 'yijin',
    },
    {
      title: '本月社保合计',
      dataIndex: 'monthShebao',
      key: 'monthShebao',
      width: 80,
    },
    {
      title: '本年社保累计',
      dataIndex: 'yearShebao',
      key: 'yearShebao',
      width: 80,
    },
    {
      title: '子女教育',
      dataIndex: 'zinvJiaoyu',
      key: 'zinvJiaoyu',
    },
    {
      title: '继续教育',
      dataIndex: 'jixuJiaoyu',
      key: 'jixuJiaoyu',
    },
    {
      title: '房贷利息',
      dataIndex: 'fangdaiLixi',
      key: 'fangdaiLixi',
    },
    {
      title: '房租',
      dataIndex: 'fangzu',
      key: 'fangzu',
    },
    {
      title: '赡养父母',
      dataIndex: 'shangyangFumu',
      key: 'shangyangFumu',
    },
    {
      title: '本月专扣合计',
      dataIndex: 'monthZhuankou',
      key: 'monthZhuankou',
      width: 80,
    },
    {
      title: '本月专扣累计',
      dataIndex: 'yearZhuankou',
      key: 'yearZhuankou',
      width: 80,
    },
    {
      title: '免征额',
      dataIndex: 'yearMianzheng',
      key: 'yearMianzheng',
    },
    {
      title: '累计应缴税金',
      dataIndex: 'yearGeshui',
      key: 'yearGeshui',
      width: 80,
    },
    {
      title: '本月应缴个税',
      dataIndex: 'monthGeshui',
      key: 'monthGeshui',
      width: 80,
    },
    {
      title: '截止上月累计预扣预缴',
      dataIndex: 'lastMonthLeiJi',
      key: 'lastMonthLeiJi',
      width: 130,
    },
    {
      title: '截止上月金三累计已预扣个税',
      dataIndex: 'lastMonthLeiJi',
      key: 'lastMonthLeiJi',
      width: 180,
    },
    {
      title: '经济补偿金',
      dataIndex: 'jingJiBuChangJin',
      key: 'jingJiBuChangJin',
      width: 80,
    },
    {
      title: '汇款手续费',
      dataIndex: 'shouxuMoney',
      key: 'shouxuMoney',
      width: 80,
    },
    {
      title: '实发金额',
      dataIndex: 'salaryAfterTax',
      key: 'salaryAfterTax',
    },
    {
      title: '工作地',
      dataIndex: 'workCity',
      key: 'workCity',
    },
    {
      title: '五险一金缴纳地',
      dataIndex: 'socialCity',
      key: 'socialCity',
      width: 120,
    },
    {
      title: '个税缴纳地区',
      dataIndex: 'taxCity',
      key: 'taxCity',
      width: 120,
    },
  ];
  const summaryData = computed(() => {
    let yuguGongshi = 0;
    let biaozhunSalary = 0;
    let canbu = 0;
    let quanqin = 0;
    let zhengchangJiaban = 0;
    let fadingJiaban = 0;
    let jiabanSalary = 0;
    let shangyueYugu = 0;
    let shangyueShiji = 0;
    let chidao = 0;
    let shijia = 0;
    let daixin = 0;
    let bingjia = 0;
    let geti = 0;
    let tuanti = 0;
    let teshu = 0;
    let jili = 0;
    let salaryTiaocha = 0;
    let canbuTiaocha = 0;
    let quanqinTiaocha = 0;
    let tiaochaTotal = 0;
    let monthTax = 0;
    let yearTax = 0;
    let yanglao = 0;
    let shiye = 0;
    let yiliao = 0;
    let dabing = 0;
    let yijin = 0;
    let monthShebao = 0;
    let yearShebao = 0;
    let zinvJiaoyu = 0;
    let jixuJiaoyu = 0;
    let fangdaiLixi = 0;
    let fangzu = 0;
    let shangyangFumu = 0;
    let monthZhuankou = 0;
    let yearZhuankou = 0;
    let yearMianzheng = 0;
    let yearGeshui = 0;
    let monthGeshui = 0;
    let lastMonthLeiJi = 0;
    let jingJiBuChangJin = 0;
    let shouxuMoney = 0;
    let salaryAfterTax = 0;
    getOfferOutsourceMonthSalary.value.forEach((item) => {
      yuguGongshi += Number(item.yuguGongshi || 0);
      biaozhunSalary += Number(item.biaozhunSalary || 0);
      canbu += Number(item.canbu || 0);
      quanqin += Number(item.quanqin || 0);
      zhengchangJiaban += Number(item.zhengchangJiaban || 0);
      fadingJiaban += Number(item.fadingJiaban || 0);
      jiabanSalary += Number(item.jiabanSalary || 0);
      shangyueYugu += Number(item.shangyueYugu || 0);
      shangyueShiji += Number(item.shangyueShiji || 0);
      chidao += Number(item.chidao || 0);
      shijia += Number(item.shijia || 0);
      daixin += Number(item.daixin || 0);
      bingjia += Number(item.bingjia || 0);
      geti += Number(item.geti || 0);
      tuanti += Number(item.tuanti || 0);
      teshu += Number(item.teshu || 0);
      jili += Number(item.jili || 0);
      salaryTiaocha += Number(item.salaryTiaocha || 0);
      canbuTiaocha += Number(item.canbuTiaocha || 0);
      quanqinTiaocha += Number(item.quanqinTiaocha || 0);
      tiaochaTotal += Number(item.tiaochaTotal || 0);
      monthTax += Number(item.monthTax || 0);
      yearTax += Number(item.yearTax || 0);
      yanglao += Number(item.yanglao || 0);
      shiye += Number(item.shiye || 0);
      yiliao += Number(item.yiliao || 0);
      dabing += Number(item.dabing || 0);
      yijin += Number(item.yijin || 0);
      monthShebao += Number(item.monthShebao || 0);
      yearShebao += Number(item.yearShebao || 0);
      zinvJiaoyu += Number(item.zinvJiaoyu || 0);
      jixuJiaoyu += Number(item.jixuJiaoyu || 0);
      fangdaiLixi += Number(item.fangdaiLixi || 0);
      fangzu += Number(item.fangzu || 0);
      shangyangFumu += Number(item.shangyangFumu || 0);
      monthZhuankou += Number(item.monthZhuankou || 0);
      yearZhuankou += Number(item.yearZhuankou || 0);
      yearMianzheng += Number(item.yearMianzheng || 0);
      yearGeshui += Number(item.yearGeshui || 0);
      monthGeshui += Number(item.monthGeshui || 0);
      lastMonthLeiJi += Number(item.lastMonthLeiJi || 0);
      jingJiBuChangJin += Number(item.jingJiBuChangJin || 0);
      shouxuMoney += Number(item.shouxuMoney || 0);
      salaryAfterTax += Number(item.salaryAfterTax || 0);
    });
    return {
      yuguGongshi: yuguGongshi.toFixed(2),
      biaozhunSalary: biaozhunSalary.toFixed(2),
      canbu: canbu.toFixed(2),
      quanqin: quanqin.toFixed(2),
      zhengchangJiaban: zhengchangJiaban.toFixed(2),
      fadingJiaban: fadingJiaban.toFixed(2),
      jiabanSalary: jiabanSalary.toFixed(2),
      shangyueYugu: shangyueYugu.toFixed(2),
      shangyueShiji: shangyueShiji.toFixed(2),
      chidao: chidao.toFixed(2),
      shijia: shijia.toFixed(2),
      daixin: daixin.toFixed(2),
      bingjia: bingjia.toFixed(2),
      geti: geti.toFixed(2),
      tuanti: tuanti.toFixed(2),
      teshu: teshu.toFixed(2),
      jili: jili.toFixed(2),
      salaryTiaocha: salaryTiaocha.toFixed(2),
      canbuTiaocha: canbuTiaocha.toFixed(2),
      quanqinTiaocha: quanqinTiaocha.toFixed(2),
      tiaochaTotal: tiaochaTotal.toFixed(2),
      monthTax: monthTax.toFixed(2),
      yearTax: yearTax.toFixed(2),
      yanglao: yanglao.toFixed(2),
      shiye: shiye.toFixed(2),
      yiliao: yiliao.toFixed(2),
      dabing: dabing.toFixed(2),
      yijin: yijin.toFixed(2),
      monthShebao: monthShebao.toFixed(2),
      yearShebao: yearShebao.toFixed(2),
      zinvJiaoyu: zinvJiaoyu.toFixed(2),
      jixuJiaoyu: jixuJiaoyu.toFixed(2),
      fangdaiLixi: fangdaiLixi.toFixed(2),
      fangzu: fangzu.toFixed(2),
      shangyangFumu: shangyangFumu.toFixed(2),
      monthZhuankou: monthZhuankou.toFixed(2),
      yearZhuankou: yearZhuankou.toFixed(2),
      yearMianzheng: yearMianzheng.toFixed(2),
      yearGeshui: yearGeshui.toFixed(2),
      monthGeshui: monthGeshui.toFixed(2),
      lastMonthLeiJi: lastMonthLeiJi.toFixed(2),
      jingJiBuChangJin: jingJiBuChangJin.toFixed(2),
      shouxuMoney: shouxuMoney.toFixed(2),
      salaryAfterTax: salaryAfterTax.toFixed(2),
    };
  });
</script>

<style lang="less" scoped>
</style>
