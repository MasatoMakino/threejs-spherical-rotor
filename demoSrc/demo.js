import { Common } from "./Common";
import { RAFTicker, RAFTickerEventType } from "@masatomakino/raf-ticker";
import { Fog, Spherical } from "three";
import { AutoSphericalRotor } from "..";
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

    scene = Common.initScene();
    scene.fog = new Fog(0x000000, 80, 160);
    Common.initLight(scene);
    const camera = Common.initCamera(scene, W, H);
    const renderer = Common.initRenderer(W, H, { antialias: false });

    Common.initHelper(scene);

    const target = SphericalControllerUtil.generateCameraTarget();
    scene.add(target);
    const control = new SphericalController(camera, target);

    control.initCameraPosition(new Spherical(100, Math.PI / 2, 0));
    const dragWatcher = new DragWatcher(renderer.domElement);
    const sleepWatcher = new SleepWatcher(dragWatcher, { timeOut_ms: 1000 });

    const rotor = new AutoSphericalRotor(sleepWatcher, control);
    rotor.watch({
      minTheta: -Math.PI / 4,
      maxTheta: Math.PI / 4,
      minPhi: 0,
      maxPhi: Math.PI / 2,
      minR: 100 / 3,
      maxR: 100,
      defaultR: 100,
    });

    RAFTicker.on(RAFTickerEventType.tick, () => {
      renderer.render(scene, camera);
    });
  }
}

window.onload = () => {
  new Demo();
};
