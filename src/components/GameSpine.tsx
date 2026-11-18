import { useRef } from "react";
import { assetUrl } from "../lib/assets";
import type { Game } from "../lib/types";

type Props = {
  game: Game;
  active: boolean;
  onEnter: (el: HTMLElement) => void;
  onLeave: () => void;
  onClick: () => void;
};

/** Etiqueta de lomo: la franquicia va siempre primero. */
function spineLabel(title: string): string {
  let t = title
    .replace(/^The Legend of Zelda:\s*/i, "Zelda: ")
    .replace(/^Final Fantasy VII Crisis Core:.*/i, "Final Fantasy Crisis Core")
    .replace(/^Ratchet & Clank:\s*/i, "Ratchet: ")
    .replace(/^Metal Gear Rising:.*/i, "Metal Gear Rising")
    .replace(/\s*\/\s*.+$/, "")
    .replace(/\s*\+\s*.+$/, "")
    .replace(/\s+/g, " ")
    .trim();
  if (t.length > 22) t = `${t.slice(0, 21).trimEnd()}…`;
  return t;
}

export function GameSpine({ game, active, onEnter, onLeave, onClick }: Props) {
  const slotRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={slotRef}
      className={`book-slot${active ? " is-active" : ""}`}
      onMouseEnter={() => {
        if (slotRef.current) onEnter(slotRef.current);
      }}
      onMouseLeave={onLeave}
    >
      <button
        type="button"
        className="book"
        aria-label={game.title}
        onFocus={() => {
          if (slotRef.current) onEnter(slotRef.current);
        }}
        onBlur={onLeave}
        onClick={onClick}
      >
        <span className="book-face book-spine">
          {game.cover && (
            <span className="book-spine-art" aria-hidden>
              <img src={assetUrl(game.cover)} alt="" draggable={false} />
            </span>
          )}
          <span className="book-spine-shade" aria-hidden />
          <span className="book-spine-accent" aria-hidden />
          <span className="book-spine-title">
            <span>{spineLabel(game.title)}</span>
          </span>
          {typeof game.score === "number" && (
            <span className="book-spine-score">{game.score}</span>
          )}
        </span>

        <span className="book-face book-cover">
          {game.cover ? (
            <img src={assetUrl(game.cover)} alt="" draggable={false} />
          ) : (
            <span className="book-cover-fallback">{game.title}</span>
          )}
          {typeof game.score === "number" && (
            <span className="book-cover-score">{game.score}</span>
          )}
        </span>

        <span className="book-face book-pages" aria-hidden />
        <span className="book-face book-top" aria-hidden />
        <span className="book-face book-bottom" aria-hidden />
      </button>
    </div>
  );
}
