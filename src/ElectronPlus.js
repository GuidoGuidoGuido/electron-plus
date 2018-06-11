const path = require('path'), url = require('url')
const { ipcMain, remote, Menu } = require('electron')

let app = {
    ResponseChannel: ":response"
};
let request = null;

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
const ep = new ElectronPlus;

module.exports = ep;
