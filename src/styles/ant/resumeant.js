// import { extractStyle } from 'ant-design-vue/lib/_util/static-style-extract/index.js'; // 使用import需要package.json的type=module, 但是改完之后项目内的eslint.js等配置文件坏了; 所以还是用require就行
// import extractStyle from '@ant-design/static-style-extract'; // 需要react,用不了

const fs = require('fs');
const { createVNode } = require('vue');
const path = require('path');
const { extractStyle } = require('ant-design-vue/lib/_util/static-style-extract');
const { StyleProvider } = require('ant-design-vue');
const { ConfigProvider } = require('ant-design-vue');

const filePath = path.resolve(__dirname, 'antd.css');
console.log(`输出css文件路径 ${filePath} \n`);

// ts type 对应 import { ThemeConfig } from 'ant-design-vue/es/config-provider/context';
// 设置主题, 按需修改此处
const configProviderTheme = { token: { colorPrimary: '#0052CB' } };

const configProviderProps = { theme: configProviderTheme };
const styleProviderProps = {};

// API 文档 https://www.antdv.com/docs/vue/ssr-extract-ssr-cn
const css = extractStyle(node =>
  createVNode(StyleProvider, styleProviderProps, () => createVNode(ConfigProvider, configProviderProps, () => node)),
);

// 清理掉 hashPrefix
const result = css
  .replace(/:where\(\.css-dev-only-do-not-override-[A-Za-z0-9]+\)/gim, '') // 清理掉 hashPrefix
  .replace(/css-dev-only-do-not-override-/gim, 'c-'); // 针对 animation-name , 缩短一点, 也可以不替换

fs.writeFileSync(filePath, result, { encoding: 'utf-8', flag: 'w' });

console.log(
  `用法: 在vue的入口文件main.ts 中 import '@/路径略/antd.css' 即可, 如果项目中有用到 px转rem 或 px转vw 插件, 则会自动对antd.css二次处理, 相当于是ant-design-vue-3.x以及之前版本的css全局引入.\n`,
);
console.log(
  `注意: 本方案无法阻止 ant-design-vue-4.x 运行时产生的动态css, 但是因为移除了:where(), 所以本方案产生的antd.css的优先级高于运行时产生的css, 所以才会有效\n`,
);
console.log('success');
