import { AutoSphericalRotor } from "./";
import { SphericalParamType } from "@masatomakino/threejs-spherical-controls";

/**
 * 回転の動作を指定する。
 */
export interface SphericalRotorConfig {
  /**
   * infinite horizontal rotation.
   * unit : radian / frame
   */
  speed?: number;

  /**
   * vertical loop rotation.
   * range : 0 ~ Math.PI
   */
  loopPhi?: LoopParameter;

  /**
   * horizontal loop rotation.
   * range : -Math.PI ~ Math.PI
   */
  loopTheta?: LoopParameter;

  /**
   * zoom loop.
   */
  loopR?: LoopParameter;

  /**
   * Return to this position when zoom loop is released
   */
  defaultR?: number;
}

export interface LoopParameter {
  max?: number; // 単位ラジアン or R
  min?: number;
  duration?: number; //単位ms
}

export class SphericalRotorConfigUtil {
  public static init(config: SphericalRotorConfig): SphericalRotorConfig {
    config ??= {};
    config.loopPhi ??= {};
    config.loopPhi.duration ??= AutoSphericalRotor.DEFAULT_LOOP_LAT_DURATION;
    config.loopTheta ??= {};
    config.loopTheta.duration ??= AutoSphericalRotor.DEFAULT_LOOP_LAT_DURATION;
    config.loopR ??= {};
    config.loopR.duration ??= AutoSphericalRotor.DEFAULT_LOOP_R_DURATION;
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
    const getLoopParameter = (
      config: SphericalRotorConfig,
      type: SphericalParamType
    ): LoopParameter | null => {
      switch (type) {
        case SphericalParamType.PHI:
          return config.loopPhi;
        case SphericalParamType.THETA:
          return config.loopTheta;
        case SphericalParamType.R:
          return config.loopR;
      }
      return null;
    };

    const param = getLoopParameter(config, type);
    if (param == null || param.max == null || param.min == null) return null;
    return param;
  }
}
