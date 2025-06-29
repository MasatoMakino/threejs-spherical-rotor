# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TypeScript library that provides loop rotation functionality for Three.js spherical controls. It extends `@masatomakino/threejs-spherical-controls` with automated rotation capabilities.

## Key Architecture

The library has two main classes:

- **SphericalRotor** (`src/SphericalRotor.ts`): Core rotation functionality that can rotate the camera in theta (horizontal), phi (vertical), and radius (zoom) dimensions with configurable loops
- **AutoSphericalRotor** (`src/AutoSphericalRotor.ts`): Extends SphericalRotor to automatically start/stop rotation based on user interaction using `@masatomakino/threejs-drag-watcher`

Configuration is handled through:
- **SphericalRotorConfig** (`src/SphericalRotorConfig.ts`): Main configuration interface
- **SphericalRotorConfigUtil** (`src/SphericalRotorConfigUtil.ts`): Utility functions for config initialization and parameter extraction

## Common Development Commands

### Testing
- `npm test` - Run tests once
- `npm run test:watch` - Run tests in watch mode
- `npm run coverage` - Generate test coverage report

### Building and Development
- `npm run buildTS` - Compile TypeScript to esm/ directory
- `npm run start:dev` - Start development server with file watching
- `npm run build` - Full build including TypeScript compilation, demo, and documentation
- `npm run demo` - Build demo pages

### Code Quality
- `npx biome check --write --no-errors-on-unmatched` - Format and lint code (used by lint-staged)
- `npm run typedocs` - Generate API documentation

### Development Server
- `npm run server` - Start BrowserSync server for demo pages

## Build Output

- **esm/**: Compiled JavaScript modules with TypeScript declarations
- **docs/demo/**: Built demo pages
- **docs/api/**: Generated TypeDoc API documentation

## Dependencies

This library is designed as a plugin for:
- `@masatomakino/threejs-spherical-controls` (peer dependency)
- `@masatomakino/threejs-drag-watcher` (peer dependency for AutoSphericalRotor)
- `three` (peer dependency)

## Testing Framework

Uses Vitest with JSDOM environment for testing Three.js components.