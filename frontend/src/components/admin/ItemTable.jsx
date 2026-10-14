import { formatPrice } from '../../lib/format';

const TAG_LABEL = { HIT: 'Hit', SIGNATURE: 'Imzo' };

/**
 * Dishes as a table on wide screens. On phones every row becomes a card (see admin.css);
 * `data-label` gives each cell its caption there.
 */
export function ItemTable({ items, onEdit, onDelete, onToggle }) {
  if (items.length === 0) {
    return <p className="admin-empty">Bu bo‘limda hozircha taom yo‘q. “Yangi taom” tugmasi bilan qo‘shing.</p>;
  }

  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nomi</th>
            <th scope="col">Narxi</th>
            <th scope="col">Og‘irligi</th>
            <th scope="col">Belgi</th>
            <th scope="col">Saytda</th>
            <th scope="col"><span className="vh">Amallar</span></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className={item.available ? '' : 'is-hidden'}>
              <td className="admin-col-order admin-muted" data-label="#">{item.sortOrder}</td>
              <td className="admin-col-name">
                <strong>{item.name.uz}</strong>
                <small className="admin-muted">{item.name.ru} · {item.name.en}</small>
              </td>
              <td className="admin-price" data-label="Narxi">{formatPrice(item.price, 'uz', 'so‘m')}</td>
              <td data-label="Og‘irligi">{item.weightGrams ? `${item.weightGrams} g` : '—'}</td>
              <td data-label="Belgi">{item.tag ? <span className="admin-tag">{TAG_LABEL[item.tag]}</span> : '—'}</td>
              <td className="admin-col-toggle" data-label="Saytda">
                <label className="admin-switch">
                  <input type="checkbox" checked={item.available} onChange={() => onToggle(item)}
                    aria-label={`${item.name.uz}: saytda ko‘rinadi`} />
                  <span />
                </label>
              </td>
              <td className="admin-actions">
                <button type="button" className="admin-btn admin-btn--small" onClick={() => onEdit(item)}>Tahrirlash</button>
                <button type="button" className="admin-btn admin-btn--small admin-btn--danger" onClick={() => onDelete(item)}>O‘chirish</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
