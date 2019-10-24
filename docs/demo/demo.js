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
/******/ 		"demo.js": 0
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

/***/ "./bin/SphericalRotor.js":
/*!*******************************!*\
  !*** ./bin/SphericalRotor.js ***!
  \*******************************/
/*! exports provided: SphericalRotor, AutoSphericalRotor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SphericalRotor\", function() { return SphericalRotor; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"AutoSphericalRotor\", function() { return AutoSphericalRotor; });\n/* harmony import */ var threejs_spherical_controls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! threejs-spherical-controls */ \"./node_modules/threejs-spherical-controls/bin/index.js\");\n/* harmony import */ var threejs_drag_watcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! threejs-drag-watcher */ \"./node_modules/threejs-drag-watcher/bin/index.js\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\nvar SphericalRotor =\n/*#__PURE__*/\nfunction () {\n  function SphericalRotor(cameraController) {\n    var _this = this;\n\n    _classCallCheck(this, SphericalRotor);\n\n    this.isRotation = false;\n\n    this.startRotation = function () {\n      _this.stopRotation();\n\n      if (_this.isRotation) return; //横回転\n\n      if (_this._config.speed != null) {\n        _this.rotateTimerID = setInterval(_this.rotateTheta, SphericalRotor.ROTATE_INTERVAL);\n      } //縦往復ループ\n\n\n      if (_this._config.maxPhi != null && _this._config.minPhi != null) {\n        _this.cameraController.loop(threejs_spherical_controls__WEBPACK_IMPORTED_MODULE_0__[\"SphericalParamType\"].PHI, _this._config.minPhi, _this._config.maxPhi, {\n          duration: _this._config.loopPhiDuration\n        });\n      } //横往復ループ\n\n\n      if (_this._config.maxTheta != null && _this._config.minTheta != null) {\n        _this.cameraController.loop(threejs_spherical_controls__WEBPACK_IMPORTED_MODULE_0__[\"SphericalParamType\"].THETA, _this._config.minTheta, _this._config.maxTheta, {\n          duration: _this._config.loopThetaDuration\n        });\n      } //ズームインアウトループ\n\n\n      if (_this._config.maxR != null && _this._config.minR != null) {\n        _this.cameraController.loop(threejs_spherical_controls__WEBPACK_IMPORTED_MODULE_0__[\"SphericalParamType\"].R, _this._config.minR, _this._config.maxR, {\n          duration: _this._config.loopRDuration\n        });\n      }\n\n      _this.isRotation = true;\n    };\n    /**\n     * カメラを横回転させる\n     * 往復ではなく無限運動。\n     */\n\n\n    this.rotateTheta = function () {\n      if (_this._config.speed == null) return;\n\n      _this.cameraController.addPosition(threejs_spherical_controls__WEBPACK_IMPORTED_MODULE_0__[\"SphericalParamType\"].THETA, _this._config.speed);\n    };\n    /**\n     * カメラの自動回転を停止する\n     */\n\n\n    this.stopRotation = function () {\n      if (!_this.isRotation) return;\n\n      if (_this.rotateTimerID) {\n        clearInterval(_this.rotateTimerID);\n        _this.rotateTimerID = null;\n      }\n\n      _this.cameraController.tweens.stop();\n\n      if (_this._config && _this._config.defaultR != null) {\n        _this.cameraController.movePosition(threejs_spherical_controls__WEBPACK_IMPORTED_MODULE_0__[\"SphericalParamType\"].R, _this._config.defaultR, {\n          duration: 333\n        });\n      }\n\n      _this.isRotation = false;\n    };\n\n    this.cameraController = cameraController;\n  }\n\n  _createClass(SphericalRotor, [{\n    key: \"config\",\n    set: function set(parameters) {\n      if (parameters === null) {\n        parameters = {};\n      }\n\n      if (parameters.loopPhiDuration == null) {\n        parameters.loopPhiDuration = AutoSphericalRotor.DEFAULT_LOOP_LAT_DURATION;\n      }\n\n      if (parameters.loopThetaDuration == null) {\n        parameters.loopThetaDuration = AutoSphericalRotor.DEFAULT_LOOP_LAT_DURATION;\n      }\n\n      if (parameters.loopRDuration == null) {\n        parameters.loopRDuration = AutoSphericalRotor.DEFAULT_LOOP_R_DURATION;\n      }\n\n      this._config = parameters;\n    }\n  }]);\n\n  return SphericalRotor;\n}();\nSphericalRotor.ROTATE_INTERVAL = 38;\n/**\n * マウス操作を監視し、回転を制御するクラス。\n * マウスが無操作の場合、回転を始め、操作が再開されると停止する。\n */\n\nvar AutoSphericalRotor =\n/*#__PURE__*/\nfunction (_SphericalRotor) {\n  _inherits(AutoSphericalRotor, _SphericalRotor);\n\n  function AutoSphericalRotor(sleepWatcher, cameraController) {\n    var _this2;\n\n    _classCallCheck(this, AutoSphericalRotor);\n\n    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(AutoSphericalRotor).call(this, cameraController));\n    _this2.sleepWatcher = sleepWatcher;\n    return _this2;\n  }\n  /**\n   * マウスの監視を停止する\n   */\n\n\n  _createClass(AutoSphericalRotor, [{\n    key: \"stop\",\n    value: function stop() {\n      this.sleepWatcher.removeEventListener(threejs_drag_watcher__WEBPACK_IMPORTED_MODULE_1__[\"SleepEventType\"].SLEEP, this.startRotation);\n      this.sleepWatcher.removeEventListener(threejs_drag_watcher__WEBPACK_IMPORTED_MODULE_1__[\"SleepEventType\"].WAKEUP, this.stopRotation);\n      this.sleepWatcher.stop();\n      this.stopRotation();\n    }\n    /**\n     * マウスの監視を開始する\n     */\n\n  }, {\n    key: \"start\",\n    value: function start(parameters) {\n      this.config = parameters;\n      this.sleepWatcher.addEventListener(threejs_drag_watcher__WEBPACK_IMPORTED_MODULE_1__[\"SleepEventType\"].SLEEP, this.startRotation);\n      this.sleepWatcher.addEventListener(threejs_drag_watcher__WEBPACK_IMPORTED_MODULE_1__[\"SleepEventType\"].WAKEUP, this.stopRotation);\n      this.sleepWatcher.start();\n    }\n  }]);\n\n  return AutoSphericalRotor;\n}(SphericalRotor);\nAutoSphericalRotor.DEFAULT_LOOP_LAT_DURATION = 30 * 1000;\nAutoSphericalRotor.DEFAULT_LOOP_R_DURATION = 30 * 1000;\n\n//# sourceURL=webpack:///./bin/SphericalRotor.js?");

/***/ }),

/***/ "./bin/index.js":
/*!**********************!*\
  !*** ./bin/index.js ***!
  \**********************/
/*! exports provided: SphericalRotor, AutoSphericalRotor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _SphericalRotor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SphericalRotor */ \"./bin/SphericalRotor.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"SphericalRotor\", function() { return _SphericalRotor__WEBPACK_IMPORTED_MODULE_0__[\"SphericalRotor\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"AutoSphericalRotor\", function() { return _SphericalRotor__WEBPACK_IMPORTED_MODULE_0__[\"AutoSphericalRotor\"]; });\n\n\n\n//# sourceURL=webpack:///./bin/index.js?");

/***/ }),

/***/ "./demoSrc/Common.js":
/*!***************************!*\
  !*** ./demoSrc/Common.js ***!
  \***************************/
/*! exports provided: Common */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Common\", function() { return Common; });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ \"./node_modules/three/examples/jsm/controls/OrbitControls.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\nvar Common =\n/*#__PURE__*/\nfunction () {\n  function Common() {\n    _classCallCheck(this, Common);\n  }\n\n  _createClass(Common, null, [{\n    key: \"initScene\",\n    value: function initScene() {\n      var scene = new three__WEBPACK_IMPORTED_MODULE_0__[\"Scene\"]();\n      return scene;\n    }\n  }, {\n    key: \"initLight\",\n    value: function initLight(scene) {\n      var ambientLight = new three__WEBPACK_IMPORTED_MODULE_0__[\"AmbientLight\"](0xffffff, 1.0);\n      scene.add(ambientLight);\n      return ambientLight;\n    }\n  }, {\n    key: \"initCamera\",\n    value: function initCamera(scene, W, H) {\n      var near = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;\n      var far = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 400;\n      var camera = new three__WEBPACK_IMPORTED_MODULE_0__[\"PerspectiveCamera\"](45, W / H, near, far);\n      camera.position.set(0, 0, 100);\n      camera.updateMatrixWorld(false);\n      scene.add(camera);\n      return camera;\n    }\n  }, {\n    key: \"initControl\",\n    value: function initControl(camera, render) {\n      var domElement;\n\n      if (render) {\n        domElement = render.domElement;\n      }\n\n      var control = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_1__[\"OrbitControls\"](camera, domElement);\n      control.update();\n      return control;\n    }\n  }, {\n    key: \"initRenderer\",\n    value: function initRenderer(W, H, option) {\n      option = Object.assign({\n        color: 0x000000,\n        id: \"webgl-canvas\",\n        antialias: true\n      }, option);\n      var renderer = new three__WEBPACK_IMPORTED_MODULE_0__[\"WebGLRenderer\"]({\n        canvas: document.getElementById(option.id),\n        antialias: option.antialias\n      });\n      renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_0__[\"Color\"](option.color));\n      renderer.setSize(W, H);\n      renderer.setPixelRatio(window.devicePixelRatio);\n      return renderer;\n    }\n  }, {\n    key: \"initHelper\",\n    value: function initHelper(scene) {\n      var axesHelper = new three__WEBPACK_IMPORTED_MODULE_0__[\"AxesHelper\"](30);\n      scene.add(axesHelper);\n    }\n  }]);\n\n  return Common;\n}();\n\n//# sourceURL=webpack:///./demoSrc/Common.js?");

/***/ }),

/***/ "./demoSrc/demo.js":
/*!*************************!*\
  !*** ./demoSrc/demo.js ***!
  \*************************/
/*! exports provided: Demo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Demo\", function() { return Demo; });\n/* harmony import */ var _Common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Common */ \"./demoSrc/Common.js\");\n/* harmony import */ var threejs_ticker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! threejs-ticker */ \"./node_modules/threejs-ticker/bin/index.js\");\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n/* harmony import */ var _bin__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../bin */ \"./bin/index.js\");\n/* harmony import */ var threejs_drag_watcher__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! threejs-drag-watcher */ \"./node_modules/threejs-drag-watcher/bin/index.js\");\n/* harmony import */ var threejs_spherical_controls__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! threejs-spherical-controls */ \"./node_modules/threejs-spherical-controls/bin/index.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\n\n\n\n\nvar Demo =\n/*#__PURE__*/\nfunction () {\n  function Demo() {\n    _classCallCheck(this, Demo);\n\n    var W = 640;\n    var H = 480;\n    var scene = _Common__WEBPACK_IMPORTED_MODULE_0__[\"Common\"].initScene();\n    scene.fog = new three__WEBPACK_IMPORTED_MODULE_2__[\"Fog\"](0x000000, 80, 160);\n    _Common__WEBPACK_IMPORTED_MODULE_0__[\"Common\"].initLight(scene);\n    var camera = _Common__WEBPACK_IMPORTED_MODULE_0__[\"Common\"].initCamera(scene, W, H);\n    var renderer = _Common__WEBPACK_IMPORTED_MODULE_0__[\"Common\"].initRenderer(W, H, {\n      antialias: false\n    });\n    var helper = _Common__WEBPACK_IMPORTED_MODULE_0__[\"Common\"].initHelper(scene);\n    var control = new threejs_spherical_controls__WEBPACK_IMPORTED_MODULE_5__[\"SphericalController\"](camera, this.initTarget(scene));\n    control.initCameraPosition(new three__WEBPACK_IMPORTED_MODULE_2__[\"Spherical\"](100, Math.PI / 2, 0));\n    var dragWatcher = new threejs_drag_watcher__WEBPACK_IMPORTED_MODULE_4__[\"DragWatcher\"](renderer.domElement);\n    var sleepWatcher = new threejs_drag_watcher__WEBPACK_IMPORTED_MODULE_4__[\"SleepWatcher\"](dragWatcher, {\n      timeOut_ms: 1000\n    });\n    var rotor = new _bin__WEBPACK_IMPORTED_MODULE_3__[\"AutoSphericalRotor\"](sleepWatcher, control);\n    rotor.start({\n      minTheta: -Math.PI / 4,\n      maxTheta: Math.PI / 4,\n      minPhi: 0,\n      maxPhi: Math.PI / 2,\n      minR: 100 / 3,\n      maxR: 100,\n      defaultR: 100\n    });\n    threejs_ticker__WEBPACK_IMPORTED_MODULE_1__[\"ThreeTicker\"].addEventListener(threejs_ticker__WEBPACK_IMPORTED_MODULE_1__[\"ThreeTickerEventType\"].tick, function () {\n      renderer.render(scene, camera);\n    });\n  }\n\n  _createClass(Demo, [{\n    key: \"initTarget\",\n    value: function initTarget(scene) {\n      var geo = new three__WEBPACK_IMPORTED_MODULE_2__[\"SphereGeometry\"](1);\n      var cameraTarget = new three__WEBPACK_IMPORTED_MODULE_2__[\"Mesh\"](geo);\n      scene.add(cameraTarget);\n      return cameraTarget;\n    }\n  }]);\n\n  return Demo;\n}();\n\nwindow.onload = function () {\n  var demo = new Demo();\n};\n\n//# sourceURL=webpack:///./demoSrc/demo.js?");

/***/ })

/******/ });