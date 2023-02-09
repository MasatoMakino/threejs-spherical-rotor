import { SleepWatcher } from "@masatomakino/threejs-drag-watcher";
import { SleepEventType } from "@masatomakino/threejs-drag-watcher";
import { SphericalController } from "@masatomakino/threejs-spherical-controls";
import { RotorStopConfig, SphericalRotor, SphericalRotorConfig } from "./";
import { LoopOption } from "./";

/**
 * マウス操作を監視し、回転を制御するクラス。
 * マウスが無操作の場合、回転を始め、操作が再開されると停止する。
 */
export class AutoSphericalRotor extends SphericalRotor {
  private isStart: boolean = false;
  private loopOption?: LoopOption;
  public static readonly DEFAULT_LOOP_LAT_DURATION: number = 30 * 1000;
  public static readonly DEFAULT_LOOP_R_DURATION: number = 30 * 1000;

  constructor(
    private sleepWatcher: SleepWatcher,
    cameraController: SphericalController
  ) {
    super(cameraController);
  }

  /**
   * マウスの監視を一時停止する
   * @param [option] option.returnR =　falseの時のみ、アニメーションを行わず原位置でマウス監視が停止する。監視を停止させた後に別のアニメーションでカメラを移動したかったり、元に戻したかったりする場合に使う。
   */
  public pause(option?: RotorStopConfig): void {
    if (!this.isStart) return;
    this.isStart = false;

    option = SphericalRotor.getDefaultStopParam(option);

    this.stopWatcher();
    this.stop(option);
  }

  private stopWatcher(): void {
    this.sleepWatcher.removeEventListener(SleepEventType.SLEEP, this.onSleep);
    this.sleepWatcher.removeEventListener(SleepEventType.WAKEUP, this.onWakeup);
    this.sleepWatcher.stop();
  }

  /**
   * マウスの監視を再開する。
   * 各種設定はwatch()で指定されたオプションを引き継ぐ。
   * pause()関数で停止された監視を再開させるための関数。
   */
  public resume(): void {
    if (this.isStart) return;
    this.isStart = true;
    this.startWatcher();
  }

  /**
   * マウスの監視を開始する。
   * @param parameters
   * @param loopOption
   */
  public watch(
    parameters?: SphericalRotorConfig,
    loopOption?: LoopOption
  ): void {
    this.config = parameters;
    this.loopOption = loopOption;
    this.isStart = true;
    this.startWatcher();
  }

  public onSleep = () => {
    this.rotate(this.loopOption);
  };

  public onWakeup = () => {
    this.stop();
  };

  private startWatcher(): void {
    this.stopWatcher();
    this.sleepWatcher.addEventListener(SleepEventType.SLEEP, this.onSleep);
    this.sleepWatcher.addEventListener(SleepEventType.WAKEUP, this.onWakeup);
    this.sleepWatcher.start();
  }
}
