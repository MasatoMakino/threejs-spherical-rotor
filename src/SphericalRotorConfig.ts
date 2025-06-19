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
