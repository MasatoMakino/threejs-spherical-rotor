/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./demoSrc/Common.js":
/*!***************************!*\
  !*** ./demoSrc/Common.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Common\": () => (/* binding */ Common)\n/* harmony export */ });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ \"./node_modules/three/examples/jsm/controls/OrbitControls.js\");\n\n\nclass Common {\n  static initScene() {\n    const scene = new three__WEBPACK_IMPORTED_MODULE_1__.Scene();\n    return scene;\n  }\n\n  static initLight(scene) {\n    const ambientLight = new three__WEBPACK_IMPORTED_MODULE_1__.AmbientLight(0xffffff, 1.0);\n    scene.add(ambientLight);\n    return ambientLight;\n  }\n\n  static initCamera(scene, W, H, near = 1, far = 400) {\n    const camera = new three__WEBPACK_IMPORTED_MODULE_1__.PerspectiveCamera(45, W / H, near, far);\n    camera.position.set(0, 0, 100);\n    camera.updateMatrixWorld(false);\n    scene.add(camera);\n    return camera;\n  }\n\n  static initControl(camera, render) {\n    let domElement;\n\n    if (render) {\n      domElement = render.domElement;\n    }\n\n    const control = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__.OrbitControls(camera, domElement);\n    control.update();\n    return control;\n  }\n\n  static initRenderer(W, H, option) {\n    option = Object.assign({\n      color: 0x000000,\n      id: \"webgl-canvas\",\n      antialias: true\n    }, option);\n    const renderer = new three__WEBPACK_IMPORTED_MODULE_1__.WebGLRenderer({\n      canvas: document.getElementById(option.id),\n      antialias: option.antialias\n    });\n    renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_1__.Color(option.color));\n    renderer.setSize(W, H);\n    renderer.setPixelRatio(window.devicePixelRatio);\n    return renderer;\n  }\n\n  static initHelper(scene) {\n    const axesHelper = new three__WEBPACK_IMPORTED_MODULE_1__.AxesHelper(30);\n    scene.add(axesHelper);\n    return axesHelper;\n  }\n\n}\n\n//# sourceURL=webpack://threejs-spherical-rotor/./demoSrc/Common.js?");

/***/ }),

/***/ "./demoSrc/demo.js":
/*!*************************!*\
  !*** ./demoSrc/demo.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Demo\": () => (/* binding */ Demo)\n/* harmony export */ });\n/* harmony import */ var _Common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Common */ \"./demoSrc/Common.js\");\n/* harmony import */ var raf_ticker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raf-ticker */ \"./node_modules/raf-ticker/esm/index.js\");\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib */ \"./lib/index.js\");\n/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lib__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var threejs_drag_watcher__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! threejs-drag-watcher */ \"./node_modules/threejs-drag-watcher/esm/index.js\");\n/* harmony import */ var threejs_spherical_controls__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! threejs-spherical-controls */ \"./node_modules/threejs-spherical-controls/esm/index.js\");\n\n\n\n\n\n\nlet scene;\nclass Demo {\n  constructor() {\n    const W = 640;\n    const H = 480;\n    scene = _Common__WEBPACK_IMPORTED_MODULE_0__.Common.initScene();\n    scene.fog = new three__WEBPACK_IMPORTED_MODULE_5__.Fog(0x000000, 80, 160);\n    _Common__WEBPACK_IMPORTED_MODULE_0__.Common.initLight(scene);\n    const camera = _Common__WEBPACK_IMPORTED_MODULE_0__.Common.initCamera(scene, W, H);\n    const renderer = _Common__WEBPACK_IMPORTED_MODULE_0__.Common.initRenderer(W, H, {\n      antialias: false\n    });\n    const helper = _Common__WEBPACK_IMPORTED_MODULE_0__.Common.initHelper(scene);\n    const target = threejs_spherical_controls__WEBPACK_IMPORTED_MODULE_4__.SphericalControllerUtil.generateCameraTarget();\n    scene.add(target);\n    const control = new threejs_spherical_controls__WEBPACK_IMPORTED_MODULE_4__.SphericalController(camera, target);\n    control.initCameraPosition(new three__WEBPACK_IMPORTED_MODULE_5__.Spherical(100, Math.PI / 2, 0));\n    const dragWatcher = new threejs_drag_watcher__WEBPACK_IMPORTED_MODULE_3__.DragWatcher(renderer.domElement);\n    const sleepWatcher = new threejs_drag_watcher__WEBPACK_IMPORTED_MODULE_3__.SleepWatcher(dragWatcher, {\n      timeOut_ms: 1000\n    });\n    const rotor = new _lib__WEBPACK_IMPORTED_MODULE_2__.AutoSphericalRotor(sleepWatcher, control);\n    rotor.start({\n      minTheta: -Math.PI / 4,\n      maxTheta: Math.PI / 4,\n      minPhi: 0,\n      maxPhi: Math.PI / 2,\n      minR: 100 / 3,\n      maxR: 100,\n      defaultR: 100\n    });\n    raf_ticker__WEBPACK_IMPORTED_MODULE_1__.RAFTicker.on(raf_ticker__WEBPACK_IMPORTED_MODULE_1__.RAFTickerEventType.tick, () => {\n      renderer.render(scene, camera);\n    });\n  }\n\n}\n\nwindow.onload = () => {\n  const demo = new Demo();\n};\n\n//# sourceURL=webpack://threejs-spherical-rotor/./demoSrc/demo.js?");

/***/ }),

/***/ "./lib/SphericalRotor.js":
/*!*******************************!*\
  !*** ./lib/SphericalRotor.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.AutoSphericalRotor = exports.SphericalRotor = void 0;\n\nconst threejs_spherical_controls_1 = __webpack_require__(/*! threejs-spherical-controls */ \"./node_modules/threejs-spherical-controls/esm/index.js\");\n\nconst threejs_drag_watcher_1 = __webpack_require__(/*! threejs-drag-watcher */ \"./node_modules/threejs-drag-watcher/esm/index.js\");\n\nclass SphericalRotor {\n  constructor(cameraController) {\n    this.isRotation = false;\n\n    this.startRotation = () => {\n      this.stopRotation();\n      if (this.isRotation) return; //横回転\n\n      if (this._config.speed != null) {\n        this.rotateTimerID = setInterval(this.rotateTheta, SphericalRotor.ROTATE_INTERVAL);\n      } //縦往復ループ\n\n\n      if (this._config.maxPhi != null && this._config.minPhi != null) {\n        this.cameraController.loop(threejs_spherical_controls_1.SphericalParamType.PHI, this._config.minPhi, this._config.maxPhi, {\n          duration: this._config.loopPhiDuration\n        });\n      } //横往復ループ\n\n\n      if (this._config.maxTheta != null && this._config.minTheta != null) {\n        this.cameraController.loop(threejs_spherical_controls_1.SphericalParamType.THETA, this._config.minTheta, this._config.maxTheta, {\n          duration: this._config.loopThetaDuration\n        });\n      } //ズームインアウトループ\n\n\n      if (this._config.maxR != null && this._config.minR != null) {\n        this.cameraController.loop(threejs_spherical_controls_1.SphericalParamType.R, this._config.minR, this._config.maxR, {\n          duration: this._config.loopRDuration\n        });\n      }\n\n      this.isRotation = true;\n    };\n    /**\n     * カメラを横回転させる\n     * 往復ではなく無限運動。\n     */\n\n\n    this.rotateTheta = () => {\n      if (this._config.speed == null) return;\n      this.cameraController.addPosition(threejs_spherical_controls_1.SphericalParamType.THETA, this._config.speed);\n    };\n    /**\n     * カメラの自動回転を停止する\n     */\n\n\n    this.stopRotation = () => {\n      this.stop();\n    };\n\n    this.cameraController = cameraController;\n  }\n\n  set config(parameters) {\n    if (parameters === null) {\n      parameters = {};\n    }\n\n    if (parameters.loopPhiDuration == null) {\n      parameters.loopPhiDuration = AutoSphericalRotor.DEFAULT_LOOP_LAT_DURATION;\n    }\n\n    if (parameters.loopThetaDuration == null) {\n      parameters.loopThetaDuration = AutoSphericalRotor.DEFAULT_LOOP_LAT_DURATION;\n    }\n\n    if (parameters.loopRDuration == null) {\n      parameters.loopRDuration = AutoSphericalRotor.DEFAULT_LOOP_R_DURATION;\n    }\n\n    this._config = parameters;\n  }\n  /**\n   * カメラの回転を一時停止する。\n   * @param [option] option.returnR = falseの時、アニメーションを行わない。\n   */\n\n\n  stop(option) {\n    if (!this.isRotation) return;\n    this.isRotation = false;\n\n    if (this.rotateTimerID) {\n      clearInterval(this.rotateTimerID);\n      this.rotateTimerID = null;\n    }\n\n    this.cameraController.tweens.stop();\n    option = SphericalRotor.getDefaultStopParam(option);\n\n    if (this._config && this._config.defaultR != null && option && option.returnR === true) {\n      this.cameraController.movePosition(threejs_spherical_controls_1.SphericalParamType.R, this._config.defaultR, {\n        duration: 333\n      });\n    }\n  }\n\n  static getDefaultStopParam(option) {\n    if (option == null) option = {};\n    if (option.returnR == null) option.returnR = true;\n    return option;\n  }\n\n}\n\nexports.SphericalRotor = SphericalRotor;\nSphericalRotor.ROTATE_INTERVAL = 38;\n/**\n * マウス操作を監視し、回転を制御するクラス。\n * マウスが無操作の場合、回転を始め、操作が再開されると停止する。\n */\n\nclass AutoSphericalRotor extends SphericalRotor {\n  constructor(sleepWatcher, cameraController) {\n    super(cameraController);\n    this.isStart = false;\n    this.sleepWatcher = sleepWatcher;\n  }\n  /**\n   * マウスの監視を一時停止する\n   * @param [option]　option.returnR =　falseの時のみ、アニメーションを行わず原位置でマウス監視が停止する。監視を停止させた後に別のアニメーションでカメラを移動したかったり、元に戻したかったりする場合に使う。\n   */\n\n\n  pause(option) {\n    if (!this.isStart) return;\n    this.isStart = false;\n    option = SphericalRotor.getDefaultStopParam(option);\n    this.stopWatcher();\n    this.stop(option);\n  }\n\n  stopWatcher() {\n    this.sleepWatcher.removeEventListener(threejs_drag_watcher_1.SleepEventType.SLEEP, this.startRotation);\n    this.sleepWatcher.removeEventListener(threejs_drag_watcher_1.SleepEventType.WAKEUP, this.stopRotation);\n    this.sleepWatcher.stop();\n  }\n  /**\n   * マウスの監視を再開する。\n   * 各種設定はstart()で指定されたオプションを引き継ぐ。\n   * pause()関数で停止された監視を再開させるための関数。\n   */\n\n\n  resume() {\n    if (this.isStart) return;\n    this.isStart = true;\n    this.startWatcher();\n  }\n  /**\n   * マウスの監視を開始する。\n   */\n\n\n  start(parameters) {\n    this.config = parameters;\n    this.isStart = true;\n    this.startWatcher();\n  }\n\n  startWatcher() {\n    this.stopWatcher();\n    this.sleepWatcher.addEventListener(threejs_drag_watcher_1.SleepEventType.SLEEP, this.startRotation);\n    this.sleepWatcher.addEventListener(threejs_drag_watcher_1.SleepEventType.WAKEUP, this.stopRotation);\n    this.sleepWatcher.start();\n  }\n\n}\n\nexports.AutoSphericalRotor = AutoSphericalRotor;\nAutoSphericalRotor.DEFAULT_LOOP_LAT_DURATION = 30 * 1000;\nAutoSphericalRotor.DEFAULT_LOOP_R_DURATION = 30 * 1000;\n\n//# sourceURL=webpack://threejs-spherical-rotor/./lib/SphericalRotor.js?");

/***/ }),

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\n\nvar __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {\n  if (k2 === undefined) k2 = k;\n  Object.defineProperty(o, k2, {\n    enumerable: true,\n    get: function () {\n      return m[k];\n    }\n  });\n} : function (o, m, k, k2) {\n  if (k2 === undefined) k2 = k;\n  o[k2] = m[k];\n});\n\nvar __exportStar = this && this.__exportStar || function (m, exports) {\n  for (var p in m) if (p !== \"default\" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);\n};\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\n\n__exportStar(__webpack_require__(/*! ./SphericalRotor */ \"./lib/SphericalRotor.js\"), exports);\n\n//# sourceURL=webpack://threejs-spherical-rotor/./lib/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					result = fn();
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"demo": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) var result = runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkthreejs_spherical_rotor"] = self["webpackChunkthreejs_spherical_rotor"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor"], () => (__webpack_require__("./demoSrc/demo.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;