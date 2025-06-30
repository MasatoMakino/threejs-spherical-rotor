# threejs-spherical-rotor

> Loop rotation plugin for threejs-spherical-controls.

[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)
[![npm version](https://badge.fury.io/js/@masatomakino%2Fthreejs-spherical-rotor.svg)](https://badge.fury.io/js/@masatomakino%2Fthreejs-spherical-rotor)
[![Maintainability](https://api.codeclimate.com/v1/badges/c4476aea7e111a52ac1d/maintainability)](https://codeclimate.com/github/MasatoMakino/threejs-spherical-rotor/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/c4476aea7e111a52ac1d/test_coverage)](https://codeclimate.com/github/MasatoMakino/threejs-spherical-rotor/test_coverage)

[![ReadMe Card](https://github-readme-stats.vercel.app/api/pin/?username=MasatoMakino&repo=threejs-spherical-rotor)](https://github.com/MasatoMakino/threejs-spherical-rotor)

A TypeScript library that provides automated rotation functionality for Three.js spherical camera controls. It extends `@masatomakino/threejs-spherical-controls` with configurable loop rotation capabilities in theta (horizontal), phi (vertical), and radius (zoom) dimensions.

## Features

- **Automated Camera Rotation**: Configurable rotation animations for spherical camera controls
- **Multiple Rotation Types**: 
  - Infinite horizontal rotation (theta)
  - Loop rotation for vertical movement (phi)
  - Loop rotation for horizontal movement (theta)
  - Zoom in/out loop rotation (radius)
- **User Interaction Detection**: Automatically pause rotation when user interacts with the camera
- **TypeScript Support**: Full TypeScript definitions included
- **ESM Module**: Modern ES module format

## Demo

[Demo Page](https://masatomakino.github.io/threejs-spherical-rotor/demo/)

[API documents](https://masatomakino.github.io/threejs-spherical-rotor/api/index.html)

## Installation

```bash
npm install @masatomakino/threejs-spherical-rotor
```

## Peer Dependencies

This library requires the following peer dependencies to be installed in your project:

- `three` (>=0.126.0 <1.0.0)
- `@masatomakino/threejs-spherical-controls` (^0.10.0)  
- `@masatomakino/threejs-drag-watcher` (0.10.1 - 0.13.x)

These dependencies are automatically resolved when you install the package.

## Usage

### Basic Usage with AutoSphericalRotor

```javascript
import { AutoSphericalRotor } from '@masatomakino/threejs-spherical-rotor';
import { SphericalController, SphericalControllerUtil } from '@masatomakino/threejs-spherical-controls';
import { DragWatcher, SleepWatcher } from '@masatomakino/threejs-drag-watcher';
import { Scene, PerspectiveCamera, WebGLRenderer, Spherical } from 'three';

// Setup your Three.js scene, camera, and renderer
const scene = new Scene();
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new WebGLRenderer();

// Create spherical controller
const target = SphericalControllerUtil.generateCameraTarget();
scene.add(target);
const control = new SphericalController(camera, target);
control.initCameraPosition(new Spherical(100, Math.PI / 2, 0));

// Setup drag watcher for user interaction detection
const dragWatcher = new DragWatcher(renderer.domElement);
const sleepWatcher = new SleepWatcher(dragWatcher, { timeOut_ms: 1000 });

// Create and configure the auto rotor
const rotor = new AutoSphericalRotor(sleepWatcher, control);
rotor.watch({
  // Vertical loop rotation (0 to π radians)
  loopPhi: {
    min: 0,
    max: Math.PI,
    duration: 5000 // 5 seconds
  },
  
  // Horizontal loop rotation
  loopTheta: {
    min: 0,
    max: Math.PI / 2,
    duration: 3000 // 3 seconds
  },
  
  // Zoom loop rotation
  loopR: {
    min: 50,
    max: 150,
    duration: 4000 // 4 seconds
  },
  
  // Default zoom level when stopping
  defaultR: 100
});
```

### Manual Control with SphericalRotor

```javascript
import { SphericalRotor } from '@masatomakino/threejs-spherical-rotor';

// Create rotor without automatic user interaction detection
const rotor = new SphericalRotor(control);

// Configure rotation parameters
rotor.config = {
  speed: 0.01,
  loopPhi: { min: 0.1, max: Math.PI - 0.1, duration: 6000 },
  defaultR: 100
};

// Manually start rotation
rotor.rotate();

// Stop rotation
rotor.stop();

// Stop without returning to default radius
rotor.stop({ returnR: false });
```

## Configuration Options

### SphericalRotorConfig Interface

```typescript
interface SphericalRotorConfig {
  // Infinite horizontal rotation speed (radians per frame)
  // Note: Can be combined with loopTheta for complex theta motion
  speed?: number;
  
  // Vertical loop rotation (0 to π radians)
  loopPhi?: LoopParameter;
  
  // Horizontal loop rotation (-π to π radians)
  // Note: When used with speed, both rotations apply simultaneously
  loopTheta?: LoopParameter;
  
  // Zoom loop rotation
  loopR?: LoopParameter;
  
  // Default radius when stopping rotation
  defaultR?: number;
}

interface LoopParameter {
  min?: number;    // Minimum value
  max?: number;    // Maximum value
  duration?: number; // Animation duration in milliseconds
}
```

### Rotation Behavior

When both `speed` and `loopTheta` are configured:
- **Both rotations apply simultaneously** to the theta (horizontal) axis
- `speed` provides continuous infinite rotation
- `loopTheta` provides oscillating loop motion within the specified range
- The combined effect creates complex horizontal movement patterns

**Typical Usage Patterns:**
- Use `speed` alone for simple infinite horizontal rotation
- Use `loopTheta` alone for oscillating horizontal motion
- Combine both for complex motion effects (advanced usage)

## API Reference

### SphericalRotor

The base class for rotation functionality.

#### Methods

- `rotate(option?: { startTime?: number }): void` - Start rotation animation
- `stop(option?: RotorStopConfig): void` - Stop rotation animation
- `config: SphericalRotorConfig` - Set rotation configuration

### AutoSphericalRotor

Extends SphericalRotor with automatic user interaction detection.

#### Methods

- `watch(parameters?: SphericalRotorConfig, loopOption?: { startTime?: number }): void` - Start monitoring user interaction
- `pause(option?: RotorStopConfig): void` - Pause monitoring and rotation
- `resume(): void` - Resume monitoring with previous settings

## Examples

The library includes several demo implementations:

1. **Basic Loop Rotation**: Demonstrates phi, theta, and radius loop animations without speed
2. **Horizontal Rotation**: Shows infinite horizontal rotation (`speed`) combined with phi and radius loops

Check the [demo page](https://masatomakino.github.io/threejs-spherical-rotor/demo/) for live examples.

## Development

### Build Commands

```bash
# Install dependencies
npm install

# Build TypeScript
npm run buildTS

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run coverage

# Build demo pages
npm run demo

# Start development server
npm run start:dev
```

### Project Structure

```
src/
├── SphericalRotor.ts              # Core rotation functionality
├── AutoSphericalRotor.ts          # Auto rotation with user interaction detection
├── SphericalRotorConfig.ts        # Configuration interfaces
├── SphericalRotorConfigUtil.ts    # Configuration utilities
├── RotorStopConfig.ts             # Stop configuration interface
└── index.ts                       # Main exports
```

## License

MIT License. See [LICENSE](LICENSE) file for details.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Dependencies

- **Runtime**: No runtime dependencies (uses peer dependencies)
- **Peer Dependencies**: 
  - `three` (>=0.126.0 <1.0.0)
  - `@masatomakino/threejs-spherical-controls` (^0.10.0)
  - `@masatomakino/threejs-drag-watcher` (0.10.1 - 0.13.x)

## Browser Support

This library is distributed as ES modules and requires a modern browser environment or a bundler that supports ES modules.
