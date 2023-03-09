import { SphericalRotorConfigUtil } from "../src";
import { SphericalParamType } from "@masatomakino/threejs-spherical-controls";

describe("SphericalRotorConfig", () => {
  test("init", () => {
    const config = SphericalRotorConfigUtil.init(null);
    expect(config.loopPhi).toBeTruthy();
    expect(config.loopTheta).toBeTruthy();
    expect(config.loopR).toBeTruthy();
  });

  test("init with params", () => {
    const config = SphericalRotorConfigUtil.init({
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

    expect(config.loopPhi.duration).toBe(1);
    expect(config.loopTheta.duration).toBe(2);
    expect(config.loopR.duration).toBe(3);
  });

  test("extractParam", () => {
    const config = SphericalRotorConfigUtil.init({});

    const testParam = (type: SphericalParamType) => {
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

      const paramNull = SphericalRotorConfigUtil.extractSphericalParam(
        config,
        type
      );
      expect(paramNull).toBeNull();

      config[getLoopType(type)].max = 1;
      config[getLoopType(type)].min = 1;
      const param = SphericalRotorConfigUtil.extractSphericalParam(
        config,
        type
      );
      expect(param).toBeTruthy();
    };

    testParam("theta");
    testParam("phi");
    testParam("radius");
  });
});
