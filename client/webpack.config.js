const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CSPWebpackPlugin = require("csp-webpack-plugin");
const CspHtmlWebpackPlugin = require("csp-html-webpack-plugin");
const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const fs = require("fs");
const modeConfiguration = (env) => require(`./build-utils/webpack.${env}`)(env);

module.exports = ({ mode } = { mode: "development" }) => {
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
            test: /\.html$/,
            exclude: /node_modules/,
            loader: 'html-loader'
          },
          {
            test: /\.svg$/,
            use: ['@svgr/webpack']
          },
            {
              test: /\.css$/,
              use: ['style-loader', 'css-loader']
            },
            {
              test: /\.(png|svg|jpg|gif)$/,
              use: [
                'file-loader'
              ]
            },
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
       
        ]
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: "./public/index.html",
          cspPlugin: {
            enabled: false,
            policy: {
              "base-uri": "'self'",
              "object-src": "'none'",
              "image-src": ["'unsafe-inline'", "'self'", "'unsafe-eval'", "https://localhost:4000"],
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
            "image-src": ["'unsafe-inline'", "'self'", "'unsafe-eval'"],
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
        port: 4000,
        https: {
          key: fs.readFileSync("../certs/server.key"),
          cert: fs.readFileSync("../certs/server.crt"),
          ca: fs.readFileSync("../certs/rootCA.pem"),
        }
      }
    },
    modeConfiguration(mode)
  );
};
