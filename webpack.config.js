const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

console.log(process.env.NODE_ENV);

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    eventObserverMapApp: './app/index.js',
    eventObserverMap: './eventObserverMap/index.js',
    // styles: './eventObserverMap/scss/main.scss'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './_dist'),
    publicPath: '',                          // New
  },
  devServer: {
    contentBase: path.resolve(__dirname, './_dist'),  // New
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015'] },
        }, 'eslint-loader'],
      },
      {
        test: /\.json$/,
        use: ['json-loader'] },
      // { // regular css files
      //   test: /\.css$/,
      //   loader: ExtractTextPlugin.extract({
      //     loader: 'css-loader?importLoaders=1',
      //   }),
      // },
      {
        test: /\.scss$/,
        exclude: [/node_modules/],
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].bundle.css',
      allChunks: true,
    }),

    // new UglifyJsPlugin({
    //   test: /\.js($|\?)/i
    // }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    }),
    // new CopyWebpackPlugin([{ from: '../assets' }]),
  ],
};
