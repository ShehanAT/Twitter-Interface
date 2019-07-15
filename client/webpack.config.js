const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CSPWebpackPlugin = require("csp-webpack-plugin");
const CspHtmlWebpackPlugin = require("csp-html-webpack-plugin");
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
          template: "./public/index.html",
          cspPlugin: {
            enabled: true,
            policy: {
              "base-uri": "'self'",
              "object-src": "'none'",
              "script-src": ["'unsafe-inline'", "'self'", "'unsafe-eval'"],
              "style-src": ["'unsafe-inline'", "'self'", "'unsafe-eval'"]
            },
            hashEnabled: {
              "script-src": true,
              "style-src": true
            },
            nonceEnabled: {
              "script-src": true,
              "style-src": true
            }
          }
        }),
        new CspHtmlWebpackPlugin(
          {
            "base-uri": "'self'",
            "object-src": "'none'",
            "script-src": ["'unsafe-inline'", "'self'", "'unsafe-eval'"],
            "style-src": ["'unsafe-inline'", "'self'", "'unsafe-eval'"]
          },
          {
            enabled: true,
            hashingMethod: "sha256",
            hashEnabled: {
              "script-src": true,
              "style-src": true
            },
            nonceEnabled: {
              "script-src": true,
              "style-src": true
            }
          }
        ),
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
