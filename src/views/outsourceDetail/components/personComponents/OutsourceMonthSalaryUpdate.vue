<template>
 <a-drawer
    v-model:open="outsourceMonthSalaryFlag"
    title="实发工资"
    :maskClosable="false"
    :keyboard="false"
    :closable="false"
    :width="drawerWidth"
    :bodyStyle="{ padding: '4px' }"
    :headerStyle="{ padding: '5px 18px 5px 12px' }"
    placement="right"
  >
    <template #extra>
      <CloseOutlined @click="handleClose" />
    </template>
    <div>
      <a-form :label-col="labelCol" :model="outsourceMonthSalaryForm" @finish="handleSubmit">
        <div class="salaryDiv">
          <div>
            <a-form-item name="markTarget" label="店铺指标" :rules="[{ required: false, message: '请输入店铺指标' }]">
              <a-input v-model:value="outsourceMonthSalaryForm.markTarget" />
            </a-form-item>
          </div>
          <div>
           <a-form-item name="markYingshou" label="店铺营收" :rules="[{ required: false, message: '请选择店铺营收' }]">
              <a-input v-model:value="outsourceMonthSalaryForm.markYingshou" />
            </a-form-item>
          </div>
          <div>
            <a-form-item name="marketDachengRate" label="店铺达成" :rules="[{ required: false, message: '请输入店铺达成' }]">
              <a-input v-model:value="outsourceMonthSalaryForm.marketDachengRate" />
            </a-form-item>
          </div>
          <div>
            <a-form-item name="markTidian" label="店铺提点" :rules="[{ required: false, message: '请输入店铺提点' }]">
              <a-input v-model:value="outsourceMonthSalaryForm.markTidian" />
            </a-form-item>
          </div>
           <div>
            <a-form-item name="tuanti" label="店铺奖金" :rules="[{ required: false, message: '请输入店铺奖金' }]">
              <a-input v-model:value="outsourceMonthSalaryForm.tuanti"/>
            </a-form-item>
          </div>
        </div>
        <div class="salaryDiv">
          <div>
           <a-form-item name="personTarget" label="个人指标" :rules="[{ required: false, message: '请选择个人指标' }]">
              <a-input v-model:value="outsourceMonthSalaryForm.personTarget" />
            </a-form-item>
          </div>
          <div>
           <a-form-item name="personYingshou" label="个人营收" :rules="[{ required: false, message: '请输入个人营收' }]">
              <a-input v-model:value="outsourceMonthSalaryForm.personYingshou" />
            </a-form-item>
          </div>
          <div>
            <a-form-item name="personDachengRate" label="个人达成" :rules="[{ required: false, message: '请输入个人达成' }]">
              <a-input v-model:value="outsourceMonthSalaryForm.personDachengRate" />
            </a-form-item>
          </div>
          <div>
             <a-form-item name="personTidian" label="个人提点" :rules="[{ required: false, message: '请输入店铺奖金' }]">
              <a-input v-model:value="outsourceMonthSalaryForm.personTidian" />
            </a-form-item>
          </div>
           <div>
           <a-form-item name="geti" label="个人奖金" :rules="[{ required: false, message: '请选择个人奖金' }]">
              <a-input v-model:value="outsourceMonthSalaryForm.geti"/>
            </a-form-item>
          </div>
        </div>
        <div class="salaryDiv">
          <div>
            <a-form-item name="jili" label="激励奖金" :rules="[{ required: false, message: '请输入个人营收' }]">
              <a-input v-model:value="outsourceMonthSalaryForm.jili"/>
            </a-form-item>
          </div>
          <div>
           <a-form-item name="dacheng" label="达成奖金" :rules="[{ required: false, message: '请输入个人达成' }]">
              <a-input v-model:value="outsourceMonthSalaryForm.dacheng"/>
            </a-form-item>
          </div>
          <div>
           <a-form-item name="teshu" label="特殊奖金" :rules="[{ required: false, message: '请输入特殊奖金' }]">
              <a-input v-model:value="outsourceMonthSalaryForm.teshu"/>
            </a-form-item>
          </div>
          <div>
            <a-form-item name="jiangjinTotal" label="奖金总计" :rules="[{ required: false, message: '请选择奖金总计' }]">
              <a-input v-model:value="outsourceMonthSalaryForm.jiangjinTotal" disabled />
            </a-form-item>
          </div>
           <div>
           <a-form-item name="baodiJiangjin" label="保底奖金" :rules="[{ required: false, message: '请选择奖金总计' }]">
              <a-input v-model:value="outsourceMonthSalaryForm.baodiJiangjin" />
            </a-form-item>
          </div>
        </div>
        <div class="salaryDiv">
          <div>
            <a-form-item name="thirteenthSalary" label="十三薪" :rules="[{ required: false, message: '请输入十三薪' }]">
              <a-input v-model:value="outsourceMonthSalaryForm.thirteenthSalary"/>
            </a-form-item>
          </div>
          <div>
           <a-form-item name="yearEndBouns" label="年终奖" :rules="[{ required: false, message: '请输入年终奖' }]">
              <a-input v-model:value="outsourceMonthSalaryForm.yearEndBouns"/>
            </a-form-item>
          </div>
          <div class="outsourceAttendCol">
           <a-form-item name="otherPayKe" label="其他支出" :rules="[{ required: false, message: '请输入其他差额' }]">
            <span class="ant-input-number-other">
              <a-input v-model:value="outsourceMonthSalaryForm.otherPayKe" disabled/>
              <span @click="addOtherPayKe" style="cursor: pointer;"><PlusOutlined/></span>
            </span>
            </a-form-item>
            <div class="ant-input-number-other" v-for="(item, index) in otherPayKeArr" :key="index">
              <a-input v-model:value="item.label" @change="updateOtherPayKeTotal"/>
              <a-input v-model:value="item.value" @change="updateOtherPayKeTotal"/>
              <span @click="removeOtherPayKe(index)" style="cursor: pointer;"><MinusOutlined/></span>
            </div>
          </div>
          <div>&nbsp;</div>
          <div>&nbsp;</div>
        </div>
        <a-divider style="margin: 0  0 16px 0;" />
        <div class="salaryDiv">
          <div>
            <a-form-item name="zinvJiaoyu" label="子女教育" :rules="[{ required: false, message: '请输入子女教育' }]">
              <a-input v-model:value="outsourceMonthSalaryForm.zinvJiaoyu"/>
            </a-form-item>
          </div>
          <div>
           <a-form-item name="jixuJiaoyu" label="继续教育" :rules="[{ required: false, message: '请选择继续教育' }]">
              <a-input v-model:value="outsourceMonthSalaryForm.jixuJiaoyu"/>
            </a-form-item>
          </div>
          <div>
           <a-form-item name="fangdaiLixi" label="房贷利息" :rules="[{ required: false, message: '请输入房贷利息' }]">
              <a-input v-model:value="outsourceMonthSalaryForm.fangdaiLixi"/>
            </a-form-item>
          </div>
          <div>
             <a-form-item name="fangzu" label="房租" :rules="[{ required: false, message: '请输入房租' }]">
              <a-input v-model:value="outsourceMonthSalaryForm.fangzu"/>
            </a-form-item>
          </div>
          <div>
           <a-form-item name="shangyangFumu" label="赡养父母" :rules="[{ required: false, message: '请输入赡养父母' }]">
              <a-input v-model:value="outsourceMonthSalaryForm.shangyangFumu"/>
            </a-form-item>
          </div>
        </div>
        <div class="salaryDiv">
          <div>
             <a-form-item name="monthZhuankou" label="月度专扣" :rules="[{ required: false, message: '请选择月度专扣' }]">
                <a-input v-model:value="outsourceMonthSalaryForm.monthZhuankou" disabled/>
              </a-form-item>
          </div>
            <div>
           <a-form-item name="monthMianzheng" label="月度免征" :rules="[{ required: false, message: '请输入月度免征' }]">
              <a-input v-model:value="outsourceMonthSalaryForm.monthMianzheng" disabled/>
            </a-form-item>
          </div>
          <div>
           <a-form-item name="monthTax" label="月度薪资" :rules="[{ required: false, message: '请输入月度薪资' }]">
              <a-input v-model:value="outsourceMonthSalaryForm.monthTax" disabled/>
            </a-form-item>
          </div>
           <div>
           <a-form-item name="monthShebao" label="月度社保" :rules="[{ required: false, message: '请输入月度社保' }]">
              <a-input v-model:value="outsourceMonthSalaryForm.monthShebao" disabled/>
            </a-form-item>
          </div>
          <div>
           <a-form-item name="yijin" label="公积金" :rules="[{ required: false, message: '请输入月度社保' }]">
              <a-input v-model:value="outsourceMonthSalaryForm.yijin" disabled/>
            </a-form-item>
          </div>
          </div>
          <div class="salaryDiv">
            <div>
           <a-form-item name="yearTax" label="年度工资" :rules="[{ required: false, message: '请输入年度工资' }]">
              <a-input v-model:value="outsourceMonthSalaryForm.yearTax" disabled/>
            </a-form-item>
          </div>
          <div>
           <a-form-item name="yearShebao" label="年度社保" :rules="[{ required: false, message: '请输入年度社保' }]">
              <a-input v-model:value="outsourceMonthSalaryForm.yearShebao" disabled/>
            </a-form-item>
          </div>
          <div>
             <a-form-item name="geshuiCha" label="个税差额" :rules="[{ required: false, message: '请输入个税差额' }]">
                <a-input v-model:value="outsourceMonthSalaryForm.geshuiCha" @change="handleGeshuiChaChange"/>
              </a-form-item>
          </div>
          <div>
           <a-form-item name="monthGeshui" label="月度个税" :rules="[{ required: false, message: '请输入月度个税' }]">
              <a-input v-model:value="outsourceMonthSalaryForm.monthGeshui" disabled/>
            </a-form-item>
          </div>
          <div>
           <a-form-item name="shouxuMoney" label="手续费" :rules="[{ required: false, message: '请输入手续费' }]">
              <a-select v-model:value="outsourceMonthSalaryForm.shouxuMoney" placeholder="请输入手续费">
                  <a-select-option value="0">0</a-select-option>
                  <a-select-option value="0.8">0.8</a-select-option>
                  <a-select-option value="1.6">1.6</a-select-option>
                  <a-select-option value="5">5</a-select-option>
              </a-select>
            </a-form-item>
          </div>
        </div>
        <div class="salaryDiv">
          <div>
            <a-form-item name="gongziCha" label="工资差额" :rules="[{ required: false, message: '请输入实发工资' }]">
                <a-input v-model:value="outsourceMonthSalaryForm.gongziCha"/>
              </a-form-item>
          </div>
          <div>
             <a-form-item name="salaryAfterTax" label="实发工资" :rules="[{ required: false, message: '请输入实发工资' }]">
                <a-input v-model:value="outsourceMonthSalaryForm.salaryAfterTax"  disabled/>
              </a-form-item>
          </div>
          <div>&nbsp;</div>
          <div>&nbsp;</div>
          <div style="text-align: right;">
             <a-button type="primary" :loading="iconLoading" html-type="submit">
              保存
            </a-button>
            <a-button style="margin-left: 10px" @click="handleClose">
              取消
            </a-button>
          </div>
        </div>
      </a-form>
    </div>
  </a-drawer>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { message } from 'ant-design-vue';
import { OutsourceMonthSalaryItem } from '/@/api/outsourceDetail/model';
import { CloseOutlined, PlusOutlined, MinusOutlined, } from '@ant-design/icons-vue';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { outsourceMonthSalaryFlag, outsourceMonthSalaryForm } = storeToRefs(outsourceDetailStore);
const drawerWidth = ref(Math.max(600, window.innerWidth * 0.6));
const labelCol = {
  span: 10,
};
const iconLoading = ref(false);
const handleClose = () => {
  otherPayKeArr.value = [] as OtherPayKeItem[];
  outsourceMonthSalaryFlag.value = false;
  outsourceMonthSalaryForm.value = {} as OutsourceMonthSalaryItem;
}
//月度薪资
const monthTax = computed(() => {
  if (parseFloat(outsourceMonthSalaryForm.value.jiangjinTotal || '0') - parseFloat(outsourceMonthSalaryForm.value.baodiJiangjin || '0') <= 0) {
    return (parseFloat(outsourceMonthSalaryForm.value.chuqinSalary || '0') + parseFloat(outsourceMonthSalaryForm.value.canbu || '0') + parseFloat(outsourceMonthSalaryForm.value.jintie || '0') + parseFloat(outsourceMonthSalaryForm.value.quanqin || '0') + parseFloat(outsourceMonthSalaryForm.value.jiabanSalary || '0') + parseFloat(outsourceMonthSalaryForm.value.baodiJiangjin || '0') + parseFloat(outsourceMonthSalaryForm.value.tiaochaTotal || '0') + parseFloat(outsourceMonthSalaryForm.value.thirteenthSalary || '0') + parseFloat(outsourceMonthSalaryForm.value.yearEndBouns || '0') + parseFloat(outsourceMonthSalaryForm.value.otherPayKe || '0')).toFixed(2).toString();
  }
  return (parseFloat(outsourceMonthSalaryForm.value.chuqinSalary || '0') + parseFloat(outsourceMonthSalaryForm.value.canbu || '0') + parseFloat(outsourceMonthSalaryForm.value.jintie || '0') + parseFloat(outsourceMonthSalaryForm.value.quanqin || '0') + parseFloat(outsourceMonthSalaryForm.value.jiabanSalary || '0') + parseFloat(outsourceMonthSalaryForm.value.jiangjinTotal || '0') + parseFloat(outsourceMonthSalaryForm.value.tiaochaTotal || '0') + parseFloat(outsourceMonthSalaryForm.value.thirteenthSalary || '0') + parseFloat(outsourceMonthSalaryForm.value.yearEndBouns || '0') + parseFloat(outsourceMonthSalaryForm.value.otherPayKe || '0')).toFixed(2).toString();
});
watch(monthTax, () => {
  outsourceMonthSalaryForm.value.monthTax = monthTax.value;
  if (outsourceMonthSalaryForm.value.jobType === '兼职') {
    if (Number(monthTax.value) - 4000 <= 0) {
      outsourceMonthSalaryForm.value.monthMianzheng = '800';
    } else {
      outsourceMonthSalaryForm.value.monthMianzheng = (Number(monthTax.value) * 0.2).toFixed(2).toString();
    }
  }
})
//奖金总计
const jiangjinTotal = computed(() => {
  return (parseFloat(outsourceMonthSalaryForm.value.tuanti || '0') + parseFloat(outsourceMonthSalaryForm.value.geti || '0') + parseFloat(outsourceMonthSalaryForm.value.jili || '0') + parseFloat(outsourceMonthSalaryForm.value.dacheng || '0') + parseFloat(outsourceMonthSalaryForm.value.teshu || '0')).toFixed(2).toString();
});
watch(jiangjinTotal, () => {
  outsourceMonthSalaryForm.value.jiangjinTotal = jiangjinTotal.value;
})
//月度专扣总计
const monthZhuankou = computed(() => {
  return (parseFloat(outsourceMonthSalaryForm.value.zinvJiaoyu || '0') + parseFloat(outsourceMonthSalaryForm.value.jixuJiaoyu || '0') + parseFloat(outsourceMonthSalaryForm.value.fangdaiLixi || '0') + parseFloat(outsourceMonthSalaryForm.value.fangzu || '0') + parseFloat(outsourceMonthSalaryForm.value.shangyangFumu || '0')).toFixed(2).toString();
});
watch(monthZhuankou, () => {
  outsourceMonthSalaryForm.value.monthZhuankou = monthZhuankou.value;
})
interface OtherPayKeItem {
  label: string;
  value: number;
}
const otherPayKeArr = ref<OtherPayKeItem[]>([])
const addOtherPayKe = () => {
  otherPayKeArr.value.push({
    label: '',
    value: 0
  })
}
const removeOtherPayKe = (index: number) => {
  otherPayKeArr.value.splice(index, 1);
  updateOtherPayKeTotal();
}
const updateOtherPayKeTotal = () => {
  outsourceMonthSalaryForm.value.otherPayKe = otherPayKeArr.value.reduce((pre, cur) => pre + Number(cur.value), 0).toFixed(2).toString();
  outsourceMonthSalaryForm.value.monthTax = monthTax.value;
  outsourceMonthSalaryForm.value.otherPayKeStr = otherPayKeArr.value.map(item => `${item.label}:${item.value}`).join(';');
}
const yearTaxPre = ref('0');
const yearGeshuiPre = ref('0');
watch(outsourceMonthSalaryFlag, () => {
  if (outsourceMonthSalaryFlag.value) {
    if (outsourceMonthSalaryForm.value.otherPayKeStr) {
      otherPayKeArr.value = outsourceMonthSalaryForm.value.otherPayKeStr.split(';').map(item => ({
        label: item.split(':')[0],
        value: Number(item.split(':')[1] || 0)
      }))
    }
    outsourceDetailStore.queryOutsourceYearTotalPre(outsourceMonthSalaryForm.value.personId?.toString() || '', outsourceMonthSalaryForm.value.jinxinMonth || '').then(res => {
  if (res.code === 1) {
    yearTaxPre.value = res.info.yearTax || '0';
    yearGeshuiPre.value = res.info.yearGeshui || '0';
    //缴纳单位：51社保-0元
    // 缴纳单位：北京博瑞-浦发银行：0.8元
    // 缴纳单位：北京博瑞-其他银行：5元
    // 缴纳单位：北京我推-招商银行: 0.8
    // 缴纳单位：北京我推-其他银行: 5
    if (!outsourceMonthSalaryForm.value.shouxuMoney) {
      if (res.info.shebaoCompany === '51社保') {
      outsourceMonthSalaryForm.value.shouxuMoney = '0';
    } else if (res.info.shebaoCompany === '北京博瑞') {
      if (res.info.bankName === '浦发银行') {
        outsourceMonthSalaryForm.value.shouxuMoney = '0.8';
      } else {
        outsourceMonthSalaryForm.value.shouxuMoney = '5';
      }
    } else if (res.info.shebaoCompany === '北京我推') {
      if (res.info.bankName === '招商银行') {
        outsourceMonthSalaryForm.value.shouxuMoney = '0.8';
      } else {
        outsourceMonthSalaryForm.value.shouxuMoney = '5';
      }
    }
    }
  }
});
  }
})

//月度个税
// PT个税计算方式：
// 综合收入不超过4000元：=（综合收入-800）×20%
// 综合收入超过4000元：=（综合收入-综合收入*20%）×20%
// Temp个税计算方式：
// 本月应缴个税=累计应缴税金-截止上月累计预扣预缴
// 累计应缴税金=（本年收入累计-本年社保累计-免征额-本月专扣累计）*税率
// 税率：
// 1.（本年收入累计-本年社保累计-免征额-本月专扣累计）不超过3.6万元的，按照3%，超过3.6万元至14.4万元的部分，10%，超过14.4万元至30万元的部分，20%
const monthGeshui = computed(() => {
  if (outsourceMonthSalaryForm.value.jobType == '全职') {
    // 获取各项收入和扣除数据
    const yearIncomeTotal = parseFloat(yearTaxPre.value || '0') + parseFloat(outsourceMonthSalaryForm.value.monthTax || '0');
    const yearSocialSecurityTotal = parseFloat(outsourceMonthSalaryForm.value.yearShebao || '0');
    const exemptAmount = parseFloat(outsourceMonthSalaryForm.value.yearMianzheng || '0');
    const currentMonthDeductionTotal = parseFloat(outsourceMonthSalaryForm.value.monthZhuankou || '0');
  
    // 计算应纳税所得额
    const taxableIncome = yearIncomeTotal - yearSocialSecurityTotal - exemptAmount - currentMonthDeductionTotal;
    // 确保应纳税所得额不为负数
    const adjustedTaxableIncome = Math.max(0, taxableIncome);
  
    // 计算税额 - 使用累进税率
    let taxAmount = 0;
  
  if (adjustedTaxableIncome <= 36000) {
    // 不超过3.6万元的部分，税率3%
    taxAmount = adjustedTaxableIncome * 0.03;
  } else if (adjustedTaxableIncome <= 144000) {
    // 超过3.6万元至14.4万元的部分，其中3.6万元按3%，超过部分按10%
    taxAmount = 36000 * 0.03 + (adjustedTaxableIncome - 36000) * 0.1;
  } else if (adjustedTaxableIncome <= 300000) {
    // 超过14.4万元至30万元的部分，分段计算
    taxAmount = 36000 * 0.03 + (144000 - 36000) * 0.1 + (adjustedTaxableIncome - 144000) * 0.2;
  } else {
    // 超过30万元的部分可以根据实际需求继续添加税率档位
    // 这里暂时按超过30万元的部分也使用20%税率计算
    taxAmount = 36000 * 0.03 + (144000 - 36000) * 0.1 + (300000 - 144000) * 0.2 + (adjustedTaxableIncome - 300000) * 0.2;
  }
  // 返回计算结果，保留两位小数
  return (taxAmount - parseFloat(yearGeshuiPre.value || '0')+ parseFloat(outsourceMonthSalaryForm.value?.geshuiCha || '0')).toFixed(2).toString();
  }
  if (parseFloat(outsourceMonthSalaryForm.value.monthTax || '0') - 4000 <= 0) {
    const tax = ((parseFloat(outsourceMonthSalaryForm.value.monthTax || '0') -800)* 0.2) + parseFloat(outsourceMonthSalaryForm.value?.geshuiCha || '0');
    return tax < 0 ? '0' : tax.toFixed(2).toString();
  }
  const tax = ((parseFloat(outsourceMonthSalaryForm.value.monthTax || '0') - parseFloat(outsourceMonthSalaryForm.value.monthTax || '0')* 0.2) * 0.2) + parseFloat(outsourceMonthSalaryForm.value?.geshuiCha || '0');
  return tax < 0 ? '0' : tax.toFixed(2).toString();
});
const handleGeshuiChaChange = () => {
  outsourceMonthSalaryForm.value.monthGeshui = monthGeshui.value;
}
const yearTax = computed(() => {
  return (parseFloat(yearTaxPre.value || '0') + parseFloat(outsourceMonthSalaryForm.value.monthTax || '0')).toFixed(2).toString();
});
watch(monthGeshui, () => {
  outsourceMonthSalaryForm.value.monthGeshui = monthGeshui.value;
})
watch(yearTax, () => {
  outsourceMonthSalaryForm.value.yearTax = yearTax.value;
})
//实发工资
const salaryAfterTax = computed(() => {
  return (parseFloat(outsourceMonthSalaryForm.value.monthTax || '0') - parseFloat(outsourceMonthSalaryForm.value.monthShebao || '0') - parseFloat(outsourceMonthSalaryForm.value.yijin || '0') - parseFloat(outsourceMonthSalaryForm.value.monthGeshui || '0') - parseFloat(outsourceMonthSalaryForm.value.shouxuMoney || '0') + parseFloat(outsourceMonthSalaryForm.value.gongziCha || '0')).toFixed(2).toString();
});
watch(salaryAfterTax, () => {
  outsourceMonthSalaryForm.value.salaryAfterTax = salaryAfterTax.value;
})
watch(() => outsourceMonthSalaryForm.value.gongziCha, () => {
  outsourceMonthSalaryForm.value.salaryAfterTax = salaryAfterTax.value;
})
const handleSubmit = () => {
  iconLoading.value = true;
  outsourceDetailStore.addUpdateOutsourceSalaryMonth(outsourceMonthSalaryForm.value).then(res => {
        if (res.code == 1) {
          message.success('操作成功');
          outsourceDetailStore.queryOutsourceMonthSalary();
          outsourceMonthSalaryFlag.value = false;
          iconLoading.value = false;
          handleClose();
        } else {
          message.error('操作失败');
          iconLoading.value = false;
        }
      })
}
</script>

<style lang="less" scoped>
.salaryDiv {
  display: flex;
}
.salaryDiv > div {
  flex: 1;
}
:deep(.outsourceAttendCol .ant-form-item) {
  margin-bottom: 0;
}
.ant-input-number-other {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 10px;
}
</style>