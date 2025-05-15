import type { Monaco } from '@monaco-editor/react';
import type { IDisposable } from 'monaco-editor';
import { useEffect, useRef } from 'react';

import { fetchDtsList } from '~/dts-fetch';
import type {
  PackageJSON,
  PackageName,
  PackageVersion,
} from '~/dts-fetch/types';
import { stripBoundaryPeriodAndSlash } from '~/dts-fetch/utils';

type TypeDeclarationContent = string;
type Path = string;
type PackageModuleTypeDeclarations = ReadonlyArray<{
  contents: TypeDeclarationContent;
  moduleName: string;
  relativePath: Path;
}>;
type PackageTypeDefs = Record<
  PackageName,
  Record<PackageVersion, PackageModuleTypeDeclarations>
>;

// TODO(workspace): Cache fetched contents across sessions since they are immutable.
const packageTypeDefs: PackageTypeDefs = {};
const excludedPackages = new Set(['typescript', 'react-scripts']);

async function fetchPackageTypeDeclarations(
  packageName: PackageName,
  packageVersion: PackageVersion,
): Promise<PackageModuleTypeDeclarations | null> {
  if (packageTypeDefs[packageName]?.[packageVersion]) {
    return packageTypeDefs[packageName][packageVersion];
  }

  try {
    const dtsList = await fetchDtsList(packageName, packageVersion);

    if (dtsList == null) {
      return null;
    }

    const typeDeclarations = await Promise.all(
      dtsList.map(async ({ dtsCdnUrl, dtsRelativePath, moduleName }) => {
        const response = await fetch(dtsCdnUrl);
        const contents = await response.text();

        return {
          contents,
          moduleName,
          relativePath: dtsRelativePath,
        };
      }),
    );

    if (!packageTypeDefs[packageName]) {
      packageTypeDefs[packageName] = {};
    }
    packageTypeDefs[packageName][packageVersion] = typeDeclarations;

    return typeDeclarations;
  } catch {
    return null;
  }
}

export default function useMonacoLanguagesFetchTypeDeclarations(
  monaco: Monaco | null,
  shouldUseTypeScript = false,
  packageJSONString: string | null, // Use a string to make comparisons easier.
) {
  // Map of loaded libraries to be disposed during cleanup.
  const loadedDeps = useRef<Record<PackageName, () => void>>({});

  useEffect(() => {
    if (monaco == null || !shouldUseTypeScript || packageJSONString == null) {
      return;
    }

    let packageJSON: PackageJSON | null = null;

    try {
      packageJSON = JSON.parse(packageJSONString);
      if (packageJSON == null) {
        return;
      }
    } catch {
      // Terminate if parsing the `package.json` string results in an error.
      return;
    }

    const allDependencies = {
      ...packageJSON.dependencies,
      ...packageJSON.devDependencies,
    };

    Object.entries(allDependencies)
      .filter(([packageName]) => !excludedPackages.has(String(packageName)))
      .forEach(async ([packageName, specifiedPackageVersion]) => {
        // TODO(workspace): Extract the version properly and support more formats. Even better if the correct version can be resolved.
        const packageVersion = specifiedPackageVersion.replace(/^\^|~/, '');
        const packageDeclarations = await fetchPackageTypeDeclarations(
          String(packageName),
          packageVersion,
        );

        if (packageDeclarations == null) {
          console.error(
            `Failed to download type declarations for ${packageName}@${packageVersion}`,
          );

          return;
        }

        const disposables: Array<IDisposable> = [];

        packageDeclarations?.forEach(({ contents, moduleName }) => {
          const filePath = [
            'file:///node_modules',
            packageName,
            stripBoundaryPeriodAndSlash(moduleName),
            'index.d.ts',
          ]
            .filter(Boolean)
            .join('/');

          disposables.push(
            monaco.languages.typescript.typescriptDefaults.addExtraLib(
              contents,
              filePath,
            ),
          );

          disposables.push(
            monaco.languages.typescript.javascriptDefaults.addExtraLib(
              contents,
              filePath,
            ),
          );
        });

        function dispose() {
          disposables.forEach((disposable) => disposable.dispose());
        }

        loadedDeps.current[packageName] = dispose;
      });

    const { current } = loadedDeps;

    return () => {
      Object.values(current).forEach((dispose) => dispose());
    };
  }, [loadedDeps, monaco, packageJSONString, shouldUseTypeScript]);
}
