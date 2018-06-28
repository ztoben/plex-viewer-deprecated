import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const {ipcRenderer} = window.require('electron');

ipcRenderer.on('play-pause', () => {
  console.log('play/pause');
});

ipcRenderer.on('next', () => {
  console.log('next');
});

ipcRenderer.on('previous', () => {
  console.log('previous');
});

ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
