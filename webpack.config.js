const path = require('path');
const AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;

module.exports = (env, argv) => {

  const config = {
    plugins: [
      // See: https://www.npmjs.com/package/@ngtools/webpack
      new AngularCompilerPlugin({
        // We wanted to have separate tsconfig for AOT compilation
        tsConfigPath: path.join(__dirname, 'tsconfig.aot.json'),
        mainPath: path.join(__dirname, 'app/index'),
        entryModule: path.join(__dirname, 'app/app.module#AppModule'),
        sourceMap: true
      })
    ],
    module: {
      rules: [{
        test: /(\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
        use: [
          '@ngtools/webpack'
        ],
        exclude: [/node_modules/]
      }]
    }
  };

  return config;
}
