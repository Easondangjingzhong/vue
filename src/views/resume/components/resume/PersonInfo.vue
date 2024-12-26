<template>
  <div class="person_container">
   
    <a-card class="resume_card">
      <h3>个人信息</h3>
      <a-divider style="height: 1px; background-color: #ccc" dashed />
      <!-- <a-form :label-col="{span: 5}"
      :wrapper-col="{span: 14}" :model="personInfoData"> -->
      <a-row  style="position: relative;">
        <a-col :span="spanTitle">
          <a-form-item
            :name="['personInfoData','userName']"
            label="姓名"
            :rules="[{ required: true, message: '请输入名字' }]"
          >
            <a-input v-model:value="personInfoData.userName" placeholder="请输入名字"></a-input>
          </a-form-item>
        </a-col>

        <a-col :span="spanTitle">
          <a-form-item
            :name="['personInfoData','gender']"
            label="性别"
            :rules="[{ required: true, message: '请选择性别' }]"
          >
            <a-radio-group v-model:value="personInfoData.gender">
              <a-radio value="M">男士</a-radio>
              <a-radio value="F">女士</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :span="spanTitle" class="resume_photo_col">
          <a-form-item name="photoPath">
            <a-image
              :width="120"
               :height="156"
              class="resume_photo_image"
              mode="aspectFill"
              :src="personInfoData.photoPath"
              :preview="false" 
              @click="handleChangephoto"
              fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
            />
            <a-form-item
            :rules="[{ required: updatePhotoFlag !== 0, message: '请选择性别' }]"
          >
            <a-button v-if="updatePhotoFlag !== 0" style="margin-left: 45px;background-color: #f0ad4e;border-color: #eea236;color: #fff;margin-top: 4px;" size="small" @click="handleChangephoto">修改</a-button>
          </a-form-item>
            <CropperModal
              class="resume_photo_image"
              ref="cropperModal"
              @cropper-ok="handleCropperSuccess"
         />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="spanTitle">
          <a-form-item
            :name="['personInfoData','phone']"
            label="手机"
            :rules="[{ required: true, message: '请输入手机' }]"
          >
            <a-input
              v-model:value="personInfoData.phone"
              placeholder="请输入手机"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="spanTitle">
          <a-form-item
            name="age"
            label="年龄"
            :rules="[{ required: false, message: '请输入年龄' }]"
          >
            <a-input v-model:value="personInfoData.age" placeholder="请输入年龄"></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="spanTitle">
          <a-form-item
            name="email"
            label="邮箱"
            :rules="[{ required: false, message: '请输入邮箱' }]"
          >
            <a-input v-model:value="personInfoData.email" placeholder="请输入邮箱"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="spanTitle">
          <a-form-item
            name="height"
            label="身高"
            :rules="[{ required: false, message: '请输入身高' }]"
          >
            <a-input v-model:value="personInfoData.height" type="Number" placeholder="请输入身高cm" @change="handleChangeHeight"></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="spanTitle">
          <a-form-item
            name="nationality"
            label="国籍"
            :rules="[{ required: false, message: '请输入国籍' }]"
          >
            <a-select
            ref="select"
            v-model:value="personInfoData.nationality"
            placeholder="请输入国籍"
            :options="optionsCountry"
            showSearch
          ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="spanTitle">
          <a-form-item
            name="weight"
            label="体重"
            :rules="[{ required: false, message: '请输入体重' }]"
          >
            <a-input v-model:value="personInfoData.weight" type="Number" placeholder="请输入体重kg" @change="handleChangeWeight"></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="spanTitle">
          <a-form-item
            name="huji"
            label="户籍"
            :rules="[{ required: false, message: '请输入户籍' }]"
          >
            <!-- <a-input
              v-model:value="personInfoData.huji"
              placeholder="请输入户籍"
              disabled
            ></a-input> -->
            <a-select
            ref="select"
            v-model:value="personInfoData.huji"
            placeholder="请输入户籍"
            :options="optionsCity"
            @change="handleHuji"
            showSearch
          ></a-select>
          </a-form-item>
        </a-col>

        <a-col :span="spanTitle">
          <a-form-item
            :name="['personInfoData','currentCity']"
            label="城市"
            :rules="[{ required: true, message: '请输入城市' }]"
          >
            <a-select
            ref="select"
            v-model:value="personInfoData.currentCity"
            placeholder="请输入城市"
            :options="optionsCity"
            showSearch
          ></a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="spanTitle">
          <a-form-item
            name="positionName"
            label="当前职位"
            :rules="[{ required: false, message: '请输入当前职位' }]"
          >
            <a-input
              v-model:value="personInfoData.positionName"
              placeholder="请输入当前职位"
              disabled
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="spanTitle">
          <a-form-item
            name="marriageStatus"
            label="婚育状态"
            :rules="[{ required: false, message: '请输入婚育状态' }]"
          >
            <a-select
            ref="select"
            v-model:value="personInfoData.marriageStatus"
            placeholder="请输入婚育状态"
            :options="optionsMarriageStatus"
            showSearch
          ></a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <!-- </a-form> -->
    </a-card>

  </div>
</template>
<script lang="ts" setup>
  import type { SelectProps } from 'ant-design-vue';
  import {useCityStoreWithOut} from '/@/store/modules/city'
  import { storeToRefs } from 'pinia'
  import CropperModal from '/@/components/Upload/CropperModal.vue';
  import { useResumeStoreWithOut } from '/@/store/modules/resume';
  import {marriageArr} from '/@/store/data/resume'
  const props = defineProps({
    personInfoData: {
      type: Object,
      required: true,
    },
  });
  const resumeStore = useResumeStoreWithOut();
  const {updatePhotoFlag} = storeToRefs(resumeStore);
  const coverOptions = {
        autoCrop: true, //是否默认生成截图框
        autoCropWidth: 140 , //默认生成截图框宽度
        autoCropHeight: 180, //默认生成截图框高度
        fixedBox: true, //是否固定截图框大小 不允许改变
        previewsCircle: false, //预览图是否是原圆形
        title: "修改图片",
        info: false, // 裁剪框的大小信息
        outputSize: 1, // 裁剪生成图片的质量
        outputType: "jpeg", // 裁剪生成图片的格式
        canScale: true, // 图片是否允许滚轮缩放
        canMove: true,
        fixed: false, // 是否开启截图框宽高固定比例
        fixedNumber: [1, 1], // 截图框的宽高比例
        full: false, // 是否输出原图比例的截图
        canMoveBox: true, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: true, // 截图框是否被限制在图片里面
        infoTrue: false // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
        };
  const cropperModal = ref<any>();
  const {photoPath} = props.personInfoData;
 
  const handleChangephoto = () => {
    const target = Object.assign({}, coverOptions, {
          img: photoPath,
        });
    cropperModal.value.edit(target);
  }
  const handleCropperSuccess = (e) => {
    props.personInfoData.photoPath = e;
    resumeStore.updateResumePhoto(e);
  } 
  const cityStore = useCityStoreWithOut();
  const {country,province, cheieseCity} = storeToRefs(cityStore);
  const spanTitle = 6;
  const handleChangeHeight = (e: Event) => {
    const input = e.target as HTMLInputElement;
    //@ts-ignore
    if (input.value - 250 > 0) {
      props.personInfoData.height = 0
    }
  };
  const handleChangeWeight = (e: Event) => {
    const input = e.target as HTMLInputElement;
    //@ts-ignore
    if (input.value - 100 > 0) {
      props.personInfoData.weight = 0
    }
  }
  const optionsMarriageStatus: SelectProps['options'] = marriageArr;
  //@ts-ignore
  const optionsCountry: SelectProps['options'] = country.value.map((item) => ({ label: item.country, value: item.country }));
  let tempOptionCity = [];
  //@ts-ignore
  tempOptionCity.push({label: "",value: ""});
  province.value.forEach(item => {
    //@ts-ignore
    let tempObj = { label: item.provinceName +(item.cityName ? "-"+item.cityName : "") , value: item.provinceName +(item.cityName ? "-"+item.cityName : "") };
    //@ts-ignore
    tempOptionCity.push(tempObj);
  })
   //@ts-ignore
  const optionsCity: SelectProps['options'] = tempOptionCity;
  //判断国籍 
  const handleHuji = () => {
    if (props.personInfoData.huji) {
    const huji = props.personInfoData.huji.includes("-") ? props.personInfoData.huji.split("-")[1]: props.personInfoData.huji;
    const cityArr = cheieseCity.value.filter((item) => {
       //@ts-ignore
      if (item.cityName == huji) {
        return true;
      }
      return false;
    });
    if (cityArr.length > 0) {
      props.personInfoData.nationality = "中国";
      return;
    }
    if (props.personInfoData.huji.includes("香港")) {
      props.personInfoData.nationality = "香港";
      return;
    }
    if (props.personInfoData.huji.includes("澳门")) {
      props.personInfoData.nationality = "澳门";
      return;
    }
    if (props.personInfoData.huji.includes("台湾")) {
      props.personInfoData.nationality = "台湾";
      return;
    }

    if (props.personInfoData.huji.includes("其他")) {
      props.personInfoData.nationality = "其他";
      return;
    }
    const cityOutArr = province.value.filter((item) => {
       //@ts-ignore
      if (item.cityName == huji || item.provinceName == huji) {
        return true;
      }
      return false;
    });
    if (cityOutArr.length > 0) {
      //@ts-ignore
      props.personInfoData.nationality = cityOutArr[0].provinceName;
      return;
    }
    props.personInfoData.nationality = "";
  }
  }
  onBeforeMount(() =>{
    handleHuji();
  })
  if (props.personInfoData.currentCity) {
    let tempCity = "";
    province.value.forEach((item) => {
         //@ts-ignore
      if (item.cityName && props.personInfoData.currentCity.includes(item.cityName)) {
           //@ts-ignore
        tempCity = item.provinceName+"-"+item.cityName;
      }
    });
    if (tempCity) {
      props.personInfoData.currentCity = tempCity;
    }
  }

  
  //@ts-ignore
  // const optionsCity: SelectProps['options'] = province.value.reduce((prev, curr, index, arr) => {
  //   console.log(prev);
  //   console.log(curr);
  //   console.log(index);
  //   console.log(arr);
  // },[])
  //  let optionsCity = ref<TreeSelectProps['treeData']>([]);
  //  let tempProvince = [];
  //  province.value.forEach(element => {
    
  //   if (tempProvince.length === 0) {
  //     //@ts-ignore
  //     tempProvince.push({provinceName: element.provinceName});
  //   }
  //   //@ts-ignore
  //   if (!tempProvince.includes(element.provinceName)) {
  //     //@ts-ignore
  //     tempProvince.push(element.provinceName);
  //   }
  //  });
  //  let treeProvince = [];
  //  tempProvince.forEach(item => {
  //     let tempObj = {};
  //      //@ts-ignore
  //     tempObj.label = item;
  //      //@ts-ignore
  //     tempObj.value = item;
  //      //@ts-ignore
  //     tempObj.isLeaf = false;
  //     let tempChildren = [];
  //     province.value.forEach(element => {
  //        //@ts-ignore
  //        if (element.provinceName === item && element.cityName !== item) {
  //          //@ts-ignore
  //           tempChildren.push({ label: element.cityName, value: element.cityName });
  //        }
  //     })
  //      //@ts-ignore
  //     tempObj.children = tempChildren;
  //      //@ts-ignore
  //     treeProvince.push(tempObj);
  //  }); 
  //  optionsCity = treeProvince;
  //  console.log(treeProvince);
   
  
</script>
<style scoped>
  .resume_photo_col {
    position: absolute;
    left: 51%;
    top: 30%;
  }
  .resume_photo_col .ant-image .resume_photo_image {
    width: 160px;
    height: 200px;
    box-shadow: 0 0 2px #ccc;
  }
</style>
