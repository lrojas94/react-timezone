const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


const isProdBuild = process.argv.indexOf('-p') !== -1;
const filename = isProdBuild ? 'react-timezone.min' : 'react-timezone';

const extractSass = new ExtractTextPlugin({
  filename: `${filename}.css`,
});

const plugins = [extractSass];

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: `${filename}.js`,
    library: 'ReactTimezone',
    libraryTarget: 'umd',
  },
  externals: [
    {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
      },
    },
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react', '@babel/preset-es2015'],
        },
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [{
            loader: 'css-loader',
          }, {
            loader: 'sass-loader',
          }],
          // use style-loader in development
          fallback: 'style-loader',
        }),
      },
    ],
  },
  plugins,
};

