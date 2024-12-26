<template>
  <div>
    <!-- <ul class="resume-menu">
      <li @click="handleSelect(item.key)" v-for="item in resumeMenu" :key="item.key" :class="[item.divider ? 'resume-menu-item-divider' : 'resume-menu-item']">
        <div v-if="!item.divider" :class="[item.key === state.selectedKeys ? 'active' : '',
        item.level === 1 ? 'level' : '',
         'resume-menu-title']">
          <span class="resume-menu-title-content">{{ item.title }}</span>
          <span v-if="item.label" class="resume-menu-title-content-num">{{ item.label }}</span>
        </div>
        <ul class="resume-menu" v-if="!item.divider && item.children && item.children?.length > 0">
          <li
            v-for="subItem in item.children"
            :key="subItem.key"
            :class="[subItem.key === state.selectedKeys ? 'active' : '', 'resume-menu-item']"
            @click="handleSelect(subItem.key)"
          >
            <span class="resume-menu-item-content">{{ subItem.title }}</span>
            <span class="resume-menu-item-content">{{ subItem.label }}</span>
          </li>
        </ul>
      </li>
    </ul> -->
    <a-menu
      v-model:selectedKeys="state.selectedKeys"
      v-model:openKeys="state.openKeys"
      :inlineIndent="12"
      mode="inline"
      :items="items"
      @click="handleSelect"
    ></a-menu>
    <a-modal
      v-model:open="openSortResume"
      title="人才分类"
      :confirm-loading="confirmLoading"
      @ok="handleSortResume"
    >
      <a-row :gutter="24">
        <a-col :span="24">
          <a-form-item label="分类名称">
            <a-input v-model:value="sortName" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-modal>
    
  </div>
</template>
<script lang="ts" setup>
  import { reactive, h } from 'vue';
  import { storeToRefs } from 'pinia';
  import { message } from 'ant-design-vue';
  import { useResumeListStoreWithOut } from '/@/store/modules/resumeList';
  const resumeList = useResumeListStoreWithOut();
  resumeList.fetchInfo();
  const { resumeMenu } = storeToRefs(resumeList);
  const state = reactive({
    selectedKeys: ['2'],
    openKeys: ['1'],
  });
  let items = ref([{}]);
  watch(resumeMenu, () => {
    items.value = resumeMenu.value.map(
      (item) => ({
        key: item.key,
        label: h('div', { class: 'resume-menu-title-one'},`${item.title} ${item.label}`),
        title: `${item.title} ${item.label}`,
        children: item.children?.map((subItem) => ({
          key: subItem.key,
          label: h('div', { class: 'resume-menu-title' }, [
            h('span', { class: 'resume-menu-title-content' }, subItem.title),
            h('span', { class: 'resume-menu-title-content-num' }, subItem.label),
          ]),
          title: `${subItem.title} ${subItem.label}`,
          type: subItem.type,
          children: subItem.children?.map((tempItem) => ({
            key: tempItem.key,
            label: h('div', { class: 'resume-menu-title' }, [
              h('span', { class: 'resume-menu-title-content' }, tempItem.title),
              h('span', { class: 'resume-menu-title-content-num' }, tempItem.label),
            ]),
            title: `${tempItem.title} ${tempItem.label}`,
            type: tempItem.type,
            children: tempItem.children?.map((tempSubItem) => ({
              key: tempSubItem.key,
              label: h('div', { class: 'resume-menu-title' }, [
                h('span', { class: 'resume-menu-title-content' }, tempSubItem.title),
                h('span', { class: 'resume-menu-title-content-num' }, tempSubItem.label),
              ]),
              title: `${tempSubItem.title} ${tempSubItem.label}`,
              type: tempSubItem.type,
            })),
          })),
        })),
        type: item.type,
      }),
      { deep: true, immediate: true },
    );
  });
  const openSortResume = ref<boolean>(false);
  const confirmLoading = ref<boolean>(false);
  const sortName = ref<string>('');
  const handleSortResume = (e) => {
    e.preventDefault();
    if (!sortName.value) {
      message.error('请填写分类名称');
      return;
    }
    confirmLoading.value = true;
    resumeList
      .addSortResumeName(sortName.value)
      .then(() => {
        message.success('操作成功');
        // resumeList.fetchSortData();
        openSortResume.value = false;
        confirmLoading.value = false;
        sortName.value = '';
      })
      .catch((err) => {
        message.error(err.message);
        openSortResume.value = false;
        confirmLoading.value = false;
        sortName.value = '';
      });
  };
   // 展开/收起状态
  
  const handleSelect = (key: object) => {
    //@ts-ignore
    state.selectedKeys = key.keyPath;
    //根据key展示不同的内容
    //@ts-ignore
    if (key.key == '6') {
      openSortResume.value = true;
      //@ts-ignore
    }else {
      //@ts-ignore
      resumeList.fetchTeamData(key.key);
    }
  };
</script>
<style lang="css">
  .resume-menu {
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
  .resume-menu-item {
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
  .resume-menu-item:hover {
    background-color: rgba(0, 0, 0, 0.06);
  }
  .resume-menu-title-one {
    font-weight: 600;
  }
  .resume-menu-item:hover .resume-menu-title-content-num,
  .resume-menu-item:hover .resume-menu-title-content {
    background: none;
  }
  .resume-menu-item:hover .active .resume-menu-title-content-num {
    color: #fff;
  }
  .resume-menu .active {
    background-color: #4285f4;
    border-radius: 8px;
  }
  .resume-menu .active .resume-menu-title-content {
    color: #fff;
  }
  .resume-menu .level {
    font-weight: 700;
    padding-left: 4px;
  }
  .resume-menu-title {
    display: flex;
    justify-content: space-between;
    transition: border-color 0.3s, background 0.3s, padding 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
    overflow: hidden;
    text-overflow: ellipsis;
    height: 40px;
    line-height: 40px;
    align-items: center;
  }
  .resume-menu-title-content {
    min-width: 0;
    overflow: hidden;
    height: 40px;
    line-height: 40px;
    text-overflow: ellipsis;
    opacity: 1;
    transition: opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), margin 0.3s, color 0.3s;
  }
  .resume-menu-title-content-num {
    background-color: #f1f0f0;
    padding: 0rem 0.03646rem;
    text-shadow: none;
    border-radius: 0.05208rem;
    display: inline-block;
    line-height: 1.5;
  }
  .resume-menu-item-only-child {
    padding-left: 48px;
  }
  .resume-menu .resume-menu-item-divider {
    overflow: hidden;
    line-height: 0;
    border-color: rgba(5, 5, 5, 0.06);
    border-style: solid;
    border-width: 0;
    border-top-width: 1px;
    margin-block: 1px;
    padding: 0;
  }
</style>
