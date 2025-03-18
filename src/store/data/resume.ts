export const marriageArr = [
  { label: '未婚', value: '未婚' },
  { label: '已婚已育', value: '已婚已育' },
  { label: '已婚未育', value: '已婚未育' },
  { label: '离异', value: '离异' },
  { label: '保密', value: '保密' },
];
export const marriageEnArr = [
  { label: 'Secret', value: 'Secret', cn: '保密'},
  { label: 'Single', value: 'Single' , cn: '未婚'},
  { label: 'Married Without Children', value: 'Married Without Children' , cn: '已婚未育'},
  { label: 'Married With Children', value: 'Married With Children', cn: '已婚已育' },
  { label: 'Divorce', value: 'Divorce', cn: '离异' },
];
export const brandArrDetail = [
  {
    retail: '零售业',
    categoryArr: [
      '服装服饰',
      '珠宝腕表',
      '儿童',
      '化妆品',
      '食品茶品',
      '电子电器',
      '家具家居',
      '酒类',
      '商超',
    ],
  },
  { retail: '汽车房产', categoryArr: ['汽车摩托', '房产别墅'] },
  { retail: '酒店餐饮', categoryArr: ['服务'], title: '酒店' },
  { retail: '出行服务', categoryArr: ['服务'], title: '出行' },
  { retail: '美容美体', categoryArr: ['服务'], title: '美容' },
  { retail: '金融服务', categoryArr: ['服务'], title: '金融' },
  { retail: '生活服务', categoryArr: ['服务'], title: '生活' },
  { retail: '其他服务', categoryArr: ['服务'], title: '其他' },
  { retail: '职能岗位', categoryArr: []},
];
export const brandCategoryArr = [
  {
    category: '服装服饰',
    leibie: [
      '全品类',
      '皮具',
      '服装',
      '男品类',
      '女品类',
      '配饰眼镜',
      '鞋履',
      '集合店',
      '内衣',
      '箱包',
      '运动户外',
      '典当寄售',
      '生活方式',
      '电子商务',
    ],
  },
  { category: '珠宝腕表', leibie: ['黄金', '珠宝', '腕表', '饰品', '集合店'] },
  { category: '儿童', leibie: ['童装', '婴童', '玩具'] },
  { category: '化妆品', leibie: ['化妆品', '洗护', '集合店'] },
  { category: '食品茶品', leibie: ['食品', '茶叶'] },
  { category: '电子电器', leibie: ['美容仪器', '家用电器', '手机数码'] },
  { category: '家具家居', leibie: ['家具', '家居', '家具卖场'] },
  { category: '酒类', leibie: ['洋酒', '红酒', '白酒', '啤酒', '集合店'] },
  { category: '商超', leibie: ['购物中心', '仓储式会员店', '超市', '便利店'] },
  { category: '汽车摩托', leibie: ['新能源', '传统汽车', '摩托车', '集合店'] },
  { category: '房产别墅', leibie: ['房产别墅'] },
  { category: '服务', leibie: ['酒店', '餐饮酒吧', '咖啡茶饮', '烘焙'], title: '酒店' },
  { category: '服务', leibie: ['航空', '邮轮', '高铁', '旅行服务'], title: '出行' },
  { category: '服务', leibie: ['美容美发', '医美'], title: '美容' },
  { category: '服务', leibie: ['银行证券', '保险', '金融服务'], title: '金融' },
  {
    category: '服务',
    leibie: ['改衣', '摄影', '健身', '物业', '教培', '医疗', '亲子游乐', '洗衣护理', '艺术空间'],
    title: '生活',
  },
  { category: '其他', leibie: ['其他', '新媒体', '电子商务'], title: '其他' },
];
export const positionsUpArrTitle = [
  {
    industry: '零售业',
    content: [
      {
        jobCategory: '门店销售',
        management: ['基础级别', '资深级别', '主管级别', '经理级别', '总监级别'],
      },
      {
        jobCategory: '门店支持',
        management: [
          '收银基础',
          '收银管理',
          '库房基础',
          '库房管理',
          '陈列基础',
          '陈列管理',
          '售后基础',
          '售后管理',
          'CRM基础',
          'CRM管理',
          '辅销基础',
          '辅销管理',
          '安保基础',
          '安保管理',
        ],
      },
      { jobCategory: 'OFFICE销售', management: ['基础级别', '主管级别', '经理级别', '总监级别'] },
      { jobCategory: 'OFFICE支持', management: ['基础级别', '主管级别', '经理级别', '总监级别'] },
      { jobCategory: '人事行政', management: ['基础级别', '管理级别'] },
      { jobCategory: '财务岗', management: ['基础级别', '管理级别'] },
      { jobCategory: '法务岗', management: ['基础级别', '管理级别'] },
      { jobCategory: '市场运营', management: ['基础级别', '管理级别'] },
      { jobCategory: '咨询翻译', management: ['基础级别', '管理级别'] },
      { jobCategory: '高级管理', management: ['管理级别'] },
      { jobCategory: '其他职位', management: ['基础级别', '管理级别'] },
    ],
  },
  {
    industry: '汽车房产',
    content: [
      { jobCategory: '客户营销', management: ['基础级别', '管理级别'] },
      { jobCategory: '售后服务', management: ['基础级别', '管理级别'] },
    ],
  },
  {
    industry: '酒店餐饮',
    content: [
      { jobCategory: '前台营运', management: ['基础级别', '主管级别', '经理级别', '总监级别'] },
      { jobCategory: '餐饮后厨', management: ['基础级别', '管理级别'] },
    ],
  },
  {
    industry: '出行服务',
    content: [
      { jobCategory: '客户服务', management: ['基础级别', '管理级别'] },
      { jobCategory: '客户营销', management: ['基础级别', '管理级别'] },
    ],
  },
  {
    industry: '美容美体',
    content: [
      { jobCategory: '客户服务', management: ['基础级别', '管理级别'] },
      { jobCategory: '客户营销', management: ['基础级别', '管理级别'] },
    ],
  },
  {
    industry: '金融服务',
    content: [
      { jobCategory: '客户服务', management: ['基础级别', '管理级别'] },
      { jobCategory: '客户营销', management: ['基础级别', '管理级别'] },
    ],
  },
  {
    industry: '生活服务',
    content: [
      { jobCategory: '客户服务', management: ['基础级别', '管理级别'] },
      { jobCategory: '客户营销', management: ['基础级别', '管理级别'] },
    ],
  },
  {
    industry: '其他服务',
    content: [
      { jobCategory: '客户服务', management: ['基础级别', '管理级别'] },
      { jobCategory: '客户营销', management: ['基础级别', '管理级别'] },
    ],
  },
  {
    industry: '职能岗位',
    content: [
      { jobCategory: 'OFFICE销售', management: ['基础级别', '主管级别', '经理级别', '总监级别'] },
      { jobCategory: '高级管理', management: ['管理级别'] },
      { jobCategory: '人事行政', management: ['基础级别', '管理级别'] },
      { jobCategory: '财务岗', management: ['基础级别', '管理级别'] },
      { jobCategory: 'OFFICE支持', management: ['基础级别', '主管级别', '经理级别', '总监级别'] },
      { jobCategory: '市场运营', management: ['基础级别', '管理级别'] },
      { jobCategory: '法务岗', management: ['基础级别', '管理级别'] },
      { jobCategory: '采购买手', management: ['基础级别', '管理级别'] },
      { jobCategory: '营销岗', management: ['基础级别', '管理级别'] },
      { jobCategory: '咨询翻译', management: ['基础级别', '管理级别'] },
      { jobCategory: '技术岗', management: ['基础级别', '管理级别'] },
      { jobCategory: '其他职位', management: ['基础级别', '管理级别'] },
    ],
  },
];
// export const positionsUpArrDetails = [
//   { title: '门店销售', content: ['基础级别', '资深级别', '主管级别', '经理级别', '总监级别'] },
//   {
//     title: '门店支持',
//     content: [
//       '收银基础',
//       '收银管理',
//       '库管基础',
//       '库房管理',
//       '陈列基础',
//       '陈列管理',
//       '售后基础',
//       '售后管理',
//       'CRM基础',
//       'CRM管理',
//       '辅销基础',
//       '辅销管理',
//       '安保基础',
//       '安保管理',
//     ],
//   },
//   { title: 'OFFICE销售', content: ['基础级别', '主管级别', '经理级别', '总监级别'] },
//   { title: 'OFFICE支持', content: ['基础级别', '主管级别', '经理级别', '总监级别'] },
//   { title: '人事行政', content: ['基础级别', '管理级别'] },
//   { title: '财务岗', content: ['基础级别', '管理级别'] },
//   { title: '法务岗', content: ['基础级别', '管理级别'] },
//   { title: '市场运营', content: ['基础级别', '管理级别'] },
//   { title: '采购买手', content: ['基础级别', '管理级别'] },
//   { title: '咨询翻译', content: ['基础级别', '管理级别'] },
//   { title: '高级管理', content: ['管理级别'] },
//   { title: '客户营销', content: ['基础级别', '管理级别'] },
//   { title: '售后服务', content: ['基础级别', '管理级别'] },
//   { title: '前台营运', content: ['基础级别', '主管级别', '经理级别', '总监级别'] },
//   { title: '餐饮后厨', content: ['基础级别', '管理级别'] },
//   { title: '客户服务', content: ['基础级别', '管理级别'] },
//   { title: '客户营销', content: ['基础级别', '管理级别'] },
//   { title: '展厅售后', content: ['基础级别', '管理级别'] },
//   { title: '银行保险', content: ['基础级别', '管理级别'] },
// ];
export const pinjibieArr = [
  { label: '高奢', value: '高奢' },
  { label: '普奢', value: '普奢' },
  { label: '轻奢', value: '轻奢' },
  { label: '中高端', value: '中高端' },
  { label: '普通', value: '普通' },
];
export const pinjiArr = [
  { label: '国外', value: '国外' },
  { label: '国内', value: '国内' },
];
export const genderArr = [
  { label: '男士', value: 'M' },
  { label: '女士', value: 'F' },
];
export const degreeArr = [
  '初中',
  '中专',
  '高中',
  '职高',
  '大专',
  '本科',
  '硕士',
  '博士',
  '博士后',
  'MBA',
  '大专+MBA',
  '本科+MBA',
  '硕士+MBA',
  '博士+MBA',
  '大学肄业',
];
export const degreeEnAndCnArr = [
  {en: 'Doctorate', cn: '博士'},
  {en: 'MBA/EMBA', cn: 'MBA'},
  {en: 'Master', cn: '硕士'},
  {en: 'Bachelor', cn: '本科'},
  {en: 'Junior College', cn: '大专'},
  {en: 'Special School', cn: '职高'},
  {en: 'Senior high school', cn: '中专'},
  {en: 'Junior middle school', cn: '初中'},
];
export const degreeEnArr = [
  'Doctorate',
  'MBA/EMBA',
  'Master',
  'Bachelor',
  'Junior College',
  'Special School',
  'Senior high school',
  'Junior middle school',
];
export const degreeSearchArr = [
  '中专及以上',
  '职高及以上',
  '高中及以上',
  '大专及以上',
  '本科及以上',
  '硕士及以上',
  '高中及以下',
  '大专',
  '本科',
  '硕士',
];
export const languageArr = [
  {
    language: '英语',
    ability: [
      { value: '1', content: '听说流利' },
      { value: '2', content: '读写流利' },
      // { value: 'CET-4', content: 'CET-4' },
      // { value: 'CET-6', content: 'CET-6' },
      // { value: 'TEM-4', content: 'TEM-4' },
      // { value: 'TEM-8', content: 'TEM-8' },
      // { value: 'IELTS', content: 'IELTS' },
      // { value: 'TOEFL', content: 'TOEFL' },
      // { value: '3', content: '英语不佳' },
    ],
  },
  {
    language: '法语',
    ability: [
      { value: '1', content: '听说流利' },
      { value: '2', content: '读写流利' },
      // { value: 'TFU-4', content: 'TFU-4' },
      // { value: 'TFS-4', content: 'TFS-4' },
      // { value: 'TFS-8', content: 'TFS-8' },
      // { value: 'DALF-C1', content: 'DALF-C1' },
      // { value: 'DALF-C2', content: 'DALF-C2' },
      // { value: 'DELF-A1', content: 'DELF-A1' },
      // { value: 'DELF-A2', content: 'DELF-A2' },
      // { value: 'DELF-A3', content: 'DELF-A3' },
      // { value: 'DELF-A4', content: 'DELF-A4' },
      // { value: '3', content: '法语不佳' },
    ],
  },
  {
    language: '日语',
    ability: [
      { value: '1', content: '听说流利' },
      { value: '2', content: '读写流利' },
      // { value: 'JLPT-N1', content: 'JLPT-N1' },
      // { value: 'JLPT-N2', content: 'JLPT-N2' },
      // { value: 'JLPT-N3', content: 'JLPT-N3' },
      // { value: 'JLPT-N4', content: 'JLPT-N4' },
      // { value: 'JLPT-N5', content: 'JLPT-N5' },
      // { value: '3', content: '日语不佳' },
    ],
  },
  {
    language: '德语',
    ability: [
      { value: '1', content: '听说流利' },
      { value: '2', content: '读写流利' },
      // { value: 'CEFR-A1', content: 'CEFR-A1' },
      // { value: 'CEFR-A2', content: 'CEFR-A2' },
      // { value: 'CEFR-B1', content: 'CEFR-B1' },
      // { value: 'CEFR-B2', content: 'CEFR-B2' },
      // { value: 'CEFR-C1', content: 'CEFR-C1' },
      // { value: 'CEFR-C2', content: 'CEFR-C2' },
      // { value: '3', content: '德语不佳' },
    ],
  },
  {
    language: '韩语',
    ability: [
      { value: '1', content: '听说流利' },
      { value: '2', content: '读写流利' },
      // { value: 'TOPIK I', content: 'TOPIK I' },
      // { value: 'TOPIK II', content: 'TOPIK II' },
      // { value: '3', content: '韩语不佳' },
    ],
  },
  {
    language: '粤语',
    ability: [
      { value: '1', content: '听说流利' },
      { value: '2', content: '读写流利' },
      // { value: '3', content: '粤语不佳' },
    ],
  },
  {
    language: '中文',
    ability: [
      { value: '1', content: '听说流利' },
      { value: '2', content: '读写流利' },
      // { value: 'HSK一级', content: 'HSK一级' },
      // { value: 'HSF二级', content: 'HSF二级' },
      // { value: 'HSK三级', content: 'HSK三级' },
      // { value: 'HSK四级', content: 'HSK四级' },
      // { value: 'HSK五级', content: 'HSK五级' },
      // { value: 'HSK六级', content: 'HSK六级' },
      // { value: '3', content: '中文不佳' },
    ],
  },
];
// export const resumeTypeArr = [
//   { value: 'C', label: '中文' },
//   { value: 'E', label: '英文' },
// ];
export const resumeTypeArr = [
  { value: '2', label: '中文' },
  { value: '1', label: '英文' },
];
export const workFloorArr = [
  '1层',
  '2层',
  '3层',
  '4层',
  '5层',
  '6层',
  '7层',
  '8层',
  'B1',
  'B2',
  'OFFICE',
];
export const workFloorEnArr = [
  '1F',
  '2F',
  '3F',
  '4F',
  '5F',
  '6F',
  '7F',
  '8F',
  'B1',
  'B2',
  'OFFICE',
];