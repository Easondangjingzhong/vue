import { defineStore } from 'pinia';
import { store } from '/@/store';
import { currentDate } from '/@/utils/dateUtil';
import { ResumeDetail } from '/@/api/resumeDetail/modal';
import fetchApi from '/@/api/resumeDetail';
interface ResumeDetailState {
  resumeDetail: ResumeDetail; // 简历数据
  eduFlag: boolean; // 添加教育经历是否 true是 false 否
  workFlag: boolean; // 添加工作经历是否 true是 false 否
  resumeRecord: []; // 简历推荐记录
  resumeIntention: []; // 简历职位意向
  resumeCheckResult: []; // 简历查重记录
  resumeContactContent: []; // 联络记录
  resumeReport: []; // 简历报告
  candidatePositionFlag: boolean; //推荐人才是否展开显示
  currentWeekNum: string; //当前考核周度
  currentWeek: []; //当前所有考核周
  enterpriseConsultant: []; //所有企业顾问
  mappingId: string; //mapping系统中的id
  recommendMapping: []; //推荐时查询推荐记录
  recommendFlag: boolean; //是否进行推荐
  resumeShowFlag: boolean; //简历展示
  recommendCandidatePositionSearch: {}; //推荐职位查询条件
  resumeId: string; //简历的ID
  addConsultantId: string; //简历的添加顾问
  addRecruitId: string; //简历的添加顾问id
  searchRecommend: string; //企业顾问查看简历
}
const loginVueUser: {loginName: "", loginId: "", loginTocken: "",loginType: ""} = JSON.parse(localStorage.getItem("loginVueUser"));
export const useResumeDetailStore = defineStore({
  id: 'app-Resume',
  state: (): ResumeDetailState => ({
    // info
    resumeDetail: {} as ResumeDetail,
    resumeShowFlag: false,
    eduFlag: false,
    workFlag: false,
    candidatePositionFlag: false,
    resumeRecord: [],
    resumeIntention: [],
    resumeCheckResult: [],
    resumeContactContent: [],
    resumeReport: [],
    currentWeekNum: '',
    currentWeek: [],
    enterpriseConsultant: [],
    mappingId: '',
    recommendMapping: [],
    recommendFlag: false,
    recommendCandidatePositionSearch: {},
    resumeId: '',
    addConsultantId: '',
    addRecruitId: '',
    searchRecommend: '',
  }),
  actions: {
    /**
     * 设置简历详情数据
     * @param info 简历详情数据
     */
    setResumeDetail(info) {
      this.resumeDetail = info;
    },
    /**
     * 查询简历详情
     */
    async queryResumeDetail(resumeId='',addConsultantId='') {
      let formData = new FormData();
      if (resumeId) {
        this.resumeId = resumeId;
      }
      if (addConsultantId) {
        this.addConsultantId = addConsultantId;
      }
      this.resumeShowFlag = true;
      formData.append('resumeId', this.resumeId || resumeId); // resumeId
      formData.append('resumeType', 'C'); // resumeType C
      formData.append('addConsultantId', this.addConsultantId || resumeId); // 简历中的添加人Id
      formData.append('recruitId', loginVueUser.loginId); //当前账号的id
      const res = await fetchApi.queryResumeDetail(formData);
      if (res.code == 1) {
        this.resumeShowFlag = false;
        this.setResumeDetail(res.info);
        this.queryResumeRecord(1);
        this.queryResumeCheckResult(1);
        this.queryResumeContactContent(1);
        this.queryResumeReport();
        this.queryCandidatePositionIntention(1);
      }
      return res;
    },
    /**
     * 修改个人信息
     */
    async updateResumePersonal(data) {
      const res = await fetchApi.updateResumePersonal({...data,recruitId: loginVueUser.loginId});
      return res;
    },
    /**
     * 修改工作经历
     */
    async updateResumeWorkExp(data) {
      let res = '';
      if (data.endYear == '-1') {
        data.endMonth = '-1';
      } else {
        data.endMonth = data.endYear.split('-')[1];
        data.endYear = data.endYear.split('-')[0];
      }
      data.startMonth = data.startYear.split('-')[1];
      data.startYear = data.startYear.split('-')[0];
      const dataTemp = {
        ...data,
        positionName: data.positionsId.label,
        positionsId: data.positionsId.value,
        brandName: data.brandName.label,
        workBrand: data.brandName.value,
        cityName: data.cityName.label,
        workCity: data.cityName.value,
        marketName: data.marketName.label,
        workMark: data.marketName.value,
        qichachaSign: "1",
      };
      if (dataTemp.id) {
        res = await fetchApi.updateResumeWorkExp(dataTemp);
      } else {
        res = await fetchApi.addResumeWorkExp(dataTemp);
      }
      return res;
    },
    /**
     * 修改教育经理
     */
    async updateResumeEdu(data) {
      let res = '';
      if (data.id) {
        res = await fetchApi.updateResumeEdu(data);
      } else {
        res = await fetchApi.addResumeEdu(data);
      }
      return res;
    },
    /**
     * 修改自我评价
     */
    async updateResumeSelfEvaluation(data) {
      const res = await fetchApi.updateResumeSelfEvaluation(data);
      return res;
    },
    /**
     * 修改语言能力
     */
    async updateResumeLanguage(data) {
      const res = await fetchApi.updateResumeLanguage(data);
      return res;
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
     * 根据城市商场数据类型参数查询
     * @param param 城市商场
     */
    async queryMarkList(city, marketName?: string) {
      let formData = new FormData();
      formData.append('city', city);
      formData.append('marketName', marketName || '');
      formData.append('curPage', '1');
      const res = await fetchApi.queryMarkList(formData);
      return res;
    },
    async queryMarkBrandFloor(marketId, brandId) {
      let formData = new FormData();
      formData.append('marketId', marketId);
      formData.append('brandId', brandId);
      formData.append('recruitId', loginVueUser.loginId);
      const res = await fetchApi.queryMarkBrandFloor(formData);
      return res;
    },
    /**
     * 查询职位排除门店销售和门店支持
     */
    async queryResumePositions() {
      let formData = new FormData();
      formData.append('industry', '');
      formData.append('jobCategory2', '');
      formData.append('management2', '');
      const res = await fetchApi.queryResumePositions(formData);
      return res;
    },
    /**
     * 查询推荐记录
     * @param phone 手机号
     * @param PageNumber 页码
     * @param recruitId 查询人
     * @returns
     */
    async queryResumeRecord(PageNumber) {
      let formData = new FormData();
      const phone = this.resumeDetail.resume.phoneNum;
      formData.append('phone', phone);
      formData.append('PageNumber', PageNumber);
      formData.append('recruitId', loginVueUser.loginId);
      const res = await fetchApi.queryResumeRecord(formData);
      if (res.code == 1) {
        this.resumeRecord = res.info;
      }
      return res;
    },
    /**
     * 新增简历查重记录
     * @param data 查询数据
     * @returns
     */
    async addResumeCheckResult(data) {
      let formData = new FormData();
      const resumeId = this.resumeDetail.resumeId;
      formData.append('companyName', data.companyName);
      formData.append('checkResult', data.checkResult);
      formData.append('resumeId', resumeId.toString());
      formData.append('recruitId', loginVueUser.loginId);
      const res = await fetchApi.addResumeCheckResult(formData);
      if (res.code == 1) {
        this.queryResumeCheckResult(1);
      }
      return res;
    },
    /**
     * 查询简历查重记录
     * @param PageNumber 当前页
     * @returns
     */
    async queryResumeCheckResult(PageNumber) {
      let formData = new FormData();
      const resumeId = this.resumeDetail.resumeId;
      formData.append('resumeId', resumeId.toString());
      formData.append('PageNumber', PageNumber);
      const res = await fetchApi.queryResumeCheckResult(formData);
      if (res.code == 1) {
        this.resumeCheckResult = res.info.pager;
      }
      return res;
    },
    /**
     * 新增联系记录
     * @param data 查询数据
     * @returns
     */
    async addResumeContactContent(data) {
      const resumeId = this.resumeDetail.resumeId;
      const res = await fetchApi.addResumeContactContent({
        ...data,
        resumeId: resumeId.toString(),
        recruitId: loginVueUser.loginId,
      });
      if (res.code == 1) {
        this.queryResumeContactContent(1);
      }
      return res;
    },
    /**
     * 查询简历查重记录
     * @param PageNumber 当前页
     * @returns
     */
    async queryResumeContactContent(PageNumber) {
      let formData = new FormData();
      const resumeId = this.resumeDetail.resumeId;
      formData.append('resumeId', resumeId.toString());
      formData.append('PageNumber', PageNumber);
      formData.append('recruitId', loginVueUser.loginId);
      const res = await fetchApi.queryResumeContactContent(formData);
      if (res.code == 1) {
        this.resumeContactContent = res.info;
      }
      return res;
    },
    /**
     * 查询简历简历报告
     * @returns
     */
    async queryResumeReport() {
      let formData = new FormData();
      const resumeId = this.resumeDetail.resumeId;
      formData.append('resumeId', resumeId.toString());
      if (this.searchRecommend == "Q") {
        formData.append('recruitId', this.addRecruitId);
      } else {
        formData.append('recruitId', loginVueUser.loginId);
      }
      formData.append('SystemRecruitId', loginVueUser.loginId);
      const res = await fetchApi.queryResumeReport(formData);
      if (res.code == 1) {
        this.resumeReport = res.info;
      }
      return res;
    },
    /**
     * 修改不简历简历报告
     * @returns
     */
    async updateResumeReportContent(reportContent) {
      let formData = new FormData();
      const resumeId = this.resumeDetail.resumeId;
      formData.append('resumeId', resumeId.toString());
      formData.append('recruitId', loginVueUser.loginId);
      formData.append('content', reportContent);
      const res = await fetchApi.updateResumeReportContent(formData);
      if (res.code == 1) {
        this.queryResumeReport();
      }
      return res;
    },
    /**
     * 查询推荐职位查询
     * @returns
     */
    async queryRecommendCandidatePosition(data) {
      this.recommendCandidatePositionSearch = data;
      let formData = new FormData();
      formData.append('page', data.page);
      formData.append('recruitId', loginVueUser.loginId);
      formData.append('recommendId', this.mappingId);
      formData.append('city', data.city || '');
      formData.append('brand', data.brand || '');
      formData.append('positionsId', data.positionsId || '');
      formData.append('jobTitle', data.positionsId || '');
      formData.append('counselor', '');
      formData.append('market', data.market || '');
      formData.append('phone', this.resumeDetail.resume.phoneNum);
      formData.append('companyRecruitId', data.companyRecruitId || '');
      formData.append('isTask', data.isTask || '');
      formData.append('year', data.year || '');
      formData.append('month', data.month || '');
      formData.append('weekNum', data.weekNum || '');
      formData.append('jobType', data.jobType || '');
      const res = await fetchApi.queryRecommendCandidatePosition(formData);
      return res;
    },
    /**
     * 根据当前日期查询所属周度
     * @returns
     */
    async queryWeekNumByWorkDate() {
      let formData = new FormData();
      formData.append('workDate', currentDate());
      const res = await fetchApi.queryWeekNumByWorkDate(formData);
      if (res.code == 1) {
        this.currentWeekNum = res.info[0].weekNum;
      }
      return res;
    },
    /**
     * 根据年月查询考核周
     * @returns
     */
    async queryWeekByYearAndMonth(year = '', month = '') {
      let formData = new FormData();
      if (!year) {
        const nowyear = currentDate().split('-');
        formData.append('year', nowyear[0]);
        formData.append('month', nowyear[1]);
      } else {
        formData.append('year', year);
        formData.append('month', month);
      }
      const res = await fetchApi.queryWeekByYearAndMonth(formData);
      if (res.code == 1) {
        this.currentWeek = res.info;
      }
      return res;
    },
    /**
     * 查询企业顾问
     * @returns
     */
    async queryEnterpriseConsultant(teamId = '') {
      let formData = new FormData();
      formData.append('teamId', teamId);
      const res = await fetchApi.queryEnterpriseConsultant(formData);
      if (res.code == 1) {
        this.enterpriseConsultant = res.info;
      }
      return res;
    },
    /**
     * 点击推荐查询mapping的id 没有生成
     * @returns
     */
    async queryMappingIdByResumeId() {
      let formData = new FormData();
      const resumeId = this.resumeDetail.resumeId.toString();
      formData.append('resumeId', resumeId);
      formData.append('recruitId', loginVueUser.loginId);
      const res = await fetchApi.queryMappingIdByResumeId(formData);
      if (res.code == 1) {
        this.mappingId = res.info;
        this.queryRecommendByMappingId();
        this.candidatePositionFlag = true;
      }
      return res;
    },
     /**
     * 根据mapping的id 查询推荐记录
     * @returns
     */
     async queryRecommendByMappingId() {
      let formData = new FormData();
      formData.append('cId', this.mappingId);
      const res = await fetchApi.queryRecommendByMappingId(formData);
      if (res.code == 1) {
        this.recommendMapping = res.info;
      }
      return res;
    },
    /**
     * 新增候选人推荐申诉
     * @returns
     */
    async addCandidateRecommendAppeal(data) {
      let formData = new FormData();
      formData.append('id', data.id);
      formData.append('brand', data.brand);
      formData.append('bId', data.bId);
      formData.append('mId', data.mId);
      formData.append('city', data.city);
      formData.append('workPlace', data.workPlace);
      formData.append('jobTitle', data.jobTitle);
      formData.append('positionsId', data.positionsId);
      formData.append('counselor', data.counselor);
      formData.append('recommendId', this.mappingId);
      formData.append('companyName', data.companyName);
      formData.append('conflictId', data.conflictId);
      formData.append('appealRemark', data.appealRemark);
      formData.append('recruitId', data.recruitId);
      formData.append('SystemRecruitId', loginVueUser.loginId);
      const res = await fetchApi.addCandidateRecommendAppeal(formData);
      if (res.code == 1) {
        this.queryRecommendCandidatePosition(this.recommendCandidatePositionSearch);
        this.queryRecommendByMappingId();
      }
      return res;
    },
     /**
     * 新增候选人推荐
     * @returns
     */
     async addCandidateRecommend(data) {
      let formData = new FormData();
      formData.append('id', data.id);
      formData.append('brand', data.brand);
      formData.append('bId', data.bId);
      formData.append('mId', data.mId);
      formData.append('city', data.city);
      formData.append('workPlace', data.workPlace);
      formData.append('jobTitle', data.jobTitle);
      formData.append('positionsId', data.positionsId);
      formData.append('counselor', data.counselor);
      formData.append('recommendId', data.recommendId);
      formData.append('companyName', data.companyName);
      formData.append('recruitId', data.recruitId);
      formData.append('file', data.file);
      formData.append('SystemRecruitId', loginVueUser.loginId);
      const res = await fetchApi.addCandidateRecommend(formData);
      if (res.code == 1) {
        this.queryRecommendCandidatePosition(this.recommendCandidatePositionSearch);
        this.queryRecommendByMappingId();
      }
      return res;
    },
     /**
     * 查询推荐要求
     * @returns
     */
     async queryCandidatePositionRequest(id) {
      let formData = new FormData();
      formData.append('pId', id);
      const res = await fetchApi.queryCandidatePositionRequest(formData);
      return res;
    },
     /**
     * 候选人推荐查重
     * @returns
     */
     async checkCandidateRecommendRepeat(data) {
      let formData = new FormData();
      formData.append('id', data.id);
      formData.append('brand', data.brand);
      formData.append('bId', data.bId);
      formData.append('mId', data.mId);
      formData.append('city', data.city);
      formData.append('workPlace', data.workPlace);
      formData.append('jobTitle', data.jobTitle);
      formData.append('positionsId', data.positionsId);
      formData.append('counselor', data.counselor);
      formData.append('recommendId', data.recommendId);
      formData.append('companyName', data.companyName);
      formData.append('recruitId', data.recruitId);
      formData.append('SystemRecruitId', loginVueUser.loginId);
      const res = await fetchApi.checkCandidateRecommendRepeat(formData);
      return res;
    },
    /**
     * 候选人推荐查重
     * @returns
     */
    async deleteRecommend(data) {
      let formData = new FormData();
      formData.append('pId', data);
      formData.append('cId', this.mappingId);
      formData.append('SystemRecruitId', loginVueUser.loginId);
      const res = await fetchApi.deleteRecommend(formData);
      if (res.code == 1) {
        this.queryRecommendCandidatePosition(this.recommendCandidatePositionSearch);
        this.queryRecommendByMappingId();
      }
      return res;
    },
     /**
     * 候选人职位意向添加
     * @returns
     */
     async addCandidatePositionIntention(data) {
      let temp = data.map(item => ({
        resumeId: this.resumeDetail.resumeId,
        recruitId: loginVueUser.loginId,
        brandId: item.bId,
        city: item.city,
        marketId: item.mId,
        pId: item.id,
        positionId: item.positionsId,
        positionName: item.jobTitle,
        intention: item.intention,
      }));
      let param = {
        recruitId: loginVueUser.loginId,
        resumeContactRecordmaps: temp
      }
      const res = await fetchApi.addCandidatePositionIntention(param);
      if (res.code == 1) {
        this.queryCandidatePositionIntention(1);
      }
      return res;
    },
    /**
     * 候选人职位意向查询
     * @returns
     */
    async queryCandidatePositionIntention(PageNumber) {
      let formData = new FormData();
      const resumeId = this.resumeDetail.resumeId.toString();
      formData.append('PageNumber', PageNumber);
      formData.append('resumeId', resumeId);
      const res = await fetchApi.queryCandidatePositionIntention(formData);
      if (res.code == 1) {
        this.resumeIntention = res.info;
      }
      return res;
    },
     /**
     * 删除工作经历
     * @returns
     */
     async deleteWorkExp(workExpId) {
      let formData = new FormData();
      const resumeId = this.resumeDetail.resumeId.toString();
      formData.append('workExpId', workExpId);
      formData.append('resumeId', resumeId);
      formData.append('SystemRecruitId', loginVueUser.loginId);
      const res = await fetchApi.deleteWorkExp(formData);
      return res;
    },
    /**
     * 删除工作经历
     * @returns
     */
    async deleteEducationExp(eduExpId) {
      let formData = new FormData();
      const resumeId = this.resumeDetail.resumeId.toString();
      formData.append('eduExpId', eduExpId);
      formData.append('resumeId', resumeId);
      formData.append('SystemRecruitId', loginVueUser.loginId);
      const res = await fetchApi.deleteEducationExp(formData);
      return res;
    },
    /**
     * 简历复制到登录人名下
     * @returns 
     */
    async resumeCopyToSelf() {
      let formData = new FormData();
      const resumeId = this.resumeDetail.resumeId.toString();
      formData.append('resumeId', resumeId);
      formData.append('recruitId', loginVueUser.loginId);
      const res = await fetchApi.resumeCopyToSelf(formData);
      return res;
    },
    /**
     * 添加自定义标签
     * @param tagValue 
     * @returns 
     */
    async addTag(tagValue) {
      let formData = new FormData();
      const resumeId = this.resumeDetail.resumeId.toString();
      formData.append('resumeId', resumeId);
      formData.append('personLabel', tagValue);
      const res = await fetchApi.addTag(formData);
      return res;
    },
    /**
     * 简历核对
     * @returns 
     */
    async addResumeChecked() {
      let formData = new FormData();
      const resumeId = this.resumeDetail.resumeId.toString();
      formData.append('resumeId', resumeId);
      formData.append('SystemRecruitId', loginVueUser.loginId);
      formData.append('phoneNum', this.resumeDetail.resume.phoneNum);
      const res = await fetchApi.addResumeChecked(formData);
      return res;
    },
    /**
     * 推荐职位条件搜索
     * @returns 
     */
    async searchFormState(formState) {
      let formData = new FormData();
      formData.append('city', formState.city);
      formData.append('mId', formState.market.value);
      formData.append('positionId', formState.positionsId);
      formData.append('bId', formState.brand);
      formData.append('retail', formState.retail);
      formData.append('retailLevel', formState.retailLevel);
      formData.append('category', formState.category);
      formData.append('pinji', '');
      formData.append('leibie', formState.leibie);
      formData.append('industry', formState.retail);
      formData.append('jobcategory2', formState.jobcategory2);
      formData.append('management2', formState.management2);
      const res = await fetchApi.searchFormState(formData);
      return res;
    },
    /**
     * 文件路径转换为Blob
     * @param path 
     * @returns 
     */
    async resumeFlieToBlob(path) {
      let formData = new FormData();
      formData.append('fileUrl', path);
      const res = await fetchApi.resumeFlieToBlob(formData);
      return res;
    },
    async queryCompanyQiChacha(companyName?: string) {
      let formData = new FormData();
      const token = '47532bc3-1d66-4d13-8f63-fcff06028d7f';
      const url = `http://open.api.tianyancha.com/services/open/search/2.0?word=${companyName}&pageSize=20&pageNum=1`;
      formData.append('token', token);
      formData.append('url', url);
      const res = await fetchApi.queryCompanyQiChacha(formData);
      return res;
    },
    async queryConsultant() {
      let formData = new FormData();
      formData.append('SystemRecruitId', loginVueUser.loginId);
      const res = await fetchApi.queryConsultant(formData);
      return res;
    },
    async recommendPersonRecommendAll(recruitId) {
      let formData = new FormData();
      formData.append('phone', this.resumeDetail.resume.phoneNum);
      formData.append('phoneOther', '');
      formData.append('recruitId', recruitId);
      formData.append('SystemRecruitId', loginVueUser.loginId);
      const res = await fetchApi.recommendPersonRecommendAll(formData);
      return res;
    },
    async resumeRecommendMsg(temp) {
      let formData = new FormData();
      const resumeId = this.resumeDetail.resumeId.toString();
      formData.append('id', resumeId);
      formData.append('recommendCity', temp.recommendCity);
      formData.append('recommendMarket', temp.recommendMarket);
      formData.append('recommendBrand', temp.recommendBrand);
      formData.append('recommendPosition', temp.recommendPosition);
      const res = await fetchApi.resumeRecommendMsg(formData);
      return res;
    },
  },
});
export function useResumeStoreWithOut() {
  return useResumeDetailStore(store);
}
