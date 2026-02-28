<template>
 <a-drawer
    v-model:open="costDetailFlag"
    title="用工成本"
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
      <a-form :label-col="labelCol" :model="costDetailForm" @finish="handleSubmit">
        <!-- <a-row :gutter="24">
          <a-col :span="8" class="outsourceAttendCol">
            <a-form-item label="姓名">{{costDetailForm.userNameCn}}</a-form-item>
          </a-col>
          <a-col :span="8" class="outsourceAttendCol">
            <a-form-item label="公司">{{costDetailForm.companyName}}</a-form-item>
          </a-col>
          <a-col :span="8" class="outsourceAttendCol">
            <a-form-item label="品牌">{{costDetailForm.brand}}</a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8" class="outsourceAttendCol">
            <a-form-item label="城市">{{costDetailForm.city}}</a-form-item>
          </a-col>
          <a-col :span="8" class="outsourceAttendCol">
            <a-form-item label="性质">{{costDetailForm.jobType}}</a-form-item>
          </a-col>
          <a-col :span="8" class="outsourceAttendCol">
            <a-form-item label="状态">
              <a-tag v-if="costDetailForm.currentStatus === '2'" color="green">在职</a-tag>
              <a-tag v-if="costDetailForm.currentStatus === '3'" color="red">离职</a-tag>
            </a-form-item>
          </a-col>
        </a-row> -->
        <a-row :gutter="24" style="border-bottom: 1px solid #ccc;margin-bottom: 15px;">
          <a-col :span="12">
            客户账单
          </a-col>
          <a-col :span="12">
           公司账单
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="6">
            <a-form-item name="monthTax" label="人才支出">
              <a-input v-model:value="costDetailForm.monthTax" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item name="companyShebaoKe" label="企业社保">
              <a-input v-model:value="costDetailForm.companyShebaoKe" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="人才支出">
              <a-input v-model:value="costDetailForm.monthTax" disabled/>
            </a-form-item>
          </a-col>
           <a-col :span="6">
            <a-form-item name="companyShebao" label="企业社保">
              <a-input v-model:value="costDetailForm.companyShebao" disabled/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24" class="outsourceAttendCol">
          <a-col :span="6">
            <a-form-item name="companyYijinKe" label="企业一金">
              <a-input v-model:value="costDetailForm.companyYijinKe" disabled/>
            </a-form-item>
          </a-col>
           <a-col :span="6">
            <a-form-item name="chenbenTiaochaKe" label="调差调整">
              <span class="ant-input-number-other">
              <a-input v-model:value="costDetailForm.chenbenTiaochaKe" disabled/>
              <span @click="addChenbenTiaochaKe" style="cursor: pointer;"><PlusOutlined/></span>
              </span>
            </a-form-item>
             <div class="ant-input-number-other" v-for="(item, index) in chenbenTiaochaKeArr" :key="index">
              <a-input v-model:value="item.label" @change="updateChenbenTiaochaKeTotal"/>
              <a-input v-model:value="item.value" @change="updateChenbenTiaochaKeTotal"/>
              <span @click="removeChenbenTiaochaKe(index)" style="cursor: pointer;"><MinusOutlined/></span>
            </div>
          </a-col>
         <a-col :span="6">
            <a-form-item name="companyYijin" label="企业一金">
              <a-input v-model:value="costDetailForm.companyYijin" disabled/>
            </a-form-item>
          </a-col>
           <a-col :span="6">
            <a-form-item name="chenbenTiaocha" label="调差调整">
              <span class="ant-input-number-other">
              <a-input v-model:value="costDetailForm.chenbenTiaocha" disabled/>
              <span @click="addChenbenTiaocha" style="cursor: pointer;"><PlusOutlined/></span>
              </span>
            </a-form-item>
            <div class="ant-input-number-other" v-for="(item, index) in chenbenTiaochaArr" :key="index">
              <a-input v-model:value="item.label" @change="updateChenbenTiaochaTotal"/>
              <a-input v-model:value="item.value" @change="updateChenbenTiaochaTotal"/>
              <span @click="removeChenbenTiaocha(index)" style="cursor: pointer;"><MinusOutlined/></span>
            </div>
          </a-col>
        </a-row>
        <a-row :gutter="24" class="outsourceAttendCol">
          <a-col :span="6">
            <a-form-item name="keShangbao" label="企业商保">
              <a-input v-model:value="costDetailForm.keShangbao" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item name="otherPayKe" label="其他支出">
              <span class="ant-input-number-other">
              <a-input v-model:value="costDetailForm.otherPayKe" disabled/>
              <span @click="addOtherPayKe" style="cursor: pointer;"><PlusOutlined/></span>
              </span>
            </a-form-item>
            <div class="ant-input-number-other" v-for="(item, index) in otherPayKeArr" :key="index">
              <a-input v-model:value="item.label" @change="updateOtherPayKeTotal"/>
              <a-input v-model:value="item.value" @change="updateOtherPayKeTotal"/>
              <span @click="removeOtherPayKe(index)" style="cursor: pointer;"><MinusOutlined/></span>
            </div>
          </a-col>
          <a-col :span="6">
            <a-form-item name="shiShangbao" label="企业商保">
              <a-input v-model:value="costDetailForm.shiShangbao" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item name="otherPay" label="其他支出">
              <span class="ant-input-number-other">
              <a-input v-model:value="costDetailForm.otherPay" disabled/>
              <span @click="addOtherPay" style="cursor: pointer;"><PlusOutlined/></span>
              </span>
            </a-form-item>
            <div class="ant-input-number-other" v-for="(item, index) in otherPayArr" :key="index">
              <a-input v-model:value="item.label" @change="updateOtherPayTotal"/>
              <a-input v-model:value="item.value" @change="updateOtherPayTotal"/>
              <span @click="removeOtherPay(index)" style="cursor: pointer;"><MinusOutlined/></span>
            </div>
          </a-col>
        </a-row>
        <a-row :gutter="24" class="outsourceAttendCol">
          <a-col :span="6">
            <a-form-item name="canBao" label="企业残保">
              <a-input v-model:value="costDetailForm.canBao" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item name="welfareKe" label="员工福利">
              <span class="ant-input-number-other">
              <a-input v-model:value="costDetailForm.welfareKe" disabled/>
              <span @click="addWelfareKe" style="cursor: pointer;"><PlusOutlined/></span>
              </span>
            </a-form-item>
            <div class="ant-input-number-other" v-for="(item, index) in welfareKeArr" :key="index">
              <a-input v-model:value="item.name" @change="updateWelfareKeTotal"/>
              <a-input v-model:value="item.money" @change="updateWelfareKeTotal"/>
              <span @click="removeWelfareKe(index)" style="cursor: pointer;"><MinusOutlined/></span>
            </div>
          </a-col>
          <a-col :span="6">
            <a-form-item label="企业残保">
              <a-input v-model:value="costDetailForm.canBao" />
            </a-form-item>
          </a-col>
          <a-col :span="6" style="display: none; ">
            <a-form-item name="welfare" label="员工福利">
              <a-input v-model:value="costDetailForm.welfare" disabled/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="6">
            <a-form-item name="costTotalke" label="成本总计">
              <a-input v-model:value="costTotalke" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="6"></a-col>
          <a-col :span="6">
            <a-form-item name="costTotal" label="成本总计">
              <a-input v-model:value="costTotal" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="6"></a-col>
        </a-row>
        <a-row :gutter="24" style="border-bottom: 1px solid #ccc;margin-bottom: 15px;">
          <a-col :span="24">
            综合收费
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item name="manageGongShi" :label-col="{span: 3.5}" label="管理公式">
              <a-select v-model:value="costDetailForm.manageGongShi" :options="manageGongShiOptions" allowClear @change="handleManageGongShiChange"></a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="6">
            <a-form-item name="manageChargeTax" label="税前管理">
              <a-input v-model:value="costDetailForm.manageChargeTax" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item name="manageChargeRate" label="税率">
              <a-select v-model:value="costDetailForm.manageChargeRate" :options="rateOptions" @change="handleManageChargeRate"></a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item name="manageChargeTaxMoney" label="税金">
              <a-input v-model:value="costDetailForm.manageChargeTaxMoney" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item name="moneyCahrgeTax" label="总营收费">
              <a-input v-model:value="costDetailForm.moneyCahrgeTax" disabled/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="6">
            <a-form-item name="zhuanChargeTax" label="税前转换">
              <a-input v-model:value="costDetailForm.zhuanChargeTax" @change="handleZhuanChargeTax"/>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item name="zhuanChargeRate" label="税率">
              <a-select v-model:value="costDetailForm.zhuanChargeRate" :options="rateOptions"  @change="handleZhuanChargeTax"></a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item name="zhuanChargeTaxMoney" label="税金">
              <a-input v-model:value="costDetailForm.zhuanChargeTaxMoney" disabled/>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item name="zhuanChargeAfter" label="税后转换">
              <a-input v-model:value="costDetailForm.zhuanChargeAfter" disabled/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="6">
            <a-form-item name="totalCharge" label="总收费">
              <a-input v-model:value="costDetailForm.totalCharge" disabled/>
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
import { message } from 'ant-design-vue';
import type { ComprehensiveCostItem } from '/@/api/outsourceDetail/model';
import { CloseOutlined, PlusOutlined, MinusOutlined, } from '@ant-design/icons-vue';
import type { OutsourceSheBaoItem,OfferDetailsItem } from '/@/api/outsourceDetail/model';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { offerNumDetail, costDetailFlag, costDetailForm, getOutsourcePersonPerformanceDetail, getOutsourcePersonPerformanceDetailSheBaoInfo, getOutsourcePersonPerformanceDetailPersonInfo, getOutsourcePersonPerformanceDetailGongShi, outsourcePersonPerformanceDetail, costOfferDetailsForm, getHaveZhaoFlag} = storeToRefs(outsourceDetailStore);
const drawerWidth = ref(Math.max(600, window.innerWidth * 0.6));
const labelCol = {
  span: 8,
};
const iconLoading = ref(false);
const manageGongShiOptions = ref([
  {
    value: "",
    label: "",
  }
]);
const rateOptions = ref([
  {
    label: '6.72%',
    value: '0.0672',
  },
  {
    label: '6%',
    value: '0.06',
  },
])
interface LabelAndValueItem {
  label: string;
  value: number;
}
//公司账单调差调整
const chenbenTiaochaArr = ref<LabelAndValueItem[]>([])
const addChenbenTiaocha = () => {
  chenbenTiaochaArr.value.push({
    label: '',
    value: 0
  })
}
const removeChenbenTiaocha = (index: number) => {
  chenbenTiaochaArr.value.splice(index, 1);
  updateChenbenTiaochaTotal();
}
const updateChenbenTiaochaTotal = () => {
  costDetailForm.value.chenbenTiaocha = chenbenTiaochaArr.value.reduce((pre, cur) => pre + Number(cur.value), 0).toFixed(2).toString();
  costDetailForm.value.chenbenTiaochaStr = chenbenTiaochaArr.value.map(item => `${item.label}:${item.value}`).join(';');
}
//客户账单调差调整
const chenbenTiaochaKeArr = ref<LabelAndValueItem[]>([])
const addChenbenTiaochaKe = () => {
  chenbenTiaochaKeArr.value.push({
    label: '',
    value: 0
  })
}
const removeChenbenTiaochaKe = (index: number) => {
  chenbenTiaochaKeArr.value.splice(index, 1);
  updateChenbenTiaochaKeTotal();
}
const updateChenbenTiaochaKeTotal = () => {
  costDetailForm.value.chenbenTiaochaKe = chenbenTiaochaKeArr.value.reduce((pre, cur) => pre + Number(cur.value), 0).toFixed(2).toString();
  costDetailForm.value.chenbenTiaochaKeStr = chenbenTiaochaKeArr.value.map(item => `${item.label}:${item.value}`).join(';');
}
//公司账单其他支出
const otherPayArr = ref<LabelAndValueItem[]>([])
const addOtherPay = () => {
  otherPayArr.value.push({
    label: '',
    value: 0
  })
}
const removeOtherPay = (index: number) => {
  otherPayArr.value.splice(index, 1);
  updateOtherPayTotal();
}
const updateOtherPayTotal = () => {
  costDetailForm.value.otherPay = otherPayArr.value.reduce((pre, cur) => pre + Number(cur.value), 0).toFixed(2).toString();
  costDetailForm.value.otherPayStr = otherPayArr.value.map(item => `${item.label}:${item.value}`).join(';');
}
//客户账单其他支出
const otherPayKeArr = ref<LabelAndValueItem[]>([])
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
  costDetailForm.value.otherPayKe = otherPayKeArr.value.reduce((pre, cur) => pre + Number(cur.value), 0).toFixed(2).toString();
  costDetailForm.value.otherPayKeStr = otherPayKeArr.value.map(item => `${item.label}:${item.value}`).join(';');
}
//客户账单员工福利
interface WelfareKeItem {
  personId?: string;
  name?: string;
  money?: number;
}
const welfareKeArr = ref<WelfareKeItem[]>([])
const addWelfareKe = () => {
  welfareKeArr.value.push({
    personId: getOutsourcePersonPerformanceDetail.value[0].personId?.toString() || "",
    name: '',
    money: 0
  })
}
const removeWelfareKe = (index: number) => {
  welfareKeArr.value.splice(index, 1);
  updateWelfareKeTotal();
}
const updateWelfareKeTotal = () => {
  costDetailForm.value.welfareKe = welfareKeArr.value.reduce((pre, cur) => pre + Number(cur.money), 0).toFixed(2).toString();
}
const costDetailFormPerformanceDetail = () => {
  if(getOutsourcePersonPerformanceDetail.value.length > 0) {
    const temp = getOutsourcePersonPerformanceDetail.value[0];
    const sheBao = getOutsourcePersonPerformanceDetailSheBaoInfo.value.length > 0 ? getOutsourcePersonPerformanceDetailSheBaoInfo.value[0] : {} as OutsourceSheBaoItem;
    costDetailForm.value.jinxinMonth = temp?.jinxinMonth?.toString() || "";
    costDetailForm.value.personId = temp?.personId?.toString() || "";
    costDetailForm.value.monthTax = temp?.monthTax || "0";
    costDetailForm.value.companyShebaoKe = (Number(sheBao?.companyTotal || 0) - Number(sheBao?.yijinCompany || 0)).toFixed(2);
    costDetailForm.value.companyShebao = (Number(sheBao?.companyTotal || 0) - Number(sheBao?.yijinCompany || 0)).toFixed(2);
    costDetailForm.value.companyYijinKe = sheBao?.yijinCompany?.toString() || "0";
    costDetailForm.value.welfareKe = temp?.welfareKe || "0";
    costDetailForm.value.manageGongShi = temp?.manageGongShi || "";
    costDetailForm.value.companyYijin = sheBao?.yijinCompany?.toString() || "0";
    costDetailForm.value.welfare = temp?.welfare || "0";
    costDetailForm.value.keShangbao = sheBao?.keShangbao?.toString() || "0";
    costDetailForm.value.otherPayKe = temp?.otherPayKe || "0";
    costDetailForm.value.shiShangbao = sheBao?.shiShangbao?.toString() || "0";
    costDetailForm.value.otherPay = temp?.otherPay || "0";
    costDetailForm.value.canBao = (temp?.monthTax && temp?.jobType == '全职')? (Number(temp.monthTax || 0) * 0.015).toFixed(2) : "0";
    costDetailForm.value.chenbenTiaochaKe = temp?.chenbenTiaochaKe || "0";
    costDetailForm.value.chenbenTiaocha = temp?.chenbenTiaocha || "0";
    costDetailForm.value.manageChargeTax = temp?.manageChargeTax || "0";
    costDetailForm.value.manageChargeTaxMoney = temp?.manageChargeTaxMoney || "0";
    costDetailForm.value.manageChargeAfter = temp?.manageChargeAfter || "0";
    costDetailForm.value.zhuanChargeTax = temp?.zhuanChargeTax || "0";
    costDetailForm.value.zhuanChargeTaxMoney = temp?.zhuanChargeTaxMoney || "0";
    costDetailForm.value.moneyCahrgeTax = temp?.moneyCahrgeTax || "0";
    costDetailForm.value.zhuanChargeAfter = temp?.zhuanChargeAfter || "0";
    costDetailForm.value.totalCharge = temp?.totalCharge || "0";
    costDetailForm.value.manageChargeRate = temp?.manageChargeRate?.toString() || "0.0672";
    costDetailForm.value.zhuanChargeRate = temp?.zhuanChargeRate?.toString() || "0.0672";
    costDetailForm.value.otherPayKeStr = temp?.otherPayKeStr;
    otherPayKeArr.value = costDetailForm.value?.otherPayKeStr ? costDetailForm.value?.otherPayKeStr?.split(';')?.map(item => ({
      label: item.split(':')[0],
      value: Number(item.split(':')[1])
    })) : [] as LabelAndValueItem[];  
    costDetailForm.value.otherPayStr = temp?.otherPayStr;
    otherPayArr.value = costDetailForm.value?.otherPayStr ? costDetailForm.value?.otherPayStr?.split(';')?.map(item => ({
      label: item.split(':')[0],
      value: Number(item.split(':')[1])
    })) : [] as LabelAndValueItem[];  
    costDetailForm.value.chenbenTiaochaKeStr = temp?.chenbenTiaochaKeStr;
    chenbenTiaochaKeArr.value = costDetailForm.value?.chenbenTiaochaKeStr ? costDetailForm.value?.chenbenTiaochaKeStr?.split(';')?.map(item => ({
      label: item.split(':')[0],
      value: Number(item.split(':')[1])
    })) : [] as LabelAndValueItem[];  
    costDetailForm.value.chenbenTiaochaStr = temp?.chenbenTiaochaStr;
    chenbenTiaochaArr.value = costDetailForm.value?.chenbenTiaochaStr ? costDetailForm.value?.chenbenTiaochaStr?.split(';')?.map(item => ({
      label: item.split(':')[0],
      value: Number(item.split(':')[1])
    })) : [] as LabelAndValueItem[];  
    welfareKeArr.value = temp?.welfareList || [] as WelfareKeItem[];
  }
}
watch(costDetailFlag,() => {
  let gongZhaoGongShi = getOutsourcePersonPerformanceDetailGongShi.value[0]?.gongZhaoGongShi || "";
  if (outsourcePersonPerformanceDetail.value.recruitParty== "客户") {
      gongZhaoGongShi = getOutsourcePersonPerformanceDetailGongShi.value[0]?.keZhaoGongShi || ""
  }
  manageGongShiOptions.value = [{
    value: gongZhaoGongShi,
    label: gongZhaoGongShi,
  }];
  costDetailFormPerformanceDetail();
})
const costTotalke = computed(() => {
  return (Number(costDetailForm.value.monthTax || 0) + Number(costDetailForm.value.canBao || 0) + Number(costDetailForm.value.companyShebaoKe || 0) + Number(costDetailForm.value.companyYijinKe || 0) + Number(costDetailForm.value.welfareKe || 0) + Number(costDetailForm.value.keShangbao || 0) + Number(costDetailForm.value.otherPayKe || 0) + Number(costDetailForm.value.chenbenTiaochaKe || 0) + Number(costDetailForm.value.otherPay || 0)).toFixed(2);
})
const costTotal = computed(() => {
  return (Number(costDetailForm.value.monthTax || 0) + Number(costDetailForm.value.canBao || 0) + Number(costDetailForm.value.companyShebao || 0) + Number(costDetailForm.value.companyYijin || 0) + Number(costDetailForm.value.welfare || 0) + Number(costDetailForm.value.otherPay || 0) + Number(costDetailForm.value.shiShangbao || 0) + Number(costDetailForm.value.chenbenTiaocha || 0) + Number(costDetailForm.value.serviceMoney || 0)).toFixed(2);
})
const handleManageGongShiChange = (val: string) => {
  costDetailForm.value.manageGongShi = val;
  const rate = Number(val.split("*")[1]?.replace('%', '')) / 100;
  if(val.includes("员工福利")) {
    costDetailForm.value.manageChargeTax = (Number(costTotalke.value || 0) * rate).toFixed(2);
  } else {
    costDetailForm.value.manageChargeTax = ((Number(costTotalke.value || 0) - Number(costDetailForm.value.welfareKe || 0)) * rate).toFixed(2);
  }
  handleManageChargeRate();
}
const handleManageChargeRate = () => {
  //税前管理
  const total = Number(costTotalke.value || 0) + Number(costDetailForm.value.manageChargeTax || 0);
  const rateNum = Number(costDetailForm.value.manageChargeRate || 0);
  const after = total / (1 + rateNum);
  costDetailForm.value.manageChargeAfter = after.toFixed(2);
  //税金 = (成本总计 + 税前管理) * 税率
  costDetailForm.value.manageChargeTaxMoney = (total * rateNum).toFixed(2);
  //总营收费 = 成本总计 + 税前管理 + 税金
  costDetailForm.value.moneyCahrgeTax = (Number(total || 0) + Number(costDetailForm.value.manageChargeTaxMoney || 0)).toFixed(2);
  handleZhuanChargeTax();
}
const handleZhuanChargeTax = () => {
  const rate = Number(costDetailForm.value.zhuanChargeRate || 0);
  const after = Number(costDetailForm.value.zhuanChargeTax || 0) / (1 + rate);
  costDetailForm.value.zhuanChargeAfter = after.toFixed(2);
  //税前转换的税金 = 税前转换 * 税率
  costDetailForm.value.zhuanChargeTaxMoney = (Number(costDetailForm.value.zhuanChargeTax || 0) * rate).toFixed(2);
  //总收费 = 总营收费 + 税前转换 + 税前转换的税金
  costDetailForm.value.totalCharge = (Number(costDetailForm.value.moneyCahrgeTax || 0) + Number(costDetailForm.value.zhuanChargeTax || 0) + Number(costDetailForm.value.zhuanChargeTaxMoney || 0)).toFixed(2);
}
const handleClose = () => {
  costDetailFlag.value = false;
  costDetailForm.value = {} as ComprehensiveCostItem;
  chenbenTiaochaArr.value = [] as LabelAndValueItem[];
  chenbenTiaochaKeArr.value = [] as LabelAndValueItem[];
  otherPayArr.value = [] as LabelAndValueItem[];
  otherPayKeArr.value = [] as LabelAndValueItem[];
  welfareKeArr.value = [] as WelfareKeItem[];
}
const costDetailFormPerformanceDetailResult = () => {
  outsourcePersonPerformanceDetail.value.companyShebaoKe = costDetailForm.value.companyShebaoKe || "";
  outsourcePersonPerformanceDetail.value.companyShebao = costDetailForm.value.companyShebao || "";
  outsourcePersonPerformanceDetail.value.companyYijinKe = costDetailForm.value.companyYijinKe || "";
  outsourcePersonPerformanceDetail.value.welfareKe = costDetailForm.value.welfareKe || "";
  outsourcePersonPerformanceDetail.value.companyYijin = costDetailForm.value.companyYijin || "";
  outsourcePersonPerformanceDetail.value.welfare = costDetailForm.value.welfare || "";
  outsourcePersonPerformanceDetail.value.keShangbao = costDetailForm.value.keShangbao || "";
  outsourcePersonPerformanceDetail.value.otherPayKe = costDetailForm.value.otherPayKe || "";
  outsourcePersonPerformanceDetail.value.shiShangbao = costDetailForm.value.shiShangbao || "";
  outsourcePersonPerformanceDetail.value.otherPay = costDetailForm.value.otherPay || "";
  outsourcePersonPerformanceDetail.value.chenbenTiaochaKe = costDetailForm.value.chenbenTiaochaKe || "";
  outsourcePersonPerformanceDetail.value.chenbenTiaocha = costDetailForm.value.chenbenTiaocha || "";
  outsourcePersonPerformanceDetail.value.manageChargeTax = costDetailForm.value.manageChargeTax || "";
  outsourcePersonPerformanceDetail.value.manageChargeTaxMoney = costDetailForm.value.manageChargeTaxMoney || "";
  outsourcePersonPerformanceDetail.value.manageChargeAfter = costDetailForm.value.manageChargeAfter || "";
  outsourcePersonPerformanceDetail.value.zhuanChargeTax = costDetailForm.value.zhuanChargeTax || "";
  outsourcePersonPerformanceDetail.value.zhuanChargeTaxMoney = costDetailForm.value.zhuanChargeTaxMoney || "";
  outsourcePersonPerformanceDetail.value.moneyCahrgeTax = costDetailForm.value.moneyCahrgeTax || "";
  outsourcePersonPerformanceDetail.value.zhuanChargeAfter = costDetailForm.value.zhuanChargeAfter || "";
  outsourcePersonPerformanceDetail.value.totalCharge = costDetailForm.value.totalCharge || "";
  outsourcePersonPerformanceDetail.value.manageChargeRate = costDetailForm.value.manageChargeRate || "";
  outsourcePersonPerformanceDetail.value.zhuanChargeRate = costDetailForm.value.zhuanChargeRate || "";
  outsourcePersonPerformanceDetail.value.manageGongShi = costDetailForm.value.manageGongShi || "";
  outsourcePersonPerformanceDetail.value.offerOutSourceDetails = costOfferDetailsForm.value;
  outsourcePersonPerformanceDetail.value.otherPayKeStr = costDetailForm.value.otherPayKeStr || "";
  outsourcePersonPerformanceDetail.value.otherPayStr = costDetailForm.value.otherPayStr || "";
  outsourcePersonPerformanceDetail.value.chenbenTiaochaKeStr = costDetailForm.value.chenbenTiaochaKeStr || "";
  outsourcePersonPerformanceDetail.value.chenbenTiaochaStr = costDetailForm.value.chenbenTiaochaStr || "";
  outsourcePersonPerformanceDetail.value.welfareList = welfareKeArr.value || [];
}
const calcCost = () => {
  //const personInfo = getOutsourcePersonPerformanceDetailPersonInfo?.value[0];
  const totalFeeOneTax = Number(costDetailForm.value.manageChargeTax || 0);
  const totalFeeTwoTax = Number(costDetailForm.value.zhuanChargeTax || 0);
  const odsTotalMoney = totalFeeOneTax + totalFeeTwoTax;
  const rate = 1.0672;
  //console.log(costOfferDetailsForm.value);
  const calculateDetails = (configList) => {
      const newDetails: OfferDetailsItem[] = [];
      for (const config of configList) {
        const detail = costOfferDetailsForm?.value.filter(item => item.orderType === config.type)[0];
        if (!detail) continue;

        const isOutFlag1 = detail.outFlag === '1';
        const currentRate1 = isOutFlag1 ? config.rate1_out : config.rate1;
        
        // 计算含税金额
        detail.taxIncluded = (totalFeeOneTax * currentRate1 + totalFeeTwoTax * config.rate2).toFixed(2);
        
        // 计算money和ratio
        detail.money = (Number(detail.taxIncluded) / rate).toFixed(2);
        detail.ratio = (Number(detail.money) / odsTotalMoney).toString();
        detail.offerNum = (config.offerNum * Number(offerNumDetail.value)).toString();
        
        // 计算管理费1
        const manageChargeAfter = (parseFloat(totalFeeOneTax.toString() || "0") * currentRate1).toFixed(2);
        detail.manageChargeTax = manageChargeAfter;
        detail.manageChargeRate = (currentRate1 * 100) + '%';
        detail.manageChargeAfter = (parseFloat(manageChargeAfter) / 1.0672).toFixed(2);
        
        // 计算管理费2
        detail.zhuanChargeTax = (parseFloat(totalFeeTwoTax.toString() || "0") * config.rate2).toFixed(2);
        detail.zhuanChargeRate = (config.rate2 * 100) + '%';
        detail.zhuanChargeAfter = (parseFloat(totalFeeTwoTax.toString() || "0") * config.rate2 / 1.0672).toFixed(2) || '0';
        
        newDetails.push(detail);
      }
      return newDetails;
    };
  if (getHaveZhaoFlag.value === '有招') {
     /*
              有单独招聘费的收费模式:
                管理费:
                管理费 1:总服务费-用工成本 就是总管理费
                管理费 2:外包员工到期后转为客户员工产生的额外费用
              业绩划分:
                招聘费:80%划分给推荐顾问,10%划分给对接顾问,10%划分给开发顾问
                管理费 1:30%划分给开发顾问，30%划分给对接顾问，40%划分给后台服务团队
                管理费 2:25%划分给推荐顾问，25%划分给开发顾问、25%划分给对接顾问、25%划分给后台服务团队。
             */
    //招聘费用: 有招就是整个管理费
    //管理费1: 管理费 税后 管理费-转换收费
    //管理费2: 有招无招都是转换收费也就是实际收费 税后
    // 推顾税后: 管理费2:25%
    // 推顾税后: 招聘费用80%
    // 企顾税后: 管理费1:30% + 管理费2:25%
    // 企顾税后: 招聘费用10%
    // 服顾税后: 管理费1:40% + 管理费2:25%
    // 开顾税后: 管理费1:30% + 管理费2:25%
    // 定义计算配置
    const calcConfig = [
      { type: '1', rate1: 0, rate1_out: 0, rate2: 0.25, offerNum: 0 },
      { type: '2', rate1: 0.3, rate1_out: 0.3, rate2: 0.25, offerNum: 0 },
      { type: '3', rate1: 0.4, rate1_out: 0.4, rate2: 0.25, offerNum: 0 },
      { type: '4', rate1: 0.3, rate1_out: 0.3, rate2: 0.25, offerNum: 0 }
    ];
    costOfferDetailsForm.value = calculateDetails(calcConfig);
  } else {
    /*
              无单独招聘费的收费模式:
                管理费:
                管理费 1:总服务费-用工成本 就是总管理费
                管理费 2:外包员工到期后转为客户员工产生的额外费用
              业绩划分:
               管理费 1:46%划分给推荐顾问，18%划分给开发顾问，18%划分给对接顾问，18%划分给后台服务团队。
               管理费 2:25%划分给推荐顾问，25%划分给开发顾问、25%划分给对接顾问、25%划分给后台服务团队。
             */
    //管理费1: 管理费 税后
    //管理费2: 有招无招都是转换收费也就是实际收费 税后
    
    // 推顾税后: 管理费1:46% + 管理费2:25%
    //outFlag 是1时 分配是 管理费1:49%
    // 定义计算配置
    const calcConfig = [
      { type: '1', rate1: 0.46, rate1_out: 0.49, rate2: 0.25, offerNum: 0.5 },
      { type: '2', rate1: 0.18, rate1_out: 0.17, rate2: 0.25, offerNum: 0.063 },
      { type: '3', rate1: 0.18, rate1_out: 0.17, rate2: 0.25, offerNum: 0.063 },
      { type: '4', rate1: 0.18, rate1_out: 0.17, rate2: 0.25, offerNum: 0.063 }
    ];
    costOfferDetailsForm.value = calculateDetails(calcConfig);
  }
  //console.log(costOfferDetailsForm.value);
}
const updateWelfareKeTotalUpload = () => {
  if (welfareKeArr.value.length > 0) {
    outsourceDetailStore.addOutsourceWelfare(welfareKeArr.value);
  } else {
    outsourceDetailStore.deleteOutsourceWelfare(getOutsourcePersonPerformanceDetail.value[0]?.personId?.toString());
  }
}
const handleSubmit = () => {
  iconLoading.value = true;
  calcCost();
  outsourceDetailStore.addUpdateOutsourceCostDetail(costDetailForm.value).then(res => {
        if (res.code == 1) {
          updateWelfareKeTotalUpload();
          outsourceDetailStore.updateOutsourceDetail(costOfferDetailsForm.value).then(res => {
            if (res.code == 1) {
              message.success('操作成功');
              costDetailFormPerformanceDetailResult();
              costDetailFlag.value = false;
              iconLoading.value = false;
              outsourceDetailStore.queryOutsourceMonthSalaryOffer();
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
      })
}
</script>

<style lang="less" scoped>
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