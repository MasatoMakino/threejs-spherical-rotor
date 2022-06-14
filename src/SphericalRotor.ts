import {
  SphericalController,
  SphericalParamType,
} from "@masatomakino/threejs-spherical-controls";
import {
  RotorStopConfig,
  SphericalRotorConfig,
  SphericalRotorConfigUtil,
} from "./";
import { RAFTicker } from "@masatomakino/raf-ticker";
import { RAFTickerEvent, RAFTickerEventType } from "@masatomakino/raf-ticker";

export class SphericalRotor {
  private cameraController: SphericalController;
  protected _config: SphericalRotorConfig;
  private isRotation: boolean = false;

  constructor(cameraController: SphericalController) {
    this.cameraController = cameraController;
  }

  set config(parameters: SphericalRotorConfig) {
    this._config = SphericalRotorConfigUtil.init(parameters);
  }

  public rotate(): void {
    this.stop();
    if (this.isRotation) return;

    //横回転
    if (this._config.speed != null) {
      RAFTicker.on(RAFTickerEventType.tick, this.rotateTheta);
    }
    //縦往復ループ
    if (this._config.maxPhi != null && this._config.minPhi != null) {
      this.cameraController.loop(
        SphericalParamType.PHI,
        this._config.minPhi,
        this._config.maxPhi,
        {
          duration: this._config.loopPhiDuration,
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
          duration: this._config.loopThetaDuration,
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
          duration: this._config.loopRDuration,
        }
      );
    }

    this.isRotation = true;
  }

  /**
   * @deprecated use rotate();
   */
  public startRotation = () => {
    this.rotate();
  };

  /**
   * カメラを横回転させる
   * 往復ではなく無限運動。
   */
  protected rotateTheta = (e: RAFTickerEvent) => {
    if (this._config.speed == null) return;
    this.cameraController.addPosition(
      SphericalParamType.THETA,
      this._config.speed * (e.delta / (1000 / 30)),
      false,
      true
    );
  };

  /**
   * カメラの自動回転を停止する
   * @deprecated use stop()
   */
  public stopRotation = () => {
    this.stop();
  };

  /**
   * カメラの回転を一時停止する。
   * @param [option] option.returnR = falseの時、アニメーションを行わない。
   */
  public stop(option?: RotorStopConfig): void {
    if (!this.isRotation) return;
    this.isRotation = false;
    RAFTicker.off(RAFTickerEventType.tick, this.rotateTheta);
    this.cameraController.tweens.stop();

    option = SphericalRotor.getDefaultStopParam(option);

    this.returnToDefaultR(option);
  }

  /**
   * カメラをデフォルト位置まで戻す
   * @param option
   * @protected
   */
  protected returnToDefaultR(option?: RotorStopConfig): void {
    if (this._config?.defaultR != null && option?.returnR === true) {
      this.cameraController.movePosition(
        SphericalParamType.R,
        this._config.defaultR,
        {
          duration: 333,
        }
      );
    }
  }

  public static getDefaultStopParam(option: RotorStopConfig): RotorStopConfig {
    option ??= {};
    option.returnR ??= true;
    return option;
  }
}
