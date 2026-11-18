import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import {
  Navigate,
  NavLink,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { AddGameModal } from "./components/AddGameModal";
import { AdminLogin } from "./components/AdminLogin";
import { Captures } from "./components/Captures";
import { Gate, clearEntered, hasEntered, markEntered } from "./components/Gate";
import { GameDetail } from "./components/GameDetail";
import { Lightbox } from "./components/Lightbox";
import { Profile } from "./components/Profile";
import { Shelf } from "./components/Shelf";
import { canMutate, getMode, isTauri, logoutOwner } from "./lib/auth";
import {
  deleteGame,
  filterGames,
  getFolderPath,
  getGames,
  getProfile,
  loadLibrary,
  openLibraryFolder,
  sortGames,
  subscribe,
  updateProfile,
  upsertGame,
} from "./lib/library";
import type { SortMode } from "./lib/types";
import { exportLibraryZip, importLibraryZip } from "./lib/zip";

function useLibrary() {
  return useSyncExternalStore(subscribe, getGames, getGames);
}

function useProfileStore() {
  return useSyncExternalStore(subscribe, getProfile, getProfile);
}

function RequireEntered({ children }: { children: React.ReactNode }) {
  if (!hasEntered()) return <Navigate to="/" replace />;
  return children;
}

function ShellLayout() {
  const owner = canMutate();
  const navigate = useNavigate();
  const location = useLocation();
  const [entering, setEntering] = useState(
    () => Boolean(location.state && (location.state as { fromGate?: boolean }).fromGate),
  );

  useEffect(() => {
    if (!entering) return;
    const t = window.setTimeout(() => setEntering(false), 700);
    return () => window.clearTimeout(t);
  }, [entering]);

  return (
    <div className={`app-shell${entering ? " is-entering" : ""}`} data-theme="nocturna">
      <aside className="side-nav">
        <button
          type="button"
          className="brand"
          style={{ all: "unset", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, lineHeight: 1 }}
          onClick={() => {
            clearEntered();
            navigate("/");
          }}
          aria-label="Ir a la portada"
        >
          <span className="brand-mark brand-mark-logo" aria-hidden />
          <div className="brand-name">
            nocteca<span>.</span>
          </div>
        </button>
        <ul className="nav-list">
          {[
            ["/biblioteca", "Biblioteca"],
            ["/capturas", "Capturas"],
            ["/perfil", "Perfil"],
          ].map(([to, label]) => (
            <li key={to}>
              <NavLink
                className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
                to={to}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="nav-footer">
          {owner && (
            <>
              {isTauri() && (
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => void openLibraryFolder()}
                >
                  {getFolderPath() ? "Cambiar carpeta" : "Abrir carpeta"}
                </button>
              )}
              {!isTauri() && getMode() === "owner" && (
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => {
                    logoutOwner();
                    navigate("/biblioteca");
                    window.location.reload();
                  }}
                >
                  Logout
                </button>
              )}
            </>
          )}
        </div>
      </aside>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}

function BibliotecaPage() {
  const games = useLibrary();
  const navigate = useNavigate();
  const owner = canMutate();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortMode>("playedAt");
  const [modal, setModal] = useState(false);

  const visible = useMemo(
    () => sortGames(filterGames(games, query), sort),
    [games, query, sort],
  );

  return (
    <section>
      <div className="topbar">
        <div>
          <p className="page-kicker">Nocteca</p>
          <h1 className="page-title">
            Biblioteca
            <span className="library-count" title="Juegos en la biblioteca">
              {visible.length}
              {query.trim() && visible.length !== games.length ? ` / ${games.length}` : ""}
            </span>
          </h1>
        </div>
        <div className="toolbar">
          <input
            className="field"
            placeholder="Buscar"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select
            className="field"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortMode)}
          >
            <option value="alpha">A–Z</option>
            <option value="score">Nota</option>
            <option value="playedAt">Fecha jugado</option>
          </select>
          {owner && (
            <>
              <button type="button" className="btn btn-accent" onClick={() => setModal(true)}>
                Añadir juego
              </button>
              <button type="button" className="btn" onClick={() => void exportLibraryZip()}>
                Exportar ZIP
              </button>
              <label className="btn" style={{ cursor: "pointer" }}>
                Importar ZIP
                <input
                  type="file"
                  accept=".zip,application/zip"
                  hidden
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) void importLibraryZip(f);
                    e.target.value = "";
                  }}
                />
              </label>
            </>
          )}
        </div>
      </div>

      <div className="library-stage">
        <Shelf games={visible} onOpen={(id) => navigate(`/juego/${id}`)} />
      </div>

      {modal && (
        <AddGameModal
          onClose={() => setModal(false)}
          onSave={async (data) => {
            await upsertGame(data);
          }}
        />
      )}
    </section>
  );
}

function GamePage() {
  const { id = "" } = useParams();
  const games = useLibrary();
  const navigate = useNavigate();
  const game = games.find((g) => g.id === id);
  const owner = canMutate();
  const [modal, setModal] = useState(false);

  if (!game) {
    return (
      <div>
        <p className="page-lead">Juego no encontrado.</p>
        <button type="button" className="btn" onClick={() => navigate("/biblioteca")}>
          Volver
        </button>
      </div>
    );
  }

  return (
    <>
      <GameDetail
        game={game}
        canEdit={owner}
        onBack={() => navigate("/biblioteca")}
        onEdit={() => setModal(true)}
        onDelete={async () => {
          await deleteGame(game.id);
          navigate("/biblioteca");
        }}
      />
      {modal && (
        <AddGameModal
          initial={game}
          onClose={() => setModal(false)}
          onSave={async (data) => {
            await upsertGame({ ...data, id: game.id });
          }}
        />
      )}
    </>
  );
}

function CapturasPage() {
  const games = useLibrary();
  const [light, setLight] = useState<string | null>(null);
  return (
    <>
      <Captures games={games} onOpenShot={setLight} />
      <Lightbox src={light} onClose={() => setLight(null)} />
    </>
  );
}

function PerfilPage() {
  const profile = useProfileStore();
  return (
    <Profile
      profile={profile}
      canEdit={canMutate()}
      onSave={async (p) => {
        await updateProfile(p);
      }}
    />
  );
}

function GateRoute() {
  const navigate = useNavigate();
  useEffect(() => {
    if (hasEntered()) navigate("/biblioteca", { replace: true });
  }, [navigate]);
  return <Gate />;
}

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    void loadLibrary().finally(() => setReady(true));
  }, []);

  if (!ready) {
    return (
      <div className="gate" data-theme="nocturna">
        <div className="gate-content">
          <p className="page-kicker">Nocteca</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<GateRoute />} />
      <Route
        path="/admin/login"
        element={
          <AdminLogin
            onSuccess={() => {
              markEntered();
              window.location.href = "/biblioteca";
            }}
          />
        }
      />
      <Route
        element={
          <RequireEntered>
            <ShellLayout />
          </RequireEntered>
        }
      >
        <Route path="/biblioteca" element={<BibliotecaPage />} />
        <Route path="/juego/:id" element={<GamePage />} />
        <Route path="/capturas" element={<CapturasPage />} />
        <Route path="/perfil" element={<PerfilPage />} />
        <Route path="/inicio" element={<Navigate to="/biblioteca" replace />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
