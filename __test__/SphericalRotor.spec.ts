import { RAFTicker } from "@masatomakino/raf-ticker";
import {
  SphericalController,
  SphericalParamType,
} from "@masatomakino/threejs-spherical-controls";
import TWEEN, { Easing } from "@tweenjs/tween.js";
import { Mesh, PerspectiveCamera } from "three";
import { beforeEach, describe, expect, test } from "vitest";
import { SphericalRotor } from "../src/index.js";

describe("SphericalRotor", () => {
  beforeEach(() => {
    TWEEN.removeAll();
    RAFTicker.stop();
    RAFTicker.emitTickEvent(0);
  });

  const generateTestRotor = () => {
    const controller = new SphericalController(
      new PerspectiveCamera(),
      new Mesh(),
    );
    const rotor = new SphericalRotor(controller);
    return { rotor, controller };
  };
  const testPosition = (
    controller: SphericalController,
    time: number,
    type: SphericalParamType,
    position: number,
    message?: string,
  ) => {
    RAFTicker.emitTickEvent(time);
    const cameraPos = controller.cloneSphericalPosition();
    expect(cameraPos[type], message).toBeCloseTo(position);
  };

  test("constructor", () => {
    const { rotor } = generateTestRotor();
    expect(rotor).toBeTruthy();
    rotor.stop();
  });

  test("rotate without config", () => {
    const { controller, rotor } = generateTestRotor();
    rotor.config = {};

    const defaultPosition = controller.cloneSphericalPosition();
    rotor.rotate();

    RAFTicker.emitTickEvent(1000);
    const movedPosition = controller.cloneSphericalPosition();
    expect(movedPosition).toEqual(defaultPosition); //回転設定がなければ、カメラは移動しない。
  });

  test("rotate and stop", () => {
    const { controller, rotor } = generateTestRotor();
    controller.tweens.loopEasing = Easing.Linear.None;
    const config = {
      loopR: { max: 2, min: 1, duration: 1000 },
      defaultR: 0.5,
    };
    rotor.config = config;
    rotor.rotate({ startTime: 0 });

    testPosition(controller, 1000, "radius", config.loopR.max, "radius to max");
    testPosition(controller, 1500, "radius", 1.5, "radius to max to min");
    testPosition(controller, 2000, "radius", config.loopR.min, "radius to min");

    rotor.stop();
    testPosition(
      controller,
      10000,
      "radius",
      config.defaultR,
      "stop, radius to defaultR",
    );
  });

  test("rotate and stop without default radius", () => {
    const { controller, rotor } = generateTestRotor();
    controller.tweens.loopEasing = Easing.Linear.None;
    rotor.config = { loopR: { max: 2, min: 1, duration: 1000 } };
    rotor.rotate({ startTime: 0 });

    testPosition(controller, 1000, "radius", 2);
    testPosition(controller, 2000, "radius", 1);

    rotor.stop();
    testPosition(controller, 10000, "radius", 1);
  });

  test("rotate theta", () => {
    const { controller, rotor } = generateTestRotor();
    controller.tweens.loopEasing = Easing.Linear.None;

    const speed = 0.01;
    rotor.config = { speed };
    rotor.rotate({ startTime: 0 });

    testPosition(controller, 1000, "theta", speed * 30);
    testPosition(controller, 2000, "theta", speed * 30 * 2);
  });
});
