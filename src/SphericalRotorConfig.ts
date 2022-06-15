import { AutoSphericalRotor } from "./";
import { SphericalParamType } from "@masatomakino/threejs-spherical-controls";

/**
 * 回転の動作を指定する。
 */
export interface SphericalRotorConfig {
  speed?: number; //横回転スピード 制限なしの回転の場合に指定 単位ラジアン / フレーム
  maxPhi?: number; //縦回転範囲 単位ラジアン 未指定の場合縦回転は行わない
  minPhi?: number; //縦回転範囲 単位ラジアン 未指定の場合縦回転は行わない
  loopPhiDuration?: number; //縦回転の速度 maxからminまでの経過時間 単位ms
  maxTheta?: number; //横回転範囲 単位ラジアン 未指定の場合横回転は行わない
  minTheta?: number; //横回転範囲 単位ラジアン 未指定の場合横回転は行わない
  loopThetaDuration?: number; //横回転の速度 maxからminまでの経過時間 単位ms
  maxR?: number; //ズーム範囲 単位はワールド座標の距離
  minR?: number; //ズーム範囲 単位はワールド座標の距離
  defaultR?: number; //ズーム範囲 ズームループ解除時にこの距離に戻る
  loopRDuration?: number; //ズームの速度 maxからminまでの経過時間 単位ms
}

export class SphericalRotorConfigUtil {
  public static init(config: SphericalRotorConfig): SphericalRotorConfig {
    config ??= {};
    config.loopPhiDuration ??= AutoSphericalRotor.DEFAULT_LOOP_LAT_DURATION;
    config.loopThetaDuration ??= AutoSphericalRotor.DEFAULT_LOOP_LAT_DURATION;
    config.loopRDuration ??= AutoSphericalRotor.DEFAULT_LOOP_R_DURATION;
    return config;
  }

  /**
   * ループアニメーションに必要な情報を、configオブジェクトから取り出す。
   * @param config
   * @param type
   */
  public static extractSphericalParam(
    config: SphericalRotorConfig,
    type: SphericalParamType
  ): LoopParameter | null {
    let param: LoopParameter;
    switch (type) {
      case SphericalParamType.PHI:
        param = {
          max: config.maxPhi,
          min: config.minPhi,
          duration: config.loopPhiDuration,
        };
        break;
      case SphericalParamType.THETA:
        param = {
          max: config.maxTheta,
          min: config.minTheta,
          duration: config.loopThetaDuration,
        };
        break;
      case SphericalParamType.R:
        param = {
          max: config.maxR,
          min: config.minR,
          duration: config.loopRDuration,
        };
        break;
    }

    if (param == null || param.max == null || param.min == null) return null;
    return param;
  }
}

export interface LoopParameter {
  max: number;
  min: number;
  duration: number;
}
