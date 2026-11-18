import type { CSSProperties } from "react";
import { stripScoreMentions } from "../lib/text";
import type { Game } from "../lib/types";

type Props = {
  game: Game | null;
  visible: boolean;
  style?: CSSProperties;
};

/** Encabezado bajo el juego activo; la portada la muestra el estuche 3D. */
export function PreviewCard({ game, visible, style }: Props) {
  if (!game) return null;
  const blurb = game.description ? stripScoreMentions(game.description) : "";

  return (
    <aside
      className={`preview-blurb${visible ? " visible" : ""}`}
      style={style}
      aria-hidden={!visible}
    >
      <h3>{game.title}</h3>
      {blurb && <p>{blurb}</p>}
    </aside>
  );
}
