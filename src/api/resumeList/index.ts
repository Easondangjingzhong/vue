import { post } from '/@/utils/http';

enum URL {
  resume_menu = '/candidate/rusume-vue-query-left-menu.action',
  resume_teamdetail = '/candidate/rusume-vue-query-teamdetail-num.action',
  resume_persondetail = '/candidate/rusume-vue-query-persondetail-num.action',
  resume_branList = '/companyBrand/rusume-vue-query-brand-all.action',
  resume_list = '/candidate/rusume-vue-query-resume.action',
  resume_sort_name = '/candidate/rusume-vue-insert-sort-name.action',
  query_sort_by_id = '/candidate/rusume-vue-query-sort-byId.action',
  update_sort_by_id = '/candidate/rusume-vue-update-sort-name.action',
  resume_serch_name = '/candidate/rusume-vue-insert-serch.action',
  update_resume_serch_name = '/candidate/rusume-vue-update-serch.action',
  resume_positionsList = '/candidate/rusume-vue-query-position-all.action',
  resume_markList = '/candidate/rusume-vue-query-market-addcity.action',
  resume_companyList = '/companyBrand/rusume-vue-query-companyBrand-Ajax.action',
  resume_companyList_cn = '/companyBrand/resume-vue-query-company-all.action',
  resume_serchData = '/candidate/rusume-vue-query-serch-byId.action',
  resume_personTalentData = '/candidate/rusume-vue-query-personTalent-num.action',
  resume_teamPersonChangeSystemA = '/candidate/rusume-vue-query-left-teamperson-admin-qie.action',
  resume_teamPersonChangeSystemTs = '/candidate/rusume-vue-query-left-teamperson-qie.action',
  query_recommend_counselor = '/candidate/resume-vue-query-consultant-byTeam.action',
  query_enterprise_consultant = '/candidate/resume-vue-query-enterprise-consultant-all.action',
  query_recommend_resume_record = '/candidateRecommend/rusume-vue-query-search-button-list-pager-ajax.action',
  query_recommend_resume_interview = '/candidateRecommend/resume-vue-query-interview-notice-person-tui.action',
  query_recommend_resume_offer = '/candidateRecommend/resume-vue-query-offer-collect-all-ajax.action',
  query_system_function = '/system/resume-vue-system-function.action',
  query_resumeNew_details = '/candidate/rusume-vue-query-resumeId-byphone.action',
}
/**
 * 查询顾问权限
 * @returns 
 */
const queryQueryResumeNewDetails = (formData: any) =>
  post<any>({ url: URL.query_resumeNew_details, data: formData});
/**
 * 查询顾问权限
 * @returns 
 */
const querySystemFunction = (formData: any) =>
  post<any>({ url: URL.query_system_function, data: formData});
/**
 * 查询顾问OFFER记录
 * @returns 
 */
const queryRecommendOffer = (formData: any) =>
  post<any>({ url: URL.query_recommend_resume_offer, data: formData});
/**
 * 查询顾问面试记录
 * @returns 
 */
const queryRecommendInterview = (formData: any) =>
  post<any>({ url: URL.query_recommend_resume_interview, data: formData});
/**
 * 查询顾问推荐记录
 * @returns 
 */
const queryRecommendResumeButton = (formData: any) =>
  post<any>({ url: URL.query_recommend_resume_record, data: formData});
/**
 * 查询所有签署公司简称
 * @returns 
 */
const queryCompanyCnList = () =>
  post<any>({ url: URL.resume_companyList_cn});
/**
 * 查询企业顾问
 * @param formData 
 * @returns 
 */
const queryEnterpriseConsultant = (formData: any) =>
  post<any>({ url: URL.query_enterprise_consultant, data: formData });
/**
 * 查询推荐顾问
 * @returns 
 */
const queryRecommendCounselor = async (data:any) =>
  post<any>({ url: URL.query_recommend_counselor, data });
/**
 * 人才分类查询
 * @returns 
 */
const updateResumeSort = async (data:any) =>
  post<any>({ url: URL.update_sort_by_id, data });
/**
 * 人才分类查询
 * @returns 
 */
const querySortById = async (data:any) =>
  post<any>({ url: URL.query_sort_by_id, data });
/**
 * 切换我的人才查询人才管理员 查询团队和人
 * @returns 
 */
const queryTeamPersonChangeSystemA = async () =>
  post<any>({ url: URL.resume_teamPersonChangeSystemA});
/**
 * 切换我的人才查询人才团队Leader 查询团队和人
 * @returns 
 */
const queryTeamPersonChangeSystemTs = async (data:any) =>
  post<any>({ url: URL.resume_teamPersonChangeSystemTs,data});
/**
 * 查询左侧主菜单
 * @param data recruitId
 * @returns 
 */
const resumeMenu = async (data:any) =>
  post<any>({ url: URL.resume_menu, data });
/**
 * 根据recruitId和teamId查询团队的简历数
 * @param data recruitId teamId
 * @returns 
 */
const queryTeamData = async (data:any) =>
  post<any>({ url: URL.resume_teamdetail, data });
/**
 * 根据recruitId和teamId查询团队中每个人的简历数
 * @param data  recruitId teamId
 * @returns 
 */
const queryPersonData = async (data:any) =>
  post<any>({ url: URL.resume_persondetail, data });
/**
 * 根据品牌类型参数查询
 * @param data 品牌的类型参数
 * @returns 
 */
const queryBranList = async (data:any) =>
  post<any>({ url: URL.resume_branList, data });
/**
 * 根据搜索条件查询简历
 * @param data 搜索条件参数
 * @returns 
 */
const queryResumeList = async (data:any) =>
  post<any>({ url: URL.resume_list, data });
/**
 * 添加人才分类功能
 * @param data 搜索条件参数
 * @returns 
 */
const addSortResumeName = async (data:any) =>
  post<any>({ url: URL.resume_sort_name, data });
/**
 * 修改一键搜索功能
 * @param data 搜索条件参数
 * @returns 
 */
const fetchUpdateSearchResume = async (data:any) =>
  post<any>({ url: URL.update_resume_serch_name, data });
/**
 * 添加一键搜索功能
 * @param data 搜索条件参数
 * @returns 
 */
const fetchAddSearchResume = async (data:any) =>
  post<any>({ url: URL.resume_serch_name, data });
/**
 * 根据职位数据类型参数查询
 * @param data industry 行业,jobCategory2 职类,management2 职级
 * @returns 
 */
const queryPositionsList = async (data:any) =>
  post<any>({ url: URL.resume_positionsList, data });
/**
 * 根据城市商场数据类型参数查询
 * @param data city城市,marketName商场名称搜索,curPage当前页参数
 * @returns 
 */
const queryMarkList = async (data:any) =>
  post<any>({ url: URL.resume_markList, data });
/**
 * 根据公司数据类型参数查询
 * @param data industry行业,companyName公司
 * @returns 
 */
const queryCompanyList = async (data:any) =>
  post<any>({ url: URL.resume_companyList, data });
/**
 * 根据id查询一键搜索列表
 * @param data id 一键搜索保存的id
 * @returns 
 */
const queryResumeSerchData = async (data:any) =>
  post<any>({ url: URL.resume_serchData, data });
/**
 * 团队L我的人才模块 团队 互切个人(数量查询接口)
 * @param data recruitId,viewType T 部门视角 （非Leader 此参数不生效 T也不影响） V 团队L视角  S个人视角
 * @returns 
 */
const queryPersonTalentData = async (data:any) =>
  post<any>({ url: URL.resume_personTalentData, data });
export default { queryQueryResumeNewDetails,querySystemFunction,queryRecommendOffer,queryRecommendInterview,queryRecommendResumeButton,queryCompanyCnList,queryEnterpriseConsultant,queryRecommendCounselor,updateResumeSort,querySortById,fetchUpdateSearchResume,queryTeamPersonChangeSystemA,queryTeamPersonChangeSystemTs,queryPersonTalentData,queryResumeSerchData,queryCompanyList,resumeMenu,queryTeamData,queryPersonData,queryBranList,queryResumeList,addSortResumeName,fetchAddSearchResume,queryPositionsList,queryMarkList };