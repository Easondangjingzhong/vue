<template>
 <a-drawer
    v-model:open="outsourceSocialSecurityFlag"
    title="社保信息"
    :maskClosable="false"
    :keyboard="false"
    :closable="false"
    :width="drawerWidth"
    :bodyStyle="{ padding: '4px 14px' }"
    :headerStyle="{ padding: '5px 18px 5px 12px' }"
    placement="right"
  >
    <template #extra>
      <CloseOutlined @click="cancelSocialSecurityFlag"/>
    </template>
    <div>
      <a-form :model="outsourceSocialSecurityForm" :label-col="labelCol" @finish="handleSubmit">
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item name="shebaoStatus" label="社保状态"
            :rules="[{ required: true, message: '请选择社保状态' }]">
              <a-select 
              v-model:value="outsourceSocialSecurityForm.shebaoStatus" 
              :options="currentStatusOption"
              @change="handleChangeShebaoStatus"
              ></a-select>
            </a-form-item>
          </a-col>
           <a-col :span="12" v-if="outsourceSocialSecurityForm.shebaoStatus != '1'">
            <a-form-item name="shebaoCity" label="缴纳城市" :rules="[{ required: true, message: '请选择缴纳城市' }]">
              <!-- <a-select 
              v-model:value="outsourceSocialSecurityForm.shebaoCity" 
              :options="cityOption"
              ></a-select> -->
              <a-input v-model:value="outsourceSocialSecurityForm.shebaoCity" />
            </a-form-item>
          </a-col>
         </a-row>
        <a-row :gutter="24" v-if="outsourceSocialSecurityForm.shebaoStatus != '1'">
          <a-col :span="12">
            <a-form-item name="shebaoStandard" label="社保缴纳" :rules="[{ required: true, message: '请填写社保缴纳' }]">
               <a-select 
              v-model:value="outsourceSocialSecurityForm.shebaoStandard" 
              :options="shebaoStandardOption"
              @change="handleChangeShebaoStatus"
              ></a-select>
            </a-form-item>
          </a-col>
           <a-col :span="12">
             <a-form-item name="shebaoCompany" label="缴纳单位" :rules="[{ required: true, message: '请填写缴纳单位' }]">
               <a-select 
              v-model:value="outsourceSocialSecurityForm.shebaoCompany" 
              :options="shebaoCompanyOption"
              @change="handleCompanyNameOption"
              ></a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24" v-if="outsourceSocialSecurityForm.shebaoStatus != '1'">
          <a-col :span="12">
            <a-form-item name="shebaoZuidiJishu" label="最低基数" :rules="[{ required: true, message: '请填写最低基数' }]">
               <a-input v-model:value="outsourceSocialSecurityForm.shebaoZuidiJishu" disabled />
            </a-form-item>
          </a-col>
           <a-col :span="12">
             <a-form-item name="shebaoShijiJishu" label="实际基数" :rules="[{ required: true, message: '请填写实际基数' }]">
               <a-input v-model:value="outsourceSocialSecurityForm.shebaoShijiJishu" @change="handleChangeShebaoShijiJishu" :disabled="outsourceSocialSecurityForm.shebaoStandard === '1'" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24" v-if="outsourceSocialSecurityForm.shebaoStatus != '1'">
          <a-col :span="12">
            <a-form-item name="shebaoYujiaoTime" label="社保预缴" :rules="[{ required: false, message: '请填写社保预缴' }]">
              <a-date-picker v-model:value="outsourceSocialSecurityForm.shebaoYujiaoTime" value-format="YYYY-MM-DD" 
              @change="handleChangeShebaoStatus"/>
            </a-form-item>
          </a-col>
           <a-col :span="12">
            <a-form-item name="shebaoShijiaoTime" label="社保实缴" :rules="[{ required: false, message: '请填写社保实缴' }]">
              <a-date-picker v-model:value="outsourceSocialSecurityForm.shebaoShijiaoTime" value-format="YYYY-MM-DD" />
            </a-form-item>
          </a-col>
        </a-row>
         <a-row :gutter="24" v-if="outsourceSocialSecurityForm.shebaoStatus != '1'">
          <a-col :span="12">
            <a-form-item name="shebaoYutingTime" label="社保预停" :rules="[{ required: false, message: '请填写社保预停' }]">
              <a-date-picker v-model:value="outsourceSocialSecurityForm.shebaoYutingTime" value-format="YYYY-MM-DD" />
            </a-form-item>
          </a-col>
           <a-col :span="12">
            <a-form-item name="shangbaoShitingTime" label="社保实停" :rules="[{ required: false, message: '请填写社保实停' }]">
              <a-date-picker v-model:value="outsourceSocialSecurityForm.shangbaoShitingTime" value-format="YYYY-MM-DD" />
            </a-form-item>
          </a-col>
        </a-row>
         <a-row :gutter="24" v-if="outsourceSocialSecurityForm.shebaoStatus != '1'">
          <a-col :span="12">
            <a-form-item name="yijinStandard" label="一金缴纳" :rules="[{ required: true, message: '请填写一金缴纳' }]">
               <a-select 
              v-model:value="outsourceSocialSecurityForm.yijinStandard" 
              :options="shebaoStandardOption"
              ></a-select>
            </a-form-item>
          </a-col>
           <a-col :span="12">
             <a-form-item name="yijinJiaoCompany" label="缴纳单位" :rules="[{ required: true, message: '请填写缴纳单位' }]">
               <a-select 
              v-model:value="outsourceSocialSecurityForm.yijinJiaoCompany" 
              :options="shebaoCompanyOption" disabled
              ></a-select>
            </a-form-item>
          </a-col>
        </a-row>
          <a-row :gutter="24" v-if="outsourceSocialSecurityForm.shebaoStatus != '1'">
          <a-col :span="12">
            <a-form-item name="yijinZuidiJishu" label="最低基数" :rules="[{ required: true, message: '请填写最低基数' }]">
               <a-input v-model:value="outsourceSocialSecurityForm.yijinZuidiJishu" disabled />
            </a-form-item>
          </a-col>
           <a-col :span="12">
             <a-form-item name="yijinShijiJishu" label="实际基数" :rules="[{ required: true, message: '请填写实际基数' }]">
               <a-input v-model:value="outsourceSocialSecurityForm.yijinShijiJishu"  @change="handleChangeYijinShijiJishu"  :disabled="outsourceSocialSecurityForm.yijinStandard === '1'" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24" v-if="outsourceSocialSecurityForm.shebaoStatus != '1'">
          <a-col :span="12">
            <a-form-item name="yijinYujiaoTime" label="一金预缴" :rules="[{ required: false, message: '请填写一金预缴' }]">
              <a-date-picker v-model:value="outsourceSocialSecurityForm.yijinYujiaoTime" value-format="YYYY-MM-DD" />
            </a-form-item>
          </a-col>
           <a-col :span="12">
            <a-form-item name="yijinShijiaoTime" label="一金实缴" :rules="[{ required: false, message: '请填写一金实缴' }]">
              <a-date-picker v-model:value="outsourceSocialSecurityForm.yijinShijiaoTime" value-format="YYYY-MM-DD" />
            </a-form-item>
          </a-col>
        </a-row>
         <a-row :gutter="24" v-if="outsourceSocialSecurityForm.shebaoStatus != '1'">
          <a-col :span="12">
            <a-form-item name="yijinYutingTime" label="一金预停" :rules="[{ required: false, message: '请填写一金预停' }]">
              <a-date-picker v-model:value="outsourceSocialSecurityForm.yijinYutingTime" value-format="YYYY-MM-DD" />
            </a-form-item>
          </a-col>
           <a-col :span="12">
            <a-form-item name="yijinShitingTime" label="一金实停" :rules="[{ required: false, message: '请填写一金实停' }]">
              <a-date-picker v-model:value="outsourceSocialSecurityForm.yijinShitingTime" value-format="YYYY-MM-DD" />
            </a-form-item>
          </a-col>
        </a-row>
         <a-row :gutter="24">
          <a-col :span="12" v-if="outsourceSocialSecurityForm.shebaoStatus != '1'">
            <a-form-item name="serviceMoney" label="手续费" :rules="[{ required: true, message: '请填写手续费' }]">
               <a-input v-model:value="outsourceSocialSecurityForm.serviceMoney" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-divider style="margin-bottom: 12px;margin-top: 0;" />
         <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item name="shangbaoStatus" label="商保" :rules="[{ required: true, message: '请填写商保' }]">
               <a-select 
              v-model:value="outsourceSocialSecurityForm.shangbaoStatus" 
              :options="shangbaoStatusOption"
              ></a-select>
            </a-form-item>
          </a-col>
        </a-row>
         <a-row :gutter="24" v-if="outsourceSocialSecurityForm.shangbaoStatus === '2'">
          <a-col :span="12">
            <a-form-item name="shangbaoProject" label="项目" :rules="[{ required: true, message: '请填写项目' }]">
               <a-input v-model:value="outsourceSocialSecurityForm.shangbaoProject" />
            </a-form-item>
          </a-col>
           <a-col :span="12">
             <a-form-item name="keShangbao" label="客户收费" :rules="[{ required: true, message: '请填写客户收费' }]">
              <a-input v-model:value="outsourceSocialSecurityForm.keShangbao" />
            </a-form-item>
          </a-col>
        </a-row>
         <a-row :gutter="24" v-if="outsourceSocialSecurityForm.shangbaoStatus === '2'">
          <a-col :span="12">
            <a-form-item name="shiShangbao" label="实际支出" :rules="[{ required: true, message: '请填写实际支出' }]">
                <a-input v-model:value="outsourceSocialSecurityForm.shiShangbao" />
            </a-form-item>
          </a-col>
           <a-col :span="12">
             <a-form-item name="shangbaoJiaoCompany" label="缴纳单位" :rules="[{ required: true, message: '请填写缴纳单位' }]">
               <a-select 
              v-model:value="outsourceSocialSecurityForm.shangbaoJiaoCompany" 
              :options="shebaoCompanyOption"
              ></a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24" v-if="outsourceSocialSecurityForm.shangbaoStatus === '2'">
          <a-col :span="12">
            <a-form-item name="shangbaoYujiaoTime" label="商保预缴" :rules="[{ required: false, message: '请填写商保预缴' }]">
              <a-date-picker v-model:value="outsourceSocialSecurityForm.shangbaoYujiaoTime" value-format="YYYY-MM-DD" />
            </a-form-item>
          </a-col>
           <a-col :span="12">
            <a-form-item name="shangbaoShijiaoTime" label="商保实缴" :rules="[{ required: false, message: '请填写商保实缴' }]">
              <a-date-picker v-model:value="outsourceSocialSecurityForm.shangbaoShijiaoTime" value-format="YYYY-MM-DD" />
            </a-form-item>
          </a-col>
        </a-row>
         <a-row :gutter="24" v-if="outsourceSocialSecurityForm.shangbaoStatus === '2'">
          <a-col :span="12">
            <a-form-item name="shangbaoYutingTime" label="商保预停" :rules="[{ required: false, message: '请填写商保预停' }]">
              <a-date-picker v-model:value="outsourceSocialSecurityForm.shangbaoYutingTime" value-format="YYYY-MM-DD" />
            </a-form-item>
          </a-col>
           <a-col :span="12">
            <a-form-item name="shangbaoShitingTime" label="商保实停" :rules="[{ required: false, message: '请填写商保实停' }]">
              <a-date-picker v-model:value="outsourceSocialSecurityForm.shangbaoShitingTime" value-format="YYYY-MM-DD" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24" style="height: 28px; line-height: 25px;" v-if="outsourceSocialSecurityForm.shebaoStatus != '1'">
          <a-col :span="3" style="text-align: right;">个人</a-col>
          <a-col :span="3" style="padding: 0 3px 0 0;">基数</a-col>
          <a-col :span="3" style="padding: 0 3px 0 0;">比例</a-col>
          <a-col :span="3" style="padding: 0 3px 0 0;">金额</a-col>
          <a-col :span="3" style="text-align: right;">企业</a-col>
          <a-col :span="3" style="padding: 0 3px 0 0;">基数</a-col>
          <a-col :span="3" style="padding: 0 3px 0 0;">比例</a-col>
          <a-col :span="3" style="padding: 0 3px 0 0;">金额</a-col>
        </a-row>
        <a-row :gutter="24" style="height: 28px; line-height: 25px;" v-if="outsourceSocialSecurityForm.shebaoStatus != '1'">
          <a-col :span="3" style="text-align: right;">养老</a-col>
          <a-col :span="3" style="padding: 0 3px 0 0;"><a-form-item name="yanglaoJishu"><a-input v-model:value="outsourceSocialSecurityForm.yanglaoJishu" disabled /></a-form-item></a-col>
          <a-col :span="3" style="padding: 0 3px 0 0;"><a-form-item name="yanglaoRate"><a-input v-model:value="yanglaoRateDisplay" disabled /></a-form-item></a-col>
          <a-col :span="3" style="padding: 0 3px 0 0;"><a-form-item name="yanglaoPerson"><a-input v-model:value="outsourceSocialSecurityForm.yanglaoPerson" disabled /></a-form-item></a-col>
          <a-col :span="3" style="text-align: right;">养老</a-col>
          <a-col :span="3" style="padding: 0 3px 0 0;"><a-form-item name="yanglaoCompanyJishu"><a-input v-model:value="outsourceSocialSecurityForm.yanglaoCompanyJishu" disabled /></a-form-item></a-col>
          <a-col :span="3" style="padding: 0 3px 0 0;"><a-form-item name="yanglaoCompanyRate"><a-input v-model:value="yanglaoCompanyDisplay" disabled /></a-form-item></a-col>
          <a-col :span="3" style="padding: 0 3px 0 0;"><a-form-item name="yanglaoCompany"><a-input v-model:value="outsourceSocialSecurityForm.yanglaoCompany" disabled /></a-form-item></a-col>
        </a-row>
        <a-row :gutter="24" style="height: 28px; line-height: 25px;" v-if="outsourceSocialSecurityForm.shebaoStatus != '1'">
          <a-col :span="3" style="text-align: right;">失业</a-col>
          <a-col :span="3" style="padding: 0 3px 0 0;"><a-form-item name="shiyeJishu"><a-input v-model:value="outsourceSocialSecurityForm.shiyeJishu" disabled /></a-form-item></a-col>
          <a-col :span="3" style="padding: 0 3px 0 0;"><a-form-item name="shiyeRate"><a-input v-model:value="shiyePersonDisplay" disabled /></a-form-item></a-col>
          <a-col :span="3" style="padding: 0 3px 0 0;"><a-form-item name="shiyePerson"><a-input v-model:value="outsourceSocialSecurityForm.shiyePerson" disabled /></a-form-item></a-col>
          <a-col :span="3" style="text-align: right;">失业</a-col>
          <a-col :span="3" style="padding: 0 3px 0 0;"><a-form-item name="shiyeCompanyJishu"><a-input v-model:value="outsourceSocialSecurityForm.shiyeCompanyJishu" disabled /></a-form-item></a-col>
          <a-col :span="3" style="padding: 0 3px 0 0;"><a-form-item name="shiyeCompanyRate"><a-input v-model:value="shiyeCompanyDisplay" disabled /></a-form-item></a-col>
          <a-col :span="3" style="padding: 0 3px 0 0;"><a-form-item name="shiyeCompany"><a-input v-model:value="outsourceSocialSecurityForm.shiyeCompany" disabled /></a-form-item></a-col>
        </a-row>
        <a-row :gutter="24" style="height: 28px; line-height: 25px;" v-if="outsourceSocialSecurityForm.shebaoStatus != '1'">
          <a-col :span="3" style="text-align: right;">医疗</a-col>
          <a-col :span="3" style="padding: 0 3px 0 0;"><a-form-item name="yiliaoJishu"><a-input v-model:value="outsourceSocialSecurityForm.yiliaoJishu" disabled /></a-form-item></a-col>
          <a-col :span="3" style="padding: 0 3px 0 0;"><a-form-item name="yiliaoRate"><a-input v-model:value="yiliaoPersonDisplay" disabled /></a-form-item></a-col>
          <a-col :span="3" style="padding: 0 3px 0 0;"><a-form-item name="yiliaoPerson"><a-input v-model:value="outsourceSocialSecurityForm.yiliaoPerson" disabled /></a-form-item></a-col>
          <a-col :span="3" style="text-align: right;">医疗</a-col>
          <a-col :span="3" style="padding: 0 3px 0 0;"><a-form-item name="yiliaoCompanyJishu"><a-input v-model:value="outsourceSocialSecurityForm.yiliaoCompanyJishu" disabled /></a-form-item></a-col>
          <a-col :span="3" style="padding: 0 3px 0 0;"><a-form-item name="yiliaoCompanyRate"><a-input v-model:value="yiliaoCompanyDisplay" disabled /></a-form-item></a-col>
          <a-col :span="3" style="padding: 0 3px 0 0;"><a-form-item name="yiliaoCompany"><a-input v-model:value="outsourceSocialSecurityForm.yiliaoCompany" disabled /></a-form-item></a-col>
        </a-row>
        <a-row :gutter="24" style="height: 28px; line-height: 25px;" v-if="outsourceSocialSecurityForm.shebaoStatus != '1'">
          <a-col :span="3" style="text-align: right;">大病</a-col>
          <a-col :span="3" style="padding: 0 3px 0 0;"><a-form-item name="dabingJishu"><a-input v-model:value="outsourceSocialSecurityForm.dabingJishu" disabled /></a-form-item></a-col>
          <a-col :span="3" style="padding: 0 3px 0 0;"><a-form-item name="dabingRate"><a-input v-model:value="dabingPersonDisplay" disabled /></a-form-item></a-col>
          <a-col :span="3" style="padding: 0 3px 0 0;"><a-form-item name="dabingPerson"><a-input v-model:value="outsourceSocialSecurityForm.dabingPerson" disabled /></a-form-item></a-col>
          <a-col :span="3" style="text-align: right;">大病</a-col>
          <a-col :span="3" style="padding: 0 3px 0 0;"><a-form-item name="dabingCompanyJishu"><a-input v-model:value="outsourceSocialSecurityForm.dabingCompanyJishu" disabled /></a-form-item></a-col>
          <a-col :span="3" style="padding: 0 3px 0 0;"><a-form-item name="dabingCompanyRate"><a-input v-model:value="dabingCompanyDisplay" disabled /></a-form-item></a-col>
          <a-col :span="3" style="padding: 0 3px 0 0;"><a-form-item name="dabingCompany"><a-input v-model:value="outsourceSocialSecurityForm.dabingCompany" disabled /></a-form-item></a-col>
        </a-row>
        <a-row :gutter="24" style="height: 28px; line-height: 25px;" v-if="outsourceSocialSecurityForm.shebaoStatus != '1'">
          <a-col :span="3" style="text-align: right;">一金</a-col>
          <a-col :span="3" style="padding: 0 3px 0 0;"><a-form-item name="yijinJishu"><a-input v-model:value="outsourceSocialSecurityForm.yijinJishu" disabled /></a-form-item></a-col>
          <a-col :span="3" style="padding: 0 3px 0 0;"><a-form-item name="yijinRate"><a-input v-model:value="yijinPersonDisplay" disabled /></a-form-item></a-col>
          <a-col :span="3" style="padding: 0 3px 0 0;"><a-form-item name="yijinPerson"><a-input v-model:value="outsourceSocialSecurityForm.yijinPerson" disabled /></a-form-item></a-col>
          <a-col :span="3" style="text-align: right;">一金</a-col>
          <a-col :span="3" style="padding: 0 3px 0 0;"><a-form-item name="yijinCompanyJishu"><a-input v-model:value="outsourceSocialSecurityForm.yijinCompanyJishu" disabled /></a-form-item></a-col>
          <a-col :span="3" style="padding: 0 3px 0 0;"><a-form-item name="yijinCompanyRate"><a-input v-model:value="yijinCompanyDisplay" disabled /></a-form-item></a-col>
          <a-col :span="3" style="padding: 0 3px 0 0;"><a-form-item name="yijinCompany"><a-input v-model:value="outsourceSocialSecurityForm.yijinCompany" disabled /></a-form-item></a-col>
        </a-row>
        <a-row :gutter="24" style="height: 28px; line-height: 25px;" v-if="outsourceSocialSecurityForm.shebaoStatus != '1'">
          <a-col :span="3"></a-col>
          <a-col :span="3" style="padding: 0 3px 0 0;"></a-col>
          <a-col :span="3" style="padding: 0 3px 0 0;"></a-col>
          <a-col :span="3" style="padding: 0 3px 0 0;"></a-col>
          <a-col :span="3" style="text-align: right;">工伤</a-col>
          <a-col :span="3" style="padding: 0 3px 0 0;"><a-form-item name="gongshangJishu"><a-input v-model:value="outsourceSocialSecurityForm.gongshangJishu" disabled /></a-form-item></a-col>
          <a-col :span="3" style="padding: 0 3px 0 0;"><a-form-item name="gongshangCompanyRate"><a-input v-model:value="gongshangCompanyDisplay" disabled /></a-form-item></a-col>
          <a-col :span="3" style="padding: 0 3px 0 0;"><a-form-item name="gongshangCompany"><a-input v-model:value="outsourceSocialSecurityForm.gongshangCompany" disabled /></a-form-item></a-col>
        </a-row>
        <a-row :gutter="24" style="height: 28px; line-height: 25px;" v-if="outsourceSocialSecurityForm.shebaoStatus != '1'">
          <a-col :span="3"></a-col>
          <a-col :span="3" style="padding: 0 3px 0 0;"></a-col>
          <a-col :span="3" style="padding: 0 3px 0 0;"></a-col>
          <a-col :span="3" style="padding: 0 3px 0 0;"></a-col>
          <a-col :span="3" style="text-align: right;">生育</a-col>
          <a-col :span="3" style="padding: 0 3px 0 0;"><a-form-item name="shengyuJishu"><a-input v-model:value="outsourceSocialSecurityForm.shengyuJishu" disabled /></a-form-item></a-col>
          <a-col :span="3" style="padding: 0 3px 0 0;"><a-form-item name="shengyuCompanyRate"><a-input v-model:value="shengyuCompanyDisplay" disabled /></a-form-item></a-col>
          <a-col :span="3" style="padding: 0 3px 0 0;"><a-form-item name="shengyuCompany"><a-input v-model:value="outsourceSocialSecurityForm.shengyuCompany" disabled /></a-form-item></a-col>
        </a-row>
        <a-row :gutter="24" style="height: 28px; line-height: 25px;" v-if="outsourceSocialSecurityForm.shebaoStatus != '1'">
          <a-col :span="3" style="text-align: right;">总计</a-col>
          <a-col :span="3" style="padding: 0 3px 0 0;"></a-col>
          <a-col :span="3" style="padding: 0 3px 0 0;"></a-col>
          <a-col :span="3" style="padding: 0 3px 0 0;"><a-input v-model:value="outsourceSocialSecurityForm.personTotal" disabled /></a-col>
          <a-col :span="3" style="text-align: right;">总计</a-col>
          <a-col :span="3" style="padding: 0 3px 0 0;"></a-col>
          <a-col :span="3" style="padding: 0 3px 0 0;"></a-col>
          <a-col :span="3" style="padding: 0 3px 0 0;"><a-input v-model:value="outsourceSocialSecurityForm.companyTotal" disabled /></a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" style="text-align: end;">
            <a-button type="primary" :loading="iconLoading" html-type="submit">
              保存
            </a-button>
            <a-button style="margin-left: 10px" @click="cancelSocialSecurityFlag">
              取消
            </a-button>
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
import { OutsourceSheBaoItem } from '/@/api/outsourceDetail/model';
import { shebaoCompanyOption,companyJiaoOption } from '/@/api/outsourceDetail/constants';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { outsourceSocialSecurityFlag, outsourceSocialSecurityForm } = storeToRefs(outsourceDetailStore);
const drawerWidth = ref(Math.max(600, window.innerWidth * 0.5));
const labelCol = ref({
  span: 5,
});
const iconLoading = ref(false);

// 存储从API获取的计算数据
const contractRates = ref<any>(null);

// 计算属性 - 个人养老金额
const yanglaoRateDisplay = computed(() => {
  // 将小数转换为百分比格式，保留两位小数
    const rate = outsourceSocialSecurityForm.value.yanglaoRate || 0;
    return rateCalc(rate); 
});
const yanglaoPerson = computed(() => {
  return parseFloat(((outsourceSocialSecurityForm.value?.yanglaoJishu || 0) * (outsourceSocialSecurityForm.value?.yanglaoRate || 0)).toFixed(2));
});

// 计算属性 - 企业养老金额
const yanglaoCompanyDisplay = computed(() => {
  // 将小数转换为百分比格式，保留两位小数
    const rate = outsourceSocialSecurityForm.value.yanglaoCompanyRate || 0;
    return rateCalc(rate);  
});
const yanglaoCompany = computed(() => {
  return parseFloat(((outsourceSocialSecurityForm.value?.yanglaoCompanyJishu || 0) * (outsourceSocialSecurityForm.value?.yanglaoCompanyRate || 0)).toFixed(2));
});

// 计算属性 - 个人失业金额
const shiyePersonDisplay = computed(() => {
  // 将小数转换为百分比格式，保留两位小数
    const rate = outsourceSocialSecurityForm.value.shiyeRate || 0;
    return rateCalc(rate); 
});
const shiyePerson = computed(() => {
  return parseFloat(((outsourceSocialSecurityForm.value?.shiyeJishu || 0) * (outsourceSocialSecurityForm.value?.shiyeRate || 0)).toFixed(2));
});

// 计算属性 - 企业失业金额
const shiyeCompanyDisplay = computed(() => {
  // 将小数转换为百分比格式，保留两位小数
    const rate = outsourceSocialSecurityForm.value.shiyeCompanyRate || 0;
    return rateCalc(rate); 
});
const shiyeCompany = computed(() => {
  return parseFloat(((outsourceSocialSecurityForm.value?.shiyeCompanyJishu || 0) * (outsourceSocialSecurityForm.value?.shiyeCompanyRate || 0)).toFixed(2));
});

// 计算属性 - 个人医疗金额
const yiliaoPersonDisplay = computed(() => {
  // 将小数转换为百分比格式，保留两位小数
    const rate = outsourceSocialSecurityForm.value.yiliaoRate || 0;
    return rateCalc(rate); 
});
const yiliaoPerson = computed(() => {
  return parseFloat(((outsourceSocialSecurityForm.value?.yiliaoJishu || 0) * (outsourceSocialSecurityForm.value?.yiliaoRate || 0)).toFixed(2));
});

// 计算属性 - 企业医疗金额
const yiliaoCompanyDisplay = computed(() => {
  // 将小数转换为百分比格式，保留两位小数
    const rate = outsourceSocialSecurityForm.value.yiliaoCompanyRate || 0;
    return rateCalc(rate); 
});
const yiliaoCompany = computed(() => {
  return parseFloat(((outsourceSocialSecurityForm.value?.yiliaoCompanyJishu || 0) * (outsourceSocialSecurityForm.value?.yiliaoCompanyRate || 0)).toFixed(2));
});

// 计算属性 - 个人大病金额
const dabingPersonDisplay = computed(() => {
  // 将小数转换为百分比格式，保留两位小数
    const rate = outsourceSocialSecurityForm.value.dabingRate || 0;
    if ((outsourceSocialSecurityForm.value?.dabingRate || 0) - 1 < 0) {
      return rateCalc(rate); 
    }
    return rate; 
});
const dabingPerson = computed(() => {
  if ((outsourceSocialSecurityForm.value?.dabingRate || 0) - 1 < 0) {
    return parseFloat(((outsourceSocialSecurityForm.value?.dabingJishu || 0) * (outsourceSocialSecurityForm.value?.dabingRate || 0)).toFixed(2));
  }
  return parseFloat(((outsourceSocialSecurityForm.value?.dabingJishu || 0)).toFixed(2));
});

// 计算属性 - 企业大病金额
const dabingCompanyDisplay = computed(() => {
  // 将小数转换为百分比格式，保留两位小数
    const rate = outsourceSocialSecurityForm.value.dabingCompanyRate || 0;
    if ((outsourceSocialSecurityForm.value?.dabingCompanyRate || 0) - 1 < 0) { 
      return rateCalc(rate); 
    }
    return rate; 
});
const dabingCompany = computed(() => {
  if ((outsourceSocialSecurityForm.value?.dabingCompanyRate || 0) - 1 < 0) {
    return parseFloat(((outsourceSocialSecurityForm.value?.dabingCompanyJishu || 0) * (outsourceSocialSecurityForm.value?.dabingCompanyRate || 0)).toFixed(2));
  }
  return parseFloat(((outsourceSocialSecurityForm.value?.dabingCompanyJishu || 0)).toFixed(2));
});

// 计算属性 - 个人一金金额
const yijinPersonDisplay = computed(() => {
  // 将小数转换为百分比格式，保留两位小数
    const rate = outsourceSocialSecurityForm.value.yijinRate || 0;
    return rateCalc(rate);  
});
const yijinPerson = computed(() => {
  if (outsourceSocialSecurityForm.value?.shebaoCity == '苏州') {
    return parseFloat(((outsourceSocialSecurityForm.value?.yijinJishu || 0) * (outsourceSocialSecurityForm.value?.yijinRate || 0)).toFixed(2));
  }
  return parseFloat(((outsourceSocialSecurityForm.value?.yijinJishu || 0) * (outsourceSocialSecurityForm.value?.yijinRate || 0)).toFixed(0));
});

// 计算属性 - 企业一金金额
const yijinCompanyDisplay = computed(() => {
  // 将小数转换为百分比格式，保留两位小数
    const rate = outsourceSocialSecurityForm.value.yijinCompanyRate || 0;
    return rateCalc(rate);  
});
const yijinCompany = computed(() => {
  if (outsourceSocialSecurityForm.value?.shebaoCity == '苏州') {
    return parseFloat(((outsourceSocialSecurityForm.value?.yijinCompanyJishu || 0) * (outsourceSocialSecurityForm.value?.yijinCompanyRate || 0)).toFixed(2));
  }
  return parseFloat(((outsourceSocialSecurityForm.value?.yijinCompanyJishu || 0) * (outsourceSocialSecurityForm.value?.yijinCompanyRate || 0)).toFixed(0));
});

// 计算属性 - 企业工伤金额
const gongshangCompanyDisplay = computed(() => {
  // 将小数转换为百分比格式，保留两位小数
    const rate = outsourceSocialSecurityForm.value.gongshangCompanyRate || 0;
    return rateCalc(rate);  
});
const gongshangCompany = computed(() => {
  return parseFloat(((outsourceSocialSecurityForm.value?.gongshangJishu || 0) * (outsourceSocialSecurityForm.value?.gongshangCompanyRate || 0)).toFixed(2));
});

// 计算属性 - 企业生育金额
const shengyuCompanyDisplay = computed(() => {
  // 将小数转换为百分比格式，保留两位小数
    const rate = outsourceSocialSecurityForm.value.shengyuCompanyRate || 0;
    return rateCalc(rate); 
});
const shengyuCompany = computed(() => {
  return parseFloat(((outsourceSocialSecurityForm.value?.shengyuJishu || 0) * (outsourceSocialSecurityForm.value?.shengyuCompanyRate || 0)).toFixed(2));
});
const rateCalc = (val) => {
  return parseFloat((val * 100).toFixed(3)) + '%';
}
// 计算属性 - 个人总计
const personTotal = computed(() => {
  return parseFloat((yanglaoPerson.value + shiyePerson.value + yiliaoPerson.value + dabingPerson.value + yijinPerson.value).toFixed(2));
});

// 计算属性 - 企业总计
const companyTotal = computed(() => {
  return parseFloat((yanglaoCompany.value + shiyeCompany.value + yiliaoCompany.value + dabingCompany.value + yijinPerson.value + shengyuCompany.value + gongshangCompany.value).toFixed(2));
});

// 选项数据...（保持不变）
const currentStatusOption = ref([
  { label: '无需缴纳', value: '1' },
  { label: '正常缴纳-待缴', value: '2' },
  { label: '正常缴纳-已缴', value: '3' },
  { label: '停止缴纳-待停', value: '4' },
  { label: '停止缴纳-已停', value: '5' },
]);

const shebaoStandardOption = ref([
  { label: '最低基数', value: '1' },
  { label: '基本工资', value: '2' },
  { label: '特殊基数', value: '3' }
]);

const shangbaoStatusOption = ref([
  { label: '不缴', value: '1' },
  { label: '缴纳', value: '2' },
]);

const handleChangeShebaoStatus = () => {
  outsourceSocialSecurityForm.value.yijinStatus = outsourceSocialSecurityForm.value.shebaoStatus;
  outsourceSocialSecurityForm.value.yijinStandard = outsourceSocialSecurityForm.value.shebaoStandard;
  if ((outsourceSocialSecurityForm.value.shebaoStatus == '2' || outsourceSocialSecurityForm.value.shebaoStatus == '3')) {
    outsourceDetailStore.queryOutsourceShebaoContractRates().then(res => {
      if (res.code == 1 && res.info.length > 0) {
        // 只存储原始数据，不直接计算
        contractRates.value = res.info;
        const p = res.info[0];
        outsourceSocialSecurityForm.value.shebaoCompany = companyJiaoOption.find(item => item.value === p.companyJiao)?.label || '';
        outsourceSocialSecurityForm.value.yijinJiaoCompany = companyJiaoOption.find(item => item.value === p.companyJiao)?.label || '';
        handleChangeShebaoCalc(p);
      }
    });
  }
  if (outsourceSocialSecurityForm.value.shebaoStatus == '1') {
    outsourceSocialSecurityForm.value = {yijinStatus:'1',shebaoStatus: '1', shebaoCity: outsourceSocialSecurityForm.value.shebaoCity, personId: outsourceSocialSecurityForm.value.personId} as OutsourceSheBaoItem
  }
}
const handleChangeShebaoCalc = (p) => {
  outsourceSocialSecurityForm.value.serviceMoney = p.handingFee;
       // 设置基础数据
        outsourceSocialSecurityForm.value.shebaoZuidiJishu = p.shebaoBase;
        outsourceSocialSecurityForm.value.shebaoShijiJishu = p.shebaoBase;
        outsourceSocialSecurityForm.value.yijinZuidiJishu = p.yijinBase;
        outsourceSocialSecurityForm.value.yijinShijiJishu = p.yijinBase;

        // 设置基数和比例
        outsourceSocialSecurityForm.value.yanglaoJishu = p.personYanglaoBase;
        outsourceSocialSecurityForm.value.yanglaoRate = p.personYanglaoRate;
        outsourceSocialSecurityForm.value.yanglaoCompanyJishu = p.companyYanglaoBase;
        outsourceSocialSecurityForm.value.yanglaoCompanyRate = p.companyYanglaoRate;
        
        outsourceSocialSecurityForm.value.shiyeJishu = p.personShiyeBase;
        outsourceSocialSecurityForm.value.shiyeRate = p.personShiyeRate;
        outsourceSocialSecurityForm.value.shiyeCompanyJishu = p.companyShiyeBase;
        outsourceSocialSecurityForm.value.shiyeCompanyRate = p.companyShiyeRate;
        
        outsourceSocialSecurityForm.value.yiliaoJishu = p.personYiliaoBase;
        outsourceSocialSecurityForm.value.yiliaoRate = p.personYiliaoRate;
        outsourceSocialSecurityForm.value.yiliaoCompanyJishu = p.companyYiliaoBase;
        outsourceSocialSecurityForm.value.yiliaoCompanyRate = p.companyYiliaoRate;
        if (p.personDabingRate - 1 < 0) {
          outsourceSocialSecurityForm.value.dabingJishu = p.personDabingBase;
          outsourceSocialSecurityForm.value.dabingRate = p.personDabingRate;
        } else {
          outsourceSocialSecurityForm.value.dabingJishu = p.personDabingRate;
          outsourceSocialSecurityForm.value.dabingRate = p.personDabingRate;
        }
        if (p.companyDabingRate - 1 < 0) {
          outsourceSocialSecurityForm.value.dabingCompanyJishu = p.companyDabingBase;
          outsourceSocialSecurityForm.value.dabingCompanyRate = p.companyDabingRate;
        } else {
          outsourceSocialSecurityForm.value.dabingCompanyJishu = p.companyDabingRate;
          outsourceSocialSecurityForm.value.dabingCompanyRate = p.companyDabingRate;
        }
        
        outsourceSocialSecurityForm.value.yijinJishu = p.personYijinBase;
        outsourceSocialSecurityForm.value.yijinRate = p.personYijinRate;
        outsourceSocialSecurityForm.value.yijinCompanyJishu = p.companyYijinBase;
        outsourceSocialSecurityForm.value.yijinCompanyRate = p.companyYijinRate;
        
        outsourceSocialSecurityForm.value.gongshangJishu = p.companyGongshangBase;
        outsourceSocialSecurityForm.value.gongshangCompanyRate = p.companyGongshangRate;
        outsourceSocialSecurityForm.value.shengyuJishu = p.companyShengyuBase;
        outsourceSocialSecurityForm.value.shengyuCompanyRate = p.companyShengyuRate;

        // 通过计算属性设置金额
        outsourceSocialSecurityForm.value.yanglaoPerson = yanglaoPerson.value;
        outsourceSocialSecurityForm.value.yanglaoCompany = yanglaoCompany.value;
        outsourceSocialSecurityForm.value.shiyePerson = shiyePerson.value;
        outsourceSocialSecurityForm.value.shiyeCompany = shiyeCompany.value;
        outsourceSocialSecurityForm.value.yiliaoPerson = yiliaoPerson.value;
        outsourceSocialSecurityForm.value.yiliaoCompany = yiliaoCompany.value;
        outsourceSocialSecurityForm.value.dabingPerson = dabingPerson.value;
        outsourceSocialSecurityForm.value.dabingCompany = dabingCompany.value;
        outsourceSocialSecurityForm.value.yijinPerson = yijinPerson.value;
        outsourceSocialSecurityForm.value.yijinCompany = yijinCompany.value;
        outsourceSocialSecurityForm.value.gongshangCompany = gongshangCompany.value;
        outsourceSocialSecurityForm.value.shengyuCompany = shengyuCompany.value;
        outsourceSocialSecurityForm.value.personTotal = personTotal.value;
        outsourceSocialSecurityForm.value.companyTotal = companyTotal.value;
}
const handleChangeShebaoShijiJishu = () => {
  outsourceSocialSecurityForm.value.yanglaoJishu = outsourceSocialSecurityForm.value.shebaoShijiJishu;
  outsourceSocialSecurityForm.value.shiyeJishu = outsourceSocialSecurityForm.value.shebaoShijiJishu;
  outsourceSocialSecurityForm.value.yiliaoJishu = outsourceSocialSecurityForm.value.shebaoShijiJishu;
  outsourceSocialSecurityForm.value.dabingJishu = outsourceSocialSecurityForm.value.shebaoShijiJishu;
  //outsourceSocialSecurityForm.value.yijinJishu = outsourceSocialSecurityForm.value.shebaoShijiJishu;
  outsourceSocialSecurityForm.value.yanglaoCompanyJishu = outsourceSocialSecurityForm.value.shebaoShijiJishu;
  outsourceSocialSecurityForm.value.shiyeCompanyJishu = outsourceSocialSecurityForm.value.shebaoShijiJishu;
  outsourceSocialSecurityForm.value.yiliaoCompanyJishu = outsourceSocialSecurityForm.value.shebaoShijiJishu;
  outsourceSocialSecurityForm.value.dabingCompanyJishu = outsourceSocialSecurityForm.value.shebaoShijiJishu;
  outsourceSocialSecurityForm.value.gongshangJishu = outsourceSocialSecurityForm.value.shebaoShijiJishu;
  outsourceSocialSecurityForm.value.shengyuJishu = outsourceSocialSecurityForm.value.shebaoShijiJishu;

  outsourceSocialSecurityForm.value.yanglaoPerson = yanglaoPerson.value;
  outsourceSocialSecurityForm.value.yanglaoCompany = yanglaoCompany.value;
  outsourceSocialSecurityForm.value.shiyePerson = shiyePerson.value;
  outsourceSocialSecurityForm.value.shiyeCompany = shiyeCompany.value;
  outsourceSocialSecurityForm.value.yiliaoPerson = yiliaoPerson.value;
  outsourceSocialSecurityForm.value.yiliaoCompany = yiliaoCompany.value;
  outsourceSocialSecurityForm.value.dabingPerson = dabingPerson.value;
  outsourceSocialSecurityForm.value.dabingCompany = dabingCompany.value;
  //outsourceSocialSecurityForm.value.yijinPerson = yijinPerson.value;
  //outsourceSocialSecurityForm.value.yijinCompany = yijinCompany.value;
  outsourceSocialSecurityForm.value.gongshangCompany = gongshangCompany.value;
  outsourceSocialSecurityForm.value.shengyuCompany = shengyuCompany.value;
  outsourceSocialSecurityForm.value.personTotal = personTotal.value;
  outsourceSocialSecurityForm.value.companyTotal = companyTotal.value;
}
const handleChangeYijinShijiJishu = () => {
  outsourceSocialSecurityForm.value.yijinJishu = outsourceSocialSecurityForm.value.yijinShijiJishu;
  outsourceSocialSecurityForm.value.yijinCompanyJishu = outsourceSocialSecurityForm.value.yijinShijiJishu;
  outsourceSocialSecurityForm.value.yijinPerson = yijinPerson.value;
  outsourceSocialSecurityForm.value.yijinCompany = yijinCompany.value;

  outsourceSocialSecurityForm.value.personTotal = personTotal.value;
  outsourceSocialSecurityForm.value.companyTotal = companyTotal.value;
}
const handleCompanyNameOption = () => {
  outsourceSocialSecurityForm.value.yijinJiaoCompany = outsourceSocialSecurityForm.value.shebaoCompany;
  const p = contractRates.value.find(item => item.companyJiao === companyJiaoOption.find(item => item.label === outsourceSocialSecurityForm.value.shebaoCompany)?.value);
  if (p) {
    handleChangeShebaoCalc(p);
  }
  
}

const handleSubmit = () => {
  iconLoading.value = true;
  outsourceDetailStore.addOutsourceSocialSecurityByPerson().then(res => {
    if (res.code == 1) {
      message.success('操作成功');
      outsourceSocialSecurityFlag.value = false;
      outsourceSocialSecurityForm.value = {} as OutsourceSheBaoItem;
      iconLoading.value = false;
    } else {
      message.error('操作失败');
      iconLoading.value = false;
    }
  });
}

const cancelSocialSecurityFlag = () => {
  outsourceSocialSecurityFlag.value = false;
  outsourceSocialSecurityForm.value = {} as OutsourceSheBaoItem;
}
</script>

<style lang="less" scoped>

</style>