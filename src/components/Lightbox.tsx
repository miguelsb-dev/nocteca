type Props = {
  src: string | null;
  onClose: () => void;
};

export function Lightbox({ src, onClose }: Props) {
  if (!src) return null;
  return (
    <div className="lightbox" role="dialog" aria-modal onClick={onClose}>
      <button type="button" className="btn btn-ghost lightbox-close" onClick={onClose}>
        Cerrar
      </button>
      <div className="lightbox-frame" onClick={(e) => e.stopPropagation()}>
        <img src={src} alt="" />
      </div>
    </div>
  );
}
