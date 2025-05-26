<template>
  <MenuTop/>
  <div class="resume_container">
    <a-form ref="formRef" :model="formState" @finish="onFinish">
      <MappingListSearch :formState="formState"/>
    </a-form>
    <div class="resume-content">
      <a-row style="margin-bottom: 4px; justify-content: flex-end;">
        <a-button style="background-color: #eee;margin-left: 4px;" size="small">推荐申诉</a-button>
        <a-button style="background-color: #eee;margin-left: 4px;" size="small">LVMH</a-button>
        <a-button style="background-color: #eee;margin-left: 4px;" size="small">M审核</a-button>
      </a-row>
       <MappingListContent/>
    <a-row style="justify-content: end; margin-top: 10px">
          <a-pagination
            v-model:current="pagination.current"
            :pageSize="pagination.pageSize"
            @change="handleMappingListData"
            :total="pagination.total"
            :showSizeChanger="false"
            :showQuickJumper="true"
            :hideOnSinglePage="true"
            size="small"
            :show-total="(total) => `共 ${total} 条`"
          >
            <template #itemRender="{ type, originalElement }">
              <a v-if="type === 'prev'">上一页</a>
              <a v-else-if="type === 'next'">下一页</a>
              <component :is="originalElement" v-else></component>
            </template>
          </a-pagination>
        </a-row>
    </div>
  </div>
</template>
<script setup lang="ts">
import MenuTop from '/@/views/MenuTop/index.vue';
import { storeToRefs } from 'pinia';
import MappingListSearch from './components/MappingListSearch.vue';
import MappingListContent from './components/MappingListContent.vue';
import { SearchMappingCandidate } from '/@/api/mappingList/model';
import {useMappingListStoreWithOut} from '/@/store/modules/mappingList';
const mappingListStore = useMappingListStoreWithOut();
const { pagination } = storeToRefs(mappingListStore);
const formState = ref<SearchMappingCandidate>({} as SearchMappingCandidate);
const onFinish = () => {
    mappingListStore.queryMappingCandidate(formState.value);
}
const handleMappingListData = (current) => {
    pagination.value = { ...pagination.value, current };
    onFinish();
}
onFinish();
</script>
<style lang="less" scoped>
  .resume_container {
    max-width: 1920px;
    height: 92vh;
    background-color: #f5f5f5;
    overflow: hidden;
    padding: 10px;
    margin-top: 35px;
    overflow-y: auto;
    .resume-content {
    background-color: #fff;
    box-shadow: 0 0 2px #ccc;
    border-radius: 5px;
    overflow: hidden;
    padding: 20px;
  }
  }
</style>
