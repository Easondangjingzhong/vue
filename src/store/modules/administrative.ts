import { defineStore } from 'pinia';
import { store } from '/@/store';
import fetchApi from '/@/api/administrative/index';
//@ts-ignore
const loginVueUser: { loginName: ''; loginId: ''; loginTocken: ''; loginType: '' } = JSON.parse(
  localStorage.getItem('loginVueUser'),
);
interface AdministrativeState {
  workDetailMonthList: []; //月度工作
}
export const useAdministrativeStore = defineStore('app-Administrative',{
  state: (): AdministrativeState => ({
    // info
    workDetailMonthList: [],
  }),
  actions: {
    setInfo(info: []) {
      this.workDetailMonthList = info;
    },
    /**
     * @description: 查询月度工作进展
     */
    async queryWorkDetailMonth(yearAndMonth, workDetailRecruitId) {
      const formData = new FormData();
      formData.append('recruitId', workDetailRecruitId);
      formData.append('yearAndMonth', yearAndMonth);
      formData.append('SystemRecruitId', loginVueUser.loginId);
      const res = await fetchApi.queryWorkDetailMonth(formData);
      if (res) {
        // save token
        this.setInfo(res.info);
      }
      return res;
    },
    /**
     * @description: 查询月度工作进展
     */
    async queryWorkDetailMonthDay(date) {
      const formData = new FormData();
      formData.append('startTime', date);
      formData.append('endTime', date);
      formData.append('SystemRecruitId', loginVueUser.loginId);
      const res = await fetchApi.queryWorkDetailMonthDay(formData);
      return res;
    },
    /**
     * @description: 提交延期时间
     */
    async handleDelayTime(param) {
      const formData = new FormData();
      formData.append('id', param.id);
      formData.append('delyedTime', param.delyedTime);
      formData.append('delyedRemark', param.remark);
      formData.append('SystemRecruitId', loginVueUser.loginId);
      const res = await fetchApi.handleDelayTime(formData);
      return res;
    },
    /**
     * @description: 提交结束处理
     */
    async handleEndProcess(param) {
      param.append('SystemRecruitId', loginVueUser.loginId);
      const res = await fetchApi.handleEndProcess(param);
      return res;
    },
    /**
     * @description: 查询工作详情设置
     */
    async queryWorkDetailSetting() {
      const param = new FormData();
      param.append('SystemRecruitId', loginVueUser.loginId);
      const res = await fetchApi.queryWorkDetailSetting(param);
      return res;
    },
    /**
     * @description: 新增工作详情设置
     */
    async addWorkSetting(param) {
      param.append('SystemRecruitId', loginVueUser.loginId);
      const res = await fetchApi.addWorkSetting(param);
      return res;
    },
    /**
     * @description: 修改工作详情设置
     */
    async updateWorkSetting(param) {
      param.append('SystemRecruitId', loginVueUser.loginId);
      const res = await fetchApi.updateWorkSetting(param);
      return res;
    },
  },
});

export function useAdministrativeStoreWithOut() {
  return useAdministrativeStore(store);
}
