# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TypeScript library that provides loop rotation functionality for Three.js spherical controls. It extends `@masatomakino/threejs-spherical-controls` with automated rotation capabilities.

## Development Environment

**This project uses DevContainer for npm isolation to protect against supply chain attacks.**

All npm commands MUST be executed inside the DevContainer. Do NOT run npm commands directly on the host OS.

### Starting the DevContainer

```bash
devcontainer up --workspace-folder .
```

### Running npm Commands

All npm scripts must be prefixed with `devcontainer exec --workspace-folder .`:

```bash
# Example: Running tests
devcontainer exec --workspace-folder . npm test

# Example: Starting dev server
devcontainer exec --workspace-folder . npm run start:dev
```

### Stopping the DevContainer

```bash
devcontainer stop --workspace-folder .
```

## Key Architecture

The library has two main classes:

- **SphericalRotor** (`src/SphericalRotor.ts`): Core rotation functionality that can rotate the camera in theta (horizontal), phi (vertical), and radius (zoom) dimensions with configurable loops
- **AutoSphericalRotor** (`src/AutoSphericalRotor.ts`): Extends SphericalRotor to automatically start/stop rotation based on user interaction using `@masatomakino/threejs-drag-watcher`

Configuration is handled through:
- **SphericalRotorConfig** (`src/SphericalRotorConfig.ts`): Main configuration interface
- **SphericalRotorConfigUtil** (`src/SphericalRotorConfigUtil.ts`): Utility functions for config initialization and parameter extraction

## Common Development Commands

**IMPORTANT**: All commands below must be executed inside the DevContainer using `devcontainer exec --workspace-folder .` prefix.

### Testing
- `devcontainer exec --workspace-folder . npm test` - Run tests once
- `devcontainer exec --workspace-folder . npm run test:watch` - Run tests in watch mode
- `devcontainer exec --workspace-folder . npm run coverage` - Generate test coverage report

### Building and Development
- `devcontainer exec --workspace-folder . npm run buildTS` - Compile TypeScript to esm/ directory
- `devcontainer exec --workspace-folder . npm run start:dev` - Start development server with file watching (ports: 3000, 3001)
- `devcontainer exec --workspace-folder . npm run build` - Full build including TypeScript compilation, demo, and documentation
- `devcontainer exec --workspace-folder . npm run demo` - Build demo pages

### Code Quality
- `devcontainer exec --workspace-folder . npx biome check --write --no-errors-on-unmatched` - Format and lint code
- `devcontainer exec --workspace-folder . npx biome ci .` - CI mode (used by pre-push hook)
- `devcontainer exec --workspace-folder . npm run typedocs` - Generate API documentation

### Development Server
- `devcontainer exec --workspace-folder . npm run server` - Start BrowserSync server (http://localhost:3000, UI: http://localhost:3001)

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

## Git Hooks

This project uses manual Git hooks that delegate commands to the DevContainer:

- **pre-commit**: Runs `npm run pre-commit` (Biome format on staged files)
- **pre-push**: Runs `npm run pre-push` (Biome CI + tests)

Hooks are located in `.git/hooks/` and automatically start the DevContainer if it's not running.

## Release Operations

Release operations follow a standardized workflow documented in `.claude/docs/version-release-workflow.md`.

**Key points**:
- Version updates are performed in DevContainer: `devcontainer exec --workspace-folder . npm version [patch|minor|major] --no-git-tag-version --ignore-scripts`
- Git operations (branching, tagging, pushing) are performed on **host OS**
- Quality checks (lint, test, build) are executed in DevContainer before version bump
- Signed tags are created on host OS after PR merge

**Refer to `.claude/docs/version-release-workflow.md` for the complete step-by-step workflow.**