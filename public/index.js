const {ipcRenderer} = window.require('electron');
const Store = window.require('electron-store');
const webview = document.getElementById('web-view');
const store = new Store();

function toggleSimplePlayerModeOn() {
  // Controls Container
  webview.insertCSS('div[class^="PlayerControls-controls"]{ flex-direction: column; }');
  webview.insertCSS('div[class^="PlayerControls-buttonGroup"]{ width: 100%; }');
  webview.insertCSS('div[class^="ControlsContainer-controlsContainer"]{ min-width: 150px; }');

  // Left Controls
  webview.insertCSS('div[class^="PlayerControls-buttonGroupLeft"]{ display: none !important; }');
  webview.insertCSS('div[class^="PlayerControls-balanceLeft"]{ padding: none; }');

  // Center Controls
  webview.insertCSS('div[class^="PlayerControls-buttonGroupCenter"]{ flex: 1; }');
  webview.insertCSS('div[class^="PlayerControls-buttonGroupCenter"]{ margin: 0 !important; }');

  // Right Controls
  webview.insertCSS('div[class^="PlayerControls-buttonGroupRight"]{ flex: 1; }');
  webview.insertCSS('div[class^="PlayerControls-buttonGroupRight"]{ justify-content: center; }');
  webview.insertCSS('div[class^="PlayerControls-buttonGroupRight"]{ margin: 0; }');
  webview.insertCSS('div[class^="PlayerControls-buttonGroupRight"]{ padding: 0; }');

  // Volume Control
  webview.insertCSS('div[class^="PlayerControls-volumeSlider"]{ display: none !important; }');

  // Search
  webview.insertCSS('div[class^="QuickSearch-container"]{ width: calc(100% - 100px); }');
  webview.insertCSS('div[class^="QuickSearch-container"]{ display: block; }');

  // Navbar
  webview.insertCSS('div[class^="NavBar-left"]{ width: 100%; padding-right: 10px; }');
  webview.insertCSS('div[class^="NavBar-right"]{ display: none !important; }');
}

function toggleSimplePlayerModeOff() {
  // Controls Container
  webview.insertCSS('div[class^="PlayerControls-controls"]{ flex-direction: row }');
  webview.insertCSS('div[class^="ControlsContainer-controlsContainer"]{ min-width: 640px; }');

  // Left Controls
  webview.insertCSS('div[class^="PlayerControls-buttonGroupLeft"]{ display: flex !important; }');
  webview.insertCSS('div[class^="PlayerControls-balanceLeft"]{ padding-left: 35px; }');

  // Volume Control
  webview.insertCSS('div[class^="PlayerControls-volumeSlider"]{ display: flex !important; }');

  // Navbar
  webview.insertCSS('div[class^="NavBar-right"]{ display: flex !important; }');
}

webview.addEventListener('dom-ready', function () {
  if (store.get('simplePlayerMode')) {
    toggleSimplePlayerModeOn();
  }
});

ipcRenderer.on('simple-player-mode', () => {
  const simplePlayerModeEnabled = !store.get('simplePlayerMode');
  store.set('simplePlayerMode', simplePlayerModeEnabled);

  simplePlayerModeEnabled ? toggleSimplePlayerModeOn() : toggleSimplePlayerModeOff();
});

ipcRenderer.on('back', () => {
  webview.goBack();
});

ipcRenderer.on('forward', () => {
  webview.goForward();
});

ipcRenderer.on('play-pause', () => {
  webview.sendInputEvent({type: 'keyDown', keyCode: 'Space'});
});

ipcRenderer.on('pause', () => {
  if (webview.isCurrentlyAudible()) {
    webview.sendInputEvent({type: 'keyDown', keyCode: 'Space'});
  }
});

ipcRenderer.on('next', () => {
  webview.sendInputEvent({type: 'keyDown', keyCode: 'Right'});
});

ipcRenderer.on('previous', () => {
  webview.sendInputEvent({type: 'keyDown', keyCode: 'Left'});
});
