<template>
<div>
  <a-menu
      v-model:selectedKeys="state.selectedKeys"
      v-model:openKeys="state.openKeys"
      :inlineIndent="12"
      mode="inline"
      :items="items"
      @select="handleSelect"
    ></a-menu>
</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { outsourceDetailSider } = storeToRefs(outsourceDetailStore);
 const state = reactive({
    selectedKeys: ['1'],
    openKeys: ['1'],
  });
 const items = ref<{
  key: string;
  title: string;
  label: string;
  type: string;
 }[]>([]);
 const resumeMenu = ref([
    {
      key: '1',
      title: '外包人员',
      label: '',
      type: '',
    },
    {
      key: '2',
      title: '外包薪资',
      label: '',
      type: '',
    },
    {
      key: '3',
      title: '外包社保',
      label: '',
      type: '',
    },
    {
      key: '4',
      title: '月度薪资',
      label: '',
      type: '',
    },
 ]);
 
 const resumeMenuChange = () => {
    let resumeMenuTemp = [];
      resumeMenu.value.map((item) => {
       //@ts-ignore
          resumeMenuTemp.push({
            key: item.key,
            title: `${item.title} ${item.label}`,
            label: h('div', { class: state.selectedKeys.includes(item.key) ? 'resume-menu-title resume-menu-title-active' : 'resume-menu-title' }, [
              h('span', { class: 'resume-menu-title-content' }, item.title),
                h('span', { class: 'resume-menu-title-content-num' }, item.label),
              ]),
            type: item.type,
          });
      });
      items.value = resumeMenuTemp;
  }
  resumeMenuChange();
 const handleSelect = (key: object) => {
   //@ts-ignore
    state.selectedKeys = [key.key];
    //@ts-ignore
    outsourceDetailSider.value = key.key;
    resumeMenuChange();
  };
</script>

<style lang="less" scoped>
:deep(.resume-menu) {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: rgba(0, 0, 0, 0.88);
    font-size: 14px;
    line-height: 0;
    list-style: none;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
      'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
      'Noto Color Emoji';
    margin-bottom: 0;
    padding-inline-start: 0;
    outline: none;
    padding: 5px;
    transition: width 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;
  }
  :deep(.resume-menu-item) {
    height: 40px;
    line-height: 40px;
    padding-inline: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-inline: 4px;
    margin-block: 4px;
    width: calc(100% - 8px);
    margin: 0;
    white-space: nowrap;
    cursor: pointer;
    border-radius: 8px;
    box-sizing: border-box;
    padding: 0;
    transition: border-color 0.3s, background 0.3s,
      padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  :deep(.resume-menu-item:hover) {
    background-color: rgba(0, 0, 0, 0.06);
  }
  :deep(.resume-menu-title-one) {
    display: flex;
    justify-content: space-between;
    transition: border-color 0.3s, background 0.3s, padding 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
    font-weight: 600;
  }
  :deep(.resume-menu-item:hover .resume-menu-title-content-num),
  :deep(.resume-menu-item:hover .resume-menu-title-content) {
    background: none;
  }
  :deep(.resume-menu-item:hover .active .resume-menu-title-content-num) {
    color: #fff;
  }
  :deep(.resume-menu .active) {
    background-color: #4285f4;
    border-radius: 8px;
  }
  :deep(.resume-menu .active .resume-menu-title-content) {
    color: #fff;
  }
  :deep(.resume-menu .level) {
    font-weight: 700;
    padding-left: 4px;
  }
  :deep(.resume-menu-title) {
    display: flex;
    justify-content: space-between;
    transition: border-color 0.3s, background 0.3s, padding 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
    overflow: hidden;
    text-overflow: ellipsis;
    height: 40px;
    line-height: 40px;
    align-items: center;
  }
  :deep(.resume-menu-title-content-team),
  :deep(.resume-menu-title-content) {
    min-width: 0;
    overflow: hidden;
    height: 40px;
    line-height: 40px;
    text-overflow: ellipsis;
    opacity: 1;
    transition: opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), margin 0.3s, color 0.3s;
  }
  :deep(.resume-menu-title-content-team) {
    min-width: 160px;
  }
  :deep(.resume-menu-title-content-num) {
    background-color: #f1f0f0;
    padding: 0rem 0.03646rem;
    text-shadow: none;
    border-radius: 0.05208rem;
    display: inline-block;
    line-height: 1.5;
  }
  :deep(.resume-menu-item-only-child) {
    padding-left: 48px;
  }
  :deep(.resume-menu .resume-menu-item-divider) {
    overflow: hidden;
    line-height: 0;
    border-color: rgba(5, 5, 5, 0.06);
    border-style: solid;
    border-width: 0;
    border-top-width: 1px;
    margin-block: 1px;
    padding: 0;
  }
  :deep(.resume-menu-title-content-login-name) {
    width: 17px;
  }
  :deep( .resume-menu-title-content-svg) {
    width: 17px;
  }
  :deep(.resume-menu-title-sort-content-svg) {
    width: 32px;
  }
  :deep(.resume-menu-title-sort-content-svg svg),
  :deep(.resume-menu-title-content-login-name svg),
  :deep(.resume-menu-title-content-svg svg){
    width: 15px;
    height: 15px;
    margin-top: 10px;
  }
  :deep(.ant-menu-light .ant-menu-item-selected) {
    background-color: inherit;
  }

  :deep(.ant-menu-submenu-title:has(.resume-menu-title-active)) {
    position: relative;
    transition: border-color 0.3s, background 0.3s, padding 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  :deep(.ant-menu-submenu-title:has(.resume-menu-title-active)::after) {
    content: '';
    position: absolute;
    top: 0px;
    right: 2px;
    width: 280px;
    height: 40px;
    border: 2px solid #0052cb;
  }
  :deep(.ant-menu-submenu-title:has(.resume-menu-title-active)::before) {
    content: '';
    background-image: url("/@/assets/images/2.png");
    position: absolute;
    width: 16px;
    height: 16px;
    bottom: 1px;
    right: 3px;
    background-size: cover;
  }
  :deep(.ant-menu-item:has(.resume-menu-title-active)) {
    position: relative;
    transition: border-color 0.3s, background 0.3s, padding 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  :deep(.ant-menu-item:has(.resume-menu-title-active)::after) {
    content: '';
    position: absolute;
    top: 0px;
    right: 2px;
    width: 280px;
    height: 40px;
    border: 2px solid #0052cb;
  }
  :deep(.ant-menu-item:has(.resume-menu-title-active)::before) {
    content: '';
    background-image: url("/@/assets/images/2.png");
    position: absolute;
    width: 16px;
    height: 16px;
    bottom: 1px;
    right: 3px;
    background-size: cover;
  }
  
</style>