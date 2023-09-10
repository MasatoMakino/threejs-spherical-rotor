import {
  AmbientLight,
  AxesHelper,
  Color,
  ConeGeometry,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  Mesh,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export class Common {
  static initScene() {
    return new Scene();
  }

  static initLight(scene) {
    const ambientLight = new AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);
    return ambientLight;
  }

  static initCamera(scene, W, H, near = 1, far = 400) {
    const camera = new PerspectiveCamera(45, W / H, near, far);
    camera.position.set(0, 0, 100);
    camera.updateMatrixWorld(false);
    scene.add(camera);
    return camera;
  }

  static initControl(camera, render) {
    let domElement;
    if (render) {
      domElement = render.domElement;
    }
    const control = new OrbitControls(camera, domElement);
    control.update();
    return control;
  }

  static initRenderer(W, H, option) {
    option = Object.assign(
      {
        color: 0x000000,
        antialias: true,
      },
      option,
    );

    const renderer = new WebGLRenderer({
      antialias: option.antialias,
    });
    document.body.appendChild(renderer.domElement);
    renderer.setClearColor(new Color(option.color));
    renderer.setSize(W, H);
    renderer.setPixelRatio(window.devicePixelRatio);
    return renderer;
  }

  static initHelper(scene) {
    const axesHelper = new AxesHelper(20);
    scene.add(axesHelper);
    const cone = new Mesh(
      new ConeGeometry(5, 10, 16),
      new MeshBasicMaterial({ wireframe: true }),
    );
    scene.add(cone);
    return axesHelper;
  }
}
