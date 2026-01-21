<template>
 <a-drawer
    v-model:open="orginalPathBlobPathFlag"
    :title="getOrginalPathBlobType"
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
      <OrginalPath :orginalPathBlobPath="getOrginalPathBlobPath" />
    </div>
  </a-drawer>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import OrginalPath from '/@/components/OrginalPath/index.vue';
import { CloseOutlined } from '@ant-design/icons-vue';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { orginalPathBlobPathFlag, orginalPathBlobPath, getOrginalPathBlobPath, getOrginalPathBlobType } = storeToRefs(outsourceDetailStore);
const drawerWidth = ref(Math.max(600, window.innerWidth * 0.6));
const closeDrawer = () => {
  orginalPathBlobPathFlag.value = false;
  orginalPathBlobPath.value = '';
}
</script>

<style lang="less" scoped>

</style>