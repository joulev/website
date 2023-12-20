import { type EnrichedTweet, enrichTweet } from "react-tweet";
import { getTweet } from "react-tweet/api";

import { ExternalLink, Heart, MessageCircle, Reply, Twitter } from "~/components/icons";
import { Card } from "~/components/ui/card";
import { Link } from "~/components/ui/link";
import { cn } from "~/lib/cn";

import { LinkButton } from "./button";

function TweetContainer({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("not-prose", className)}>
      <Card className="mx-auto flex max-w-lg flex-col gap-6">{children}</Card>
    </div>
  );
}

function TweetHeader({ tweet }: { tweet: EnrichedTweet }) {
  const { user } = tweet;

  return (
    <div className="flex flex-row gap-3">
      <Link href={user.url} unstyled className="shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element -- It's ok */}
        <img
          src={user.profile_image_url_https}
          alt={user.name}
          width={48}
          height={48}
          className="rounded-full"
        />
      </Link>
      <div className="flex min-w-0 flex-grow flex-col items-start">
        <Link href={user.url} unstyled className="max-w-full truncate font-bold text-text-primary">
          {user.name}
        </Link>
        <div className="flex max-w-full flex-row items-baseline gap-1.5 text-sm text-text-secondary">
          <Link href={user.url} unstyled className="truncate underline-offset-4 hover:underline">
            @{user.screen_name}
          </Link>
          <span className="cursor-default select-none max-sm:hidden">•</span>
          <Link
            href={tweet.url}
            unstyled
            className="whitespace-nowrap underline-offset-4 hover:underline max-sm:hidden"
          >
            {new Date(tweet.created_at).toLocaleDateString("en-GB", {
              year: "2-digit",
              month: "short",
              day: "numeric",
            })}
          </Link>
        </div>
      </div>
      <div className="ml-3">
        <Link
          href={tweet.url}
          unstyled
          title="It's called Twitter!"
          className="text-text-secondary transition hover:text-text-primary"
        >
          <Twitter />
        </Link>
      </div>
    </div>
  );
}

function TweetInReplyTo({ tweet }: { tweet: EnrichedTweet }) {
  if (!tweet.in_reply_to_url) return null;
  return (
    <div className="text-sm text-text-secondary">
      <Reply className="inline-block size-4" /> Replying to{" "}
      <Link
        href={tweet.in_reply_to_url}
        className="text-text-primary underline-offset-4 hover:underline"
        unstyled
      >
        @{tweet.in_reply_to_screen_name}
      </Link>
    </div>
  );
}

function TweetBody({ tweet }: { tweet: EnrichedTweet }) {
  return (
    <div className="prose">
      {tweet.entities.map((item, i) => {
        switch (item.type) {
          case "hashtag":
          case "mention":
          case "url":
          case "symbol":
            return (
              <Link key={i} href={item.href}>
                {item.text}
              </Link>
            );
          case "media":
            // Media text is currently never displayed, some tweets however might have indices
            // that do match `display_text_range` so for those cases we ignore the content.
            return;
          default:
            // We use `dangerouslySetInnerHTML` to preserve the text encoding.
            // https://github.com/vercel-labs/react-tweet/issues/29
            return (
              <span
                key={i}
                className="whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: item.text }}
              />
            );
        }
      })}
    </div>
  );
}

function TweetActions({ tweet }: { tweet: EnrichedTweet }) {
  return (
    <div className="flex flex-row flex-wrap gap-3">
      <LinkButton href={tweet.like_url} variants={{ size: "icon-sm" }}>
        <Heart />
      </LinkButton>
      <LinkButton href={tweet.reply_url} variants={{ size: "icon-sm" }}>
        <MessageCircle />
      </LinkButton>
      <LinkButton href={tweet.url} variants={{ size: "sm" }}>
        <ExternalLink /> Go to tweet
      </LinkButton>
    </div>
  );
}

export async function Tweet({ id, className }: { id: string; className?: string }) {
  const rawTweet = await getTweet(id);
  if (!rawTweet) throw new Error("Tweet not found");
  const tweet = enrichTweet(rawTweet);
  return (
    <TweetContainer className={className}>
      <TweetHeader tweet={tweet} />
      <TweetInReplyTo tweet={tweet} />
      <TweetBody tweet={tweet} />
      {/* TODO: Add when we need it */}
      {/* Refer to https://github.com/vercel/react-tweet/blob/main/packages/react-tweet/src/twitter-theme/embedded-tweet.tsx */}
      {/* <TweetMedia tweet={tweet} /> */}
      {/* <QuotedTweet tweet={tweet.quoted_tweet} />*/}
      <TweetActions tweet={tweet} />
    </TweetContainer>
  );
}
