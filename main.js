const url = require('url');
const ep = require('./src/ElectronPlus');
const {BrowserWindow, app} = require('electron');

let main;

// Set ElectronPLus ( Application Details )

// Your Main BrowserWindow
function createMainWindow() {
    main = new BrowserWindow({width: 1080, height: 720, show: false});
    main.loadURL(url.format({
        pathname: ep.view('main'),
        protocol: 'file:',
        slashes: true
    }));
    main.once('ready-to-show', () => {
        main.show()
    });
    main.on('closed', () => {
        app.quit()
    });
}

// Create the main window when ready
app.on('ready', createMainWindow)

// Some Support
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

// Some more support
app.on('activate', () => {
    if (main === null) {
        createMainWindow()
    }
});

// Cheeky Fixes
app.on('browser-window-created', (event,window) => {
    window.setMenu(null);
});
app.on('web-contents-created', (event, contents) => {
    contents.on('will-attach-webview', (event, webPreferences, params) => {
        delete webPreferences.preload;
        delete webPreferences.preloadURL;
        webPreferences.nodeIntegration = false;
        if (!params.src.startsWith('file://')) {
            event.preventDefault();
        }
    });
    // Remove Eval
    contents.executeJavaScript("window.eval = global.eval = function() {throw new Error('eval is not supported in this application');}");
});
