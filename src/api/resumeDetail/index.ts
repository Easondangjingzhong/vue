import { post } from '/@/utils/http';

enum URL {
  resume_detail = '/candidate/rusume-vue-query-resume-by-consultant.action',
  resume_update_personal = '/resume/rusume-vue-update-base-personal-info.action',
  resume_update_workExp = '/resume/rusume-vue-updateWorkExpById.action',
  resume_add_workExp = '/resume/rusume-vue-add-workExp.action',
  resume_update_selfEvaluation = '/resume/rusume-vue-updateSelfEvaluation.action',
  resume_update_edu = '/resume/rusume-vue-updateEduExpById.action',
  resume_add_edu = '/resume/rusume-vue-add-eduExp.action',
  resume_update_language = '/resume/rusume-vue-add-language.action',
  resume_photo = '/resume/upload-resume-head-vue.action',
  resume_markList = '/candidate/rusume-vue-query-market-addcity.action',
  resume_mark_brand = '/candidate/rusume-vue-check-candidate-market-brand.action',
  resume_positionsList = '/candidate/rusume-vue-query-position-ChuMendian.action',
  resume_resumeRecord = '/seeker-contact-record/rusume-vue-query-resume-recomend.action',
  resume_add_checkResult = '/resume/rusume-vue-add-resume-customer-check-duplicate.action',
  resume_query_checkResult = '/resume/rusume-vue-query-resume-customer-check-duplicate.action',
  resume_contact_content = '/seeker-contact-record/rusume-vue-add-resume-contactContent.action',
  resume_query_contact_content = '/seeker-contact-record/rusume-vue-query-resume-contactContent.action',
  resume_query_contact_content_comment = '/seeker-contact-record/resume-vue-query-resume-contact.action',
  resume_report = '/resume/rusume-vue-query-resume-report-message.action',
  resume_update_report = '/resume/rusume-vue-update-resume-report-message.action',
  recommend_update_candidate_position = '/candidatePosition/rusume-vue-query-candidatePosition.action',
  weekNum_query_WorkDate = '/employee-group/resume-vue-get-kpi-week-by-workDate.action',
  week_query_year_month = '/employee-group/resume-vue-get-kpi-week-byym.action',
  query_enterprise_consultant = '/candidate/resume-vue-query-enterprise-consultant-all.action',
  query_mapping_resumeId = '/candidateRecommend/resume-vue-query-cId-byResumeId.action',
  query_recommend_mappingId = '/candidateRecommend/resume-vue-query-recommend-bycId.action',
  add_recommend_appeal = '/candidateRecommend/resume-vue-add-candidateRecommendAppeal.action',
  add_recommend_candidate = '/candidateRecommend/resume-vue-add-candidateRecommend.action',
  query_candidate_position_request = '/candidate/resume-vue-query-candidate-position-request.action',
  check_candidate_recommend_repeat = '/candidateRecommend/resume-vue-check-candidateRecommend_chong.action',
  delete_recommend = '/candidateRecommend/resume-vue-back-recommend.action',
  add_candidate_position_intention = '/seeker-contact-record/rusume-vue-save-resume-contact-record.action',
  query_candidate_position_intention = '/seeker-contact-record/rusume-vue-query-resume-contact-record.action',
  delete_work_exp = '/resume/resume-vue-deleteWorkExpById.action',
  delete_edu_exp = '/resume/resume-vue-deleteEduExpById.action',
  resume_copy_to_self = '/resume/rusume-vue-copyResume-byResumeId.action',
  resume_add_tag = '/resume/rusume-vue-update-personLabel.action',
  resume_add_checked = '/resume/resume-vue-update-resume-resume-issure.action',
  resume_add_checked_two_year = '/resume/resume-vue-issure-twoYear.action',
  resume_search_recommend = '/candidatePosition/resume-vue-query-position-guanlian-scarch.action',
  resume_file_blob = '/resume/resume-vue-filetoBlob.action',
  resume_tianyan_executeGet = '/candidateRecommend/resume-vue-tianyan-executeGet.action',
  resume_consultant = '/candidate/resume-vue-query-consultant.action',
  resume_person_all = '/candidateRecommend/resume-vue-find-candidateRecommend-by-poneAndRecommendName.action',
  resume_recommend_msg = '/candidate/resume-vue-update-resumeRecommendMsg.action',
  resume_mapping = '/candidate/resume-vue-query-mapping-msg.action',
  resume_mapping_jiagou = '/candidate/resume-vue-query-mark-jiagou.action',
  check_brand_name = '/city/resume-vue-check-brand-name.action',
  check_work_newtest = '/resume/rusume-vue-check-work-newtest.action',
  update_resume_progress = '/candidate/rusume-vue-update-resumeprogress.action',
  query_resume_mapping_work = '/resume/getMappingAndResumeWorkLatest.action',
}
const queryResumeMappingWork = (formData: any) =>
  post<any>({ url: URL.query_resume_mapping_work, data: formData });
const updateResumeProgressDetailScore = (formData: any) =>
  post<any>({ url: URL.update_resume_progress, data: formData });
const checkWorkNewtest = (formData: any) =>
  post<any>({ url: URL.check_work_newtest, data: formData });
const queryCheckBrandName = (formData: any) =>
  post<any>({ url: URL.check_brand_name, data: formData });
const resumeMapping = (formData: any) =>
  post<any>({ url: URL.resume_mapping, data: formData });
const resumeRecommendMsg = (formData: any) =>
  post<any>({ url: URL.resume_recommend_msg, data: formData });
const recommendPersonRecommendAll = (formData: any) =>
  post<any>({ url: URL.resume_person_all, data: formData });
const queryConsultant = (formData: any) =>
  post<any>({ url: URL.resume_consultant, data: formData });
const queryCompanyQiChacha = (formData: any) =>
  post<any>({ url: URL.resume_tianyan_executeGet, data: formData });
const resumeFlieToBlob = (formData: any) =>
  post<any>({ url: URL.resume_file_blob, data: formData });
const searchFormState = (formData: any) =>
  post<any>({ url: URL.resume_search_recommend, data: formData });

const addResumeCheckedTwoYear = (formData: any) =>
  post<any>({ url: URL.resume_add_checked_two_year, data: formData });
const addResumeChecked = (formData: any) =>
  post<any>({ url: URL.resume_add_checked, data: formData });
const addTag = (formData: any) =>
  post<any>({ url: URL.resume_add_tag, data: formData });
const resumeCopyToSelf = (formData: any) =>
  post<any>({ url: URL.resume_copy_to_self, data: formData });
const deleteEducationExp = (formData: any) =>
  post<any>({ url: URL.delete_edu_exp, data: formData });
const deleteWorkExp = (formData: any) =>
  post<any>({ url: URL.delete_work_exp, data: formData });
const queryCandidatePositionIntention = (formData: any) =>
  post<any>({ url: URL.query_candidate_position_intention, data: formData });
const addCandidatePositionIntention = (formData: any) =>
  post<any>({ url: URL.add_candidate_position_intention, data: formData });
const deleteRecommend = (formData: any) =>
  post<any>({ url: URL.delete_recommend, data: formData });
const checkCandidateRecommendRepeat = (formData: any) =>
  post<any>({ url: URL.check_candidate_recommend_repeat, data: formData });
const queryCandidatePositionRequest = (formData: any) =>
  post<any>({ url: URL.query_candidate_position_request, data: formData });
const addCandidateRecommend = (formData: any) =>
  post<any>({ url: URL.add_recommend_candidate, data: formData });
const addCandidateRecommendAppeal = (formData: any) =>
  post<any>({ url: URL.add_recommend_appeal, data: formData });
const queryRecommendByMappingId = (formData: any) =>
  post<any>({ url: URL.query_recommend_mappingId, data: formData });
const queryMappingIdByResumeId = (formData: any) =>
  post<any>({ url: URL.query_mapping_resumeId, data: formData });
const queryEnterpriseConsultant = (formData: any) =>
  post<any>({ url: URL.query_enterprise_consultant, data: formData });
const queryWeekByYearAndMonth = (formData: any) =>
  post<any>({ url: URL.week_query_year_month, data: formData });
const queryWeekNumByWorkDate = (formData: any) =>
  post<any>({ url: URL.weekNum_query_WorkDate, data: formData });
const queryRecommendCandidatePosition = (formData: any) =>
  post<any>({ url: URL.recommend_update_candidate_position, data: formData });
const updateResumeReportContent = (formData: any) =>
  post<any>({ url: URL.resume_update_report, data: formData });
const queryResumeReport = (formData: any) => post<any>({ url: URL.resume_report, data: formData });
const queryResumeContactContentComment = (formData: any) =>
  post<any>({ url: URL.resume_query_contact_content_comment, data: formData });
const queryResumeContactContent = (formData: any) =>
  post<any>({ url: URL.resume_query_contact_content, data: formData });
const addResumeContactContent = (data: any) => post<any>({ url: URL.resume_contact_content, data });
const queryResumeCheckResult = (formData: any) =>
  post<any>({ url: URL.resume_query_checkResult, data: formData });
const addResumeCheckResult = (formData: any) =>
  post<any>({ url: URL.resume_add_checkResult, data: formData });
const queryResumeRecord = (formData: any) =>
  post<any>({ url: URL.resume_resumeRecord, data: formData });
const fetchResumePhote = (formData: any) => post<any>({ url: URL.resume_photo, data: formData });
const queryResumeDetail = async (data: any) => post<any>({ url: URL.resume_detail, data });
const updateResumePersonal = async (data: any) =>
  post<any>({ url: URL.resume_update_personal, data });
const updateResumeWorkExp = async (data: any) =>
  post<any>({ url: URL.resume_update_workExp, data });
const addResumeWorkExp = async (data: any) => post<any>({ url: URL.resume_add_workExp, data });
const updateResumeSelfEvaluation = async (data: any) =>
  post<any>({ url: URL.resume_update_selfEvaluation, data });
const updateResumeEdu = async (data: any) => post<any>({ url: URL.resume_update_edu, data });
const addResumeEdu = async (data: any) => post<any>({ url: URL.resume_add_edu, data });
const updateResumeLanguage = async (data: any) =>
  post<any>({ url: URL.resume_update_language, data });
const queryResumePositions = async (data: any) =>
  post<any>({ url: URL.resume_positionsList, data });
/**
 * 查询商场楼层
 * @param data marketId brandId recruitId
 * @returns
 */
const queryMarkBrandFloor = async (data: any) => post<any>({ url: URL.resume_mark_brand, data });
/**
 * 根据城市商场数据类型参数查询
 * @param data city城市,marketName商场名称搜索,curPage当前页参数
 * @returns
 */
const queryMarkList = async (data: any) => post<any>({ url: URL.resume_markList, data });
const resumeMappingJiagou = async (data: any) => post<any>({ url: URL.resume_mapping_jiagou, data });
export default {
  queryResumeMappingWork,
  updateResumeProgressDetailScore,
  checkWorkNewtest,
  queryCheckBrandName,
  resumeMappingJiagou,
  resumeMapping,
  resumeRecommendMsg,
  recommendPersonRecommendAll,
  queryConsultant,
  queryCompanyQiChacha,
  resumeFlieToBlob,
  searchFormState,
  addResumeChecked,
  addResumeCheckedTwoYear,
  addTag,
  resumeCopyToSelf,
  deleteEducationExp,
  deleteWorkExp,
  queryCandidatePositionIntention,
  addCandidatePositionIntention,
  deleteRecommend,
  checkCandidateRecommendRepeat,
  queryCandidatePositionRequest,
  addCandidateRecommend,
  addCandidateRecommendAppeal,
  queryRecommendByMappingId,
  queryMappingIdByResumeId,
  queryEnterpriseConsultant,
  queryWeekByYearAndMonth,
  queryWeekNumByWorkDate,
  queryRecommendCandidatePosition,
  updateResumeReportContent,
  queryResumeReport,
  queryResumeContactContentComment,
  queryResumeContactContent,
  addResumeContactContent,
  queryResumeCheckResult,
  addResumeCheckResult,
  queryResumeRecord,
  queryResumePositions,
  queryMarkBrandFloor,
  queryMarkList,
  fetchResumePhote,
  addResumeEdu,
  addResumeWorkExp,
  queryResumeDetail,
  updateResumePersonal,
  updateResumeWorkExp,
  updateResumeSelfEvaluation,
  updateResumeEdu,
  updateResumeLanguage,
};
