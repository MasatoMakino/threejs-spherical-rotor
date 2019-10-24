import { SphericalController } from "threejs-spherical-controls";
import { SleepWatcher } from "threejs-drag-watcher";
export declare class SphericalRotor {
    private cameraController;
    protected _config: SphericalRotorConfig;
    private isRotation;
    private rotateTimerID;
    private static readonly ROTATE_INTERVAL;
    constructor(cameraController: SphericalController);
    config: SphericalRotorConfig;
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
}
/**
 * マウス操作を監視し、回転を制御するクラス。
 * マウスが無操作の場合、回転を始め、操作が再開されると停止する。
 */
export declare class AutoSphericalRotor extends SphericalRotor {
    private sleepWatcher;
    static readonly DEFAULT_LOOP_LAT_DURATION: number;
    static readonly DEFAULT_LOOP_R_DURATION: number;
    constructor(sleepWatcher: SleepWatcher, cameraController: SphericalController);
    /**
     * マウスの監視を停止する
     */
    stop(): void;
    /**
     * マウスの監視を開始する
     */
    start(parameters?: SphericalRotorConfig): void;
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
//# sourceMappingURL=SphericalRotor.d.ts.map