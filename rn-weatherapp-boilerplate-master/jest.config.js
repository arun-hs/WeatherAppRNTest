module.exports = {
  preset: 'react-native',
  collectCoverage: true,
  coveragePathIgnorePatterns: ['/node_modules/'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation)',
  ],
  moduleNameMapper: {
    '\\.(png|jpg|ico|jpeg|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/assetTransformer.js',
  },
};
