<template>
  <div class="resume_header" v-if="!expandUpdate">
    <a-row :gutter="24">
      <a-col :span="24" class="resume_detail_title">
        <h4 class="resume_h4">
          <svg
            t="1735638320099"
            style="vertical-align: bottom"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="10476"
            width="16"
            height="16"
          >
            <path
              d="M454.656 407.04l-61.952 167.424c-8.704 23.552 8.704 48.64 33.792 48.64h58.368c25.088 0 42.496-25.088 33.792-48.128l-61.44-167.936h-2.56z"
              p-id="10477"
            ></path>
            <path
              d="M762.368 177.152H148.992c-46.08 0-83.456 37.376-83.456 83.456v613.376c0 46.08 37.376 83.456 83.456 83.456h613.376c46.08 0 83.456-37.376 83.456-83.456V261.12c0-46.592-37.376-83.968-83.456-83.968z m-167.936 605.696l-27.648-75.776c-5.12-14.336-18.944-23.552-33.792-23.552H377.856c-15.36 0-28.672 9.216-33.792 23.552l-27.648 75.776c-5.12 14.336-18.944 23.552-33.792 23.552-25.088 0-42.496-25.6-33.792-49.152l156.16-405.504c5.12-13.824 18.944-23.04 33.792-23.04h33.792c14.848 0 28.16 9.216 33.792 23.04l156.16 405.504c9.216 23.552-8.192 49.152-33.792 49.152h-0.512c-15.36 0-28.672-9.728-33.792-23.552z"
              p-id="10478"
            ></path>
            <path
              d="M957.44 149.504c0-46.08-37.376-83.456-83.456-83.456h-501.76v1.536c-3.072-0.512-6.144-1.536-9.216-1.536h-148.48c-20.48 0-37.376 12.288-37.376 27.648 0 15.36 16.896 27.648 37.376 27.648h148.48c3.072 0 6.144-1.024 9.216-1.536v1.536h529.408v529.408h1.536c-0.512 3.072-1.536 6.144-1.536 9.216v148.48c0 20.48 12.288 37.376 27.648 37.376 15.36 0 27.648-16.384 27.648-37.376v-148.48c0-3.072-1.024-6.144-1.536-9.216h1.536l0.512-501.248z"
              p-id="10479"
            ></path>
          </svg>
          语言能力</h4
        >
        <span style="margin-top: 15px;">
          <a-tag color="green" v-if="!languageWholeFlagTemp">完整</a-tag>
          <a-tag color="red" v-if="languageWholeFlagTemp">缺失</a-tag>
        <form-outlined v-if="showResumeAdd" @click="handleUpdateLanguagesInfo"></form-outlined>
      </span>
      </a-col>
      <a-divider :dashed="true" style="background-color: #ccc; margin-top: 0" />
    </a-row>
    <a-row :gutter="24" class="resume_row" v-for="item in LanguagesTemplates">
      <a-col :span="24" v-if="resumeTypeEnglish != '1'">
        {{ item.languageName }}:<span class="resume_span">
        <span v-if="item.tinshuoLiuli == 1">听说流利;</span>
        <span v-if="item.duxieLiuli == 2">读写流利;</span>
        <span v-if="item.languageLevel">{{ item.languageLevel }}</span>
        <span v-if="item.bujia == 3">{{ item.languageName }}不佳;</span>
      </span>
      </a-col>
      <a-col :span="24" v-if="resumeTypeEnglish == '1'">
        {{ item.languageName }}:<span class="resume_span">
        <span v-if="item.tinshuoLiuli == 1">‌Listen and speak fluently;</span>
        <span v-if="item.duxieLiuli == 2">Read and write fluently;</span>
        <span v-if="item.languageLevel">{{ item.languageLevel }}</span>
        <span v-if="item.bujia">{{ item.bujia }};</span>
      </span>
      </a-col>
    </a-row>
  </div>
  <div class="resume_header_update" v-if="expandUpdate">
    <a-row :gutter="24">
      <a-col :span="24" class="resume_detail_title">
        <h4 class="resume_h4">
          <svg
            t="1735638320099"
            style="vertical-align: bottom"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="10476"
            width="16"
            height="16"
          >
            <path
              d="M454.656 407.04l-61.952 167.424c-8.704 23.552 8.704 48.64 33.792 48.64h58.368c25.088 0 42.496-25.088 33.792-48.128l-61.44-167.936h-2.56z"
              p-id="10477"
            ></path>
            <path
              d="M762.368 177.152H148.992c-46.08 0-83.456 37.376-83.456 83.456v613.376c0 46.08 37.376 83.456 83.456 83.456h613.376c46.08 0 83.456-37.376 83.456-83.456V261.12c0-46.592-37.376-83.968-83.456-83.968z m-167.936 605.696l-27.648-75.776c-5.12-14.336-18.944-23.552-33.792-23.552H377.856c-15.36 0-28.672 9.216-33.792 23.552l-27.648 75.776c-5.12 14.336-18.944 23.552-33.792 23.552-25.088 0-42.496-25.6-33.792-49.152l156.16-405.504c5.12-13.824 18.944-23.04 33.792-23.04h33.792c14.848 0 28.16 9.216 33.792 23.04l156.16 405.504c9.216 23.552-8.192 49.152-33.792 49.152h-0.512c-15.36 0-28.672-9.728-33.792-23.552z"
              p-id="10478"
            ></path>
            <path
              d="M957.44 149.504c0-46.08-37.376-83.456-83.456-83.456h-501.76v1.536c-3.072-0.512-6.144-1.536-9.216-1.536h-148.48c-20.48 0-37.376 12.288-37.376 27.648 0 15.36 16.896 27.648 37.376 27.648h148.48c3.072 0 6.144-1.024 9.216-1.536v1.536h529.408v529.408h1.536c-0.512 3.072-1.536 6.144-1.536 9.216v148.48c0 20.48 12.288 37.376 27.648 37.376 15.36 0 27.648-16.384 27.648-37.376v-148.48c0-3.072-1.024-6.144-1.536-9.216h1.536l0.512-501.248z"
              p-id="10479"
            ></path>
          </svg>
          语言能力</h4
        >
      </a-col>
      <a-divider :dashed="true" style="background-color: #ccc; margin-top: 0" />
    </a-row>
    <a-form :model="languageAbility0" @finish="onFinish">
      <a-row>
        <a-col :span="24">
          <a-form-item
            class="languageAbility0"
            name="languageAbility0"
            :label="themeLanguage?.English?.label"
            :label-col="{ span: 1 }"
            :wrapper-col="{ span: 23 }"
            @change="onChangeLanguageAbility"
            :rules="[{ required: false, message: '请输入语言能力' }]"
          >
            <a-checkbox-group v-model:value="languageAbility0">
              <a-checkbox value="1">{{ themeLanguage?.English?.language1 }}</a-checkbox>
              <a-checkbox value="2">{{ themeLanguage?.English?.language2 }}</a-checkbox>
              <a-checkbox value="CET-4">CET-4</a-checkbox>
              <a-checkbox value="CET-6">CET-6</a-checkbox>
              <a-checkbox value="TEM-4">TEM-4</a-checkbox>
              <a-checkbox value="TEM-8">TEM-8</a-checkbox>
              <a-checkbox value="IELTS"
                >IELTS
                <a-popover v-model:open="visibleIELTS" title="IELTS" trigger="click">
                  <template #content>
                    <a-input
                      @change="onChangeLanguageAbility"
                      v-model:value="scoreIELTS"
                      placeholder="请输入IELTS分数"
                    />
                  </template>
                </a-popover>
              </a-checkbox>
              <a-checkbox value="TOEFL"
                >TOEFL
                <a-popover v-model:open="visibleTOEFL" title="TOEFL" trigger="click">
                  <template #content>
                    <a-input
                      @change="onChangeLanguageAbility"
                      v-model:value="scoreTOEFL"
                      placeholder="请输入TOEFL分数"
                    />
                  </template>
                </a-popover>
              </a-checkbox>
              <a-checkbox value="3">{{ themeLanguage?.English?.language3 }}</a-checkbox>
            </a-checkbox-group>
            <a style="font-size: 12px" @click="expand = !expand">
              <template v-if="expand">
                <UpOutlined style="vertical-align: middle" />
              </template>
              <template v-else>
                <DownOutlined style="vertical-align: middle" />
              </template>
              更多
            </a>
          </a-form-item>
          <span style="font-size: 10px;display: inline-block;color: red;padding-left: 32px;">听说流利: 要求候选人能在对话、交流、面试等场景中，自信、清晰地表达观点，准确理解他人，展现自然流畅的语言能力，如不达标禁止选择。</span>
          <span style="font-size: 10px;display: inline-block;color: red;padding-left: 32px;">读写流利: 要求候选人能精准理解并创作各类文本，熟练运用语言进行翻译或原创写作，如不达标禁止选择。</span>
        </a-col>
      </a-row>
      <a-row v-if="expand">
        <a-col :span="24">
          <a-form-item
            name="languageAbility1"
            :label="themeLanguage?.French?.label"
            :label-col="{ span: 1 }"
            :wrapper-col="{ span: 23 }"
            @change="onChangeLanguageAbility"
            :rules="[{ required: false, message: '请输入语言能力' }]"
          >
            <a-checkbox-group v-model:value="languageAbility1">
              <a-checkbox value="1">{{ themeLanguage?.French?.language1 }}</a-checkbox>
              <a-checkbox value="2">{{ themeLanguage?.French?.language2 }}</a-checkbox>
              <a-checkbox value="TFU-4">TFU-4</a-checkbox>
              <a-checkbox value="TFS-4">TFS-4</a-checkbox>
              <a-checkbox value="TFS-8">TFS-8</a-checkbox>
              <a-checkbox value="DALF-C1">DALF-C1</a-checkbox>
              <a-checkbox value="DALF-C2">DALF-C2</a-checkbox>
              <!-- <a-checkbox value="DELF-A1">DELF-A1</a-checkbox>
              <a-checkbox value="DELF-A2">DELF-A2</a-checkbox> -->
              <a-checkbox value="DELF-A3">DELF-A3</a-checkbox>
              <a-checkbox value="DELF-A4">DELF-A4</a-checkbox>
              <a-checkbox value="3">{{ themeLanguage?.French?.language3 }}</a-checkbox>
            </a-checkbox-group>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row v-if="expand">
        <a-col :span="24">
          <a-form-item
            name="languageAbility2"
            :label="themeLanguage?.Japanese?.label"
            :label-col="{ span: 1 }"
            :wrapper-col="{ span: 23 }"
            @change="onChangeLanguageAbility"
            :rules="[{ required: false, message: '请输入语言能力' }]"
          >
            <a-checkbox-group v-model:value="languageAbility2">
              <a-checkbox value="1">{{ themeLanguage?.Japanese?.language1 }}</a-checkbox>
              <a-checkbox value="2">{{ themeLanguage?.Japanese?.language2 }}</a-checkbox>
              <a-checkbox value="JLPT-N1">JLPT-N1</a-checkbox>
              <a-checkbox value="JLPT-N2">JLPT-N2</a-checkbox>
              <a-checkbox value="JLPT-N3">JLPT-N3</a-checkbox>
              <a-checkbox value="JLPT-N4">JLPT-N4</a-checkbox>
              <a-checkbox value="JLPT-N5">JLPT-N5</a-checkbox>
              <a-checkbox value="3">{{ themeLanguage?.Japanese?.language3 }}</a-checkbox>
            </a-checkbox-group>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row v-if="expand">
        <a-col :span="24">
          <a-form-item
            name="languageAbility3"
            :label="themeLanguage?.German?.label"
            :label-col="{ span: 1 }"
            :wrapper-col="{ span: 23 }"
            @change="onChangeLanguageAbility"
            :rules="[{ required: false, message: '请输入语言能力' }]"
          >
            <a-checkbox-group v-model:value="languageAbility3">
              <a-checkbox value="1">{{ themeLanguage?.German?.language1 }}</a-checkbox>
              <a-checkbox value="2">{{ themeLanguage?.German?.language2 }}</a-checkbox>
              <a-checkbox value="CEFR-A1">CEFR-A1</a-checkbox>
              <a-checkbox value="CEFR-A2">CEFR-A2</a-checkbox>
              <a-checkbox value="CEFR-B1">CEFR-B1</a-checkbox>
              <a-checkbox value="CEFR-B2">CEFR-B2</a-checkbox>
              <a-checkbox value="CEFR-C1">CEFR-C1</a-checkbox>
              <a-checkbox value="CEFR-C2">CEFR-C2</a-checkbox>
              <a-checkbox value="3">{{ themeLanguage?.German?.language3 }}</a-checkbox>
            </a-checkbox-group>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row v-if="expand">
        <a-col :span="24">
          <a-form-item
            name="languageAbility6"
            :label="themeLanguage?.Korean?.label"
            :label-col="{ span: 1 }"
            :wrapper-col="{ span: 23 }"
            @change="onChangeLanguageAbility"
            :rules="[{ required: false, message: '请输入语言能力' }]"
          >
            <a-checkbox-group v-model:value="languageAbility6">
              <a-checkbox value="1">{{ themeLanguage?.Korean?.language1 }}</a-checkbox>
              <a-checkbox value="2">{{ themeLanguage?.Korean?.language2 }}</a-checkbox>
              <a-checkbox value="TOPIK I">TOPIK I</a-checkbox>
              <a-checkbox value="TOPIK II">TOPIK II</a-checkbox>
              <a-checkbox value="3">{{ themeLanguage?.Korean?.language3 }}</a-checkbox>
            </a-checkbox-group>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row v-if="expand">
        <a-col :span="24">
          <a-form-item
            name="languageAbility4"
            :label="themeLanguage?.Cantonese?.label"
            :label-col="{ span: 1 }"
            :wrapper-col="{ span: 23 }"
            @change="onChangeLanguageAbility"
            :rules="[{ required: false, message: '请输入语言能力' }]"
          >
            <a-checkbox-group v-model:value="languageAbility4">
              <a-checkbox value="1">{{ themeLanguage?.Cantonese?.language1 }}</a-checkbox>
              <a-checkbox value="2">{{ themeLanguage?.Cantonese?.language2 }}</a-checkbox>
              <a-checkbox value="3">{{ themeLanguage?.Cantonese?.language3 }}</a-checkbox>
            </a-checkbox-group>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row v-if="expand && expandUpdateChinese">
        <a-col :span="24">
          <a-form-item
            name="languageAbility5"
            :label="themeLanguage?.Chinese?.label"
            :label-col="{ span: 1 }"
            :wrapper-col="{ span: 23 }"
            @change="onChangeLanguageAbility"
            :rules="[{ required: false, message: '请输入语言能力' }]"
          >
            <a-checkbox-group v-model:value="languageAbility5">
              <a-checkbox value="1">{{ themeLanguage?.Chinese?.language1 }}</a-checkbox>
              <a-checkbox value="2">{{ themeLanguage?.Chinese?.language2 }}</a-checkbox>
              <a-checkbox value="HSK一级">HSK一级</a-checkbox>
              <a-checkbox value="HSF二级">HSF二级</a-checkbox>
              <a-checkbox value="HSK三级">HSK三级</a-checkbox>
              <a-checkbox value="HSK四级">HSK四级</a-checkbox>
              <a-checkbox value="HSK五级">HSK五级</a-checkbox>
              <a-checkbox value="HSK六级">HSK六级</a-checkbox>
              <a-checkbox value="3">{{ themeLanguage?.Chinese?.language3 }}</a-checkbox>
            </a-checkbox-group>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="24" class="resume_detail_btn">
          <a-button style="margin: 0 8px" type="primary" html-type="submit" :loading="iconLoading"
            >保存</a-button
          >
          <a-button @click="handleUpdateLanguagesInfo">取消</a-button>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
  import { FormOutlined, DownOutlined, UpOutlined } from '@ant-design/icons-vue';
  import { useResumeDetailStore } from '/@/store/modules/resumeDetail';
  import { validateLanguage } from '/@/utils/resumeTypeEn';
  import { message } from 'ant-design-vue';
  const resumeDetailStore = useResumeDetailStore();
  const { resumeTypeEnglish } = storeToRefs(resumeDetailStore);
  const themeLanguage = ref(validateLanguage('englishInfo', resumeTypeEnglish.value));
  message.config({
  duration: 2, // 提示时常单位为s
  top: '40%', // 距离顶部的位置
  maxCount: 3, // 最多显示提示信息条数(后面的会替换前面的提示)
})
 watch(resumeTypeEnglish,() => {
  themeLanguage.value = validateLanguage('englishInfo', resumeTypeEnglish.value);
 })
  const props = defineProps({
    Languages: {
      type: Object,
      required: true,
    },
    resumeId: {
      type: Number,
      required: true,
    },
    showResumeAdd: {
      type: Boolean,
      required: true,
    },
    resumeData: {
      type: Object,
      required: true,
    }
  });
  const LanguagesTemplates = ref([]);

  const expandUpdateChinese = ref(true);
  if (props.resumeData.nationality == "中国" || props.resumeData.nationality == "China" ) {
    expandUpdateChinese.value = false;
  }
  const languageWholeFlagTemp = ref(false);

  const expandUpdate = ref(false);
  const handleUpdateLanguagesInfo = () => {
    expandUpdate.value = !expandUpdate.value;
  };
  const expand = ref(false);
  let langArr = [];
  let langArr1 = [];
  let langArr2 = [];
  let langArr3 = [];
  let langArr4 = [];
  let langArr5 = [];
  let langArr6 = [];
  let scoreIELTS = ref(null);
  let scoreTOEFL = ref(null);
  let languages = [];
  const languageAbility0 = ref(langArr.length > 0 ? langArr : []);
  const languageAbility1 = ref(langArr1.length > 0 ? langArr1 : []);
  const languageAbility2 = ref(langArr2.length > 0 ? langArr2 : []);
  const languageAbility3 = ref(langArr3.length > 0 ? langArr3 : []);
  const languageAbility4 = ref(langArr4.length > 0 ? langArr4 : []);
  const languageAbility5 = ref(langArr5.length > 0 ? langArr5 : []);
  const languageAbility6 = ref(langArr6.length > 0 ? langArr6 : []);
  const handleLanguages = () => {
  langArr = [];
  langArr1 = [];
  langArr2 = [];
  langArr3 = [];
  langArr4 = [];
  langArr5 = [];
  langArr6 = [];
  scoreIELTS = ref(null);
  scoreTOEFL = ref(null);
  languages = [];
  languageAbility0.value = [];
  languageAbility1.value = [];
  languageAbility2.value = [];
  languageAbility3.value = [];
  languageAbility4.value = [];
  languageAbility5.value = [];
  languageAbility6.value = [];
  LanguagesTemplates.value = [];
    const lang = props.Languages;
    languages = props.Languages;
    if (resumeTypeEnglish.value == "1") {
      languages.forEach(item => {
        let template = {};
        if(item.languageName == '英语') {
          template = {...item,languageName: 'English'};
          if (item.bujia == 3) {
            template = {...template,bujia: themeLanguage?.value?.English?.language3};
          }
        } else if(item.languageName == '法语') {
          template = {...item,languageName: 'French'};
          if (item.bujia == 3) {
            template = {...template,bujia: themeLanguage?.value?.French?.language3};
          }
        } else if(item.languageName == '日语') {
          template = {...item,languageName: 'Japanese'};
          if (item.bujia == 3) {
            template = {...template,bujia: themeLanguage?.value?.Japanese?.language3};
          }
        } else if(item.languageName == '德语') {
          template = {...item,languageName: 'German'};
          if (item.bujia == 3) {
            template = {...template,bujia: themeLanguage?.value?.German?.language3};
          }
        } else if(item.languageName == '韩语') {
          template = {...item,languageName: 'Korean'};
          if (item.bujia == 3) {
            template = {...template,bujia: themeLanguage?.value?.Korean?.language3};
          }
        } else if(item.languageName == '粤语') {
          template = {...item,languageName: 'Cantonese'};
          if (item.bujia == 3) {
            template = {...template,bujia: themeLanguage?.value?.Cantonese?.language3};
          }
        } else if(item.languageName == '中文') {
          template = {...item,languageName: 'Chinese'};
          if (item.bujia == 3) {
            template = {...template,bujia: themeLanguage?.value?.Chinese?.language3};
          }
        }
        LanguagesTemplates.value.push(template)
      })
    } else {
      LanguagesTemplates.value = props.Languages;
    }
  if (lang && lang.length > 0) {
    if (!languageWholeFlagTemp.value) {
        languageWholeFlagTemp.value = true;
        resumeDetailStore.$patch({
          languageWholeFlag: true
        })
      }
    lang.forEach((element) => {
      if (element.languageName == '英语') {
        languageWholeFlagTemp.value = false;
        resumeDetailStore.$patch({
          languageWholeFlag: false
        })
        if (element.languageLevel) {
          langArr = element.languageLevel.split(',').reduce((prev, curr) => {
            if (curr.includes('IELTS')) {
              prev.push('IELTS');
              scoreIELTS.value = curr.split('_')[1];
            } else if (curr.includes('TOEFL')) {
              prev.push('TOEFL');
              scoreTOEFL.value = curr.split('_')[1];
            } else {
              prev.push(curr);
            }
            return prev;
          }, []);
        }
        if (element.tinshuoLiuli) {
          langArr.push(element.tinshuoLiuli);
        }
        if (element.duxieLiuli) {
          langArr.push(element.duxieLiuli);
        }
        if (element.bujia) {
          langArr.push(element.bujia);
        }
        languageAbility0.value = langArr;
      } else {
        if (element.languageName == '法语') {
          if (element.languageLevel) {
            langArr1 = element.languageLevel.split(',');
          }
          if (element.tinshuoLiuli) {
            langArr1.push(element.tinshuoLiuli);
          }
          if (element.duxieLiuli) {
            langArr1.push(element.duxieLiuli);
          }
          if (element.bujia) {
            langArr1.push(element.bujia);
          }
          languageAbility1.value = langArr1;
        }
        if (element.languageName == '日语') {
          if (element.languageLevel) {
            langArr2 = element.languageLevel.split(',');
          }
          if (element.tinshuoLiuli) {
            langArr2.push(element.tinshuoLiuli);
          }
          if (element.duxieLiuli) {
            langArr2.push(element.duxieLiuli);
          }
          if (element.bujia) {
            langArr2.push(element.bujia);
          }
          languageAbility2.value = langArr2;
        }
        if (element.languageName == '德语') {
          if (element.languageLevel) {
            langArr3 = element.languageLevel.split(',');
          }
          if (element.tinshuoLiuli) {
            langArr3.push(element.tinshuoLiuli);
          }
          if (element.duxieLiuli) {
            langArr3.push(element.duxieLiuli);
          }
          if (element.bujia) {
            langArr3.push(element.bujia);
          }
          languageAbility3.value = langArr3;
        }
        if (element.languageName == '韩语') {
          if (element.languageLevel) {
            langArr6 = element.languageLevel.split(',');
          }
          if (element.tinshuoLiuli) {
            langArr6.push(element.tinshuoLiuli);
          }
          if (element.duxieLiuli) {
            langArr6.push(element.duxieLiuli);
          }
          if (element.bujia) {
            langArr6.push(element.bujia);
          }
          languageAbility6.value = langArr6;
        }
        if (element.languageName == '粤语') {
          if (element.languageLevel) {
            langArr4 = element.languageLevel.split(',');
          }
          if (element.tinshuoLiuli) {
            langArr4.push(element.tinshuoLiuli);
          }
          if (element.duxieLiuli) {
            langArr4.push(element.duxieLiuli);
          }
          if (element.bujia) {
            langArr4.push(element.bujia);
          }
          languageAbility4.value = langArr4;
        }
        if (element.languageName == '中文') {
          if (element.languageLevel) {
            langArr5 = element.languageLevel.split(',');
          }
          if (element.tinshuoLiuli) {
            langArr5.push(element.tinshuoLiuli);
          }
          if (element.duxieLiuli) {
            langArr5.push(element.duxieLiuli);
          }
          if (element.bujia) {
            langArr5.push(element.bujia);
          }
          languageAbility5.value = langArr5;
        }
      }
    });
  } else {
    languageWholeFlagTemp.value = true;
        resumeDetailStore.$patch({
          languageWholeFlag: true
        })
  }
  }
  handleLanguages();
  watch(props,() => {
    handleLanguages();
  })
 
  interface Language {
    languageName: string;
    tinshuoLiuli: string;
    duxieLiuli: string;
    bujia: string;
    languageLevel: string;
    resumeId: number;
  }
  let visibleIELTS = ref(false);
  let visibleTOEFL = ref(false);

  const onChangeLanguageAbility = (e) => {
    let languageAbility = [];
    let languageAbility00 = languageAbility0.value.map((item) => item);
    let languageAbility11 = languageAbility1.value.map((item) => item);
    let languageAbility22 = languageAbility2.value.map((item) => item);
    let languageAbility33 = languageAbility3.value.map((item) => item);
    let languageAbility44 = languageAbility4.value.map((item) => item);
    let languageAbility55 = languageAbility5.value.map((item) => item);
    let languageAbility66 = languageAbility6.value.map((item) => item);
    if (languageAbility00.length > 0) {
      let language = {} as Language;
      language.languageName = '英语';
      language.resumeId = props.resumeId;
      // @ts-ignore
      if (languageAbility00.includes('1')) {
        language.tinshuoLiuli = '1';
      } else {
        language.tinshuoLiuli = '';
      }
      // @ts-ignore
      if (languageAbility00.includes('2')) {
        language.duxieLiuli = '2';
      } else {
        language.duxieLiuli = '';
      }
      // @ts-ignore
      if (languageAbility00.includes('3')) {
        language.bujia = '3';
        // @ts-ignore
        languageAbility0.value = ['3'];
        language.languageLevel = '';
        language.tinshuoLiuli = '';
        language.duxieLiuli = '';
      } else {
        language.bujia = '';
        let languageLevel = '';
        let IELTSLevel = '';
        let TOEFLLevel = '';
        if (e.target.type == 'checkbox') {
          if (e.target.value == 'IELTS' && languageAbility00.includes('IELTS')) {
            visibleIELTS.value = true;
          } else {
            visibleIELTS.value = false;
          }
        }
        if (scoreIELTS.value && languageAbility00.includes('IELTS')) {
          IELTSLevel = 'IELTS_' + scoreIELTS.value;
        }
        if (e.target.type == 'checkbox') {
          if (e.target.value == 'TOEFL' && languageAbility00.includes('TOEFL')) {
            visibleTOEFL.value = true;
          } else {
            visibleTOEFL.value = false;
          }
        }
        if (scoreTOEFL.value && languageAbility00.includes('TOEFL')) {
          TOEFLLevel = 'TOEFL_' + scoreTOEFL.value;
        }
        languageLevel = languageAbility00
          .filter(
            (item) =>
              item != '1' && item != '2' && item != '3' && item != 'IELTS' && item != 'TOEFL',
          )
          .join(',');
        if (languageLevel) {
          if (IELTSLevel) {
            languageLevel = languageLevel + ',' + IELTSLevel;
          }
          if (TOEFLLevel) {
            languageLevel = languageLevel + ',' + TOEFLLevel;
          }
        } else {
          if (IELTSLevel) {
            languageLevel = IELTSLevel;
          }
          if (languageLevel) {
            if (TOEFLLevel) {
              languageLevel = languageLevel + ',' + TOEFLLevel;
            }
          } else {
            if (TOEFLLevel) {
              languageLevel = TOEFLLevel;
            }
          }
        }
        language.languageLevel = languageLevel;
      }
      if (
        language.bujia ||
        language.duxieLiuli ||
        language.tinshuoLiuli ||
        language.languageLevel
      ) {
        // @ts-ignore
        languageAbility.push(language);
      }
    }
    if (languageAbility11.length > 0) {
      let language = {} as Language;
      language.languageName = '法语';
      language.resumeId = props.resumeId;
      // @ts-ignore
      if (languageAbility11.includes('1')) {
        language.tinshuoLiuli = '1';
      } else {
        language.tinshuoLiuli = '';
      }
      // @ts-ignore
      if (languageAbility11.includes('2')) {
        language.duxieLiuli = '2';
      } else {
        language.duxieLiuli = '';
      }
      // @ts-ignore
      if (languageAbility11.includes('3')) {
        language.bujia = '3';
        // @ts-ignore
        languageAbility1.value = ['3'];
        language.languageLevel = '';
        language.tinshuoLiuli = '';
        language.duxieLiuli = '';
      } else {
        language.bujia = '';
        let languageLevel = languageAbility11
          .filter((item) => item != '1' && item != '2' && item != '3')
          .join(',');
        language.languageLevel = languageLevel;
      }
      // @ts-ignore
      languageAbility.push(language);
    }
    if (languageAbility22.length > 0) {
      let language = {} as Language;
      language.languageName = '日语';
      language.resumeId = props.resumeId;
      // @ts-ignore
      if (languageAbility22.includes('1')) {
        language.tinshuoLiuli = '1';
      } else {
        language.tinshuoLiuli = '';
      }
      // @ts-ignore
      if (languageAbility22.includes('2')) {
        language.duxieLiuli = '2';
      } else {
        language.duxieLiuli = '';
      }
      // @ts-ignore
      if (languageAbility22.includes('3')) {
        language.bujia = '3';
        // @ts-ignore
        languageAbility2.value = ['3'];
        language.languageLevel = '';
        language.tinshuoLiuli = '';
        language.duxieLiuli = '';
      } else {
        language.bujia = '';
        let languageLevel = languageAbility22
          .filter((item) => item != '1' && item != '2' && item != '3')
          .join(',');
        language.languageLevel = languageLevel;
      }

      // @ts-ignore
      languageAbility.push(language);
    }
    if (languageAbility33.length > 0) {
      let language = {} as Language;
      language.languageName = '德语';
      language.resumeId = props.resumeId;
      // @ts-ignore
      if (languageAbility33.includes('1')) {
        language.tinshuoLiuli = '1';
      } else {
        language.tinshuoLiuli = '';
      }
      // @ts-ignore
      if (languageAbility33.includes('2')) {
        language.duxieLiuli = '2';
      } else {
        language.duxieLiuli = '';
      }
      // @ts-ignore
      if (languageAbility33.includes('3')) {
        language.bujia = '3';
        // @ts-ignore
        languageAbility3.value = ['3'];
        language.languageLevel = '';
        language.tinshuoLiuli = '';
        language.duxieLiuli = '';
      } else {
        language.bujia = '';
        let languageLevel = languageAbility33
          .filter((item) => item != '1' && item != '2' && item != '3')
          .join(',');
        language.languageLevel = languageLevel;
      }

      // @ts-ignore
      languageAbility.push(language);
    }
    if (languageAbility44.length > 0) {
      let language = {} as Language;
      language.languageName = '粤语';
      language.resumeId = props.resumeId;
      // @ts-ignore
      if (languageAbility44.includes('1')) {
        language.tinshuoLiuli = '1';
      } else {
        language.tinshuoLiuli = '';
      }
      // @ts-ignore
      if (languageAbility44.includes('2')) {
        language.duxieLiuli = '2';
      } else {
        language.duxieLiuli = '';
      }
      // @ts-ignore
      if (languageAbility44.includes('3')) {
        language.bujia = '3';
        // @ts-ignore
        languageAbility4.value = ['3'];
        language.tinshuoLiuli = '';
        language.duxieLiuli = '';
      } else {
        language.bujia = '';
      }
      //let languageLevel = languageAbility3.filter((item) => item != "1" && item != "2" && item != "3").join(",");
      language.languageLevel = '';
      // @ts-ignore
      languageAbility.push(language);
    }
    if (languageAbility55.length > 0) {
      let language = {} as Language;
      language.languageName = '中文';
      language.resumeId = props.resumeId;
      // @ts-ignore
      if (languageAbility55.includes('1')) {
        language.tinshuoLiuli = '1';
        language.bujia = '';
      } else {
        language.tinshuoLiuli = '';
      }
      // @ts-ignore
      if (languageAbility55.includes('2')) {
        language.duxieLiuli = '2';
        language.bujia = '';
      } else {
        language.duxieLiuli = '';
      }
      // @ts-ignore
      if (languageAbility55.includes('3')) {
        language.bujia = '3';
        // @ts-ignore
        languageAbility5.value = ['3'];
        language.languageLevel = '';
        language.tinshuoLiuli = '';
        language.duxieLiuli = '';
      } else {
        language.bujia = '';
        let languageLevel = languageAbility55
          .filter((item) => item != '1' && item != '2' && item != '3')
          .join(',');
        language.languageLevel = languageLevel;
      }

      // @ts-ignore
      languageAbility.push(language);
    }
    if (languageAbility66.length > 0) {
      let language = {} as Language;
      language.languageName = '韩语';
      language.resumeId = props.resumeId;
      // @ts-ignore
      if (languageAbility66.includes('1')) {
        language.tinshuoLiuli = '1';
      } else {
        language.tinshuoLiuli = '';
      }
      // @ts-ignore
      if (languageAbility66.includes('2')) {
        language.duxieLiuli = '2';
      } else {
        language.duxieLiuli = '';
      }
      // @ts-ignore
      if (languageAbility66.includes('3')) {
        language.bujia = '3';
        // @ts-ignore
        languageAbility6.value = ['3'];
        language.languageLevel = '';
        language.tinshuoLiuli = '';
        language.duxieLiuli = '';
      } else {
        language.bujia = '';
        let languageLevel = languageAbility66
          .filter((item) => item != '1' && item != '2' && item != '3')
          .join(',');
        language.languageLevel = languageLevel;
      }

      // @ts-ignore
      languageAbility.push(language);
    }
    languages = languageAbility;
  };
  let iconLoading = ref(false);
  const loginVueUser: {loginName: "", loginId: "", loginTocken: ""} = JSON.parse(localStorage.getItem("loginVueUser"));
const onFinish = () => {
    const temp = languages.filter(item => item.languageName == "英语");
    if (temp.length == 0) {
      message.warning("请填写英文能力");
      return;
    }
    if (languages.length > 0) {
      iconLoading.value = true;
      let temp = {
        recruitId: loginVueUser.loginId,
        resumeLanguagelist: languages
      }
      resumeDetailStore
        .updateResumeLanguage(temp)
        .then((res) => {
          if (res == "Y") {
            resumeDetailStore.queryResumeDetail().then(() => {
            expandUpdate.value = !expandUpdate.value;
            iconLoading.value = false;
            message.success('保存成功');
          });
          } else {
            message.error('保存失败');
          }
        })
        .catch(() => {
          message.error('保存失败');
        });
    }
  };
</script>
<style lang="less" scoped>
  .resume_header {
    margin: 10px 20px;
  }
  .resume_header_update {
    margin-top: 10px;
    padding: 0 20px 20px;
    border-radius: 5px;
    border: 1px solid #ccc;
    box-shadow: 0 0 2px #cccc;
  }
  .resume_h4 {
    margin: 15px 0 5px 0;
    font-size: 18px;
  }
  .resume_detail_title {
    font-size: 14px;
    text-align: left;
    font-weight: 700;
    display: flex;
    justify-content: space-between;
  }
  .resume_row {
    margin-bottom: 20px;
    padding-left: 25px;
  }
  .resume_detail_btn {
    display: flex;
    justify-content: center;
  }
  .resume_span{
    padding-left: 15px;
  }
  :deep(.languageAbility0) {
    margin-bottom: 0;
  }
</style>
