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
          <input v-model="newJoinerPersonalInformationForm.politicsStatus" name="politicsStatus" placeholder="请输入政治面貌" class="no-border-input"/>
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
          <input v-model="newJoinerPersonalInformationForm.criminalRecord" name="criminalRecord" placeholder="请输入是否有过犯罪记录" class="no-border-input"/>
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
      <a-row :gutter="24" v-for="(item, index) in newJoinerPersonalInformationForm.offerOutsourceWorks" :key="index">
        <a-col :span="6" class="personalInfoThreeBottomBorder personalInfoCenter">
          {{ item.startDate }} - {{ item.endDate == '-1' ? '至今' : item.endDate }}
        </a-col>
        <a-col :span="6" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          {{ item.companyName }}
        </a-col>
        <a-col :span="6" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
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
          {{ newJoinerPersonalInformationForm.criminalRecord }}
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
      <a-row :gutter="24" v-for="(item, index) in newJoinerPersonalInformationForm.offerOutsourceWorks" :key="index">
        <a-col :span="6" class="personalInfoThreeBottomBorder personalInfoCenter">
          {{ item.startDate }} - {{ item.endDate == '-1' ? '至今' : item.endDate }}
        </a-col>
        <a-col :span="6" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          {{ item.companyName }}
        </a-col>
        <a-col :span="6" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
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
import { message } from 'ant-design-vue';
import html2canvas from 'html2canvas';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { OutsourcePersonItem, NewJoinerPersonalInfoItem, } from '/@/api/outsourceDetail/model';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { newJoinerPersonalInformationFlag, newJoinerPersonalInformationFormTemp } = storeToRefs(outsourceDetailStore);
const drawerWidth = ref(Math.max(600, window.innerWidth * 0.7));
const isShow = ref(true);
const newJoinerPersonalInformationForm = ref({} as NewJoinerPersonalInfoItem);
watch(newJoinerPersonalInformationFormTemp, (newVal) => {
  if (newVal) {
    newJoinerPersonalInformationForm.value.id = newVal.id;
    newJoinerPersonalInformationForm.value.userNameCn = newVal.userNameCn;
    newJoinerPersonalInformationForm.value.userNameEn = newVal.userNameEn;
    newJoinerPersonalInformationForm.value.idCard = newVal.idCard;
    newJoinerPersonalInformationForm.value.sex = newVal.sex;
    newJoinerPersonalInformationForm.value.phoneNumber = newVal.phoneNumber;
    newJoinerPersonalInformationForm.value.email = newVal.email;
    // newJoinerPersonalInformationForm.value.department = newVal.department;
    // newJoinerPersonalInformationForm.value.placeOfBirth = newVal.placeOfBirth;
    // newJoinerPersonalInformationForm.value.ethnic = newVal.ethnic;



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
const closeDrawer = () => {
  newJoinerPersonalInformationFlag.value = false;
  newJoinerPersonalInformationFormTemp.value = {} as OutsourcePersonItem;
  newJoinerPersonalInformationForm.value = {} as NewJoinerPersonalInfoItem;
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
    } else {
      message.error(res.msg || '更新外包人员个人信息表失败');
    }
  });
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