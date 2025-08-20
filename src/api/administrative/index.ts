//import { ResInfoList } from './model';
import { post } from '/@/utils/http';

enum URL {
  query_work_detail_month = '/city/resume-vue-query-operation-work-detail-month.action',
  query_work_detail_month_day = '/city/resume-vue-query-operation-work-detail.action',
  update_work_delyed = '/city/resume-vue-update-operation-work-delyed.action',
  update_work_end = '/city/resume-vue-update-operation-work-End.action',
  query_work_setting = '/city/resume-vue-query-operation-work-collect.action',
  add_work_setting = '/city/resume-vue-insert-operation-work-collect.action',
  update_work_setting = '/city/resume-vue-update-operation-work-collect.action',
}
const queryWorkDetailMonth = async (data: any) =>
  post<any>({ url: URL.query_work_detail_month, data });
const queryWorkDetailMonthDay = async (data: any) =>
  post<any>({ url: URL.query_work_detail_month_day, data });
const handleDelayTime = async (data: any) => post<any>({ url: URL.update_work_delyed, data });
const handleEndProcess = async (data: any) => post<any>({ url: URL.update_work_end, data });
const queryWorkDetailSetting = async (data: any) =>
  post<any>({ url: URL.query_work_setting, data });
const addWorkSetting = async (data: any) => post<any>({ url: URL.add_work_setting, data });
const updateWorkSetting = async (data: any) => post<any>({ url: URL.update_work_setting, data });
export default {
  queryWorkDetailMonth,
  queryWorkDetailMonthDay,
  handleDelayTime,
  handleEndProcess,
  queryWorkDetailSetting,
  addWorkSetting,
  updateWorkSetting,
};
