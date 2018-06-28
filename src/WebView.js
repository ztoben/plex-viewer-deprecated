import React, {Component} from 'react';

class WebView extends Component {
  render() {
    return (
      <webview
        src="https://app.plex.tv/desktop"
        autosize="on"
        id="web-view"
        nodeintegration
      />
    );
  }
}

export default WebView;
