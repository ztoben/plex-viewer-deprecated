const electron = require('electron');
const app = electron.app;
const globalShortcut = electron.globalShortcut;
const BrowserWindow = electron.BrowserWindow;
const isDev = require('electron-is-dev');
const windowStateKeeper = require('electron-window-state');

const path = require('path');
const url = require('url');

let mainWindow;
let frame = true;
let mainWindowState = null;

function createWindow() {
    if (!mainWindowState) {
        mainWindowState = windowStateKeeper({
            defaultWidth: 600,
            defaultHeight: 500
        });
    }

    mainWindow = new BrowserWindow({
        alwaysOnTop: true,
        'x': mainWindowState.x,
        'y': mainWindowState.y,
        'width': mainWindowState.width,
        'height': mainWindowState.height,
        frame
    });

    mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
    mainWindow.setMenu(null);
    mainWindowState.manage(mainWindow);
}

function removeFrame() {
    frame = !frame;

    let currentWindowId = mainWindow.id;

    createWindow();

    BrowserWindow.fromId(currentWindowId).close();
}

app.on('ready', () => {
    globalShortcut.register('Shift+Control+X', () => {
        mainWindow.isMinimized() ? mainWindow.restore() : mainWindow.minimize();
    });

    globalShortcut.register('Shift+Control+Z', () => {
        removeFrame();
    });

    createWindow();
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