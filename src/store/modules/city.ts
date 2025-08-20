import { defineStore } from 'pinia';
import { store } from '/@/store';
import fetchApi from '/@/api/city';
//import { ResInfoCityListItem } from '/@/api/city/model';

interface CityState {
  province: [];
  country: [];
  cheieseCity: [];
}

export const useCityStore = defineStore('app-City',{
  state: (): CityState => ({
    // info
    province: [],
    country: [],
    cheieseCity: [],
  }),
  actions: {
    setInfo(info: []) {
      this.province = info;
    },
    setCountryInfo(info: []) {
      this.country = info;
    },
    /**
     * @description: 查询城市信息
     */
    async fetchInfo() {
      const res = await fetchApi.province();
      if (res) {
        // save token
        this.setInfo(res.info);
      }
      return res;
    },
    /**
     * @description: 查询国家信息
     */
    async fetchCountryInfo() {
      const res = await fetchApi.country();
      if (res) {
        // save token
        this.setCountryInfo(res.info);
      }
      return res;
    },
    /**
     * @description: 查询国家信息
     */
    async fetchCheieseCityInfo() {
      const res = await fetchApi.cheieseCity();
      if (res) {
        // save token
        this.cheieseCity = res.info;
      }
      return res;
    },
    async resuemCheckLogin(loginTocken) {
      let formData = new FormData();
      formData.append('loginTocken', loginTocken);
      const res = await fetchApi.resuemCheckLogin(formData);
      return res;
    },
  },
});

export function useCityStoreWithOut() {
  return useCityStore(store);
}