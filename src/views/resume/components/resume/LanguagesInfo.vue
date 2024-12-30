<template>
  <div>
    <a-card class="resume_card">
      <h3>语言能力</h3>
      <a-divider style="height: 1px; background-color: #ccc" dashed />
      <a-form :model="languageAbility0">
        <!-- <a-row v-for="(item, index) in languages" :key="index">
          <a-col :span="24">
            <a-form-item
              name="languageAbility"
              label="{item.title}"
              :label-col="{ span: 1 }"
              :wrapper-col="{ span: 23 }"
              :rules="[{ required: true, message: '请输入语言能力' }]"
            >
              <a-checkbox-group :options="item.languageAbility">
                <template #label="{ {item.languageAbility.label} }">
                  <span style="color: red">{{ item.languageAbility.value }}</span>
                </template>
              </a-checkbox-group>
              <a v-if="index === 0" style="font-size: 12px" @click="expand = !expand">
                <template v-if="expand">
                  <UpOutlined style="vertical-align: middle" />
                </template>
                <template v-else>
                  <DownOutlined style="vertical-align: middle" />
                </template>
                更多
              </a>
            </a-form-item>
          </a-col>
        </a-row> -->
        <a-row>
          <a-col :span="24">
            <a-form-item
              name="languageAbility0"
              label="英语"
              :label-col="{ span: 1 }"
              :wrapper-col="{ span: 23 }"
              @change="onChangeLanguageAbility"
              :rules="[{ required: false, message: '请输入语言能力' }]"
            >
              <a-checkbox-group v-model:value="languageAbility0">
                <a-checkbox value="1">听说流利</a-checkbox>
                <a-checkbox value="2">读写流利</a-checkbox>
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
                <a-checkbox value="3">英语不佳</a-checkbox>
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
          </a-col>
        </a-row>
        <a-row v-if="expand">
          <a-col :span="24">
            <a-form-item
              name="languageAbility1"
              label="法语"
              :label-col="{ span: 1 }"
              :wrapper-col="{ span: 23 }"
              @change="onChangeLanguageAbility"
              :rules="[{ required: false, message: '请输入语言能力' }]"
            >
              <a-checkbox-group v-model:value="languageAbility1">
                <a-checkbox value="1">听说流利</a-checkbox>
                <a-checkbox value="2">读写流利</a-checkbox>
                <a-checkbox value="TFU-4">TFU-4</a-checkbox>
                <a-checkbox value="TFS-4">TFS-4</a-checkbox>
                <a-checkbox value="TFS-8">TFS-8</a-checkbox>
                <a-checkbox value="DALF-C1">DALF-C1</a-checkbox>
                <a-checkbox value="DALF-C2">DALF-C2</a-checkbox>
                <a-checkbox value="DELF-A1">DELF-A1</a-checkbox>
                <a-checkbox value="DELF-A2">DELF-A2</a-checkbox>
                <a-checkbox value="DELF-A3">DELF-A3</a-checkbox>
                <a-checkbox value="DELF-A4">DELF-A4</a-checkbox>
                <a-checkbox value="3">法语不佳</a-checkbox>
              </a-checkbox-group>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row v-if="expand">
          <a-col :span="24">
            <a-form-item
              name="languageAbility2"
              label="日语"
              :label-col="{ span: 1 }"
              :wrapper-col="{ span: 23 }"
              @change="onChangeLanguageAbility"
              :rules="[{ required: false, message: '请输入语言能力' }]"
            >
              <a-checkbox-group v-model:value="languageAbility2">
                <a-checkbox value="1">听说流利</a-checkbox>
                <a-checkbox value="2">读写流利</a-checkbox>
                <a-checkbox value="JLPT-N1">JLPT-N1</a-checkbox>
                <a-checkbox value="JLPT-N2">JLPT-N2</a-checkbox>
                <a-checkbox value="JLPT-N3">JLPT-N3</a-checkbox>
                <a-checkbox value="JLPT-N4">JLPT-N4</a-checkbox>
                <a-checkbox value="JLPT-N5">JLPT-N5</a-checkbox>
                <a-checkbox value="3">日语不佳</a-checkbox>
              </a-checkbox-group>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row v-if="expand">
          <a-col :span="24">
            <a-form-item
              name="languageAbility3"
              label="德语"
              :label-col="{ span: 1 }"
              :wrapper-col="{ span: 23 }"
              @change="onChangeLanguageAbility"
              :rules="[{ required: false, message: '请输入语言能力' }]"
            >
              <a-checkbox-group v-model:value="languageAbility3">
                <a-checkbox value="1">听说流利</a-checkbox>
                <a-checkbox value="2">读写流利</a-checkbox>
                <a-checkbox value="CEFR-A1">CEFR-A1</a-checkbox>
                <a-checkbox value="CEFR-A2">CEFR-A2</a-checkbox>
                <a-checkbox value="CEFR-B1">CEFR-B1</a-checkbox>
                <a-checkbox value="CEFR-B2">CEFR-B2</a-checkbox>
                <a-checkbox value="CEFR-C1">CEFR-C1</a-checkbox>
                <a-checkbox value="CEFR-C2">CEFR-C2</a-checkbox>
                <a-checkbox value="3">德语不佳</a-checkbox>
              </a-checkbox-group>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row v-if="expand">
          <a-col :span="24">
            <a-form-item
              name="languageAbility6"
              label="韩语"
              :label-col="{ span: 1 }"
              :wrapper-col="{ span: 23 }"
              @change="onChangeLanguageAbility"
              :rules="[{ required: false, message: '请输入语言能力' }]"
            >
              <a-checkbox-group v-model:value="languageAbility6">
                <a-checkbox value="1">听说流利</a-checkbox>
                <a-checkbox value="2">读写流利</a-checkbox>
                <a-checkbox value="TOPIK I">TOPIK I</a-checkbox>
                <a-checkbox value="TOPIK II">TOPIK II</a-checkbox>
                <a-checkbox value="3">韩语不佳</a-checkbox>
              </a-checkbox-group>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row v-if="expand">
          <a-col :span="24">
            <a-form-item
              name="languageAbility4"
              label="粤语"
              :label-col="{ span: 1 }"
              :wrapper-col="{ span: 23 }"
              @change="onChangeLanguageAbility"
              :rules="[{ required: false, message: '请输入语言能力' }]"
            >
              <a-checkbox-group v-model:value="languageAbility4">
                <a-checkbox value="1">听说流利</a-checkbox>
                <a-checkbox value="2">读写流利</a-checkbox>
                <a-checkbox value="3">粤语不佳</a-checkbox>
              </a-checkbox-group>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row v-if="expand">
          <a-col :span="24">
            <a-form-item
              name="languageAbility5"
              label="中文"
              :label-col="{ span: 1 }"
              :wrapper-col="{ span: 23 }"
              @change="onChangeLanguageAbility"
              :rules="[{ required: false, message: '请输入语言能力' }]"
            >
              <a-checkbox-group v-model:value="languageAbility5">
                <a-checkbox value="1">听说流利</a-checkbox>
                <a-checkbox value="2">读写流利</a-checkbox>
                <a-checkbox value="HSK一级">HSK一级</a-checkbox>
                <a-checkbox value="HSF二级">HSF二级</a-checkbox>
                <a-checkbox value="HSK三级">HSK三级</a-checkbox>
                <a-checkbox value="HSK四级">HSK四级</a-checkbox>
                <a-checkbox value="HSK五级">HSK五级</a-checkbox>
                <a-checkbox value="HSK六级">HSK六级</a-checkbox>
                <a-checkbox value="3">中文不佳</a-checkbox>
              </a-checkbox-group>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-card>
  </div>
</template>
<script lang="ts" setup>
  import { defineProps } from 'vue';
  import { DownOutlined, UpOutlined } from '@ant-design/icons-vue';
  import { useResumeStoreWithOut } from '/@/store/modules/resume';
  const props = defineProps({
    resumeLanguageList: {
      type: Object,
      required: true,
    },
  });
  const expand = ref(false);
  let langArr = [];
  const lang = props.resumeLanguageList.languageAbility;
  if (props.resumeLanguageList && lang && lang.length > 0) {
    lang.forEach((element) => {
      if (element.languageName == '英语') {
        langArr = element.languageLevel.split(',');
      }
    });
  }
  const languageAbility0 = ref(langArr.length > 0 ? langArr : []);
  const languageAbility1 = ref([]);
  const languageAbility2 = ref([]);
  const languageAbility3 = ref([]);
  const languageAbility4 = ref([]);
  const languageAbility5 = ref([]);
  const languageAbility6 = ref([]);
  //   const state = reactive({
  //   languageAbility0: [],
  //   languageAbility1: [],
  //   languageAbility2: [],
  //   languageAbility3: [],
  //   languageAbility4: [],
  //   languageAbility5: [],
  // });
  // onMounted(() => {

  // })
  interface Language {
    languageName: string;
    tinshuoLiuli: string;
    duxieLiuli: string;
    bujia: string;
    languageLevel: string;
  }
  let visibleIELTS = ref(false);
  let visibleTOEFL = ref(false);
  let scoreIELTS = ref(null);
  let scoreTOEFL = ref(null);
  const resumeStore = useResumeStoreWithOut();
  const onChangeLanguageAbility = (e) => {
    let languageAbility00 = languageAbility0.value.map((item) => item);
    let languageAbility11 = languageAbility1.value.map((item) => item);
    let languageAbility22 = languageAbility2.value.map((item) => item);
    let languageAbility33 = languageAbility3.value.map((item) => item);
    let languageAbility44 = languageAbility4.value.map((item) => item);
    let languageAbility55 = languageAbility5.value.map((item) => item);
    let languageAbility66 = languageAbility6.value.map((item) => item);
    let languageAbility = [];
    if (languageAbility00.length > 0) {
      let language = {} as Language;
      language.languageName = '英语';
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
          .filter((item) => item != '1' && item != '2' && item != '3' && item != 'IELTS' && item != 'TOEFL')
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
        languageAbility11 = ['3'];
        language.languageLevel = '';
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
        languageAbility22 = ['3'];
        language.languageLevel = '';
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
        languageAbility33 = ['3'];
        language.languageLevel = '';
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
        languageAbility44 = ['3'];
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
      language.languageName = '汉语';
      // @ts-ignore
      if (languageAbility55.includes('1')) {
        language.tinshuoLiuli = '1';
      } else {
        language.tinshuoLiuli = '';
      }
      // @ts-ignore
      if (languageAbility55.includes('2')) {
        language.duxieLiuli = '2';
      } else {
        language.duxieLiuli = '';
      }
      // @ts-ignore
      if (languageAbility55.includes('3')) {
        language.bujia = '3';
        // @ts-ignore
        languageAbility55 = ['3'];
        language.languageLevel = '';
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
        languageAbility66 = ['3'];
        language.languageLevel = '';
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
    if (languageAbility.length > 0) {
      resumeStore.addLlanguagesInfoData(languageAbility);
    }
    console.log(languageAbility);
  };

  // const languages = [
  //   {
  //     title: '英语',
  //     languageAbility: [
  //       { label: '听说流利', value: '1' },
  //       { label: '读写流利', value: '2' },
  //       { label: 'CTE-4', value: 'CTE-4' },
  //       { label: 'CTE-6', value: 'CTE-6' },
  //       { label: 'TEM-4', value: 'TEM-4' },
  //       { label: 'TEM-8', value: 'TEM-8' },
  //       { label: 'IELTS', value: 'IELTS' },
  //       { label: 'TOEFL', value: 'TOEFL' },
  //       { label: '英文不佳', value: '3' },
  //     ],
  //   },
  //   {
  //     title: '法语',
  //     languageAbility: [
  //       { label: '听说流利', value: '1' },
  //       { label: '读写流利', value: '2' },
  //       { label: 'CTE-4', value: 'CTE-4' },
  //       { label: 'CTE-6', value: 'CTE-6' },
  //       { label: 'TEM-4', value: 'TEM-4' },
  //       { label: 'TEM-8', value: 'TEM-8' },
  //       { label: 'IELTS', value: 'IELTS' },
  //       { label: 'TOEFL', value: 'TOEFL' },
  //       { label: '法语不佳', value: '3' },
  //     ],
  //   },
  //   {
  //     title: '日语',
  //     languageAbility: [
  //       { label: '听说流利', value: '1' },
  //       { label: '读写流利', value: '2' },
  //       { label: 'CTE-4', value: 'CTE-4' },
  //       { label: 'CTE-6', value: 'CTE-6' },
  //       { label: 'TEM-4', value: 'TEM-4' },
  //       { label: 'TEM-8', value: 'TEM-8' },
  //       { label: 'IELTS', value: 'IELTS' },
  //       { label: 'TOEFL', value: 'TOEFL' },
  //       { label: '日语不佳', value: '3' },
  //     ],
  //   },
  //   {
  //     title: '德语',
  //     languageAbility: [
  //       { label: '听说流利', value: '1' },
  //       { label: '读写流利', value: '2' },
  //       { label: 'CTE-4', value: 'CTE-4' },
  //       { label: 'CTE-6', value: 'CTE-6' },
  //       { label: 'TEM-4', value: 'TEM-4' },
  //       { label: 'TEM-8', value: 'TEM-8' },
  //       { label: 'IELTS', value: 'IELTS' },
  //       { label: 'TOEFL', value: 'TOEFL' },
  //       { label: '德语不佳', value: '3' },
  //     ],
  //   },
  //   {
  //     title: '粤语',
  //     languageAbility: [
  //       { label: '听说流利', value: '1' },
  //       { label: '读写流利', value: '2' },
  //       { label: 'CTE-4', value: 'CTE-4' },
  //       { label: 'CTE-6', value: 'CTE-6' },
  //       { label: 'TEM-4', value: 'TEM-4' },
  //       { label: 'TEM-8', value: 'TEM-8' },
  //       { label: 'IELTS', value: 'IELTS' },
  //       { label: 'TOEFL', value: 'TOEFL' },
  //       { label: '粤语不佳', value: '3' },
  //     ],
  //   },
  //   {
  //     title: '汉语',
  //     languageAbility: [
  //       { label: '听说流利', value: '1' },
  //       { label: '读写流利', value: '2' },
  //       { label: 'CTE-4', value: 'CTE-4' },
  //       { label: 'CTE-6', value: 'CTE-6' },
  //       { label: 'TEM-4', value: 'TEM-4' },
  //       { label: 'TEM-8', value: 'TEM-8' },
  //       { label: 'IELTS', value: 'IELTS' },
  //       { label: 'TOEFL', value: 'TOEFL' },
  //       { label: '汉语不佳', value: '3' },
  //     ],
  //   },
  // ];
  // const state = reactive({
  //   languageAbility5: [],
  // });
</script>
<style scoped></style>
