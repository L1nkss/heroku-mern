const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: "react",
    }),
  ],
  devtool: "source-map",
  devServer: {
    contentBase: path.join(__dirname, "build"),
    publicPath: "/",
    historyApiFallback: true,
    compress: true,
    port: 9000,
    hot: true,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [
      new HtmlWebpackPlugin({
          template: path.resolve(__dirname, "build", "index.html")
      })
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
};