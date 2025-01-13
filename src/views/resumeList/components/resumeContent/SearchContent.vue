<template>
  <div>
    <a-row :gutter="24" v-if="expand > 0">
      <a-col :span="spanCol">
        <a-form-item :label-col="{ span: labelCol }" name="hangye" label="行业">
          <a-select
            v-model:value="formState.hangye"
            :options="optionsHangye"
            :max-tag-text-length="3"
            :max-tag-count="1"
            mode="multiple"
            :allowClear="true"
            @change="handleHangye"
          ></a-select>
        </a-form-item>
      </a-col>
      <a-col :span="spanCol">
        <a-form-item name="positionType" title="职位类别" label="职类">
          <a-select
            v-model:value="formState.positionType"
            :options="optionsPositionType"
            :max-tag-text-length="maxTagTextLength"
            :max-tag-count="maxTagCount"
            mode="multiple"
            :allowClear="true"
            @change="handlePositionType"
          ></a-select>
        </a-form-item>
      </a-col>
      <a-col :span="spanCol">
        <a-form-item name="positionLevel" title="职位级别" label="职级">
          <a-select
            v-model:value="formState.positionLevel"
            :options="optionsPositionLevel"
            :max-tag-text-length="maxTagTextLength"
            :max-tag-count="maxTagCount"
            mode="multiple"
            :allowClear="true"
            @change="handlePositions"
          ></a-select>
        </a-form-item>
      </a-col>
      <a-col :span="spanCol">
        <a-form-item name="positionId" label="职位">
          <a-select
            v-model:value="formState.positionId"
            :max-tag-text-length="maxTagTextLength"
            :max-tag-count="maxTagCount"
            mode="multiple"
            optionFilterProp="label"
            :allowClear="true"
            :options="optionsPositions"
          ></a-select>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="24" v-if="expand > 0">
      <a-col :span="spanCol">
        <a-form-item :label-col="{ span: labelCol }" name="city" label="城市">
          <a-tree-select
            v-model:value="formState.city"
            tree-node-filter-prop="label"
            allow-clear
            multiple
            show-search
            tree-default-expand-all
            :max-tag-text-length="maxTagTextLength"
            :max-tag-count="maxTagCount"
            @change="handleMarkId"
            :tree-data="optionsCity"
          />
        </a-form-item>
      </a-col>
      <a-col :span="spanCol">
        <a-form-item name="pinlei" title="品牌品类" label="品类">
          <a-select
            v-model:value="formState.pinlei"
            :options="optionsPinlei"
            :max-tag-text-length="maxTagTextLength"
            :max-tag-count="maxTagCount"
            mode="multiple"
            :allowClear="true"
            @change="handlePinlei"
          ></a-select>
        </a-form-item>
      </a-col>
      <a-col :span="spanCol">
        <a-form-item name="leibie" title="品牌类别" label="类别">
          <a-select
            v-model:value="formState.leibie"
            :max-tag-text-length="maxTagTextLength"
            :max-tag-count="maxTagCount"
            mode="multiple"
            :allowClear="true"
            @change="handleBrand"
            :options="optionsLeibie"
          ></a-select>
        </a-form-item>
      </a-col>

      <a-col :span="spanCol">
        <a-form-item name="pinjibie" title="品牌级别" label="品级">
          <a-select
            v-model:value="formState.pinjibie"
            :max-tag-text-length="maxTagTextLength"
            :max-tag-count="maxTagCount"
            mode="multiple"
            :allowClear="true"
            :options="optionsPinjibie"
          ></a-select>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="24" v-if="expand > 1">
      <a-col :span="spanCol">
        <a-form-item :label-col="{ span: labelCol }" name="sex" label="性别">
          <a-select
            v-model:value="formState.sex"
            :allowClear="true"
            :options="optionsGender"
          ></a-select>
        </a-form-item>
      </a-col>
      <a-col :span="spanCol">
        <a-form-item name="hunyu" label="婚育">
          <a-select
            v-model:value="formState.hunyu"
            :allowClear="true"
            :options="optionsMarriage"
          ></a-select>
        </a-form-item>
      </a-col>

      <a-col :span="spanCol">
        <a-form-item name="language" label="语言">
          <a-select
            v-model:value="formState.language"
            :allowClear="true"
            :options="optionsLanguage"
          ></a-select>
        </a-form-item>
      </a-col>
      <a-col :span="spanCol">
        <a-form-item name="markId" label="商场">
          <a-select
            v-model:value="formState.markId"
            show-search
            :max-tag-text-length="maxTagTextLength"
            :max-tag-count="maxTagCount"
            mode="multiple"
            optionFilterProp="label"
            :allowClear="true"
            :options="optionsMarkId"
          ></a-select>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="24" v-if="expand > 2">
      <a-col :span="spanCol">
        <a-space :size="4">
          <a-form-item style="width: 113%" name="minHeight" :label-col="{ span: 8 }" label="身高">
            <a-input-number v-model:value="formState.minHeight" />
          </a-form-item>
          <a-form-item name="maxHeight" :wrapper-col="{ offset: 3 }">
            <a-input-number v-model:value="formState.maxHeight" />
          </a-form-item>
        </a-space>
      </a-col>
      <a-col :span="spanCol">
        <a-space>
          <a-form-item style="width: 106%" label="年龄">
            <a-input-number class="minAge" v-model:value="formState.minAge" />
          </a-form-item>
          <a-form-item name="maxAge">
            <a-input-number v-model:value="formState.maxAge" />
          </a-form-item>
        </a-space>
      </a-col>
      <a-col :span="spanCol">
        <a-form-item name="education" label="学历">
          <a-select
            v-model:value="formState.education"
            :allowClear="true"
            :options="optionsDegree"
          ></a-select>
        </a-form-item>
      </a-col>
      <a-col :span="spanCol">
        <a-form-item name="resumeType" title="简历语言" label="简语">
          <a-select
            v-model:value="formState.resumeType"
            :allowClear="true"
            :options="optionsResumeType"
          ></a-select>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="24" v-if="expand > 3">
      <a-col :span="spanCol">
        <a-form-item :label-col="{ span: labelCol }" name="companyName" label="公司">
          <a-select
            v-model:value="formState.companyName"
            show-search
            :max-tag-text-length="maxTagTextLength"
            :max-tag-count="maxTagCount"
            mode="multiple"
            :allowClear="true"
            :options="optionsCompanyId"
          ></a-select>
        </a-form-item>
      </a-col>
      <a-col :span="spanCol">
        <a-form-item name="guoji" label="国籍">
          <a-select
            v-model:value="formState.guoji"
            :allowClear="true"
            show-search
            :options="optionsCountry"
          ></a-select>
        </a-form-item>
      </a-col>
      <a-col :span="spanCol">
        <a-form-item name="huji" label="户籍">
          <a-select
            v-model:value="formState.huji"
            :allowClear="true"
            show-search
            optionFilterProp="label"
            :options="optionsCityHuji"
          ></a-select>
        </a-form-item>
      </a-col>
      <a-col :span="spanCol">
        <a-form-item name="pinji" title="品牌国籍" label="品籍">
          <a-select
            v-model:value="formState.pinji"
            @change="handleBrand"
            :allowClear="true"
            :options="optionsPinji"
          ></a-select>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="24" style="display: none">
      <a-col :span="spanCol">
        <a-form-item name="email" label="邮箱">
          <a-input v-model:value="formState.email" />
        </a-form-item>
      </a-col>
      <a-col :span="spanCol">
        <a-form-item name="wantCity" label="意城">
          <a-tree-select
            v-model:value="formState.wantCity"
            tree-node-filter-prop="label"
            allow-clear
            tree-checkable
            :tree-data="optionsCity"
          />
        </a-form-item>
      </a-col>
      <a-col :span="spanCol">
        <a-form-item name="phoneNum" label="手机">
          <a-input v-model:value="formState.phoneNum" />
        </a-form-item>
      </a-col>
      <a-col :span="spanCol">
        <a-form-item name="userName" label="姓名">
          <a-input v-model:value="formState.userName" />
        </a-form-item>
      </a-col>
      <a-col :span="spanCol">
        <a-form-item name="hangye2" label="行业">
          <a-select
            v-model:value="formState.hangye2"
            :options="optionsHangye2"
            :max-tag-text-length="maxTagTextLength"
            :max-tag-count="maxTagCount"
            mode="multiple"
            @change="handleHangyePositions"
          ></a-select>
        </a-form-item>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { storeToRefs } from 'pinia';
  //import { debounce } from 'lodash-es';
  import type { SelectProps, TreeSelectProps } from 'ant-design-vue';
  import {
    brandArrDetail,
    brandCategoryArr,
    pinjibieArr,
    pinjiArr,
    positionsUpArrTitle,
    genderArr,
    marriageArr,
    degreeSearchArr,
    languageArr,
    resumeTypeArr,
  } from '/@/store/data/resume';
  import { useCityStoreWithOut } from '/@/store/modules/city';
  import { useResumeListStoreWithOut } from '/@/store/modules/resumeList';
  const resumeListStore = useResumeListStoreWithOut();
  const { positionsList, markIdList, companyList } = storeToRefs(resumeListStore);
  const spanCol = 6;
  const labelCol = 5;
  const maxTagTextLength = 2;
  const maxTagCount = 2;
  const props = defineProps({
    formState: {
      type: Object,
      required: true,
    },
    expand: {
      type: Number,
      default: false,
    },
  });

  const cityStore = useCityStoreWithOut();
  cityStore.fetchCountryInfo();
  cityStore.fetchInfo();
  const { country, province } = storeToRefs(cityStore);
  //@ts-ignore
  const optionsCity = ref<TreeSelectProps['treeData']>([]);
  const optionsCityHuji = ref<SelectProps['options']>([]);
  watch(province, () => {
    optionsCity.value = province.value.reduce((prev, curr) => {
      // 存在相同的省份，直接在其下添加城市
      //@ts-ignore
      const index = prev.findIndex((item) => item.label === curr.provinceName);
      if (index !== -1) {
        //@ts-ignore
        prev[index].children.push({
          //@ts-ignore
          label: curr.cityName,
          //@ts-ignore
          value: curr.cityName,
        });
      } else {
        // 新添加的省份
        //@ts-ignore
        if (curr.provinceName == '吉林' || curr.provinceName == '海南') {
          //@ts-ignore
          prev.push({
            //@ts-ignore
            label: curr.provinceName,
            //@ts-ignore
            value: `${curr.provinceName}-1`,
            children: [
              {
                //@ts-ignore
                label: curr.cityName,
                //@ts-ignore
                value: curr.cityName,
              },
            ],
          });
        } else if (
          //@ts-ignore
          (!curr.cityName || curr.provinceName == curr.cityName) &&
          //@ts-ignore
          curr.cityName != '海南' &&
          //@ts-ignore
          curr.cityName != '吉林'
        ) {
          //@ts-ignore
          prev.push({ label: curr.provinceName, value: curr.provinceName });
        } else {
          //@ts-ignore
          prev.push({
            //@ts-ignore
            label: curr.provinceName,
            //@ts-ignore
            value: curr.provinceName,
            children: [
              {
                //@ts-ignore
                label: curr.cityName,
                //@ts-ignore
                value: curr.cityName,
              },
            ],
          });
        }
      }
      return prev;
    }, []);
    //@ts-ignore
    optionsCityHuji.value = province.value.reduce((prev, curr) => {
       //@ts-ignore
      if ((curr.provinceName == curr.cityName || !curr.cityName) && !(curr.cityName == '吉林' || curr.cityName == '海南')) {
        //@ts-ignore
        prev.push({
          //@ts-ignore
          label: curr.provinceName,
          //@ts-ignore
          value: curr.provinceName,
        });
      } else {
        //@ts-ignore
        prev.push({
          //@ts-ignore
          label: `${curr.provinceName}-${curr.cityName}`,
          //@ts-ignore
          value: curr.cityName,
        });
      }

      return prev;
    }, []);
  });
  //国籍数据展示
  let optionsCountry = ref<SelectProps['options']>([]);
  watch(country, () => {
    //@ts-ignore
    optionsCountry.value = country.value.map((item) => ({
      //@ts-ignore
      label: item.country,
      //@ts-ignore
      value: item.country,
    }));
  });
  //语言能力数据展示
  const optionsResumeType: SelectProps['options'] = resumeTypeArr.map((item) => ({
    label: item.label,
    value: item.value,
  }));
  //语言能力数据展示
  const optionsLanguage: SelectProps['options'] = languageArr.reduce((prev, curr) => {
    curr.ability.forEach((item) => {
      //@ts-ignore
      prev.push({
        label: `${curr.language}-${item.content}`,
        value: `${curr.language}-${item.value}`,
      });
    });
    return prev;
  }, []);
  //学历数据展示
  const optionsDegree: SelectProps['options'] = degreeSearchArr.map((item) => ({
    label: item,
    value: item,
  }));
  //婚育数据展示
  const optionsMarriage = ref<SelectProps['options']>(marriageArr);
  //性别数据展示
  const optionsGender = ref<SelectProps['options']>(genderArr);
  //行业数据展示
  let optionsHangye = ref<SelectProps['options']>(
    brandArrDetail.map((item) => ({ value: item.retail })),
  );
  //品类数据展示
  let optionsPinlei = ref<SelectProps['options']>([{ value: '' }]);
  //类别数据展示
  let optionsLeibie = ref<SelectProps['options']>([{ value: '' }]);
  //品籍数据展示
  const optionsPinji = ref<SelectProps['options']>(pinjiArr);
  //品级数据展示
  const optionsPinjibie = ref<SelectProps['options']>(pinjibieArr);
  //行业数据展示职位
  const optionsHangye2 = ref<SelectProps['options']>(
    positionsUpArrTitle.map((item) => ({ value: item.industry })),
  );
  //职类数据展示
  const optionsPositionType = ref<SelectProps['options']>([{ value: '' }]);
  //职级数据展示
  const optionsPositionLevel = ref<SelectProps['options']>([{ value: '' }]);
  //品牌数据展示
  const handleBrand = () => {
    //@ts-ignore
    resumeListStore.queryBranList(props.formState);
  };

  //品类数据改变类别下拉框改变
  const handlePinlei = () => {
    props.formState.leibie = [];
    if (props.formState.pinlei) {
      optionsLeibie.value = brandCategoryArr
        .filter((item) => props.formState.pinlei.includes(item.category))
        .reduce((prev, curr) => {
          let temp = brandArrDetail
            .filter((item) => props.formState.hangye.includes(item.retail))
            .reduce((pr, cr) => {
              if (cr.title) {
                pr.push(cr.title);
              }
              return pr;
            }, []);
          if ((curr.title && temp.includes(curr.title)) || !curr.title) {
            curr.leibie.forEach((item) => {
              prev.push({ value: item });
            });
          }
          return prev;
        }, []);
      handleBrand();
    }
  };
  const handlePositions = () => {
    //@ts-ignore
    resumeListStore.queryPositionsList(props.formState);
  };
  //行业数据改变职位下拉框改变
  const handleHangyePositions = () => {
    props.formState.positionType = [];
    props.formState.positionLevel = [];
    // optionsPositionType.value = [{ value: '' }];
    // optionsPositionLevel.value = [{ value: '' }];
    if (props.formState.hangye2) {
      // optionsPositionType.value = positionsUpArrTitle
      //   .filter((item) => item.title.includes(props.formState.hangye2))[0]
      //   .content.map((item) => ({ value: item }));
      // optionsPositionType.value?.unshift({ value: '' });
      optionsPositionType.value = positionsUpArrTitle
        .filter((item) => props.formState.hangye2.includes(item.industry))
        .reduce((prev, curr) => {
          //@ts-ignore
          let temp = prev.map((item) => item?.value);
          curr.content.forEach((item) => {
            //@ts-ignore
            if (!temp.includes(item.jobCategory)) {
              //@ts-ignore
              prev.push({ value: item.jobCategory });
            }
          });
          return prev;
        }, []);
      handlePositions();
    }
  };
  //职位数据改变职级下拉框改变
  const handlePositionType = () => {
    props.formState.positionLevel = [];
    if (props.formState.positionType) {
      // optionsPositionLevel.value = positionsUpArrDetails
      //   .filter((item) => item.title.includes(props.formState.positionType))[0]
      //   .content.map((item) => ({ value: item }));
      // optionsPositionLevel.value?.unshift({ value: '' });
      optionsPositionLevel.value = positionsUpArrTitle
        .filter((item) => props.formState.hangye2.includes(item.industry))
        .reduce((prev, curr) => {
          return [
            ...prev,
            ...curr.content.filter((item) =>
              props.formState.positionType.includes(item.jobCategory),
            ),
          ];
        }, [])
        .reduce((prev, curr) => {
          //@ts-ignore
          let temp = prev.map((item) => item?.value);
          curr.management.forEach((item) => {
            //@ts-ignore
            if (!temp.includes(item)) {
              //@ts-ignore
              prev.push({ value: item });
            }
          });
          return prev;
        }, []);
      handlePositions();
    }
  };
  //职位数据展示
  //@ts-ignore
  //handlePositions();
  let optionsPositions = ref<SelectProps['options']>([]);
  watch(positionsList, () => {
    let tempOptionPositions = [];
    positionsList.value.forEach((item) => {
      //@ts-ignore
      let tempObj = {
        //@ts-ignore
        label: positionsListShow(item.cnPosition, item.usPosition),
        //@ts-ignore
        value: item.positionId.toString(),
      };
      //@ts-ignore
      tempOptionPositions.push(tempObj);
    });
    optionsPositions.value = tempOptionPositions;
  });
  function positionsListShow(cnName, usName) {
    if (cnName && usName) {
      return `${cnName}/${usName}`;
    } else if (cnName && !usName) {
      return cnName;
    } else if (!cnName && usName) {
      return usName;
    } else {
      return '';
    }
  }
  //行业数据改变品类下拉框改变
  const handleHangye = () => {
    props.formState.pinlei = [];
    props.formState.leibie = [];
    if (props.formState.hangye) {
      optionsPinlei.value = brandArrDetail
        .filter((item) => props.formState.hangye.includes(item.retail))
        .reduce((prev, curr) => {
          //@ts-ignore
          let temp = prev.map((item) => item?.value);
          curr.categoryArr.forEach((item) => {
            //@ts-ignore
            if (!temp.includes(item)) {
              //@ts-ignore
              prev.push({ value: item });
            }
          });
          return prev;
        }, []);
      handleBrand();
      props.formState.hangye2 = props.formState.hangye;
      handleHangyePositions();
    } else {
      props.formState.hangye = ['零售业'];
      handleHangye();
    }
  };
  handleHangye();

  const handleMarkId = () => {
    props.formState.markId = [];
    //@ts-ignore
    resumeListStore.queryMarkList(props.formState);
  };
  handleMarkId();
  //商场数据展示
  let optionsMarkId = ref<SelectProps['options']>([]);
  watch(markIdList, () => {
    let tempOptionMarkId = [];
    markIdList.value.forEach((item) => {
      //@ts-ignore
      let tempObj = {
        //@ts-ignore
        label: item.text,
        //@ts-ignore
        value: item.id,
      };
      //@ts-ignore
      tempOptionMarkId.push(tempObj);
    });
    optionsMarkId.value = tempOptionMarkId;
  });

  const handleCompanyName = () => {
    // @ts-ignore
    resumeListStore.queryCompanyList(props.formState);
  };
  handleCompanyName();
  //公司数据展示
  let optionsCompanyId = ref<SelectProps['options']>([]);
  watch(companyList, () => {
    let tempOptionCompanyId = [];
    companyList.value.forEach((item) => {
      //@ts-ignore
      let tempObj = {
        label: item.companyName,
        value: item.companyName,
      };
      //@ts-ignore
      tempOptionCompanyId.push(tempObj);
    });
    optionsCompanyId.value = tempOptionCompanyId;
  });
  /**
   * 给父组件使用的清空方法
   */
  const clearSelectOptions = () => {
    optionsPinlei.value = [];
    optionsLeibie.value = [];
    optionsPositionLevel.value = [];
    optionsPositionType.value = [];
    handleBrand();
    handleCompanyName();
    handleMarkId();
  };
  defineExpose({
    clearSelectOptions,
  });
</script>
<style lang="less" scoped>
  .ant-input-number {
    width: 100%;
  }
  .custom-select .ant-select-selector {
    height: 32px; /* 固定高度 */
    max-height: 32px; /* 防止内容溢出时高度增加 */
    overflow: hidden; /* 隐藏溢出内容，如果需要可以设置为auto来显示滚动条 */
    text-overflow: ellipsis; /* 文本溢出时显示省略号 */
    white-space: nowrap; /* 禁止文本换行 */
  }
</style>
