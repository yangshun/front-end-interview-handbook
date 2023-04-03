export default function stripTrailingSlashFromPathname(pathname: string) {
  return pathname.replace(/\/$/, '');
}
