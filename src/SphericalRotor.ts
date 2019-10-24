import {
  SphericalController,
  SphericalParamType
} from "threejs-spherical-controls";
import { SleepEventType, SleepWatcher } from "threejs-drag-watcher";

export class SphericalRotor {
  private cameraController: SphericalController;
  protected _config: SphericalRotorConfig;

  private isRotation: boolean = false;
  private rotateTimerID;

  private static readonly ROTATE_INTERVAL: number = 38;

  constructor(cameraController: SphericalController) {
    this.cameraController = cameraController;
  }

  set config(parameters: SphericalRotorConfig) {
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

  public startRotation = () => {
    this.stopRotation();

    if (this.isRotation) return;

    //横回転
    if (this._config.speed != null) {
      this.rotateTimerID = setInterval(
        this.rotateTheta,
        SphericalRotor.ROTATE_INTERVAL
      );
    }
    //縦往復ループ
    if (this._config.maxPhi != null && this._config.minPhi != null) {
      this.cameraController.loop(
        SphericalParamType.PHI,
        this._config.minPhi,
        this._config.maxPhi,
        {
          duration: this._config.loopPhiDuration
        }
      );
    }
    //横往復ループ
    if (this._config.maxTheta != null && this._config.minTheta != null) {
      this.cameraController.loop(
        SphericalParamType.THETA,
        this._config.minTheta,
        this._config.maxTheta,
        {
          duration: this._config.loopThetaDuration
        }
      );
    }
    //ズームインアウトループ
    if (this._config.maxR != null && this._config.minR != null) {
      this.cameraController.loop(
        SphericalParamType.R,
        this._config.minR,
        this._config.maxR,
        {
          duration: this._config.loopRDuration
        }
      );
    }

    this.isRotation = true;
  };

  /**
   * カメラを横回転させる
   * 往復ではなく無限運動。
   */
  protected rotateTheta = () => {
    if (this._config.speed == null) return;
    this.cameraController.addPosition(
      SphericalParamType.THETA,
      this._config.speed
    );
  };

  /**
   * カメラの自動回転を停止する
   */
  public stopRotation = () => {
    if (!this.isRotation) return;

    if (this.rotateTimerID) {
      clearInterval(this.rotateTimerID);
      this.rotateTimerID = null;
    }
    this.cameraController.tweens.stop();
    if (this._config && this._config.defaultR != null) {
      this.cameraController.movePosition(
        SphericalParamType.R,
        this._config.defaultR,
        {
          duration: 333
        }
      );
    }

    this.isRotation = false;
  };
}

/**
 * マウス操作を監視し、回転を制御するクラス。
 * マウスが無操作の場合、回転を始め、操作が再開されると停止する。
 */
export class AutoSphericalRotor extends SphericalRotor {
  private sleepWatcher: SleepWatcher;
  public static readonly DEFAULT_LOOP_LAT_DURATION: number = 30 * 1000;
  public static readonly DEFAULT_LOOP_R_DURATION: number = 30 * 1000;

  constructor(
    sleepWatcher: SleepWatcher,
    cameraController: SphericalController
  ) {
    super(cameraController);
    this.sleepWatcher = sleepWatcher;
  }

  /**
   * マウスの監視を停止する
   */
  public stop(): void {
    this.sleepWatcher.removeEventListener(
      SleepEventType.SLEEP,
      this.startRotation
    );
    this.sleepWatcher.removeEventListener(
      SleepEventType.WAKEUP,
      this.stopRotation
    );
    this.sleepWatcher.stop();
    this.stopRotation();
  }

  /**
   * マウスの監視を開始する
   */
  public start(parameters?: SphericalRotorConfig): void {
    this.config = parameters;

    this.sleepWatcher.addEventListener(
      SleepEventType.SLEEP,
      this.startRotation
    );
    this.sleepWatcher.addEventListener(
      SleepEventType.WAKEUP,
      this.stopRotation
    );
    this.sleepWatcher.start();
  }
}

/**
 * 回転の動作を指定する。
 */
export interface SphericalRotorConfig {
  speed?: number; //横回転スピード 制限なしの回転の場合に指定　単位ラジアン / フレーム
  maxPhi?: number; //縦回転範囲　単位ラジアン　未指定の場合縦回転は行わない
  minPhi?: number; //縦回転範囲　単位ラジアン　未指定の場合縦回転は行わない
  loopPhiDuration?: number; //縦回転の速度 maxからminまでの経過時間　単位ms
  maxTheta?: number; //横回転範囲　単位ラジアン　未指定の場合横回転は行わない
  minTheta?: number; //横回転範囲　単位ラジアン　未指定の場合横回転は行わない
  loopThetaDuration?: number; //横回転の速度 maxからminまでの経過時間　単位ms
  maxR?: number; //ズーム範囲　単位はワールド座標の距離
  minR?: number; //ズーム範囲　単位はワールド座標の距離
  defaultR?: number; //ズーム範囲　ズームループ解除時にこの距離に戻る
  loopRDuration?: number; //ズームの速度 maxからminまでの経過時間　単位ms
}
