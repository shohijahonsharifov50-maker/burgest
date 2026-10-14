import { useEffect, useState } from 'react';
import { Field, FormDialog } from './FormDialog';

const EMPTY = { uz: '', ru: '', en: '', categoryId: '', price: '', weightGrams: '', tag: '', available: true, sortOrder: '' };

function toForm(item, defaultCategoryId) {
  if (!item) return { ...EMPTY, categoryId: defaultCategoryId ?? '' };
  return {
    uz: item.name.uz, ru: item.name.ru, en: item.name.en,
    categoryId: item.categoryId,
    price: String(item.price),
    weightGrams: item.weightGrams ? String(item.weightGrams) : '',
    tag: item.tag ?? '',
    available: item.available,
    sortOrder: String(item.sortOrder),
  };
}

function toRequest(form) {
  const optionalNumber = (value) => (value === '' ? null : Number(value));
  return {
    categoryId: Number(form.categoryId),
    name: { uz: form.uz, ru: form.ru, en: form.en },
    price: optionalNumber(form.price),
    weightGrams: optionalNumber(form.weightGrams),
    tag: form.tag || null,
    available: form.available,
    sortOrder: optionalNumber(form.sortOrder),
  };
}

/** Create or edit a dish. `item` is null when creating. */
export function ItemFormDialog({ open, item, categories, defaultCategoryId, onClose, onSave }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!open) return;
    setForm(toForm(item, defaultCategoryId));
    setErrors({});
    setError('');
  }, [open, item, defaultCategoryId]);

  const set = (key) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setForm((current) => ({ ...current, [key]: value }));
  };

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
      title={item ? 'Taomni tahrirlash' : 'Yangi taom'}
      open={open}
      onClose={onClose}
      onSubmit={submit}
      submitLabel={item ? 'Saqlash' : 'Qo‘shish'}
      busy={busy}
      error={error}
    >
      <div className="admin-grid">
        <Field label="Nomi (o‘zbekcha)" error={errors['name.uz']}><input value={form.uz} onChange={set('uz')} required /></Field>
        <Field label="Nomi (ruscha)" error={errors['name.ru']}><input value={form.ru} onChange={set('ru')} required /></Field>
        <Field label="Nomi (inglizcha)" error={errors['name.en']}><input value={form.en} onChange={set('en')} required /></Field>
        <Field label="Bo‘lim" error={errors.categoryId}>
          <select value={form.categoryId} onChange={set('categoryId')} required>
            <option value="" disabled>Tanlang</option>
            {categories.map((category) => <option key={category.id} value={category.id}>{category.name.uz}</option>)}
          </select>
        </Field>
        <Field label="Narxi, so‘m" error={errors.price}>
          <input type="number" min="0" step="1000" value={form.price} onChange={set('price')} required />
        </Field>
        <Field label="Og‘irligi, g" error={errors.weightGrams} hint="Ixtiyoriy">
          <input type="number" min="1" value={form.weightGrams} onChange={set('weightGrams')} />
        </Field>
        <Field label="Belgi" error={errors.tag}>
          <select value={form.tag} onChange={set('tag')}>
            <option value="">Yo‘q</option>
            <option value="HIT">Hit</option>
            <option value="SIGNATURE">Imzo</option>
          </select>
        </Field>
        <Field label="Tartib raqami" error={errors.sortOrder} hint="Bo‘sh qolsa, oxiriga qo‘shiladi">
          <input type="number" min="0" value={form.sortOrder} onChange={set('sortOrder')} />
        </Field>
      </div>
      <label className="admin-check">
        <input type="checkbox" checked={form.available} onChange={set('available')} />
        <span>Saytda ko‘rinadi</span>
      </label>
    </FormDialog>
  );
}
