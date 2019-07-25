import React, {Component} from 'react';

class WebView extends Component {
  render() {
    const {src} = this.props;

    return (
      <webview
        src={src}
        autosize="on"
        id="web-view"
        nodeintegration
      />
    );
  }
}

export default WebView;
