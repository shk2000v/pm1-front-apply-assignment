module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@': './src',
          '@components': './src/components',
          '@navigations': './src/navigations',
          '@screens': './src/screens',
          '@assets': './src/assets',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
