import { saveAs } from "file-saver";
import JSZip from "jszip";
import { exportSnapshot, replaceLibrary } from "./library";
import type { Game, Profile } from "./types";

export async function exportLibraryZip(): Promise<void> {
  const { library, profile } = exportSnapshot();
  const zip = new JSZip();
  zip.file("library.json", JSON.stringify(library, null, 2));
  zip.file("profile.json", JSON.stringify(profile, null, 2));

  for (const g of library.games) {
    const folder = zip.folder(`games/${g.id}`)!;
    const { review, ...meta } = g;
    folder.file("meta.json", JSON.stringify(meta, null, 2));
    folder.file("review.md", review ?? "");
  }

  const blob = await zip.generateAsync({ type: "blob" });
  saveAs(blob, `nocteca-library-${new Date().toISOString().slice(0, 10)}.zip`);
}

export async function importLibraryZip(file: File): Promise<void> {
  const zip = await JSZip.loadAsync(file);
  const libFile = zip.file("library.json");
  if (!libFile) throw new Error("ZIP sin library.json");
  const library = JSON.parse(await libFile.async("string")) as {
    games: Game[];
  };
  let profile: Profile | undefined;
  const profFile = zip.file("profile.json");
  if (profFile) profile = JSON.parse(await profFile.async("string")) as Profile;

  const games: Game[] = [];
  for (const g of library.games ?? []) {
    const reviewFile = zip.file(`games/${g.id}/review.md`);
    const metaFile = zip.file(`games/${g.id}/meta.json`);
    let review = g.review ?? "";
    let meta = g;
    if (reviewFile) review = await reviewFile.async("string");
    if (metaFile) meta = { ...g, ...JSON.parse(await metaFile.async("string")) };
    games.push({ ...meta, review });
  }
  replaceLibrary(games, profile);
}
