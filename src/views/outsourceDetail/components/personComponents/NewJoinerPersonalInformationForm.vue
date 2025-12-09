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
      <a-row :gutter="24" class="personalInfoHeader personalInfoThreeTopBorder">
        <a-col :span="24">
          New Joiner Personal Information Form
        </a-col>
      </a-row>
      <a-row :gutter="24" class="personalInfoHeader personalInfoThreeBottomBorder" style="border-bottom: unset;">
        <a-col :span="24">
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
        <a-col :span="3" class="personalInfoRightBorder"></a-col>
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
        <a-col :span="3" class="personalInfoTwoBorder">
          Emergency Contact No.<br/>
          紧急联络人联系方式
        </a-col>
        <a-col :span="4" class="personalInfoContent personalInfoTwoBorder">
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
        <a-col :span="10" class="personalInfoThreeBottomBorder" style="display: flex;align-items: center;">
          Whether to be dismissed from the previous company<br/>
          是否被前单位除名/辞退
        </a-col>
        <a-col :span="4" class="personalInfoContent personalInfoTwoBorder">
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
        <a-col :span="10" class="personalInfoThreeBottomBorder">
          Did you sign a non-compete agreement with your previous employer<br/>
          是否与前工作单位签署竞业限制协议
        </a-col>
        <a-col :span="14" class="personalInfoContent personalInfoTwoBorder">
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

      <a-row :gutter="24" class="personalInfoBasicHeader">
        <a-col :span="24">
          Family Situation and Major Social Relations
        </a-col>
      </a-row>
      <a-row :gutter="24" class="personalInfoBasicHeader">
        <a-col :span="24">
          家庭情况及主要社会关系
        </a-col>
      </a-row>

      <a-row :gutter="24">
        <a-col :span="3" class="personalInfoContent personalInfoThreeBottomBorder personalInfoCenter">
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
      <a-row :gutter="24" v-for="(item, index) in newJoinerPersonalInformationForm.offerOutsourceFamilies" :key="index">
        <a-col :span="3" class="personalInfoThreeBottomBorder personalInfoCenter">
          <a-select v-model:value="item.relationship" name="relationship" style="width: 100%;">
            <a-select-option value="Father 父亲">Father 父亲</a-select-option>
            <a-select-option value="Mother 母亲">Mother 母亲</a-select-option>
            <a-select-option value="Spouse 配偶">Spouse 配偶</a-select-option>
          </a-select>
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          <input v-model="item.name" name="name" placeholder="请输入姓名" class="no-border-input"/>
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
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
<br/>本人特此授权本人授权北京博瑞智捷企业咨询有限公司及其所有关联公司或第三方对我在本表中提供的相关信息进行调查，确认其真实完整。如果有任何虚假信息（或有关事实的遗漏）导致我不能担任该职位，本人愿意承担相关责任。本人放弃对上述组织和/或个人产生的披露过程中可能出现的法律责任提出的任何索赔。以上信息如有变更，本人将在第一时间告知人力资源部，如有违反，一切后果由本人承担。本人已阅读公司管理制度及部门相关制度，并严格遵守执行。此登记表作为劳动合同附件，与劳动合同具有同等法律效力。
        </a-col>
      </a-row>
      <a-row :gutter="24" class="personalInfoThreeBottomBorder">
       <a-col :span="2" style="font-weight: bold;">Signature<br/>签名：</a-col>
       <a-col :span="10"></a-col>
        <a-col :span="3" style="font-weight: bold;">Date of Filling<br/>填表日期：</a-col>
       <a-col :span="9"></a-col>
      </a-row>
      <!-- OFFER文件相关 -->
      <a-row :gutter="24" class="personalInfoHeader" style="margin-top: 24px;">
        <a-col :span="24">
          OFFER文件相关
        </a-col>
      </a-row>
      <a-row :gutter="24" style="margin-top: 12px;">
        <a-col :span="12">
          <a-form-item label="OFFER类型" :label-col="labelCol" :rules="[{ required: true, message: '请选择OFFER类型' }]">
            <a-select v-model:value="offerInformationForm.offerType" name="offerType" :options="offerTypeOptions" placeholder="请选择OFFER类型"></a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <div v-if="offerInformationForm.offerType == '全职实习合同'">
      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-item label="实习开始" :label-col="labelCol" :rules="[{ required: true, message: '请选择实习开始' }]">
            <a-date-picker
                v-model:value="offerInformationForm.startTime"
                value-format="YYYY-MM-DD"
                placeholder="请选择实习开始"
              />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="实习结束" :rules="[{ required: true, message: '请选择实习结束' }]">
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
          <a-form-item label="签署截止" :rules="[{ required: true, message: '请选择签署截止' }]">
            <a-date-picker
                v-model:value="offerInformationForm.signingDeadline"
                value-format="YYYY-MM-DD"
                placeholder="请选择签署截止"
              />
          </a-form-item>
        </a-col>
      </a-row>
     </div>
     <div v-if="offerInformationForm.offerType == '全职劳动合同'">
      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-item label="开始时间" :label-col="labelCol" :rules="[{ required: true, message: '请选择开始时间' }]">
            <a-date-picker
                v-model:value="offerInformationForm.startTime"
                value-format="YYYY-MM-DD"
                placeholder="请选择开始时间"
              />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="结束时间" :rules="[{ required: true, message: '请选择结束时间' }]">
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
          <a-form-item label="试用薪资" :rules="[{ required: true, message: '请输入试用薪资' }]">
            <a-input-number v-model:value="offerInformationForm.basicSalaryAfterRate" name="basicSalaryAfterRate" placeholder="请输入试用薪资" style="width: 100%;"/>
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
     <div v-if="offerInformationForm.offerType == '兼职合同'">
      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-item label="合同开始" :label-col="labelCol" :rules="[{ required: true, message: '请选择合同开始' }]">
            <a-date-picker
                v-model:value="offerInformationForm.startTime"
                value-format="YYYY-MM-DD"
                placeholder="请选择合同开始"
              />
          </a-form-item>
        </a-col>
       <a-col :span="12">
          <a-form-item label="签署截止" :rules="[{ required: true, message: '请选择签署截止' }]">
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
        <a-row :gutter="24" style="margin-top: 15px;margin-bottom: 15px;">
          <a-col :span="24" class="offerHeader">
            U-TALENT
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
            北京博瑞智捷企业咨询有限公司（下称"公司"）非常乐意按以下条件和条款聘用您：
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
            <span class='offerSpanLeft'>您的基本工资为每月（税前）【{{ offerInformationForm.basicSalary }}】人民币。</span>
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
          <a-col :span="24" class="offerContent">
            <div>如接受聘用，请于【{{ signingY }}】年【{{ signingM }}】月【{{ signingD }}】日前签署。签署本录用函即代表您已仔细阅读、了解、确认和同意以上各项条款及条件并接受聘用；在此日期前未签署本录用函，本录用函自动失效。</div>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div>如有任何疑问，请致电本公司人力资源部</div>
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
          <a-col :span="24" class="offerContent">
            <div>电子邮箱：mona.xu@utalent.cn</div>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div>员工签名：</div>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24">
            <div>&nbsp;</div>
          </a-col>
        </a-row>
         <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div>姓名：{{ displayName }}</div>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div>日期：{{ dayjs().format('YYYY-MM-DD') }}</div>
          </a-col>
        </a-row>
      </div>
      <div v-if="offerInformationForm.offerType == '全职劳动合同'">
        <a-row :gutter="24" style="margin-top: 15px;margin-bottom: 15px;">
          <a-col :span="24" class="offerHeader">
            U-TALENT
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
            北京博瑞智捷企业咨询有限公司（下称"公司"）非常乐意按以下条件和条款聘用您：
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
            <span class='offerSpanLeft'>您的基本工资为每月（税前）【{{ offerInformationForm.basicSalary }}】人民币；试用期基本工资为每月（税前）【{{ offerInformationForm.basicSalaryAfterRate }}】人民币。</span>
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
          <a-col :span="24" class="offerContent">
            <div>如接受聘用，请于【{{ signingY }}】年【{{ signingM }}】月【{{ signingD }}】日前签署。签署本录用函即代表您已仔细阅读、了解、确认和同意以上各项条款及条件并接受聘用；在此日期前未签署本录用函，本录用函自动失效。</div>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div>如有任何疑问，请致电本公司人力资源部</div>
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
          <a-col :span="24" class="offerContent">
            <div>电子邮箱：mona.xu@utalent.cn</div>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div>员工签名：</div>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24">
            <div>&nbsp;</div>
          </a-col>
        </a-row>
         <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div>姓名：{{ displayName }}</div>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div>日期：{{ dayjs().format('YYYY-MM-DD') }}</div>
          </a-col>
        </a-row>
      </div>
      <div v-if="offerInformationForm.offerType == '兼职合同'">
        <a-row :gutter="24" style="margin-top: 15px;margin-bottom: 15px;">
          <a-col :span="24" class="offerHeader">
            U-TALENT
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
            北京博瑞智捷企业咨询有限公司（下称"公司"）非常乐意按以下条件和条款聘用您：
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
            <span class='offerSpanLeft'>a.您的工资（即劳动报酬）为 35 元/小时，每月 15 日为发薪日，以人民币形式支付上月工资。</span>
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
          <a-col :span="24" class="offerContent">
            <div>如接受聘用，请于【{{ signingY }}】年【{{ signingM }}】月【{{ signingD }}】日前签署。签署本录用函即代表您已仔细阅读、了解、确认和同意以上各项条款及条件并接受聘用；在此日期前未签署本录用函，本录用函自动失效。</div>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div>如有任何疑问，请致电本公司人力资源部</div>
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
          <a-col :span="24" class="offerContent">
            <div>电子邮箱：mona.xu@utalent.cn</div>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div>员工签名：</div>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24">
            <div>&nbsp;</div>
          </a-col>
        </a-row>
         <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div>姓名：{{ displayName }}</div>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" class="offerContent">
            <div>日期：{{ dayjs().format('YYYY-MM-DD') }}</div>
          </a-col>
        </a-row>
      </div>
      <div id="personalInfoOfferForm">
      <a-row :gutter="24" class="personalInfoHeader personalInfoThreeTopBorder">
        <a-col :span="24">
          New Joiner Personal Information Form
        </a-col>
      </a-row>
      <a-row :gutter="24" class="personalInfoHeader personalInfoThreeBottomBorder" style="border-bottom: unset;">
        <a-col :span="24">
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
        <a-col :span="3" class="personalInfoRightBorder"></a-col>
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
        <a-col :span="3" class="personalInfoTwoBorder">
          Emergency Contact No.<br/>
          紧急联络人联系方式
        </a-col>
        <a-col :span="4" class="personalInfoContent personalInfoTwoBorder">
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
        <a-col :span="10" class="personalInfoThreeBottomBorder" style="display: flex;align-items: center;">
          Whether to be dismissed from the previous company<br/>
          是否被前单位除名/辞退
        </a-col>
        <a-col :span="4" class="personalInfoContent personalInfoTwoBorder">
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
        <a-col :span="10" class="personalInfoThreeBottomBorder">
          Did you sign a non-compete agreement with your previous employer<br/>
          是否与前工作单位签署竞业限制协议
        </a-col>
        <a-col :span="14" class="personalInfoContent personalInfoTwoBorder">
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
          {{ item.demissionReason }}
        </a-col>
      </a-row>

      <a-row :gutter="24" class="personalInfoBasicHeader">
        <a-col :span="24">
          Family Situation and Major Social Relations
        </a-col>
      </a-row>
      <a-row :gutter="24" class="personalInfoBasicHeader">
        <a-col :span="24">
          家庭情况及主要社会关系
        </a-col>
      </a-row>

      <a-row :gutter="24">
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
      <a-row :gutter="24" v-for="(item, index) in newJoinerPersonalInformationForm.offerOutsourceFamilies" :key="index">
        <a-col :span="3" class="personalInfoThreeBottomBorder personalInfoCenter">
          {{ item.relationship }}
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          {{ item.name }}
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          {{ item.age }}
        </a-col>
        <a-col :span="9" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          {{ item.companyName }}
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          {{ item.position }}
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          {{ item.mobile }}
        </a-col>
      </a-row>
      
       <a-row :gutter="24">
        <a-col :span="24" class="personalInfoThreeBottomBorder personalInfoCenter" style="text-align: left;">
          I hereby authorize U-Talent, ltd and its all subsidiaries or third parties to investigate the relevant information that I have provided in connection with my form for background check is true and complete. Any falsification of information (or any omission of relevant information)of any fact resulted in disqualified for the position, I am willing to assume all the related responsibility. and I waive all claims against such organizations and/or persons for legal liabilities which may occur during the disclosure.
<br/>本人特此授权本人授权北京博瑞智捷企业咨询有限公司及其所有关联公司或第三方对我在本表中提供的相关信息进行调查，确认其真实完整。如果有任何虚假信息（或有关事实的遗漏）导致我不能担任该职位，本人愿意承担相关责任。本人放弃对上述组织和/或个人产生的披露过程中可能出现的法律责任提出的任何索赔。以上信息如有变更，本人将在第一时间告知人力资源部，如有违反，一切后果由本人承担。本人已阅读公司管理制度及部门相关制度，并严格遵守执行。此登记表作为劳动合同附件，与劳动合同具有同等法律效力。
        </a-col>
      </a-row>
      <a-row :gutter="24" class="personalInfoThreeBottomBorder">
       <a-col :span="2" style="font-weight: bold;">Signature<br/>签名：</a-col>
       <a-col :span="10"></a-col>
       <a-col :span="3" style="font-weight: bold;">Date of Filling<br/>填表日期：</a-col>
       <a-col :span="9" style="font-weight: bold; display: flex; align-items: center;">{{ dayjs().format('YYYY-MM-DD') }}</a-col>
      </a-row>
      </div>
      
    </div>
    <a-row :gutter="24">
      <a-col :span="24" class="personalInfoCenter">
        <a-button type="primary" style="margin-right: 10px;" @click="yulanPDF">预览</a-button>
        <a-button type="primary" :loading="isloading" @click="generatePDF">生成PDF</a-button>
      </a-col>
    </a-row>

  </a-drawer>
</template>
<script setup lang="ts">
import dayjs from 'dayjs';
import { storeToRefs } from 'pinia';
import jsPDF from 'jspdf';
import { message } from 'ant-design-vue';
import html2canvas from 'html2canvas';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { OutsourcePersonItem, NewJoinerPersonalInfoItem, } from '/@/api/outsourceDetail/model';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { newJoinerPersonalInformationFlag, newJoinerPersonalInformationFormTemp } = storeToRefs(outsourceDetailStore);
const drawerWidth = ref(Math.max(600, window.innerWidth * 0.7));
const isloading = ref(false);
const labelCol = { span: 5 };
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
const newJoinerPersonalInformationForm = ref({} as NewJoinerPersonalInfoItem);
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
    newJoinerPersonalInformationForm.value.documentAddress = newVal.documentAddress;
    newJoinerPersonalInformationForm.value.livingAddress = newVal.livingAddress;
    newJoinerPersonalInformationForm.value.offerOutsourceWorks = newVal.offerOutsourceWorks;
    newJoinerPersonalInformationForm.value.offerOutsourceFamilies = newVal.offerOutsourceFamilies;

    if (!newJoinerPersonalInformationForm.value.offerOutsourceFamilies) {
      newJoinerPersonalInformationForm.value.offerOutsourceFamilies = [];
    }
    if (newVal.resumeId) {
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
  basicSalary: number;
  basicSalaryAfterRate: number;
  signingDeadline: string;
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
  newJoinerPersonalInformationFlag.value = false;
  newJoinerPersonalInformationFormTemp.value = {} as OutsourcePersonItem;
  newJoinerPersonalInformationForm.value = {} as NewJoinerPersonalInfoItem;
  offerInformationForm.value = {} as OfferInformationItem;
}
const yulanPDF = () => {
  isShow.value = false;
}
const generatePDF = async () => {
  console.log(newJoinerPersonalInformationForm.value);
  isShow.value = false;
  outsourceDetailStore.updateOutsourcePersonMsg(newJoinerPersonalInformationForm.value).then(res => {
    if (res.code == 1) {
      message.success('更新外包人员信息表成功');
       setTimeout(async () => {
    const element = document.getElementById('personalInfoForm') as HTMLElement;
    const canvas = await html2canvas(element, { scale: 2 });
  
    const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true // 启用压缩
    });
        const margin = 10;
        const pageHeight = pdf.internal.pageSize.getHeight();
        const pageWidth = pdf.internal.pageSize.getWidth();
        const contentHeight = pageHeight - margin * 2;
        const contentWidth = pageWidth - margin * 2;

        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const elementRect = element.getBoundingClientRect();
        const offerBreakEl = document.getElementById('personalInfoOfferForm') as HTMLElement | null;
        let breakYCanvasPx: number | null = null;
        if (offerBreakEl) {
          const offerRect = offerBreakEl.getBoundingClientRect();
          const scaleFactor = canvas.height / elementRect.height;
          breakYCanvasPx = Math.round((offerRect.top - elementRect.top) * scaleFactor);
        }

        const mmPerPx = contentWidth / imgWidth;
        const pageHeightPx = Math.floor(contentHeight / mmPerPx);
        let currY = 0;
        while (currY < imgHeight) {
          let nextY = Math.min(currY + pageHeightPx, imgHeight);
          if (breakYCanvasPx !== null && currY < breakYCanvasPx && nextY > breakYCanvasPx) {
            nextY = breakYCanvasPx;
          }
          const sliceHeightPx = nextY - currY;
          const sliceCanvas = document.createElement('canvas');
          sliceCanvas.width = imgWidth;
          sliceCanvas.height = sliceHeightPx;
          const sliceCtx = sliceCanvas.getContext('2d') as CanvasRenderingContext2D;
          sliceCtx.drawImage(
            canvas,
            0,
            currY,
            imgWidth,
            sliceHeightPx,
            0,
            0,
            imgWidth,
            sliceHeightPx
          );
          const sliceImgData = sliceCanvas.toDataURL('image/png');
          pdf.addImage(sliceImgData, 'PNG', margin, margin, contentWidth, sliceHeightPx * mmPerPx);
          currY = nextY;
          if (currY < imgHeight) {
            pdf.addPage();
          }
        }
        
        pdf.save(`新员工个人信息登记表_${Date.now()}.pdf`);
    isShow.value = true;
      }, 500);
    } else {
      message.error(res.msg || '更新外包人员个人信息表失败');
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
  font-size: 16px;
  font-weight: bold;
  text-align: center;
}
 .personalInfoBasicHeader {
  font-weight: bold;
  text-align: center;
  background-color: #ccc;
  line-height: 1.6;
}
 .personalInfoContent {
  align-content: center;
}
.personalInfoAllBorder {
  border: 1px solid #ccc;
  line-height: 1.6;
}
.personalInfoTopBorder {
  border-top: 1px solid #ccc;
  line-height: 1.6;
}
.personalInfoLeftBorder {
  border-left: 1px solid #ccc;
  line-height: 1.6;
}
.personalInfoRightBorder {
  border-right: 1px solid #ccc;
  line-height: 1.6;
}
.personalInfoBottomBorder {
  border-bottom: 1px solid #ccc;
  line-height: 1.6;
}
.personalInfoTwoBorder {
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  line-height: 1.6;
}
.personalInfoThreeTopBorder {
  border-right: 1px solid #ccc;
  border-left: 1px solid #ccc;
  border-top: 1px solid #ccc;
  line-height: 1.6;
}
.personalInfoThreeBottomBorder {
  border-right: 1px solid #ccc;
  border-left: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  line-height: 1.6;
}
.personalInfoCenter {
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
</style>
