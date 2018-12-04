// This config was generated using a preset.
// Please see the handbook for more information: https://github.com/stryker-mutator/stryker-handbook/blob/master/stryker/guides/react.md#react
module.exports = function(config) {
  config.set({
    mutate: ["src/@(actions|reducers)/*.js", "!src/@(actions|reducers)/__tests__/*@(.test|.spec|Spec).js"],
    mutator: "javascript",
    testRunner: "jest",
    reporters: ["progress", "clear-text", "html", "dashboard"],
    coverageAnalysis: "off",
    jest: {
      projectType: "react"
    }
  });
};
