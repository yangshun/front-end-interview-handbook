export function stripBoundaryPeriodAndSlash(path: string) {
  return path.replace(/^\.\//, '').replace(/^\./, '').replace(/\/$/, '');
}
