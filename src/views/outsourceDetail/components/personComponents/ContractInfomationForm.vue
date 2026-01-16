<template>
 <a-drawer
    v-model:open="contractInfomatiomFlag"
    title="合同签署"
    :maskClosable="false"
    :keyboard="false"
    :closable="false"
    :width="drawerWidth"
    :bodyStyle="{ padding: '4px 14px' }"
    :headerStyle="{ padding: '5px 18px 5px 12px' }"
    placement="right"
  >
    <template #extra>
      <CloseOutlined @click="closeDrawer" />
    </template>
    <div>
      <a-form :model="contractInfomatiomForm" :label-col="labelCol"  @finish="handleSubmit">
        <a-row :gutter="24">
          <a-col :span="12">
           <a-form-item label="模板公司" name="contractCompany">
            <a-select
              v-model:value="contractInfomatiomForm.contractCompany"
              :options="contractCompanyOptions"
              @change="handleChangeCompany"
              placeholder="请选择模板公司"
            />
            </a-form-item>
          </a-col>
          <a-col :span="12">
           <a-form-item label="合同模板" name="signTemplate">
            <a-select
              v-model:value="contractInfomatiomForm.signTemplate"
              :options="getEsignTemplateList"
              @change="handleChangeSignTemplate"
              placeholder="请选择合同模板"
            />
            </a-form-item>
          </a-col>
          <a-col :span="12">
           <a-form-item label="经办人手机" name="psnAccount">
            <a-input v-model:value="contractInfomatiomForm.psnAccount" @change="handleChangePsnAccount"/>
            </a-form-item>
          </a-col>
        </a-row>
          <a-row :gutter="24">
            <a-col :span="12" v-if="componentsShow?.length > 0" v-for="item in componentsShow" :key="item.componentId">
              <a-form-item :label="item.label" :name="item.componentProps" :key="item.componentProps" v-if="item.componentName !== '骑缝章' && item.componentName !== '签署区'">
                <a-date-picker v-if="item.componentType === 3" v-model:value="contractInfomatiomForm[item.componentProps]" value-format="YYYY-MM-DD"/>
                <a-input-number v-else-if="item.componentType === 2" v-model:value="contractInfomatiomForm[item.componentProps]" style="width: 100%"/>
                <a-input v-else v-model:value="contractInfomatiomForm[item.componentProps]"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
          <a-col :span="24" style="text-align: right;">
            <a-button type="primary" :loading="iconLoading" html-type="submit">
              保存
            </a-button>
            <a-button style="margin-left: 10px" @click="closeDrawer">
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
import { debounce } from 'lodash-es';
import { CloseOutlined } from '@ant-design/icons-vue';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { contractInfomatiomFlag, getEsignTemplateList, getEsignTemplateDetail, contractInfomationFormTemp, getEsignTemplatePsnAccount} = storeToRefs(outsourceDetailStore);
const drawerWidth = ref(Math.max(600, window.innerWidth * 0.6));
const labelCol = { style: { width: '85px' } };
const iconLoading = ref(false);
const closeDrawer = () => {
  components.value = [];
  contractInfomatiomFlag.value = false;
  contractInfomatiomForm.value = {
  contractCompany: '',
  signTemplate: '',
  psnAccount: '',
  };
  outsourceDetailStore.queryEsignTemplateDetail('','');
}

const contractInfomatiomForm = ref({
  contractCompany: '',
  signTemplate: '',
  psnAccount: '',
})
const contractCompanyOptions = ref([
  {
    label: '北京博瑞',
    value: '北京博瑞智捷企业咨询有限公司',
  },
  {
    label: '北京我推',
    value: '北京我推天下信息技术有限公司',
  },
  {
    label: '天津优态',
    value: '天津优态信息技术有限公司',
  },
  {
    label: '淮北博瑞',
    value: '淮北博瑞智捷信息技术有限公司',
  },
  {
    label: '徐州我推',
    value: '徐州我推信息技术有限公司',
  },
  {
    label: '淮北博推',
    value: '淮北博推信息技术有限公司',
  },
  {
    label: '锐特精英',
    value: '锐特精英(苏州)企业咨询有限公司',
  },
  {
    label: '北京博瑞(南京分公司)',
    value: '北京博瑞智捷企业咨询有限公司南京分公司',
  },
  {
    label: '合肥优态',
    value: '合肥优态信息技术有限公司',
  },
  {
    label: '天津博瑞',
    value: '天津博瑞智捷信息技术有限公司',
  },
  {
    label: '蚌埠博瑞',
    value: '蚌埠博瑞智捷信息技术有限公司',
  },
  {
    label: '淮北优态',
    value: '淮北优态信息科技有限公司',
  },
])
interface componentItem {
  fileId: string,
  componentId: string,
  componentName: string,
  componentType: number,
  label: string,
  componentProps: string,
  componentValue: number | string,
}
const components = ref<componentItem[]>([])
watch(getEsignTemplateDetail, () => {
  components.value = getEsignTemplateDetail.value?.participants?.filter(item => (item.participantFlag === '签署方1' || item.participantFlag === '公司'))[0]?.components.map(item => {
    const fieldName =  item.componentId;
    return {
      fileId: item.fileId,
      componentId: item.componentId,
      componentName: item.componentName,
      componentType: item.componentType,
      label: item.componentName,
      componentProps: fieldName,
      componentValue: contractInfomationFormTemp.value[item.componentName] || '',
    }
  })
})
const componentsShow = computed(() => {
   // 首先过滤掉不需要的组件
  const filteredComponents = components.value?.filter(item => item?.componentName !== '骑缝章' && item?.componentName !== '签署区');
  // 使用Map进行去重，确保相同componentName只保留一个
  const uniqueComponentsMap = new Map();
  filteredComponents?.forEach(item => {
    // 只保留第一个遇到的相同componentName的组件
    if (!uniqueComponentsMap.has(item?.componentName)) {
      contractInfomatiomForm.value[item?.componentProps] = contractInfomationFormTemp.value[getControlField(item?.componentName)] || '';
      console.log(getControlField(item?.componentName));
      uniqueComponentsMap.set(item?.componentName, item);
    }
  });
  // 将Map转换回数组
  return Array.from(uniqueComponentsMap.values());
});
// const getControlComponent = (type) => {
//   const typeMap = {
//     1: 'input',          // 文本
//     2: 'input',          // 数字
//     3: 'input',         // 日期
//     6: 'input',          // 普通签署区 - 使用文本域
//     8: 'input',         // 多行文本
//     9: 'input',         // 复选
//     10: 'input',        // 单选
//     11: 'input',        // 图片
//     14: 'input',        // 下拉选择控件
//     15: 'input',          // 勾选框控件
//     16: 'input',         // 身份证控件
//     17: 'input',         // 备注签署区
//     18: 'input',         // 动态表格
//     19: 'input'          // 手机号
//   };
//   return typeMap[type] || 'input';
// };
const getControlField = (type) => {
  const typeMap = {
    '姓名': 'userNameCn',
    '联系电话': 'phoneNumber',
    '性别': 'sex',
    '手机': 'phoneNumber',
    '身份证号': 'idCard',
    '邮箱': 'email',
    '工作城市': 'city',
    '公司名称': 'companyName',
    '岗位名称': 'positions',
    '职位名称': 'positions',
    '合同开始日期': 'realEntryTime',
    '部门': 'department',
    '签署日期': 'signDate',
    '合同编号': 'contractNo',
    '合同金额': 'contractAmount',
    '合同条款': 'contractClause',
    '备注': 'remark',
    '户口所在地': 'documentAddress',
    '实际居住地': 'livingAddress',
  };
  return typeMap[type] || '';
};

const handleChangeCompany = (value) => {
  contractInfomatiomForm.value.contractCompany = value;
  outsourceDetailStore.queryEsignTemplateList(value);
}
const handleChangeSignTemplate = (value) => {
  contractInfomatiomForm.value.signTemplate = value;
  outsourceDetailStore.queryEsignTemplateDetail(contractInfomatiomForm.value.contractCompany,value);
}
const handleChangePsnAccount = debounce(() => {
  outsourceDetailStore.handleChangePsnAccount(contractInfomatiomForm.value.contractCompany,contractInfomatiomForm.value.psnAccount);
},1000);
const componentsReal= () => {
  // 首先，找出所有组件中每个componentName对应的有效值
  const valueMap = new Map();
  
  // 第一轮遍历：收集每个componentName的有效值
  components.value.forEach(item => {
    const currentValue = contractInfomatiomForm.value[item.componentProps];
    
    // 如果当前组件没有componentName，跳过（或者可以设置默认值）
    if (!item.componentName) return;
    
    // 如果当前值有效，或者该componentName还没有有效值，则更新valueMap
    if (currentValue && currentValue !== '') {
      valueMap.set(item.componentName, currentValue);
    }
  });
  
  // 第二轮遍历：保留所有组件，但确保相同componentName的值一致
  return components.value.filter(item => item.componentName !== '骑缝章' && item.componentName !== '签署区').map(item => {
    // 获取该componentName应该使用的一致值
    const consistentValue = item.componentName ? valueMap.get(item.componentName) : null;
    
    // 如果存在一致值，则使用一致值；否则使用原始值
    let finalValue = consistentValue !== undefined ?  consistentValue: contractInfomatiomForm.value[item.componentProps] || '0';
    if (item.componentType === 3) {
      finalValue = finalValue.replace(/(\d{1,4})-(\d{1,2})-(\d{1,2})/, '$1年$2月$3日');
    }
    return {
      fileId: item.fileId,
      componentId: item.componentId,
      componentName: item.componentName,
      componentValue: finalValue
    };
  });
}
const handleSubmit = () => {
  iconLoading.value = true;
  // 构建提交数据结构
  const submitData = {
    personId: contractInfomationFormTemp.value.id,
    ruCompanyName: contractInfomatiomForm.value.contractCompany,
    requestParam: {
      participants: [
      {
        participantId: getEsignTemplateDetail.value?.participants?.filter(item => (item.participantFlag === '签署方1' || item.participantFlag === '公司'))[0]?.participantId || '',
        orgParticipant: {
          orgId: getEsignTemplateDetail.value.orgId || '',
          transactor: {
            transactorPsnId: getEsignTemplatePsnAccount.value.psnId || '',
          }
        },
      },
      {
        participantId: getEsignTemplateDetail.value?.participants?.filter(item => (item.participantFlag === '签署方2' || item.participantFlag === '员工'))[0]?.participantId || '',      
        psnParticipant: {
          psnAccount: componentsReal().find(item => item.componentName === '联系电话' || item.componentName === '电话' || item.componentName === '手机号' || item.componentName === '手机')?.componentValue || '',
          psnName: componentsReal().find(item => item.componentName === '姓名')?.componentValue || '',
          psnIDCardNum: componentsReal().find(item => item.componentName === '身份证号')?.componentValue || '',
        }
      }
    ],
    signFlowConfig: {
    signFlowTitle: getEsignTemplateList.value?.find(item => item.value === contractInfomatiomForm.value.signTemplate)?.label +"-"+ componentsReal().find(item => item.componentName === '姓名')?.componentValue,
    autoFinish: true,
    autoStart: true,
    signConfig: {
      autoFillAndSubmit: true,
      editComponentValue: false,
    },
    noticeConfig: {
      noticeTypes: "1"
    },
    authConfig: {
      psnAvailableAuthModes: [
        "PSN_MOBILE3",
        "PSN_FACE",
        "PSN_BANKCARD4"
      ],
      orgAvailableAuthModes: [
        "ORG_BANK_TRANSFER",
        "ORG_LEGALREP",
        "ORG_LEGALREP_AUTHORIZATION",
        "ORG_ALIPAY_CREDIT"
      ]
    },
    },
      signTemplateId: contractInfomatiomForm.value.signTemplate,
      // 收集动态生成的字段值
      components: componentsReal(),
    }
  };
  console.log('提交的数据:', submitData);
  outsourceDetailStore.queryEsignTemplateBySign(submitData).then(res => {
    if (res.code == 1) {
      if (res.info.code === 0) {
        //let signFlowId = res.info.data.signFlowId || '';
        closeDrawer();
        message.success('发起签署成功');
      } else {
        message.error(res.info.message || '发起签署失败');
      }
      iconLoading.value = false;
    }
  });
}
</script>

<style lang="less" scoped>
  :deep(.row_col_space) {
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding-right: 6px;
  }
  :deep(.row_col_space_left) {
    width: 65%;
    margin-inline-end: -2px;
  }
  :deep(.row_col_space_right) {
    width: 36%;
  }
  
  :deep(.row_col_space_right .ant-input) {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }
   :deep(.row_col_space_left .ant-input) {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }
</style>