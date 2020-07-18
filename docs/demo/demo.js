/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"demo": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./demoSrc/demo.js","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./demoSrc/Common.js":
/*!***************************!*\
  !*** ./demoSrc/Common.js ***!
  \***************************/
/*! exports provided: Common */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Common\", function() { return Common; });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ \"./node_modules/three/examples/jsm/controls/OrbitControls.js\");\n\n\nclass Common {\n  static initScene() {\n    const scene = new three__WEBPACK_IMPORTED_MODULE_0__[\"Scene\"]();\n    return scene;\n  }\n\n  static initLight(scene) {\n    const ambientLight = new three__WEBPACK_IMPORTED_MODULE_0__[\"AmbientLight\"](0xffffff, 1.0);\n    scene.add(ambientLight);\n    return ambientLight;\n  }\n\n  static initCamera(scene, W, H, near = 1, far = 400) {\n    const camera = new three__WEBPACK_IMPORTED_MODULE_0__[\"PerspectiveCamera\"](45, W / H, near, far);\n    camera.position.set(0, 0, 100);\n    camera.updateMatrixWorld(false);\n    scene.add(camera);\n    return camera;\n  }\n\n  static initControl(camera, render) {\n    let domElement;\n\n    if (render) {\n      domElement = render.domElement;\n    }\n\n    const control = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_1__[\"OrbitControls\"](camera, domElement);\n    control.update();\n    return control;\n  }\n\n  static initRenderer(W, H, option) {\n    option = Object.assign({\n      color: 0x000000,\n      id: \"webgl-canvas\",\n      antialias: true\n    }, option);\n    const renderer = new three__WEBPACK_IMPORTED_MODULE_0__[\"WebGLRenderer\"]({\n      canvas: document.getElementById(option.id),\n      antialias: option.antialias\n    });\n    renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_0__[\"Color\"](option.color));\n    renderer.setSize(W, H);\n    renderer.setPixelRatio(window.devicePixelRatio);\n    return renderer;\n  }\n\n  static initHelper(scene) {\n    const axesHelper = new three__WEBPACK_IMPORTED_MODULE_0__[\"AxesHelper\"](30);\n    scene.add(axesHelper);\n  }\n\n}\n\n//# sourceURL=webpack:///./demoSrc/Common.js?");

/***/ }),

/***/ "./demoSrc/demo.js":
/*!*************************!*\
  !*** ./demoSrc/demo.js ***!
  \*************************/
/*! exports provided: Demo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Demo\", function() { return Demo; });\n/* harmony import */ var _Common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Common */ \"./demoSrc/Common.js\");\n/* harmony import */ var raf_ticker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raf-ticker */ \"./node_modules/raf-ticker/esm/index.js\");\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib */ \"./lib/index.js\");\n/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lib__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var threejs_drag_watcher__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! threejs-drag-watcher */ \"./node_modules/threejs-drag-watcher/esm/index.js\");\n/* harmony import */ var threejs_spherical_controls__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! threejs-spherical-controls */ \"./node_modules/threejs-spherical-controls/esm/index.js\");\n\n\n\n\n\n\nclass Demo {\n  constructor() {\n    const W = 640;\n    const H = 480;\n    const scene = _Common__WEBPACK_IMPORTED_MODULE_0__[\"Common\"].initScene();\n    scene.fog = new three__WEBPACK_IMPORTED_MODULE_2__[\"Fog\"](0x000000, 80, 160);\n    _Common__WEBPACK_IMPORTED_MODULE_0__[\"Common\"].initLight(scene);\n    const camera = _Common__WEBPACK_IMPORTED_MODULE_0__[\"Common\"].initCamera(scene, W, H);\n    const renderer = _Common__WEBPACK_IMPORTED_MODULE_0__[\"Common\"].initRenderer(W, H, {\n      antialias: false\n    });\n    const helper = _Common__WEBPACK_IMPORTED_MODULE_0__[\"Common\"].initHelper(scene);\n    const control = new threejs_spherical_controls__WEBPACK_IMPORTED_MODULE_5__[\"SphericalController\"](camera, this.initTarget(scene));\n    control.initCameraPosition(new three__WEBPACK_IMPORTED_MODULE_2__[\"Spherical\"](100, Math.PI / 2, 0));\n    const dragWatcher = new threejs_drag_watcher__WEBPACK_IMPORTED_MODULE_4__[\"DragWatcher\"](renderer.domElement);\n    const sleepWatcher = new threejs_drag_watcher__WEBPACK_IMPORTED_MODULE_4__[\"SleepWatcher\"](dragWatcher, {\n      timeOut_ms: 1000\n    });\n    const rotor = new _lib__WEBPACK_IMPORTED_MODULE_3__[\"AutoSphericalRotor\"](sleepWatcher, control);\n    rotor.start({\n      minTheta: -Math.PI / 4,\n      maxTheta: Math.PI / 4,\n      minPhi: 0,\n      maxPhi: Math.PI / 2,\n      minR: 100 / 3,\n      maxR: 100,\n      defaultR: 100\n    });\n    raf_ticker__WEBPACK_IMPORTED_MODULE_1__[\"RAFTicker\"].addEventListener(raf_ticker__WEBPACK_IMPORTED_MODULE_1__[\"RAFTickerEventType\"].tick, () => {\n      renderer.render(scene, camera);\n    });\n  }\n\n  initTarget(scene) {\n    const geo = new three__WEBPACK_IMPORTED_MODULE_2__[\"SphereGeometry\"](1);\n    const cameraTarget = new three__WEBPACK_IMPORTED_MODULE_2__[\"Mesh\"](geo);\n    scene.add(cameraTarget);\n    return cameraTarget;\n  }\n\n}\n\nwindow.onload = () => {\n  const demo = new Demo();\n};\n\n//# sourceURL=webpack:///./demoSrc/demo.js?");

/***/ }),

/***/ "./lib/SphericalRotor.js":
/*!*******************************!*\
  !*** ./lib/SphericalRotor.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar __extends = this && this.__extends || function () {\n  var extendStatics = function (d, b) {\n    extendStatics = Object.setPrototypeOf || {\n      __proto__: []\n    } instanceof Array && function (d, b) {\n      d.__proto__ = b;\n    } || function (d, b) {\n      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];\n    };\n\n    return extendStatics(d, b);\n  };\n\n  return function (d, b) {\n    extendStatics(d, b);\n\n    function __() {\n      this.constructor = d;\n    }\n\n    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n  };\n}();\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.AutoSphericalRotor = exports.SphericalRotor = void 0;\n\nvar threejs_spherical_controls_1 = __webpack_require__(/*! threejs-spherical-controls */ \"./node_modules/threejs-spherical-controls/esm/index.js\");\n\nvar threejs_drag_watcher_1 = __webpack_require__(/*! threejs-drag-watcher */ \"./node_modules/threejs-drag-watcher/esm/index.js\");\n\nvar SphericalRotor =\n/** @class */\nfunction () {\n  function SphericalRotor(cameraController) {\n    var _this = this;\n\n    this.isRotation = false;\n\n    this.startRotation = function () {\n      _this.stopRotation();\n\n      if (_this.isRotation) return; //横回転\n\n      if (_this._config.speed != null) {\n        _this.rotateTimerID = setInterval(_this.rotateTheta, SphericalRotor.ROTATE_INTERVAL);\n      } //縦往復ループ\n\n\n      if (_this._config.maxPhi != null && _this._config.minPhi != null) {\n        _this.cameraController.loop(threejs_spherical_controls_1.SphericalParamType.PHI, _this._config.minPhi, _this._config.maxPhi, {\n          duration: _this._config.loopPhiDuration\n        });\n      } //横往復ループ\n\n\n      if (_this._config.maxTheta != null && _this._config.minTheta != null) {\n        _this.cameraController.loop(threejs_spherical_controls_1.SphericalParamType.THETA, _this._config.minTheta, _this._config.maxTheta, {\n          duration: _this._config.loopThetaDuration\n        });\n      } //ズームインアウトループ\n\n\n      if (_this._config.maxR != null && _this._config.minR != null) {\n        _this.cameraController.loop(threejs_spherical_controls_1.SphericalParamType.R, _this._config.minR, _this._config.maxR, {\n          duration: _this._config.loopRDuration\n        });\n      }\n\n      _this.isRotation = true;\n    };\n    /**\n     * カメラを横回転させる\n     * 往復ではなく無限運動。\n     */\n\n\n    this.rotateTheta = function () {\n      if (_this._config.speed == null) return;\n\n      _this.cameraController.addPosition(threejs_spherical_controls_1.SphericalParamType.THETA, _this._config.speed);\n    };\n    /**\n     * カメラの自動回転を停止する\n     */\n\n\n    this.stopRotation = function () {\n      _this.stop();\n    };\n\n    this.cameraController = cameraController;\n  }\n\n  Object.defineProperty(SphericalRotor.prototype, \"config\", {\n    set: function (parameters) {\n      if (parameters === null) {\n        parameters = {};\n      }\n\n      if (parameters.loopPhiDuration == null) {\n        parameters.loopPhiDuration = AutoSphericalRotor.DEFAULT_LOOP_LAT_DURATION;\n      }\n\n      if (parameters.loopThetaDuration == null) {\n        parameters.loopThetaDuration = AutoSphericalRotor.DEFAULT_LOOP_LAT_DURATION;\n      }\n\n      if (parameters.loopRDuration == null) {\n        parameters.loopRDuration = AutoSphericalRotor.DEFAULT_LOOP_R_DURATION;\n      }\n\n      this._config = parameters;\n    },\n    enumerable: false,\n    configurable: true\n  });\n  /**\n   * カメラの回転を一時停止する。\n   * @param [option]　option.returnR = falseの時、アニメーションを行わない。\n   */\n\n  SphericalRotor.prototype.stop = function (option) {\n    if (!this.isRotation) return;\n    this.isRotation = false;\n\n    if (this.rotateTimerID) {\n      clearInterval(this.rotateTimerID);\n      this.rotateTimerID = null;\n    }\n\n    this.cameraController.tweens.stop();\n    option = SphericalRotor.getDefaultStopParam(option);\n\n    if (this._config && this._config.defaultR != null && option && option.returnR === true) {\n      this.cameraController.movePosition(threejs_spherical_controls_1.SphericalParamType.R, this._config.defaultR, {\n        duration: 333\n      });\n    }\n  };\n\n  SphericalRotor.getDefaultStopParam = function (option) {\n    if (option == null) option = {};\n    if (option.returnR == null) option.returnR = true;\n    return option;\n  };\n\n  SphericalRotor.ROTATE_INTERVAL = 38;\n  return SphericalRotor;\n}();\n\nexports.SphericalRotor = SphericalRotor;\n/**\n * マウス操作を監視し、回転を制御するクラス。\n * マウスが無操作の場合、回転を始め、操作が再開されると停止する。\n */\n\nvar AutoSphericalRotor =\n/** @class */\nfunction (_super) {\n  __extends(AutoSphericalRotor, _super);\n\n  function AutoSphericalRotor(sleepWatcher, cameraController) {\n    var _this = _super.call(this, cameraController) || this;\n\n    _this.isStart = false;\n    _this.sleepWatcher = sleepWatcher;\n    return _this;\n  }\n  /**\n   * マウスの監視を一時停止する\n   * @param [option]　option.returnR =　falseの時のみ、アニメーションを行わず原位置でマウス監視が停止する。監視を停止させた後に別のアニメーションでカメラを移動したかったり、元に戻したかったりする場合に使う。\n   */\n\n\n  AutoSphericalRotor.prototype.pause = function (option) {\n    if (!this.isStart) return;\n    this.isStart = false;\n    option = SphericalRotor.getDefaultStopParam(option);\n    this.stopWatcher();\n    this.stop(option);\n  };\n\n  AutoSphericalRotor.prototype.stopWatcher = function () {\n    this.sleepWatcher.removeEventListener(threejs_drag_watcher_1.SleepEventType.SLEEP, this.startRotation);\n    this.sleepWatcher.removeEventListener(threejs_drag_watcher_1.SleepEventType.WAKEUP, this.stopRotation);\n    this.sleepWatcher.stop();\n  };\n  /**\n   * マウスの監視を再開する。\n   * 各種設定はstart()で指定されたオプションを引き継ぐ。\n   * pause()関数で停止された監視を再開させるための関数。\n   */\n\n\n  AutoSphericalRotor.prototype.resume = function () {\n    if (this.isStart) return;\n    this.isStart = true;\n    this.startWatcher();\n  };\n  /**\n   * マウスの監視を開始する。\n   */\n\n\n  AutoSphericalRotor.prototype.start = function (parameters) {\n    this.config = parameters;\n    this.isStart = true;\n    this.startWatcher();\n  };\n\n  AutoSphericalRotor.prototype.startWatcher = function () {\n    this.stopWatcher();\n    this.sleepWatcher.addEventListener(threejs_drag_watcher_1.SleepEventType.SLEEP, this.startRotation);\n    this.sleepWatcher.addEventListener(threejs_drag_watcher_1.SleepEventType.WAKEUP, this.stopRotation);\n    this.sleepWatcher.start();\n  };\n\n  AutoSphericalRotor.DEFAULT_LOOP_LAT_DURATION = 30 * 1000;\n  AutoSphericalRotor.DEFAULT_LOOP_R_DURATION = 30 * 1000;\n  return AutoSphericalRotor;\n}(SphericalRotor);\n\nexports.AutoSphericalRotor = AutoSphericalRotor;\n\n//# sourceURL=webpack:///./lib/SphericalRotor.js?");

/***/ }),

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {\n  if (k2 === undefined) k2 = k;\n  Object.defineProperty(o, k2, {\n    enumerable: true,\n    get: function () {\n      return m[k];\n    }\n  });\n} : function (o, m, k, k2) {\n  if (k2 === undefined) k2 = k;\n  o[k2] = m[k];\n});\n\nvar __exportStar = this && this.__exportStar || function (m, exports) {\n  for (var p in m) if (p !== \"default\" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);\n};\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\n__exportStar(__webpack_require__(/*! ./SphericalRotor */ \"./lib/SphericalRotor.js\"), exports);\n\n//# sourceURL=webpack:///./lib/index.js?");

/***/ })

/******/ });