import { ISource } from "@consumet/extensions";
import React from "react";
type Props = {
  sources: ISource | null
}
export default function VideoPlayer({ sources }: Props) {
  return (
    <div className="relative h-full w-full video-js">
      {sources && (
        <video
          id="my-video"
          className="video-js vjs-default-skin vjs-big-play-centered h-full w-full"
          controls
          preload="auto"
          autoPlay={true}
          muted={false}
          data-setup='{"fluid":true}'
        >
          {sources?.sources?.map((x: any) => (
            <source key={x.quality} src={x.url} type="application/x-mpegURL" />
          ))}

          <p className="vjs-no-js">
            To view this video please enable JavaScript, and consider upgrading
            to a web browser that
            <a
              href="https://videojs.com/html5-video-support/"
              rel="noreferrer"
              target="_blank"
            >
              supports HTML5 video
            </a>
          </p>
        </video>
      )}

      {/* <div className="hidden absolute bottom-0 left-0 w-full flex-col">
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
      </div> */}
    </div>
  );
}
