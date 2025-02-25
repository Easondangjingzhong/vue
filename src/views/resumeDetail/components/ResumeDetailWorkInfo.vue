<template>
  <div class="resume_header" v-if="!expend && !expendShow">
    <a-row :gutter="24" v-if="indexNum === 0">
      <a-col :span="24" class="resume_detail_title">
        <h4 class="resume_h4">
          <svg
            t="1735637486491"
            style="vertical-align: middle"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="8293"
            width="16"
            height="16"
          >
            <path
              d="M810.666667 170.666667 632.32 170.666667C614.4 121.173333 567.466667 85.333333 512 85.333333 456.533333 85.333333 409.6 121.173333 391.68 170.666667L213.333333 170.666667C166.4 170.666667 128 209.066667 128 256L128 853.333333C128 900.266667 166.4 938.666667 213.333333 938.666667L810.666667 938.666667C857.6 938.666667 896 900.266667 896 853.333333L896 256C896 209.066667 857.6 170.666667 810.666667 170.666667L810.666667 170.666667ZM512 170.666667C535.466667 170.666667 554.666667 189.866667 554.666667 213.333333 554.666667 236.8 535.466667 256 512 256 488.533333 256 469.333333 236.8 469.333333 213.333333 469.333333 189.866667 488.533333 170.666667 512 170.666667L512 170.666667ZM597.333333 768 298.666667 768 298.666667 682.666667 597.333333 682.666667 597.333333 768 597.333333 768ZM725.333333 597.333333 298.666667 597.333333 298.666667 512 725.333333 512 725.333333 597.333333 725.333333 597.333333ZM725.333333 426.666667 298.666667 426.666667 298.666667 341.333333 725.333333 341.333333 725.333333 426.666667 725.333333 426.666667Z"
              fill="#000000"
              p-id="8294"
            ></path>
          </svg>
          工作经历
        </h4>
        <span style="margin-top: 15px">
          <a-tag color="green" v-if="!workWholeFlag">完整</a-tag>
          <a-tag color="red" v-if="workWholeFlag">缺失</a-tag>
          <PlusOutlined v-if="showResumeAdd" @click="handleAddWorkInfo" />
        </span>
      </a-col>
      <a-divider :dashed="true" style="background-color: #ccc; margin-top: 0" />
    </a-row>
    <a-row :gutter="24" class="resume_row resume_company_row">
      <a-col :span="4" v-if="resumeData.endYear == -1">
        {{ resumeData.startYear }}.{{ resumeData.startMonth }} - 至今
      </a-col>
      <a-col :span="4" v-else-if="resumeData.endYear != -1">
        {{ resumeData.startYear }}.{{ resumeData.startMonth }} - {{ resumeData.endYear }}.{{
          resumeData.endMonth
        }}
      </a-col>
      <a-col :span="18" class="resume_col">
        <span v-if="resumeData.companyName">{{ resumeData.companyName }}</span>
        <span v-if="resumeData.cityName">-{{ resumeData.cityName }}</span>
        <span v-if="resumeData.marketName">-{{ resumeData.marketName }}</span>
        <span v-if="resumeData.brandName">-{{ resumeData.brandName }}</span>
        <span v-if="resumeData.workFloor">-{{ resumeData.workFloor }}</span>
      </a-col>
      <a-col
        v-if="showResumeAdd"
        :span="1"
        style="padding-left: 10px; padding-right: 0px; text-align: right"
      >
        <form-outlined @click="handleUpdateWorkInfo"></form-outlined>
      </a-col>
      <a-col
        v-if="showResumeAdd"
        :span="1"
        :class="workWholeFlagTemp ? 'workWholeFlagRed' : 'workWholeFlagGreen'"
        :title="workWholeFlagTemp ? '缺失' : '完整'"
      >
        <delete-outlined @click="handleDeleteWorkExp"></delete-outlined>
      </a-col>
    </a-row>
    <a-row :gutter="24" class="resume_row">
      <a-col :span="8" class="resume_col">
        {{ themeLanguage?.positionName?.label }}:
        <span class="resume_span">{{ resumeData.positionName }}</span></a-col
      >
      <a-col :span="5" class="resume_col">
        {{ themeLanguage?.reporter?.label }}:
        <span class="resume_span">{{ resumeData.reporter }}</span></a-col
      >
      <a-col :span="5" class="resume_col">
        {{ themeLanguage?.department?.label }}:
        <span class="resume_span">{{ resumeData.department }}</span></a-col
      >
      <a-col :span="6" class="resume_col">
        {{ themeLanguage?.monthSalary?.label }}:
        <span class="resume_span">{{ resumeData.monthSalary }}</span></a-col
      >
    </a-row>
    <a-row :gutter="24" class="resume_row" v-if="resumeData.brandRetail">
      <a-col
        :span="resumeTypeEnglish == '1' ? 6 : 8"
        :class="
          resumeTypeEnglish == '1'
            ? 'resume_col resume_col_brandRetail_en'
            : 'resume_col resume_col_brandRetail'
        "
      >
        {{ themeLanguage?.brandRetail?.label }}:
        <span class="resume_span">{{ resumeData.brandRetail }}</span></a-col
      >
      <a-col
        :span="resumeTypeEnglish == '1' ? 7 : 7"
        :class="
          resumeTypeEnglish == '1'
            ? 'resume_col resume_col_brandCategory_en'
            : 'resume_col resume_col_brandCategory'
        "
      >
        {{ themeLanguage?.brandCategory?.label }}:
        <span class="resume_span">{{ resumeData.brandCategory }}</span></a-col
      >
    </a-row>
    <a-row :gutter="24" class="resume_row" v-if="resumeData.salaryStructure">
      <a-col :span="12" class="resume_col">
        {{ themeLanguage?.salaryStructure?.label }}:
        <span class="resume_span">{{ resumeData.salaryStructure }}</span></a-col
      >
    </a-row>
    <a-row :gutter="24" class="resume_row" v-if="resumeData.personnelStructure">
      <a-col :span="12" class="resume_col">
        {{ themeLanguage?.personnelStructure?.label }}:
        <span class="resume_span">{{ resumeData.personnelStructure }}</span></a-col>
    </a-row>
    <a-row :gutter="24" class="resume_row" style="margin-bottom: 0">
      <a-col :span="12"> {{ themeLanguage?.workDuty?.label }}: </a-col>
    </a-row>
    <a-row :gutter="24" class="resume_row">
      <a-col :span="24" v-html="resumeData.workDuty"></a-col>
    </a-row>
  </div>
  <div class="resume_header_update" v-if="expend">
    <a-row :gutter="24">
        <a-col :span="24" class="resume_detail_title">
          <h4 class="resume_h4">
            <svg
              t="1735637486491"
              style="vertical-align: middle"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="8293"
              width="16"
              height="16"
            >
              <path
                d="M810.666667 170.666667 632.32 170.666667C614.4 121.173333 567.466667 85.333333 512 85.333333 456.533333 85.333333 409.6 121.173333 391.68 170.666667L213.333333 170.666667C166.4 170.666667 128 209.066667 128 256L128 853.333333C128 900.266667 166.4 938.666667 213.333333 938.666667L810.666667 938.666667C857.6 938.666667 896 900.266667 896 853.333333L896 256C896 209.066667 857.6 170.666667 810.666667 170.666667L810.666667 170.666667ZM512 170.666667C535.466667 170.666667 554.666667 189.866667 554.666667 213.333333 554.666667 236.8 535.466667 256 512 256 488.533333 256 469.333333 236.8 469.333333 213.333333 469.333333 189.866667 488.533333 170.666667 512 170.666667L512 170.666667ZM597.333333 768 298.666667 768 298.666667 682.666667 597.333333 682.666667 597.333333 768 597.333333 768ZM725.333333 597.333333 298.666667 597.333333 298.666667 512 725.333333 512 725.333333 597.333333 725.333333 597.333333ZM725.333333 426.666667 298.666667 426.666667 298.666667 341.333333 725.333333 341.333333 725.333333 426.666667 725.333333 426.666667Z"
                fill="#000000"
                p-id="8294"
              ></path>
            </svg>
            工作经历
          </h4>
        </a-col>
        <a-divider :dashed="true" style="background-color: #ccc; margin-top: 0" />
      </a-row>
    <a-row :gutter="24" class="resume_row">
      <a-col :span="24">
        工作经历品牌填写要求
      </a-col>
    </a-row>
    <a-row :gutter="24" class="resume_row">
      <a-col :span="24">
        1、最近2份工作经历中若有 0ffice 类别，也必须正确填写品牌，系统中若无该品牌选项，可点击“切换”按钮手动填写;
      </a-col>
    </a-row>
    <a-row :gutter="24" class="resume_row">
      <a-col :span="24">
        2、非最近2份工作经历为 0ffice 类别，则品牌为选填项，可选择填写或不填写，若选择填写，则必须正确填写;
      </a-col>
    </a-row>
    <a-row :gutter="24" class="resume_row">
      <a-col :span="24">
        3、所有工作经历只要是“店铺”类别，全部需要正确填写品牌;
      </a-col>
    </a-row>
    <a-row :gutter="24" class="resume_row">
      <a-col :span="24">
        警告:
      </a-col>
    </a-row>
    <a-row :gutter="24" class="resume_row">
      <a-col :span="24">
        品牌的正确填写是公司系统大数据搜索的基础，请大家务必认真填写对应品牌;
      </a-col>
    </a-row>
    <a-row :gutter="24" class="resume_row">
      <a-col :span="24">
        手动填写的品牌，将同步至品牌审核系统，公司将一一审核;
      </a-col>
    </a-row>
    <a-row :gutter="24" class="resume_row">
      <a-col :span="24">
        若该公司名下无对应品牌，则该公司名称中关键字为此公司品牌;
      </a-col>
    </a-row>
    <a-row :gutter="24" class="resume_row">
      <a-col :span="24">
        绝对禁止胡乱选择或填写非该公司对应品牌，若发现违规行为，将按照相关制度处罚。
      </a-col>
    </a-row>
    <a-row :gutter="24" class="resume_row">
      <a-col :span="24" style="text-align: center;">
        <a-button @click="handleWorkExpShow" type="primary" danger>仔细阅读并了解品牌填写要求</a-button>
      </a-col>
    </a-row>
  </div>
  <div class="resume_header_update" v-if="expendShow">
    <a-form ref="formRef"
    :model="formState" @finish="onFinish">
      <a-row :gutter="24">
        <a-col :span="24" class="resume_detail_title">
          <h4 class="resume_h4">
            <svg
              t="1735637486491"
              style="vertical-align: middle"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="8293"
              width="16"
              height="16"
            >
              <path
                d="M810.666667 170.666667 632.32 170.666667C614.4 121.173333 567.466667 85.333333 512 85.333333 456.533333 85.333333 409.6 121.173333 391.68 170.666667L213.333333 170.666667C166.4 170.666667 128 209.066667 128 256L128 853.333333C128 900.266667 166.4 938.666667 213.333333 938.666667L810.666667 938.666667C857.6 938.666667 896 900.266667 896 853.333333L896 256C896 209.066667 857.6 170.666667 810.666667 170.666667L810.666667 170.666667ZM512 170.666667C535.466667 170.666667 554.666667 189.866667 554.666667 213.333333 554.666667 236.8 535.466667 256 512 256 488.533333 256 469.333333 236.8 469.333333 213.333333 469.333333 189.866667 488.533333 170.666667 512 170.666667L512 170.666667ZM597.333333 768 298.666667 768 298.666667 682.666667 597.333333 682.666667 597.333333 768 597.333333 768ZM725.333333 597.333333 298.666667 597.333333 298.666667 512 725.333333 512 725.333333 597.333333 725.333333 597.333333ZM725.333333 426.666667 298.666667 426.666667 298.666667 341.333333 725.333333 341.333333 725.333333 426.666667 725.333333 426.666667Z"
                fill="#000000"
                p-id="8294"
              ></path>
            </svg>
            工作经历
          </h4>
        </a-col>
        <a-divider :dashed="true" style="background-color: #ccc; margin-top: 0" />
      </a-row>
      <a-row class="resume_row_update">
        <a-col :span="12">
          <a-form-item
            name="companyName"
            :label="themeLanguage?.companyName?.label"
            :rules="[{ required: true, message: themeLanguage?.companyName?.message }]"
          >
            <a-select
              v-model:value="formState.companyName"
              :placeholder="themeLanguage?.companyName?.message"
              :options="optionsCompanyId"
              optionFilterProp="label"
              showSearch
              @select="handleSelcetCompanyName"
              @search="handleCompanyName"
              :not-found-content="fetching ? undefined : null"
            >
              <template v-if="fetching" #notFoundContent>
                <a-spin size="small" />
              </template>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="spanTitle">
          <a-form-item
            :label="themeLanguage?.category?.label"
            name="category"
            style="padding-left: 21px"
            :rules="[{ required: true, message: themeLanguage?.category?.message }]"
          >
            <a-select
              v-model:value="formState.category"
              :placeholder="themeLanguage?.category?.message"
              optionFilterProp="label"
              showSearch
              @change="handleCategory"
              :options="optionCategory"
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="spanTitle" v-if="categoryFlag">
          <a-form-item
            :label="themeLanguage?.isRetreat?.label"
            name="isRetreat"
            style="padding-left: 20px"
            :rules="[{ required: true, message: themeLanguage?.isRetreat?.message }]"
          >
            <a-select
              v-model:value="formState.isRetreat"
              :placeholder="themeLanguage?.isRetreat?.message"
              optionFilterProp="label"
              showSearch
              :options="optionRetreat"
            ></a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="resume_row_update">
        <a-col :span="6">
          <a-form-item
            name="startYear"
            :label="themeLanguage?.startYear?.label"
            :rules="[{ required: true, message: themeLanguage?.startYear?.message }]"
          >
            <a-date-picker
              v-model:value="formState.startYear"
              value-format="YYYY-MM"
              picker="month"
              :placeholder="themeLanguage?.startYear?.message"
            />
          </a-form-item>
        </a-col>
        <a-col :span="6" style="position: relative" v-if="!endYearFlag">
          <a-form-item
            name="endYear"
            :label="themeLanguage?.endYear?.label"
            :rules="[{ required: true, message: themeLanguage?.endYear?.message }]"
          >
            <a-date-picker
              v-model:value="formState.endYear"
              value-format="YYYY-MM"
              picker="month"
              :placeholder="themeLanguage?.endYear?.message"
            />
          </a-form-item>
          <a-checkbox class="resume_box" v-model:checked="endYearFlag" @change="onChangeEndYearFlag"
            >目前在职</a-checkbox
          >
        </a-col>
        <a-col :span="spanTitle" v-if="endYearFlag"
          ><a-form-item :label="themeLanguage?.endYear?.label" style="padding-left: 9px"
            ><span class="resume_col_padding">至今</span>
            <a-checkbox v-model:checked="endYearFlag" @change="onChangeEndYearFlag"
              >目前在职</a-checkbox
            >
          </a-form-item></a-col
        >
        <a-col :span="6"></a-col>
        <a-col :span="6">
          <a-form-item
            :label="themeLanguage?.isNewtest?.label"
            name="isNewtest"
            :rules="[{ required: true, message: themeLanguage?.isNewtest?.message }]"
          >
            <a-select
              v-model:value="formState.isNewtest"
              :placeholder="themeLanguage?.isNewtest?.message"
              optionFilterProp="label"
              showSearch
              @change="handleMarketBrandFloor"
              :options="optionNewtest"
            ></a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="resume_row_update">
        <a-col :span="spanTitle">
          <a-form-item
            :label="themeLanguage?.cityName?.label"
            name="cityName"
            style="padding-left: 21px"
            :rules="[{ required: true, message: themeLanguage?.cityName?.message }]"
          >
            <a-select
              v-model:value="formState.cityName"
              :placeholder="themeLanguage?.cityName?.message"
              :options="optionsCity"
              optionFilterProp="label"
              :labelInValue="true"
              @change="handleCityName"
              showSearch
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="spanTitle" v-if="categoryFlag">
          <a-form-item
            :label="themeLanguage?.marketName?.label"
            name="marketName"
            style="padding-left: 21px"
            :rules="[{ required: true, message: themeLanguage?.marketName?.message }]"
          >
            <a-select
              optionFilterProp="label"
              v-model:value="formState.marketName"
              :placeholder="themeLanguage?.marketName?.message"
              :options="optionsMarkId"
              :labelInValue="true"
              showSearch
              @change="handleMarketBrandFloor"
              @search="handleCityAndMarktName"
            >
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="spanTitle">
          <a-form-item
            :label="themeLanguage?.brandName?.label"
            name="brandName"
            style="padding-left: 21px"
            :rules="[{ required: true, message: themeLanguage?.brandName?.message }]"
          >
            <a-select
              v-model:value="formState.brandName"
              :placeholder="themeLanguage?.brandName?.message"
              optionFilterProp="label"
              :labelInValue="true"
              :options="optionsBrand"
              @change="handleMarketBrandFloor"
              showSearch
              v-if="!brandFlag"
            ></a-select>
            <a-input
              v-if="brandFlag"
              style="width: 50%"
              v-model:value="brandNameCn"
              @blur="handleBrandNameCn"
              placeholder="品牌中文"
            ></a-input>
            <a-input
              v-if="brandFlag"
              style="width: 50%"
              v-model:value="brnadNameEn"
              @blur="handleBrandNameEn"
              placeholder="品牌英文"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="spanTitle" v-if="!categoryFlag">
          <a-button
            style="margin-top: 2%; margin-left: 2%"
            @click="handleChangeBrandFlag"
            size="small"
            type="primary"
            title="切换为填写"
            danger
            v-if="!brandFlag"
            >切换</a-button
          >
          <a-button
            style="margin-top: 2%; margin-left: 2%"
            @click="handleChangeBrandFlag"
            size="small"
            type="primary"
            title="切换为选择"
            danger
            v-if="brandFlag"
            >切换</a-button
          >
        </a-col>
        <a-col :span="spanTitle" v-if="categoryFlag">
          <a-form-item
            :label="themeLanguage?.workFloor?.label"
            name="workFloor"
            style="padding-left: 21px"
            :rules="[{ required: true, message: themeLanguage?.workFloor?.message }]"
          >
            <a-select
              v-model:value="formState.workFloor"
              :placeholder="themeLanguage?.workFloor?.message"
              :options="optionsWorkFloor"
              showSearch
            ></a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="resume_row_update">
        <a-col :span="spanTitle">
          <a-form-item
            :label="themeLanguage?.positionName?.label"
            name="positionsId"
            :rules="[{ required: true, message: themeLanguage?.positionName?.message }]"
          >
            <a-select
              v-model:value="formState.positionsId"
              :placeholder="themeLanguage?.positionName?.message"
              :options="optionsPositions"
              optionFilterProp="label"
              :labelInValue="true"
              showSearch
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="spanTitle">
          <a-form-item
            name="reporter"
            :label="themeLanguage?.reporter?.label"
            style="padding-left: 8px"
            :rules="[{ required: false, message: themeLanguage?.reporter?.message }]"
          >
            <a-input
              v-model:value="formState.reporter"
              :placeholder="themeLanguage?.reporter?.message"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="spanTitle">
          <a-form-item
            name="department"
            :label="themeLanguage?.department?.label"
            style="padding-left: 8px"
            :rules="[{ required: false, message: themeLanguage?.department?.message }]"
          >
            <a-input
              v-model:value="formState.department"
              :placeholder="themeLanguage?.department?.message"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="spanTitle">
          <a-form-item
            name="monthSalary"
            :label="themeLanguage?.monthSalary?.label"
            style="padding-left: 8px"
            :rules="[{ required: false, message: themeLanguage?.monthSalary?.message }]"
          >
            <a-input-number
              style="width: 100%"
              v-model:value="formState.monthSalary"
              :placeholder="themeLanguage?.monthSalary?.message"
            ></a-input-number>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="resume_row_update">
        <a-col :span="24">
          <a-form-item
            name="salaryStructure"
            :label="themeLanguage?.salaryStructure?.label"
            style="padding-left: 8px"
            :label-col="{ span: resumeTypeEnglish == '1' ? 3.6 : 0 }"
            :rules="[{ required: false, message: themeLanguage?.salaryStructure?.message }]"
          >
            <a-input
              v-model:value="formState.salaryStructure"
              :placeholder="themeLanguage?.salaryStructure?.message"
            ></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="resume_row_update">
        <a-col :span="24">
          <a-form-item
            name="personnelStructure"
            :label="themeLanguage?.personnelStructure?.label"
            style="padding-left: 8px"
            :rules="[{ required: false, message: themeLanguage?.personnelStructure?.message }]"
          >
            <a-input
              v-model:value="formState.personnelStructure"
              :placeholder="themeLanguage?.personnelStructure?.message"
            ></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="resume_row_update">
        <a-col :span="24">
          <a-form-item
            name="workDuty"
            :label="themeLanguage?.workDuty?.label"
            :rules="[{ required: true, message: themeLanguage?.workDuty?.message }]"
          >
            <a-textarea
              :rows="7"
              style="white-space: pre-wrap;"
              v-model:value="formState.workDuty"
              :placeholder="themeLanguage?.workDuty?.message"
            ></a-textarea>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24" class="resume_row_update">
        <a-col :span="24" class="resume_detail_btn">
          <a-button style="margin: 0 8px" type="primary" :loading="iconLoading" html-type="submit"
            >保存</a-button
          >
          <a-button @click="handleUpdateWorkInfoCancel">取消</a-button>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script setup lang="ts">
  import { FormOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons-vue';
  import { storeToRefs } from 'pinia';
  import { message } from 'ant-design-vue';
  import type { SelectProps } from 'ant-design-vue';
  import { useResumeListStoreWithOut } from '/@/store/modules/resumeList';
  import { useCityStoreWithOut } from '/@/store/modules/city';
  import { useResumeDetailStore } from '/@/store/modules/resumeDetail';
  import { workFloorArr } from '/@/store/data/resume';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
  import { createVNode } from 'vue';
  import { debounce } from 'lodash-es';
  import { Modal } from 'ant-design-vue';
  import { validateLanguage } from '/@/utils/resumeTypeEn';
  const cityStore = useCityStoreWithOut();
  const resumeListStore = useResumeListStoreWithOut();
  const { positionsList, brandList, companyList } = storeToRefs(resumeListStore);
  const { province } = storeToRefs(cityStore);
  const spanTitle = 6;
  const resumeDetailStore = useResumeDetailStore();
  const { workWholeFlag, resumeTypeEnglish } = storeToRefs(resumeDetailStore);
  const expend = ref(false);
  const expendShow = ref(false);
  const iconLoading = ref(false);
  const categoryFlag = ref(true);
  const brandFlag = ref(false);
  const formRef = ref(null);
  const optionCategory = ref([{ value: '', label: '' }]);
  const optionRetreat = ref([{ value: 1, label: '' }]);
  const optionNewtest = ref([{ value: 1, label: '' }]);
  const props = defineProps({
    resumeData: {
      type: Object,
      required: false,
    },
    indexNum: {
      type: Number,
      required: false,
    },
    showResumeAdd: {
      type: Boolean,
      required: true,
    },
  });
  const workWholeFlagTemp = ref(false);
  const handleWorkWholeFlagTemp = () => {
    if (
      !props.resumeData.startYear ||
      !props.resumeData.startMonth ||
      !props.resumeData.endYear ||
      (props.resumeData.endYear != '-1' && !props.resumeData.endMonth) ||
      !props.resumeData.category ||
      !props.resumeData.companyName ||
      (props.resumeData.category == '店铺' &&
        (!props.resumeData.marketName ||
          !props.resumeData.workFloor ||
          !(props.resumeData.isRetreat == 0 || props.resumeData.isRetreat == 1))) ||
      !(props.resumeData.isNewtest == 0 || props.resumeData.isNewtest == 1) ||
      !props.resumeData.positionName ||
      !props.resumeData.workDuty ||
      !props.resumeData.cityName ||
      ((props.resumeData.category == '店铺' || props.indexNum < 2)&& !props.resumeData.brandName)
    ) {
      workWholeFlagTemp.value = true;
    }
  };
  handleWorkWholeFlagTemp();
  watch(
    () => props.resumeData,
    (newProps) => {
      if (
        !newProps.startYear ||
        !newProps.startMonth ||
        !newProps.endYear ||
        (newProps.endYear != '-1' && !newProps.endMonth) ||
        !newProps.category ||
        !newProps.companyName ||
        (newProps.category == '店铺' &&
          (!newProps.marketName ||
            !newProps.workFloor ||
            !(newProps.isRetreat == 0 || newProps.isRetreat == 1))) ||
        !(newProps.isNewtest == 0 || newProps.isNewtest == 1) ||
        !newProps.positionName ||
        !newProps.workDuty ||
        !newProps.cityName ||
        ((newProps.category == '店铺' || props.indexNum < 2)&& !newProps.brandName)
      ) {
        workWholeFlagTemp.value = true;
      } else {
        workWholeFlagTemp.value = false;
      }
    },
  );
  const themeLanguage = ref(validateLanguage('workInfo', resumeTypeEnglish.value));
  const loginVueUser: { loginName: ''; loginId: ''; loginTocken: '' } = JSON.parse(
    localStorage.getItem('loginVueUser'),
  );
  const formState = reactive({
    companyName: '',
    category: '',
    isRetreat: '',
    isNewtest: '',
    startYear: '',
    startMonth: '',
    endYear: '',
    endMonth: '',
    positionName: '',
    department: '',
    workDuty: '',
    cityName: { value: '', label: '' },
    marketName: { value: '', label: '' },
    reporter: '',
    brandName: { value: '', label: '' },
    workFloor: '',
    monthSalary: '',
    salaryStructure: '',
    personnelStructure: '',
    positionsId: { value: '', label: '' },
    resumeId: props.resumeData?.resumeId,
    id: '',
    workMark: '',
    workBrand: '',
    workCity: '',
    brandRetailLevel: '',
    brandRetail: '',
    brandCategory: '',
    brandWrite: '',
    brandNameCn: '',
    brnadNameEn: '',
    recruitId: loginVueUser.loginId,
  });
  if (!props.resumeData?.id) {
    expend.value = !expend.value;
  }
  
  //工作经历结束年月是否为"至今" false 展示日期组件 true 展示至今
  let endYearFlag = ref(false);
  onBeforeMount(() => {
    if (props.resumeData?.endYear == '至今' || props.resumeData?.endYear == '-1') {
      endYearFlag.value = true;
    }
  });
  const endYearTemp =
    props.resumeData?.endYear == -1
      ? ''
      : !props.resumeData?.endYear
      ? ''
      : props.resumeData?.endYear +
        (props.resumeData?.endMonth < 10
          ? '-0' + props.resumeData?.endMonth
          : '-' + props.resumeData?.endMonth);
  const onChangeEndYearFlag = () => {
    if (endYearFlag.value) {
      endYearFlag.value = true;
      formState.endYear = '-1';
      //@ts-ignore
      formState.isNewtest = 1;
    } else {
      endYearFlag.value = false;
      //peops.workExperienceData.endYear = "";
      formState.endYear = endYearTemp;
      formState.isNewtest = '';
    }
  };
  const handleWorkExpShow = () => {
    expendShow.value = !expendShow.value;
    expend.value = !expend.value;
  }
  const handleUpdateWorkInfoCancel = () => {
    expendShow.value = false;
    expend.value = false;
  }
  const handleUpdateWorkInfo = () => {
    expend.value = !expend.value;
    if (!props.resumeData?.id) {
      resumeDetailStore.$patch({ workFlag: false });
    }
    formState.companyName = props.resumeData?.companyName;
    formState.brandName = {
      value: props.resumeData?.workBrand?.toString(),
      label: props.resumeData?.brandName,
    };
    formState.category = props.resumeData?.category;
    formState.marketName = {
      value: props.resumeData?.workMark,
      label: props.resumeData?.marketName,
    };
    formState.cityName = { value: props.resumeData?.workCity, label: props.resumeData?.cityName };
    formState.department = props.resumeData?.department;
    formState.startYear =
      props.resumeData?.startYear +
      (props.resumeData?.startMonth - 0 < 10
        ? '-0' + (+props.resumeData?.startMonth == 0 ? 1 : +props.resumeData?.startMonth)
        : '-' + props.resumeData?.startMonth);
    formState.startMonth = props.resumeData?.startMonth;
    if (props.resumeData?.endYear == '-1') {
      formState.endYear = '-1';
    } else {
      formState.endYear = !props.resumeData?.endYear
        ? ''
        : props.resumeData?.endYear +
          (props.resumeData?.endMonth < 10
            ? '-0' + (+props.resumeData?.endMonth == 0 ? 1 : +props.resumeData?.endMonth)
            : '-' + props.resumeData?.endMonth);
    }

    formState.endMonth = props.resumeData?.endMonth;
    formState.positionName = props.resumeData?.positionName;
    formState.positionsId = {
      value: props.resumeData?.positionsId,
      label: props.resumeData?.positionName,
    };
    formState.resumeId = props.resumeData?.resumeId;
    formState.id = props.resumeData?.id;
    formState.salaryStructure = props.resumeData?.salaryStructure;
    formState.personnelStructure = props.resumeData?.personnelStructure;
    //formState.workDuty = props.resumeData?.workDuty?.replaceAll(/<[^>]+>/g, '');
    formState.workDuty = props.resumeData?.workDuty?.replaceAll(/<p>/g, '').replaceAll(/<(\/)?p>/g, '\n');
    formState.workFloor = props.resumeData?.workFloor;
    formState.workMark = props.resumeData?.workMark;
    formState.workBrand = props.resumeData?.workBrand?.toString();
    formState.workCity = props.resumeData?.workCity;
    formState.monthSalary = props.resumeData?.monthSalary;
    formState.department = props.resumeData?.department;
    formState.reporter = props.resumeData?.reporter;
    formState.isRetreat = props.resumeData?.isRetreat;
    formState.isNewtest = props.resumeData?.isNewtest;
    formState.brandRetailLevel = props.resumeData?.brandRetailLevel;
    formState.brandRetail = props.resumeData?.brandRetail;
    formState.brandCategory = props.resumeData?.brandCategory;
    handleCategory();
    handleCityName(formState.cityName, formState.marketName.label);
    handleMarketBrandFloor();
  };
  //职位数据
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
  //楼层数据展示
  const optionsWorkFloor = ref<SelectProps['options']>([]);
  //品牌数据展示
  const optionsBrand = ref<SelectProps['options']>([]);
  let tempOptionBrand = [];
  watch(brandList,
  () => {
    brandList.value.forEach((item) => {
    //@ts-ignore
    let tempObj = {
      //@ts-ignore
      label: positionsListShow(item.cnName, item.usName),
      //@ts-ignore
      value: item.brandId?.toString(),
    };
    //@ts-ignore
    tempOptionBrand.push(tempObj);
  });
  optionsBrand.value = tempOptionBrand;
  }
  )
  brandList.value.forEach((item) => {
    //@ts-ignore
    let tempObj = {
      //@ts-ignore
      label: positionsListShow(item.cnName, item.usName),
      //@ts-ignore
      value: item.brandId?.toString(),
    };
    //@ts-ignore
    tempOptionBrand.push(tempObj);
  });
  optionsBrand.value = tempOptionBrand;
  //城市数据展示
  const optionsCity = ref<SelectProps['options']>([]);
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
        value: curr.id,
      });
    } else {
      //@ts-ignore
      prev.push({
        //@ts-ignore
        label: curr.cityName,
        //@ts-ignore
        value: curr.id,
      });
    }
    return prev;
  }, []);
  //商场数据展示
  const optionsMarkId = ref<SelectProps['options']>([]);
  const handleCityName = (values, marketName) => {
    let temp = '';
    if (!(Object.prototype.toString.call(marketName) === '[object Object]')) {
      temp = marketName;
    }
    let tempOptionMarkIdUpdate = [];
    let marktFlag = false;
    //商场数据
    resumeDetailStore.queryMarkList(values.label, temp).then((res) => {
      res.info.forEach((item) => {
        //@ts-ignore
        let tempObj = {
          //@ts-ignore
          label: item.text,
          //@ts-ignore
          value: item.id,
        };
        if (item.id == formState.marketName.value) {
          marktFlag = true;
        }
        //@ts-ignore
        tempOptionMarkIdUpdate.push(tempObj);
      });
      optionsMarkId.value = tempOptionMarkIdUpdate;
      if (!marktFlag) {
        formState.marketName = { value: '', label: '' };
      }
    });
  };
  const handleCityAndMarktName = (values) => {
    let tempOptionMarkIdUpdate = [];
    let marktFlag = false;
    //商场数据
    resumeDetailStore.queryMarkList(formState.cityName.value, values).then((res) => {
      res.info.forEach((item) => {
        //@ts-ignore
        let tempObj = {
          //@ts-ignore
          label: item.text,
          //@ts-ignore
          value: item.id,
        };
        if (item.id == formState.marketName.value) {
          marktFlag = true;
        }
        //@ts-ignore
        tempOptionMarkIdUpdate.push(tempObj);
      });
      optionsMarkId.value = tempOptionMarkIdUpdate;
      if (!marktFlag) {
        formState.marketName = { value: '', label: '' };
      }
    });
  };
  const handleMarketBrandFloor = () => {
    
    if (formState.marketName.label == "街边店"){
      optionsWorkFloor.value= [{value: '1层',label: '1层'}]
      formState.workFloor = '1层';
      return;
    }
    if (formState.category == "OFFICE" || !formState.marketName.value  || !formState.brandName.value) {
      return;
    }
    optionsWorkFloor.value= [{value: '',label: ''}];
    resumeDetailStore
      .queryMarkBrandFloor(formState.marketName.value, formState.brandName.value || '')
      .then((res) => {
        if (res.code == 1) {
          optionsWorkFloor.value= [{value: res.info[0].floor,label: res.info[0].floor}]
          formState.workFloor = res.info[0].floor;
        } else {
          if (formState.isNewtest == '1' || formState.isRetreat == '1' || formState.isRetreat || formState.isNewtest) {
            formState.workFloor = '';
            message.error('该商场无此品牌数据，商场信息中添加该楼层信息！')
          } else {
            optionsWorkFloor.value= workFloorArr.map(item => ({value: item,label: item}));
          }
        }
      });
  };
  //公司数据展示
  const optionsCompanyId = ref<SelectProps['options']>([]);
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
  const fetching = ref(false);
  const fetchingCompanyName = ref(false);
  const handleCompanyName = debounce((value) => {
    let tempOptionMarkIdUpdate = [];
    fetching.value = true;
    fetchingCompanyName.value = true;
    //商场数据
    resumeDetailStore.queryCompanyQiChacha(value).then((res) => {
      const result = JSON.parse(res.info).result?.items;
      result?.forEach((item) => {
        //@ts-ignore
        let tempObj = {
          //@ts-ignore
          label: item.name,
          //@ts-ignore
          value: item.name,
        };
        //@ts-ignore
        tempOptionMarkIdUpdate.push(tempObj);
      });
      optionsCompanyId.value = tempOptionMarkIdUpdate;
      fetching.value = false;
    });
  }, 2000);
  const selcetCompanyNameFlag  = ref(false);
  const handleSelcetCompanyName = () => {
    selcetCompanyNameFlag.value = true;
  }
  const brandNameCn = ref('');
  const brnadNameEn = ref('');
  const handleChangeBrandFlag = () => {
    brandFlag.value = !brandFlag.value;
    brandNameCn.value = '';
    brnadNameEn.value = '';
  };
  const handleCategory = () => {
    brandNameCn.value = '';
    brnadNameEn.value = '';
    if (formState.category == '店铺' || formState.category == 'Store') {
      categoryFlag.value = true;
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
    } else {
      categoryFlag.value = false;
      formState.workFloor = '';
      formState.workBrand = '';
      formState.workMark = '';
      formState.isRetreat = '';
      formState.marketName = { value: '', label: '' };
      if (formState.brandName?.value == '1224') {
        formState.brandName = { value: '', label: '' };
      }
      //formState.brandName ={ value: '', label: '' };
      resumeDetailStore.queryResumePositions().then((res) => {
        let tempOption = [];
        res.info.postList.forEach((item) => {
          //@ts-ignore
          let tempObj = {
            //@ts-ignore
            label: positionsListShow(item.cnPosition, item.usPosition),
            //@ts-ignore
            value: item.positionId,
          };
          //@ts-ignore
          tempOption.push(tempObj);
        });
        optionsPositions.value = tempOption;
      });
    }
  };
  const handleBrandNameCn = (e) => {
    console.log(e.target.value)
    const reg = /^[\u4e00-\u9fa5\u3400-\u4DBF\u4E00-\u9FFF]+$/;
    if(!reg.test(e.target.value)){
      message.error("请填写中文");
      brandNameCn.value = '';
      return;
    }
    resumeDetailStore.queryCheckBrandName(e.target.value,'').then(res => {
      if (res.code != 1) {
        message.error(res.info);
        brandNameCn.value = '';
      }
    });
  }
  
  const handleBrandNameEn = (e) => {
    const reg = /^[a-zA-Z][a-zA-Z0-9]*$/;
    if(!reg.test(e.target.value)){
      message.error("请填写英文");
      brnadNameEn.value = '';
      return;
    }
    resumeDetailStore.queryCheckBrandName('',e.target.value).then(res => {
      if (res.code != 1) {
        message.error(res.info);
        brnadNameEn.value = '';
      }
    });
  }
  const onFinish = async () => {
    if ((formState.category == '店铺' || props.indexNum < 2) && !brandFlag.value && !formState.brandName.label) {
      message.error('请选择品牌');
      return;
    }
    if ((formState.category == '店铺' || props.indexNum < 2) && brandFlag.value && !brandNameCn.value && !brnadNameEn.value) {
      message.error('请填写品牌');
      return;
    }
    let brandNameFlag = false;
    if (brandFlag.value && (brandNameCn.value || brnadNameEn.value)) {
      formState.brandWrite = '1';
      formState.brandNameCn = brandNameCn.value;
      formState.brnadNameEn = brnadNameEn.value;
      brandNameFlag = true;
      const res = await resumeDetailStore.queryCheckBrandName(brandNameCn.value,brnadNameEn.value);
      if (res.code == 1) {
        brandNameFlag = false;
      } else {
        message.error(res.info);
      }
    }
    if (brandNameFlag) {
      return;
    }
    //没有选择公司 工作经历是缺失的 是前2份工作
    if (!selcetCompanyNameFlag.value && workWholeFlagTemp.value && props.indexNum < 2) {
    message.warning("请确认后选择公司名称");
    return;
    }
    iconLoading.value = true;
    resumeDetailStore
      .updateResumeWorkExp(formState)
      .then((res) => {
        if (res.code == 1) {
          brandNameCn.value = '';
          brnadNameEn.value = '';
          brandFlag.value = false;
          selcetCompanyNameFlag.value = false;
          formState.brandWrite = '';
          formState.brandNameCn = '';
          formState.brnadNameEn = '';
          resumeDetailStore.queryResumeDetail().then(() => {
            iconLoading.value = false;
            expendShow.value = !expendShow.value;
            brandFlag.value = false;

            if (!props.resumeData?.id) {
              resumeDetailStore.$patch({ workFlag: false });
            }
            message.success('保存成功');
          });
        } else {
          iconLoading.value = false;
          message.error('保存失败');
        }
      })
      .catch(() => {
        iconLoading.value = false;
        message.error('保存失败');
      });
  };
  const handleAddWorkInfo = () => {
    resumeDetailStore.$patch({ workFlag: true });
    // const domindex = document.getElementsByClassName("resume_container_index")[0];
    // console.log(domindex.scrollTop);
    // const domWork = document.getElementsByClassName("resume_work_show")[0];
    // console.log(domWork.scrollTop);
  };
  //删除工作经历开始
  const handleDeleteWorkExp = () => {
    Modal.confirm({
      title: '是否删除工作经历?',
      icon: createVNode(ExclamationCircleOutlined),
      content: createVNode('div', { style: 'color:red;' }, props.resumeData.companyName),
      onOk() {
        resumeDetailStore.deleteWorkExp(props.resumeData.id).then((res) => {
          if (res == 'Y') {
            resumeDetailStore.queryResumeDetail().then(() => {
              message.success('删除成功');
            });
          } else {
            message.error('删除失败');
          }
        });
      },
    });
  };
  //删除工作经历结束
  const loadresumeTypeEnglish = () => {
    if (resumeTypeEnglish.value == '1') {
      optionCategory.value = [
        { value: 'Store', label: 'Store' },
        { value: 'OFFICE', label: 'OFFICE' },
      ];
      optionRetreat.value = [
        { value: 1, label: 'Yes' },
        { value: 0, label: 'No' },
      ];
      optionNewtest.value = [
        { value: 1, label: 'Yes' },
        { value: 0, label: 'No' },
      ];
    } else {
      optionCategory.value = [
        { value: '店铺', label: '店铺' },
        { value: 'OFFICE', label: 'OFFICE' },
      ];
      optionRetreat.value = [
        { value: 1, label: '是' },
        { value: 0, label: '否' },
      ];
      optionNewtest.value = [
        { value: 1, label: '是' },
        { value: 0, label: '否' },
      ];
    }
  };
  loadresumeTypeEnglish();
  watch(
    () => resumeTypeEnglish.value,
    () => {
      themeLanguage.value = validateLanguage('workInfo', resumeTypeEnglish.value);
      loadresumeTypeEnglish();
    },
  );
</script>
<style lang="less" scoped>
  .resume_header {
    margin: 0 20px;
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
  .resume_company_row {
    background-color: #f0f0f0;
    font-size: 14px;
    padding: 10px 0;
    font-weight: 700;
  }
  .resume_row_update {
    margin-left: 15px;
  }
  .resume_row {
    margin-bottom: 20px;
    padding-left: 25px;
  }
  .resume_detail_btn {
    display: flex;
    justify-content: center;
  }
  .resume_box {
    position: absolute;
    top: 8%;
    left: 112%;
    width: 100px;
  }
  .resume_col_padding {
    padding-left: 12px;
    padding-right: 10px;
  }
  .resume_span {
    padding-left: 15px;
  }
  .resume_col {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .workWholeFlagRed {
    padding-left: 10px;
    background: linear-gradient(225deg, red 16%, transparent 0);
  }
  .workWholeFlagGreen {
    padding-left: 10px;
    background: linear-gradient(225deg, green 16%, transparent 0);
  }
  .resume_col_brandRetail {
    padding-left: 43px !important;
  }
  .resume_col_brandCategory {
    padding-left: 43px !important;
  }
  .resume_col_brandRetail_en {
    padding-left: 30px !important;
  }
  .resume_col_brandCategory_en {
    padding-left: 65px !important;
  }
</style>
