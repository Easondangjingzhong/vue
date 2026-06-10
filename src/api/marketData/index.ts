//import { ResInfoList } from './model';
import { get, post } from '/@/utils/http';

enum URL {
  query_mapping_temp_page_ajax = '/candidate/resume-vue-query-mappingTemp-page-ajax.action',
  add_mapping_temp = '/candidate/resume-vue-insert-mappingTemp.action',
  update_check_mapping_temp = '/candidate/resume-vue-check-mappingTemp.action',
  update_assign_mapping_temp = '/candidate/resume-vue-assign-mappingTemp.action',
  update_mapping_temp = '/candidate/resume-vue-update-mappingTemp.action',
  query_mapping_temp_log = '/candidate/resume-vue-query-mappingTempLog.action',
}
/**
 * 查询商场信息临时顾问日志
 * @param tempId
 * @returns
 */
const queryMappingTempLog = async (params: any) =>
  post<any>({ url: URL.query_mapping_temp_log, params });
/**
 * 修改
 * @param params
 * @returns
 */
const updateMappingTemp = async (params: any) =>
  post<any>({ url: URL.update_mapping_temp, params });
/**
 * 分配
 * @param ids
 * @param assignRecruitId
 * @param assignRealNameEn
 * @returns
 */
const updateAssignMappingTemp = async (params: any) =>
  post<any>({ url: URL.update_assign_mapping_temp, params });
/**
 * 审核
 * @param  id
 * @param checkStatus
 * @param checkRemark
 * @param falseReason
 * @returns
 */
const updateCheckMappingTemp = async (params: any) =>
  post<any>({ url: URL.update_check_mapping_temp, params });
/**
 * 新增商场信息临时顾问
 * @param data
 * @returns
 */
const addMappingTemp = async (data: any) => {
  return post<any>({ url: URL.add_mapping_temp, data }, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
/**
 * 查询商场信息临时顾问
 * @param pageNumber 页码,
 * @param pageSize 每页数量,
 * @param type 类型,
 * @param assignStatus 分配状态,
 * @param checkStatus 审核状态,
 * @param jobStatus 岗位状态,
 * @param city 城市,
 * @param marketId 商场ID,
 * @param brandId 品牌ID,
 * @param entryRecruitId 录入招聘ID,
 * @param assignRecruitId 分配招聘ID
 * @returns
 */
const queryMappingTempPageAjax = async (params: any) =>
  get<any>({ url: URL.query_mapping_temp_page_ajax, params }, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
export default {
  queryMappingTempPageAjax,
  addMappingTemp,
  updateCheckMappingTemp,
  updateAssignMappingTemp,
  updateMappingTemp,
  queryMappingTempLog,
};
