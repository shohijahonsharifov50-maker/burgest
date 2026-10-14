/** 75000 -> "75 000 so‘m" / "75 000 сум" / "75,000 UZS". */
export function formatPrice(price, lang, currencyLabel) {
  const separator = lang === 'en' ? ',' : ' ';
  const digits = String(price).replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  return lang === 'en' ? `${digits} UZS` : `${digits} ${currencyLabel}`;
}

export function formatReviewDate([month, day], months) {
  return `${day} ${months[month - 1]}`;
}
