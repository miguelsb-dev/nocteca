import { useState } from "react";
import { assetUrl } from "../lib/assets";
import type { Profile as ProfileType } from "../lib/types";

type Props = {
  profile: ProfileType;
  canEdit: boolean;
  onSave: (p: ProfileType) => Promise<void>;
};

export function Profile({ profile, canEdit, onSave }: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(profile);
  const [linksText, setLinksText] = useState(
    (profile.links ?? []).map((l) => `${l.label}|${l.url}`).join("\n"),
  );

  function parseLinks(raw: string) {
    return raw
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [label, url] = line.split("|").map((s) => s.trim());
        return { label: label || "Link", url: url || label };
      });
  }

  return (
    <section className="profile-dossier">
      <div className="profile-dossier-media">
        <img
          className="profile-dossier-photo"
          src={assetUrl((editing ? draft.photo : profile.photo) || "/demo/profile.jpg")}
          alt={profile.name}
        />
        <div className="profile-dossier-glow" aria-hidden />
      </div>

      <div className="profile-dossier-body">
        <p className="page-kicker">Perfil</p>

        {editing ? (
          <div className="form-grid profile-edit-grid">
            <label className="form-label">
              Nombre
              <input
                className="field"
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              />
            </label>
            <label className="form-label">
              Handle
              <input
                className="field"
                value={draft.handle ?? ""}
                onChange={(e) => setDraft({ ...draft, handle: e.target.value })}
              />
            </label>
            <label className="form-label">
              Ubicación
              <input
                className="field"
                value={draft.location ?? ""}
                onChange={(e) => setDraft({ ...draft, location: e.target.value })}
              />
            </label>
            <label className="form-label">
              Email
              <input
                className="field"
                type="email"
                value={draft.email ?? ""}
                onChange={(e) => setDraft({ ...draft, email: e.target.value })}
              />
            </label>
            <label className="form-label full">
              Foto (URL o data)
              <input
                className="field"
                value={draft.photo ?? ""}
                onChange={(e) => setDraft({ ...draft, photo: e.target.value })}
              />
            </label>
            <label className="form-label full">
              Biografía
              <textarea
                className="field"
                rows={8}
                value={draft.bio ?? ""}
                onChange={(e) => setDraft({ ...draft, bio: e.target.value })}
              />
            </label>
            <label className="form-label full">
              Redes (una por línea: Etiqueta|https://…)
              <textarea
                className="field"
                rows={4}
                value={linksText}
                onChange={(e) => setLinksText(e.target.value)}
              />
            </label>
            <div className="form-actions full">
              <button type="button" className="btn btn-ghost" onClick={() => setEditing(false)}>
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-accent"
                onClick={async () => {
                  await onSave({ ...draft, links: parseLinks(linksText) });
                  setEditing(false);
                }}
              >
                Guardar
              </button>
            </div>
          </div>
        ) : (
          <>
            <h1 className="profile-dossier-name">{profile.name}</h1>
            <div className="profile-dossier-meta">
              {profile.handle && <span className="profile-handle">{profile.handle}</span>}
              {profile.location && <span>{profile.location}</span>}
            </div>

            <div className="profile-dossier-bio">
              {(profile.bio ?? "").split("\n\n").map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            </div>

            <div className="profile-dossier-contacts">
              {profile.email && (
                <a className="profile-contact" href={`mailto:${profile.email}`}>
                  <span className="profile-contact-label">Mail</span>
                  <span>{profile.email}</span>
                </a>
              )}
              {(profile.links ?? []).map((link) => (
                <a
                  key={link.url}
                  className="profile-contact"
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="profile-contact-label">Red</span>
                  <span>{link.label}</span>
                </a>
              ))}
            </div>

            {canEdit && (
              <button
                type="button"
                className="btn btn-accent"
                style={{ marginTop: 28, width: "fit-content" }}
                onClick={() => {
                  setDraft(profile);
                  setLinksText((profile.links ?? []).map((l) => `${l.label}|${l.url}`).join("\n"));
                  setEditing(true);
                }}
              >
                Editar perfil
              </button>
            )}
          </>
        )}
      </div>
    </section>
  );
}
