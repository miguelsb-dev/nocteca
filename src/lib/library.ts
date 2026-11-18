import { assetUrl } from "./assets";
import { DEMO_GAMES, DEMO_PROFILE } from "./demo";
import { canMutate, isTauri } from "./auth";
import type { Game, LibraryIndex, Profile, SortMode } from "./types";

const SNAPSHOT_URL = assetUrl("/snapshot/library.json");
const PROFILE_URL = assetUrl("/snapshot/profile.json");
const STORAGE_KEY = "nocteca_library_local_v13";
const PROFILE_KEY = "nocteca_profile_local_v20";

let games: Game[] = [...DEMO_GAMES];
let profile: Profile = { ...DEMO_PROFILE };
let folderPath: string | null = null;
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((l) => l());
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getGames(): Game[] {
  return games;
}

export function getProfile(): Profile {
  return profile;
}

export function getFolderPath(): string | null {
  return folderPath;
}

export function getGame(id: string): Game | undefined {
  return games.find((g) => g.id === id);
}

export function sortGames(list: Game[], mode: SortMode): Game[] {
  const copy = [...list];
  if (mode === "alpha") {
    copy.sort((a, b) => a.title.localeCompare(b.title, "es"));
  } else if (mode === "score") {
    copy.sort((a, b) => (b.score ?? -1) - (a.score ?? -1));
  } else {
    copy.sort((a, b) => (b.playedAt ?? "").localeCompare(a.playedAt ?? ""));
  }
  return copy;
}

export function filterGames(list: Game[], query: string): Game[] {
  const q = query.trim().toLowerCase();
  if (!q) return list;
  return list.filter(
    (g) =>
      g.title.toLowerCase().includes(q) ||
      g.tags?.some((t) => t.toLowerCase().includes(q)) ||
      g.platform?.toLowerCase().includes(q),
  );
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 64);
}

export async function loadLibrary(): Promise<void> {
  // Prefer localStorage draft (web owner) → snapshot → demos
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as LibraryIndex;
      if (parsed?.games?.length) {
        games = parsed.games;
        const p = localStorage.getItem(PROFILE_KEY);
        profile = p ? (JSON.parse(p) as Profile) : { ...DEMO_PROFILE };
        if (!p) localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
        notify();
        return;
      }
    }
  } catch {
    /* ignore */
  }

  try {
    const [libRes, profRes] = await Promise.all([
      fetch(SNAPSHOT_URL),
      fetch(PROFILE_URL),
    ]);
    if (libRes.ok) {
      const parsed = (await libRes.json()) as LibraryIndex;
      if (parsed?.games?.length) games = parsed.games;
    }
    if (profRes.ok) {
      const snapProfile = (await profRes.json()) as Profile;
      // DEMO_PROFILE gana: el snapshot no debe pisar bio/redes del demo actual
      if (snapProfile?.name) profile = { ...snapProfile, ...DEMO_PROFILE };
      else profile = { ...DEMO_PROFILE };
    } else {
      profile = { ...DEMO_PROFILE };
    }
  } catch {
    games = [...DEMO_GAMES];
    profile = { ...DEMO_PROFILE };
  }
  notify();
}

function persistWeb() {
  const index: LibraryIndex = {
    version: 1,
    games,
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(index));
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

async function persistTauri(): Promise<void> {
  if (!folderPath || !isTauri()) return;
  const { writeTextFile, mkdir, exists } = await import("@tauri-apps/plugin-fs");
  const base = folderPath;
  if (!(await exists(base))) await mkdir(base, { recursive: true });
  if (!(await exists(`${base}/games`))) await mkdir(`${base}/games`, { recursive: true });

  const index: LibraryIndex = {
    version: 1,
    games: games.map(({ review: _r, ...rest }) => rest),
    updatedAt: new Date().toISOString(),
  };
  await writeTextFile(`${base}/library.json`, JSON.stringify(index, null, 2));
  await writeTextFile(`${base}/profile.json`, JSON.stringify(profile, null, 2));

  for (const g of games) {
    const dir = `${base}/games/${g.id}`;
    if (!(await exists(dir))) await mkdir(dir, { recursive: true });
    if (!(await exists(`${dir}/screenshots`))) {
      await mkdir(`${dir}/screenshots`, { recursive: true });
    }
    const { review, ...meta } = g;
    await writeTextFile(`${dir}/meta.json`, JSON.stringify(meta, null, 2));
    await writeTextFile(`${dir}/review.md`, review ?? "");
  }
}

export async function persist(): Promise<void> {
  if (!canMutate()) throw new Error("Forbidden");
  if (isTauri() && folderPath) await persistTauri();
  else persistWeb();
  notify();
}

export async function openLibraryFolder(): Promise<string | null> {
  if (!isTauri() || !canMutate()) return null;
  const { open } = await import("@tauri-apps/plugin-dialog");
  const { readTextFile, exists } = await import("@tauri-apps/plugin-fs");
  const selected = await open({ directory: true, multiple: false, title: "Carpeta Nocteca" });
  if (!selected || Array.isArray(selected)) return null;
  folderPath = selected;

  if (await exists(`${folderPath}/library.json`)) {
    const raw = await readTextFile(`${folderPath}/library.json`);
    const index = JSON.parse(raw) as LibraryIndex;
    const loaded: Game[] = [];
    for (const g of index.games ?? []) {
      let review = g.review ?? "";
      try {
        if (await exists(`${folderPath}/games/${g.id}/review.md`)) {
          review = await readTextFile(`${folderPath}/games/${g.id}/review.md`);
        }
        if (await exists(`${folderPath}/games/${g.id}/meta.json`)) {
          const meta = JSON.parse(
            await readTextFile(`${folderPath}/games/${g.id}/meta.json`),
          ) as Game;
          loaded.push({ ...g, ...meta, review });
          continue;
        }
      } catch {
        /* use index entry */
      }
      loaded.push({ ...g, review });
    }
    games = loaded;
  }

  if (await exists(`${folderPath}/profile.json`)) {
    profile = JSON.parse(await readTextFile(`${folderPath}/profile.json`)) as Profile;
  }

  notify();
  return folderPath;
}

export async function upsertGame(input: Partial<Game> & { title: string }): Promise<Game> {
  if (!canMutate()) throw new Error("Forbidden");
  const now = new Date().toISOString();
  const id = input.id || slugify(input.title);
  const existing = games.find((g) => g.id === id);
  const next: Game = {
    id,
    title: input.title,
    platform: input.platform,
    tags: input.tags ?? [],
    cover: input.cover,
    screenshots: input.screenshots ?? [],
    description: input.description,
    score: input.score,
    playedAt: input.playedAt,
    reviewPath: "review.md",
    review: input.review ?? "",
    addedAt: existing?.addedAt ?? now,
    updatedAt: now,
    placeholder: false,
  };
  games = existing
    ? games.map((g) => (g.id === id ? next : g))
    : [...games, next];
  await persist();
  return next;
}

export async function deleteGame(id: string): Promise<void> {
  if (!canMutate()) throw new Error("Forbidden");
  games = games.filter((g) => g.id !== id);
  await persist();
}

export async function updateProfile(next: Profile): Promise<void> {
  if (!canMutate()) throw new Error("Forbidden");
  profile = next;
  await persist();
}

export function replaceLibrary(nextGames: Game[], nextProfile?: Profile): void {
  if (!canMutate()) throw new Error("Forbidden");
  games = nextGames;
  if (nextProfile) profile = nextProfile;
  void persist();
}

export function exportSnapshot(): { library: LibraryIndex; profile: Profile } {
  return {
    library: { version: 1, games, updatedAt: new Date().toISOString() },
    profile,
  };
}
