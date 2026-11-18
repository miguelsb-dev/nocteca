import type { AppMode } from "./types";

const SESSION_KEY = "nocteca_owner_session";

export function isTauri(): boolean {
  return typeof window !== "undefined" && "__TAURI_INTERNALS__" in window;
}

export function getMode(): AppMode {
  if (isTauri()) return "owner";
  // En local (`npm run dev`) siempre owner: poder editar sin pelearte con el login.
  if (import.meta.env.DEV) return "owner";
  if (sessionStorage.getItem(SESSION_KEY) === "1") return "owner";
  return "visitor";
}

/** Verifies against NOCTECA_ADMIN_SECRET via server middleware (not in the client bundle). */
export async function loginOwner(secret: string): Promise<boolean> {
  try {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret }),
      credentials: "include",
    });
    if (res.ok) {
      sessionStorage.setItem(SESSION_KEY, "1");
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

export function logoutOwner(): void {
  sessionStorage.removeItem(SESSION_KEY);
  void fetch("/api/admin/logout", { method: "POST", credentials: "include" }).catch(() => {});
}

export function canMutate(): boolean {
  return getMode() === "owner";
}
