const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CSPWebpackPlugin = require("csp-webpack-plugin");
const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const modeConfiguration = (env) => require(`./build-utils/webpack.${env}`)(env);

module.exports = ({ mode } = { mode: "production" }) => {
  console.log(`mode is ${mode}`);
  return webpackMerge(
    {
      mode, //decided depending whether ran with npm run dev(developement) or npm run prod(production)
      entry: "./src/index.js",
      output: {
        publicPath: "/",
        path: path.resolve(__dirname, "build"),
        filename: "bundled.js"
      },
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
          },
          {
            test: /\.pug$/,
            use: ["babel-loader", "pug-as-jsx-loader"]
          },
          // {
          //   test: /\.scss$/,
          //   use: [
          //     "style-loader", //creates style nodes from JS strings
          //     "css-loader", //translates CSS into CommonJS
          //     "sass-loader" //compiles sass to css, using Node Sass by default
          //   ]
          // },
          {
            test: /\.(jpg|png)$/,
            use: [
              {
                loader: "url-loader",
                options: {
                  limit: 10000
                }
              }
            ]
          },
          {
            test: /\.svg$/,
            loader: "svg-inline-loader"
          }
        ]
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: "./public/index.html"
        }),
        new CSPWebpackPlugin({
          "img-src": "'self'",
          "object-src": "'none'",
          "base-uri": "'self'",
          "script-src": [
            "'unsafe-inline'",
            "'self'",
            "'unsafe-eval'",
            "http://ajax.googleapis.com"
          ],
          "worker-src": ["'self'", "blob:"]
        }),
        new webpack.HotModuleReplacementPlugin()
      ],
      devServer: {
        hot: true,
        open: true,
        port: 4000
      }
    },
    modeConfiguration(mode)
  );
};
