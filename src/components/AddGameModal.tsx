import { useState } from "react";
import type { Game } from "../lib/types";

type Props = {
  initial?: Game | null;
  onClose: () => void;
  onSave: (data: Partial<Game> & { title: string }) => Promise<void>;
};

function filesToDataUrls(files: FileList | null): Promise<string[]> {
  if (!files?.length) return Promise.resolve([]);
  return Promise.all(
    [...files].map(
      (file) =>
        new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(String(reader.result));
          reader.onerror = reject;
          reader.readAsDataURL(file);
        }),
    ),
  );
}

export function AddGameModal({ initial, onClose, onSave }: Props) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [platform, setPlatform] = useState(initial?.platform ?? "PC");
  const [tags, setTags] = useState(initial?.tags?.join(", ") ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [review, setReview] = useState(initial?.review ?? "");
  const [score, setScore] = useState(String(initial?.score ?? 80));
  const [playedAt, setPlayedAt] = useState(initial?.playedAt ?? "");
  const [cover, setCover] = useState(initial?.cover ?? "");
  const [screenshots, setScreenshots] = useState<string[]>(initial?.screenshots ?? []);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setError("El título es obligatorio");
      return;
    }
    setBusy(true);
    setError("");
    try {
      await onSave({
        id: initial?.id,
        title: title.trim(),
        platform,
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        description,
        review,
        score: Math.max(0, Math.min(100, Number(score) || 0)),
        playedAt: playedAt || undefined,
        cover: cover || undefined,
        screenshots,
      });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="modal-backdrop" role="dialog" aria-modal>
      <form className="modal" onSubmit={handleSubmit}>
        <h2>{initial ? "Editar juego" : "Añadir juego"}</h2>
        <div className="form-grid">
          <label className="form-label">
            Título
            <input className="field" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </label>
          <label className="form-label">
            Plataforma
            <select className="field" value={platform} onChange={(e) => setPlatform(e.target.value)}>
              {["PC", "Switch", "PS5", "Xbox", "Otro"].map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </label>
          <label className="form-label">
            Nota 0–100
            <input
              className="field"
              type="number"
              min={0}
              max={100}
              value={score}
              onChange={(e) => setScore(e.target.value)}
            />
          </label>
          <label className="form-label">
            Fecha jugado
            <input
              className="field"
              type="date"
              value={playedAt}
              onChange={(e) => setPlayedAt(e.target.value)}
            />
          </label>
          <label className="form-label full">
            Tags (coma)
            <input className="field" value={tags} onChange={(e) => setTags(e.target.value)} />
          </label>
          <label className="form-label full">
            Encabezado (mini descripción al hover)
            <textarea
              className="field"
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Lo que se lee al pasar el ratón por el lomo"
            />
          </label>
          <label className="form-label full">
            Reseña (Markdown)
            <textarea
              className="field"
              rows={8}
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </label>
          <label className="form-label">
            Cover
            <input
              className="field"
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const [url] = await filesToDataUrls(e.target.files);
                if (url) setCover(url);
              }}
            />
          </label>
          <label className="form-label">
            Screenshots
            <input
              className="field"
              type="file"
              accept="image/*"
              multiple
              onChange={async (e) => {
                const urls = await filesToDataUrls(e.target.files);
                if (urls.length) setScreenshots((prev) => [...prev, ...urls]);
              }}
            />
          </label>
          {cover && (
            <div className="full">
              <img src={cover} alt="" style={{ maxHeight: 120, borderRadius: 6 }} />
            </div>
          )}
        </div>
        {error && <p style={{ color: "var(--accent)" }}>{error}</p>}
        <div className="form-actions">
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            Cancelar
          </button>
          <button type="submit" className="btn btn-accent" disabled={busy}>
            {busy ? "Guardando…" : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
}
