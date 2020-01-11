"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var threejs_spherical_controls_1 = require("threejs-spherical-controls");
var threejs_drag_watcher_1 = require("threejs-drag-watcher");
var SphericalRotor = /** @class */ (function () {
    function SphericalRotor(cameraController) {
        var _this = this;
        this.isRotation = false;
        this.startRotation = function () {
            _this.stopRotation();
            if (_this.isRotation)
                return;
            //横回転
            if (_this._config.speed != null) {
                _this.rotateTimerID = setInterval(_this.rotateTheta, SphericalRotor.ROTATE_INTERVAL);
            }
            //縦往復ループ
            if (_this._config.maxPhi != null && _this._config.minPhi != null) {
                _this.cameraController.loop(threejs_spherical_controls_1.SphericalParamType.PHI, _this._config.minPhi, _this._config.maxPhi, {
                    duration: _this._config.loopPhiDuration
                });
            }
            //横往復ループ
            if (_this._config.maxTheta != null && _this._config.minTheta != null) {
                _this.cameraController.loop(threejs_spherical_controls_1.SphericalParamType.THETA, _this._config.minTheta, _this._config.maxTheta, {
                    duration: _this._config.loopThetaDuration
                });
            }
            //ズームインアウトループ
            if (_this._config.maxR != null && _this._config.minR != null) {
                _this.cameraController.loop(threejs_spherical_controls_1.SphericalParamType.R, _this._config.minR, _this._config.maxR, {
                    duration: _this._config.loopRDuration
                });
            }
            _this.isRotation = true;
        };
        /**
         * カメラを横回転させる
         * 往復ではなく無限運動。
         */
        this.rotateTheta = function () {
            if (_this._config.speed == null)
                return;
            _this.cameraController.addPosition(threejs_spherical_controls_1.SphericalParamType.THETA, _this._config.speed);
        };
        /**
         * カメラの自動回転を停止する
         */
        this.stopRotation = function () {
            _this.stop();
        };
        this.cameraController = cameraController;
    }
    Object.defineProperty(SphericalRotor.prototype, "config", {
        set: function (parameters) {
            if (parameters === null) {
                parameters = {};
            }
            if (parameters.loopPhiDuration == null) {
                parameters.loopPhiDuration = AutoSphericalRotor.DEFAULT_LOOP_LAT_DURATION;
            }
            if (parameters.loopThetaDuration == null) {
                parameters.loopThetaDuration =
                    AutoSphericalRotor.DEFAULT_LOOP_LAT_DURATION;
            }
            if (parameters.loopRDuration == null) {
                parameters.loopRDuration = AutoSphericalRotor.DEFAULT_LOOP_R_DURATION;
            }
            this._config = parameters;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * カメラの回転を一時停止する。
     * @param [option]　option.returnR = falseの時、アニメーションを行わない。
     */
    SphericalRotor.prototype.stop = function (option) {
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
                duration: 333
            });
        }
    };
    SphericalRotor.getDefaultStopParam = function (option) {
        if (option == null)
            option = {};
        if (option.returnR == null)
            option.returnR = true;
        return option;
    };
    SphericalRotor.ROTATE_INTERVAL = 38;
    return SphericalRotor;
}());
exports.SphericalRotor = SphericalRotor;
/**
 * マウス操作を監視し、回転を制御するクラス。
 * マウスが無操作の場合、回転を始め、操作が再開されると停止する。
 */
var AutoSphericalRotor = /** @class */ (function (_super) {
    __extends(AutoSphericalRotor, _super);
    function AutoSphericalRotor(sleepWatcher, cameraController) {
        var _this = _super.call(this, cameraController) || this;
        _this.isStart = false;
        _this.sleepWatcher = sleepWatcher;
        return _this;
    }
    /**
     * マウスの監視を一時停止する
     * @param [option]　option.returnR =　falseの時のみ、アニメーションを行わず原位置でマウス監視が停止する。監視を停止させた後に別のアニメーションでカメラを移動したかったり、元に戻したかったりする場合に使う。
     */
    AutoSphericalRotor.prototype.pause = function (option) {
        if (!this.isStart)
            return;
        this.isStart = false;
        option = SphericalRotor.getDefaultStopParam(option);
        this.stopWatcher();
        this.stop(option);
    };
    AutoSphericalRotor.prototype.stopWatcher = function () {
        this.sleepWatcher.removeEventListener(threejs_drag_watcher_1.SleepEventType.SLEEP, this.startRotation);
        this.sleepWatcher.removeEventListener(threejs_drag_watcher_1.SleepEventType.WAKEUP, this.stopRotation);
        this.sleepWatcher.stop();
    };
    /**
     * マウスの監視を再開する。
     * 各種設定はstart()で指定されたオプションを引き継ぐ。
     * pause()関数で停止された監視を再開させるための関数。
     */
    AutoSphericalRotor.prototype.resume = function () {
        if (this.isStart)
            return;
        this.isStart = true;
        this.startWatcher();
    };
    /**
     * マウスの監視を開始する。
     */
    AutoSphericalRotor.prototype.start = function (parameters) {
        this.config = parameters;
        this.isStart = true;
        this.startWatcher();
    };
    AutoSphericalRotor.prototype.startWatcher = function () {
        this.stopWatcher();
        this.sleepWatcher.addEventListener(threejs_drag_watcher_1.SleepEventType.SLEEP, this.startRotation);
        this.sleepWatcher.addEventListener(threejs_drag_watcher_1.SleepEventType.WAKEUP, this.stopRotation);
        this.sleepWatcher.start();
    };
    AutoSphericalRotor.DEFAULT_LOOP_LAT_DURATION = 30 * 1000;
    AutoSphericalRotor.DEFAULT_LOOP_R_DURATION = 30 * 1000;
    return AutoSphericalRotor;
}(SphericalRotor));
exports.AutoSphericalRotor = AutoSphericalRotor;
