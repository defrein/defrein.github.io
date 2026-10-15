export const PROJECTS_PER_PAGE = 6;
export const MOBILE_PROJECTS_PER_PAGE = 5;
export const BLOG_POSTS_PER_PAGE = 5;

export function pageCount(total: number, size: number) {
  return Math.max(1, Math.ceil(total / size));
}

export function clampPage(page: number, pages: number) {
  return Math.min(pages, Math.max(1, Number.isFinite(page) ? Math.trunc(page) : 1));
}

export function pageSlice<T>(items: T[], page: number, size: number) {
  const current = clampPage(page, pageCount(items.length, size));
  return items.slice((current - 1) * size, current * size);
}

export function pageNumbers(current: number, total: number): (number | 'ellipsis')[] {
  const pages = [...new Set([1, current - 1, current, current + 1, total])]
    .filter(page => page >= 1 && page <= total).sort((a, b) => a - b);
  const result: (number | 'ellipsis')[] = [];
  for (const page of pages) {
    const previous = result.at(-1);
    if (typeof previous === 'number' && page - previous > 1) {
      if (page - previous === 2) result.push(previous + 1);
      else result.push('ellipsis');
    }
    result.push(page);
  }
  return result;
}
