import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import type { Game } from "../lib/types";
import { GameSpine } from "./GameSpine";
import { PreviewCard } from "./PreviewCard";

const COVER_W = 220;
const FALLBACK_PER_SHELF = 12;

type Props = {
  games: Game[];
  onOpen: (id: string) => void;
};

type ScrubState = {
  pointerId: number;
  rowIndex: number;
};

export function Shelf({ games, onOpen }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [previewStyle, setPreviewStyle] = useState<CSSProperties>({});
  const [perShelf, setPerShelf] = useState(FALLBACK_PER_SHELF);
  const measureRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLElement | null)[]>([]);
  const leaveTimer = useRef<number | null>(null);
  const activeIdRef = useRef<string | null>(null);
  const scrubRef = useRef<ScrubState | null>(null);
  const skipClickRef = useRef(false);

  activeIdRef.current = activeId;

  function cancelLeave() {
    if (leaveTimer.current != null) {
      window.clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
  }

  function scheduleLeave() {
    if (scrubRef.current) return;
    cancelLeave();
    leaveTimer.current = window.setTimeout(() => {
      setActiveId(null);
      leaveTimer.current = null;
    }, 140);
  }

  useEffect(() => () => cancelLeave(), []);

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
    let left = slotBox.left - stageBox.left;
    const width = Math.min(desiredW, Math.max(160, stageW - pad * 2));
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

  function findSlotAt(clientX: number, rowIndex: number): { id: string; el: HTMLElement } | null {
    const rowEl = rowRefs.current[rowIndex];
    if (!rowEl) return null;
    const slots = [...rowEl.querySelectorAll<HTMLElement>(".book-slot")];
    if (!slots.length) return null;

    for (const slot of slots) {
      const r = slot.getBoundingClientRect();
      if (clientX >= r.left - 6 && clientX <= r.right + 6) {
        const id = slot.dataset.gameId;
        if (id) return { id, el: slot };
      }
    }

    let best: { id: string; el: HTMLElement; d: number } | null = null;
    for (const slot of slots) {
      const id = slot.dataset.gameId;
      if (!id) continue;
      const r = slot.getBoundingClientRect();
      const d = Math.abs(clientX - (r.left + r.right) / 2);
      if (!best || d < best.d) best = { id, el: slot, d };
    }
    if (best && best.d < 72) return { id: best.id, el: best.el };
    return null;
  }

  function activateAt(clientX: number, rowIndex: number) {
    const hit = findSlotAt(clientX, rowIndex);
    if (!hit) return;
    cancelLeave();
    setActiveId(hit.id);
    const rowEl = rowRefs.current[rowIndex];
    if (rowEl) placePreview(hit.el, rowEl);
  }

  function onRailPointerDown(e: ReactPointerEvent<HTMLDivElement>, rowIndex: number) {
    if (e.pointerType === "mouse") return;
    if (e.button !== 0) return;
    scrubRef.current = { pointerId: e.pointerId, rowIndex };
    e.currentTarget.setPointerCapture(e.pointerId);
    activateAt(e.clientX, rowIndex);
  }

  function onRailPointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    const scrub = scrubRef.current;
    if (!scrub || scrub.pointerId !== e.pointerId) return;
    activateAt(e.clientX, scrub.rowIndex);
  }

  function endScrub(e: ReactPointerEvent<HTMLDivElement>) {
    const scrub = scrubRef.current;
    if (!scrub || scrub.pointerId !== e.pointerId) return;
    scrubRef.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    const id = activeIdRef.current;
    if (id) {
      skipClickRef.current = true;
      onOpen(id);
    }
  }

  function openGame(id: string) {
    if (skipClickRef.current) {
      skipClickRef.current = false;
      return;
    }
    onOpen(id);
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
              <div
                className="spine-rail"
                onPointerDown={(e) => onRailPointerDown(e, i)}
                onPointerMove={onRailPointerMove}
                onPointerUp={endScrub}
                onPointerCancel={(e) => {
                  const scrub = scrubRef.current;
                  if (!scrub || scrub.pointerId !== e.pointerId) return;
                  scrubRef.current = null;
                  if (e.currentTarget.hasPointerCapture(e.pointerId)) {
                    e.currentTarget.releasePointerCapture(e.pointerId);
                  }
                  scheduleLeave();
                }}
              >
                {row.map((game) => (
                  <GameSpine
                    key={game.id}
                    game={game}
                    active={activeId === game.id}
                    onEnter={(el) => {
                      if (scrubRef.current) return;
                      cancelLeave();
                      setActiveId(game.id);
                      const rowEl = rowRefs.current[i];
                      if (rowEl) placePreview(el, rowEl);
                    }}
                    onLeave={scheduleLeave}
                    onClick={() => openGame(game.id)}
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
