"use strict"

const path = require("path")

module.exports = ({ actions, stage, loaders }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /bad-module/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@components": path.resolve(__dirname, "../../src/components/"),
        "@styles": path.resolve(__dirname, "../../src/styles/"),
        "@utils": path.resolve(__dirname, "../../src/utils/"),
        "@icons": path.resolve(__dirname, "../../src/icons/"),
        "@sections": path.resolve(__dirname, "../../src/sections/"),
        "@redux": path.resolve(__dirname, "../../src/redux/"),
      },
      extensions: [".js", ".json", ".ts", ".tsx"],
    },
  })
}
