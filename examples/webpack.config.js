const path = require('path');
const webpack = require('webpack');
const createElectronReloadWebpackPlugin = require('electron-reload-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
// Custom env variable so we could start webpack without electron-connect too
const useElectronConnect = process.env.ELECTRON_CONNECT === 'true';

const ElectronReloadWebpackPlugin = createElectronReloadWebpackPlugin({
    path: path.join(__dirname, './build/backend.js'),
    logLevel: 0
});

// You could also create some baseConfig and extend from it
const frontendConfig = {
    mode: isProduction ? 'production' : 'development',
    entry: {
        frontend: './src/frontend/index.tsx'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    plugins: [useElectronConnect && ElectronReloadWebpackPlugin()].filter(
        Boolean
    ),
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [{ loader: 'ts-loader' }],
                exclude: /node_modules/
            },
            {
                test: /\.node$/,
                use: [{ loader: 'node-loader' }]
            }
        ]
    },
    target: 'electron-renderer',
    node: {
        __dirname: false
    }
};

const backendConfig = {
    mode: isProduction ? 'production' : 'development',
    entry: {
        backend: './src/backend/index.ts'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    plugins: [useElectronConnect && ElectronReloadWebpackPlugin()].filter(
        Boolean
    ),
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [{ loader: 'ts-loader' }],
                exclude: /node_modules/
            },
            {
                test: /\.node$/,
                use: [{ loader: 'node-loader' }]
            }
        ]
    },
    target: 'electron-main',
    node: {
        __dirname: false
    }
};

module.exports = [frontendConfig, backendConfig];
