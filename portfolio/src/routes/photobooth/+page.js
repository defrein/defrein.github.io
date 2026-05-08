// Camera APIs are browser-only, so render this route client-side.
// Prerender still emits a static shell that hydrates.
export const ssr = false;
export const prerender = true;
