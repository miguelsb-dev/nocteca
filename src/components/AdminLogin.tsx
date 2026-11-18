import { useState } from "react";
import { loginOwner } from "../lib/auth";

type Props = {
  onSuccess: () => void;
};

export function AdminLogin({ onSuccess }: Props) {
  const [secret, setSecret] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const ok = await loginOwner(secret);
    setBusy(false);
    if (!ok) {
      setError("Acceso denegado");
      return;
    }
    onSuccess();
  }

  return (
    <form className="login-box" onSubmit={submit} data-theme="nocturna">
      <h1>Admin</h1>
      <p>Acceso owner. Ruta discreta — no aparece en la nav pública.</p>
      <label className="form-label">
        Secreto
        <input
          className="field"
          type="password"
          autoComplete="current-password"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          required
        />
      </label>
      {error && <p style={{ color: "var(--accent)" }}>{error}</p>}
      <button type="submit" className="btn btn-accent" style={{ marginTop: 14 }} disabled={busy}>
        Entrar
      </button>
    </form>
  );
}
