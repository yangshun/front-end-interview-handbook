export type PackageName = string;
export type PackageVersion = string;
type PackageDependencies = Record<PackageName, PackageVersion>;

// Referenced from: https://github.com/SchemaStore/schemastore/blob/master/src/schemas/json/package.json
export type PackageExportsEntryPath = string;
export type PackageExportsFallback = ReadonlyArray<PackageExportsEntryPath>;
export type PackageExportsEntryOrFallback =
  | PackageExportsEntry
  | PackageExportsFallback;
export type PackageExportsEntryObject = Readonly<{
  // E.g. require, import, node, default, types.
  // Because TypeScript allows specifying versions within the key,
  // it's not possible to statically type this field.
  [environment: string]: PackageExportsEntryOrFallback;
}>;
export type PackageExportsSubmodules = Record<
  string, // The keys start with period (e.g. './canary', './client')
  PackageExportsEntryOrFallback
>;
export type PackageExportsEntry =
  | PackageExportsEntryPath
  | PackageExportsEntryObject;
export type PackageExportsField =
  | PackageExportsEntryPath
  | PackageExportsSubmodules
  | PackageExportsEntryObject
  | PackageExportsFallback;

export type PackageJSON = Readonly<{
  name: string;
  version: string;
  dependencies?: PackageDependencies;
  devDependencies?: PackageDependencies;
  types?: string;
  typings?: string;
  exports?: PackageExportsField;
}>;
