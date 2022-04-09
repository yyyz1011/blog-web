const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { ProgressPlugin } = require("webpack");
const ParallelUglifyPlugin = require("webpack-parallel-uglify-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].bundle.js",
    clean: true,
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|webp|fbx|svg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 25 * 1024, // 25kb
          },
        },
        generator: {
          filename: "asset/[name].[hash:6][ext]",
          publicPath: "./",
        },
      },
      {
        test: /\.(less|css)$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.(tsx|ts)$/,
        use: [
          "cache-loader",
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-react"],
              cacheDirectory: true,
            },
          },
          "ts-loader",
        ],
        exclude: path.resolve(__dirname, "node_modules"),
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 20000,
      maxSize: 20000,
      minChunks: 2,
      cacheGroups: {
        vendor: {
          test: /[\/]node_modules[\/]/,
          filename: "js/[id]_vendors.js",
          priority: -10,
        },
        default: {
          minChunks: 2,
          filename: "js/[id]_common.js", // 一般是多入口会打包common.js
          priority: -20,
        },
      },
    },
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: false,
        terserOptions: {
          compress: {
            arguments: true,
            dead_code: true,
          },
          mangle: true,
          toplevel: true,
          keep_classnames: false,
          keep_fnames: false,
        },
      }),
      new CssMinimizerWebpackPlugin({
        parallel: true,
      }),
    ],
  },
  plugins: [
    new ParallelUglifyPlugin({
      cacheDir: ".cache/",
      uglifyJS: {
        output: {
          beautify: false,
          comments: false,
        },
        warnings: false,
      },
      test: /.(js|ts|tsx)$/g,
      sourceMap: false,
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/template/template.html",
      inject: true,
      collapseWhitespace: true,
      removeComments: true,
    }),
    new CompressionWebpackPlugin({
      threshold: 0,
      test: /.(css|js|ts|tsx|less)$/i,
      minRatio: 0.8,
      algorithm: "gzip",
    }),
    new ProgressPlugin({
      activeModules: true,
      entries: true,
      modules: true,
      modulesCount: 5000,
      profile: false,
      dependencies: false,
      dependenciesCount: 10000,
    }),
  ],
  devServer: {
    static: path.join(__dirname, "dist"),
    compress: true,
    open: true,
    port: 8081,
    hot: true,
  },
  performance: {
    hints: false,
  },
};
