const path = require('path');
const CircularDependencyPlugin = require('circular-dependency-plugin')

module.exports = {
    
    resolve: {
        alias: {
            '@': path.resolve('resources/js'),
        },
        fallback: {
            crypto: require.resolve('crypto-browserify'),
            stream: require.resolve('stream'),
        },
    },
    module: {
        rules: [
            {
                test: path.join(__dirname, '.'),
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env',
                              '@babel/react',{
                              'plugins': ['@babel/plugin-proposal-class-properties']}]
                }
            }
        ]
    },
    entry: "./src/index",
  plugins: [
    new CircularDependencyPlugin({
      // exclude detection of files based on a RegExp
      exclude: /a\.js|node_modules/,
      // include specific files based on a RegExp
      include: /dir/,
      // add errors to webpack instead of warnings
      failOnError: true,
      // allow import cycles that include an asyncronous import,
      // e.g. via import(/* webpackMode: "weak" */ './file.js')
      allowAsyncCycles: false,
      // set the current working directory for displaying module paths
      cwd: process.cwd(),
    })
  ]
};
