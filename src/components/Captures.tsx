import { assetUrl } from "../lib/assets";
import type { Game } from "../lib/types";

type Props = {
  games: Game[];
  onOpenShot: (src: string) => void;
};

export function Captures({ games, onOpenShot }: Props) {
  const shots = games.flatMap((g) =>
    (g.screenshots ?? []).map((src) => ({
      src: assetUrl(src),
      title: g.title,
      id: g.id,
    })),
  );

  return (
    <section>
      <p className="page-kicker">Nocteca</p>
      <h1 className="page-title">Capturas</h1>

      {!shots.length ? (
        <div className="empty-state">Aún no hay juegos</div>
      ) : (
        <div className="captures-grid" style={{ marginTop: 28 }}>
          {shots.map((s) => (
            <figure key={s.src}>
              <button
                type="button"
                className="shot-thumb"
                onClick={() => onOpenShot(s.src)}
              >
                <img src={s.src} alt={s.title} />
              </button>
              <figcaption>{s.title}</figcaption>
            </figure>
          ))}
        </div>
      )}
    </section>
  );
}
