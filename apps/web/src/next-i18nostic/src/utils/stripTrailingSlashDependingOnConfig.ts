import nextI18nosticConfig from 'next-i18nostic/config';

import stripTrailingSlashFromPathname from './stripTrailingSlashFromPathname';

export default function stripTrailingSlashDependingOnConfig(
  pathname: string,
): string {
  const stripped = stripTrailingSlashFromPathname(pathname);
  const finalPathname =
    stripped + (nextI18nosticConfig.trailingSlash ? '/' : '');

  return finalPathname || '/';
}
