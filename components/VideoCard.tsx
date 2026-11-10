"use client";

import { useState } from "react";
import Image from "next/image";

interface VideoCardProps {
  youtubeId: string;
  title: string;
  poster?: string | null;
  posterPosition?: "top" | "center" | "bottom";
}

const POSITION_CLASS = {
  top: "object-top",
  center: "object-center",
  bottom: "object-bottom",
};

export default function VideoCard({
  youtubeId,
  title,
  poster,
  posterPosition = "center",
}: VideoCardProps) {
  const [activated, setActivated] = useState(false);

  const fallbackPoster = `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;
  const posterSrc = poster ?? fallbackPoster;
  const isLocalPoster = Boolean(poster);
  const positionClass = POSITION_CLASS[posterPosition];

  if (activated) {
    return (
      <div className="relative w-full aspect-video overflow-hidden rounded-lg border border-foreground/10 bg-black">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setActivated(true)}
      aria-label={`Lire la vidéo : ${title}`}
      className="group relative block w-full aspect-video overflow-hidden rounded-lg border border-foreground/10 bg-black cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      {isLocalPoster ? (
        <Image
          src={posterSrc}
          alt=""
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className={`object-cover ${positionClass} transition-transform duration-500 group-hover:scale-[1.02]`}
          priority={false}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={posterSrc}
          alt=""
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover ${positionClass} transition-transform duration-500 group-hover:scale-[1.02]`}
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-lg transition-transform duration-300 group-hover:scale-110">
          <svg
            viewBox="0 0 24 24"
            className="ml-1 h-7 w-7 fill-black"
            aria-hidden="true"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </div>
    </button>
  );
}
