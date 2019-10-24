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
            if (!this.isRotation)
                return;
            if (this.rotateTimerID) {
                clearInterval(this.rotateTimerID);
                this.rotateTimerID = null;
            }
            this.cameraController.tweens.stop();
            if (this._config && this._config.defaultR != null) {
                this.cameraController.movePosition(SphericalParamType.R, this._config.defaultR, {
                    duration: 333
                });
            }
            this.isRotation = false;
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
}
SphericalRotor.ROTATE_INTERVAL = 38;
/**
 * マウス操作を監視し、回転を制御するクラス。
 * マウスが無操作の場合、回転を始め、操作が再開されると停止する。
 */
export class AutoSphericalRotor extends SphericalRotor {
    constructor(sleepWatcher, cameraController) {
        super(cameraController);
        this.sleepWatcher = sleepWatcher;
    }
    /**
     * マウスの監視を停止する
     */
    stop() {
        this.sleepWatcher.removeEventListener(SleepEventType.SLEEP, this.startRotation);
        this.sleepWatcher.removeEventListener(SleepEventType.WAKEUP, this.stopRotation);
        this.sleepWatcher.stop();
        this.stopRotation();
    }
    /**
     * マウスの監視を開始する
     */
    start(parameters) {
        this.config = parameters;
        this.sleepWatcher.addEventListener(SleepEventType.SLEEP, this.startRotation);
        this.sleepWatcher.addEventListener(SleepEventType.WAKEUP, this.stopRotation);
        this.sleepWatcher.start();
    }
}
AutoSphericalRotor.DEFAULT_LOOP_LAT_DURATION = 30 * 1000;
AutoSphericalRotor.DEFAULT_LOOP_R_DURATION = 30 * 1000;
