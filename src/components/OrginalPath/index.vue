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
    <img v-else :src="path" style="width: 770px;">
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
  pathType.value = props.orginalPathBlobPath.substring(props.orginalPathBlobPath.lastIndexOf("."));
  path.value = props.orginalPathBlobPath;
  watch(props,() =>{
    pathType.value = props.orginalPathBlobPath.substring(props.orginalPathBlobPath.lastIndexOf("."));
    path.value = props.orginalPathBlobPath;
  })
  const handleRendered = () => {
      console.log('Document rendered successfully');
    }
    const handleError = (error) => {
      console.error('Failed to render document:', error);
    }
  console.log(pathType.value);
</script>
