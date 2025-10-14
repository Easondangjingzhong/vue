import { defineStore } from 'pinia';
import { store } from '/@/store';
import { isProxy } from 'vue';
import { storeToRefs } from 'pinia';
import {PlagiarusnItem} from '/@/api/plagiarusn/model';
import fetchApi from '/@/api/resume';
import fetchPlagiarusnApi from '/@/api/plagiarusn'
import { dateUtil } from '/@/utils/dateUtil';
import {dataURLtoBlob} from '/@/utils/base64tofile'
import { useCityStoreWithOut } from '/@/store/modules/city';
import { normalizeText } from '/@/utils/normalizeText';
import { marriageEnArr,degreeEnAndCnArr } from '/@/store/data/resume';
import {
  Resume,
  Position,
  PersonInfo,
  WorkExperience,
  educationInfoData,
  resumeLanguageList,
  selfEvaluationData,
  ResumeFormState,
  BatchUploadItem,
} from '/@/api/resume/model';
import { shcoolType985,shcoolType211 } from '/@/utils/schoolType';
interface ResumeState {
  resumeFormState: ResumeFormState; // 简历数据
  positionStore: Position[]; // 职位数据-店铺
  positionOffice: Position[];//职位数据-office
  endYearFlag: boolean;//是否有最近工作 true 有 false 无
  resumeLanguageNationality: string;//国籍改变
  resumeId: string;//简历ID
  resumeTypeEnglish: string;//简历类型 1 英文 2或其他是中文
  closeBtn: boolean;//上传完成提示 true 展开 false 关闭
  updatePhotoFlag: Number;//简历照片状态 0 是无照片  1 是有照片  2 是有照片已修改 
  batchUploadFlag: boolean;//批量上传弹窗
  batchUploadFileList: [],//批量上传文件列表
  batchUploadList: BatchUploadItem[],//批量上传数据列表
}
const loginVueUser: { loginName: ''; loginId: ''; loginTocken: ''; loginOutFlag: '' } = JSON.parse(
  localStorage.getItem('loginVueUser') || '{}',
);
const cityStore = useCityStoreWithOut();
const { country, province } = storeToRefs(cityStore);
const diffBirthday = (birthday, age, talentSource) => {
  if (talentSource != '复制') {
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
  
}

export const useResumeStore = defineStore('app-Resume',{
  state: (): ResumeState => ({
    // info
    resumeFormState: {} as ResumeFormState,
    // 工作职位查询结果
    positionStore: [],
    positionOffice: [],
    endYearFlag: false,
    resumeLanguageNationality: "",
    resumeId: "",
    resumeTypeEnglish: "2",
    closeBtn: false,
    updatePhotoFlag: 0,
    batchUploadFlag: false,
    batchUploadFileList: [],//批量上传文件列表
    batchUploadList: [],//批量上传数据列表
  }),
  actions: {
    setInfo(resumeFormState: ResumeFormState) {
      this.resumeFormState = resumeFormState;
    },
    async fetchPosition(data) {
      let formData = new FormData();
      formData.append("jobCategory",data);
      formData.append('SystemRecruitId', loginVueUser.loginId);
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
        educationInfoList,
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
            work.endMonth = (p.endYear ? (p.endYear.indexOf(".") != -1 ?  p.endYear.split('.')[1] : p.endYear.split('-')[1]): '01');
          }
          if (p.positionsId) {
            if (isProxy(p.positionsId)) {
              work.positionsId = p.positionsId.value;
              work.positionName = p.positionsId.label;
            } else {
              work.positionsId = p.positionsId;
            }
          }
          if (p.workBrand) {
            if (isProxy(p.workBrand)) {
              work.workBrand = p.workBrand.value;
            } else {
              work.workBrand = p.workBrand;
            }
          }
          if (p.workCity) {
            if (isProxy(p.workCity)) {
              work.workCity = p.workCity.value;
            } else {
              work.workCity = p.workCity;
            }
          }
          if (p.workMark) {
            if (isProxy(p.workMark)) {
              work.workMark = p.workMark.value;
            } else {
              work.workMark = p.workMark;
            }
          }
          workData.push(work);
        }
      }
      let eduData: educationInfoData[] = [];
      if (educationInfoList.length > 0) {
        let edu = {} as educationInfoData;
        for (let i = 0; i < educationInfoList.length; i++) {
          let p = educationInfoList[i];
          edu = { ...p };
          edu.schoolType = p.schoolType.length > 0 ? p.schoolType.join(",") : "";
          edu.startYear = (p.startYear ? (p.startYear.indexOf(".") != -1 ?  p.startYear.split('.')[0] : p.startYear.split('-')[0]): '');
          edu.startMonth = (p.startYear ? (p.startYear.indexOf(".") != -1 ?  p.startYear.split('.')[1] : p.startYear.split('-')[1]): '06');
          if (p.endYear == '-1' || p.endYear == '至今') {
            edu.endYear =  '-1';
            edu.endMonth =  '-1';
          } else {
            edu.endYear = (p.endYear ? (p.endYear.indexOf(".") != -1 ?  p.endYear.split('.')[0] : p.endYear.split('-')[0]): '');
            edu.endMonth = (p.endYear ? (p.endYear.indexOf(".") != -1 ?  p.endYear.split('.')[1] : p.endYear.split('-')[1]): '09');
          }
         
          eduData.push(edu);
        }
      }
       // @ts-ignore
      const resume: Resume = {
        resumeType: 'C',
        realNameEn: loginVueUser.loginName,
        photoPath: personInfoData.photoPath && personInfoData.photoPath.includes("http://101.201.142.39") ? personInfoData.photoPath : "",
        recruitId: loginVueUser.loginId,
        userName: personInfoData.userName,
        gender: personInfoData.gender,
        phoneNum: personInfoData.phone,
        province: (personInfoData.huji.split("-").length > 1 ? personInfoData.huji.split("-")[1] : personInfoData.huji.split("-")[0]),
        currentCity: (personInfoData.currentCity.split("-").length > 1 ? personInfoData.currentCity.split("-")[1] : personInfoData.currentCity.split("-")[0]),
        positionStatus: personInfoData.positionStatus,
        marriageStatus: personInfoData.marriageStatus,
        positionName: personInfoData.positionName,
        birthYear: personInfoData.birthYear || diffBirthday(personInfoData.birthday,personInfoData.age,talentSource)?.birthYear,
        bornMonth: personInfoData.bornMonth || diffBirthday(personInfoData.birthday,personInfoData.age,talentSource)?.bornMonth,
        bornDay: personInfoData.bornDay,
        height: personInfoData.height,
        weight: personInfoData.weight,
        email: personInfoData.email,
        languageAbility: "",
        resumeLanguageList: resumeLanguageList.languageAbility,
        selfEvaluation: selfEvaluationData.selfEvaluation,
        age: personInfoData.age,
        nationality: personInfoData.nationality,
        isEnglish: this.resumeTypeEnglish,
         // @ts-ignore
        talentSource: talentSource,
        // @ts-ignore
        workExpeList: workData,
        // @ts-ignore
        eduExpeList: eduData,
      };
      const res = await fetchApi.addResumeInfo(resume);
      if (res && res != "上传失败") {
        this.resumeId = res;
        this.fetchResumeFile(res,this.resumeFormState.resumeFile);
        this.fetchResumePhote(res,this.resumeFormState.resumePhoto);
        this.closeBtn = true;
        this.updatePhotoFlag = 0;
        let formData = new FormData();
        formData.append('resumeId', res);
        formData.append('recruitId', loginVueUser.loginId);
        fetchApi.queryMappingIdByResumeId(formData);
        return res;
      }
      return res;
    },
    /**
     * 修改上传截图后的头像
     * @param resumePhoto 头像参数base64
     */
    updateResumePhoto(resumePhoto) {
      const blob = dataURLtoBlob(resumePhoto);
      const files = new window.File([blob], 'avatar.png', {type: 'application/png'})
      this.resumeFormState.resumePhoto = files;
      this.updatePhotoFlag = 2;
    },
    /**
     * @description: 上传原始简历进行解析
     */
    async queryResumeById(resumeId,addConsultantId) {
      this.resumeTypeEnglish = '1';
      // @ts-ignore
      let formData = new FormData();
      formData.append('resumeId', resumeId); // resumeId
      formData.append('resumeType', 'C'); // resumeType C
      formData.append('addConsultantId', addConsultantId); // 简历中的添加人Id
      formData.append('recruitId', loginVueUser.loginId); //当前账号的id
      const res = await fetchApi.queryResumeById(formData);
      if (res.code == 1) {
        const result = res.info.resume;
        let obj = {} as ResumeFormState;
        let personInfoData = {} as PersonInfo;
        let workExperienceList: WorkExperience[] = [];
        let educationInfoList: educationInfoData[] = [];
        let resumeLanguageList = {} as resumeLanguageList;
        let selfEvaluationData = {} as selfEvaluationData;
        if (result) {
          personInfoData.photoPath = result.photoPath;
          personInfoData.userName = result.userName;
          personInfoData.gender = result.gender;
          personInfoData.phone = result.phoneNum;
          personInfoData.age = result.age ? result.age : "";
          let city = [];
          if (result.currentCity) {
            city = province.value.filter(item => item.cityName == result.currentCity?.replace(/\s/g, ""));
          }
          personInfoData.city = city.length > 0 ? city[0].provinceNameEn + (city[0].cityNameEn ? '-' + city[0].cityNameEn : '') : '';
          personInfoData.email = result.email;
          personInfoData.height = result.height;
          let province2 = [];
          if (result.province) {
            province2 = province.value.filter(item => item.cityName == result.province);
          }
          personInfoData.huji = province2.length > 0 ? province2[0].provinceNameEn + (province2[0].cityNameEn ? '-' + province2[0].cityNameEn : '') : '';
          personInfoData.weight = result.weight;
          personInfoData.birthYear = result.birthYear;
          personInfoData.bornMonth = result.bornMonth;
          personInfoData.bornDay = result.bornDay;
          personInfoData.nationality = country.value.filter(item => item.country == result.nationality)[0]?.countryEn;
          personInfoData.currentCity = city.length > 0 ? city[0].provinceNameEn + (city[0].cityNameEn ? '-' + city[0].cityNameEn : '') : '';
          personInfoData.positionName = result.positionName;
          personInfoData.positionStatus = result.positionStatus;
          personInfoData.marriageStatus = marriageEnArr.filter(item => item.cn == result.marriageStatus)[0]?.value;
          const jobArr = result.workExpeList;
          if (jobArr?.length > 0) {
            jobArr.forEach((item) => {
              let workExperienceObj = {} as WorkExperience;
              workExperienceObj.companyName = item.companyName;
              workExperienceObj.category = item.category == "店铺" ? "Store" : "OFFICE";
              if (item.endYear && item.endYear == '-1') {
                this.endYearFlag = true;
                workExperienceObj.endYear = item.endYear;
                workExperienceObj.endMonth = item.endMonth;
              } else {
                workExperienceObj.endYear = `${item.endYear}-${item.endMonth < 10 ? "0"+(+item.endMonth) : item.endMonth}`;
                workExperienceObj.endMonth = item.endMonth;
              }
              workExperienceObj.isNewtest = item.isNewtest?.toString();
              workExperienceObj.isRetreat = item.isRetreat?.toString();
              workExperienceObj.workFloor = item.workFloor ? item.workFloor.replace("层","F") : "";
              workExperienceObj.startYear = `${item.startYear}-${item.startMonth < 10 ? "0"+(+item.startMonth) : item.startMonth}`;
              workExperienceObj.startMonth = item.startMonth;
              
              workExperienceObj.positionName = item.positionName;
              workExperienceObj.positionsId = item.positionsId;
              workExperienceObj.reporter = item.reporter;
              workExperienceObj.cityName = item.cityName;
              workExperienceObj.department = item.department;
              workExperienceObj.salaryStructure = item.salaryStructure;
              workExperienceObj.personnelStructure = item.personnelStructure;
              workExperienceObj.workDuty = item.workDuty
              ?.replaceAll(/<p>/g, '')
              .replaceAll(/<(\/)?p>/g, '\n');
              workExperienceObj.workCity = item.workCity?.toString();
              workExperienceObj.workBrand = item.workBrand;
              workExperienceObj.workMark = item.workMark?.toString();
              workExperienceList.push(workExperienceObj);
            });
          }
          const educationArr = result.eduExpeList;
          if (educationArr?.length > 0) {
            educationArr.forEach((item) => {
              let educationInfoObj = {} as educationInfoData;
              educationInfoObj.schoolName = item.schoolName;
              educationInfoObj.isRegular = item.isRegular;
              let schoolTypeTemp: String[] = [];
              if (item.edu_college) {
                // @ts-ignore
                let t985 = shcoolType985.filter((items) => items === item.schoolName.replace(/[\u200B-\u200F]+/g, ''));
                if (t985.length > 0) {
                  schoolTypeTemp.push('985');
                }
                // @ts-ignore
                let t211 = shcoolType211.filter((items) => items === item.schoolName.replace(/[\u200B-\u200F]+/g, ''));
                if (t211.length > 0) {
                  schoolTypeTemp.push('211');
                } 
              }
              educationInfoObj.schoolType = schoolTypeTemp;
              educationInfoObj.atSchool = item.atSchool;
              educationInfoObj.majorName = item.majorName;
              educationInfoObj.degree = degreeEnAndCnArr.filter(subItem => subItem.cn == item.degree)[0]?.en;
              educationInfoObj.startYear = `${item.startYear}-${item.startMonth < 10 ? "0"+(+item.startMonth) : item.startMonth}`;
              educationInfoObj.endYear = `${item.endYear}-${item.endMonth < 10 ? "0"+(+item.endMonth) : item.endMonth}`;
              educationInfoList.push(educationInfoObj);
            });
          }
          if (result.resumeLanguageList) {
            //@ts-ignore
            resumeLanguageList.languageAbility = result.resumeLanguageList;
          }
          if (result.selfEvaluation) {
            selfEvaluationData.selfEvaluation = result.selfEvaluation
            ?.replaceAll(/<p>/g, '')
            .replaceAll(/<(\/)?p>/g, '\n');
          }
        }
        obj.personInfoData = personInfoData;
        obj.workExperienceList = workExperienceList;
        obj.educationInfoList = educationInfoList;
        obj.resumeLanguageList = resumeLanguageList;
        obj.selfEvaluationData = selfEvaluationData;
        obj.talentSource = '复制';
        obj.resumeFile = null;
        // save token
        this.setInfo(obj);
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
        let obj = {} as ResumeFormState;
        let personInfoData = {} as PersonInfo;
        let workExperienceList: WorkExperience[] = [];
        let educationInfoList: educationInfoData[] = [];
        let resumeLanguageList = {} as resumeLanguageList;
        let selfEvaluationData = {} as selfEvaluationData;
        if (result) {
          personInfoData.photoPath = result.avatar_data;
          if (result.avatar_data) {
            this.updatePhotoFlag = 1;
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
          let city1 = province.value.filter(item => item.cityName == result.city?.replace(/\s/g, ""));
          personInfoData.city = city1.length > 0 ? city1[0].provinceName + (city1[0].cityName ? '-' + city1[0].cityName : '') : '';
          personInfoData.email = result.email;
          personInfoData.height = (result.height ? result.height.replace("cm",""): "");
          let city = [];
          if (result.living_address) {
            city = province.value.filter(item => item.cityName == result.living_address?.replace(/\s/g, ""));
          }
          let province2 = [];
          if (result.hukou_address) {
            province2 = province.value.filter(item => item.cityName == result.hukou_address?.replace(/\s/g, ""));
          }
          personInfoData.huji = province2.length > 0 ? province2[0].provinceName + (province2[0].cityName ? '-' + province2[0].cityName : '') : '';
          personInfoData.weight = (result.weight ? result.weight.replace("kg",""): "");
          personInfoData.birthday = result.birthday;
          personInfoData.nationality = result.nationality;
          personInfoData.currentCity = city.length > 0 ? city[0].provinceName + (city[0].cityName ? '-' + city[0].cityName : '') : '';
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
              workExperienceObj.workDuty = normalizeText(item.job_content);
              workExperienceList.push(workExperienceObj);
            });
          }
          const educationArr = result.education_objs;
          if (educationArr.length > 0) {
            educationArr.forEach((item) => {
              let educationInfoObj = {} as educationInfoData;
              educationInfoObj.schoolName = normalizeText(item.edu_college);
              educationInfoObj.isRegular = item.edu_recruit == '统招' ? 'Y' : '';
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
                  educationInfoObj.atSchool = "";
                }
              }
              educationInfoObj.majorName = item.edu_major;
              educationInfoObj.degree = item.edu_degree;
              if (item.start_date && (/^\d{4}$/.test(item.start_date))) {
                  educationInfoObj.startYear = item.start_date + "-09"; 
              } else if (item.start_date && (/^\d{7}$/.test(item.start_date))) {
                  educationInfoObj.startYear = item.start_date;
              } else {
                educationInfoObj.startYear = "";
              }
              if (item.end_date && (/^\d{4}$/.test(item.end_date))) {
                  educationInfoObj.endYear = item.end_date + "-06"; 
              } else if (item.end_date && (/^\d{7}$/.test(item.end_date))) {
                  educationInfoObj.endYear = item.end_date;
              } else {
                educationInfoObj.endYear = "";
              }
              //educationInfoObj.startYear = (item.start_date && item.start_date.length == 4 ? item.start_date + "-09" : item.start_date);
              //educationInfoObj.endYear = (item.end_date && item.end_date.length == 4 ? item.end_date + "-06" : item.end_date);
              educationInfoList.push(educationInfoObj);
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
            selfEvaluationData.selfEvaluation = normalizeText(result.cont_my_desc);
          }
        }
        obj.personInfoData = personInfoData;
        obj.workExperienceList = workExperienceList;
        obj.educationInfoList = educationInfoList;
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
     * @description: 上传原始简历进行解析
     */
    async startParseUpload(params: any) {
      try {
        const formData = new FormData();
        formData.append('fname', params.fileName); // 注意：此处的fileName需要和后端接收参数的fileName保持一致，否则无法正常接收
        formData.append('file', params.file.originFileObj);
        const res = await fetchApi.info(formData);
      if (res) {
        const { result } = JSON.parse(res.info);
        let obj = {} as ResumeFormState;
        let personInfoData = {} as PersonInfo;
        let workExperienceList: WorkExperience[] = [];
        let educationInfoList = [];
        let resumeLanguageList = {} as resumeLanguageList;
        let selfEvaluationData = {} as selfEvaluationData;
        if (result) {
          personInfoData.photoPath = result.avatar_data;
          if (result.avatar_data) {
            this.updatePhotoFlag = 1;
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
          let city1 = province.value.filter(item => item.cityName == result.city?.replace(/\s/g, ""));
          personInfoData.city = city1.length > 0 ? city1[0].provinceName + (city1[0].cityName ? '-' + city1[0].cityName : '') : '';
          personInfoData.email = result.email;
          personInfoData.height = (result.height ? result.height.replace("cm",""): "");
          let city = [];
          if (result.living_address) {
            city = province.value.filter(item => item.cityName == result.living_address?.replace(/\s/g, ""));
          }
          let province2 = [];
          if (result.hukou_address) {
            province2 = province.value.filter(item => item.cityName == result.hukou_address?.replace(/\s/g, ""));
          }
          personInfoData.huji = province2.length > 0 ? province2[0].provinceName + (province2[0].cityName ? '-' + province2[0].cityName : '') : '';
          personInfoData.weight = (result.weight ? result.weight.replace("kg",""): "");
          personInfoData.birthday = result.birthday;
          personInfoData.nationality = result.nationality;
          personInfoData.currentCity = city.length > 0 ? city[0].provinceName + (city[0].cityName ? '-' + city[0].cityName : '') : '';
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
            
              workExperienceObj.startYear = item.start_date?.substring(0,4);
              workExperienceObj.endYear = item.end_date?.substring(0,4);
              workExperienceObj.positionName = item.job_position;
              workExperienceObj.positionsId = "";
              workExperienceObj.reporter = item.job_report_to;
              workExperienceObj.department = item.job_dept;
              workExperienceObj.salaryStructure = '';
              workExperienceObj.personnelStructure = '';
              workExperienceObj.workDuty = normalizeText(item.job_content);
              workExperienceList.push(workExperienceObj);
            });
          }
          const educationArr = result.education_objs;
          if (educationArr.length > 0) {
            educationArr.forEach((item) => {
              let educationInfoObj = {} as educationInfoData;
              educationInfoObj.schoolName = normalizeText(item.edu_college);
              educationInfoObj.isRegular = item.edu_recruit == '统招' ? 'Y' : '';
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
              educationInfoObj.schoolType = schoolTypeTemp?.join(',');
              if (item.end_date) {
                const yearNow = dateUtil().year();
                const monthNow = dateUtil().month();
                const [endYear, endMonth] = item.end_date.split('-');
                if ((endYear -  yearNow > 0) || (endYear -  yearNow <= 0 && endMonth - monthNow > 0)) {
                  educationInfoObj.atSchool = "1";
                } else {
                  educationInfoObj.atSchool = "";
                }
              }
              educationInfoObj.majorName = item.edu_major;
              educationInfoObj.degree = item.edu_degree;
              if (item.start_date && (/^\d{4}$/.test(item.start_date))) {
                  educationInfoObj.startYear = item.start_date; 
              } else if (item.start_date && (/^\d{7}$/.test(item.start_date))) {
                  educationInfoObj.startYear = item.start_date.substring(0,4);
              } else {
                educationInfoObj.startYear = "";
              }
              if (item.end_date && (/^\d{4}$/.test(item.end_date))) {
                  educationInfoObj.endYear = item.end_date; 
              } else if (item.end_date && (/^\d{7}$/.test(item.end_date))) {
                  educationInfoObj.endYear = item.end_date.substring(0,4);
              } else {
                educationInfoObj.endYear = "";
              }
              //educationInfoObj.startYear = (item.start_date && item.start_date.length == 4 ? item.start_date + "-09" : item.start_date);
              //educationInfoObj.endYear = (item.end_date && item.end_date.length == 4 ? item.end_date + "-06" : item.end_date);
              educationInfoList.push(educationInfoObj);
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
            selfEvaluationData.selfEvaluation = normalizeText(result.cont_my_desc);
          }
        }
        obj.personInfoData = personInfoData;
        obj.workExperienceList = workExperienceList;
        obj.educationInfoList = educationInfoList;
        obj.resumeLanguageList = resumeLanguageList;
        obj.selfEvaluationData = selfEvaluationData;
        obj.talentSource = this.resumeFormState.talentSource;
        const plagiarusnForm = {} as PlagiarusnItem;
        plagiarusnForm.userNameCn = (personInfoData.userName || "");
        plagiarusnForm.userNameEn = "";
        plagiarusnForm.phoneNum = (personInfoData.phone || "");
        plagiarusnForm.email = (personInfoData.email || "");
        plagiarusnForm.gender = "";
        plagiarusnForm.birthYear = "";
        plagiarusnForm.currentCity = "";
        plagiarusnForm.recruitId = (loginVueUser.loginId);
        plagiarusnForm.realNameEn = (loginVueUser.loginName);
        plagiarusnForm.companyNames = "";
        plagiarusnForm.schoolNames = "";
        plagiarusnForm.majorNames = "";
        plagiarusnForm.isEnglish = "";
        const resultDetail = await fetchPlagiarusnApi.info(plagiarusnForm);
        if (resultDetail?.code != 1 && resultDetail?.info?.length > 0) {
            return "简历重复";
        } else {
           // @ts-ignore
      const resume: Resume = {
        resumeType: 'C',
        realNameEn: loginVueUser.loginName,
        photoPath: personInfoData.photoPath && personInfoData.photoPath.includes("http://101.201.142.39") ? personInfoData.photoPath : "",
        recruitId: loginVueUser.loginId,
        userName: personInfoData.userName,
        gender: personInfoData.gender,
        phoneNum: personInfoData.phone,
        province: (personInfoData.huji.split("-").length > 1 ? personInfoData.huji.split("-")[1] : personInfoData.huji.split("-")[0]),
        currentCity: (personInfoData.currentCity.split("-").length > 1 ? personInfoData.currentCity.split("-")[1] : personInfoData.currentCity.split("-")[0]),
        positionStatus: personInfoData.positionStatus,
        marriageStatus: personInfoData.marriageStatus,
        positionName: personInfoData.positionName,
        birthYear: personInfoData.birthYear || diffBirthday(personInfoData.birthday,personInfoData.age, obj.talentSource)?.birthYear,
        bornMonth: personInfoData.bornMonth || diffBirthday(personInfoData.birthday,personInfoData.age, obj.talentSource)?.bornMonth,
        bornDay: personInfoData.bornDay,
        height: personInfoData.height,
        weight: personInfoData.weight,
        email: personInfoData.email,
        languageAbility: "",
        resumeLanguageList: resumeLanguageList.languageAbility,
        selfEvaluation: selfEvaluationData.selfEvaluation,
        age: personInfoData.age,
        nationality: personInfoData.nationality,
        isEnglish: this.resumeTypeEnglish,
         // @ts-ignore
        talentSource: obj.talentSource,
        // @ts-ignore
        workExpeList: workExperienceList,
        // @ts-ignore
        eduExpeList: educationInfoList,
      };
      const resd = await fetchApi.addResumeInfo(resume);
      if (resd && resd != "上传失败") {
        this.fetchResumeFile(resd,params.file.originFileObj);
        this.fetchResumePhote(resd,obj.resumePhoto);
        return "上传成功";
      }
        }
      } 
        return "上传失败";
      } catch (error) {
        console.log(error);
        return "上传失败";
      }
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
     * 修改个人信息中国籍
     * @param nationality 国籍
     */
    updateNationality(nationality) {
      this.resumeFormState.personInfoData.nationality = nationality;
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
      this.resumeFormState.educationInfoList.push(eduData);
    },
    /**
     * 删除教育经历指定索引元素
     * @param params 指定索引
     */
    delNewEducationInfoData(params: number) {
      if (this.resumeFormState.educationInfoList.length === 1) {
        return;
      }
      // @ts-ignore
      this.resumeFormState.educationInfoList = this.resumeFormState.educationInfoList.filter(
        (item, index) => index != params,
      );
    },
  },
});

export function useResumeStoreWithOut() {
  return useResumeStore(store);
}
