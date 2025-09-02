<template>
    <a-drawer
    v-model:open="mappingCandidateFlag"
    title="M新增"
    :maskClosable="false"
    :keyboard="false"
    :closable="false"
    :width="drawerWidth"
    :bodyStyle="{ padding: '10px' }"
    :headerStyle="{ padding: '5px 18px 5px 12px' }"
    placement="right"
  >
    <template #extra>
      <CloseOutlined @click="handleCloseMappingCandidate" />
    </template>
  <div class="resume-content-search" v-if="mappingCandidateSearchFlag">
    <a-form ref="formRef" :model="formState" @finish="handleQueryMappingCandidate">
     <a-row :gutter="24">
       <a-col :span="spanCol">
        <a-form-item
            name="userName"
            label="姓名"
            :rules="[{ required: true, message: '请填写姓名' }]"
          >
            <a-input
              v-model:value="formState.userName"
            />
          </a-form-item>
        </a-col>
        <a-col :span="spanCol">
        <a-form-item
            name="phone"
            label="手机"
            :rules="[{ required: true, message: '请填写手机' }]"
          >
            <a-input
              v-model:value="formState.phone"
            />
          </a-form-item>
      </a-col>
      <a-col :span="5">
        <a-form-item
            name="sex"
            label="性别"
            :rules="[{ required: true, message: '请选择性别' }]"
          >
            <a-radio-group
              v-model:value="formState.sex"
              :options="genderOptions"
            ></a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :span="spanCol">
          <a-button type="primary" size="small" html-type="submit">查询</a-button>
        </a-col>
        </a-row>
    </a-form>
  </div>
  <div class="resume-content-search resume-content-search-add" v-if="mappingCandidateByPhoneFlag != 0">
    <a-row :gutter="24" v-if="mappingCandidateByPhoneFlag == 2">
      <a-col :span="24">
        此候选人公司数据库中有Mapping信息，系统已经自动匹配数居，请核对其信息是否正确!
      </a-col>
    </a-row>
    <a-row :gutter="24" v-if="mappingCandidateByPhoneFlag == 1">
      <a-col :span="24">
        此候选人公司数据库中无数据，恭喜您第一位新增，请务必填写正确信息!
      </a-col>
    </a-row>
    </div>
     <div class="resume-content" v-if="mappingCandidateByPhoneFlag != 0">
      <a-form ref="formRef" :model="formStateAdd" @finish="handleQueryMappingCandidate">
      <a-row :gutter="24" class="resume-title-border">
        <a-col :span="24" class="resume-title">
        基本信息
        </a-col>
      </a-row>
       <a-row :gutter="24">
        <a-col :span="spanCol">
        <a-form-item
            name="userName"
            label="姓名"
            :rules="[{ required: true, message: '请填写姓名' }]"
          >
            <a-input
              v-model:value="formStateAdd.userName"
            />
          </a-form-item>
        </a-col>
        <a-col :span="spanCol">
        <a-form-item
            name="phone"
            label="手机"
            :rules="[{ required: true, message: '请填写手机' }]"
          >
            <a-input
              v-model:value="formStateAdd.phone"
            />
          </a-form-item>
      </a-col>
      <a-col :span="5">
        <a-form-item
            name="sex"
            label="性别"
            :rules="[{ required: true, message: '请选择性别' }]"
          >
            <a-radio-group
              v-model:value="formStateAdd.sex"
              :options="genderOptions"
            ></a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :span="spanCol">
          <a-button type="primary" size="small">跳转简历</a-button>
        </a-col>
      </a-row>
      <a-row :gutter="24" class="resume-title-border">
        <a-col :span="24" class="resume-title">
        工作信息
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="3">
        <a-form-item
            name="category"
            label="类别"
            :rules="[{ required: true, message: '请选择类别' }]"
          >
            <a-select
              v-model:value="formStateAdd.category"
              :options="categoryOptions"
              @change="handleChangeCategory"
            />
          </a-form-item>
        </a-col>
        <a-col :span="3">
        <a-form-item
            name="place"
            label="城市"
            :rules="[{ required: true, message: '请选择城市' }]"
          >
            <a-select
              v-model:value="formStateAdd.place"
              :options="optionsCity"
              showSearch
              optionFilterProp="label"
              @change="handleChangeCity"
            />
          </a-form-item>
        </a-col>
        <a-col :span="4" v-if="formStateAdd.category == '店铺'">
        <a-form-item
            name="market"
            label="商场"
            :rules="[{ required: true, message: '请选择商场' }]"
          >
            <a-select
              v-model:value="formStateAdd.market"
              :options="optionsMarket"
              optionFilterProp="label"
              showSearch
              @change="handleMarketBrandFloor"
              @search="handleCityAndMarktName"
            />
          </a-form-item>
        </a-col>
        <a-col :span="4">
        <a-form-item
            name="brand"
            label="品牌"
            :rules="[{ required: true, message: '请选择品牌' }]"
          >
            <a-select
              v-model:value="formStateAdd.brand"
              :options="optionsBrand"
              @change="handleMarketBrandFloor('1')"
              showSearch
            />
          </a-form-item>
        </a-col>
         <a-col :span="3" v-if="formStateAdd.category == '店铺'">
        <a-form-item
            name="floor"
            label="楼层"
            :rules="[{ required: true, message: '请选择楼层' }]"
          >
            <a-select
              v-model:value="formStateAdd.floor"
              :options="optionsFloor"
            />
          </a-form-item>
        </a-col>
         <a-col :span="4">
        <a-form-item
            name="position"
            label="职位"
            :rules="[{ required: true, message: '请选择职位' }]"
          >
            <a-select
              v-model:value="formStateAdd.position"
              :options="optionsPosition"
            />
          </a-form-item>
        </a-col>
        <a-col :span="3">
        <a-form-item
            name="jubStatus"
            label="职状"
            :rules="[{ required: true, message: '请选择职状' }]"
          >
            <a-select
              v-model:value="formStateAdd.jubStatus"
              :options="jubStatusOptions"
            />
          </a-form-item>
        </a-col>
        </a-row>
         <a-row :gutter="24">
          <a-col :span="24" style="display: flex;justify-content: center;">
            <a-button type="primary" size="small" html-type="submit">确认以上信息正确并提交</a-button>
          </a-col>
         </a-row>
      </a-form>
     </div>
  </a-drawer>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { message } from 'ant-design-vue';
import { CloseOutlined } from '@ant-design/icons-vue';
import {useMappingListStoreWithOut} from '/@/store/modules/mappingList';
const mappingListStore = useMappingListStoreWithOut();
const {mappingCandidateFlag, province} = storeToRefs(mappingListStore);
const drawerWidth = ref(1100);
const optionsCity = ref([]);

const optionsBrand = ref([]);
mappingListStore.queryBranList().then((res) => {
    if (res.code == 1) {
      optionsBrand.value = res.info?.brandList?.map((item) => {
        return {
          label: `${[item.cnName, item.usName].filter(val => val != null && val?.trim()).join("/")}(${item.category})`,
          value: item.brandId?.toString(),
        }
      })
    }
});
const loadOptionsCity = () => {
    optionsCity.value = province.value.reduce((prev, curr) => {
            //@ts-ignore
            if (
              (curr.provinceName == curr.cityName || !curr.cityName) &&
              !(curr.cityName == '吉林' || curr.cityName == '海南')
            ) {
              //@ts-ignore
              prev.push({
                //@ts-ignore
                label: curr.provinceName,
                //@ts-ignore
                value: curr.id?.toString(),
              });
            } else {
              //@ts-ignore
              prev.push({
                //@ts-ignore
                label: curr.cityName,
                //@ts-ignore
                value: curr.id?.toString(),
              });
            }
            return prev;
          }, []);
}
watch(province,() => {
loadOptionsCity();
});
const optionsMarket = ref([]);
const handleChangeCity = () => {
  mappingListStore.queryMarkList(formStateAdd.value.place,"").then((res) => {
      if(res.code == 1) {
        formStateAdd.value.market = "";
        formStateAdd.value.brand = "";
        formStateAdd.value.floor = "";
        optionsMarket.value = res.info?.map((item) => {
          return {
            label: item.text,
            value: item.id?.toString(),
          }
        })
      }
    })
    
}
const handleCityAndMarktName = (val: string) => {
  mappingListStore.queryMarkList(formStateAdd.value.place,val).then((res) => {
      if(res.code == 1) {
        optionsMarket.value = res.info?.map((item) => {
          return {
            label: item.text,
            value: item.id?.toString(),
          }
        })
      }
    })
}
const optionsFloor = ref([]);
const handleMarketBrandFloor = (type = '') => {
  if (type != '1') {
     formStateAdd.value.floor = '';
     optionsFloor.value = [];
  }
   if (
      formStateAdd.value.category == 'OFFICE' ||
      !formStateAdd.value.market ||
      !formStateAdd.value.brand
    ) {
      return;
    }
  mappingListStore.queryMarkBrandFloor(formStateAdd.value.market, formStateAdd.value.brand || '').then((res) => {
    if (res.code == 1) {
      optionsFloor.value = res.info?.map((item) => {
        return {
          label: item?.floor,
          value: item?.floor,
        }
      })
      formStateAdd.value.floor = res.info[0]?.floor;
    } else {
       formStateAdd.value.floor = '';
       optionsFloor.value = [];
       message.error('该商场无此品牌数据，商场信息中添加该品牌楼层信息！');
    }
  })
}
const optionsPosition = ref([]);
const handleChangeCategory = () => {
  formStateAdd.value.market = '';
  formStateAdd.value.floor = '';
  mappingListStore.queryResumePositions(formStateAdd.value.category).then((res) => {
    if(res.code == 1) {
      formStateAdd.value.position = '';
      optionsPosition.value = res.info?.postList?.map((item) => {
        return {
          label: [item.cnPosition, item.usPosition].filter(val => val != null && val.trim() !== '').join('/'),
          value: item.positionId?.toString(),
        }
      })
    }
  })
}
let spanCol = 6;
const genderOptions = ref([
    { label: '男', value: 'M' },
    { label: '女', value: 'F' },
  ]);
  const categoryOptions = ref([
        { value: '店铺', label: '店铺' },
        { value: 'OFFICE', label: 'OFFICE' },
      ]);
  const jubStatusOptions = ref([
        { value: '在职', label: '在职' },
        { value: '离职', label: '离职' },
      ]);    
  interface SearchMappingCandidate {
    userName?: string;
    phone?: string;
    sex?: string; 
  }
   interface addMappingCandidate {
    userName?: string;
    phone?: string;
    sex?: string; 
    category?: string;
    place?: string;
    market?: string;
    brand?: string;
    floor?: string;
    position?: string;
    jubStatus?: string;
  }
  const formState = ref<SearchMappingCandidate>({} as SearchMappingCandidate);
  const formStateAdd = ref<addMappingCandidate>({} as addMappingCandidate);
  const mappingCandidateByPhoneFlag = ref(0);
  const mappingCandidateSearchFlag = ref(true);
  const handleQueryMappingCandidate = () => {
    mappingListStore.queryMappingCandidateByPhone(formState.value).then((res) => {
      if(res.code == 1) {
        mappingCandidateByPhoneFlag.value = 1;
      } else {
        mappingCandidateByPhoneFlag.value = 2;
      }
      mappingCandidateSearchFlag.value = false;
      formStateAdd.value = {
        userName: formState.value.userName,
        phone: formState.value.phone,
        sex: formState.value.sex,
      } as addMappingCandidate;
    }); 
  }
const handleCloseMappingCandidate = () => {
  mappingListStore.handleMappingCandidateFlag(); 
  mappingCandidateSearchFlag.value = true;
  mappingCandidateByPhoneFlag.value = 0;
  formStateAdd.value = {} as addMappingCandidate;
  formState.value = {} as SearchMappingCandidate;
}
</script>
<style lang="less" scoped>
  .resume-content,
  .resume-content-search {
    background-color: #fff;
    box-shadow: 0 0 2px #ccc;
    border-radius: 5px;
    overflow: hidden;
    padding: 20px;
  }
  .resume-content-search {
    margin-bottom: 10px;
    padding-bottom: 9px;
  }
  .resume-content-search .ant-form-item {
    margin-bottom: 10px !important;
  }
  .resume-content-search-add {
    padding-top: 8px;
  }
  .resume-title {
    font-size: 14px;
    font-weight: bold;
  }
  .resume-title-border {
    border-bottom: 1px solid #e6e6e6;
    margin-bottom: 14px;
  }
</style>