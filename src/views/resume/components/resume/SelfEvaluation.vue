<template>
  <div>
    <a-card class="resume_card">
      <h3>自我评价</h3>
      <a-divider style="height: 1px; background-color: #ccc" dashed/>
      <a-row>
        <a-col class="resume_self">
        <a-form-item
          name="selfEvaluation"
         >
         <a-textarea :rows="7" v-model:value="selfEvaluationData.selfEvaluation" placeholder="请输入自我评价"></a-textarea>
        </a-form-item>
      </a-col>
    </a-row>
    </a-card>
  </div>
</template>
<script lang="ts" setup>
  import { defineProps } from 'vue';
  defineProps({
    selfEvaluationData: {
      type: Object,
      required: true,
    },
  });
</script>
<style scoped>
  .resume_self{
    width: 995px;
  }
</style>