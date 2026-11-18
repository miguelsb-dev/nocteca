import { timingSafeEqual } from "node:crypto";
import type { IncomingMessage, ServerResponse } from "node:http";
import type { Connect, Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

function adminApiPlugin(secret: string): Plugin {
  const attach = (server: { middlewares: Connect.Server }) => {
    server.middlewares.use((req: IncomingMessage, res: ServerResponse, next: Connect.NextFunction) => {
      const url = req.url ?? "";
      if (!url.startsWith("/api/admin/")) return next();

      if (req.method === "POST" && url.startsWith("/api/admin/login")) {
        let body = "";
        req.on("data", (c) => {
          body += c;
        });
        req.on("end", () => {
          let provided = "";
          try {
            provided = (JSON.parse(body || "{}") as { secret?: string }).secret ?? "";
          } catch {
            provided = "";
          }
          if (!secret || !safeEqual(String(provided), secret)) {
            res.statusCode = 401;
            res.end("Unauthorized");
            return;
          }
          res.setHeader(
            "Set-Cookie",
            "nocteca_owner=1; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400",
          );
          res.statusCode = 200;
          res.end("ok");
        });
        return;
      }

      if (req.method === "POST" && url.startsWith("/api/admin/logout")) {
        res.setHeader(
          "Set-Cookie",
          "nocteca_owner=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0",
        );
        res.statusCode = 200;
        res.end("ok");
        return;
      }

      res.statusCode = 404;
      res.end("Not found");
    });
  };

  return {
    name: "nocteca-admin-api",
    configureServer: attach,
    configurePreviewServer: attach,
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const host = env.TAURI_DEV_HOST || process.env.TAURI_DEV_HOST;
  const secret = env.NOCTECA_ADMIN_SECRET || process.env.NOCTECA_ADMIN_SECRET || "";

  return {
    base: env.VITE_BASE || process.env.VITE_BASE || "/",
    plugins: [react(), adminApiPlugin(secret)],
    clearScreen: false,
    server: {
      port: 1420,
      strictPort: true,
      host: host || false,
      hmr: host ? { protocol: "ws", host, port: 1421 } : undefined,
      watch: { ignored: ["**/src-tauri/**"] },
    },
  };
});
