import { SphericalParamType } from "threejs-spherical-controls";
import { SleepEventType } from "threejs-drag-watcher";
export class SphericalRotor {
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
                this.cameraController.loop(SphericalParamType.PHI, this._config.minPhi, this._config.maxPhi, {
                    duration: this._config.loopPhiDuration
                });
            }
            //横往復ループ
            if (this._config.maxTheta != null && this._config.minTheta != null) {
                this.cameraController.loop(SphericalParamType.THETA, this._config.minTheta, this._config.maxTheta, {
                    duration: this._config.loopThetaDuration
                });
            }
            //ズームインアウトループ
            if (this._config.maxR != null && this._config.minR != null) {
                this.cameraController.loop(SphericalParamType.R, this._config.minR, this._config.maxR, {
                    duration: this._config.loopRDuration
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
            this.cameraController.addPosition(SphericalParamType.THETA, this._config.speed);
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
    }
    /**
     * カメラの回転を一時停止する。
     * @param [option]　option.returnR = falseの時、アニメーションを行わない。
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
            this.cameraController.movePosition(SphericalParamType.R, this._config.defaultR, {
                duration: 333
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
SphericalRotor.ROTATE_INTERVAL = 38;
/**
 * マウス操作を監視し、回転を制御するクラス。
 * マウスが無操作の場合、回転を始め、操作が再開されると停止する。
 */
export class AutoSphericalRotor extends SphericalRotor {
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
        this.sleepWatcher.removeEventListener(SleepEventType.SLEEP, this.startRotation);
        this.sleepWatcher.removeEventListener(SleepEventType.WAKEUP, this.stopRotation);
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
        this.sleepWatcher.addEventListener(SleepEventType.SLEEP, this.startRotation);
        this.sleepWatcher.addEventListener(SleepEventType.WAKEUP, this.stopRotation);
        this.sleepWatcher.start();
    }
}
AutoSphericalRotor.DEFAULT_LOOP_LAT_DURATION = 30 * 1000;
AutoSphericalRotor.DEFAULT_LOOP_R_DURATION = 30 * 1000;
