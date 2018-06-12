// Config
declare module '*package.json';
// Webpack plugin
declare module '*webpack-plugin';
declare module 'webpack-node-externals';
// Other
declare module 'koa-webpack';
declare module 'react-perf-devtool';
//Image
declare module '*.png' { export default '' as string; }
declare module '*.jpg' { export default '' as string; }
declare module '*.jpeg' { export default '' as string; }
declare module '*.bmp' { export default '' as string; }
declare module '*.gif' { export default '' as string; }
declare module '*.svg' { export default '' as string; }
// Redux DevTools
interface Window {
  __REDUX_DEVTOOLS_EXTENSION__: any;
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
}
