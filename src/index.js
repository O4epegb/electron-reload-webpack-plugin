import { server as electronConnectServer } from 'electron-connect';

class ElectronReloadWebpackPlugin {
    constructor(options) {
        this.options = options;
    }

    apply(compiler) {
        let server;

        compiler.hooks.done.tap('ElectronReloadWebpackPlugin', () => {
            if (!server) {
                server = electronConnectServer.create(this.options);
                server.start();
            } else {
                server.restart();
            }
        });
    }
}

export default ElectronReloadWebpackPlugin;
