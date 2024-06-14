import YTMusic from "ytmusic-api";

import { PlayCircle } from "~/components/icons";
import { env } from "~/env.mjs";

import { MetadataCard } from "./metadata-card";

export async function MusicData() {
  const client = await new YTMusic().initialize();
  if (!client) throw new Error("invariant: client is falsy");
  const song = await client.getPlaylistVideos(env.RECENT_FAVOURITE_PLAYLIST_ID).then(a => a.at(-1));
  if (!song) throw new Error("invariant: song is falsy");
  const thumbnail = song.thumbnails
    .sort((a, b) => a.width - b.width)
    .find(value => value.width >= 72);
  return (
    <MetadataCard
      left={
        <img src={thumbnail?.url} alt={song.name} className="size-18 rounded-[0.5rem] opacity-80" />
      }
      right={
        <dl>
          <dt className="sr-only">Song name</dt>
          <dd className="truncate text-lg font-semibold">{song.name}</dd>
          <dt className="sr-only">Artist</dt>
          <dd className="truncate text-sm text-text-secondary">{song.artist.name}</dd>
        </dl>
      }
      title="Recent favourite"
      icon={PlayCircle}
      href={`https://music.youtube.com/watch?v=${song.videoId}`}
    />
  );
}
