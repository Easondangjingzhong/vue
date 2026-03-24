<template>
  <div v-if="path" class="orginal-path-root" @wheel="handleWheel">
    <vue-office-docx
      v-if="pathType == '.docx' || pathType == '.doc'"
      :src="path"
      style="height: 100%;"
      @rendered="handleRendered"
      @error="handleError"
    />
    <vue-office-pdf v-else-if="pathType == '.pdf'" :src="path" style="height: 100%;" />
    <vue-office-excel
      v-else-if="pathType == '.xlsx' || pathType == '.xls'"
      :src="path"
      style="height: 100%;"
      @rendered="handleRendered"
      @error="handleError"
    />
    <img v-else :src="path" style="width: 600px;" />
  </div>
</template>
<script lang="ts" setup>
import VueOfficeDocx from '@vue-office/docx'
import VueOfficePdf from '@vue-office/pdf'
import VueOfficeExcel from '@vue-office/excel'
import '@vue-office/excel/lib/index.css'
import '@vue-office/docx/lib/index.css'
//import '@vue-office/pdf/lib/index.css'
  const props = defineProps({
    orginalPathBlobPath: {
      type: String,
      default: '',
    },
  });
  //const path = ref(null);
  const pathType = ref('');
  const path = ref('');
  pathType.value = computed(() => props.orginalPathBlobPath.substring(props.orginalPathBlobPath.lastIndexOf("."))).value;
  path.value = computed(() => props.orginalPathBlobPath).value;
  watch(props,() =>{
    pathType.value = computed(() => props.orginalPathBlobPath.substring(props.orginalPathBlobPath.lastIndexOf("."))).value;
    path.value = computed(() => props.orginalPathBlobPath).value;
  })
  const handleRendered = () => {
      console.log('Document rendered successfully');
    }
    const handleError = (error) => {
      console.error('Failed to render document:', error);
    }
  const handleWheel = (e: WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
    }
  };
  console.log(pathType.value);
</script>
<style lang="less" scoped>
.orginal-path-root {
  height: calc(100vh - 120px);
  overflow: auto;
}

:deep(.vue-office-pdf) {
  height: 100% !important;
}

:deep(.vue-office-excel) {
  height: 100% !important;
}

:deep(.x-spreadsheet) {
  height: 100% !important;
}
</style>
