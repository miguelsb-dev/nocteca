# Nocteca

Biblioteca personal de juegos (web + desktop Tauri). Local-first.

## Arranque

```bash
npm install
npm run dev          # web → http://localhost:1420
npm run tauri dev    # desktop (requiere Rust + Tauri deps)
```

## Carpeta de datos (desktop)

Elegir/crear una carpeta `Nocteca/` con:

- `library.json`, `profile.json`
- `games/{id}/meta.json`, `review.md`, `cover.*`, `screenshots/`

## Admin web

1. Copia `.env.example` → `.env`
2. Pon `NOCTECA_ADMIN_SECRET=...` (nunca en el repo ni en `VITE_*` de producción)
3. Login discreto: `/admin/login`
4. Visitantes: solo lectura (sin botones de gestión)

## Publicar snapshot web

Owner en desktop/web-auth: **Exportar ZIP** o copiar `library.json` + assets a `public/snapshot/` (y covers a rutas servidas). La web pública sirve ese snapshot read-only.
