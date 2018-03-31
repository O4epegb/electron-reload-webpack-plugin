import { server as electronConnectServer } from 'electron-connect';

const TARGET = {
    main: 'electron-main',
    renderer: 'electron-renderer'
};
const AVAILABLE_TARGETS = [TARGET.main, TARGET.renderer];

function createElectronReloadWebpackPlugin(options = {}) {
    let server = null;

    function restartOrReloadServer(targetType, server) {
        if (targetType === TARGET.main) {
            server.restart();
        } else {
            server.reload();
        }
    }

    function applyCompiler(userTargetType) {
        return {
            apply(compiler) {
                const configTarget = AVAILABLE_TARGETS.find(target => target === compiler.options.target);
                const targetType = userTargetType || configTarget || TARGET.main;

                compiler.hooks.done.tap('ElectronReloadWebpackPlugin', () => {
                    if (!server) {
                        server = electronConnectServer.create(options);
                        server.start();
                    } else {
                        restartOrReloadServer(targetType, server);
                    }
                });
            }
        };
    }

    return target => {
        if (target && !AVAILABLE_TARGETS.includes(target)) {
            console.log(
                `\nElectronReloadWebpackPlugin: Specified target should be one of "${AVAILABLE_TARGETS.join(
                    ' | '
                )}". You passed "${target}"`
            );
            console.log(`ElectronReloadWebpackPlugin: Using default target "${TARGET.main}"`);

            return applyCompiler(TARGET.main);
        } else {
            return applyCompiler();
        }
    };
}

export default createElectronReloadWebpackPlugin;
