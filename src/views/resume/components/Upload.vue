<template>
  <div class="resume_title"></div>
  <div class="upload_container">
    <a-card class="resume_card">
      <h3 class="resume_title_h3">上传简历</h3>
      <a-divider class="resume_divider" dashed />
      <a-row>
        <a-col :span="1.5" class="resume_type_sorce">
          <a-select name="resumeSource" :value="resumeSource">
            <a-select-option value="原始简历">原始简历</a-select-option>
          </a-select>
        </a-col>
        <a-col :span="1.5" class="resume_type">
          <a-select v-model:value="resumeTypeEnglish" :options="resumeTypePotion" @change="handleResumeTypeEnglish"></a-select>
        </a-col>
        <a-col :span="1.5" class="resume_source">
          <a-select
            ref="select"
            v-model:value="talentSource"
            :options="optionsTalentSource"
            @change="handleTalentSource"
            placeholder="请选择简历来源"
            name="talentSource"
            style="width: 100%;"
          ></a-select>
        </a-col>
        <a-col :span="16.5" v-if="uploadFlag">
          <a-upload
            v-model:file-list="fileList"
            name="file"
            :headers="headers"
            :max-count="1"
            :showUploadList="{ showRemoveIcon: false }"
            :custom-request="downloadFilesCustomRequest"
          >
            <a-button class="upload_btn">
              <upload-outlined></upload-outlined>
              上传
            </a-button>
          </a-upload>
        </a-col>
         <a-col :span="16.5" v-if="uploadFlag && loginVueUser.loginType == 'A'">
          <a-button class="upload_btn_all" @click="handleBatchUpload">
              批量上传
            </a-button>
        </a-col>
      </a-row>
    </a-card>
  </div>
  <Plagiarism v-if="!batchUploadFlag" />
  <BatchUpload v-if="batchUploadFlag" />
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import Plagiarism from './Plagiarism.vue';
  import BatchUpload from './BatchUpload.vue';
  import type { SelectProps } from 'ant-design-vue';
  import { useMessage } from '/@/hooks/useMessage';
  import { UploadOutlined } from '@ant-design/icons-vue';
  import { useResumeStoreWithOut } from '/@/store/modules/resume';
  import { PlagiarusnItem } from '/@/api/plagiarusn/model';
  import { usePlagiarusnStoreWithOut } from '/@/store/modules/plagiarusn';
  import { ResumeFormState } from '/@/api/resume/model';
  import { storeToRefs } from 'pinia';
  const { createMessage } = useMessage();
  const resumeStore = useResumeStoreWithOut();
  const { resumeFormState,resumeTypeEnglish,batchUploadFlag,batchUploadFileList,batchUploadList } = storeToRefs(resumeStore);
  const loginVueUser: { loginName: ''; loginId: ''; loginTocken: ''; loginType: '' } = JSON.parse(
  localStorage.getItem('loginVueUser') || '{}',
  );
  const resumeSource = ref('原始简历');
  const resumeTypePotion = ref<SelectProps['options']>([
    {
      value: '2',
      label: '中文简历',
    },
    {
      value: '1',
      label: '英文简历',
    }
  ])
  const handleResumeTypeEnglish = (value: string) => {
    resumeStore.$patch({
      resumeTypeEnglish: value,
    })
  };
  const talentSource = ref(undefined);
  const uploadFlag = ref(false);
  const plagiarusnStore = usePlagiarusnStoreWithOut();
  const fileList = ref([]);
  const headers = {
    authorization: 'authorization-text',
  };
  const optionsTalentSource = ref<SelectProps['options']>([
    {
      value: '人才介绍',
      label: '人才介绍',
    },
    {
      value: '门店寻访',
      label: '门店寻访',
    },
    {
      value: '小红书',
      label: '小红书',
    },
    {
      value: '猎聘',
      label: '猎聘',
    },
    {
      value: 'Boss直聘',
      label: 'Boss直聘',
    },
    {
      value: '前程无忧',
      label: '前程无忧',
    },
    {
      value: '智联招聘',
      label: '智联招聘',
    },
    {
      value: '抖音',
      label: '抖音',
    },
    {
      value: 'Jobsdb',
      label: 'Jobsdb',
    },
    {
      value: '澳门人才网',
      label: '澳门人才网',
    },
    {
      value: 'Cold Call',
      label: 'Cold Call',
    },
    {
      value: '客户招聘',
      label: '客户招聘',
    },
  ]);

  /**
   * 更改简历来源及修改简历信息中的来源数据
   */
  const handleTalentSource = () => {
    if (talentSource.value) {
      uploadFlag.value = true;
    }
  };
  /**
   * 上传简历解析表单提交
   * @param event 表单提交事件对象
   */
  const downloadFilesCustomRequest = (event: any) => {
    plagiarusnStore.resumeInfoShow(false);
    plagiarusnStore.plagiarusnRseultShow(0);
    plagiarusnStore.plagiarusnInfoFlagShow(true);
    saveFile(event);
  };
  /**
   * 进行文件上传及数据返回后续处理
   * @param data 文件上传数据
   */
  const saveFile = async (data: any) => {
    //先清空下store对象
    resumeStore.resumeFormState = {} as ResumeFormState;
    resumeStore.$patch({
        resumeFormState: {
          talentSource: talentSource.value,
          resumeFile: data.file,
        },
        updatePhotoFlag: 0,
      });
    //const formData = { fname: '', file: '', talentSource: undefined };
    const formData = new FormData();
    // 注意：此处的fileName需要和后端接收参数的fileName保持一致，否则无法正常接收
    formData.append('fname', data.file.name); // 注意：此处的fileName需要和后端接收参数的fileName保持一致，否则无法正常接收
    formData.append('file', data.file);
    await resumeStore
      .fetchInfo(formData)
      .then((res) => {
        const Info = JSON.parse(res.info);
        if (Info.status.code == 265) {
          createMessage.error('简历上传文件太大,请调整后重新上传');
          return;
        } else {
          data.onSuccess(res, data.file);
          plagiarusnResume();
          createMessage.success('上传成功');
        }
      })
      .catch((err) => {
        data.onError(err, err, data.file);
        const status = err?.response?.status;
        const body = err?.response?.data ?? err?.message ?? err;
        const text = typeof body === 'string' ? body : JSON.stringify(body);
        if (status === 413 || text.includes('413') || text.includes('Request Entity Too Large') || text.includes('Too Large')) {
          createMessage.error('简历上传文件太大,请调整后重新上传');
          return;
        }
        createMessage.error('上传失败');
      });
  };
  /**
   * 进行简历查重的功能
   * @param form 简历查重数据 PlagiarusnItem
   */
  const plagiarusnResumeAction = async (form: PlagiarusnItem) => {
    await plagiarusnStore.fetchInfo(form);
    plagiarusnStore.plagiarusnRseultShow(plagiarusnStore.plagiarusnInfo.code);
  };
  const plagiarusnForm = reactive<PlagiarusnItem>({} as PlagiarusnItem);
  /**
   * 简历查重前数据的组合收集
   */
  const plagiarusnResume = () => {
    const { personInfoData, workExperienceList, educationInfoData } = resumeFormState.value;
    if (!personInfoData) {
      return;
    }
     // @ts-ignore
    const loginVueUser: {loginName: "", loginId: ""} = JSON.parse(localStorage.getItem("loginVueUser"));
    const { userName, phone, email, gender, birthday } = personInfoData;
    let companyNames = '';
    let schoolNames = '';
    let majorNames = '';
    plagiarusnForm.userNameCn = userName;
    plagiarusnForm.userNameEn = '';
    plagiarusnForm.phoneNum = phone;
    plagiarusnForm.email = email;
    plagiarusnForm.gender = gender;
    plagiarusnForm.birthYear = birthday ? birthday.split('.')[0] : '';
    plagiarusnForm.currentCity = '';
    plagiarusnForm.recruitId = loginVueUser.loginId;
    plagiarusnForm.realNameEn = loginVueUser.loginName;
    if (workExperienceList && workExperienceList.length > 0) {
      companyNames = workExperienceList
        .map((item) => {
          return item.companyName ? item.companyName : '';
        })
        .join(',');
    }
    if (educationInfoData && educationInfoData.length > 0) {
      schoolNames = educationInfoData
        .map((item) => {
          return item.schoolName ? item.schoolName : '';
        })
        .join(',');
      majorNames = educationInfoData
        .map((item) => {
          return item.majorName ? item.majorName : '';
        })
        .join(',');
    }
    plagiarusnForm.companyNames = companyNames;
    plagiarusnForm.schoolNames = schoolNames;
    plagiarusnForm.majorNames = majorNames;
    plagiarusnForm.isEnglish = resumeTypeEnglish.value;
    plagiarusnResumeAction(plagiarusnForm);
  };
  const handleBatchUpload = () => {
    batchUploadFlag.value = !batchUploadFlag.value;
    if (!batchUploadFlag.value) {
      batchUploadList.value = [];
      batchUploadFileList.value = [];
    }
  }
</script>
<style lang="less">
  .upload_container {
    clear: both;
    .upload_btn .anticon-upload {
      vertical-align: text-bottom;
    }
    .ant-row {
      align-items: center;
    }
    .ant-upload,
    .ant-upload-list {
      float: left;
      overflow: hidden;
    }
    .ant-upload-list-text .ant-upload-text-icon .anticon {
      vertical-align: inherit;
    }
    .ant-card-body {
      padding: 0 55px 24px!important;
    }
    .resume_type_sorce {
      margin-right: 10px;
      width: 100px;
    }
    .resume_type {
      margin-right: 10px;
      width: 100px;
    }
    .resume_source {
      margin-right: 10px;
      width: 200px;
    }
    .upload_btn_all {
      margin-left: 10px;
    }
  }
</style>
