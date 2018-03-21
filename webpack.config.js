const path    = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/public/js/index.tsx",
  output: {
    path: path.resolve(__dirname, "public/js"),
    filename: "bundle.js"
  },
  mode: process.env.NODE_ENV,
  devtool: "source-map",
  resolve: {
    extensions: [".ts",".tsx",".js", ".jsx", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  }
}
