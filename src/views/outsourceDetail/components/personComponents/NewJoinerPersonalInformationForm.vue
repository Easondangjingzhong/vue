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
      <CloseOutlined @click="newJoinerPersonalInformationFlag = false" />
    </template>
    <div>
      <a-row :gutter="24" class="personalInfoHeader personalInfoThreeTopBorder">
        <a-col :span="24">
          New Joiner Personal Information Form
        </a-col>
      </a-row>
      <a-row :gutter="24" class="personalInfoHeader personalInfoThreeBottomBorder">
        <a-col :span="24">
          新员工个人信息登记表
        </a-col>
      </a-row>
      <a-row :gutter="24" class="personalInfoThreeBottomBorder">
        <a-col :span="24">
          Department 部门:
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
          jss
        </a-col>
        <a-col :span="3" class="personalInfoTwoBorder">
          ID<br/>
          身份证号码
        </a-col>
        <a-col :span="4" class="personalInfoContent personalInfoTwoBorder">
          223213213213213213
        </a-col>
         <a-col :span="4" class="personalInfoTwoBorder">
          Gender<br/>
          性别
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder">
          男
        </a-col>
        <a-col :span="3" class="personalInfoRightBorder"></a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="4" class="personalInfoThreeBottomBorder">
          English Name<br/>
          英文名
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder">
          jss
        </a-col>
        <a-col :span="3" class="personalInfoTwoBorder">
          Place of Birth<br/>
          出生地
        </a-col>
        <a-col :span="4" class="personalInfoContent personalInfoTwoBorder">
          223213213213213213
        </a-col>
         <a-col :span="4" class="personalInfoTwoBorder">
          Ethnic<br/>
          民族
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder">
          汉族
        </a-col>
        <a-col :span="3" class="personalInfoRightBorder"></a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="4" class="personalInfoThreeBottomBorder">
          Mobile<br/>
          手机号码
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder">
          jss
        </a-col>
        <a-col :span="3" class="personalInfoTwoBorder">
          E-mail<br/>
          邮箱地址
        </a-col>
        <a-col :span="4" class="personalInfoContent personalInfoTwoBorder">
          223213213213213213
        </a-col>
         <a-col :span="4" class="personalInfoTwoBorder">
          Politics Status<br/>
          政治面貌
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder">
          汉族
        </a-col>
        <a-col :span="3" class="personalInfoRightBorder"></a-col>
      </a-row>
       <a-row :gutter="24">
        <a-col :span="4" class="personalInfoThreeBottomBorder">
          Highest Standard <br/>Attained 最高学历
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder">
          jss
        </a-col>
        <a-col :span="3" class="personalInfoTwoBorder">
          Martial Status<br/>
          婚姻状况
        </a-col>
        <a-col :span="4" class="personalInfoContent personalInfoTwoBorder">
          223213213213213213
        </a-col>
         <a-col :span="4" class="personalInfoTwoBorder">
          Health Condition<br/>
          健康状况
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder">
          汉族
        </a-col>
        <a-col :span="3" class="personalInfoRightBorder"></a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="4" class="personalInfoThreeBottomBorder">
          Place of Domicile<br/>
          户籍地
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder">
          jss
        </a-col>
        <a-col :span="3" class="personalInfoTwoBorder">
          Census Register<br/>
          户口类型
        </a-col>
        <a-col :span="4" class="personalInfoContent personalInfoTwoBorder">
          223213213213213213
        </a-col>                       
         <a-col :span="4" class="personalInfoTwoBorder">
          If has a criminal record<br/>
          是否有过犯罪记录
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder">
          汉族
        </a-col>
        <a-col :span="3" class="personalInfoTwoBorder"></a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="4" class="personalInfoThreeBottomBorder">
          Emergency Contact<br/>
          紧急联络人
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder">
          jss
        </a-col>
        <a-col :span="3" class="personalInfoTwoBorder">
          Emergency Contact No.<br/>
          紧急联络人联系方式
        </a-col>
        <a-col :span="4" class="personalInfoContent personalInfoTwoBorder">
          223213213213213213
        </a-col>                       
         <a-col :span="4" class="personalInfoTwoBorder">
          Relationship with the emergency contact<br/>
          与紧急联系人的关系
        </a-col>
        <a-col :span="6" class="personalInfoContent personalInfoTwoBorder">
          汉族
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="10" class="personalInfoThreeBottomBorder">
          Whether to be dismissed from the previous company<br/>
          是否被前单位除名/辞退
        </a-col>
        <a-col :span="4" class="personalInfoContent personalInfoTwoBorder">
          jss
        </a-col>
        <a-col :span="4" class="personalInfoTwoBorder">
          If YES, please list the reason<br/>
          如选是请告知原因
        </a-col>
        <a-col :span="6" class="personalInfoContent personalInfoTwoBorder">
          汉族
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="10" class="personalInfoThreeBottomBorder">
          Did you sign a non-compete agreement with your previous employer<br/>
          是否与前工作单位签署竞业限制协议
        </a-col>
        <a-col :span="14" class="personalInfoContent personalInfoTwoBorder">
          jss
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="4" class="personalInfoThreeBottomBorder">
          Address in Document<br/>
          户籍/身份证地址
        </a-col>
        <a-col :span="20" class="personalInfoContent personalInfoTwoBorder">
          jss
        </a-col>
      </a-row>
       <a-row :gutter="24">
        <a-col :span="4" class="personalInfoThreeBottomBorder">
          Current Living Address<br/>
          本市联系/居住地址
        </a-col>
        <a-col :span="20" class="personalInfoContent personalInfoTwoBorder">
          jss
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
      <a-row :gutter="24">
        <a-col :span="6" class="personalInfoThreeBottomBorder personalInfoCenter">1</a-col>
        <a-col :span="6" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">2</a-col>
        <a-col :span="6" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">3</a-col>
        <a-col :span="6" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">4</a-col>
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
          1
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          2
        </a-col>
        <a-col :span="9" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          3
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          4
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          5
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="3" class="personalInfoThreeBottomBorder personalInfoCenter">
          Mother 母亲
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          1
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          2
        </a-col>
        <a-col :span="9" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          3
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          4
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          5
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="3" class="personalInfoThreeBottomBorder personalInfoCenter">
          Spouse 配偶
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          1
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          2
        </a-col>
        <a-col :span="9" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          3
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          4
        </a-col>
        <a-col :span="3" class="personalInfoContent personalInfoTwoBorder personalInfoCenter">
          5
        </a-col>
      </a-row>

       <a-row :gutter="24">
        <a-col :span="24" class="personalInfoThreeBottomBorder personalInfoCenter">
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
  </a-drawer>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { CloseOutlined } from '@ant-design/icons-vue';
import { useOutsourceDetailStoreWithOut } from '/@/store/modules/outsourceDetail';
const outsourceDetailStore = useOutsourceDetailStoreWithOut();
const { newJoinerPersonalInformationFlag } = storeToRefs(outsourceDetailStore);
const drawerWidth = ref(Math.max(600, window.innerWidth * 0.7));
</script>

<style lang="less" scoped>
 .personalInfoHeader {
  font-size: 16px;
  font-weight: bold;
  text-align: center;
}
 .personalInfoBasicHeader {
  font-weight: bold;
  text-align: center;
  background-color: #ccc;
}
 .personalInfoContent {
  align-content: center;
}
.personalInfoAllBorder {
  border: 1px solid #ccc;
}
.personalInfoTopBorder {
  border-top: 1px solid #ccc;
}
.personalInfoLeftBorder {
  border-left: 1px solid #ccc;
}
.personalInfoRightBorder {
  border-right: 1px solid #ccc;
}
.personalInfoBottomBorder {
  border-bottom: 1px solid #ccc;
}
.personalInfoTwoBorder {
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
.personalInfoThreeTopBorder {
  border-right: 1px solid #ccc;
  border-left: 1px solid #ccc;
  border-top: 1px solid #ccc;
}
.personalInfoThreeBottomBorder {
  border-right: 1px solid #ccc;
  border-left: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
.personalInfoCenter {
  text-align: center;
}
</style>