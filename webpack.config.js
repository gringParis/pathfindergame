var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');
console.log('is build mode ==' + !debug )
module.exports = {
  context: path.join(__dirname, "src"),
  devtool: debug ? "inline-sourcemap" : 'source-map',
  entry: "./app.js",
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
          plugins: ['react-html-attrs'],
        }
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader' , 'css-loader', 'sass-loader']
      },
      { 
        test: /\.(png|jpg|ico)$/,
        loader: 'file-loader'
      }
    ]
  },
  output: {
    path: __dirname + "/dst/",
    filename: "app.min.js"
  },
  plugins: debug ? [] : [
    new webpack.optimize.CommonsChunkPlugin({
          name: "vendor",
            // (the commons chunk name)
          filename: "vendor.min.js",
      }),
    new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourcemap: true,
      beautify: false,
          mangle: {
              screw_ie8: false,
              keep_fnames: true
          },
          compress: {
              screw_ie8: false,
              warnings: false
          },
          comments: false
      })

  ],
};