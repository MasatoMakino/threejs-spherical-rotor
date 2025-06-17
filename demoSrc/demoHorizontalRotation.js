import {
  createScene,
  createLight,
  createCamera,
  createRenderer,
  createHelper,
} from "./Common.js";
import { RAFTicker } from "@masatomakino/raf-ticker";
import { Fog, Spherical } from "three";
import { AutoSphericalRotor } from "../esm/index.js";
import { DragWatcher, SleepWatcher } from "@masatomakino/threejs-drag-watcher";
import {
  SphericalController,
  SphericalControllerUtil,
} from "@masatomakino/threejs-spherical-controls";

let scene;
export class Demo {
  constructor() {
    const W = 640;
    const H = 480;

    scene = createScene();
    scene.fog = new Fog(0x000000, 80, 160);
    createLight(scene);
    const camera = createCamera(scene, W, H);
    const renderer = createRenderer(W, H, { antialias: false });

    createHelper(scene);

    const target = SphericalControllerUtil.generateCameraTarget();
    scene.add(target);
    const control = new SphericalController(camera, target);

    control.initCameraPosition(new Spherical(100, Math.PI / 2, 0));
    const dragWatcher = new DragWatcher(renderer.domElement);
    const sleepWatcher = new SleepWatcher(dragWatcher, { timeOut_ms: 1000 });

    const rotor = new AutoSphericalRotor(sleepWatcher, control);
    rotor.watch({
      speed: 0.005,
      loopPhi: {
        min: 0,
        max: Math.PI,
      },
      loopR: {
        min: 100 / 3,
        max: 100,
      },
      defaultR: 100,
    });

    RAFTicker.on("tick", () => {
      renderer.render(scene, camera);
    });
  }
}

window.onload = () => {
  new Demo();
};
