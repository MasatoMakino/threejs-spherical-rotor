import TWEEN, { Easing } from "@tweenjs/tween.js";
import { RAFTicker } from "@masatomakino/raf-ticker";
import { AutoSphericalRotor } from "../src";
import { SleepWatcher, DragWatcher } from "@masatomakino/threejs-drag-watcher";
import { SphericalController } from "@masatomakino/threejs-spherical-controls";
import { Camera, Mesh } from "three";

describe("AutoSphericalRotor", () => {
  let time: number = 0;
  beforeEach(() => {
    time = 0;
    TWEEN.removeAll();
    RAFTicker.stop();
    RAFTicker.emitTickEvent(0);
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.clearAllTimers();
  });

  const generateRotor = () => {
    const cameraController = new SphericalController(new Camera(), new Mesh());
    const dragWatcher = new DragWatcher(document.createElement("canvas"));
    const sleepWatcher = new SleepWatcher(dragWatcher);
    const autoRotor = new AutoSphericalRotor(sleepWatcher, cameraController);
    return {
      autoRotor,
      cameraController,
      sleepWatcher,
    };
  };

  const tick = (delta: number) => {
    time += delta;
    jest.advanceTimersByTime(delta);
    RAFTicker.emitTickEvent(time);
  };

  test("constructor", () => {
    const { autoRotor } = generateRotor();
    expect(autoRotor).toBeTruthy();
    autoRotor.watch();
    autoRotor.pause();
    autoRotor.resume();
  });

  test("sleep", () => {
    const { cameraController, autoRotor } = generateRotor();
    const defaultTimeout = 10 * 1000;
    autoRotor.watch(
      { loopR: { max: 2, min: 1, duration: 1000 } },
      { startTime: defaultTimeout }
    );
    cameraController.tweens.loopEasing = Easing.Linear.None;

    const advanceTimer = (delta: number, position: number) => {
      tick(delta);
      expect(cameraController.cloneSphericalPosition().radius).toBeCloseTo(
        position
      );
    };

    advanceTimer(defaultTimeout - 0.000001, 1);
    advanceTimer(100, 1.1);
  });
});
