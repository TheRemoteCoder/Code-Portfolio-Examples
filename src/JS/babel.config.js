module.exports = (api) => {
  api.cache(true);

  const presets = [['@babel/preset-env', { modules: false }], 'jest'];

  const plugins = [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-modules-commonjs',

    // babel-plugin-module-resolver
    [
      'module-resolver',
      {
        root: ['./src'],
      },
    ],
  ];

  return {
    presets,
    plugins,
  };
};
