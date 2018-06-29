const {app, globalShortcut, BrowserWindow, Tray} = require('electron');
const isDev = require('electron-is-dev');
const windowStateKeeper = require('electron-window-state');
const Store = require('electron-store');
const platform = require('electron-platform');
const path = require('path');

require('electron-debug')();

const store = new Store();

let mainWindow;
let tray = null;
let mainWindowState = null;

// Don't show the app in the dock on osx
if (platform.isDarwin) {
  app.dock.hide();
}

function initStore() {
  if (!store.has('plexWebLeftPanelHidden')) {
    store.set('plexWebLeftPanelHidden', true);
  }

  if (!store.has('simplePlayerMode')) {
    store.set('simplePlayerMode', false);
  }

  if (!store.has('windowChromeHidden')) {
    store.set('windowChromeHidden', false);
  }
}

function createWindow() {
  if (!mainWindowState) {
    mainWindowState = windowStateKeeper({
      defaultWidth: 600,
      defaultHeight: 500
    });

    manageWindow();
  } else {
    manageWindow();
  }
}

function manageWindow() {
  mainWindow = new BrowserWindow({
    alwaysOnTop: true,
    'x': mainWindowState.x,
    'y': mainWindowState.y,
    'width': mainWindowState.width,
    'height': mainWindowState.height,
    frame: !store.get('windowChromeHidden'),
    skipTaskbar: true // Don't show app in the taskbar on windows
  });
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  mainWindow.setMenu(null);
  mainWindowState.manage(mainWindow);
}

function removeFrame() {
  store.set('windowChromeHidden', !store.get('windowChromeHidden'));

  let currentWindowId = mainWindow.id;

  createWindow();

  BrowserWindow.fromId(currentWindowId).close();
}

function toggleWindow() {
  if (mainWindow.isVisible()) {
    mainWindow.hide();
  } else {
    mainWindow.show();
    mainWindow.focus();
  }
}

function registerShortcuts() {
  globalShortcut.register('Shift+Control+X', () => {
    toggleWindow();
  });

  globalShortcut.register('Shift+Control+Z', () => {
    removeFrame();
  });

  globalShortcut.register('Shift+Control+H', () => {
    mainWindow.webContents.send('toggle-left-menu');
  });

  globalShortcut.register('medianexttrack', function () {
    mainWindow.webContents.send('next');
  });

  globalShortcut.register('mediaplaypause', function () {
    mainWindow.webContents.send('play-pause');
  });

  globalShortcut.register('mediaprevioustrack', function () {
    mainWindow.webContents.send('previous');
  });

  globalShortcut.register('Shift+Control+Left', function () {
    mainWindow.webContents.send('back');
  });

  globalShortcut.register('Shift+Control+Right', function () {
    mainWindow.webContents.send('forward');
  });

  globalShortcut.register('Shift+Control+>', function () {
    mainWindow.webContents.send('next');
  });

  globalShortcut.register('Shift+Control+<', function () {
    mainWindow.webContents.send('previous');
  });

  globalShortcut.register('Shift+Control+M', function () {
    mainWindow.webContents.send('simple-player-mode');
  });
}

function buildTray() {
  tray = new Tray(path.join(__dirname, 'tray-icon.png'));
  tray.setToolTip('plex-viewer');
  tray.on('double-click', toggleWindow);
}

app.on('ready', () => {
  initStore();
  buildTray();
  registerShortcuts();
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
