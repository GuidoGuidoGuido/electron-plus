const path = require('path'), url = require('url')
const { ipcMain, remote, Menu } = require('electron')

let app = {};
let ipcObj = null;
class ElectronPlus {

  constructor() {
      
  }

  setMenu(menu) {

  }

  on(channel, callable) {
      if(callable instanceof Function) {
          ipcMain.on(channel, (event, arg) => {
              channel = channel + ResponseChannel;
              ipcObj = { c:channel, e:event, a:arg };
              callable()
          });
      }
  };

  res(data) {
      ipcObj.e.sender.send(ipcObj.c, data)
  };

  resClear() {
      ipcObj = null;
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
