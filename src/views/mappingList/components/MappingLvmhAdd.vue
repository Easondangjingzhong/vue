<template>
    <a-drawer
    v-model:open="mappingLvmhAddFlag"
    title="新增"
    :maskClosable="false"
    :keyboard="false"
    :closable="false"
    :width="drawerWidth"
    :bodyStyle="{ padding: '10px' }"
    :headerStyle="{ padding: '5px 18px 5px 12px' }"
    placement="right"
  >
    <template #extra>
      <CloseOutlined @click="handleColseMappingLvmhAdd" />
    </template>
  <a-form ref="formRef"  :label-col="{ span: 6 }" :model="formState" @finish="onFinish">
  <div class="resume-content">
    <a-row :gutter="24">
      <a-col :span="12">
        <a-form-item name="brands" label="品牌" :rules="[{ required: true, message: '请选择品牌' }]">
           <a-select
              optionFilterProp="label"
              v-model:value="formState.brands"
              :options="optionsBrands"
              placeholder="请选择品牌"
            ></a-select>
        </a-form-item>
        </a-col>
         <a-col :span="6" class="row_col_space">
        <a-form-item name="userName" class="row_col_space_left" label="姓名" :rules="[{ required: true, message: '请输入名称' }]">
          <a-input v-model:value="formState.userName" placeholder="请输入名称" />
        </a-form-item>
         <a-form-item name="userXing" class="row_col_space_right" :rules="[{ required: true, message: '请输入姓氏' }]">
          <a-input v-model:value="formState.userXing" placeholder="请输入姓氏" />
        </a-form-item>
        </a-col>
         <a-col :span="6">
        <a-form-item
            name="sex"
            label="性别"
            :rules="[{ required: true, message: '请选择性别' }]"
          >
            <a-radio-group
              v-model:value="formState.sex"
              :options="genderOptions"
            ></a-radio-group>
          </a-form-item>
        </a-col>
    </a-row>   
     <a-row :gutter="24">
          <a-col :span="12">
        <a-form-item name="edu" label="学历" :rules="[{ required: true, message: '请选择学历' }]">
           <a-select
              optionFilterProp="label"
              v-model:value="formState.edu"
              :options="optionsEdu"
              placeholder="请选择学历"
            ></a-select>
        </a-form-item>
        </a-col>
        <a-col :span="12">
         <a-form-item name="major" label="专业" :rules="[{ required: true, message: '请输入专业' }]">
          <a-input v-model:value="formState.major" placeholder="请输入专业" />
        </a-form-item>
        </a-col>
    </a-row> 
    <a-row :gutter="24">
        <a-col :span="12">
         <a-form-item name="hangJingYan" label="行业经验" :rules="[{ required: true, message: '请输入行业经验' }]">
          <a-slider v-model:value="formState.hangJingYan" :tooltip-open="true" :min="1" :max="30"/>
        </a-form-item>
        </a-col>
        <a-col :span="12">
         <a-form-item name="brandJingYan" label="当前经验" :rules="[{ required: true, message: '请输入当前经验' }]">
          <a-slider v-model:value="formState.brandJingYan" :tooltip-open="true" :min="1" :max="30"/>
        </a-form-item>
        </a-col>
    </a-row>    
    <a-row :gutter="24">     
         <a-col :span="12">
        <a-form-item name="workPlace" label="工作地点" :rules="[{ required: true, message: '请选择工作地点' }]">
           <a-select
              optionFilterProp="label"
              v-model:value="formState.workPlace"
              :options="optionsEdu"
              placeholder="请选择工作地点"
            ></a-select>
        </a-form-item>
        </a-col>
         <a-col :span="12">
        <a-form-item name="positionId" label="当前职位" :rules="[{ required: true, message: '请选择当前职位' }]">
           <a-select
              optionFilterProp="label"
              v-model:value="formState.positionId"
              :options="optionsEdu"
              placeholder="请选择当前职位"
            ></a-select>
        </a-form-item>
        </a-col>
    </a-row> 
    <a-row :gutter="24">
      <a-col :span="12">
        <a-form-item name="phone" label="电话" :rules="[{ required: false, message: '请输入电话' }]">
          <a-input v-model:value="formState.phone" placeholder="请输入电话" />
        </a-form-item>
        </a-col>
         <a-col :span="12">
        <a-form-item name="wechat" label="微信" :rules="[{ required: false, message: '请输入微信' }]">
          <a-input v-model:value="formState.wechat" placeholder="请输入微信" />
        </a-form-item>
        </a-col>
    </a-row> 
    <a-row :gutter="24">
      <a-col :span="12">
        <a-form-item
            name="isLv"
            label="曾经LVMH工作"
            :rules="[{ required: true, message: '请选择曾经LVMH工作' }]"
          >
            <a-radio-group
              v-model:value="formState.isLv"
              :options="isLvOptions"
            ></a-radio-group>
          </a-form-item>
          </a-col>
           <a-col :span="12">
        <a-form-item
            name="isCity"
            label="是否可迁城市"
            :rules="[{ required: true, message: '请选择是否可迁城市' }]"
          >
            <a-radio-group
              v-model:value="formState.isCity"
              :options="isCityOptions"
            ></a-radio-group>
          </a-form-item>
          </a-col>
    </a-row> 
  </div>
  </a-form>
  </a-drawer>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { CloseOutlined } from '@ant-design/icons-vue';
import {useMappingListStoreWithOut} from '/@/store/modules/mappingList';
const mappingListStore = useMappingListStoreWithOut();
const {mappingLvmhAddFlag} = storeToRefs(mappingListStore);
const drawerWidth = ref(800);
const optionsBrands = ref([
    { label: 'Brunello Cucinelli', value: 'Brunello Cucinelli' },
    { label: 'Chanel', value: 'Chanel' },
    { label: 'Hermes', value: 'Hermes' },
    { label: 'Gucci', value: 'Gucci' },
    { label: 'Prada', value: 'Prada' },
    { label: 'Burberry', value: 'Burberry' },
    { label: 'Van Cleef&Arpels', value: 'Van Cleef&Arpels' },
    { label: 'Cartier', value: 'Cartier' },
    { label: 'Saint Laurent', value: 'Saint Laurent' },
    { label: 'Balenciaga', value: 'Balenciaga' },
    { label: 'Bottega Veneta', value: 'Bottega Veneta' },
    { label: 'MIU MIU', value: 'MIU MIU' },
    { label: 'Dolce&Gabbana', value: 'Dolce&Gabbana' },
    { label: 'Valentino', value: 'Valentino' },
    { label: 'Zegna', value: 'Zegna' },
    { label: 'Ferragamo', value: 'Ferragamo' },
    { label: 'Armani', value: 'Armani' },
    { label: 'Ralph Lauren', value: 'Ralph Lauren' },
    { label: 'Coach', value: 'Coach' },
    { label: 'Tory Burch', value: 'Tory Burch' },
    { label: 'MCM', value: 'MCM' },
    { label: 'Lululemon', value: 'Lululemon' },
    { label: 'Maison Margiela', value: 'Maison Margiela' },
    { label: 'Zara', value: 'Zara' },
    { label: 'Massimo Dutti', value: 'Massimo Dutti' },
    { label: 'Uniqlo', value: 'Uniqlo' },
    { label: 'Tesla', value: 'Tesla' },
    { label: 'Lamer', value: 'Lamer' },
    { label: 'Estee Lauder', value: 'Estee Lauder' },
    { label: 'HR(赫莲娜)', value: 'HR(赫莲娜)' },
    { label: 'Chanel Beauty', value: 'Chanel Beauty' },
    { label: 'Celine', value: 'Celine' },
    { label: 'Loewe', value: 'Loewe' },
    { label: 'Fendi', value: 'Fendi' },
    { label: 'Dior', value: 'Dior' },
    { label: 'Giada', value: 'Giada' },
    { label: '之禾', value: '之禾' },
    { label: 'Lancrawford', value: 'Lancrawford' },
    { label: '迪卡侬', value: '迪卡侬' },
  ]);
 const genderOptions = ref([
    { label: '男士', value: 'M' },
    { label: '女士', value: 'F' },
  ]);
   const optionsEdu = ref([
    { label: 'Bachelor', value: 'Bachelor' },
    { label: 'Junior College', value: 'Junior College' },
    { label: 'Master', value: 'Master' },
  ]);
  const isLvOptions = ref([
    { label: '是', value: 'Y' },
    { label: '否', value: 'N' },
  ]);
  const isCityOptions = ref([
    { label: '是', value: 'Y' },
    { label: '否', value: 'N' },
  ]);
interface SearchMappingLvmhAdd {
  brands?: string;
  userName?: string;
  userXing?: string;
  sex?: string;
  edu?: string;
  major?: string;
  hangJingYan?: number;
  brandJingYan?: number;
  workPlace?: string;
  positionId?: string;
  phone?: string;
  wechat?: string;
  isLv?: string;
  isCity?: string;
}
const formState = ref<SearchMappingLvmhAdd>({} as SearchMappingLvmhAdd);

const handleColseMappingLvmhAdd = () => {
  mappingListStore.handleMappingLvmhAddFlag(); 
}
const onFinish = () => {
  mappingListStore.queryMappingLvmhList(formState.value);
}
</script>
<style lang="less" scoped>
  .resume-content,
  .resume-content-search {
    background-color: #fff;
    box-shadow: 0 0 2px #ccc;
    border-radius: 5px;
    overflow: hidden;
    padding: 20px;
  }
  .resume-content-search {
    margin-bottom: 10px;
    padding-bottom: 9px;
  }
  .resume-content-search .ant-form-item {
    margin-bottom: 10px !important;
  }
  :deep(.row_col_space) {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-left: 10%;
  }
  :deep(.row_col_space_right) {
    width: 55%;
  }
  :deep(.row_col_space_right .ant-input) {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }
  :deep(.row_col_space_left) {
    width: 110%;
    margin-inline-end: -1px;
  }
  :deep(.row_col_space_left .ant-form-item-row .ant-form-item-label) {
    display: contents;
  }
  :deep(.row_col_space_left .ant-input) {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
    height: auto;
  }
</style>