<template>
  <template>
    <vue-office-docx
      v-if="pathType == '.docx'"
        :src="path"
        style="height: 100vh;"
    />
    <vue-office-pdf
      v-else-if="pathType == '.pdf'"
        :src="path"
        style="height: 100vh;"
    />
    <img v-else :src="path">
  </template>
</template>
<script lang="ts" setup>
import VueOfficeDocx from '@vue-office/docx'
import VueOfficePdf from '@vue-office/pdf'
import '@vue-office/docx/lib/index.css'
  const props = defineProps({
    orginalPath: {
      type: String,
      default: '',
    },
  });
  const path = ref('');
  const pathType = ref('');
  path.value = props.orginalPath;
  pathType.value = path.value.substring(path.value.lastIndexOf("."));
  //console.log(pathType.value);
</script>
