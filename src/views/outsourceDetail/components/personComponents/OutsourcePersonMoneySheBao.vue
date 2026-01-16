<template>
    <a-table
        size="small"
        :pagination="false"
      >
    </a-table>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
</script>

<style lang="less" scoped>
</style>
