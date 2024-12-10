module.exports = {
  plugins: {
    'postcss-plugin-px2rem': {
      rootValue: 192, // 设计稿宽度 / 10
      propList: ["*"],
      unitPrecision: 5,
      selectorBlackList: [/.norem-.*/], // 开头为.norem-的class的大括号范围内所有样式不会被转为rem
      ignoreIdentifier: false,
      replace: true,
      mediaQuery: true,
      exclude: false,
    },
  },
};
