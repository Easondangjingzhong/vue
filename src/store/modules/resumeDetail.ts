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
}
export const useResumeDetailStore = defineStore({
  id: 'app-Resume',
  state: (): ResumeDetailState => ({
    // info
    resumeDetail: {} as ResumeDetail,
    eduFlag: false,
    workFlag: false,
    candidatePositionFlag: false,
    resumeRecord: [],
    resumeCheckResult: [],
    resumeContactContent: [],
    resumeReport: [],
    currentWeekNum: '',
    currentWeek: [],
    enterpriseConsultant: [],
    mappingId: '',
    recommendMapping: [],
    recommendFlag: false,
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
    async queryResumeDetail() {
      let formData = new FormData();
      formData.append('resumeId', '384411'); // resumeId
      formData.append('resumeType', 'C'); // resumeType C
      formData.append('addConsultantId', '1829'); // 简历中的添加人Id
      formData.append('recruitId', '444'); //当前账号的id
      const res = await fetchApi.queryResumeDetail(formData);
      if (res.code == 1) {
        this.setResumeDetail(res.info);
        this.queryResumeRecord(1);
        this.queryResumeCheckResult(1);
        this.queryResumeContactContent(1);
        this.queryResumeReport();
      }
      return res;
    },
    /**
     * 修改个人信息
     */
    async updateResumePersonal(data) {
      const res = await fetchApi.updateResumePersonal(data);
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
    async queryMarkBrandFloor(marketId, brandId, recruitId) {
      let formData = new FormData();
      formData.append('marketId', marketId);
      formData.append('brandId', brandId);
      formData.append('recruitId', recruitId);
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
      formData.append('recruitId', '444');
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
      formData.append('recruitId', '444');
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
        recruitId: '444',
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
      formData.append('recruitId', '444');
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
      formData.append('recruitId', '444');
      const res = await fetchApi.queryResumeReport(formData);
      if (res.code == 1) {
        this.resumeReport = res.info;
      }
      return res;
    },
    /**
     * 查询简历简历报告
     * @returns
     */
    async updateResumeReportContent(reportContent) {
      let formData = new FormData();
      const resumeId = this.resumeDetail.resumeId;
      formData.append('resumeId', resumeId.toString());
      formData.append('recruitId', '444');
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
      let formData = new FormData();
      formData.append('page', data.page);
      formData.append('recruitId', '444');
      formData.append('recommendId', data.recommendId || '');
      formData.append('city', data.city || '');
      formData.append('brand', data.brand || '');
      formData.append('positionsId', data.positionsId || '');
      formData.append('jobTitle', data.positionsId || '');
      formData.append('counselor', '');
      formData.append('market', data.market || '');
      formData.append('phone', data.phone || '');
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
      formData.append('recruitId', "444");
      const res = await fetchApi.queryMappingIdByResumeId(formData);
      if (res.code == 1) {
        this.mappingId = res.info;
        this.queryRecommendByMappingId();
      }
      return res;
    },
     /**
     * 点击推荐查询mapping的id 没有生成
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
      formData.append('recommendId', data.recommendId);
      formData.append('companyName', data.companyName);
      formData.append('conflictId', data.conflictId);
      formData.append('appealRemark', data.appealRemark);
      formData.append('recruitId', data.recruitId);
      formData.append('SystemRecruitId', '444');
      const res = await fetchApi.addCandidateRecommendAppeal(formData);
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
      formData.append('SystemRecruitId', '444');
      const res = await fetchApi.addCandidateRecommend(formData);
      return res;
    },
  },
});
export function useResumeStoreWithOut() {
  return useResumeDetailStore(store);
}
