const path = require('path'), url = require('url')
const { ipcMain, ipcRenderer, remote, Menu } = require('electron')

let app = {
    ResponseChannel: ":response"
};
let configs = [];
let request = null;
let response = null;

class ElectronPlus {
    on(channel, callable) {
        if(callable instanceof Function) {
          ipcMain.on(channel, (event, arg) => {
              request = { channel:channel + app.ResponseChannel, event:event, argument:arg,
                response: function(data) {
                    request.event.sender.send(request.channel, data);
                }
            };
            callable(request);
          });
        }
    };

    send(win, channel, data) {
        win.webContents.send(channel, data)
    };

    view(view) {
        return path.join(__dirname, '../views/'+view+'.html');
    }
}
class ElectronPlusWeb {
    addConfig(name, obj) {
        configs[name] = obj;
    };

    getConfig(name) {
        return configs[name];
    };

    send(channel, data) {
        ipcRenderer.send(channel, data);
    }

    on(channel, callable) {
        if(callable instanceof Function) {
            let c = channel + app.ResponseChannel;
            ipcRenderer.on(c, (e, a) => {
                response = { channel:c, event:e, argument:a,
                    request: function(data, ch = null) {
                        if(ch === null) {
                            request.event.sender.send(request.channel, data);
                        } else {
                            ipcRenderer.send(ch, data);
                        }
                    }
                };
            callable(response);
          });
        }
    };
}

const ep = new ElectronPlus;
const epw = new ElectronPlusWeb;

module.exports = { app, ep, epw }