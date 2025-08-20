<template> 
  <template v-if="path">
    <vue-office-docx
      v-if="pathType == '.docx' || pathType == '.doc'"
        :src="path" @rendered="handleRendered" @error="handleError"
    />
    <vue-office-pdf
      v-else-if="pathType == '.pdf'"
        :src="path"
    />
    <img v-else :src="path" style="width: 600px;">
  </template>
</template>
<script lang="ts" setup>
import VueOfficeDocx from '@vue-office/docx'
import VueOfficePdf from '@vue-office/pdf'
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
  console.log(pathType.value);
</script>
<style lang="less" scoped>
/* 子组件继承父容器高度 */
.vue-office-pdf {
  height: 100% !important;
}
</style>
