const path = require('path');
const WebpackManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
  entry: './src/components/apps/ClientApp.jsx',
  output: {
    publicPath: '/static/',
    path: path.resolve(__dirname, 'dist'),
    filename: 'client.[hash].js',
  },
	resolve: {
        extensions: ['.mjs', '.js', '.jsx'],
        modules: ['src', 'node_modules'],
		  },
  module: {
    rules: [
      {
	      test: /\.m?jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      }
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new WebpackManifestPlugin({
      fileName: '../src/manifest.json',
    }),
  ],
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
};
