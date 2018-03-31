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
const createElectronReloadWebpackPlugin = require('electron-reload-webpack-plugin');

// create one plugin for both renderer and main process
const ElectronReloadWebpackPlugin = createElectronReloadWebpackPlugin({
    // Path to main process file
    path: path.join(__dirname, './build/backend.js'),
    // Other 'electron-connect' options
    logLevel: 0
});

module.exports = {
    // ...

    // Target should be 'electron-main' or 'electron-renderer'
    // Usually you will have two webpack configs, one for renderer and other one for main process
    target: 'electron-renderer',

    plugins: [
        // ...
        ElectronReloadWebpackPlugin()

        // You can also pass target like this `ElectronReloadWebpackPlugin('electron-renderer')`, if you don't have it in config
    ],
    // ...
};
```

### 1.1 Create `electron-connect` client if you want to reload renderer process

```
import { app, BrowserWindow } from 'electron';
import { client } from 'electron-connect';

app.on('ready', () => {
    const mainWindow = new BrowserWindow({
        // ...
    });

    // Pass your BrowserWindow object
    client.create(mainWindow);
});
```

### 2. Start webpack with watch option

```
$ webpack --watch
```

