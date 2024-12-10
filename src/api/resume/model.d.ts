interface ResInfoResumeItem {
  id: number;
  cityNameEn: string;
  cityName: string;
  createTime: string;
  newOfferTime: string;
  newPredictEntryTime: string;
  updateTime: string;
}
export interface ReqParams {
  fname: String;
  file: File;
}
export interface ResInfoList {
  code: number;
  info: ResInfoResumeItem;
}

export interface PersonInfo {
  userName: string;
  gender: string;
  phone: string;
  age: string;
  birthday: string;
  photoPath: string;
  city: string;
  email: string;
  height: string;
  huji: string;
  weight: string;
  nationality: string;
  currentCity: string;
  positionName: string;
  positionStatus: string;
  marriageStatus: string;
}
export interface WorkExperience {
  companyName: string;//公司名称
  category: string;
  isNewtest: string;//是否最近工作经历
  isRetreat: string;//是否撤店
  //workCity: string;//工作城市
  //workMark: string;//工作商场
  //workBrand: string;//工作品牌
  workFloor: string;//工作楼层
  startYear: string;//开始年份
  startMonth: string;//开始月份
  endYear: string;	//结束年份
  endMonth: string;	//结束月份
  positionsId: string;//职位id
  positionName: string;//职位
  reporter: string;//汇报对象
  department: string;  //所在部门
  monthSalary: string;	//月薪
  salaryStructure: string;
  personnelStructure: string;
  workDuty: string;//工作职责
  resumeId: string;//简历ID
}

export interface educationInfoData {
  schoolName: string;//学校名称
  isRegular: string;//是否统招，Y：统招；N：非统招
  atSchool: string;
  schoolType: String[];
  majorName: string;//专业
  degree: string;//学历
  startYear: string;
  endYear: string;
  startMonth:string;
  endMonth: string;
}

export interface resumeLanguageList {
  languageAbility: [];
}

export interface selfEvaluationData {
  selfEvaluation: string
}

export interface ResumeFormState {
  personInfoData: PersonInfo;
  workExperienceList: WorkExperience[];
  educationInfoData: educationInfoData[];
  resumeLanguageList: languagesInfoData;
  selfEvaluationData: selfEvaluationData;
  talentSource: string | undefined;
  resumeFile: File;
  resumePhoto: File;
}

export interface Resume {
  resumeType: string;
  realNameEn: string;
  recruitId: string;
  userName: String; //姓名
  gender: String; //性别：M（Male） F(Female)
  phoneNum: String;//手机号
  province: String;//户籍
  currentCity: String;//当前城市
  positionStatus: String;//职业状态
  marriageStatus: String;//婚姻状况
  positionName: String;//当前职位与期望职位
  birthYear: Number;//出生年份
  bornMonth: Number;//出生月份
  height: string;//身高
  weight: string;//体重
  email: string;//email
  languageAbility: string;//语言能力
  selfEvaluation: string;//自我评价
  age: string;//年龄(根据生日计算年龄)
  talentSource: string;//简历来源
  workExpeList: [];//工作经验
  eduExpeList: [];//工作经验
}

export interface Position {
  id: Number;
  cnPosition: String;//中文名称
  usPosition: String;//英文名称
  jobCategory: String;//职位分类
  management: String;//职位级别
  flag: String;//职位状态 1审核通过 2审核拒绝
}