import type { SphericalParamType } from "@masatomakino/threejs-spherical-controls";
import { describe, expect, test } from "vitest";
import { initConfig, extractSphericalParam } from "../src/index.js";

describe("SphericalRotorConfig", () => {
  test("init", () => {
    const config = initConfig(undefined);
    expect(config.loopPhi).toBeTruthy();
    expect(config.loopTheta).toBeTruthy();
    expect(config.loopR).toBeTruthy();
  });

  test("init with params", () => {
    const config = initConfig({
      loopPhi: {
        duration: 1,
      },
      loopTheta: {
        duration: 2,
      },
      loopR: {
        duration: 3,
      },
    });

    expect(config.loopPhi?.duration).toBe(1);
    expect(config.loopTheta?.duration).toBe(2);
    expect(config.loopR?.duration).toBe(3);
  });

  test("extractParam", () => {
    const testParam = (type: SphericalParamType) => {
      const config = initConfig({});
      const getLoopType = (type: SphericalParamType) => {
        switch (type) {
          case "phi":
            return "loopPhi";
          case "theta":
            return "loopTheta";
          case "radius":
            return "loopR";
        }
      };

      const paramUndefined = extractSphericalParam(config, type);
      expect(paramUndefined).toBeUndefined();

      const loopType = getLoopType(type);
      if (config[loopType]) {
        config[loopType].max = 1;
        config[loopType].min = 1;
      }

      const param = extractSphericalParam(config, type);
      expect(param).toBeTruthy();
    };

    testParam("theta");
    testParam("phi");
    testParam("radius");
  });
});
