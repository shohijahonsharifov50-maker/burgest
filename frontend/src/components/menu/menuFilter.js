/** Filters by a search query (matches any language) and sorts items inside each category. */
export function filterMenu(categories, { query, sort, lang }) {
  const needle = query.trim().toLowerCase();
  const compare = {
    az: (a, b) => a.name[lang].localeCompare(b.name[lang], lang),
    cheap: (a, b) => a.price - b.price,
    exp: (a, b) => b.price - a.price,
  }[sort];

  return categories
    .map((category) => {
      let items = category.items;
      if (needle) {
        items = items.filter((item) => Object.values(item.name).some((name) => name.toLowerCase().includes(needle)));
      }
      if (compare) items = [...items].sort(compare);
      return { ...category, items };
    })
    .filter((category) => category.items.length > 0);
}
