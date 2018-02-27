import React, { Component } from 'react';
import WebView from './WebView';
import './App.css';
 
class App extends Component {
  render() {
    return (
      <div className="App">
        <WebView src="https://app.plex.tv/desktop" />
      </div>
    );
  }
}

export default App;
