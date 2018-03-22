const path    = require("path");
const webpack = require("webpack");

module.exports = {
  entry: ["./public/js/library.js","./src/public/js/index.tsx"],
  output: {
    path: path.resolve(__dirname, "public/js"),
    filename: "bundle.js"
  },
  mode: process.env.NODE_ENV,
  devtool: "source-map",
  resolve: {
    extensions: [".ts",".tsx",".js", ".jsx", ".json"]
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.tsx$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  }
}
