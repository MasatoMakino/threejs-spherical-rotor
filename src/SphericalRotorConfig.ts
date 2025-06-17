import type { SphericalParamType } from "@masatomakino/threejs-spherical-controls";
import { AutoSphericalRotor } from "./index.js";

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

/**
 * Initialize a SphericalRotorConfig with default values
 */
export function initConfig(
  config?: SphericalRotorConfig,
): SphericalRotorConfig {
  const result = config ? { ...config } : {};
  result.loopPhi ??= {};
  result.loopPhi.duration ??= AutoSphericalRotor.DEFAULT_LOOP_LAT_DURATION;
  result.loopTheta ??= {};
  result.loopTheta.duration ??= AutoSphericalRotor.DEFAULT_LOOP_LAT_DURATION;
  result.loopR ??= {};
  result.loopR.duration ??= AutoSphericalRotor.DEFAULT_LOOP_R_DURATION;
  return result;
}

/**
 * ループアニメーションに必要な情報を、configオブジェクトから取り出す。
 * @param config
 * @param type
 */
export function extractSphericalParam(
  config: SphericalRotorConfig | undefined,
  type: SphericalParamType,
): Required<LoopParameter> | undefined {
  const getLoopParameter = (
    config: SphericalRotorConfig | undefined,
    type: SphericalParamType,
  ): LoopParameter | undefined => {
    switch (type) {
      case "phi":
        return config?.loopPhi;
      case "theta":
        return config?.loopTheta;
      case "radius":
        return config?.loopR;
    }
  };

  const param = getLoopParameter(config, type);
  if (
    param == null ||
    param.max == null ||
    param.min == null ||
    param.duration == null
  )
    return undefined;
  return param as Required<LoopParameter>;
}
