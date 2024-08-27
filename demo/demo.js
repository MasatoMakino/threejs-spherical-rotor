(()=>{"use strict";var __webpack_modules__={716:(__unused_webpack___webpack_module__,__unused_webpack___webpack_exports__,__webpack_require__)=>{eval('\n// UNUSED EXPORTS: Demo\n\n// EXTERNAL MODULE: ./node_modules/three/build/three.module.js\nvar three_module = __webpack_require__(753);\n// EXTERNAL MODULE: ./node_modules/three/examples/jsm/controls/OrbitControls.js\nvar OrbitControls = __webpack_require__(580);\n;// CONCATENATED MODULE: ./demoSrc/Common.js\n\n\nclass Common {\n  static initScene() {\n    return new three_module/* Scene */.Z58();\n  }\n  static initLight(scene) {\n    const ambientLight = new three_module/* AmbientLight */.$p8(0xffffff, 1.0);\n    scene.add(ambientLight);\n    return ambientLight;\n  }\n  static initCamera(scene, W, H, near = 1, far = 400) {\n    const camera = new three_module/* PerspectiveCamera */.ubm(45, W / H, near, far);\n    camera.position.set(0, 0, 100);\n    camera.updateMatrixWorld(false);\n    scene.add(camera);\n    return camera;\n  }\n  static initControl(camera, render) {\n    let domElement;\n    if (render) {\n      domElement = render.domElement;\n    }\n    const control = new OrbitControls/* OrbitControls */.N(camera, domElement);\n    control.update();\n    return control;\n  }\n  static initRenderer(W, H, option) {\n    option = Object.assign({\n      color: 0x000000,\n      antialias: true\n    }, option);\n    const renderer = new three_module/* WebGLRenderer */.JeP({\n      antialias: option.antialias\n    });\n    document.body.appendChild(renderer.domElement);\n    renderer.setClearColor(new three_module/* Color */.Q1f(option.color));\n    renderer.setSize(W, H);\n    renderer.setPixelRatio(window.devicePixelRatio);\n    console.log(`three.js r${three_module/* REVISION */.sPf}`);\n    return renderer;\n  }\n  static initHelper(scene) {\n    const axesHelper = new three_module/* AxesHelper */.IzY(20);\n    scene.add(axesHelper);\n    const cone = new three_module/* Mesh */.eaF(new three_module/* ConeGeometry */.qFE(5, 10, 16), new three_module/* MeshBasicMaterial */.V9B({\n      wireframe: true\n    }));\n    scene.add(cone);\n    return axesHelper;\n  }\n}\n// EXTERNAL MODULE: ./node_modules/@masatomakino/raf-ticker/esm/index.js + 2 modules\nvar esm = __webpack_require__(961);\n;// CONCATENATED MODULE: ./esm/SphericalRotor.js\n\n\nclass SphericalRotor {\n  constructor(cameraController) {\n    this.cameraController = cameraController;\n    this.isRotation = false;\n    /**\n     * カメラを横回転させる\n     * 往復ではなく無限運動。\n     */\n    this.rotateTheta = e => {\n      if (this._config?.speed == null) return;\n      this.cameraController.addPosition("theta", this._config.speed * (e.delta / (1000 / 30)), false, true);\n    };\n  }\n  set config(parameters) {\n    if (parameters == null) return;\n    this._config = SphericalRotorConfigUtil.init(parameters);\n  }\n  /**\n   * 回転アニメーションを開始する。\n   *\n   * rotateとstopは対の関係ではない。異なるoptionを指定された場合、rotateは現状のアニメーションを上書きして再実行される。\n   * @param option\n   */\n  rotate(option) {\n    if (this.isRotation) {\n      this.stop();\n    }\n    //横回転\n    if (this._config?.speed != null) {\n      esm/* RAFTicker */.w.on("tick", this.rotateTheta);\n    }\n    //縦往復ループ\n    this.startSphericalCameraLoop("phi", option);\n    //横往復ループ\n    this.startSphericalCameraLoop("theta", option);\n    //ズームインアウトループ\n    this.startSphericalCameraLoop("radius", option);\n    this.isRotation = true;\n  }\n  /**\n   * configオブジェクトから、縦、横、ズームループの状態を取り出す。\n   * 設定されている場合、ループを開始する。\n   *\n   * @param type 縦、横、ズームのいずれか\n   * @param option\n   * @private\n   */\n  startSphericalCameraLoop(type, option) {\n    const loop = SphericalRotorConfigUtil.extractSphericalParam(this._config, type);\n    if (loop == null) return;\n    this.cameraController.loop(type, loop.min, loop.max, {\n      duration: loop.duration,\n      startTime: option?.startTime\n    });\n  }\n  /**\n   * カメラの回転を一時停止する。\n   * @param [option] option.returnR = falseの時、アニメーションを行わない。\n   */\n  stop(option) {\n    if (!this.isRotation) return;\n    this.isRotation = false;\n    esm/* RAFTicker */.w.off("tick", this.rotateTheta);\n    this.cameraController.tweens.stop();\n    option = SphericalRotor.getDefaultStopParam(option);\n    this.returnToDefaultR(option);\n  }\n  /**\n   * カメラをデフォルト位置まで戻す\n   * @param option\n   * @protected\n   */\n  returnToDefaultR(option) {\n    if (this._config?.defaultR != null && option?.returnR === true) {\n      this.cameraController.movePosition("radius", this._config.defaultR, {\n        duration: 333\n      });\n    }\n  }\n  static getDefaultStopParam(option) {\n    option ??= {};\n    option.returnR ??= true;\n    return option;\n  }\n}\n;// CONCATENATED MODULE: ./esm/AutoSphericalRotor.js\n\n/**\n * マウス操作を監視し、回転を制御するクラス。\n * マウスが無操作の場合、回転を始め、操作が再開されると停止する。\n */\nclass AutoSphericalRotor extends SphericalRotor {\n  constructor(sleepWatcher, cameraController) {\n    super(cameraController);\n    this.sleepWatcher = sleepWatcher;\n    this.isStart = false;\n    this.onSleep = () => {\n      this.rotate(this.loopOption);\n    };\n    this.onWakeup = () => {\n      this.stop();\n    };\n  }\n  /**\n   * マウスの監視を一時停止する\n   * @param [option] option.returnR =　falseの時のみ、アニメーションを行わず原位置でマウス監視が停止する。監視を停止させた後に別のアニメーションでカメラを移動したかったり、元に戻したかったりする場合に使う。\n   */\n  pause(option) {\n    if (!this.isStart) return;\n    this.isStart = false;\n    option = SphericalRotor.getDefaultStopParam(option);\n    this.stopWatcher();\n    this.stop(option);\n  }\n  stopWatcher() {\n    this.sleepWatcher.off("sleep", this.onSleep);\n    this.sleepWatcher.off("wakeup", this.onWakeup);\n    this.sleepWatcher.stop();\n  }\n  /**\n   * マウスの監視を再開する。\n   * 各種設定はwatch()で指定されたオプションを引き継ぐ。\n   * pause()関数で停止された監視を再開させるための関数。\n   */\n  resume() {\n    if (this.isStart) return;\n    this.isStart = true;\n    this.startWatcher();\n  }\n  /**\n   * マウスの監視を開始する。\n   * @param parameters\n   * @param loopOption\n   */\n  watch(parameters, loopOption) {\n    this.config = parameters;\n    this.loopOption = loopOption;\n    this.isStart = true;\n    this.startWatcher();\n  }\n  startWatcher() {\n    this.stopWatcher();\n    this.sleepWatcher.on("sleep", this.onSleep);\n    this.sleepWatcher.on("wakeup", this.onWakeup);\n    this.sleepWatcher.start();\n  }\n}\nAutoSphericalRotor.DEFAULT_LOOP_LAT_DURATION = 30 * 1000;\nAutoSphericalRotor.DEFAULT_LOOP_R_DURATION = 30 * 1000;\n;// CONCATENATED MODULE: ./esm/SphericalRotorConfig.js\n\nclass SphericalRotorConfigUtil {\n  static init(config) {\n    config ??= {};\n    config.loopPhi ??= {};\n    config.loopPhi.duration ??= AutoSphericalRotor.DEFAULT_LOOP_LAT_DURATION;\n    config.loopTheta ??= {};\n    config.loopTheta.duration ??= AutoSphericalRotor.DEFAULT_LOOP_LAT_DURATION;\n    config.loopR ??= {};\n    config.loopR.duration ??= AutoSphericalRotor.DEFAULT_LOOP_R_DURATION;\n    return config;\n  }\n  /**\n   * ループアニメーションに必要な情報を、configオブジェクトから取り出す。\n   * @param config\n   * @param type\n   */\n  static extractSphericalParam(config, type) {\n    const getLoopParameter = (config, type) => {\n      switch (type) {\n        case "phi":\n          return config?.loopPhi;\n        case "theta":\n          return config?.loopTheta;\n        case "radius":\n          return config?.loopR;\n      }\n      return undefined;\n    };\n    const param = getLoopParameter(config, type);\n    if (param == null || param.max == null || param.min == null) return undefined;\n    return param;\n  }\n}\n;// CONCATENATED MODULE: ./esm/index.js\n\n\n\n\n// EXTERNAL MODULE: ./node_modules/@masatomakino/threejs-drag-watcher/esm/index.js + 2 modules\nvar threejs_drag_watcher_esm = __webpack_require__(108);\n// EXTERNAL MODULE: ./node_modules/@masatomakino/threejs-spherical-controls/esm/index.js + 7 modules\nvar threejs_spherical_controls_esm = __webpack_require__(930);\n;// CONCATENATED MODULE: ./demoSrc/demo.js\n\n\n\n\n\n\nlet scene;\nclass Demo {\n  constructor() {\n    const W = 640;\n    const H = 480;\n    scene = Common.initScene();\n    scene.fog = new three_module/* Fog */.jUj(0x000000, 80, 160);\n    Common.initLight(scene);\n    const camera = Common.initCamera(scene, W, H);\n    const renderer = Common.initRenderer(W, H, {\n      antialias: false\n    });\n    Common.initHelper(scene);\n    const target = threejs_spherical_controls_esm/* SphericalControllerUtil */.Wo.generateCameraTarget();\n    scene.add(target);\n    const control = new threejs_spherical_controls_esm/* SphericalController */.i8(camera, target);\n    control.initCameraPosition(new three_module/* Spherical */.YHV(100, Math.PI / 2, 0));\n    const dragWatcher = new threejs_drag_watcher_esm/* DragWatcher */.T(renderer.domElement);\n    const sleepWatcher = new threejs_drag_watcher_esm/* SleepWatcher */.s(dragWatcher, {\n      timeOut_ms: 1000\n    });\n    const rotor = new AutoSphericalRotor(sleepWatcher, control);\n    rotor.watch({\n      loopPhi: {\n        min: 0,\n        max: Math.PI\n      },\n      loopTheta: {\n        min: 0,\n        max: Math.PI / 2\n      },\n      loopR: {\n        min: 100 / 3,\n        max: 100\n      },\n      defaultR: 100\n    });\n    esm/* RAFTicker */.w.on("tick", () => {\n      renderer.render(scene, camera);\n    });\n  }\n}\nwindow.onload = () => {\n  new Demo();\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzlELE1BQU1DLFdBQVcsR0FBRyxJQUFJWCwyQ0FBVyxDQUFDdEUsUUFBUSxDQUFDVCxVQUFVLENBQUM7SUFDeEQsTUFBTTBELFlBQVksR0FBRyxJQUFJc0IsNENBQVksQ0FBQ1UsV0FBVyxFQUFFO01BQUVDLFVBQVUsRUFBRTtJQUFLLENBQUMsQ0FBQztJQUV4RSxNQUFNQyxLQUFLLEdBQUcsSUFBSW5DLGtCQUFrQixDQUFDQyxZQUFZLEVBQUV6RCxPQUFPLENBQUM7SUFDM0QyRixLQUFLLENBQUN6QixLQUFLLENBQUM7TUFDVkksT0FBTyxFQUFFO1FBQ1B6QixHQUFHLEVBQUUsQ0FBQztRQUNOQyxHQUFHLEVBQUV5QyxJQUFJLENBQUNDO01BQ1osQ0FBQztNQUNEakIsU0FBUyxFQUFFO1FBQ1QxQixHQUFHLEVBQUUsQ0FBQztRQUNOQyxHQUFHLEVBQUV5QyxJQUFJLENBQUNDLEVBQUUsR0FBRztNQUNqQixDQUFDO01BQ0RoQixLQUFLLEVBQUU7UUFDTDNCLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUNaQyxHQUFHLEVBQUU7TUFDUCxDQUFDO01BQ0RPLFFBQVEsRUFBRTtJQUNaLENBQUMsQ0FBQztJQUVGOUIsb0JBQVMsQ0FBQ2lCLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTTtNQUN6QmhDLFFBQVEsQ0FBQ1YsTUFBTSxDQUFDYixLQUFLLEVBQUVRLE1BQU0sQ0FBQztJQUNoQyxDQUFDLENBQUM7RUFDSjtBQUNGO0FBRUFzQixNQUFNLENBQUM2RSxNQUFNLEdBQUcsTUFBTTtFQUNwQixJQUFJVixJQUFJLENBQUMsQ0FBQztBQUNaLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AbWFzYXRvbWFraW5vL3RocmVlanMtc3BoZXJpY2FsLXJvdG9yLy4vZGVtb1NyYy9Db21tb24uanM/MmMwNyIsIndlYnBhY2s6Ly9AbWFzYXRvbWFraW5vL3RocmVlanMtc3BoZXJpY2FsLXJvdG9yLy4vZXNtL1NwaGVyaWNhbFJvdG9yLmpzP2M3NzQiLCJ3ZWJwYWNrOi8vQG1hc2F0b21ha2luby90aHJlZWpzLXNwaGVyaWNhbC1yb3Rvci8uL2VzbS9BdXRvU3BoZXJpY2FsUm90b3IuanM/Y2FkNSIsIndlYnBhY2s6Ly9AbWFzYXRvbWFraW5vL3RocmVlanMtc3BoZXJpY2FsLXJvdG9yLy4vZXNtL1NwaGVyaWNhbFJvdG9yQ29uZmlnLmpzPzRhMDEiLCJ3ZWJwYWNrOi8vQG1hc2F0b21ha2luby90aHJlZWpzLXNwaGVyaWNhbC1yb3Rvci8uL2VzbS9pbmRleC5qcz9iMjM5Iiwid2VicGFjazovL0BtYXNhdG9tYWtpbm8vdGhyZWVqcy1zcGhlcmljYWwtcm90b3IvLi9kZW1vU3JjL2RlbW8uanM/Mzk5NiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBbWJpZW50TGlnaHQsXG4gIEF4ZXNIZWxwZXIsXG4gIENvbG9yLFxuICBDb25lR2VvbWV0cnksXG4gIE1lc2hCYXNpY01hdGVyaWFsLFxuICBQZXJzcGVjdGl2ZUNhbWVyYSxcbiAgU2NlbmUsXG4gIFdlYkdMUmVuZGVyZXIsXG4gIE1lc2gsXG4gIFJFVklTSU9OLFxufSBmcm9tIFwidGhyZWVcIjtcbmltcG9ydCB7IE9yYml0Q29udHJvbHMgfSBmcm9tIFwidGhyZWUvZXhhbXBsZXMvanNtL2NvbnRyb2xzL09yYml0Q29udHJvbHMuanNcIjtcblxuZXhwb3J0IGNsYXNzIENvbW1vbiB7XG4gIHN0YXRpYyBpbml0U2NlbmUoKSB7XG4gICAgcmV0dXJuIG5ldyBTY2VuZSgpO1xuICB9XG5cbiAgc3RhdGljIGluaXRMaWdodChzY2VuZSkge1xuICAgIGNvbnN0IGFtYmllbnRMaWdodCA9IG5ldyBBbWJpZW50TGlnaHQoMHhmZmZmZmYsIDEuMCk7XG4gICAgc2NlbmUuYWRkKGFtYmllbnRMaWdodCk7XG4gICAgcmV0dXJuIGFtYmllbnRMaWdodDtcbiAgfVxuXG4gIHN0YXRpYyBpbml0Q2FtZXJhKHNjZW5lLCBXLCBILCBuZWFyID0gMSwgZmFyID0gNDAwKSB7XG4gICAgY29uc3QgY2FtZXJhID0gbmV3IFBlcnNwZWN0aXZlQ2FtZXJhKDQ1LCBXIC8gSCwgbmVhciwgZmFyKTtcbiAgICBjYW1lcmEucG9zaXRpb24uc2V0KDAsIDAsIDEwMCk7XG4gICAgY2FtZXJhLnVwZGF0ZU1hdHJpeFdvcmxkKGZhbHNlKTtcbiAgICBzY2VuZS5hZGQoY2FtZXJhKTtcbiAgICByZXR1cm4gY2FtZXJhO1xuICB9XG5cbiAgc3RhdGljIGluaXRDb250cm9sKGNhbWVyYSwgcmVuZGVyKSB7XG4gICAgbGV0IGRvbUVsZW1lbnQ7XG4gICAgaWYgKHJlbmRlcikge1xuICAgICAgZG9tRWxlbWVudCA9IHJlbmRlci5kb21FbGVtZW50O1xuICAgIH1cbiAgICBjb25zdCBjb250cm9sID0gbmV3IE9yYml0Q29udHJvbHMoY2FtZXJhLCBkb21FbGVtZW50KTtcbiAgICBjb250cm9sLnVwZGF0ZSgpO1xuICAgIHJldHVybiBjb250cm9sO1xuICB9XG5cbiAgc3RhdGljIGluaXRSZW5kZXJlcihXLCBILCBvcHRpb24pIHtcbiAgICBvcHRpb24gPSBPYmplY3QuYXNzaWduKFxuICAgICAge1xuICAgICAgICBjb2xvcjogMHgwMDAwMDAsXG4gICAgICAgIGFudGlhbGlhczogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICBvcHRpb24sXG4gICAgKTtcblxuICAgIGNvbnN0IHJlbmRlcmVyID0gbmV3IFdlYkdMUmVuZGVyZXIoe1xuICAgICAgYW50aWFsaWFzOiBvcHRpb24uYW50aWFsaWFzLFxuICAgIH0pO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocmVuZGVyZXIuZG9tRWxlbWVudCk7XG4gICAgcmVuZGVyZXIuc2V0Q2xlYXJDb2xvcihuZXcgQ29sb3Iob3B0aW9uLmNvbG9yKSk7XG4gICAgcmVuZGVyZXIuc2V0U2l6ZShXLCBIKTtcbiAgICByZW5kZXJlci5zZXRQaXhlbFJhdGlvKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvKTtcbiAgICBjb25zb2xlLmxvZyhgdGhyZWUuanMgciR7UkVWSVNJT059YCk7XG4gICAgcmV0dXJuIHJlbmRlcmVyO1xuICB9XG5cbiAgc3RhdGljIGluaXRIZWxwZXIoc2NlbmUpIHtcbiAgICBjb25zdCBheGVzSGVscGVyID0gbmV3IEF4ZXNIZWxwZXIoMjApO1xuICAgIHNjZW5lLmFkZChheGVzSGVscGVyKTtcbiAgICBjb25zdCBjb25lID0gbmV3IE1lc2goXG4gICAgICBuZXcgQ29uZUdlb21ldHJ5KDUsIDEwLCAxNiksXG4gICAgICBuZXcgTWVzaEJhc2ljTWF0ZXJpYWwoeyB3aXJlZnJhbWU6IHRydWUgfSksXG4gICAgKTtcbiAgICBzY2VuZS5hZGQoY29uZSk7XG4gICAgcmV0dXJuIGF4ZXNIZWxwZXI7XG4gIH1cbn1cbiIsImltcG9ydCB7IFJBRlRpY2tlciB9IGZyb20gXCJAbWFzYXRvbWFraW5vL3JhZi10aWNrZXJcIjtcbmltcG9ydCB7IFNwaGVyaWNhbFJvdG9yQ29uZmlnVXRpbCwgfSBmcm9tIFwiLi9pbmRleC5qc1wiO1xuZXhwb3J0IGNsYXNzIFNwaGVyaWNhbFJvdG9yIHtcbiAgICBjb25zdHJ1Y3RvcihjYW1lcmFDb250cm9sbGVyKSB7XG4gICAgICAgIHRoaXMuY2FtZXJhQ29udHJvbGxlciA9IGNhbWVyYUNvbnRyb2xsZXI7XG4gICAgICAgIHRoaXMuaXNSb3RhdGlvbiA9IGZhbHNlO1xuICAgICAgICAvKipcbiAgICAgICAgICog44Kr44Oh44Op44KS5qiq5Zue6Lui44GV44Gb44KLXG4gICAgICAgICAqIOW+gOW+qeOBp+OBr+OBquOBj+eEoemZkOmBi+WLleOAglxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5yb3RhdGVUaGV0YSA9IChlKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5fY29uZmlnPy5zcGVlZCA9PSBudWxsKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIHRoaXMuY2FtZXJhQ29udHJvbGxlci5hZGRQb3NpdGlvbihcInRoZXRhXCIsIHRoaXMuX2NvbmZpZy5zcGVlZCAqIChlLmRlbHRhIC8gKDEwMDAgLyAzMCkpLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIHNldCBjb25maWcocGFyYW1ldGVycykge1xuICAgICAgICBpZiAocGFyYW1ldGVycyA9PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0aGlzLl9jb25maWcgPSBTcGhlcmljYWxSb3RvckNvbmZpZ1V0aWwuaW5pdChwYXJhbWV0ZXJzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5Zue6Lui44Ki44OL44Oh44O844K344On44Oz44KS6ZaL5aeL44GZ44KL44CCXG4gICAgICpcbiAgICAgKiByb3RhdGXjgahzdG9w44Gv5a++44Gu6Zai5L+C44Gn44Gv44Gq44GE44CC55Ww44Gq44KLb3B0aW9u44KS5oyH5a6a44GV44KM44Gf5aC05ZCI44CBcm90YXRl44Gv54++54q244Gu44Ki44OL44Oh44O844K344On44Oz44KS5LiK5pu444GN44GX44Gm5YaN5a6f6KGM44GV44KM44KL44CCXG4gICAgICogQHBhcmFtIG9wdGlvblxuICAgICAqL1xuICAgIHJvdGF0ZShvcHRpb24pIHtcbiAgICAgICAgaWYgKHRoaXMuaXNSb3RhdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zdG9wKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy/mqKrlm57ou6JcbiAgICAgICAgaWYgKHRoaXMuX2NvbmZpZz8uc3BlZWQgIT0gbnVsbCkge1xuICAgICAgICAgICAgUkFGVGlja2VyLm9uKFwidGlja1wiLCB0aGlzLnJvdGF0ZVRoZXRhKTtcbiAgICAgICAgfVxuICAgICAgICAvL+e4puW+gOW+qeODq+ODvOODl1xuICAgICAgICB0aGlzLnN0YXJ0U3BoZXJpY2FsQ2FtZXJhTG9vcChcInBoaVwiLCBvcHRpb24pO1xuICAgICAgICAvL+aoquW+gOW+qeODq+ODvOODl1xuICAgICAgICB0aGlzLnN0YXJ0U3BoZXJpY2FsQ2FtZXJhTG9vcChcInRoZXRhXCIsIG9wdGlvbik7XG4gICAgICAgIC8v44K644O844Og44Kk44Oz44Ki44Km44OI44Or44O844OXXG4gICAgICAgIHRoaXMuc3RhcnRTcGhlcmljYWxDYW1lcmFMb29wKFwicmFkaXVzXCIsIG9wdGlvbik7XG4gICAgICAgIHRoaXMuaXNSb3RhdGlvbiA9IHRydWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIGNvbmZpZ+OCquODluOCuOOCp+OCr+ODiOOBi+OCieOAgee4puOAgeaoquOAgeOCuuODvOODoOODq+ODvOODl+OBrueKtuaFi+OCkuWPluOCiuWHuuOBmeOAglxuICAgICAqIOioreWumuOBleOCjOOBpuOBhOOCi+WgtOWQiOOAgeODq+ODvOODl+OCkumWi+Wni+OBmeOCi+OAglxuICAgICAqXG4gICAgICogQHBhcmFtIHR5cGUg57im44CB5qiq44CB44K644O844Og44Gu44GE44Ga44KM44GLXG4gICAgICogQHBhcmFtIG9wdGlvblxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgc3RhcnRTcGhlcmljYWxDYW1lcmFMb29wKHR5cGUsIG9wdGlvbikge1xuICAgICAgICBjb25zdCBsb29wID0gU3BoZXJpY2FsUm90b3JDb25maWdVdGlsLmV4dHJhY3RTcGhlcmljYWxQYXJhbSh0aGlzLl9jb25maWcsIHR5cGUpO1xuICAgICAgICBpZiAobG9vcCA9PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0aGlzLmNhbWVyYUNvbnRyb2xsZXIubG9vcCh0eXBlLCBsb29wLm1pbiwgbG9vcC5tYXgsIHtcbiAgICAgICAgICAgIGR1cmF0aW9uOiBsb29wLmR1cmF0aW9uLFxuICAgICAgICAgICAgc3RhcnRUaW1lOiBvcHRpb24/LnN0YXJ0VGltZSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOOCq+ODoeODqeOBruWbnui7ouOCkuS4gOaZguWBnOatouOBmeOCi+OAglxuICAgICAqIEBwYXJhbSBbb3B0aW9uXSBvcHRpb24ucmV0dXJuUiA9IGZhbHNl44Gu5pmC44CB44Ki44OL44Oh44O844K344On44Oz44KS6KGM44KP44Gq44GE44CCXG4gICAgICovXG4gICAgc3RvcChvcHRpb24pIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzUm90YXRpb24pXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMuaXNSb3RhdGlvbiA9IGZhbHNlO1xuICAgICAgICBSQUZUaWNrZXIub2ZmKFwidGlja1wiLCB0aGlzLnJvdGF0ZVRoZXRhKTtcbiAgICAgICAgdGhpcy5jYW1lcmFDb250cm9sbGVyLnR3ZWVucy5zdG9wKCk7XG4gICAgICAgIG9wdGlvbiA9IFNwaGVyaWNhbFJvdG9yLmdldERlZmF1bHRTdG9wUGFyYW0ob3B0aW9uKTtcbiAgICAgICAgdGhpcy5yZXR1cm5Ub0RlZmF1bHRSKG9wdGlvbik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOOCq+ODoeODqeOCkuODh+ODleOCqeODq+ODiOS9jee9ruOBvuOBp+aIu+OBmVxuICAgICAqIEBwYXJhbSBvcHRpb25cbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgcmV0dXJuVG9EZWZhdWx0UihvcHRpb24pIHtcbiAgICAgICAgaWYgKHRoaXMuX2NvbmZpZz8uZGVmYXVsdFIgIT0gbnVsbCAmJiBvcHRpb24/LnJldHVyblIgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMuY2FtZXJhQ29udHJvbGxlci5tb3ZlUG9zaXRpb24oXCJyYWRpdXNcIiwgdGhpcy5fY29uZmlnLmRlZmF1bHRSLCB7XG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDMzMyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBnZXREZWZhdWx0U3RvcFBhcmFtKG9wdGlvbikge1xuICAgICAgICBvcHRpb24gPz89IHt9O1xuICAgICAgICBvcHRpb24ucmV0dXJuUiA/Pz0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIG9wdGlvbjtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBTcGhlcmljYWxSb3RvciwgfSBmcm9tIFwiLi9pbmRleC5qc1wiO1xuLyoqXG4gKiDjg57jgqbjgrnmk43kvZzjgpLnm6PoppbjgZfjgIHlm57ou6LjgpLliLblvqHjgZnjgovjgq/jg6njgrnjgIJcbiAqIOODnuOCpuOCueOBjOeEoeaTjeS9nOOBruWgtOWQiOOAgeWbnui7ouOCkuWni+OCgeOAgeaTjeS9nOOBjOWGjemWi+OBleOCjOOCi+OBqOWBnOatouOBmeOCi+OAglxuICovXG5leHBvcnQgY2xhc3MgQXV0b1NwaGVyaWNhbFJvdG9yIGV4dGVuZHMgU3BoZXJpY2FsUm90b3Ige1xuICAgIGNvbnN0cnVjdG9yKHNsZWVwV2F0Y2hlciwgY2FtZXJhQ29udHJvbGxlcikge1xuICAgICAgICBzdXBlcihjYW1lcmFDb250cm9sbGVyKTtcbiAgICAgICAgdGhpcy5zbGVlcFdhdGNoZXIgPSBzbGVlcFdhdGNoZXI7XG4gICAgICAgIHRoaXMuaXNTdGFydCA9IGZhbHNlO1xuICAgICAgICB0aGlzLm9uU2xlZXAgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJvdGF0ZSh0aGlzLmxvb3BPcHRpb24pO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLm9uV2FrZXVwID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zdG9wKCk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOODnuOCpuOCueOBruebo+imluOCkuS4gOaZguWBnOatouOBmeOCi1xuICAgICAqIEBwYXJhbSBbb3B0aW9uXSBvcHRpb24ucmV0dXJuUiA944CAZmFsc2Xjga7mmYLjga7jgb/jgIHjgqLjg4vjg6Hjg7zjgrfjg6fjg7PjgpLooYzjgo/jgZrljp/kvY3nva7jgafjg57jgqbjgrnnm6PoppbjgYzlgZzmraLjgZnjgovjgILnm6PoppbjgpLlgZzmraLjgZXjgZvjgZ/lvozjgavliKXjga7jgqLjg4vjg6Hjg7zjgrfjg6fjg7Pjgafjgqvjg6Hjg6njgpLnp7vli5XjgZfjgZ/jgYvjgaPjgZ/jgorjgIHlhYPjgavmiLvjgZfjgZ/jgYvjgaPjgZ/jgorjgZnjgovloLTlkIjjgavkvb/jgYbjgIJcbiAgICAgKi9cbiAgICBwYXVzZShvcHRpb24pIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzU3RhcnQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMuaXNTdGFydCA9IGZhbHNlO1xuICAgICAgICBvcHRpb24gPSBTcGhlcmljYWxSb3Rvci5nZXREZWZhdWx0U3RvcFBhcmFtKG9wdGlvbik7XG4gICAgICAgIHRoaXMuc3RvcFdhdGNoZXIoKTtcbiAgICAgICAgdGhpcy5zdG9wKG9wdGlvbik7XG4gICAgfVxuICAgIHN0b3BXYXRjaGVyKCkge1xuICAgICAgICB0aGlzLnNsZWVwV2F0Y2hlci5vZmYoXCJzbGVlcFwiLCB0aGlzLm9uU2xlZXApO1xuICAgICAgICB0aGlzLnNsZWVwV2F0Y2hlci5vZmYoXCJ3YWtldXBcIiwgdGhpcy5vbldha2V1cCk7XG4gICAgICAgIHRoaXMuc2xlZXBXYXRjaGVyLnN0b3AoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog44Oe44Km44K544Gu55uj6KaW44KS5YaN6ZaL44GZ44KL44CCXG4gICAgICog5ZCE56iu6Kit5a6a44Gvd2F0Y2goKeOBp+aMh+WumuOBleOCjOOBn+OCquODl+OCt+ODp+ODs+OCkuW8leOBjee2meOBkOOAglxuICAgICAqIHBhdXNlKCnplqLmlbDjgaflgZzmraLjgZXjgozjgZ/nm6PoppbjgpLlho3plovjgZXjgZvjgovjgZ/jgoHjga7plqLmlbDjgIJcbiAgICAgKi9cbiAgICByZXN1bWUoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzU3RhcnQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMuaXNTdGFydCA9IHRydWU7XG4gICAgICAgIHRoaXMuc3RhcnRXYXRjaGVyKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOODnuOCpuOCueOBruebo+imluOCkumWi+Wni+OBmeOCi+OAglxuICAgICAqIEBwYXJhbSBwYXJhbWV0ZXJzXG4gICAgICogQHBhcmFtIGxvb3BPcHRpb25cbiAgICAgKi9cbiAgICB3YXRjaChwYXJhbWV0ZXJzLCBsb29wT3B0aW9uKSB7XG4gICAgICAgIHRoaXMuY29uZmlnID0gcGFyYW1ldGVycztcbiAgICAgICAgdGhpcy5sb29wT3B0aW9uID0gbG9vcE9wdGlvbjtcbiAgICAgICAgdGhpcy5pc1N0YXJ0ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zdGFydFdhdGNoZXIoKTtcbiAgICB9XG4gICAgc3RhcnRXYXRjaGVyKCkge1xuICAgICAgICB0aGlzLnN0b3BXYXRjaGVyKCk7XG4gICAgICAgIHRoaXMuc2xlZXBXYXRjaGVyLm9uKFwic2xlZXBcIiwgdGhpcy5vblNsZWVwKTtcbiAgICAgICAgdGhpcy5zbGVlcFdhdGNoZXIub24oXCJ3YWtldXBcIiwgdGhpcy5vbldha2V1cCk7XG4gICAgICAgIHRoaXMuc2xlZXBXYXRjaGVyLnN0YXJ0KCk7XG4gICAgfVxufVxuQXV0b1NwaGVyaWNhbFJvdG9yLkRFRkFVTFRfTE9PUF9MQVRfRFVSQVRJT04gPSAzMCAqIDEwMDA7XG5BdXRvU3BoZXJpY2FsUm90b3IuREVGQVVMVF9MT09QX1JfRFVSQVRJT04gPSAzMCAqIDEwMDA7XG4iLCJpbXBvcnQgeyBBdXRvU3BoZXJpY2FsUm90b3IgfSBmcm9tIFwiLi9pbmRleC5qc1wiO1xuZXhwb3J0IGNsYXNzIFNwaGVyaWNhbFJvdG9yQ29uZmlnVXRpbCB7XG4gICAgc3RhdGljIGluaXQoY29uZmlnKSB7XG4gICAgICAgIGNvbmZpZyA/Pz0ge307XG4gICAgICAgIGNvbmZpZy5sb29wUGhpID8/PSB7fTtcbiAgICAgICAgY29uZmlnLmxvb3BQaGkuZHVyYXRpb24gPz89IEF1dG9TcGhlcmljYWxSb3Rvci5ERUZBVUxUX0xPT1BfTEFUX0RVUkFUSU9OO1xuICAgICAgICBjb25maWcubG9vcFRoZXRhID8/PSB7fTtcbiAgICAgICAgY29uZmlnLmxvb3BUaGV0YS5kdXJhdGlvbiA/Pz0gQXV0b1NwaGVyaWNhbFJvdG9yLkRFRkFVTFRfTE9PUF9MQVRfRFVSQVRJT047XG4gICAgICAgIGNvbmZpZy5sb29wUiA/Pz0ge307XG4gICAgICAgIGNvbmZpZy5sb29wUi5kdXJhdGlvbiA/Pz0gQXV0b1NwaGVyaWNhbFJvdG9yLkRFRkFVTFRfTE9PUF9SX0RVUkFUSU9OO1xuICAgICAgICByZXR1cm4gY29uZmlnO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDjg6vjg7zjg5fjgqLjg4vjg6Hjg7zjgrfjg6fjg7Pjgavlv4XopoHjgarmg4XloLHjgpLjgIFjb25maWfjgqrjg5bjgrjjgqfjgq/jg4jjgYvjgonlj5bjgorlh7rjgZnjgIJcbiAgICAgKiBAcGFyYW0gY29uZmlnXG4gICAgICogQHBhcmFtIHR5cGVcbiAgICAgKi9cbiAgICBzdGF0aWMgZXh0cmFjdFNwaGVyaWNhbFBhcmFtKGNvbmZpZywgdHlwZSkge1xuICAgICAgICBjb25zdCBnZXRMb29wUGFyYW1ldGVyID0gKGNvbmZpZywgdHlwZSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcInBoaVwiOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29uZmlnPy5sb29wUGhpO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJ0aGV0YVwiOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29uZmlnPy5sb29wVGhldGE7XG4gICAgICAgICAgICAgICAgY2FzZSBcInJhZGl1c1wiOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29uZmlnPy5sb29wUjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHBhcmFtID0gZ2V0TG9vcFBhcmFtZXRlcihjb25maWcsIHR5cGUpO1xuICAgICAgICBpZiAocGFyYW0gPT0gbnVsbCB8fCBwYXJhbS5tYXggPT0gbnVsbCB8fCBwYXJhbS5taW4gPT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIHJldHVybiBwYXJhbTtcbiAgICB9XG59XG4iLCJleHBvcnQgKiBmcm9tIFwiLi9TcGhlcmljYWxSb3Rvci5qc1wiO1xuZXhwb3J0ICogZnJvbSBcIi4vQXV0b1NwaGVyaWNhbFJvdG9yLmpzXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9Sb3RvclN0b3BDb25maWcuanNcIjtcbmV4cG9ydCAqIGZyb20gXCIuL1NwaGVyaWNhbFJvdG9yQ29uZmlnLmpzXCI7XG4iLCJpbXBvcnQgeyBDb21tb24gfSBmcm9tIFwiLi9Db21tb24uanNcIjtcbmltcG9ydCB7IFJBRlRpY2tlciB9IGZyb20gXCJAbWFzYXRvbWFraW5vL3JhZi10aWNrZXJcIjtcbmltcG9ydCB7IEZvZywgU3BoZXJpY2FsIH0gZnJvbSBcInRocmVlXCI7XG5pbXBvcnQgeyBBdXRvU3BoZXJpY2FsUm90b3IgfSBmcm9tIFwiLi4vZXNtL2luZGV4LmpzXCI7XG5pbXBvcnQgeyBEcmFnV2F0Y2hlciwgU2xlZXBXYXRjaGVyIH0gZnJvbSBcIkBtYXNhdG9tYWtpbm8vdGhyZWVqcy1kcmFnLXdhdGNoZXJcIjtcbmltcG9ydCB7XG4gIFNwaGVyaWNhbENvbnRyb2xsZXIsXG4gIFNwaGVyaWNhbENvbnRyb2xsZXJVdGlsLFxufSBmcm9tIFwiQG1hc2F0b21ha2luby90aHJlZWpzLXNwaGVyaWNhbC1jb250cm9sc1wiO1xuXG5sZXQgc2NlbmU7XG5leHBvcnQgY2xhc3MgRGVtbyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGNvbnN0IFcgPSA2NDA7XG4gICAgY29uc3QgSCA9IDQ4MDtcblxuICAgIHNjZW5lID0gQ29tbW9uLmluaXRTY2VuZSgpO1xuICAgIHNjZW5lLmZvZyA9IG5ldyBGb2coMHgwMDAwMDAsIDgwLCAxNjApO1xuICAgIENvbW1vbi5pbml0TGlnaHQoc2NlbmUpO1xuICAgIGNvbnN0IGNhbWVyYSA9IENvbW1vbi5pbml0Q2FtZXJhKHNjZW5lLCBXLCBIKTtcbiAgICBjb25zdCByZW5kZXJlciA9IENvbW1vbi5pbml0UmVuZGVyZXIoVywgSCwgeyBhbnRpYWxpYXM6IGZhbHNlIH0pO1xuXG4gICAgQ29tbW9uLmluaXRIZWxwZXIoc2NlbmUpO1xuXG4gICAgY29uc3QgdGFyZ2V0ID0gU3BoZXJpY2FsQ29udHJvbGxlclV0aWwuZ2VuZXJhdGVDYW1lcmFUYXJnZXQoKTtcbiAgICBzY2VuZS5hZGQodGFyZ2V0KTtcbiAgICBjb25zdCBjb250cm9sID0gbmV3IFNwaGVyaWNhbENvbnRyb2xsZXIoY2FtZXJhLCB0YXJnZXQpO1xuXG4gICAgY29udHJvbC5pbml0Q2FtZXJhUG9zaXRpb24obmV3IFNwaGVyaWNhbCgxMDAsIE1hdGguUEkgLyAyLCAwKSk7XG4gICAgY29uc3QgZHJhZ1dhdGNoZXIgPSBuZXcgRHJhZ1dhdGNoZXIocmVuZGVyZXIuZG9tRWxlbWVudCk7XG4gICAgY29uc3Qgc2xlZXBXYXRjaGVyID0gbmV3IFNsZWVwV2F0Y2hlcihkcmFnV2F0Y2hlciwgeyB0aW1lT3V0X21zOiAxMDAwIH0pO1xuXG4gICAgY29uc3Qgcm90b3IgPSBuZXcgQXV0b1NwaGVyaWNhbFJvdG9yKHNsZWVwV2F0Y2hlciwgY29udHJvbCk7XG4gICAgcm90b3Iud2F0Y2goe1xuICAgICAgbG9vcFBoaToge1xuICAgICAgICBtaW46IDAsXG4gICAgICAgIG1heDogTWF0aC5QSSxcbiAgICAgIH0sXG4gICAgICBsb29wVGhldGE6IHtcbiAgICAgICAgbWluOiAwLFxuICAgICAgICBtYXg6IE1hdGguUEkgLyAyLFxuICAgICAgfSxcbiAgICAgIGxvb3BSOiB7XG4gICAgICAgIG1pbjogMTAwIC8gMyxcbiAgICAgICAgbWF4OiAxMDAsXG4gICAgICB9LFxuICAgICAgZGVmYXVsdFI6IDEwMCxcbiAgICB9KTtcblxuICAgIFJBRlRpY2tlci5vbihcInRpY2tcIiwgKCkgPT4ge1xuICAgICAgcmVuZGVyZXIucmVuZGVyKHNjZW5lLCBjYW1lcmEpO1xuICAgIH0pO1xuICB9XG59XG5cbndpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XG4gIG5ldyBEZW1vKCk7XG59O1xuIl0sIm5hbWVzIjpbIkFtYmllbnRMaWdodCIsIkF4ZXNIZWxwZXIiLCJDb2xvciIsIkNvbmVHZW9tZXRyeSIsIk1lc2hCYXNpY01hdGVyaWFsIiwiUGVyc3BlY3RpdmVDYW1lcmEiLCJTY2VuZSIsIldlYkdMUmVuZGVyZXIiLCJNZXNoIiwiUkVWSVNJT04iLCJPcmJpdENvbnRyb2xzIiwiQ29tbW9uIiwiaW5pdFNjZW5lIiwiaW5pdExpZ2h0Iiwic2NlbmUiLCJhbWJpZW50TGlnaHQiLCJhZGQiLCJpbml0Q2FtZXJhIiwiVyIsIkgiLCJuZWFyIiwiZmFyIiwiY2FtZXJhIiwicG9zaXRpb24iLCJzZXQiLCJ1cGRhdGVNYXRyaXhXb3JsZCIsImluaXRDb250cm9sIiwicmVuZGVyIiwiZG9tRWxlbWVudCIsImNvbnRyb2wiLCJ1cGRhdGUiLCJpbml0UmVuZGVyZXIiLCJvcHRpb24iLCJPYmplY3QiLCJhc3NpZ24iLCJjb2xvciIsImFudGlhbGlhcyIsInJlbmRlcmVyIiwiZG9jdW1lbnQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJzZXRDbGVhckNvbG9yIiwic2V0U2l6ZSIsInNldFBpeGVsUmF0aW8iLCJ3aW5kb3ciLCJkZXZpY2VQaXhlbFJhdGlvIiwiY29uc29sZSIsImxvZyIsImluaXRIZWxwZXIiLCJheGVzSGVscGVyIiwiY29uZSIsIndpcmVmcmFtZSIsIlJBRlRpY2tlciIsIlNwaGVyaWNhbFJvdG9yQ29uZmlnVXRpbCIsIlNwaGVyaWNhbFJvdG9yIiwiY29uc3RydWN0b3IiLCJjYW1lcmFDb250cm9sbGVyIiwiaXNSb3RhdGlvbiIsInJvdGF0ZVRoZXRhIiwiZSIsIl9jb25maWciLCJzcGVlZCIsImFkZFBvc2l0aW9uIiwiZGVsdGEiLCJjb25maWciLCJwYXJhbWV0ZXJzIiwiaW5pdCIsInJvdGF0ZSIsInN0b3AiLCJvbiIsInN0YXJ0U3BoZXJpY2FsQ2FtZXJhTG9vcCIsInR5cGUiLCJsb29wIiwiZXh0cmFjdFNwaGVyaWNhbFBhcmFtIiwibWluIiwibWF4IiwiZHVyYXRpb24iLCJzdGFydFRpbWUiLCJvZmYiLCJ0d2VlbnMiLCJnZXREZWZhdWx0U3RvcFBhcmFtIiwicmV0dXJuVG9EZWZhdWx0UiIsImRlZmF1bHRSIiwicmV0dXJuUiIsIm1vdmVQb3NpdGlvbiIsIkF1dG9TcGhlcmljYWxSb3RvciIsInNsZWVwV2F0Y2hlciIsImlzU3RhcnQiLCJvblNsZWVwIiwibG9vcE9wdGlvbiIsIm9uV2FrZXVwIiwicGF1c2UiLCJzdG9wV2F0Y2hlciIsInJlc3VtZSIsInN0YXJ0V2F0Y2hlciIsIndhdGNoIiwic3RhcnQiLCJERUZBVUxUX0xPT1BfTEFUX0RVUkFUSU9OIiwiREVGQVVMVF9MT09QX1JfRFVSQVRJT04iLCJsb29wUGhpIiwibG9vcFRoZXRhIiwibG9vcFIiLCJnZXRMb29wUGFyYW1ldGVyIiwidW5kZWZpbmVkIiwicGFyYW0iLCJGb2ciLCJTcGhlcmljYWwiLCJEcmFnV2F0Y2hlciIsIlNsZWVwV2F0Y2hlciIsIlNwaGVyaWNhbENvbnRyb2xsZXIiLCJTcGhlcmljYWxDb250cm9sbGVyVXRpbCIsIkRlbW8iLCJmb2ciLCJ0YXJnZXQiLCJnZW5lcmF0ZUNhbWVyYVRhcmdldCIsImluaXRDYW1lcmFQb3NpdGlvbiIsIk1hdGgiLCJQSSIsImRyYWdXYXRjaGVyIiwidGltZU91dF9tcyIsInJvdG9yIiwib25sb2FkIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///716\n')}},__webpack_module_cache__={},deferred;function __webpack_require__(Q){var U=__webpack_module_cache__[Q];if(void 0!==U)return U.exports;var F=__webpack_module_cache__[Q]={exports:{}};return __webpack_modules__[Q](F,F.exports,__webpack_require__),F.exports}__webpack_require__.m=__webpack_modules__,deferred=[],__webpack_require__.O=(Q,U,F,B)=>{if(!U){var I=1/0;for(e=0;e<deferred.length;e++){for(var[U,F,B]=deferred[e],g=!0,C=0;C<U.length;C++)(!1&B||I>=B)&&Object.keys(__webpack_require__.O).every((Q=>__webpack_require__.O[Q](U[C])))?U.splice(C--,1):(g=!1,B<I&&(I=B));if(g){deferred.splice(e--,1);var s=F();void 0!==s&&(Q=s)}}return Q}B=B||0;for(var e=deferred.length;e>0&&deferred[e-1][2]>B;e--)deferred[e]=deferred[e-1];deferred[e]=[U,F,B]},__webpack_require__.d=(Q,U)=>{for(var F in U)__webpack_require__.o(U,F)&&!__webpack_require__.o(Q,F)&&Object.defineProperty(Q,F,{enumerable:!0,get:U[F]})},__webpack_require__.o=(Q,U)=>Object.prototype.hasOwnProperty.call(Q,U),(()=>{var Q={594:0};__webpack_require__.O.j=U=>0===Q[U];var U=(U,F)=>{var B,I,[g,C,s]=F,e=0;if(g.some((U=>0!==Q[U]))){for(B in C)__webpack_require__.o(C,B)&&(__webpack_require__.m[B]=C[B]);if(s)var i=s(__webpack_require__)}for(U&&U(F);e<g.length;e++)I=g[e],__webpack_require__.o(Q,I)&&Q[I]&&Q[I][0](),Q[I]=0;return __webpack_require__.O(i)},F=self.webpackChunk_masatomakino_threejs_spherical_rotor=self.webpackChunk_masatomakino_threejs_spherical_rotor||[];F.forEach(U.bind(null,0)),F.push=U.bind(null,F.push.bind(F))})();var __webpack_exports__=__webpack_require__.O(void 0,[121],(()=>__webpack_require__(716)));__webpack_exports__=__webpack_require__.O(__webpack_exports__)})();