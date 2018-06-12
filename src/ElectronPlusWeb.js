const ep = require('./src/ElectronPlus');
const {ipcRenderer} = require('electron')
let configs = [];
class ElectronPlusWeb {
    addConfig(name, obj) {
        configs[name] = obj;
    };

    getConfig(name) {
        return configs[name];
    };

    on(channel, callable) {
        if(callable instanceof Function) {
            let c = channel + ep.app.ResponseChannel;
            ipcRenderer.on(c, (e, a) => {
                response = { channel:c, event:e, argument:a,
                    response: function(data) {
                        response.event.sender.send(channel, data);
                    }
                };
            callable(response);
          });
        }
    };
}
const epw = new ElectronPlusWeb;
module.exports = epw;
