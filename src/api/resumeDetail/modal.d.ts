export interface ResumeDetail {
  LatestWork: object; //最近工作
  addConsultantId: number; //添加顾问id
  isHide: number; //是否隐藏
  isMapping: number; //是否添加mapping
  realNameEn: string; //查询顾问的英文名
  recruitId: number; //查询顾问的id
  resumeId: number; //简历的id
  resumeType: string; //简历类型 C
  urlBuilder: string; //基础的url
  userType: string; //查询顾问的权限类型 A T V S
  resume: ResumeContent; //简历具体详情
}

export interface ResumeContent {
  addConsultantId: number; //添加顾问id
  addLastContactTime: number; //最近联系时间
  addLastContactTimeStr: string; //最近联系时间 
  age: number; //最近联系时间 
  appPhotoPath: string; //app头像
  baohuEndTime: number; //保护截止时间
  birthYear: number; //生日年
  bornDay: number; //生日日
  bornMonth: number; //生日月
  cal: string; //注册手机号
  companyText: string; //公司标签
  currentCity: string; //当前城市
  currentCompany: string; //当前公司
  currentFunction: string; //当前公司
  currentLabel: string; //当前标签
  currentTrade: string; //当前标签
  customerServiceName: string; //当前服务顾问
  deleteTime: string; //删除时间
  deleteType: string; //删除类型
  deleteUser: string; //删除人
  depId: string; //
  downloadNum: number; //下载次数
  eduExpeList: EduExpe[]; //教育经历
  email: string; //邮箱
  gender: string; //性别
  height: string; //身高
  highestDegree: string; //最高学历
  hopeFunction: string; //爱好
  id: number; //简历id
  interviewNum: number; //邀请码
  isDefault: string; //默认
  isDisable: string; //默认
  isHide: string; //默认
  isHideInWeb: string; //默认
  isReg: string; //默认
  isRepeat: string; //默认
  isSure: string; //是否确认
  isVisible: string; //默认
  itemExpeList: []; //默认
  jobIntention: string; //默认
  languageAbility: string; //默认
  languageLevel: string; //默认
  lastContactTime: string; //默认
  lastContactTimeStr: string; //默认
  loginTime: string; //默认
  loginTimeStr: string; //默认
  marraiageStatus: string; //婚姻状态
  marriageStatus: string; //婚姻状态
  nationality: string; //国籍
  needCheck: string; //默认
  orginalPath: string; //默认
  pastLabel: string; //过往标签
  phoneNum: string; //手机号
  phoneNumOther: string; //其他手机号
  photoPath: string; //头像
  positionName: string; //职位
  positionStatus: string; //当前状态
  positionsId: string; //职位id
  projectFlag: string; //保护状态
  protectEndTime: string; //保护截止时间
  province: string; //省市
  realNameEn: string; //名称
  recommendBrand: string; //推荐品牌
  recommendCity: string; //推荐城市
  recommendMarket: string; //推荐商场
  recommendPosition: string; //推荐职位
  recommendTotalCount: string; //推荐职位
  recruitId: string; //推荐职位
  refreshTime: string; //刷新时间
  registTime: string; //注册时间
  registTimeStr: string; //注册时间
  resumeAddName: string; //添加顾问名称
  resumeCode: string; //简历邀请码
  resumeLanguageList: ResumeLanguage[]; //语言能力
  resumePhone: string; //手机
  resumeProgress: string; //简历完整度
  resumeProgressEn: string; //默认
  resumeReport: string; //默认
  resumeReports: []; //简历报告
  resumeStatus: string; //简历状态
  resumeType: string; //简历类型 C
  salary: string; //薪资
  seekerId: string; //注册简历id
  selfEvaluation: string; //自我评价
  startWorkTime: string; //默认
  sureTime: string; //在保时间
  talentSource: string; //简历来源
  teamId: string; //添加顾问团队ID
  teamName: string; //添加顾问团队
  teamOpenTime: string; //团队开放时间
  trade: string; //默认
  tradeCode: string; //默认
  updateTime: string; //默认
  userId: string; //默认
  userName: string; //简历用户名称
  violationSign: string; //默认
  weight: string; //体重
  workExpeList: WorkExpe[]; //工作经历
  workPlace: string; //期望工作地点
  zaibaoEndTime: string; //在保
  zaibaoName: string; //在保
  zaibaoRecruitId: string; //在保
  zaibaoStartTime: string; //在保
}

export interface EduExpe {
  atSchool: string; //是否在校 1在校 2不在校
  degree: string; //学历
  endMonth: string; //结束月
  endMonth: endYear; //结束年
  id: number; //教育经历id
  isRegular: string; //是否统招 y是 n否
  majorName: string; //专业
  resumeId: string; //简历id
  schoolName: string; //学校名称
  startMonth: string; //开始月
  startYear: string; //开始年
}

export interface ResumeLanguage {
  bujia: string; //3 不佳
  duxieLiuli: string; //2读写流利
  id: string; //语言id
  languageLevel: string; //语言证书水平
  languageName: string; //语言名称
  resumeId: string; //简历id
  tinshuoLiuli: string; //1 听说流利
}

export interface WorkExpe {
  address: string; //地址
  brandName: string; //品牌名称
  category: string; //类别
  cityName: string; //城市名称
  companyName: string; //公司名称
  department: string; //所在部门
  endMonth: string; //结束月 -1标识至今
  endYear: string; //结束年 -1标识至今
  id: string; //工作经历id
  isComment: string; //默认
  isDianPing: string; //默认
  isDisable: string; //默认
  isInterview: string; //默认
  isNewtest: string; //是否最近工作
  isRetreat: string; //是否撤店
  marketName: string; //商场名称
  monthSalary: string; //综合薪资
  newOfferTime: string; //默认
  newPredictEntryTime: string; //默认
  personnelStructure: string; //人员架构
  positionName: string; //职位名称
  positionsId: string; //职位id
  qichachaSign: string; //默认
  qichachaTeam: string; //默认
  qichachaTime: string; //默认
  qichachaTimeStr: string; //默认
  qichachaUser: string; //默认
  reporter: string; //汇报对象
  resumeId: string; //默认
  salaryDetail: string; //默认
  salaryStructure: string; //薪资架构
  salaryStructure: string; //薪资架构
  startMonth: string; //开始月
  startYear: string; //开始年
  trade: string; //默认
  workBrand: string; //品牌名称
  workCity: string; //城市
  workDuty: string; //工作职责
  workFloor: string; //工作楼层
  workMark: string; //工作商场
}