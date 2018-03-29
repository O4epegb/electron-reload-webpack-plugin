[npm_img]: https://img.shields.io/npm/v/electron-reload-webpack-plugin.svg?style=flat-square
[npm_site]: https://www.npmjs.org/package/electron-reload-webpack-plugin

[![npm info][npm_img]][npm_site]

# electron-reload-webpack-plugin

[Webpack](https://webpack.js.org/) plugin that reloads Electron browser or renderer process on build. Powered by [electron-connect](https://github.com/Quramy/electron-connect)

## Installation

```
npm install --save-dev electron-reload-webpack-plugin
```

## Usage

### 1. Add plugin to `webpack.config.js`

```
const path = require('path');
const ElectronReloadWebpackPlugin = require('electron-reload-webpack-plugin');

module.exports = {
    // ...

    plugins: [
        // ...
        new ElectronReloadWebpackPlugin({
            path: path.join(__dirname, 'dist'),
            logLevel: 0
        })
    ]

    // ...
};
```

### 2. Start webpack with watch option

```
$ webpack --watch
```

