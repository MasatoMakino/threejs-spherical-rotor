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
  REVISION,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * Creates and returns a new Three.js Scene
 */
export function createScene() {
  return new Scene();
}

/**
 * Creates and adds an ambient light to the scene
 * @param {Scene} scene - The Three.js scene
 * @returns {AmbientLight} The created ambient light
 */
export function createLight(scene) {
  const ambientLight = new AmbientLight(0xffffff, 1.0);
  scene.add(ambientLight);
  return ambientLight;
}

/**
 * Creates and adds a camera to the scene
 * @param {Scene} scene - The Three.js scene
 * @param {number} W - Width of the viewport
 * @param {number} H - Height of the viewport
 * @param {number} near - Near clipping plane
 * @param {number} far - Far clipping plane
 * @returns {PerspectiveCamera} The created camera
 */
export function createCamera(scene, W, H, near = 1, far = 400) {
  const camera = new PerspectiveCamera(45, W / H, near, far);
  camera.position.set(0, 0, 100);
  camera.updateMatrixWorld(false);
  scene.add(camera);
  return camera;
}

/**
 * Creates and returns orbit controls for the camera
 * @param {Camera} camera - The Three.js camera
 * @param {WebGLRenderer} render - The Three.js renderer
 * @returns {OrbitControls} The created controls
 */
export function createControl(camera, render) {
  let domElement;
  if (render) {
    domElement = render.domElement;
  }
  const control = new OrbitControls(camera, domElement);
  control.update();
  return control;
}

/**
 * Creates and returns a WebGL renderer
 * @param {number} W - Width of the viewport
 * @param {number} H - Height of the viewport
 * @param {Object} options - Renderer options
 * @returns {WebGLRenderer} The created renderer
 */
export function createRenderer(W, H, options = {}) {
  const finalOptions = Object.assign(
    {
      color: 0x000000,
      antialias: true,
    },
    options,
  );

  const renderer = new WebGLRenderer({
    antialias: finalOptions.antialias,
  });
  document.body.appendChild(renderer.domElement);
  renderer.setClearColor(new Color(finalOptions.color));
  renderer.setSize(W, H);
  renderer.setPixelRatio(window.devicePixelRatio);
  console.log(`three.js r${REVISION}`);
  return renderer;
}

/**
 * Creates and adds helper objects to the scene
 * @param {Scene} scene - The Three.js scene
 * @returns {AxesHelper} The created axes helper
 */
export function createHelper(scene) {
  const axesHelper = new AxesHelper(20);
  scene.add(axesHelper);
  const cone = new Mesh(
    new ConeGeometry(5, 10, 16),
    new MeshBasicMaterial({ wireframe: true }),
  );
  scene.add(cone);
  return axesHelper;
}
