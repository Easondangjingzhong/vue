import { defineStore } from 'pinia';
import { store } from '/@/store';
import fetchApi from '/@/api/plagiarusn';
import {PlagiarusnItem,ResInfoList} from '/@/api/plagiarusn/model';
import { dateUtil } from '/@/utils/dateUtil';


interface PlagiarusnState {
  plagiarusnInfo: ResInfoList;
  plagiarusnRseult: Number // 0 不展示 查重组件 1 展示查重通过组件 2 展示查重 重复组件
  plagiarusnInfoFlag: Boolean; // true 展示简历查重新 false 不展示简历查重新
  resumeInfoFlag: Boolean; // false 不展示简历信息 true 打开展示简历信息
}

export const usePlagiarusnStore = defineStore({
  id: 'app-plagiarusn',
  state: (): PlagiarusnState => ({
    // info
    plagiarusnInfo: {} as ResInfoList,
    plagiarusnRseult: 0,
    plagiarusnInfoFlag: true,
    resumeInfoFlag: false
  }),
  actions: {
    /**
     * 简历查重接口返回值放到store中
     * @param info 简历查重接口返回值
     */
    setInfo(info: ResInfoList) {
      this.plagiarusnInfo = info;
    },
    /**
     * 控制简历查重结果展示状态
     * @param params true 展示简历查重新 false 不展示简历查重新
     */
    plagiarusnInfoFlagShow(params: boolean) {
      this.plagiarusnInfoFlag = params;
    },
    /**
     * 控制简历查重结果展示状态
     * @param params 0 不展示查重组件 1 展示查重通过组件 2 展示查重 重复组件
     */
    plagiarusnRseultShow(params: number) {
      this.plagiarusnRseult = params;
    },
    /**
     * 控制简历展示简历信息或关闭
     * @param params false 重置简历信息展示状态关闭展示, true 打开展示简历信息
     */
    resumeInfoShow(params: boolean) {
      this.resumeInfoFlag = params;
    },
    /**
     * @description: 简历查重接口
     */
    async fetchInfo(params:PlagiarusnItem) {
      const res = await fetchApi.info(params);
      if (res) {
        const { code,info } =res;
        let resulet = {} as ResInfoList;
        resulet.code = code;
        if (code !== 1 && info && info.length > 0) {
          resulet.info = info.map((item,index) => {
            let yearNow = dateUtil().year();
            console.log(yearNow);
            //console.log((yearNow- (+item.birthYear)));
            
            item.birthYear = (item.birthYear <= 0 ? 0 : parseInt((yearNow- (+item.birthYear)).toString()));
            item.gender = (item.gender == "M" ? "男" : "女");
            item.index = index + 1; // 序号
            return item as PlagiarusnItem;
          });
        } else {
          resulet.info = info;
        }
        // save token
        this.setInfo(resulet);
      }
      return res;
    },
  },
});

export function usePlagiarusnStoreWithOut() {
  return usePlagiarusnStore(store);
}