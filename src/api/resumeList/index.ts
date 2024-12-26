import { post } from '/@/utils/http';

enum URL {
  resume_menu = '/candidate/rusume-vue-query-left-menu.action',
  resume_teamdetail = '/candidate/rusume-vue-query-teamdetail-num.action',
  resume_persondetail = '/candidate/rusume-vue-query-persondetail-num.action',
  resume_branList = '/companyBrand/rusume-vue-query-brand-all.action',
  resume_list = '/candidate/rusume-vue-query-resume.action',
  resume_sort_name = '/candidate/rusume-vue-insert-sort-name.action',
  resume_serch_name = '/candidate/rusume-vue-insert-serch.action',
  resume_positionsList = '/candidate/rusume-vue-query-position-all.action',
  resume_markList = '/candidate/rusume-vue-query-market-addcity.action',
  resume_companyList = '/companyBrand/rusume-vue-query-companyBrand-Ajax.action',
}
const resumeMenu = async (data:any) =>
  post<any>({ url: URL.resume_menu, data });
const queryTeamData = async (data:any) =>
  post<any>({ url: URL.resume_teamdetail, data });
const queryPersonData = async (data:any) =>
  post<any>({ url: URL.resume_persondetail, data });
const queryBranList = async (data:any) =>
  post<any>({ url: URL.resume_branList, data });
const queryResumeList = async (data:any) =>
  post<any>({ url: URL.resume_list, data });
const addSortResumeName = async (data:any) =>
  post<any>({ url: URL.resume_sort_name, data });
const fetchAddSearchResume = async (data:any) =>
  post<any>({ url: URL.resume_serch_name, data });
const queryPositionsList = async (data:any) =>
  post<any>({ url: URL.resume_positionsList, data });
const queryMarkList = async (data:any) =>
  post<any>({ url: URL.resume_markList, data });
const queryCompanyList = async (data:any) =>
  post<any>({ url: URL.resume_companyList, data });
export default { queryCompanyList,resumeMenu,queryTeamData,queryPersonData,queryBranList,queryResumeList,addSortResumeName,fetchAddSearchResume,queryPositionsList,queryMarkList };