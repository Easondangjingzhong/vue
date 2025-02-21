<template>
  <div v-if="!expend" class="resume_header">
    <a-row :gutter="24"
      ><a-col :span="24" class="resume_detail_title">
        <h4 class="resume_h4">
          <svg
            style="vertical-align: middle"
            t="1735629424261"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="5581"
            width="15"
            height="15"
          >
            <path
              d="M918.4 16h-176-4.8l-564.8 1.6c-49.6 0-89.6 40-89.6 89.6v134.4h102.4c19.2 0 33.6 14.4 33.6 33.6v22.4c0 19.2-14.4 33.6-33.6 33.6h-11.2V320c0-19.2-14.4-33.6-33.6-33.6h-92.8c-12.8 1.6-24 9.6-28.8 22.4-1.6 3.2-1.6 8-1.6 11.2v22.4c0 19.2 14.4 33.6 33.6 33.6h33.6V624h102.4c19.2 0 33.6 14.4 33.6 33.6v22.4c0 19.2-14.4 33.6-33.6 33.6h-11.2V704c0-19.2-14.4-33.6-33.6-33.6h-92.8c-12.8 1.6-24 9.6-28.8 22.4-1.6 3.2-1.6 8-1.6 11.2v22.4c0 19.2 14.4 33.6 33.6 33.6h33.6v156.8c0 49.6 40 89.6 89.6 89.6h744c49.6 0 89.6-40 89.6-89.6V105.6C1008 56 968 16 918.4 16z m-65.6 732.8s-1.6 3.2-1.6 4.8c-1.6 3.2-6.4 8-9.6 11.2l-9.6 4.8-6.4 1.6H342.4c-3.2-1.6-8-3.2-11.2-4.8-3.2-1.6-6.4-6.4-8-11.2 0-1.6-1.6-4.8-1.6-4.8-1.6-1.6-6.4-22.4 0-44.8V704l1.6-1.6c16-20.8 54.4-43.2 96-65.6 38.4-20.8 94.4-52.8 94.4-68.8v-9.6c0-4.8-1.6-8-4.8-11.2-33.6-33.6-51.2-80-51.2-129.6 0-80 16-163.2 129.6-163.2s129.6 81.6 129.6 163.2c0 49.6-17.6 96-51.2 129.6-3.2 3.2-4.8 6.4-4.8 11.2v9.6c0 16 57.6 48 94.4 68.8 41.6 22.4 80 44.8 96 65.6l1.6 1.6v1.6c8 20.8 1.6 41.6 0 43.2z"
              p-id="5582"
            ></path>
          </svg>
          个人信息
        </h4>
        <span>
          <a-tag color="green" v-if="!personWholeFlagTemp">完整</a-tag>
          <a-tag color="red" v-if="personWholeFlagTemp">缺失</a-tag>
          <form-outlined v-if="showResumeAdd" @click="handleUpdatePersonInfo"></form-outlined>
        </span>
      </a-col>
      <a-divider :dashed="true" style="background-color: #ccc; margin-top: 0" />
    </a-row>
    <a-row :gutter="24" class="resume_row" style="position: relative">
      <a-col :span="spancol">
        {{ themeLanguage?.currentCity?.label }}:
        <span class="resume_span">{{ resumeData.currentCity }}</span>
      </a-col>
      <a-col :span="spancol">
        {{ themeLanguage?.gender?.label }}:
        <span class="resume_span">{{ resumeData.gender == 'M' ? '男' : '女' }}</span>
      </a-col>
      <a-col class="resume_photo_col">
        <a-image
          :width="104"
          :height="135"
          class="resume_photo_image"
          mode="aspectFill"
          :src="resumeData.photoPath"
          :preview="true"
          fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
        />
      </a-col>
    </a-row>
    <a-row :gutter="24" class="resume_row">
      <a-col :span="spancol">
        {{ themeLanguage?.nationality?.label }}:
        <span class="resume_span">{{ resumeData.nationality }}</span>
      </a-col>
      <a-col :span="spancol">
        {{ themeLanguage?.age?.label }}:
        <span class="resume_span">{{ resumeData.age }}岁 {{ ageTimeTemp }}</span>
      </a-col>
    </a-row>
    <a-row :gutter="24" class="resume_row">
      <a-col :span="spancol">
        {{ themeLanguage?.huji?.label }}: <span class="resume_span">{{ resumeData.province }}</span>
      </a-col>
      <a-col :span="spancol">
        {{ themeLanguage?.height?.label }}:
        <span class="resume_span">{{ resumeData.height }}cm</span>
      </a-col>
    </a-row>
    <a-row :gutter="24" class="resume_row">
      <a-col :span="spancol">
        {{ themeLanguage?.email?.label }}: <span class="resume_span">{{ resumeData.email }}</span>
      </a-col>
      <a-col :span="spancol">
        {{ themeLanguage?.weight?.label }}:
        <span class="resume_span">{{ resumeData.weight }}kg</span>
      </a-col>
    </a-row>
    <a-row :gutter="24" class="resume_row">
      <a-col :span="spancol">
        <span title="当前职位"
          >{{ themeLanguage?.positionName?.label }}:
          <span class="resume_span">{{ resumeData.positionName }}</span></span
        >
      </a-col>
      <a-col :span="spancol">
        {{ themeLanguage?.marriageStatus?.label }}:
        <span class="resume_span">{{ resumeData.marriageStatus }}</span>
      </a-col>
    </a-row>
  </div>
  <div v-if="expend" class="resume_header_update">
    <a-row :gutter="24">
      <a-col :span="24" class="resume_detail_title">
        <h4 class="resume_h4">
          <svg
            style="vertical-align: middle"
            t="1735629424261"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="5581"
            width="15"
            height="15"
          >
            <path
              d="M918.4 16h-176-4.8l-564.8 1.6c-49.6 0-89.6 40-89.6 89.6v134.4h102.4c19.2 0 33.6 14.4 33.6 33.6v22.4c0 19.2-14.4 33.6-33.6 33.6h-11.2V320c0-19.2-14.4-33.6-33.6-33.6h-92.8c-12.8 1.6-24 9.6-28.8 22.4-1.6 3.2-1.6 8-1.6 11.2v22.4c0 19.2 14.4 33.6 33.6 33.6h33.6V624h102.4c19.2 0 33.6 14.4 33.6 33.6v22.4c0 19.2-14.4 33.6-33.6 33.6h-11.2V704c0-19.2-14.4-33.6-33.6-33.6h-92.8c-12.8 1.6-24 9.6-28.8 22.4-1.6 3.2-1.6 8-1.6 11.2v22.4c0 19.2 14.4 33.6 33.6 33.6h33.6v156.8c0 49.6 40 89.6 89.6 89.6h744c49.6 0 89.6-40 89.6-89.6V105.6C1008 56 968 16 918.4 16z m-65.6 732.8s-1.6 3.2-1.6 4.8c-1.6 3.2-6.4 8-9.6 11.2l-9.6 4.8-6.4 1.6H342.4c-3.2-1.6-8-3.2-11.2-4.8-3.2-1.6-6.4-6.4-8-11.2 0-1.6-1.6-4.8-1.6-4.8-1.6-1.6-6.4-22.4 0-44.8V704l1.6-1.6c16-20.8 54.4-43.2 96-65.6 38.4-20.8 94.4-52.8 94.4-68.8v-9.6c0-4.8-1.6-8-4.8-11.2-33.6-33.6-51.2-80-51.2-129.6 0-80 16-163.2 129.6-163.2s129.6 81.6 129.6 163.2c0 49.6-17.6 96-51.2 129.6-3.2 3.2-4.8 6.4-4.8 11.2v9.6c0 16 57.6 48 94.4 68.8 41.6 22.4 80 44.8 96 65.6l1.6 1.6v1.6c8 20.8 1.6 41.6 0 43.2z"
              p-id="5582"
            ></path>
          </svg>
          个人信息
        </h4>
      </a-col>
      <a-divider :dashed="true" style="background-color: #ccc; margin-top: 0" />
    </a-row>
    <a-form
      :label-col="{ span: resumeTypeEnglish == '1' ? 10 : 0 }"
      ref="formRef"
      :model="formState"
      @finish="onFinish"
    >
      <a-row :gutter="24" class="resume_row_update">
        <a-col :span="spancol">
          <a-form-item
            :label="themeLanguage?.userName?.label"
            name="userName"
            :rules="[{ required: true, message: themeLanguage?.userName?.message }]"
          >
            <a-input
              style="width: 100%"
              v-model:value="formState.userName"
              :placeholder="themeLanguage?.userName?.message"
            />
          </a-form-item>
        </a-col>
        <a-col :span="spancol">
          <a-form-item
            :label="themeLanguage?.phone?.label"
            :rules="[{ required: true, message: themeLanguage?.phone?.message }]"
          >
            <a-input style="width: 100%" :disabled="true" v-model:value="formState.phoneNum" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24" class="resume_row_update" style="position: relative">
        <a-col :span="spancol">
          <a-form-item
            :rules="[{ required: true, message: themeLanguage?.currentCity?.message }]"
            name="currentCity"
            :label="themeLanguage?.currentCity?.label"
          >
            <a-select
              v-model:value="formState.currentCity"
              :placeholder="themeLanguage?.currentCity?.message"
              :allowClear="true"
              :options="optionsCity"
              showSearch
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="spancol">
          <a-form-item
            name="gender"
            :rules="[{ required: true, message: themeLanguage?.gender?.message }]"
            :label="themeLanguage?.gender?.label"
          >
            <a-radio-group
              v-model:value="formState.gender"
              :options="genderOptions"
            ></a-radio-group>
          </a-form-item>
        </a-col>
        <a-col class="resume_photo_col_update">
          <span class="resume_photo_img">
            <a-image
              :width="124"
              :height="161"
              class="resume_photo_image"
              mode="aspectFill"
              :src="photoPath"
              :preview="true"
              fallback="data:image/png;base64,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"
            />
          </span>

          <a-upload
            v-model:file-list="fileList"
            name="file"
            :showUploadList="false"
            :customRequest="handleChangephotoUpload"
          >
            <a-button
              size="small"
              style="
                background-color: #f0ad4e;
                border-color: #eea236;
                color: #fff;
                margin-left: 25px;
              "
              >上传</a-button
            >
          </a-upload>
          <a-button
            style="background-color: #f0ad4e; border-color: #eea236; color: #fff; margin-left: 5px"
            size="small"
            @click="handleChangephoto"
            >修改</a-button
          >
          <CropperModal
            class="resume_photo_image"
            ref="cropperModal"
            @cropper-ok="handleCropperSuccess"
          />
        </a-col>
      </a-row>
      <a-row :gutter="24" class="resume_row_update">
        <a-col :span="spancol">
          <a-form-item
            name="nationality"
            :rules="[{ required: true, message: themeLanguage?.nationality?.message }]"
            :label="themeLanguage?.nationality?.label"
          >
            <a-select
              ref="select"
              v-model:value="formState.nationality"
              :placeholder="themeLanguage?.nationality?.message"
              :allowClear="true"
              :options="optionsCountry"
              showSearch
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="spancol">
          <a-form-item
            name="ageTime"
            :rules="[{ required: true, message: themeLanguage?.age?.message }]"
            :label="themeLanguage?.age?.label"
          >
            <a-date-picker
              v-model:value="formState.ageTime"
              value-format="YYYY-MM-DD"
              picker="date"
              :placeholder="themeLanguage?.age?.message"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24" class="resume_row_update">
        <a-col :span="spancol">
          <a-form-item
            name="province"
            :label="themeLanguage?.huji?.label"
            :rules="[{ required: true, message: themeLanguage?.huji?.message }]"
          >
            <a-select
              ref="select"
              v-model:value="formState.province"
              :placeholder="themeLanguage?.huji?.message"
              :allowClear="true"
              :options="optionsCity"
              showSearch
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="spancol">
          <a-form-item
            name="height"
            :rules="[{ required: true, message: themeLanguage?.height?.message }]"
            :label="themeLanguage?.height?.label"
          >
            <a-input-number
              style="width: 100%"
              v-model:value="formState.height"
              :placeholder="themeLanguage?.height?.message"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24" class="resume_row_update">
        <a-col :span="spancol">
          <a-form-item
            name="email"
            :rules="[{ required: true, message: themeLanguage?.email?.message }]"
            :label="themeLanguage?.email?.label"
          >
            <a-input v-model:value="formState.email" :placeholder="themeLanguage?.email?.message" />
          </a-form-item>
        </a-col>
        <a-col :span="spancol">
          <a-form-item
            name="weight"
            :rules="[{ required: true, message: themeLanguage?.weight?.message }]"
            :label="themeLanguage?.weight?.label"
          >
            <a-input-number
              style="width: 100%"
              v-model:value="formState.weight"
              :placeholder="themeLanguage?.weight?.message"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24" class="resume_row_update">
        <a-col :span="spancol">
          <a-form-item
            name="positionName"
            :rules="[{ required: true, message: themeLanguage?.positionName?.message }]"
            :label="themeLanguage?.positionName?.label"
          >
            <a-select
              v-model:value="formState.positionName"
              :allowClear="true"
              :options="optionsPositions"
              showSearch
              :labelInValue="true"
              :placeholder="themeLanguage?.positionName?.message"
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="spancol">
          <a-form-item
            name="marriageStatus"
            :rules="[{ required: true, message: themeLanguage?.marriageStatus?.message }]"
            :label="themeLanguage?.marriageStatus?.label"
          >
            <a-select
              v-model:value="formState.marriageStatus"
              :allowClear="true"
              :options="optionsMarriage"
              :placeholder="themeLanguage?.marriageStatus?.message"
            ></a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="24" class="resume_detail_btn">
          <a-button style="margin: 0 8px" type="primary" :loading="iconLoading" html-type="submit"
            >保存</a-button
          >
          <a-button @click="handleUpdatePersonInfo">取消</a-button>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import type { SelectProps } from 'ant-design-vue';
  import { FormOutlined } from '@ant-design/icons-vue';
  import { message } from 'ant-design-vue';
  import { useCityStoreWithOut } from '/@/store/modules/city';
  import { useResumeListStoreWithOut } from '/@/store/modules/resumeList';
  import { useResumeDetailStore } from '/@/store/modules/resumeDetail';
  import { marriageArr, marriageEnArr } from '/@/store/data/resume';
  import CropperModal from '/@/components/Upload/CropperModal.vue';
  import { validateLanguage } from '/@/utils/resumeTypeEn';
  import { dataURLtoBlob, fileToBlob, blobToDataURI } from '/@/utils/base64tofile';
  const resumeDetailStore = useResumeDetailStore();
  const cityStore = useCityStoreWithOut();
  const { country, province } = storeToRefs(cityStore);
  const resumeListStore = useResumeListStoreWithOut();
  const { positionsList } = storeToRefs(resumeListStore);
  const { resumeTypeEnglish } = storeToRefs(resumeDetailStore);
  const spancol = 8;
  let iconLoading = ref(false);
  const expend = ref(false);
  const formState = ref({
    id: '',
    userName: '',
    phoneNum: '',
    currentCity: '',
    gender: '',
    nationality: '',
    age: '',
    province: '',
    height: '',
    email: '',
    weight: '',
    positionsId: '',
    positionName: { value: '', label: '' },
    marriageStatus: '',
    ageTime: '',
    birthYear: '',
    bornDay: '',
    bornMonth: '',
    recruitId: '',
  });
  const props = defineProps({
    resumeData: {
      type: Object,
      required: true,
    },
    showResumeAdd: {
      type: Boolean,
      required: true,
    },
  });
  const themeLanguage = ref(validateLanguage('personInfo', resumeTypeEnglish.value));
  const personWholeFlagTemp = ref(false);
  if (
    !props.resumeData.userName ||
    !props.resumeData.phoneNum ||
    !props.resumeData.currentCity ||
    !props.resumeData.province ||
    !props.resumeData.gender ||
    !props.resumeData.photoPath ||
    !props.resumeData.nationality ||
    !props.resumeData.height ||
    !props.resumeData.birthYear ||
    !props.resumeData.email ||
    !props.resumeData.weight ||
    !props.resumeData.positionName ||
    !props.resumeData.marriageStatus
  ) {
    resumeDetailStore.$patch({
      personWholeFlag: true,
    });
    personWholeFlagTemp.value = true;
  } else {
    resumeDetailStore.$patch({
      personWholeFlag: false,
    });
    personWholeFlagTemp.value = false;
  }
  watch(
    () => props.resumeData,
    (newProps) => {
      if (
        !newProps.userName ||
        !newProps.phoneNum ||
        !newProps.currentCity ||
        !newProps.province ||
        !newProps.gender ||
        !newProps.photoPath ||
        !newProps.nationality ||
        !newProps.height ||
        !newProps.birthYear ||
        !newProps.email ||
        !newProps.weight ||
        !newProps.positionName ||
        !newProps.marriageStatus
      ) {
        resumeDetailStore.$patch({
          personWholeFlag: true,
        });
        personWholeFlagTemp.value = true;
      } else {
        resumeDetailStore.$patch({
          personWholeFlag: false,
        });
        personWholeFlagTemp.value = false;
      }
    },
  );
  const ageTimeTemp = !props.resumeData.birthYear
    ? ''
    : `(${props.resumeData.birthYear}-${
        !props.resumeData.bornMonth
          ? '01'
          : props.resumeData.bornMonth < 10
          ? '0' + props.resumeData.bornMonth
          : props.resumeData.bornMonth
      }-${
        !props.resumeData.bornDay
          ? '01'
          : props.resumeData.bornDay < 10
          ? '0' + props.resumeData.bornDay
          : props.resumeData.bornDay
      })`;
  const coverOptions = {
    autoCrop: true, //是否默认生成截图框
    autoCropWidth: 140, //默认生成截图框宽度
    autoCropHeight: 180, //默认生成截图框高度
    fixedBox: true, //是否固定截图框大小 不允许改变
    previewsCircle: false, //预览图是否是原圆形
    title: '修改图片',
    info: false, // 裁剪框的大小信息
    outputSize: 1, // 裁剪生成图片的质量
    outputType: 'jpeg', // 裁剪生成图片的格式
    canScale: true, // 图片是否允许滚轮缩放
    canMove: true,
    fixed: false, // 是否开启截图框宽高固定比例
    fixedNumber: [1, 1], // 截图框的宽高比例
    full: false, // 是否输出原图比例的截图
    canMoveBox: true, // 截图框能否拖动
    original: false, // 上传图片按照原始比例渲染
    centerBox: true, // 截图框是否被限制在图片里面
    infoTrue: false, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
  };
  const cropperModal = ref<any>();
  const fileList = ref([]);
  const photoPath = ref(null);
  photoPath.value = props.resumeData.photoPath;
  const handleChangephoto = () => {
    const target = Object.assign({}, coverOptions, {
      img: photoPath.value,
    });
    cropperModal.value.edit(target);
  };
  const handleCropperSuccess = (e) => {
    props.resumeData.photoPath = e;
    photoPath.value = e;
    const blob = dataURLtoBlob(e);
    const files = new window.File([blob], 'avatar.png', { type: 'application/png' });
    resumeDetailStore.fetchResumePhote(props.resumeData.id, files);
  };
  const handleChangephotoUpload = (e) => {
    blobToDataURI(fileToBlob(e.file), (res) => {
      photoPath.value = res;
      handleChangephoto();
    });
  };
  //修改个人信息展开和收起
  const handleUpdatePersonInfo = () => {
    expend.value = !expend.value;
    formState.value = {
      id: props.resumeData.id,
      currentCity: props.resumeData.currentCity,
      userName: props.resumeData.userName,
      phoneNum: props.resumeData.phoneNum,
      gender: props.resumeData.gender,
      nationality: props.resumeData.nationality,
      age: props.resumeData.age,
      province: props.resumeData.province,
      height: props.resumeData.height,
      email: props.resumeData.email,
      weight: props.resumeData.weight,
      positionsId: props.resumeData.positionsId,
      positionName: { value: props.resumeData.positionsId, label: props.resumeData.positionName },
      marriageStatus: props.resumeData.marriageStatus,
      recruitId: '',
      birthYear: props.resumeData.birthYear,
      bornDay: props.resumeData.bornDay,
      bornMonth: props.resumeData.bornMonth,
      ageTime: !props.resumeData.birthYear
        ? ''
        : `${props.resumeData.birthYear}-${
            !props.resumeData.bornMonth
              ? '01'
              : props.resumeData.bornMonth < 10
              ? '0' + props.resumeData.bornMonth
              : props.resumeData.bornMonth
          }-${
            !props.resumeData.bornDay
              ? '01'
              : props.resumeData.bornDay < 10
              ? '0' + props.resumeData.bornDay
              : props.resumeData.bornDay
          }`,
    };
  };
  const optionsCity = ref<SelectProps['options']>([]);
  const optionsCountry = ref<SelectProps['options']>([]);
  //婚育数据展示
  const optionsMarriage = ref<SelectProps['options']>(marriageArr);
  const onFinish = () => {
    iconLoading.value = true;
    const ageTime = formState.value.ageTime.split('-');
    resumeDetailStore
      .updateResumePersonal({
        ...formState.value,
        positionsId: formState.value.positionName.value,
        positionName: formState.value.positionName.label,
        birthYear: ageTime[0],
        bornMonth: ageTime[1],
        bornDay: ageTime[2],
      })
      .then(() => {
        resumeDetailStore.queryResumeDetail().then(() => {
          expend.value = !expend.value;
          iconLoading.value = false;
          message.success('保存成功');
        });
      })
      .catch(() => {
        message.error('保存失败');
      });
  };
  const optionsPositions = ref<SelectProps['options']>([]);
  let tempOptionPositions = [];
  positionsList.value.forEach((item) => {
    //@ts-ignore
    let tempObj = {
      //@ts-ignore
      label: positionsListShow(item.cnPosition, item.usPosition),
      //@ts-ignore
      value: item.positionId,
    };
    //@ts-ignore
    tempOptionPositions.push(tempObj);
  });

  optionsPositions.value = tempOptionPositions;
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
  //性别
  const genderOptions = ref([
    { label: '男士', value: 'M' },
    { label: '女士', value: 'F' },
  ]);
  const loadresumeTypeEnglish = () => {
    if (resumeTypeEnglish.value == '1') {
        genderOptions.value = [
          { label: 'Male', value: 'M' },
          { label: 'Female', value: 'F' },
        ];
        optionsMarriage.value = marriageEnArr;
        optionsCountry.value = country.value.map((item) => ({
          label: item.countryEn,
          value: item.countryEn,
        }));
        optionsCity.value = province.value.reduce((prev, curr) => {
          //@ts-ignore
          if (
            (curr.provinceNameEn == curr.cityNameEn || !curr.cityNameEn) &&
            !(curr.cityNameEn == 'Jilin' || curr.cityNameEn == 'Hainan')
          ) {
            //@ts-ignore
            prev.push({
              //@ts-ignore
              label: curr.provinceNameEn,
              //@ts-ignore
              value: curr.provinceNameEn,
            });
          } else {
            //@ts-ignore
            prev.push({
              //@ts-ignore
              label: `${curr.provinceNameEn}-${curr.cityNameEn}`,
              //@ts-ignore
              value: curr.cityNameEn,
            });
          }
          return prev;
        }, []);
      } else {
        genderOptions.value = [
          { label: '男士', value: 'M' },
          { label: '女士', value: 'F' },
        ];
        optionsMarriage.value = marriageArr;
        optionsCountry.value = country.value.map((item) => ({
          label: item.country,
          value: item.country,
        }));
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
      }
  }
  loadresumeTypeEnglish();
  watch(
    () => resumeTypeEnglish.value,
    () => {
      themeLanguage.value = validateLanguage('personInfo', resumeTypeEnglish.value);
      loadresumeTypeEnglish();
    },
  );
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
    align-items: baseline;
  }
  .resume_row {
    margin-bottom: 20px;
    padding-left: 25px;
  }
  .resume_row_update {
    padding-left: 20px;
  }

  .avatar-uploader {
    position: absolute;
  }

  .ant-upload-wrapper.ant-upload-picture-card-wrapper .ant-upload.ant-upload-select {
    width: 160px;
    height: 200px;
  }
  .avatar-uploader > .ant-upload {
    width: 160px;
    height: 200px;
  }
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
  .resume_detail_btn {
    display: flex;
    justify-content: center;
  }
  .resume_photo_col {
    position: absolute;
    left: 63%;
    top: 0;
    box-shadow: 0 0 2px #ccc;
    padding: 0 !important;
  }
  .resume_photo_col_update {
    position: absolute;
    left: 73%;
    top: -100%;
    padding: 0 !important;
  }
  .resume_photo_col_update .ant-image .resume_photo_image {
    width: 160px;
    height: 200px;
  }
  .resume_photo_col .ant-image .resume_photo_image {
    width: 160px;
    height: 200px;
  }
  .resume_photo_img {
    display: block;
    margin: 0;
    padding: 0;
    color: rgba(0, 0, 0, 0.88);
    font-size: 0.07292rem;
    line-height: 1.5714285714285714;
    list-style: none;
    margin-bottom: 5px;
  }
  .resume_span {
    padding-left: 15px;
  }
</style>
