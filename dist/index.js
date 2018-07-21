/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var webpack__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webpack */ \"webpack\");\n/* harmony import */ var webpack__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webpack__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var html_webpack_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! html-webpack-plugin */ \"html-webpack-plugin\");\n/* harmony import */ var html_webpack_plugin__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(html_webpack_plugin__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _env__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../env */ \"./config/webpack/env.ts\");\n/* harmony import */ var _paths__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../paths */ \"./config/webpack/paths.ts\");\n// Node module\n\n\n// Config\n\n\nconst baseConfig = {\n    stats: 'minimal',\n    target: 'web',\n    entry: [_paths__WEBPACK_IMPORTED_MODULE_3__[\"default\"].client],\n    resolve: {\n        alias: {\n            '@actions': _paths__WEBPACK_IMPORTED_MODULE_3__[\"default\"].resolveApp('src/client/actions'),\n            '@components': _paths__WEBPACK_IMPORTED_MODULE_3__[\"default\"].resolveApp('src/client/components'),\n            '@containers': _paths__WEBPACK_IMPORTED_MODULE_3__[\"default\"].resolveApp('src/client/containers'),\n            '@helpers': _paths__WEBPACK_IMPORTED_MODULE_3__[\"default\"].resolveApp('src/client/helpers'),\n            '@reducers': _paths__WEBPACK_IMPORTED_MODULE_3__[\"default\"].resolveApp('src/client/reducers'),\n            '@epics': _paths__WEBPACK_IMPORTED_MODULE_3__[\"default\"].resolveApp('src/client/epics'),\n            '@routes': _paths__WEBPACK_IMPORTED_MODULE_3__[\"default\"].resolveApp('src/client/routes'),\n            '#lib': _paths__WEBPACK_IMPORTED_MODULE_3__[\"default\"].resolveApp('src/lib')\n        },\n        modules: ['node_modules', _paths__WEBPACK_IMPORTED_MODULE_3__[\"default\"].nodeModules],\n        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']\n    },\n    module: {\n        rules: [\n            {\n                test: /\\.tsx?$/,\n                use: {\n                    loader: 'ts-loader',\n                    options: {\n                        silent: true,\n                        transpileOnly: true,\n                        compilerOptions: { target: 'es6', module: 'esnext' }\n                    }\n                }\n            },\n            {\n                test: [/\\.bmp$/, /\\.gif$/, /\\.jpe?g$/, /\\.png$/, /\\.svg$/],\n                use: 'url-loader?limit=4096&name=assets/images/[name].[hash:6].[ext]'\n            },\n            {\n                test: /\\.(ico|eot|otf|webp|ttf|woff|woff2)$/i,\n                use: 'file-loader?limit=100000&name=assets/fonts/[name].[hash:6].[ext]'\n            }\n        ]\n    },\n    plugins: [\n        new webpack__WEBPACK_IMPORTED_MODULE_0___default.a.DefinePlugin({\n            'process.env.APP_NAME': JSON.stringify(_env__WEBPACK_IMPORTED_MODULE_2__[\"default\"].name),\n            'process.env.APP_VERSION': JSON.stringify(_env__WEBPACK_IMPORTED_MODULE_2__[\"default\"].version)\n        }),\n        new html_webpack_plugin__WEBPACK_IMPORTED_MODULE_1___default.a({\n            title: _env__WEBPACK_IMPORTED_MODULE_2__[\"default\"].name,\n            template: _paths__WEBPACK_IMPORTED_MODULE_3__[\"default\"].htmlTemplate,\n            favicon: 'public/favicon.ico',\n            minify: {\n                minifyJS: true,\n                minifyCSS: true,\n                minifyURLs: true,\n                removeComments: true,\n                useShortDoctype: true,\n                keepClosingSlash: true,\n                collapseWhitespace: true,\n                removeEmptyAttributes: true,\n                removeRedundantAttributes: true,\n                removeStyleLinkTypeAttributes: true\n            }\n        })\n    ]\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (baseConfig);\n\n\n//# sourceURL=webpack:///./config/webpack/client/webpack.base.ts?");

/***/ }),

/***/ "./config/webpack/client/webpack.dev.ts":
/*!**********************************************!*\
  !*** ./config/webpack/client/webpack.dev.ts ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var autoprefixer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! autoprefixer */ \"autoprefixer\");\n/* harmony import */ var autoprefixer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(autoprefixer__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _webpack_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./webpack.base */ \"./config/webpack/client/webpack.base.ts\");\n\n// Config\n\nconst devConfig = {\n    ..._webpack_base__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n    mode: 'development',\n    module: {\n        rules: [\n            ..._webpack_base__WEBPACK_IMPORTED_MODULE_1__[\"default\"].module.rules,\n            {\n                test: /\\.css$/,\n                use: [\n                    'style-loader',\n                    { loader: 'css-loader', options: { importLoaders: 1 } },\n                    {\n                        loader: /*require.resolve*/(/*! postcss-loader */ \"postcss-loader\"),\n                        options: {\n                            plugins: () => [\n                                __webpack_require__(/*! postcss-flexbugs-fixes */ \"postcss-flexbugs-fixes\"),\n                                autoprefixer__WEBPACK_IMPORTED_MODULE_0___default()({\n                                    browsers: [\n                                        '>1%',\n                                        'last 4 versions',\n                                        'Firefox ESR',\n                                        'not ie < 9'\n                                    ],\n                                    flexbox: 'no-2009'\n                                })\n                            ],\n                            sourceMap: true\n                        }\n                    }\n                ]\n            }\n        ]\n    },\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (devConfig);\n\n\n//# sourceURL=webpack:///./config/webpack/client/webpack.dev.ts?");

/***/ }),

/***/ "./config/webpack/env.ts":
/*!*******************************!*\
  !*** ./config/webpack/env.ts ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../package.json */ \"./package.json\");\nvar _package_json__WEBPACK_IMPORTED_MODULE_0___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../../package.json */ \"./package.json\", 1);\n// Version\n\nconst env = {\n    name: 'Chronos',\n    version: _package_json__WEBPACK_IMPORTED_MODULE_0__.version,\n    connection: {\n        protocol: 'http',\n        host: 'localhost',\n        port: 3500,\n        path: '/'\n    }\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (env);\n\n\n//# sourceURL=webpack:///./config/webpack/env.ts?");

/***/ }),

/***/ "./config/webpack/paths.ts":
/*!*********************************!*\
  !*** ./config/webpack/paths.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n// Node module\n\n\nconst appPath = fs__WEBPACK_IMPORTED_MODULE_0___default.a.realpathSync(process.cwd());\nconst resolveApp = (relativePath) => path__WEBPACK_IMPORTED_MODULE_1___default.a.resolve(appPath, relativePath);\nconst paths = {\n    resolveApp,\n    dist: resolveApp('dist'),\n    nodeModules: resolveApp('node_modules'),\n    htmlTemplate: resolveApp('public/index.html'),\n    client: resolveApp('src/client'),\n    server: resolveApp('src/server')\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (paths);\n\n\n//# sourceURL=webpack:///./config/webpack/paths.ts?");

/***/ }),

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/*! exports provided: name, version, description, repository, author, license, scripts, dependencies, devDependencies, default */
/***/ (function(module) {

eval("module.exports = {\"name\":\"chronos\",\"version\":\"0.0.1\",\"description\":\"Specific work scheduler.\",\"repository\":\"git@github.com:miZyind/chronos.git\",\"author\":\"miZyind <mizyind@gmail.com>\",\"license\":\"MIT\",\"scripts\":{\"clean\":\"rimraf dist/*\",\"serve\":\"node dist/index.js\",\"start\":\"webpack --config config/webpack/server/webpack.dev.ts && node dist/index.js\",\"build\":\"yarn clean && yarn build:server && yarn build:client\",\"build:server\":\"webpack --config config/webpack/server/webpack.prod.ts\",\"build:client\":\"webpack --config config/webpack/client/webpack.prod.ts\"},\"dependencies\":{\"axios\":\"^0.18.0\",\"chalk\":\"^2.4.1\",\"isomorphic-fetch\":\"^2.2.1\",\"koa\":\"^2.5.1\",\"koa-bodyparser\":\"^4.2.1\",\"koa-compose\":\"^4.0.0\",\"koa-logger\":\"^3.2.0\",\"koa-router\":\"^7.4.0\",\"koa-static\":\"^4.0.2\",\"koa-webpack\":\"^3.0.2\",\"node-json-db\":\"^0.7.5\",\"pino\":\"^4.16.1\",\"react\":\"^16.3.2\",\"react-dom\":\"^16.3.2\",\"react-perf-devtool\":\"^3.0.6\",\"react-redux\":\"^5.0.7\",\"react-router-dom\":\"^4.2.2\",\"redux\":\"^4.0.0\",\"semantic-ui-css\":\"^2.3.1\",\"semantic-ui-react\":\"^0.80.0\",\"styled-components\":\"^3.2.6\",\"why-did-you-update\":\"^0.1.1\"},\"devDependencies\":{\"@types/autoprefixer\":\"^6.7.3\",\"@types/koa\":\"^2.0.45\",\"@types/koa-logger\":\"^3.1.0\",\"@types/koa-static\":\"^4.0.0\",\"@types/node\":\"^10.0.4\",\"@types/node-json-db\":\"^0.0.1\",\"@types/pino\":\"^4.7.1\",\"@types/react\":\"^16.3.10\",\"@types/react-dom\":\"^16.0.5\",\"@types/react-hot-loader\":\"^4.1.0\",\"@types/react-redux\":\"^5.0.19\",\"@types/react-router-dom\":\"^4.2.6\",\"@types/webpack\":\"^4.1.3\",\"@types/why-did-you-update\":\"^0.0.8\",\"autoprefixer\":\"^8.3.0\",\"css-loader\":\"^0.28.11\",\"extract-text-webpack-plugin\":\"^4.0.0-beta.0\",\"file-loader\":\"^1.1.11\",\"html-webpack-plugin\":\"^3.2.0\",\"postcss-flexbugs-fixes\":\"^3.3.1\",\"postcss-loader\":\"^2.1.5\",\"react-hot-loader\":\"^4.1.2\",\"rimraf\":\"^2.6.2\",\"style-loader\":\"^0.21.0\",\"ts-loader\":\"^4.2.0\",\"ts-node\":\"^6.0.2\",\"tslint\":\"^5.10.0\",\"tslint-react\":\"^3.5.1\",\"typescript\":\"^2.8.3\",\"typescript-styled-plugin\":\"^0.6.3\",\"url-loader\":\"^1.0.1\",\"webpack\":\"^4.7.0\",\"webpack-cli\":\"^2.1.2\",\"webpack-node-externals\":\"^1.7.2\"}};\n\n//# sourceURL=webpack:///./package.json?");

/***/ }),

/***/ "./src/lib/logger.ts":
/*!***************************!*\
  !*** ./src/lib/logger.ts ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var pino__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pino */ \"pino\");\n/* harmony import */ var pino__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(pino__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var chalk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! chalk */ \"chalk\");\n/* harmony import */ var chalk__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(chalk__WEBPACK_IMPORTED_MODULE_1__);\n// Node Module\n\n\nlet logger;\nif (pino__WEBPACK_IMPORTED_MODULE_0___default.a.pretty) {\n    const colorize = (value) => {\n        const levels = { 20: 'DEBUG', 30: 'INFO', 40: 'WARN', 50: 'ERROR', default: 'USERLVL' };\n        const colors = { 20: chalk__WEBPACK_IMPORTED_MODULE_1___default.a.blue, 30: chalk__WEBPACK_IMPORTED_MODULE_1___default.a.green, 40: chalk__WEBPACK_IMPORTED_MODULE_1___default.a.yellow, 50: chalk__WEBPACK_IMPORTED_MODULE_1___default.a.red, default: chalk__WEBPACK_IMPORTED_MODULE_1___default.a.white };\n        return colors.hasOwnProperty(value) ? colors[value](levels[value]) : colors.default(levels.default);\n    };\n    const pretty = pino__WEBPACK_IMPORTED_MODULE_0___default.a.pretty({\n        formatter: ({ pid, hostname, name, level, time, v, ...value }) => {\n            let line = `[${new Date(time).toLocaleString()}] ${colorize(level)}: `;\n            if (value.type === 'Error') {\n                line += `\\n${chalk__WEBPACK_IMPORTED_MODULE_1___default.a.bgRed(value.stack)}`;\n            }\n            else if (value.msg) {\n                line += chalk__WEBPACK_IMPORTED_MODULE_1___default.a.cyan(value.msg);\n            }\n            else if (value.detail) {\n                line += `${pid}, ${hostname}, ${name}, ${v}`;\n            }\n            else {\n                line += `\\n${chalk__WEBPACK_IMPORTED_MODULE_1___default.a.magentaBright(JSON.stringify(value, null, 2))}`;\n            }\n            return line;\n        }\n    });\n    pretty.pipe(process.stdout);\n    logger = pino__WEBPACK_IMPORTED_MODULE_0___default()({}, pretty);\n}\nelse {\n    logger = pino__WEBPACK_IMPORTED_MODULE_0___default()({ prettyPrint: true });\n}\n/* harmony default export */ __webpack_exports__[\"default\"] = (logger);\n\n\n//# sourceURL=webpack:///./src/lib/logger.ts?");

/***/ }),

/***/ "./src/server/config.ts":
/*!******************************!*\
  !*** ./src/server/config.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n// Node module\n\n\nconst appPath = fs__WEBPACK_IMPORTED_MODULE_0___default.a.realpathSync(process.cwd());\n// Extract process.env, use process.env or webpack define-plugin's settings\nconst { NODE_ENV = \"development\" === 'development', APP_DIST = \"/Users/edward/security/chronos/dist\", APP_NAME = \"Chronos\", APP_VERSION = \"0.0.1\", APP_PROTOCOL = \"http\", APP_HOST = \"localhost\", APP_PORT = 3500, APP_PATH = \"/\", } = process.env;\nconst config = {\n    isDev: NODE_ENV,\n    dist: APP_DIST,\n    name: APP_NAME,\n    version: APP_VERSION,\n    connection: {\n        protocol: APP_PROTOCOL,\n        host: APP_HOST,\n        port: APP_PORT,\n        path: APP_PATH\n    },\n    dbPath: path__WEBPACK_IMPORTED_MODULE_1___default.a.resolve(appPath, 'data/db.json')\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (config);\n\n\n//# sourceURL=webpack:///./src/server/config.ts?");

/***/ }),

/***/ "./src/server/controller/workers.ts":
/*!******************************************!*\
  !*** ./src/server/controller/workers.ts ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _db_operation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../db/operation */ \"./src/server/db/operation.ts\");\n\nclass WorkController {\n    static async getWorkers(ctx) {\n        let data1 = ctx.db.getData(\"/worker/lists\");\n        ctx.status = 200;\n        ctx.body = data1;\n    }\n    static async getWorker(ctx) {\n        let getId = ctx.params.id;\n        let ss = ctx.db.getData(\"/worker/lists\");\n        let secondElement = _db_operation__WEBPACK_IMPORTED_MODULE_0__[\"default\"].queryById(ss, getId);\n        ctx.status = 200;\n        ctx.body = secondElement.name;\n    }\n    static async createWorker(ctx) {\n        ctx.body = ctx.request.body.name;\n        //ctx.db.push(\"/test1\", ctx.request.body.name);\n        ctx.status = 201;\n        // ctx.db.push(\"/test4\", { test: \"test\", json: { test: [{ id: 1, name: \"t1\" }, { id: 2, name: \"t2\" }] } });\n        ctx.db.push(\"/worker\", { lists: [{ id: 1, name: \"t1\" }, { id: 2, name: \"t2\" }, { id: 3, name: \"t23\" }] });\n        console.log(ctx.db);\n        // userToBeSaved.name = ctx.request.body.name;\n        // userToBeSaved.email = ctx.request.body.email;\n        // validate user entity\n        // const errors: ValidationError[] = await validate(userToBeSaved); // errors is an array of validation errors\n        // if (errors.length > 0) {\n        //   // return BAD REQUEST status code and errors array\n        //   ctx.status = 400;\n        //   ctx.body = errors;\n        // } else if (await userRepository.findOne({ email: userToBeSaved.email })) {\n        //   // return BAD REQUEST status code and email already exists error\n        //   ctx.status = 400;\n        //   ctx.body = 'The specified e-mail address already exists';\n        // } else {\n        //   // save the user contained in the POST body\n        //   const user = await userRepository.save(userToBeSaved);\n        //   // return CREATED status code and updated user\n        //   ctx.status = 201;\n        //   ctx.body = user;\n        // }\n    }\n}\n/* harmony default export */ __webpack_exports__[\"default\"] = (WorkController);\n\n\n//# sourceURL=webpack:///./src/server/controller/workers.ts?");

/***/ }),

/***/ "./src/server/db/operation.ts":
/*!************************************!*\
  !*** ./src/server/db/operation.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst queryById = (parent, getId) => {\n    return parent.find((item) => {\n        return item.id == getId;\n    });\n};\nconst operation = {\n    queryById\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (operation);\n\n\n//# sourceURL=webpack:///./src/server/db/operation.ts?");

/***/ }),

/***/ "./src/server/index.ts":
/*!*****************************!*\
  !*** ./src/server/index.ts ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var koa__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa */ \"koa\");\n/* harmony import */ var koa__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! url */ \"url\");\n/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var koa_static__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! koa-static */ \"koa-static\");\n/* harmony import */ var koa_static__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(koa_static__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var node_json_db__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! node-json-db */ \"node-json-db\");\n/* harmony import */ var node_json_db__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(node_json_db__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var koa_logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! koa-logger */ \"koa-logger\");\n/* harmony import */ var koa_logger__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(koa_logger__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var koa_bodyparser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! koa-bodyparser */ \"koa-bodyparser\");\n/* harmony import */ var koa_bodyparser__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(koa_bodyparser__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./routes */ \"./src/server/routes.ts\");\n/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! #lib/logger */ \"./src/lib/logger.ts\");\n/* harmony import */ var _middleware_hmr_middleware__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./middleware/hmr-middleware */ \"./src/server/middleware/hmr-middleware.ts\");\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./config */ \"./src/server/config.ts\");\n// Node Module\n\n\n\n\n\n\n\n// Lib\n\n// Middleware\n\n// Config\n\n// Env\nconst { isDev, dist, name, version, connection, dbPath } = _config__WEBPACK_IMPORTED_MODULE_9__[\"default\"];\nconst { protocol, host, port, path } = connection;\nconst address = Object(url__WEBPACK_IMPORTED_MODULE_1__[\"format\"])({ protocol, hostname: host, port, pathname: path });\nconst printMsg = () => _lib_logger__WEBPACK_IMPORTED_MODULE_7__[\"default\"].info(`${name} v${version} [Address] ${address} [Mode] ${isDev ? '⚙️' : '🌎'}`);\n// const router = new Router();\n// Init App\nconst app = new koa__WEBPACK_IMPORTED_MODULE_0___default.a();\n// Init JsonDB\napp.context.db = new node_json_db__WEBPACK_IMPORTED_MODULE_3___default.a(dbPath, true, true);\nif (isDev) {\n    app\n        .use(koa_logger__WEBPACK_IMPORTED_MODULE_4___default()())\n        .use(Object(_middleware_hmr_middleware__WEBPACK_IMPORTED_MODULE_8__[\"default\"])());\n}\nelse {\n    app\n        .use(koa_static__WEBPACK_IMPORTED_MODULE_2___default()(dist));\n}\napp\n    .use(koa_bodyparser__WEBPACK_IMPORTED_MODULE_5___default()())\n    .use(_routes__WEBPACK_IMPORTED_MODULE_6__[\"router\"].routes())\n    .use(_routes__WEBPACK_IMPORTED_MODULE_6__[\"router\"].allowedMethods())\n    .listen(port, printMsg);\n\n\n//# sourceURL=webpack:///./src/server/index.ts?");

/***/ }),

/***/ "./src/server/middleware/hmr-middleware.ts":
/*!*************************************************!*\
  !*** ./src/server/middleware/hmr-middleware.ts ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var koa_webpack__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa-webpack */ \"koa-webpack\");\n/* harmony import */ var koa_webpack__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa_webpack__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _config_webpack_client_webpack_dev__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../config/webpack/client/webpack.dev */ \"./config/webpack/client/webpack.dev.ts\");\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../config */ \"./src/server/config.ts\");\n// Node module\n\n// Webpack config\n\n// Config\n\nconst hmrMiddleware = () => koa_webpack__WEBPACK_IMPORTED_MODULE_0___default()({\n    config: _config_webpack_client_webpack_dev__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n    dev: { publicPath: _config__WEBPACK_IMPORTED_MODULE_2__[\"default\"].connection.path, logLevel: 'silent' },\n    hot: { logLevel: 'silent' }\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (hmrMiddleware);\n\n\n//# sourceURL=webpack:///./src/server/middleware/hmr-middleware.ts?");

/***/ }),

/***/ "./src/server/routes.ts":
/*!******************************!*\
  !*** ./src/server/routes.ts ***!
  \******************************/
/*! exports provided: router */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"router\", function() { return router; });\n/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa-router */ \"koa-router\");\n/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa_router__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _controller_workers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controller/workers */ \"./src/server/controller/workers.ts\");\n\n\nconst router = new koa_router__WEBPACK_IMPORTED_MODULE_0___default.a({ prefix: '/api/v1' });\n// GENERAL ROUTES\nrouter.get('/work', _controller_workers__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getWorkers);\nrouter.get('/work/:id', _controller_workers__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getWorker);\nrouter.post('/work', _controller_workers__WEBPACK_IMPORTED_MODULE_1__[\"default\"].createWorker);\n\n\n\n//# sourceURL=webpack:///./src/server/routes.ts?");

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

/***/ "koa-bodyparser":
/*!*********************************!*\
  !*** external "koa-bodyparser" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-bodyparser\");\n\n//# sourceURL=webpack:///external_%22koa-bodyparser%22?");

/***/ }),

/***/ "koa-logger":
/*!*****************************!*\
  !*** external "koa-logger" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-logger\");\n\n//# sourceURL=webpack:///external_%22koa-logger%22?");

/***/ }),

/***/ "koa-router":
/*!*****************************!*\
  !*** external "koa-router" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"koa-router\");\n\n//# sourceURL=webpack:///external_%22koa-router%22?");

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