const path = require('path');

module.exports = {
  mode: 'production', // or 'development'
  entry: './scripts/main.ts', // Your main TypeScript file
  output: {
    filename: 'main.js', // Output file name
    path: path.resolve(__dirname, './scripts'), // Output directory
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'scripts'), // Fő forrásfájlok elérési útja
      'node_modules' // Node_modules könyvtár útvonala
    ],
    extensions: ['.ts'], // Resolve TypeScript and JavaScript files
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader', // Use ts-loader for TypeScript files
        exclude: /node_modules/,
      },
    ],
  },
};
