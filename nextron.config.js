module.exports = {
  // specify an alternate main src directory, defaults to 'main'
  mainSrcDir: 'main',
  // specify an alternate renderer src directory, defaults to 'renderer'
  rendererSrcDir: 'renderer',

  // main process' webpack config

  webpack: (defaultConfig, env) =>
    Object.assign(defaultConfig, {
      entry: {
        background: './main/background.ts',
        preload: './main/preload.ts',
      },
    }),
};
