const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const plugins = [];

if (process.env.favicons) {
  plugins.push(
    new FaviconsWebpackPlugin({
      logo: './src/assets/cauquen.png',
      mode: 'webapp',
      manifest: './src/manifest.webmanifest'
    })
  );
}

module.exports = {
  plugins: plugins
};
