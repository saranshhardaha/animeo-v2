import React, { useEffect, useRef, useState } from "react";
import { AniSkip, Episode } from "../lib/types";
import Player from "@oplayer/core";
import ui from "@oplayer/ui";
import hls from "@oplayer/hls";
import { sourceUrlToName } from "../lib/helper";
// import { Highlight } from "@oplayer/ui/src/types";
import { skipOpEd } from "../lib/player/skip-op-ed";

export default function EnimePlayer(props: any) {
  const { sources, number, image, anime } = props.episode as Episode;
  const setting = props.setting;

  const [sourceIndex, setSourceIndex] = useState(0);

  const playerContainerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player>();

  const [source, setSource] = useState<any>(undefined);
  // const { data: source, error } = useSWR<Source>(enimeApi + `/source/${sources[sourceIndex].id}`, url => fetch(url, { cache: "no-store" }).then(res => res.json()));
  const poster = !image ? undefined : `https://images.weserv.nl/?url=${image}`;

  useEffect(() => {
    if (playerRef.current) return;
    //@ts-ignore
    playerRef.current = Player.make(playerContainerRef.current, {
      volume: setting?.volume * 0.01 || 1,
    })
      .use([
        skipOpEd(),
        ui({
          pictureInPicture: true,
          miniProgressBar: setting ? setting.miniProgressBar : true,
          subtitle: { fontSize: 30 },
          menu: [
            {
              name: "Source",
              children: sources?.map((source) => {
                return {
                  name: sourceUrlToName(source.url),
                  default: source?.url?.includes("gogoanime"),
                  value: source?.id,
                };
              }),
              onChange({ value }: any) {
                setSourceIndex(
                  sources?.findIndex((source) => source?.id === value)
                );
              },
            },
          ],
        }),
        hls(),
      ])
      .create()
      .on("error", ({ payload }) => {
        if (payload?.fatal) {
          setSourceIndex(sourceIndex + 1);
        }
      })
      .on("videosourcechanged", () => {
        
      });
  }, []);

  useEffect(() => {
    if (!sources) return;
    fetch(`https://api.enime.moe/source/${sources[sourceIndex].id}`)
      .then((res) => res.json())
      .then((res) => {
        fetch(
          `https://cdn.nade.me/generate?url=${encodeURIComponent(res.url)}`,
          {
            headers: {
              "x-origin": "none",
              "x-referer": "none",
              "user-agent":
                "Mozilla/5.0 (Linux; Android 10; SM-J810F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Mobile Safari/537.36",
            },
          }
        )
          .then((r) => r.text())
          .then((r) => {
            setSource({
              ...res,
              url: r,
            });
          });
      });
  }, [sourceIndex]);

  useEffect(() => {
    if (source) {
      //@ts-ignore
      playerRef.current
        .changeSource({
          src: source.url,
          ...(poster && {
            poster: poster,
          }),
        })
        .then(() => {
          if (anime.mappings.mal) {
            fetch(
              `https://api.aniskip.com/v2/skip-times/${anime.mappings.mal}/${number}?types=op&types=recap&types=mixed-op&types=ed&types=mixed-ed&episodeLength=0`
            )
              .then((res) => res.json())
              .then((res) => {
                res = res as AniSkip;

                // const highlights: Highlight[] = [];
                let opDuration = [],
                  edDuration = [];

                if (res.statusCode === 200) {
                  for (let result of res.results) {
                    if (result.skipType === "op" || result.skipType === "ed") {
                      const { startTime, endTime } = result.interval;

                      if (startTime) {
                        // highlights.push({
                        //   time: startTime,
                        //   text: result.skipType === "op" ? "OP" : "ED",
                        // });
                        if (result.skipType === "op")
                          opDuration.push(startTime);
                        else edDuration.push(startTime);
                      }

                      if (endTime) {
                        // highlights.push({
                        //   time: endTime,
                        //   text: result.skipType === "op" ? "OP" : "ED",
                        // });
                        if (result.skipType === "op") opDuration.push(endTime);
                        else edDuration.push(endTime);
                      }
                    }
                  }
                }

                //@ts-ignore
                playerRef.current.emit("opedchange", [opDuration, edDuration]);
                //@ts-ignore
                // playerRef.current.plugins.ui.highlight(highlights);
              });
          }

          if (source.subtitle) {
            //@ts-ignore
            playerRef.current.plugins.ui.subtitle.updateSource([
              {
                default: true,
                src: source.subtitle,
                name: "English",
              },
            ]);
          }
        });
    }
  }, [source]);

  return (
    <div className={props.className}>
      <div className="w-full h-full p-0 m-0" ref={playerContainerRef} />
    </div>
  );
}
