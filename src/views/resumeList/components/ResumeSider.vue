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
    <a-modal
      v-model:open="openSortResume"
      title="人才分类"
      :confirm-loading="confirmLoading"
      @ok="handleSortResume"
      @cancel="clearSortResume"
      :footer="null"
      :width="1200"
    > <a-form ref="formSortResumeRef" :model="sortFormState" @finish="handleSortResume">
    <a-divider style="background-color: #ccc;margin-top: 0;" />
      <SearchContent :formState="sortFormState" :expand="4"/>
      <a-divider style="background-color: #ccc;margin-top: 0;" />
      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-item label="分类名称" style="width: 100%;"  :label-col="{offset: 0.2}" :wrapper-col="{span: 22}">
            <a-input v-model:value="sortName" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-button style="margin: 0 0 0 1px" type="primary" html-type="submit">保存</a-button>
          <a-button style="margin: 0 8px" @click="clearSortResume">清空</a-button>
        </a-col>
      </a-row>
    </a-form>
    </a-modal>
    <a-modal
      v-model:open="resumeLoginNameFlag"
      title="切换我的人才"
      :confirm-loading="confirmLoading"
      @ok="handleResumeLoginNameChange"
      @cancel="handleResumeLoginNameClose"
      :footer="null"
      :width="400"
    >  <a-row :gutter="24" style="height: 30px;">
        <a-col :span="12">
          <a-form-item label="团队">
            <a-select
            :allowClear="true"
            v-modal:value="teamPersonChange"
            :options="optionsLoginNameTeam"
            @change="handleTeamPersonChange"
          ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="10">
          <a-button style="margin: 0 6px 0 9px" type="primary" @click="handleResumeLoginNameChange">确定</a-button>
          <a-button style="margin: 0 0 0 9px" @click="handleResumeLoginNameChange(1)">本人</a-button>
        </a-col>
      </a-row>
      <a-checkbox-group v-model:value="teamSelectPerson"  @change="handleTeamSelectPerson" style="width: 100%">
        <a-row>
      <a-col :span="12" v-for="item in teamSelectPersonArr">
        <a-checkbox name="teamSelectPerson" :value="item.recruitId.toString()">{{ item.realNameEn }}</a-checkbox>
      </a-col>
    </a-row>
  </a-checkbox-group>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
  import { reactive, h } from 'vue';
  import { storeToRefs } from 'pinia';
  import { message } from 'ant-design-vue';
  import type { FormInstance,SelectProps } from 'ant-design-vue';
  import { useResumeListStoreWithOut } from '/@/store/modules/resumeList';
  import { FormOutlined,AlignRightOutlined } from '@ant-design/icons-vue';
  import SearchContent from './resumeContent/SearchContent.vue';
  import { SearchResumeList } from '/@/api/resumeList/model';
  const resumeList = useResumeListStoreWithOut();
  resumeList.fetchInfo();
  const { resumeMenu,teamPersonChangeArr,sortResumeUpdateData,sortResumeUpdate,formState } = storeToRefs(resumeList);
  const loginVueUser: {loginName: "", loginId: "", loginTocken: "",loginType: "",loginOutFlag: ''} = JSON.parse(localStorage.getItem("loginVueUser"));
  const state = reactive({
    selectedKeys: ['2'],
    openKeys: ['01','51','6','7'],
  });
  if (loginVueUser.loginOutFlag == '1') {
    state.selectedKeys = ['5'];
    state.openKeys = ['01','51'];
  }
  let items = ref([{}]);
  const optionsLoginNameTeam = ref<SelectProps['options']>([]);
  const handleResumeLoginNameClick = (e) => {
    e.stopPropagation();
    resumeLoginNameFlag.value = true;
  }
  watch(teamPersonChangeArr,() => {
    if (teamPersonChangeArr.value && teamPersonChangeArr.value.length > 0 && (!optionsLoginNameTeam.value || optionsLoginNameTeam.value.length == 0)) {
      //@ts-ignore
      optionsLoginNameTeam.value = teamPersonChangeArr.value?.map(item => ({value: item.teamId,label: item.teamName}));
    }
});
  const handleResumeSvgClick = (e) => {
    e.stopPropagation();
    openSortResume.value = true;
  }
  
  const resumeMenuChange = () => {
    let resumeMenuTemp = [];
      resumeMenu.value.map((item) => {
        //@ts-ignore
        if (item.key == '6') {
          //@ts-ignore
          resumeMenuTemp.push({
            key: item.key,
            label: h('div', { class: 'resume-menu-title-one' }, [
                h('span', { class: 'resume-menu-title-content' }, item.title),
               h('span', { class: 'resume-menu-title-content-svg',onClick: handleResumeSvgClick, }, h(FormOutlined)),
              ]),
            title: `${item.title} ${item.label}`,
            children: item.children?.map((subItem) => ({
              key: subItem.key,
              label: h('div', { class: state.selectedKeys.includes(subItem.key) ? 'resume-menu-title resume-menu-title-active' : 'resume-menu-title' }, [
                h('span', { class: 'resume-menu-title-content' }, subItem.title),
                h('span', { class: 'resume-menu-title-sort-content-svg',onClick: (e) => {
                  e.stopPropagation();
                  resumeList.querySortById(subItem.key);
                }, }, [
               h(FormOutlined),
               h('span',subItem.label)
               ]),
              ]),
              title: `${subItem.title} ${subItem.label}`,
              type: subItem.type,
              children: subItem.children?.map((tempItem) => ({
                key: tempItem.key,
                label: h('div', { class: state.selectedKeys.includes(tempItem.key) ? 'resume-menu-title resume-menu-title-active' : 'resume-menu-title' }, [
                  h('span', { class: 'resume-menu-title-content' }, tempItem.title),
                  h('span', { class: 'resume-menu-title-content-num' }, tempItem.label),
                ]),
                title: `${tempItem.title} ${tempItem.label}`,
                type: tempItem.type,
                children: tempItem.children?.map((tempSubItem) => ({
                  key: tempSubItem.key,
                  label: h('div', { class: state.selectedKeys.includes(tempSubItem.key) ? 'resume-menu-title resume-menu-title-active' : 'resume-menu-title' }, [
                    h('span', { class: 'resume-menu-title-content' }, tempSubItem.title),
                    h('span', { class: 'resume-menu-title-content-num' }, tempSubItem.label),
                  ]),
                  title: `${tempSubItem.title} ${tempSubItem.label}`,
                  type: tempSubItem.type,
                })),
              })),
            })),
            type: item.type,
          });
        } //@ts-ignore
         else if (item.key == '7') {
          //@ts-ignore
          resumeMenuTemp.push({
            key: item.key,
            label: h('div', { class: 'resume-menu-title-one' }, [
                h('span', { class: 'resume-menu-title-content' }, item.title),
              ]),
            title: `${item.title} ${item.label}`,
            children: item.children?.map((subItem) => ({
              key: subItem.key,
              label: h('div', { class: state.selectedKeys.includes(subItem.key) ? 'resume-menu-title resume-menu-title-active' : 'resume-menu-title' }, [
                h('span', { class: 'resume-menu-title-content' }, subItem.title),
                h('span', { class: 'resume-menu-title-content-svg',onClick: (e) => {
                  e.stopPropagation();
                  resumeList.querySearchById(subItem.key);
                }, }, h(FormOutlined)),
              ]),
              title: `${subItem.title} ${subItem.label}`,
              type: subItem.type,
              children: subItem.children?.map((tempItem) => ({
                key: tempItem.key,
                label: h('div', { class: state.selectedKeys.includes(tempItem.key) ? 'resume-menu-title resume-menu-title-active' : 'resume-menu-title' }, [
                  h('span', { class: 'resume-menu-title-content' }, tempItem.title),
                  h('span', { class: 'resume-menu-title-content-num' }, tempItem.label),
                ]),
                title: `${tempItem.title} ${tempItem.label}`,
                type: tempItem.type,
                children: tempItem.children?.map((tempSubItem) => ({
                  key: tempSubItem.key,
                  label: h('div', { class: state.selectedKeys.includes(tempSubItem.key) ? 'resume-menu-title resume-menu-title-active' : 'resume-menu-title' }, [
                    h('span', { class: 'resume-menu-title-content' }, tempSubItem.title),
                    h('span', { class: 'resume-menu-title-content-num' }, tempSubItem.label),
                  ]),
                  title: `${tempSubItem.title} ${tempSubItem.label}`,
                  type: tempSubItem.type,
                })),
              })),
            })),
            type: item.type,
          });
        } //@ts-ignore
        else if (item.key == '51') {
          //@ts-ignore
          resumeMenuTemp.push({
            key: item.key,
            label: h('div', { class: 'resume-menu-title-one',title: `我的人才 ${item.label}`}, [
                h('span', { class: 'resume-menu-title-content' }, item.title),
               h('span', { class: 'resume-menu-title-content-login-name',onClick: handleResumeLoginNameClick}, h(AlignRightOutlined)),
              ]),
            title: `${item.title} ${item.label}`,
            children: item.children?.map((subItem) => ({
              key: subItem.key,
              label: h('div', { class: state.selectedKeys.includes(subItem.key) ? 'resume-menu-title resume-menu-title-active' : 'resume-menu-title' }, [
                h('span', { class: 'resume-menu-title-content' }, subItem.title),
                h('span', { class: 'resume-menu-title-content-num' }, subItem.label),
              ]),
              title: `${subItem.title} ${subItem.label}`,
              type: subItem.type,
              children: subItem.children?.map((tempItem) => ({
                key: tempItem.key,
                label: h('div', { class: state.selectedKeys.includes(tempItem.key) ? 'resume-menu-title resume-menu-title-active' : 'resume-menu-title' }, [
                  h('span', { class: 'resume-menu-title-content' }, tempItem.title),
                  h('span', { class: 'resume-menu-title-content-num' }, tempItem.label),
                ]),
                title: `${tempItem.title} ${tempItem.label}`,
                type: tempItem.type,
                children: tempItem.children?.map((tempSubItem) => ({
                  key: tempSubItem.key,
                  label: h('div', { class: state.selectedKeys.includes(tempSubItem.key) ? 'resume-menu-title resume-menu-title-active' : 'resume-menu-title' }, [
                    h('span', { class: 'resume-menu-title-content' }, tempSubItem.title),
                    h('span', { class: 'resume-menu-title-content-num' }, tempSubItem.label),
                  ]),
                  title: `${tempSubItem.title} ${tempSubItem.label}`,
                  type: tempSubItem.type,
                })),
              })),
            })),
            type: item.type,
          });
        } else {
          //@ts-ignore
          resumeMenuTemp.push({
            key: item.key,
            label: h('div', { class: 'resume-menu-title-one' }, `${item.title} ${item.label}`),
            title: `${item.title} ${item.label}`,
            children: item.children?.map((subItem) => ({
              key: subItem.key,
              label: h('div', { class: state.selectedKeys.includes(subItem.key) ? 'resume-menu-title resume-menu-title-active' : 'resume-menu-title' }, [
              (subItem.key == "teamData" ? h('span', { class: 'resume-menu-title-content-team',onClick: (e) => {
                  e.stopPropagation();
                  state.selectedKeys = [subItem.key]
                  console.log(state.selectedKeys)
                  resumeList.fetchTeamData('teamLevel1_9999',"1");
                }, }, subItem.title) : h('span', { class: 'resume-menu-title-content' }, subItem.title)),
                h('span', { class: 'resume-menu-title-content-num' }, subItem.label),
              ]),
              title:  `${subItem.title} ${subItem.label}`,
              type: subItem.type,
              children: subItem.children?.map((tempItem) => ({
                key: tempItem.key,
                label: h('div', { class: state.selectedKeys.includes(tempItem.key) ? 'resume-menu-title resume-menu-title-active' : 'resume-menu-title' }, [
                (subItem.key == "teamData" ? h('span', { class: 'resume-menu-title-content-team',onClick: (e) => {
                  e.stopPropagation();
                  state.selectedKeys = [tempItem.key]
                  resumeList.fetchTeamData(tempItem.key,"1");
                }, }, tempItem.title) : h('span', { class: 'resume-menu-title-content' }, tempItem.title)),
                  h('span', { class: 'resume-menu-title-content-num' }, tempItem.label),
                ]),
                title: `${tempItem.title} ${tempItem.label}`,
                type: tempItem.type,
                children: tempItem.children?.map((tempSubItem) => ({
                  key: tempSubItem.key,
                  label: h('div', { class: state.selectedKeys.includes(tempSubItem.key) ? 'resume-menu-title resume-menu-title-active' : 'resume-menu-title' }, [
                    h('span', { class: 'resume-menu-title-content' }, tempSubItem.title),
                    h('span', { class: 'resume-menu-title-content-num' }, tempSubItem.label),
                  ]),
                  title: `${tempSubItem.title} ${tempSubItem.label}`,
                  type: tempSubItem.type,
                })),
              })),
            })),
            type: item.type,
          });
        }
      });
      items.value = resumeMenuTemp;
  }
  watch(
    resumeMenu,
    () => {
      resumeMenuChange();
    },
    { deep: true, immediate: true },
  );
  const openSortResume = ref<boolean>(false);
  const confirmLoading = ref<boolean>(false);
  const sortName = ref<string>('');
  const sortFormState = ref({} as SearchResumeList);
  const formSortResumeRef = ref<FormInstance>();
  const clearSortResume = () => {
    confirmLoading.value = false;
    sortName.value = '';
    sortFormState.value = {} as SearchResumeList;
    resumeList.$patch({
      sortResumeUpdate:false,
      sortResumeUpdateData: {},
    })
  }
  const handleSortResume = () => {
    if (!sortName.value) {
      message.error('请填写分类名称');
      return;
    }
    const sortResumeForm = {...sortFormState.value,sortName:sortName.value};
    confirmLoading.value = true;
    resumeList
      .addSortResumeName(sortResumeForm)
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
  //修改人才分类开始
  watch(sortResumeUpdate,() =>{
    if (sortResumeUpdate.value) {
      openSortResume.value = sortResumeUpdate.value;
      setTimeout(() =>{
         //@ts-ignore
         sortFormState.value = sortResumeUpdateData.value;
         sortName.value = sortResumeUpdateData.value.sortName;
      },1000)
    }
  })
  //修改人才分类结束
  // 展开/收起状态
  const handleSelect = (key: object) => {
    if (!(key.key == '1' || key.key == '2')) {
        resumeList.$patch({
          isTwoYearFlagStatus: false,
          formState: {
            ...formState.value,
            isTwoYear: '',
          }
        })
      } else {
        resumeList.$patch({
          isTwoYearFlagStatus: true
        })
      }
   //@ts-ignore
    state.selectedKeys = [key.key];
    console.log(state.selectedKeys)
    //@ts-ignore
    resumeList.fetchTeamData(key.key);
    resumeMenuChange();
  };
  
  const resumeLoginNameFlag = ref(false);
  const teamPersonChange = ref();
  const teamSelectPersonArr = ref([]);
  const teamSelectPerson = ref(['']);
  const handleTeamPersonChange = (values) => {
    teamSelectPersonArr.value = teamPersonChangeArr.value.filter(item => item.teamId == values)[0].recruitList.filter(item => item.recruitId != loginVueUser.loginId);
  }
  const handleTeamSelectPerson = (values) => {
    if (values.length > 0) {
      teamSelectPerson.value = [values.pop()];
    } else {
      teamSelectPerson.value = values;
    }  
  }
  const handleResumeLoginNameClose = () => {
    teamPersonChange.value = '';
    resumeLoginNameFlag.value = false;
  }
  const handleResumeLoginNameChange = (person = 0) => {
    if (person != 1 && !teamSelectPerson.value[0]) {
      message.error('请选择切换人');
      return;
    }
    const realNameEn = teamSelectPersonArr.value?.filter(item => teamSelectPerson.value[0] == item.recruitId)[0]?.realNameEn || "";
    let viewType = "S";
    if (person != 1) {
      viewType = "T";
    }
    resumeList.resumeLoginNameChange(teamSelectPerson.value[0]+"-"+realNameEn,viewType).then(() => {
      message.success('操作成功');
      state.selectedKeys = ["5"]
      resumeList.fetchTeamData("5");
      handleResumeLoginNameClose();
    });
  }
</script>
<style lang="css" scoped>
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
  /* :deep(.resume-menu-title-active) {
    position: relative;
    transition: border-color 0.3s, background 0.3s, padding 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
  } */
  /* :deep(.resume-menu-title-active::after) {
    content: '';
    position: absolute;
    top: 2px;
    right: 2px;
    width: 230px;
    height: 30px;
    border: 2px solid #0052cb;
  } */
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
