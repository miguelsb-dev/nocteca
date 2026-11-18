import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import type { Game } from "../lib/types";
import { GameSpine } from "./GameSpine";
import { PreviewCard } from "./PreviewCard";

const COVER_W = 220;
const FALLBACK_PER_SHELF = 12;

type Props = {
  games: Game[];
  onOpen: (id: string) => void;
};

export function Shelf({ games, onOpen }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [previewStyle, setPreviewStyle] = useState<CSSProperties>({});
  const [perShelf, setPerShelf] = useState(FALLBACK_PER_SHELF);
  const measureRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const el = measureRef.current;
    if (!el) return;

    const measure = () => {
      const styles = getComputedStyle(document.documentElement);
      const spineW = parseFloat(styles.getPropertyValue("--spine-width")) || 62;
      const gap = 10;
      const padRight = 64;
      const padLeft = 4;
      const usable = el.clientWidth - padLeft - padRight;
      const n = Math.max(1, Math.floor((usable + gap) / (spineW + gap)));
      setPerShelf(n);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const shelves = useMemo(() => {
    const rows: Game[][] = [];
    for (let i = 0; i < games.length; i += perShelf) {
      rows.push(games.slice(i, i + perShelf));
    }
    return rows.length ? rows : [[]];
  }, [games, perShelf]);

  const activeGame = games.find((g) => g.id === activeId) ?? null;
  const activeShelfIndex = activeGame
    ? shelves.findIndex((row) => row.some((g) => g.id === activeGame.id))
    : -1;

  useEffect(() => {
    if (!activeId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeId]);

  function placePreview(slotEl: HTMLElement, rowEl: HTMLElement) {
    const slotBox = slotEl.getBoundingClientRect();
    const stage = rowEl.querySelector(".shelf-stage");
    const stageBox = stage?.getBoundingClientRect() ?? rowEl.getBoundingClientRect();
    const pad = 8;
    const desiredW = COVER_W + 40;
    const stageW = stageBox.width;
    // Preferido: bajo la portada (a la derecha del lomo)
    let left = slotBox.left - stageBox.left;
    const width = Math.min(desiredW, Math.max(160, stageW - pad * 2));
    // Si se sale por la derecha (último de la balda), desplazar a la izquierda
    if (left + width > stageW - pad) {
      left = stageW - pad - width;
    }
    left = Math.max(pad, left);

    setPreviewStyle({
      left,
      width,
      maxWidth: stageW - pad * 2,
    });
  }

  if (!games.length) {
    return <div className="empty-state">Aún no hay juegos</div>;
  }

  return (
    <div className="shelf-room" ref={measureRef}>
      {shelves.map((row, i) => {
        const rowActive = activeShelfIndex === i;
        const rowGame = rowActive ? activeGame : null;
        return (
          <section
            className={`shelf-row${rowActive ? " has-preview" : ""}`}
            key={`shelf-${i}`}
            aria-label={`Balda ${i + 1}`}
            ref={(el) => {
              rowRefs.current[i] = el;
            }}
          >
            <div className="shelf-stage">
              <div className="spine-rail">
                {row.map((game) => (
                  <GameSpine
                    key={game.id}
                    game={game}
                    active={activeId === game.id}
                    onEnter={(el) => {
                      setActiveId(game.id);
                      const rowEl = rowRefs.current[i];
                      if (rowEl) placePreview(el, rowEl);
                    }}
                    onLeave={() => setActiveId(null)}
                    onClick={() => onOpen(game.id)}
                  />
                ))}
              </div>
              <div className="shelf-plank" aria-hidden />
            </div>
            <div className="shelf-caption" aria-live="polite">
              <PreviewCard
                game={rowGame}
                visible={Boolean(rowGame)}
                style={rowGame ? previewStyle : undefined}
              />
            </div>
          </section>
        );
      })}
    </div>
  );
}
