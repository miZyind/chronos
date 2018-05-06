/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading wasm modules
/******/ 	var installedWasmModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// object with all compiled WebAssembly.Modules
/******/ 	__webpack_require__.w = {};
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./config/webpack/client/webpack.base.ts":
/*!***********************************************!*\
  !*** ./config/webpack/client/webpack.base.ts ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var webpack__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webpack */ \"webpack\");\n/* harmony import */ var webpack__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webpack__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var html_webpack_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! html-webpack-plugin */ \"html-webpack-plugin\");\n/* harmony import */ var html_webpack_plugin__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(html_webpack_plugin__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _env__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../env */ \"./config/webpack/env.ts\");\n/* harmony import */ var _paths__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../paths */ \"./config/webpack/paths.ts\");\n// Node module\r\n\r\n\r\n// Config\r\n\r\n\r\nconst baseConfig = {\r\n    stats: 'minimal',\r\n    target: 'web',\r\n    entry: [_paths__WEBPACK_IMPORTED_MODULE_3__[\"default\"].client],\r\n    resolve: {\r\n        alias: {\r\n            '@actions': _paths__WEBPACK_IMPORTED_MODULE_3__[\"default\"].resolveApp('src/client/actions'),\r\n            '@components': _paths__WEBPACK_IMPORTED_MODULE_3__[\"default\"].resolveApp('src/client/components'),\r\n            '@containers': _paths__WEBPACK_IMPORTED_MODULE_3__[\"default\"].resolveApp('src/client/containers'),\r\n            '@helpers': _paths__WEBPACK_IMPORTED_MODULE_3__[\"default\"].resolveApp('src/client/helpers'),\r\n            '@reducers': _paths__WEBPACK_IMPORTED_MODULE_3__[\"default\"].resolveApp('src/client/reducers'),\r\n            '@epics': _paths__WEBPACK_IMPORTED_MODULE_3__[\"default\"].resolveApp('src/client/epics'),\r\n            '@routes': _paths__WEBPACK_IMPORTED_MODULE_3__[\"default\"].resolveApp('src/client/routes'),\r\n            '#lib': _paths__WEBPACK_IMPORTED_MODULE_3__[\"default\"].resolveApp('src/lib')\r\n        },\r\n        modules: ['node_modules', _paths__WEBPACK_IMPORTED_MODULE_3__[\"default\"].nodeModules],\r\n        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']\r\n    },\r\n    module: {\r\n        rules: [\r\n            {\r\n                test: /\\.tsx?$/,\r\n                use: {\r\n                    loader: 'ts-loader',\r\n                    options: {\r\n                        silent: true,\r\n                        transpileOnly: true,\r\n                        compilerOptions: { target: 'es6', module: 'esnext' }\r\n                    }\r\n                }\r\n            },\r\n            {\r\n                test: [/\\.bmp$/, /\\.gif$/, /\\.jpe?g$/, /\\.png$/, /\\.svg$/],\r\n                use: 'url-loader?limit=4096&name=assets/images/[name].[hash:6].[ext]'\r\n            },\r\n            {\r\n                test: /\\.(ico|eot|otf|webp|ttf|woff|woff2)$/i,\r\n                use: 'file-loader?limit=100000&name=assets/fonts/[name].[hash:6].[ext]'\r\n            }\r\n        ]\r\n    },\r\n    plugins: [\r\n        new webpack__WEBPACK_IMPORTED_MODULE_0___default.a.DefinePlugin({\r\n            'process.env.APP_NAME': JSON.stringify(_env__WEBPACK_IMPORTED_MODULE_2__[\"default\"].name),\r\n            'process.env.APP_VERSION': JSON.stringify(_env__WEBPACK_IMPORTED_MODULE_2__[\"default\"].version)\r\n        }),\r\n        new html_webpack_plugin__WEBPACK_IMPORTED_MODULE_1___default.a({\r\n            title: _env__WEBPACK_IMPORTED_MODULE_2__[\"default\"].name,\r\n            template: _paths__WEBPACK_IMPORTED_MODULE_3__[\"default\"].htmlTemplate,\r\n            favicon: 'public/favicon.ico',\r\n            minify: {\r\n                minifyJS: true,\r\n                minifyCSS: true,\r\n                minifyURLs: true,\r\n                removeComments: true,\r\n                useShortDoctype: true,\r\n                keepClosingSlash: true,\r\n                collapseWhitespace: true,\r\n                removeEmptyAttributes: true,\r\n                removeRedundantAttributes: true,\r\n                removeStyleLinkTypeAttributes: true\r\n            }\r\n        })\r\n    ]\r\n};\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (baseConfig);\r\n\n\n//# sourceURL=webpack:///./config/webpack/client/webpack.base.ts?");

/***/ }),

/***/ "./config/webpack/client/webpack.dev.ts":
/*!**********************************************!*\
  !*** ./config/webpack/client/webpack.dev.ts ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var autoprefixer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! autoprefixer */ \"autoprefixer\");\n/* harmony import */ var autoprefixer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(autoprefixer__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _webpack_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./webpack.base */ \"./config/webpack/client/webpack.base.ts\");\n\r\n// Config\r\n\r\nconst devConfig = {\r\n    ..._webpack_base__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\r\n    mode: 'development',\r\n    module: {\r\n        rules: [\r\n            ..._webpack_base__WEBPACK_IMPORTED_MODULE_1__[\"default\"].module.rules,\r\n            {\r\n                test: /\\.css$/,\r\n                use: [\r\n                    'style-loader',\r\n                    { loader: 'css-loader', options: { importLoaders: 1 } },\r\n                    {\r\n                        loader: /*require.resolve*/(/*! postcss-loader */ \"postcss-loader\"),\r\n                        options: {\r\n                            plugins: () => [\r\n                                __webpack_require__(/*! postcss-flexbugs-fixes */ \"postcss-flexbugs-fixes\"),\r\n                                autoprefixer__WEBPACK_IMPORTED_MODULE_0___default()({\r\n                                    browsers: [\r\n                                        '>1%',\r\n                                        'last 4 versions',\r\n                                        'Firefox ESR',\r\n                                        'not ie < 9'\r\n                                    ],\r\n                                    flexbox: 'no-2009'\r\n                                })\r\n                            ],\r\n                            sourceMap: true\r\n                        }\r\n                    }\r\n                ]\r\n            }\r\n        ]\r\n    },\r\n};\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (devConfig);\r\n\n\n//# sourceURL=webpack:///./config/webpack/client/webpack.dev.ts?");

/***/ }),

/***/ "./config/webpack/env.ts":
/*!*******************************!*\
  !*** ./config/webpack/env.ts ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../package.json */ \"./package.json\");\nvar _package_json__WEBPACK_IMPORTED_MODULE_0___namespace = /*#__PURE__*/Object.assign({}, _package_json__WEBPACK_IMPORTED_MODULE_0__, {\"default\": _package_json__WEBPACK_IMPORTED_MODULE_0__});\n// Version\r\n\r\nconst env = {\r\n    name: 'Chronos',\r\n    version: _package_json__WEBPACK_IMPORTED_MODULE_0__.version,\r\n    connection: {\r\n        protocol: 'http',\r\n        host: 'localhost',\r\n        port: 3500,\r\n        path: '/'\r\n    }\r\n};\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (env);\r\n\n\n//# sourceURL=webpack:///./config/webpack/env.ts?");

/***/ }),

/***/ "./config/webpack/paths.ts":
/*!*********************************!*\
  !*** ./config/webpack/paths.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n// Node module\r\n\r\n\r\nconst appPath = fs__WEBPACK_IMPORTED_MODULE_0___default.a.realpathSync(process.cwd());\r\nconst resolveApp = (relativePath) => path__WEBPACK_IMPORTED_MODULE_1___default.a.resolve(appPath, relativePath);\r\nconst paths = {\r\n    resolveApp,\r\n    dist: resolveApp('dist'),\r\n    nodeModules: resolveApp('node_modules'),\r\n    htmlTemplate: resolveApp('public/index.html'),\r\n    client: resolveApp('src/client'),\r\n    server: resolveApp('src/server')\r\n};\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (paths);\r\n\n\n//# sourceURL=webpack:///./config/webpack/paths.ts?");

/***/ }),

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/*! exports provided: name, version, description, repository, author, license, scripts, dependencies, devDependencies, default */
/***/ (function(module) {

eval("module.exports = {\"name\":\"chronos\",\"version\":\"0.0.1\",\"description\":\"Specific work scheduler.\",\"repository\":\"git@github.com:miZyind/chronos.git\",\"author\":\"miZyind <mizyind@gmail.com>\",\"license\":\"MIT\",\"scripts\":{\"clean\":\"rimraf dist/*\",\"serve\":\"node dist/index.js\",\"start\":\"webpack --config config/webpack/server/webpack.dev.ts && node dist/index.js\",\"build\":\"yarn clean && yarn build:server && yarn build:client\",\"build:server\":\"webpack --config config/webpack/server/webpack.prod.ts\",\"build:client\":\"webpack --config config/webpack/client/webpack.prod.ts\"},\"dependencies\":{\"chalk\":\"^2.4.1\",\"isomorphic-fetch\":\"^2.2.1\",\"koa\":\"^2.5.1\",\"koa-compose\":\"^4.0.0\",\"koa-logger\":\"^3.2.0\",\"koa-static\":\"^4.0.2\",\"koa-webpack\":\"^3.0.2\",\"node-json-db\":\"^0.7.5\",\"pino\":\"^4.16.1\",\"react\":\"^16.3.2\",\"react-dom\":\"^16.3.2\",\"react-perf-devtool\":\"^3.0.6\",\"react-redux\":\"^5.0.7\",\"react-router-dom\":\"^4.2.2\",\"redux\":\"^4.0.0\",\"semantic-ui-css\":\"^2.3.1\",\"semantic-ui-react\":\"^0.80.0\",\"styled-components\":\"^3.2.6\",\"why-did-you-update\":\"^0.1.1\"},\"devDependencies\":{\"@types/autoprefixer\":\"^6.7.3\",\"@types/koa\":\"^2.0.45\",\"@types/koa-logger\":\"^3.1.0\",\"@types/koa-static\":\"^4.0.0\",\"@types/node\":\"^10.0.4\",\"@types/node-json-db\":\"^0.0.1\",\"@types/pino\":\"^4.7.1\",\"@types/react\":\"^16.3.10\",\"@types/react-dom\":\"^16.0.5\",\"@types/react-hot-loader\":\"^4.1.0\",\"@types/react-redux\":\"^5.0.19\",\"@types/react-router-dom\":\"^4.2.6\",\"@types/webpack\":\"^4.1.3\",\"@types/why-did-you-update\":\"^0.0.8\",\"autoprefixer\":\"^8.3.0\",\"css-loader\":\"^0.28.11\",\"extract-text-webpack-plugin\":\"^4.0.0-beta.0\",\"file-loader\":\"^1.1.11\",\"html-webpack-plugin\":\"^3.2.0\",\"postcss-flexbugs-fixes\":\"^3.3.1\",\"postcss-loader\":\"^2.1.5\",\"react-hot-loader\":\"^4.1.2\",\"rimraf\":\"^2.6.2\",\"style-loader\":\"^0.21.0\",\"ts-loader\":\"^4.2.0\",\"ts-node\":\"^6.0.2\",\"tslint\":\"^5.10.0\",\"tslint-react\":\"^3.5.1\",\"typescript\":\"^2.8.3\",\"typescript-styled-plugin\":\"^0.6.3\",\"url-loader\":\"^1.0.1\",\"webpack\":\"^4.7.0\",\"webpack-cli\":\"^2.1.2\",\"webpack-node-externals\":\"^1.7.2\"}};\n\n//# sourceURL=webpack:///./package.json?");

/***/ }),

/***/ "./src/lib/logger.ts":
/*!***************************!*\
  !*** ./src/lib/logger.ts ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var pino__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pino */ \"pino\");\n/* harmony import */ var pino__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(pino__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var chalk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! chalk */ \"chalk\");\n/* harmony import */ var chalk__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(chalk__WEBPACK_IMPORTED_MODULE_1__);\n// Node Module\r\n\r\n\r\nlet logger;\r\nif (pino__WEBPACK_IMPORTED_MODULE_0___default.a.pretty) {\r\n    const colorize = (value) => {\r\n        const levels = { 20: 'DEBUG', 30: 'INFO', 40: 'WARN', 50: 'ERROR', default: 'USERLVL' };\r\n        const colors = { 20: chalk__WEBPACK_IMPORTED_MODULE_1___default.a.blue, 30: chalk__WEBPACK_IMPORTED_MODULE_1___default.a.green, 40: chalk__WEBPACK_IMPORTED_MODULE_1___default.a.yellow, 50: chalk__WEBPACK_IMPORTED_MODULE_1___default.a.red, default: chalk__WEBPACK_IMPORTED_MODULE_1___default.a.white };\r\n        return colors.hasOwnProperty(value) ? colors[value](levels[value]) : colors.default(levels.default);\r\n    };\r\n    const pretty = pino__WEBPACK_IMPORTED_MODULE_0___default.a.pretty({\r\n        formatter: ({ pid, hostname, name, level, time, v, ...value }) => {\r\n            let line = `[${new Date(time).toLocaleString()}] ${colorize(level)}: `;\r\n            if (value.type === 'Error') {\r\n                line += `\\n${chalk__WEBPACK_IMPORTED_MODULE_1___default.a.bgRed(value.stack)}`;\r\n            }\r\n            else if (value.msg) {\r\n                line += chalk__WEBPACK_IMPORTED_MODULE_1___default.a.cyan(value.msg);\r\n            }\r\n            else if (value.detail) {\r\n                line += `${pid}, ${hostname}, ${name}, ${v}`;\r\n            }\r\n            else {\r\n                line += `\\n${chalk__WEBPACK_IMPORTED_MODULE_1___default.a.magentaBright(JSON.stringify(value, null, 2))}`;\r\n            }\r\n            return line;\r\n        }\r\n    });\r\n    pretty.pipe(process.stdout);\r\n    logger = pino__WEBPACK_IMPORTED_MODULE_0___default()({}, pretty);\r\n}\r\nelse {\r\n    logger = pino__WEBPACK_IMPORTED_MODULE_0___default()({ prettyPrint: true });\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (logger);\r\n\n\n//# sourceURL=webpack:///./src/lib/logger.ts?");

/***/ }),

/***/ "./src/server/config.ts":
/*!******************************!*\
  !*** ./src/server/config.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n// Node module\r\n\r\n\r\nconst appPath = fs__WEBPACK_IMPORTED_MODULE_0___default.a.realpathSync(process.cwd());\r\n// Extract process.env, use process.env or webpack define-plugin's settings\r\nconst { NODE_ENV = \"development\" === 'development', APP_DIST = \"C:\\\\Users\\\\JerryZ\\\\repo\\\\mizyind\\\\chronos\\\\dist\", APP_NAME = \"Chronos\", APP_VERSION = \"0.0.1\", APP_PROTOCOL = \"http\", APP_HOST = \"localhost\", APP_PORT = 3500, APP_PATH = \"/\", } = process.env;\r\nconst config = {\r\n    isDev: NODE_ENV,\r\n    dist: APP_DIST,\r\n    name: APP_NAME,\r\n    version: APP_VERSION,\r\n    connection: {\r\n        protocol: APP_PROTOCOL,\r\n        host: APP_HOST,\r\n        port: APP_PORT,\r\n        path: APP_PATH\r\n    },\r\n    dbPath: path__WEBPACK_IMPORTED_MODULE_1___default.a.resolve(appPath, 'data/db.json')\r\n};\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (config);\r\n\n\n//# sourceURL=webpack:///./src/server/config.ts?");

/***/ }),

/***/ "./src/server/index.ts":
/*!*****************************!*\
  !*** ./src/server/index.ts ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var koa__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa */ \"koa\");\n/* harmony import */ var koa__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! url */ \"url\");\n/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var koa_static__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! koa-static */ \"koa-static\");\n/* harmony import */ var koa_static__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(koa_static__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var node_json_db__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! node-json-db */ \"node-json-db\");\n/* harmony import */ var node_json_db__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(node_json_db__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var koa_logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! koa-logger */ \"koa-logger\");\n/* harmony import */ var koa_logger__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(koa_logger__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! #lib/logger */ \"./src/lib/logger.ts\");\n/* harmony import */ var _middleware_hmr_middleware__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./middleware/hmr-middleware */ \"./src/server/middleware/hmr-middleware.ts\");\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./config */ \"./src/server/config.ts\");\n// Node Module\r\n\r\n\r\n\r\n\r\n\r\n// Lib\r\n\r\n// Middleware\r\n\r\n// Config\r\n\r\n// Env\r\nconst { isDev, dist, name, version, connection, dbPath } = _config__WEBPACK_IMPORTED_MODULE_7__[\"default\"];\r\nconst { protocol, host, port, path } = connection;\r\nconst address = Object(url__WEBPACK_IMPORTED_MODULE_1__[\"format\"])({ protocol, hostname: host, port, pathname: path });\r\nconst printMsg = () => _lib_logger__WEBPACK_IMPORTED_MODULE_5__[\"default\"].info(`${name} v${version} [Address] ${address} [Mode] ${isDev ? '⚙️' : '🌎'}`);\r\n// Init App\r\nconst app = new koa__WEBPACK_IMPORTED_MODULE_0___default.a();\r\n// Init JsonDB\r\napp.context.db = new node_json_db__WEBPACK_IMPORTED_MODULE_3___default.a(dbPath, true, true);\r\nif (isDev) {\r\n    app\r\n        .use(koa_logger__WEBPACK_IMPORTED_MODULE_4___default()())\r\n        .use(Object(_middleware_hmr_middleware__WEBPACK_IMPORTED_MODULE_6__[\"default\"])());\r\n}\r\nelse {\r\n    app\r\n        .use(koa_static__WEBPACK_IMPORTED_MODULE_2___default()(dist));\r\n}\r\napp\r\n    .use(async (ctx) => ctx.status = 404)\r\n    .listen(port, printMsg);\r\n\n\n//# sourceURL=webpack:///./src/server/index.ts?");

/***/ }),

/***/ "./src/server/middleware/hmr-middleware.ts":
/*!*************************************************!*\
  !*** ./src/server/middleware/hmr-middleware.ts ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var koa_webpack__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa-webpack */ \"koa-webpack\");\n/* harmony import */ var koa_webpack__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa_webpack__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _config_webpack_client_webpack_dev__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../config/webpack/client/webpack.dev */ \"./config/webpack/client/webpack.dev.ts\");\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../config */ \"./src/server/config.ts\");\n// Node module\r\n\r\n// Webpack config\r\n\r\n// Config\r\n\r\nconst hmrMiddleware = () => koa_webpack__WEBPACK_IMPORTED_MODULE_0___default()({\r\n    config: _config_webpack_client_webpack_dev__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\r\n    dev: { publicPath: _config__WEBPACK_IMPORTED_MODULE_2__[\"default\"].connection.path, logLevel: 'silent' },\r\n    hot: { logLevel: 'silent' }\r\n});\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (hmrMiddleware);\r\n\n\n//# sourceURL=webpack:///./src/server/middleware/hmr-middleware.ts?");

/***/ }),

/***/ "autoprefixer":
/*!*******************************!*\
  !*** external "autoprefixer" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"autoprefixer\");\n\n//# sourceURL=webpack:///external_%22autoprefixer%22?");

/***/ }),

/***/ "chalk":
/*!************************!*\
  !*** external "chalk" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"chalk\");\n\n//# sourceURL=webpack:///external_%22chalk%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "html-webpack-plugin":
/*!**************************************!*\
  !*** external "html-webpack-plugin" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"html-webpack-plugin\");\n\n//# sourceURL=webpack:///external_%22html-webpack-plugin%22?");

/***/ }),

/***/ "koa":
/*!**********************!*\
  !*** external "koa" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa\");\n\n//# sourceURL=webpack:///external_%22koa%22?");

/***/ }),

/***/ "koa-logger":
/*!*****************************!*\
  !*** external "koa-logger" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-logger\");\n\n//# sourceURL=webpack:///external_%22koa-logger%22?");

/***/ }),

/***/ "koa-static":
/*!*****************************!*\
  !*** external "koa-static" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-static\");\n\n//# sourceURL=webpack:///external_%22koa-static%22?");

/***/ }),

/***/ "koa-webpack":
/*!******************************!*\
  !*** external "koa-webpack" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-webpack\");\n\n//# sourceURL=webpack:///external_%22koa-webpack%22?");

/***/ }),

/***/ "node-json-db":
/*!*******************************!*\
  !*** external "node-json-db" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"node-json-db\");\n\n//# sourceURL=webpack:///external_%22node-json-db%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "pino":
/*!***********************!*\
  !*** external "pino" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"pino\");\n\n//# sourceURL=webpack:///external_%22pino%22?");

/***/ }),

/***/ "postcss-flexbugs-fixes":
/*!*****************************************!*\
  !*** external "postcss-flexbugs-fixes" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"postcss-flexbugs-fixes\");\n\n//# sourceURL=webpack:///external_%22postcss-flexbugs-fixes%22?");

/***/ }),

/***/ "postcss-loader":
/*!*********************************!*\
  !*** external "postcss-loader" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"postcss-loader\");\n\n//# sourceURL=webpack:///external_%22postcss-loader%22?");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"url\");\n\n//# sourceURL=webpack:///external_%22url%22?");

/***/ }),

/***/ "webpack":
/*!**************************!*\
  !*** external "webpack" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"webpack\");\n\n//# sourceURL=webpack:///external_%22webpack%22?");

/***/ })

/******/ });