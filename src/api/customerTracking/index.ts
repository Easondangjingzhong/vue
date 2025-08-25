import { post } from '/@/utils/http';
enum URL {
  query_hr_detail_cid = '/enterprise/resume-vue-query_hr_detail_cid.action',
  query_brand_by_company_name = '/enterprise/resume-vue-query_Brand_byCompanyName.action',
  query_customer_track_contract = '/enterprise/resume-vue-query-customer-track-contract.action',
  query_customer_track_hr = '/enterprise/resume-vue-query-customer-track-hr.action',
  query_customer_track = '/enterprise/resume-vue-query-customer-track.action',
  add_customer_track_hr = '/enterprise/resume-vue-add-update-customer-track-Hr.action',
  add_customer_track_contract = '/enterprise/resume-vue-add-customer-track-contract.action',
  query_company_list = '/enterprise/resume-vue-query-customer-track-company.action',
  update_customer_track_type = '/enterprise/resume-vue-update-customer-track-type.action',
  update_customer_track_flag = '/enterprise/resume-vue-update-customer-track-flag.action',
  update_customer_track_bd_advisor = '/enterprise/resume-vue-update-customer-track-bdUserName.action',
}
/**
 * 更新客户追踪BD顾问
 * @param data {id,bdAdvisor,companyNameAll}
 * @returns 
 */
const updateCustomerTrackBdAdvisor = async (data: any) =>
  post<any>({ url: URL.update_customer_track_bd_advisor,data});
/**
 * 更新客户追踪状态
 * @param data 
 * @returns 
 */
const updateCustomerTrackFlag = async (data: any) =>
  post<any>({ url: URL.update_customer_track_flag,data});
/**
 * 更新客户追踪类型
 * @param data 
 * @returns 
 */
const updateCustomerTrackType = async (data: any) =>
  post<any>({ url: URL.update_customer_track_type,data});
/**
 * 添加客户追踪HRl联系记录
 * @param data 
 * @returns 
 */
const queryCompanyList = async () =>
  post<any>({ url: URL.query_company_list});
/**
 * 添加客户追踪HRl联系记录
 * @param data 
 * @returns 
 */
const addCustomerTrackContract = async (data: any) =>
  post<any>({ url: URL.add_customer_track_contract, data});
/**
 * 添加客户追踪HR信息
 * @param data 
 * @returns 
 */
const addCustomerTrackHr = async (data: any) =>
  post<any>({ url: URL.add_customer_track_hr, data});
/**
 * 查询客户汇总
 * @param data {companyName,type类型  ABC,flag状态 已合作 深入中,cooperateStatus,pageNumber,pageSize}
 * @returns 
 */
const queryCustomerTrack = async (data: any) =>
  post<any>({ url: URL.query_customer_track, data});

/**
 * 查询新的客户追踪HR信息
 * @param data {collectId}
 * @returns 
 */
const queryCustomerTrackHr = async (data: any) =>
  post<any>({ url: URL.query_customer_track_hr, data});

 /**
 * 联络记录
 * @param data {pageNumber,pageSize,collectId}
 * @returns 
 */
const queryCustomerTrackContract = async (data: any) =>
  post<any>({ url: URL.query_customer_track_contract, data});

/**
 * 品牌类别详情
 * @param data companyName
 * @returns 
 */
const queryBrandByCompanyName = async (data: any) =>
  post<any>({ url: URL.query_brand_by_company_name, data});
/**
 * 查原本HR信息
 * @param data cId jobType companyName hrId
 * @returns 
 */
const queryHrDetail = async (data: any) =>
  post<any>({ url: URL.query_hr_detail_cid, data});
export default { updateCustomerTrackBdAdvisor,updateCustomerTrackFlag,updateCustomerTrackType,queryCompanyList,addCustomerTrackContract,addCustomerTrackHr,queryHrDetail,queryBrandByCompanyName,queryCustomerTrackContract,queryCustomerTrackHr,queryCustomerTrack };
