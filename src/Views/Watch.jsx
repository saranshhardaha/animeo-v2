import React, { useEffect, useState } from "react";
import { GetEpisodeDetails } from "../Utils/DBServices";
import { useParams } from "react-router-dom";
import VideoPlayer from "../Components/VideoPlayer";
import ReactPlayer from "react-player/lazy";

function Watch() {
  const { episodeID } = useParams();
  const [VideoOptions, setVideoOptions] = useState({
    autoplay: true,
    controls: true,
    sources: [
      {
        src: "https://playgo1.cc/embedplus?id=MTk3MzU1&token=YRx1CF1M4KczfHUDVJytUQ&expires=1675279249",
        type: "video/mp4",
      },
    ],
  });
  const [Response, setResponse] = useState({
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
  }, []);
  return (
    <>
      <div>
        <ReactPlayer
          playing={true}
          controls={true}
          url={VideoOptions.sources[0].src}
        />
      </div>
    </>
  );
}

export default Watch;
