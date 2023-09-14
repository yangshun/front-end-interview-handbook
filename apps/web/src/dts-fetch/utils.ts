export function stripLeadingPeriodAndSlash(path: string) {
  return path.replace(/^\.\//, '').replace(/^\./, '');
}
