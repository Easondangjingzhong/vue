<template>
  <div class="resume-content-search">
    <a-row :gutter="24">
       <a-col :span="spanCol">
        <a-form-item
            name="userName"
            label="姓名"
          >
            <a-input
              v-model:value="formState.userName"
            />
          </a-form-item>
      </a-col>
      <a-col :span="spanCol">
        <a-form-item
            name="phone"
            label="手机"
          >
            <a-input
              v-model:value="formState.phone"
            />
          </a-form-item>
      </a-col>
       <a-col :span="spanCol">
        <a-form-item
            name="city"
            label="城市"
          >
          <a-select
              optionFilterProp="label"
              v-model:value="formState.city"
              :options="optionsCity"
              @change="handleOptionsCity"
              :showArrow="false"
            ></a-select>
          </a-form-item>
      </a-col>
       <a-col :span="spanCol">
        <a-form-item
            name="market"
            label="商场"
          >
            <a-input
              v-model:value="formState.market"
            />
          </a-form-item>
      </a-col>
      <a-col :span="spanCol">
        <a-form-item
            name="brand"
            label="品牌"
          >
            <a-input
              v-model:value="formState.brand"
            />
          </a-form-item>
      </a-col>
      <a-col :span="spanCol">
        <a-form-item
            name="communicate"
            label="当状"
          >
            <a-input
              v-model:value="formState.communicate"
            />
          </a-form-item>
      </a-col>
    </a-row>
     <a-row :gutter="24">
       <a-col :span="spanCol">
        <a-form-item
            name="positionsIds"
            label="当职"
          >
           <a-select
              optionFilterProp="label"
              v-model:value="formState.positionsIds"
              :options="optionsCity"
              @change="handleOptionsCity"
              :showArrow="false"
            ></a-select>
          </a-form-item>
      </a-col>
      <a-col :span="spanCol">
        <a-button style="margin: 0 0 0 8px" type="primary" html-type="submit">搜索</a-button>
          <a-button style="margin: 0 8px">清空</a-button>
          <a-button style="margin: 0 8px 0 0" @click="handleAddNewCandidate">新增</a-button>
      </a-col>
    </a-row>
  </div>
</template>
<script setup lang="ts">
import { SearchMappingCandidate } from '/@/api/mappingList/model';
import {useMappingListStoreWithOut} from '/@/store/modules/mappingList';
const mappingListStore = useMappingListStoreWithOut();
defineProps<{ formState: SearchMappingCandidate }>();
let spanCol = 4;
const optionsCity = ref([
    { label: '北京', value: '北京' },]);
const handleOptionsCity = (value: string) => {
    
}
const handleAddNewCandidate = () => {
    mappingListStore.handleMappingCandidateFlag();
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
</style>