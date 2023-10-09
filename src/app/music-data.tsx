import { PlayCircle } from "lucide-react";
import YTMusic from "ytmusic-api";

import { env } from "~/env.mjs";

import { MetadataCard } from "./metadata-card";

export async function MusicData() {
  const client = await new YTMusic().initialize();
  if (!client) throw new Error("invariant: client is falsy");
  const data = await client.getSong(env.RECENT_FAVOURITE_SONG_ID);
  const thumbnail = data.thumbnails
    .sort((a, b) => a.width - b.width)
    .find(value => value.width >= 72);
  return (
    <MetadataCard
      left={
        // eslint-disable-next-line @next/next/no-img-element -- lh3.googleusercontent.com is too large for us to allow
        <img
          src={thumbnail?.url}
          alt={data.name}
          className="h-18 w-18 rounded-[0.5rem] opacity-80"
        />
      }
      right={
        <>
          <div className="text-lg font-semibold">{data.name}</div>
          <div className="truncate text-sm text-text-secondary">
            {data.artists.map(artist => artist.name).join(" & ")}
          </div>
        </>
      }
      title="Recent favourite"
      icon={PlayCircle}
      href={`https://music.youtube.com/watch?v=${env.RECENT_FAVOURITE_SONG_ID}`}
    />
  );
}
