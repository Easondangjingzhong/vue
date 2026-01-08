<template>
 <a-drawer
    v-model:open="addOutsourceFormulaFlag"
    title="公司公式"
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
      <a-form :label-col="labelCol" :model="outsourceFormulaForm" @finish="handleSubmit">
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item label="公司" name="companyName">
              <a-select 
              v-model:value="outsourceFormulaForm.companyName" 
              placeholder="请选择公司" 
              :showArrow="false"
              allowClear
              showSearch
              optionFilterProp="label"
              @change="handleCompanyChange"
              :options="getOutsourceCompanyAll"></a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="品牌" name="bId">
               <a-select 
              v-model:value="outsourceFormulaForm.bId" 
              placeholder="请选择品牌" 
              :showArrow="false"
              allowClear
              showSearch
              optionFilterProp="label"
              :options="getOutsourceCompanyBrand"></a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="性质" name="jobType">
              <a-select v-model:value="outsourceFormulaForm.jobType" disabled>
                <a-select-option value="全职">全职</a-select-option>
                <a-select-option value="兼职">兼职</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item label="城市" name="city">
              <a-select 
              v-model:value="outsourceFormulaForm.city" 
              placeholder="请选择城市" 
              :showArrow="false"
              allowClear
              showSearch
              :options="getProvince"
              @change="handleCitySearch"
              optionFilterProp="label"></a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">         
            <a-form-item label="店铺" name="mId">
              <a-select 
              v-model:value="outsourceFormulaForm.mId" 
              placeholder="请选择店铺" 
              :showArrow="false"
              allowClear
              showSearch
              :options="getOutsourceMarkList"
              @search="handleMarkIdSearch"
              optionFilterProp="label"></a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">         
            <a-form-item label="生效日" name="startTime" :rules="[{ required: true, message: '请选择生效日' }]">
              <a-date-picker v-model:value="outsourceFormulaForm.startTime" value-format="YYYY-MM-DD" />
            </a-form-item>
          </a-col>
        </a-row>
         <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item label="周期" name="cycle" :rules="[{ required: true, message: '请选择周期' }]">
              <a-select v-model:value="outsourceFormulaForm.cycle" :options="cycleFormulaOption"></a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">         
            <a-form-item label="总工时" name="totalWorkHours" :rules="[{ required: true, message: '请输入总工时' }]">
              <a-select v-model:value="outsourceFormulaForm.totalWorkHours">
                <a-select-option value="174">174</a-select-option>
                <a-select-option value="166">166</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">         
            <a-form-item label="工时性质" name="hoursType" :rules="[{ required: true, message: '请选择工时性质' }]">
              <a-select v-model:value="outsourceFormulaForm.hoursType" @change="handleHoursTypeChange">
                <a-select-option value="预估工时">预估工时</a-select-option>
                <a-select-option value="实际工时">实际工时</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item label="账单月" name="zhanDanMonth" :rules="[{ required: true, message: '请选择账单月' }]">
              <a-select v-model:value="outsourceFormulaForm.zhanDanMonth">
                <a-select-option value="当月">当月</a-select-option>
                <a-select-option value="上月">上月</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">         
            <a-form-item label="考勤表" name="kaoQinBiao" :rules="[{ required: true, message: '请选择考勤表' }]">
              <a-select v-model:value="outsourceFormulaForm.kaoQinBiao">
                <a-select-option value="当月-15日">当月-15日</a-select-option>
                <a-select-option value="上月-15日">上月-15日</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">         
            <a-form-item label="账单日" name="zhanDanRi" :rules="[{ required: true, message: '请选择账单日' }]">
              <a-select v-model:value="outsourceFormulaForm.zhanDanRi">
                <a-select-option value="25日">25日</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="薪资日" name="xinZiRi" :labelCol="{span: 4}">
               <a-select v-model:value="outsourceFormulaForm.xinZiRi">
                <a-select-option value="当月-5日">当月-5日</a-select-option>
                <a-select-option value="当月-15日">当月-15日</a-select-option>
                <a-select-option value="上月-最后工作日">上月-最后工作日</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">         
            <a-form-item label="年假" name="nianJia" :labelCol="{span: 4}">
              <a-select v-model:value="outsourceFormulaForm.nianJia">
                <a-select-option value="5天">5天</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="当月差额" name="dangmonthCha" :labelCol="{span: 4}">
               <a-select v-model:value="outsourceFormulaForm.dangmonthCha">
                <a-select-option value="上月实际-上月预估">上月实际-上月预估</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">         
            <a-form-item label="出勤工资" name="chuqinSalary" :labelCol="{span: 4}">
              <a-select v-model:value="outsourceFormulaForm.chuqinSalary">
                <a-select-option value="基本工资/全勤工时*本月预估">基本工资/全勤工时*本月预估</a-select-option>
                <a-select-option value="基本工资/全勤工时*本月实际">基本工资/全勤工时*本月实际</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">         
            <a-form-item label="餐补" name="canbu" :labelCol="{span: 4}">
              <a-select v-model:value="outsourceFormulaForm.canbu">
                <a-select-option value="餐补/全勤工时*本月预估">餐补/全勤工时*本月预估</a-select-option>
                <a-select-option value="餐补/全勤工时*本月实际">餐补/全勤工时*本月实际</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="津贴" name="jintie" :labelCol="{span: 4}">
              <a-select v-model:value="outsourceFormulaForm.jintie">
                <a-select-option value="津贴/全勤工时*本月预估">津贴/全勤工时*本月预估</a-select-option>
                <a-select-option value="津贴/全勤工时*本月实际">津贴/全勤工时*本月实际</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          </a-row>
        <a-row :gutter="24">
          <a-col :span="12">         
            <a-form-item label="全勤" name="quanqin" :labelCol="{span: 4}">
              <a-select v-model:value="outsourceFormulaForm.quanqin">
                <a-select-option value="本月预估≥全勤工时，发放全勤工资">本月预估≥全勤工时，发放全勤工资</a-select-option>
                <a-select-option value="本月实际≥全勤工时，发放全勤工资">本月实际≥全勤工时，发放全勤工资</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">         
            <a-form-item label="正常加班" name="zhengchangJiaban" :labelCol="{span: 4}">
              <a-select v-model:value="outsourceFormulaForm.zhengchangJiaban">
                <a-select-option value="基本工资/全勤工时*1.5*正常加班工时">基本工资/全勤工时*1.5*正常加班工时</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="休息加班" name="restJiaban" :labelCol="{span: 4}">
              <a-select v-model:value="outsourceFormulaForm.restJiaban">
                <a-select-option value="基本工资/全勤工时*2*休息加班工时">基本工资/全勤工时*2*休息加班工时</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">         
            <a-form-item label="国定加班" name="fadingJiaban" :labelCol="{span: 4}">
              <a-select v-model:value="outsourceFormulaForm.fadingJiaban">
                <a-select-option value="基本工资/全勤工时*3*国定加班工时">基本工资/全勤工时*3*国定加班工时</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">         
            <a-form-item label="工资调差" name="salaryTiaocha" :labelCol="{span: 4}">
              <a-select v-model:value="outsourceFormulaForm.salaryTiaocha">
                <a-select-option value="基本工资/全勤工时*当月差额">基本工资/全勤工时*当月差额</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="餐补调差" name="canbuTiaocha" :labelCol="{span: 4}">
              <a-select v-model:value="outsourceFormulaForm.canbuTiaocha">
                <a-select-option value="餐补工资/全勤工时*当月差额">餐补工资/全勤工时*当月差额</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">         
            <a-form-item label="津贴调差" name="jintieTiaocha" :labelCol="{span: 4}">
              <a-select v-model:value="outsourceFormulaForm.jintieTiaocha">
                <a-select-option value="津贴工资/全勤工时*当月差额">津贴工资/全勤工时*当月差额</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">         
            <a-form-item label="全勤调差" name="quanqinTiaocha" :labelCol="{span: 4}">
              <a-select v-model:value="outsourceFormulaForm.quanqinTiaocha">
                <a-select-option value="当月差额＜0；扣除全勤工资">当月差额＜0；扣除全勤工资</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
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
import { debounce } from 'lodash-es';
import { message } from 'ant-design-vue';
import { cycleFormulaOption } from '/@/api/outsourceDetail/constants';
import { CloseOutlined } from '@ant-design/icons-vue';
import { OutsourceFormulaItem } from '/@/api/outsourceDetail/model';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { outsourceFormulaForm, addOutsourceFormulaFlag, getOutsourceCompanyAll, getOutsourceCompanyBrand, getProvince, getOutsourceMarkList, } = storeToRefs(outsourceDetailStore);
const drawerWidth = ref(Math.max(600, window.innerWidth * 0.7));
const labelCol = { span: 6 };
const iconLoading = ref(false);
const handleHoursTypeChange = (value) => {
  if (value === "预估工时") {
    outsourceFormulaForm.value.chuqinSalary = "基本工资/全勤工时*本月预估";
    outsourceFormulaForm.value.canbu = "餐补/全勤工时*本月预估";
    outsourceFormulaForm.value.jintie = "津贴/全勤工时*本月预估";
    outsourceFormulaForm.value.quanqin = "本月预估≥全勤工时，发放全勤工资";
  } else {
    outsourceFormulaForm.value.chuqinSalary = "基本工资/全勤工时*本月实际";
    outsourceFormulaForm.value.canbu = "餐补/全勤工时*本月实际";
    outsourceFormulaForm.value.jintie = "津贴/全勤工时*本月实际";
    outsourceFormulaForm.value.quanqin = "本月实际≥全勤工时，发放全勤工资";
  }
}
watch(outsourceFormulaForm, () => {
  if (outsourceFormulaForm.value.jobType == '全职') {
    outsourceFormulaForm.value.zhanDanMonth = '当月';
    outsourceFormulaForm.value.kaoQinBiao = '当月-15日';
    outsourceFormulaForm.value.xinZiRi = '上月-5日';
  } else {
    outsourceFormulaForm.value.zhanDanMonth = '上月';
    outsourceFormulaForm.value.kaoQinBiao = '上月-15日';
    outsourceFormulaForm.value.xinZiRi = '上月-最后工作日';
  }
})
const handleCompanyChange = (value) => {
  outsourceDetailStore.queryCompanyBrand(value);
}
const handleMarkIdSearch = debounce((value?: string) => {
    if (!outsourceFormulaForm.value.city) {
      return;
    }
    outsourceDetailStore.queryMarkListSearch( outsourceFormulaForm.value.city,value || "");
  },1000);
const handleCitySearch = () => {
  handleMarkIdSearch();
}
const handleClose = () => {
  addOutsourceFormulaFlag.value = false;
  outsourceFormulaForm.value = {} as OutsourceFormulaItem;
}
const handleSubmit = () => {
  iconLoading.value = true;
  outsourceFormulaForm.value.market = getOutsourceMarkList.value.find(item => item.value === outsourceFormulaForm.value.mId)?.label || "";
  outsourceFormulaForm.value.brand = getOutsourceCompanyBrand.value.find(item => item.value === outsourceFormulaForm.value.bId)?.label || "";
  outsourceDetailStore.addUpdateOutsourceFormula(outsourceFormulaForm.value).then(res => {
    if (res.code === 1) {
      iconLoading.value = false;
      message.success("保存成功");
      handleClose();
    } else {
      iconLoading.value = false;
      message.error("保存失败");
    }
  });
}
</script>

<style lang="less" scoped>

</style>