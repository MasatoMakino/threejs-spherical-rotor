import { SphericalController } from "threejs-spherical-controls";
import { SleepWatcher } from "threejs-drag-watcher";
export declare class SphericalRotor {
    private cameraController;
    protected _config: SphericalRotorConfig;
    private isRotation;
    private rotateTimerID;
    private static readonly ROTATE_INTERVAL;
    constructor(cameraController: SphericalController);
    set config(parameters: SphericalRotorConfig);
    startRotation: () => void;
    /**
     * カメラを横回転させる
     * 往復ではなく無限運動。
     */
    protected rotateTheta: () => void;
    /**
     * カメラの自動回転を停止する
     */
    stopRotation: () => void;
    /**
     * カメラの回転を一時停止する。
     * @param [option] option.returnR = falseの時、アニメーションを行わない。
     */
    stop(option?: RotorStopConfig): void;
    static getDefaultStopParam(option: RotorStopConfig): RotorStopConfig;
}
/**
 * マウス操作を監視し、回転を制御するクラス。
 * マウスが無操作の場合、回転を始め、操作が再開されると停止する。
 */
export declare class AutoSphericalRotor extends SphericalRotor {
    private sleepWatcher;
    private isStart;
    static readonly DEFAULT_LOOP_LAT_DURATION: number;
    static readonly DEFAULT_LOOP_R_DURATION: number;
    constructor(sleepWatcher: SleepWatcher, cameraController: SphericalController);
    /**
     * マウスの監視を一時停止する
     * @param [option]　option.returnR =　falseの時のみ、アニメーションを行わず原位置でマウス監視が停止する。監視を停止させた後に別のアニメーションでカメラを移動したかったり、元に戻したかったりする場合に使う。
     */
    pause(option?: RotorStopConfig): void;
    private stopWatcher;
    /**
     * マウスの監視を再開する。
     * 各種設定はstart()で指定されたオプションを引き継ぐ。
     * pause()関数で停止された監視を再開させるための関数。
     */
    resume(): void;
    /**
     * マウスの監視を開始する。
     */
    start(parameters?: SphericalRotorConfig): void;
    private startWatcher;
}
/**
 * 回転の動作を指定する。
 */
export interface SphericalRotorConfig {
    speed?: number;
    maxPhi?: number;
    minPhi?: number;
    loopPhiDuration?: number;
    maxTheta?: number;
    minTheta?: number;
    loopThetaDuration?: number;
    maxR?: number;
    minR?: number;
    defaultR?: number;
    loopRDuration?: number;
}
export interface RotorStopConfig {
    returnR?: boolean;
}
//# sourceMappingURL=SphericalRotor.d.ts.map