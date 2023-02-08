import { SphericalController } from "@masatomakino/threejs-spherical-controls";
import { CameraUpdateEventType } from "@masatomakino/threejs-spherical-controls";
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

  test("rotate", () => {
    const { controller, rotor } = generateTestRotor();
    controller.tweens.loopEasing = Easing.Linear.None;
    rotor.config = { loopR: { max: 2, min: 1, duration: 1000 } };
    rotor.rotate({ startTime: 0 });

    controller.addEventListener(CameraUpdateEventType.UPDATE, () => {
      console.log(controller.cloneSphericalPosition());
    });

    RAFTicker.emitTickEvent(1000);
    expect(controller.cloneSphericalPosition()).toMatchObject({ radius: 2 });

    RAFTicker.emitTickEvent(1500);
    expect(controller.cloneSphericalPosition()).toMatchObject({ radius: 1.5 });

    RAFTicker.emitTickEvent(2000);
    expect(controller.cloneSphericalPosition()).toMatchObject({ radius: 1 });
  });

  //TODO : SphericalRotorの多重rotateが許可されている。isRotationフラグを廃止するか、多重rotateを禁止するかを検討する。
});
