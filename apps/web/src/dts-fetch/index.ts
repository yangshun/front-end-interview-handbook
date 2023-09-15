import { gatherDts } from './gatherDts';
import type { PackageName, PackageVersion } from './types';
import { stripLeadingPeriodAndSlash } from './utils';

const CDN_URL = 'https://cdn.jsdelivr.net/';

function makePackageUrl(
  packageName: PackageName,
  packageVersion: PackageVersion,
) {
  const packageUrl =
    CDN_URL + 'npm/' + `${packageName}@${packageVersion}` + '/';

  return packageUrl;
}

async function fetchPackageJson(
  packageName: PackageName,
  packageVersion: PackageVersion,
): Promise<any> {
  const packageJsonUrl =
    makePackageUrl(packageName, packageVersion) + 'package.json';
  const response = await fetch(packageJsonUrl);

  if (!response.ok) {
    return null;
  }

  return await response.json();
}

export async function fetchDtsList(
  packageName: PackageName,
  packageVersion: PackageVersion,
) {
  try {
    const packageJson = await fetchPackageJson(packageName, packageVersion);
    const dtsMap = gatherDts(packageJson);
    const packageCdnUrl = makePackageUrl(packageName, packageVersion);
    const urls = Object.entries(dtsMap).map(([dtsPath]) => {
      const dtsRelativePath = stripLeadingPeriodAndSlash(dtsPath);
      const dtsCdnUrl = packageCdnUrl + dtsRelativePath;

      return { dtsCdnUrl, dtsRelativePath, module };
    });

    return urls;
  } catch {
    //
  }
}
