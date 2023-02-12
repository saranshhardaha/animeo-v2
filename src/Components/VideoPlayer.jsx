import React from "react";
import * as Icon from "react-feather";

export default function VideoPlayer({ sources }) {
  const videoControls = {
    isMute: false,
    isPlaying: true,
    isFullScreen: false,
  };
  const sourceList = sources;
  console.log(sources);
  const videoData = {
    duration: 0.0,
    currentDuration: 0.0,
  };
  return (
    <div className="relative h-full w-max video-js">
      <video
        id="my-video"
        className="video-js vjs-default-skin vjs-big-play-centered min-h-[420px]"
        controls={true}
        autoPlay={true}
        muted={true}
        preload="auto"
        data-setup="{}"
      >
        {sources?.map((x) => (
          <source key={x.quality} src={x?.url} type="application/x-mpegURL" />
        ))}
        <source
          src="https://wwwx11.gofcdn.com/videos/hls/W6dO87EFHD9L97dvnVoaFw/1676223417/193470/f5bc111e65c74a37fe6fc136766c7b24/ep.1.1665279843.480.m3u8"
          type="application/x-mpegURL"
        />
      </video>

      <div className="hidden absolute bottom-0 left-0 w-full flex-col">
        <div className="flex justify-between px-4">
          <div className="flex gap-1">
            {videoControls.isPlaying ? (
              <Icon.Pause size={18} />
            ) : (
              <Icon.Play size={18} />
            )}
            <p>{videoData.currentLength}</p>
          </div>
          <div className="flex gap-2">
            {videoControls.isMute ? (
              <Icon.VolumeX size={18} />
            ) : (
              <Icon.Volume size={18} />
            )}
            {videoControls.isFullScreen ? (
              <Icon.Minimize size={18} />
            ) : (
              <Icon.Maximize size={18} />
            )}
            <Icon.MoreVertical size={18} />
          </div>
        </div>
      </div>
    </div>
  );
}
