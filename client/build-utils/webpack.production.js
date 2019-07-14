//production config
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//minicss extracts css into seperate files. It creates a css file per js file which contains css. It supports on-demand-loading of CSS and SourceMaps
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
module.exports = () => ({
  devtool: "nosource-source-map", // adds the nosource-source map plugin
  //nosource-source-map disables source-maps for dev-tools, cons: it won't allow us to add meta info for the browser in our dev-tools for debugging
  //pro: faster build speed, in development: enable source-maps for dev-tools, slower build speeds are fine, but disable it for production
  output: {
    filename: "production.js"
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // this is set to true if you want JS source maps for CSS
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
        //webpack reads from right to left
      }
    ]
  },
  plugins: [new MiniCssExtractPlugin()]
});
