const electron = require('electron');
const app = electron.app;
const globalShortcut = electron.globalShortcut;
const BrowserWindow = electron.BrowserWindow;
const isDev = require('electron-is-dev');
const windowStateKeeper = require('electron-window-state');

const path = require('path');
const url = require('url');

let mainWindow;

function createWindow() {
    let mainWindowState = windowStateKeeper({
        defaultWidth: 600,
        defaultHeight: 500
    });

    mainWindow = new BrowserWindow({
        alwaysOnTop: true,
        'x': mainWindowState.x,
        'y': mainWindowState.y,
        'width': mainWindowState.width,
        'height': mainWindowState.height
    });

    mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
    // mainWindow.webContents.openDevTools();
    mainWindow.setMenu(null);
    mainWindow.on('closed', function () {
        mainWindow = null
    });

    mainWindowState.manage(mainWindow);
}

app.on('ready', () => {
    createWindow();

    globalShortcut.register('Shift+Control+X', () => {
        mainWindow.isMinimized() ? mainWindow.restore() : mainWindow.minimize();
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
});