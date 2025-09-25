const modules = import.meta.glob("./entries/*.jsx", { eager: true });

export const PROJECTS = Object.values(modules).map((m) => ({
  ...m.meta,
  Component: m.default,
}));

export function getProjectBySlug(slug) {
  return PROJECTS.find((p) => p.slug === slug);
}
