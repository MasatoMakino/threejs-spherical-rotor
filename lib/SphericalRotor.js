"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoSphericalRotor = exports.SphericalRotor = void 0;
const threejs_spherical_controls_1 = require("threejs-spherical-controls");
const threejs_drag_watcher_1 = require("threejs-drag-watcher");
class SphericalRotor {
    constructor(cameraController) {
        this.isRotation = false;
        this.startRotation = () => {
            this.stopRotation();
            if (this.isRotation)
                return;
            //横回転
            if (this._config.speed != null) {
                this.rotateTimerID = setInterval(this.rotateTheta, SphericalRotor.ROTATE_INTERVAL);
            }
            //縦往復ループ
            if (this._config.maxPhi != null && this._config.minPhi != null) {
                this.cameraController.loop(threejs_spherical_controls_1.SphericalParamType.PHI, this._config.minPhi, this._config.maxPhi, {
                    duration: this._config.loopPhiDuration,
                });
            }
            //横往復ループ
            if (this._config.maxTheta != null && this._config.minTheta != null) {
                this.cameraController.loop(threejs_spherical_controls_1.SphericalParamType.THETA, this._config.minTheta, this._config.maxTheta, {
                    duration: this._config.loopThetaDuration,
                });
            }
            //ズームインアウトループ
            if (this._config.maxR != null && this._config.minR != null) {
                this.cameraController.loop(threejs_spherical_controls_1.SphericalParamType.R, this._config.minR, this._config.maxR, {
                    duration: this._config.loopRDuration,
                });
            }
            this.isRotation = true;
        };
        /**
         * カメラを横回転させる
         * 往復ではなく無限運動。
         */
        this.rotateTheta = () => {
            if (this._config.speed == null)
                return;
            this.cameraController.addPosition(threejs_spherical_controls_1.SphericalParamType.THETA, this._config.speed);
        };
        /**
         * カメラの自動回転を停止する
         */
        this.stopRotation = () => {
            this.stop();
        };
        this.cameraController = cameraController;
    }
    set config(parameters) {
        var _a, _b, _c;
        parameters !== null && parameters !== void 0 ? parameters : (parameters = {});
        (_a = parameters.loopPhiDuration) !== null && _a !== void 0 ? _a : (parameters.loopPhiDuration = AutoSphericalRotor.DEFAULT_LOOP_LAT_DURATION);
        (_b = parameters.loopThetaDuration) !== null && _b !== void 0 ? _b : (parameters.loopThetaDuration = AutoSphericalRotor.DEFAULT_LOOP_LAT_DURATION);
        (_c = parameters.loopRDuration) !== null && _c !== void 0 ? _c : (parameters.loopRDuration = AutoSphericalRotor.DEFAULT_LOOP_R_DURATION);
        this._config = parameters;
    }
    /**
     * カメラの回転を一時停止する。
     * @param [option] option.returnR = falseの時、アニメーションを行わない。
     */
    stop(option) {
        if (!this.isRotation)
            return;
        this.isRotation = false;
        if (this.rotateTimerID) {
            clearInterval(this.rotateTimerID);
            this.rotateTimerID = null;
        }
        this.cameraController.tweens.stop();
        option = SphericalRotor.getDefaultStopParam(option);
        if (this._config &&
            this._config.defaultR != null &&
            option &&
            option.returnR === true) {
            this.cameraController.movePosition(threejs_spherical_controls_1.SphericalParamType.R, this._config.defaultR, {
                duration: 333,
            });
        }
    }
    static getDefaultStopParam(option) {
        if (option == null)
            option = {};
        if (option.returnR == null)
            option.returnR = true;
        return option;
    }
}
exports.SphericalRotor = SphericalRotor;
SphericalRotor.ROTATE_INTERVAL = 38;
/**
 * マウス操作を監視し、回転を制御するクラス。
 * マウスが無操作の場合、回転を始め、操作が再開されると停止する。
 */
class AutoSphericalRotor extends SphericalRotor {
    constructor(sleepWatcher, cameraController) {
        super(cameraController);
        this.isStart = false;
        this.sleepWatcher = sleepWatcher;
    }
    /**
     * マウスの監視を一時停止する
     * @param [option]　option.returnR =　falseの時のみ、アニメーションを行わず原位置でマウス監視が停止する。監視を停止させた後に別のアニメーションでカメラを移動したかったり、元に戻したかったりする場合に使う。
     */
    pause(option) {
        if (!this.isStart)
            return;
        this.isStart = false;
        option = SphericalRotor.getDefaultStopParam(option);
        this.stopWatcher();
        this.stop(option);
    }
    stopWatcher() {
        this.sleepWatcher.removeEventListener(threejs_drag_watcher_1.SleepEventType.SLEEP, this.startRotation);
        this.sleepWatcher.removeEventListener(threejs_drag_watcher_1.SleepEventType.WAKEUP, this.stopRotation);
        this.sleepWatcher.stop();
    }
    /**
     * マウスの監視を再開する。
     * 各種設定はstart()で指定されたオプションを引き継ぐ。
     * pause()関数で停止された監視を再開させるための関数。
     */
    resume() {
        if (this.isStart)
            return;
        this.isStart = true;
        this.startWatcher();
    }
    /**
     * マウスの監視を開始する。
     */
    start(parameters) {
        this.config = parameters;
        this.isStart = true;
        this.startWatcher();
    }
    startWatcher() {
        this.stopWatcher();
        this.sleepWatcher.addEventListener(threejs_drag_watcher_1.SleepEventType.SLEEP, this.startRotation);
        this.sleepWatcher.addEventListener(threejs_drag_watcher_1.SleepEventType.WAKEUP, this.stopRotation);
        this.sleepWatcher.start();
    }
}
exports.AutoSphericalRotor = AutoSphericalRotor;
AutoSphericalRotor.DEFAULT_LOOP_LAT_DURATION = 30 * 1000;
AutoSphericalRotor.DEFAULT_LOOP_R_DURATION = 30 * 1000;
