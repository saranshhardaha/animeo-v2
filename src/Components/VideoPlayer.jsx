import React from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

export default class VideoPlayer extends React.Component {
  // Instantiate a Video.js player when the component mounts
  componentDidMount() {
    this.player = videojs(this.videoNode, this.props, () => {
      videojs.log("onPlayerReady", this);
    });
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  render() {
    return (
      <div data-vjs-player>
        <video
          ref={(node) => (this.videoNode = node)}
          className="video-js"
        ></video>
      </div>
    );
  }
}
