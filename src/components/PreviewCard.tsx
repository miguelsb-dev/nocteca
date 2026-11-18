import type { CSSProperties } from "react";
import type { Game } from "../lib/types";

type Props = {
  game: Game | null;
  visible: boolean;
  style?: CSSProperties;
};

/** Encabezado bajo el juego activo; la portada la muestra el estuche 3D. */
export function PreviewCard({ game, visible, style }: Props) {
  if (!game) return null;

  return (
    <aside
      className={`preview-blurb${visible ? " visible" : ""}`}
      style={style}
      aria-hidden={!visible}
    >
      <h3>{game.title}</h3>
      {game.description && <p>{game.description}</p>}
    </aside>
  );
}
