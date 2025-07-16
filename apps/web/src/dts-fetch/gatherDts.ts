import type {
  PackageExportsEntry,
  PackageExportsEntryObject,
  PackageExportsEntryOrFallback,
  PackageExportsEntryPath,
  PackageExportsFallback,
  PackageExportsField,
  PackageExportsSubmodules,
  PackageJSON,
} from './types';

type ModuleToDeclarationPaths = Record<string, string>;

export function gatherDts(packageJSON: PackageJSON) {
  const moduleToDeclarationPath: ModuleToDeclarationPaths = {};

  if (packageJSON.types && packageJSON.typings) {
    console.warn(
      `Both "types" and "typings" fields declared for ${packageJSON.name}@${packageJSON.version}/package.json`,
    );
  }

  if (packageJSON.types) {
    moduleToDeclarationPath['.'] = packageJSON.types;
  }

  if (packageJSON.typings) {
    moduleToDeclarationPath['.'] = packageJSON.typings;
  }

  if (packageJSON.exports) {
    gatherExportsField(moduleToDeclarationPath, '.', packageJSON.exports);
  }

  return moduleToDeclarationPath;
}

function gatherExportEntryPath(
  declrs: ModuleToDeclarationPaths,
  moduleName: string,
  entryPath: PackageExportsEntryPath,
) {
  // Only accept type declarations and non wildcard entries.
  if (!entryPath.endsWith('.d.ts') || entryPath.includes('*')) {
    return;
  }

  declrs[moduleName] = entryPath;
}

function gatherExportFallback(
  _declrs: ModuleToDeclarationPaths,
  _moduleName: string,
  _fallback: PackageExportsFallback,
) {
  throw new Error('Array type not supported in package.json exports');
}

function gatherExportsEntryOrFallback(
  declrs: ModuleToDeclarationPaths,
  moduleName: string,
  entryOrFallback: PackageExportsEntryOrFallback,
) {
  if (Array.isArray(entryOrFallback)) {
    return gatherExportFallback(declrs, moduleName, entryOrFallback);
  }

  gatherExportEntry(declrs, moduleName, entryOrFallback as PackageExportsEntry);
}

function gatherExportSubmodules(
  declrs: ModuleToDeclarationPaths,
  _moduleName: string,
  submodules: PackageExportsSubmodules,
) {
  Object.entries(submodules).map(([moduleName, value]) => {
    // Don't allow wildcard entries.
    if (moduleName.includes('*')) {
      return;
    }

    gatherExportsEntryOrFallback(declrs, moduleName, value);
  });
}

function gatherExportEntryObject(
  declrs: ModuleToDeclarationPaths,
  moduleName: string,
  entryObject: PackageExportsEntryObject,
) {
  Object.entries(entryObject).map(([environment, value]) => {
    // Ignore special environments like `types@<=5.0` for now.
    if (String(environment).includes('@') || value == null) {
      return;
    }

    gatherExportsEntryOrFallback(declrs, moduleName, value);
  });
}

function gatherExportEntry(
  declrs: ModuleToDeclarationPaths,
  moduleName: string,
  entry: PackageExportsEntry,
) {
  if (typeof entry === 'string') {
    return gatherExportEntryPath(declrs, moduleName, entry);
  }

  return gatherExportEntryObject(declrs, moduleName, entry);
}

function gatherExportsField(
  declrs: ModuleToDeclarationPaths,
  moduleName: string,
  exportsFieldValue: PackageExportsField,
) {
  if (typeof exportsFieldValue === 'string') {
    gatherExportEntryPath(declrs, moduleName, exportsFieldValue);
  }

  if (Array.isArray(exportsFieldValue)) {
    return gatherExportFallback(declrs, moduleName, exportsFieldValue);
  }

  if (typeof exportsFieldValue === 'object') {
    const keys = Object.keys(exportsFieldValue);

    if (keys.length > 0 && keys.every((key) => key.startsWith('.'))) {
      // Declarations for submodules.
      return gatherExportSubmodules(
        declrs,
        moduleName,
        exportsFieldValue as PackageExportsSubmodules,
      );
    }

    return gatherExportEntryObject(
      declrs,
      moduleName,
      exportsFieldValue as PackageExportsEntryObject,
    );
  }
}
