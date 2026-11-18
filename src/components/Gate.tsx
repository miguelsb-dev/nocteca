import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ENTERED_KEY = "nocteca_entered";

export function hasEntered(): boolean {
  return sessionStorage.getItem(ENTERED_KEY) === "1";
}

export function markEntered(): void {
  sessionStorage.setItem(ENTERED_KEY, "1");
}

export function clearEntered(): void {
  sessionStorage.removeItem(ENTERED_KEY);
}

export function Gate() {
  const navigate = useNavigate();
  const [leaving, setLeaving] = useState(false);

  function enter() {
    if (leaving) return;
    setLeaving(true);
    markEntered();
    window.setTimeout(
      () => navigate("/biblioteca", { state: { fromGate: true } }),
      720,
    );
  }

  return (
    <div className={`gate${leaving ? " is-leaving" : ""}`} data-theme="nocturna">
      <div className="gate-bg" aria-hidden />
      <div className="gate-scrim" aria-hidden />

      <div className="gate-content">
        <div className="brand gate-brand">
          <span className="brand-mark brand-mark-logo" aria-hidden />
          <div className="brand-name gate-wordmark">
            nocteca<span>.</span>
          </div>
        </div>
        <p className="gate-phrase">Biblioteca personal</p>
        <button type="button" className="btn btn-accent gate-cta" onClick={enter}>
          Ver
        </button>
      </div>
    </div>
  );
}
