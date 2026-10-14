import { useEffect, useRef } from 'react';

/** Modal built on the native <dialog>, so focus trapping and Esc-to-close come for free. */
export function FormDialog({ title, open, onClose, onSubmit, submitLabel, busy, error, children }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog className="admin-dialog" ref={dialogRef} onClose={onClose} onCancel={onClose}>
      <form method="dialog" onSubmit={(event) => { event.preventDefault(); onSubmit(); }}>
        <header className="admin-dialog__head">
          <h2>{title}</h2>
          <button type="button" className="admin-icon-btn" onClick={onClose} aria-label="Yopish">×</button>
        </header>
        <div className="admin-dialog__body">{children}</div>
        {error && <p className="admin-error" role="alert">{error}</p>}
        <footer className="admin-dialog__foot">
          <button type="button" className="admin-btn" onClick={onClose}>Bekor qilish</button>
          <button type="submit" className="admin-btn admin-btn--primary" disabled={busy}>
            {busy ? 'Saqlanmoqda…' : submitLabel}
          </button>
        </footer>
      </form>
    </dialog>
  );
}

export function Field({ label, error, hint, children }) {
  return (
    <label className={`admin-field${error ? ' has-error' : ''}`}>
      <span>{label}</span>
      {children}
      {hint && !error && <small className="admin-muted">{hint}</small>}
      {error && <small className="admin-field__error">{error}</small>}
    </label>
  );
}
