import {
  DEFAULT_LOOP_LAT_DURATION,
  DEFAULT_LOOP_R_DURATION,
} from "./AutoSphericalRotorConstants.js";
import type {
  LoopParameter,
  SphericalRotorConfig,
} from "./SphericalRotorConfig.js";
import type { SphericalParamType } from "@masatomakino/threejs-spherical-controls";

/**
 * Initialize a SphericalRotorConfig with default values
 */
export function initConfig(
  config?: SphericalRotorConfig,
): SphericalRotorConfig {
  const result = config ? { ...config } : {};
  result.loopPhi ??= {};
  result.loopPhi.duration ??= DEFAULT_LOOP_LAT_DURATION;
  result.loopTheta ??= {};
  result.loopTheta.duration ??= DEFAULT_LOOP_LAT_DURATION;
  result.loopR ??= {};
  result.loopR.duration ??= DEFAULT_LOOP_R_DURATION;
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
