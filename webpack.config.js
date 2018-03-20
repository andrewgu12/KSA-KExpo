const path    = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./public/js/index.js",
  output: {
    path: path.resolve(__dirname, "public/js"),
    filename: "bundle.js"
  },
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".jsx", ".json"]
  },
  module: {
    rules: [
      { test: /\.ts?$/, loader: "awesome-typescript-loader" },
      { enforce: "pre", test: /\.js?$/, loader: "source-map-loader" }
    ]
  },
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  }
}
