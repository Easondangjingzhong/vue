<template>
 <a-drawer
    v-model:open="outsourceAttendFlag"
    title="外包考勤"
    :maskClosable="false"
    :keyboard="false"
    :closable="false"
    :width="drawerWidth"
    :bodyStyle="{ padding: '4px 14px' }"
    :headerStyle="{ padding: '5px 18px 5px 12px' }"
    placement="right"
  >
    <template #extra>
      <CloseOutlined @click="handleClose" />
    </template>
    <div>
      <a-form :label-col="labelCol" :model="outsourceAttendForm" @finish="handleSubmit">
        <a-row :gutter="24">
          <a-col :span="8" class="outsourceAttendCol">
            <a-form-item label="姓名">{{outsourceAttendForm.userNameCn}}</a-form-item>
          </a-col>
          <a-col :span="8" class="outsourceAttendCol">
            <a-form-item label="公司">{{outsourceAttendForm.companyName}}</a-form-item>
          </a-col>
          <a-col :span="8" class="outsourceAttendCol">
            <a-form-item label="品牌">{{outsourceAttendForm.brand}}</a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8" class="outsourceAttendCol">
            <a-form-item label="城市">{{outsourceAttendForm.city}}</a-form-item>
          </a-col>
          <a-col :span="8" class="outsourceAttendCol">
            <a-form-item label="性质">{{outsourceAttendForm.jobType}}</a-form-item>
          </a-col>
          <a-col :span="8" class="outsourceAttendCol">
            <a-form-item label="状态">
              <a-tag v-if="outsourceAttendForm.currentStatus === '2'" color="green">在职</a-tag>
              <a-tag v-if="outsourceAttendForm.currentStatus === '3'" color="red">离职</a-tag>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24" style="border-bottom: 1px solid #ccc;">
          <a-col :span="8">
            <a-form-item name="quanqinHours" label="全勤工时" :rules="[{ required: false, message: '请输入全勤工时' }]">
              <a-input v-model:value="outsourceAttendForm.quanqinHours" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="8">
           <a-form-item name="isYugu" label="预估工时" :rules="[{ required: true, message: '请选择当前状态' }]">
              <a-select v-model:value="outsourceAttendForm.isYugu"  @change="handleTotalChaHours" placeholder="请选择预估工时">
                <a-select-option value="是">是</a-select-option>
                <a-select-option value="否">否</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="yearAndMonth" label="计薪月" :rules="[{ required: false, message: '请输入计薪月' }]">
              <a-input v-model:value="outsourceAttendForm.yearAndMonth" disabled />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8" class="outsourceAttendCol">
             <a-form-item label="工时标识" :colon="false">工时</a-form-item>
          </a-col>
          <a-col :span="4" class="outsourceAttendCol">倍数</a-col>
          <a-col :span="8" class="outsourceAttendCol">
             <a-form-item label="工时标识" :colon="false">工时</a-form-item>
          </a-col>
          <a-col :span="4" class="outsourceAttendCol">倍数</a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item name="lastMonthYuHours" label="上月预估" :rules="[{ required: outsourceAttendForm.isYugu === '是' ? true : false, message: '请输入上月预估' }]">
              <a-input v-model:value="outsourceAttendForm.lastMonthYuHours" :disabled="outsourceAttendForm.isYugu === '否'"/>
            </a-form-item>
          </a-col>
          <a-col :span="4">
           <a-form-item>
             <a-input value="1" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="lastMonthShiHours" label="上月实际" :rules="[{ required: outsourceAttendForm.isYugu === '是' ? true : false, message: '请输入上月预估' }]">
              <a-input v-model:value="outsourceAttendForm.lastMonthShiHours" :disabled="outsourceAttendForm.isYugu === '否'" @change="handleTotalChaHours"/>
            </a-form-item>
          </a-col>
          <a-col :span="4">
           <a-form-item>
             <a-input value="1" disabled/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item name="currentMonthYuHours" label="本月预估" :rules="[{required: outsourceAttendForm.isYugu === '是' ? true : false, message: '请输入本月预估' }]">
              <a-input v-model:value="outsourceAttendForm.currentMonthYuHours" :disabled="outsourceAttendForm.isYugu === '否'" />
            </a-form-item>
          </a-col>
          <a-col :span="4">
           <a-form-item>
             <a-input value="1" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="currentMonthShiHours" label="本月实际" :rules="[{ required: outsourceAttendForm.isYugu === '是' ? false : true, message: '请输入本月实际' }]">
              <a-input v-model:value="outsourceAttendForm.currentMonthShiHours" :disabled="outsourceAttendForm.isYugu === '是'" @change="handleTotalChaShiHours" />
            </a-form-item>
          </a-col>
          <a-col :span="4">
           <a-form-item>
             <a-input value="1" disabled/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item name="totalChaHours" label="累计差额" :rules="[{ required: false, message: '请输入累计差额' }]">
              <a-input v-model:value="outsourceAttendForm.totalChaHours" />
            </a-form-item>
          </a-col>
          <a-col :span="4">
           <a-form-item>
             <a-input value="1" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="overHours" label="正常加班" :rules="[{ required: false, message: '请输入正常加班' }]">
              <a-input v-model:value="outsourceAttendForm.overHours" />
            </a-form-item>
          </a-col>
          <a-col :span="4">
           <a-form-item name="overDouble" :rules="[{ required: false, message: '请输入加班倍数' }]">
             <a-input v-model:value="outsourceAttendForm.overDouble" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item name="holidayOverHours" label="国定加班" :rules="[{ required: false, message: '请输入国定加班' }]">
              <a-input v-model:value="outsourceAttendForm.holidayOverHours" />
            </a-form-item>
          </a-col>
          <a-col :span="4">
           <a-form-item name="holidayOverDouble" :rules="[{ required: false, message: '请输入国定加班倍数' }]">
             <a-input v-model:value="outsourceAttendForm.holidayOverDouble" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="restOverHours" label="休息加班" :rules="[{ required: false, message: '请输入休息加班' }]">
              <a-input v-model:value="outsourceAttendForm.restOverHours" />
            </a-form-item>
          </a-col>
          <a-col :span="4">
           <a-form-item name="restOverDouble" :rules="[{ required: false, message: '请输入休息加班倍数' }]">
             <a-input v-model:value="outsourceAttendForm.restOverDouble" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item name="daixinBingjiaHours" label="带薪病假" :rules="[{ required: false, message: '请输入带薪病假' }]">
              <a-input v-model:value="outsourceAttendForm.daixinBingjiaHours" />
            </a-form-item>
          </a-col>
          <a-col :span="4">
           <a-form-item name="daixinBingjiaDouble" :rules="[{ required: false, message: '请输入带薪病假倍数' }]">
             <a-input v-model:value="outsourceAttendForm.daixinBingjiaDouble" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="kouxinBingjiaHours" label="扣薪病假" :rules="[{ required: false, message: '请输入扣薪病假' }]">
              <a-input v-model:value="outsourceAttendForm.kouxinBingjiaHours" />
            </a-form-item>
          </a-col>
          <a-col :span="4">
           <a-form-item name="kouxinBingjiaDouble" :rules="[{ required: false, message: '请输入扣薪病假倍数' }]">
             <a-input v-model:value="outsourceAttendForm.kouxinBingjiaDouble" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item name="otherDaixinHours" label="其它带薪" :rules="[{ required: false, message: '请输入其它带薪' }]">
              <a-input v-model:value="outsourceAttendForm.otherDaixinHours" />
            </a-form-item>
          </a-col>
          <a-col :span="4">
           <a-form-item name="otherDaixinDouble" :rules="[{ required: false, message: '请输入其它带薪倍数' }]">
             <a-input v-model:value="outsourceAttendForm.otherDaixinDouble" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="shijiaHours" label="事假" :rules="[{ required: false, message: '请输入事假' }]">
              <a-input v-model:value="outsourceAttendForm.shijiaHours" />
            </a-form-item>
          </a-col>
          <a-col :span="4">
           <a-form-item name="shijiaDouble" :rules="[{ required: false, message: '请输入事假倍数' }]">
             <a-input v-model:value="outsourceAttendForm.shijiaDouble" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item name="nianjianHours" label="年假" :rules="[{ required: false, message: '请输入年假' }]">
              <a-input v-model:value="outsourceAttendForm.nianjianHours" />
            </a-form-item>
          </a-col>
          <a-col :span="4">
           <a-form-item name="nianjianDouble" :rules="[{ required: false, message: '请输入年假倍数' }]">
             <a-input v-model:value="outsourceAttendForm.nianjianDouble" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="hunjiaHours" label="婚假" :rules="[{ required: false, message: '请输入婚假' }]">
              <a-input v-model:value="outsourceAttendForm.hunjiaHours" />
            </a-form-item>
          </a-col>
          <a-col :span="4">
           <a-form-item name="hunjiaDouble" :rules="[{ required: false, message: '请输入婚假倍数' }]">
             <a-input v-model:value="outsourceAttendForm.hunjiaDouble" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item name="sanjiaHours" label="丧假" :rules="[{ required: false, message: '请输入丧假' }]">
              <a-input v-model:value="outsourceAttendForm.sanjiaHours" />
            </a-form-item>
          </a-col>
          <a-col :span="4">
           <a-form-item name="sanjiaDouble" :rules="[{ required: false, message: '请输入丧假倍数' }]">
             <a-input v-model:value="outsourceAttendForm.sanjiaDouble" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item name="utHours" label="UT" :rules="[{ required: false, message: '请输入UT' }]">
              <a-input v-model:value="outsourceAttendForm.utHours" />
            </a-form-item>
          </a-col>
          <a-col :span="4">
           <a-form-item name="utDouble" :rules="[{ required: false, message: '请输入UT倍数' }]">
             <a-input v-model:value="outsourceAttendForm.utDouble" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item name="lateHours" label="迟到" :rules="[{ required: false, message: '请输入迟到' }]">
              <a-input v-model:value="outsourceAttendForm.lateHours" />
            </a-form-item>
          </a-col>
          <a-col :span="4"></a-col>
          <a-col :span="8">
            <a-form-item name="isQuanqin" label="全勤" :rules="[{ required: false, message: '请输入全勤' }]">
              <a-select v-model:value="outsourceAttendForm.isQuanqin" placeholder="请选择全勤">
                <a-select-option value="是">是</a-select-option>
                <a-select-option value="否">否</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="4"></a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" style="text-align: right;">
            <a-button type="primary" :loading="iconLoading" html-type="submit">
              保存
            </a-button>
            <a-button style="margin-left: 10px" @click="handleClose">
              取消
            </a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>
  </a-drawer>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { message } from 'ant-design-vue';
import { OutsourceAttendItem, OutsourceMonthSalaryItem, OutsourceSalaryItem } from '/@/api/outsourceDetail/model';
import { CloseOutlined } from '@ant-design/icons-vue';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { outsourceAttendFlag, outsourceAttendForm, outsourceMonthSalaryForm, getOutsourceFormulaList } = storeToRefs(outsourceDetailStore);
const salaryDetail = ref<OutsourceSalaryItem[]>([]);
const leijiChae = ref<number>(0);
// 将年月字符串往前提前一个月的函数
function getPreviousMonth(yearMonth) {
  // 分割年月字符串
  const [yearStr, monthStr] = yearMonth.split('-');
  let year = parseInt(yearStr);
  let month = parseInt(monthStr);
  
  // 月份减1，如果是1月则变为12月，年份减1
  month--;
  if (month === 0) {
    month = 12;
    year--;
  }
  
  // 格式化为'YYYY-MM'格式，确保月份是两位数
  const formattedMonth = month.toString().padStart(2, '0');
  return `${year}-${formattedMonth}`;
}
// 监听 getOutsourceFormulaList 变化，自动设置 quanqinHours
watch(getOutsourceFormulaList, (newVal) => {
  if (newVal && newVal.length > 0 && newVal[0].totalWorkHours) {
    outsourceAttendForm.value.quanqinHours = newVal[0].totalWorkHours;
    outsourceAttendForm.value.isYugu = newVal[0].hoursType === '预估工时' ? '是' : '否';
    if (outsourceAttendForm.value.isYugu == '是') {
      outsourceAttendForm.value.lastMonthYuHours = outsourceAttendForm.value.lastMonthYuHours || newVal[0].totalWorkHours;
      outsourceAttendForm.value.currentMonthYuHours = newVal[0].totalWorkHours;
    }
    if (newVal[0].zhanDanMonth == '当月') {
      outsourceMonthSalaryForm.value.zhanDanMonth = outsourceAttendForm.value.yearAndMonth;
    } else {
      outsourceMonthSalaryForm.value.zhanDanMonth = getPreviousMonth(outsourceAttendForm.value.yearAndMonth);
    }
    outsourceDetailStore.queryOutsourceSalaryByPersonId(outsourceAttendForm.value.personId?.toString(), outsourceAttendForm.value.yearAndMonth + '-01').then(res => {
      if (res.code == 1) {
        salaryDetail.value = res.info;
      }
    });
    outsourceDetailStore.queryOutsourceLeijiChae(outsourceAttendForm.value.personId?.toString(), outsourceAttendForm.value.yearAndMonth + '-01').then(res => {
      if (res.code == 1) {
        let info = res.info.length > 0 ? res.info[0].leijiChae : '0';
        leijiChae.value = parseFloat(info || '0');
      }
    });
  }
}, { immediate: true });
const chuqinSalary = computed(() => {
  // 优先使用 getOutsourceFormulaList 中的公式进行计算
  if (getOutsourceFormulaList.value && getOutsourceFormulaList.value.length > 0) {
    //const formula = getOutsourceFormulaList.value[0];
    // 获取基础数据
    const baseSalary = salaryDetail.value && salaryDetail.value.length > 0 
      ? parseFloat(salaryDetail.value[0].dixin || '0') 
      : 0; // 基本工资
    const totalWorkHours = parseFloat(outsourceAttendForm.value.quanqinHours || '0'); // 全勤工时
    const currentMonthYuHours = parseFloat(outsourceAttendForm.value.currentMonthYuHours || '0'); // 本月预估
    const currentMonthShiHours = parseFloat(outsourceAttendForm.value.currentMonthShiHours || '0'); // 本月实际
    
    // 根据工时类型和员工性质计算出勤工资
    if (outsourceAttendForm.value.isYugu === "是") {
      // 预估工时
      if (outsourceAttendForm.value.jobType === '全职') {
        // 全职员工: 基本工资/全勤工时*本月预估
        return totalWorkHours > 0 ? (baseSalary / totalWorkHours) * currentMonthYuHours : 0;
      } else {
        // 非全职员工: 基本工资*本月预估
        return baseSalary * currentMonthYuHours;
      }
    } else {
      // 实际工时
      if (outsourceAttendForm.value.jobType === '全职') {
        // 全职员工: 基本工资/全勤工时*本月实际
        return totalWorkHours > 0 ? (baseSalary / totalWorkHours) * currentMonthShiHours : 0;
      } else {
        // 非全职员工: 基本工资*本月实际
        return baseSalary * currentMonthShiHours;
      }
    }
  }
  
  // 如果没有公式数据，则使用默认算法
  if (salaryDetail.value && salaryDetail.value.length > 0) {
    const baseSalary = parseFloat(salaryDetail.value[0].dixin || '0'); // 基本工资
    const totalWorkHours = parseFloat(outsourceAttendForm.value.quanqinHours || '0'); // 全勤工时
    const currentMonthYuHours = parseFloat(outsourceAttendForm.value.currentMonthYuHours || '0'); // 本月预估
    const currentMonthShiHours = parseFloat(outsourceAttendForm.value.currentMonthShiHours || '0'); // 本月实际
    
    // 根据工时类型和员工性质计算出勤工资
    if (outsourceAttendForm.value.isYugu === "是") {
      // 预估工时
      if (outsourceAttendForm.value.jobType === '全职') {
        // 全职员工: 基本工资/全勤工时*本月预估
        return totalWorkHours > 0 ? (baseSalary / totalWorkHours) * currentMonthYuHours : 0;
      } else {
        // 非全职员工: 基本工资*本月预估
        return baseSalary * currentMonthYuHours;
      }
    } else {
      // 实际工时
      if (outsourceAttendForm.value.jobType === '全职') {
        // 全职员工: 基本工资/全勤工时*本月实际
        return totalWorkHours > 0 ? (baseSalary / totalWorkHours) * currentMonthShiHours : 0;
      } else {
        // 非全职员工: 基本工资*本月实际
        return baseSalary * currentMonthShiHours;
      }
    }
  }
  return 0;
});
const canbu = computed(() => {
  if (salaryDetail.value && salaryDetail.value.length > 0) {
    const canbu = parseFloat(salaryDetail.value[0].canbu || '0'); // 餐补
    const totalWorkHours = parseFloat(outsourceAttendForm.value.quanqinHours || '0'); // 全勤工时
    const currentMonthYuHours = parseFloat(outsourceAttendForm.value.currentMonthYuHours || '0'); // 本月预估
    const currentMonthShiHours = parseFloat(outsourceAttendForm.value.currentMonthShiHours || '0'); // 本月实际
    // 根据工时类型和员工性质计算出勤工资
    if (outsourceAttendForm.value.isYugu === "是") {
      // 预估工时
      return totalWorkHours > 0 ? (canbu / totalWorkHours) * currentMonthYuHours : 0;
    } else {
      // 实际工时
      return totalWorkHours > 0 ? (canbu / totalWorkHours) * currentMonthShiHours : 0;
    }
  }
  return 0;
});
const jintie = computed(() => {
  if (salaryDetail.value && salaryDetail.value.length > 0) {
    const jintie = parseFloat(salaryDetail.value[0].jintie || '0'); // 津贴
    const totalWorkHours = parseFloat(outsourceAttendForm.value.quanqinHours || '0'); // 全勤工时
    const currentMonthYuHours = parseFloat(outsourceAttendForm.value.currentMonthYuHours || '0'); // 本月预估
    const currentMonthShiHours = parseFloat(outsourceAttendForm.value.currentMonthShiHours || '0'); // 本月实际
    // 根据工时类型和员工性质计算出勤工资
    if (outsourceAttendForm.value.isYugu === "是") {
      // 预估工时
      return totalWorkHours > 0 ? (jintie / totalWorkHours) * currentMonthYuHours : 0;
    } else {
      // 实际工时
      return totalWorkHours > 0 ? (jintie / totalWorkHours) * currentMonthShiHours : 0;
    }
  }
  return 0;
});
const quanqin = computed(() => {
  if (salaryDetail.value && salaryDetail.value.length > 0) {
    const quanqin = parseFloat(salaryDetail.value[0].quanqin || '0'); // 全勤
    const totalWorkHours = parseFloat(outsourceAttendForm.value.quanqinHours || '0'); // 全勤工时
    const currentMonthYuHours = parseFloat(outsourceAttendForm.value.currentMonthYuHours || '0'); // 本月预估
    const currentMonthShiHours = parseFloat(outsourceAttendForm.value.currentMonthShiHours || '0'); // 本月实际
    // 根据工时类型和员工性质计算出勤工资
    if (outsourceAttendForm.value.isYugu === "是") {
      // 预估工时
      return currentMonthYuHours - totalWorkHours > 0 ? quanqin : 0;
    } else {
      // 实际工时
      return currentMonthShiHours - totalWorkHours > 0 ? quanqin : 0;
    }
  }
  return 0;
});
const zhengchangJiaban = computed(() => {
   if (salaryDetail.value && salaryDetail.value.length > 0) {
    const baseSalary = parseFloat(salaryDetail.value[0].dixin || '0'); // 基本工资
    const totalWorkHours = parseFloat(outsourceAttendForm.value.quanqinHours || '0'); // 全勤工时
    const overHours = parseFloat(outsourceAttendForm.value.overHours || '0'); // 正常加班
    const overDouble = parseFloat(outsourceAttendForm.value.overDouble || '0'); // 正常加班
    
    // 根据工时类型和员工性质计算出勤工资
   if (outsourceAttendForm.value.jobType === '全职') {
        // 全职员工: 基本工资/全勤工时*本月预估
        return totalWorkHours > 0 ? (baseSalary / totalWorkHours) * overHours * overDouble : 0;
      } else {
        // 非全职员工: 基本工资*本月预估
        return baseSalary * overHours * overDouble;
      }
  }
  return 0;
});
const fadingJiaban = computed(() => {
  if (salaryDetail.value && salaryDetail.value.length > 0) {
    const baseSalary = parseFloat(salaryDetail.value[0].dixin || '0'); // 基本工资
    const totalWorkHours = parseFloat(outsourceAttendForm.value.quanqinHours || '0'); // 全勤工时
    const holidayOverHours = parseFloat(outsourceAttendForm.value.holidayOverHours || '0'); // 国定加班
    const holidayOverDouble = parseFloat(outsourceAttendForm.value.holidayOverDouble || '0'); // 国定加班
    // 根据工时类型和员工性质计算出勤工资
    if (outsourceAttendForm.value.jobType === '全职') {
      // 全职员工: 基本工资/全勤工时*递减加班
      return totalWorkHours > 0 ? (baseSalary / totalWorkHours) * holidayOverHours * holidayOverDouble : 0;
    } else {
      // 非全职员工: 基本工资*递减加班
      return baseSalary * holidayOverHours * holidayOverDouble;
    }
  }
  return 0;
});
const restJiaban = computed(() => {
  if (salaryDetail.value && salaryDetail.value.length > 0) {
    const baseSalary = parseFloat(salaryDetail.value[0].dixin || '0'); // 基本工资
    const totalWorkHours = parseFloat(outsourceAttendForm.value.quanqinHours || '0'); // 全勤工时
    const restOverHours = parseFloat(outsourceAttendForm.value.restOverHours || '0'); // 休息加班
    const restOverDouble = parseFloat(outsourceAttendForm.value.restOverDouble || '0'); // 休息加班
    // 根据工时类型和员工性质计算出勤工资
    if (outsourceAttendForm.value.jobType === '全职') {
      // 全职员工: 基本工资/全勤工时*递减加班
      return totalWorkHours > 0 ? (baseSalary / totalWorkHours) * restOverHours * restOverDouble : 0;
    } else {
      // 非全职员工: 基本工资*递减加班
      return baseSalary * restOverHours * restOverDouble;
    }
  }
  return 0;
});
const salaryTiaocha = computed(() => {
 if (salaryDetail.value && salaryDetail.value.length > 0) {
    const baseSalary = parseFloat(salaryDetail.value[0].dixin || '0'); // 基本工资
    const totalWorkHours = parseFloat(outsourceAttendForm.value.quanqinHours || '0'); // 全勤工时
    const lastMonthYuHours = parseFloat(outsourceAttendForm.value.lastMonthYuHours || '0'); // 上月预估
    const yuCha = parseFloat((parseFloat(outsourceAttendForm.value.lastMonthShiHours || '0') - lastMonthYuHours).toString()) || 0; // 当月差额
    if (outsourceAttendForm.value.isYugu === "否") {
      return 0;
    }
    if (outsourceAttendForm.value.jobType === '全职') {
        // 全职员工: 基本工资/全勤工时*本月预估
        return totalWorkHours > 0 ? (baseSalary / totalWorkHours) * yuCha : 0;
      }
  }
  return 0;
});
const canbuTiaocha = computed(() => {
  if (salaryDetail.value && salaryDetail.value.length > 0) {
    const canbu = parseFloat(salaryDetail.value[0].canbu || '0'); // 餐补
    const totalWorkHours = parseFloat(outsourceAttendForm.value.quanqinHours || '0'); // 全勤工时
    const lastMonthYuHours = parseFloat(outsourceAttendForm.value.lastMonthYuHours || '0'); // 上月预估
    const yuCha = parseFloat((parseFloat(outsourceAttendForm.value.lastMonthShiHours || '0') - lastMonthYuHours).toString()) || 0; // 当月差额
    if (outsourceAttendForm.value.isYugu === "否") {
      return 0;
    }
    if (outsourceAttendForm.value.jobType === '全职') {
        // 全职员工: 基本工资/全勤工时*本月预估
        return totalWorkHours > 0 ? (canbu / totalWorkHours) * yuCha : 0;
      }
  }
  return 0;
});
const jintirTiaocha = computed(() => {
  if (salaryDetail.value && salaryDetail.value.length > 0) {
    const jintie = parseFloat(salaryDetail.value[0].jintie || '0'); // 津贴
    const totalWorkHours = parseFloat(outsourceAttendForm.value.quanqinHours || '0'); // 全勤工时
    const lastMonthYuHours = parseFloat(outsourceAttendForm.value.lastMonthYuHours || '0'); // 上月预估
    const yuCha = parseFloat((parseFloat(outsourceAttendForm.value.lastMonthShiHours || '0') - lastMonthYuHours).toString()) || 0; // 当月差额
    if (outsourceAttendForm.value.isYugu === "否") {
      return 0;
    }
    if (outsourceAttendForm.value.jobType === '全职') {
        // 全职员工: 基本工资/全勤工时*本月预估
        return totalWorkHours > 0 ? (jintie / totalWorkHours) * yuCha : 0;
      }
  }
  return 0;
});
const quanqinTiaocha = computed(() => {
  if (salaryDetail.value && salaryDetail.value.length > 0) {
    const quanqin = parseFloat(salaryDetail.value[0].quanqin || '0'); // 全勤
    const totalWorkHours = parseFloat(outsourceAttendForm.value.quanqinHours || '0'); // 全勤工时
    const lastMonthYuHours = parseFloat(outsourceAttendForm.value.lastMonthYuHours || '0'); // 上月预估
    const yuCha = parseFloat((parseFloat(outsourceAttendForm.value.lastMonthShiHours || '0') - lastMonthYuHours).toString()) || 0; // 当月差额
    if (outsourceAttendForm.value.isYugu === "否") {
      return 0;
    }
    if (yuCha < 0) {
        return -quanqin;
      }
      // 预估工时
      if (outsourceAttendForm.value.jobType === '全职') {
        // 全职员工: 基本工资/全勤工时*本月预估
        return totalWorkHours > 0 ? (quanqin / totalWorkHours) * yuCha : 0;
      }
  }
  return 0;
});
const drawerWidth = ref(Math.max(600, window.innerWidth * 0.4));
const labelCol = {
  span: 9,
};
const iconLoading = ref(false);
const handleClose = () => {
  outsourceAttendFlag.value = false;
  outsourceAttendForm.value = {} as OutsourceAttendItem;
  outsourceMonthSalaryForm.value = {} as OutsourceMonthSalaryItem;
}
const handleSubmit = () => {
  outsourceMonthSalaryForm.value.chuqinSalary = chuqinSalary.value.toFixed(2).toString();
  outsourceMonthSalaryForm.value.canbu = canbu.value.toFixed(2).toString();
  outsourceMonthSalaryForm.value.jintie = jintie.value.toFixed(2).toString();
  outsourceMonthSalaryForm.value.quanqin = quanqin.value.toFixed(2).toString();
  outsourceMonthSalaryForm.value.zhengchangJiaban = zhengchangJiaban.value.toFixed(2).toString();
  outsourceMonthSalaryForm.value.fadingJiaban = fadingJiaban.value.toFixed(2).toString();
  outsourceMonthSalaryForm.value.xiuxiJiaban = restJiaban.value.toFixed(2).toString();
  outsourceMonthSalaryForm.value.jiabanSalary = (restJiaban.value + fadingJiaban.value + zhengchangJiaban.value).toFixed(2).toString();
  outsourceMonthSalaryForm.value.personId = outsourceAttendForm.value.personId;
  outsourceMonthSalaryForm.value.jinxinMonth = outsourceAttendForm.value.yearAndMonth;
  outsourceMonthSalaryForm.value.biaozhunGongshi = outsourceAttendForm.value.quanqinHours;
  outsourceMonthSalaryForm.value.shangyueYugu = outsourceAttendForm.value.lastMonthYuHours;
  outsourceMonthSalaryForm.value.shangyueShiji = outsourceAttendForm.value.lastMonthShiHours;
  outsourceMonthSalaryForm.value.yuguGongshi = outsourceAttendForm.value.currentMonthYuHours;
  outsourceMonthSalaryForm.value.bebyueShiji = outsourceAttendForm.value.currentMonthShiHours;
  outsourceMonthSalaryForm.value.sign = '1';
  outsourceMonthSalaryForm.value.biaozhunSalary = salaryDetail.value[0].dixin || '0';
  if (outsourceAttendForm.value.isYugu === "是") {
    outsourceMonthSalaryForm.value.benyueChae =  (parseFloat(outsourceAttendForm.value.lastMonthShiHours || '0') -
    parseFloat(outsourceAttendForm.value.lastMonthYuHours || '0')).toString();
  }
  outsourceMonthSalaryForm.value.leijiChae = outsourceAttendForm.value.totalChaHours;
  outsourceMonthSalaryForm.value.monthGeshui = "";
  if (outsourceAttendForm.value.jobType === '全职') {
    outsourceMonthSalaryForm.value.salaryTiaocha = salaryTiaocha.value.toFixed(2).toString();
    outsourceMonthSalaryForm.value.canbuTiaocha = canbuTiaocha.value.toFixed(2).toString();
    outsourceMonthSalaryForm.value.jintieTiaocha = jintirTiaocha.value.toFixed(2).toString();
    outsourceMonthSalaryForm.value.quanqinTiaocha = quanqinTiaocha.value.toFixed(2).toString();
    outsourceMonthSalaryForm.value.tiaochaTotal = (salaryTiaocha.value + canbuTiaocha.value + jintirTiaocha.value + quanqinTiaocha.value).toFixed(2).toString();
    outsourceMonthSalaryForm.value.monthMianzheng = '5000';
  } else {
    const monthTotal = chuqinSalary.value  + canbu.value + jintie.value + quanqin.value + restJiaban.value + fadingJiaban.value + zhengchangJiaban.value;
    if (monthTotal - 4000 <= 0) {
      outsourceMonthSalaryForm.value.monthMianzheng = '800';
    } else {
      outsourceMonthSalaryForm.value.monthMianzheng = (monthTotal * 0.2).toFixed(2).toString();
    }
    
  }
  console.log(outsourceMonthSalaryForm.value);
  iconLoading.value = true;
  outsourceAttendForm.value.flag = '2';
  outsourceDetailStore.updateOutsourceAttend().then(res => {
    if (res.code == 1) {
      outsourceDetailStore.addUpdateOutsourceSalaryMonth(outsourceMonthSalaryForm.value).then(res => {
        if (res.code == 1) {
          message.success('操作成功');
          outsourceAttendFlag.value = false;
          iconLoading.value = false;
          handleClose();
        } else {
          message.error('操作失败');
          iconLoading.value = false;
        }
      })
    } else {
      message.error('操作失败');
      iconLoading.value = false;
    }
  });
}
const handleTotalChaShiHours = () => {
  if (parseFloat(outsourceAttendForm.value.currentMonthShiHours || '0') -
    parseFloat(outsourceAttendForm.value.quanqinHours || '0') >= 0) {
      outsourceAttendForm.value.isQuanqin = '是';
  } else {
    outsourceAttendForm.value.isQuanqin = '否';
  }
}
const handleTotalChaHours = () => {
  if (parseFloat(outsourceAttendForm.value.lastMonthShiHours || '0') -
    parseFloat(outsourceAttendForm.value.quanqinHours || '0') > 0) {
      outsourceAttendForm.value.isQuanqin = '是';
  } else {
    outsourceAttendForm.value.isQuanqin = '否';
  }
  if (outsourceAttendForm.value.isYugu === "否") {
    outsourceAttendForm.value.totalChaHours = leijiChae.value?.toString();
    return;
  }
  outsourceAttendForm.value.totalChaHours = (parseFloat(outsourceAttendForm.value.lastMonthShiHours || '0') -
    parseFloat(outsourceAttendForm.value.lastMonthYuHours || '0') + leijiChae.value).toString();
}
</script>

<style lang="less" scoped>
:deep(.outsourceAttendCol .ant-form-item) {
  margin-bottom: 0;
}
</style>