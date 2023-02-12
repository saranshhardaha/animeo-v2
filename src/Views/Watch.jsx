import React, { useEffect, useState } from "react";
import { GetEpisodeDetails } from "Utils/DBServices";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/lazy";
import VideoPlayer  from "Components/VideoPlayer";

function Watch() {
  const { episodeID } = useParams();
  const [VideoOptions, setVideoOptions] = useState({
    autoplay: true,
    controls: true,
    sources: [
      {
        src: "https://playgo1.cc/embedplus?id=MTk3MzU1&token=YRx1CF1M4KczfHUDVJytUQ&expires=1675279249",
        type: "application/x-mpegURL",
      },
    ],
  });
  const [response, setResponse] = useState({
    sources: [
      { url: "String", type: "", isM3U8: "Boolean", quality: "String" },
    ],
    download: "String",
  });
  useEffect(() => {
    async function FetchResults() {
      let details = await GetEpisodeDetails(episodeID);
      details.sources.forEach((element) => {
        element.type = "application/x-mpegURL";
      });
      setResponse(details);
      setVideoOptions((VideoOptions) => ({
        ...VideoOptions,
        sources: details.sources,
      }));
    }
    FetchResults();
  }, [episodeID]);
  return (
    <>
      <div>
        <VideoPlayer
          src={VideoOptions.sources[0].src}
        />
      </div>
    </>
  );
}

export default Watch;
