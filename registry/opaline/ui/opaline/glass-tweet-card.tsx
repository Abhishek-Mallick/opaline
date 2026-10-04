"use client"

import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  BubbleChatIcon,
  ChartColumnIcon,
  FavouriteIcon,
  RepeatIcon,
} from "@hugeicons/core-free-icons"

import { cn } from "@/lib/utils"
import { LiquidGlass } from "@/registry/opaline/ui/opaline/liquid-glass"

type TweetAuthor = {
  name: string
  /** Without the @. */
  handle: string
  /** Avatar image URL. */
  avatar?: string
  verified?: boolean
}

type TweetStats = { replies?: number; reposts?: number; likes?: number; views?: number }

const compact = (n: number) =>
  new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(n)

/** Turns @mentions, #hashtags and links into styled links. */
function renderText(text: string) {
  return text.split(/(@\w+|#\w+|https?:\/\/\S+)/g).map((part, i) => {
    if (/^@\w+$/.test(part))
      return (
        <a key={i} href={`https://x.com/${part.slice(1)}`} className="text-[oklch(0.62_0.17_240)] hover:underline">
          {part}
        </a>
      )
    if (/^#\w+$/.test(part))
      return (
        <a key={i} href={`https://x.com/hashtag/${part.slice(1)}`} className="text-[oklch(0.62_0.17_240)] hover:underline">
          {part}
        </a>
      )
    if (/^https?:\/\//.test(part))
      return (
        <a key={i} href={part} className="text-[oklch(0.62_0.17_240)] hover:underline" target="_blank" rel="noreferrer">
          {part.replace(/^https?:\/\/(www\.)?/, "").slice(0, 28)}
          {part.replace(/^https?:\/\/(www\.)?/, "").length > 28 ? "…" : ""}
        </a>
      )
    return <React.Fragment key={i}>{part}</React.Fragment>
  })
}

function VerifiedBadge() {
  return (
    <svg viewBox="0 0 22 22" className="size-[17px] shrink-0" aria-label="Verified">
      <path
        fill="#1d9bf0"
        d="M20.4 11c0-1.3-.8-2.4-2-2.9.5-1.2.2-2.6-.7-3.5-.9-.9-2.3-1.2-3.5-.7C13.6 2.7 12.4 1.9 11 1.9S8.4 2.7 7.9 3.9c-1.2-.5-2.6-.2-3.5.7-.9.9-1.2 2.3-.7 3.5C2.5 8.6 1.7 9.7 1.7 11s.8 2.4 2 2.9c-.5 1.2-.2 2.6.7 3.5.9.9 2.3 1.2 3.5.7.5 1.2 1.7 2 3.1 2s2.6-.8 3.1-2c1.2.5 2.6.2 3.5-.7.9-.9 1.2-2.3.7-3.5 1.2-.5 2.1-1.6 2.1-2.9Z"
      />
      <path fill="#fff" d="m9.6 14.6-3.2-3.2 1.3-1.3 1.9 1.9 4.9-5 1.3 1.4-6.2 6.2Z" />
    </svg>
  )
}

/**
 * A post from X on frosted glass: author, rich text with links, media, and
 * a stats row with a like you can tap. Pass the data you already have, e.g.
 * from `react-tweet`'s `getTweet()` or your own API.
 */
function GlassTweetCard({
  author,
  content,
  media = [],
  date,
  stats = {},
  url,
  className,
  ...props
}: Omit<React.ComponentProps<typeof LiquidGlass>, "content"> & {
  author: TweetAuthor
  content: string
  /** Image URLs, up to four. */
  media?: string[]
  date?: Date | string
  stats?: TweetStats
  /** Link to the post. */
  url?: string
}) {
  const [liked, setLiked] = React.useState(false)
  const [pop, setPop] = React.useState(0)
  const when = date ? new Date(date) : null
  const pics = media.slice(0, 4)

  return (
    <LiquidGlass
      data-slot="glass-tweet-card"
      variant="frosted"
      className={cn(
        "flex w-full max-w-[420px] flex-col gap-3 rounded-[26px] p-4 text-(--glass-foreground)",
        className
      )}
      {...props}
    >
      <div className="flex items-start gap-3">
        <span className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-full bg-(--glass-highlight) text-[15px] font-semibold ring-1 ring-white/30">
          {author.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={author.avatar} alt="" className="size-full object-cover" />
          ) : (
            author.name.slice(0, 1)
          )}
        </span>
        <div className="min-w-0 flex-1 leading-tight">
          <div className="flex items-center gap-1">
            <span className="truncate text-[15px] font-semibold tracking-[-0.01em]">{author.name}</span>
            {author.verified ? <VerifiedBadge /> : null}
          </div>
          <span className="text-[13.5px] opacity-55">@{author.handle}</span>
        </div>
        <a
          href={url ?? `https://x.com/${author.handle}`}
          target="_blank"
          rel="noreferrer"
          aria-label="View on X"
          className="grid size-8 shrink-0 place-items-center rounded-full opacity-80 transition-[background-color,opacity] hover:bg-(--glass-highlight) hover:opacity-100"
        >
          <svg viewBox="0 0 24 24" className="size-[18px]" aria-hidden>
            <path
              fill="currentColor"
              d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.77L17.75 3Zm-1.08 16.17h1.7L7.4 4.74H5.58l11.09 14.43Z"
            />
          </svg>
        </a>
      </div>

      <p className="text-[15px] leading-[1.45] tracking-[-0.005em] break-words whitespace-pre-wrap">
        {renderText(content)}
      </p>

      {pics.length ? (
        <div
          className={cn(
            "grid gap-1 overflow-hidden rounded-[18px] ring-1 ring-black/5",
            pics.length > 1 && "grid-cols-2",
            pics.length > 2 ? "aspect-[16/10]" : pics.length === 2 ? "aspect-[16/9]" : ""
          )}
        >
          {pics.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={src}
              alt=""
              className={cn("size-full object-cover", pics.length === 3 && i === 0 && "row-span-2")}
            />
          ))}
        </div>
      ) : null}

      {when ? (
        <time dateTime={when.toISOString()} className="text-[13px] opacity-55">
          {new Intl.DateTimeFormat("en", { hour: "numeric", minute: "2-digit" }).format(when)} ·{" "}
          {new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(when)}
        </time>
      ) : null}

      <div className="flex items-center justify-between border-t border-current/10 pt-2 text-[13px] [&_svg]:size-[18px]">
        <Stat icon={BubbleChatIcon} label="Replies" value={stats.replies} />
        <Stat icon={RepeatIcon} label="Reposts" value={stats.reposts} />
        <button
          type="button"
          aria-pressed={liked}
          aria-label={liked ? "Unlike" : "Like"}
          onClick={() => {
            setLiked((l) => !l)
            setPop((p) => p + 1)
          }}
          className={cn(
            "flex cursor-pointer items-center gap-1.5 rounded-full px-2 py-1.5 transition-colors outline-none hover:bg-[oklch(0.65_0.22_10/0.12)] hover:text-[oklch(0.62_0.22_10)] focus-visible:ring-2 focus-visible:ring-ring/40",
            liked ? "text-[oklch(0.62_0.22_10)]" : "opacity-70"
          )}
        >
          <span
            key={pop}
            className={cn(pop > 0 && "motion-safe:animate-[opaline-pop_420ms_cubic-bezier(0.34,1.56,0.64,1)]")}
          >
            <HugeiconsIcon icon={FavouriteIcon} fill={liked ? "currentColor" : "none"} />
          </span>
          {stats.likes !== undefined ? (
            <span className="tabular-nums">{compact(stats.likes + (liked ? 1 : 0))}</span>
          ) : null}
        </button>
        <Stat icon={ChartColumnIcon} label="Views" value={stats.views} />
      </div>
    </LiquidGlass>
  )
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ComponentProps<typeof HugeiconsIcon>["icon"]
  label: string
  value?: number
}) {
  return (
    <span className="flex items-center gap-1.5 px-2 py-1.5 opacity-70" aria-label={value !== undefined ? `${value} ${label}` : label}>
      <HugeiconsIcon icon={icon} />
      {value !== undefined ? <span className="tabular-nums">{compact(value)}</span> : null}
    </span>
  )
}

export { GlassTweetCard, type TweetAuthor, type TweetStats }
