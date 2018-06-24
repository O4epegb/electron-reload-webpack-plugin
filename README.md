[npm_img]: https://img.shields.io/npm/v/electron-reload-webpack-plugin.svg?style=flat-square
[npm_site]: https://www.npmjs.org/package/electron-reload-webpack-plugin

[![npm info][npm_img]][npm_site]

# electron-reload-webpack-plugin

[Webpack](https://webpack.js.org/) plugin that reloads [Electron](https://electronjs.org/) main or renderer process on build. Powered by [electron-connect](https://github.com/Quramy/electron-connect)

## Installation

```
npm install --save-dev electron-reload-webpack-plugin
```

## Usage

### 1. Add plugin to `webpack.config.js`

```javascript
const path = require('path');
const createElectronReloadWebpackPlugin = require('electron-reload-webpack-plugin');

// Create one plugin for both renderer and main process
const ElectronReloadWebpackPlugin = createElectronReloadWebpackPlugin({
    // Path to `package.json` file with main field set to main process file path, or just main process file path
    path: path.join(__dirname, './build/backend.js'),
    // or just `path: './'`,
    // Other 'electron-connect' options
    logLevel: 0
});

module.exports = {
    // ...

    // Target is recommended to be `electron-main` or `electron-renderer`
    // Usually you want to have two webpack configs, one for renderer and other one for main process
    target: 'electron-renderer',

    plugins: [
        // ...

        // Call created plugin here
        ElectronReloadWebpackPlugin()

        // If your config `target` is different from recommended one then you should also specify it like this `ElectronReloadWebpackPlugin('electron-renderer')`
    ],

    // ...
};
```

### 1.1 Create `electron-connect` client if you need to reload renderer process

```javascript
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

## Examples

Check `webpack.config.js` example [in examples folder](examples/webpack.config.js)
