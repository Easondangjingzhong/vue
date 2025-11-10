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
      <a-row :gutter="24" class="personalInfoThreeBottomBorder">
        <a-col :span="4" style="max-width: 14%;">
          Department 部门:
        </a-col>
         <a-col :span="20" style="padding-left: 0;">
          <input v-model="newJoinerPersonalInformationForm.department" name="department" placeholder="请输入部门" class="no-border-input"/>
        </a-col>
      </a-row>

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
          <input v-model="newJoinerPersonalInformationForm.idCardNumber" name="idCardNumber" placeholder="请输入身份证号码" class="no-border-input"/>
        </a-col>
         <a-col :span="4" class="personalInfoTwoBorder">
          Gender<br/>
          性别
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder">
          <input v-model="newJoinerPersonalInformationForm.gender" name="gender" placeholder="请输入性别" class="no-border-input"/>
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
          出生地
        </a-col>
        <a-col :span="4" class="personalInfoContent personalInfoTwoBorder">
          <input v-model="newJoinerPersonalInformationForm.placeOfBirth" name="placeOfBirth" placeholder="请输入出生地" class="no-border-input"/>
        </a-col>
         <a-col :span="4" class="personalInfoTwoBorder">
          Ethnic<br/>
          民族
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder">
          <input v-model="newJoinerPersonalInformationForm.ethnic" name="ethnic" placeholder="请输入民族" class="no-border-input"/>
        </a-col>
        <a-col :span="3" class="personalInfoRightBorder"></a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="4" class="personalInfoThreeBottomBorder">
          Mobile<br/>
          手机号码
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder">
          <input v-model="newJoinerPersonalInformationForm.mobile" name="mobile" placeholder="请输入手机号码" class="no-border-input"/>
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
          <input v-model="newJoinerPersonalInformationForm.politicsStatus" name="politicsStatus" placeholder="请输入政治面貌" class="no-border-input"/>
        </a-col>
        <a-col :span="3" class="personalInfoRightBorder"></a-col>
      </a-row>
       <a-row :gutter="24">
        <a-col :span="4" class="personalInfoThreeBottomBorder">
          Highest Standard <br/>Attained 最高学历
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder">
          <input v-model="newJoinerPersonalInformationForm.highestStandardAttained" name="highestStandardAttained" placeholder="请输入最高学历" class="no-border-input"/>
        </a-col>
        <a-col :span="3" class="personalInfoTwoBorder">
          Martial Status<br/>
          婚姻状况
        </a-col>
        <a-col :span="4" class="personalInfoContent personalInfoTwoBorder">
          <input v-model="newJoinerPersonalInformationForm.maritalStatus" name="maritalStatus" placeholder="请输入婚姻状况" class="no-border-input"/>
        </a-col>
         <a-col :span="4" class="personalInfoTwoBorder">
          Health Condition<br/>
          健康状况
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder">
          <input v-model="newJoinerPersonalInformationForm.healthCondition" name="healthCondition" placeholder="请输入健康状况" class="no-border-input"/>
        </a-col>
        <a-col :span="3" class="personalInfoRightBorder"></a-col>
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
          <input v-model="newJoinerPersonalInformationForm.censusRegister" name="censusRegister" placeholder="请输入户口类型" class="no-border-input"/>
        </a-col>                       
         <a-col :span="4" class="personalInfoTwoBorder">
          If has a criminal record<br/>
          是否有过犯罪记录
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder">
          <input v-model="newJoinerPersonalInformationForm.hasCriminalRecord" name="hasCriminalRecord" placeholder="请输入是否有过犯罪记录" class="no-border-input"/>
        </a-col>
        <a-col :span="3" class="personalInfoTwoBorder"></a-col>
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
          <input v-model="newJoinerPersonalInformationForm.emergencyContactNo" name="emergencyContactNo" placeholder="请输入紧急联络人联系方式" class="no-border-input"/>
        </a-col>                       
         <a-col :span="4" class="personalInfoTwoBorder" style="display: flex;align-items: center;">
          Relationship with the emergency contact<br/>
          与紧急联系人的关系
        </a-col>
        <a-col :span="6" class="personalInfoContent personalInfoTwoBorder">
          <input v-model="newJoinerPersonalInformationForm.relationshipWithEmergencyContact" name="relationshipWithEmergencyContact" placeholder="请输入与紧急联系人的关系" class="no-border-input"/>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="10" class="personalInfoThreeBottomBorder" style="display: flex;align-items: center;">
          Whether to be dismissed from the previous company<br/>
          是否被前单位除名/辞退
        </a-col>
        <a-col :span="4" class="personalInfoContent personalInfoTwoBorder">
          <input v-model="newJoinerPersonalInformationForm.hasDismissedFromPreviousCompany" name="hasDismissedFromPreviousCompany" placeholder="请输入是否被前单位除名/辞退" class="no-border-input"/>
        </a-col>
        <a-col :span="4" class="personalInfoTwoBorder">
          If YES, please list the reason<br/>
          如选是请告知原因
        </a-col>
        <a-col :span="6" class="personalInfoContent personalInfoTwoBorder">
          <input v-model="newJoinerPersonalInformationForm.hasDismissedFromPreviousCompanyReason" name="hasDismissedFromPreviousCompanyReason" class="no-border-input"/>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="10" class="personalInfoThreeBottomBorder">
          Did you sign a non-compete agreement with your previous employer<br/>
          是否与前工作单位签署竞业限制协议
        </a-col>
        <a-col :span="14" class="personalInfoContent personalInfoTwoBorder">
          <input v-model="newJoinerPersonalInformationForm.hasSignedNonCompeteAgreementWithPreviousEmployer" name="hasSignedNonCompeteAgreementWithPreviousEmployer" placeholder="请输入是否与前工作单位签署竞业限制协议" class="no-border-input"/>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="4" class="personalInfoThreeBottomBorder">
          Address in Document<br/>
          户籍/身份证地址
        </a-col>
        <a-col :span="20" class="personalInfoContent personalInfoTwoBorder">
          <input v-model="newJoinerPersonalInformationForm.censusRegisterAddress" name="censusRegisterAddress" placeholder="请输入户籍/身份证地址" class="no-border-input"/>
        </a-col>
      </a-row>
       <a-row :gutter="24">
        <a-col :span="4" class="personalInfoThreeBottomBorder">
          Current Living Address<br/>
          本市联系/居住地址
        </a-col>
        <a-col :span="20" class="personalInfoContent personalInfoTwoBorder">
          <input v-model="newJoinerPersonalInformationForm.currentLivingAddress" name="currentLivingAddress" placeholder="请输入本市联系/居住地址" class="no-border-input"/>
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
        <a-col :span="6" class="personalInfoThreeBottomBorder personalInfoCenter">
          Start/End Date<br/>
          起止年月
        </a-col>
        <a-col :span="6" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          Company Name<br/>
          公司名称
        </a-col>
        <a-col :span="6" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          Position<br/>
          担任职务
        </a-col>
        <a-col :span="6" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          Demission Reason<br/>
          离职原因
        </a-col>
      </a-row>
      <a-row :gutter="24" v-for="(item, index) in newJoinerPersonalInformationForm.workExperience" :key="index">
        <a-col :span="6" class="personalInfoThreeBottomBorder personalInfoCenter">
          {{ startAndEndYearWork(item.startYear, item.startMonth, item.endYear, item.endMonth) }}
        </a-col>
        <a-col :span="6" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          {{ item.companyName }}
        </a-col>
        <a-col :span="6" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          {{ item.positionName }}
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
      <a-row :gutter="24">
        <a-col :span="3" class="personalInfoThreeBottomBorder personalInfoCenter">
          Father 父亲
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          <input v-model="newJoinerPersonalInformationForm.fatherName" name="fatherName" placeholder="请输入父亲姓名" class="no-border-input"/>
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          <input v-model="newJoinerPersonalInformationForm.fatherAge" name="fatherAge" placeholder="请输入父亲年龄" class="no-border-input"/>
        </a-col>
        <a-col :span="9" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          <input v-model="newJoinerPersonalInformationForm.fatherWorkUnit" name="fatherWorkUnit" placeholder="请输入父亲工作单位" class="no-border-input"/>
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          <input v-model="newJoinerPersonalInformationForm.fatherPosition" name="fatherPosition" placeholder="请输入父亲职位/职务" class="no-border-input"/>
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          <input v-model="newJoinerPersonalInformationForm.fatherContact" name="fatherContact" placeholder="请输入父亲联系方式" class="no-border-input"/>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="3" class="personalInfoThreeBottomBorder personalInfoCenter">
          Mother 母亲
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          <input v-model="newJoinerPersonalInformationForm.motherName" name="motherName" placeholder="请输入母亲姓名" class="no-border-input"/>
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          <input v-model="newJoinerPersonalInformationForm.motherAge" name="motherAge" placeholder="请输入母亲年龄" class="no-border-input"/>
        </a-col>
        <a-col :span="9" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          <input v-model="newJoinerPersonalInformationForm.motherWorkUnit" name="motherWorkUnit" placeholder="请输入母亲工作单位" class="no-border-input"/>
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          <input v-model="newJoinerPersonalInformationForm.motherPosition" name="motherPosition" placeholder="请输入母亲职位/职务" class="no-border-input"/>
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          <input v-model="newJoinerPersonalInformationForm.motherContact" name="motherContact" placeholder="请输入母亲联系方式" class="no-border-input"/>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="3" class="personalInfoThreeBottomBorder personalInfoCenter">
          Spouse 配偶
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          <input v-model="newJoinerPersonalInformationForm.spouseName" name="spouseName" placeholder="请输入配偶姓名" class="no-border-input"/>
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          <input v-model="newJoinerPersonalInformationForm.spouseAge" name="spouseAge" placeholder="请输入配偶年龄" class="no-border-input"/>
        </a-col>
        <a-col :span="9" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          <input v-model="newJoinerPersonalInformationForm.spouseWorkUnit" name="spouseWorkUnit" placeholder="请输入配偶工作单位" class="no-border-input"/>
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          <input v-model="newJoinerPersonalInformationForm.spousePosition" name="spousePosition" placeholder="请输入配偶职位/职务" class="no-border-input"/>
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          <input v-model="newJoinerPersonalInformationForm.spouseContact" name="spouseContact" placeholder="请输入配偶联系方式" class="no-border-input"/>
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
    </div>
    <div id="personalInfoForm" v-show="!isShow">
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
      <a-row :gutter="24" class="personalInfoThreeBottomBorder">
        <a-col :span="4" style="max-width: 14%;">
          Department 部门:
        </a-col>
         <a-col :span="20" style="padding-left: 0;">
          {{newJoinerPersonalInformationForm.department}}
        </a-col>
      </a-row>

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
          {{ newJoinerPersonalInformationForm.idCardNumber }}
        </a-col>
         <a-col :span="4" class="personalInfoTwoBorder">
          Gender<br/>
          性别
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder">
          {{ newJoinerPersonalInformationForm.gender }}
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
          出生地
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
          {{ newJoinerPersonalInformationForm.mobile }}
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
          {{ newJoinerPersonalInformationForm.highestStandardAttained }}
        </a-col>
        <a-col :span="3" class="personalInfoTwoBorder">
          Martial Status<br/>
          婚姻状况
        </a-col>
        <a-col :span="4" class="personalInfoContent personalInfoTwoBorder">
          {{ newJoinerPersonalInformationForm.maritalStatus }}
        </a-col>
         <a-col :span="4" class="personalInfoTwoBorder">
          Health Condition<br/>
          健康状况
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder">
          {{ newJoinerPersonalInformationForm.healthCondition }}
        </a-col>
        <a-col :span="3" class="personalInfoRightBorder"></a-col>
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
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder">
          {{ newJoinerPersonalInformationForm.hasCriminalRecord }}
        </a-col>
        <a-col :span="3" class="personalInfoTwoBorder"></a-col>
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
          {{ newJoinerPersonalInformationForm.emergencyContactNo }}
        </a-col>                       
         <a-col :span="4" class="personalInfoTwoBorder" style="display: flex;align-items: center;">
          Relationship with the emergency contact<br/>
          与紧急联系人的关系
        </a-col>
        <a-col :span="6" class="personalInfoContent personalInfoTwoBorder">
          {{ newJoinerPersonalInformationForm.relationshipWithEmergencyContact }}
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="10" class="personalInfoThreeBottomBorder" style="display: flex;align-items: center;">
          Whether to be dismissed from the previous company<br/>
          是否被前单位除名/辞退
        </a-col>
        <a-col :span="4" class="personalInfoContent personalInfoTwoBorder">
          {{ newJoinerPersonalInformationForm.hasDismissedFromPreviousCompany }}
        </a-col>
        <a-col :span="4" class="personalInfoTwoBorder">
          If YES, please list the reason<br/>
          如选是请告知原因
        </a-col>
        <a-col :span="6" class="personalInfoContent personalInfoTwoBorder">
          {{ newJoinerPersonalInformationForm.hasDismissedFromPreviousCompanyReason }}
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="10" class="personalInfoThreeBottomBorder">
          Did you sign a non-compete agreement with your previous employer<br/>
          是否与前工作单位签署竞业限制协议
        </a-col>
        <a-col :span="14" class="personalInfoContent personalInfoTwoBorder">
          {{ newJoinerPersonalInformationForm.hasSignedNonCompeteAgreementWithPreviousEmployer }}
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="4" class="personalInfoThreeBottomBorder">
          Address in Document<br/>
          户籍/身份证地址
        </a-col>
        <a-col :span="20" class="personalInfoContent personalInfoTwoBorder">
          {{ newJoinerPersonalInformationForm.censusRegisterAddress }}
        </a-col>
      </a-row>
       <a-row :gutter="24">
        <a-col :span="4" class="personalInfoThreeBottomBorder">
          Current Living Address<br/>
          本市联系/居住地址
        </a-col>
        <a-col :span="20" class="personalInfoContent personalInfoTwoBorder">
          {{ newJoinerPersonalInformationForm.currentLivingAddress }}
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
        <a-col :span="6" class="personalInfoThreeBottomBorder personalInfoCenter">
          Start/End Date<br/>
          起止年月
        </a-col>
        <a-col :span="6" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          Company Name<br/>
          公司名称
        </a-col>
        <a-col :span="6" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          Position<br/>
          担任职务
        </a-col>
        <a-col :span="6" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          Demission Reason<br/>
          离职原因
        </a-col>
      </a-row>
      <a-row :gutter="24" v-for="(item, index) in newJoinerPersonalInformationForm.workExperience" :key="index">
        <a-col :span="6" class="personalInfoThreeBottomBorder personalInfoCenter">
          {{ startAndEndYearWork(item.startYear, item.startMonth, item.endYear, item.endMonth) }}
        </a-col>
        <a-col :span="6" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          {{ item.companyName }}
        </a-col>
        <a-col :span="6" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          {{ item.positionName }}
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
      <a-row :gutter="24">
        <a-col :span="3" class="personalInfoThreeBottomBorder personalInfoCenter">
          Father 父亲
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          {{ newJoinerPersonalInformationForm.fatherName }}
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          {{ newJoinerPersonalInformationForm.fatherAge }}
        </a-col>
        <a-col :span="9" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          {{ newJoinerPersonalInformationForm.fatherWorkUnit }}
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          {{ newJoinerPersonalInformationForm.fatherPosition }}
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          {{ newJoinerPersonalInformationForm.fatherContact }}
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="3" class="personalInfoThreeBottomBorder personalInfoCenter">
          Mother 母亲
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          {{ newJoinerPersonalInformationForm.motherName }}
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          {{ newJoinerPersonalInformationForm.motherAge }}
        </a-col>
        <a-col :span="9" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          {{ newJoinerPersonalInformationForm.motherWorkUnit }}
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          {{ newJoinerPersonalInformationForm.motherPosition }}
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          {{ newJoinerPersonalInformationForm.motherContact }}
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="3" class="personalInfoThreeBottomBorder personalInfoCenter">
          Spouse 配偶
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          {{ newJoinerPersonalInformationForm.spouseName }}
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          {{ newJoinerPersonalInformationForm.spouseAge }}
        </a-col>
        <a-col :span="9" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          {{ newJoinerPersonalInformationForm.spouseWorkUnit }}
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          {{ newJoinerPersonalInformationForm.spousePosition }}
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          {{ newJoinerPersonalInformationForm.spouseContact }}
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
    </div>
    <a-row :gutter="24">
      <a-col :span="24" class="personalInfoCenter">
        <a-button type="primary" :loading="!isShow" @click="generatePDF">生成PDF</a-button>
      </a-col>
    </a-row>
  </a-drawer>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { CloseOutlined } from '@ant-design/icons-vue';
import {OutsourcePersonItem} from '/@/api/outsourceDetail/model';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { newJoinerPersonalInformationFlag, newJoinerPersonalInformationFormTemp } = storeToRefs(outsourceDetailStore);
const drawerWidth = ref(Math.max(600, window.innerWidth * 0.7));
const isShow = ref(true);
const newJoinerPersonalInformationForm = ref({
  department: '',
  userNameCn: '',
  userNameEn: '',
  idCardNumber: '',
  gender: '',
  placeOfBirth: '',
  ethnic: '',
  mobile: '',
  email: '',
  politicsStatus: '',
  highestStandardAttained: '',
  maritalStatus: '',
  healthCondition: '',
  placeOfDomicile: '',
  censusRegister: '',
  hasCriminalRecord: '',
  emergencyContact: '',
  emergencyContactNo: '',
  relationshipWithEmergencyContact: '',
  hasDismissedFromPreviousCompany: '',
  hasDismissedFromPreviousCompanyReason: '',
  hasSignedNonCompeteAgreementWithPreviousEmployer: '',
  censusRegisterAddress: '',
  currentLivingAddress: '',
  fatherName: '',
  fatherAge: '',
  fatherWorkUnit: '',
  fatherPosition: '',
  fatherContact: '',
  motherName: '',
  motherAge: '',
  motherWorkUnit: '',
  motherPosition: '',
  motherContact: '',
  spouseName: '',
  spouseAge: '',
  spouseWorkUnit: '',
  spousePosition: '',
  spouseContact: '',
  workExperience: [{
    startYear: '',
    startMonth: '',
    endYear: '',
    endMonth: '',
    companyName: '',
    positionName: '',
    demissionReason: '',
  }],
});
watch(newJoinerPersonalInformationFormTemp, (newVal) => {
  if (newVal) {
    newJoinerPersonalInformationForm.value.userNameCn = newVal.userNameCn;
    newJoinerPersonalInformationForm.value.userNameEn = newVal.userNameEn;
    newJoinerPersonalInformationForm.value.idCardNumber = newVal.idCard;
    newJoinerPersonalInformationForm.value.gender = newVal.sex;
    newJoinerPersonalInformationForm.value.mobile = newVal.phoneNumber;
    newJoinerPersonalInformationForm.value.email = newVal.email;
    if (newVal.resumeId) {
      outsourceDetailStore.handleQueryWorkByResumeId(newVal.resumeId).then(res => {
        if (res.code == 1 && res.info?.length > 0) {
          newJoinerPersonalInformationForm.value.workExperience = res.info;
        }
      });
    }

  }
})
const closeDrawer = () => {
  newJoinerPersonalInformationFlag.value = false;
  newJoinerPersonalInformationFormTemp.value = {} as OutsourcePersonItem;
  newJoinerPersonalInformationForm.value = {};
}
const startAndEndYearWork = (startYear,startMonth,endYear,endMonth) => {
  let startMonthTemp = startMonth.padStart(2, '0');
  let endMonthTemp = endMonth.padStart(2, '0');
  if (endYear == '-1') {
    return `${startYear}/${startMonthTemp} - 至今`;
  }
  return `${startYear}/${startMonthTemp} - ${endYear}/${endMonthTemp}`;
}
const generatePDF = async () => {
  isShow.value = false;
  setTimeout(async () => {
    const element = document.getElementById('personalInfoForm') as HTMLElement;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
  
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true // 启用压缩
  });
  
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  
  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  pdf.save(`新员工个人信息登记表_${Date.now()}.pdf`);
   isShow.value = true;
  }, 500);
};
</script>

<style lang="less" scoped>
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
  text-align: center;
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
</style>