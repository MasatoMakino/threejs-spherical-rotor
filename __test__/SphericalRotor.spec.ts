import {
  SphericalController,
  SphericalParamType,
} from "@masatomakino/threejs-spherical-controls";
import { Camera, Mesh } from "three";
import { SphericalRotor } from "../src";
import { RAFTicker } from "@masatomakino/raf-ticker";
import TWEEN, { Easing } from "@tweenjs/tween.js";

describe("SphericalRotor", () => {
  beforeEach(() => {
    TWEEN.removeAll();
    RAFTicker.stop();
    RAFTicker.emitTickEvent(0);
  });

  const generateTestRotor = () => {
    const controller = new SphericalController(new Camera(), new Mesh());
    const rotor = new SphericalRotor(controller);
    return { rotor, controller };
  };
  const testPosition = (
    controller: SphericalController,
    time: number,
    type: SphericalParamType,
    position: number
  ) => {
    RAFTicker.emitTickEvent(time);
    const cameraPos = controller.cloneSphericalPosition();
    expect(cameraPos[type]).toBeCloseTo(position);
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
    rotor.config = { loopR: { max: 2, min: 1, duration: 1000 }, defaultR: 0.5 };
    rotor.rotate({ startTime: 0 });

    testPosition(controller, 1000, "radius", 2);
    testPosition(controller, 1500, "radius", 1.5);
    testPosition(controller, 2000, "radius", 1);

    rotor.stop();
    testPosition(controller, 10000, "radius", 0.5);
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
