import { get,post } from '/@/utils/http';

enum URL {
  query_mapping_candidate = '/candidate/resume-vue-query-candidateForCondition-page-ajax.action',
  query_mapping_appeal = '/candidateRecommend/resume-vue-query-search-recommend-appeal-list-pager-ajax.action',
  query_mapping_lvmh = '/city/resume-vue-query-mapiing-lv.action',
  query_mapping_checked = '/candidate/resume-vue-query-candidateForCondition-page-ajax-mapping-check.action',
  query_mapping_week = '/employee-group/resume-vue-get-kpi-week-byym.action',
  query_mapping_current_date = '/employee-group/resume-vue-get-kpi-week-by-workDate.action',
  query_mapping_team = '/employee-group/resume-vue-query-structure-byCounselor.action',
  query_mapping_counselor = '/candidate/resume-vue-query-consultant-byTeam.action',
  mapping_checked_student = '/candidate/resume-vue-check-mapping-task-student.action',
  mapping_checked = '/candidate/resume-vue-check-mapping-task.action',
}
const queryMappingCandidate = async (data: any) =>
  post<any>({ url: URL.query_mapping_candidate, data});
const queryMappingAppealList = async (data: any) =>
  post<any>({ url: URL.query_mapping_appeal, data});
const queryMappingLvmhList = async (data: any) =>
  post<any>({ url: URL.query_mapping_lvmh, data});
const queryMappingCheckedList = async (data: any) =>
  post<any>({ url: URL.query_mapping_checked, data});
const queryCurrentWeekNum = async (data: any) =>
  post<any>({ url: URL.query_mapping_week, data});
const queryCurrentDate = async (data: any) =>
  post<any>({ url: URL.query_mapping_current_date, data});
const queryTeam = async (data: any) =>
  post<any>({ url: URL.query_mapping_team, data});
const queryCounselor = async (data: any) =>
  post<any>({ url: URL.query_mapping_counselor, data});
const saveCheckViolationStudent = async (data: any) =>
  post<any>({ url: URL.mapping_checked_student, data});
const saveCheckViolation = async (data: any) =>
  post<any>({ url: URL.mapping_checked, data});
export default { queryMappingCandidate,queryMappingAppealList,queryMappingLvmhList,queryMappingCheckedList,queryCurrentWeekNum,queryCurrentDate,queryTeam,queryCounselor,saveCheckViolationStudent,saveCheckViolation };
