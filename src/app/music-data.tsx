import YTMusic from "ytmusic-api";

import { env } from "~/env.mjs";

export async function MusicData() {
  const client = await new YTMusic().initialize();
  if (!client) throw new Error("invariant: client is falsy");
  const data = await client.getSong(env.RECENT_FAVOURITE_SONG_ID);
  const thumbnail = data.thumbnails
    .sort((a, b) => a.width - b.width)
    .find(value => value.width >= 72);
  return (
    <div className="recessed flex flex-row gap-3 rounded-[1.25rem] p-3">
      {/* eslint-disable-next-line @next/next/no-img-element -- lh3.googleusercontent.com is too large for us to allow */}
      <img src={thumbnail?.url} alt={data.name} className="h-18 w-18 rounded-[0.5rem] opacity-80" />
      <div className="flex min-w-0 flex-col">
        <div className="flex-grow text-xs font-light uppercase tracking-widest text-text-tertiary">
          Recent favourite
        </div>
        <div className="text-lg font-semibold">{data.name}</div>
        <div className="truncate text-sm text-text-secondary">
          {data.artists.map(artist => artist.name).join(" & ")}
        </div>
      </div>
    </div>
  );
}
