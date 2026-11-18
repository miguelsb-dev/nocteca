# Nocteca — brief operativo (fuente de verdad)

> Ejecuta. No preguntes. No debatas stack. Personal. Producto: **Nocteca**.
> Biblioteca personal de juegos (reseñas + screenshots propios). No Steam/IGDB público. No red social.
> local-first: web + desktop (Tauri) sincronizados en espíritu; si cae la web, desktop sigue con archivos locales.

---

## DoD (cerrar solo si cumple)

- Visitante web: ve estantería/fichas; **no** puede mutar; **no** ve UI gestión.
- Owner desktop: añade juego (cover + reseña + ≥2 screenshots + nota + fecha) → aparece en estantería.
- Hover: saca lomo → preview grande (cover + título + nota); click → ficha.
- Offline desktop: abre biblioteca desde disco.
- Export ZIP → Import ZIP → mismos juegos.
- Look Bruce Wayne + ref editorial; tipografía fuerte; cero cyberpunk/neón/purple-AI/junior SaaS.
- Secreto admin nunca en cliente/repo; mutaciones protegidas.

---

## Stack (fija)

Vite + React + TS + CSS tokens | Tauri 2 (misma UI) | Markdown sanitizado | sin Firebase/Supabase/Postgres/S3/OAuth | sin Three.js (CSS 3D).

Scripts: `npm run dev` · `npm run tauri dev` · secret: `NOCTECA_ADMIN_SECRET` (solo server/owner tools).

---

## Roles

| Superficie | Quién | Puede |
|---|---|---|
| Desktop | Owner siempre | CRUD, export/import ZIP, abrir carpeta. Sin login. |
| Web visitante | Default | Solo lectura: estantería, hover, ficha, reseña, screenshots. **Sin** botones/rutas admin. API mutación → 401/403. |
| Web owner | Tras `/admin/login` (no enlazada en nav) | Gestionar. Auth: secret env → cookie httpOnly o JWT corto. Logout claro. |

v1: sin registro público, multi-user, OAuth, amigos.

---

## Datos local-first

```
Nocteca/
  library.json
  profile.json
  games/{game-id}/meta.json + review.md + cover.* + screenshots/*
```

- Desktop = FS nativo (fuente de verdad).
- Web visitante = snapshot publicado read-only (JSON + assets). Flujo: desktop → «Publicar/Exportar» → web sirve snapshot. CRUD web solo con auth owner.
- Sync extra: carpeta en Syncthing/Drive/Dropbox + ZIP full library.

```ts
type Game = {
  id: string; title: string; platform?: string; tags?: string[];
  cover?: string; screenshots?: string[]; description?: string;
  score?: number; // 0–100
  playedAt?: string; reviewPath: string; addedAt: string; updatedAt: string;
};
```

---

## Visual (obligatorio)

Espíritu: web de videojuegos elegante “Bruce Wayne” + ref editorial (charcoal, tipografía condensada, acento vivo, asimetría, aire).
Ref: imagen adjunta / `nocteca-style-ref` — fondo mate + fugas de luz suaves; display fuerte; un acento naranja; chrome mínimo.

**Prohibido:** cyberpunk, neones, glows morados, HUD sci-fi, Inter/Roboto/Arial de marca, cards grises vacías, AI-purple.

```css
:root, [data-theme="nocturna"] {
  --bg:#0c0c0e; --bg-elevated:#141417; --surface:#1c1c21; --surface-hover:#26262c;
  --text:#f2f0eb; --text-muted:#9a9ba3; --accent:#e85a2a; --accent-soft:#3d6b4f;
  --border:rgba(255,255,255,0.06); --shadow:rgba(0,0,0,0.55); --radius:8px;
  --font-display:"Barlow Condensed","Oswald",sans-serif;
  --font-sans:"Barlow","Karla",system-ui,sans-serif;
  --font-size-body:14px; --font-size-small:12px; --font-size-title:18px; --font-size-hero:42px;
  --line-height:1.45; --tracking:0.01em;
}
```

Temas futuros solo vía `data-theme` (no implementar en v1).

---

## UX

**Nav pública:** Inicio / Biblioteca / Capturas / Perfil. Sin «Añadir». Empty: «Aún no hay juegos» sin CTA crear.

**Perfil:** una sola persona, página completa, foto contenida. Editable solo owner.

**Owner (desktop; web tras login):** modal premium real (no textarea-plantilla). Campos: título, plataforma, tags, cover, screenshots×N, descripción, reseña MD, nota 0–100, fecha jugado. Guarda meta+review+imgs+library. Buscar título/tags. Orden: A–Z / nota / fecha. Export/Import ZIP. Desktop: elegir carpeta Nocteca.

**Estantería:**
- Baldas automáticas (no fila infinita).
- Reposo: lomo vertical + título + nota.
- Hover: pull-out + preview grande (cover+título+nota); clamp viewport; ~60fps transform/opacity.
- Click → detalle (cover, meta, nota, MD, screenshots+lightbox).
- `prefers-reduced-motion` → reducir/apagar.
- >80 juegos → virtualizar. Responsive; desktop ~1280×800.
- Demos: 3 placeholders títulos reales (cover, nota, descripción marcados placeholder).

Animación: CSS + mínimo JS; GPU-friendly.

---

## Fuera de v1

Steam/IGDB/RAWG auto · cloud sync complejo · multi-user · vídeo/logros/horas/comentarios/likes · marketplace · temas alt · PWA/push.

---

## Orden de implementación

1. Scaffold Vite+React+TS + tokens `nocturna` + shell UI
2. Estantería + hover pull + preview + 3 demos
3. Detalle: MD + screenshots + lightbox
4. Datos local (`library.json`+`games/*`+`profile.json`) + CRUD Tauri FS
5. Modal Añadir/Editar owner (nota, fecha, cover, reseña)
6. Web read-only snapshot + `/admin/login` gated
7. Export/Import ZIP + buscar/ordenar
8. README corto: install, dev, tauri, carpeta `Nocteca/`, secret, publicar snapshot

Al cerrar primer pase: 5–8 líneas de arranque (web, desktop, primer juego, publicar, secret).

---

## Repo

```
nocteca/
  package.json  index.html  README.md
  src/
    main.tsx  App.tsx
    styles/tokens.css  styles/app.css
    components/{Shelf,GameSpine,PreviewCard,GameDetail,AddGameModal,Lightbox,AdminLogin,Profile,Captures}.tsx
    lib/{types,library,markdown,zip,auth}.ts
  src-tauri/   public/demo/
```

---

## Forma de trabajar

Una stack. Cero abstracciones de más. Sin docs largas / tests enormes / fase-2 vacía. Pocos archivos claros. Si choca → opción más local-first y barata. Sin commits/deploys salvo petición.
