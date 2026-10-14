import { useCallback, useEffect, useMemo, useState } from 'react';
import { LogoMark } from '../site/LogoMark';
import { CategoryFormDialog } from './CategoryFormDialog';
import { ItemFormDialog } from './ItemFormDialog';
import { ItemTable } from './ItemTable';

const ALL = 'all';

export function AdminDashboard({ api, username, onLogout }) {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(ALL);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('loading');
  const [notice, setNotice] = useState('');
  const [itemDialog, setItemDialog] = useState({ open: false, item: null });
  const [categoryDialog, setCategoryDialog] = useState({ open: false, category: null });

  const handleError = useCallback((error) => {
    if (error.status === 401) onLogout();
    else setNotice(error.message);
  }, [onLogout]);

  const reload = useCallback(async () => {
    try {
      const [nextCategories, nextItems] = await Promise.all([api.listCategories(), api.listItems()]);
      setCategories(nextCategories);
      setItems(nextItems);
      setStatus('ready');
    } catch (error) {
      setStatus('error');
      handleError(error);
    }
  }, [api, handleError]);

  useEffect(() => { reload(); }, [reload]);

  useEffect(() => {
    if (!notice) return undefined;
    const timer = setTimeout(() => setNotice(''), 3500);
    return () => clearTimeout(timer);
  }, [notice]);

  const selectedCategory = categories.find((category) => category.id === selected) ?? null;
  const visibleItems = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return items.filter((item) =>
      (selected === ALL || item.categoryId === selected)
      && (!needle || Object.values(item.name).some((name) => name.toLowerCase().includes(needle))));
  }, [items, selected, query]);

  const saveItem = async (request) => {
    const { item } = itemDialog;
    if (item) await api.updateItem(item.id, request);
    else await api.createItem(request);
    setItemDialog({ open: false, item: null });
    setNotice(item ? 'Taom saqlandi.' : 'Taom qo‘shildi.');
    reload();
  };

  const saveCategory = async (request) => {
    const { category } = categoryDialog;
    if (category) await api.updateCategory(category.id, request);
    else await api.createCategory(request);
    setCategoryDialog({ open: false, category: null });
    setNotice(category ? 'Bo‘lim saqlandi.' : 'Bo‘lim qo‘shildi.');
    reload();
  };

  const toggleItem = async (item) => {
    try {
      const updated = await api.setAvailability(item.id, !item.available);
      setItems((current) => current.map((it) => (it.id === updated.id ? updated : it)));
      setNotice(updated.available ? 'Taom saytda ko‘rinadi.' : 'Taom saytdan yashirildi.');
    } catch (error) {
      handleError(error);
    }
  };

  const deleteItem = async (item) => {
    if (!window.confirm(`“${item.name.uz}” o‘chirilsinmi? Buni qaytarib bo‘lmaydi.`)) return;
    try {
      await api.deleteItem(item.id);
      setNotice('Taom o‘chirildi.');
      reload();
    } catch (error) {
      handleError(error);
    }
  };

  const deleteCategory = async (category) => {
    if (!window.confirm(`“${category.name.uz}” bo‘limi o‘chirilsinmi?`)) return;
    try {
      await api.deleteCategory(category.id);
      setSelected(ALL);
      setNotice('Bo‘lim o‘chirildi.');
      reload();
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="admin-shell">
      <header className="admin-top">
        <a className="admin-brand" href="/"><LogoMark /><span>BURGESTA</span><em>Admin</em></a>
        <div className="admin-top__right">
          <span className="admin-muted">{username}</span>
          <button type="button" className="admin-btn" onClick={onLogout}>Chiqish</button>
        </div>
      </header>

      <div className="admin-body">
        <aside className="admin-side" aria-label="Bo‘limlar">
          <div className="admin-side__head">
            <h2>Bo‘limlar</h2>
            <button type="button" className="admin-btn admin-btn--small"
              onClick={() => setCategoryDialog({ open: true, category: null })}>+ Bo‘lim</button>
          </div>
          <nav>
            <button type="button" className={`admin-cat${selected === ALL ? ' on' : ''}`} onClick={() => setSelected(ALL)}>
              <span>Hammasi</span><b>{items.length}</b>
            </button>
            {categories.map((category) => (
              <button type="button" key={category.id} className={`admin-cat${selected === category.id ? ' on' : ''}`}
                onClick={() => setSelected(category.id)}>
                <span>{category.name.uz}</span><b>{category.itemCount}</b>
              </button>
            ))}
          </nav>
        </aside>

        <main className="admin-main">
          <div className="admin-toolbar">
            <div>
              <h1>{selectedCategory ? selectedCategory.name.uz : 'Butun menyu'}</h1>
              <p className="admin-muted">{visibleItems.length} ta taom</p>
            </div>
            <div className="admin-toolbar__actions">
              <input className="admin-search" type="search" placeholder="Taom qidirish" value={query}
                onChange={(event) => setQuery(event.target.value)} aria-label="Taom qidirish" />
              {selectedCategory && (
                <>
                  <button type="button" className="admin-btn"
                    onClick={() => setCategoryDialog({ open: true, category: selectedCategory })}>Bo‘limni tahrirlash</button>
                  <button type="button" className="admin-btn admin-btn--danger"
                    onClick={() => deleteCategory(selectedCategory)}>Bo‘limni o‘chirish</button>
                </>
              )}
              <button type="button" className="admin-btn admin-btn--primary admin-add"
                onClick={() => setItemDialog({ open: true, item: null })}>+ Yangi taom</button>
            </div>
          </div>

          {status === 'loading' && <p className="admin-empty">Yuklanmoqda…</p>}
          {status === 'error' && <p className="admin-empty">Ma’lumotlarni yuklab bo‘lmadi. Backend ishga tushganini tekshiring.</p>}
          {status === 'ready' && (
            <ItemTable
              items={visibleItems}
              onEdit={(item) => setItemDialog({ open: true, item })}
              onDelete={deleteItem}
              onToggle={toggleItem}
            />
          )}
        </main>
      </div>

      {notice && <div className="admin-toast" role="status">{notice}</div>}

      <ItemFormDialog
        open={itemDialog.open}
        item={itemDialog.item}
        categories={categories}
        defaultCategoryId={selectedCategory?.id}
        onClose={() => setItemDialog({ open: false, item: null })}
        onSave={saveItem}
      />
      <CategoryFormDialog
        open={categoryDialog.open}
        category={categoryDialog.category}
        onClose={() => setCategoryDialog({ open: false, category: null })}
        onSave={saveCategory}
      />
    </div>
  );
}
