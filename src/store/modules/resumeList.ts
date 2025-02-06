import { defineStore } from 'pinia';
import { store } from '/@/store';
import fetchApi from '/@/api/resumeList';
import { formatToDateMinute } from '/@/utils/dateUtil';
import { SearchResumeList, Item } from '/@/api/resumeList/model';
import {stringifyToFormData} from '/@/utils/formatDataUntils';
interface PaginationItem {
  current: Number;
  pageSize: Number;
  total: Number;
}
interface ResumeListState {
  resumeMenu: Item[]; //左侧菜单数据
  brandList: []; //品牌数据
  resumeList: []; //查询结果数据
  positionsList: []; //职位数据
  markIdList: []; //商场数据
  companyList: []; //公司数据全部
  companyCnList: []; //公司数据简称
  pagination: {}; //分页
  formState: {}; //搜索条件
  systemType: string; //返回的权限 A T V S
  loginNameChangeRecruitId: string; //切换后我的人才id
  loginNameChangeRecruitName: string; //切换后我的人才姓名
  teamPersonChangeArr: []; //查询团队数据
  serchResumeListNum: number; //一键搜索个数
  serchResumeUpdate: boolean; //一键搜索修改状态
  serchResumeUpdateData: {}; //一键搜索修改状态
  sortResumeUpdate: boolean; //人才分类修改状态
  sortResumeUpdateData: {}; //人才分类修改状态
  tableLoading: boolean; //简历查询状态
  searchResumeType: string; //搜索查询内容 1 我的推荐  2 我的面试  3 我的OFFER
  searchWorkExp: string; //搜索查询内容 1 展示工作经历  2 不展示工作经历
  recommendCounselorArr: []; //查询推荐顾问
  enterpriseConsultantArr: []; //查询企业顾问
}
const loginVueUser: { loginName: ''; loginId: ''; loginTocken: '' } = JSON.parse(
  localStorage.getItem('loginVueUser'),
);
export const useResumeListStore = defineStore({
  id: 'app-Resume-List',
  state: (): ResumeListState => ({
    //用户菜单
    resumeMenu: [],
    formState: {
      ...({} as SearchResumeList),
      companyNameRuleOut: '1',
      brandRuleOut: '1',
      companyNameNp: '1',
      brandNp: '1',
      marketNp: '1',
      positionNp: '1',
    },
    brandList: [],
    resumeList: [],
    positionsList: [],
    markIdList: [],
    companyList: [],
    companyCnList: [],
    systemType: '',
    searchResumeType: '',
    searchWorkExp: '1',
    loginNameChangeRecruitId: '',
    loginNameChangeRecruitName: '',
    serchResumeListNum: 0,
    tableLoading: false,
    serchResumeUpdate: false,
    serchResumeUpdateData: {} as SearchResumeList,
    sortResumeUpdate: false,
    sortResumeUpdateData: {} as SearchResumeList,
    teamPersonChangeArr: [],
    recommendCounselorArr: [],
    enterpriseConsultantArr: [],
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
      this.systemType = info.systemType;
      if (info.allResumeName) {
        let item = {} as Item;
        item.key = '1';
        item.label = `${info.allResumeNameJingShu}/${info.allResumeNameQuanShu}`;
        item.title = '全部简历';
        item.level = 2;
        //@ts-ignore
        myDataChildren.push(item);
      }
      if (info.gongResumeName) {
        let item = {} as Item;
        item.key = '2';
        item.label = info.gongResumeShu;
        item.title = '公共简历';
        item.level = 2;
        //@ts-ignore
        myDataChildren.push(item);
      }
      if (info.gangAoResumeName) {
        let item = {} as Item;
        item.key = '3';
        item.label = info.gangAoResumeShu;
        item.title = '港澳地区';
        item.level = 2;
        //@ts-ignore
        myDataChildren.push(item);
      }
      let teamDataChildren = [];
      let teamDataNum = 0;
      if (info.teamList && info.teamList.length > 0) {
        info.teamList.forEach((item: any) => {
          teamDataNum += parseInt(item.resumeNum);
          let teamItem = {} as Item;
          teamItem.key = `teamLevel1_${item.teamId}`;
          teamItem.label = item.resumeNum;
          teamItem.title = item.teamName;
          teamItem.level = 2;
          //@ts-ignore
          teamDataChildren.push(teamItem);
        });
      }
      if (info.teamList && info.teamList.length > 0) {
        let item = {} as Item;
        item.key = 'teamData';
        item.label = teamDataNum + '';
        item.title = '团队简历';
        item.children = teamDataChildren;
        item.level = 2;
        //@ts-ignore
        myDataChildren.push(item);
      }
      //@ts-ignore
      itemsTemp.push({
        type: 'divider',
        title: '人才数据',
        label: '',
        key: '01',
        level: 1,
        children: myDataChildren,
      });
      //@ts-ignore
      itemsTemp.push({ type: 'divider' });
      if (info.mytalentResumeName) {
        //@ts-ignore
        itemsTemp.push({
          title: '我的人才',
          label: 'Eason Dang',
          key: '51',
          level: 1,
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
        let serchResumeListChildren = [];
        if (info.serchResumeList && info.serchResumeList.length > 0) {
          this.serchResumeListNum = info.serchResumeList.length;
          serchResumeListChildren = info.serchResumeList.map((item) => ({
            key: `serchResume-${item.id}`,
            label: '',
            title: item.serch_name,
            level: 2,
          }));
        }
        //@ts-ignore
        itemsTemp.push({
          divider: false,
          title: '一键搜索',
          label: '',
          key: '7',
          level: 1,
          children: serchResumeListChildren,
        });
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
      formData.append('recruitId', loginVueUser.loginId);
      const res = await fetchApi.resumeMenu(formData);
      if (res) {
        // save token
        this.setInfo(res.info);
        this.fetchTeamData('51');
        this.resumeMenu.forEach((item) => {
          if (item.key === '01') {
            item.children?.forEach((temp) => {
              if (temp.key == 'teamData') {
                temp.children?.forEach((subItem) => {
                  this.fetchTeamData(subItem.key);
                });
              }
            });
          }
        });
        this.queryTeamPersonChange();
      }
    },
    /**
     * 根据id查询一键搜索内容
     * @param param 一键搜索id
     */
    async querySearchById(param) {
      let formData = new FormData();
      formData.append('id', param.split('-')[1]);
      const res = await fetchApi.queryResumeSerchData(formData);
      if (res.code == 1) {
        let result = {} as SearchResumeList;
        let hangye = [];
        if (res.info.hangye) {
          hangye = res.info.hangye.split(',');
        }
        let positionType = [];
        if (res.info.positionType) {
          positionType = res.info.positionType.split(',');
        }
        let positionLevel = [];
        if (res.info.positionLevel) {
          positionLevel = res.info.positionLevel.split(',');
        }
        let positionId = [];
        if (res.info.positionId) {
          positionId = res.info.positionId.split(',');
        }
        let city = [];
        if (res.info.city) {
          city = res.info.city.split(',');
        }
        let pinlei = [];
        if (res.info.pinlei) {
          pinlei = res.info.pinlei.split(',');
        }
        let leibie = [];
        if (res.info.pinlei) {
          leibie = res.info.leibie.split(',');
        }
        let pinjibie = [];
        if (res.info.pinjibie) {
          pinjibie = res.info.pinjibie.split(',');
        }
        let brandId = [];
        if (res.info.brandId) {
          brandId = res.info.brandId.split(',');
        }
        let markId = [];
        if (res.info.markId) {
          markId = res.info.markId.split(',');
        }
        let companyName = [];
        if (res.info.companyName) {
          companyName = res.info.companyName.split(',');
        }
        result = {
          ...res.info,
          hangye,
          hangye2: hangye,
          positionType,
          positionLevel,
          positionId,
          city,
          pinlei,
          leibie,
          pinjibie,
          brandId,
          markId,
          companyName,
        };
        this.serchResumeUpdateData = result;
        this.serchResumeUpdate = true;
      }
    },
    /**
     * 根据id查询人才分类内容
     * @param param 人才分类id
     */
    async querySortById(param) {
      let formData = new FormData();
      formData.append('id', param.split('-')[1]);
      const res = await fetchApi.querySortById(formData);
      if (res.code == 1) {
        let result = {} as SearchResumeList;
        let hangye = [];
        if (res.info.hangye) {
          hangye = res.info.hangye.split(',');
        }
        let positionType = [];
        if (res.info.positionType) {
          positionType = res.info.positionType.split(',');
        }
        let positionLevel = [];
        if (res.info.positionLevel) {
          positionLevel = res.info.positionLevel.split(',');
        }
        let positionId = [];
        if (res.info.positionId) {
          positionId = res.info.positionId.split(',');
        }
        let city = [];
        if (res.info.city) {
          city = res.info.city.split(',');
        }
        let pinlei = [];
        if (res.info.pinlei) {
          pinlei = res.info.pinlei.split(',');
        }
        let leibie = [];
        if (res.info.pinlei) {
          leibie = res.info.leibie.split(',');
        }
        let pinjibie = [];
        if (res.info.pinjibie) {
          pinjibie = res.info.pinjibie.split(',');
        }
        let brandId = [];
        if (res.info.brandId) {
          brandId = res.info.brandId.split(',');
        }
        let markId = [];
        if (res.info.markId) {
          markId = res.info.markId.split(',');
        }
        let companyName = [];
        if (res.info.companyName) {
          companyName = res.info.companyName.split(',');
        }
        result = {
          ...res.info,
          hangye,
          hangye2: hangye,
          positionType,
          positionLevel,
          positionId,
          city,
          pinlei,
          leibie,
          pinjibie,
          brandId,
          markId,
          companyName,
        };
        this.sortResumeUpdateData = result;
        this.sortResumeUpdate = true;
      }
    },
    /**
     * 根据recruitId和teamId查询团队的简历数
     * @param param teamId
     * @returns
     */
    async fetchTeamData(param: string,type= '') {
      console.log(param);
      if (param == '52') {
        this.searchResumeType = '1';
      } else if (param == '53') {
        this.searchResumeType = '2';
      } else if (param == '54') {
        this.searchResumeType = '3';
      } else {
        this.searchResumeType = '';
      }
      this.pagination = { ...this.pagination, current: 1 };
      this.formState = {
        ...this.formState,
        sortId: '',
        leftType: '',
        recruitId: loginVueUser.loginId,
        leftRecruitId: '',
        leftTeamId: '',
      };
      if (param.includes('teamLevel1')) {
        let formData = new FormData();
        formData.append('recruitId', loginVueUser.loginId);
        formData.append('teamId', param.split('_')[1]);
        if (type) {
          this.formState = {
            ...this.formState,
            leftType: '4',
            leftTeamId: param.split('_')[1],
          };
          //@ts-ignore
          this.queryResumeList(this.formState);
        }
        if (param.split('_')[1] != "0903") {
          const res = await fetchApi.queryTeamData(formData);
          if (res.info) {
            this.resumeMenu.forEach((item) => {
              if (item.key === '01') {
                item.children?.forEach((temp) => {
                  if (temp.key == 'teamData') {
                    temp.children?.forEach((subItem) => {
                      if (subItem.key === param) {
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
                        subItem.children = myDataChildren;
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
      }
      if (param.includes('teamLevel2') ) {
        let formData = new FormData();
        formData.append('recruitId', loginVueUser.loginId);
        formData.append('teamId', param.split('_')[1]);
        this.formState = {
          ...this.formState,
          leftType: '4',
          leftTeamId: param.split('_')[1],
        };
        //@ts-ignore
        this.queryResumeList(this.formState);
        const res = await fetchApi.queryPersonData(formData);
        if (res.info) {
          this.resumeMenu.forEach((item) => {
            if (item.key === '01') {
              item.children?.forEach((temp) => {
                //@ts-ignore
                if (temp.children?.length > 0) {
                  temp.children?.forEach((child) => {
                    //@ts-ignore
                    if (child.children?.length > 0) {
                      child.children?.forEach((sumItem) => {
                        if (sumItem.key === param) {
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
                          sumItem.children = myDataChildren;
                        }
                      });
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
      if (param.includes('serchResume')) {
        let formData = new FormData();
        formData.append('id', param.split('-')[1]);
        const res = await fetchApi.queryResumeSerchData(formData);
        if (res.code == 1) {
          let result = {} as SearchResumeList;
          let hangye = [];
          if (res.info.hangye) {
            hangye = res.info.hangye.split(',');
          }
          let positionType = [];
          if (res.info.positionType) {
            positionType = res.info.positionType.split(',');
          }
          let positionLevel = [];
          if (res.info.positionLevel) {
            positionLevel = res.info.positionLevel.split(',');
          }
          let positionId = [];
          if (res.info.positionId) {
            positionId = res.info.positionId.split(',');
          }
          let city = [];
          if (res.info.city) {
            city = res.info.city.split(',');
          }
          let pinlei = [];
          if (res.info.pinlei) {
            pinlei = res.info.pinlei.split(',');
          }
          let leibie = [];
          if (res.info.pinlei) {
            leibie = res.info.leibie.split(',');
          }
          let pinjibie = [];
          if (res.info.pinlei) {
            pinjibie = res.info.pinjibie.split(',');
          }
          let brandId = [];
          if (res.info.brandId) {
            brandId = res.info.brandId.split(',');
          }
          let markId = [];
          if (res.info.markId) {
            markId = res.info.markId.split(',');
          }
          let companyName = [];
          if (res.info.companyName) {
            companyName = res.info.companyName.split(',');
          }
          result = {
            ...res.info,
            hangye,
            hangye2: hangye,
            positionType,
            positionLevel,
            positionId,
            city,
            pinlei,
            leibie,
            pinjibie,
            brandId,
            markId,
            companyName,
          };
          this.formState = result;

          //@ts-ignore
          this.queryResumeList(this.formState);
        }
      }
      if (param == '1' || param == '2' || param == '3') {
        this.formState = { ...this.formState, leftType: param };
        //@ts-ignore
        this.queryResumeList(this.formState);
      }
      if (param == '5') {
        this.formState = {
          ...this.formState,
          leftType: param,
          recruitId: this.loginNameChangeRecruitId || loginVueUser.loginId,
          leftRecruitId: this.loginNameChangeRecruitId || loginVueUser.loginId,
        };
        //@ts-ignore
        this.queryResumeList(this.formState);
      }
      if (param == '51') {
        let formData = new FormData();
        formData.append('recruitId', loginVueUser.loginId);
        //formData.append('viewType', this.systemType);
        formData.append('viewType', 'S');
        const res = await fetchApi.queryPersonTalentData(formData);
        this.queryMyPersonData(res, param);
      }
      if (param.includes('sortResume')) {
        this.formState = { ...this.formState,leftType: "6", sortId: param.split('-')[1] };
        //@ts-ignore
        this.queryResumeList(this.formState);
      }
    },
    /**
     * 根据recruitId切换我的人才查询
     * @param recruitId 切换的id
     * @param viewType T 部门视角 （非Leader 此参数不生效 T也不影响） V 团队L视角  S个人视角
     */
    async resumeLoginNameChange(recruitId: string, viewType: string) {
    
      let formData = new FormData();
      if ( viewType == "T") {
        this.loginNameChangeRecruitId = recruitId.split('-')[0];
        this.loginNameChangeRecruitName = recruitId.split('-')[1];
        formData.append('recruitId', recruitId.split('-')[0] || loginVueUser.loginId);
        formData.append('viewType', viewType);
        this.formState = { ...this.formState, viewType: "T" };
      } else {
        this.loginNameChangeRecruitId = loginVueUser.loginId;
        this.loginNameChangeRecruitName = loginVueUser.loginName;
        formData.append('recruitId', loginVueUser.loginId);
        formData.append('viewType', "S");
        this.formState = { ...this.formState, viewType: "S" };
      }
      const res = await fetchApi.queryPersonTalentData(formData);
      this.queryMyPersonData(res, '51');
    },
    /**
     * 我的人才数据查询返回
     * @param res 接口返回数据
     */
    queryMyPersonData(res, param) {
      if (res.code == 1 && res.info) {
        const info = res.info;
        let mytalentResumeNameChildren = [];
        if (info.personResumeName) {
          let item = {} as Item;
          item.key = '5';
          item.label = info.personResumeShu;
          item.title = '我的简历';
          item.level = 2;
          // let personTemp = [];
          // if (info.personResumeNameSale) {
          //   let subItem = {} as Item;
          //   subItem.key = '511';
          //   subItem.label = info.personResumeNameSaleNum;
          //   subItem.title = info.personResumeNameSale;
          //   subItem.level = 3;
          //   //@ts-ignore
          //   personTemp.push(subItem);
          // }
          // if (info.personResumeNameManager) {
          //   let subItem = {} as Item;
          //   subItem.key = '512';
          //   subItem.label = info.personResumeNameManagerNum;
          //   subItem.title = info.personResumeNameManager;
          //   subItem.level = 3;
          //   //@ts-ignore
          //   personTemp.push(subItem);
          // }
          // item.children = personTemp;
          //@ts-ignore
          mytalentResumeNameChildren.push(item);
        }
        if (info.recommendResumeName) {
          let item = {} as Item;
          item.key = '52';
          item.label = `${info.recommendLiuchengShu}/${info.recommendEndShu}`;
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
          item.label = `${info.offerLiuchengResumeShu}/${info.offerEndResumeShu}`;
          item.title = '我的OFFER';
          item.level = 2;
          //@ts-ignore
          mytalentResumeNameChildren.push(item);
        }
        let myPersonSortResume = [];
        if (info.sortResumeName && info.sortResumeList && info.sortResumeList.length > 0) {
          info.sortResumeList.forEach((item) => {
            let subItem = {} as Item;
            subItem.key = `sortResume-${item.sortId}`;
            subItem.label = item.resumeNum || '0';
            subItem.title = item.sortName;
            subItem.level = 2;
            //@ts-ignore
            myPersonSortResume.push(subItem);
          });
        }

        this.resumeMenu.forEach((item) => {
          if (item.key == param) {
            item.children = mytalentResumeNameChildren;
            item.label = this.loginNameChangeRecruitName
              ? this.loginNameChangeRecruitName
              : item.label;
          }
          if (item.key == '6') {
            item.children = myPersonSortResume;
          }
        });
        this.resumeMenu = [...this.resumeMenu];
      }
    },
    /**
     * 根据品牌类型参数查询
     * @param param 品牌的类型参数
     */
    async queryBranList(param?: SearchResumeList) {
      let formData = new FormData();
      formData.append('retail', param?.hangye || '');
      formData.append('category', param?.pinlei || '');
      formData.append('leibie', param?.leibie || '');
      formData.append('pinji', param?.pinji || '');
      const res = await fetchApi.queryBranList(formData);
      if (res.info) {
        this.brandList = res.info.brandList;
      }
    },
    /**
     * 根据职位数据类型参数查询
     * @param param 职位的类型参数
     */
    async queryPositionsList(param?: SearchResumeList) {
      let formData = new FormData();
      formData.append('industry', param?.hangye2 || '');
      formData.append('jobCategory2', param?.positionType || '');
      formData.append('management2', param?.positionLevel || '');
      const res = await fetchApi.queryPositionsList(formData);
      if (res.info) {
        this.positionsList = res.info.postList;
      }
    },
    /**
     * 根据城市商场数据类型参数查询
     * @param param 城市商场
     */
    async queryMarkList(param?: SearchResumeList) {
      let formData = new FormData();
      formData.append(
        'city',
        param?.city ? (param.city.includes('-') ? param.city.split('-')[1] : param.city) : '',
      );
      formData.append('marketName', param?.marketName || '');
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
    async queryCompanyList(param?: SearchResumeList) {
      let formData = new FormData();
      formData.append('industry', '');
      formData.append('companyName', '');
      const res = await fetchApi.queryCompanyList(formData);
      if (res.info) {
        this.companyList = res.info;
      }
    },
    /**
     * 根据公司数据类型参数查询
     * @param param 行业
     */
    async queryCompanyCnList() {
      const res = await fetchApi.queryCompanyCnList();
      if (res.info) {
        this.companyCnList = res.info;
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
      };
      this.tableLoading = true;
      const res = await fetchApi.queryResumeList(this.paramSearchResumeListToformData(param));
      if (res.info) {
        this.tableLoading = false;
        let info = res.info;
        let list = res.info.list;
        let tempList = [];
        list.forEach((item: any, index) => {
          let tempItem = {};
          tempItem.index = (info.pageNumber - 1) * info.pageSize + (index + 1);
          tempItem.key = item.id;
          tempItem.userName = item.userName;
          tempItem.addConsultantId = item.addConsultantId;
          tempItem.phone = item.phone;
          tempItem.gender = item.gender == 'F' ? '女' : '男';
          tempItem.age = item.age;
          tempItem.currentCity = item.currentCity;
          tempItem.positionName = item.positionName;
          tempItem.customerServiceName = item.customerServiceName || '公共库';
          tempItem.registTimeStr = item.registTimeStr;
          tempItem.lastUpdateTimeStr = formatToDateMinute(item.lastUpdateTimeStr);
          tempItem.checkFlag = item.checkFlag || ""; //待核 最新 过期
          tempItem.fristFlag = item.fristFlag || ""; //首增
          tempItem.commonFlag = item.commonFlag || ""; //私有
          tempItem.onlyFlag = item.onlyFlag || ""; //唯一
          tempItem.gognGongFlag = item.gognGongFlag || ""; //公共
          tempItem.limitFlag = item.limitFlag || ""; //限制 保护
          tempItem.options = item.options;
          tempItem.leftType = param.leftType || "2";//参数
          tempItem.projectFlag = item.projectFlag;
          // if (item.works) {
          //   let workTemp = "";
          //   item.works.forEach(subItem => {
          //     workTemp += `${subItem.companyName}<br/>`;
          //   })
          //   tempItem.works = workTemp;
          // } else {
          //   tempItem.works = "";
          // }
          tempItem.works = item.works;
          tempList.push(tempItem);
        });
        this.resumeList = tempList;
        this.pagination = {
          current: parseInt(info.pageNumber),
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
      formData.append('recruitId', param.recruitId || loginVueUser.loginId);
      formData.append('hangye', param.hangye || '');
      formData.append('pinlei', param.pinlei || '');
      formData.append('leibie', param.leibie || '');
      formData.append('pinji', param.pinji || '');
      formData.append('pinjibie', param.pinjibie || '');
      formData.append('markId', param.markId || '');
      formData.append('brandId', param.brandId || '');
      formData.append('guoji', param.guoji || '');
      formData.append(
        'huji',
        param.huji ? (param.huji.includes('-') ? param.huji.split('-')[1] : param.huji) : '',
      );
      formData.append(
        'city',
        param.city ? (param.city.includes('-') ? param.city.split('-')[1] : param.city) : '',
      );
      formData.append('userName', param.userName || '');
      formData.append('phoneNum', param.phoneNum || '');
      formData.append('email', param.email || '');
      formData.append('sex', param.sex || '');
      if (
        (param.positionType && param.positionType.length > 0) ||
        (param.positionLevel && param.positionLevel.length > 0)
      ) {
        formData.append('hangye2', param.hangye || '');
      } else {
        formData.append('hangye2', '');
      }
      formData.append('positionType', param.positionType || '');
      formData.append('positionLevel', param.positionLevel || '');
      formData.append('positionId', param.positionId || '');
      formData.append('companyName', param.companyName || '');
      formData.append('hunyu', param.hunyu || '');
      formData.append('language', param.language || '');
      formData.append('wantCity', param.wantCity || '');
      formData.append('resumeType', param.resumeType || '');
      formData.append('education', param.education || '');
      formData.append(
        'keyWords',
        param.keyWords ? param.keyWords.replaceAll('，', ',').replaceAll(',', '|') : '',
      );
      formData.append('brandNp', param.brandNp || '');
      formData.append('brandRuleOut', param.brandRuleOut || '');
      formData.append('companyNameRuleOut', param.companyNameRuleOut || '');
      formData.append('companyNameNp', param.companyNameNp || '');
      formData.append('marketNp', param.marketNp || '');
      formData.append('positionNp', param.positionNp || '');
      formData.append('minHeight', param.minHeight || '');
      formData.append('maxHeight', param.maxHeight || '');
      formData.append('minAge', param.minAge || '');
      formData.append('maxAge', param.maxAge || '');
      formData.append('leftTeamId', param.leftTeamId || '');
      formData.append('leftRecruitId', param.leftRecruitId || '');
      formData.append('leftType', param.leftType || '2');
      formData.append('isWorkExp', this.searchWorkExp);
      formData.append('sortId', param.sortId || '');
      formData.append('viewType', param.viewType || 'T');
      return formData;
    },
    /**
     * 添加人才分类功能
     * @param param 搜索条件参数
     */
    async addSortResumeName(param: any) {
      let formData = this.paramSearchResumeListToformData(param);
      formData.set('recruitId', loginVueUser.loginId);
      formData.append('realNameEn', loginVueUser.loginName);
      formData.append('sortName', param.sortName);
      if (this.sortResumeUpdateData) {
        formData.append('id', this.sortResumeUpdateData.id);
        const res = await fetchApi.updateResumeSort(formData);
        if (res.code == 1) {
          this.fetchInfo();
        }
      } else {
        const res = await fetchApi.addSortResumeName(formData);
        if (res.code == 1) {
          this.fetchInfo();
        }
      }
    },
    /**
     * 添加一键搜索功能
     * @param param 搜索条件参数
     */
    async fetchAddSearchResume(param: SearchResumeList, searchName: string) {
      param = { ...param, pageNumber: '1', pageSize: '10', recruitId: loginVueUser.loginId };
      let formData = this.paramSearchResumeListToformData(param);
      formData.append('serchName', searchName);
      if (this.serchResumeUpdate) {
        formData.append('id', this.serchResumeUpdateData.id);
        const res = await fetchApi.fetchUpdateSearchResume(formData);
        if (res.code == 1) {
          this.fetchInfo();
        }
      } else {
        const res = await fetchApi.fetchAddSearchResume(formData);
        if (res.code == 1) {
          this.fetchInfo();
        }
      }
    },
    /**
     * 切换我的人才查询人才
     */
    async queryTeamPersonChange() {
      let res = { code: '', info: '' };
      if (this.systemType == 'A') {
        res = await fetchApi.queryTeamPersonChangeSystemA();
      } else {
        let formData = new FormData();
        formData.append('recruitId', loginVueUser.loginId);
        res = await fetchApi.queryTeamPersonChangeSystemTs(formData);
      }
      if (res.code == '1') {
        this.teamPersonChangeArr = res.info;
      }
    },
    /**
     * 查询推荐顾问
     * @param isQuit 在职 离职
     * @param teamId 团队ID
     */
    async queryRecommendCounselor(isQuit?: string, teamId?: string) {
      let formData = new FormData();
      formData.append('isQuit', isQuit || '');
      formData.append('teamId', teamId || '');
      formData.append('SystemRecruitId', loginVueUser.loginId);
      let res = await fetchApi.queryRecommendCounselor(formData);
      if (res.code == '1') {
        this.recommendCounselorArr = res.info;
      }
    },
    /**
     * 查询企业顾问
     * @returns
     */
    async queryEnterpriseConsultant(teamId = '') {
      let formData = new FormData();
      formData.append('teamId', teamId);
      const res = await fetchApi.queryEnterpriseConsultant(formData);
      if (res.code == 1) {
        this.enterpriseConsultantArr = res.info;
      }
      return res;
    },
     /**
     * 查询顾问推荐记录
     * @returns
     */
     async queryRecommendResumeButton(params) {
      params = {...params,
        SystemRecruitId: this.loginNameChangeRecruitId ||loginVueUser.loginId,
        recommendRecruitId: params.recommendRecruitId || this.loginNameChangeRecruitId || loginVueUser.loginId,
        pageNumber: params.pageNumber || "1"
      }
      let temp = stringifyToFormData(params);
      const res = await fetchApi.queryRecommendResumeButton(temp);
      return res;
    },
     /**
     * 查询顾问面试跟踪记录
     * @returns
     */
     async queryRecommendInterview(params) {
      params = {...params,
        realRecruitId: this.loginNameChangeRecruitId || loginVueUser.loginId,
        SystemRecruitId: this.loginNameChangeRecruitId || loginVueUser.loginId,
        recruitId: params.recruitId || this.loginNameChangeRecruitId || loginVueUser.loginId,
        pageNumber: params.pageNumber || "1",
        typeNumber: params.typeNumber || "3"}
      let temp = stringifyToFormData(params);
      const res = await fetchApi.queryRecommendInterview(temp);
      return res;
    },
      /**
     * 查询顾问offer记录
     * @returns
     */
      async queryRecommendOffer(params) {
        params = {...params,
          SystemRecruitId: loginVueUser.loginId}
        let temp = stringifyToFormData(params);
        const res = await fetchApi.queryRecommendOffer(temp);
        return res;
      },
      /**
     * 查询顾问offer记录
     * @returns
     */
      async querySystemFunction() {
        let formData = new FormData();
        formData.append('SystemRecruitId', loginVueUser.loginId);
        const res = await fetchApi.querySystemFunction(formData);
        return res;
      },
  },
});

export function useResumeListStoreWithOut() {
  return useResumeListStore(store);
}
