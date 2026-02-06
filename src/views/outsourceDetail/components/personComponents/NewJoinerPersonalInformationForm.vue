<template>
 <a-drawer
    v-model:open="newJoinerPersonalInformationFlag"
    title=" "
    :maskClosable="false"
    :keyboard="false"
    :closable="false"
    :width="drawerWidth"
    :bodyStyle="{ padding: '4px 14px' }"
    :headerStyle="{ padding: '5px 18px 5px 12px' }"
    placement="right"
  >
    <template #extra>
      <CloseOutlined @click="closeDrawer" />
    </template>
    <div id="personalInfoFormInfo" v-show="isShow">
      <a-row :gutter="24">
        <a-col :span="24" class='personalInfoHeader'>
          New Joiner Personal Information Form
        </a-col>
      </a-row>
      <a-row :gutter="24" style="border-bottom: unset;">
        <a-col :span="24" class='personalInfoHeader'>
          新员工个人信息登记表
        </a-col>
      </a-row>
      <!-- <a-row :gutter="24" class="personalInfoThreeBottomBorder">
        <a-col :span="4" style="max-width: 14%;">
          Department 部门:
        </a-col>
         <a-col :span="20" style="padding-left: 0;">
          <input v-model="newJoinerPersonalInformationForm.department" name="department" placeholder="请输入部门" class="no-border-input"/>
        </a-col>
      </a-row> -->

      <a-row :gutter="24" class="personalInfoBasicHeader">
        <a-col :span="24">
          Basic Information
        </a-col>
      </a-row>
      <a-row :gutter="24" class="personalInfoBasicHeader">
        <a-col :span="24">
          员工基本情况
        </a-col>
      </a-row>

      <a-row :gutter="24">
        <a-col :span="4" class="personalInfoThreeBottomBorder">
          Name<br/>
          姓名
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder">
          <input v-model="newJoinerPersonalInformationForm.userNameCn" name="userName" placeholder="请输入姓名" class="no-border-input"/>
        </a-col>
        <a-col :span="3" class="personalInfoTwoBorder">
          ID<br/>
          身份证号码
        </a-col>
        <a-col :span="4" class="personalInfoContent personalInfoTwoBorder">
          <input v-model="newJoinerPersonalInformationForm.idCard" name="idCard" placeholder="请输入身份证号码" class="no-border-input"/>
        </a-col>
         <a-col :span="4" class="personalInfoTwoBorder">
          Gender<br/>
          性别
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder">
          <input v-model="newJoinerPersonalInformationForm.sex" name="sex" placeholder="请输入性别" class="no-border-input"/>
        </a-col>
        <a-col :span="3" class="personalInfoRightBorder personalInfoPhotoCol">
          <img :src="headPhotoDataUrl || newJoinerPersonalInformationForm.headPhoto" crossorigin="anonymous" class="personalInfoPhoto" />
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="4" class="personalInfoThreeBottomBorder">
          English Name<br/>
          英文名
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder">
          <input v-model="newJoinerPersonalInformationForm.userNameEn" name="userNameEn" placeholder="请输入英文名" class="no-border-input"/>
        </a-col>
        <a-col :span="3" class="personalInfoTwoBorder">
          Place of Birth<br/>
          国籍
        </a-col>
        <a-col :span="4" class="personalInfoContent personalInfoTwoBorder">
          <input v-model="newJoinerPersonalInformationForm.placeOfBirth" name="placeOfBirth" placeholder="请输入出生地" class="no-border-input"/>
        </a-col>
         <a-col :span="4" class="personalInfoTwoBorder">
          Ethnic<br/>
          民族
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder">
          <a-select v-model:value="newJoinerPersonalInformationForm.ethnic" name="ethnic" :options="ethnicOptions" placeholder="请输入民族" style="width: 100%;"></a-select>
        </a-col>
        <a-col :span="3" class="personalInfoRightBorder"></a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="4" class="personalInfoThreeBottomBorder">
          Mobile<br/>
          手机号码
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder">
          <input v-model="newJoinerPersonalInformationForm.phoneNumber" name="phoneNumber" placeholder="请输入手机号码" class="no-border-input"/>
        </a-col>
        <a-col :span="3" class="personalInfoTwoBorder">
          E-mail<br/>
          邮箱地址
        </a-col>
        <a-col :span="4" class="personalInfoContent personalInfoTwoBorder">
          <input v-model="newJoinerPersonalInformationForm.email" name="email" placeholder="请输入邮箱地址" class="no-border-input"/>
        </a-col>
         <a-col :span="4" class="personalInfoTwoBorder">
          Politics Status<br/>
          政治面貌
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder">
          <a-select v-model:value="newJoinerPersonalInformationForm.politicsStatus" name="politicsStatus" :options="politicsStatusOptions" placeholder="请输入政治面貌" style="width: 100%;"></a-select>
        </a-col>
        <a-col :span="3" class="personalInfoRightBorder"></a-col>
      </a-row>
       <a-row :gutter="24">
        <a-col :span="4" class="personalInfoThreeBottomBorder">
          Highest Standard <br/>Attained 最高学历
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder">
          <input v-model="newJoinerPersonalInformationForm.highestStandard" name="highestStandard" placeholder="请输入最高学历" class="no-border-input"/>
        </a-col>
        <a-col :span="3" class="personalInfoTwoBorder">
          Martial Status<br/>
          婚姻状况
        </a-col>
        <a-col :span="4" class="personalInfoContent personalInfoTwoBorder">
          <input v-model="newJoinerPersonalInformationForm.martialStatus" name="martialStatus" placeholder="请输入婚姻状况" class="no-border-input"/>
        </a-col>
         <a-col :span="4" class="personalInfoTwoBorder">
          Health Condition<br/>
          健康状况
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder">
          <a-select v-model:value="newJoinerPersonalInformationForm.healthCondition" name="healthCondition" :options="healthConditionOptions" placeholder="请输入健康状况" style="width: 100%;"></a-select>
        </a-col>
        <a-col :span="3" class="personalInfoTwoBorder"></a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="4" class="personalInfoThreeBottomBorder">
          Place of Domicile<br/>
          户籍地
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder">
          <input v-model="newJoinerPersonalInformationForm.placeOfDomicile" name="placeOfDomicile" placeholder="请输入户籍地" class="no-border-input"/>
        </a-col>
        <a-col :span="3" class="personalInfoTwoBorder">
          Census Register<br/>
          户口类型
        </a-col>
        <a-col :span="4" class="personalInfoContent personalInfoTwoBorder">
          <a-select v-model:value="newJoinerPersonalInformationForm.censusRegister" name="censusRegister" :options="censusRegisterOptions" placeholder="请输入户口类型" style="width: 100%;"></a-select>
        </a-col>                       
         <a-col :span="4" class="personalInfoTwoBorder">
          If has a criminal record<br/>
          是否有过犯罪记录
        </a-col>
        <a-col :span="6" class="personalInfoContent personalInfoTwoBorder">
          <input v-model="newJoinerPersonalInformationForm.criminalRecord" name="criminalRecord" placeholder="请输入是否有过犯罪记录" class="no-border-input"/>
        </a-col>
        <!-- <a-col :span="3" class="personalInfoTwoBorder"></a-col> -->
      </a-row>
      <a-row :gutter="24">
        <a-col :span="4" class="personalInfoThreeBottomBorder" style="display: flex;align-items: center;">
          Emergency Contact<br/>
          紧急联络人
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder">
          <input v-model="newJoinerPersonalInformationForm.emergencyContact" name="emergencyContact" placeholder="请输入紧急联络人" class="no-border-input"/>
        </a-col>
        <a-col :span="4" class="personalInfoTwoBorder" style="display: flex;align-items: center;">
          Emergency Contact No.<br/>
          紧急联络人联系方式
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder">
          <input v-model="newJoinerPersonalInformationForm.emergencyMobile" name="emergencyMobile" placeholder="请输入紧急联络人联系方式" class="no-border-input"/>
        </a-col>                       
         <a-col :span="4" class="personalInfoTwoBorder" style="display: flex;align-items: center;">
          Relationship with the emergency contact<br/>
          与紧急联系人的关系
        </a-col>
        <a-col :span="6" class="personalInfoContent personalInfoTwoBorder">
          <input v-model="newJoinerPersonalInformationForm.emergencyRelationshiip" name="emergencyRelationshiip" placeholder="请输入与紧急联系人的关系" class="no-border-input"/>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="11" class="personalInfoThreeBottomBorder" style="display: flex;align-items: center;">
          Whether to be dismissed from the previous company<br/>
          是否被前单位除名/辞退
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder">
          <input v-model="newJoinerPersonalInformationForm.isDismissed" name="isDismissed" placeholder="请输入是否被前单位除名/辞退" class="no-border-input"/>
        </a-col>
        <a-col :span="4" class="personalInfoTwoBorder">
          If YES, please list the reason<br/>
          如选是请告知原因
        </a-col>
        <a-col :span="6" class="personalInfoContent personalInfoTwoBorder">
          <input v-model="newJoinerPersonalInformationForm.dismissedReason" name="dismissedReason" class="no-border-input"/>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="11" class="personalInfoThreeBottomBorder">
          Did you sign a non-compete agreement with your previous employer<br/>
          是否与前工作单位签署竞业限制协议
        </a-col>
        <a-col :span="13" class="personalInfoContent personalInfoTwoBorder">
          <input v-model="newJoinerPersonalInformationForm.isNonCompete" name="isNonCompete" placeholder="请输入是否与前工作单位签署竞业限制协议" class="no-border-input"/>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="4" class="personalInfoThreeBottomBorder">
          Address in Document<br/>
          户籍/身份证地址
        </a-col>
        <a-col :span="20" class="personalInfoContent personalInfoTwoBorder">
          <input v-model="newJoinerPersonalInformationForm.documentAddress" name="documentAddress" placeholder="请输入户籍/身份证地址" class="no-border-input"/>
        </a-col>
      </a-row>
       <a-row :gutter="24">
        <a-col :span="4" class="personalInfoThreeBottomBorder">
          Current Living Address<br/>
          本市联系/居住地址
        </a-col>
        <a-col :span="20" class="personalInfoContent personalInfoTwoBorder">
          <input v-model="newJoinerPersonalInformationForm.livingAddress" name="livingAddress" placeholder="请输入本市联系/居住地址" class="no-border-input"/>
        </a-col>
      </a-row>

      <a-row :gutter="24" class="personalInfoBasicHeader">
        <a-col :span="24">
          Work Experience
        </a-col>
      </a-row>
      <a-row :gutter="24" class="personalInfoBasicHeader">
        <a-col :span="24">
          工作经历（从最近服务单位倒叙至以前单位的方式填写）
        </a-col>
      </a-row>

       <a-row :gutter="24">
        <a-col :span="4" class="personalInfoThreeBottomBorder personalInfoCenter">
          Start/End Date<br/>
          起止年月
        </a-col>
        <a-col :span="7" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          Company Name<br/>
          公司名称
        </a-col>
        <a-col :span="7" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          Position<br/>
          担任职务
        </a-col>
        <a-col :span="6" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          Demission Reason<br/>
          离职原因
        </a-col>
      </a-row>
      <a-row :gutter="24" v-for="(item, index) in newJoinerPersonalInformationForm.offerOutsourceWorks" :key="index">
        <a-col :span="4" class="personalInfoThreeBottomBorder personalInfoCenter">
          {{ item.startDate }} - {{ item.endDate == '-1' ? '至今' : item.endDate }}
        </a-col>
        <a-col :span="7" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          {{ item.companyName }}
        </a-col>
        <a-col :span="7" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          {{ item.position }}
        </a-col>
        <a-col :span="6" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          <input v-model="item.demissionReason" name="demissionReason" placeholder="请输入离职原因" class="no-border-input"/>
        </a-col>
      </a-row>

      <a-row v-if="newJoinerPersonalInformationForm.jobType == '全职'" :gutter="24" class="personalInfoBasicHeader">
        <a-col :span="24">
          Family Situation and Major Social Relations
        </a-col>
      </a-row>
      <a-row v-if="newJoinerPersonalInformationForm.jobType == '全职'" :gutter="24" class="personalInfoBasicHeader">
        <a-col :span="24">
          家庭情况及主要社会关系(至少填写一位)
        </a-col>
      </a-row>

      <a-row v-if="newJoinerPersonalInformationForm.jobType == '全职'" :gutter="24">
        <a-col :span="4" class="personalInfoContent personalInfoThreeBottomBorder personalInfoCenter">
          Relationship<br/>
          称谓
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          Name<br/>
          姓名
        </a-col>
        <a-col :span="2" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          Age<br/>
          年龄
        </a-col>
        <a-col :span="8" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          Company Name<br/>
          工作单位
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          Position<br/>
          职位/职务
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          Contact No.<br/>
          联系方式
        </a-col>
        <a-col :span="1" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          <PlusOutlined style="cursor: pointer;" @click="addFamilyMember()"/>
        </a-col>
      </a-row>
      <a-row v-if="newJoinerPersonalInformationForm.jobType == '全职'"  :gutter="24" v-for="(item, index) in newJoinerPersonalInformationForm.offerOutsourceFamilies" :key="index">
        <a-col :span="4" class="personalInfoThreeBottomBorder personalInfoCenter">
          <a-select v-model:value="item.relationship" name="relationship" style="width: 100%;">
            <a-select-option value="Father 父亲">Father 父亲</a-select-option>
            <a-select-option value="Mother 母亲">Mother 母亲</a-select-option>
            <a-select-option value="Spouse 配偶">Spouse 配偶</a-select-option>
          </a-select>
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          <input v-model="item.name" name="name" placeholder="请输入姓名" class="no-border-input"/>
        </a-col>
        <a-col :span="2" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          <input v-model="item.age" name="age" placeholder="请输入年龄" class="no-border-input"/>
        </a-col>
        <a-col :span="8" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          <input v-model="item.companyName" name="companyName" placeholder="请输入工作单位" class="no-border-input"/>
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          <input v-model="item.position" name="position" placeholder="请输入职位/职务" class="no-border-input"/>
        </a-col>
        <a-col :span="4" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          <input v-model="item.mobile" name="mobile" placeholder="请输入联系方式" class="no-border-input"/>
        </a-col>
      </a-row>
       <a-row :gutter="24">
        <a-col :span="24" class="personalInfoThreeBottomBorder personalInfoCenter" style="text-align: left;">
          I hereby authorize U-Talent, ltd and its all subsidiaries or third parties to investigate the relevant information that I have provided in connection with my form for background check is true and complete. Any falsification of information (or any omission of relevant information)of any fact resulted in disqualified for the position, I am willing to assume all the related responsibility. and I waive all claims against such organizations and/or persons for legal liabilities which may occur during the disclosure.
<br/>本人特此授权本人授权{{offerInformationForm.offerSignCompany}}及其所有关联公司或第三方对我在本表中提供的相关信息进行调查，确认其真实完整。如果有任何虚假信息（或有关事实的遗漏）导致我不能担任该职位，本人愿意承担相关责任。本人放弃对上述组织和/或个人产生的披露过程中可能出现的法律责任提出的任何索赔。以上信息如有变更，本人将在第一时间告知人力资源部，如有违反，一切后果由本人承担。本人已阅读公司管理制度及部门相关制度，并严格遵守执行。此登记表作为劳动合同附件，与劳动合同具有同等法律效力。
        </a-col>
      </a-row>
      <a-row :gutter="24" class="personalInfoThreeBottomBorder">
       <a-col :span="2" style="font-weight: bold;">Signature<br/>签名：</a-col>
       <a-col :span="10"></a-col>
        <a-col :span="3" style="font-weight: bold;">Date of Filling<br/>填表日期：</a-col>
       <a-col :span="9"></a-col>
      </a-row>
      <!-- OFFER文件相关 -->
      <a-row :gutter="24" style="margin-top: 24px;">
        <a-col :span="24" class="personalInfoHeader">
          OFFER文件相关
        </a-col>
      </a-row>
      <a-row :gutter="24" style="margin-top: 12px;">
        <a-col :span="12">
          <a-form-item label="姓名" :label-col="labelCol">
            <a-input v-model:value="displayName" disabled/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="证件号码" :label-col="labelCol">
            <a-input v-model:value="newJoinerPersonalInformationForm.idCard" disabled/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24" style="margin-top: 12px;">
        <a-col :span="12">
          <a-form-item label="工作地点" :label-col="labelCol">
            <a-input v-model:value="newJoinerPersonalInformationForm.city" disabled/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="职位" :label-col="labelCol">
            <a-input v-model:value="newJoinerPersonalInformationForm.position" disabled/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24" style="margin-top: 12px;">
        <a-col :span="12">
          <a-form-item label="性质" :label-col="labelCol" :rules="[{ required: true, message: '请选择性质' }]">
            <a-select v-model:value="newJoinerPersonalInformationForm.jobType" name="jobType" :options="jobTypeOptions" placeholder="请选择性质"></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="OFFER发起" :label-col="labelCol" :rules="[{ required: true, message: '请选择OFFER发起' }]">
            <a-select v-model:value="jobTypeOffer" name="jobTypeOffer" :options="jobTypeOfferOptions" placeholder="请选择OFFER发起"></a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24" style="margin-top: 12px;">
        <a-col :span="12"  v-if="jobTypeOffer=='1'">
          <a-form-item label="OFFER类型" :label-col="labelCol" :rules="[{ required: true, message: '请选择OFFER类型' }]">
            <a-select v-model:value="offerInformationForm.offerType" name="offerType" :options="offerTypeOptions" placeholder="请选择OFFER类型"></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="签署公司" :label-col="labelCol" :rules="[{ required: true, message: '请选择签署公司' }]">
            <a-select v-model:value="offerInformationForm.offerSignCompany" name="offerSignCompany" :options="offerSignCompanyOptions" placeholder="请选择签署公司"></a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <div v-if="offerInformationForm.offerType == '全职实习合同' && jobTypeOffer=='1'">
      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-item label="实习开始" :label-col="labelCol" :rules="[{ required: true, message: '请选择实习开始' }]">
            <a-date-picker
                v-model:value="offerInformationForm.startTime"
                @change="handleStartTimeChange"
                value-format="YYYY-MM-DD"
                placeholder="请选择实习开始"
              />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="实习结束" :label-col="labelCol" :rules="[{ required: true, message: '请选择实习结束' }]">
            <a-date-picker
                v-model:value="offerInformationForm.endTime"
                value-format="YYYY-MM-DD"
                placeholder="请选择实习结束"
              />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-item label="基本薪资" :label-col="labelCol" :rules="[{ required: true, message: '请输入基本薪资' }]">
            <a-input-number v-model:value="offerInformationForm.basicSalary" name="basicSalary" placeholder="请输入基本薪资" style="width: 100%;"/>
          </a-form-item>
        </a-col>
       <a-col :span="12">
          <a-form-item label="补助津贴" :label-col="labelCol" :rules="[{ required: true, message: '请输入补助津贴' }]">
            <a-input-number v-model:value="offerInformationForm.allowance" name="allowance" placeholder="请输入补助津贴" style="width: 100%;"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-item label="签署截止" :label-col="labelCol" :rules="[{ required: true, message: '请选择签署截止' }]">
            <a-date-picker
                v-model:value="offerInformationForm.signingDeadline"
                value-format="YYYY-MM-DD"
                placeholder="请选择签署截止"
              />
          </a-form-item>
        </a-col>
      </a-row>
     </div>
     <div v-if="offerInformationForm.offerType == '全职劳动合同' && jobTypeOffer=='1'">
      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-item label="开始时间" :label-col="labelCol" :rules="[{ required: true, message: '请选择开始时间' }]">
            <a-date-picker
                v-model:value="offerInformationForm.startTime"
                @change="handleStartTimeChange"
                value-format="YYYY-MM-DD"
                placeholder="请选择开始时间"
              />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="结束时间" :label-col="labelCol" :rules="[{ required: true, message: '请选择结束时间' }]">
            <a-date-picker
                v-model:value="offerInformationForm.endTime"
                value-format="YYYY-MM-DD"
                placeholder="请选择结束时间"
              />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-item label="基本薪资" :label-col="labelCol" :rules="[{ required: true, message: '请输入基本薪资' }]">
            <a-input-number v-model:value="offerInformationForm.basicSalary" name="basicSalary" placeholder="请输入基本薪资" style="width: 100%;"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item :label-col="labelCol" label="试用薪资" :rules="[{ required: true, message: '请输入试用薪资' }]">
            <a-input-number v-model:value="offerInformationForm.basicSalaryAfterRate" name="basicSalaryAfterRate" placeholder="请输入试用薪资" style="width: 100%;"/>
          </a-form-item>
        </a-col>
        </a-row>
      
        <a-row :gutter="24">
          <a-col :span="12">
          <a-form-item :label-col="labelCol" label="补助津贴" :rules="[{ required: true, message: '请输入补助津贴' }]">
            <a-input-number v-model:value="offerInformationForm.allowance" name="allowance" placeholder="请输入补助津贴" style="width: 100%;"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="签署截止" :label-col="labelCol" :rules="[{ required: true, message: '请选择签署截止' }]">
            <a-date-picker
                v-model:value="offerInformationForm.signingDeadline"
                value-format="YYYY-MM-DD"
                placeholder="请选择签署截止"
              />
          </a-form-item>
        </a-col>
      </a-row>
     </div>
     <div v-if="offerInformationForm.offerType == '兼职合同' && jobTypeOffer=='1'">
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item label="基本薪资" :label-col="{ span: 8 }" :rules="[{ required: true, message: '请输入基本薪资' }]">
            <a-input v-model:value="jianzhiSalary" @change="handleJianzhiSalaryChange"/>
          </a-form-item>
        </a-col>
        <a-col :span="4">
          <a-form-item>
            <a-select v-model:value="jianzhiUnit"  @change="handleJianzhiSalaryChange">
              <a-select-option value="元/小时">元/小时</a-select-option>
              <a-select-option value="元/天">元/天</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="发薪日" :label-col="labelCol" :rules="[{ required: true, message: '请选择发薪日' }]">
            <a-select v-model:value="offerInformationForm.faXinDay" name="faXinDay" :options="faXinDayOptions" placeholder="请选择发薪日"></a-select>
          </a-form-item>
        </a-col>
        </a-row>
      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-item label="合同开始" :label-col="labelCol" :rules="[{ required: true, message: '请选择合同开始' }]">
            <a-date-picker
                v-model:value="offerInformationForm.startTime"
                @change="handleStartTimeChange"
                value-format="YYYY-MM-DD"
                placeholder="请选择合同开始"
              />
          </a-form-item>
        </a-col>
       <a-col :span="12">
          <a-form-item label="签署截止" :label-col="labelCol" :rules="[{ required: true, message: '请选择签署截止' }]">
            <a-date-picker
                v-model:value="offerInformationForm.signingDeadline"
                value-format="YYYY-MM-DD"
                placeholder="请选择签署截止"
              />
          </a-form-item>
        </a-col>
      </a-row>
     </div>
    </div>
    <div id="personalInfoForm" v-show="!isShow">
      <div v-if="offerInformationForm.offerType == '全职实习合同'">
        <a-row :gutter="24">
          <a-col :span="24" class="offerHeader offerContentMargin">
            <img src="/u-talent-logo.png" alt="U-TALENT" style="height: 30px;" />
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerOne">
            机密文件
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            【{{ displayName }}】（有效证件号码：【{{ newJoinerPersonalInformationForm.idCard }}】）
          </a-col>
        </a-row>
        <a-row :gutter="24" style="margin-top: 15px;">
          <a-col :span="24" class="offerContent offerTitle">
            录用函
          </a-col>
        </a-row>
        <a-row :gutter="24" style="margin-top: 15px;">
          <a-col :span="24" class="offerContent">
            {{offerInformationForm.offerSignCompany}}（下称"公司"）非常乐意按以下条件和条款聘用您：
          </a-col>
        </a-row>
        <a-row :gutter="24" style="margin-top: 15px;">
          <a-col :span="24" class="offerOne">
            <span class='offerSpanRight'>1.</span>实习协议期限
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <span class='offerSpanLeft'>实习协议期限自【{{ startY }}】年【{{ startM }}】月【{{ startD }}】日（"实习协议起始日"）起至【{{ endY }}】年【{{ endM }}】月【{{ endD }}】日止。</span>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerOne">
            <span class='offerSpanRight'>2.</span>工作时间
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <span class='offerSpanLeft'>根据公司所订的工作日程及轮值安排，实行综合工时制。</span>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerOne">
            <span class='offerSpanRight'>3.</span>岗位和职责
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <span class='offerSpanRightPoint'>3.1</span>您将初期受聘职位为【{{ newJoinerPersonalInformationForm.position }}】。
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <span class='offerSpanRightPoint'>3.2</span>您将履行符合公司安排或与您的工作岗位相对应的所有工作、职责与义务。
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <span class='offerSpanRightPoint'>3.3</span>您的岗位和职责可以按双方实习协议及公司规章制度调整。
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerOne">
            <span class='offerSpanRight'>4.</span>工作地点
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <span class='offerSpanLeft'>您的工作地点为【{{ newJoinerPersonalInformationForm.city }}】。</span>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerOne">
            <span class='offerSpanRight'>5.</span>薪酬
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <span class='offerSpanLeft'>基本工资</span>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <span class='offerSpanLeft'>您的基本工资为每月（税前）【{{ offerInformationForm.basicSalary }}】人民币；补助及津贴为每月（税前）【{{ offerInformationForm.allowance }}】人民币。</span>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerOne">
            <span class='offerSpanRight'>6.</span>个人所得税
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <span class='offerSpanLeft'>您需承担缴纳个人所得税，公司将直接从税前工资中扣除并由指定的机构缴纳至税务部门。</span>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerOne">
            <span class='offerSpanRight'>7.</span>保密性条款
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div class='offerSpanLeft'>您将有义务对个人薪资所得及公司规章制度所规定的或公司与您书面约定的相关保密信息保密并承诺除公司事先书面同意，不得以任何形式直接或间接向公司内部或外部人员透露相关信息。</div>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerOne">
            <span class='offerSpanRight'>8.</span>实习协议及其他协议
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div class='offerSpanLeft'>您入职后，应按照在本公司规定的时间内，与公司签署实习协议和其他相关协议。实习协议签署后，本录用函即被实习协议所替代。本录用函于实习协议生效的同时失效。</div>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <span class='offerSpanLeft'>如您接受聘用并与公司签署实习协议，您于本公司的劳动关系，将于实习协议起始日立即生效。</span>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerOne">
            <span class='offerSpanRight'>9.</span>公司商业行为与道德规范、公司员工手册、其他规章制度和政策等
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div class='offerSpanLeft'>您入职时，公司将向您提供公司商业行为与道德规范、公司员工手册等。您同意届时签收这些文件。您同意在被公司聘用期间遵守该等文件的规定。</div>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerOne">
            <span class='offerSpanRightPointOne'>10.</span>电子签名
          </a-col>
        </a-row>
         <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div>10.1您同意采用电子签名的方式和公司签订电子实习协议和其他相关协议，并认可该等电子签名方式的法律效力受其约束。</div>
          </a-col>
        </a-row>
         <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div class='offerSpanLeft'><span class='offerSpanLeftCenter'>10.2</span>您同意根据公司要求通过公司指定的电子实习协议平台签署电子实习协议、相关协议、文件，签收公司提供的各项规章制度（包括但不限于商业行为与道德规范、员工手册及其他规章制度和政策等）及各类文件、通知，遵守公司要求的签署流程、操作、注意事项等，相关签署流程、操作指引、注意事项、查看及下载完整文本的途径等将通过该电子实习协议签约平台推送到您预留的手机号码或者电子邮箱，公司也将在电子实习协议签约平台的入口页等位置指示前述签署流程、操作指引、注意事情、查看及下载完整文本的途径等。</div>
          </a-col>
        </a-row>
         <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div>10.3您同意为公司有权收集、存储、使用、加工、传输、提供、公开、删除或以其他方式处理您向公司提供的与电子签名相关的个人信息。</div>
          </a-col>
        </a-row>
         <a-row :gutter="24">
          <a-col :span="24" class="offerOne">
            <span class='offerSpanRightPointOne'>11.</span>效力
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div class='offerSpanLeft'>当出现下列情形之一时，本录用函自动失效：</div>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div class='offerSpanLeft'>a.您不具备政府规定的就业资质或手续的；</div>
          </a-col>
        </a-row>
         <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div class='offerSpanLeft'>b.您与前用人单位未依法解除、终止劳动关系的；</div>
          </a-col>
        </a-row>
         <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div class='offerSpanLeft'>c.您与前用人单位存在竞业限制约定且本公司在限制范围之内的；</div>
          </a-col>
        </a-row>
         <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div class='offerSpanLeft'>d.您应聘过程中提供给公司的个人简历或资料系不真实、不完整或不准确的；</div>
          </a-col>
        </a-row>
         <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div class='offerSpanLeft'>e.您无法提供办理录用、社会保险等所需要的证明材料的；</div>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div class='offerSpanLeft'>f.您存在其他不符合公司录用条件或不诚信行为的。</div>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent offerContentMargin">
            <div>如接受聘用，请于【{{ signingY }}】年【{{ signingM }}】月【{{ signingD }}】日前签署。签署本录用函即代表您已仔细阅读、了解、确认和同意以上各项条款及条件并接受聘用；在此日期前未签署本录用函，本录用函自动失效。</div>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div data-type="请致电本公司人力资源部">如有任何疑问，请致电本公司人力资源部</div>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div>联系人：Mona Xu</div>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div>联系电话：+86 13132239531</div>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent offerContentMarginBottom">
            <div>电子邮箱：mona.xu@utalent.cn</div>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div data-type="员工签名">员工签名：</div>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8" class='offerContentMarginBottom'>
            <div class="offerContentBorderBottom">&nbsp;</div>
          </a-col>
        </a-row>
         <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div>姓名：{{ displayName }}</div>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent offerContentMarginBottom">
            <div>日期：{{ dayjs().format('YYYY-MM-DD') }}</div>
          </a-col>
        </a-row>
      </div>
      <div v-if="offerInformationForm.offerType == '全职劳动合同'">
        <a-row :gutter="24">
          <a-col :span="24" class="offerHeader offerContentMargin">
            <img src="/u-talent-logo.png" alt="U-TALENT" style="height: 30px;" />
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerOne">
            机密文件
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            【{{ displayName }}】（有效证件号码：【{{ newJoinerPersonalInformationForm.idCard }}】）
          </a-col>
        </a-row>
        <a-row :gutter="24" style="margin-top: 15px;">
          <a-col :span="24" class="offerContent offerTitle">
            录用函
          </a-col>
        </a-row>
        <a-row :gutter="24" style="margin-top: 15px;">
          <a-col :span="24" class="offerContent">
            {{offerInformationForm.offerSignCompany}}（下称"公司"）非常乐意按以下条件和条款聘用您：
          </a-col>
        </a-row>
        <a-row :gutter="24" style="margin-top: 15px;">
          <a-col :span="24" class="offerOne">
            <span class='offerSpanRight'>1.</span>劳动合同期限
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div class='offerSpanLeft'>劳动合同期限自【{{ startY }}】年【{{ startM }}】月【{{ startD }}】日（"劳动合同起始日"）起至【{{ endY }}】年【{{ endM }}】月【{{ endD }}】日止。劳动合同期满时，公司将根据实际情况决定是否续签劳动合同。</div>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerOne">
            <span class='offerSpanRight'>2.</span>工作时间
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <span class='offerSpanLeft'>根据公司所订的工作日程及轮值安排，实行综合工时制。</span>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerOne">
            <span class='offerSpanRight'>3.</span>岗位和职责
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <span class='offerSpanRightPoint'>3.1</span>您将初期受聘职位为【{{ newJoinerPersonalInformationForm.position }}】。
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <span class='offerSpanRightPoint'>3.2</span>您将履行符合公司安排或与您的工作岗位相对应的所有工作、职责与义务。
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <span class='offerSpanRightPoint'>3.3</span>您的岗位和职责可以按双方劳动合同及公司规章制度调整。
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerOne">
            <span class='offerSpanRight'>4.</span>工作地点
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <span class='offerSpanLeft'>您的工作地点为【{{ newJoinerPersonalInformationForm.city }}】。</span>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerOne">
            <span class='offerSpanRight'>5.</span>薪酬
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <span class='offerSpanLeft'>基本工资</span>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <span class='offerSpanLeft'>您的基本工资为每月（税前）【{{ offerInformationForm.basicSalary }}】人民币；补助及津贴为每月（税前）【{{ offerInformationForm.allowance }}】人民币；</span>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <span class='offerSpanLeft'>试用期基本工资为每月（税前）【{{ offerInformationForm.basicSalaryAfterRate }}】人民币；补助及津贴为每月（税前）【{{ offerInformationForm.allowance }}】人民币。</span>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerOne">
            <span class='offerSpanRight'>6.</span>福利
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <span class='offerSpanLeft'>公司将根据国家及本市的规定为您缴纳社会保险和公积金.您将承担其中的个人部分，相关金额将直接从每月的工资中扣除。</span>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerOne">
            <span class='offerSpanRight'>7.</span>个人所得税
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <span class='offerSpanLeft'>您需承担缴纳个人所得税，公司将直接从税前工资中扣除并由指定的机构缴纳至税务部门。</span>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerOne">
            <span class='offerSpanRight'>8.</span>保密性条款
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div class='offerSpanLeft'>您将有义务对个人薪资所得及公司规章制度所规定的或公司与您书面约定的相关保密信息保密并承诺除公司事先书面同意，不得以任何形式直接或间接向公司内部或外部人员透露相关信息。</div>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerOne">
            <span class='offerSpanRight'>9.</span>劳动合同及其他协
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div class='offerSpanLeft'>您入职后，应按照在本公司规定的时间内，与公司签署劳动合同和其他相关协议。劳动合同签署后，本录用函即被劳动合同所替代。本录用函于劳动合同生效的同时失效。</div>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <span class='offerSpanLeft'>如您接受聘用并与公司签署劳动合同，您于本公司的劳动关系，将于劳动合同起始日立即生效。</span>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerOne">
            <span class='offerSpanRightPointOne'>10.</span>公司商业行为与道德规范、公司员工手册、其他规章制度和政策等
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div class='offerSpanLeft'>您入职时，公司将向您提供公司商业行为与道德规范、公司员工手册等。您同意届时签收这些文件。您同意在被公司聘用期间遵守该等文件的规定。</div>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerOne">
            <span class='offerSpanRightPointOne'>11.</span>电子签名
          </a-col>
        </a-row>
         <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div>11.1您同意采用电子签名的方式和公司签订电子劳动合同和其他相关协议，并认可该等电子签名方式的法律效力受其约束。</div>
          </a-col>
        </a-row>
         <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div class='offerSpanLeft'><span class='offerSpanLeftCenter'>11.2</span>您同意根据公司要求通过公司指定的电子劳动合同平台签署电子劳动合同、相关协议、文件，签收公司提供的各项规章制度（包括但不限于商业行为与道德规范、员工手册及其他规章制度和政策等）及各类文件、通知，遵守公司要求的签署流程、操作、注意事项等，相关签署流程、操作指引、注意事项、查看及下载完整文本的途径等将通过该电子劳动合同签约平台推送到您预留的手机号码或者电子邮箱，公司也将在电子劳动合同签约平台的入口页等位置指示前述签署流程、操作指引、注意事情、查看及下载完整文本的途径等。</div>
          </a-col>
        </a-row>
         <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div>11.3您同意为公司有权收集、存储、使用、加工、传输、提供、公开、删除或以其他方式处理您向公司提供的与电子签名相关的个人信息。</div>
          </a-col>
        </a-row>
         <a-row :gutter="24">
          <a-col :span="24" class="offerOne">
            <span class='offerSpanRightPointOne'>12.</span>效力
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div class='offerSpanLeft'>当出现下列情形之一时，本录用函自动失效：</div>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div class='offerSpanLeft'>a.您不具备政府规定的就业资质或手续的；</div>
          </a-col>
        </a-row>
         <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div class='offerSpanLeft'>b.您与前用人单位未依法解除、终止劳动关系的；</div>
          </a-col>
        </a-row>
         <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div class='offerSpanLeft'>c.您与前用人单位存在竞业限制约定且本公司在限制范围之内的；</div>
          </a-col>
        </a-row>
         <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div class='offerSpanLeft'>d.您应聘过程中提供给公司的个人简历或资料系不真实、不完整或不准确的；</div>
          </a-col>
        </a-row>
         <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div class='offerSpanLeft'>e.您无法提供办理录用、社会保险等所需要的证明材料的；</div>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div class='offerSpanLeft'>f.您存在其他不符合公司录用条件或不诚信行为的。</div>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent offerContentMargin">
            <div>如接受聘用，请于【{{ signingY }}】年【{{ signingM }}】月【{{ signingD }}】日前签署。签署本录用函即代表您已仔细阅读、了解、确认和同意以上各项条款及条件并接受聘用；在此日期前未签署本录用函，本录用函自动失效。</div>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div data-type="请致电本公司人力资源部">如有任何疑问，请致电本公司人力资源部</div>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div>联系人：Mona Xu</div>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div>联系电话：+86 13132239531</div>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent offerContentMarginBottom">
            <div>电子邮箱：mona.xu@utalent.cn</div>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div data-type="员工签名">员工签名：</div>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8" class="offerContent">
            <div class="offerContentBorderBottom">&nbsp;</div>
          </a-col>
        </a-row>
         <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div>姓名：{{ displayName }}</div>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent offerContentMarginBottom">
            <div>日期：{{ dayjs().format('YYYY-MM-DD') }}</div>
          </a-col>
        </a-row>
      </div>
      <div v-if="offerInformationForm.offerType == '兼职合同'">
        <a-row :gutter="24">
          <a-col :span="24" class="offerHeader offerContentMargin">
            <img src="/u-talent-logo.png" alt="U-TALENT" style="height: 30px;" />
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerOne">
            机密文件
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            【{{ displayName }}】（有效证件号码：【{{ newJoinerPersonalInformationForm.idCard }}】）
          </a-col>
        </a-row>
        <a-row :gutter="24" style="margin-top: 15px;">
          <a-col :span="24" class="offerContent offerTitle">
            录用函
          </a-col>
        </a-row>
        <a-row :gutter="24" style="margin-top: 15px;">
          <a-col :span="24" class="offerContent">
            {{offerInformationForm.offerSignCompany}}（下称"公司"）非常乐意按以下条件和条款聘用您：
          </a-col>
        </a-row>
        <a-row :gutter="24" style="margin-top: 15px;">
          <a-col :span="24" class="offerOne">
            <span class='offerSpanRight'>1.</span>非全日制用工合同期限
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <span class='offerSpanLeft'>非全日制用工合同期限自【{{ startY }}】年【{{ startM }}】月【{{ startD }}】日（"非全日制用工合同起始日"）起。</span>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerOne">
            <span class='offerSpanRight'>2.</span>工作时间
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <span class='offerSpanLeft'>根据公司所订的工作日程及轮值安排，实行不定时工时制。</span>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerOne">
            <span class='offerSpanRight'>3.</span>岗位和职责
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <span class='offerSpanRightPoint'>3.1</span>您将初期受聘职位为【{{ newJoinerPersonalInformationForm.position }}】。
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <span class='offerSpanRightPoint'>3.2</span>您将履行符合公司安排或与您的工作岗位相对应的所有工作、职责与义务。
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <span class='offerSpanRightPoint'>3.3</span>您的岗位和职责可以按双方非全日制用工合同及公司规章制度调整。
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerOne">
            <span class='offerSpanRight'>4.</span>工作地点
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <span class='offerSpanLeft'>您的工作地点为【{{ newJoinerPersonalInformationForm.city }}】。</span>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerOne">
            <span class='offerSpanRight'>5.</span>薪酬
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <span class='offerSpanLeft'>a.您的工资（即劳动报酬）为 {{offerInformationForm.basicSalary}}，每月{{offerInformationForm.faXinDay}}为发薪日，以人民币形式支付上月工资。</span>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <span class='offerSpanLeft'>b.公司不承担您的任何劳保福利待遇，并且不负责承担您的社会保险费用。</span>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerOne">
            <span class='offerSpanRight'>6.</span>个人所得税
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <span class='offerSpanLeft'>您需承担缴纳个人所得税，公司将直接从税前工资中扣除并由指定的机构缴纳至税务部门。</span>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerOne">
            <span class='offerSpanRight'>7.</span>保密性条款
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div class='offerSpanLeft'>您将有义务对个人薪资所得及公司规章制度所规定的或公司与您书面约定的相关保密信息保密并承诺除公司事先书面同意，不得以任何形式直接或间接向公司内部或外部人员透露相关信息。</div>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerOne">
            <span class='offerSpanRight'>8.</span>非全日制用工合同及其他协议
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div class='offerSpanLeft'>您入职后，应按照在本公司规定的时间内，与公司签署非全日制用工合同和其他相关协议。非全日制用工合同签署后，本录用函即被非全日制用工合同所替代。本录用函于非全日制用工合同生效的同时失效。</div>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <span class='offerSpanLeft'>如您接受聘用并与公司签署非全日制用工合同，您于本公司的劳动关系，将于非全日制用工合同起始日立即生效。</span>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerOne">
            <span class='offerSpanRight'>9.</span>公司商业行为与道德规范、公司员工手册、其他规章制度和政策等
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div class='offerSpanLeft'>您入职时，公司将向您提供公司商业行为与道德规范、公司员工手册等。您同意届时签收这些文件。您同意在被公司聘用期间遵守该等文件的规定。</div>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerOne">
            <span class='offerSpanRightPointOne'>10.</span>电子签名
          </a-col>
        </a-row>
         <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div>10.1您同意采用电子签名的方式和公司签订电子非全日制用工合同和其他相关协议，并认可该等电子签名方式的法律效力受其约束。</div>
          </a-col>
        </a-row>
         <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div class='offerSpanLeft'><span class='offerSpanLeftCenter'>10.2</span>您同意根据公司要求通过公司指定的电子非全日制用工合同平台签署电子非全日制用工合同、相关协议、文件，签收公司提供的各项规章制度（包括但不限于商业行为与道德规范、员工手册及其他规章制度和政策等）及各类文件、通知，遵守公司要求的签署流程、操作、注意事项等，相关签署流程、操作指引、注意事项、查看及下载完整文本的途径等将通过该电子非全日制用工合同签约平台推送到您预留的手机号码或者电子邮箱，公司也将在电子非全日制用工合同签约平台的入口页等位置指示前述签署流程、操作指引、注意事情、查看及下载完整文本的途径等。</div>
          </a-col>
        </a-row>
         <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div>10.3您同意为公司有权收集、存储、使用、加工、传输、提供、公开、删除或以其他方式处理您向公司提供的与电子签名相关的个人信息。</div>
          </a-col>
        </a-row>
         <a-row :gutter="24">
          <a-col :span="24" class="offerOne">
            <span class='offerSpanRightPointOne'>11.</span>效力
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div class='offerSpanLeft'>当出现下列情形之一时，本录用函自动失效：</div>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div class='offerSpanLeft'>a.您不具备政府规定的就业资质或手续的；</div>
          </a-col>
        </a-row>
         <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div class='offerSpanLeft'>b.您与前用人单位存在竞业限制约定且本公司在限制范围之内的；</div>
          </a-col>
        </a-row>
         <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div class='offerSpanLeft'>c.您应聘过程中提供给公司的个人简历或资料系不真实、不完整或不准确的；</div>
          </a-col>
        </a-row>
         <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div class='offerSpanLeft'>d.您存在其他不符合公司录用条件或不诚信行为的。</div>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent offerContentMargin">
            <div>如接受聘用，请于【{{ signingY }}】年【{{ signingM }}】月【{{ signingD }}】日前签署。签署本录用函即代表您已仔细阅读、了解、确认和同意以上各项条款及条件并接受聘用；在此日期前未签署本录用函，本录用函自动失效。</div>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div data-type="请致电本公司人力资源部">如有任何疑问，请致电本公司人力资源部</div>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div>联系人：Mona Xu</div>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div>联系电话：+86 13132239531</div>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent offerContentMarginBottom">
            <div>电子邮箱：mona.xu@utalent.cn</div>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div data-type="员工签名">员工签名：</div>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8" class="offerContent">
            <div class="offerContentBorderBottom">&nbsp;</div>
          </a-col>
        </a-row>
         <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div>姓名：{{ displayName }}</div>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent offerContentMarginBottom">
            <div>日期：{{ dayjs().format('YYYY-MM-DD') }}</div>
          </a-col>
        </a-row>
      </div>
      <div id="personalInfoOfferForm">
      <a-row :gutter="24">
        <a-col :span="24" class='personalInfoHeader'>
          New Joiner Personal Information Form
        </a-col>
      </a-row>
      <a-row :gutter="24" style="border-bottom: unset;">
        <a-col :span="24" class='personalInfoHeader'>
          新员工个人信息登记表
        </a-col>
      </a-row>
      <!-- <a-row :gutter="24" class="personalInfoThreeBottomBorder">
        <a-col :span="4" style="max-width: 14%;">
          Department 部门:
        </a-col>
         <a-col :span="20" style="padding-left: 0;">
          {{newJoinerPersonalInformationForm.department}}
        </a-col>
      </a-row> -->

      <a-row :gutter="24" class="personalInfoBasicHeader">
        <a-col :span="24">
          Basic Information
        </a-col>
      </a-row>
      <a-row :gutter="24" class="personalInfoBasicHeader">
        <a-col :span="24">
          员工基本情况
        </a-col>
      </a-row>

      <a-row :gutter="24">
        <a-col :span="4" class="personalInfoThreeBottomBorder">
          Name<br/>
          姓名
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder">
          {{ newJoinerPersonalInformationForm.userNameCn }}
        </a-col>
        <a-col :span="3" class="personalInfoTwoBorder">
          ID<br/>
          身份证号码
        </a-col>
        <a-col :span="4" class="personalInfoContent personalInfoTwoBorder">
          {{ newJoinerPersonalInformationForm.idCard }}
        </a-col>
         <a-col :span="4" class="personalInfoTwoBorder">
          Gender<br/>
          性别
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder">
          {{ newJoinerPersonalInformationForm.sex }}
        </a-col>
        <a-col :span="3" class="personalInfoRightBorder personalInfoPhotoCol">
          <img :src="newJoinerPersonalInformationForm.headPhoto" class="personalInfoPhoto" />
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="4" class="personalInfoThreeBottomBorder">
          English Name<br/>
          英文名
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder">
          {{ newJoinerPersonalInformationForm.userNameEn }}
        </a-col>
        <a-col :span="3" class="personalInfoTwoBorder">
          Place of Birth<br/>
          国籍
        </a-col>
        <a-col :span="4" class="personalInfoContent personalInfoTwoBorder">
          {{ newJoinerPersonalInformationForm.placeOfBirth }}
        </a-col>
         <a-col :span="4" class="personalInfoTwoBorder">
          Ethnic<br/>
          民族
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder">
          {{ newJoinerPersonalInformationForm.ethnic }}
        </a-col>
        <a-col :span="3" class="personalInfoRightBorder"></a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="4" class="personalInfoThreeBottomBorder">
          Mobile<br/>
          手机号码
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder">
          {{ newJoinerPersonalInformationForm.phoneNumber }}
        </a-col>
        <a-col :span="3" class="personalInfoTwoBorder">
          E-mail<br/>
          邮箱地址
        </a-col>
        <a-col :span="4" class="personalInfoContent personalInfoTwoBorder">
          {{ newJoinerPersonalInformationForm.email }}
        </a-col>
         <a-col :span="4" class="personalInfoTwoBorder">
          Politics Status<br/>
          政治面貌
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder">
          {{ newJoinerPersonalInformationForm.politicsStatus }}
        </a-col>
        <a-col :span="3" class="personalInfoRightBorder"></a-col>
      </a-row>
       <a-row :gutter="24">
        <a-col :span="4" class="personalInfoThreeBottomBorder">
          Highest Standard <br/>Attained 最高学历
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder">
          {{ newJoinerPersonalInformationForm.highestStandard }}
        </a-col>
        <a-col :span="3" class="personalInfoTwoBorder">
          Martial Status<br/>
          婚姻状况
        </a-col>
        <a-col :span="4" class="personalInfoContent personalInfoTwoBorder">
          {{ newJoinerPersonalInformationForm.martialStatus }}
        </a-col>
         <a-col :span="4" class="personalInfoTwoBorder">
          Health Condition<br/>
          健康状况
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder">
          {{ newJoinerPersonalInformationForm.healthCondition }}
        </a-col>
        <a-col :span="3" class="personalInfoTwoBorder"></a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="4" class="personalInfoThreeBottomBorder">
          Place of Domicile<br/>
          户籍地
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder">
          {{ newJoinerPersonalInformationForm.placeOfDomicile }}
        </a-col>
        <a-col :span="3" class="personalInfoTwoBorder">
          Census Register<br/>
          户口类型
        </a-col>
        <a-col :span="4" class="personalInfoContent personalInfoTwoBorder">
          {{ newJoinerPersonalInformationForm.censusRegister }}
        </a-col>                       
         <a-col :span="4" class="personalInfoTwoBorder">
          If has a criminal record<br/>
          是否有过犯罪记录
        </a-col>
        <a-col :span="6" class="personalInfoContent personalInfoTwoBorder">
          {{ newJoinerPersonalInformationForm.criminalRecord }}
        </a-col>
        <!-- <a-col :span="3" class="personalInfoTwoBorder"></a-col> -->
      </a-row>
      <a-row :gutter="24">
        <a-col :span="4" class="personalInfoThreeBottomBorder" style="display: flex;align-items: center;">
          Emergency Contact<br/>
          紧急联络人
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder">
          {{ newJoinerPersonalInformationForm.emergencyContact }}
        </a-col>
        <a-col :span="4" class="personalInfoTwoBorder" style="display: flex;align-items: center;">
          Emergency Contact No.<br/>
          紧急联络人联系方式
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder">
          {{ newJoinerPersonalInformationForm.emergencyMobile }}
        </a-col>                       
         <a-col :span="4" class="personalInfoTwoBorder" style="display: flex;align-items: center;">
          Relationship with the emergency contact<br/>
          与紧急联系人的关系
        </a-col>
        <a-col :span="6" class="personalInfoContent personalInfoTwoBorder">
          {{ newJoinerPersonalInformationForm.emergencyRelationshiip }}
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="11" class="personalInfoThreeBottomBorder" style="display: flex;align-items: center;">
          Whether to be dismissed from the previous company<br/>
          是否被前单位除名/辞退
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder">
          {{ newJoinerPersonalInformationForm.isDismissed }}
        </a-col>
        <a-col :span="4" class="personalInfoTwoBorder">
          If YES, please list the reason<br/>
          如选是请告知原因
        </a-col>
        <a-col :span="6" class="personalInfoContent personalInfoTwoBorder">
          {{ newJoinerPersonalInformationForm.dismissedReason }}
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="11" class="personalInfoThreeBottomBorder">
          Did you sign a non-compete agreement with your previous employer<br/>
          是否与前工作单位签署竞业限制协议
        </a-col>
        <a-col :span="13" class="personalInfoContent personalInfoTwoBorder">
          {{ newJoinerPersonalInformationForm.isNonCompete }}
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="4" class="personalInfoThreeBottomBorder">
          Address in Document<br/>
          户籍/身份证地址
        </a-col>
        <a-col :span="20" class="personalInfoContent personalInfoTwoBorder">
          {{ newJoinerPersonalInformationForm.documentAddress }}
        </a-col>
      </a-row>
       <a-row :gutter="24">
        <a-col :span="4" class="personalInfoThreeBottomBorder">
          Current Living Address<br/>
          本市联系/居住地址
        </a-col>
        <a-col :span="20" class="personalInfoContent personalInfoTwoBorder">
          {{ newJoinerPersonalInformationForm.livingAddress }}
        </a-col>
      </a-row>

      <a-row :gutter="24" class="personalInfoBasicHeader">
        <a-col :span="24">
          Work Experience
        </a-col>
      </a-row>
      <a-row :gutter="24" class="personalInfoBasicHeader">
        <a-col :span="24">
          工作经历（从最近服务单位倒叙至以前单位的方式填写）
        </a-col>
      </a-row>

       <a-row :gutter="24">
        <a-col :span="4" class="personalInfoThreeBottomBorder personalInfoCenter">
          Start/End Date<br/>
          起止年月
        </a-col>
        <a-col :span="7" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          Company Name<br/>
          公司名称
        </a-col>
        <a-col :span="7" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          Position<br/>
          担任职务
        </a-col>
        <a-col :span="6" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          Demission Reason<br/>
          离职原因
        </a-col>
      </a-row>
      <a-row :gutter="24" v-for="(item, index) in newJoinerPersonalInformationForm.offerOutsourceWorks" :key="index">
        <a-col :span="4" class="personalInfoThreeBottomBorder personalInfoCenter personalInfoCenterFamilyBottom">
          {{ item.startDate }} - {{ item.endDate == '-1' ? '至今' : item.endDate }}
        </a-col>
        <a-col :span="7" class="personalInfoContent personalInfoTwoBorder personalInfoCenter personalInfoCenterFamilyBottom">
          {{ item.companyName }}
        </a-col>
        <a-col :span="7" class="personalInfoContent personalInfoTwoBorder personalInfoCenter personalInfoCenterFamilyBottom">
          {{ item.position }}
        </a-col>
        <a-col :span="6" class="personalInfoContent personalInfoTwoBorder personalInfoCenter personalInfoCenterFamilyBottom">
          {{ item.demissionReason }}
        </a-col>
      </a-row>

      <a-row v-if="newJoinerPersonalInformationForm.jobType == '全职'" :gutter="24" class="personalInfoBasicHeader">
        <a-col :span="24">
          Family Situation and Major Social Relations
        </a-col>
      </a-row>
      <a-row v-if="newJoinerPersonalInformationForm.jobType == '全职'" :gutter="24" class="personalInfoBasicHeader">
        <a-col :span="24">
          家庭情况及主要社会关系
        </a-col>
      </a-row>

      <a-row v-if="newJoinerPersonalInformationForm.jobType == '全职'" :gutter="24">
        <a-col :span="3" class="personalInfoThreeBottomBorder personalInfoCenter">
          Relationship<br/>
          称谓
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          Name<br/>
          姓名
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          Age<br/>
          年龄
        </a-col>
        <a-col :span="9" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          Company Name<br/>
          工作单位
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          Position<br/>
          职位/职务
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          Contact No.<br/>
          联系方式
        </a-col>
      </a-row>
      <a-row v-if="newJoinerPersonalInformationForm.jobType == '全职'" :gutter="24" v-for="(item, index) in newJoinerPersonalInformationForm.offerOutsourceFamilies" :key="index">
        <a-col :span="3" class="personalInfoThreeBottomBorder personalInfoCenter personalInfoCenterFamilyBottom">
          {{ item.relationship }}
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder personalInfoCenter personalInfoCenterFamilyBottom">
          {{ item.name }}
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder personalInfoCenter personalInfoCenterFamilyBottom">
          {{ item.age }}
        </a-col>
        <a-col :span="9" class="personalInfoContent personalInfoTwoBorder personalInfoCenter personalInfoCenterFamilyBottom">
          {{ item.companyName }}
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder personalInfoCenter personalInfoCenterFamilyBottom">
          {{ item.position }}
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder personalInfoCenter personalInfoCenterFamilyBottom">
          {{ item.mobile }}
        </a-col>
      </a-row>
      
       <a-row :gutter="24">
        <a-col :span="24" class="personalInfoThreeBottomBorder personalInfoCenter" style="text-align: left;">
          I hereby authorize U-Talent, ltd and its all subsidiaries or third parties to investigate the relevant information that I have provided in connection with my form for background check is true and complete. Any falsification of information (or any omission of relevant information)of any fact resulted in disqualified for the position, I am willing to assume all the related responsibility. and I waive all claims against such organizations and/or persons for legal liabilities which may occur during the disclosure.
<br/>本人特此授权本人授权{{offerInformationForm.offerSignCompany}}及其所有关联公司或第三方对我在本表中提供的相关信息进行调查，确认其真实完整。如果有任何虚假信息（或有关事实的遗漏）导致我不能担任该职位，本人愿意承担相关责任。本人放弃对上述组织和/或个人产生的披露过程中可能出现的法律责任提出的任何索赔。以上信息如有变更，本人将在第一时间告知人力资源部，如有违反，一切后果由本人承担。本人已阅读公司管理制度及部门相关制度，并严格遵守执行。此登记表作为劳动合同附件，与劳动合同具有同等法律效力。
        </a-col>
      </a-row>
      <a-row :gutter="24" class="personalInfoThreeBottomBorder">
       <a-col :span="2" class="personalInfoCenterBottom"><div data-type="签名">Signature<br/>签名：</div></a-col>
       <a-col :span="10" class="personalInfoCenterBottom"></a-col>
       <a-col :span="3" class="personalInfoCenterBottom"><div data-type="填表日期">Date of Filling<br/>填表日期：</div></a-col>
       <a-col :span="9" class="personalInfoCenterBottom">{{ dayjs().format('YYYY-MM-DD') }}</a-col>
      </a-row>
      </div>
      
    </div>
    <a-row :gutter="24">
      <a-col :span="24" class="personalInfoCenter">
        <a-button type="primary" style="margin-right: 10px;" @click="yulanPDF">{{ isShow ? "预览" : "返回"}}</a-button>
        <a-button type="primary" :loading="isloading" @click="generatePDF">发起签署</a-button>
      </a-col>
    </a-row>

  </a-drawer>
</template>
<script setup lang="ts">
import dayjs from 'dayjs';
import { storeToRefs } from 'pinia';
import jsPDF from 'jspdf';
import { message } from 'ant-design-vue';
import { nextTick } from 'vue';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { OutsourcePersonItem, NewJoinerPersonalInfoItem, } from '/@/api/outsourceDetail/model';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
import SimHeiFontUrl from '/@/assets/fonts/simhei.ttf?url';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { newJoinerPersonalInformationFlag, newJoinerPersonalInformationFormTemp } = storeToRefs(outsourceDetailStore);
const drawerWidth = ref(Math.min(900, window.innerWidth * 0.9));
const isloading = ref(false);
const labelCol = { span: 5 };
const jianzhiSalary = ref(0);
const jianzhiUnit = ref("元/小时");
const handleJianzhiSalaryChange = () => {
  offerInformationForm.value.basicSalary = `${jianzhiSalary.value}${jianzhiUnit.value}`;
};
const ethnicOptions = ref([
  { value: '汉族', label: '汉族' },
  { value: '蒙古族', label: '蒙古族' },
  { value: '回族', label: '回族' },
  { value: '藏族', label: '藏族' },
  { value: '维吾尔族', label: '维吾尔族' },
  { value: '苗族', label: '苗族' },
  { value: '彝族', label: '彝族' },
  { value: '壮族', label: '壮族' },
  { value: '布依族', label: '布依族' },
  { value: '朝鲜族', label: '朝鲜族' },
  { value: '满族', label: '满族' },
  { value: '侗族', label: '侗族' },
  { value: '瑶族', label: '瑶族' },
  { value: '白族', label: '白族' },
  { value: '土家族', label: '土家族' },
  { value: '哈尼族', label: '哈尼族' },
  { value: '哈萨克族', label: '哈萨克族' },
  { value: '傣族', label: '傣族' },
  { value: '黎族', label: '黎族' },
  { value: '傈僳族', label: '傈僳族' },
  { value: '佤族', label: '佤族' },
  { value: '畲族', label: '畲族' },
  { value: '高山族', label: '高山族' },
  { value: '拉祜族', label: '拉祜族' },
  { value: '水族', label: '水族' },
  { value: '东乡族', label: '东乡族' },
  { value: '纳西族', label: '纳西族' },
  { value: '景颇族', label: '景颇族' },
  { value: '柯尔克孜族', label: '柯尔克孜族' },
  { value: '土族', label: '土族' },
  { value: '达斡尔族', label: '达斡尔族' },
  { value: '仫佬族', label: '仫佬族' },
  { value: '羌族', label: '羌族' },
  { value: '布朗族', label: '布朗族' },
  { value: '撒拉族', label: '撒拉族' },
  { value: '毛南族', label: '毛南族' },
  { value: '仡佬族', label: '仡佬族' },
  { value: '锡伯族', label: '锡伯族' },
  { value: '阿昌族', label: '阿昌族' },
  { value: '普米族', label: '普米族' },
  { value: '塔吉克族', label: '塔吉克族' },
  { value: '怒族', label: '怒族' },
  { value: '乌孜别克族', label: '乌孜别克族' },
  { value: '俄罗斯族', label: '俄罗斯族' },
  { value: '鄂温克族', label: '鄂温克族' },
  { value: '德昂族', label: '德昂族' },
  { value: '保安族', label: '保安族' },
  { value: '裕固族', label: '裕固族' },
  { value: '京族', label: '京族' },
  { value: '塔塔尔族', label: '塔塔尔族' },
  { value: '独龙族', label: '独龙族' },
  { value: '鄂伦春族', label: '鄂伦春族' },
  { value: '赫哲族', label: '赫哲族' },
  { value: '门巴族', label: '门巴族' },
  { value: '珞巴族', label: '珞巴族' },
  { value: '基诺族', label: '基诺族' },
]);
const politicsStatusOptions = ref([
  { value: '群众', label: '群众' },
  { value: '中共党员', label: '中共党员' },
  { value: '中共预备党员', label: '中共预备党员' },
  { value: '共青团员', label: '共青团员' },
  { value: '无党派人士', label: '无党派人士' },
  { value: '中国国民党革命委员会党员', label: '中国国民党革命委员会党员' },
  { value: '中国民主同盟盟员', label: '中国民主同盟盟员' },
  { value: '中国民主建国会会员', label: '中国民主建国会会员' },
  { value: '中国民主促进会会员', label: '中国民主促进会会员' },
  { value: '中国农工民主党党员', label: '中国农工民主党党员' },
  { value: '中国致公党党员', label: '中国致公党党员' },
  { value: '九三学社社员', label: '九三学社社员' },
  { value: '台湾民主自治同盟盟员', label: '台湾民主自治同盟盟员' },
]);
const healthConditionOptions = ref([
  { value: '健康', label: '健康' },
  { value: '良好', label: '良好' },
  { value: '一般', label: '一般' },
  { value: '较差', label: '较差' },
  { value: '慢性病', label: '慢性病' },
  { value: '残疾', label: '残疾' },
  { value: '亚健康', label: '亚健康' },
  { value: '患有重大疾病', label: '患有重大疾病' },
  { value: '其他', label: '其他' },
]);
const censusRegisterOptions = ref([
  { value: '农业户口', label: '农业户口' },
  { value: '城镇户口', label: '城镇户口' },
  // { value: '集体户口', label: '集体户口' },
  // { value: '居民户口', label: '居民户口' },
  // { value: '家庭户口', label: '家庭户口' },
  // { value: '公共户口', label: '公共户口' },
  // { value: '学生集体户口', label: '学生集体户口' },
  // { value: '单位集体户口', label: '单位集体户口' },
  // { value: '人才集体户口', label: '人才集体户口' },
  // { value: '社区公共户', label: '社区公共户' },
]);
const isShow = ref(true);
type NewJoinerPersonalInformationFormWithPhoto = NewJoinerPersonalInfoItem & { headPhoto?: string,signOfferType?: string, shixiStartTime?: string, shixiEndTime?: string, signBaseMoney?: string, signEndTime?: string, shixiBaseMoney: string, faxinDay: string, allowance: string};
const newJoinerPersonalInformationForm = ref({
  offerOutsourceFamilies: [],
  offerOutsourceWorks: [],
  signOfferType: '',
  shixiStartTime: '',
  shixiEndTime: '',
  signBaseMoney: '',
  signEndTime: '',
  shixiBaseMoney: '',
  faxinDay: '',
  allowance: '',
} as NewJoinerPersonalInformationFormWithPhoto);
const headPhotoDataUrl = ref<string>('');
const generatedPdfFile = ref<File | null>(null);
watch(newJoinerPersonalInformationFormTemp, (newVal) => {
  if (newVal) {
    newJoinerPersonalInformationForm.value.id = newVal.id;
    newJoinerPersonalInformationForm.value.position = newVal.positions;
    newJoinerPersonalInformationForm.value.userNameCn = newVal.userNameCn;
    newJoinerPersonalInformationForm.value.userNameEn = newVal.userNameEn;
    newJoinerPersonalInformationForm.value.idCard = newVal.idCard;
    newJoinerPersonalInformationForm.value.sex = newVal.sex;
    newJoinerPersonalInformationForm.value.phoneNumber = newVal.phoneNumber;
    newJoinerPersonalInformationForm.value.email = newVal.email;
    newJoinerPersonalInformationForm.value.city = newVal.city;
    newJoinerPersonalInformationForm.value.jobType = newVal.jobType;
    if (newVal.jobType == '兼职') {
      offerInformationForm.value.offerType = '兼职合同';
    }
    // newJoinerPersonalInformationForm.value.department = newVal.department;
    newJoinerPersonalInformationForm.value.placeOfBirth = newVal.placeOfBirth;
    newJoinerPersonalInformationForm.value.headPhoto = newVal.headPhoto;
    newJoinerPersonalInformationForm.value.ethnic = newVal.ethnic;
    newJoinerPersonalInformationForm.value.politicsStatus = newVal.politicsStatus;
    newJoinerPersonalInformationForm.value.highestStandard = newVal.highestStandard;
    newJoinerPersonalInformationForm.value.martialStatus = newVal.martialStatus;
    newJoinerPersonalInformationForm.value.healthCondition = newVal.healthCondition;
    newJoinerPersonalInformationForm.value.placeOfDomicile = newVal.placeOfDomicile;
    newJoinerPersonalInformationForm.value.censusRegister = newVal.censusRegister;
    newJoinerPersonalInformationForm.value.criminalRecord = newVal.criminalRecord;
    newJoinerPersonalInformationForm.value.emergencyContact = newVal.emergencyContact;
    newJoinerPersonalInformationForm.value.emergencyMobile = newVal.emergencyMobile;
    newJoinerPersonalInformationForm.value.emergencyRelationshiip = newVal.emergencyRelationshiip;
    newJoinerPersonalInformationForm.value.isDismissed = newVal.isDismissed;
    newJoinerPersonalInformationForm.value.dismissedReason = newVal.dismissedReason;
    newJoinerPersonalInformationForm.value.isNonCompete = newVal.isNonCompete;
    (newJoinerPersonalInformationForm.value as any).headPhoto = (newVal as any).headPhoto || '';
    newJoinerPersonalInformationForm.value.documentAddress = newVal.documentAddress;
    newJoinerPersonalInformationForm.value.livingAddress = newVal.livingAddress;
    newJoinerPersonalInformationForm.value.offerOutsourceWorks = newVal.offerOutsourceWorks;
    newJoinerPersonalInformationForm.value.offerOutsourceFamilies = newVal.offerOutsourceFamilies;

    if (!Array.isArray(newJoinerPersonalInformationForm.value.offerOutsourceFamilies) || newJoinerPersonalInformationForm.value.offerOutsourceFamilies.length === 0) {
      newJoinerPersonalInformationForm.value.offerOutsourceFamilies = [];
    }
    if (newVal.resumeId && (!Array.isArray(newJoinerPersonalInformationForm.value.offerOutsourceWorks) || newJoinerPersonalInformationForm.value.offerOutsourceWorks.length === 0)) {
      outsourceDetailStore.handleQueryWorkByResumeId(newVal.resumeId).then(res => {
        if (res.code == 1 && res.info?.length > 0) {
          newJoinerPersonalInformationForm.value.offerOutsourceWorks = res.info.map(item => ({
            startDate: `${item.startYear}/${item.startMonth.padStart(2, '0')}`,
            endDate: item.endYear != '-1' ? `${item.endYear}/${item.endMonth.padStart(2, '0')}` : '-1',
            companyName: item.companyName,
            position: item.positionName,
            demissionReason: item.demissionReason,
            personId: newJoinerPersonalInformationFormTemp.value.id,
          }));
        }
      });
    }
  }
})
const offerSignCompanyOptions = ref([
  {value: '北京博瑞智捷企业咨询有限公司', label: '北京博瑞'},
  {value: '北京我推天下信息技术有限公司', label: '北京我推'},
  {value: '锐特精英(苏州)企业咨询有限公司', label: '苏州锐特'},
])
const faXinDayOptions = ref([
  {value: '5日', label: '5日'},
  {value: '15日', label: '15日'},
  {value: '30日', label: '30日'},
  {value: '31日', label: '31日'},
])
const addFamilyMember = () => {
  newJoinerPersonalInformationForm.value.offerOutsourceFamilies.push({
    personId: newJoinerPersonalInformationFormTemp.value.id,
    relationship: '',
    name: '',
    age: '',
    companyName: '',
    position: '',
    mobile: ''
  });
}
interface OfferInformationItem {
  offerType: string;
  startTime: string;
  endTime: string;
  basicSalary: number | string;
  basicSalaryAfterRate: number;
  signingDeadline: string;
  offerSignCompany: string;
  faXinDay: string;
  allowance: string;
}
const handleStartTimeChange = (_: any, dateString: string) => {
  if (!dateString) {
    offerInformationForm.value.signingDeadline = '';
    return;
  }
  const d = dayjs(dateString);
  if (!d.isValid()) {
    offerInformationForm.value.signingDeadline = '';
    return;
  }
  offerInformationForm.value.signingDeadline = d.subtract(1, 'day').format('YYYY-MM-DD');
}
const offerInformationForm = ref({} as OfferInformationItem);
const startYMD = computed(() => {
  const s = offerInformationForm.value.startTime;
  if (!s) return { y: '', m: '', d: '' };
  const d = dayjs(s);
  if (d.isValid()) return { y: String(d.year()), m: String(d.month() + 1).padStart(2, '0'), d: String(d.date()).padStart(2, '0') };
  const m = s.match(/^(\d{4})[/-](\d{1,2})[/-](\d{1,2})$/);
  if (m) return { y: m[1], m: m[2].padStart(2, '0'), d: m[3].padStart(2, '0') };
  return { y: s, m: '', d: '' };
});
const endYMD = computed(() => {
  const s = offerInformationForm.value.endTime;
  if (!s) return { y: '', m: '', d: '' };
  const d = dayjs(s);
  if (d.isValid()) return { y: String(d.year()), m: String(d.month() + 1).padStart(2, '0'), d: String(d.date()).padStart(2, '0') };
  const m = s.match(/^(\d{4})[/-](\d{1,2})[/-](\d{1,2})$/);
  if (m) return { y: m[1], m: m[2].padStart(2, '0'), d: m[3].padStart(2, '0') };
  return { y: s, m: '', d: '' };
});
const startY = computed(() => startYMD.value.y);
const startM = computed(() => startYMD.value.m);
const startD = computed(() => startYMD.value.d);
const endY = computed(() => endYMD.value.y);
const endM = computed(() => endYMD.value.m);
const endD = computed(() => endYMD.value.d);
const signingYMD = computed(() => {
  const s = offerInformationForm.value.signingDeadline;
  if (!s) return { y: '', m: '', d: '' };
  const d = dayjs(s);
  if (d.isValid()) return { y: String(d.year()), m: String(d.month() + 1).padStart(2, '0'), d: String(d.date()).padStart(2, '0') };
  const m = s.match(/^(\d{4})[/-](\d{1,2})[/-](\d{1,2})$/);
  if (m) return { y: m[1], m: m[2].padStart(2, '0'), d: m[3].padStart(2, '0') };
  return { y: s, m: '', d: '' };
});
const signingY = computed(() => signingYMD.value.y);
const signingM = computed(() => signingYMD.value.m);
const signingD = computed(() => signingYMD.value.d);
const jobTypeOffer = ref("1");
const jobTypeOfferOptions = [
  {value: '1', label: '是'},
  {value: '2', label: '否'},
];
const jobTypeOptions = [
  {value: '兼职', label: '兼职'},
  {value: '全职', label: '全职'},
];
const offerTypeOptions = [
  { value: '全职实习合同', label: '全职实习合同' },
  { value: '兼职合同', label: '兼职合同' },
  { value: '全职劳动合同', label: '全职劳动合同' },
];
const displayName = computed(() => {
  const cn = (newJoinerPersonalInformationFormTemp.value?.userNameCn || '').trim();
  const en = (newJoinerPersonalInformationFormTemp.value?.userNameEn || '').trim();
  const parts: string[] = [];
  if (cn) parts.push(cn);
  if (en) parts.push(en);
  return parts.join('/');
});
const closeDrawer = () => {
  isShow.value = true;
  jobTypeOffer.value = '1'
  newJoinerPersonalInformationFlag.value = false;
  newJoinerPersonalInformationFormTemp.value = {} as OutsourcePersonItem;
  newJoinerPersonalInformationForm.value = {} as NewJoinerPersonalInfoItem;
  offerInformationForm.value = {} as OfferInformationItem;
}
const yulanPDF = () => {
  isShow.value = !isShow.value;
}
const generatePDFText = async() => {
  try {
    // 1. Load Font (SimHei)
    // We use a local file imported from assets.
    const fontUrl = SimHeiFontUrl;
    //const fontName = 'SimHei';

    const tryLoadArrayBuffer = async (urls: string[]): Promise<ArrayBuffer> => {
      for (const u of urls) {
        try {
          const res = await fetch(u);
          if (res.ok) {
            return await res.arrayBuffer();
          }
          const ab = await new Promise<ArrayBuffer>((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', u, true);
            xhr.responseType = 'arraybuffer';
            xhr.onload = () => {
              if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.response);
              } else {
                reject(new Error(`Failed to load font: ${xhr.status} ${xhr.statusText}`));
              }
            };
            xhr.onerror = () => reject(new Error('Network error during font loading'));
            xhr.send();
          });
          return ab;
        } catch (e) {
        }
      }
      throw new Error('All font sources failed to load');
    };
    const ab = await tryLoadArrayBuffer([fontUrl, '/simhei.ttf', '/SimHei.TTF']);
    const u8 = new Uint8Array(ab);
    const chunk = 0x8000;
    const parts: string[] = [];
    for (let i = 0; i < u8.length; i += chunk) {
      parts.push(String.fromCharCode.apply(null, Array.from(u8.subarray(i, i + chunk))));
    }
    const fontData = btoa(parts.join(''));

    // 2. Prepare Image
    if (newJoinerPersonalInformationForm.value.headPhoto && !headPhotoDataUrl.value) {
       const src = newJoinerPersonalInformationForm.value.headPhoto;
       if (src.startsWith('data:') || src.startsWith('/')) {
          headPhotoDataUrl.value = src; // Local or data URI
       } else {
          try {
             const resp = await fetch(src, { mode: 'cors' });
             const blob = await resp.blob();
             const r = new FileReader();
             headPhotoDataUrl.value = await new Promise<string>((resolve) => {
                r.onloadend = () => resolve(r.result as string);
                r.readAsDataURL(blob);
             });
          } catch (e) {
             console.warn('Failed to load image', e);
          }
       }
    }

    // 3. Create PDF
    const doc = new jsPDF();
    doc.addFileToVFS('SimHei.ttf', fontData);
    doc.addFont('SimHei.ttf', 'SimHei', 'normal');
    doc.addFont('SimHei.ttf', 'SimHei', 'bold');
    doc.addFont('SimHei.ttf', 'SimHei', 'italic');
    doc.addFont('SimHei.ttf', 'SimHei', 'bolditalic');
    doc.setFont('SimHei');
    
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 10;
    const contentWidth = pageWidth - 2 * margin;
    const colWidth = contentWidth / 24;
    let currentY = margin;

    const checkPageBreak = (height: number) => {
      if (currentY + height > pageHeight - margin) {
        doc.addPage();
        currentY = margin;
      }
    };

    // --- Helper for Offer Text ---
    const drawOfferContent = async () => {
      const type = offerInformationForm.value.offerType;
      if (!type) return;

      // Load Logo
      let logoData = '';
      try {
        // Use relative path from public/u-talent-logo.png
        // Since we are in browser environment, simple fetch should work if it is in public
        const logoRes = await fetch('/u-talent-logo.png');
        const logoBlob = await logoRes.blob();
        logoData = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(logoBlob);
        });
      } catch (e) {
         console.warn('Logo load failed', e);
      }

      if (logoData) {
          const logoWidth = 60;
          const logoHeight = 10;
          const logoX = (pageWidth - logoWidth) / 2;
          doc.addImage(logoData, 'PNG', logoX, currentY, logoWidth, logoHeight);
          currentY += 15;
      }

      doc.setFontSize(12);
      doc.setFont('SimHei', 'bold');
      doc.text('机密文件', margin, currentY + 4);
      currentY += 10;

      doc.setFont('SimHei', 'normal');
      doc.setFontSize(10);
      const nameLine = `【${displayName.value}】（有效证件号码：【${newJoinerPersonalInformationForm.value.idCard}】）`;
      doc.text(nameLine, margin, currentY + 4);
      currentY += 10;

      doc.setFontSize(18);
      doc.setFont('SimHei', 'bold');
      doc.text('录用函', pageWidth / 2, currentY + 6, { align: 'center' });
      currentY += 15;

      doc.setFontSize(10);
      doc.setFont('SimHei', 'normal');
      const intro = offerInformationForm.value.offerSignCompany+'（下称"公司"）非常乐意按以下条件和条款聘用您：';
      doc.text(intro, margin, currentY + 4);
      currentY += 10;

      const drawSectionTitle = (num: string, title: string) => {
          checkPageBreak(10);
          doc.setFont('SimHei', 'bold');
          doc.text(`${num} ${title}`, margin, currentY + 4);
          doc.setFont('SimHei', 'normal');
          currentY += 8;
      };

      const drawParagraph = (text: string, indent = false) => {
          const w = contentWidth - (indent ? 4 : 0);
          const x = margin + (indent ? 4 : 0);
          const splitText = doc.splitTextToSize(text, w);
          
          // Calculate height manually for consistency
          // 1 pt = 0.3527777778 mm
          const fontSize = doc.getFontSize();
          const lh = 1.5; // Line height factor
          const blockHeight = splitText.length * fontSize * lh * 0.3527777778; 
          
          checkPageBreak(blockHeight + 2);
          doc.text(splitText, x, currentY + 4, { lineHeightFactor: lh });
          
          currentY += blockHeight + 2;
      };

      const drawItem = (label: string, value: string) => {
         drawParagraph(`${label} ${value}`, true);
      };

      if (type === '全职实习合同') {
          drawSectionTitle('1.', '实习协议期限');
          drawParagraph(`实习协议期限自【${startY.value}】年【${startM.value}】月【${startD.value}】日（"实习协议起始日"）起至【${endY.value}】年【${endM.value}】月【${endD.value}】日止。`, true);

          drawSectionTitle('2.', '工作时间');
          drawParagraph('根据公司所订的工作日程及轮值安排，实行综合工时制。', true);

          drawSectionTitle('3.', '岗位和职责');
          drawParagraph(`3.1 您将初期受聘职位为【${newJoinerPersonalInformationForm.value.position}】。`, true);
          drawParagraph('3.2 您将履行符合公司安排或与您的工作岗位相对应的所有工作、职责与义务。', true);
          drawParagraph('3.3 您的岗位和职责可以按双方实习协议及公司规章制度调整。', true);

          drawSectionTitle('4.', '工作地点');
          drawParagraph(`您的工作地点为【${newJoinerPersonalInformationForm.value.city}】。`, true);

          drawSectionTitle('5.', '薪酬');
          drawParagraph('基本工资', true);
          drawParagraph(`您的基本工资为每月（税前）【${ offerInformationForm.value.basicSalary }】人民币；补助及津贴为每月（税前）【${ offerInformationForm.value.allowance }】人民币。`, true);

          drawSectionTitle('6.', '个人所得税');
          drawParagraph('您需承担缴纳个人所得税，公司将直接从税前工资中扣除并由指定的机构缴纳至税务部门。', true);

          drawSectionTitle('7.', '保密性条款');
          drawParagraph('您将有义务对个人薪资所得及公司规章制度所规定的或公司与您书面约定的相关保密信息保密并承诺除公司事先书面同意，不得以任何形式直接或间接向公司内部或外部人员透露相关信息。', true);

          drawSectionTitle('8.', '实习协议及其他协议');
          drawParagraph('您入职后，应按照在本公司规定的时间内，与公司签署实习协议和其他相关协议。实习协议签署后，本录用函即被实习协议所替代。本录用函于实习协议生效的同时失效。', true);
          drawParagraph('如您接受聘用并与公司签署实习协议，您于本公司的劳动关系，将于实习协议起始日立即生效。', true);

          drawSectionTitle('9.', '公司商业行为与道德规范、公司员工手册、其他规章制度和政策等');
          drawParagraph('您入职时，公司将向您提供公司商业行为与道德规范、公司员工手册等。您同意届时签收这些文件。您同意在被公司聘用期间遵守该等文件的规定。', true);

          drawSectionTitle('10.', '电子签名');
          drawParagraph('10.1 您同意采用电子签名的方式和公司签订电子实习协议和其他相关协议，并认可该等电子签名方式的法律效力受其约束。', true);
          drawParagraph('10.2 您同意根据公司要求通过公司指定的电子实习协议平台签署电子实习协议、相关协议、文件，签收公司提供的各项规章制度（包括但不限于商业行为与道德规范、员工手册及其他规章制度和政策等）及各类文件、通知，遵守公司要求的签署流程、操作、注意事项等，相关签署流程、操作指引、注意事项、查看及下载完整文本的途径等将通过该电子实习协议签约平台推送到您预留的手机号码或者电子邮箱，公司也将在电子实习协议签约平台的入口页等位置指示前述签署流程、操作指引、注意事情、查看及下载完整文本的途径等。', true);
          drawParagraph('10.3 您同意为公司有权收集、存储、使用、加工、传输、提供、公开、删除或以其他方式处理您向公司提供的与电子签名相关的个人信息。', true);

          drawSectionTitle('11.', '效力');
          drawParagraph('当出现下列情形之一时，本录用函自动失效：', true);
          drawParagraph('a.您不具备政府规定的就业资质或手续的；', true);
          drawParagraph('b.您与前用人单位未依法解除、终止劳动关系的；', true);
          drawParagraph('c.您与前用人单位存在竞业限制约定且本公司在限制范围之内的；', true);
          drawParagraph('d.您应聘过程中提供给公司的个人简历或资料系不真实、不完整或不准确的；', true);
          drawParagraph('e.您无法提供办理录用、社会保险等所需要的证明材料的；', true);
          drawParagraph('f.您存在其他不符合公司录用条件或不诚信行为的。', true);

      } else if (type === '全职劳动合同') {
          drawSectionTitle('1.', '劳动合同期限');
          drawParagraph(`劳动合同期限自【${startY.value}】年【${startM.value}】月【${startD.value}】日（"劳动合同起始日"）起至【${endY.value}】年【${endM.value}】月【${endD.value}】日止。劳动合同期满时，公司将根据实际情况决定是否续签劳动合同。`, true);

          drawSectionTitle('2.', '工作时间');
          drawParagraph('根据公司所订的工作日程及轮值安排，实行综合工时制。', true);

          drawSectionTitle('3.', '岗位和职责');
          drawParagraph(`3.1 您将初期受聘职位为【${newJoinerPersonalInformationForm.value.position}】。`, true);
          drawParagraph('3.2 您将履行符合公司安排或与您的工作岗位相对应的所有工作、职责与义务。', true);
          drawParagraph('3.3 您的岗位和职责可以按双方劳动合同及公司规章制度调整。', true);

          drawSectionTitle('4.', '工作地点');
          drawParagraph(`您的工作地点为【${newJoinerPersonalInformationForm.value.city}】。`, true);

          drawSectionTitle('5.', '薪酬');
          drawParagraph('基本工资', true);
          drawParagraph(`您的基本工资为每月（税前）【${offerInformationForm.value.basicSalary}】人民币；补助及津贴为每月（税前）【${offerInformationForm.value.allowance}】人民币；`, true);
          drawParagraph(`试用期基本工资为每月（税前）【${offerInformationForm.value.basicSalaryAfterRate}】人民币；补助及津贴为每月（税前）【${ offerInformationForm.value.allowance }】人民币。`, true);

          drawSectionTitle('6.', '福利');
          drawParagraph('公司将根据国家及本市的规定为您缴纳社会保险和公积金.您将承担其中的个人部分，相关金额将直接从每月的工资中扣除。', true);

          drawSectionTitle('7.', '个人所得税');
          drawParagraph('您需承担缴纳个人所得税，公司将直接从税前工资中扣除并由指定的机构缴纳至税务部门。', true);

          drawSectionTitle('8.', '保密性条款');
          drawParagraph('您将有义务对个人薪资所得及公司规章制度所规定的或公司与您书面约定的相关保密信息保密并承诺除公司事先书面同意，不得以任何形式直接或间接向公司内部或外部人员透露相关信息。', true);

          drawSectionTitle('9.', '劳动合同及其他协议');
          drawParagraph('您入职后，应按照在本公司规定的时间内，与公司签署劳动合同和其他相关协议。劳动合同签署后，本录用函即被劳动合同所替代。本录用函于劳动合同生效的同时失效。', true);
          drawParagraph('如您接受聘用并与公司签署劳动合同，您于本公司的劳动关系，将于劳动合同起始日立即生效。', true);

          drawSectionTitle('10.', '公司商业行为与道德规范、公司员工手册、其他规章制度和政策等');
          drawParagraph('您入职时，公司将向您提供公司商业行为与道德规范、公司员工手册等。您同意届时签收这些文件。您同意在被公司聘用期间遵守该等文件的规定。', true);

          drawSectionTitle('11.', '电子签名');
          drawParagraph('11.1 您同意采用电子签名的方式和公司签订电子劳动合同和其他相关协议，并认可该等电子签名方式的法律效力受其约束。', true);
          drawParagraph('11.2 您同意根据公司要求通过公司指定的电子劳动合同平台签署电子劳动合同、相关协议、文件，签收公司提供的各项规章制度（包括但不限于商业行为与道德规范、员工手册及其他规章制度和政策等）及各类文件、通知，遵守公司要求的签署流程、操作、注意事项等，相关签署流程、操作指引、注意事项、查看及下载完整文本的途径等将通过该电子劳动合同签约平台推送到您预留的手机号码或者电子邮箱，公司也将在电子劳动合同签约平台的入口页等位置指示前述签署流程、操作指引、注意事情、查看及下载完整文本的途径等。', true);
          drawParagraph('11.3 您同意为公司有权收集、存储、使用、加工、传输、提供、公开、删除或以其他方式处理您向公司提供的与电子签名相关的个人信息。', true);

          drawSectionTitle('12.', '效力');
          drawParagraph('当出现下列情形之一时，本录用函自动失效：', true);
          drawParagraph('a.您不具备政府规定的就业资质或手续的；', true);
          drawParagraph('b.您与前用人单位未依法解除、终止劳动关系的；', true);
          drawParagraph('c.您与前用人单位存在竞业限制约定且本公司在限制范围之内的；', true);
          drawParagraph('d.您应聘过程中提供给公司的个人简历或资料系不真实、不完整或不准确的；', true);
          drawParagraph('e.您无法提供办理录用、社会保险等所需要的证明材料的；', true);
          drawParagraph('f.您存在其他不符合公司录用条件或不诚信行为的。', true);

      } else if (type === '兼职合同') {
          drawSectionTitle('1.', '非全日制用工合同期限');
          drawParagraph(`非全日制用工合同期限自【${startY.value}】年【${startM.value}】月【${startD.value}】日（"非全日制用工合同起始日"）起。`, true);

          drawSectionTitle('2.', '工作时间');
          drawParagraph('根据公司所订的工作日程及轮值安排，实行不定时工时制。', true);

          drawSectionTitle('3.', '岗位和职责');
          drawParagraph(`3.1 您将初期受聘职位为【${newJoinerPersonalInformationForm.value.position}】。`, true);
          drawParagraph('3.2 您将履行符合公司安排或与您的工作岗位相对应的所有工作、职责与义务。', true);
          drawParagraph('3.3 您的岗位和职责可以按双方非全日制用工合同及公司规章制度调整。', true);

          drawSectionTitle('4.', '工作地点');
          drawParagraph(`您的工作地点为【${newJoinerPersonalInformationForm.value.city}】。`, true);

          drawSectionTitle('5.', '薪酬');
          drawParagraph(`a. 您的工资（即劳动报酬）为 ${offerInformationForm.value.basicSalary}，每月${offerInformationForm.value.faXinDay}为发薪日，以人民币形式支付上月工资。`, true);
          drawParagraph('b. 公司不承担您的任何劳保福利待遇，并且不负责承担您的社会保险费用。', true);

          drawSectionTitle('6.', '个人所得税');
          drawParagraph('您需承担缴纳个人所得税，公司将直接从税前工资中扣除并由指定的机构缴纳至税务部门。', true);

          drawSectionTitle('7.', '保密性条款');
          drawParagraph('您将有义务对个人薪资所得及公司规章制度所规定的或公司与您书面约定的相关保密信息保密并承诺除公司事先书面同意，不得以任何形式直接或间接向公司内部或外部人员透露相关信息。', true);

          drawSectionTitle('8.', '非全日制用工合同及其他协议');
          drawParagraph('您入职后，应按照在本公司规定的时间内，与公司签署非全日制用工合同和其他相关协议。非全日制用工合同签署后，本录用函即被非全日制用工合同所替代。本录用函于非全日制用工合同生效的同时失效。', true);
          drawParagraph('如您接受聘用并与公司签署非全日制用工合同，您于本公司的劳动关系，将于非全日制用工合同起始日立即生效。', true);

          drawSectionTitle('9.', '公司商业行为与道德规范、公司员工手册、其他规章制度和政策等');
          drawParagraph('您入职时，公司将向您提供公司商业行为与道德规范、公司员工手册等。您同意届时签收这些文件。您同意在被公司聘用期间遵守该等文件的规定。', true);

          drawSectionTitle('10.', '电子签名');
          drawParagraph('10.1 您同意采用电子签名的方式和公司签订电子非全日制用工合同和其他相关协议，并认可该等电子签名方式的法律效力受其约束。', true);
          drawParagraph('10.2 您同意根据公司要求通过公司指定的电子非全日制用工合同平台签署电子非全日制用工合同、相关协议、文件，签收公司提供的各项规章制度（包括但不限于商业行为与道德规范、员工手册及其他规章制度和政策等）及各类文件、通知，遵守公司要求的签署流程、操作、注意事项等，相关签署流程、操作指引、注意事项、查看及下载完整文本的途径等将通过该电子非全日制用工合同签约平台推送到您预留的手机号码或者电子邮箱，公司也将在电子非全日制用工合同签约平台的入口页等位置指示前述签署流程、操作指引、注意事情、查看及下载完整文本的途径等。', true);
          drawParagraph('10.3 您同意为公司有权收集、存储、使用、加工、传输、提供、公开、删除或以其他方式处理您向公司提供的与电子签名相关的个人信息。', true);

          drawSectionTitle('11.', '效力');
          drawParagraph('当出现下列情形之一时，本录用函自动失效：', true);
          drawParagraph('a.您不具备政府规定的就业资质或手续的；', true);
          drawParagraph('b.您与前用人单位存在竞业限制约定且本公司在限制范围之内的；', true);
          drawParagraph('c.您应聘过程中提供给公司的个人简历或资料系不真实、不完整或不准确的；', true);
          drawParagraph('d.您存在其他不符合公司录用条件或不诚信行为的。', true);
      }
      
      currentY += 10;
      drawParagraph(`如接受聘用，请于【${signingY.value}】年【${signingM.value}】月【${signingD.value}】日前签署。签署本录用函即代表您已仔细阅读、了解、确认和同意以上各项条款及条件并接受聘用；在此日期前未签署本录用函，本录用函自动失效。`);
      
      currentY += 5;
      drawParagraph('如有任何疑问，请致电本公司人力资源部');
      drawParagraph('联系人：Mona Xu');
      drawParagraph('联系电话：+86 13132239531');
      drawParagraph('电子邮箱：mona.xu@utalent.cn');
      
      currentY += 10;
      doc.text('员工签名：', margin, currentY + 4);
      currentY += 10;
      doc.line(margin, currentY, margin + 60, currentY); // Underline
      
      currentY += 8;
      doc.text(`姓名：${displayName.value}`, margin, currentY + 4);
      currentY += 8;
      doc.text(`日期：${dayjs().format('YYYY-MM-DD')}`, margin, currentY + 4);

      // Start new page for next form
      doc.addPage();
      currentY = margin;
    };

    if (offerInformationForm.value.offerType && jobTypeOffer.value == '1') {
       await drawOfferContent();
    }

    const drawRow = (items: { text?: string, span: number, align?: 'left' | 'center', fontSize?: number, isImage?: boolean, imageUrl?: string, rowSpan?: number, skip?: boolean }[], minHeight = 10, fixedHeight?: number) => {
      let maxHeight = fixedHeight ?? minHeight;
      if (!fixedHeight) {
        items.forEach(item => {
          if (!item.isImage && item.text && !item.skip) {
            doc.setFontSize(item.fontSize || 9);
            const w = item.span * colWidth;
            const textDims = doc.getTextDimensions(item.text, { maxWidth: w - 2 });
            const h = textDims.h + 4;
            if (h > maxHeight) maxHeight = h;
          }
        });
      }

      checkPageBreak(maxHeight);

      let currentX = margin;
      items.forEach(item => {
        const w = item.span * colWidth;
        let h = maxHeight;
        if (item.rowSpan && item.rowSpan > 1) {
            h = maxHeight * item.rowSpan;
        }

        if (!item.skip) {
            doc.setDrawColor(230, 230, 230);
            doc.setLineWidth(0.02);
            doc.rect(currentX, currentY, w, h);

            if (item.isImage && item.imageUrl) {
                try {
                  const iw = Math.max(0, w - 2);
                  const ih = Math.max(0, h - 2);
                  const xImg = currentX + (w - iw) / 2;
                  const yImg = currentY + (h - ih) / 2;
                  doc.addImage(item.imageUrl, 'JPEG', xImg, yImg, iw, ih);
                } catch (e) {
                }
            } else if (item.text) {
                doc.setFontSize(item.fontSize || 9);
                const textDims = doc.getTextDimensions(item.text, { maxWidth: w - 2 });
                const tx = item.align === 'center' ? currentX + w / 2 : currentX + 1;
                const ty = currentY + (h - textDims.h) / 2;
                const align = item.align || 'left';
                doc.text(item.text, tx, ty, { maxWidth: w - 2, align: align as any, baseline: 'top' });
            }
        }
        currentX += w;
      });
      currentY += maxHeight;
    };

    const drawHeader = (text1: string, text2?: string) => {
        checkPageBreak(20);
        doc.setFontSize(14);
        doc.setFont('SimHei', 'bold');
        doc.text(text1, pageWidth / 2, currentY + 5, { align: 'center' });
        if (text2) {
             doc.text(text2, pageWidth / 2, currentY + 12, { align: 'center' });
             currentY += 18;
        } else {
             currentY += 10;
        }
        doc.setFont('SimHei', 'normal');
    };
    
    const drawSectionHeader = (en: string, cn: string) => {
        checkPageBreak(15);
        doc.setFillColor(204, 204, 204);
        doc.rect(margin, currentY, contentWidth, 12, 'F');
        doc.setFontSize(10);
        doc.setFont('SimHei', 'bold');
        doc.text(en, pageWidth / 2, currentY + 4, { align: 'center' });
        doc.text(cn, pageWidth / 2, currentY + 9, { align: 'center' });
        doc.setFont('SimHei', 'normal');
        currentY += 12;
    };

    // --- Content Generation ---
    const f = newJoinerPersonalInformationForm.value;
    
    // Header
    drawHeader('New Joiner Personal Information Form', '新员工个人信息登记表');

    // Section 1
    drawSectionHeader('Basic Information', '员工基本情况');

    doc.setFontSize(9);
    const rowHeightStd = (() => {
      const w = 4 * colWidth;
      const td = doc.getTextDimensions('English Name\n英文名', { maxWidth: w - 2 });
      return td.h + 4;
    })();

    // Row 1
    drawRow([
        { text: 'Name\n姓名', span: 4 },
        { text: f.userNameCn, span: 3, align: 'center' },
        { text: 'ID\n身份证号码', span: 3 },
        { text: f.idCard, span: 4, align: 'center' },
        { text: 'Gender\n性别', span: 4 },
        { text: f.sex, span: 2, align: 'center' },
        { isImage: true, imageUrl: headPhotoDataUrl.value || f.headPhoto, span: 4, rowSpan: 4 }
    ], rowHeightStd, rowHeightStd);

    // Row 2
    drawRow([
        { text: 'English Name\n英文名', span: 4 },
        { text: f.userNameEn, span: 3, align: 'center' },
        { text: 'Place of Birth\n国籍', span: 3 },
        { text: f.placeOfBirth, span: 4, align: 'center' },
        { text: 'Ethnic\n民族', span: 4 },
        { text: f.ethnic, span: 2, align: 'center' },
        { text: '', span: 4, skip: true }
    ], rowHeightStd, rowHeightStd);

    // Row 3
    drawRow([
        { text: 'Mobile\n手机号码', span: 4 },
        { text: f.phoneNumber, span: 3, align: 'center' },
        { text: 'E-mail\n邮箱地址', span: 3 },
        { text: f.email, span: 4, align: 'center' },
        { text: 'Politics Status\n政治面貌', span: 4 },
        { text: f.politicsStatus, span: 2, align: 'center' },
        { text: '', span: 4, skip: true }
    ], rowHeightStd, rowHeightStd);

    // Row 4
    drawRow([
        { text: 'Highest Standard Attained\n最高学历', span: 4 },
        { text: f.highestStandard, span: 3, align: 'center' },
        { text: 'Martial Status\n婚姻状况', span: 3 },
        { text: f.martialStatus, span: 4, align: 'center' },
        { text: 'Health Condition\n健康状况', span: 4 },
        { text: f.healthCondition, span: 2, align: 'center' },
        { text: '', span: 4, skip: true }
    ], rowHeightStd, rowHeightStd);

    // Row 5
    drawRow([
        { text: 'Place of Domicile\n户籍地', span: 4 },
        { text: f.placeOfDomicile, span: 3, align: 'center' },
        { text: 'Census Register\n户口类型', span: 3 },
        { text: f.censusRegister, span: 4, align: 'center' },
        { text: 'If has a criminal record\n是否有过犯罪记录', span: 4 },
        { text: f.criminalRecord, span: 6, align: 'center' }
    ]);

    // Row 6
    drawRow([
        { text: 'Emergency Contact\n紧急联络人', span: 4 },
        { text: f.emergencyContact, span: 3, align: 'center' },
        { text: 'Emergency Contact No.\n紧急联络人联系方式', span: 4 },
        { text: f.emergencyMobile, span: 3, align: 'center' },
        { text: 'Relationship with the emergency contact\n与紧急联系人的关系', span: 4 },
        { text: f.emergencyRelationshiip, span: 6, align: 'center' }
    ]);

    // Row 7
    drawRow([
        { text: 'Whether to be dismissed from the previous company\n是否被前单位除名/辞退', span: 11 },
        { text: f.isDismissed, span: 3, align: 'center' },
        { text: 'If YES, please list the reason\n如选是请告知原因', span: 4 },
        { text: f.dismissedReason, span: 6, align: 'center' }
    ]);

    // Row 8
    drawRow([
        { text: 'Did you sign a non-compete agreement with your previous employer\n是否与前工作单位签署竞业限制协议', span: 11 },
        { text: f.isNonCompete, span: 13, align: 'center' }
    ]);

    // Row 9
    drawRow([
        { text: 'Address in Document\n户籍/身份证地址', span: 4 },
        { text: f.documentAddress, span: 20, align: 'center' }
    ]);

    // Row 10
    drawRow([
        { text: 'Current Living Address\n本市联系/居住地址', span: 4 },
        { text: f.livingAddress, span: 20, align: 'center' }
    ]);

    // Section 2
    drawSectionHeader('Work Experience', '工作经历（从最近服务单位倒叙至以前单位的方式填写）');

    // Header
    drawRow([
        { text: 'Start/End Date\n起止年月', span: 4, align: 'center' },
        { text: 'Company Name\n公司名称', span: 7, align: 'center' },
        { text: 'Position\n担任职务', span: 7, align: 'center' },
        { text: 'Demission Reason\n离职原因', span: 6, align: 'center' }
    ]);

    // Data
    if (f.offerOutsourceWorks && f.offerOutsourceWorks.length) {
        f.offerOutsourceWorks.forEach(item => {
            const dateStr = `${item.startDate} - ${item.endDate == '-1' ? '至今' : item.endDate}`;
            drawRow([
                { text: dateStr, span: 4, align: 'center' },
                { text: item.companyName, span: 7, align: 'center' },
                { text: item.position, span: 7, align: 'center' },
                { text: item.demissionReason, span: 6, align: 'center' }
            ]);
        });
    } else {
         // Empty row
         drawRow([{ text: '', span: 4 }, { text: '', span: 7 }, { text: '', span: 7 }, { text: '', span: 6 }]);
    }
    if (f.offerOutsourceFamilies && f.offerOutsourceFamilies.length &&  f.jobType == '全职') {
      // Section 3
    drawSectionHeader('Family Situation and Major Social Relations', '家庭情况及主要社会关系(至少填写一位)');
    // Header
    drawRow([
        { text: 'Relationship\n称谓', span: 3, align: 'center' },
        { text: 'Name\n姓名', span: 3, align: 'center' },
        { text: 'Age\n年龄', span: 3, align: 'center' },
        { text: 'Company Name\n工作单位', span: 8, align: 'center' },
        { text: 'Position\n职位/职务', span: 3, align: 'center' },
        { text: 'Contact No.\n联系方式', span: 4, align: 'center' }
    ]);
    // Data
    if (f.offerOutsourceFamilies && f.offerOutsourceFamilies.length) {
        f.offerOutsourceFamilies.forEach(item => {
            drawRow([
                { text: item.relationship, span: 3, align: 'center' },
                { text: item.name, span: 3, align: 'center' },
                { text: item.age, span: 3, align: 'center' },
                { text: item.companyName, span: 8, align: 'center' },
                { text: item.position, span: 3, align: 'center' },
                { text: item.mobile, span: 4, align: 'center' }
            ]);
        });
    } else {
        drawRow([{ text: '', span: 3 }, { text: '', span: 3 }, { text: '', span: 3 }, { text: '', span: 8 }, { text: '', span: 3 }, { text: '', span: 4 }]);
    }
    }
    // Auth Text
    checkPageBreak(30);
    doc.setFontSize(8);
    const authTextEn = "I hereby authorize U-Talent, ltd and its all subsidiaries or third parties to investigate the relevant information that I have provided in connection with my form for background check is true and complete. Any falsification of information (or any omission of relevant information)of any fact resulted in disqualified for the position, I am willing to assume all the related responsibility. and I waive all claims against such organizations and/or persons for legal liabilities which may occur during the disclosure.";
    const authTextCn = "本人特此授权"+offerInformationForm.value.offerSignCompany+"及其所有关联公司或第三方对我在本表中提供的相关信息进行调查，确认其真实完整。如果有任何虚假信息（或有关事实的遗漏）导致我不能担任该职位，本人愿意承担相关责任。本人放弃对上述组织和/或个人产生的披露过程中可能出现的法律责任提出的任何索赔。以上信息如有变更，本人将在第一时间告知人力资源部，如有违反，一切后果由本人承担。本人已阅读公司管理制度及部门相关制度，并严格遵守执行。此登记表作为劳动合同附件，与劳动合同具有同等法律效力。";
    
    // Use splitTextToSize
    const splitEn = doc.splitTextToSize(authTextEn, contentWidth);
    doc.text(splitEn, margin, currentY + 4);
    currentY += doc.getTextDimensions(splitEn).h + 6;
    
    const splitCn = doc.splitTextToSize(authTextCn, contentWidth);
    doc.text(splitCn, margin, currentY + 4);
    currentY += doc.getTextDimensions(splitCn).h + 6;
    
    // Signature
    drawRow([
        { text: 'Signature\n签名：', span: 4, align: 'left' },
        { text: '', span: 10 },
        { text: 'Date of Filling\n填表日期：', span: 4, align: 'left' },
        { text: dayjs().format('YYYY-MM-DD'), span: 6, align: 'center' }
    ], 20);

    //doc.save(`新员工个人信息登记表_${f.userNameCn || ''}.pdf`);
    return doc.output('blob');
  } catch (e) {
    console.error(e);
    message.error('PDF Generation Failed: ' + (e as any).message);
  }
}
const generatePDF = async () => {
  console.log(newJoinerPersonalInformationForm.value);
  isShow.value = false;
  isloading.value = true;
  newJoinerPersonalInformationForm.value.signOfferType = offerInformationForm.value.offerType;
  newJoinerPersonalInformationForm.value.shixiStartTime = offerInformationForm.value.startTime;
  newJoinerPersonalInformationForm.value.shixiEndTime = offerInformationForm.value.endTime;
  newJoinerPersonalInformationForm.value.signBaseMoney = offerInformationForm.value.basicSalary?.toString() || '';
  newJoinerPersonalInformationForm.value.signEndTime = offerInformationForm.value.signingDeadline;
  newJoinerPersonalInformationForm.value.shixiBaseMoney = offerInformationForm.value.basicSalaryAfterRate?.toString() || '';
  newJoinerPersonalInformationForm.value.faxinDay = offerInformationForm.value.faXinDay || '';
  newJoinerPersonalInformationForm.value.allowance = offerInformationForm.value.allowance || '';
  outsourceDetailStore.updateOutsourcePersonMsg(newJoinerPersonalInformationForm.value).then(async (res) => {
    if (res.code == 1) {
      await nextTick();
      const blob = await generatePDFText();
      const filename = `新员工个人信息登记表_${newJoinerPersonalInformationForm.value.userNameCn || ''}.pdf`;
      generatedPdfFile.value = new File([blob], filename, { type: 'application/pdf' });
      outsourceDetailStore.uploadMessageEsignFile(generatedPdfFile.value).then((res) => {
        if (res.code == 1) {
          outsourceDetailStore.personMessageEsign({
            personId: newJoinerPersonalInformationForm.value.id,
            createTime: dayjs().format('YYYY-MM-DD'),
            idCard: newJoinerPersonalInformationForm.value.idCard || '',
            realNameCn: newJoinerPersonalInformationForm.value.userNameCn,
            phoneNum:  newJoinerPersonalInformationForm.value.phoneNumber || '',
            pdfUrl: res.info.pdfUrl,
            ruCompanyName: offerInformationForm.value.offerSignCompany,
            fileName: filename,
            fileSize: generatedPdfFile.value?.size || '',
          }).then((res) => {
            if (res.code == 1) {
              isloading.value = false;
              closeDrawer();
              message.success('更新外包人员信息表成功');
            } else {
              message.error('更新外包人员信息表失败');
              isloading.value = false;
            }
          });
        } else {
          message.error('更新外包人员信息表失败');
          isloading.value = false;
        }
      });
    } else {
      message.error('更新外包人员个人信息表失败');
      isloading.value = false;
    }
  });
};
</script>

<style lang="less" scoped>
  .personalInfoOfferForm {
    padding: 20px 40px;
  }
  #personalInfoFormInfo,
  #personalInfoForm {
    padding: 20px 40px;
  }
 .personalInfoHeader {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
}
 .personalInfoBasicHeader {
  font-weight: bold;
  text-align: center;
  background-color: #ccc;
  line-height: 1.6;
  padding-bottom: 3px;
}

 .personalInfoContent {
  align-content: center;
  padding-bottom: 3px;
}
.personalInfoAllBorder {
  border: 1px solid #ccc;
  line-height: 1.6;
  padding-bottom: 3px;
}
.personalInfoTopBorder {
  border-top: 1px solid #ccc;
  line-height: 1.6;
  padding-bottom: 3px;
}
.personalInfoLeftBorder {
  border-left: 1px solid #ccc;
  line-height: 1.6;
  padding-bottom: 3px;
}
.personalInfoRightBorder {
  border-right: 1px solid #ccc;
  line-height: 1.6;
  padding-bottom: 3px;
}
.personalInfoBottomBorder {
  border-bottom: 1px solid #ccc;
  line-height: 1.6;
  padding-bottom: 3px;
}
.personalInfoTwoBorder {
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  line-height: 1.6;
  padding-bottom: 3px;
}
.personalInfoThreeTopBorder {
  border-right: 1px solid #ccc;
  border-left: 1px solid #ccc;
  border-top: 1px solid #ccc;
  line-height: 1.6;
  padding-bottom: 3px;
}
.personalInfoThreeBottomBorder {
  border-right: 1px solid #ccc;
  border-left: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  line-height: 1.6;
  padding-bottom: 3px;
}
.personalInfoCenter {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 3px;
}
.personalInfoPhotoCol {
  display: flex;
  align-items: center;
  justify-content: center;
}
.no-border-input {
  border: none;
  outline: none;
  width: 100%;
  padding: 0;
  background: transparent;  font-size: 14px; /* 设置输入文字的字体大小 */
  height: 100%;
  line-height: 1.6;
}

/* 设置placeholder的字体大小 */
.no-border-input::placeholder {
  font-size: 14px; /* 设置placeholder的字体大小，比输入文字稍小 */
  color: #999; /* 可选：调整placeholder的颜色，使其更不显眼 */
}

/* 兼容不同浏览器的placeholder样式 */
.no-border-input::-webkit-input-placeholder {
  font-size: 14px;
  color: #999;
}

.no-border-input::-moz-placeholder {
  font-size: 14px;
  color: #999;
}

.no-border-input:-ms-input-placeholder {
  font-size: 14px;
  color: #999;
}

.no-border-input:-moz-placeholder {
  font-size: 14px;
  color: #999;
}
:deep(.personalInfoContent .ant-select-single:not(.ant-select-customize-input) .ant-select-selector) {
  border: unset;
  padding: 0;
}
.offerHeader {
  font-size: 18px;
  font-weight: 700;
  text-align: center;
}
.offerOne {
  font-size: 14px;
  font-weight: 700;
  line-height: 1.8
}
:deep(.offerContent) {
  font-size: 14px;
  line-height: 1.8;
}
.offerTitle {
  font-size: 18px;
  text-align: center;
}
.offerSpanRight {
  padding-right: 14px;
}
.offerSpanLeft {
  padding-left: 26px;
  position: relative;
}
.offerSpanLeftCenter {
  position: absolute;
  left: 0px;
}
.offerSpanRightPoint {
  padding-right: 9px;
}
.offerSpanRightPointOne {
  padding-right: 7px;
}
.offerContentMargin {
  margin-top: 15px;
  margin-bottom: 15px;
}
.offerContentMarginBottom {
  margin-bottom: 15px;
}
.offerContentBorderBottom {
  border-bottom: 2px solid #ccc;
}
.personalInfoPhotoCol {
  position: relative;
  padding: 0px !important;
}
.personalInfoPhoto {
  position: absolute;
  width: 100%;
  top: 18%;
}
.personalInfoCenterBottom {
  line-height: 2;
  font-weight: bold;
  display: flex;
  align-items: end;
}
.personalInfoCenterFamilyBottom {
  line-height: 2;
  display: flex;
  align-items: center;
}
</style>
