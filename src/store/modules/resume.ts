import { defineStore } from 'pinia';
import { store } from '/@/store';
import fetchApi from '/@/api/resume';
import { dateUtil } from '/@/utils/dateUtil';
import {dataURLtoBlob} from '/@/utils/base64tofile'
import {
  Resume,
  Position,
  PersonInfo,
  WorkExperience,
  educationInfoData,
  resumeLanguageList,
  selfEvaluationData,
  ResumeFormState,
} from '/@/api/resume/model';
import { shcoolType985,shcoolType211 } from '/@/utils/schoolType';
interface ResumeState {
  resumeFormState: ResumeFormState; // 简历数据
  positionStore: Position[]; // 职位数据-店铺
  positionOffice: Position[];//职位数据-office
  endYearFlag: boolean;//是否有最近工作 true 有 false 无
  resumeId: string;//简历ID
  closeBtn: boolean;//上传完成提示 true 展开 false 关闭
}

const diffBirthday = (birthday, age) => {
  if (birthday) {
    return {birthYear: (birthday.indexOf(".") != -1 ? birthday.split('.')[0] : +birthday.split('-')[0]),
      bornMonth: (birthday.indexOf(".") != -1 ? birthday.split('.')[1] : birthday.split('-')[1])
    }
  } {
    if (age) {
      const yearNow = dateUtil().year();
      return {birthYear: (yearNow - age),bornMonth: 1}
    } else {
      return {birthYear: 0,bornMonth:0}
    }
  }
}

export const useResumeStore = defineStore({
  id: 'app-Resume',
  state: (): ResumeState => ({
    // info
    resumeFormState: {} as ResumeFormState,
    // 工作职位查询结果
    positionStore: [],
    positionOffice: [],
    endYearFlag: false,
    resumeId: "",
    closeBtn: false,
  }),
  actions: {
    setInfo(resumeFormState: ResumeFormState) {
      this.resumeFormState = resumeFormState;
    },
    async fetchPosition(data) {
      let formData = new FormData();
      formData.append("jobCategory",data);
      const res = await fetchApi.fetchResumePosition(formData);
      if (data == "店铺") {
        this.positionStore = res.info;
      }
      if (data == "OFFICE") {
        this.positionOffice = res.info;
      }
    },
    /**
     * 上传原始简历方法
     * @param resumeId 简历id
     * @param file 简历文件
     */
    fetchResumeFile(resumeId: String, file: File) {
      let formData = new FormData();
      formData.append('file', file);
      // @ts-ignore
      formData.append('resumeId', resumeId);
      fetchApi.fetchResumeFile(formData);
    },
    /**
     * 上传简历头像
     * @param resumeId 简历id
     * @param file 简历头像
     */
    fetchResumePhote(resumeId: String, file: File) {
      let formData = new FormData();
      formData.append('file', file);
      // @ts-ignore
      formData.append('resumeId', resumeId);
      fetchApi.fetchResumePhote(formData);
    },
    /**
     * @description: 上传新简历
     */
    async fetchResumeInfo() {
      const {
        personInfoData,
        workExperienceList,
        educationInfoData,
        resumeLanguageList,
        selfEvaluationData,
        talentSource,
      } = this.resumeFormState;
      let workData: WorkExperience[] = [];
      if (workExperienceList.length > 0) {
        let work = {} as WorkExperience;
        for (let i = 0; i < workExperienceList.length; i++) {
          let p = workExperienceList[i];
          work = { ...p };
          work.startYear = (p.startYear ? (p.startYear.indexOf(".") != -1 ?  p.startYear.split('.')[0] : p.startYear.split('-')[0]): '');
          work.startMonth = (p.startYear ? (p.startYear.indexOf(".") != -1 ?  p.startYear.split('.')[1] : p.startYear.split('-')[1]): '');
          if (p.endYear == '-1' || p.endYear == '至今') {
            work.endYear = '-1';
            work.endMonth = '-1';
          } else {
            work.endYear = (p.endYear ? (p.endYear.indexOf(".") != -1 ?  p.endYear.split('.')[0] : p.endYear.split('-')[0]): '');
            work.endMonth = (p.endYear ? (p.endYear.indexOf(".") != -1 ?  p.endYear.split('.')[1] : p.endYear.split('-')[1]): '');
          }
          workData.push(work);
        }
      }
      let eduData: educationInfoData[] = [];
      if (educationInfoData.length > 0) {
        let edu = {} as educationInfoData;
        for (let i = 0; i < educationInfoData.length; i++) {
          let p = educationInfoData[i];
          edu = { ...p };
          edu.startYear = (p.startYear ? (p.startYear.indexOf(".") != -1 ?  p.startYear.split('.')[0] : p.startYear.split('-')[0]): '');
          edu.startMonth = (p.startYear ? (p.startYear.indexOf(".") != -1 ?  p.startYear.split('.')[1] : p.startYear.split('-')[1]): '');
          edu.endYear = (p.endYear ? (p.endYear.indexOf(".") != -1 ?  p.endYear.split('.')[0] : p.endYear.split('-')[0]): '');
          edu.endMonth = (p.endYear ? (p.endYear.indexOf(".") != -1 ?  p.endYear.split('.')[1] : p.endYear.split('-')[1]): '');
          eduData.push(edu);
        }
      }
       // @ts-ignore
      const loginVueUser: {loginName: "", loginId: ""} = JSON.parse(localStorage.getItem("loginVueUser"));
      const resume: Resume = {
        resumeType: 'C',
        realNameEn: loginVueUser.loginName,
        recruitId: loginVueUser.loginId,
        userName: personInfoData.userName,
        gender: personInfoData.gender,
        phoneNum: personInfoData.phone,
        province: (personInfoData.huji.split("-").length > 1 ? personInfoData.huji.split("-")[1] : personInfoData.huji.split("-")[0]),
        currentCity: (personInfoData.currentCity.split("-").length > 1 ? personInfoData.currentCity.split("-")[1] : personInfoData.currentCity.split("-")[0]),
        positionStatus: personInfoData.positionStatus,
        marriageStatus: personInfoData.marriageStatus,
        positionName: personInfoData.positionName,
        birthYear: diffBirthday(personInfoData.birthday,personInfoData.age)?.birthYear,
        bornMonth: diffBirthday(personInfoData.birthday,personInfoData.age)?.bornMonth,
        height: personInfoData.height,
        weight: personInfoData.weight,
        email: personInfoData.email,
        languageAbility: "",
        resumeLanguageList: resumeLanguageList.languageAbility,
        selfEvaluation: selfEvaluationData.selfEvaluation,
        age: personInfoData.age,
         // @ts-ignore
        talentSource: talentSource,
        // @ts-ignore
        workExpeList: workData,
        // @ts-ignore
        eduExpeList: eduData,
      };
      const res = await fetchApi.addResumeInfo(resume);
      if (res) {
        console.log(res);
        this.resumeId = res;
        this.fetchResumeFile(res,this.resumeFormState.resumeFile);
        this.fetchResumePhote(res,this.resumeFormState.resumePhoto);
        this.closeBtn = true;
        return res;
      }
      return res;
    },
    /**
     * @description: 上传原始简历进行解析
     */
    async fetchInfo(params: any) {
      const res = await fetchApi.info(params);
      if (res) {
        const { result } = JSON.parse(res.info);
        console.log(result);
        let obj = {} as ResumeFormState;
        let personInfoData = {} as PersonInfo;
        let workExperienceList: WorkExperience[] = [];
        let educationInfoData: educationInfoData[] = [];
        let resumeLanguageList = {} as resumeLanguageList;
        let selfEvaluationData = {} as selfEvaluationData;
        if (result) {
          personInfoData.photoPath = result.avatar_data;
          if (result.avatar_data) {
            const blob = dataURLtoBlob(result.avatar_data);
            const files = new window.File([blob], 'avatar.png', {type: 'application/png'})
            //const file = blobToFile(blob, 'avatar.png');
            obj.resumePhoto = files;
          }
          personInfoData.userName = result.name;
          personInfoData.gender = result.gender
            ? result.gender == '男'
              ? 'M'
              : 'F'
            : result.gender_inf == '男'
            ? 'M'
            : 'F';
          personInfoData.phone = result.phone;
          personInfoData.age = result.age ? result.age : result.age_inf;
          personInfoData.city = result.city;
          personInfoData.email = result.email;
          personInfoData.height = (result.height ? result.height.replace("cm",""): "");
          personInfoData.huji = result.hukou_address;
          personInfoData.weight = (result.weight ? result.weight.replace("kg",""): "");
          personInfoData.birthday = result.birthday;
          personInfoData.nationality = result.nationality;
          personInfoData.currentCity = result.living_address;
          personInfoData.positionName = result.work_position;
          personInfoData.positionStatus = result.work_status;
          personInfoData.marriageStatus = result.marital_status;
          const jobArr = result.job_exp_objs;
          if (jobArr.length > 0) {
            jobArr.forEach((item) => {
              let workExperienceObj = {} as WorkExperience;
              workExperienceObj.companyName = item.job_cpy;
              workExperienceObj.category = '';
              if (!this.endYearFlag && item.end_date == '至今') {
                this.endYearFlag = true;
              }
              workExperienceObj.isNewtest = item.end_date == '至今' ? '1' : '0';
              workExperienceObj.isRetreat = '';
              workExperienceObj.workFloor = '';
              workExperienceObj.startYear = item.start_date;
              workExperienceObj.endYear = item.end_date;
              workExperienceObj.positionName = item.job_position;
              workExperienceObj.positionsId = "";
              workExperienceObj.reporter = item.job_report_to;
              workExperienceObj.department = item.job_dept;
              workExperienceObj.salaryStructure = '';
              workExperienceObj.personnelStructure = '';
              workExperienceObj.workDuty = item.job_content;
              workExperienceList.push(workExperienceObj);
            });
          }
          const educationArr = result.education_objs;
          if (educationArr.length > 0) {
            educationArr.forEach((item) => {
              let educationInfoObj = {} as educationInfoData;
              educationInfoObj.schoolName = item.edu_college;
              educationInfoObj.isRegular = item.edu_recruit == '统招' ? 'Y' : 'N';
              let schoolTypeTemp: String[] = [];
              if (item.edu_college) {
                // @ts-ignore
                let t985 = shcoolType985.filter((items) => items === item.edu_college.replace(/[\u200B-\u200F]+/g, ''));
                if (t985.length > 0) {
                  schoolTypeTemp.push('985');
                }
                // @ts-ignore
                let t211 = shcoolType211.filter((items) => items === item.edu_college.replace(/[\u200B-\u200F]+/g, ''));
                if (t211.length > 0) {
                  schoolTypeTemp.push('211');
                } 
              }
              educationInfoObj.schoolType = schoolTypeTemp;
              if (item.end_date) {
                const yearNow = dateUtil().year();
                const monthNow = dateUtil().month();
                const [endYear, endMonth] = item.end_date.split('-');
                if ((endYear -  yearNow > 0) || (endYear -  yearNow <= 0 && endMonth - monthNow > 0)) {
                  educationInfoObj.atSchool = "1";
                } else {
                  educationInfoObj.atSchool = "2";
                }
              }
              educationInfoObj.majorName = item.edu_major;
              educationInfoObj.degree = item.edu_degree;
              educationInfoObj.startYear = (item.start_date && item.start_date.length == 4 ? item.start_date + "-09" : item.start_date);
              educationInfoObj.endYear = (item.end_date && item.end_date.length == 4 ? item.end_date + "-06" : item.end_date);
              educationInfoData.push(educationInfoObj);
            });
          }
          if (result.cont_language) {
            //const language = ["CET-4","CET-6","TEM-4","TEM-8","英语", "6级", "4级", "四级", "六级"];
            let languageAbility0 = [];
            let languageLevel = [];
            if (result.cont_language.includes("CET-6") || result.cont_language.includes("cet-6") || (result.cont_language.includes("英语") && result.cont_language.includes("6级"))) {
              //@ts-ignore
              languageLevel.push("CET-6");
            }
            if (result.cont_language.includes("CET-4") || result.cont_language.includes("cet-4") || (result.cont_language.includes("英语") && result.cont_language.includes("4级"))) {
              //@ts-ignore
              languageLevel.push("CET-4");
            }
            if (result.cont_language.includes("TEM-4") || result.cont_language.includes("tem-4")) {
              //@ts-ignore
              languageLevel.push("TEM-4");
            }
            if (result.cont_language.includes("TEM-8") || result.cont_language.includes("tem-8")) {
              //@ts-ignore
              languageLevel.push("TEM-8");
            }
            
            if (languageLevel.length > 0) {
              let language = {};
                //@ts-ignore
              language.languageName = '英语';
                //@ts-ignore
              language.bujia = "";
                //@ts-ignore
              language.duxieLiuli = "";
                //@ts-ignore
              language.tinshuoLiuli = "";
                //@ts-ignore
              language.languageLevel = languageLevel.join(",");
              //@ts-ignore
              languageAbility0.push(language);
            }
            //@ts-ignore
            resumeLanguageList.languageAbility = languageAbility0;
          }
          if (result.cont_my_desc) {
            selfEvaluationData.selfEvaluation = result.cont_my_desc;
          }
        }
        obj.personInfoData = personInfoData;
        obj.workExperienceList = workExperienceList;
        obj.educationInfoData = educationInfoData;
        obj.resumeLanguageList = resumeLanguageList;
        obj.selfEvaluationData = selfEvaluationData;
        obj.talentSource = this.resumeFormState.talentSource;
        obj.resumeFile = this.resumeFormState.resumeFile;
        // save token
        this.setInfo(obj);
      }
      return res;
    },
    /**
     * 添加新的工作经历
     */
    addNewWorkExperienceDetails() {
      let workData: WorkExperience = {
        companyName: '',
        category: '',
        isNewtest: '',
        isRetreat: "",
        workFloor: '',
        startYear: '',
        startMonth: '',
        endYear: '',
        endMonth: '',
        positionsId: '',
        positionName: '',
        reporter: '',
        department: '',
        monthSalary: '',
        salaryStructure: '',
        personnelStructure: '',
        workDuty: '',
        resumeId: '',
      };
      this.resumeFormState.workExperienceList.push(workData);
    },
    /**
     * 修改工作经历指定索引元素
     * @param params 指定索引
     */
    updateWorkExperienceDetailsByIndexNum(indexNum,positionName,positionsId,endYearFlag) {
      this.resumeFormState.workExperienceList[indexNum].positionName = positionName;
      this.resumeFormState.workExperienceList[indexNum].positionsId = positionsId;
      if (endYearFlag) {
        this.resumeFormState.personInfoData.positionName = positionName;
      }
    },
    /**
     * 修改最近工作状态
     * @param flag true 已有最近工作 false 无最近工作
     */
    updateEndYearFlag(flag){
      this.endYearFlag = flag;
    },
    /**
     * 添加语言能力
     * @param languageAbility 语言能力数组
     */
    addLlanguagesInfoData(languageAbility) {
      this.resumeFormState.resumeLanguageList.languageAbility = languageAbility;
    },
    /**
     * 删除教育经历指定索引元素
     * @param params 指定索引
     */
    delNewWorkExperienceDetails(params: number) {
      if (this.resumeFormState.workExperienceList.length === 1) {
        return;
      }
      // @ts-ignore
      this.resumeFormState.workExperienceList = this.resumeFormState.workExperienceList.filter(
        (item, index) => index != params,
      );
    },
    /**
     * 添加新的教育经历
     */
    addNewEducationInfoData() {
      let eduData: educationInfoData = {
        schoolName: '',
        isRegular: '',
        atSchool: '',
        schoolType: [],
        majorName: '',
        degree: '',
        startYear: '',
        endYear: '',
        startMonth: '',
        endMonth: '',
      };
      this.resumeFormState.educationInfoData.push(eduData);
    },
    /**
     * 删除教育经历指定索引元素
     * @param params 指定索引
     */
    delNewEducationInfoData(params: number) {
      if (this.resumeFormState.educationInfoData.length === 1) {
        return;
      }
      // @ts-ignore
      this.resumeFormState.educationInfoData = this.resumeFormState.educationInfoData.filter(
        (item, index) => index != params,
      );
    },
  },
});

export function useResumeStoreWithOut() {
  return useResumeStore(store);
}