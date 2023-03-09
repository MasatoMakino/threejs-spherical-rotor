import {
  SphericalController,
  SphericalParamType,
} from "@masatomakino/threejs-spherical-controls";
import {
  RotorStopConfig,
  SphericalRotorConfig,
  SphericalRotorConfigUtil,
} from "./";
import { RAFTicker, RAFTickerEventContext } from "@masatomakino/raf-ticker";

export interface LoopOption {
  startTime?: number;
}
export class SphericalRotor {
  protected _config: SphericalRotorConfig;
  private isRotation: boolean = false;

  constructor(private cameraController: SphericalController) {}

  set config(parameters: SphericalRotorConfig) {
    this._config = SphericalRotorConfigUtil.init(parameters);
  }

  /**
   * 回転アニメーションを開始する。
   *
   * rotateとstopは対の関係ではない。異なるoptionを指定された場合、rotateは現状のアニメーションを上書きして再実行される。
   * @param option
   */
  public rotate(option?: LoopOption): void {
    if (this.isRotation) {
      this.stop();
    }

    //横回転
    if (this._config.speed != null) {
      RAFTicker.on("tick", this.rotateTheta);
    }

    //縦往復ループ
    this.startSphericalCameraLoop("phi", option);
    //横往復ループ
    this.startSphericalCameraLoop("theta", option);
    //ズームインアウトループ
    this.startSphericalCameraLoop("radius", option);

    this.isRotation = true;
  }

  /**
   * configオブジェクトから、縦、横、ズームループの状態を取り出す。
   * 設定されている場合、ループを開始する。
   *
   * @param type 縦、横、ズームのいずれか
   * @param option
   * @private
   */
  private startSphericalCameraLoop(
    type: SphericalParamType,
    option?: LoopOption
  ): void {
    const loop = SphericalRotorConfigUtil.extractSphericalParam(
      this._config,
      type
    );
    if (loop == null) return;

    this.cameraController.loop(type, loop.min, loop.max, {
      duration: loop.duration,
      startTime: option?.startTime,
    });
  }

  /**
   * カメラを横回転させる
   * 往復ではなく無限運動。
   */
  protected rotateTheta = (e: RAFTickerEventContext) => {
    if (this._config.speed == null) return;
    this.cameraController.addPosition(
      "theta",
      this._config.speed * (e.delta / (1000 / 30)),
      false,
      true
    );
  };

  /**
   * カメラの回転を一時停止する。
   * @param [option] option.returnR = falseの時、アニメーションを行わない。
   */
  public stop(option?: RotorStopConfig): void {
    if (!this.isRotation) return;
    this.isRotation = false;
    RAFTicker.off("tick", this.rotateTheta);
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
      this.cameraController.movePosition("radius", this._config.defaultR, {
        duration: 333,
      });
    }
  }

  public static getDefaultStopParam(option: RotorStopConfig): RotorStopConfig {
    option ??= {};
    option.returnR ??= true;
    return option;
  }
}
