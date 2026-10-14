import { useEffect, useState } from 'react';
import { Field, FormDialog } from './FormDialog';

const EMPTY = { slug: '', uz: '', ru: '', en: '', noteUz: '', noteRu: '', noteEn: '', sortOrder: '' };

function toForm(category) {
  if (!category) return EMPTY;
  return {
    slug: category.slug,
    uz: category.name.uz, ru: category.name.ru, en: category.name.en,
    noteUz: category.note?.uz ?? '', noteRu: category.note?.ru ?? '', noteEn: category.note?.en ?? '',
    sortOrder: String(category.sortOrder),
  };
}

function toRequest(form) {
  const hasNote = form.noteUz || form.noteRu || form.noteEn;
  return {
    slug: form.slug.trim(),
    name: { uz: form.uz, ru: form.ru, en: form.en },
    note: hasNote ? { uz: form.noteUz, ru: form.noteRu, en: form.noteEn } : null,
    sortOrder: form.sortOrder === '' ? null : Number(form.sortOrder),
  };
}

export function CategoryFormDialog({ open, category, onClose, onSave }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!open) return;
    setForm(toForm(category));
    setErrors({});
    setError('');
  }, [open, category]);

  const set = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }));

  const submit = async () => {
    setBusy(true);
    setError('');
    try {
      await onSave(toRequest(form));
    } catch (err) {
      setErrors(err.fieldErrors ?? {});
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <FormDialog
      title={category ? 'Bo‘limni tahrirlash' : 'Yangi bo‘lim'}
      open={open}
      onClose={onClose}
      onSubmit={submit}
      submitLabel={category ? 'Saqlash' : 'Qo‘shish'}
      busy={busy}
      error={error}
    >
      <div className="admin-grid">
        <Field label="Nomi (o‘zbekcha)" error={errors['name.uz']}><input value={form.uz} onChange={set('uz')} required /></Field>
        <Field label="Nomi (ruscha)" error={errors['name.ru']}><input value={form.ru} onChange={set('ru')} required /></Field>
        <Field label="Nomi (inglizcha)" error={errors['name.en']}><input value={form.en} onChange={set('en')} required /></Field>
        <Field label="Havola nomi (slug)" error={errors.slug} hint="Masalan: desserts">
          <input value={form.slug} onChange={set('slug')} pattern="[a-z0-9]+(-[a-z0-9]+)*" required />
        </Field>
        <Field label="Izoh (o‘zbekcha)" hint="Ixtiyoriy"><input value={form.noteUz} onChange={set('noteUz')} /></Field>
        <Field label="Izoh (ruscha)"><input value={form.noteRu} onChange={set('noteRu')} /></Field>
        <Field label="Izoh (inglizcha)"><input value={form.noteEn} onChange={set('noteEn')} /></Field>
        <Field label="Tartib raqami" error={errors.sortOrder}>
          <input type="number" min="0" value={form.sortOrder} onChange={set('sortOrder')} />
        </Field>
      </div>
    </FormDialog>
  );
}
