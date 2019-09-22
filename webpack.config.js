const path = require("path")
const nodeExternals = require("webpack-node-externals")

const {
  NODE_ENV = "production"
} = process.env

module.exports = {
  entry: "./src/index.ts",
  externals: [nodeExternals()],
  mode: NODE_ENV,
  target: "node",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "build")
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          "ts-loader",
        ],
      }, {
        test: /\.txt$/i,
        use: "raw-loader",
      },
    ]
  },
  watch: NODE_ENV === "development"
}
