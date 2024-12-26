import { defineStore } from 'pinia';
import { store } from '/@/store';
import fetchApi from '/@/api/resumeList';
import { SearchResumeList, Item } from '/@/api/resumeList/model';
interface PaginationItem {
  current: Number;
  pageSize: Number;
  total: Number;
}
interface ResumeListState {
  resumeMenu: Item[];
  brandList: [];
  resumeList: [];
  positionsList: [];
  markIdList: [];
  companyList: [];
  pagination: {};
}

export const useResumeListStore = defineStore({
  id: 'app-Resume-List',
  state: (): ResumeListState => ({
    //用户菜单
    resumeMenu: [],
    brandList: [],
    resumeList: [],
    positionsList: [],
    markIdList: [],
    companyList: [],
    pagination: {
      current: 1,
      pageSize: 15,
      total: 0,
    } as PaginationItem,
  }),
  actions: {
    /**
     * 整合结果转化为菜单格式
     * @param info 查询recruitId用户菜单结果
     */
    setInfo(info: any) {
      let itemsTemp = [];
      let myDataChildren = [];
      if (info.allResumeName) {
        let item = {} as Item;
        item.key = '2';
        item.label = `${info.allResumeNameJingShu}/${info.allResumeNameQuanShu}`;
        item.title = '全部简历';
        item.level = 2;
        //@ts-ignore
        myDataChildren.push(item);
      }
      if (info.gongResumeName) {
        let item = {} as Item;
        item.key = '3';
        item.label = info.gongResumeShu;
        item.title = '公共简历';
        item.level = 2;
        //@ts-ignore
        myDataChildren.push(item);
      }
      if (info.gangAoResumeName) {
        let item = {} as Item;
        item.key = '4';
        item.label = info.gangAoResumeShu;
        item.title = '港澳地区';
        item.level = 2;
        //@ts-ignore
        myDataChildren.push(item);
      }
      if (info.teamList && info.teamList.length > 0) {
        info.teamList.forEach((item: any) => {
          let teamItem = {} as Item;
          teamItem.key = `teamLevel1_${item.teamId}`;
          teamItem.label = item.resumeNum;
          teamItem.title = item.teamName;
          teamItem.level = 2;
          //@ts-ignore
          myDataChildren.push(teamItem);
        });
      }
      //@ts-ignore
      itemsTemp.push({
        type: 'divider',
        title: '人才数据',
        label: '',
        key: '1',
        level: 1,
        children: myDataChildren,
      });
      //@ts-ignore
      itemsTemp.push({ type: 'divider' });
      if (info.mytalentResumeName) {
        let mytalentResumeNameChildren = [];
        if (info.personResumeName) {
          let item = {} as Item;
          item.key = '51';
          item.label = info.personResumeShu;
          item.title = '我的简历';
          item.level = 2;
          //@ts-ignore
          mytalentResumeNameChildren.push(item);
        }
        if (info.recommendResumeName) {
          let item = {} as Item;
          item.key = '52';
          item.label = info.recommendResumeShu;
          item.title = '我的推荐';
          item.level = 2;
          //@ts-ignore
          mytalentResumeNameChildren.push(item);
        }
        if (info.interviewResumeName) {
          let item = {} as Item;
          item.key = '53';
          item.label = info.interviewResumeShu;
          item.title = '我的面试';
          item.level = 2;
          //@ts-ignore
          mytalentResumeNameChildren.push(item);
        }
        if (info.offerResumeName) {
          let item = {} as Item;
          item.key = '54';
          item.label = info.offerResumeShu;
          item.title = '我的OFFER';
          item.level = 2;
          //@ts-ignore
          mytalentResumeNameChildren.push(item);
        }
        //@ts-ignore
        itemsTemp.push({
          title: '我的人才',
          label: '',
          key: '5',
          level: 1,
          children: mytalentResumeNameChildren,
        });
        //@ts-ignore
        itemsTemp.push({ type: 'divider' });
      }
      if (info.sortResumeName) {
        //@ts-ignore
        itemsTemp.push({ title: '人才分类', label: '', key: '6', level: 1 });
        //@ts-ignore
        itemsTemp.push({ type: 'divider' });
      }
      if (info.serchResumeName) {
        //@ts-ignore
        itemsTemp.push({ divider: false, title: '一键搜索', label: '', key: '7', level: 1 });
        //@ts-ignore
        itemsTemp.push({ type: 'divider' });
      }
      //@ts-ignore
      this.resumeMenu = itemsTemp;
    },
    /**
     * 查询recruitId用户菜单
     * @description: 查询recruitId用户菜单
     */
    async fetchInfo() {
      let formData = new FormData();
      formData.append('recruitId', '444');
      const res = await fetchApi.resumeMenu(formData);
      if (res) {
        // save token
        this.setInfo(res.info);
      }
      return res;
    },
    /**
     * 根据recruitId和teamId查询团队的简历数
     * @param param teamId
     * @returns
     */
    async fetchTeamData(param: string) {
      if (param.includes('teamLevel1')) {
        let formData = new FormData();
        formData.append('recruitId', '444');
        formData.append('teamId', param.split('_')[1]);
        const res = await fetchApi.queryTeamData(formData);
        if (res.info) {
          this.resumeMenu.forEach((item) => {
            if (item.key === '1') {
              item.children?.forEach((temp) => {
                if (temp.key === param) {
                  let myDataChildren = [];
                  res.info.forEach((items: any) => {
                    let teamItem = {} as Item;
                    teamItem.key = `teamLevel2_${items.teamId}`;
                    teamItem.label = items.resumeNum;
                    teamItem.title = items.teamName;
                    teamItem.level = 2;
                    //@ts-ignore
                    myDataChildren.push(teamItem);
                  });
                  temp.children = myDataChildren;
                }
              });
            }
          });
          this.resumeMenu = [...this.resumeMenu];
        }
        return res;
      }
      if (param.includes('teamLevel2')) {
        let formData = new FormData();
        formData.append('recruitId', '444');
        formData.append('teamId', param.split('_')[1]);
        const res = await fetchApi.queryPersonData(formData);
        if (res.info) {
          this.resumeMenu.forEach((item) => {
            if (item.key === '1') {
              item.children?.forEach((temp) => {
                //@ts-ignore
                if (temp.children?.length > 0) {
                  temp.children?.forEach((child) => {
                    if (child.key === param) {
                      let myDataChildren = [];
                      res.info.forEach((items: any) => {
                        let teamItem = {} as Item;
                        teamItem.key = `teamLevel3_${items.recruitId}`;
                        teamItem.label = items.resumeNum;
                        teamItem.title = items.name;
                        teamItem.level = 2;
                        //@ts-ignore
                        myDataChildren.push(teamItem);
                      });
                      child.children = myDataChildren;
                    }
                  });
                }
              });
            }
          });
          this.resumeMenu = [...this.resumeMenu];
        }
        return res;
      }
    },
    /**
     * 根据品牌类型参数查询
     * @param param 品牌的类型参数
     */
    async queryBranList(param: SearchResumeList) {
      let formData = new FormData();
      formData.append('retail', param.hangye || '');
      formData.append('category', param.pinlei || '');
      formData.append('leibie', param.leibie || '');
      formData.append('pinji', param.pinji || '');
      const res = await fetchApi.queryBranList(formData);
      if (res.info) {
        this.brandList = res.info.brandList;
      }
    },
    /**
     * 根据职位数据类型参数查询
     * @param param 职位的类型参数
     */
    async queryPositionsList(param: SearchResumeList) {
      let formData = new FormData();
      formData.append('industry', param.hangye2 || '');
      formData.append('jobCategory2', param.positionType || '');
      formData.append('management2', param.positionLevel || '');
      const res = await fetchApi.queryPositionsList(formData);
      if (res.info) {
        this.positionsList = res.info.postList;
      }
    },
     /**
     * 根据城市商场数据类型参数查询
     * @param param 城市商场
     */
     async queryMarkList(param: SearchResumeList) {
      let formData = new FormData();
      formData.append('city', (param.city ? (param.city.includes("-") ?  param.city.split("-")[1] : param.city) : ''));
      formData.append('marketName', param.marketName || '');
      formData.append('curPage', '1');
      const res = await fetchApi.queryMarkList(formData);
      if (res.info) {
        this.markIdList = res.info;
      }
    },
     /**
     * 根据公司数据类型参数查询
     * @param param 行业
     */
     async queryCompanyList(param: SearchResumeList) {
      let formData = new FormData();
      formData.append('industry', param.hangye || '');
      formData.append('companyName', '');
      const res = await fetchApi.queryCompanyList(formData);
      if (res.info) {
        this.companyList = res.info;
      }
    },
    /**
     * 根据搜索条件查询简历
     * @param param 搜索条件参数
     */
    async queryResumeList(param: SearchResumeList) {
      //@ts-ignore
      param = {
        ...param,
        pageNumber: this.pagination.current || 1,
        pageSize: this.pagination.pageSize || 15,
        recruitId: '444',
      };
      const res = await fetchApi.queryResumeList(this.paramSearchResumeListToformData(param));
      if (res.info) {
        let info = res.info;
        let list = res.info.list;
        let tempList = [];
        list.forEach((item: any, index) => {
          let tempItem = {};
          tempItem.index = (info.pageNumber - 1) * info.pageSize + (index + 1);
          tempItem.userName = item.userName;
          tempItem.phone = item.phone;
          tempItem.gender = item.gender == 'F' ? '女' : '男';
          tempItem.age = item.age;
          tempItem.positionName = item.positionName;
          tempItem.registTimeStr = item.registTimeStr;
          tempItem.lastUpdateTimeStr = item.lastUpdateTimeStr;
          tempItem.projectFlag = item.projectFlag;
          tempItem.options = item.options;
          tempList.push(tempItem);
        });
        this.resumeList = tempList;
        this.pagination = {
          currentPage: parseInt(info.pageNumber),
          pageSize: parseInt(info.pageSize),
          total: info.totalCount,
        };
      }
    },
    /**
     * 根据参数返回 formData
     * @param param 搜索参数
     * @returns formData
     */
    paramSearchResumeListToformData(param: SearchResumeList) {
      let formData = new FormData();
      formData.append('pageNumber', param.pageNumber || '1');
      formData.append('pageSize', param.pageSize || '10');
      formData.append('recruitId', param.recruitId || '');
      formData.append('hangye', param.hangye || '');
      formData.append('pinlei', param.pinlei || '');
      formData.append('leibie', param.leibie || '');
      formData.append('pinji', param.pinji || '');
      formData.append('pinjibie', param.pinjibie || '');
      formData.append('markId', param.markId || '');
      formData.append('brandId', param.brandId || '');
      formData.append('guoji', param.guoji || '');
      formData.append('huji', (param.huji ? (param.huji.includes("-") ?  param.huji.split("-")[1] : param.huji) : ''));
      formData.append('city', (param.city ? (param.city.includes("-") ?  param.city.split("-")[1] : param.city) : ''));
      formData.append('userName', param.userName || '');
      formData.append('phoneNum', param.phoneNum || '');
      formData.append('email', param.email || '');
      formData.append('sex', param.sex || '');
      formData.append('hangye2', param.hangye2 || '');
      formData.append('positionType', param.positionType || '');
      formData.append('positionLevel', param.positionLevel || '');
      formData.append('positionId', param.positionId || '');
      formData.append('companyName', param.companyName || '');
      formData.append('hunyu', param.hunyu || '');
      formData.append('language', param.language || '');
      formData.append('wantCity', param.wantCity || '');
      formData.append('resumeType', param.resumeType || '');
      formData.append('education', param.education || '');
      formData.append('keyWords', (param.keyWords ? param.keyWords.replaceAll('，',',').replaceAll(',','|') : ''));
      formData.append('brandNp', param.brandNp || '');
      formData.append('companyNameRuleOut', param.companyNameRuleOut || '');
      formData.append('companyNameNp', param.companyNameNp || '');
      formData.append('marketNp', param.marketNp || '');
      formData.append('positionNp', param.positionNp || '');
      formData.append('minHeight', param.minHeight || '');
      formData.append('maxHeight', param.maxHeight || '');
      formData.append('minAge', param.minAge || '');
      formData.append('maxAge', param.maxAge || '');
      return formData;
    },
    /**
     * 添加人才分类功能
     * @param param 搜索条件参数
     */
    async addSortResumeName(param: string) {
      let formData = new FormData();
      formData.append('recruitId', '444');
      formData.append('realNameEn', 'Eason Dang');
      formData.append('sortName', param);
      const res = await fetchApi.addSortResumeName(formData);
      if (res.code == 1) {
        this.fetchInfo();
      }
    },
    /**
     * 添加一键搜索功能
     * @param param 搜索条件参数
     */
    async fetchAddSearchResume(param: SearchResumeList, searchName: string) {
      param = { ...param, pageNumber: '1', pageSize: '10', recruitId: '444' };
      let formData = this.paramSearchResumeListToformData(param);
      formData.append('serchName', searchName);
      const res = await fetchApi.fetchAddSearchResume(formData);
      if (res.code == 1) {
        this.fetchInfo();
      }
    },
  },
});

export function useResumeListStoreWithOut() {
  return useResumeListStore(store);
}
