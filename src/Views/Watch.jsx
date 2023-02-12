import VideoPlayer from "Components/VideoPlayer";
import React, { useEffect, useState } from "react";
import { GetEpisodeDetails } from "Utils/DBServices";
import { useParams } from "react-router-dom";
// import VideoPlayer  from "Components/VideoPlayer";

function Watch() {
  const { episodeID } = useParams();
  let [showVideo, setShowVideo] = useState(false);
  const [VideoOptions, setVideoOptions] = useState({
    sources: [],
  });

  useEffect(() => {
    async function FetchResults() {
      setShowVideo(false);
      let details = await GetEpisodeDetails(episodeID);
      details?.sources?.forEach((element) => {
        element.type = "application/x-mpegURL";
      });
      setVideoOptions({
        sources: details?.sources,
      });
      setShowVideo(true);
    }
    FetchResults();
  }, [episodeID]);
  return (
    <>
      <main className="min-h-screen pt-12">
        <div className="p-4 w-full h-full">
          <div className="h-full">
            {showVideo && <VideoPlayer sources={VideoOptions?.sources} />}
          </div>
        </div>
      </main>
    </>
  );
}

export default Watch;
