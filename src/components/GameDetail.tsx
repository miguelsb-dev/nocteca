import { useState } from "react";
import { renderMarkdown } from "../lib/markdown";
import type { Game } from "../lib/types";
import { Lightbox } from "./Lightbox";

type Props = {
  game: Game;
  canEdit: boolean;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export function GameDetail({ game, canEdit, onBack, onEdit, onDelete }: Props) {
  const [light, setLight] = useState<string | null>(null);
  const html = renderMarkdown(game.review ?? "");

  return (
    <article>
      <div className="toolbar" style={{ marginBottom: 24 }}>
        <button type="button" className="btn btn-ghost" onClick={onBack}>
          ← Biblioteca
        </button>
        {canEdit && (
          <>
            <button type="button" className="btn" onClick={onEdit}>
              Editar
            </button>
            <button type="button" className="btn" onClick={onDelete}>
              Borrar
            </button>
          </>
        )}
      </div>

      <div className="detail-layout">
        <div>
          <div className="detail-cover">
            {game.cover && <img src={game.cover} alt={game.title} />}
            {typeof game.score === "number" && (
              <span className="detail-score-badge">{game.score}</span>
            )}
          </div>
        </div>

        <div>
          <p className="page-kicker">{game.platform ?? "Juego"}</p>
          <h1 className="page-title">{game.title}</h1>

          <div className="detail-meta">
            {game.playedAt && <span>Jugado {game.playedAt}</span>}
            {game.placeholder && <span className="tag">Placeholder</span>}
            {game.tags?.map((t) => (
              <span className="tag" key={t}>
                {t}
              </span>
            ))}
          </div>

          {game.description && (
            <div className="detail-header-blurb">
              <p className="page-kicker">Encabezado</p>
              <p className="detail-header-text">{game.description}</p>
            </div>
          )}

          <div className="markdown" dangerouslySetInnerHTML={{ __html: html }} />

          {!!game.screenshots?.length && (
            <div className="shot-grid">
              {game.screenshots.map((src) => (
                <button type="button" className="shot-thumb" key={src} onClick={() => setLight(src)}>
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <Lightbox src={light} onClose={() => setLight(null)} />
    </article>
  );
}
