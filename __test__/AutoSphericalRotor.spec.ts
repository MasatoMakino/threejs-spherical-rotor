import { RAFTicker } from "@masatomakino/raf-ticker";
import { DragWatcher, SleepWatcher } from "@masatomakino/threejs-drag-watcher";
import { SphericalController } from "@masatomakino/threejs-spherical-controls";
import { Easing } from "@tweenjs/tween.js";
import { Mesh, PerspectiveCamera } from "three";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { AutoSphericalRotor } from "../src/index.js";

describe("AutoSphericalRotor", () => {
  let time = 0;
  beforeEach(() => {
    time = 0;
    RAFTicker.stop();
    RAFTicker.emitTickEvent(0);
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.clearAllTimers();
  });

  const generateRotor = () => {
    const cameraController = new SphericalController(
      new PerspectiveCamera(),
      new Mesh(),
    );
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
    vi.advanceTimersByTime(delta);
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
      { startTime: defaultTimeout },
    );
    cameraController.tweens.loopEasing = Easing.Linear.None;

    const advanceTimer = (delta: number, position: number) => {
      tick(delta);
      expect(cameraController.cloneSphericalPosition().radius).toBeCloseTo(
        position,
      );
    };

    advanceTimer(defaultTimeout - 0.000001, 1);
    advanceTimer(100, 1.1);
  });
});
