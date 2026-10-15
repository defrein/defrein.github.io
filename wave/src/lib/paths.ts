const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export function withBase(path = '') {
  return `${base}/${path.replace(/^\//, '')}`;
}
