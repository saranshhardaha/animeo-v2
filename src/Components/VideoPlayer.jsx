import React, { useEffect } from "react";
import fluidPlayer from "fluid-player";
import "fluid-player/src/css/fluidplayer.css";

export default function VideoPlayer() {
  const player = fluidPlayer("#example-player");

  

  return (
    <div className="App">
      <h1>fluidPlayer</h1>
      <video id="example-player">
        <source
          src="https://media.w3.org/2010/05/sintel/trailer.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  );
}
